const ioClient = require('socket.io-client');
var ip = require("ip");
var localtunnel = require('localtunnel');
var hostServer = require('./server');

const host_socket = ioClient("https://secure-depths-49472.herokuapp.com/");
let hosting = false;
let serverUrl;

var tunnel = localtunnel(9090, function(err, tunnel) {
  serverUrl = tunnel.url
});

function disconnect() {
  hosting = false;
  tunnel.close();
  hostServer.closeServer();
}

function connect(gameName) {
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
