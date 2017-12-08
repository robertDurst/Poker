const ioClient = require('socket.io-client');
var ip = require("ip");
var hostServer = require('./server');
var axios = require('axios');
var ngrok = require('../../ngrok/index');

const host_socket = ioClient("https://secure-depths-49472.herokuapp.com/");
let hosting = false;
let serverUrl;

var tunnel = ngrok.connect(9090, function (err, url) {
  serverUrl = url;
});


function disconnect() {
  hosting = false;
  tunnel.kill();
  hostServer.closeServer();
}

async function connect(gameName) {
    hosting = true;
    hostServer.startServer();
    host_socket.emit('HOST_CONNECT', {
      internal_ip: ip.address(),
      game_name: gameName,
      external_ip: serverUrl,
      activePlayers: 1,
    })

}


// On connection
host_socket.on('Connected', () =>{
  console.log("here");
})

// When the host is added to the db
host_socket.on('RECORDED', () => {
  console.log("Was recorded");
})

// When the host reconnects and their status is updated
host_socket.on('WELCOME_BACK', () => {
  console.log("Welcome back!");
})

// On error
host_socket.on('ERROR', (err) => {
  console.log("Error", err);
})

// Response to PING, lets central server know host is active
host_socket.on('PING', (data) => {
  if(hosting) {
    host_socket.emit('PONG', {active_players: 0})
  }
})

module.exports = {
  connect,
  disconnect
}
