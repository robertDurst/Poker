const Player = require('../primitives/Player')
const Hand = require('../primitives/Hand');
const Round = require('../primitives/Round');
function output(err,data) {
  if (data) {
    return {
      success: !err,
      error: err,
      data: data
    }
  }
  return {
    success: !err,
    error: err
  }
}


//Add Player
//Adds player to state object and order
function addPlayer(id) {
  this.players[id] = new Player(id)
  this.order.push(id);
  return output(null)
}
//MakeHost
//Change current host to be ID
function makeHost(id) {
  if (this.host) {
    const oldHostID = this.host;
    this.players[oldHostID].isHost = false;
  }
  this.host = id;
  this.players[id].isHost = true;
  return output(null)
}
//Remove Player
//Remove Player from state and order
function removePlayer(id) {
  delete this.players[id]
  this.order.splice(this.order.indexOf(id), 1);
  if (this.hand) {
    this.order.splice(this.hand.order.indexOf(id), 1);
  }
  if (this.host === id) {
    this.host = undefined;
  }
  return output(null)
}
//Start Hand
//Starts new Hand with all present Players
//Deals cards to players
function startHand() {
  this.hand = new Hand();
  this.isActive = true;
  this.bets = {};
  const dealerID = this.order[this.numGames % this.order.length];
  this.hand.dealer = dealerID;
  this.hand.order = this.order;
  this.order.forEach((id) => {
    this.players[id].hand = this.hand.deck.cards.splice(0, 2)
    this.players[id].isFolded = false;
    this.players[id].isDealer = id === dealerID;
  })
  return output(null)
}
//Advance State
//Move from table set to table set
function nextHandState(cb) {
  if (this.hand.state === 0) {
    this.hand.spread = this.hand.deck.cards.slice(-3);
    this.hand.deck.cards = this.hand.deck.cards.slice(0, -3);
    this.hand.state++
  } else if (this.hand.state < 3) {
    this.hand.spread.push(this.hand.deck.cards.slice(-1))
    this.hand.deck.cards = this.hand.deck.cards.slice(0, -1)
    this.hand.state++
  } else {
    // TODO: RESET AND RESOLVE
  }
  cb()
  return output(null)
}
//Start Round (betting round)
//Initialize the betting round with correct information
function startRound(cb) {
  this.round = new Round();
  this.round.origin = this.hand.order[0];
  this.round.active = this.hand.order[0];
  this.round.minAction = this.hand.order.length;
  this.round.callback = cb
  if (!this.bets) {
    this.bets = {}
  }
  this.bets[this.hand.state] = {};
  this.hand.order.forEach((id) => {
    this.bets[this.hand.state][id] = 0
  })
  return output(null)
}
//Advance order
//Change HAND order by rotating game.hand.order.
//Returns new next player
function advanceOrder() {
  const activePlayerID = this.hand.order[0];
  this.hand.order = [
    ...this.hand.order.slice(1),
    activePlayerID
  ]
  return this.hand.order[0]
}

//Bet
//If player active make bet for player and change round state
//Callback function on new ID
function bet(id, cb, amount) {
  //Active Check
  if (this.round.active !== id) {
    return output('Not active player')
  }
  //Make sure new bet does not reduce player balance to zero or negative
  if (this.players[id].balance - amount <= 0) {
    return output('Insufficient funds')
  }
  //Make sure new bet surpasses current largest bet
  const playerBet = amount + this.bets[this.hand.state][id];
  if (playerBet <= this.largestBet) {
    return output('Does not exceed current largest bet')
  }
  //Raise Player's hand bet
  this.bets[this.hand.state][id] = playerBet
  //Raise Round's largest bet
  this.largestBet = playerBet;
  //Raise Round pot value
  this.round.pot += amount;
  //Change the terminating player id for the Round
  this.round.origin = id;
  //Order change
  this.round.actionCount++;
  const newActive = this.advanceOrder();
  this.round.active = newActive;
  cb(newActive)
  const roundOver = this.roundEndCheck()
  if (roundOver) {
    this.resolveRound()
  } else {
    return output(null)
  }
}
//Call
//If player active call for player and change round state
//Callback on new ID
function call(id, cb) {
  //Active Check
  if (this.round.active !== id) {
    return output('Not active player')
  }
  //Raise playerbet if necessary
  const playerBet = this.bets[this.hand.state][id];
  const callAmount = this.largestBet - playerBet;
  //If passive bet made by call
  if (playerBet < this.largestBet) {
    this.bets[this.hand.state][id] = this.largestBet
    this.round.pot += callAmount;
  }
  //Order change
  this.round.actionCount++
  const newActive = this.advanceOrder();
  this.round.active = newActive;
  cb(newActive)
  const roundOver = this.roundEndCheck()
  if (roundOver) {
    this.resolveRound()
  } else {
    return output(null)
  }
}
//Fold
//If player active fold for player and change round state
//callback on new ID
function fold(id, cb) {
  //Check if player is active player
  if (this.round.active !== id) {
    return output('Not active player')
  }
  //Cut size of order down by one
  this.hand.order = this.hand.order.slice(1);
  //Order change
  this.round.actionCount++
  const newActive = this.hand.order[0]
  this.round.active = newActive;
  cb(newActive)
  return output(null)
  const roundOver = this.roundEndCheck()
  if (roundOver) {
    this.resolveRound()
  } else {
    return output(null)
  }
}
//Check if Round Over
//To be called after every successful play to check if round is over
//Returns true if round is over
function roundEndCheck() {
  const actionCountCheck = this.round.minAction <= this.round.actionCount;
  const playerCheck = this.round.active === this.round.origin;
  const betMap = this.hand.order.map((id) => {
    return this.bets[this.hand.state][id]
  })
  let bet1 = betMap[0];
  let betCheck = betMap.every( (bet) => {
    return bet === bet1
  })
  return playerCheck && betCheck && actionCountCheck
}
//Resolve Betting round
//Ends round, updates Hand, has callback
function resolveRound() {
  if (!this.roundEndCheck()) {
    return output('Round not over yet')
  }
  this.round.callback()
  this.hand.pot += this.round.pot;
  this.round.isBetting = false;
}

module.exports = {
  //Game Maintenance
  addPlayer,
  removePlayer,
  makeHost,
  startHand,
  //Hand Maintenance
  nextHandState,
  startRound,
  resolveRound,
  //Round Maintenance
  bet,
  call,
  fold,
  advanceOrder,
  roundEndCheck,
}
