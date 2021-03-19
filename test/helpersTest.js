const { assert } = require("chai");
const {
  generateBoard
} = require("../helpers");

describe("generateBoard", () => {
  it("should return an empty erray given n = 0", () => {
    const actual = generateBoard(0);
    const expected = [];
    assert.deepEqual(actual, expected);
  });
  it("should return an array of 3 arrays each with 3 null values given n = 3", () => {
    const actual = generateBoard(3);
    const expected = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    assert.deepEqual(actual, expected);
  });
});