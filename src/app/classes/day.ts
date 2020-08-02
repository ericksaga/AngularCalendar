import { Costs } from './costs';
/*
type1Clothes are the clothes that are charged
type2Clothes are the clothes of the owner, thus they aren't charged
type3Clothes are the clothes from a partner
type4Clothes are the clothes treated by thw partner
*/
export class Day {
    date: Date;
    type1Clothes: number;
    type2Clothes: number;
    type3Clothes: number;
    type4Clothes: number;
    gains: number;
    sendToBank: number;
    cost: Array<Costs>;
    createdBy: string;
    created: Date;
    lastUpdatedBy: string;
    lastUpdated: Date;
    constructor() {
        this.type1Clothes = 0;
        this.type2Clothes = 0;
        this.type3Clothes = 0;
        this.type4Clothes = 0;
        this.sendToBank = 0;
        this.gains = 0;
        this.cost = new Array();
    }
}
