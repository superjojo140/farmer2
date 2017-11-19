/**
 * Class representing a MapTile
 * @constructor
 * @param {number} y - Vertical Index of this Tile in the whole Map
 * @param {number} x - Horizontal Index of this Tile in the whole Map
 * @param {Texture} texture - The texture of this tile. This must be a prerendered Pixi Texture
 * @param {string} type - The tiles type
 * @param {Map} map - The tiles map
 */
function MapTile(y, x, texture, type, world) {
    this.y = y;
    this.x = x;
    this.texture = texture;
    this.type = type;
    this.world = world;
}
