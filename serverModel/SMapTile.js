"use strict";


/**
 * Class representing a MapTile
 * @constructor
 * @param {number} y - Vertical Index of this Tile in the whole Map
 * @param {number} x - Horizontal Index of this Tile in the whole Map
 * @param {string} type - The tiles type
 * @param {Map} map - The tiles map
 */
function SMapTile(y, x, type) {
     if (arguments.length != 3){
        throw "Uncorrect number of arguments for creating a new SMapTile";
    }
    this.y = y;
    this.x = x;
    this.type = type;
}

module.exports = SMapTile;
