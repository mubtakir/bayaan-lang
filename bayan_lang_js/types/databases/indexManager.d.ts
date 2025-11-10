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
export declare class IndexManager {
    private indexes;
    private indexData;
    private indexCounter;
    createIndex(config: IndexConfig): Index;
    addToIndex(indexId: string, key: any, value: any): boolean;
    private addToBTree;
    private addToHash;
    private addToFullText;
    private addToSpatial;
    private addToComposite;
    private hash;
    private tokenize;
    private getSpatialKey;
    private estimateSize;
    search(indexId: string, searchKey: any): IndexSearchResult;
    private searchFullText;
    private searchSpatial;
    removeFromIndex(indexId: string, key: any): boolean;
    rebuildIndex(indexId: string): boolean;
    dropIndex(indexId: string): boolean;
    getIndex(id: string): Index | null;
    getIndexes(): Index[];
    getIndexesByTable(table: string): Index[];
    getIndexesByType(type: IndexType): Index[];
    getStatistics(): {
        totalIndexes: number;
        totalSize: number;
        totalEntries: number;
        averageSize: number;
        typeDistribution: Record<IndexType, number>;
        statusDistribution: Record<IndexStatus, number>;
        mostUsedIndexes: Array<{
            id: string;
            name: string;
            usageCount: number;
        }>;
    };
    clear(): void;
}
