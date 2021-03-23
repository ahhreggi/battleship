const Grid = require("./grid");
const {
  addShip,
  copyBoard,
  getBoard,
  getLabels,
  boardToStr
} = require("../helpers");

class Board extends Grid {

  constructor(size) {
    super(size);
    this.grid = this.new();
  }

  /**
   * Adds a ship at the given coordinates then returns true if successful,
   * false otherwise (if a ship has already been placed there).
   * @param  {Array.<number, number>} coordinates - The X and Y coordinates to add a ship to.
   * @return {boolean} - Whether or not the ship was added.
   */
  addShip = (coordinates) => {
    const [row, col] = coordinates;

    if (this.grid[row][col] !== null) {
      console.log("Failed to add a ship at", coordinates);
      return false;
    }
    this.grid[row][col] = 0;
    console.log("Successfully added a ship at", coordinates);
    return true;
  };

  // Returns a visualized board.
  getVisual() {
    return getBoard(this.grid);
  }

  // Returns a string representation of the board.
  toString() {
    return boardToStr(getLabels(getBoard(this.grid)));
  }

}

module.exports = Board;

const board = new Board(3)
console.log(board.grid);
const added = board.addShip([1, 1]);
console.log(board.grid);