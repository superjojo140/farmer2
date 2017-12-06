"use strict";

export class Constants {

    static UP: number = 0;
    static RIGHT: number = 1;
    static DOWN: number = 2;
    static LEFT: number = 3;
    //GameStates
    static LOAD: number = 0;
    static PLAY: number = 1;
    //Config
    static PLAYER_SPEED: number = 4;
    //MapTile Texture Path
    static mapTileTextures: { [index: string]: string } = {
        "acre": "field1.png"
    };

    //Message Constants
    //Targets
    static PLAYER: string = "player";
    static WORLD: string = "world";
    //types
    static MOVEMENT: string = "movement";
    static CREATE: string = "create";
};
