"use strict";
import { ClientMapTile } from "./ClientMapTile";
import { ClientMap } from "./ClientMap";
import { ClientWorld } from "./ClientWorld";
import { Constants } from "./Constants";
import { TextureLoader } from "./TextureLoader";
import { ServerPlayer } from "./ServerPlayer";



/**
 * Class representing a Player
 * @constructor
  * @param {String} id - The players id
 * @param {number} x - The x Coordinate of the Players Tile
 * @param {number} y - The y Coordinate of the Players Tile
 * @param {ClientWorld} world - The world
 */
export class ClientPlayer extends ServerPlayer {
    world: ClientWorld;
    sprite: PIXI.Sprite;
    x: number;
    y: number;
    id: string;

    constructor(id: string, x: number, y: number, world: ClientWorld) {
        super(id, x, y);
        this.sprite = TextureLoader.getSprite("boy_down");
    }

    /**
     *Let the Player move in direction to it's Position.
     */
    move(): void {
        var tileWidth: number = this.world.map.tileWidth;
        var tileHeight: number = this.world.map.tileHeight;
        //Calculation PLAYER_SPEED to avoid flackering, if the could never reach exactly its Position because of the PLAYER_SPEED
        if (this.x * tileWidth >= this.sprite.x + Constants.PLAYER_SPEED) {
            this.sprite.x += Constants.PLAYER_SPEED;
        }
        else if (this.x * tileWidth <= this.sprite.x - Constants.PLAYER_SPEED) {
            this.sprite.x -= Constants.PLAYER_SPEED;
        }

        if (this.y * tileHeight >= this.sprite.y + Constants.PLAYER_SPEED) {
            this.sprite.y += Constants.PLAYER_SPEED;
        }
        else if (this.y * tileHeight <= this.sprite.y - Constants.PLAYER_SPEED) {
            this.sprite.y -= Constants.PLAYER_SPEED;
        }
    };



    /**
     *Set the Position of the Player
     * @param {number} x - The x Coordinate of the Players Tile
     * @param {number} y - The y Coordinate of the Players Tile
     * @override
     */
    setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
        var tileWidth: number = this.world.map.tileWidth;
        var tileHeight: number = this.world.map.tileHeight;
        this.sprite.x = x * tileWidth;
        this.sprite.y = y * tileHeight;
    };

    /**
     *Set the Position of the Player and Animates a Transition
     * @param {number} x - The x Coordinate of the Players Tile
     * @param {number} y - The y Coordinate of the Players Tile
     */
    goToPosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    };

    /**
     *Destroy the Player
     */
    destroy(): void {
        this.world.playerContainer.removeChild(this.sprite);
    };

}
