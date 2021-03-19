/**
 * Returns an empty n * n board.
 * @param  {number} n
 *         The number of rows and columns.
 * @return {Array.<Array.<null>>}
 *         A 2-dimensional array of null values representing n rows and n columns.
 */
const generateBoard = (n) => {
  return new Array(n).fill(new Array(n).fill(null));
};

module.exports = {
  generateBoard
};