import { Costs } from './costs';
/*
type1Clothes are the clothes that are charged
type2Clothes are the clothes of the owner, thus they aren't charged
*/
export class Day {
    date: Date;
    type1Clothes: number;
    type2Clothes: number;
    type3Clothes: number;
    gains: number;
    cost: Array<Costs>;
    createdBy: string;
    created: Date;
    lastUpdatedBy: string;
    lastUpdated: Date;
    constructor() {
        this.type1Clothes = 0;
        this.type2Clothes = 0;
        this.type3Clothes = 0;
        this.gains = 0;
        this.cost = new Array();
    }
}
