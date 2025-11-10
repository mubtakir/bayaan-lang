/**
 * بيئة التنفيذ للمفسر
 */

export type Value = 
  | number 
  | string 
  | boolean 
  | null 
  | undefined 
  | FunctionValue 
  | ClassValue 
  | ObjectValue 
  | ArrayValue;

export interface FunctionValue {
  type: 'function';
  name: string;
  parameters: string[];
  body: any; // BlockStatement
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
export class Environment {
  private variables: Map<string, Value> = new Map();
  private parent: Environment | null;

  constructor(parent: Environment | null = null) {
    this.parent = parent;
  }

  /**
   * تعريف متغير جديد
   */
  define(name: string, value: Value): void {
    this.variables.set(name, value);
  }

  /**
   * تحديث قيمة متغير موجود
   */
  set(name: string, value: Value): void {
    if (this.variables.has(name)) {
      this.variables.set(name, value);
      return;
    }

    if (this.parent) {
      this.parent.set(name, value);
      return;
    }

    throw new Error(`المتغير غير معرّف: ${name}`);
  }

  /**
   * الحصول على قيمة متغير
   */
  get(name: string): Value {
    if (this.variables.has(name)) {
      return this.variables.get(name)!;
    }

    if (this.parent) {
      return this.parent.get(name);
    }

    throw new Error(`المتغير غير معرّف: ${name}`);
  }

  /**
   * التحقق من وجود متغير
   */
  has(name: string): boolean {
    if (this.variables.has(name)) {
      return true;
    }

    if (this.parent) {
      return this.parent.has(name);
    }

    return false;
  }

  /**
   * نسخ البيئة
   */
  clone(): Environment {
    const newEnv = new Environment(this.parent);
    newEnv.variables = new Map(this.variables);
    return newEnv;
  }

  /**
   * الحصول على البيئة العامة
   */
  getGlobal(): Environment {
    let env: Environment = this;
    while (env.parent) {
      env = env.parent;
    }
    return env;
  }
}

