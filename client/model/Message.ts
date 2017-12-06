"use strict";

/**
 * Class representing a Message to transmit information between server and client
 * @constructor
 * @param {String} type - Type of the message i.E: movement, spawn, destroy...
 * @param {String} target - Which Object is targeted i.E: Player, NPC, MapTile...
 * @param {String} clientId - The id of the client sending or regarding the information
 * @param {Object} value - The transmitted value
 */
export class Message{
  type : string;
  target : string;
  clientId : string;
  value : any;
  constructor(type:string,target:string, clientId:string, value:any) {
      this.type=type;
      this.target=target;
      this.clientId=clientId;
      this.value=value;
  }

}
