/* eslint-disable global-require, no-console */

import { app, BrowserWindow, Menu } from 'electron'
import path from 'path'
import windowStateKeeper from 'electron-window-state'
import _ from 'lodash'
import observe from 'observe'
import cp from 'child_process'
import ps from 'ps-node'
import fileLog from 'electron-log'
import os from 'os'
import fs from 'fs'
import grpc from 'grpc'
import url from 'url'
import ngrok from '../../ngrok/index'

// app.commandLine.appendSwitch('remote-debugging-port', '9997')
// app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

let mainWindow = null
const isDev = process.env.NODE_ENV === 'development'
const runningProcesses = []

const isProcessRunning = command => new Promise((resolve, reject) => {
  ps.lookup({ command },
    (err, resultList) => {
      if (err) { throw new Error(err) }
      resultList[0] ? resolve(resultList[0]) : reject()
    },
  )
})

const runProcesses = (processes, logs) => {
  _.map(processes, (proc) => {
    isProcessRunning(proc.name)
      .then(() => {
        console.log(`${ proc.name } Already Running`)
        logs.push(`${ proc.name } Already Running`)
        fileLog.info(`${ proc.name } Already Running`)
      })
      .catch(() => {
        const plat = os.platform()
        const filePath = path.join(__dirname, 'bin', plat, plat === 'win32' ? `${ proc.name }.exe` : proc.name)

        try {
          const instance = cp.spawn(filePath, proc.args)
          runningProcesses.push(instance)
          instance.stdout.on('data', data => logs.push(`${ proc.name }: ${ data }`))
          instance.stderr.on('data', (data) => {
            logs.push(`${ proc.name } Error: ${ data }`)
            fileLog.error(`${ proc.name }: ${ data }`)
          })
        } catch (error) {
          console.log(`Caught Error When Starting ${ proc.name }: ${ error }`)
          logs.push(`Caught Error When Starting ${ proc.name }: ${ error }`)
        }
      })
  })
}

const logBuffer = []
const logs = observe(logBuffer)

const processes = [
  {
    name: 'lnd',
    args: [
      isDev ? '' : '--bitcoin.active',
      isDev ? '' : '--neutrino.active',
      isDev ? '' : '--configfile=../lnd.conf',
      isDev ? '' : '--bitcoin.testnet',
      isDev ? '' : '--neutrino.connect=btcd0.lightning.computer:18333',
      isDev ? '' : '--neutrino.connect=127.0.0.1:18333',
      isDev ? '' : '--debuglevel=info',
      isDev ? '' : '--autopilot.active',
      '--no-macaroons',
      '--noencryptwallet',
    ],
  },
]

runProcesses(processes, logs)

let intervalId
let certPath
const homedir = os.homedir()

switch (os.platform()) {
  case 'darwin':
    certPath = path.join(homedir, 'Library/Application\ Support/Lnd/tls.cert')
    break
  case 'linux':
    certPath = path.join(homedir, '.lnd/tls.cert')
    break
  case 'win32':
    certPath = path.join(homedir, 'AppData', 'Local', 'Lnd', 'tls.cert')
    break
  default:
    break
}

const finishCreateWindow = () => {
  const mainWindowState = windowStateKeeper({
    defaultWidth: 750,
    defaultHeight: 500,
  })

  const plat = os.platform()

  const icon = 'assets/ln-logo' + ({
    'darwin': '.icns',
    'win32': '.ico',
  }[plat] || '.png')

  const { x, y, width, height } = mainWindowState
  mainWindow = new BrowserWindow({
    x,
    y,
    width,
    height,
    icon: icon,
    show: false,
    frame: true,
    title: 'Poker',
    nodeIntegration: false,
  })

  let splash = new BrowserWindow({width: 810, height: 610, transparent: true, frame: false, alwaysOnTop: true});
  splash.loadURL(url.format({
    pathname: path.join(
      __dirname,'splash.html'),
    protocol: 'file:',
  }));

  mainWindow.setMenu(null)

  mainWindowState.manage(mainWindow)
  mainWindow.loadURL(`file://${ __dirname }/index.dev.html`)

  mainWindow.webContents.on('did-finish-load', () => {
    splash.destroy();
    mainWindow.show()
    mainWindow.focus()

    mainWindow.webContents.send('logs', logBuffer)
  })

  let logQueue = []

  logs.on('change', (change) => {
    const log = logBuffer[change.index]
    logQueue.push(log)
  })

  setInterval(() => {
    try {
      logQueue.length && mainWindow.webContents.send('logs', logQueue)
      logQueue = []
    } catch (err) {
      console.log('WARNING: App Was Closed While Writing Logs')
    }
  }, 2000)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

const createWindow = () => {
  intervalId = setInterval(() => {
    if (fs.existsSync(certPath)) {
      clearInterval(intervalId)
      const lndCert = fs.readFileSync(certPath)
      const credentials = grpc.credentials.createSsl(lndCert)
      const { lnrpc } = grpc.load(path.join(__dirname, 'rpc.proto'))
      const connection = new lnrpc.Lightning('localhost:10009', credentials)
      const serverReady = cb =>
       grpc.waitForClientReady(connection, Infinity, cb)
      global.connection = connection
      global.serverReady = serverReady
      finishCreateWindow()
    }
  }, 500)
}

require('electron-debug')({ enabled: true })

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', createWindow)

app.on('before-quit', function() {
  ngrok.kill();
})

app.on('quit', () => {
  runningProcesses.forEach(proc => proc.kill())
})

process.on('uncaughtException', (error) => {
  console.log('Caught Main Process Error:', error)
  fileLog.error(`Main Process: ${ error }`)
})
