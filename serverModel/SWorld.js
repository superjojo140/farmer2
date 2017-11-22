"use strict";
const SMapTile = require("./SMapTile");
const SPlayer = require("./SPlayer");
const SMap = require("./SMap");
/**
 * Class representing a World
 * The World cares about managing the Players...
 * @constructor
 * @param {String} clientId - The socket.io Client Id
 * @param {Object} container - The Container to add all the GameObjects
 * @param {Object} mapName - The map, where the players interact
 */
function SWorld(mapName) {
    if (arguments.length != 1) {
        throw "Uncorrect number of arguments for creating a new World";
    }
    this.players = [];
    this.map = this.loadMap(mapName);
}
/**
 *Add a Player to the GameObjects
 * @param {String} id - The new Player's id
 * @param {Number} x - The new Player's x coordinate
 * @param {Number} y - The new Player's y coordinate
 */
SWorld.prototype.addPlayer = function (id, x, y) {
        var player = new SPlayer(x, y, this);
        this.players[id] = player;
    }
    /**
     *Returns teh Player with the specified id
     * @param {String} id - The new Player's id
     */
SWorld.prototype.getPlayer = function (id) {
        return this.players[id];
    }
    /**
     *Let the world perform one step
     *moves the players etc...
     */
SWorld.prototype.doStep = function () {}
    /**
     *Loads a new Map into the world
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
            tiles[i][j] = new SMapTile(i, j, mapData.tiles[i][j]);
        }
    }
    //Parse JSON File
    var newMap = new SMap(mapData.height, mapData.width, mapData.tileHeight, mapData.tileWidth, tiles);
    return newMap;
}
module.exports = SWorld;