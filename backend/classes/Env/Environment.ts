import { ReturnType, Types } from "../Utils/Types";
import { Primitive } from "../Expressions/Primitive";
import { Symbol } from "./Symbol";

// Clase que representa el entorno (o scope) de ejecución.
// Guarda las variables declaradas en ese entorno (y permite acceder a los anteriores).
export class Environment {
    // Mapa que asocia nombres de variables (en minúsculas) con símbolos.
    public ids: Map<string, Symbol> = new Map<string, Symbol>();

    // El entorno puede tener un entorno anterior (padre) para manejar scopes anidados.
    constructor(private prev: Environment | null, public name: string) { }

    // Reasigna un valor en una posición específica de una lista (array).
    public reasignArrayList(id: string, index: number, value: Primitive): boolean {
        let env: Environment | null = this;
        console.log(`Reasignando en el arreglo '${id}', índice ${index}, valor ${JSON.stringify(value)}`);
        while (env) {
            if (env.ids.has(id.toLowerCase())) {
                let symbol: Symbol = env.ids.get(id.toLowerCase())!;
                let temp: ReturnType = symbol.value[index];

                // Si el valor actual es un array, se sobreescribe directamente.
                if (temp.type === Types.ARRAY) {
                    console.log(`El valor en el índice ${index} es un arreglo, se sobreescribe.`);
                    symbol.value[index] = value;
                    symbol.value[index].type = Types.ARRAY;
                    return true;
                }

                // Si el tipo no coincide, se rechaza la asignación.
                if (temp.type !== value.typeValue) {
                    console.log(`Error: el tipo no coincide con el valor a reasignar.`);
                    return false;
                }

                // Si los tipos coinciden, se hace la reasignación.
                console.log(`El tipo coincide, reasignando el valor.`);
                symbol.value[index] = value;
                symbol.value[index].type = value.typeValue;
                env.ids.set(id.toLowerCase(), symbol);
                return true;
            }
            env = env.prev; // Se busca en entornos anteriores si no se encuentra en el actual.
        }
        console.log(`No se encontró la variable '${id}' en el entorno.`);
        return false; // No se encontró la variable.
    }

    // Guarda un nuevo arreglo en el entorno actual, si no existe previamente.
    public saveArray(id: string, type: Types, values: any, line: number, column: number) {
        let env: Environment = this;
        console.log(`Guardando arreglo '${id}' con valores: ${JSON.stringify(values)}`);
        if (env.ids.has(id.toLowerCase())) {
            console.log(`El arreglo '${id}' ya existe. No se guarda nada.`);
            return; // Si ya existe, no se guarda nada.
        }

        // Se guarda con el tipo general de ARRAY y el tipo de los elementos.
        console.log(`El arreglo '${id}' no existía, se guarda ahora.`);
        env.ids.set(id.toLowerCase(), new Symbol(values, id, Types.ARRAY, type));
    }

    // Obtiene un valor específico dentro de un arreglo, accediendo al entorno correcto.
    public getValueArray(id: string, i: number): Symbol | null {
        let env: Environment | null = this;
        console.log(`Accediendo al valor del arreglo '${id}', índice ${i}`);
        while (env) {
            if (env.ids.has(id.toLowerCase())) {
                let symbol: Symbol = env.ids.get(id.toLowerCase())!;
                console.log(`Valor encontrado: ${JSON.stringify(symbol.value[i])}`);
                return symbol.value[i]; // Devuelve el valor en la posición i.
            }
            env = env.prev;
        }
        console.log(`No se encontró el arreglo '${id}' en el entorno.`);
        return null; // No se encontró.
    }

    // Agrega un nuevo valor al final de un arreglo (simula el método `.add()` del lenguaje).
    public addList(id: string, value: Primitive): boolean {
        let env: Environment | null = this;
        console.log(`Agregando valor '${JSON.stringify(value)}' al arreglo '${id}'`);
        while (env) {
            if (env.ids.has(id.toLowerCase())) {
                let symbol: Symbol = env.ids.get(id.toLowerCase())!;
                console.log(`Valor agregado al arreglo '${id}'. Nuevo valor: ${JSON.stringify(symbol.value)}`);
                symbol.value.push(value); // Agrega el nuevo valor.
                env.ids.set(id.toLowerCase(), symbol);
                return true;
            }
            env = env.prev;
        }
        console.log(`No se encontró el arreglo '${id}' en el entorno.`);
        return false; // No se encontró el arreglo.
    }
}
