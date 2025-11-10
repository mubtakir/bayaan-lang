/**
 * نظام الأهداف والتخطيط - Goals and Planning System
 * 
 * يوفر تحديد الأهداف والتخطيط التلقائي لتحقيقها
 */

/**
 * حالة الهدف - Goal State
 */
export enum GoalState {
  PENDING = 'pending',       // معلق
  IN_PROGRESS = 'in_progress', // قيد التنفيذ
  ACHIEVED = 'achieved',     // محقق
  FAILED = 'failed',         // فشل
  CANCELLED = 'cancelled'    // ملغى
}

/**
 * أولوية الهدف - Goal Priority
 */
export enum GoalPriority {
  LOW = 'low',           // منخفضة
  MEDIUM = 'medium',     // متوسطة
  HIGH = 'high',         // عالية
  CRITICAL = 'critical'  // حرجة
}

/**
 * نوع الهدف - Goal Type
 */
export enum GoalType {
  ACHIEVEMENT = 'achievement', // إنجاز
  MAINTENANCE = 'maintenance', // صيانة
  AVOIDANCE = 'avoidance'     // تجنب
}

/**
 * شرط - Condition
 */
export class Condition {
  constructor(
    public property: string,
    public operator: string, // ==, !=, >, <, >=, <=
    public value: any
  ) {}

  /**
   * التحقق من الشرط
   */
  check(actualValue: any): boolean {
    switch (this.operator) {
      case '==': return actualValue === this.value;
      case '!=': return actualValue !== this.value;
      case '>': return actualValue > this.value;
      case '<': return actualValue < this.value;
      case '>=': return actualValue >= this.value;
      case '<=': return actualValue <= this.value;
      default: return false;
    }
  }

  toString(): string {
    return `${this.property} ${this.operator} ${this.value}`;
  }
}

/**
 * هدف - Goal
 */
export class Goal {
  public state: GoalState = GoalState.PENDING;
  public progress: number = 0; // 0-100
  public subgoals: Goal[] = [];
  public createdAt: number = Date.now();
  public startedAt?: number;
  public completedAt?: number;

  constructor(
    public name: string,
    public description: string,
    public type: GoalType,
    public priority: GoalPriority,
    public conditions: Condition[] = [],
    public deadline?: number
  ) {}

  /**
   * إضافة هدف فرعي
   */
  addSubgoal(subgoal: Goal): void {
    this.subgoals.push(subgoal);
  }

  /**
   * التحقق من تحقق الهدف
   */
  isAchieved(context: Map<string, any>): boolean {
    if (this.conditions.length === 0) return false;

    for (const condition of this.conditions) {
      const actualValue = context.get(condition.property);
      if (!condition.check(actualValue)) {
        return false;
      }
    }
    return true;
  }

  /**
   * تحديث التقدم
   */
  updateProgress(): void {
    if (this.subgoals.length === 0) return;

    const achievedSubgoals = this.subgoals.filter(
      g => g.state === GoalState.ACHIEVED
    ).length;
    this.progress = (achievedSubgoals / this.subgoals.length) * 100;
  }

  /**
   * بدء الهدف
   */
  start(): void {
    this.state = GoalState.IN_PROGRESS;
    this.startedAt = Date.now();
  }

  /**
   * تحقيق الهدف
   */
  achieve(): void {
    this.state = GoalState.ACHIEVED;
    this.progress = 100;
    this.completedAt = Date.now();
  }

  /**
   * فشل الهدف
   */
  fail(): void {
    this.state = GoalState.FAILED;
    this.completedAt = Date.now();
  }

  /**
   * إلغاء الهدف
   */
  cancel(): void {
    this.state = GoalState.CANCELLED;
    this.completedAt = Date.now();
  }

  /**
   * التحقق من انتهاء الموعد النهائي
   */
  isOverdue(): boolean {
    if (!this.deadline) return false;
    return Date.now() > this.deadline;
  }

  toString(): string {
    const priorityEmoji = {
      [GoalPriority.LOW]: '🔵',
      [GoalPriority.MEDIUM]: '🟡',
      [GoalPriority.HIGH]: '🟠',
      [GoalPriority.CRITICAL]: '🔴'
    };

    return `${priorityEmoji[this.priority]} ${this.name} [${this.state}, ${this.progress.toFixed(0)}%]`;
  }
}

/**
 * إجراء - Action
 */
export class Action {
  constructor(
    public name: string,
    public description: string,
    public preconditions: Condition[] = [],
    public effects: Map<string, any> = new Map(),
    public cost: number = 1
  ) {}

  /**
   * التحقق من إمكانية تنفيذ الإجراء
   */
  canExecute(context: Map<string, any>): boolean {
    for (const condition of this.preconditions) {
      const actualValue = context.get(condition.property);
      if (!condition.check(actualValue)) {
        return false;
      }
    }
    return true;
  }

  /**
   * تنفيذ الإجراء
   */
  execute(context: Map<string, any>): void {
    for (const [property, value] of this.effects) {
      context.set(property, value);
    }
  }

  toString(): string {
    return `${this.name} (تكلفة: ${this.cost})`;
  }
}

/**
 * خطة - Plan
 */
export class Plan {
  constructor(
    public goal: Goal,
    public actions: Action[] = [],
    public totalCost: number = 0
  ) {
    this.totalCost = actions.reduce((sum, a) => sum + a.cost, 0);
  }

  /**
   * إضافة إجراء
   */
  addAction(action: Action): void {
    this.actions.push(action);
    this.totalCost += action.cost;
  }

  toString(): string {
    const actionsStr = this.actions.map(a => a.name).join(' → ');
    return `خطة لـ "${this.goal.name}": ${actionsStr} (تكلفة: ${this.totalCost})`;
  }
}

/**
 * محرك الأهداف - Goal Engine
 */
export class GoalEngine {
  private goals: Map<string, Goal> = new Map();
  private actions: Map<string, Action> = new Map();
  private context: Map<string, any> = new Map();

  /**
   * إضافة هدف
   */
  addGoal(goal: Goal): void {
    this.goals.set(goal.name, goal);
  }

  /**
   * الحصول على هدف
   */
  getGoal(name: string): Goal | undefined {
    return this.goals.get(name);
  }

  /**
   * إضافة إجراء
   */
  addAction(action: Action): void {
    this.actions.set(action.name, action);
  }

  /**
   * تحديث السياق
   */
  updateContext(property: string, value: any): void {
    this.context.set(property, value);
  }

  /**
   * الحصول على السياق
   */
  getContext(): Map<string, any> {
    return new Map(this.context);
  }

  /**
   * التحقق من الأهداف
   */
  checkGoals(): Goal[] {
    const achievedGoals: Goal[] = [];

    for (const goal of this.goals.values()) {
      if (goal.state === GoalState.IN_PROGRESS || goal.state === GoalState.PENDING) {
        if (goal.isAchieved(this.context)) {
          goal.achieve();
          achievedGoals.push(goal);
        }
      }
    }

    return achievedGoals;
  }

  /**
   * الحصول على الأهداف حسب الحالة
   */
  getGoalsByState(state: GoalState): Goal[] {
    return Array.from(this.goals.values()).filter(g => g.state === state);
  }

  /**
   * الحصول على الأهداف حسب الأولوية
   */
  getGoalsByPriority(priority: GoalPriority): Goal[] {
    return Array.from(this.goals.values()).filter(g => g.priority === priority);
  }

  /**
   * الحصول على الأهداف المتأخرة
   */
  getOverdueGoals(): Goal[] {
    return Array.from(this.goals.values()).filter(g => g.isOverdue());
  }

  /**
   * التخطيط لتحقيق هدف (بسيط)
   */
  planForGoal(goalName: string): Plan | null {
    const goal = this.goals.get(goalName);
    if (!goal) return null;

    const plan = new Plan(goal);
    const currentContext = new Map(this.context);

    // محاولة إيجاد سلسلة من الإجراءات
    const maxSteps = 10;
    let steps = 0;

    while (!goal.isAchieved(currentContext) && steps < maxSteps) {
      // البحث عن إجراء قابل للتنفيذ
      let foundAction = false;

      for (const action of this.actions.values()) {
        if (action.canExecute(currentContext)) {
          plan.addAction(action);
          action.execute(currentContext);
          foundAction = true;
          break;
        }
      }

      if (!foundAction) break;
      steps++;
    }

    return goal.isAchieved(currentContext) ? plan : null;
  }

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
  } {
    const goals = Array.from(this.goals.values());
    return {
      totalGoals: goals.length,
      pending: goals.filter(g => g.state === GoalState.PENDING).length,
      inProgress: goals.filter(g => g.state === GoalState.IN_PROGRESS).length,
      achieved: goals.filter(g => g.state === GoalState.ACHIEVED).length,
      failed: goals.filter(g => g.state === GoalState.FAILED).length,
      overdue: goals.filter(g => g.isOverdue()).length
    };
  }
}

