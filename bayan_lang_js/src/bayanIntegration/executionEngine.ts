/**
 * محرك التنفيذ - Execution Engine
 * Executes Bayan code using Baserah AI
 */

import { BayanConverter, BaserahRepresentation, BayanAST } from './bayanConverter';

export type ExecutionState = 'idle' | 'running' | 'paused' | 'completed' | 'error';
export type ExecutionMode = 'normal' | 'debug' | 'step' | 'trace';

export interface ExecutionContext {
  variables: Map<string, any>;
  functions: Map<string, Function>;
  callStack: string[];
  currentLine: number;
  timestamp: number;
}

export interface ExecutionResult {
  success: boolean;
  output: any;
  context: ExecutionContext;
  executionTime: number;
  errors: string[];
  warnings: string[];
}

export interface DebugBreakpoint {
  line: number;
  condition?: string;
  enabled: boolean;
}

export class ExecutionEngine {
  private converter: BayanConverter;
  private state: ExecutionState = 'idle';
  private mode: ExecutionMode = 'normal';
  private context: ExecutionContext;
  private breakpoints: Map<number, DebugBreakpoint> = new Map();
  private executionHistory: ExecutionResult[] = [];
  
  constructor(converter?: BayanConverter) {
    this.converter = converter || new BayanConverter();
    this.context = this.createEmptyContext();
  }
  
  private createEmptyContext(): ExecutionContext {
    return {
      variables: new Map(),
      functions: new Map(),
      callStack: [],
      currentLine: 0,
      timestamp: Date.now()
    };
  }
  
  execute(bayanCode: string, mode: ExecutionMode = 'normal'): ExecutionResult {
    const startTime = Date.now();
    const errors: string[] = [];
    const warnings: string[] = [];
    
    this.state = 'running';
    this.mode = mode;
    
    try {
      // Convert Bayan to Baserah
      const conversionResult = this.converter.convertBayanToBaserah(bayanCode);
      
      if (!conversionResult.success || !conversionResult.result) {
        errors.push(...conversionResult.errors);
        throw new Error('Conversion failed');
      }
      
      // Execute the Baserah representation
      const output = this.executeBaserah(conversionResult.result as BaserahRepresentation);
      
      this.state = 'completed';
      
      const result: ExecutionResult = {
        success: true,
        output,
        context: { ...this.context },
        executionTime: Date.now() - startTime,
        errors,
        warnings
      };
      
      this.executionHistory.push(result);
      
      return result;
    } catch (error) {
      this.state = 'error';
      errors.push(error instanceof Error ? error.message : String(error));
      
      const result: ExecutionResult = {
        success: false,
        output: null,
        context: { ...this.context },
        executionTime: Date.now() - startTime,
        errors,
        warnings
      };
      
      this.executionHistory.push(result);
      
      return result;
    }
  }
  
  private executeBaserah(representation: BaserahRepresentation): any {
    // Execute based on type
    switch (representation.type) {
      case 'function':
        return this.executeFunction(representation);
      case 'object':
        return this.executeObject(representation);
      case 'number':
        return this.executeNumber(representation);
      case 'string':
        return this.executeString(representation);
      case 'boolean':
        return this.executeBoolean(representation);
      case 'array':
        return this.executeArray(representation);
      default:
        return null;
    }
  }
  
  private executeFunction(representation: BaserahRepresentation): any {
    const name = representation.properties.get('name') || 'anonymous';
    const body = representation.properties.get('body') || [];
    
    // Create function
    const func = (...args: any[]) => {
      this.context.callStack.push(name);
      
      // Execute function body
      let result = null;
      for (const statement of body) {
        result = this.executeBaserah(statement);
      }
      
      this.context.callStack.pop();
      return result;
    };
    
    // Store function
    this.context.functions.set(name, func);
    
    return func;
  }
  
  private executeObject(representation: BaserahRepresentation): any {
    const name = representation.properties.get('name');
    const value = representation.properties.get('value');
    
    if (name) {
      // Variable assignment
      this.context.variables.set(name, value);
      return value;
    }
    
    return representation.properties;
  }
  
  private executeNumber(representation: BaserahRepresentation): number {
    const value = representation.properties.get('value');
    return typeof value === 'number' ? value : parseFloat(String(value));
  }
  
  private executeString(representation: BaserahRepresentation): string {
    const value = representation.properties.get('value');
    return String(value);
  }
  
  private executeBoolean(representation: BaserahRepresentation): boolean {
    const value = representation.properties.get('value');
    return Boolean(value);
  }
  
  private executeArray(representation: BaserahRepresentation): any[] {
    const elements = representation.properties.get('elements') || [];
    return elements.map((elem: any) => this.executeBaserah(elem));
  }
  
  executeStep(): ExecutionResult {
    // Execute one step in debug mode
    this.mode = 'step';
    
    // This is a simplified implementation
    // In a real implementation, this would execute one line at a time
    
    return {
      success: true,
      output: null,
      context: { ...this.context },
      executionTime: 0,
      errors: [],
      warnings: []
    };
  }
  
  pause(): void {
    if (this.state === 'running') {
      this.state = 'paused';
    }
  }
  
  resume(): void {
    if (this.state === 'paused') {
      this.state = 'running';
    }
  }
  
  stop(): void {
    this.state = 'idle';
    this.context = this.createEmptyContext();
  }
  
  addBreakpoint(line: number, condition?: string): void {
    this.breakpoints.set(line, {
      line,
      condition,
      enabled: true
    });
  }
  
  removeBreakpoint(line: number): void {
    this.breakpoints.delete(line);
  }
  
  toggleBreakpoint(line: number): void {
    const breakpoint = this.breakpoints.get(line);
    if (breakpoint) {
      breakpoint.enabled = !breakpoint.enabled;
    }
  }
  
  getBreakpoints(): DebugBreakpoint[] {
    return Array.from(this.breakpoints.values());
  }
  
  getVariable(name: string): any {
    return this.context.variables.get(name);
  }
  
  setVariable(name: string, value: any): void {
    this.context.variables.set(name, value);
  }
  
  getFunction(name: string): Function | undefined {
    return this.context.functions.get(name);
  }
  
  getCallStack(): string[] {
    return [...this.context.callStack];
  }
  
  getState(): ExecutionState {
    return this.state;
  }
  
  getMode(): ExecutionMode {
    return this.mode;
  }
  
  getContext(): ExecutionContext {
    return { ...this.context };
  }
  
  getExecutionHistory(limit?: number): ExecutionResult[] {
    if (limit) {
      return this.executionHistory.slice(-limit);
    }
    return [...this.executionHistory];
  }
  
  clearHistory(): void {
    this.executionHistory = [];
  }
  
  getStatistics(): {
    totalExecutions: number;
    successfulExecutions: number;
    failedExecutions: number;
    averageExecutionTime: number;
    totalVariables: number;
    totalFunctions: number;
    totalBreakpoints: number;
  } {
    const successful = this.executionHistory.filter(r => r.success).length;
    const failed = this.executionHistory.filter(r => !r.success).length;
    
    const totalTime = this.executionHistory.reduce((sum, r) => sum + r.executionTime, 0);
    const avgTime = this.executionHistory.length > 0 
      ? totalTime / this.executionHistory.length 
      : 0;
    
    return {
      totalExecutions: this.executionHistory.length,
      successfulExecutions: successful,
      failedExecutions: failed,
      averageExecutionTime: avgTime,
      totalVariables: this.context.variables.size,
      totalFunctions: this.context.functions.size,
      totalBreakpoints: this.breakpoints.size
    };
  }
  
  reset(): void {
    this.state = 'idle';
    this.mode = 'normal';
    this.context = this.createEmptyContext();
    this.breakpoints.clear();
    this.executionHistory = [];
  }
}

