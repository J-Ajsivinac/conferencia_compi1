import { Expression } from "../Interfaces/Expression";
import { Symbol } from "../Env/Symbol";
import { Node } from "../Utils/Node";
import { ReturnType, Types } from "../Utils/Types";
import { TypesExp } from "../Utils/TypesExp";
import { globalSave } from "../../controllers/Interpreter";

export class AccessArray extends Expression {
    public types: Types = Types.NULL
    constructor(line: number, column: number, public id: string, public index: Expression) {
        super(line, column, TypesExp.ACCESS_ARRAY);
    }

    public execute(): ReturnType {
        let index: ReturnType = this.index.execute()
        const value: Symbol | null = globalSave.getValueArray(this.id, index.value)

        if (Array.isArray(value)) {
            return { value: value, type: Types.ARRAY }
        }
        if (value) {
            this.types = value.type
            // console.log(value)
            return { value: value.value, type: this.types }
        }
        return { value: 'NULL', type: Types.NULL }
    }

    public ast(): Node {
        let node = new Node("Acceder Array")
        node.pushChild(new Node(this.id))
        node.pushChild(new Node("["))
        node.pushChild(this.index.ast())
        node.pushChild(new Node("]"))        
        return node
    }

}