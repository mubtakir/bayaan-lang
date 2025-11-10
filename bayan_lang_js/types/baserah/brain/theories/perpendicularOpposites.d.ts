/**
 * نظرية الأضداد المتعامدة - Perpendicular Opposites Theory
 *
 * نظرية تتعامل مع الأضداد المتعامدة في الفضاء المفاهيمي
 * Theory dealing with perpendicular opposites in conceptual space
 */
export interface Vector2D {
    x: number;
    y: number;
}
export interface OppositesPair {
    concept1: string;
    concept2: string;
    angle: number;
    relationship: 'perpendicular' | 'parallel' | 'oblique';
}
export declare class PerpendicularOppositesTheory {
    private oppositesPairs;
    constructor();
    private initializeOpposites;
    getOppositesPairs(): OppositesPair[];
    addOppositesPair(pair: OppositesPair): void;
    findOpposite(concept: string): string | null;
    calculateRelationship(concept1: string, concept2: string): 'perpendicular' | 'parallel' | 'oblique' | 'unknown';
    /**
     * إنشاء متجه استكشاف ثنائي الأبعاد
     * Create exploration vector in 2D space
     */
    static createExplorationVector2D(magnitude: number, angle: number): Vector2D;
}
export { PerpendicularOppositesTheory as PerpendicularOpposites };
