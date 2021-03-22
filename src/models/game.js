const Player = require("./player");

/**
 * Each Game has 2 players
 * Each Player has a Map and a Board
 */
class Game {

  constructor(size, playerOneName, playerTwoName) {
    this.playerOne = new Player(playerOneName, size);
    this.playerTwo = new Player(playerTwoName, size);
  }

}

module.exports = Game;