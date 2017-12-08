let SocketHandler = (io, game) => {

  let counter = 0;

  io.on('connection', (socket) => {

    game.gameState.addPlayer('Player '+counter, socket)
    counter ++;
    sendUpdate();
  });

  function sendUpdate() {
    Object.keys(io.sockets.sockets).forEach( id => {
       const totalState = game.gameState;
       let customState = {
         pot: totalState.pot,
         spread: totalState.spread,
         state: totalState.state,
         folded: totalState.folded,
         winner: totalState.winner,
         dealer: totalState.dealer,
         players: totalState.players.map( x => x.pubKey),
         player_hand: totalState.players.filter( x => id === x.socketId )
       };
      io.sockets.sockets[id].emit("GAME_UPDATE", customState);
    })
  }

  playGame();

//     io.emit("GAME_UPDATE", game.gameState);



//     socket.on('READY', (stuff) => {
//       counter ++;
//       game.gameState.addPlayer('Player '+counter, socket)
//       io.emit('GAME_UPDATE',game.gameState)
//     })
//     socket.on('START_GAME', (data) => {
//       nextState()
//       io.emit('GAME_UPDATE',game.gameState)
//     })

//     socket.on('CALL', (data) => {
      
//       io.emit('GAME_UPDATE',game.gameState)
//     })

//     socket.on('BET', (data) => {
//       game.makeBet(data.pid, data.amount)
//       io.emit('GAME_UPDATE',game.gameState)
//     })

//     socket.on('FOLD', (data) => {
//       game.addFolded(data.pid)
//       io.emit('GAME_UPDATE',game.gameState)
//     })


  });

 


  function nextState() {
    game.gameState.incrementState();
    sendUpdate();
    playGame();
  }

  function bettingRound(startIndex) {
    let curIndex = startIndex;
    let endIndex = startIndex
    let waitingFlag = false;
    let game = game.gameState;

    do {
      if(!waitingFlag) {
        if( !game.isFolded(game.players[curIndex]) && game.players[curIndex].length) {
          socket.emit('LOG');
          waitingFlag = true;
        } else {
          curIndex = (endIndex + 1) % game.players.length;
        }
      }
    } while(curIndex !== endIndex)

    socket.on('Call', (data) => {
      game.makeBet(game.players[curIndex], amount)
      curIndex = (endIndex + 1) % game.players.length;
      waitingFlag = false;
    })

    socket.on('Bet', (amount) => {
      endIndex = curIndex;
      game.makeBet(game.players[curIndex], amount)
      curIndex = (endIndex + 1) % game.players.length;
      waitingFlag = false;
    })

    socket.on('Fold', (data) => {
      game.addFolded(game.players[curIndex])
      curIndex = (endIndex + 1) % game.players.length;
      waitingFlag = false;
    })

    playGame();
  }

  let countdown;
  function playGame(){
    switch( game.gameState.state ) {
      // A sort of limbo where the host waits for at least two players
      case 0:
        //Wait for all ready or Force start

        // // If there are at least two players in the game, start a game in 10 seconds
        if(game.gameState.players.length >= 1 && !countdown) {
          countdown = setTimeout( () => {
            game.gameState.newDealer;
            game.gameState.incrementState();
            sendUpdate();
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
          sendUpdate();
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
          sendUpdate();
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
        let hands = game.gameState.players.map( x => x.hand)
        hands = hands.filter( x => !!x.length )
        hands = hands.map( x => x.concat(game.gameState.spread));
        const winnerArr = game.getWinner(hands);
        game.gameState.winner = winnerArr;
        nextState()
        break;

      // Funds allocated
      case 10:
        countdown = setTimeout( () => {
          game.gameState.reset
          game.gameState.incrementState();
          sendUpdate();
          countdown = null;
          playGame();
        }, 10000 );
        break;
    }

  }

}

module.exports = SocketHandler;
