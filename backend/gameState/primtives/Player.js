module.exports = class Person {
  constructor(publicKey) { //, socket) {
    this.pubKey = publicKey;
    this.hand = [];
    this.isDealer = false;
    // this.socketId = socket.id;
  }
}
