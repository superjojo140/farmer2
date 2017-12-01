"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MapTile_1 = require("./model/MapTile");
var Map_1 = require("./model/Map");
var World_1 = require("./model/World");
var Constants_1 = require("./model/Constants");
//Global Variables
var stage = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(640, 640);
var socket = io();
var world;
var gameState = Constants_1.Constants.LOAD;
//
//
document.body.appendChild(renderer.view);
//Start Pixi loader
PIXI.loader.add(["pics/boy_down.png", "pics/arena.jpg", "pics/field1.png", "data/maps/map1.json"]).load(loaderFinished);
/**
 * Wird aufgerufen, sobald Pixi alle Elemente geladen hat
 */
function loaderFinished() {
    renderer.render(stage);
    //Request an id from server
    socket.emit("clientRequestId", "");
}
/**
 *GameLoop
 */
function gameLoop() {
    //Loop this function at 60 frames per second
    requestAnimationFrame(gameLoop);
    world.doStep();
    //Render the stage to see the animation
    renderer.render(stage);
}
/*Key Events*/
$(document).keydown(function (event) {
    // TODO fix that the key is only triggered once https://stackoverflow.com/questions/19666440/jquery-keyboard-event-handler-press-and-hold
    if (gameState == Constants_1.Constants.PLAY) {
        var message = {
            type: "keyDown",
            value: event.keyCode,
            clientId: world.clientId
        };
        sendToServer(message);
    }
});
$(document).keyup(function (event) {
    if (gameState == Constants_1.Constants.PLAY) {
        var message = {
            type: "keyUp",
            value: event.keyCode,
            clientId: world.clientId
        };
        sendToServer(message);
    }
});
/**
 *Sendet ein Json Object an den Server
 *@param message {Object} This object is parsed to a string and sent to the server
 */
function sendToServer(message) {
    socket.emit("clientInput", JSON.stringify(message));
}
/**
 *Empfängt Daten vom Server und verarbeitet diese
 */
socket.on("serverInput", function (data) {
    console.log("Server sendet Input: " + data);
    var inputData = JSON.parse(data);
    var targetPlayer = world.getPlayer(inputData.clientId);
    if (gameState == Constants_1.Constants.PLAY) {
        switch (inputData.value) {
            case 37://LEFT
                targetPlayer.goToPosition(targetPlayer.x - 1, targetPlayer.y);
                break;
            case 38://UP
                targetPlayer.goToPosition(targetPlayer.x, targetPlayer.y - 1);
                break;
            case 39://RIGHT
                targetPlayer.goToPosition(targetPlayer.x + 1, targetPlayer.y);
                break;
            case 40://DOWN
                targetPlayer.goToPosition(targetPlayer.x, targetPlayer.y + 1);
                break;
            default:
                console.log("unknown key input from server");
                break;
        }
    }
});
/**
 *Empfängt die id vom Serevr
 */
socket.on("serverAssignId", function (data) {
    var clientId = JSON.parse(data).id;
    var worldFromServer = JSON.parse(data).world;
    console.log(worldFromServer);
    world = loadWorldFromServer(worldFromServer, clientId);
    loadPlayersFromServer(worldFromServer.players);
    //Start the game loop
    gameLoop();
    gameState = Constants_1.Constants.PLAY;
});
function loadWorldFromServer(worldFromServer, clientId) {
    var mapFromServer = worldFromServer.map;
    var myMap = loadMapFromServer(mapFromServer);
    //Create World
    var worldContainer = new PIXI.Container();
    stage.addChild(worldContainer);
    return new World_1.World(clientId, worldContainer, myMap, {});
}
function loadMapFromServer(mapFromServer) {
    var tilesFromServer = mapFromServer.tiles;
    var myTiles = loadTilesFromServer(tilesFromServer);
    return new Map_1.Map(mapFromServer.height, mapFromServer.width, mapFromServer.tileHeight, mapFromServer.tileWidth, myTiles);
}
function loadTilesFromServer(tilesFromServer) {
    //TODo Create Tiles
    var newTiles = [];
    for (var i = 0; i < tilesFromServer.length; i++) {
        newTiles[i] = [];
        for (var j = 0; j < tilesFromServer[i].length; j++) {
            newTiles[i][j] = new MapTile_1.MapTile(i, j, tilesFromServer[i][j].type);
        }
    }
    return newTiles;
}
function loadPlayersFromServer(playersFromServer) {
    for (var i in playersFromServer) {
        var tempPlayer = playersFromServer[i];
        world.addPlayer(i, tempPlayer.x, tempPlayer.y);
    }
}
/**
 *Fügt einen neuen Spieler hinzu
 */
socket.on("serverNewPlayer", function (data) {
    var newPlayer = JSON.parse(data);
    world.addPlayer(newPlayer.playerId, newPlayer.x, newPlayer.y);
});
