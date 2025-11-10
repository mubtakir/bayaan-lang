/**
 * مدير التكامل - Integration Manager
 * Manages the integration between Bayan and Baserah AI
 */

import { BayanConverter, ConversionResult, BaserahRepresentation } from './bayanConverter';
import { ExecutionEngine, ExecutionResult, ExecutionMode } from './executionEngine';
import { ResourceManager, ResourceType, ResourceAllocation } from './resourceManager';

export type IntegrationMode = 'development' | 'production' | 'testing' | 'debugging';
export type IntegrationStatus = 'active' | 'inactive' | 'error' | 'maintenance';

export interface IntegrationSettings {
  mode: IntegrationMode;
  autoConvert: boolean;
  autoExecute: boolean;
  enableCaching: boolean;
  enableProfiling: boolean;
  maxExecutionTime: number;
  maxMemoryUsage: number;
}

export interface IntegrationSession {
  id: string;
  startTime: number;
  endTime: number | null;
  conversions: number;
  executions: number;
  errors: number;
  warnings: number;
}

export interface ProfilingData {
  conversionTime: number;
  executionTime: number;
  memoryUsage: number;
  cpuUsage: number;
  cacheHits: number;
  cacheMisses: number;
}

export class IntegrationManager {
  private converter: BayanConverter;
  private executionEngine: ExecutionEngine;
  private resourceManager: ResourceManager;
  private status: IntegrationStatus = 'inactive';
  private settings: IntegrationSettings;
  private currentSession: IntegrationSession | null = null;
  private sessions: IntegrationSession[] = [];
  private sessionCounter: number = 0;
  private profilingData: ProfilingData[] = [];
  
  constructor(settings?: Partial<IntegrationSettings>) {
    this.converter = new BayanConverter();
    this.executionEngine = new ExecutionEngine(this.converter);
    this.resourceManager = new ResourceManager();
    
    this.settings = {
      mode: 'development',
      autoConvert: true,
      autoExecute: false,
      enableCaching: true,
      enableProfiling: true,
      maxExecutionTime: 30000, // 30 seconds
      maxMemoryUsage: 512 * 1024 * 1024, // 512MB
      ...settings
    };
  }
  
  startSession(): IntegrationSession {
    const id = `session_${this.sessionCounter++}`;
    
    this.currentSession = {
      id,
      startTime: Date.now(),
      endTime: null,
      conversions: 0,
      executions: 0,
      errors: 0,
      warnings: 0
    };
    
    this.status = 'active';
    
    return this.currentSession;
  }
  
  endSession(): IntegrationSession | null {
    if (!this.currentSession) {
      return null;
    }
    
    this.currentSession.endTime = Date.now();
    this.sessions.push(this.currentSession);
    
    const session = this.currentSession;
    this.currentSession = null;
    this.status = 'inactive';
    
    return session;
  }
  
  processCode(bayanCode: string, execute: boolean = false): {
    conversion: ConversionResult | null;
    execution: ExecutionResult | null;
    profiling: ProfilingData | null;
  } {
    const startTime = Date.now();
    let conversion: ConversionResult | null = null;
    let execution: ExecutionResult | null = null;
    let profiling: ProfilingData | null = null;
    
    try {
      // Allocate resources
      const memoryAllocation = this.resourceManager.allocate('memory', 10 * 1024 * 1024, 'integration', 5);
      const cpuAllocation = this.resourceManager.allocate('cpu', 10, 'integration', 5);
      
      if (!memoryAllocation || !cpuAllocation) {
        throw new Error('Failed to allocate resources');
      }
      
      // Convert
      if (this.settings.autoConvert) {
        const conversionStart = Date.now();
        conversion = this.converter.convertBayanToBaserah(bayanCode);
        const conversionTime = Date.now() - conversionStart;
        
        if (this.currentSession) {
          this.currentSession.conversions++;
          if (!conversion.success) {
            this.currentSession.errors++;
          }
          this.currentSession.warnings += conversion.warnings.length;
        }
        
        // Execute if requested
        if (execute && this.settings.autoExecute && conversion.success) {
          const executionStart = Date.now();
          execution = this.executionEngine.execute(bayanCode, this.getExecutionMode());
          const executionTime = Date.now() - executionStart;
          
          if (this.currentSession) {
            this.currentSession.executions++;
            if (!execution.success) {
              this.currentSession.errors++;
            }
            this.currentSession.warnings += execution.warnings.length;
          }
          
          // Profiling
          if (this.settings.enableProfiling) {
            profiling = {
              conversionTime,
              executionTime,
              memoryUsage: memoryAllocation.amount,
              cpuUsage: cpuAllocation.amount,
              cacheHits: 0,
              cacheMisses: 0
            };
            
            this.profilingData.push(profiling);
          }
        }
      }
      
      // Deallocate resources
      if (memoryAllocation) {
        this.resourceManager.deallocate(memoryAllocation.id);
      }
      if (cpuAllocation) {
        this.resourceManager.deallocate(cpuAllocation.id);
      }
      
      return { conversion, execution, profiling };
    } catch (error) {
      if (this.currentSession) {
        this.currentSession.errors++;
      }
      
      this.status = 'error';
      
      return { conversion, execution, profiling };
    }
  }
  
  private getExecutionMode(): ExecutionMode {
    switch (this.settings.mode) {
      case 'debugging':
        return 'debug';
      case 'testing':
        return 'trace';
      default:
        return 'normal';
    }
  }
  
  convertCode(bayanCode: string): ConversionResult {
    return this.converter.convertBayanToBaserah(bayanCode);
  }
  
  executeCode(bayanCode: string, mode?: ExecutionMode): ExecutionResult {
    return this.executionEngine.execute(bayanCode, mode || this.getExecutionMode());
  }
  
  getConverter(): BayanConverter {
    return this.converter;
  }
  
  getExecutionEngine(): ExecutionEngine {
    return this.executionEngine;
  }
  
  getResourceManager(): ResourceManager {
    return this.resourceManager;
  }
  
  getStatus(): IntegrationStatus {
    return this.status;
  }
  
  getSettings(): IntegrationSettings {
    return { ...this.settings };
  }
  
  updateSettings(newSettings: Partial<IntegrationSettings>): void {
    this.settings = { ...this.settings, ...newSettings };
  }
  
  getCurrentSession(): IntegrationSession | null {
    return this.currentSession ? { ...this.currentSession } : null;
  }
  
  getSessions(limit?: number): IntegrationSession[] {
    if (limit) {
      return this.sessions.slice(-limit);
    }
    return [...this.sessions];
  }
  
  getProfilingData(limit?: number): ProfilingData[] {
    if (limit) {
      return this.profilingData.slice(-limit);
    }
    return [...this.profilingData];
  }
  
  getResourceUsage(): {
    memory: ReturnType<ResourceManager['getResourceUsage']>;
    cpu: ReturnType<ResourceManager['getResourceUsage']>;
    storage: ReturnType<ResourceManager['getResourceUsage']>;
  } {
    return {
      memory: this.resourceManager.getResourceUsage('memory'),
      cpu: this.resourceManager.getResourceUsage('cpu'),
      storage: this.resourceManager.getResourceUsage('storage')
    };
  }
  
  getStatistics(): {
    converter: ReturnType<BayanConverter['getStatistics']>;
    execution: ReturnType<ExecutionEngine['getStatistics']>;
    resources: ReturnType<ResourceManager['getStatistics']>;
    sessions: {
      total: number;
      active: boolean;
      totalConversions: number;
      totalExecutions: number;
      totalErrors: number;
      totalWarnings: number;
    };
    profiling: {
      averageConversionTime: number;
      averageExecutionTime: number;
      averageMemoryUsage: number;
      averageCpuUsage: number;
    };
  } {
    let totalConversions = 0;
    let totalExecutions = 0;
    let totalErrors = 0;
    let totalWarnings = 0;
    
    for (const session of this.sessions) {
      totalConversions += session.conversions;
      totalExecutions += session.executions;
      totalErrors += session.errors;
      totalWarnings += session.warnings;
    }
    
    if (this.currentSession) {
      totalConversions += this.currentSession.conversions;
      totalExecutions += this.currentSession.executions;
      totalErrors += this.currentSession.errors;
      totalWarnings += this.currentSession.warnings;
    }
    
    const avgConversionTime = this.profilingData.length > 0
      ? this.profilingData.reduce((sum, p) => sum + p.conversionTime, 0) / this.profilingData.length
      : 0;
    
    const avgExecutionTime = this.profilingData.length > 0
      ? this.profilingData.reduce((sum, p) => sum + p.executionTime, 0) / this.profilingData.length
      : 0;
    
    const avgMemoryUsage = this.profilingData.length > 0
      ? this.profilingData.reduce((sum, p) => sum + p.memoryUsage, 0) / this.profilingData.length
      : 0;
    
    const avgCpuUsage = this.profilingData.length > 0
      ? this.profilingData.reduce((sum, p) => sum + p.cpuUsage, 0) / this.profilingData.length
      : 0;
    
    return {
      converter: this.converter.getStatistics(),
      execution: this.executionEngine.getStatistics(),
      resources: this.resourceManager.getStatistics(),
      sessions: {
        total: this.sessions.length + (this.currentSession ? 1 : 0),
        active: this.currentSession !== null,
        totalConversions,
        totalExecutions,
        totalErrors,
        totalWarnings
      },
      profiling: {
        averageConversionTime: avgConversionTime,
        averageExecutionTime: avgExecutionTime,
        averageMemoryUsage: avgMemoryUsage,
        averageCpuUsage: avgCpuUsage
      }
    };
  }
  
  clearHistory(): void {
    this.sessions = [];
    this.profilingData = [];
    this.converter.clearCache();
    this.executionEngine.clearHistory();
  }
  
  reset(): void {
    this.status = 'inactive';
    this.currentSession = null;
    this.sessions = [];
    this.profilingData = [];
    this.sessionCounter = 0;
    this.converter.clearCache();
    this.executionEngine.reset();
    this.resourceManager.clear();
  }
}

