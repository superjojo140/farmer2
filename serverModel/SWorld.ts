"use strict";

import { SMapTile } from "./SMapTile";
import { SPlayer } from "./SPlayer";
import { SMap } from "./SMap";

/**
 * Class representing a World
 * The World cares about managing the Players...
 * @constructor
 * @param {Object} mapName - The map, where the players interact
 */
export class SWorld {
    players: { [key: string]: SPlayer };
    map: SMap;

    constructor(mapName: string) {
        this.players = {};
        this.map = this.loadMap(mapName);
    }

    /**
     *Add a Player to the GameObjects
     * @param {String} id - The new Player's id
     * @param {Number} x - The new Player's x coordinate
     * @param {Number} y - The new Player's y coordinate
     */
    addPlayer(id: string, x: number, y: number): void {
        var player = new SPlayer(id, x, y);
        this.players[id] = player;
    }

    /**
     *Remove player from the world
     * @param {String} id - The Player's id
     */
    removePlayer(id: string): void {
        var playerToDelete: SPlayer = this.players[id];
        //Remove reference to the player in array
        delete this.players[id];
    }

    /**
     *Returns teh Player with the specified id
     * @param {String} id - The new Player's id
     */
    getPlayer(id: string): SPlayer {
        return this.players[id];
    }
    /**
     *Let the world perform one step
     *moves the players etc...
     */

    loadMap(mapName: string): SMap {
        var mapData: any = JSON.parse(require('fs').readFileSync('./dist/data/maps/' + mapName + '.json', 'utf8'));
        if (mapData == undefined) {
            console.log("Can't load Map File " + mapName);
        }
        var tiles: SMapTile[][] = [];
        //Iterate through Tiles Array
        for (var i = 0; i < mapData.height; i++) {
            tiles[i] = [];
            for (var j = 0; j < mapData.width; j++) {
                tiles[i][j] = new SMapTile(i, j, mapData.tiles[i][j]);
            }
        }
        //Parse JSON File
        var newMap: SMap = new SMap(mapData.height, mapData.width, mapData.tileHeight, mapData.tileWidth, tiles);
        return newMap;
    }
}
