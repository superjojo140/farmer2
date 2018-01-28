"use strict";
import { Constants } from "../../data/Constants";

/**
 * Class representing a MapTile
 * @constructor
 * @param {number} y - Vertical Index of this Tile in the whole Map
 * @param {number} x - Horizontal Index of this Tile in the whole Map
 * @param {String} type - The type of this tile and the name of the associated texture
 */
export class MapTile {
    x: number;
    y: number;
    type: string;
    constructor(y: number, x: number, type: string) {
        this.y = y;
        this.x = x;
        this.type = type;
    }

}
