const visualKeys = require("./config.json").visualKeys;

/**
 * Returns a 2-dimensional array of null values representing a board with n rows and n columns.
 * @param  {number} n - The number of rows and columns, n >= 0.
 * @return {Array.<[null]>} A 2-dimensional n * n array of null values.
 */
const generateBoard = (n) => {
  const board = [];
  for (let i = 0; i < n; i++) {
    const row = new Array(n).fill(null);
    board.push(row);
  };
  return board;
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
 * @param  {Array.<number, number>} coordinates - The X and Y coordinates to add a ship to.
 * @return {Array.<[number|null]>|boolean} - The player's resulting board or false if unchanged.
 */
const addShip = (playerBoard, coordinates) => {
  const [row, col] = coordinates;
  if (playerBoard[row][col] !== null) {
    return false;
  }
  const newBoard = copyBoard(playerBoard);
  newBoard[row][col] = 0;
  return newBoard;
};

/**
 * Given a player's map, returns a new map with given coordinates set to 1 or 0 if the
 * same coordinate on the enemy's board has a value of 0 or null, respectively (hit or miss).
 * Returns false if the coordinate had already been attacked.
 * @param  {Array.<[number|null]>} playerMap - The player's map.
 * @param  {Array.<[number|null]>} enemyBoard - The enemy's board.
 * @param  {Array.<number, number>} coordinates - The X and Y coordinates to attack.
 * @return {Array.<[number|null]>|boolean} - The player's resulting map or false if unchanged.
 */
const attackingMap = (playerMap, enemyBoard, coordinates) => {
  const [row, col] = coordinates;
  if (playerMap[row][col] === 1) return false;
  const target = enemyBoard[row][col];
  let hitOrMiss;
  if (target === 0) { // hit
    hitOrMiss = 1;
  } else if (target === null) { // miss
    hitOrMiss = 0;
  }
  const newMap = copyBoard(playerMap);
  newMap[row][col] = hitOrMiss;
  return newMap;
};

/**
 * Given a player's board, returns a new board with given coordinates set to 1 or -1 if the
 * incoming attack coordinates has a value of 0 or null, respectively (hit or miss).
 * Returns false if the coordinate had already been attacked.
 * @param  {Array.<[number|null]>} playerBoard - The player's board.
 * @param  {Array.<number, number>} coordinates - The X and Y coordinates of an incoming attack.
 * @return {Array.<[number|null]>|boolean} - The player's resulting board or false if unchanged.
 */
const defendingBoard = (playerBoard, coordinates) => {
  const [row, col] = coordinates;
  const target = playerBoard[row][col];
  if (target === 1 || target === -1) return false;
  let hitOrMiss;
  if (target === 0) {
    hitOrMiss = 1;
  } else if (target === null) {
    hitOrMiss = -1;
  }
  const newBoard = copyBoard(playerBoard);
  newBoard[row][col] = hitOrMiss;
  return newBoard;
};

/**
 * Given a player's map, returns a new map with values replaced by strings representing the
 * visual states of each tile.
 *   - Unattacked tile (null) => "."
 *   - Player attack hit (1)  => "H"
 *   - Player attack miss (0) => "-"
 * @param  {Array.<[number|null]>} playerMap - The player's map.
 * @param  {Object.<string>} mapKey - An object containing characters to represent map tile states.
 * @return {Array.<[string]>} - The resulting visual map.
 */
const getMap = (playerMap, mapKey = visualKeys.map) => {
  const visualMap = copyBoard(playerMap);
  for (let row = 0; row < visualMap.length; row++) {
    for (let col = 0; col < visualMap[row].length; col++) {
      let current = visualMap[row][col];
      if (current === null) {
        visualMap[row][col] = mapKey.default;
      } else if (current === 1) {
        visualMap[row][col] = mapKey.hit;
      } else if (current === 0) {
        visualMap[row][col] = mapKey.miss;
      }
    }
  }
  return visualMap;
};

/**
 * Given a player's board, returns a new board with values replaced by strings representing the
 * visual states of each tile.
 *   - Unattacked tile (null) => "."
 *   - Player ship (0)        => "O"
 *   - Enemy attack hit (1)   => "X"
 *   - Enemy attack miss (-1) => "-"
 * @param  {Array.<[number|null]>} playerBoard - The player's board.
 * @param  {Object.<string>} boardKey - An object containing characters to represent board tile states.
 * @return {Array.<[string]>} - The resulting visual board.
 */
const getBoard = (playerBoard, boardKey = visualKeys.board) => {
  const visualBoard = copyBoard(playerBoard);
  for (let row = 0; row < visualBoard.length; row++) {
    for (let col = 0; col < visualBoard[row].length; col++) {
      let current = visualBoard[row][col];
      if (current === null) {
        visualBoard[row][col] = boardKey.default;
      } else if (current === 0) {
        visualBoard[row][col] = boardKey.ship;
      } else if (current === 1) {
        visualBoard[row][col] = boardKey.hit;
      } else {
        visualBoard[row][col] = boardKey.miss;
      }
    }
  }
  return visualBoard;
};

/**
 * Given a board, returns a new board with an extra row and column
 * containing row (letter) and column (number) values.
 * @param  {Array.<[number|null]>} board - The player's map or board.
 * @return {Array.<[string|number|null]>} - The map or board with coordinates.
 */
const getLabels = (board) => {
  const newBoard = copyBoard(board);
  const length = newBoard.length;
  // Add number labels ("0", "1", "2", ...)
  const numberLabels = [" "];
  for (let col = 0; col < length; col++) {
    numberLabels.push(col.toString());
  }
  newBoard.unshift(numberLabels);
  // Add letter labels ("A", "B", "C", ...)
  for (let row = 1; row <= length; row++) {
    newBoard[row].unshift(String.fromCharCode(row + 64));
  }
  return newBoard;
};

/** Returns a string representation of a board.
  * @param {Array.<[string|number|null]>} board - The player's map or board.
  * @param {string} - The resulting string representation.
  */
const boardToStr = (board) => {
  let labels = false;
  if (board[0][0] === " ") {
    labels = true;
  }
  let str = "";
  for (const row of board) {
    str += `${row.join("")}\n`;
  }
  return (labels ? " " : "") + str.trim();
};

module.exports = {
  generateBoard,
  copyBoard,
  addShip,
  attackingMap,
  defendingBoard,
  getMap,
  getBoard,
  getLabels,
  boardToStr
};