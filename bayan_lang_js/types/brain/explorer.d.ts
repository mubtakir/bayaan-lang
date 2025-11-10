/**
 * نظام المستكشف - Explorer System
 *
 * المستكشف يكتشف أنماط وحلول جديدة
 * Explorer discovers new patterns and solutions
 *
 * @author Al-Mubtakir
 * @version 1.0.0
 */
import { Vector2D } from './theories/perpendicularOpposites';
/**
 * اكتشاف جديد
 * New Discovery
 */
export interface Discovery {
    id: string;
    pattern: any;
    action: any;
    novelty: number;
    potential: number;
    explorationPath: any[];
    timestamp: Date;
}
/**
 * قرار المستكشف
 * Explorer Decision
 */
export interface ExplorerDecision {
    action: any;
    novelty: number;
    potential: number;
    reasoning: string;
    explorationStrategy: string;
}
/**
 * استراتيجية الاستكشاف
 * Exploration Strategy
 */
export type ExplorationStrategy = 'random' | 'perpendicular' | 'gradient' | 'filament';
/**
 * فئة نظام المستكشف
 * Explorer System Class
 */
export declare class ExplorerSystem {
    private discoveries;
    private explorationRate;
    private noveltyThreshold;
    private filamentTheory;
    constructor(explorationRate?: number, noveltyThreshold?: number);
    /**
     * تهيئة الفتائل
     * Initialize filaments
     */
    private initializeFilaments;
    /**
     * إضافة اكتشاف جديد
     * Add new discovery
     */
    addDiscovery(discovery: Omit<Discovery, 'timestamp'>): void;
    /**
     * استكشاف اتجاه جديد
     * Explore new direction
     */
    exploreNewDirection(currentDirection: Vector2D, strategy?: ExplorationStrategy): ExplorerDecision;
    /**
     * حساب الجدة
     * Calculate novelty
     */
    private calculateNovelty;
    /**
     * حساب الإمكانية
     * Calculate potential
     */
    private calculatePotential;
    /**
     * حساب المسافة بين إجراءين
     * Calculate distance between two actions
     */
    private calculateDistance;
    /**
     * التعلم من الاستكشاف
     * Learn from exploration
     */
    learnFromExploration(discoveryId: string, success: boolean, reward?: number): boolean;
    /**
     * الحصول على أفضل الاكتشافات
     * Get best discoveries
     */
    getBestDiscoveries(count?: number): Discovery[];
    /**
     * الحصول على إحصائيات
     * Get statistics
     */
    getStatistics(): {
        totalDiscoveries: number;
        averageNovelty: number;
        averagePotential: number;
        bestDiscovery: Discovery | null;
    };
    /**
     * مسح الاكتشافات القديمة
     * Clear old discoveries
     */
    clearOldDiscoveries(daysOld?: number): number;
}
