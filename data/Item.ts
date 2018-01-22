"use strict";

/**
 * Class representing an Item
 * @constructor
 * @param {String} name - name of that item
 * @param {String} image - the filename fo the assigned image | i.E: image="xxx" => itemImage -> "xxx.png", growState 0 -> "xxx0.png"
 */
export class Item {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

}
