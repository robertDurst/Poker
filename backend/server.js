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

  socket.on('some other event', function (data) {
    //GS update
    //Join
    //Leave
    //Message
  })
});


const port = 3000
server.listen(port, function () {
  console.log('Backend server for Electron App running on port 3000!')
});
