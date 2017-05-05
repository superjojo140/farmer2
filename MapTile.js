/**
 * Class representing a MapTile
 * @constructor
 * @param {number} y - Vertical Index of this Tile in the whole Map
 * @param {number} x - Horizontal Index of this Tile in the whole Map
 * @param {Texture} texture - The texture of this tile. This must be a prerendered Pixi Texture
 */
function MapTile(y, x, texture) {
    this.y = y;
    this.x = x;
    this.texture = texture;
}