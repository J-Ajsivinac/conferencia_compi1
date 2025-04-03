import { Node } from "../Utils/Node";
import { TypesInstruction } from "../Utils/TypeInst";

export abstract class Instruction {
    constructor(public line: number, public column: number, public typeInst: TypesInstruction) { }
    public abstract execute(): any;
    public abstract ast(): Node;
}