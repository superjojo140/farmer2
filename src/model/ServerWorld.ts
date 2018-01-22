"use strict";

import { ServerMapTile } from "./ServerMapTile";
import { ServerPlayer } from "./ServerPlayer";
import { ServerMap } from "./ServerMap";

/**
 * Class representing a World
 * The World cares about managing the Players...
 * @constructor
 * @param {Object} mapName - The map, where the players interact
 */
export class ServerWorld {
    players: { [key: string]: ServerPlayer };
    map: ServerMap;

    constructor() {
        this.players = {};
    }

    /**
     *Add a Player to the GameObjects
     * @param {String} id - The new Player's id
     * @param {Number} x - The new Player's x coordinate
     * @param {Number} y - The new Player's y coordinate
     */
    addPlayer(id: string, x: number, y: number): void {
        var player = new ServerPlayer(id, x, y);
        this.players[id] = player;
    }

    /**
     *Remove player from the world
     * @param {String} id - The Player's id
     */
    removePlayer(id: string): void {
        var playerToDelete: ServerPlayer = this.players[id];
        //Remove reference to the player in array
        delete this.players[id];
    }

    /**
     *Returns teh Player with the specified id
     * @param {String} id - The new Player's id
     */
    getPlayer(id: string): ServerPlayer {
        return this.players[id];
    }
    /**
     *Let the world perform one step
     *moves the players etc...
     */

    loadMap(mapName: string): ServerMap {
        var mapData: any = JSON.parse(require('fs').readFileSync('./data/maps/' + mapName + '.json', 'utf8'));
        if (mapData == undefined) {
            console.log("Can't load Map File " + mapName);
        }
        var tiles: ServerMapTile[][] = [];
        //Iterate through Tiles Array
        for (var i = 0; i < mapData.height; i++) {
            tiles[i] = [];
            for (var j = 0; j < mapData.width; j++) {
                tiles[i][j] = new ServerMapTile(i, j, mapData.tiles[i][j]);
            }
        }
        //Parse JSON File
        var newMap: ServerMap = new ServerMap(mapData.height, mapData.width, mapData.tileHeight, mapData.tileWidth, tiles);
        return newMap;
    }
}
