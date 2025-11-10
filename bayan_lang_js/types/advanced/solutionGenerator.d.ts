/**
 * مولد الحلول الذكية - Smart Solution Generator
 * Generates intelligent solutions using advanced algorithms
 */
export type ProblemType = 'optimization' | 'classification' | 'prediction' | 'generation' | 'transformation';
export type SolutionStrategy = 'analytical' | 'heuristic' | 'evolutionary' | 'hybrid' | 'revolutionary';
export type SolutionQuality = 'poor' | 'fair' | 'good' | 'excellent' | 'optimal';
export interface Problem {
    id: string;
    description: string;
    type: ProblemType;
    constraints: Map<string, any>;
    objectives: string[];
    priority: number;
}
export interface Solution {
    id: string;
    problemId: string;
    strategy: SolutionStrategy;
    steps: Array<{
        step: number;
        action: string;
        result: any;
    }>;
    result: any;
    quality: SolutionQuality;
    confidence: number;
    executionTime: number;
    timestamp: number;
}
export interface GenerationOptions {
    strategy?: SolutionStrategy;
    maxIterations?: number;
    qualityThreshold?: number;
    timeout?: number;
}
export declare class SolutionGenerator {
    private solutions;
    private solutionCounter;
    generateSolution(problem: Problem, options?: GenerationOptions): Solution;
    private selectStrategy;
    private generateAnalyticalSolution;
    private generateHeuristicSolution;
    private generateEvolutionarySolution;
    private generateHybridSolution;
    private generateRevolutionarySolution;
    private evaluateQuality;
    private calculateConfidence;
    getSolution(id: string): Solution | null;
    getSolutionsByProblem(problemId: string): Solution[];
    getSolutionsByStrategy(strategy: SolutionStrategy): Solution[];
    getSolutionsByQuality(quality: SolutionQuality): Solution[];
    getStatistics(): {
        totalSolutions: number;
        strategyDistribution: Record<SolutionStrategy, number>;
        qualityDistribution: Record<SolutionQuality, number>;
        averageConfidence: number;
        averageExecutionTime: number;
        averageSteps: number;
    };
    clear(): void;
}
