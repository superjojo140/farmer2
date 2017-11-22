"use strict";


/**
 * Class representing a Map
 * @constructor
 * @param {number} height - Number of the tiles vertical
 * @param {number} width - Number of the tiles horizontal
 * @param {number} tileHeight -Vertical pixels per unique Tile
 * @param {number} tileWidth - Horizontal pixels per unique tile
 * @param {Array.Array.MapTile} tiles - a two dimensional Array with all MapTiles
 */
function SMap(height, width, tileHeight, tileWidth, tiles) {
     if (arguments.length != 5){
        throw "Uncorrect number of arguments for creating a new Map";
    }
    this.width = width;
    this.height = height;
    this.tileHeight = tileHeight;
    this.tileWidth = tileWidth;
    this.tiles = tiles;
}

module.exports = SMap;