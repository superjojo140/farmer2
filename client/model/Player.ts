"use strict";
import { MapTile } from "./MapTile";
import { Map } from "./Map";
import { World } from "./World";
import { Constants } from "../../data/Constants";
import { TextureLoader } from "./TextureLoader";



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
    animations: PIXI.extras.AnimatedSprite[] = [];
    sprite: PIXI.extras.AnimatedSprite;
    x: number;
    y: number;
    id: string;

    constructor(id: string, x: number, y: number, world: World) {
        this.id = id;
        this.world = world;

        //Init animations
        for (var direction: number = Constants.UP; direction <= Constants.LEFT; direction++) {
            var textureArray: PIXI.Texture[] = [];
            for (var i: number = 0; i < 4; i++) {
                textureArray.push(TextureLoader.getTexture("boy" + (4 * direction + i)));
            }
            var tempAnimation: PIXI.extras.AnimatedSprite = new PIXI.extras.AnimatedSprite(textureArray);
            tempAnimation.animationSpeed = 0.1;
            this.animations[direction] = tempAnimation
        }
        this.sprite = this.animations[Constants.DOWN];

        //set Position - have to be done AFTER generrating the spritesheet
        this.setPosition(x, y);
    }

    /**
     *Let the Player move in direction to it's Position.
     */
    move(): void {
        var tileWidth: number = this.world.map.tileWidth;
        var tileHeight: number = this.world.map.tileHeight;
        //Calculate PLAYER_SPEED to avoid flackering, if the could never reach exactly its Position because of the PLAYER_SPEED
        //Horizonal
        if (this.x * tileWidth >= this.sprite.x + Constants.PLAYER_SPEED) {
            /*  if (this.sprite != this.animations[Constants.RIGHT]) {
                  this.sprite.stop();
                  //TODO Remove or hide currentSprite in worlds playerContainer
                  this.sprite = this.animations[Constants.RIGHT];
                  this.sprite.play();
              }*/
            this.sprite.x += Constants.PLAYER_SPEED; //Right
        }
        else if (this.x * tileWidth <= this.sprite.x - Constants.PLAYER_SPEED) {
            this.sprite.x -= Constants.PLAYER_SPEED; //Left
        }
        else {
            //Stop
            this.sprite.stop();
        }

        //Vertical

        if (this.y * tileHeight >= this.sprite.y + Constants.PLAYER_SPEED) {
            this.sprite.y += Constants.PLAYER_SPEED; //Down
        }
        else if (this.y * tileHeight <= this.sprite.y - Constants.PLAYER_SPEED) {
            this.sprite.y -= Constants.PLAYER_SPEED; //Up
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
        //TODO this is not nice, why not in World.ts???
        this.world.playerContainer.removeChild(this.sprite);
    };

}
