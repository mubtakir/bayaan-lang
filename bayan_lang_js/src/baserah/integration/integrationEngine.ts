/**
 * محرك التكامل الشامل - Comprehensive Integration Engine
 * Integrates all Baserah AI systems into a unified whole
 */

export type IntegrationLevel = 'basic' | 'intermediate' | 'advanced' | 'full';
export type IntegrationMode = 'sequential' | 'parallel' | 'adaptive' | 'intelligent';
export type SystemComponent = 'core' | 'brain' | 'thinking' | 'memory' | 'knowledge' | 'language' | 
                               'reasoning' | 'artistic' | 'interaction' | 'emotional' | 'conversational' |
                               'lexicon' | 'letterMeanings' | 'linguisticEquations' | 'bayanIntegration' | 'advanced';

export interface IntegrationRequest {
  id: string;
  components: SystemComponent[];
  mode: IntegrationMode;
  level: IntegrationLevel;
  data: any;
  priority: number;
}

export interface IntegrationResult {
  id: string;
  requestId: string;
  success: boolean;
  results: Map<SystemComponent, any>;
  combinedResult: any;
  executionTime: number;
  componentsUsed: SystemComponent[];
  timestamp: number;
}

export interface ComponentStatus {
  component: SystemComponent;
  available: boolean;
  healthy: boolean;
  load: number;
  lastUsed: number;
}

export class IntegrationEngine {
  private integrations: Map<string, IntegrationResult> = new Map();
  private componentStatuses: Map<SystemComponent, ComponentStatus> = new Map();
  private integrationCounter: number = 0;
  
  constructor() {
    this.initializeComponents();
  }
  
  private initializeComponents(): void {
    const components: SystemComponent[] = [
      'core', 'brain', 'thinking', 'memory', 'knowledge', 'language',
      'reasoning', 'artistic', 'interaction', 'emotional', 'conversational',
      'lexicon', 'letterMeanings', 'linguisticEquations', 'bayanIntegration', 'advanced'
    ];
    
    for (const component of components) {
      this.componentStatuses.set(component, {
        component,
        available: true,
        healthy: true,
        load: 0,
        lastUsed: 0
      });
    }
  }
  
  integrate(request: IntegrationRequest): IntegrationResult {
    const startTime = Date.now();
    const id = `integration_${this.integrationCounter++}`;
    
    const result: IntegrationResult = {
      id,
      requestId: request.id,
      success: false,
      results: new Map(),
      combinedResult: null,
      executionTime: 0,
      componentsUsed: [],
      timestamp: Date.now()
    };
    
    try {
      // Execute integration based on mode
      switch (request.mode) {
        case 'sequential':
          this.executeSequential(request, result);
          break;
        case 'parallel':
          this.executeParallel(request, result);
          break;
        case 'adaptive':
          this.executeAdaptive(request, result);
          break;
        case 'intelligent':
          this.executeIntelligent(request, result);
          break;
      }
      
      // Combine results
      result.combinedResult = this.combineResults(result.results, request.level);
      result.success = true;
    } catch (error) {
      result.success = false;
    }
    
    result.executionTime = Date.now() - startTime;
    this.integrations.set(id, result);
    
    return result;
  }
  
  private executeSequential(request: IntegrationRequest, result: IntegrationResult): void {
    let currentData = request.data;
    
    for (const component of request.components) {
      const componentResult = this.executeComponent(component, currentData);
      result.results.set(component, componentResult);
      result.componentsUsed.push(component);
      currentData = componentResult; // Chain results
    }
  }
  
  private executeParallel(request: IntegrationRequest, result: IntegrationResult): void {
    for (const component of request.components) {
      const componentResult = this.executeComponent(component, request.data);
      result.results.set(component, componentResult);
      result.componentsUsed.push(component);
    }
  }
  
  private executeAdaptive(request: IntegrationRequest, result: IntegrationResult): void {
    // Sort components by load (least loaded first)
    const sortedComponents = [...request.components].sort((a, b) => {
      const loadA = this.componentStatuses.get(a)?.load || 0;
      const loadB = this.componentStatuses.get(b)?.load || 0;
      return loadA - loadB;
    });
    
    for (const component of sortedComponents) {
      const componentResult = this.executeComponent(component, request.data);
      result.results.set(component, componentResult);
      result.componentsUsed.push(component);
    }
  }
  
  private executeIntelligent(request: IntegrationRequest, result: IntegrationResult): void {
    // Select best components based on health, load, and relevance
    const selectedComponents = this.selectBestComponents(request.components, request.level);
    
    for (const component of selectedComponents) {
      const componentResult = this.executeComponent(component, request.data);
      result.results.set(component, componentResult);
      result.componentsUsed.push(component);
    }
  }
  
  private executeComponent(component: SystemComponent, data: any): any {
    // Update component status
    const status = this.componentStatuses.get(component);
    if (status) {
      status.load += 0.1;
      status.lastUsed = Date.now();
    }
    
    // Simulate component execution
    const result = {
      component,
      processed: true,
      data: `Processed by ${component}`,
      timestamp: Date.now()
    };
    
    // Decrease load after execution
    setTimeout(() => {
      if (status) {
        status.load = Math.max(0, status.load - 0.1);
      }
    }, 100);
    
    return result;
  }
  
  private selectBestComponents(components: SystemComponent[], level: IntegrationLevel): SystemComponent[] {
    const scored = components.map(component => {
      const status = this.componentStatuses.get(component);
      const healthScore = status?.healthy ? 1 : 0;
      const loadScore = 1 - (status?.load || 0);
      const availabilityScore = status?.available ? 1 : 0;
      
      const totalScore = (healthScore + loadScore + availabilityScore) / 3;
      
      return { component, score: totalScore };
    });
    
    // Sort by score and select top components based on level
    const limit = level === 'full' ? components.length :
                  level === 'advanced' ? Math.ceil(components.length * 0.75) :
                  level === 'intermediate' ? Math.ceil(components.length * 0.5) :
                  Math.ceil(components.length * 0.25);
    
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.component);
  }
  
  private combineResults(results: Map<SystemComponent, any>, level: IntegrationLevel): any {
    const combined: any = {
      level,
      componentCount: results.size,
      results: {},
      summary: ''
    };
    
    for (const [component, result] of results.entries()) {
      combined.results[component] = result;
    }
    
    combined.summary = `Integrated ${results.size} components at ${level} level`;
    
    return combined;
  }
  
  getComponentStatus(component: SystemComponent): ComponentStatus | null {
    return this.componentStatuses.get(component) || null;
  }
  
  getAllComponentStatuses(): ComponentStatus[] {
    return Array.from(this.componentStatuses.values());
  }
  
  updateComponentStatus(component: SystemComponent, updates: Partial<ComponentStatus>): void {
    const status = this.componentStatuses.get(component);
    if (status) {
      Object.assign(status, updates);
    }
  }
  
  getIntegration(id: string): IntegrationResult | null {
    return this.integrations.get(id) || null;
  }
  
  getIntegrationsByMode(mode: IntegrationMode): IntegrationResult[] {
    // Note: We need to track mode in results for this to work properly
    return Array.from(this.integrations.values());
  }
  
  getStatistics(): {
    totalIntegrations: number;
    successfulIntegrations: number;
    averageExecutionTime: number;
    componentUsage: Record<SystemComponent, number>;
    modeDistribution: Record<IntegrationMode, number>;
  } {
    const componentUsage: Record<string, number> = {};
    const modeDistribution: Record<IntegrationMode, number> = {
      sequential: 0,
      parallel: 0,
      adaptive: 0,
      intelligent: 0
    };
    
    let successCount = 0;
    let totalTime = 0;
    
    for (const integration of this.integrations.values()) {
      if (integration.success) successCount++;
      totalTime += integration.executionTime;
      
      for (const component of integration.componentsUsed) {
        componentUsage[component] = (componentUsage[component] || 0) + 1;
      }
    }
    
    return {
      totalIntegrations: this.integrations.size,
      successfulIntegrations: successCount,
      averageExecutionTime: this.integrations.size > 0 ? totalTime / this.integrations.size : 0,
      componentUsage: componentUsage as Record<SystemComponent, number>,
      modeDistribution
    };
  }
  
  healthCheck(): {
    overall: 'healthy' | 'degraded' | 'critical';
    components: Array<{ component: SystemComponent; status: string }>;
    recommendations: string[];
  } {
    const components: Array<{ component: SystemComponent; status: string }> = [];
    const recommendations: string[] = [];
    
    let healthyCount = 0;
    let totalCount = 0;
    
    for (const status of this.componentStatuses.values()) {
      totalCount++;
      
      const componentStatus = status.healthy && status.available ? 'healthy' :
                             status.available ? 'degraded' : 'unavailable';
      
      components.push({
        component: status.component,
        status: componentStatus
      });
      
      if (componentStatus === 'healthy') healthyCount++;
      
      if (status.load > 0.8) {
        recommendations.push(`High load on ${status.component} - consider scaling`);
      }
    }
    
    const healthRatio = healthyCount / totalCount;
    const overall = healthRatio > 0.9 ? 'healthy' :
                   healthRatio > 0.7 ? 'degraded' : 'critical';
    
    if (overall !== 'healthy') {
      recommendations.push('System health is not optimal - investigate component issues');
    }
    
    return {
      overall,
      components,
      recommendations
    };
  }
  
  clear(): void {
    this.integrations.clear();
    this.integrationCounter = 0;
    this.initializeComponents();
  }
}

