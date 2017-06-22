//Global Variables
var stage = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(1000, 700);
var myMap;
var socket = io();
//
//
document.body.appendChild(renderer.view);
//Start Pixi loader
PIXI.loader.add("pics/field1.png").load(loaderFinished);


/**
 * Wird aufgerufen, sobald Pixi alle Elemente geladen hat
 */
function loaderFinished() {
    var tileArray = [];

    var fieldTexture = PIXI.loader.resources["pics/field1.png"].texture;
    for (var i = 0; i < 8; i++) {
        tileArray[i]=[];
        for (var j = 0; j < 8; j++) {
            tileArray[i][j]=new MapTile(i,j,fieldTexture);
        }
    }

    myMap = new Map(8,8,64,64,tileArray);
    stage.addChild(myMap.toPixiContainer());


    renderer.render(stage);
}


/*Key Events*/
$(document).keydown(function(event){
   var message ={
       type : "keyPress",
       value: event.keyCode
   }
   sendToServer(message);
});

/**
*Sendet ein Json Object an den Server
*@param message {Object} This object is parsed to a string and sent to the server
*/
function sendToServer(message){
    alert("Sende: "+JSON.stringify(message));
    socket.emit("clientInput",JSON.stringify(message));
}

/**
*Empfängt Daten vom Server und verarbeitet diese
*/
socket.on("serverInput", function (data) {
        alert("Server sendet Input: "+data);
});
