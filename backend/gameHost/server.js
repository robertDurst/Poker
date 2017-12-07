const http = require('http');
const socketIO = require('socket.io');

let server;
let io;
let connections = 0;

function startServer() {
  server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Number connected: ' + connections);
  }).listen(9090, "127.0.0.1");

   io = require('socket.io')(server, {
      serveClient: false,
      wsEngine: 'ws'
    });

    io.on('connection', (socket) => {
      connections ++;
    });
}

function closeServer() {
  console.log(server);
  server.close( (data) => {
    console.log("CLOSED", data);
  });
}




module.exports = {
  startServer,
  closeServer
}
