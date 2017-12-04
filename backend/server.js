const express = require('express');
const path = require('path');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Example route
app.use('/static',express.static('public'));
app.get('/', function (req, res) {
  res.send('Hello World!')
})

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });

  socket.on('my other event', function (data) {
    console.log(data);
  });

  //GS update
  //Join Game
  //Leave Game
  //Message (of preset)
  socket.on('update', function (data) {
    socket.broadcast('updata', data)
  })
  socket.on('joinGame', function (data) {
    socket.broadcast('playerJoin')
  })
  socket.on('leaveGame', function (data) {
    socket.broadcast('playerExit')
  })
  socket.on('message', function (data) {
    socket.broadcast('message',data)
  })
});


const port = 3000
server.listen(port, function () {
  console.log('Backend server for Electron App running on port 3000!')
});
