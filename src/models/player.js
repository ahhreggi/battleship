const { generateBoard } = require("../helpers");

class Player {
  constructor(name, boardSize) {
    this.name = name;
    this.board = generateBoard(boardSize);
    this.map = generateBoard(boardSize);
    this.moves = [];
  }
}

module.exports = Player;