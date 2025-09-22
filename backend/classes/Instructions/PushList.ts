import { Expression } from "../Interfaces/Expression";
import { Instruction } from "../Interfaces/Instruction";
import { TypesInstruction } from "../Utils/TypeInst";
import { ReturnType } from "../Utils/Types";
import { Primitive } from '../Expressions/Primitive';
import { globalSave } from "../../Controllers/Interpreter";
import { Node } from "../Utils/Node";

export class PushList extends Instruction {
    constructor(line: number,column: number,private id: string,private value: Expression) {
        super(line,column,TypesInstruction.ADD_LIST)
    }
    public execute() {
        let value: ReturnType = this.value.execute()
        let primitive: Primitive = new Primitive(this.line,this.column,value.value,value.type)
        globalSave.addList(this.id,primitive)
    }

    public ast():Node{
        let node = new Node("Push_List")
        node.pushChild(new Node(this.id))
        node.pushChild(new Node("add"))
        node.pushChild(new Node("("))
        node.pushChild(this.value.ast())
        node.pushChild(new Node(")"))

        return node
    }
}