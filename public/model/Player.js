/**
 * Class representing a Player
 * @constructor
 * @param {number} x - The x Coordinate of the Player
 * @param {number} y - The y Coordinate of the Player
 */
function Player(x, y) {
    this.x = x;
    this.y = y;
}
/**
 *Let the Player move to the next {@link MapTile}
 *@param {number} direction - The direction to move to. Directions are defined in Constants.js
 */
Player.prototype.move = function (direction) {
    alert(direction);
};
