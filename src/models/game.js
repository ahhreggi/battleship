const Player = require("./player");

/**
 * Each Game has 2 players
 * Each Player has a Map and a Board
 */
class Game {

  constructor(p1Client, p2Client) {
    this._p1Client = p1Client;
    this._p2Client = p2Client;
    this._playerOne;
    this._playerTwo;
  }

  setup() {
    // Prompt users to provide their name and game options
    // game.setup()

    // Server sends a request to both clients and waits for a response...
    // const p1Name = game.requestName(p1Client);
    // const p2Name = game.requestName(p2Client);

    // Once both have been received, set up players
    // this._playerOne = new Player(p1Client.name, size);
    // this._playerTwo = new Player(p2Client.name, size);

    // Server sends a request to both clients and waits for a response...
    // game.p1.requestShip() => repeat for # of ships
    // Check if the ship placement is valid before continuining to the next
    // While a user has ships, ask them to pick a coordinate
    // Place ship, then ship -= 1
    // Once done, signal ready and wait for the other player to be ready also

  }

  start() {

    // Pick a random player to go first and set their turn to true
    const first = Math.floor(Math.random() * 2) ? this.p1 : this.p2;
    first.turn();

  }

  reset() {
    this._playerOne = new Player(this._playerOne.name, this.size);
    this._playerTwo = new Player(this._playerTwo.name, this.size);
  }

  get size() {
    return this._size;
  }

  get p1() {
    return this._p1Client;
  }

  get p2() {
    return this._p2Client;
  }

  // Return the player whose turn is next
  next() {
    return this.p1.isNext() ? this.p1 : this.p2;
  }

}

module.exports = Game;

const game = new Game("Bob", "Ross", 3);
console.log(game.p2);