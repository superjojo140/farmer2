"use strict";


/**
 * Class representing a MapTile
 * @constructor
 * @param {number} y - Vertical Index of this Tile in the whole Map
 * @param {number} x - Horizontal Index of this Tile in the whole Map
 * @param {String} texture - The path to the texture of this tile.
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
