const ioClient = require('socket.io-client');
var ip = require("ip");
const publicIp = require('public-ip');

const host_socket = ioClient("https://secure-depths-49472.herokuapp.com/");


function connect() {
  console.log("here2");
}
// (async () => {
//    var ipp = await publicIp.v4();
//    host_socket.emit('HOST_CONNECT', {
//      internal_ip: ip.address(),
//      game_name: 'What up',
//      external_ip: ipp,
//      activePlayers: 0,
//    })
//  })()

// On connection
host_socket.on('Connected', () =>{
  console.log("here");
  connect();
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
  host_socket.emit('PONG', {active_players: 0})
})
