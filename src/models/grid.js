const {
  generateBoard,
  copyBoard,
  getLabels,
} = require("../helpers");

class Grid {
  constructor(size) {
    this.size = size;
    this.grid = generateBoard(size);
    this.history = [];
  }

  // Returns a deep copy of the grid.
  deepCopy() {
    return copyBoard(this.grid);
  }

  // Returns the grid with coordinate labels.
  labeled() {
    return getLabels(this.grid);
  }

}

module.exports = Grid;