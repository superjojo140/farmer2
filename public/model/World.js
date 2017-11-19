"use strict";


/**
 * Class representing a World
 * The World cares about managing the Players...
 * @constructor
 * @param {String} clientId - The socket.io Client Id
 * @param {Object} container - The Container to add all the GameObjects
 * @param {Object} mapName - The map, where the players interact
 */
function World(clientId,container,mapName) {
    this.container = container;
    this.players = [];
    this.clientId = clientId;
    this.map = this.loadMap(mapName);
    this.worldContainer = this.map.toPixiContainer();
    this.playerContainer = new PIXI.Container();
    this.container.addChild(this.worldContainer);
    this.container.addChild(this.playerContainer);
}

/**
*Add a Player to the GameObjects
* @param {String} id - The new Player's id
*/
World.prototype.addPlayer = function(id){
    var player = new Player(0,0,"pics/boy_down.png",this);
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

/**
*Loads a new Map into the world
*/
World.prototype.loadMap = function(mapName){
    var mapFile = PIXI.loader.resources["data/maps/"+mapName+".json"];
    if (mapFile == undefined){
        console.log("Can't load Map File "+mapName);
    }
    var mapData = mapFile.data;

    
    var tiles = [];
    
    //Iterate through Tiles Array and set Textures
    for (var i = 0; i < mapData.height; i++) {
        tiles[i]= [];
        for (var j = 0; j < mapData.width; j++) {
            tiles[i][j] = new MapTile(i,j,mapData.textures[mapData.tiles[i][j]],mapData.tiles[i][j],this); //TODO Make acre dynamic
        }
    }
    
    //Parse JSON File
    var newMap = new Map(mapData.height,mapData.width,mapData.tileHeight,mapData.tileWidth,tiles,this);
    return newMap;
    
}








