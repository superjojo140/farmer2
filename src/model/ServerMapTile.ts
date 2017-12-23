"use strict";


/**
 * Class representing a MapTile
 * @constructor
 * @param {number} y - Vertical Index of this Tile in the whole Map
 * @param {number} x - Horizontal Index of this Tile in the whole Map
 * @param {string} type - The tiles type
 */
export class ServerMapTile {
    x: number;
    y: number;
    type: string;

    constructor(y: number, x: number, type: string) {
        this.y = y;
        this.x = x;
        this.type = type;
    }
}
