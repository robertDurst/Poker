const gameAction = require('../utils/gameActions');

module.exports = class Game {
  constructor(roomName, url) {
    //Game Info
    this.roomName = roomName;
    this.host = undefined;
    this.hostURL = url;
    this.history = [];
    this.numGames = 0;
    this.isActive = false;
    //States
    this.hand = undefined;
    this.round = undefined;
    this.bets = undefined;
    //Player Info
    this.players = {};
    this.order = [];

    //Functions
    //Game Maintenance
    this.addPlayer = gameAction.addPlayer;
    this.removePlayer = gameAction.removePlayer;
    this.makeHost = gameAction.makeHost;
    this.startHand = gameAction.startHand;
    //Hand Maintenance
    this.nextHandState = gameAction.nextHandState;
    this.startRound = gameAction.startRound;
    this.resolveRound = gameAction.resolveRound;
    //Round Maintenance
    this.bet = gameAction.bet;
    this.call = gameAction.call;
    this.fold = gameAction.fold;
    this.advanceOrder = gameAction.advanceOrder;
    this.roundEndCheck = gameAction.roundEndCheck;
  }
}
