import { Expression } from "../Interfaces/Expression";
import { Instruction } from "../Interfaces/Instruction";
import { Primitive } from "../Expressions/Primitive";
import { ReturnType } from "../Utils/Types";
import { TypesInstruction } from "../Utils/TypeInst";
import { Node } from "../Utils/Node";

export class AsignArray extends Instruction {
    constructor(line: number, column: number, public id: string, public index: Expression, public value: Expression) {
        super(line, column, TypesInstruction.ASSIGNMENT_ARRAY)
    }

    public execute() {
        let index: ReturnType = this.index.execute()
        let value: ReturnType = this.value.execute()
        // console.log("index  asigns", value.type)
        let primitive = new Primitive(this.line, this.column, value.value, value.type)
        // env.reasignArrayList(this.id, index.value, primitive)
    }
    public ast(): Node {
        let node = new  Node('ASIGNAR ARRAY')
        node.pushChild(new Node(this.id))
        node.pushChild(new Node("[")) 
        node.pushChild(this.index.ast())
        node.pushChild(new Node("]"))
        node.pushChild(new Node("="))
        node.pushChild(this.value.ast())
        return node;
    }

}