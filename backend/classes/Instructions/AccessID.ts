import { Expression } from "../Interfaces/Expression";
import { Node } from "../Utils/Node";
import { ReturnType, Types } from "../Utils/Types";
import { TypesExp } from "../Utils/TypesExp";

export class AccessID extends Expression {
    private type: Types = Types.NULL
    constructor(line: number, column: number, private id: string) {
        super(line, column, TypesExp.ACCESS_ID);
    }

    public execute(): ReturnType {
        return { value: "a", type: this.type };
    }
    public ast(): Node {
        let node = new Node('ACCEDER VARIABLE')
        node.pushChild(new Node(this.id));
        return node;
    }
}