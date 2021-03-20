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
    const board = getBoard(getLabels(this.grid))
    return boardToStr(board);
  }

}

class Map extends Board {
  toString() {
    return boardToStr(getLabels(getMap(this.grid)))
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

const test = new Map(10);
console.log(test.toString());