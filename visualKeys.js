/**
 * Player's map of the opponent's board (starts as null):
 *   - Unattacked tile (null) => "."
 *   - Player attack hit (1)  => "H"
 *   - Player attack miss (0) => "-"
 *
 * Player's board (starts as null with 0s for ship placements):
 *   - Unattacked tile (null) => "."
 *   - Player ship (0)        => "O"
 *   - Enemy attack hit (1)   => "X"
 *   - Enemy attack miss (-1) => "-"
 */
module.exports = {
  map: {
    default: ".",
    hit: "H",
    miss: "-"
  },
  board: {
    default: ".",
    ship: "O",
    hit: "X",
    miss: "-"
  }
};