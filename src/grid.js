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

class Grid {
  constructor(size) {
    this.size = size;
    this.grid = generateBoard(size);
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

class Map extends Grid {

  // Returns a visualized map.
  visual() {
    return getMap(this.grid);
  }

  // Returns a string representation of the map.
  toString() {
    return boardToStr(getLabels(getMap(this.grid)));
  }
}


class Board extends Grid {

  // Adds a ship at the given coordinates.
  // coordinates = [x, y]
  addShip(coordinates) {
    this.grid = addShip(this.grid, coordinates)
  }

  // Returns a visualized map.
  visual() {
    return getBoard(this.grid);
  }

  // Returns a string representation of the board.
  toString() {
    return boardToStr(getLabels(getBoard(this.grid)));
  }
}

module.exports = { Map, Board };

const p1 = new Board(10);
p1.addShip([0, 0]); // A 0
p1.addShip([0, 1]); // A 0
p1.addShip([0, 2]); // A 0
p1.addShip([0, 3]); // A 0
p1.addShip([0, 4]); // A 0
console.log(p1.visual());