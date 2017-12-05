const ioClient = require('socket.io-client');
var ip = require("ip");
const publicIp = require('public-ip');

const host_socket = ioClient("https://secure-depths-49472.herokuapp.com/");


async connnect() => {
   var ipp = await publicIp.v4();
   host_socket.emit('HOST_CONNECT', {
     internal_ip: ip.address(),
     game_name: 'What up',
     external_ip: ipp,
     activePlayers: 0,
   })
 })

host_socket.on('connection', () =>{
  console.log("here");
})

host_socket.on('RECORDED', () => {
  console.log("Was recorded");
})

host_socket.on('WELCOME_BACK', () => {
  console.log("Welcome back!");
})

host_socket.on('ERROR', (err) => {
  console.log("FUCK ME ERROR BOI", err);
})

host_socket.on('PING', (data) => {
  host_socket.emit('PONG', {active_players: 0})
})
