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
  deepCopy() {
    return copyBoard(this.grid);
  }

  // Returns the grid with coordinate labels.
  labeled() {
    return getLabels(this.grid);
  }

  new() {
    return generateBoard(this.size);
  }



}

module.exports = Grid;