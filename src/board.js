const {
  generateBoard,
  copyBoard,
  addShip,
  attackingMap,
  defendingBoard,
  getMap,
  getBoard,
  getLabels,
  boardToStr
} = require("./helpers");
const visualKeys = require("./visualKeys");

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

  toString() {
    return boardToStr(getLabels(getBoard(this.grid)));
  }

}

class Map extends Board {
  toString() {
    return boardToStr(getLabels(getMap(this.grid)));
  }
}

module.exports = { Board, Map };

const test = new Board(10);
console.log(test.toString());