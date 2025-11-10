/**
 * نظام المستكشف - Explorer System
 * 
 * المستكشف يكتشف أنماط وحلول جديدة
 * Explorer discovers new patterns and solutions
 * 
 * @author Al-Mubtakir
 * @version 1.0.0
 */

import { PerpendicularOpposites, Vector2D } from './theories/perpendicularOpposites';
import { FilamentTheory, createFilament, FilamentParams } from './theories/filamentTheory';

/**
 * اكتشاف جديد
 * New Discovery
 */
export interface Discovery {
  id: string;
  pattern: any;
  action: any;
  novelty: number;        // الجدة (0-1)
  potential: number;      // الإمكانية (0-1)
  explorationPath: any[]; // مسار الاستكشاف
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
export type ExplorationStrategy = 
  | 'random'           // عشوائي
  | 'perpendicular'    // متعامد
  | 'gradient'         // تدرج
  | 'filament';        // فتائل

/**
 * فئة نظام المستكشف
 * Explorer System Class
 */
export class ExplorerSystem {
  private discoveries: Map<string, Discovery> = new Map();
  private explorationRate: number = 0.3;
  private noveltyThreshold: number = 0.5;
  private filamentTheory: FilamentTheory = new FilamentTheory();
  
  constructor(
    explorationRate: number = 0.3,
    noveltyThreshold: number = 0.5
  ) {
    this.explorationRate = explorationRate;
    this.noveltyThreshold = noveltyThreshold;
    this.initializeFilaments();
  }
  
  /**
   * تهيئة الفتائل
   * Initialize filaments
   */
  private initializeFilaments(): void {
    // فتيل سيغمويد للاستكشاف
    const sigmoidFilament = createFilament('exploration_sigmoid', {
      type: 'sigmoid',
      weight: 1.0,
      bias: 0.0,
      steepness: 2.0
    });
    
    // فتيل خطي للاستغلال
    const linearFilament = createFilament('exploitation_linear', {
      type: 'linear',
      weight: 0.7,
      bias: 0.3
    });
    
    this.filamentTheory.addFilament(sigmoidFilament);
    this.filamentTheory.addFilament(linearFilament);
  }
  
  /**
   * إضافة اكتشاف جديد
   * Add new discovery
   */
  addDiscovery(discovery: Omit<Discovery, 'timestamp'>): void {
    const fullDiscovery: Discovery = {
      ...discovery,
      timestamp: new Date()
    };
    
    this.discoveries.set(discovery.id, fullDiscovery);
  }
  
  /**
   * استكشاف اتجاه جديد
   * Explore new direction
   */
  exploreNewDirection(
    currentDirection: Vector2D,
    strategy: ExplorationStrategy = 'perpendicular'
  ): ExplorerDecision {
    let newDirection: Vector2D;
    let strategyName: string;
    
    switch (strategy) {
      case 'perpendicular':
        newDirection = PerpendicularOpposites.createExplorationVector2D(
          this.explorationRate,
          90 // زاوية متعامدة
        );
        strategyName = 'استكشاف متعامد';
        break;
        
      case 'random':
        newDirection = {
          x: Math.random() * 2 - 1,
          y: Math.random() * 2 - 1
        };
        strategyName = 'استكشاف عشوائي';
        break;
        
      case 'gradient':
        // استكشاف بناءً على التدرج
        newDirection = {
          x: currentDirection.x + (Math.random() - 0.5) * this.explorationRate,
          y: currentDirection.y + (Math.random() - 0.5) * this.explorationRate
        };
        strategyName = 'استكشاف تدرجي';
        break;
        
      case 'filament':
        // استكشاف بناءً على الفتائل
        const filamentValue = this.filamentTheory.calculate(
          Math.sqrt(currentDirection.x ** 2 + currentDirection.y ** 2),
          'average'
        );
        newDirection = {
          x: currentDirection.x * filamentValue,
          y: currentDirection.y * filamentValue
        };
        strategyName = 'استكشاف بالفتائل';
        break;
        
      default:
        throw new Error(`استراتيجية غير معروفة: ${strategy}`);
    }
    
    // حساب الجدة والإمكانية
    const novelty = this.calculateNovelty(newDirection);
    const potential = this.calculatePotential(newDirection);
    
    return {
      action: newDirection,
      novelty,
      potential,
      reasoning: `${strategyName} - جدة: ${(novelty * 100).toFixed(1)}%, إمكانية: ${(potential * 100).toFixed(1)}%`,
      explorationStrategy: strategy
    };
  }
  
  /**
   * حساب الجدة
   * Calculate novelty
   */
  private calculateNovelty(action: any): number {
    // حساب مدى اختلاف الإجراء عن الاكتشافات السابقة
    if (this.discoveries.size === 0) {
      return 1.0; // جديد تماماً
    }
    
    let minDistance = Infinity;
    
    for (const discovery of this.discoveries.values()) {
      const distance = this.calculateDistance(action, discovery.action);
      if (distance < minDistance) {
        minDistance = distance;
      }
    }
    
    // تحويل المسافة إلى جدة (0-1)
    return Math.min(1.0, minDistance / 10.0);
  }
  
  /**
   * حساب الإمكانية
   * Calculate potential
   */
  private calculatePotential(action: any): number {
    // حساب إمكانية نجاح الإجراء
    // هذا مثال بسيط - يمكن تحسينه
    
    if (typeof action === 'object' && 'x' in action && 'y' in action) {
      const magnitude = Math.sqrt(action.x ** 2 + action.y ** 2);
      return Math.min(1.0, magnitude);
    }
    
    return 0.5; // افتراضي
  }
  
  /**
   * حساب المسافة بين إجراءين
   * Calculate distance between two actions
   */
  private calculateDistance(action1: any, action2: any): number {
    // مسافة بسيطة - يمكن تحسينها
    if (
      typeof action1 === 'object' && 'x' in action1 &&
      typeof action2 === 'object' && 'x' in action2
    ) {
      const dx = action1.x - action2.x;
      const dy = action1.y - action2.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
    
    return 0;
  }
  
  /**
   * التعلم من الاستكشاف
   * Learn from exploration
   */
  learnFromExploration(
    discoveryId: string,
    success: boolean,
    reward: number = 1.0
  ): boolean {
    const discovery = this.discoveries.get(discoveryId);
    if (!discovery) {
      return false;
    }
    
    // تحديث الإمكانية بناءً على النتيجة
    const adjustment = success ? reward : -reward * 0.5;
    discovery.potential = Math.max(
      0,
      Math.min(1, discovery.potential + adjustment * 0.1)
    );
    
    return true;
  }
  
  /**
   * الحصول على أفضل الاكتشافات
   * Get best discoveries
   */
  getBestDiscoveries(count: number = 5): Discovery[] {
    const sorted = Array.from(this.discoveries.values()).sort((a, b) => {
      const scoreA = a.novelty * 0.4 + a.potential * 0.6;
      const scoreB = b.novelty * 0.4 + b.potential * 0.6;
      return scoreB - scoreA;
    });
    
    return sorted.slice(0, count);
  }
  
  /**
   * الحصول على إحصائيات
   * Get statistics
   */
  getStatistics(): {
    totalDiscoveries: number;
    averageNovelty: number;
    averagePotential: number;
    bestDiscovery: Discovery | null;
  } {
    if (this.discoveries.size === 0) {
      return {
        totalDiscoveries: 0,
        averageNovelty: 0,
        averagePotential: 0,
        bestDiscovery: null
      };
    }
    
    let totalNovelty = 0;
    let totalPotential = 0;
    let bestDiscovery: Discovery | null = null;
    let bestScore = -1;
    
    for (const discovery of this.discoveries.values()) {
      totalNovelty += discovery.novelty;
      totalPotential += discovery.potential;
      
      const score = discovery.novelty * 0.4 + discovery.potential * 0.6;
      if (score > bestScore) {
        bestScore = score;
        bestDiscovery = discovery;
      }
    }
    
    return {
      totalDiscoveries: this.discoveries.size,
      averageNovelty: totalNovelty / this.discoveries.size,
      averagePotential: totalPotential / this.discoveries.size,
      bestDiscovery
    };
  }
  
  /**
   * مسح الاكتشافات القديمة
   * Clear old discoveries
   */
  clearOldDiscoveries(daysOld: number = 30): number {
    const now = new Date();
    const threshold = daysOld * 24 * 60 * 60 * 1000;
    let cleared = 0;
    
    for (const [id, discovery] of this.discoveries) {
      const age = now.getTime() - discovery.timestamp.getTime();
      if (age > threshold && discovery.potential < 0.3) {
        this.discoveries.delete(id);
        cleared++;
      }
    }
    
    return cleared;
  }
}

