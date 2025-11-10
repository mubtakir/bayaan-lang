/**
 * محرك الأشياء والحالات والخصائص
 * Thing, State, and Property Engine
 * 
 * نظام شامل لتمثيل الأشياء بحالاتها وخصائصها
 * Comprehensive system for representing things with their states and properties
 */

/**
 * نوع الخاصية - Property Type
 */
export enum PropertyType {
  PHYSICAL = 'فيزيائية',           // Physical property
  CHEMICAL = 'كيميائية',           // Chemical property
  PSYCHOLOGICAL = 'نفسية',         // Psychological property
  LITERARY = 'أدبية',              // Literary property
  BIOLOGICAL = 'بيولوجية',         // Biological property
  MATHEMATICAL = 'رياضية',         // Mathematical property
  GEOMETRIC = 'هندسية',            // Geometric property
  TEMPORAL = 'زمنية',              // Temporal property
  SPATIAL = 'مكانية',              // Spatial property
  SOCIAL = 'اجتماعية',             // Social property
  ECONOMIC = 'اقتصادية',           // Economic property
  CULTURAL = 'ثقافية'              // Cultural property
}

/**
 * نوع الحالة - State Type
 */
export enum StateType {
  ACTIVE = 'نشط',                  // Active state
  PASSIVE = 'خامل',                // Passive state
  TRANSITIONAL = 'انتقالي',        // Transitional state
  STABLE = 'مستقر',                // Stable state
  UNSTABLE = 'غير_مستقر',          // Unstable state
  TEMPORARY = 'مؤقت',              // Temporary state
  PERMANENT = 'دائم'               // Permanent state
}

/**
 * خاصية الشيء - Thing Property
 */
export class ThingProperty {
  constructor(
    public name: string,                    // اسم الخاصية - Property name
    public value: any,                      // قيمة الخاصية - Property value
    public type: PropertyType,              // نوع الخاصية - Property type
    public unit?: string,                   // الوحدة - Unit (e.g., "kg", "°C", "m")
    public min?: number,                    // القيمة الدنيا - Minimum value
    public max?: number,                    // القيمة القصوى - Maximum value
    public mutable: boolean = true          // قابلة للتغيير - Mutable
  ) {}

  /**
   * تحديث قيمة الخاصية
   * Update property value
   */
  setValue(newValue: any): boolean {
    if (!this.mutable) {
      return false; // Cannot change immutable property
    }

    // Check bounds if numeric
    if (typeof newValue === 'number') {
      if (this.min !== undefined && newValue < this.min) {
        return false;
      }
      if (this.max !== undefined && newValue > this.max) {
        return false;
      }
    }

    this.value = newValue;
    return true;
  }

  /**
   * التحقق من تجاوز حد معين
   * Check if exceeds a threshold
   */
  exceeds(threshold: number): boolean {
    if (typeof this.value !== 'number') {
      return false;
    }
    return this.value > threshold;
  }

  /**
   * التحقق من أقل من حد معين
   * Check if below a threshold
   */
  below(threshold: number): boolean {
    if (typeof this.value !== 'number') {
      return false;
    }
    return this.value < threshold;
  }

  toString(): string {
    let result = `${this.name}: ${this.value}`;
    if (this.unit) {
      result += ` ${this.unit}`;
    }
    result += ` (${this.type})`;
    return result;
  }
}

/**
 * حالة الشيء - Thing State
 */
export class ThingState {
  constructor(
    public name: string,                    // اسم الحالة - State name
    public type: StateType,                 // نوع الحالة - State type
    public active: boolean = false,         // نشطة - Active
    public duration?: number,               // المدة (بالثواني) - Duration in seconds
    public conditions: Map<string, any> = new Map()  // شروط الحالة - State conditions
  ) {}

  /**
   * تفعيل الحالة
   * Activate state
   */
  activate(): void {
    this.active = true;
  }

  /**
   * إلغاء تفعيل الحالة
   * Deactivate state
   */
  deactivate(): void {
    this.active = false;
  }

  /**
   * التحقق من شرط
   * Check condition
   */
  checkCondition(key: string, value: any): boolean {
    return this.conditions.get(key) === value;
  }

  toString(): string {
    return `${this.name} (${this.type}) - ${this.active ? 'نشط' : 'غير نشط'}`;
  }
}

/**
 * الشيء - Thing
 */
export class Thing {
  private properties: Map<string, ThingProperty> = new Map();
  private states: Map<string, ThingState> = new Map();
  private shape?: string;  // معادلة الشكل - Shape equation

  constructor(
    public name: string,                    // اسم الشيء - Thing name
    public category: string                 // فئة الشيء - Thing category
  ) {}

  /**
   * إضافة خاصية
   * Add property
   */
  addProperty(property: ThingProperty): void {
    this.properties.set(property.name, property);
  }

  /**
   * الحصول على خاصية
   * Get property
   */
  getProperty(name: string): ThingProperty | undefined {
    return this.properties.get(name);
  }

  /**
   * تحديث خاصية
   * Update property
   */
  updateProperty(name: string, value: any): boolean {
    const property = this.properties.get(name);
    if (!property) {
      return false;
    }
    return property.setValue(value);
  }

  /**
   * إضافة حالة
   * Add state
   */
  addState(state: ThingState): void {
    this.states.set(state.name, state);
  }

  /**
   * الحصول على حالة
   * Get state
   */
  getState(name: string): ThingState | undefined {
    return this.states.get(name);
  }

  /**
   * تفعيل حالة
   * Activate state
   */
  activateState(name: string): boolean {
    const state = this.states.get(name);
    if (!state) {
      return false;
    }
    state.activate();
    return true;
  }

  /**
   * إلغاء تفعيل حالة
   * Deactivate state
   */
  deactivateState(name: string): boolean {
    const state = this.states.get(name);
    if (!state) {
      return false;
    }
    state.deactivate();
    return true;
  }

  /**
   * الحصول على جميع الحالات النشطة
   * Get all active states
   */
  getActiveStates(): ThingState[] {
    return Array.from(this.states.values()).filter(s => s.active);
  }

  /**
   * تعيين معادلة الشكل
   * Set shape equation
   */
  setShape(shapeEquation: string): void {
    this.shape = shapeEquation;
  }

  /**
   * الحصول على معادلة الشكل
   * Get shape equation
   */
  getShape(): string | undefined {
    return this.shape;
  }

  /**
   * الحصول على جميع الخصائص
   * Get all properties
   */
  getAllProperties(): ThingProperty[] {
    return Array.from(this.properties.values());
  }

  /**
   * الحصول على جميع الحالات
   * Get all states
   */
  getAllStates(): ThingState[] {
    return Array.from(this.states.values());
  }

  /**
   * نسخ الشيء
   * Clone thing
   */
  clone(): Thing {
    const cloned = new Thing(this.name, this.category);
    
    // Copy properties
    for (const prop of this.properties.values()) {
      cloned.addProperty(new ThingProperty(
        prop.name,
        prop.value,
        prop.type,
        prop.unit,
        prop.min,
        prop.max,
        prop.mutable
      ));
    }

    // Copy states
    for (const state of this.states.values()) {
      cloned.addState(new ThingState(
        state.name,
        state.type,
        state.active,
        state.duration,
        new Map(state.conditions)
      ));
    }

    if (this.shape) {
      cloned.setShape(this.shape);
    }

    return cloned;
  }

  toString(): string {
    let result = `\n=== ${this.name} (${this.category}) ===\n`;
    
    result += `\nالخصائص (Properties):\n`;
    for (const prop of this.properties.values()) {
      result += `  ${prop.toString()}\n`;
    }

    result += `\nالحالات (States):\n`;
    for (const state of this.states.values()) {
      result += `  ${state.toString()}\n`;
    }

    if (this.shape) {
      result += `\nالشكل (Shape): ${this.shape}\n`;
    }

    return result;
  }
}

/**
 * محرك الأشياء - Thing Engine
 */
export class ThingEngine {
  private things: Map<string, Thing> = new Map();

  /**
   * إضافة شيء
   * Add thing
   */
  addThing(thing: Thing): void {
    this.things.set(thing.name, thing);
  }

  /**
   * الحصول على شيء
   * Get thing
   */
  getThing(name: string): Thing | undefined {
    return this.things.get(name);
  }

  /**
   * حذف شيء
   * Remove thing
   */
  removeThing(name: string): boolean {
    return this.things.delete(name);
  }

  /**
   * الحصول على جميع الأشياء
   * Get all things
   */
  getAllThings(): Thing[] {
    return Array.from(this.things.values());
  }

  /**
   * البحث عن أشياء حسب الفئة
   * Find things by category
   */
  findByCategory(category: string): Thing[] {
    return this.getAllThings().filter(t => t.category === category);
  }

  /**
   * البحث عن أشياء حسب خاصية
   * Find things by property
   */
  findByProperty(propertyName: string, value: any): Thing[] {
    return this.getAllThings().filter(t => {
      const prop = t.getProperty(propertyName);
      return prop && prop.value === value;
    });
  }

  /**
   * البحث عن أشياء حسب حالة نشطة
   * Find things by active state
   */
  findByActiveState(stateName: string): Thing[] {
    return this.getAllThings().filter(t => {
      const state = t.getState(stateName);
      return state && state.active;
    });
  }
}

