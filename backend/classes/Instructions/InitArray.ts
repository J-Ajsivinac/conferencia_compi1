import { Expression } from "../interfaces/Expression";
import { Instruction } from "../interfaces/Instruction";
import { convertToType } from "../utils/ConvertTypes";
import { getValueDefaultArray } from "../utils/Defaults";
import { Node } from "../utils/Node";
import { ReturnType, Types } from "../utils/Types";
import { TypesInstruction } from "../utils/TypeInst";

export class InitArray extends Instruction {

    private type: Types;
    constructor(line: number, column: number, private id: string, private tempType: string, public size: Expression, private values: any[]) {
        super(line, column, TypesInstruction.INIT_ARRAY)
        this.type = convertToType(tempType)
    }

    public execute() {
        // console.log("values", this.values)
        if (!this.size) {
            let values_save: ReturnType[] = []
            // console.log(this.id, " -> ", this.values)
            
            // env.saveArray(this.id, this.type, values_save, this.line, this.column)
        } else {
            let length: ReturnType = this.size.execute()
            // env.saveArray(this.id, this.type, this.arrayByLength(length.value, this.type), this.line, this.column)
        }
        // this.values.splice(0, this.values.length)
    }

    public ast(): Node {
        let node = new Node("Declarar Array")
        return node;
    }
}