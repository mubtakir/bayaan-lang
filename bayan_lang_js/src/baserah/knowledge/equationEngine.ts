/**
 * محرك المعادلات المنطقية
 * Logical Equation Engine
 * 
 * نظام للمعادلات المنطقية: الفاعل + الفعل + المفعول = النتائج
 * System for logical equations: Subject + Action + Object = Results
 */

import { Event, EventType, EventResult } from './eventEngine';

/**
 * عنصر المعادلة - Equation Element
 */
export class EquationElement {
  constructor(
    public name: string,                    // اسم العنصر - Element name
    public type: 'subject' | 'action' | 'object' | 'result',  // نوع العنصر
    public value: any = null,               // القيمة - Value
    public properties: Map<string, any> = new Map()  // خصائص إضافية
  ) {}

  toString(): string {
    return `${this.name} (${this.type})`;
  }
}

/**
 * المعادلة المنطقية - Logical Equation
 * 
 * تمثل: الفاعل + الفعل + المفعول = النتائج
 * Represents: Subject + Action + Object = Results
 */
export class LogicalEquation {
  private subject?: EquationElement;
  private action?: EquationElement;
  private object?: EquationElement;
  private results: EquationElement[] = [];

  constructor(
    public name: string                     // اسم المعادلة - Equation name
  ) {}

  /**
   * تعيين الفاعل
   * Set subject
   */
  setSubject(subject: EquationElement): void {
    this.subject = subject;
  }

  /**
   * تعيين الفعل
   * Set action
   */
  setAction(action: EquationElement): void {
    this.action = action;
  }

  /**
   * تعيين المفعول به
   * Set object
   */
  setObject(object: EquationElement): void {
    this.object = object;
  }

  /**
   * إضافة نتيجة
   * Add result
   */
  addResult(result: EquationElement): void {
    this.results.push(result);
  }

  /**
   * الحصول على الفاعل
   * Get subject
   */
  getSubject(): EquationElement | undefined {
    return this.subject;
  }

  /**
   * الحصول على الفعل
   * Get action
   */
  getAction(): EquationElement | undefined {
    return this.action;
  }

  /**
   * الحصول على المفعول به
   * Get object
   */
  getObject(): EquationElement | undefined {
    return this.object;
  }

  /**
   * الحصول على النتائج
   * Get results
   */
  getResults(): EquationElement[] {
    return this.results;
  }

  /**
   * التحقق من اكتمال المعادلة
   * Check if equation is complete
   */
  isComplete(): boolean {
    return this.subject !== undefined && 
           this.action !== undefined && 
           this.results.length > 0;
  }

  /**
   * تحويل إلى حدث
   * Convert to event
   */
  toEvent(): Event {
    const event = new Event(
      this.name,
      EventType.ACTION,
      this.subject?.name,
      this.object?.name
    );

    // Add results
    for (const result of this.results) {
      const eventResult = new EventResult(
        result.name,
        new Map(),
        new Map(),
        result.value?.toString() || ''
      );
      event.addResult(eventResult);
    }

    return event;
  }

  toString(): string {
    let result = `${this.name}:\n`;
    
    if (this.subject) {
      result += `  ${this.subject.toString()}`;
    }
    
    if (this.action) {
      result += ` + ${this.action.toString()}`;
    }
    
    if (this.object) {
      result += ` + ${this.object.toString()}`;
    }
    
    if (this.results.length > 0) {
      result += ` =\n`;
      for (const res of this.results) {
        result += `    ${res.toString()}\n`;
      }
    }

    return result;
  }
}

/**
 * نوع العملية - Operation Type
 */
export enum OperationType {
  ADD = 'جمع',                     // Addition
  SUBTRACT = 'طرح',                // Subtraction
  MULTIPLY = 'ضرب',                // Multiplication
  DIVIDE = 'قسمة',                 // Division
  NEGATE = 'نفي',                  // Negation
  EQUAL = 'يساوي',                 // Equality
  OPPOSITE = 'عكس'                 // Opposite
}

/**
 * العملية المنطقية - Logical Operation
 * 
 * مثل: الحر = - البرد
 * Example: Hot = - Cold
 */
export class LogicalOperation {
  constructor(
    public left: string,                    // الطرف الأيسر - Left side
    public operation: OperationType,        // العملية - Operation
    public right: string,                   // الطرف الأيمن - Right side
    public result?: string                  // النتيجة - Result
  ) {}

  /**
   * تقييم العملية
   * Evaluate operation
   */
  evaluate(values: Map<string, any>): any {
    const leftValue = values.get(this.left);
    const rightValue = values.get(this.right);

    if (leftValue === undefined || rightValue === undefined) {
      return undefined;
    }

    switch (this.operation) {
      case OperationType.ADD:
        return leftValue + rightValue;
      
      case OperationType.SUBTRACT:
        return leftValue - rightValue;
      
      case OperationType.MULTIPLY:
        return leftValue * rightValue;
      
      case OperationType.DIVIDE:
        return rightValue !== 0 ? leftValue / rightValue : undefined;
      
      case OperationType.NEGATE:
        return -rightValue;
      
      case OperationType.EQUAL:
        return leftValue === rightValue;
      
      case OperationType.OPPOSITE:
        return -rightValue;
      
      default:
        return undefined;
    }
  }

  toString(): string {
    let op = '';
    switch (this.operation) {
      case OperationType.ADD: op = '+'; break;
      case OperationType.SUBTRACT: op = '-'; break;
      case OperationType.MULTIPLY: op = '×'; break;
      case OperationType.DIVIDE: op = '÷'; break;
      case OperationType.NEGATE: op = '-'; break;
      case OperationType.EQUAL: op = '='; break;
      case OperationType.OPPOSITE: op = '-'; break;
    }

    if (this.result) {
      return `${this.left} ${op} ${this.right} = ${this.result}`;
    }
    return `${this.left} ${op} ${this.right}`;
  }
}

/**
 * محرك المعادلات - Equation Engine
 */
export class EquationEngine {
  private equations: Map<string, LogicalEquation> = new Map();
  private operations: Map<string, LogicalOperation> = new Map();

  /**
   * إضافة معادلة
   * Add equation
   */
  addEquation(equation: LogicalEquation): void {
    this.equations.set(equation.name, equation);
  }

  /**
   * الحصول على معادلة
   * Get equation
   */
  getEquation(name: string): LogicalEquation | undefined {
    return this.equations.get(name);
  }

  /**
   * إضافة عملية
   * Add operation
   */
  addOperation(name: string, operation: LogicalOperation): void {
    this.operations.set(name, operation);
  }

  /**
   * الحصول على عملية
   * Get operation
   */
  getOperation(name: string): LogicalOperation | undefined {
    return this.operations.get(name);
  }

  /**
   * إنشاء معادلة بسيطة
   * Create simple equation
   * 
   * مثل: أحمد + أكل + تفاحة = أحمد(شبع) + حقل(نقص تفاحة)
   */
  createSimpleEquation(
    name: string,
    subject: string,
    action: string,
    object: string,
    results: Array<{name: string, description: string}>
  ): LogicalEquation {
    const equation = new LogicalEquation(name);
    
    equation.setSubject(new EquationElement(subject, 'subject'));
    equation.setAction(new EquationElement(action, 'action'));
    equation.setObject(new EquationElement(object, 'object'));
    
    for (const result of results) {
      equation.addResult(new EquationElement(
        result.name,
        'result',
        result.description
      ));
    }

    this.addEquation(equation);
    return equation;
  }

  /**
   * إنشاء عملية عكسية
   * Create opposite operation
   * 
   * مثل: الحر = - البرد
   */
  createOppositeOperation(
    name: string,
    left: string,
    right: string
  ): LogicalOperation {
    const operation = new LogicalOperation(
      left,
      OperationType.OPPOSITE,
      right,
      left
    );

    this.addOperation(name, operation);
    return operation;
  }

  /**
   * الحصول على جميع المعادلات
   * Get all equations
   */
  getAllEquations(): LogicalEquation[] {
    return Array.from(this.equations.values());
  }

  /**
   * الحصول على جميع العمليات
   * Get all operations
   */
  getAllOperations(): LogicalOperation[] {
    return Array.from(this.operations.values());
  }

  /**
   * البحث عن معادلات حسب الفاعل
   * Find equations by subject
   */
  findBySubject(subject: string): LogicalEquation[] {
    return this.getAllEquations().filter(eq => 
      eq.getSubject()?.name === subject
    );
  }

  /**
   * البحث عن معادلات حسب الفعل
   * Find equations by action
   */
  findByAction(action: string): LogicalEquation[] {
    return this.getAllEquations().filter(eq => 
      eq.getAction()?.name === action
    );
  }
}

