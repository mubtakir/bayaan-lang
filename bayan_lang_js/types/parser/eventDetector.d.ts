/**
 * كاشف الأحداث - Event Detector
 * Detects events and their relationships in code
 */
import * as AST from '../ast/index.js';
import { Event } from './intelligentAST.js';
/**
 * كاشف الأحداث - Event Detector
 */
export declare class EventDetector {
    private eventIdCounter;
    /**
     * كشف الأحداث من AST
     * Detect events from AST
     */
    detectEvents(ast: AST.ASTNode): Event[];
    /**
     * كشف الأحداث في دالة
     * Detect events in function
     */
    private detectEventsInFunction;
    /**
     * كشف حدث في استدعاء دالة
     * Detect event in function call
     */
    private detectEventInFunctionCall;
    /**
     * كشف حدث في تعيين
     * Detect event in assignment
     */
    private detectEventInAssignment;
    /**
     * كشف الأحداث في عبارة if
     * Detect events in if statement
     */
    private detectEventsInIfStatement;
    /**
     * كشف الأحداث في عبارة while
     * Detect events in while statement
     */
    private detectEventsInWhileStatement;
    /**
     * كشف الأحداث في عبارة for
     * Detect events in for statement
     */
    private detectEventsInForStatement;
    /**
     * كشف حدث في إنشاء كائن
     * Detect event in object creation
     */
    private detectEventInObjectCreation;
    /**
     * كشف حدث في return
     * Detect event in return
     */
    private detectEventInReturn;
    /**
     * كشف حدث في throw
     * Detect event in throw
     */
    private detectEventInThrow;
    /**
     * توليد معرف حدث
     * Generate event ID
     */
    private generateEventId;
    /**
     * استخراج اسم الدالة
     * Extract function name
     */
    private extractFunctionName;
    /**
     * استخراج اسم المعرف
     * Extract identifier name
     */
    private extractIdentifierName;
    /**
     * الحصول على نمط حدث معروف
     * Get known event pattern
     */
    private getKnownEventPattern;
}
