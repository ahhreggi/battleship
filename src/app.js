const Player = require("./models/player");
const Map = require("./models/map");
const Board = require("./models/board");


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