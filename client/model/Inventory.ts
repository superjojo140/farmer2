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
    isActive: boolean = false;
    content: Itemset[] = [];
    container: PIXI.Container;
    backgroundSprite: PIXI.Sprite;
    itemSprites: { [index: number]: PIXI.Sprite } = {};
    badges: { [index: number]: PIXI.Graphics } = {};
    numbers: { [index: number]: PIXI.Text } = {};
    activeSlotRectangle: PIXI.Graphics;
    activeSlot: number = 0;
    constructor() {
        //Container
        this.container = new PIXI.Container();
        this.container.width = 750;
        this.container.height = 84;
        this.container.y = 560//640 - this.container.height;
        //BackgroundSprite
        this.backgroundSprite = TextureLoader.getSprite("inventory");
        this.container.addChild(this.backgroundSprite);
        this.setActiveState(false); //Disfocus Inventory

        //Slots
        for (var i = 0; i < 10; i++) {
            //ItemSprites
            this.itemSprites[i] = TextureLoader.getSprite("noItem");
            this.itemSprites[i].x = Constants.getInventory("marginHorizontal") + i * (Constants.getInventory("marginHorizontal") + Constants.getInventory("spriteWidth"));
            this.itemSprites[i].y = Constants.getInventory("marginVertical");
            this.itemSprites[i].visible = false;
            this.container.addChild(this.itemSprites[i]);
            //Badges
            var circle = new PIXI.Graphics();
            circle.beginFill(0xf4eb42);
            circle.drawCircle(0, 0, Constants.getInventory("badgeRadius"));
            circle.endFill();
            circle.x = Constants.getInventory("marginHorizontal") + Constants.getInventory("spriteWidth") - Constants.getInventory("badgeRadius") + i * (Constants.getInventory("marginHorizontal") + Constants.getInventory("spriteWidth"));
            circle.y = Constants.getInventory("marginVertical") + Constants.getInventory("spriteHeigth") - Constants.getInventory("badgeRadius");
            circle.visible = false;
            this.container.addChild(circle);
            this.badges[i] = circle;
            //Numbers
            var count = new PIXI.Text(String(0), Constants.getInventory("textStyle"));
            count.x = circle.x - Constants.getInventory("badgeRadius") + Constants.getInventory("textMargin");
            count.y = circle.y - Constants.getInventory("badgeRadius");
            count.visible = false;
            this.container.addChild(count);
            this.numbers[i] = count;
        }
        //Active slot backgroundSprite
        this.activeSlotRectangle = new PIXI.Graphics();
        this.activeSlotRectangle.lineStyle(4, 0xFF3300, 1);
        this.activeSlotRectangle.drawRect(0, 0, Constants.getInventory("spriteWidth") + 2 * Constants.getInventory("activeSlotRectangleMargin"), Constants.getInventory("spriteHeigth") + 2 * Constants.getInventory("activeSlotRectangleMargin"));
        this.container.addChild(this.activeSlotRectangle);
        this.setActiveSlot(0);

    }

    /**
     *Set Inventory's active state
     *@param {boolean} active true for active
     */
    setActiveState(active: boolean): void {
        this.isActive = active;
        if (active) {
            this.container.alpha = 1;
        }
        else {
            this.container.alpha = 0.5;
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
            if (slot == Constants.NEXT) {
                this.setActiveSlot((this.activeSlot + 1) % 10);
            }
            else if (slot == Constants.PREVIOUS) {
                this.setActiveSlot((((this.activeSlot - 1) % 10) + 10) % 10); //This is necessary cause of javascripts definition of % operator for negative values
            }
            else {
                throw new Error("Invalid string parameter for Inventory.setActiveSlot(): " + slot + " - please use next or previous or number");
            }
        }
        else {
            if (slot >= 0 && slot < 10) {
                this.activeSlot = slot;
                //Anzeigen
                this.activeSlotRectangle.x = (slot + 1) * Constants.getInventory("marginHorizontal") + slot * Constants.getInventory("spriteWidth") - Constants.getInventory("activeSlotRectangleMargin");
                this.activeSlotRectangle.y = Constants.getInventory("marginVertical") - Constants.getInventory("activeSlotRectangleMargin");
            }
            else {
                throw new Error("Invalid number parameter for Inventory.setActiveSlot(): " + slot + " - please use number between 0 and 9 or string");
            }
        }
    }

}
