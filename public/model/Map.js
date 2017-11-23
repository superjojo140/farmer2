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
function Map(height, width, tileHeight, tileWidth, tiles) {
     if (arguments.length != 5){
        throw "Uncorrect number of arguments for creating a new Map";
    }
    if (tiles.length != height || tiles[0].length != width){
        throw "Height or width parameter doesn't fit to tiles array";
    }
    this.width = width;
    this.height = height;
    this.tileHeight = tileHeight;
    this.tileWidth = tileWidth;
    this.tiles = tiles;
}
/**
 *Makes a Pixi Container out of a Map
 *@return {Container} The generated Pixi Container
 */
Map.prototype.toPixiContainer = function () {
    var con = new PIXI.Container();
    for (var i = 0; i < this.height; i++) {
        for (var j = 0; j < this.width; j++) {
            var myTile = this.tiles[i][j];
            var mySprite = new PIXI.Sprite(PIXI.loader.resources["pics/"+myTile.texture].texture);
            mySprite.x = myTile.x * this.tileWidth;
            mySprite.y = myTile.y * this.tileHeight;
            con.addChild(mySprite);
        }
    }
    return con;
};

