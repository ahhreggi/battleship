/**
 * Returns an 2-dimensional array of null values representing a board with n rows and n columns.
 * @param  {number} n
 *         The number of rows and columns, n >= 0.
 * @return {Array.<[null]>}
 *         A 2-dimensional n * n array of null values.
 */
const generateBoard = (n) => {
  return new Array(n).fill(new Array(n).fill(null));
};

/**
 * Returns a board with a given coordinate value set to 1, or false if the existing value is not null.
 * @param  {Array.<[number|null]>} board
 *         A 2-dimensional array representing a board.
 * @param  {number} row
 *         The row index.
 * @param  {number} col
 *         The column index.
 * @return {Array.<[null]>|boolean}
 *         The resulting board or false if unchanged.
 */
const addShip = (board, row, col) => {
  if (board[row][col] !== null) {
    return false
  } else {
    board[row][col] = 1;
    return board
  };
};

module.exports = {
  generateBoard,
  addShip
};