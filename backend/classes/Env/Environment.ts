import { ReturnType, Types } from "../Utils/Types";
import { Primitive } from "../Expressions/Primitive";
import { Symbol } from "./Symbol";

export class Environment {
    public ids: Map<string, Symbol> = new Map<string, Symbol>();
    constructor(private prev: Environment | null, public name: string) { }

    public reasignArrayList(id: string, index: number, value: Primitive): boolean {
        let env: Environment | null = this
        while (env) {
            if (env.ids.has(id.toLowerCase())) {
                let symbol: Symbol = env.ids.get(id.toLowerCase())!
                let temp: ReturnType = symbol.value[index]

                if (temp.type === Types.ARRAY) {
                    // console.log("temp", temp, "value", value)
                    symbol.value[index] = value
                    symbol.value[index].type = Types.ARRAY
                    return true
                }

                if (temp.type !== value.typeValue) {
                    return false

                }
                symbol.value[index] = value
                symbol.value[index].type = value.typeValue
                env.ids.set(id.toLowerCase(), symbol)
                return true
            }
            env = env.prev
        }
        return false
    }


    public saveArray(id: string, type: Types, values: any, line: number, column: number) {
        let env: Environment = this;
        if (env.ids.has(id.toLowerCase())) {
            return
        }

        env.ids.set(id.toLowerCase(), new Symbol(values, id, Types.ARRAY, type));
    }

    public getValueArray(id: string, i: number): Symbol | null {
        let env: Environment | null = this
        while (env) {
            if (env.ids.has(id.toLowerCase())) {
                let symbol: Symbol = env.ids.get(id.toLowerCase())!
                // console.log("symbol  ->", symbol.value[i])
                return symbol.value[i]
            }
            env = env.prev
        }
        return null
    }

    public addList(id: string,value: Primitive): boolean {
        let env: Environment | null = this
        while(env) {
            if(env.ids.has(id.toLowerCase())) {
                let symbol: Symbol = env.ids.get(id.toLowerCase())!
                symbol.value.push(value)
                env.ids.set(id.toLowerCase(),symbol)
                return true
            }
            env = env.prev
        }
        return false
    }

}