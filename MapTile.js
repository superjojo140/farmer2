/**
 * Class representing a MapTile
 * @constructor
 * @param {number} y - Vertical Index of this Tile in the whole Map
 * @param {number} x - Horizontal Index of this Tile in the whole Map
 * @param {number} height - Number of the pixels vertical
 * @param {number} width - Number of the pixels horizontal
 * @param {Texture} texture - The texture of this tile. This must be a prerendered Pixi Texture
 */
function MapTile(y, x, height, width, texture) {
    this.y = y;
    this.x = x;
    this.width = width;
    this.height = height;
    this.texture = texture;
}