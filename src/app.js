const Map = require("./models/map");
const Board = require("./models/board");

const p1board = new Board(10);
p1board.addShip([0, 0]);
p1board.addShip([0, 1]);
p1board.addShip([0, 2]);
p1board.addShip([0, 3]);
p1board.addShip([0, 4]);

const p2map = new Map(10);
p2map.sendShot(p1board, [0, 0]);
p2map.sendShot(p1board, [0, 1]);
p2map.sendShot(p1board, [1, 2]);
p2map.sendShot(p1board, [1, 6]);

console.log("Attacker's MAP\n");
console.log(p2map.show());
console.log("\nDefender's BOARD\n");
console.log(p1board.show());