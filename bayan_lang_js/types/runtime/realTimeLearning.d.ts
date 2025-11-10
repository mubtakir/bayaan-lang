/**
 * نظام التعلم الفوري - Real-time Learning System
 * Learns from execution patterns and adapts behavior dynamically
 */
import { ExecutionExample, LearningPattern, AdaptiveBehavior, LearningResult, ExecutionState, CausalEffect } from './intelligentRuntimeTypes.js';
/**
 * نظام التعلم الفوري - Real-time Learning System
 */
export declare class RealTimeLearningSystem {
    private patterns;
    private behaviors;
    private executionHistory;
    private learningRules;
    private behaviorRules;
    private maxPatterns;
    private maxBehaviors;
    constructor(maxPatterns?: number, maxBehaviors?: number);
    /**
     * تعلم - Learn
     * Learns patterns from execution and adapts behaviors
     */
    learn(executionExample: ExecutionExample, causalEffects: CausalEffect[]): LearningResult;
    /**
     * تكييف السلوك - Adapt Behavior
     * Adapts behavior based on current execution state
     */
    adaptBehavior(state: ExecutionState): AdaptiveBehavior[];
    /**
     * إضافة أو تحديث نمط - Add or Update Pattern
     */
    private addOrUpdatePattern;
    /**
     * إضافة أو تحديث سلوك - Add or Update Behavior
     */
    private addOrUpdateBehavior;
    /**
     * تهيئة قواعد التعلم - Initialize Learning Rules
     */
    private initializeLearningRules;
    /**
     * تهيئة قواعد السلوك - Initialize Behavior Rules
     */
    private initializeBehaviorRules;
    /**
     * الحصول على جميع الأنماط - Get All Patterns
     */
    getAllPatterns(): LearningPattern[];
    /**
     * الحصول على جميع السلوكيات - Get All Behaviors
     */
    getAllBehaviors(): AdaptiveBehavior[];
}
