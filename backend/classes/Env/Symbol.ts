import { Types } from "../Utils/Types";

export class Symbol {
    constructor(public value: any, public id: string, public type: Types, public arrayType: Types | undefined) {
        this.id = id.toLowerCase();
    }
}