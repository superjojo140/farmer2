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
    spriteContainer: PIXI.Container = new PIXI.Container();
    currentDirection: number = Constants.STOP;
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
            tempAnimation.visible = false;
            this.animations[direction] = tempAnimation;
            this.spriteContainer.addChild(tempAnimation);
        }
        //Init Stop Sprite
        var textureArray: PIXI.Texture[] = [];
        textureArray.push(TextureLoader.getTexture("boy8"));
        var tempAnimation: PIXI.extras.AnimatedSprite = new PIXI.extras.AnimatedSprite(textureArray);
        tempAnimation.animationSpeed = 0.1;
        tempAnimation.visible = true;
        this.animations[Constants.STOP] = tempAnimation;
        this.spriteContainer.addChild(tempAnimation);


        //set Position - have to be done AFTER generrating the spritesheet
        this.setPosition(x, y);;
    }

    /**
     *Let the Player move in direction to it's Position.
     */
    move(): void {
        var tileWidth: number = this.world.map.tileWidth;
        var tileHeight: number = this.world.map.tileHeight;
        //Calculate PLAYER_SPEED to avoid flackering, if the could never reach exactly its Position because of the PLAYER_SPEED
        var diffHorizontal = this.x * tileWidth - this.spriteContainer.x;
        var diffVertical = this.y * tileHeight - this.spriteContainer.y;
        if (Math.abs(diffVertical) < Constants.PLAYER_SPEED && Math.abs(diffHorizontal) < Constants.PLAYER_SPEED) {
            this.setDirection(Constants.STOP);
        }
        else {
            if (Math.abs(diffHorizontal) > Math.abs(diffVertical)) {
                if (diffHorizontal > 0) {
                    this.setDirection(Constants.RIGHT);
                }
                else {
                    this.setDirection(Constants.LEFT);
                }
            }
            else {
                if (diffVertical > 0) {
                    this.setDirection(Constants.DOWN);
                }
                else {
                    this.setDirection(Constants.UP);
                }
            }
        }
        //Horizonal
        if (diffHorizontal - Constants.PLAYER_SPEED >= 0) {
            this.spriteContainer.x += Constants.PLAYER_SPEED; //Right
        }
        else if (diffHorizontal + Constants.PLAYER_SPEED <= 0) {
            this.spriteContainer.x -= Constants.PLAYER_SPEED; //Left
        }

        //Vertical

        if (diffVertical - Constants.PLAYER_SPEED >= 0) {
            this.spriteContainer.y += Constants.PLAYER_SPEED; //Down
        }
        else if (diffVertical + Constants.PLAYER_SPEED <= 0) {
            this.spriteContainer.y -= Constants.PLAYER_SPEED; //Up
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
        this.spriteContainer.x = x * tileWidth;
        this.spriteContainer.y = y * tileHeight;
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
        this.world.playerContainer.removeChild(this.spriteContainer);
    };

    setDirection(direction: number): void {
        if (this.currentDirection != direction) {
            //stop last Animation
            this.animations[this.currentDirection].stop();
            //hide last animation
            this.animations[this.currentDirection].visible = false;
            //start and show next animation
            this.animations[direction].play();
            this.animations[direction].visible = true;
            this.currentDirection = direction;
        }
    }

}
