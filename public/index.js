//Global Variables
var stage = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(640, 640);
var socket = io();
var world;
//
//
document.body.appendChild(renderer.view);
//Start Pixi loader
PIXI.loader.add(["pics/boy_down.png", "pics/arena.jpg"]).load(loaderFinished);



/**
 * Wird aufgerufen, sobald Pixi alle Elemente geladen hat
 */
function loaderFinished() {
    //Show Background
    var bgContainer = new PIXI.Container();
    var bgSprite = new PIXI.Sprite(PIXI.loader.resources["pics/arena.jpg"].texture);
    bgContainer.addChild(bgSprite);
    //stage.addChild(bgContainer);

    //renderer.render(stage);

    //Request an id from server
    socket.emit("clientRequestId","");


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
    var message = {
        type: "keyPress",
        value: event.keyCode
    }
    sendToServer(message);
});

/**
 *Sendet ein Json Object an den Server
 *@param message {Object} This object is parsed to a string and sent to the server
 */
function sendToServer(message) {
    alert("Sende: " + JSON.stringify(message));
    socket.emit("clientInput", JSON.stringify(message));
}

/**
 *Empfängt Daten vom Server und verarbeitet diese
 */
socket.on("serverInput", function (data) {
    alert("Server sendet Input: " + data);
});

/**
 *Empfängt die id vom Serevr
 */
socket.on("serverAssignId", function (data) {
    var clientId = JSON.parse(data).id;
    console.log("Server sendet id: " + clientId);


    //Create World
    var playerContainer = new PIXI.Container();
    stage.addChild(playerContainer);
    world = new World(clientId, playerContainer);

    //createOwnPlayer
    world.addPlayer(clientId);
    world.getPlayer(clientId).setVelocity(1,1);

    //Start the game loop
    gameLoop();
});
