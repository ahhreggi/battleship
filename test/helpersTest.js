const { assert } = require("chai");
const {
  generateBoard,
  addShip
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
  it("should add the ship if the current value at a coordinate is null", () => {
    const board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    const output = addShip(board, 1, 1);
    const expected = [
      [null, null, null],
      [null, 0, null],
      [null, null, null],
    ];
    assert.deepEqual(output, expected);
  });
  it("should return false if the current value at a coordinate is 0", () => {
    const board = [
      [null, null, null],
      [null, 0, null],
      [null, null, null]
    ];
    const output = addShip(board, 1, 1);
    assert.isFalse(output);
  });
  it("should not modify the original board when adding a ship", () => {
    const board = [[null]];
    const shipAdded = addShip(board, 0, 0);
    assert.notDeepEqual(board, shipAdded);
  });
});