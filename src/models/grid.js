const {
  generateBoard,
  copyBoard,
  getLabels,
} = require("../helpers");

class Grid {

  constructor(size) {
    this.size = size;
    this.grid = this.new();
  }

  // Returns a deep copy of the grid.
  copy() {
    const copy = new Grid(this.size);
    copy.grid = copyBoard(this.grid);
    return copy;
  }

  // Returns the grid with coordinate labels.
  labeled() {
    return getLabels(this.grid);
  }

  new() {
    return generateBoard(this.size);
  }

  get() {
    return this.grid;
  }

  setValue(coordinates, value) {
    const [row, col] = coordinates;
    this.grid[row][col] = value;
  }

  getValue(coordinates) {
    const [row, col] = coordinates;
    return this.grid[row][col];
  }



}

module.exports = Grid;