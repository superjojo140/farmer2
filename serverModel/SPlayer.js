"use strict";



/**
 * Class representing a Player
 * @constructor
 * @param {number} x - The x Coordinate of the Players Tile
 * @param {number} y - The y Coordinate of the Players Tile
 * @param {world} world - The players world
 */
function SPlayer(x, y, world) {
    if (arguments.length != 3) {
        throw "Uncorrect number of arguments for creating a new Player";
    }
    this.world = world;
    this.vx = 0;
    this.vy = 0;
    this.setPosition(x, y);
}

/**
 *Set the Position of the Player
 * @param {number} x - The x Coordinate of the Players Tile
 * @param {number} y - The y Coordinate of the Players Tile
 */
SPlayer.prototype.setPosition = function (x, y) {
    this.x = x;
    this.y = y;
};

module.exports = SPlayer;
