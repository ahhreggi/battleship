const { 
  generateBoard,
  copyBoard,
  getLabels,
  boardToStr
} = require("./src/helpers");

class Board {
  constructor(size) {
    this.size = size
    this.grid = generateBoard(size);
  };

  // Returns a deep copy of the board.
  deepCopy() {
    return copyBoard(this.grid);
  };

  labeled() {
    return getLabels(this.grid);
  }

  toString(labels = false) {
    return boardToStr(this.grid, labels);
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