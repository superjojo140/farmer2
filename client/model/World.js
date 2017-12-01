"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = require("./Player");
/**
 * Class representing a World
 * The World cares about managing the Players...
 * @constructor
 * @param {String} clientId - The socket.io Client Id
 * @param {Object} container - The Container to add all the GameObjects
 * @param {Map} map - The map, where the players interact
 * @param {Object} players - The players array
 */
var World = /** @class */ (function () {
    function World(clientId, container, map, players) {
        this.container = container;
        this.players = players;
        this.clientId = clientId;
        this.map = map;
        this.worldContainer = this.map.toPixiContainer();
        this.playerContainer = new PIXI.Container();
        this.container.addChild(this.worldContainer);
        this.container.addChild(this.playerContainer);
    }
    /**
    *Add a Player to the GameObjects
    * @param {String} id - The new Player's id
    * @param {Number} x - The new Player's x Coordinate
    * @param {Number} y - The new Player's y Coordinate
    */
    World.prototype.addPlayer = function (id, x, y) {
        var player = new Player_1.Player(id, x, y, this);
        this.players[id] = player;
        this.playerContainer.addChild(player.sprite);
    };
    /**
    *Returns teh Player with the specified id
    * @param {String} id - The new Player's id
    */
    World.prototype.getPlayer = function (id) {
        return this.players[id];
    };
    /**
    *Let the world perform one step
    *moves the players etc...
    */
    World.prototype.doStep = function () {
        for (var i in this.players) {
            this.players[i].move();
        }
    };
    return World;
}());
exports.World = World;
