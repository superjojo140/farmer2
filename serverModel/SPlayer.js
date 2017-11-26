"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class representing a Player
 * @constructor
 * @param {number} id - The id of the Players Tile
 * @param {number} x - The x Coordinate of the Players Tile
 * @param {number} y - The y Coordinate of the Players Tile
 */
var SPlayer = (function () {
    function SPlayer(id, x, y) {
        if (arguments.length != 3) {
            throw "Uncorrect number of arguments for creating a new Player";
        }
        this.id = id;
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
    ;
    return SPlayer;
}());
exports.SPlayer = SPlayer;
