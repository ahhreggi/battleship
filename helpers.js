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
 * Returns a deep copy of a board (2-dimensional array).
 * @param  {Array.<Array>} board - The nested array to clone.
 * @return {Array.<Array>} A deep clone of the nested array.
 */
const copyBoard = (board) => {
  return board.map(array => array.slice());
};

/**
 * Given a player's board, returns a new board with given coordinates value set to 0,
 * or false if the existing value is not null (a ship has already been placed there).
 * @param  {Array.<[number|null]>} playerBoard - The player's board.
 * @param  {Array.<number, number>} coords - The X and Y coordinates.
 * @return {Array.<[number|null]>|boolean} - The player's resulting board or false if unchanged.
 */
const addShip = (playerBoard, coords) => {
  const [row, col] = coords;
  if (playerBoard[row][col] !== null) {
    return false;
  }
  const newBoard = playerBoard.map(row => row.slice()); // deep clone
  newBoard[row][col] = 0;
  return newBoard;
};

/**
 * Given a player's map, returns a new board with given coordinates set to 1 or 0 if the
 * same coordinate on the enemy's board has a value of 0 or null, respectively (hit or miss).
 * Returns false if the coordinate has already been attacked.
 * @param  {Array.<[number|null]>} playerMap - The player's map.
 * @param  {Array.<[number|null]>} enemyBoard - The enemy's board.
 * @param  {Array.<number, number>} coords - The X and Y coordinates.
 * @return {Array.<[number|null]>|boolean} - The player's resulting map or false if unchanged.
 */
const attackingMap = (playerMap, enemyBoard, coords) => {
  const [row, col] = coords;
  let hitOrMiss;
  if (playerMap[row][col] === 1) { // already attacked
    return false;
  } else if (enemyBoard[row][col] === null) { // miss
    hitOrMiss = 0;
  } else { // hit
    hitOrMiss = 1;
  }
  const newMap = playerMap.map(row => row.slice());
  newMap[row][col] = hitOrMiss;
  return newMap;
};

module.exports = {
  generateBoard,
  copyBoard,
  addShip,
  attackingMap
};