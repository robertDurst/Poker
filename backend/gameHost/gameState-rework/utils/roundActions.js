const Player = require('../primitives/Player')
const Hand = require('../primitives/Hand');
//Bet
//If player active make bet for player and change round state
function bet(id, cb, data) {
  if (this.active !== id) {return}
  this.active = this.
}
//Call
//If player active call for player and change round state
function call(id, cb) {

}
//Fold
//If player active fold for player and change round state
function fold(id, cb) {

}

module.exports = {
  bet,
  call,
  fold,
  advanceOrder,
}
