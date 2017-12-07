const http = require('http');
let server;

function startServer() {
  server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Welcome to poker!');
  }).listen(9090, "127.0.0.1");
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
