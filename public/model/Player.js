"use strict";



/**
 * Class representing a Player
 * @constructor
 * @param {number} x - The x Coordinate of the Players Tile
 * @param {number} y - The y Coordinate of the Players Tile
 * @param {World} world - The world
 */
function Player(x, y,world) {
    if (arguments.length != 3) {
        throw "Uncorrect number of arguments for creating a new Player";
    }
    this.world = world;
    var texture = PIXI.loader.resources["pics/boy_down.png"].texture;
    this.sprite = new PIXI.Sprite(texture);
    this.vx = 0;
    this.vy = 0;
    this.setPosition(x, y);
}

/**
 *Let the Player move in direction to it's Position.
 */
Player.prototype.move = function (direction) {
    var tileWidth = this.world.map.tileWidth;
    var tileHeight = this.world.map.tileHeight;
    //Calculation PLAYER_SPEED to avoid flackering, if the could never reach exactly its Position because of the PLAYER_SPEED
    if(this.x * tileWidth >= this.sprite.x + PLAYER_SPEED){
        this.sprite.x+=PLAYER_SPEED;
    }
    else if(this.x * tileWidth <= this.sprite.x - PLAYER_SPEED){
        this.sprite.x-=PLAYER_SPEED;
    }
    
      if(this.y * tileHeight >= this.sprite.y + PLAYER_SPEED){
        this.sprite.y+=PLAYER_SPEED;
    }
    else if(this.y * tileHeight <= this.sprite.y - PLAYER_SPEED){
        this.sprite.y-=PLAYER_SPEED;
    }
};

/**
 *Set the Velocity of the Player
 */
Player.prototype.setVelocity = function (vx, vy) {
    this.vx = vx;
    this.vy = vy;
};

/**
 *Set the Position of the Player
 * @param {number} x - The x Coordinate of the Players Tile
 * @param {number} y - The y Coordinate of the Players Tile
 */
Player.prototype.setPosition = function (x, y) {
    this.x = x;
    this.y = y;
    var tileWidth = this.world.map.tileWidth;
    var tileHeight = this.world.map.tileHeight;
    this.sprite.x = x * tileWidth;
    this.sprite.y = y * tileHeight;
};

/**
 *Set the Position of the Player and Animates a Transition
 * @param {number} x - The x Coordinate of the Players Tile
 * @param {number} y - The y Coordinate of the Players Tile
 */
Player.prototype.goToPosition = function (x, y) {
    this.x = x;
    this.y = y;
};
