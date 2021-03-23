const Grid = require("./grid");
const {
  getMap,
  getLabels,
  boardToStr
} = require("../helpers");

class Map extends Grid {

  constructor(size, grid) {
    super(size, grid);
  }

  // Returns a visualized map.
  visual() {
    return getMap(this.grid);
  }

  // Returns a string representation of the map.
  show() {
    return boardToStr(getLabels(getMap(this.grid)));
  }
  
}

module.exports = Map;