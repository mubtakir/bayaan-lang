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

export class ResourceManager {
  private resources: Map<string, Resource> = new Map();
  private allocations: Map<string, ResourceAllocation> = new Map();
  private quotas: Map<ResourceType, ResourceQuota> = new Map();
  private resourceCounter: number = 0;
  private allocationCounter: number = 0;
  
  constructor() {
    this.initializeDefaultResources();
    this.initializeDefaultQuotas();
  }
  
  private initializeDefaultResources(): void {
    // Memory resource
    this.createResource('memory', 1024 * 1024 * 1024); // 1GB
    
    // CPU resource
    this.createResource('cpu', 100); // 100%
    
    // Storage resource
    this.createResource('storage', 10 * 1024 * 1024 * 1024); // 10GB
    
    // Network resource
    this.createResource('network', 1000); // 1000 Mbps
    
    // Cache resource
    this.createResource('cache', 100 * 1024 * 1024); // 100MB
  }
  
  private initializeDefaultQuotas(): void {
    this.quotas.set('memory', {
      type: 'memory',
      limit: 1024 * 1024 * 1024,
      warning: 800 * 1024 * 1024,
      critical: 950 * 1024 * 1024
    });
    
    this.quotas.set('cpu', {
      type: 'cpu',
      limit: 100,
      warning: 80,
      critical: 95
    });
    
    this.quotas.set('storage', {
      type: 'storage',
      limit: 10 * 1024 * 1024 * 1024,
      warning: 8 * 1024 * 1024 * 1024,
      critical: 9.5 * 1024 * 1024 * 1024
    });
    
    this.quotas.set('network', {
      type: 'network',
      limit: 1000,
      warning: 800,
      critical: 950
    });
    
    this.quotas.set('cache', {
      type: 'cache',
      limit: 100 * 1024 * 1024,
      warning: 80 * 1024 * 1024,
      critical: 95 * 1024 * 1024
    });
  }
  
  createResource(type: ResourceType, capacity: number): Resource {
    const id = `resource_${this.resourceCounter++}`;
    
    const resource: Resource = {
      id,
      type,
      capacity,
      used: 0,
      available: capacity,
      status: 'available',
      lastUpdated: Date.now()
    };
    
    this.resources.set(id, resource);
    
    return resource;
  }
  
  allocate(resourceType: ResourceType, amount: number, owner: string, priority: number = 5): ResourceAllocation | null {
    // Find available resource of the specified type
    const resource = this.findAvailableResource(resourceType, amount);
    
    if (!resource) {
      return null;
    }
    
    // Check quota
    const quota = this.quotas.get(resourceType);
    if (quota && resource.used + amount > quota.limit) {
      return null;
    }
    
    // Create allocation
    const id = `allocation_${this.allocationCounter++}`;
    
    const allocation: ResourceAllocation = {
      id,
      resourceId: resource.id,
      amount,
      owner,
      timestamp: Date.now(),
      priority
    };
    
    // Update resource
    resource.used += amount;
    resource.available -= amount;
    resource.lastUpdated = Date.now();
    
    // Update status
    this.updateResourceStatus(resource);
    
    // Store allocation
    this.allocations.set(id, allocation);
    
    return allocation;
  }
  
  deallocate(allocationId: string): boolean {
    const allocation = this.allocations.get(allocationId);
    
    if (!allocation) {
      return false;
    }
    
    const resource = this.resources.get(allocation.resourceId);
    
    if (!resource) {
      return false;
    }
    
    // Update resource
    resource.used -= allocation.amount;
    resource.available += allocation.amount;
    resource.lastUpdated = Date.now();
    
    // Update status
    this.updateResourceStatus(resource);
    
    // Remove allocation
    this.allocations.delete(allocationId);
    
    return true;
  }
  
  private findAvailableResource(type: ResourceType, amount: number): Resource | null {
    for (const resource of this.resources.values()) {
      if (resource.type === type && resource.available >= amount) {
        return resource;
      }
    }
    
    return null;
  }
  
  private updateResourceStatus(resource: Resource): void {
    const quota = this.quotas.get(resource.type);
    
    if (!quota) {
      resource.status = resource.available > 0 ? 'available' : 'exhausted';
      return;
    }
    
    if (resource.used >= quota.critical) {
      resource.status = 'error';
    } else if (resource.used >= quota.warning) {
      resource.status = 'allocated';
    } else if (resource.available === 0) {
      resource.status = 'exhausted';
    } else {
      resource.status = 'available';
    }
  }
  
  getResource(id: string): Resource | null {
    return this.resources.get(id) || null;
  }
  
  getResourcesByType(type: ResourceType): Resource[] {
    return Array.from(this.resources.values())
      .filter(r => r.type === type);
  }
  
  getAllocations(owner?: string): ResourceAllocation[] {
    const allocations = Array.from(this.allocations.values());
    
    if (owner) {
      return allocations.filter(a => a.owner === owner);
    }
    
    return allocations;
  }
  
  getResourceUsage(type: ResourceType): {
    total: number;
    used: number;
    available: number;
    percentage: number;
  } {
    const resources = this.getResourcesByType(type);
    
    const total = resources.reduce((sum, r) => sum + r.capacity, 0);
    const used = resources.reduce((sum, r) => sum + r.used, 0);
    const available = resources.reduce((sum, r) => sum + r.available, 0);
    const percentage = total > 0 ? (used / total) * 100 : 0;
    
    return { total, used, available, percentage };
  }
  
  setQuota(type: ResourceType, limit: number, warning: number, critical: number): void {
    this.quotas.set(type, {
      type,
      limit,
      warning,
      critical
    });
  }
  
  getQuota(type: ResourceType): ResourceQuota | null {
    return this.quotas.get(type) || null;
  }
  
  checkQuota(type: ResourceType): {
    withinLimit: boolean;
    atWarning: boolean;
    atCritical: boolean;
    usage: number;
  } {
    const quota = this.quotas.get(type);
    const usage = this.getResourceUsage(type);
    
    if (!quota) {
      return {
        withinLimit: true,
        atWarning: false,
        atCritical: false,
        usage: usage.used
      };
    }
    
    return {
      withinLimit: usage.used <= quota.limit,
      atWarning: usage.used >= quota.warning,
      atCritical: usage.used >= quota.critical,
      usage: usage.used
    };
  }
  
  getStatistics(): {
    totalResources: number;
    totalAllocations: number;
    resourcesByType: Record<ResourceType, number>;
    allocationsByType: Record<ResourceType, number>;
    overallUsage: number;
  } {
    const resourcesByType: Record<ResourceType, number> = {
      memory: 0,
      cpu: 0,
      storage: 0,
      network: 0,
      cache: 0
    };
    
    const allocationsByType: Record<ResourceType, number> = {
      memory: 0,
      cpu: 0,
      storage: 0,
      network: 0,
      cache: 0
    };
    
    for (const resource of this.resources.values()) {
      resourcesByType[resource.type]++;
    }
    
    for (const allocation of this.allocations.values()) {
      const resource = this.resources.get(allocation.resourceId);
      if (resource) {
        allocationsByType[resource.type]++;
      }
    }
    
    let totalCapacity = 0;
    let totalUsed = 0;
    
    for (const resource of this.resources.values()) {
      totalCapacity += resource.capacity;
      totalUsed += resource.used;
    }
    
    const overallUsage = totalCapacity > 0 ? (totalUsed / totalCapacity) * 100 : 0;
    
    return {
      totalResources: this.resources.size,
      totalAllocations: this.allocations.size,
      resourcesByType,
      allocationsByType,
      overallUsage
    };
  }
  
  clear(): void {
    this.resources.clear();
    this.allocations.clear();
    this.quotas.clear();
    this.resourceCounter = 0;
    this.allocationCounter = 0;
    this.initializeDefaultResources();
    this.initializeDefaultQuotas();
  }
}

