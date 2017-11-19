"use strict";



/**
 * Class representing a Player
 * @constructor
 * @param {number} x - The x Coordinate of the Player
 * @param {number} y - The y Coordinate of the Player
 * @param {String} imagePath - The imagePath of the Players texture
 * @param {world} world - The players world
 */
function Player(x, y, imagePath, world) {
     if (arguments.length != 4){
        throw "Uncorrect number of arguments for creating a new Player";
    }
    this.x = x;
    this.y = y;
    var texture = PIXI.loader.resources[imagePath].texture;
    this.sprite = new PIXI.Sprite(texture);
    this.vx = 0;
    this.vy = 0;
    this.world = world;
}

/**
 *Let the Player move with it's Speed
 */
Player.prototype.move = function (direction) {
    this.sprite.x += this.vx;
    this.sprite.y += this.vy;
};

/**
 *Set the Velocity of the Player
 */
Player.prototype.setVelocity = function (vx, vy) {
    this.vx = vx;
    this.vy = vy;
};
