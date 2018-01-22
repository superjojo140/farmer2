"use strict";
import { ClientMapTile } from "./ClientMapTile";
import { TextureLoader } from "./TextureLoader";
import { ServerMap } from "./ServerMap";


/**
 * Class representing a Map
 * @constructor
 * @param {number} height - Number of the tiles vertical
 * @param {number} width - Number of the tiles horizontal
 * @param {number} tileHeight -Vertical pixels per unique Tile
 * @param {number} tileWidth - Horizontal pixels per unique tile
 * @param {Array.Array.ServerMapTile} tiles - a two dimensional Array with all MapTiles
 */
export class ClientMap extends ServerMap {

    heigth: number;
    width: number;
    tileHeight: number;
    tileWidth: number;
    //Override tiles type
    tiles: ClientMapTile[][];

    constructor(height: number, width: number, tileHeight: number, tileWidth: number, tiles: ClientMapTile[][]) {
        if (tiles.length != height || tiles[0].length != width) {
            throw "Height or width parameter doesn't fit to tiles array";
        }
        super(height, width, tileHeight, tileWidth, tiles);
    }


    /**
     *Makes a Pixi Container out of a Map
     *@return {Container} The generated Pixi Container
     */
    toPixiContainer(): PIXI.Container {
        var con: PIXI.Container = new PIXI.Container();
        for (var i: number = 0; i < this.height; i++) {
            for (var j: number = 0; j < this.width; j++) {
                var myTile: ClientMapTile = this.tiles[i][j];
                var mySprite: PIXI.Sprite = TextureLoader.getSprite("field1");
                mySprite.x = myTile.x * this.tileWidth;
                mySprite.y = myTile.y * this.tileHeight;
                con.addChild(mySprite);
            }
        }
        return con;
    }
}
