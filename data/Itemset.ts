"use strict";

/**
 * Class representing a set of Items
 * @constructor
 * @param {String} itemName
 * @param {number} count
 */
export class Itemset {
    itemName: string;
    count: number;
    constructor(itemName: string, count: number) {
        this.itemName = itemName;
        this.count = count;
    }

}
