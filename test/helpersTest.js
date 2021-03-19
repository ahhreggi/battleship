const { assert } = require("chai");
const {
  generateBoard,
  addShip,
  attackingMap
} = require("../helpers");

describe("generateBoard", () => {
  it("should return an empty erray given n = 0", () => {
    const output = generateBoard(0);
    const expected = [];
    assert.deepEqual(output, expected);
  });
  it("should return an array of 3 arrays each with 3 null values given n = 3", () => {
    const output = generateBoard(3);
    const expected = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    assert.deepEqual(output, expected);
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
  it("should set the target to 0 if the attack missed (was null)", () => {
    const map = [[null]];
    const board = [[null]];
    const output = attackingMap(map, board, [0, 0]);
    const expected = [[0]];
    assert.deepEqual(output, expected);
  });
  it("should set the target to 1 if an enemy ship was hit (was 0)", () => {
    const map = [[null]];
    const board = [[0]];
    const output = attackingMap(map, board, [0, 0]);
    const expected = [[1]];
    assert.deepEqual(output, expected);
  });
  it("should return false if the target is already 1", () => {
    const map = [[1]];
    const board = [[undefined]];
    const output = attackingMap(map, board, [0, 0]);
    assert.isFalse(output);
  });
});