const Grid = require("./grid");
const {
  attackingMap,
  getMap,
  getLabels,
  boardToStr
} = require("../helpers");

class Map extends Grid {

  constructor(size, grid, history) {
    super(size, grid, history);
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
    this.attackLog.push(coordinates);
    this.history.push(this.grid);
    this.grid = attackingMap(this.grid, board.grid, coordinates);
    board.receiveShot(coordinates);
  }
  
}

module.exports = Map;