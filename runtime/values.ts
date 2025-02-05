export type ValueType = "null" | "number" | "boolean";

export interface RuntimeVal {
    type: ValueType;
}

export interface NullVal extends RuntimeVal {
    type: "null";
    value: null;
}

export function MK_NULL(): NullVal {
    return { type: "null", value: null } as NullVal;
}

export interface NumberVal extends RuntimeVal {
    type: "number";
    value: number;
}

export function MK_NUMBER(value: number = 0): NumberVal {
    return { type: "number", value } as NumberVal;
}

export interface BoolVal extends RuntimeVal {
    type: "boolean";
    value: boolean;
}

export function MK_BOOL(value: boolean = false): BoolVal {
    return { type: "boolean", value } as BoolVal;
}
