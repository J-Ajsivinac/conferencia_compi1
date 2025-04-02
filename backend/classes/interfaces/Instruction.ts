import { Node } from "../utils/Node";
import { TypesInstruction } from "../utils/TypeInst";

export abstract class Instruction {
    constructor(public line: number, public column: number, public typeInst: TypesInstruction) { }
    public abstract execute(): any;
    public abstract ast(): Node;
}