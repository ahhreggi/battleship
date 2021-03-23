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
  // Player obj, [x, y]
  attack(opponent, coordinates) {

    // If the move is invalid (previously attacked), return false
    if (!this.isValidTarget(coordinates)) return false;

    // Otherwise attack the opponent's board at the given coordinates
    const target = opponent.getBoard().getValue(coordinates);

    let hitOrMiss;
    if (target === 0) { // 0 = ship = hit
      hitOrMiss = 1;
    } else if (target === null) { // null = no ship = miss
      hitOrMiss = 0;
    }

    // Record the outcome onto the player's map
    this.map.setValue(coordinates, hitOrMiss);

    // Log the event
    const outcome = hitOrMiss ? "hit" : "miss";
    this.logEvent("attack", coordinates, outcome); // e.g. player attacked on (0, 1) and it was a miss

    // Record the outcome onto the opponent's board
    opponent.defend(coordinates, outcome);
  }

  // Returns true if the coordinates mark a tile on the map that the player is allowed to attack.
  // A player can attack a tile only if its value is null.
  isValidTarget(coordinates) {
    return this.map.getValue(coordinates) === null;
  }

  // Registers an incoming attack.
  defend(coordinates, outcome) {

    // This method always execute only if an attack was confirmed to be valid
    // The attacking player already knows if it was a hit or miss

    // Set the coordinates to 1 if hit, -1 if miss
    let newValue = outcome === "hit" ? 1 : -1;
    console.log("outcome: ", outcome);
    this.board.setValue(coordinates, newValue);

    // Log the event
    this.logEvent("defend", coordinates, outcome);
  }

  // Logs an event
  // event => attack or defend
  // coordinates => targeted coordinates
  logEvent(event, coordinates, outcome) {
    // A snapshot of the player's map and board as a result of this event
    const stage = {
      map: this.map,
      board: this.board
    };
    this.eventLog.push({ event, coordinates, stage, outcome });
  }

  addShip(coordinates) {
    const added = this.board.addShip(coordinates);
    return added;
  }

  getMap() {
    return this.map;
  }

  getBoard() {
    return this.board;
  }

  display() {
    console.log(`${this.name}'s map`);
    console.log(this.map.toString());
    console.log(`${this.name}'s board`);
    console.log(this.board.toString());
  }
  
}

module.exports = Player;

const size = 5;

const p1 = new Player("P1 Bob", size);
const p2 = new Player("P2 Ross", size);

// console.log("---P1 BOB-----------------");
p1.addShip([0, 0]);
p1.addShip([0, 1]);
p1.addShip([0, 2]);
// p1.display();
// console.log("-----------------------");

// console.log("---P2 ROSS----------------");
p2.addShip([4, 3]);
p2.addShip([4, 4]);
p2.addShip([4, 2]);
// p2.display();
// console.log("----------------------");

p2.attack(p1, [2, 2]); // p2 miss
p1.display();
p2.display();

