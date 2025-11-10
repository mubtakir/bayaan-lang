/**
 * محرك الأحداث والأفعال
 * Event and Action Engine
 * 
 * نظام لتمثيل الأحداث والأفعال والتفاعلات بين الأشياء
 * System for representing events, actions, and interactions between things
 */



/**
 * نوع الحدث - Event Type
 */
export enum EventType {
  ACTION = 'فعل',                  // Action event
  REACTION = 'رد_فعل',             // Reaction event
  INTERACTION = 'تفاعل',           // Interaction event
  TRANSFORMATION = 'تحول',         // Transformation event
  CREATION = 'إنشاء',              // Creation event
  DESTRUCTION = 'تدمير',           // Destruction event
  TRANSFER = 'نقل',                // Transfer event
  CHANGE = 'تغيير'                 // Change event
}

/**
 * نتيجة الحدث - Event Result
 */
export class EventResult {
  constructor(
    public thing: string,                   // الشيء المتأثر - Affected thing
    public propertyChanges: Map<string, any> = new Map(),  // تغييرات الخصائص
    public stateChanges: Map<string, boolean> = new Map(), // تغييرات الحالات
    public description: string = ''         // وصف النتيجة - Result description
  ) {}

  toString(): string {
    let result = `${this.thing}:\n`;
    
    if (this.propertyChanges.size > 0) {
      result += `  تغييرات الخصائص:\n`;
      for (const [prop, value] of this.propertyChanges.entries()) {
        result += `    ${prop} → ${value}\n`;
      }
    }

    if (this.stateChanges.size > 0) {
      result += `  تغييرات الحالات:\n`;
      for (const [state, active] of this.stateChanges.entries()) {
        result += `    ${state} → ${active ? 'نشط' : 'غير نشط'}\n`;
      }
    }

    if (this.description) {
      result += `  ${this.description}\n`;
    }

    return result;
  }
}

/**
 * الحدث - Event
 */
export class Event {
  private results: EventResult[] = [];
  private conditions: Map<string, any> = new Map();

  constructor(
    public name: string,                    // اسم الحدث - Event name
    public type: EventType,                 // نوع الحدث - Event type
    public subject?: string,                // الفاعل - Subject (who does the action)
    public object?: string,                 // المفعول به - Object (what receives the action)
    public timestamp: number = Date.now()   // الوقت - Timestamp
  ) {}

  /**
   * إضافة شرط للحدث
   * Add condition to event
   */
  addCondition(key: string, value: any): void {
    this.conditions.set(key, value);
  }

  /**
   * التحقق من شرط
   * Check condition
   */
  checkCondition(key: string, value: any): boolean {
    return this.conditions.get(key) === value;
  }

  /**
   * الحصول على جميع الشروط
   * Get all conditions
   */
  getConditions(): Map<string, any> {
    return this.conditions;
  }

  /**
   * إضافة نتيجة
   * Add result
   */
  addResult(result: EventResult): void {
    this.results.push(result);
  }

  /**
   * الحصول على جميع النتائج
   * Get all results
   */
  getResults(): EventResult[] {
    return this.results;
  }

  /**
   * الحصول على نتائج شيء معين
   * Get results for specific thing
   */
  getResultsForThing(thingName: string): EventResult[] {
    return this.results.filter(r => r.thing === thingName);
  }

  toString(): string {
    let result = `\n=== ${this.name} (${this.type}) ===\n`;
    
    if (this.subject) {
      result += `الفاعل: ${this.subject}\n`;
    }
    if (this.object) {
      result += `المفعول به: ${this.object}\n`;
    }

    if (this.conditions.size > 0) {
      result += `\nالشروط:\n`;
      for (const [key, value] of this.conditions.entries()) {
        result += `  ${key}: ${value}\n`;
      }
    }

    if (this.results.length > 0) {
      result += `\nالنتائج:\n`;
      for (const res of this.results) {
        result += res.toString();
      }
    }

    return result;
  }
}

/**
 * قاعدة الحدث - Event Rule
 * 
 * تمثل قاعدة: إذا حدث X في ظروف Y، فإن النتيجة Z
 * Represents: If event X happens under conditions Y, then result Z
 */
export class EventRule {
  constructor(
    public name: string,                    // اسم القاعدة - Rule name
    public eventPattern: string,            // نمط الحدث - Event pattern
    public conditions: Map<string, any> = new Map(),  // الشروط
    public results: EventResult[] = []      // النتائج المتوقعة
  ) {}

  /**
   * التحقق من تطابق الحدث مع القاعدة
   * Check if event matches rule
   */
  matches(event: Event): boolean {
    // Check if event name matches pattern
    if (!event.name.includes(this.eventPattern)) {
      return false;
    }

    // Check all conditions
    for (const [key, value] of this.conditions.entries()) {
      const eventCondition = event.getConditions().get(key);

      // Handle object-based comparisons (e.g., {operator: '>', value: 233})
      if (typeof value === 'object' && value !== null && 'operator' in value) {
        const actualValue = eventCondition;
        const expectedValue = value.value;

        switch (value.operator) {
          case '>':
            if (!(actualValue > expectedValue)) return false;
            break;
          case '<':
            if (!(actualValue < expectedValue)) return false;
            break;
          case '>=':
            if (!(actualValue >= expectedValue)) return false;
            break;
          case '<=':
            if (!(actualValue <= expectedValue)) return false;
            break;
          case '==':
            if (actualValue !== expectedValue) return false;
            break;
          case '!=':
            if (actualValue === expectedValue) return false;
            break;
          default:
            return false;
        }
      } else {
        // Direct equality check
        if (eventCondition !== value) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * تطبيق القاعدة على حدث
   * Apply rule to event
   */
  apply(event: Event): void {
    if (this.matches(event)) {
      for (const result of this.results) {
        event.addResult(result);
      }
    }
  }

  toString(): string {
    let result = `\n=== قاعدة: ${this.name} ===\n`;
    result += `نمط الحدث: ${this.eventPattern}\n`;
    
    if (this.conditions.size > 0) {
      result += `الشروط:\n`;
      for (const [key, value] of this.conditions.entries()) {
        result += `  ${key}: ${value}\n`;
      }
    }

    if (this.results.length > 0) {
      result += `النتائج المتوقعة:\n`;
      for (const res of this.results) {
        result += `  ${res.toString()}`;
      }
    }

    return result;
  }
}

/**
 * محرك الأحداث - Event Engine
 */
export class EventEngine {
  private events: Event[] = [];
  private rules: Map<string, EventRule> = new Map();

  /**
   * إضافة حدث
   * Add event
   */
  addEvent(event: Event): void {
    // Apply all matching rules
    for (const rule of this.rules.values()) {
      rule.apply(event);
    }

    this.events.push(event);
  }

  /**
   * إضافة قاعدة
   * Add rule
   */
  addRule(rule: EventRule): void {
    this.rules.set(rule.name, rule);
  }

  /**
   * الحصول على قاعدة
   * Get rule
   */
  getRule(name: string): EventRule | undefined {
    return this.rules.get(name);
  }

  /**
   * الحصول على جميع الأحداث
   * Get all events
   */
  getAllEvents(): Event[] {
    return this.events;
  }

  /**
   * الحصول على أحداث حسب النوع
   * Get events by type
   */
  getEventsByType(type: EventType): Event[] {
    return this.events.filter(e => e.type === type);
  }

  /**
   * الحصول على أحداث حسب الفاعل
   * Get events by subject
   */
  getEventsBySubject(subject: string): Event[] {
    return this.events.filter(e => e.subject === subject);
  }

  /**
   * الحصول على أحداث حسب المفعول به
   * Get events by object
   */
  getEventsByObject(object: string): Event[] {
    return this.events.filter(e => e.object === object);
  }

  /**
   * الحصول على أحداث في فترة زمنية
   * Get events in time range
   */
  getEventsInTimeRange(start: number, end: number): Event[] {
    return this.events.filter(e => e.timestamp >= start && e.timestamp <= end);
  }

  /**
   * محاكاة حدث
   * Simulate event
   * 
   * ينشئ حدثاً ويطبق القواعد عليه دون إضافته للسجل
   * Creates an event and applies rules without adding to history
   */
  simulateEvent(event: Event): Event {
    const simulated = new Event(
      event.name,
      event.type,
      event.subject,
      event.object,
      event.timestamp
    );

    // Copy conditions
    for (const [key, value] of event.getConditions().entries()) {
      simulated.addCondition(key, value);
    }

    // Apply rules
    for (const rule of this.rules.values()) {
      rule.apply(simulated);
    }

    return simulated;
  }

  /**
   * مسح السجل
   * Clear history
   */
  clearHistory(): void {
    this.events = [];
  }

  /**
   * الحصول على عدد الأحداث
   * Get event count
   */
  getEventCount(): number {
    return this.events.length;
  }
}

