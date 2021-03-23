const Board = require("./board");
const Map = require("./map");
const { attackingMap, defendingBoard } = require("../helpers");

class Player {

  constructor(name, size) {
    this.name = name;
    this.board = Board(size);
    this.map = Map(size);
    this.eventLog = [];
    this.eventLog = [];
  }

  // Registers an outgoing attack.
  attack(board, coordinates) {
    this.attackLog.push(coordinates);
    this.grid = attackingMap(this.grid, board.grid, coordinates);
    this.logEvent("attack", coordinates);

    board.defend(coordinates);
  }

  // Registers an incoming attack.
  defend(coordinates) {
    this.defenseLog.push(coordinates);
    this.board = defendingBoard(this.grid, coordinates);
    this.logEvent("defend", coordinates);
  }

  // Logs an event
  // event => attack or defend
  // coordinates => targeted coordinates
  logEvent(event, coordinates) {
    const stage = {
      map: this.map,
      board: this.board
    };
    this.history.push({ event, coordinates, stage });
  }
  
}

module.exports = Player;