"use strict";

import { Item } from "./Item";

/**
 * Class representing an Item
 * @constructor
 * @param {String} plant - name of the plant that will grow if you plant this seed
 */
export class Seed extends Item {
    plant: string;
    constructor(name: string, plant: string) {
        super(name);
        this.plant = plant;
    }

}
