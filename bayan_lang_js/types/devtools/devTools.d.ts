/**
 * أدوات التطوير - Development Tools
 *
 * REPL تفاعلي، Debugger، Profiler، Code Formatter
 */
/**
 * مستوى السجل
 */
export declare enum LogLevel {
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR"
}
/**
 * نقطة توقف
 */
export declare class Breakpoint {
    file: string;
    line: number;
    condition?: string | undefined;
    enabled: boolean;
    constructor(file: string, line: number, condition?: string | undefined, enabled?: boolean);
    toString(): string;
}
/**
 * إطار المكدس
 */
export declare class StackFrame {
    functionName: string;
    file: string;
    line: number;
    variables: Map<string, any>;
    constructor(functionName: string, file: string, line: number, variables?: Map<string, any>);
    toString(): string;
}
/**
 * محرك التنقيح (Debugger)
 */
export declare class Debugger {
    private breakpoints;
    private callStack;
    /**
     * إضافة نقطة توقف
     */
    addBreakpoint(file: string, line: number, condition?: string): Breakpoint;
    /**
     * إزالة نقطة توقف
     */
    removeBreakpoint(file: string, line: number): boolean;
    /**
     * التحقق من نقطة توقف
     */
    shouldBreak(file: string, line: number, _context: Map<string, any>): boolean;
    /**
     * دفع إطار للمكدس
     */
    pushFrame(functionName: string, file: string, line: number, variables?: Map<string, any>): void;
    /**
     * سحب إطار من المكدس
     */
    popFrame(): StackFrame | undefined;
    /**
     * الحصول على المكدس
     */
    getCallStack(): StackFrame[];
    /**
     * طباعة المكدس
     */
    printCallStack(): void;
    /**
     * الحصول على الإحصائيات
     */
    getStatistics(): {
        totalBreakpoints: number;
        enabledBreakpoints: number;
        callStackDepth: number;
    };
}
/**
 * قياس الأداء (Profiler)
 */
export declare class Profiler {
    private measurements;
    private activeTimers;
    private callCounts;
    /**
     * بدء القياس
     */
    start(name: string): void;
    /**
     * إنهاء القياس
     */
    end(name: string): number | undefined;
    /**
     * قياس دالة
     */
    measure<T>(name: string, fn: () => T): T;
    /**
     * قياس دالة غير متزامنة
     */
    measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T>;
    /**
     * الحصول على الإحصائيات
     */
    getStatistics(name: string): {
        count: number;
        calls: number;
        min: number;
        max: number;
        average: number;
        median: number;
        total: number;
    } | null;
    /**
     * طباعة التقرير
     */
    printReport(): void;
    /**
     * مسح القياسات
     */
    clear(): void;
}
/**
 * منسق الكود (Code Formatter)
 */
export declare class CodeFormatter {
    private indentSize;
    private indentChar;
    constructor(indentSize?: number, indentChar?: string);
    /**
     * تنسيق الكود
     */
    format(code: string): string;
    /**
     * تنسيق ملف
     */
    formatFile(_filePath: string, code: string): string;
}
/**
 * REPL تفاعلي
 */
export declare class REPL {
    private context;
    private history;
    /**
     * تقييم كود
     */
    eval(code: string): any;
    /**
     * طباعة النتيجة
     */
    print(value: any): void;
    /**
     * الحصول على السجل
     */
    getHistory(): string[];
    /**
     * مسح السجل
     */
    clearHistory(): void;
    /**
     * مسح السياق
     */
    clearContext(): void;
}
/**
 * محرك أدوات التطوير
 */
export declare class DevToolsEngine {
    debugger: Debugger;
    profiler: Profiler;
    formatter: CodeFormatter;
    repl: REPL;
    constructor();
    /**
     * الحصول على الإحصائيات الشاملة
     */
    getOverallStatistics(): {
        debugger: {
            totalBreakpoints: number;
            enabledBreakpoints: number;
            callStackDepth: number;
        };
        profiler: {
            totalMeasurements: number;
        };
        repl: {
            historySize: number;
        };
    };
}
