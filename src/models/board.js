const Grid = require("./grid");
const {
  addShip,
  defendingBoard,
  getBoard,
  getLabels,
  boardToStr
} = require("../helpers");

class Board extends Grid {

  constructor(size, grid, history) {
    super(size, grid, history);
    this.defenseLog = [];
  }

  // Adds a ship at the given coordinates.
  // coordinates = [x, y]
  addShip(coordinates) {
    this.grid = addShip(this.grid, coordinates);
  }

  // Returns a visualized map.
  visual() {
    return getBoard(this.grid);
  }

  // Returns a string representation of the board.
  show() {
    return boardToStr(getLabels(getBoard(this.grid)));
  }

  // Registers incoming attack.
  receiveShot(coordinates) {
    this.defenseLog.push(coordinates);
    this.history.push(this.grid);
    this.grid = defendingBoard(this.grid, coordinates);
  }
}

module.exports = Board;