//Global Variables
var stage = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(300, 300);
var myMap;
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
    
    var fieldTexture = PIXI.loader.resources["pics/field1.png"].texture
    for (var i = 0; i < 8; i++) {
        tileArray[i]=[];
        for (var j = 0; j < 8; j++) {
            tileArray[i][j]=new MapTile(i,j,64, 64, fieldTexture);
        }
    }
    
    myMap = new Map(8,8,tileArray);
    stage.addChild(myMap.toPixiContainer());
    
    
    renderer.render(stage);
}


/**
 Bewegt das Objekt
*/
/*
function move() {
    requestAnimationFrame(move);
    floor.x -= 1;
    floor.y -= 1;
    renderer.render(stage);
}
move();*/