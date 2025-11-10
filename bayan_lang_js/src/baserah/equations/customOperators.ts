/**
 * Custom Operators System - نظام المشغلات المخصصة
 * 
 * This system allows programmers to define their own linguistic operators
 * with custom behavior and semantics.
 * 
 * هذا النظام يسمح للمبرمجين بتعريف مشغلاتهم اللغوية الخاصة
 * مع سلوك ودلالات مخصصة.
 */

import {
  CustomOperatorDefinition,
  LinguisticRole,
  EquationOperator,
  OperatorType,
} from './linguisticEquationTypes';

/**
 * Custom Operator Builder - بناء المشغل المخصص
 */
export class CustomOperatorBuilder {
  private definition: Partial<CustomOperatorDefinition>;
  
  constructor() {
    this.definition = {
      precedence: 5,
      associativity: 'left',
      inputRoles: [],
      outputRoles: [],
      examples: [],
    };
  }
  
  /**
   * Set operator symbol - تعيين رمز المشغل
   */
  withSymbol(symbol: string): this {
    this.definition.symbol = symbol;
    return this;
  }
  
  /**
   * Set operator name (Arabic) - تعيين اسم المشغل (عربي)
   */
  withName(name: string): this {
    this.definition.name = name;
    return this;
  }
  
  /**
   * Set operator name (English) - تعيين اسم المشغل (إنجليزي)
   */
  withNameEn(nameEn: string): this {
    this.definition.nameEn = nameEn;
    return this;
  }
  
  /**
   * Set operator description - تعيين وصف المشغل
   */
  withDescription(description: string): this {
    this.definition.description = description;
    return this;
  }
  
  /**
   * Set operator precedence - تعيين أسبقية المشغل
   */
  withPrecedence(precedence: number): this {
    this.definition.precedence = precedence;
    return this;
  }
  
  /**
   * Set operator associativity - تعيين ترابطية المشغل
   */
  withAssociativity(associativity: 'left' | 'right'): this {
    this.definition.associativity = associativity;
    return this;
  }
  
  /**
   * Set input roles - تعيين أدوار المدخلات
   */
  withInputRoles(...roles: LinguisticRole[]): this {
    this.definition.inputRoles = roles;
    return this;
  }
  
  /**
   * Set output roles - تعيين أدوار المخرجات
   */
  withOutputRoles(...roles: LinguisticRole[]): this {
    this.definition.outputRoles = roles;
    return this;
  }
  
  /**
   * Set implementation - تعيين التنفيذ
   */
  withImplementation(implementation: string): this {
    this.definition.implementation = implementation;
    return this;
  }
  
  /**
   * Add example - إضافة مثال
   */
  addExample(example: string): this {
    this.definition.examples!.push(example);
    return this;
  }
  
  /**
   * Build the operator definition - بناء تعريف المشغل
   */
  build(): CustomOperatorDefinition {
    if (!this.definition.symbol) {
      throw new Error('Operator symbol is required');
    }
    if (!this.definition.name) {
      throw new Error('Operator name is required');
    }
    if (!this.definition.nameEn) {
      throw new Error('Operator English name is required');
    }
    if (!this.definition.implementation) {
      throw new Error('Operator implementation is required');
    }
    
    return this.definition as CustomOperatorDefinition;
  }
}

/**
 * Predefined Custom Operators - المشغلات المخصصة المعرفة مسبقاً
 */
export class PredefinedCustomOperators {
  /**
   * Patience Operator - مشغل الصبر
   * Example: خالد صبر ⊲ (خالد ضرب أحمد)
   * Meaning: Khalid's patience prevents him from hitting Ahmed
   */
  static patience(): CustomOperatorDefinition {
    return new CustomOperatorBuilder()
      .withSymbol('صبر⊲')
      .withName('صبر_فلم_يفعل')
      .withNameEn('patience_prevents')
      .withDescription('الصبر يمنع الفعل - Patience prevents action')
      .withPrecedence(9)
      .withAssociativity('right')
      .withInputRoles(LinguisticRole.AGENT, LinguisticRole.ACTION)
      .withOutputRoles(LinguisticRole.AGENT)
      .withImplementation(`
        // الصبر يمنع الفعل
        const [agent, action] = entities;
        
        // Set patience attribute
        agent.attributes.set('صبر', true);
        agent.attributes.set('patience', true);
        
        // Create prevention relation
        const relation = {
          type: 'prevents',
          source: agent.id,
          target: action.id,
          strength: 1.0,
          metadata: new Map([
            ['reason', 'patience'],
            ['timestamp', Date.now()]
          ])
        };
        
        agent.state.relations.push(relation);
        
        // Return only the agent (action is prevented)
        return [agent];
      `)
      .addExample('خالد صبر⊲ (خالد ضرب أحمد)')
      .addExample('Khalid صبر⊲ (Khalid hit Ahmed)')
      .build();
  }
  
  /**
   * Aggression Increase Operator - مشغل زيادة الوحشية
   * Example: أحمد اعتدى على خالد ↑ وحشية_أحمد
   * Meaning: Ahmed's aggression increases his brutality
   */
  static aggressionIncrease(): CustomOperatorDefinition {
    return new CustomOperatorBuilder()
      .withSymbol('↑وحشية')
      .withName('زيادة_الوحشية')
      .withNameEn('increase_aggression')
      .withDescription('الاعتداء يزيد الوحشية - Aggression increases brutality')
      .withPrecedence(7)
      .withAssociativity('left')
      .withInputRoles(LinguisticRole.AGENT, LinguisticRole.ACTION)
      .withOutputRoles(LinguisticRole.AGENT)
      .withImplementation(`
        // الاعتداء يزيد الوحشية
        const [agent, action] = entities;
        
        // Get current aggression level
        const currentAggression = agent.attributes.get('وحشية') || 0;
        const currentAggressionEn = agent.attributes.get('aggression') || 0;
        
        // Increase aggression
        agent.attributes.set('وحشية', currentAggression + 20);
        agent.attributes.set('aggression', currentAggressionEn + 20);
        
        // Create transformation relation
        const relation = {
          type: 'transforms',
          source: action.id,
          target: agent.id,
          strength: 0.8,
          metadata: new Map([
            ['attribute', 'aggression'],
            ['change', '+20'],
            ['timestamp', Date.now()]
          ])
        };
        
        agent.state.relations.push(relation);
        
        return [agent];
      `)
      .addExample('أحمد اعتدى على خالد ↑وحشية أحمد')
      .addExample('Ahmed attacked Khalid ↑وحشية Ahmed')
      .build();
  }
  
  /**
   * Role Reversal Operator - مشغل عكس الأدوار
   * Example: أحمد اعتدى على خالد ⇄ خالد ضرب أحمد
   * Meaning: Ahmed attacked Khalid, so Khalid hit Ahmed (role reversal)
   */
  static roleReversal(): CustomOperatorDefinition {
    return new CustomOperatorBuilder()
      .withSymbol('⇄')
      .withName('عكس_الأدوار')
      .withNameEn('role_reversal')
      .withDescription('عكس أدوار الفاعل والمفعول - Reverse agent and patient roles')
      .withPrecedence(10)
      .withAssociativity('left')
      .withInputRoles(LinguisticRole.AGENT, LinguisticRole.PATIENT)
      .withOutputRoles(LinguisticRole.AGENT, LinguisticRole.PATIENT)
      .withImplementation(`
        // عكس الأدوار
        const [originalAgent, originalPatient] = entities;
        
        // Swap roles
        const newAgent = { ...originalPatient, role: 'فاعل' };
        const newPatient = { ...originalAgent, role: 'مفعول' };
        
        // Create role reversal relation
        const relation = {
          type: 'role_reversal',
          source: originalPatient.id,
          target: originalAgent.id,
          strength: 1.0,
          metadata: new Map([
            ['original_agent', originalAgent.id],
            ['original_patient', originalPatient.id],
            ['timestamp', Date.now()]
          ])
        };
        
        newAgent.state.relations.push(relation);
        
        return [newAgent, newPatient];
      `)
      .addExample('أحمد اعتدى على خالد ⇄ خالد ضرب أحمد')
      .addExample('Ahmed attacked Khalid ⇄ Khalid hit Ahmed')
      .build();
  }
  
  /**
   * Conditional Action Operator - مشغل الفعل الشرطي
   * Example: إذا(صبر خالد) ⊣ (خالد ضرب أحمد)
   * Meaning: If Khalid is patient, then he doesn't hit Ahmed
   */
  static conditionalAction(): CustomOperatorDefinition {
    return new CustomOperatorBuilder()
      .withSymbol('إذا⊣')
      .withName('شرط_منع')
      .withNameEn('conditional_prevention')
      .withDescription('إذا تحقق الشرط، يمنع الفعل - If condition is met, prevent action')
      .withPrecedence(11)
      .withAssociativity('right')
      .withInputRoles(LinguisticRole.CONDITION, LinguisticRole.ACTION)
      .withOutputRoles(LinguisticRole.AGENT)
      .withImplementation(`
        // شرط منع الفعل
        const [condition, action] = entities;
        
        // Check if condition is met
        const conditionMet = condition.attributes.get('value') === true;
        
        if (conditionMet) {
          // Create prevention relation
          const relation = {
            type: 'prevents',
            source: condition.id,
            target: action.id,
            strength: 1.0,
            metadata: new Map([
              ['reason', 'condition_met'],
              ['timestamp', Date.now()]
            ])
          };
          
          condition.state.relations.push(relation);
          
          // Return empty (action prevented)
          return [];
        } else {
          // Condition not met, action proceeds
          return [action];
        }
      `)
      .addExample('إذا⊣(صبر خالد) (خالد ضرب أحمد)')
      .addExample('إذا⊣(Khalid is patient) (Khalid hit Ahmed)')
      .build();
  }
  
  /**
   * Scientific Causation Operator - مشغل السببية العلمية
   * Example: وجود الأكسجين ⊢ الاحتراق
   * Meaning: Presence of oxygen enables combustion
   */
  static scientificCausation(): CustomOperatorDefinition {
    return new CustomOperatorBuilder()
      .withSymbol('⊢علمي')
      .withName('سببية_علمية')
      .withNameEn('scientific_causation')
      .withDescription('السببية العلمية - Scientific causation')
      .withPrecedence(10)
      .withAssociativity('left')
      .withInputRoles(LinguisticRole.CAUSE, LinguisticRole.EFFECT)
      .withOutputRoles(LinguisticRole.EFFECT)
      .withImplementation(`
        // السببية العلمية
        const [cause, effect] = entities;
        
        // Create scientific causation relation
        const relation = {
          type: 'scientific_causation',
          source: cause.id,
          target: effect.id,
          strength: 1.0,
          metadata: new Map([
            ['type', 'scientific'],
            ['verified', true],
            ['timestamp', Date.now()]
          ])
        };
        
        cause.state.relations.push(relation);
        
        // Set scientific properties
        effect.attributes.set('caused_by', cause.id);
        effect.attributes.set('scientific_law', true);
        
        return [effect];
      `)
      .addExample('وجود الأكسجين ⊢علمي الاحتراق')
      .addExample('Presence of oxygen ⊢علمي combustion')
      .build();
  }
  
  /**
   * Get all predefined operators - الحصول على جميع المشغلات المعرفة مسبقاً
   */
  static getAll(): CustomOperatorDefinition[] {
    return [
      this.patience(),
      this.aggressionIncrease(),
      this.roleReversal(),
      this.conditionalAction(),
      this.scientificCausation(),
    ];
  }
}

