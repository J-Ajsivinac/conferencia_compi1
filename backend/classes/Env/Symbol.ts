import { Types } from "../Utils/Types";

// Clase que representa un símbolo (variable o arreglo) dentro de un entorno.
export class Symbol {
    constructor(
        public value: any,               // Valor actual del símbolo (puede ser un valor primitivo o un arreglo).
        public id: string,               // Nombre de la variable (convertido a minúsculas para evitar problemas de mayúsculas/minúsculas).
        public type: Types,              // Tipo general del símbolo (por ejemplo: INT, DOUBLE, ARRAY...).
        public arrayType: Types | undefined // Si es un arreglo, este campo guarda el tipo de los elementos del arreglo.
    ) {
        this.id = id.toLowerCase(); // Se asegura de que el id se maneje de forma insensible a mayúsculas.
    }
}
