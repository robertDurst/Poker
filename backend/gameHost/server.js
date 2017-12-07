var http = require('http');

function startServer() {
  http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Welcome to poker!');
  }).listen(9090, "127.0.0.1");
}

module.exports = {
  startServer
}
