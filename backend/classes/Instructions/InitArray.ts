import { Expression } from "../Interfaces/Expression";
import { Instruction } from "../Interfaces/Instruction";
import { convertToType } from "../Utils/ConvertTypes";
import { getValueDefaultArray } from "../Utils/Defaults";
import { Node } from "../Utils/Node";
import { ReturnType, Types } from "../Utils/Types";
import { TypesInstruction } from "../Utils/TypeInst";

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
        node.pushChild(new Node(this.tempType))
        node.pushChild(new Node(this.id))
        node.pushChild(new Node("["))
        node.pushChild(new Node("]"))
        node.pushChild(new Node("="))
        if (this.values) {
        }else{
            let node1 = new Node("ASSIGMENT")
            node1.pushChild(new Node("NEW"));
            node1.pushChild(new Node("["));
            node1.pushChild(this.size.ast())
            node1.pushChild(new Node("]"));
            node.pushChild(node1);
        }
        return node;
    }
}