"use strict";
import { Constants } from "../data/Constants"
import { SItem } from "./SItem";
import { Itemset } from "../data/Itemset";

/**
 * Class representing a plant
 * @constructor
 * @param {String} name
 */
export class SPlant extends SItem {
    sizeToHarvest: number;
    harvest: Itemset[];
    constructor(name: string) {
        super(name);
        this.sizeToHarvest = Constants.PLANTS[name].sizeToHarvest;
        this.harvest = Constants.PLANTS[name].harvest;
    }

}
