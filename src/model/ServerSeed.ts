"use strict";

import { ServerItem } from "./ServerItem";

/**
 * Class representing an Item
 * @constructor
 * @param {String} plant - name of the plant that will grow if you plant this seed
 */
export class ServerSeed extends ServerItem {
    plant: string;
    constructor(name: string, plant: string) {
        super(name);
        this.plant = plant;
    }

}
