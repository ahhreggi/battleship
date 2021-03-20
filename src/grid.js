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

  constructor() {
    this.attackLog = [];
  }

  // Returns a visualized map.
  visual() {
    return getMap(this.grid);
  }

  // Returns a string representation of the map.
  show() {
    return boardToStr(getLabels(getMap(this.grid)));
  }

  // Registers an outgoing attack.
  sendShot(board, coordinates) {
    this.grid = attackingMap(this.grid, board.grid, coordinates);
    this.attackLog.push(coordinates);
  }
  
}


class Board extends Grid {

  constructor() {
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
    this.grid = defendingBoard(this.grid, coordinates);
    this.defenseLog.push(coordinates);
  }
}

module.exports = { Map, Board };

const p1 = new Board(10);
p1.addShip([0, 0]); // A 0
p1.addShip([0, 1]); // A 0
p1.addShip([0, 2]); // A 0
p1.addShip([0, 3]); // A 0
p1.addShip([0, 4]); // A 0

const m1 = new Map(10);
m1.sendShot(p1, [0, 0]);
m1.sendShot(p1, [0, 1]);
m1.sendShot(p1, [1, 2]);

console.log(m1.show());