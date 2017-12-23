"use strict";
import { Constants } from "./Constants";

/**
 * Class representing a MapTile
 * @constructor
 * @param {number} y - Vertical Index of this Tile in the whole Map
 * @param {number} x - Horizontal Index of this Tile in the whole Map
 * @param {String} type - The type of this tile.
 */
export class ClientMapTile {
    x: number;
    y: number;
    type: string;
    texture: string;
    constructor(y: number, x: number, type: string) {
        this.y = y;
        this.x = x;
        this.texture = Constants.mapTileTextures[type];
        this.type = type;
    }

}
