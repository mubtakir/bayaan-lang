/**
 * مدير الأنظمة المتقدمة - Advanced Systems Manager
 * Manages all advanced systems and their integration
 */
import { AnalysisEngine, AnalysisResult, AnalysisType, AnalysisLevel } from './analysisEngine';
import { SolutionGenerator, Problem, Solution, GenerationOptions } from './solutionGenerator';
import { PerformanceOptimizer, OptimizationTask, OptimizationResult, PerformanceMetrics, OptimizationLevel } from './performanceOptimizer';
export type SystemMode = 'analysis' | 'solution' | 'optimization' | 'integrated';
export type SystemStatus = 'idle' | 'active' | 'busy' | 'error';
export interface SystemSettings {
    mode: SystemMode;
    autoOptimize: boolean;
    autoAnalyze: boolean;
    defaultAnalysisLevel: AnalysisLevel;
    defaultOptimizationLevel: OptimizationLevel;
    performanceTracking: boolean;
}
export interface IntegratedTask {
    id: string;
    description: string;
    requiresAnalysis: boolean;
    requiresSolution: boolean;
    requiresOptimization: boolean;
    priority: number;
    timestamp: number;
}
export interface IntegratedResult {
    taskId: string;
    analysis: AnalysisResult | null;
    solution: Solution | null;
    optimization: OptimizationResult | null;
    overallSuccess: boolean;
    totalTime: number;
    timestamp: number;
}
export declare class AdvancedSystemsManager {
    private analysisEngine;
    private solutionGenerator;
    private performanceOptimizer;
    private settings;
    private status;
    private tasks;
    private results;
    private taskCounter;
    constructor(settings?: Partial<SystemSettings>);
    processIntegratedTask(task: IntegratedTask): IntegratedResult;
    analyze(data: any[], type: AnalysisType, level?: AnalysisLevel): AnalysisResult;
    generateSolution(problem: Problem, options?: GenerationOptions): Solution;
    optimize(task: OptimizationTask): OptimizationResult;
    createTask(description: string, options?: {
        requiresAnalysis?: boolean;
        requiresSolution?: boolean;
        requiresOptimization?: boolean;
        priority?: number;
    }): IntegratedTask;
    executeTask(taskId: string): IntegratedResult | null;
    private getCurrentMetrics;
    getAnalysisEngine(): AnalysisEngine;
    getSolutionGenerator(): SolutionGenerator;
    getPerformanceOptimizer(): PerformanceOptimizer;
    getSettings(): SystemSettings;
    updateSettings(newSettings: Partial<SystemSettings>): void;
    getStatus(): SystemStatus;
    getTask(id: string): IntegratedTask | null;
    getTasks(): IntegratedTask[];
    getResult(taskId: string): IntegratedResult | null;
    getResults(): IntegratedResult[];
    getStatistics(): {
        analysis: ReturnType<AnalysisEngine['getStatistics']>;
        solutions: ReturnType<SolutionGenerator['getStatistics']>;
        optimizations: ReturnType<PerformanceOptimizer['getStatistics']>;
        tasks: {
            total: number;
            completed: number;
            successRate: number;
            averageTime: number;
        };
    };
    analyzeSystemPerformance(): {
        currentMetrics: PerformanceMetrics;
        analysis: ReturnType<PerformanceOptimizer['analyzePerformance']>;
        recommendations: string[];
    };
    reset(): void;
    clearHistory(): void;
}
