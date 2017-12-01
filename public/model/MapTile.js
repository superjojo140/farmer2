"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = require("./Constants");
/**
 * Class representing a MapTile
 * @constructor
 * @param {number} y - Vertical Index of this Tile in the whole Map
 * @param {number} x - Horizontal Index of this Tile in the whole Map
 * @param {String} type - The type of this tile.
 */
var MapTile = /** @class */ (function () {
    function MapTile(y, x, type) {
        this.y = y;
        this.x = x;
        this.texture = Constants_1.Constants.mapTileTextures[type];
        this.type = type;
    }
    return MapTile;
}());
exports.MapTile = MapTile;
