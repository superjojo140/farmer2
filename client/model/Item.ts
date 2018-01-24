"use strict";
import { TextureLoader } from "./TextureLoader";

/**
 * Class representing an Item
 * @constructor
 * @param {String} name - name of that item
 */
export class Item {
    name: string;
    image: PIXI.Sprite;
    constructor(name: string) {
        this.name = name;
        this.image = TextureLoader.getSprite(name);
    }


}
