/**
 * بيئة التنفيذ للمفسر
 */
export type Value = number | string | boolean | null | undefined | FunctionValue | ClassValue | ObjectValue | ArrayValue;
export interface FunctionValue {
    type: 'function';
    name: string;
    parameters: string[];
    body: any;
    closure: Environment;
    isAsync: boolean;
    isNative?: boolean;
    nativeImpl?: (...args: any[]) => any;
}
export interface ClassValue {
    type: 'class';
    name: string;
    superClass: ClassValue | null;
    constructor: FunctionValue | null;
    methods: Map<string, FunctionValue>;
    properties: Map<string, Value>;
    staticMethods: Map<string, FunctionValue>;
    staticProperties: Map<string, Value>;
}
export interface ObjectValue {
    type: 'object';
    properties: Map<string, Value>;
    prototype: ClassValue | null;
}
export interface ArrayValue {
    type: 'array';
    elements: Value[];
}
/**
 * البيئة - تخزين المتغيرات والدوال
 */
export declare class Environment {
    private variables;
    private parent;
    constructor(parent?: Environment | null);
    /**
     * تعريف متغير جديد
     */
    define(name: string, value: Value): void;
    /**
     * تحديث قيمة متغير موجود
     */
    set(name: string, value: Value): void;
    /**
     * الحصول على قيمة متغير
     */
    get(name: string): Value;
    /**
     * التحقق من وجود متغير
     */
    has(name: string): boolean;
    /**
     * نسخ البيئة
     */
    clone(): Environment;
    /**
     * الحصول على البيئة العامة
     */
    getGlobal(): Environment;
}
