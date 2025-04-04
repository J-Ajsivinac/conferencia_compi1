import { Expression } from "../Interfaces/Expression";
import { Instruction } from "../Interfaces/Instruction";
import { convertToType } from "../Utils/ConvertTypes";
import { getValueDefaultValue } from "../Utils/Defaults";
import { ReturnType, Types } from "../Utils/Types";
import { TypesInstruction } from "../Utils/TypeInst";
import { Node } from "../Utils/Node";

export class InitID extends Instruction {
    private type: Types;
    constructor(line: number, column: number, private temptype: string, private ids: string[], private value: Expression) {
        super(line, column, TypesInstruction.INIT_ID)
        this.type = convertToType(this.temptype)
    }

    public execute() {
        if (this.value) {
            const val: ReturnType = this.value.execute()
        }
    }

    private getType(type: Types): string {
        switch (type) {
            case Types.INT:
                return "int"
            case Types.DOUBLE:
                return "double"
            case Types.BOOLEAN:
                return "boolean"
            case Types.CHAR:
                return "char"
            case Types.STRING:
                return "string"
            case Types.NULL:
                return "NULL"
            default:
                return "NULL"
        }
    }

    public ast(): Node {
        let node = new Node('DECLARACION')
        node.pushChild(new Node(this.getType(this.type)));
        node.pushChild(new Node(this.ids[0]));
        node.pushChild(new Node("="));
        if (this.value) {
            node.pushChild(this.value.ast())
        } else {
            node.pushChild(new Node("Default Value"));
            node.pushChild(new Node(`${getValueDefaultValue(this.type)}`));
        }
        return node;
    }
}