const { assert } = require("chai");
const visualKeys = require("../src/config.json").visualKeys;
const Board = require("../src/models/board");
const Map = require("../src/models/map");
const {
  generateBoard,
  copyBoard,
  addShip,
  attackingMap,
  defendingBoard,
  getMap,
  getBoard,
  getLabels,
  boardToStr
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
  it("should not modify the original board", () => {
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
  it("should not modify the original player map", () => {
    const playerMap = [[null]];
    const enemyBoard = [[null]];
    attackingMap(playerMap, enemyBoard, [0, 0]);
    const expected = [[null]];
    assert.deepEqual(playerMap, expected);
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
  it("should not modify the original player board", () => {
    const playerBoard = [[null]];
    defendingBoard(playerBoard, [0, 0]);
    const expected = [[null]];
    assert.deepEqual(playerBoard, expected);
  });
});

describe("getMap", () => {
  const key = visualKeys.map;
  it(`should convert null to ${key.default} (unattacked)`, () => {
    const playerMap = [
      [null, null],
      [null, null]
    ];
    const output = getMap(playerMap);
    const expected = [
      [key.default, key.default],
      [key.default, key.default]
    ];
    assert.deepEqual(output, expected);
  });
  it(`should convert 1 to ${key.hit} (player attack hit)`, () => {
    const playerMap = [[1]];
    const output = getMap(playerMap);
    const expected = [[key.hit]];
    assert.deepEqual(output, expected);
  });
  it(`should convert 0 to ${key.miss} (player attack miss)`, () => {
    const playerMap = [[0]];
    const output = getMap(playerMap);
    const expected = [[key.miss]];
    assert.deepEqual(output, expected);
  });
  it(`should not modify the original player map`, () => {
    const playerMap = [[null]];
    getMap(playerMap);
    const expected = [[null]];
    assert.deepEqual(playerMap, expected);
  });
});

describe("getBoard", () => {
  const key = visualKeys.board;
  it(`should convert null to ${key.default} (unattacked)`, () => {
    const playerBoard = [
      [null, null],
      [null, null]
    ];
    const output = getBoard(playerBoard);
    const expected = [
      [key.default, key.default],
      [key.default, key.default]
    ];
    assert.deepEqual(output, expected);
  });
  it(`should convert 0 to ${key.ship} (ship)`, () => {
    const playerBoard = [[0]];
    const output = getBoard(playerBoard);
    const expected = [[key.ship]];
    assert.deepEqual(output, expected);
  });
  it(`should convert 1 to ${key.hit} (enemy attack hit)`, () => {
    const playerBoard = [[1]];
    const output = getBoard(playerBoard);
    const expected = [[key.hit]];
    assert.deepEqual(output, expected);
  });
  it(`should convert -1 to ${key.miss} (enemy attack miss)`, () => {
    const playerBoard = [[-1]];
    const output = getBoard(playerBoard);
    const expected = [[key.miss]];
    assert.deepEqual(output, expected);
  });
  it("should not modify the original player board", () => {
    const playerBoard = [[null]];
    getBoard(playerBoard);
    const expected = [[null]];
    assert.deepEqual(playerBoard, expected);
  });
});

describe("getLabels", () => {
  it("should return a 3x3 board given a 2x2 board", () => {
    const board = [
      [null, null],
      [null, null]
    ];
    const output = getLabels(board);
    const numRows = output.length;
    const numCols = output[0].length;
    const expectedRows = board.length + 1;
    const expectedCols = board[0].length + 1;
    assert.deepEqual([numRows, numCols], [expectedRows, expectedCols]);
  });
  it("should return a board with letters for each row and numbers for each column, except at (0, 0) which should be ' '", () => {
    const board = [
      [".", "."],
      [".", "."]
    ];
    const output = getLabels(board);
    const expected = [
      [" ", "0", "1"],
      ["A", ".", "."],
      ["B", ".", "."],
    ];
    assert.deepEqual(output, expected);
  });
});

describe("boardToStr", () => {
  it("should return the correct string representation of a board", () => {
    const board = [
      [".", "."],
      [".", "."],
    ];
    const output = boardToStr(board);
    const expected = "..\n..";
    assert.equal(output, expected);
  });
});