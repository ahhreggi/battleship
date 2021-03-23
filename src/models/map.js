const Grid = require("./grid");
const {
  getMap,
  getLabels,
  boardToStr
} = require("../helpers");

class Map extends Grid {

  constructor(size) {
    super(size);
    this.grid = this.new();
  }

  // Returns a visualized map.
  getVisual() {
    return getMap(this.grid);
  }

  // Returns a string representation of the map.
  toString() {
    return boardToStr(getLabels(getMap(this.grid)));
  }
  
}

module.exports = Map;