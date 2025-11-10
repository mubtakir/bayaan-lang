/**
 * أدوات التطوير - Development Tools
 *
 * REPL تفاعلي، Debugger، Profiler، Code Formatter
 */

/**
 * مستوى السجل
 */
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

/**
 * نقطة توقف
 */
export class Breakpoint {
  constructor(
    public file: string,
    public line: number,
    public condition?: string,
    public enabled: boolean = true
  ) {}

  toString(): string {
    return `${this.file}:${this.line}${this.condition ? ` if ${this.condition}` : ''}`;
  }
}

/**
 * إطار المكدس
 */
export class StackFrame {
  constructor(
    public functionName: string,
    public file: string,
    public line: number,
    public variables: Map<string, any> = new Map()
  ) {}

  toString(): string {
    return `${this.functionName} (${this.file}:${this.line})`;
  }
}

/**
 * محرك التنقيح (Debugger)
 */
export class Debugger {
  private breakpoints: Map<string, Breakpoint[]> = new Map();
  private callStack: StackFrame[] = [];

  /**
   * إضافة نقطة توقف
   */
  addBreakpoint(file: string, line: number, condition?: string): Breakpoint {
    const bp = new Breakpoint(file, line, condition);
    
    if (!this.breakpoints.has(file)) {
      this.breakpoints.set(file, []);
    }
    
    this.breakpoints.get(file)!.push(bp);
    return bp;
  }

  /**
   * إزالة نقطة توقف
   */
  removeBreakpoint(file: string, line: number): boolean {
    const bps = this.breakpoints.get(file);
    if (!bps) return false;

    const index = bps.findIndex(bp => bp.line === line);
    if (index === -1) return false;

    bps.splice(index, 1);
    return true;
  }

  /**
   * التحقق من نقطة توقف
   */
  shouldBreak(file: string, line: number, _context: Map<string, any>): boolean {
    const bps = this.breakpoints.get(file);
    if (!bps) return false;

    for (const bp of bps) {
      if (bp.line === line && bp.enabled) {
        if (!bp.condition) return true;

        // تقييم الشرط (مبسط)
        try {
          // في التطبيق الحقيقي، سنستخدم محرك التقييم
          return true;
        } catch {
          return false;
        }
      }
    }

    return false;
  }

  /**
   * دفع إطار للمكدس
   */
  pushFrame(functionName: string, file: string, line: number, variables?: Map<string, any>): void {
    this.callStack.push(new StackFrame(functionName, file, line, variables));
  }

  /**
   * سحب إطار من المكدس
   */
  popFrame(): StackFrame | undefined {
    return this.callStack.pop();
  }

  /**
   * الحصول على المكدس
   */
  getCallStack(): StackFrame[] {
    return [...this.callStack];
  }

  /**
   * طباعة المكدس
   */
  printCallStack(): void {
    console.log('Call Stack:');
    for (let i = this.callStack.length - 1; i >= 0; i--) {
      console.log(`  ${i}: ${this.callStack[i].toString()}`);
    }
  }

  /**
   * الحصول على الإحصائيات
   */
  getStatistics() {
    return {
      totalBreakpoints: Array.from(this.breakpoints.values()).reduce((sum, bps) => sum + bps.length, 0),
      enabledBreakpoints: Array.from(this.breakpoints.values())
        .reduce((sum, bps) => sum + bps.filter(bp => bp.enabled).length, 0),
      callStackDepth: this.callStack.length
    };
  }
}

/**
 * قياس الأداء (Profiler)
 */
export class Profiler {
  private measurements: Map<string, number[]> = new Map();
  private activeTimers: Map<string, number> = new Map();
  private callCounts: Map<string, number> = new Map();

  /**
   * بدء القياس
   */
  start(name: string): void {
    this.activeTimers.set(name, Date.now());
    this.callCounts.set(name, (this.callCounts.get(name) || 0) + 1);
  }

  /**
   * إنهاء القياس
   */
  end(name: string): number | undefined {
    const startTime = this.activeTimers.get(name);
    if (!startTime) return undefined;

    const duration = Date.now() - startTime;
    this.activeTimers.delete(name);

    if (!this.measurements.has(name)) {
      this.measurements.set(name, []);
    }

    this.measurements.get(name)!.push(duration);
    return duration;
  }

  /**
   * قياس دالة
   */
  measure<T>(name: string, fn: () => T): T {
    this.start(name);
    try {
      return fn();
    } finally {
      this.end(name);
    }
  }

  /**
   * قياس دالة غير متزامنة
   */
  async measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    this.start(name);
    try {
      return await fn();
    } finally {
      this.end(name);
    }
  }

  /**
   * الحصول على الإحصائيات
   */
  getStatistics(name: string) {
    const measurements = this.measurements.get(name);
    if (!measurements || measurements.length === 0) return null;

    const sorted = [...measurements].sort((a, b) => a - b);
    const sum = measurements.reduce((a, b) => a + b, 0);

    return {
      count: measurements.length,
      calls: this.callCounts.get(name) || 0,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      average: sum / measurements.length,
      median: sorted[Math.floor(sorted.length / 2)],
      total: sum
    };
  }

  /**
   * طباعة التقرير
   */
  printReport(): void {
    console.log('\n=== Profiler Report ===\n');

    const names = Array.from(this.measurements.keys()).sort();
    
    for (const name of names) {
      const stats = this.getStatistics(name);
      if (!stats) continue;

      console.log(`${name}:`);
      console.log(`  Calls: ${stats.calls}`);
      console.log(`  Min: ${stats.min.toFixed(2)}ms`);
      console.log(`  Max: ${stats.max.toFixed(2)}ms`);
      console.log(`  Avg: ${stats.average.toFixed(2)}ms`);
      console.log(`  Median: ${stats.median.toFixed(2)}ms`);
      console.log(`  Total: ${stats.total.toFixed(2)}ms`);
      console.log();
    }
  }

  /**
   * مسح القياسات
   */
  clear(): void {
    this.measurements.clear();
    this.activeTimers.clear();
    this.callCounts.clear();
  }
}

/**
 * منسق الكود (Code Formatter)
 */
export class CodeFormatter {
  private indentSize: number = 2;
  private indentChar: string = ' ';

  constructor(indentSize: number = 2, indentChar: string = ' ') {
    this.indentSize = indentSize;
    this.indentChar = indentChar;
  }

  /**
   * تنسيق الكود
   */
  format(code: string): string {
    const lines = code.split('\n');
    const formatted: string[] = [];
    let indentLevel = 0;

    for (let line of lines) {
      line = line.trim();
      
      if (line === '') {
        formatted.push('');
        continue;
      }

      // تقليل المسافة البادئة للأقواس المغلقة
      if (line.startsWith('}') || line.startsWith(']') || line.startsWith(')')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      // إضافة المسافة البادئة
      const indent = this.indentChar.repeat(indentLevel * this.indentSize);
      formatted.push(indent + line);

      // زيادة المسافة البادئة للأقواس المفتوحة
      if (line.endsWith('{') || line.endsWith('[') || line.endsWith('(')) {
        indentLevel++;
      }

      // تقليل المسافة البادئة إذا كان السطر يحتوي على قوس مغلق
      if ((line.startsWith('}') || line.startsWith(']') || line.startsWith(')')) && 
          (line.endsWith('{') || line.endsWith('[') || line.endsWith('('))) {
        // لا تغيير
      }
    }

    return formatted.join('\n');
  }

  /**
   * تنسيق ملف
   */
  formatFile(_filePath: string, code: string): string {
    return this.format(code);
  }
}

/**
 * REPL تفاعلي
 */
export class REPL {
  private context: Map<string, any> = new Map();
  private history: string[] = [];

  /**
   * تقييم كود
   */
  eval(code: string): any {
    try {
      // حفظ في السجل
      this.history.push(code);

      // تنفيذ مباشر (مبسط)
      // في التطبيق الحقيقي، سنستخدم Lexer, Parser, Compiler
      const result = eval(code);

      return result;

    } catch (error) {
      throw error;
    }
  }

  /**
   * طباعة النتيجة
   */
  print(value: any): void {
    if (value === undefined) {
      console.log('undefined');
    } else if (value === null) {
      console.log('null');
    } else if (typeof value === 'object') {
      console.log(JSON.stringify(value, null, 2));
    } else {
      console.log(value);
    }
  }

  /**
   * الحصول على السجل
   */
  getHistory(): string[] {
    return [...this.history];
  }

  /**
   * مسح السجل
   */
  clearHistory(): void {
    this.history = [];
  }

  /**
   * مسح السياق
   */
  clearContext(): void {
    this.context.clear();
  }
}

/**
 * محرك أدوات التطوير
 */
export class DevToolsEngine {
  public debugger: Debugger;
  public profiler: Profiler;
  public formatter: CodeFormatter;
  public repl: REPL;

  constructor() {
    this.debugger = new Debugger();
    this.profiler = new Profiler();
    this.formatter = new CodeFormatter();
    this.repl = new REPL();
  }

  /**
   * الحصول على الإحصائيات الشاملة
   */
  getOverallStatistics() {
    return {
      debugger: this.debugger.getStatistics(),
      profiler: {
        totalMeasurements: Array.from(this.profiler['measurements'].keys()).length
      },
      repl: {
        historySize: this.repl.getHistory().length
      }
    };
  }
}

