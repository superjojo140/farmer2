"use strict";
import {SMapTile} from "./SMapTile";


/**
 * Class representing a Map
 * @constructor
 * @param {number} height - Number of the tiles vertical
 * @param {number} width - Number of the tiles horizontal
 * @param {number} tileHeight -Vertical pixels per unique Tile
 * @param {number} tileWidth - Horizontal pixels per unique tile
 * @param {Array.Array.MapTile} tiles - a two dimensional Array with all MapTiles
 */
export class SMap {
    //Properties declaration
    width: number;
    height: number;
    tileHeight: number;
    tileWidth: number;
    tiles: SMapTile[][];
    constructor(height: number, width: number, tileHeight: number, tileWidth: number, tiles: SMapTile[][]) {
        if (tiles.length != height || tiles[0].length != width) {
            throw "Height or width parameter doesn't fit to tiles array";
        }
        this.width = width;
        this.height = height;
        this.tileHeight = tileHeight;
        this.tileWidth = tileWidth;
        this.tiles = tiles;
    }
}
