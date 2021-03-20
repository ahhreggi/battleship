const {
  generateBoard,
  copyBoard,
  getLabels
} = require("./src/helpers");

class Board {
  constructor(size) {
    this.size = size;
    this.grid = generateBoard(size);
  }

  // Returns a deep copy of the board.
  deepCopy() {
    return copyBoard(this.grid);
  }

  labeled() {
    return getLabels(this.grid);
  }

}


class Player {
  constructor(name, boardSize) {
    this.name = name;
    this.board = generateBoard(boardSize);
    this.map = generateBoard(boardSize);
    this.moves = [];
  }
}

module.exports = Player;