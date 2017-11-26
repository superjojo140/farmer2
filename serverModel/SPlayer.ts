"use strict";



/**
 * Class representing a Player
 * @constructor
 * @param {number} id - The id of the Players Tile
 * @param {number} x - The x Coordinate of the Players Tile
 * @param {number} y - The y Coordinate of the Players Tile
 */
export class SPlayer{
  id:string;
  x:number;
  y:number;
  constructor(id:string,x:number, y:number) {
      if (arguments.length != 3) {
          throw "Uncorrect number of arguments for creating a new Player";
      }
      this.id = id;
      this.setPosition(x, y);
  }

  /**
   *Set the Position of the Player
   * @param {number} x - The x Coordinate of the Players Tile
   * @param {number} y - The y Coordinate of the Players Tile
   */
  setPosition(x:number, y:number):void {
      this.x = x;
      this.y = y;
  };
}
