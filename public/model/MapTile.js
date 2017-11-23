"use strict";


/**
 * Class representing a MapTile
 * @constructor
 * @param {number} y - Vertical Index of this Tile in the whole Map
 * @param {number} x - Horizontal Index of this Tile in the whole Map
 * @param {String} type - The type of this tile.
 */
function MapTile(y, x,type) {
     if (arguments.length != 3){
        throw "Uncorrect number of arguments for creating a new World";
    }
    this.y = y;
    this.x = x;
    this.texture = mapTileTextures[type];
    this.type = type;
}
