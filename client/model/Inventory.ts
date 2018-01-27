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
    content: Itemset[] = [];
    container: PIXI.Container;
    rectangle: PIXI.Sprite;
    itemSprites: { [index: number]: PIXI.Sprite } = {};
    badges: { [index: number]: PIXI.Graphics } = {};
    numbers: { [index: number]: PIXI.Text } = {};
    activeRectangle: PIXI.Graphics;
    activeSlot: number = 0;
    constructor() {
        this.container = new PIXI.Container();
        this.container.width = 750;
        this.container.height = 84;
        this.container.y = 560//640 - this.container.height;
        this.rectangle = TextureLoader.getSprite("inventory");
        this.container.addChild(this.rectangle);
        for (var i = 0; i < 10; i++) {
            //ItemSprites
            this.itemSprites[i] = TextureLoader.getSprite("noItem");
            this.itemSprites[i].x = Constants.INVENTORY.marginHorizontal + i * (Constants.INVENTORY.marginHorizontal + Constants.INVENTORY.spriteWidth);
            this.itemSprites[i].y = Constants.INVENTORY.marginVertical;
            this.itemSprites[i].visible = false;
            this.container.addChild(this.itemSprites[i]);
            //Badges
            var circle = new PIXI.Graphics();
            circle.beginFill(0xf4eb42);
            circle.drawCircle(0, 0, Constants.INVENTORY.badgeRadius);
            circle.endFill();
            circle.x = Constants.INVENTORY.marginHorizontal + Constants.INVENTORY.spriteWidth - Constants.INVENTORY.badgeRadius + i * (Constants.INVENTORY.marginHorizontal + Constants.INVENTORY.spriteWidth);
            circle.y = Constants.INVENTORY.marginVertical + Constants.INVENTORY.spriteHeigth - Constants.INVENTORY.badgeRadius;
            circle.visible = false;
            this.container.addChild(circle);
            this.badges[i] = circle;
            //Numbers
            var count = new PIXI.Text(String(0), Constants.INVENTORY.textStyle);
            count.x = circle.x - Constants.INVENTORY.badgeRadius + Constants.INVENTORY.textMargin;
            count.y = circle.y - Constants.INVENTORY.badgeRadius;
            count.visible = false;
            this.container.addChild(count);
            this.numbers[i] = count;
            //Active rectangle
            this.activeRectangle = new PIXI.Graphics();
            this.activeRectangle.lineStyle(4, 0xFF3300, 1);
            this.activeRectangle.drawRect(0, 0, Constants.INVENTORY.spriteWidth + 2 * Constants.INVENTORY.activeRectangleMargin, Constants.INVENTORY.spriteHeigth + 2 * Constants.INVENTORY.activeRectangleMargin);
            this.container.addChild(this.activeRectangle);
            this.setActiveSlot(0);
        }
    }


    /**
     *Inserts an Item at the next empty position
     *@param {Itemset} itemset the itemset to insert
     *@return {Number} The index of the inventoryslot the itemset was inserted in
     */
    insertItemset(itemset: Itemset): number {
        //Check if the item is already in the inventory => add count
        for (var i = 0; i < 10; i++) {
            if (this.content[i] != undefined && this.content[i].itemName == itemset.itemName) {
                this.content[i].count += itemset.count;
                this.updateContainer();
                return i;
            }
        }
        //If the item is not yet in the inventory find next free inventoryslot
        for (var i = 0; i < 10; i++) {
            if (this.content[i] == undefined) {
                this.content[i] = itemset;
                this.updateContainer();
                return i;
            }

        }
        //If the item can't be inserted return -1
        return -1;
    }

    /**
     *Updates the Inventory Container, Loads the right Textures
     */
    updateContainer(): void {
        for (var i = 0; i < 10; i++) {
            if (this.content[i] != undefined) {
                //Update ItemTextures
                this.itemSprites[i].texture = TextureLoader.getTexture(this.content[i].itemName);
                this.itemSprites[i].visible = true;
                //Update Badges
                this.badges[i].visible = true;
                //Update Numbers
                this.numbers[i].text = String(this.content[i].count);
                this.numbers[i].visible = true;
            }
            else {
                this.itemSprites[i].visible = false;
                this.badges[i].visible = false;
                this.numbers[i].visible = false;
            }
        }

    }

    setActiveSlot(slot: number | string): void {
        if (typeof slot == "string") {
            if (slot == "next") {
                this.setActiveSlot((this.activeSlot + 1) % 10);
            }
            else if (slot == "previous") {
                this.setActiveSlot((this.activeSlot - 1) % 10);
            }
            else {
                throw new Error("Invalid string parameter for Inventory.setActiveSlot() - please use next or previous or number");
            }
        }
        else {
            if (slot >= 0 && slot < 10) {
                this.activeSlot = slot;
                //Anzeigen
                this.activeRectangle.x = (slot + 1) * Constants.INVENTORY.marginHorizontal + slot * Constants.INVENTORY.spriteWidth - Constants.INVENTORY.activeRectangleMargin;
                this.activeRectangle.y = Constants.INVENTORY.marginVertical - Constants.INVENTORY.activeRectangleMargin;
            }
            else {
                throw new Error("Invalid number parameter for Inventory.setActiveSlot() - please use number between 0 and 9 or string");
            }
        }
    }

}
