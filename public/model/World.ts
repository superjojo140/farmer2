"use strict";


/**
 * Class representing a World
 * The World cares about managing the Players...
 * @constructor
 * @param {String} clientId - The socket.io Client Id
 * @param {Object} container - The Container to add all the GameObjects
 * @param {Map} map - The map, where the players interact
 * @param {Array} players - The players array
 */
function World(clientId,container,map,players) {
    if (arguments.length != 4){
        throw "Uncorrect number of arguments for creating a new World";
    }
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
*/
World.prototype.addPlayer = function(id,x,y){
    var player = new Player(id,x,y);
    this.players[id]=player;
    this.playerContainer.addChild(player.sprite);
}

/**
*Returns teh Player with the specified id
* @param {String} id - The new Player's id
*/
World.prototype.getPlayer = function(id){
    return this.players[id];
}

/**
*Let the world perform one step
*moves the players etc...
*/
World.prototype.doStep = function(){
    for (var i in this.players){
        this.players[i].move();
    }
}









