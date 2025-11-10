/**
 * محرك التكامل الشامل - Comprehensive Integration Engine
 * Integrates all Baserah AI systems into a unified whole
 */
export type IntegrationLevel = 'basic' | 'intermediate' | 'advanced' | 'full';
export type IntegrationMode = 'sequential' | 'parallel' | 'adaptive' | 'intelligent';
export type SystemComponent = 'core' | 'brain' | 'thinking' | 'memory' | 'knowledge' | 'language' | 'reasoning' | 'artistic' | 'interaction' | 'emotional' | 'conversational' | 'lexicon' | 'letterMeanings' | 'linguisticEquations' | 'bayanIntegration' | 'advanced';
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
export declare class IntegrationEngine {
    private integrations;
    private componentStatuses;
    private integrationCounter;
    constructor();
    private initializeComponents;
    integrate(request: IntegrationRequest): IntegrationResult;
    private executeSequential;
    private executeParallel;
    private executeAdaptive;
    private executeIntelligent;
    private executeComponent;
    private selectBestComponents;
    private combineResults;
    getComponentStatus(component: SystemComponent): ComponentStatus | null;
    getAllComponentStatuses(): ComponentStatus[];
    updateComponentStatus(component: SystemComponent, updates: Partial<ComponentStatus>): void;
    getIntegration(id: string): IntegrationResult | null;
    getIntegrationsByMode(mode: IntegrationMode): IntegrationResult[];
    getStatistics(): {
        totalIntegrations: number;
        successfulIntegrations: number;
        averageExecutionTime: number;
        componentUsage: Record<SystemComponent, number>;
        modeDistribution: Record<IntegrationMode, number>;
    };
    healthCheck(): {
        overall: 'healthy' | 'degraded' | 'critical';
        components: Array<{
            component: SystemComponent;
            status: string;
        }>;
        recommendations: string[];
    };
    clear(): void;
}
