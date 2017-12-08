let SocketHandler = (io, game) => {

  let counter = 0;

  io.on('connection', (socket) => {
    game.gameState.addPlayer('Player '+counter, socket)
    counter ++;
    io.emit("GAME_UPDATE", game.gameState);
  });

  playGame();


  function nextState() {
    game.gameState.incrementState();
    io.emit("GAME_UPDATE", game.gameState);
    playGame();
  }

  let countdown;
  function playGame(){
    switch( game.gameState.state ) {
      // A sort of limbo where the host waits for at least two players
      case 0:
        // If there are at least two players in the game, start a game in 10 seconds
        if(game.gameState.players.length >= 1 && !countdown) {
          countdown = setTimeout( () => {
            game.gameState.incrementState();
            io.emit("GAME_UPDATE", game.gameState);
            countdown = null;
            playGame();
          }, 3000 );
        } else {
          countdown = setTimeout( () => {
            countdown = null;
            playGame();
          }, 1000 );
        }
        break;

      // Cards are dealt to the players in the game
      case 1:
        game.gameState.dealCards();
        nextState()
        break;

      // Round one of betting
      case 2:
        nextState()
        break;

      // The first three cards are dealt to the spread
      case 3:
        game.gameState.addCardToSpread(game.gameState.deck.cards.pop());
        game.gameState.addCardToSpread(game.gameState.deck.cards.pop());
        game.gameState.addCardToSpread(game.gameState.deck.cards.pop());
        nextState()
        break;

      // Round two of betting
      case 4:
        nextState()
        break;

      // The fourth card is dealt
      case 5:
        countdown = setTimeout( () => {
          game.gameState.addCardToSpread(game.gameState.deck.cards.pop());
          game.gameState.incrementState();
          io.emit("GAME_UPDATE", game.gameState);
          countdown = null;
          playGame();
        }, 3000 );
        break;

      // Round three of betting
      case 6:
        nextState()
        break;

      // The fifth card is dealt
      case 7:
        countdown = setTimeout( () => {
          game.gameState.addCardToSpread(game.gameState.deck.cards.pop());
          game.gameState.incrementState();
          io.emit("GAME_UPDATE", game.gameState);
          countdown = null;
          playGame();
        }, 3000 );
        break;

      // Last round of betting
      case 8:
        nextState()
        break;

      // Card reveal
      case 9:
        nextState()
        break;

      // Funds allocated
      case 10:
        countdown = setTimeout( () => {
          game.gameState.spread = [];
          game.gameState.incrementState();
          io.emit("GAME_UPDATE", game.gameState);
          countdown = null;
          playGame();
        }, 3000 );
        break;
    }

  }

}

module.exports = SocketHandler;
