/**
 * مدير سير العمل - Workflow Manager
 * Manages complex workflows across the system
 */
export type WorkflowState = 'draft' | 'active' | 'paused' | 'completed' | 'failed' | 'cancelled';
export type WorkflowType = 'linear' | 'branching' | 'parallel' | 'conditional' | 'iterative';
export type StepType = 'action' | 'decision' | 'loop' | 'merge' | 'split';
export interface WorkflowStep {
    id: string;
    name: string;
    type: StepType;
    action?: string;
    condition?: string;
    nextSteps: string[];
    data?: any;
}
export interface Workflow {
    id: string;
    name: string;
    description: string;
    type: WorkflowType;
    steps: Map<string, WorkflowStep>;
    startStep: string;
    endSteps: string[];
    state: WorkflowState;
    createdAt: number;
    updatedAt: number;
}
export interface WorkflowExecution {
    id: string;
    workflowId: string;
    currentStep: string;
    visitedSteps: string[];
    stepResults: Map<string, any>;
    state: WorkflowState;
    startTime: number;
    endTime: number | null;
    variables: Map<string, any>;
}
export interface WorkflowTemplate {
    id: string;
    name: string;
    description: string;
    type: WorkflowType;
    stepTemplates: WorkflowStep[];
    defaultVariables: Map<string, any>;
}
export declare class WorkflowManager {
    private workflows;
    private executions;
    private templates;
    private workflowCounter;
    private executionCounter;
    createWorkflow(name: string, description: string, type: WorkflowType): Workflow;
    addStep(workflowId: string, step: WorkflowStep): boolean;
    removeStep(workflowId: string, stepId: string): boolean;
    setStartStep(workflowId: string, stepId: string): boolean;
    addEndStep(workflowId: string, stepId: string): boolean;
    activateWorkflow(workflowId: string): boolean;
    executeWorkflow(workflowId: string, initialVariables?: Map<string, any>): WorkflowExecution;
    private continueExecution;
    private executeStep;
    private executeAction;
    private executeDecision;
    private executeLoop;
    private executeMerge;
    private executeSplit;
    private determineNextStep;
    pauseExecution(executionId: string): boolean;
    resumeExecution(executionId: string): boolean;
    cancelExecution(executionId: string): boolean;
    getWorkflow(id: string): Workflow | null;
    getExecution(id: string): WorkflowExecution | null;
    getWorkflows(): Workflow[];
    getExecutions(): WorkflowExecution[];
    getExecutionsByWorkflow(workflowId: string): WorkflowExecution[];
    getStatistics(): {
        totalWorkflows: number;
        activeWorkflows: number;
        totalExecutions: number;
        completedExecutions: number;
        failedExecutions: number;
        averageExecutionTime: number;
        typeDistribution: Record<WorkflowType, number>;
    };
    clear(): void;
}
