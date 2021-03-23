const Grid = require("./grid");
const {
  addShip,
  getBoard,
  getLabels,
  boardToStr
} = require("../helpers");

class Board extends Grid {

  constructor(size, grid) {
    super(size, grid);
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

}

module.exports = Board;