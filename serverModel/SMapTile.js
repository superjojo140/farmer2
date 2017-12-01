"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class representing a MapTile
 * @constructor
 * @param {number} y - Vertical Index of this Tile in the whole Map
 * @param {number} x - Horizontal Index of this Tile in the whole Map
 * @param {string} type - The tiles type
 */
var SMapTile = /** @class */ (function () {
    function SMapTile(y, x, type) {
        this.y = y;
        this.x = x;
        this.type = type;
    }
    return SMapTile;
}());
exports.SMapTile = SMapTile;
