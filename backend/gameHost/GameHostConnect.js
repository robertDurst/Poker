const ioClient = require('socket.io-client');
var ip = require("ip");
const publicIp = require('public-ip');
var localtunnel = require('localtunnel');




const host_socket = ioClient("https://secure-depths-49472.herokuapp.com/");
let hosting = false;
let serverUrl;



function disconnect() {
  hosting = false;
}

function connect() {
  hosting = true;


  let serverUrl;
  var tunnel = localtunnel(3000, function(err, tunnel) {
    host_socket.emit('HOST_CONNECT', {
      internal_ip: ip.address(),
      game_name: 'What up',
      external_ip: tunnel.url,
      activePlayers: 0,
    })
  });


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
