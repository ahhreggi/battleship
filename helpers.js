/**
 * A player sees two boards: their own and a map of their opponent's
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
 * Given a player's board, returns a new board with a given coordinate value set to 0,
 * or false if the existing value is not null (a ship has already been placed there).
 * @param  {Array.<[number|null]>} playerBoard - The player's board.
 * @param  {number} row - The row index (X coordinate).
 * @param  {number} col - The column index (Y coordinate).
 * @return {Array.<[number|null]>|boolean} - The player's resulting board or false if unchanged.
 */
const addShip = (playerBoard, row, col) => {
  if (playerBoard[row][col] !== null) {
    return false;
  }
  const newBoard = playerBoard.map(row => row.slice()); // deep clone
  newBoard[row][col] = 0;
  return newBoard;
};

/**
 * Given a player's map, returns a new board with a given coordinate set to 1 or 0 if the
 * same coordinate on the enemy's board has a value of 0 or null, respectively (hit or miss).
 * @param  {Array.<[number|null]>} playerMap - The player's map.
 * @param  {Array.<[number|null]>} enemyBoard - The enemy's board.
 * @param  {number} row - The row index (X coordinate).
 * @param  {number} col - The column index (Y coordinate).
 * @return {Array.<[number|null]>|boolean} - The player's resulting map or false if unchanged.
 */
const attackingMap = (playerMap, enemyBoard, row, col) => {

};


module.exports = {
  generateBoard,
  addShip
};