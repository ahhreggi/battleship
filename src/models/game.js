const Player = require("./player");

/**
 * Each Game has 2 players
 * Each Player has a Map and a Board
 */
class Game {

  constructor(playerOneName, playerTwoName, size = 10) {
    this._size = size;
    this._playerOne = new Player(playerOneName, size);
    this._playerTwo = new Player(playerTwoName, size);
  }

  reset() {
    this._playerOne = new Player(this._playerOne.name, this.size);
    this._playerTwo = new Player(this._playerTwo.name, this.size);
  }

  get size() {
    return this._size;
  }

  get p1() {
    return this._playerOne;
  }

  get p2() {
    return this._playerTwo;
  }

  start() {
    // Pick a random player to go first
    const first = Math.floor(Math.random() * 2) ? this.p1 : this.p2;
    first.turn();
  }

  // Return the player whose turn is next
  next() {
    return this.p1.isNext() ? this.p1 : this.p2;
  }

}

module.exports = Game;

const game = new Game ("Bob", "Ross", 3);
console.log(game.p2);