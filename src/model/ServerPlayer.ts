"use strict";



/**
 * Class representing a Player
 * @constructor
 * @param {number} id - The id of the Players Tile
 * @param {number} x - The x Coordinate of the Players Tile
 * @param {number} y - The y Coordinate of the Players Tile
 */
export class ServerPlayer {
    id: string;
    x: number;
    y: number;
    constructor(id: string, x: number, y: number) {
        this.id = id;
        this.setPosition(x, y);
    }

    /**
     *Set the Position of the Player
     * @param {number} x - The x Coordinate of the Players Tile
     * @param {number} y - The y Coordinate of the Players Tile
     */
    setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    };




}
