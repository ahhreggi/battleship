const Board = require("./board");
const Map = require("./map");
const { attackingMap, defendingBoard } = require("../helpers");

class Player {

  constructor(name, size) {
    this.name = name;
    this.board = new Board(size);
    this.map = new Map(size);
    this.history = [];
  }

  // Registers an outgoing attack.
  // Player obj, [x, y]
  attack(opponent, coordinates) {

    // If the move is invalid (previously attacked), return false
    if (!this.isValidTarget(coordinates)) return false;

    // Otherwise attack the opponent's board at the given coordinates
    const [row, col] = coordinates;

    const target = opponent.getBoard()[row][col];

    let hitOrMiss;
    if (target === 0) { // hit
      hitOrMiss = 1;
    } else if (target === null) { // miss
      hitOrMiss = 0;
    }
    const newMap = copyBoard(playerMap);
    newMap[row][col] = hitOrMiss;
    return newMap;
    // Returns a grid on successful execution, or false if invalid move 
    const result = attackingMap(this.map.get(), opponent.getBoard(), coordinates);
    const outcome = result ? "hit" : "miss";
    if (outcome) {
      this.map.set()
    }
    this.log("attack", coordinates);
    opponent.defend(coordinates);
  }

  // Returns true if the coordinates mark a tile on the map that the player is allowed to attack.
  // A player can attack a tile only if its value is null.
  isValidTarget(coordinates) {
    const [row, col] = coordinates;
    return this.map.get()[row][col] === null;
  };

  // Registers an incoming attack.
  defend(coordinates) {
    const result = defendingBoard(this.grid, coordinates);
    const outcome = result ? "hit" : "miss";
    this.board.grid = result ? result : this.board.grid;
    this.log("defend", coordinates, outcome);
  };

  // Logs an event
  // event => attack or defend
  // coordinates => targeted coordinates
  log(event, coordinates, outcome) {
    const stage = {
      map: this.map,
      board: this.board
    };
    this.history.push({ event, coordinates, stage, outcome });
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

  getMap() {
    return this.map.get();
  };

  getBoard() {
    return this.board.get();
  };
  
}

module.exports = Player;

const size = 5;

const p1 = new Player("Bob", size);
const p2 = new Player("Ross", size);

console.log("---BOB-----------------");
p1.addShip([0, 0]);
p1.addShip([0, 1]);
p1.addShip([0, 2]);
console.log(p1.getBoard());
console.log("-----------------------");

console.log("---ROSS----------------");
p2.addShip([4, 3]);
p2.addShip([4, 4]);
p2.addShip([4, 2]);
console.log(p2.getBoard());
console.log("----------------------");

p1.attack()