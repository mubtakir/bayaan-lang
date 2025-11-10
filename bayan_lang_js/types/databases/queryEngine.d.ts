/**
 * محرك الاستعلامات - Query Engine
 * Advanced query processing and optimization
 */
export type QueryOptimizationLevel = 'none' | 'basic' | 'advanced' | 'aggressive';
export type JoinType = 'inner' | 'left' | 'right' | 'full' | 'cross';
export type AggregateFunction = 'count' | 'sum' | 'avg' | 'min' | 'max';
export interface QueryPlan {
    id: string;
    query: string;
    steps: QueryStep[];
    estimatedCost: number;
    estimatedRows: number;
    optimizationLevel: QueryOptimizationLevel;
}
export interface QueryStep {
    stepNumber: number;
    operation: string;
    table?: string;
    condition?: string;
    estimatedCost: number;
}
export interface QueryOptimization {
    originalQuery: string;
    optimizedQuery: string;
    improvements: string[];
    costReduction: number;
}
export interface JoinQuery {
    leftTable: string;
    rightTable: string;
    joinType: JoinType;
    onCondition: string;
    selectFields: string[];
}
export interface AggregateQuery {
    table: string;
    function: AggregateFunction;
    field: string;
    groupBy?: string[];
    having?: string;
}
export declare class QueryEngine {
    private queryPlans;
    private optimizations;
    private planCounter;
    createQueryPlan(query: string, optimizationLevel?: QueryOptimizationLevel): QueryPlan;
    private analyzeQuery;
    private calculateCost;
    private estimateRows;
    optimizeQuery(query: string, level?: QueryOptimizationLevel): QueryOptimization;
    executeJoin(joinQuery: JoinQuery): {
        success: boolean;
        resultCount: number;
        executionTime: number;
    };
    executeAggregate(aggregateQuery: AggregateQuery): {
        success: boolean;
        result: number;
        executionTime: number;
    };
    explainQuery(query: string): {
        plan: QueryPlan;
        optimization: QueryOptimization;
        recommendations: string[];
    };
    analyzeQueryPerformance(query: string, executionTime: number): {
        performance: 'excellent' | 'good' | 'fair' | 'poor';
        bottlenecks: string[];
        suggestions: string[];
    };
    getQueryPlan(id: string): QueryPlan | null;
    getOptimization(query: string): QueryOptimization | null;
    getStatistics(): {
        totalPlans: number;
        totalOptimizations: number;
        averageCost: number;
        averageCostReduction: number;
        optimizationLevelDistribution: Record<QueryOptimizationLevel, number>;
    };
    clear(): void;
}
