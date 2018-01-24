"use strict";
import { Constants } from "../../data/Constants"
import { Itemset } from "../../data/Itemset"
import { Item } from "./Item";
import { TextureLoader } from "./TextureLoader"

/**
 * Class representing an inventory
 * @constructor
 */
export class Inventory {
    content: Itemset[];
    container: PIXI.Container;
    rectangle: PIXI.Sprite;
    itemSprites: { [index: number]: PIXI.Sprite } = {};
    constructor() {
        this.container = new PIXI.Container();
        this.container.width = 750;
        this.container.height = 84;
        this.container.y = 560//640 - this.container.height;
        this.rectangle = TextureLoader.getSprite("inventory");
        this.container.addChild(this.rectangle);
        for (var i = 0; i < 10; i++) {
            this.itemSprites[i] = TextureLoader.getSprite("noItem");
            this.itemSprites[i].x = 10 + i * 74; //74px = 64px texture width + 10 px margin
            this.itemSprites[i].y = 10;
            this.container.addChild(this.itemSprites[i]);
        }
    }

}
