import { Types } from "./Types";

export function convertToType(type: String): Types {
    type = type.toLowerCase();
    if (type === 'int') {
        return Types.INT
    }
    if (type === 'double') {
        return Types.DOUBLE
    }
    if (type === 'bool') {
        return Types.BOOLEAN
    }
    if (type === 'char') {
        return Types.CHAR
    }
    if (type === 'std::string') {
        return Types.STRING
    }
    if (type === 'array') {
        return Types.ARRAY
    }
    return Types.NULL
}