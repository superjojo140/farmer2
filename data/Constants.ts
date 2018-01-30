"use strict";
import { SPlant } from "../serverModel/SPlant"

export class Constants {

    static getPlant(plantName: string): SPlant {
        if (Constants.PLANTS[plantName] == undefined) {
            throw new Error("[Constants] Plant not found: " + plantName);
        }
        else {
            return Constants.PLANTS[plantName];
        }
    }

    static getInventory(attributeName: string): any {
        if (Constants.INVENTORY[attributeName] == undefined) {
            throw new Error("[Constants] Inventory default value not found: " + attributeName);
        }
        else {
            return Constants.INVENTORY[attributeName];
        }
    }

    static UP: number = 0;
    static RIGHT: number = 1;
    static DOWN: number = 2;
    static LEFT: number = 3;
    static STOP: number = 4;
    static NEXT: string = "next";
    static PREVIOUS: string = "previous";
    //GameStates
    static LOAD: number = 0;
    static PLAY: number = 1;

    //Config
    static PLAYER_SPEED: number = 4;

    //Message Constants
    //Targets
    static PLAYER: string = "player";
    static WORLD: string = "world";
    //types
    static MOVEMENT: string = "movement";
    static CREATE: string = "create";
    static REMOVE: string = "remove";

    //Plants
    private static PLANTS: { [index: string]: SPlant } = {
        "paprika": { "name": "paprika", "sizeToHarvest": 120, "harvest": [{ "itemName": "paprika", "count": 2 }] }
    }

    //inventory
    private static INVENTORY: { [index: string]: any } = {
        "marginHorizontal": 10,
        "marginVertical": 10,
        "spriteHeigth": 64,
        "spriteWidth": 64,
        "badgeRadius": 10,
        "textStyle": { fill: "black", fontSize: "16px" },
        "textMargin": 5,
        "activeSlotRectangleMargin": 3
    }
};
