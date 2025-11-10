/**
 * مدير التكامل النهائي - Final Integration Manager
 * Main manager that integrates all integration components
 */
import { IntegrationResult, IntegrationLevel, IntegrationMode, SystemComponent } from './integrationEngine';
import { CoordinationStrategy } from './systemsCoordinator';
import { WorkflowExecution, WorkflowType } from './workflowManager';
export type IntegrationTaskType = 'query' | 'analysis' | 'generation' | 'transformation' | 'learning';
export type SystemMode = 'standalone' | 'coordinated' | 'workflow' | 'full-integration';
export interface IntegratedTask {
    id: string;
    type: IntegrationTaskType;
    description: string;
    components: SystemComponent[];
    priority: number;
    mode: SystemMode;
    data: any;
}
export interface IntegratedResult {
    id: string;
    taskId: string;
    integrationResult: IntegrationResult | null;
    coordinationResult: any | null;
    workflowResult: WorkflowExecution | null;
    success: boolean;
    totalTime: number;
    timestamp: number;
}
export interface SystemConfiguration {
    integrationLevel: IntegrationLevel;
    integrationMode: IntegrationMode;
    coordinationStrategy: CoordinationStrategy;
    defaultWorkflowType: WorkflowType;
    autoOptimize: boolean;
    enableMonitoring: boolean;
}
export declare class FinalIntegrationManager {
    private integrationEngine;
    private systemsCoordinator;
    private workflowManager;
    private tasks;
    private results;
    private configuration;
    private taskCounter;
    private resultCounter;
    constructor(config?: Partial<SystemConfiguration>);
    createTask(description: string, type: IntegrationTaskType, components: SystemComponent[], data: any, options?: {
        priority?: number;
        mode?: SystemMode;
    }): IntegratedTask;
    executeTask(taskId: string): IntegratedResult;
    private executeStandalone;
    private executeCoordinated;
    private executeWorkflow;
    private executeFullIntegration;
    processQuery(query: string, components?: SystemComponent[]): IntegratedResult;
    private selectComponentsForQuery;
    analyzeSystem(): {
        integration: any;
        coordination: any;
        workflow: any;
        overall: {
            health: 'healthy' | 'degraded' | 'critical';
            performance: number;
            recommendations: string[];
        };
    };
    private calculateSuccessRate;
    getConfiguration(): SystemConfiguration;
    updateConfiguration(updates: Partial<SystemConfiguration>): void;
    getTask(id: string): IntegratedTask | null;
    getResult(id: string): IntegratedResult | null;
    getStatistics(): {
        tasks: {
            total: number;
            byType: Record<IntegrationTaskType, number>;
            byMode: Record<SystemMode, number>;
        };
        results: {
            total: number;
            successful: number;
            failed: number;
            averageTime: number;
        };
        subsystems: {
            integration: any;
            coordination: any;
            workflow: any;
        };
    };
    clear(): void;
}
