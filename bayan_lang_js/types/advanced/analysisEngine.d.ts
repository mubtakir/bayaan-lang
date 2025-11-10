/**
 * محرك التحليل المتقدم - Advanced Analysis Engine
 * Performs advanced analysis using revolutionary theories
 */
export type AnalysisType = 'pattern' | 'complexity' | 'symmetry' | 'correlation' | 'anomaly';
export type AnalysisLevel = 'basic' | 'intermediate' | 'advanced' | 'expert' | 'revolutionary';
export interface AnalysisInput {
    data: any[];
    type: AnalysisType;
    level: AnalysisLevel;
    context?: Map<string, any>;
}
export interface AnalysisResult {
    id: string;
    type: AnalysisType;
    level: AnalysisLevel;
    findings: Map<string, any>;
    confidence: number;
    complexity: number;
    timestamp: number;
    recommendations: string[];
}
export interface PatternAnalysis {
    patterns: Array<{
        pattern: string;
        frequency: number;
        confidence: number;
    }>;
    totalPatterns: number;
    dominantPattern: string | null;
    patternStrength: number;
}
export interface ComplexityAnalysis {
    score: number;
    factors: Map<string, number>;
    level: 'low' | 'medium' | 'high' | 'very-high';
    breakdown: Map<string, number>;
}
export declare class AnalysisEngine {
    private analyses;
    private analysisCounter;
    analyze(input: AnalysisInput): AnalysisResult;
    private analyzePatterns;
    private analyzeComplexity;
    private analyzeSymmetry;
    private analyzeCorrelation;
    private analyzeAnomalies;
    private adjustConfidenceByLevel;
    getAnalysis(id: string): AnalysisResult | null;
    getAnalysesByType(type: AnalysisType): AnalysisResult[];
    getRecentAnalyses(limit?: number): AnalysisResult[];
    getStatistics(): {
        totalAnalyses: number;
        typeDistribution: Record<AnalysisType, number>;
        levelDistribution: Record<AnalysisLevel, number>;
        averageConfidence: number;
        averageComplexity: number;
    };
    clear(): void;
}
