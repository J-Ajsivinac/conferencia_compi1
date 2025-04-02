export enum Types {
    INT,
    DOUBLE,
    BOOLEAN,
    CHAR,
    STRING,
    ARRAY,
    NULL
}

// Linea para exportar el tipo de dato
export type ReturnType = { value: any, type: Types }