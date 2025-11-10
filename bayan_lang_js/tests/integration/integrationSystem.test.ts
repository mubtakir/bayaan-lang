/**
 * Integration System Tests - اختبارات نظام التكامل النهائي
 */

import {
  IntegrationEngine,
  IntegrationRequest,
  SystemsCoordinator,
  CoordinationTask,
  WorkflowManager,
  FinalIntegrationManager,
  SystemComponent
} from '../../src/baserah/integration';

describe('Integration System - نظام التكامل النهائي', () => {
  
  // ═══════════════════════════════════════════════════════════════════════
  // Integration Engine Tests - اختبارات محرك التكامل
  // ═══════════════════════════════════════════════════════════════════════
  
  describe('IntegrationEngine - محرك التكامل', () => {
    let engine: IntegrationEngine;
    
    beforeEach(() => {
      engine = new IntegrationEngine();
    });
    
    test('should create integration engine', () => {
      expect(engine).toBeDefined();
    });
    
    test('should integrate components in sequential mode', () => {
      const request: IntegrationRequest = {
        id: 'req1',
        components: ['core', 'brain', 'thinking'],
        mode: 'sequential',
        level: 'full',
        data: { test: 'data' },
        priority: 5
      };
      
      const result = engine.integrate(request);
      
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.componentsUsed).toHaveLength(3);
      expect(result.results.size).toBe(3);
    });
    
    test('should integrate components in parallel mode', () => {
      const request: IntegrationRequest = {
        id: 'req2',
        components: ['memory', 'knowledge', 'language'],
        mode: 'parallel',
        level: 'advanced',
        data: { test: 'data' },
        priority: 7
      };
      
      const result = engine.integrate(request);
      
      expect(result.success).toBe(true);
      expect(result.componentsUsed).toHaveLength(3);
    });
    
    test('should integrate components in adaptive mode', () => {
      const request: IntegrationRequest = {
        id: 'req3',
        components: ['reasoning', 'artistic', 'interaction'],
        mode: 'adaptive',
        level: 'intermediate',
        data: { test: 'data' },
        priority: 6
      };
      
      const result = engine.integrate(request);
      
      expect(result.success).toBe(true);
      expect(result.componentsUsed.length).toBeGreaterThan(0);
    });
    
    test('should integrate components in intelligent mode', () => {
      const request: IntegrationRequest = {
        id: 'req4',
        components: ['emotional', 'conversational', 'lexicon'],
        mode: 'intelligent',
        level: 'full',
        data: { test: 'data' },
        priority: 8
      };
      
      const result = engine.integrate(request);
      
      expect(result.success).toBe(true);
      expect(result.combinedResult).toBeDefined();
    });
    
    test('should get component status', () => {
      const status = engine.getComponentStatus('core');
      
      expect(status).toBeDefined();
      expect(status?.component).toBe('core');
      expect(status?.available).toBe(true);
      expect(status?.healthy).toBe(true);
    });
    
    test('should get all component statuses', () => {
      const statuses = engine.getAllComponentStatuses();
      
      expect(statuses).toBeDefined();
      expect(statuses.length).toBe(16); // All components
    });
    
    test('should update component status', () => {
      engine.updateComponentStatus('brain', { load: 0.5, healthy: false });
      
      const status = engine.getComponentStatus('brain');
      expect(status?.load).toBe(0.5);
      expect(status?.healthy).toBe(false);
    });
    
    test('should get integration by id', () => {
      const request: IntegrationRequest = {
        id: 'req5',
        components: ['core'],
        mode: 'sequential',
        level: 'basic',
        data: {},
        priority: 5
      };
      
      const result = engine.integrate(request);
      const retrieved = engine.getIntegration(result.id);
      
      expect(retrieved).toBeDefined();
      expect(retrieved?.id).toBe(result.id);
    });
    
    test('should get statistics', () => {
      const request: IntegrationRequest = {
        id: 'req6',
        components: ['core', 'brain'],
        mode: 'parallel',
        level: 'full',
        data: {},
        priority: 5
      };
      
      engine.integrate(request);
      
      const stats = engine.getStatistics();
      
      expect(stats.totalIntegrations).toBeGreaterThan(0);
      expect(stats.successfulIntegrations).toBeGreaterThan(0);
      expect(stats.componentUsage).toBeDefined();
    });
    
    test('should perform health check', () => {
      const health = engine.healthCheck();
      
      expect(health).toBeDefined();
      expect(health.overall).toBeDefined();
      expect(health.components).toBeDefined();
      expect(health.recommendations).toBeDefined();
    });
    
    test('should clear engine', () => {
      const request: IntegrationRequest = {
        id: 'req7',
        components: ['core'],
        mode: 'sequential',
        level: 'basic',
        data: {},
        priority: 5
      };
      
      engine.integrate(request);
      engine.clear();
      
      const stats = engine.getStatistics();
      expect(stats.totalIntegrations).toBe(0);
    });
  });
  
  // ═══════════════════════════════════════════════════════════════════════
  // Systems Coordinator Tests - اختبارات منسق الأنظمة
  // ═══════════════════════════════════════════════════════════════════════
  
  describe('SystemsCoordinator - منسق الأنظمة', () => {
    let coordinator: SystemsCoordinator;
    
    beforeEach(() => {
      coordinator = new SystemsCoordinator();
    });
    
    test('should create coordinator', () => {
      expect(coordinator).toBeDefined();
    });
    
    test('should create plan with sequential strategy', () => {
      const tasks: CoordinationTask[] = [
        { id: 'task1', name: 'Task 1', description: 'First task', priority: 5, dependencies: [], estimatedTime: 100 },
        { id: 'task2', name: 'Task 2', description: 'Second task', priority: 7, dependencies: ['task1'], estimatedTime: 150 }
      ];
      
      const plan = coordinator.createPlan(tasks, 'sequential');
      
      expect(plan).toBeDefined();
      expect(plan.tasks).toHaveLength(2);
      expect(plan.strategy).toBe('sequential');
    });
    
    test('should create plan with priority-based strategy', () => {
      const tasks: CoordinationTask[] = [
        { id: 'task1', name: 'Task 1', description: 'Low priority', priority: 3, dependencies: [], estimatedTime: 100 },
        { id: 'task2', name: 'Task 2', description: 'High priority', priority: 9, dependencies: [], estimatedTime: 150 }
      ];
      
      const plan = coordinator.createPlan(tasks, 'priority-based');
      
      expect(plan.tasks[0].priority).toBeGreaterThanOrEqual(plan.tasks[1].priority);
    });
    
    test('should create plan with adaptive strategy', () => {
      const tasks: CoordinationTask[] = [
        { id: 'task1', name: 'Task 1', description: 'Long task', priority: 5, dependencies: [], estimatedTime: 500 },
        { id: 'task2', name: 'Task 2', description: 'Short task', priority: 5, dependencies: [], estimatedTime: 100 }
      ];
      
      const plan = coordinator.createPlan(tasks, 'adaptive');
      
      expect(plan.tasks[0].estimatedTime).toBeLessThanOrEqual(plan.tasks[1].estimatedTime);
    });
    
    test('should create plan with intelligent strategy', () => {
      const tasks: CoordinationTask[] = [
        { id: 'task1', name: 'Task 1', description: 'First', priority: 5, dependencies: [], estimatedTime: 100 },
        { id: 'task2', name: 'Task 2', description: 'Second', priority: 7, dependencies: ['task1'], estimatedTime: 150 }
      ];
      
      const plan = coordinator.createPlan(tasks, 'intelligent');
      
      expect(plan).toBeDefined();
      expect(plan.strategy).toBe('intelligent');
    });
    
    test('should execute plan', () => {
      const tasks: CoordinationTask[] = [
        { id: 'task1', name: 'Task 1', description: 'Test task', priority: 5, dependencies: [], estimatedTime: 100 }
      ];

      const plan = coordinator.createPlan(tasks, 'sequential');
      const result = coordinator.executePlan(plan.id);

      expect(result).toBeDefined();
      expect(result.planId).toBe(plan.id);
      expect(result.completedTasks).toBeGreaterThanOrEqual(0);
    });
    
    test('should monitor plan', () => {
      const tasks: CoordinationTask[] = [
        { id: 'task1', name: 'Task 1', description: 'Test', priority: 5, dependencies: [], estimatedTime: 100 }
      ];
      
      const plan = coordinator.createPlan(tasks, 'sequential');
      coordinator.executePlan(plan.id);
      
      const monitor = coordinator.monitorPlan(plan.id);
      
      expect(monitor).toBeDefined();
      expect(monitor.planId).toBe(plan.id);
      expect(monitor.state).toBeDefined();
    });
    
    test('should optimize plan', () => {
      const tasks: CoordinationTask[] = [
        { id: 'task1', name: 'Task 1', description: 'Low priority', priority: 3, dependencies: [], estimatedTime: 100 },
        { id: 'task2', name: 'Task 2', description: 'High priority', priority: 9, dependencies: [], estimatedTime: 150 }
      ];
      
      const plan = coordinator.createPlan(tasks, 'sequential');
      const optimized = coordinator.optimizePlan(plan.id);
      
      expect(optimized).toBeDefined();
      expect(optimized.strategy).toBe('intelligent');
    });
    
    test('should get plan by id', () => {
      const tasks: CoordinationTask[] = [
        { id: 'task1', name: 'Task 1', description: 'Test', priority: 5, dependencies: [], estimatedTime: 100 }
      ];
      
      const plan = coordinator.createPlan(tasks, 'sequential');
      const retrieved = coordinator.getPlan(plan.id);
      
      expect(retrieved).toBeDefined();
      expect(retrieved?.id).toBe(plan.id);
    });
    
    test('should get statistics', () => {
      const tasks: CoordinationTask[] = [
        { id: 'task1', name: 'Task 1', description: 'Test', priority: 5, dependencies: [], estimatedTime: 100 }
      ];
      
      coordinator.createPlan(tasks, 'sequential');
      
      const stats = coordinator.getStatistics();
      
      expect(stats.totalPlans).toBeGreaterThan(0);
      expect(stats.strategyDistribution).toBeDefined();
    });
  });
  
  // ═══════════════════════════════════════════════════════════════════════
  // Workflow Manager Tests - اختبارات مدير سير العمل
  // ═══════════════════════════════════════════════════════════════════════
  
  describe('WorkflowManager - مدير سير العمل', () => {
    let manager: WorkflowManager;
    
    beforeEach(() => {
      manager = new WorkflowManager();
    });
    
    test('should create workflow', () => {
      const workflow = manager.createWorkflow('Test Workflow', 'Test description', 'linear');
      
      expect(workflow).toBeDefined();
      expect(workflow.name).toBe('Test Workflow');
      expect(workflow.type).toBe('linear');
      expect(workflow.state).toBe('draft');
    });
    
    test('should add step to workflow', () => {
      const workflow = manager.createWorkflow('Test', 'Description', 'linear');
      
      const added = manager.addStep(workflow.id, {
        id: 'step1',
        name: 'Step 1',
        type: 'action',
        action: 'test_action',
        nextSteps: []
      });
      
      expect(added).toBe(true);
    });
    
    test('should remove step from workflow', () => {
      const workflow = manager.createWorkflow('Test', 'Description', 'linear');
      
      manager.addStep(workflow.id, {
        id: 'step1',
        name: 'Step 1',
        type: 'action',
        nextSteps: []
      });
      
      const removed = manager.removeStep(workflow.id, 'step1');
      expect(removed).toBe(true);
    });
    
    test('should set start step', () => {
      const workflow = manager.createWorkflow('Test', 'Description', 'linear');
      
      manager.addStep(workflow.id, {
        id: 'step1',
        name: 'Step 1',
        type: 'action',
        nextSteps: []
      });
      
      const set = manager.setStartStep(workflow.id, 'step1');
      expect(set).toBe(true);
    });
    
    test('should add end step', () => {
      const workflow = manager.createWorkflow('Test', 'Description', 'linear');
      
      manager.addStep(workflow.id, {
        id: 'step1',
        name: 'Step 1',
        type: 'action',
        nextSteps: []
      });
      
      const added = manager.addEndStep(workflow.id, 'step1');
      expect(added).toBe(true);
    });
    
    test('should activate workflow', () => {
      const workflow = manager.createWorkflow('Test', 'Description', 'linear');
      
      manager.addStep(workflow.id, {
        id: 'step1',
        name: 'Step 1',
        type: 'action',
        nextSteps: []
      });
      
      manager.setStartStep(workflow.id, 'step1');
      manager.addEndStep(workflow.id, 'step1');
      
      const activated = manager.activateWorkflow(workflow.id);
      expect(activated).toBe(true);
    });
    
    test('should execute workflow', () => {
      const workflow = manager.createWorkflow('Test', 'Description', 'linear');
      
      manager.addStep(workflow.id, {
        id: 'step1',
        name: 'Step 1',
        type: 'action',
        action: 'test',
        nextSteps: []
      });
      
      manager.setStartStep(workflow.id, 'step1');
      manager.addEndStep(workflow.id, 'step1');
      manager.activateWorkflow(workflow.id);
      
      const execution = manager.executeWorkflow(workflow.id);
      
      expect(execution).toBeDefined();
      expect(execution.workflowId).toBe(workflow.id);
    });
    
    test('should get workflow by id', () => {
      const workflow = manager.createWorkflow('Test', 'Description', 'linear');
      const retrieved = manager.getWorkflow(workflow.id);
      
      expect(retrieved).toBeDefined();
      expect(retrieved?.id).toBe(workflow.id);
    });
    
    test('should get statistics', () => {
      manager.createWorkflow('Test 1', 'Description', 'linear');
      manager.createWorkflow('Test 2', 'Description', 'branching');
      
      const stats = manager.getStatistics();
      
      expect(stats.totalWorkflows).toBe(2);
      expect(stats.typeDistribution).toBeDefined();
    });
  });
  
  // ═══════════════════════════════════════════════════════════════════════
  // Final Integration Manager Tests - اختبارات مدير التكامل النهائي
  // ═══════════════════════════════════════════════════════════════════════
  
  describe('FinalIntegrationManager - مدير التكامل النهائي', () => {
    let manager: FinalIntegrationManager;
    
    beforeEach(() => {
      manager = new FinalIntegrationManager();
    });
    
    test('should create manager', () => {
      expect(manager).toBeDefined();
    });
    
    test('should create task', () => {
      const task = manager.createTask(
        'Test task',
        'query',
        ['core', 'brain'],
        { test: 'data' }
      );
      
      expect(task).toBeDefined();
      expect(task.type).toBe('query');
      expect(task.components).toHaveLength(2);
    });
    
    test('should execute task in standalone mode', () => {
      const task = manager.createTask(
        'Test task',
        'query',
        ['core'],
        { test: 'data' },
        { mode: 'standalone' }
      );
      
      const result = manager.executeTask(task.id);
      
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.integrationResult).toBeDefined();
    });
    
    test('should execute task in coordinated mode', () => {
      const task = manager.createTask(
        'Test task',
        'analysis',
        ['core', 'brain'],
        { test: 'data' },
        { mode: 'coordinated' }
      );
      
      const result = manager.executeTask(task.id);
      
      expect(result).toBeDefined();
      expect(result.coordinationResult).toBeDefined();
    });
    
    test('should execute task in workflow mode', () => {
      const task = manager.createTask(
        'Test task',
        'generation',
        ['core', 'brain', 'thinking'],
        { test: 'data' },
        { mode: 'workflow' }
      );
      
      const result = manager.executeTask(task.id);
      
      expect(result).toBeDefined();
      expect(result.workflowResult).toBeDefined();
    });
    
    test('should execute task in full-integration mode', () => {
      const task = manager.createTask(
        'Test task',
        'transformation',
        ['core', 'brain', 'thinking', 'memory'],
        { test: 'data' },
        { mode: 'full-integration' }
      );
      
      const result = manager.executeTask(task.id);
      
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
    });
    
    test('should process query', () => {
      const result = manager.processQuery('ما هي المعادلة الأم؟');
      
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
    });
    
    test('should analyze system', () => {
      const analysis = manager.analyzeSystem();
      
      expect(analysis).toBeDefined();
      expect(analysis.integration).toBeDefined();
      expect(analysis.coordination).toBeDefined();
      expect(analysis.workflow).toBeDefined();
      expect(analysis.overall).toBeDefined();
    });
    
    test('should get configuration', () => {
      const config = manager.getConfiguration();
      
      expect(config).toBeDefined();
      expect(config.integrationLevel).toBeDefined();
      expect(config.integrationMode).toBeDefined();
    });
    
    test('should update configuration', () => {
      manager.updateConfiguration({
        integrationLevel: 'basic',
        autoOptimize: false
      });
      
      const config = manager.getConfiguration();
      expect(config.integrationLevel).toBe('basic');
      expect(config.autoOptimize).toBe(false);
    });
    
    test('should get statistics', () => {
      const task = manager.createTask(
        'Test',
        'query',
        ['core'],
        {}
      );
      
      manager.executeTask(task.id);
      
      const stats = manager.getStatistics();
      
      expect(stats.tasks.total).toBeGreaterThan(0);
      expect(stats.results.total).toBeGreaterThan(0);
      expect(stats.subsystems).toBeDefined();
    });
  });
});

