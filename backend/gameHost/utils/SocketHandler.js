let SocketHandler = (io, game) => {

  io.on('connection', (socket) => {
    socket.emit("GAME_UPDATE", game.gameState);
  });

}

module.exports = SocketHandler;
