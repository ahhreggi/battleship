const { assert } = require("chai");
const {
  generateBoard,
  copyBoard,
  addShip,
  attackingMap,
  defendingBoard,
  getMap,
  getBoard
} = require("../src/helpers");

describe("generateBoard", () => {
  it("should return an empty erray given n = 0", () => {
    const output = generateBoard(0);
    const expected = [];
    assert.deepEqual(output, expected);
  });
  it("should return an array of 3 arrays, each with 3 null values, given n = 3", () => {
    const output = generateBoard(3);
    const expected = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    assert.deepEqual(output, expected);
  });
});

describe("copyBoard", () => {
  it("should return a deep copy of a board", () => {
    const board1 = [[0, 0, 1]];
    const board2 = copyBoard(board1);
    board2[0][0] = 1;
    const expected = [[0, 0, 1]];
    assert.deepEqual(board1, expected);
  });
});

describe("addShip", () => {
  it("should add the ship if the target is null", () => {
    const board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    const output = addShip(board, [1, 1]);
    const expected = [
      [null, null, null],
      [null, 0, null],
      [null, null, null],
    ];
    assert.deepEqual(output, expected);
  });
  it("should return false if the target is 0", () => {
    const board = [
      [null, null, null],
      [null, 0, null],
      [null, null, null]
    ];
    const output = addShip(board, [1, 1]);
    assert.isFalse(output);
  });
  it("should not modify the original board when adding a ship", () => {
    const board = [[null]];
    addShip(board, [0, 0]);
    const expected = [[null]];
    assert.deepEqual(board, expected);
  });
});

describe("attackingMap", () => {
  it("should set the target to 1 if the outgoing attack hit a ship (was 0)", () => {
    const playerMap = [[null]];
    const enemyBoard = [[0]];
    const output = attackingMap(playerMap, enemyBoard, [0, 0]);
    const expected = [[1]];
    assert.deepEqual(output, expected);
  });
  it("should set the target to 0 if the outgoing attack missed (was null)", () => {
    const playerMap = [[null]];
    const enemyBoard = [[null]];
    const output = attackingMap(playerMap, enemyBoard, [0, 0]);
    const expected = [[0]];
    assert.deepEqual(output, expected);
  });
  it("should return false if the target had already been attacked (hit)", () => {
    const playerMap = [[1]];
    const enemyBoard = [[1]];
    const output = attackingMap(playerMap, enemyBoard, [0, 0]);
    assert.isFalse(output);
  });
  it("should return false if the target had already been attacked (miss)", () => {
    const playerMap = [[1]];
    const enemyBoard = [[-1]];
    const output = attackingMap(playerMap, enemyBoard, [0, 0]);
    assert.isFalse(output);
  });
});

describe("defendingBoard", () => {
  it("should set the target to 1 if the incoming attack hit a ship (was 0)", () => {
    const playerBoard = [[0]];
    const output = defendingBoard(playerBoard, [0, 0]);
    const expected = [[1]];
    assert.deepEqual(output, expected);
  });
  it("should set the target to -1 if the incoming attack missed (was null)", () => {
    const playerBoard = [[null]];
    const output = defendingBoard(playerBoard, [0, 0]);
    const expected = [[-1]];
    assert.deepEqual(output, expected);
  });
  it("should return false if the target had already been attacked (hit)", () => {
    const playerBoard = [[1]];
    const output = defendingBoard(playerBoard, [0, 0]);
    assert.isFalse(output);
  });
  it("should return false if the target had already been attacked (miss)", () => {
    const playerBoard = [[-1]];
    const output = defendingBoard(playerBoard, [0, 0]);
    assert.isFalse(output);
  });
});

describe("getMap", () => {
  it("should convert null to '.' (unattacked)", () => {
    const playerMap = [[null]];
    const output = getMap(playerMap);
    const expected = [["."]];
    assert.deepEqual(output, expected);
  });
  it("should convert 1 to 'H' (player attack hit)", () => {
    const playerMap = [[1]];
    const output = getMap(playerMap);
    const expected = [["H"]];
    assert.deepEqual(output, expected);
  });
  it("should convert 0 to '-' (player attack miss)", () => {
    const playerMap = [[0]];
    const output = getMap(playerMap);
    const expected = [["-"]];
    assert.deepEqual(output, expected);
  });
});

describe("getBoard", () => {
  it("should convert null to '.' (unattacked)", () => {
    const playerBoard = [[null]];
    const output = getBoard(playerBoard);
    const expected = [["."]];
    assert.deepEqual(output, expected);
  });
  it("should convert 0 to 'O' (ship)", () => {
    const playerBoard = [[0]];
    const output = getBoard(playerBoard);
    const expected = [["O"]];
    assert.deepEqual(output, expected);
  });
  it("should convert 1 to 'X' (enemy attack hit)", () => {
    const playerBoard = [[1]];
    const output = getBoard(playerBoard);
    const expected = [["X"]];
    assert.deepEqual(output, expected);
  });
  it("should convert -1 to '-' (enemy attack miss)", () => {
    const playerBoard = [[-1]];
    const output = getBoard(playerBoard);
    const expected = [["-"]];
    assert.deepEqual(output, expected);
  });
});