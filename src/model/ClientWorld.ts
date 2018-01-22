"use strict";
import { ClientMapTile } from "./ClientMapTile";
import { ClientMap } from "./ClientMap";
import { ClientPlayer } from "./ClientPlayer";
import { ServerWorld } from "./ServerWorld";


/**
 * Class representing a World
 * The World cares about managing the Players...
 * @constructor
 * @param {String} clientId - The socket.io Client Id
 * @param {Object} container - The Container to add all the GameObjects
 * @param {ClientMap} map - The map, where the players interact
 */
export class ClientWorld extends ServerWorld {
    clientId: string;
    container: PIXI.Container;
    worldContainer: PIXI.Container;
    playerContainer: PIXI.Container;
    map: ClientMap;
    players: { [index: string]: ClientPlayer };

    constructor(clientId: string, container: PIXI.Container, map: ClientMap) {
        super();
        this.container = container;
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
    * @override
    */
    addPlayer(id: string, x: number, y: number): void {
        var player: ClientPlayer = new ClientPlayer(id, x, y, this);
        this.players[id] = player;
        this.playerContainer.addChild(player.sprite);
    }

    /**
     *Remove player from the world
     * @param {String} id - The Player's id
     * @override
     */
    removePlayer(id: string): void {
        var playerToDelete: ClientPlayer = this.players[id];
        //Remove reference to the player in array
        delete this.players[id];
        //Delete Player Object
        playerToDelete.destroy();
    }

    /**
    *Returns teh Player with the specified id
    * @param {String} id - The new Player's id
    * @override
    */
    getPlayer(id: string): ClientPlayer {
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
