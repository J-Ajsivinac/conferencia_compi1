import { Node } from "../utils/Node";
import { ReturnType } from "../utils/Types";
import { TypesExp } from "../utils/TypesExp";

export abstract class Expression {
    constructor(public line: number, public column: number, public typeExp: TypesExp) { }
    // Metodo abstracto para ejecutar la expresion
    // Este metodo debe ser implementado por las clases hijas
    // y debe retornar un objeto de tipo ReturnType
    public abstract execute(): ReturnType;
    public abstract ast(): Node;
}