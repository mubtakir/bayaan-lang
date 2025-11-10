/**
 * محسن الأداء - Performance Optimizer
 * Optimizes system performance using advanced techniques
 */
export type OptimizationTarget = 'speed' | 'memory' | 'accuracy' | 'efficiency' | 'balanced';
export type OptimizationLevel = 'minimal' | 'moderate' | 'aggressive' | 'maximum';
export type ResourceType = 'cpu' | 'memory' | 'io' | 'network' | 'cache';
export interface PerformanceMetrics {
    executionTime: number;
    memoryUsage: number;
    cpuUsage: number;
    ioOperations: number;
    cacheHitRate: number;
    throughput: number;
    latency: number;
}
export interface OptimizationTask {
    id: string;
    name: string;
    target: OptimizationTarget;
    level: OptimizationLevel;
    currentMetrics: PerformanceMetrics;
    targetMetrics?: Partial<PerformanceMetrics>;
}
export interface OptimizationResult {
    id: string;
    taskId: string;
    success: boolean;
    beforeMetrics: PerformanceMetrics;
    afterMetrics: PerformanceMetrics;
    improvements: Map<string, number>;
    appliedTechniques: string[];
    timestamp: number;
}
export interface OptimizationTechnique {
    name: string;
    target: OptimizationTarget;
    impact: number;
    cost: number;
    applicable: (metrics: PerformanceMetrics) => boolean;
    apply: (metrics: PerformanceMetrics) => PerformanceMetrics;
}
export declare class PerformanceOptimizer {
    private optimizations;
    private optimizationCounter;
    private techniques;
    constructor();
    private initializeTechniques;
    optimize(task: OptimizationTask): OptimizationResult;
    private selectTechniques;
    analyzePerformance(metrics: PerformanceMetrics): {
        bottlenecks: string[];
        recommendations: string[];
        score: number;
    };
    compareMetrics(before: PerformanceMetrics, after: PerformanceMetrics): {
        improvements: Map<string, number>;
        regressions: Map<string, number>;
        overallImprovement: number;
    };
    getOptimization(id: string): OptimizationResult | null;
    getOptimizationsByTask(taskId: string): OptimizationResult[];
    getStatistics(): {
        totalOptimizations: number;
        successfulOptimizations: number;
        averageImprovements: Map<string, number>;
        mostUsedTechniques: Array<{
            technique: string;
            count: number;
        }>;
    };
    clear(): void;
}
