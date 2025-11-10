/**
 * مدير التكامل - Integration Manager
 * Manages the integration between Bayan and Baserah AI
 */
import { BayanConverter, ConversionResult } from './bayanConverter';
import { ExecutionEngine, ExecutionResult, ExecutionMode } from './executionEngine';
import { ResourceManager } from './resourceManager';
export type IntegrationMode = 'development' | 'production' | 'testing' | 'debugging';
export type IntegrationStatus = 'active' | 'inactive' | 'error' | 'maintenance';
export interface IntegrationSettings {
    mode: IntegrationMode;
    autoConvert: boolean;
    autoExecute: boolean;
    enableCaching: boolean;
    enableProfiling: boolean;
    maxExecutionTime: number;
    maxMemoryUsage: number;
}
export interface IntegrationSession {
    id: string;
    startTime: number;
    endTime: number | null;
    conversions: number;
    executions: number;
    errors: number;
    warnings: number;
}
export interface ProfilingData {
    conversionTime: number;
    executionTime: number;
    memoryUsage: number;
    cpuUsage: number;
    cacheHits: number;
    cacheMisses: number;
}
export declare class IntegrationManager {
    private converter;
    private executionEngine;
    private resourceManager;
    private status;
    private settings;
    private currentSession;
    private sessions;
    private sessionCounter;
    private profilingData;
    constructor(settings?: Partial<IntegrationSettings>);
    startSession(): IntegrationSession;
    endSession(): IntegrationSession | null;
    processCode(bayanCode: string, execute?: boolean): {
        conversion: ConversionResult | null;
        execution: ExecutionResult | null;
        profiling: ProfilingData | null;
    };
    private getExecutionMode;
    convertCode(bayanCode: string): ConversionResult;
    executeCode(bayanCode: string, mode?: ExecutionMode): ExecutionResult;
    getConverter(): BayanConverter;
    getExecutionEngine(): ExecutionEngine;
    getResourceManager(): ResourceManager;
    getStatus(): IntegrationStatus;
    getSettings(): IntegrationSettings;
    updateSettings(newSettings: Partial<IntegrationSettings>): void;
    getCurrentSession(): IntegrationSession | null;
    getSessions(limit?: number): IntegrationSession[];
    getProfilingData(limit?: number): ProfilingData[];
    getResourceUsage(): {
        memory: ReturnType<ResourceManager['getResourceUsage']>;
        cpu: ReturnType<ResourceManager['getResourceUsage']>;
        storage: ReturnType<ResourceManager['getResourceUsage']>;
    };
    getStatistics(): {
        converter: ReturnType<BayanConverter['getStatistics']>;
        execution: ReturnType<ExecutionEngine['getStatistics']>;
        resources: ReturnType<ResourceManager['getStatistics']>;
        sessions: {
            total: number;
            active: boolean;
            totalConversions: number;
            totalExecutions: number;
            totalErrors: number;
            totalWarnings: number;
        };
        profiling: {
            averageConversionTime: number;
            averageExecutionTime: number;
            averageMemoryUsage: number;
            averageCpuUsage: number;
        };
    };
    clearHistory(): void;
    reset(): void;
}
