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

export class SystemsCoordinator {
  private plans: Map<string, CoordinationPlan> = new Map();
  private results: Map<string, CoordinationResult> = new Map();
  private planCounter: number = 0;
  private resultCounter: number = 0;
  
  createPlan(tasks: CoordinationTask[], strategy: CoordinationStrategy): CoordinationPlan {
    const id = `plan_${this.planCounter++}`;
    
    // Sort tasks based on strategy
    const sortedTasks = this.sortTasks(tasks, strategy);
    
    const totalEstimatedTime = tasks.reduce((sum, task) => sum + task.estimatedTime, 0);
    
    const plan: CoordinationPlan = {
      id,
      tasks: sortedTasks,
      strategy,
      totalEstimatedTime,
      createdAt: Date.now(),
      state: 'idle'
    };
    
    this.plans.set(id, plan);
    
    return plan;
  }
  
  private sortTasks(tasks: CoordinationTask[], strategy: CoordinationStrategy): CoordinationTask[] {
    switch (strategy) {
      case 'sequential':
        return [...tasks]; // Keep original order
        
      case 'priority-based':
        return [...tasks].sort((a, b) => b.priority - a.priority);
        
      case 'adaptive':
        // Sort by estimated time (shortest first)
        return [...tasks].sort((a, b) => a.estimatedTime - b.estimatedTime);
        
      case 'intelligent':
        // Sort by priority and dependencies
        return this.topologicalSort(tasks);
        
      default:
        return [...tasks];
    }
  }
  
  private topologicalSort(tasks: CoordinationTask[]): CoordinationTask[] {
    const sorted: CoordinationTask[] = [];
    const visited = new Set<string>();
    const taskMap = new Map(tasks.map(t => [t.id, t]));
    
    const visit = (taskId: string) => {
      if (visited.has(taskId)) return;
      
      const task = taskMap.get(taskId);
      if (!task) return;
      
      // Visit dependencies first
      for (const depId of task.dependencies) {
        visit(depId);
      }
      
      visited.add(taskId);
      sorted.push(task);
    };
    
    for (const task of tasks) {
      visit(task.id);
    }
    
    return sorted;
  }
  
  executePlan(planId: string): CoordinationResult {
    const plan = this.plans.get(planId);
    if (!plan) {
      throw new Error(`Plan ${planId} not found`);
    }
    
    const resultId = `result_${this.resultCounter++}`;
    const startTime = Date.now();
    
    plan.state = 'executing';
    
    const result: CoordinationResult = {
      id: resultId,
      planId,
      taskResults: new Map(),
      success: false,
      totalTime: 0,
      completedTasks: 0,
      failedTasks: 0,
      timestamp: Date.now()
    };
    
    try {
      // Execute tasks based on strategy
      if (plan.strategy === 'parallel') {
        this.executeParallel(plan, result);
      } else {
        this.executeSequential(plan, result);
      }
      
      result.success = result.failedTasks === 0;
      plan.state = result.success ? 'completed' : 'error';
    } catch (error) {
      result.success = false;
      plan.state = 'error';
    }
    
    result.totalTime = Date.now() - startTime;
    this.results.set(resultId, result);
    
    return result;
  }
  
  private executeSequential(plan: CoordinationPlan, result: CoordinationResult): void {
    for (const task of plan.tasks) {
      const taskResult = this.executeTask(task);
      result.taskResults.set(task.id, taskResult);
      
      if (taskResult.success) {
        result.completedTasks++;
      } else {
        result.failedTasks++;
      }
    }
  }
  
  private executeParallel(plan: CoordinationPlan, result: CoordinationResult): void {
    // Simulate parallel execution
    for (const task of plan.tasks) {
      const taskResult = this.executeTask(task);
      result.taskResults.set(task.id, taskResult);
      
      if (taskResult.success) {
        result.completedTasks++;
      } else {
        result.failedTasks++;
      }
    }
  }
  
  private executeTask(task: CoordinationTask): { success: boolean; result: any; executionTime: number } {
    const startTime = Date.now();
    
    // Simulate task execution
    const success = Math.random() > 0.1; // 90% success rate
    const result = {
      taskId: task.id,
      taskName: task.name,
      output: `Executed ${task.name}`,
      timestamp: Date.now()
    };
    
    const executionTime = Date.now() - startTime;
    
    return {
      success,
      result,
      executionTime
    };
  }
  
  monitorPlan(planId: string): {
    planId: string;
    state: CoordinationState;
    progress: number;
    estimatedTimeRemaining: number;
  } {
    const plan = this.plans.get(planId);
    if (!plan) {
      throw new Error(`Plan ${planId} not found`);
    }
    
    const result = Array.from(this.results.values()).find(r => r.planId === planId);
    
    const progress = result ? (result.completedTasks / plan.tasks.length) : 0;
    const estimatedTimeRemaining = plan.totalEstimatedTime * (1 - progress);
    
    return {
      planId,
      state: plan.state,
      progress,
      estimatedTimeRemaining
    };
  }
  
  optimizePlan(planId: string): CoordinationPlan {
    const plan = this.plans.get(planId);
    if (!plan) {
      throw new Error(`Plan ${planId} not found`);
    }
    
    // Create optimized version
    const optimizedTasks = this.optimizeTasks(plan.tasks);
    
    return this.createPlan(optimizedTasks, 'intelligent');
  }
  
  private optimizeTasks(tasks: CoordinationTask[]): CoordinationTask[] {
    // Group tasks by priority and dependencies
    const optimized = [...tasks];
    
    // Sort by priority first, then by dependencies
    optimized.sort((a, b) => {
      if (a.priority !== b.priority) {
        return b.priority - a.priority;
      }
      return a.dependencies.length - b.dependencies.length;
    });
    
    return optimized;
  }
  
  getPlan(id: string): CoordinationPlan | null {
    return this.plans.get(id) || null;
  }
  
  getResult(id: string): CoordinationResult | null {
    return this.results.get(id) || null;
  }
  
  getPlans(): CoordinationPlan[] {
    return Array.from(this.plans.values());
  }
  
  getResults(): CoordinationResult[] {
    return Array.from(this.results.values());
  }
  
  getPlansByStrategy(strategy: CoordinationStrategy): CoordinationPlan[] {
    return Array.from(this.plans.values())
      .filter(p => p.strategy === strategy);
  }
  
  getStatistics(): {
    totalPlans: number;
    completedPlans: number;
    failedPlans: number;
    averageExecutionTime: number;
    strategyDistribution: Record<CoordinationStrategy, number>;
    averageTasksPerPlan: number;
  } {
    const strategyDistribution: Record<CoordinationStrategy, number> = {
      sequential: 0,
      parallel: 0,
      'priority-based': 0,
      adaptive: 0,
      intelligent: 0
    };
    
    let completedCount = 0;
    let failedCount = 0;
    let totalTime = 0;
    let totalTasks = 0;
    
    for (const plan of this.plans.values()) {
      strategyDistribution[plan.strategy]++;
      totalTasks += plan.tasks.length;
      
      if (plan.state === 'completed') completedCount++;
      if (plan.state === 'error') failedCount++;
    }
    
    for (const result of this.results.values()) {
      totalTime += result.totalTime;
    }
    
    return {
      totalPlans: this.plans.size,
      completedPlans: completedCount,
      failedPlans: failedCount,
      averageExecutionTime: this.results.size > 0 ? totalTime / this.results.size : 0,
      strategyDistribution,
      averageTasksPerPlan: this.plans.size > 0 ? totalTasks / this.plans.size : 0
    };
  }
  
  clear(): void {
    this.plans.clear();
    this.results.clear();
    this.planCounter = 0;
    this.resultCounter = 0;
  }
}

