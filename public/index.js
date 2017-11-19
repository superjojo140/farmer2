"use strict";


//Global Variables
var stage = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(640, 640);
var socket = io();
var world;
var gameState = LOAD;
//
//
document.body.appendChild(renderer.view);
//Start Pixi loader
PIXI.loader.add(["pics/boy_down.png", "pics/arena.jpg","pics/field1.png", "data/maps/map1.json"]).load(loaderFinished);



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
    if (gameState == PLAY) {
        var message = {
            type: "keyDown",
            value: event.keyCode,
            clientId: world.clientId
        }
        sendToServer(message);
    }
});

$(document).keyup(function (event) {
    if (gameState == PLAY) {
        var message = {
            type: "keyUp",
            value: event.keyCode,
            clientId: world.clientId
        }
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

    if (gameState == PLAY) {
        if (inputData.type == "keyUp") {
            world.getPlayer(inputData.clientId).setVelocity(0, 0);
        } else {
            switch (inputData.value) {
                case 37:
                    world.getPlayer(inputData.clientId).setVelocity(-PLAYER_SPEED, 0);
                    break;
                case 38:
                    world.getPlayer(inputData.clientId).setVelocity(0, -PLAYER_SPEED);
                    break;
                case 39:
                    world.getPlayer(inputData.clientId).setVelocity(PLAYER_SPEED, 0);
                    break;
                case 40:
                    world.getPlayer(inputData.clientId).setVelocity(0, PLAYER_SPEED);
                    break;

                default:
                    console.log("unknown key input from server");
                    break;
            }

        }


    }


});

/**
 *Empfängt die id vom Serevr
 */
socket.on("serverAssignId", function (data) {
    var clientId = JSON.parse(data).id;
    console.log("Server sendet id: " + clientId);


    //Create World
    var worldContainer = new PIXI.Container();
    stage.addChild(worldContainer);
    world = new World(clientId, worldContainer,"map1");

    //createOwnPlayer
    world.addPlayer(clientId);

    //Start the game loop
    gameLoop();
    gameState = PLAY;
    
    
});

/**
*Fügt einen neuen Spieler hinzu
*/
socket.on("serverNewPlayer", function (data){
    world.addPlayer(JSON.parse(data).playerId);
});
