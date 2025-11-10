/**
 * محرك التنفيذ - Execution Engine
 * Executes Bayan code using Baserah AI
 */
import { BayanConverter } from './bayanConverter';
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
export declare class ExecutionEngine {
    private converter;
    private state;
    private mode;
    private context;
    private breakpoints;
    private executionHistory;
    constructor(converter?: BayanConverter);
    private createEmptyContext;
    execute(bayanCode: string, mode?: ExecutionMode): ExecutionResult;
    private executeBaserah;
    private executeFunction;
    private executeObject;
    private executeNumber;
    private executeString;
    private executeBoolean;
    private executeArray;
    executeStep(): ExecutionResult;
    pause(): void;
    resume(): void;
    stop(): void;
    addBreakpoint(line: number, condition?: string): void;
    removeBreakpoint(line: number): void;
    toggleBreakpoint(line: number): void;
    getBreakpoints(): DebugBreakpoint[];
    getVariable(name: string): any;
    setVariable(name: string, value: any): void;
    getFunction(name: string): Function | undefined;
    getCallStack(): string[];
    getState(): ExecutionState;
    getMode(): ExecutionMode;
    getContext(): ExecutionContext;
    getExecutionHistory(limit?: number): ExecutionResult[];
    clearHistory(): void;
    getStatistics(): {
        totalExecutions: number;
        successfulExecutions: number;
        failedExecutions: number;
        averageExecutionTime: number;
        totalVariables: number;
        totalFunctions: number;
        totalBreakpoints: number;
    };
    reset(): void;
}
