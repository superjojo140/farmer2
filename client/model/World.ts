"use strict";
import { MapTile } from "./MapTile";
import { Map } from "./Map";
import { Player } from "./Player";


/**
 * Class representing a World
 * The World cares about managing the Players...
 * @constructor
 * @param {String} clientId - The socket.io Client Id
 * @param {Object} container - The Container to add all the GameObjects
 * @param {Map} map - The map, where the players interact
 */
export class World {
    clientId: string;
    container: PIXI.Container;
    worldContainer: PIXI.Container;
    playerContainer: PIXI.Container;
    map: Map;
    players: { [index: string]: Player };
    constructor(clientId: string, container: PIXI.Container, map: Map) {
        this.container = container;
        this.players = {};
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
    addPlayer(id: string, x: number, y: number): void {
        var player: Player = new Player(id, x, y, this);
        this.players[id] = player;
        this.playerContainer.addChild(player.sprite);
    }

    /**
     *Remove player from the world
     * @param {String} id - The Player's id
     */
    removePlayer(id: string): void {
        var playerToDelete: Player = this.players[id];
        //Remove reference to the player in array
        delete this.players[id];
        //Delete Player Object
        playerToDelete.destroy();
    }

    /**
    *Returns teh Player with the specified id
    * @param {String} id - The new Player's id
    */
    getPlayer(id: string): Player {
        return this.players[id];
    }

    /**
    *Let the world perform one step
    *moves the players etc...
    */
    doStep(): void {
        for (var i in this.players) {
            this.players[i].move();
        }
    }


}
