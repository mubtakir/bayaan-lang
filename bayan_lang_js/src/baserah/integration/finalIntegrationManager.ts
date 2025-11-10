/**
 * مدير التكامل النهائي - Final Integration Manager
 * Main manager that integrates all integration components
 */

import { IntegrationEngine, IntegrationRequest, IntegrationResult, IntegrationLevel, IntegrationMode, SystemComponent } from './integrationEngine';
import { SystemsCoordinator, CoordinationTask, CoordinationPlan, CoordinationStrategy } from './systemsCoordinator';
import { WorkflowManager, Workflow, WorkflowExecution, WorkflowType } from './workflowManager';

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

export class FinalIntegrationManager {
  private integrationEngine: IntegrationEngine;
  private systemsCoordinator: SystemsCoordinator;
  private workflowManager: WorkflowManager;
  private tasks: Map<string, IntegratedTask> = new Map();
  private results: Map<string, IntegratedResult> = new Map();
  private configuration: SystemConfiguration;
  private taskCounter: number = 0;
  private resultCounter: number = 0;
  
  constructor(config?: Partial<SystemConfiguration>) {
    this.integrationEngine = new IntegrationEngine();
    this.systemsCoordinator = new SystemsCoordinator();
    this.workflowManager = new WorkflowManager();
    
    this.configuration = {
      integrationLevel: config?.integrationLevel || 'full',
      integrationMode: config?.integrationMode || 'intelligent',
      coordinationStrategy: config?.coordinationStrategy || 'intelligent',
      defaultWorkflowType: config?.defaultWorkflowType || 'linear',
      autoOptimize: config?.autoOptimize !== undefined ? config.autoOptimize : true,
      enableMonitoring: config?.enableMonitoring !== undefined ? config.enableMonitoring : true
    };
  }
  
  createTask(description: string, type: IntegrationTaskType, components: SystemComponent[], data: any, options?: {
    priority?: number;
    mode?: SystemMode;
  }): IntegratedTask {
    const id = `task_${this.taskCounter++}`;
    
    const task: IntegratedTask = {
      id,
      type,
      description,
      components,
      priority: options?.priority || 5,
      mode: options?.mode || 'full-integration',
      data
    };
    
    this.tasks.set(id, task);
    
    return task;
  }
  
  executeTask(taskId: string): IntegratedResult {
    const task = this.tasks.get(taskId);
    if (!task) {
      throw new Error(`Task ${taskId} not found`);
    }
    
    const resultId = `result_${this.resultCounter++}`;
    const startTime = Date.now();
    
    const result: IntegratedResult = {
      id: resultId,
      taskId,
      integrationResult: null,
      coordinationResult: null,
      workflowResult: null,
      success: false,
      totalTime: 0,
      timestamp: Date.now()
    };
    
    try {
      switch (task.mode) {
        case 'standalone':
          result.integrationResult = this.executeStandalone(task);
          break;
        case 'coordinated':
          result.coordinationResult = this.executeCoordinated(task);
          break;
        case 'workflow':
          result.workflowResult = this.executeWorkflow(task);
          break;
        case 'full-integration':
          result.integrationResult = this.executeFullIntegration(task);
          break;
      }
      
      result.success = true;
    } catch (error) {
      result.success = false;
    }
    
    result.totalTime = Date.now() - startTime;
    this.results.set(resultId, result);
    
    return result;
  }
  
  private executeStandalone(task: IntegratedTask): IntegrationResult {
    const request: IntegrationRequest = {
      id: `req_${task.id}`,
      components: task.components,
      mode: this.configuration.integrationMode,
      level: this.configuration.integrationLevel,
      data: task.data,
      priority: task.priority
    };
    
    return this.integrationEngine.integrate(request);
  }
  
  private executeCoordinated(task: IntegratedTask): any {
    // Create coordination tasks for each component
    const coordinationTasks: CoordinationTask[] = task.components.map((component, index) => ({
      id: `coord_${task.id}_${index}`,
      name: `Process ${component}`,
      description: `Process task with ${component}`,
      priority: task.priority,
      dependencies: index > 0 ? [`coord_${task.id}_${index - 1}`] : [],
      estimatedTime: 100
    }));
    
    const plan = this.systemsCoordinator.createPlan(coordinationTasks, this.configuration.coordinationStrategy);
    return this.systemsCoordinator.executePlan(plan.id);
  }
  
  private executeWorkflow(task: IntegratedTask): WorkflowExecution {
    // Create workflow for the task
    const workflow = this.workflowManager.createWorkflow(
      `Workflow for ${task.id}`,
      task.description,
      this.configuration.defaultWorkflowType
    );
    
    // Add steps for each component
    task.components.forEach((component, index) => {
      this.workflowManager.addStep(workflow.id, {
        id: `step_${index}`,
        name: `Process with ${component}`,
        type: 'action',
        action: `process_${component}`,
        nextSteps: index < task.components.length - 1 ? [`step_${index + 1}`] : [],
        data: task.data
      });
    });
    
    // Set start and end steps
    this.workflowManager.setStartStep(workflow.id, 'step_0');
    this.workflowManager.addEndStep(workflow.id, `step_${task.components.length - 1}`);
    
    // Activate and execute
    this.workflowManager.activateWorkflow(workflow.id);
    return this.workflowManager.executeWorkflow(workflow.id);
  }
  
  private executeFullIntegration(task: IntegratedTask): IntegrationResult {
    // Use all three systems together
    const request: IntegrationRequest = {
      id: `full_${task.id}`,
      components: task.components,
      mode: this.configuration.integrationMode,
      level: this.configuration.integrationLevel,
      data: task.data,
      priority: task.priority
    };
    
    return this.integrationEngine.integrate(request);
  }
  
  processQuery(query: string, components?: SystemComponent[]): IntegratedResult {
    const selectedComponents = components || this.selectComponentsForQuery(query);
    
    const task = this.createTask(
      `Process query: ${query}`,
      'query',
      selectedComponents,
      { query },
      { priority: 7, mode: 'full-integration' }
    );
    
    return this.executeTask(task.id);
  }
  
  private selectComponentsForQuery(query: string): SystemComponent[] {
    // Intelligent component selection based on query
    const components: SystemComponent[] = ['core', 'language', 'reasoning'];
    
    if (query.includes('معادلة') || query.includes('equation')) {
      components.push('linguisticEquations');
    }
    
    if (query.includes('ذاكرة') || query.includes('memory')) {
      components.push('memory');
    }
    
    if (query.includes('معرفة') || query.includes('knowledge')) {
      components.push('knowledge');
    }
    
    return components;
  }
  
  analyzeSystem(): {
    integration: any;
    coordination: any;
    workflow: any;
    overall: {
      health: 'healthy' | 'degraded' | 'critical';
      performance: number;
      recommendations: string[];
    };
  } {
    const integrationHealth = this.integrationEngine.healthCheck();
    const coordinationStats = this.systemsCoordinator.getStatistics();
    const workflowStats = this.workflowManager.getStatistics();
    
    const recommendations: string[] = [];
    
    // Analyze integration health
    if (integrationHealth.overall !== 'healthy') {
      recommendations.push(...integrationHealth.recommendations);
    }
    
    // Analyze coordination performance
    if (coordinationStats.failedPlans > coordinationStats.completedPlans * 0.1) {
      recommendations.push('High coordination failure rate - review task dependencies');
    }
    
    // Analyze workflow performance
    if (workflowStats.failedExecutions > workflowStats.completedExecutions * 0.1) {
      recommendations.push('High workflow failure rate - review workflow designs');
    }
    
    // Calculate overall performance
    const successRate = this.calculateSuccessRate();
    const performance = successRate * 100;
    
    const overall = {
      health: integrationHealth.overall,
      performance,
      recommendations
    };
    
    return {
      integration: integrationHealth,
      coordination: coordinationStats,
      workflow: workflowStats,
      overall
    };
  }
  
  private calculateSuccessRate(): number {
    if (this.results.size === 0) return 1;
    
    let successCount = 0;
    for (const result of this.results.values()) {
      if (result.success) successCount++;
    }
    
    return successCount / this.results.size;
  }
  
  getConfiguration(): SystemConfiguration {
    return { ...this.configuration };
  }
  
  updateConfiguration(updates: Partial<SystemConfiguration>): void {
    Object.assign(this.configuration, updates);
  }
  
  getTask(id: string): IntegratedTask | null {
    return this.tasks.get(id) || null;
  }
  
  getResult(id: string): IntegratedResult | null {
    return this.results.get(id) || null;
  }
  
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
  } {
    const tasksByType: Record<IntegrationTaskType, number> = {
      query: 0,
      analysis: 0,
      generation: 0,
      transformation: 0,
      learning: 0
    };
    
    const tasksByMode: Record<SystemMode, number> = {
      standalone: 0,
      coordinated: 0,
      workflow: 0,
      'full-integration': 0
    };
    
    for (const task of this.tasks.values()) {
      tasksByType[task.type]++;
      tasksByMode[task.mode]++;
    }
    
    let successCount = 0;
    let totalTime = 0;
    
    for (const result of this.results.values()) {
      if (result.success) successCount++;
      totalTime += result.totalTime;
    }
    
    return {
      tasks: {
        total: this.tasks.size,
        byType: tasksByType,
        byMode: tasksByMode
      },
      results: {
        total: this.results.size,
        successful: successCount,
        failed: this.results.size - successCount,
        averageTime: this.results.size > 0 ? totalTime / this.results.size : 0
      },
      subsystems: {
        integration: this.integrationEngine.getStatistics(),
        coordination: this.systemsCoordinator.getStatistics(),
        workflow: this.workflowManager.getStatistics()
      }
    };
  }
  
  clear(): void {
    this.tasks.clear();
    this.results.clear();
    this.taskCounter = 0;
    this.resultCounter = 0;
    this.integrationEngine.clear();
    this.systemsCoordinator.clear();
    this.workflowManager.clear();
  }
}

