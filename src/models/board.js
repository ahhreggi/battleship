const Grid = require("./grid");
const {
  addShip,
  copyBoard,
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

  /**
   * Adds a ship at the given coordinates then returns true if successful,
   * false otherwise (if a ship has already been placed there).
   * @param  {Array.<number, number>} coordinates - The X and Y coordinates to add a ship to.
   * @return {boolean} - Whether or not the ship was added.
   */
  addShip = (coordinates) => {
    let added = true;
    const [row, col] = coordinates;
    if (this.grid[row][col] !== null) {
      added = false;
    }
    this.grid[row][col] = 0;
    return added;
  };

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