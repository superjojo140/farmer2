"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants = /** @class */ (function () {
    function Constants() {
    }
    Constants.UP = 0;
    Constants.RIGHT = 1;
    Constants.DOWN = 2;
    Constants.LEFT = 3;
    //GameStates
    Constants.LOAD = 0;
    Constants.PLAY = 1;
    //Config
    Constants.PLAYER_SPEED = 4;
    //MapTile Texture Path
    Constants.mapTileTextures = {
        "acre": "field1.png"
    };
    return Constants;
}());
exports.Constants = Constants;
;
