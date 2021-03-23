const Board = require("./board");
const Map = require("./map");
const { attackingMap, defendingBoard } = require("../helpers");

class Player {

  constructor(name, size) {
    this.name = name;
    this.board = new Board(size);
    this.map = new Map(size);
    this.eventLog = [];
  }

  // Registers an outgoing attack.
  attack(board, coordinates) {
    this.attackLog.push(coordinates);
    this.grid = attackingMap(this.grid, board.grid, coordinates);
    this.log("attack", coordinates);

    board.defend(coordinates);
  }

  // Registers an incoming attack.
  defend(coordinates) {
    this.defenseLog.push(coordinates);
    this.board = defendingBoard(this.grid, coordinates);
    this.log("defend", coordinates);
  }

  // Logs an event
  // event => attack or defend
  // coordinates => targeted coordinates
  log(event, coordinates) {
    const stage = {
      map: this.map,
      board: this.board
    };
    this.history.push({ event, coordinates, stage });
  }

  addShip(coordinates) {
    const added = this.board.addShip(coordinates);
    if (added) {
      console.log(`${this.name} successfully added a ship to ${coordinates}`);
    } else {
      console.log(`${this.name} failed to a ship to ${coordinates}`);
    }
    return added;
  }
  
}

module.exports = Player;

const size = 5;

const p1 = new Player("Bob", size);
const p2 = new Player("Ross", size);

p1.addShip([0, 0]);
p1.addShip([0, 1]);
p1.addShip([0, 2]);
p1.addShip([0, 2]);