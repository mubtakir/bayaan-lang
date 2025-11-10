/**
 * مدير الموارد - Resource Manager
 * Manages resources for Bayan-Baserah integration
 */
export type ResourceType = 'memory' | 'cpu' | 'storage' | 'network' | 'cache';
export type ResourceStatus = 'available' | 'allocated' | 'exhausted' | 'error';
export interface Resource {
    id: string;
    type: ResourceType;
    capacity: number;
    used: number;
    available: number;
    status: ResourceStatus;
    lastUpdated: number;
}
export interface ResourceAllocation {
    id: string;
    resourceId: string;
    amount: number;
    owner: string;
    timestamp: number;
    priority: number;
}
export interface ResourceQuota {
    type: ResourceType;
    limit: number;
    warning: number;
    critical: number;
}
export declare class ResourceManager {
    private resources;
    private allocations;
    private quotas;
    private resourceCounter;
    private allocationCounter;
    constructor();
    private initializeDefaultResources;
    private initializeDefaultQuotas;
    createResource(type: ResourceType, capacity: number): Resource;
    allocate(resourceType: ResourceType, amount: number, owner: string, priority?: number): ResourceAllocation | null;
    deallocate(allocationId: string): boolean;
    private findAvailableResource;
    private updateResourceStatus;
    getResource(id: string): Resource | null;
    getResourcesByType(type: ResourceType): Resource[];
    getAllocations(owner?: string): ResourceAllocation[];
    getResourceUsage(type: ResourceType): {
        total: number;
        used: number;
        available: number;
        percentage: number;
    };
    setQuota(type: ResourceType, limit: number, warning: number, critical: number): void;
    getQuota(type: ResourceType): ResourceQuota | null;
    checkQuota(type: ResourceType): {
        withinLimit: boolean;
        atWarning: boolean;
        atCritical: boolean;
        usage: number;
    };
    getStatistics(): {
        totalResources: number;
        totalAllocations: number;
        resourcesByType: Record<ResourceType, number>;
        allocationsByType: Record<ResourceType, number>;
        overallUsage: number;
    };
    clear(): void;
}
