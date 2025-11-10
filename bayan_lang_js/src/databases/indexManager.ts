/**
 * مدير الفهارس - Index Manager
 * Manages database indexes for fast data retrieval
 */

export type IndexType = 'btree' | 'hash' | 'fulltext' | 'spatial' | 'composite';
export type IndexStatus = 'building' | 'ready' | 'updating' | 'corrupted';

export interface IndexConfig {
  name: string;
  table: string;
  columns: string[];
  type: IndexType;
  unique: boolean;
  sparse: boolean;
}

export interface Index {
  id: string;
  config: IndexConfig;
  status: IndexStatus;
  size: number;
  entries: number;
  createdAt: number;
  lastUpdated: number;
  lastUsed: number;
  usageCount: number;
}

export interface IndexSearchResult {
  indexId: string;
  matches: any[];
  searchTime: number;
  indexUsed: boolean;
}

export class IndexManager {
  private indexes: Map<string, Index> = new Map();
  private indexData: Map<string, Map<any, any[]>> = new Map();
  private indexCounter: number = 0;
  
  createIndex(config: IndexConfig): Index {
    const id = `index_${this.indexCounter++}`;
    
    const index: Index = {
      id,
      config,
      status: 'building',
      size: 0,
      entries: 0,
      createdAt: Date.now(),
      lastUpdated: Date.now(),
      lastUsed: 0,
      usageCount: 0
    };
    
    this.indexes.set(id, index);
    this.indexData.set(id, new Map());
    
    // Simulate index building
    setTimeout(() => {
      index.status = 'ready';
    }, 100);
    
    return index;
  }
  
  addToIndex(indexId: string, key: any, value: any): boolean {
    const index = this.indexes.get(indexId);
    if (!index || index.status !== 'ready') return false;
    
    const data = this.indexData.get(indexId);
    if (!data) return false;
    
    // Add to index based on type
    switch (index.config.type) {
      case 'btree':
        return this.addToBTree(data, key, value, index);
      case 'hash':
        return this.addToHash(data, key, value, index);
      case 'fulltext':
        return this.addToFullText(data, key, value, index);
      case 'spatial':
        return this.addToSpatial(data, key, value, index);
      case 'composite':
        return this.addToComposite(data, key, value, index);
      default:
        return false;
    }
  }
  
  private addToBTree(data: Map<any, any[]>, key: any, value: any, index: Index): boolean {
    if (!data.has(key)) {
      data.set(key, []);
    }
    
    const values = data.get(key)!;
    
    if (index.config.unique && values.length > 0) {
      return false; // Unique constraint violation
    }
    
    values.push(value);
    index.entries++;
    index.size += this.estimateSize(key, value);
    index.lastUpdated = Date.now();
    
    return true;
  }
  
  private addToHash(data: Map<any, any[]>, key: any, value: any, index: Index): boolean {
    const hashKey = this.hash(key);
    
    if (!data.has(hashKey)) {
      data.set(hashKey, []);
    }
    
    data.get(hashKey)!.push(value);
    index.entries++;
    index.size += this.estimateSize(key, value);
    index.lastUpdated = Date.now();
    
    return true;
  }
  
  private addToFullText(data: Map<any, any[]>, key: any, value: any, index: Index): boolean {
    // Tokenize text for full-text search
    const tokens = this.tokenize(String(key));
    
    for (const token of tokens) {
      if (!data.has(token)) {
        data.set(token, []);
      }
      data.get(token)!.push(value);
    }
    
    index.entries++;
    index.size += this.estimateSize(key, value);
    index.lastUpdated = Date.now();
    
    return true;
  }
  
  private addToSpatial(data: Map<any, any[]>, key: any, value: any, index: Index): boolean {
    // Simplified spatial indexing
    const spatialKey = this.getSpatialKey(key);
    
    if (!data.has(spatialKey)) {
      data.set(spatialKey, []);
    }
    
    data.get(spatialKey)!.push(value);
    index.entries++;
    index.size += this.estimateSize(key, value);
    index.lastUpdated = Date.now();
    
    return true;
  }
  
  private addToComposite(data: Map<any, any[]>, key: any, value: any, index: Index): boolean {
    // Composite key (multiple columns)
    const compositeKey = Array.isArray(key) ? key.join('|') : String(key);
    
    if (!data.has(compositeKey)) {
      data.set(compositeKey, []);
    }
    
    data.get(compositeKey)!.push(value);
    index.entries++;
    index.size += this.estimateSize(key, value);
    index.lastUpdated = Date.now();
    
    return true;
  }
  
  private hash(key: any): number {
    const str = String(key);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash;
  }
  
  private tokenize(text: string): string[] {
    return text.toLowerCase()
      .split(/\s+/)
      .filter(token => token.length > 2);
  }
  
  private getSpatialKey(key: any): string {
    // Simplified spatial key generation
    if (typeof key === 'object' && key.x !== undefined && key.y !== undefined) {
      const gridX = Math.floor(key.x / 10);
      const gridY = Math.floor(key.y / 10);
      return `${gridX},${gridY}`;
    }
    return String(key);
  }
  
  private estimateSize(key: any, value: any): number {
    const keySize = JSON.stringify(key).length;
    const valueSize = JSON.stringify(value).length;
    return keySize + valueSize;
  }
  
  search(indexId: string, searchKey: any): IndexSearchResult {
    const startTime = Date.now();
    const index = this.indexes.get(indexId);
    
    if (!index || index.status !== 'ready') {
      return {
        indexId,
        matches: [],
        searchTime: Date.now() - startTime,
        indexUsed: false
      };
    }
    
    const data = this.indexData.get(indexId);
    if (!data) {
      return {
        indexId,
        matches: [],
        searchTime: Date.now() - startTime,
        indexUsed: false
      };
    }
    
    let matches: any[] = [];
    
    // Search based on index type
    switch (index.config.type) {
      case 'btree':
        matches = data.get(searchKey) || [];
        break;
      case 'hash':
        const hashKey = this.hash(searchKey);
        matches = data.get(hashKey) || [];
        break;
      case 'fulltext':
        matches = this.searchFullText(data, searchKey);
        break;
      case 'spatial':
        matches = this.searchSpatial(data, searchKey);
        break;
      case 'composite':
        const compositeKey = Array.isArray(searchKey) ? searchKey.join('|') : String(searchKey);
        matches = data.get(compositeKey) || [];
        break;
    }
    
    // Update index usage stats
    index.lastUsed = Date.now();
    index.usageCount++;
    
    return {
      indexId,
      matches,
      searchTime: Date.now() - startTime,
      indexUsed: true
    };
  }
  
  private searchFullText(data: Map<any, any[]>, searchKey: any): any[] {
    const tokens = this.tokenize(String(searchKey));
    const results = new Set<any>();
    
    for (const token of tokens) {
      const matches = data.get(token) || [];
      for (const match of matches) {
        results.add(match);
      }
    }
    
    return Array.from(results);
  }
  
  private searchSpatial(data: Map<any, any[]>, searchKey: any): any[] {
    const spatialKey = this.getSpatialKey(searchKey);
    return data.get(spatialKey) || [];
  }
  
  removeFromIndex(indexId: string, key: any): boolean {
    const index = this.indexes.get(indexId);
    if (!index) return false;
    
    const data = this.indexData.get(indexId);
    if (!data) return false;
    
    const deleted = data.delete(key);
    
    if (deleted) {
      index.entries--;
      index.lastUpdated = Date.now();
    }
    
    return deleted;
  }
  
  rebuildIndex(indexId: string): boolean {
    const index = this.indexes.get(indexId);
    if (!index) return false;
    
    index.status = 'updating';
    
    // Simulate rebuild
    setTimeout(() => {
      index.status = 'ready';
      index.lastUpdated = Date.now();
    }, 200);
    
    return true;
  }
  
  dropIndex(indexId: string): boolean {
    this.indexData.delete(indexId);
    return this.indexes.delete(indexId);
  }
  
  getIndex(id: string): Index | null {
    return this.indexes.get(id) || null;
  }
  
  getIndexes(): Index[] {
    return Array.from(this.indexes.values());
  }
  
  getIndexesByTable(table: string): Index[] {
    return Array.from(this.indexes.values())
      .filter(index => index.config.table === table);
  }
  
  getIndexesByType(type: IndexType): Index[] {
    return Array.from(this.indexes.values())
      .filter(index => index.config.type === type);
  }
  
  getStatistics(): {
    totalIndexes: number;
    totalSize: number;
    totalEntries: number;
    averageSize: number;
    typeDistribution: Record<IndexType, number>;
    statusDistribution: Record<IndexStatus, number>;
    mostUsedIndexes: Array<{ id: string; name: string; usageCount: number }>;
  } {
    const typeDistribution: Record<IndexType, number> = {
      btree: 0,
      hash: 0,
      fulltext: 0,
      spatial: 0,
      composite: 0
    };
    
    const statusDistribution: Record<IndexStatus, number> = {
      building: 0,
      ready: 0,
      updating: 0,
      corrupted: 0
    };
    
    let totalSize = 0;
    let totalEntries = 0;
    
    for (const index of this.indexes.values()) {
      totalSize += index.size;
      totalEntries += index.entries;
      typeDistribution[index.config.type]++;
      statusDistribution[index.status]++;
    }
    
    const mostUsedIndexes = Array.from(this.indexes.values())
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, 5)
      .map(index => ({
        id: index.id,
        name: index.config.name,
        usageCount: index.usageCount
      }));
    
    return {
      totalIndexes: this.indexes.size,
      totalSize,
      totalEntries,
      averageSize: this.indexes.size > 0 ? totalSize / this.indexes.size : 0,
      typeDistribution,
      statusDistribution,
      mostUsedIndexes
    };
  }
  
  clear(): void {
    this.indexes.clear();
    this.indexData.clear();
    this.indexCounter = 0;
  }
}

