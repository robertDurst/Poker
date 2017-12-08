let SocketHandler = (io, game) => {

  let counter = 0;

  game.gameState.addCardToSpread(game.gameState.deck.cards.pop());
  game.gameState.addCardToSpread(game.gameState.deck.cards.pop());
  game.gameState.addCardToSpread(game.gameState.deck.cards.pop());
  game.gameState.addCardToSpread(game.gameState.deck.cards.pop());


  io.on('connection', (socket) => {
    game.gameState.addPlayer('Player '+counter, socket)
    io.emit("GAME_UPDATE", game.gameState);
  });

}

module.exports = SocketHandler;
