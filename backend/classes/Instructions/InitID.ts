import { Expression } from "../interfaces/Expression";
import { Instruction } from "../interfaces/Instruction";
import { convertToType } from "../utils/ConvertTypes";
import { getValueDefaultValue } from "../utils/Defaults";
import { ReturnType, Types } from "../utils/Types";
import { TypesInstruction } from "../utils/TypeInst";
import { Node } from "../utils/Node";

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
                return "INT"
            case Types.DOUBLE:
                return "DOUBLE"
            case Types.BOOLEAN:
                return "BOOLEAN"
            case Types.CHAR:
                return "CHAR"
            case Types.STRING:
                return "STRING"
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