"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SMapTile_1 = require("./SMapTile");
var SPlayer_1 = require("./SPlayer");
var SMap_1 = require("./SMap");
/**
 * Class representing a World
 * The World cares about managing the Players...
 * @constructor
 * @param {Object} mapName - The map, where the players interact
 */
var SWorld = /** @class */ (function () {
    function SWorld(mapName) {
        this.players = {};
        this.map = this.loadMap(mapName);
    }
    /**
     *Add a Player to the GameObjects
     * @param {String} id - The new Player's id
     * @param {Number} x - The new Player's x coordinate
     * @param {Number} y - The new Player's y coordinate
     */
    SWorld.prototype.addPlayer = function (id, x, y) {
        var player = new SPlayer_1.SPlayer(id, x, y);
        this.players[id] = player;
    };
    /**
     *Returns teh Player with the specified id
     * @param {String} id - The new Player's id
     */
    SWorld.prototype.getPlayer = function (id) {
        return this.players[id];
    };
    /**
     *Let the world perform one step
     *moves the players etc...
     */
    SWorld.prototype.loadMap = function (mapName) {
        var mapData = JSON.parse(require('fs').readFileSync('public/data/maps/' + mapName + '.json', 'utf8'));
        if (mapData == undefined) {
            console.log("Can't load Map File " + mapName);
        }
        var tiles = [];
        //Iterate through Tiles Array
        for (var i = 0; i < mapData.height; i++) {
            tiles[i] = [];
            for (var j = 0; j < mapData.width; j++) {
                tiles[i][j] = new SMapTile_1.SMapTile(i, j, mapData.tiles[i][j]);
            }
        }
        //Parse JSON File
        var newMap = new SMap_1.SMap(mapData.height, mapData.width, mapData.tileHeight, mapData.tileWidth, tiles);
        return newMap;
    };
    return SWorld;
}());
exports.SWorld = SWorld;
