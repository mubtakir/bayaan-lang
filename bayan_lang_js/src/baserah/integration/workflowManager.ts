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

export class WorkflowManager {
  private workflows: Map<string, Workflow> = new Map();
  private executions: Map<string, WorkflowExecution> = new Map();
  private templates: Map<string, WorkflowTemplate> = new Map();
  private workflowCounter: number = 0;
  private executionCounter: number = 0;
  
  createWorkflow(name: string, description: string, type: WorkflowType): Workflow {
    const id = `workflow_${this.workflowCounter++}`;
    
    const workflow: Workflow = {
      id,
      name,
      description,
      type,
      steps: new Map(),
      startStep: '',
      endSteps: [],
      state: 'draft',
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    this.workflows.set(id, workflow);
    
    return workflow;
  }
  
  addStep(workflowId: string, step: WorkflowStep): boolean {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) return false;
    
    workflow.steps.set(step.id, step);
    workflow.updatedAt = Date.now();
    
    // Set as start step if it's the first step
    if (workflow.steps.size === 1) {
      workflow.startStep = step.id;
    }
    
    return true;
  }
  
  removeStep(workflowId: string, stepId: string): boolean {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) return false;
    
    workflow.steps.delete(stepId);
    workflow.updatedAt = Date.now();
    
    return true;
  }
  
  setStartStep(workflowId: string, stepId: string): boolean {
    const workflow = this.workflows.get(workflowId);
    if (!workflow || !workflow.steps.has(stepId)) return false;
    
    workflow.startStep = stepId;
    workflow.updatedAt = Date.now();
    
    return true;
  }
  
  addEndStep(workflowId: string, stepId: string): boolean {
    const workflow = this.workflows.get(workflowId);
    if (!workflow || !workflow.steps.has(stepId)) return false;
    
    if (!workflow.endSteps.includes(stepId)) {
      workflow.endSteps.push(stepId);
      workflow.updatedAt = Date.now();
    }
    
    return true;
  }
  
  activateWorkflow(workflowId: string): boolean {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) return false;
    
    // Validate workflow
    if (!workflow.startStep || workflow.endSteps.length === 0) {
      return false;
    }
    
    workflow.state = 'active';
    workflow.updatedAt = Date.now();
    
    return true;
  }
  
  executeWorkflow(workflowId: string, initialVariables?: Map<string, any>): WorkflowExecution {
    const workflow = this.workflows.get(workflowId);
    if (!workflow || workflow.state !== 'active') {
      throw new Error(`Workflow ${workflowId} is not active`);
    }
    
    const executionId = `execution_${this.executionCounter++}`;
    
    const execution: WorkflowExecution = {
      id: executionId,
      workflowId,
      currentStep: workflow.startStep,
      visitedSteps: [],
      stepResults: new Map(),
      state: 'active',
      startTime: Date.now(),
      endTime: null,
      variables: initialVariables || new Map()
    };
    
    this.executions.set(executionId, execution);
    
    // Start execution
    this.continueExecution(executionId);
    
    return execution;
  }
  
  private continueExecution(executionId: string): void {
    const execution = this.executions.get(executionId);
    if (!execution) return;
    
    const workflow = this.workflows.get(execution.workflowId);
    if (!workflow) return;
    
    while (execution.state === 'active') {
      const currentStep = workflow.steps.get(execution.currentStep);
      if (!currentStep) break;
      
      // Execute step
      const stepResult = this.executeStep(currentStep, execution);
      execution.stepResults.set(currentStep.id, stepResult);
      execution.visitedSteps.push(currentStep.id);
      
      // Check if we reached an end step
      if (workflow.endSteps.includes(currentStep.id)) {
        execution.state = 'completed';
        execution.endTime = Date.now();
        break;
      }
      
      // Determine next step
      const nextStep = this.determineNextStep(currentStep, stepResult, execution);
      if (!nextStep) {
        execution.state = 'failed';
        execution.endTime = Date.now();
        break;
      }
      
      execution.currentStep = nextStep;
    }
  }
  
  private executeStep(step: WorkflowStep, execution: WorkflowExecution): any {
    switch (step.type) {
      case 'action':
        return this.executeAction(step, execution);
      case 'decision':
        return this.executeDecision(step, execution);
      case 'loop':
        return this.executeLoop(step, execution);
      case 'merge':
        return this.executeMerge(step, execution);
      case 'split':
        return this.executeSplit(step, execution);
      default:
        return { success: true };
    }
  }
  
  private executeAction(step: WorkflowStep, execution: WorkflowExecution): any {
    return {
      type: 'action',
      stepId: step.id,
      action: step.action,
      success: true,
      result: `Executed action: ${step.action}`,
      timestamp: Date.now()
    };
  }
  
  private executeDecision(step: WorkflowStep, execution: WorkflowExecution): any {
    const conditionMet = Math.random() > 0.5; // Simulate condition evaluation
    
    return {
      type: 'decision',
      stepId: step.id,
      condition: step.condition,
      conditionMet,
      timestamp: Date.now()
    };
  }
  
  private executeLoop(step: WorkflowStep, execution: WorkflowExecution): any {
    return {
      type: 'loop',
      stepId: step.id,
      iterations: 1,
      timestamp: Date.now()
    };
  }
  
  private executeMerge(step: WorkflowStep, execution: WorkflowExecution): any {
    return {
      type: 'merge',
      stepId: step.id,
      merged: true,
      timestamp: Date.now()
    };
  }
  
  private executeSplit(step: WorkflowStep, execution: WorkflowExecution): any {
    return {
      type: 'split',
      stepId: step.id,
      branches: step.nextSteps.length,
      timestamp: Date.now()
    };
  }
  
  private determineNextStep(step: WorkflowStep, stepResult: any, execution: WorkflowExecution): string | null {
    if (step.nextSteps.length === 0) return null;
    
    if (step.type === 'decision' && stepResult.conditionMet !== undefined) {
      return stepResult.conditionMet ? step.nextSteps[0] : (step.nextSteps[1] || null);
    }
    
    return step.nextSteps[0];
  }
  
  pauseExecution(executionId: string): boolean {
    const execution = this.executions.get(executionId);
    if (!execution || execution.state !== 'active') return false;
    
    execution.state = 'paused';
    return true;
  }
  
  resumeExecution(executionId: string): boolean {
    const execution = this.executions.get(executionId);
    if (!execution || execution.state !== 'paused') return false;
    
    execution.state = 'active';
    this.continueExecution(executionId);
    return true;
  }
  
  cancelExecution(executionId: string): boolean {
    const execution = this.executions.get(executionId);
    if (!execution) return false;
    
    execution.state = 'cancelled';
    execution.endTime = Date.now();
    return true;
  }
  
  getWorkflow(id: string): Workflow | null {
    return this.workflows.get(id) || null;
  }
  
  getExecution(id: string): WorkflowExecution | null {
    return this.executions.get(id) || null;
  }
  
  getWorkflows(): Workflow[] {
    return Array.from(this.workflows.values());
  }
  
  getExecutions(): WorkflowExecution[] {
    return Array.from(this.executions.values());
  }
  
  getExecutionsByWorkflow(workflowId: string): WorkflowExecution[] {
    return Array.from(this.executions.values())
      .filter(e => e.workflowId === workflowId);
  }
  
  getStatistics(): {
    totalWorkflows: number;
    activeWorkflows: number;
    totalExecutions: number;
    completedExecutions: number;
    failedExecutions: number;
    averageExecutionTime: number;
    typeDistribution: Record<WorkflowType, number>;
  } {
    const typeDistribution: Record<WorkflowType, number> = {
      linear: 0,
      branching: 0,
      parallel: 0,
      conditional: 0,
      iterative: 0
    };
    
    let activeCount = 0;
    let completedCount = 0;
    let failedCount = 0;
    let totalTime = 0;
    
    for (const workflow of this.workflows.values()) {
      typeDistribution[workflow.type]++;
      if (workflow.state === 'active') activeCount++;
    }
    
    for (const execution of this.executions.values()) {
      if (execution.state === 'completed') {
        completedCount++;
        if (execution.endTime) {
          totalTime += execution.endTime - execution.startTime;
        }
      }
      if (execution.state === 'failed') failedCount++;
    }
    
    return {
      totalWorkflows: this.workflows.size,
      activeWorkflows: activeCount,
      totalExecutions: this.executions.size,
      completedExecutions: completedCount,
      failedExecutions: failedCount,
      averageExecutionTime: completedCount > 0 ? totalTime / completedCount : 0,
      typeDistribution
    };
  }
  
  clear(): void {
    this.workflows.clear();
    this.executions.clear();
    this.templates.clear();
    this.workflowCounter = 0;
    this.executionCounter = 0;
  }
}

