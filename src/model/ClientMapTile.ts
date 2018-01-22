"use strict";
import { Constants } from "./Constants";
import { ServerMapTile } from "./ServerMapTile";

/**
 * Class representing a MapTile
 * @constructor
 * @param {number} y - Vertical Index of this Tile in the whole Map
 * @param {number} x - Horizontal Index of this Tile in the whole Map
 * @param {String} type - The type of this tile.
 */
export class ClientMapTile extends ServerMapTile {
    x: number;
    y: number;
    type: string;
    texture: string;
    constructor(y: number, x: number, type: string) {
        super(y, x, type);
        this.texture = Constants.mapTileTextures[type];
    }

}
