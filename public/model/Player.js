/**
 * Class representing a Player
 * @constructor
 * @param {number} x - The x Coordinate of the Player
 * @param {number} y - The y Coordinate of the Player
 */
function Player(x, y, imagePath) {
    this.x = x;
    this.y = y;
    var texture = PIXI.loader.resources[imagePath].texture;
    this.sprite = new PIXI.Sprite(texture);
    this.vx = 0;
    this.vy = 0;
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
Player.prototype.setVelocity = function(vx,vy){
    this.vx = vx;
    this.vy = vy;
};
