/**
 * نظرية ثنائية الصفر - Zero Duality Theory
 *
 * نظرية فلسفية ورياضية تتعامل مع مفهوم الصفر والثنائية
 * Philosophical and mathematical theory dealing with zero and duality concepts
 */
export interface ZeroDualityPrinciple {
    name: string;
    description: string;
    mathematicalRepresentation?: string;
}
export declare class ZeroDualityTheory {
    private principles;
    constructor();
    private initializePrinciples;
    getPrinciples(): ZeroDualityPrinciple[];
    applyPrinciple(principleName: string, value: number): number;
    /**
     * تقييم التوازن بين قيمتين
     * Evaluate balance between two values
     */
    static evaluateBalance(positive: number, negative: number): {
        balanceFactor: number;
        isBalanced: boolean;
    };
}
export { ZeroDualityTheory as ZeroDuality };
