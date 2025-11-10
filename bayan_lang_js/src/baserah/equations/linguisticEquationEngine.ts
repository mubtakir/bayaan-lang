/**
 * Linguistic Equation Engine - محرك المعادلات اللغوية
 * 
 * This engine processes linguistic equations and manages causal relationships
 * between entities with support for custom operators and result cancellation.
 * 
 * هذا المحرك يعالج المعادلات اللغوية ويدير العلاقات السببية
 * بين الكيانات مع دعم المشغلات المخصصة وتعطيل النتائج.
 */

import {
  LinguisticEntity,
  LinguisticEquation,
  LinguisticRole,
  EquationOperator,
  OperatorType,
  Effect,
  EffectType,
  Condition,
  ConditionType,
  EquationContext,
  EquationEvent,
  ResultCancellation,
  CustomOperatorDefinition,
  EntityState,
  Relation,
} from './linguisticEquationTypes';

/**
 * Linguistic Equation Engine - محرك المعادلات اللغوية
 */
export class LinguisticEquationEngine {
  private context: EquationContext;
  private customOperators: Map<string, EquationOperator>;
  private cancellations: Map<string, ResultCancellation>;
  
  constructor() {
    this.context = {
      entities: new Map(),
      equations: new Map(),
      history: [],
      timestamp: Date.now(),
      metadata: new Map(),
    };
    this.customOperators = new Map();
    this.cancellations = new Map();
    
    // Initialize built-in operators
    this.initializeBuiltInOperators();
  }
  
  /**
   * Initialize built-in operators - تهيئة المشغلات المدمجة
   */
  private initializeBuiltInOperators(): void {
    // Causal Operators - المشغلات السببية
    this.registerOperator({
      symbol: '→',
      name: 'يسبب',
      type: OperatorType.CAUSES,
      apply: (entities) => this.applyCausesOperator(entities),
      precedence: 10,
      associativity: 'left',
    });
    
    this.registerOperator({
      symbol: '⊢',
      name: 'يمكن',
      type: OperatorType.ENABLES,
      apply: (entities) => this.applyEnablesOperator(entities),
      precedence: 9,
      associativity: 'left',
    });
    
    this.registerOperator({
      symbol: '⊣',
      name: 'يمنع',
      type: OperatorType.PREVENTS,
      apply: (entities) => this.applyPreventsOperator(entities),
      precedence: 9,
      associativity: 'left',
    });
    
    this.registerOperator({
      symbol: '⊳',
      name: 'يحفز',
      type: OperatorType.TRIGGERS,
      apply: (entities) => this.applyTriggersOperator(entities),
      precedence: 8,
      associativity: 'left',
    });
    
    this.registerOperator({
      symbol: '⊲',
      name: 'يعطل',
      type: OperatorType.INHIBITS,
      apply: (entities) => this.applyInhibitsOperator(entities),
      precedence: 8,
      associativity: 'left',
    });
    
    // Transformational Operators - المشغلات التحويلية
    this.registerOperator({
      symbol: '⇒',
      name: 'يحول',
      type: OperatorType.TRANSFORMS,
      apply: (entities) => this.applyTransformsOperator(entities),
      precedence: 7,
      associativity: 'left',
    });
    
    this.registerOperator({
      symbol: '↑',
      name: 'يزيد',
      type: OperatorType.INCREASES,
      apply: (entities) => this.applyIncreasesOperator(entities),
      precedence: 6,
      associativity: 'left',
    });
    
    this.registerOperator({
      symbol: '↓',
      name: 'ينقص',
      type: OperatorType.DECREASES,
      apply: (entities) => this.applyDecreasesOperator(entities),
      precedence: 6,
      associativity: 'left',
    });
  }
  
  /**
   * Register a custom operator - تسجيل مشغل مخصص
   */
  registerOperator(operator: EquationOperator): void {
    this.customOperators.set(operator.symbol, operator);
  }
  
  /**
   * Define a custom operator from definition - تعريف مشغل مخصص من التعريف
   */
  defineCustomOperator(definition: CustomOperatorDefinition): void {
    const operator: EquationOperator = {
      symbol: definition.symbol,
      name: definition.name,
      type: OperatorType.CUSTOM,
      apply: (entities) => {
        // Execute the custom implementation
        const func = new Function('entities', 'context', definition.implementation);
        return func(entities, this.context);
      },
      precedence: definition.precedence,
      associativity: definition.associativity,
    };
    
    this.registerOperator(operator);
  }
  
  /**
   * Create an entity - إنشاء كيان
   */
  createEntity(name: string, role: LinguisticRole, attributes: Map<string, any> = new Map()): LinguisticEntity {
    const entity: LinguisticEntity = {
      id: `entity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      role,
      attributes,
      state: {
        properties: new Map(),
        relations: [],
        timestamp: Date.now(),
      },
    };
    
    this.context.entities.set(entity.id, entity);
    return entity;
  }
  
  /**
   * Create an equation - إنشاء معادلة
   */
  createEquation(
    name: string,
    description: string,
    inputs: LinguisticEntity[],
    operators: EquationOperator[],
    conditions: Condition[] = [],
  ): LinguisticEquation {
    const equation: LinguisticEquation = {
      id: `equation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      description,
      inputs,
      outputs: [],
      operators,
      conditions,
      effects: [],
      priority: 10,
      enabled: true,
    };
    
    this.context.equations.set(equation.id, equation);
    return equation;
  }
  
  /**
   * Execute an equation - تنفيذ معادلة
   */
  executeEquation(equation: LinguisticEquation): EquationEvent {
    // Check if equation is enabled
    if (!equation.enabled) {
      throw new Error(`Equation ${equation.name} is disabled`);
    }
    
    // Check conditions
    for (const condition of equation.conditions) {
      if (!condition.evaluate(this.context)) {
        // Condition not met - create cancelled event
        const event: EquationEvent = {
          id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          equationId: equation.id,
          timestamp: Date.now(),
          inputs: equation.inputs,
          outputs: [],
          cancelled: true,
          reason: `Condition not met: ${condition.expression}`,
        };
        
        this.context.history.push(event);
        return event;
      }
    }
    
    // Apply operators
    let currentEntities = [...equation.inputs];
    for (const operator of equation.operators) {
      currentEntities = operator.apply(currentEntities);
    }
    
    equation.outputs = currentEntities;
    
    // Apply effects
    for (const effect of equation.effects) {
      if (!effect.cancelled) {
        const targetEntity = this.context.entities.get(effect.target);
        if (targetEntity) {
          effect.apply(targetEntity);
        }
      }
    }
    
    // Create event
    const event: EquationEvent = {
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      equationId: equation.id,
      timestamp: Date.now(),
      inputs: equation.inputs,
      outputs: equation.outputs,
      cancelled: false,
    };
    
    this.context.history.push(event);
    return event;
  }
  
  /**
   * Cancel an effect - تعطيل تأثير
   */
  cancelEffect(effectId: string, reason: string, condition: Condition): void {
    const cancellation: ResultCancellation = {
      id: `cancellation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      effectId,
      reason,
      condition,
      timestamp: Date.now(),
    };
    
    this.cancellations.set(effectId, cancellation);
    
    // Find and cancel the effect
    for (const equation of this.context.equations.values()) {
      for (const effect of equation.effects) {
        if (effect.id === effectId) {
          effect.cancelled = true;
        }
      }
    }
  }
  
  /**
   * Get context - الحصول على السياق
   */
  getContext(): EquationContext {
    return this.context;
  }
  
  /**
   * Get entity by ID - الحصول على كيان بالمعرف
   */
  getEntity(id: string): LinguisticEntity | undefined {
    return this.context.entities.get(id);
  }
  
  /**
   * Get equation by ID - الحصول على معادلة بالمعرف
   */
  getEquation(id: string): LinguisticEquation | undefined {
    return this.context.equations.get(id);
  }
  
  // ============================================================================
  // Built-in Operator Implementations - تنفيذات المشغلات المدمجة
  // ============================================================================
  
  private applyCausesOperator(entities: LinguisticEntity[]): LinguisticEntity[] {
    // A → B: A causes B
    // Implementation: Create causal relation from A to B
    if (entities.length >= 2) {
      const [cause, effect] = entities;
      const relation: Relation = {
        type: 'causes',
        source: cause.id,
        target: effect.id,
        strength: 1.0,
        metadata: new Map([['timestamp', Date.now()]]),
      };
      
      cause.state.relations.push(relation);
    }
    
    return entities;
  }
  
  private applyEnablesOperator(entities: LinguisticEntity[]): LinguisticEntity[] {
    // A ⊢ B: A enables B
    if (entities.length >= 2) {
      const [enabler, enabled] = entities;
      const relation: Relation = {
        type: 'enables',
        source: enabler.id,
        target: enabled.id,
        strength: 0.8,
        metadata: new Map([['timestamp', Date.now()]]),
      };
      
      enabler.state.relations.push(relation);
    }
    
    return entities;
  }
  
  private applyPreventsOperator(entities: LinguisticEntity[]): LinguisticEntity[] {
    // A ⊣ B: A prevents B
    if (entities.length >= 2) {
      const [preventer, prevented] = entities;
      const relation: Relation = {
        type: 'prevents',
        source: preventer.id,
        target: prevented.id,
        strength: 1.0,
        metadata: new Map([['timestamp', Date.now()]]),
      };
      
      preventer.state.relations.push(relation);
    }
    
    return entities;
  }
  
  private applyTriggersOperator(entities: LinguisticEntity[]): LinguisticEntity[] {
    // A ⊳ B: A triggers B
    if (entities.length >= 2) {
      const [trigger, triggered] = entities;
      const relation: Relation = {
        type: 'triggers',
        source: trigger.id,
        target: triggered.id,
        strength: 0.9,
        metadata: new Map([['timestamp', Date.now()]]),
      };
      
      trigger.state.relations.push(relation);
    }
    
    return entities;
  }
  
  private applyInhibitsOperator(entities: LinguisticEntity[]): LinguisticEntity[] {
    // A ⊲ B: A inhibits B
    if (entities.length >= 2) {
      const [inhibitor, inhibited] = entities;
      const relation: Relation = {
        type: 'inhibits',
        source: inhibitor.id,
        target: inhibited.id,
        strength: 0.7,
        metadata: new Map([['timestamp', Date.now()]]),
      };
      
      inhibitor.state.relations.push(relation);
    }
    
    return entities;
  }
  
  private applyTransformsOperator(entities: LinguisticEntity[]): LinguisticEntity[] {
    // A ⇒ B: A transforms into B
    if (entities.length >= 2) {
      const [source, target] = entities;
      // Copy attributes from source to target
      source.attributes.forEach((value, key) => {
        target.attributes.set(key, value);
      });
    }
    
    return entities;
  }
  
  private applyIncreasesOperator(entities: LinguisticEntity[]): LinguisticEntity[] {
    // A ↑ B: A increases B
    if (entities.length >= 2) {
      const [increaser, increased] = entities;
      // Increase numeric attributes
      increased.attributes.forEach((value, key) => {
        if (typeof value === 'number') {
          increased.attributes.set(key, value * 1.5);
        }
      });
    }
    
    return entities;
  }
  
  private applyDecreasesOperator(entities: LinguisticEntity[]): LinguisticEntity[] {
    // A ↓ B: A decreases B
    if (entities.length >= 2) {
      const [decreaser, decreased] = entities;
      // Decrease numeric attributes
      decreased.attributes.forEach((value, key) => {
        if (typeof value === 'number') {
          decreased.attributes.set(key, value * 0.5);
        }
      });
    }
    
    return entities;
  }
}

