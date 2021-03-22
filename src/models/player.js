const Board = require("./board");
const Map = require("./map");

class Player {

  constructor(name, size) {
    this.name = name;
    this.board = Board(size);
    this.map = Map(size);
    this.moves = [];
  }
}

module.exports = Player;