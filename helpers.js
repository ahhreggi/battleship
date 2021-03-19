/**
 * Returns an 2-dimensional array of null values representing a board with n rows and n columns.
 * @param  {number} n
 *         The number of rows and columns.
 * @return {Array.<Array.<null>>}
 *         A 2-dimensional n * n array of null values.
 */
const generateBoard = (n) => {
  return new Array(n).fill(new Array(n).fill(null));
};

module.exports = {
  generateBoard
};