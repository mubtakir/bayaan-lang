/**
 * منسق الأنظمة - Systems Coordinator
 * Coordinates operations across multiple systems
 */
export type CoordinationStrategy = 'sequential' | 'parallel' | 'priority-based' | 'adaptive' | 'intelligent';
export type CoordinationState = 'idle' | 'planning' | 'executing' | 'monitoring' | 'completed' | 'error';
export interface CoordinationTask {
    id: string;
    name: string;
    description: string;
    priority: number;
    dependencies: string[];
    estimatedTime: number;
    deadline?: number;
}
export interface CoordinationPlan {
    id: string;
    tasks: CoordinationTask[];
    strategy: CoordinationStrategy;
    totalEstimatedTime: number;
    createdAt: number;
    state: CoordinationState;
}
export interface CoordinationResult {
    id: string;
    planId: string;
    taskResults: Map<string, any>;
    success: boolean;
    totalTime: number;
    completedTasks: number;
    failedTasks: number;
    timestamp: number;
}
export interface ExecutionStep {
    stepNumber: number;
    taskId: string;
    startTime: number;
    endTime: number;
    result: any;
    success: boolean;
}
export declare class SystemsCoordinator {
    private plans;
    private results;
    private planCounter;
    private resultCounter;
    createPlan(tasks: CoordinationTask[], strategy: CoordinationStrategy): CoordinationPlan;
    private sortTasks;
    private topologicalSort;
    executePlan(planId: string): CoordinationResult;
    private executeSequential;
    private executeParallel;
    private executeTask;
    monitorPlan(planId: string): {
        planId: string;
        state: CoordinationState;
        progress: number;
        estimatedTimeRemaining: number;
    };
    optimizePlan(planId: string): CoordinationPlan;
    private optimizeTasks;
    getPlan(id: string): CoordinationPlan | null;
    getResult(id: string): CoordinationResult | null;
    getPlans(): CoordinationPlan[];
    getResults(): CoordinationResult[];
    getPlansByStrategy(strategy: CoordinationStrategy): CoordinationPlan[];
    getStatistics(): {
        totalPlans: number;
        completedPlans: number;
        failedPlans: number;
        averageExecutionTime: number;
        strategyDistribution: Record<CoordinationStrategy, number>;
        averageTasksPerPlan: number;
    };
    clear(): void;
}
