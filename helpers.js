/**
 * A player sees two boards: their own and a record of their opponent's
 *
 * Player's board (starts as null with 0s for ship placements):
 *    null = empty space
 *    0 = ship
 *    1 = hit ship
 *
 * Opponent's board (starts as null):
 *    null = unattacked tile
 *    0 = miss
 *    1 = hit
 */

/**
 * Returns a 2-dimensional array of null values representing a board with n rows and n columns.
 * @param  {number} n - The number of rows and columns, n >= 0.
 * @return {Array.<[null]>} A 2-dimensional n * n array of null values.
 */
const generateBoard = (n) => {
  return new Array(n).fill(new Array(n).fill(null));
};

/**
 * Returns a new board with a given coordinate value set to 0, or false if the existing value is not null.
 * @param  {Array.<[number|null]>} board - A 2-dimensional array representing a board.
 * @param  {number} row - The row index.
 * @param  {number} col - The column index.
 * @return {Array.<[null]>|boolean} - The resulting board or false if unchanged.
 */
const addShip = (board, row, col) => {
  if (board[row][col] !== null) {
    return false;
  }
  const newBoard = board.map(row => row.slice()); // deep clone
  newBoard[row][col] = 0;
  return newBoard;
};

module.exports = {
  generateBoard,
  addShip
};