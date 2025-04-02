import { Types } from "./Types"

export function getValueDefaultArray(type: Types, typeBase: Types) {
    switch (typeBase) {
        case Types.INT:
            return { value: 0, type: type }
        case Types.DOUBLE:
            return { value: 0.0, type: type }
        case Types.BOOLEAN:
            return { value: true, type: type }
        case Types.CHAR:
            return { value: '0', type: type }
        case Types.STRING:
            return { value: "", type: type }
    }
}

export function getValueDefaultValue(type: Types) {
    switch (type) {
        case Types.INT:
            return 0
        case Types.DOUBLE:
            return 0.0
        case Types.BOOLEAN:
            return true
        case Types.CHAR:
            return '0'
        case Types.STRING:
            return ""
    }
}

