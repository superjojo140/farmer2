/**
 * Class representing a Player
 * @constructor
 * @param {number} x - The x Coordinate of the Player
 * @param {number} y - The y Coordinate of the Player
 */
function Player(x, y, map) {
    this.x = x;
    this.y = y;
    this.map = map;
    var texture = PIXI.loader.resources["pics/boy_down.png"].texture;
    this.sprite = new PIXI.Sprite(texture);
}

/**
*Renders the Player on screen
*/
Player.prototype.render = function(){
    this.sprite.position = new PIXI.Point(this.x,this.y);
    this.map.renderer.render(this.sprite);
}

/**
 *Let the Player move to the next {@link MapTile}
 *@param {number} direction - The direction to move to. Directions are defined in Constants.js
 */
Player.prototype.move = function (direction) {
    switch (direction) {
    case UP:
        this.y--;
        break;
    case RIGHT:
        this.x++;
        break;
    case DOWN:
        this.y++;
        break;
    case LEFT:
        this.x--;
        break;
    }
    this.render();
};
