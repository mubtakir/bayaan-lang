/**
 * نظام الأهداف والتخطيط - Goals and Planning System
 *
 * يوفر تحديد الأهداف والتخطيط التلقائي لتحقيقها
 */
/**
 * حالة الهدف - Goal State
 */
export declare enum GoalState {
    PENDING = "pending",// معلق
    IN_PROGRESS = "in_progress",// قيد التنفيذ
    ACHIEVED = "achieved",// محقق
    FAILED = "failed",// فشل
    CANCELLED = "cancelled"
}
/**
 * أولوية الهدف - Goal Priority
 */
export declare enum GoalPriority {
    LOW = "low",// منخفضة
    MEDIUM = "medium",// متوسطة
    HIGH = "high",// عالية
    CRITICAL = "critical"
}
/**
 * نوع الهدف - Goal Type
 */
export declare enum GoalType {
    ACHIEVEMENT = "achievement",// إنجاز
    MAINTENANCE = "maintenance",// صيانة
    AVOIDANCE = "avoidance"
}
/**
 * شرط - Condition
 */
export declare class Condition {
    property: string;
    operator: string;
    value: any;
    constructor(property: string, operator: string, // ==, !=, >, <, >=, <=
    value: any);
    /**
     * التحقق من الشرط
     */
    check(actualValue: any): boolean;
    toString(): string;
}
/**
 * هدف - Goal
 */
export declare class Goal {
    name: string;
    description: string;
    type: GoalType;
    priority: GoalPriority;
    conditions: Condition[];
    deadline?: number | undefined;
    state: GoalState;
    progress: number;
    subgoals: Goal[];
    createdAt: number;
    startedAt?: number;
    completedAt?: number;
    constructor(name: string, description: string, type: GoalType, priority: GoalPriority, conditions?: Condition[], deadline?: number | undefined);
    /**
     * إضافة هدف فرعي
     */
    addSubgoal(subgoal: Goal): void;
    /**
     * التحقق من تحقق الهدف
     */
    isAchieved(context: Map<string, any>): boolean;
    /**
     * تحديث التقدم
     */
    updateProgress(): void;
    /**
     * بدء الهدف
     */
    start(): void;
    /**
     * تحقيق الهدف
     */
    achieve(): void;
    /**
     * فشل الهدف
     */
    fail(): void;
    /**
     * إلغاء الهدف
     */
    cancel(): void;
    /**
     * التحقق من انتهاء الموعد النهائي
     */
    isOverdue(): boolean;
    toString(): string;
}
/**
 * إجراء - Action
 */
export declare class Action {
    name: string;
    description: string;
    preconditions: Condition[];
    effects: Map<string, any>;
    cost: number;
    constructor(name: string, description: string, preconditions?: Condition[], effects?: Map<string, any>, cost?: number);
    /**
     * التحقق من إمكانية تنفيذ الإجراء
     */
    canExecute(context: Map<string, any>): boolean;
    /**
     * تنفيذ الإجراء
     */
    execute(context: Map<string, any>): void;
    toString(): string;
}
/**
 * خطة - Plan
 */
export declare class Plan {
    goal: Goal;
    actions: Action[];
    totalCost: number;
    constructor(goal: Goal, actions?: Action[], totalCost?: number);
    /**
     * إضافة إجراء
     */
    addAction(action: Action): void;
    toString(): string;
}
/**
 * محرك الأهداف - Goal Engine
 */
export declare class GoalEngine {
    private goals;
    private actions;
    private context;
    /**
     * إضافة هدف
     */
    addGoal(goal: Goal): void;
    /**
     * الحصول على هدف
     */
    getGoal(name: string): Goal | undefined;
    /**
     * إضافة إجراء
     */
    addAction(action: Action): void;
    /**
     * تحديث السياق
     */
    updateContext(property: string, value: any): void;
    /**
     * الحصول على السياق
     */
    getContext(): Map<string, any>;
    /**
     * التحقق من الأهداف
     */
    checkGoals(): Goal[];
    /**
     * الحصول على الأهداف حسب الحالة
     */
    getGoalsByState(state: GoalState): Goal[];
    /**
     * الحصول على الأهداف حسب الأولوية
     */
    getGoalsByPriority(priority: GoalPriority): Goal[];
    /**
     * الحصول على الأهداف المتأخرة
     */
    getOverdueGoals(): Goal[];
    /**
     * التخطيط لتحقيق هدف (بسيط)
     */
    planForGoal(goalName: string): Plan | null;
    /**
     * إحصائيات
     */
    getStatistics(): {
        totalGoals: number;
        pending: number;
        inProgress: number;
        achieved: number;
        failed: number;
        overdue: number;
    };
}
