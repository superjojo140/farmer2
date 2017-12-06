"use strict";
import { MapTile } from "./MapTile";
import { Map } from "./Map";
import { World } from "./World";
import { Constants } from "./Constants";



/**
 * Class representing a Player
 * @constructor
  * @param {String} id - The players id
 * @param {number} x - The x Coordinate of the Players Tile
 * @param {number} y - The y Coordinate of the Players Tile
 * @param {World} world - The world
 */
export class Player {
    world: World;
    sprite: PIXI.Sprite;
    x: number;
    y: number;
    id: string;

    constructor(id: string, x: number, y: number, world: World) {
        this.id = id;
        this.world = world;
        var texture: PIXI.Texture = PIXI.loader.resources["pics/boy_down.png"].texture;
        this.sprite = new PIXI.Sprite(texture);
        this.setPosition(x, y);
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
