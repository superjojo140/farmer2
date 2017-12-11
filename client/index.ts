"use strict";

//Import Librarys
import * as $ from "jquery";
import * as PIXI from "pixi.js"
import * as io from "socket.io-client"

import { MapTile } from "./model/MapTile";
import { Map } from "./model/Map";
import { Player } from "./model/Player";
import { World } from "./model/World";
import { Constants } from "../dist/data/Constants";
import { Message } from "../dist/data/Message";


//Global Variables
var stage: PIXI.Container = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(640, 640);
var socket = io();
var world: World;
var gameState: number = Constants.LOAD;
//
//
document.body.appendChild(renderer.view);
//Start Pixi loader
PIXI.loader.add(["pics/boy_down.png", "pics/arena.jpg", "pics/field1.png", "data/maps/map1.json"]).load(loaderFinished);



/**
 * Wird aufgerufen, sobald Pixi alle Elemente geladen hat
 */
function loaderFinished(): void {
    renderer.render(stage);
    //Request an id from server
    socket.emit("clientRequestId", "");
}


/**
 *GameLoop
 */
function gameLoop(): void {
    //Loop this function at 60 frames per second
    requestAnimationFrame(gameLoop);
    world.doStep();
    //Render the stage to see the animation
    renderer.render(stage);
}


/*Key Events*/
$(document).keydown(function(event) {
    // TODO fix that the key is only triggered once https://stackoverflow.com/questions/19666440/jquery-keyboard-event-handler-press-and-hold
    if (gameState == Constants.PLAY) {
        var message: Message = new Message("movement", "player", world.clientId, event.key);
        sendToServer(message);
    }
});

/**
 *Sendet ein Json Object an den Server
 *@param message {Object} This object is parsed to a string and sent to the server
 */
function sendToServer(message: Message): void {
    socket.emit("clientInput", message);
}


/**
 *Empfängt Daten vom Server und verarbeitet diese
 */
socket.on("serverInput", function(message: Message) {
    console.log("Server sendet Input: ");
    console.log(message);
    //++++++++++++++++++MOVEMENT+++++++++++++++++++++++++++++++
    if (message.type == Constants.MOVEMENT) {
        if (message.target == Constants.PLAYER) {
            //Move Player
            var targetPlayer = world.getPlayer(message.clientId);
            if (gameState == Constants.PLAY) {
                targetPlayer.goToPosition(message.value.x, message.value.y);
            }
        }
    }
    //++++++++++++++++++++++++++SPAWN+++++++++++++++++++++++++++
    else if (message.type == Constants.CREATE) {
        if (message.target == Constants.PLAYER) {
            //Player Spawns
            world.addPlayer(message.clientId, message.value.x, message.value.y);
        }
    }

    else if (message.type == Constants.REMOVE) {
        if (message.target == Constants.PLAYER) {
            //Remove PLAYER
            world.removePlayer(message.clientId);
        }
    }

});
/**
 *Empfängt die id vom Server und startet das Spiel
 */
socket.on("serverAssignId", function(message: Message) {
    var clientId = message.clientId;
    var worldFromServer: World = message.value;
    console.log(worldFromServer);
    world = loadWorldFromServer(worldFromServer, clientId);
    loadPlayersFromServer(worldFromServer.players);
    //Start the game loop
    gameLoop();
    gameState = Constants.PLAY;
});

function loadWorldFromServer(worldFromServer: World, clientId: string): World {
    var mapFromServer = worldFromServer.map;
    var myMap = loadMapFromServer(mapFromServer);
    //Create World
    var worldContainer = new PIXI.Container();
    stage.addChild(worldContainer);
    return new World(clientId, worldContainer, myMap, {});
}

function loadMapFromServer(mapFromServer: Map): Map {
    var tilesFromServer = mapFromServer.tiles;
    var myTiles = loadTilesFromServer(tilesFromServer);
    return new Map(mapFromServer.height, mapFromServer.width, mapFromServer.tileHeight, mapFromServer.tileWidth, myTiles);
}


function loadTilesFromServer(tilesFromServer: MapTile[][]): MapTile[][] {
    //TODo Create Tiles
    var newTiles: MapTile[][] = [];
    for (var i = 0; i < tilesFromServer.length; i++) {
        newTiles[i] = [];
        for (var j = 0; j < tilesFromServer[i].length; j++) {
            newTiles[i][j] = new MapTile(i, j, tilesFromServer[i][j].type);
        }
    }
    return newTiles;
}

function loadPlayersFromServer(playersFromServer: { [index: string]: Player }): void {

    for (var i in playersFromServer) {
        var tempPlayer: Player = playersFromServer[i];
        world.addPlayer(i, tempPlayer.x, tempPlayer.y);
    }

}
