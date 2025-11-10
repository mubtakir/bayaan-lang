/**
 * نظام التخزين الدائم - Knowledge Storage System
 * 
 * يحفظ ويسترجع المعرفة من الملفات/قاعدة البيانات
 */

import * as fs from 'fs';
import { Thing } from '../baserah/knowledge/thingEngine';
import { Event } from '../baserah/knowledge/eventEngine';
import { LogicalEquation } from '../baserah/knowledge/equationEngine';
import { Inference } from '../baserah/knowledge/inferenceEngine';
import { Fact, Rule, Predicate } from '../logic/logicEngine';
import { CausalRelation } from '../logic/causalEngine';

/**
 * تنسيق التخزين
 * Storage format
 */
export enum StorageFormat {
  JSON = 'json',
  BAYAN = 'bayan'  // تنسيق لغة البيان الأصلي
}

/**
 * قاعدة المعرفة المحفوظة
 * Saved knowledge base
 */
export interface SavedKnowledgeBase {
  version: string;
  timestamp: number;
  things: any[];
  events: any[];
  equations: any[];
  inferences: any[];
  facts: any[];
  rules: any[];
  causalRelations: any[];
}

/**
 * محرك التخزين
 * Storage Engine
 */
export class KnowledgeStorage {
  private filePath: string;
  private format: StorageFormat;

  constructor(filePath: string, format: StorageFormat = StorageFormat.JSON) {
    this.filePath = filePath;
    this.format = format;
  }

  /**
   * حفظ قاعدة المعرفة
   * Save knowledge base
   */
  save(knowledgeBase: {
    things?: Thing[];
    events?: Event[];
    equations?: LogicalEquation[];
    inferences?: Inference[];
    facts?: Fact[];
    rules?: Rule[];
    causalRelations?: CausalRelation[];
  }): void {
    const saved: SavedKnowledgeBase = {
      version: '1.0.0',
      timestamp: Date.now(),
      things: this.serializeThings(knowledgeBase.things || []),
      events: this.serializeEvents(knowledgeBase.events || []),
      equations: this.serializeEquations(knowledgeBase.equations || []),
      inferences: this.serializeInferences(knowledgeBase.inferences || []),
      facts: this.serializeFacts(knowledgeBase.facts || []),
      rules: this.serializeRules(knowledgeBase.rules || []),
      causalRelations: this.serializeCausalRelations(knowledgeBase.causalRelations || [])
    };

    if (this.format === StorageFormat.JSON) {
      this.saveAsJSON(saved);
    } else {
      this.saveAsBayan(saved);
    }
  }

  /**
   * تحميل قاعدة المعرفة
   * Load knowledge base
   */
  load(): SavedKnowledgeBase | null {
    if (!fs.existsSync(this.filePath)) {
      return null;
    }

    if (this.format === StorageFormat.JSON) {
      return this.loadFromJSON();
    } else {
      return this.loadFromBayan();
    }
  }

  /**
   * حفظ كـ JSON
   * Save as JSON
   */
  private saveAsJSON(data: SavedKnowledgeBase): void {
    const json = JSON.stringify(data, null, 2);
    fs.writeFileSync(this.filePath, json, 'utf-8');
  }

  /**
   * تحميل من JSON
   * Load from JSON
   */
  private loadFromJSON(): SavedKnowledgeBase | null {
    try {
      const json = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(json);
    } catch (error) {
      console.error('Error loading JSON:', error);
      return null;
    }
  }

  /**
   * حفظ بتنسيق البيان
   * Save as Bayan format
   */
  private saveAsBayan(data: SavedKnowledgeBase): void {
    let content = `// قاعدة المعرفة - Knowledge Base\n`;
    content += `// النسخة: ${data.version}\n`;
    content += `// التاريخ: ${new Date(data.timestamp).toISOString()}\n\n`;

    // حفظ الأشياء
    if (data.things.length > 0) {
      content += `// ============================================\n`;
      content += `// الأشياء - Things\n`;
      content += `// ============================================\n\n`;
      
      for (const thing of data.things) {
        content += this.thingToBayan(thing);
        content += '\n';
      }
    }

    // حفظ الأحداث
    if (data.events.length > 0) {
      content += `\n// ============================================\n`;
      content += `// الأحداث - Events\n`;
      content += `// ============================================\n\n`;
      
      for (const event of data.events) {
        content += this.eventToBayan(event);
        content += '\n';
      }
    }

    // حفظ الحقائق
    if (data.facts.length > 0) {
      content += `\n// ============================================\n`;
      content += `// الحقائق - Facts\n`;
      content += `// ============================================\n\n`;
      
      for (const fact of data.facts) {
        content += this.factToBayan(fact);
        content += '\n';
      }
    }

    // حفظ العلاقات السببية
    if (data.causalRelations.length > 0) {
      content += `\n// ============================================\n`;
      content += `// العلاقات السببية - Causal Relations\n`;
      content += `// ============================================\n\n`;
      
      for (const relation of data.causalRelations) {
        content += this.causalRelationToBayan(relation);
        content += '\n';
      }
    }

    fs.writeFileSync(this.filePath, content, 'utf-8');
  }

  /**
   * تحميل من تنسيق البيان
   * Load from Bayan format
   */
  private loadFromBayan(): SavedKnowledgeBase | null {
    // هذا يحتاج إلى parser كامل للغة البيان
    // حالياً نرجع null
    return null;
  }

  // ============================================
  // Serialization Methods
  // ============================================

  private serializeThings(things: Thing[]): any[] {
    return things.map(thing => ({
      name: thing.name,
      category: thing.category,
      properties: Array.from(thing.getAllProperties()).map(prop => ({
        name: prop.name,
        value: prop.value,
        type: prop.type,
        unit: prop.unit,
        min: prop.min,
        max: prop.max,
        mutable: prop.mutable
      })),
      states: Array.from(thing.getAllStates()).map(state => ({
        name: state.name,
        type: state.type,
        active: state.active,
        duration: state.duration,
        conditions: Array.from(state.conditions.entries())
      })),
      shape: thing.getShape()
    }));
  }

  private serializeEvents(events: Event[]): any[] {
    return events.map(event => ({
      name: event.name,
      type: event.type,
      subject: event.subject,
      object: event.object,
      conditions: Array.from(event.getConditions().entries()),
      results: event.getResults().map(result => ({
        thing: result.thing,
        propertyChanges: Array.from(result.propertyChanges.entries()),
        stateChanges: Array.from(result.stateChanges.entries()),
        description: result.description
      }))
    }));
  }

  private serializeEquations(equations: LogicalEquation[]): any[] {
    return equations.map(eq => ({
      name: eq.name,
      // يمكن إضافة المزيد من التفاصيل
    }));
  }

  private serializeInferences(inferences: Inference[]): any[] {
    return inferences.map(inf => ({
      type: inf.type,
      premise: inf.premise,
      conclusion: inf.conclusion,
      confidence: inf.confidence,
      explanation: inf.explanation
    }));
  }

  private serializeFacts(facts: Fact[]): any[] {
    return facts.map(fact => ({
      predicate: this.serializePredicate(fact.predicate)
    }));
  }

  private serializeRules(rules: Rule[]): any[] {
    return rules.map(rule => ({
      head: this.serializePredicate(rule.head),
      body: rule.body.map(pred => this.serializePredicate(pred))
    }));
  }

  private serializePredicate(pred: Predicate): any {
    return {
      name: pred.name,
      args: pred.args.map(term => ({
        value: term.value,
        isVariable: term.isVariable
      }))
    };
  }

  private serializeCausalRelations(relations: CausalRelation[]): any[] {
    return relations.map(rel => ({
      from: rel.from,
      to: rel.to,
      type: rel.type,
      weight: rel.weight
    }));
  }

  // ============================================
  // Bayan Format Conversion
  // ============================================

  private thingToBayan(thing: any): string {
    let result = `شيء ${thing.name} {\n`;
    result += `  الفئة: "${thing.category}",\n`;
    
    if (thing.properties.length > 0) {
      result += `  الخصائص: {\n`;
      for (const prop of thing.properties) {
        const unit = prop.unit ? ` ${prop.unit}` : '';
        result += `    ${prop.name}: ${JSON.stringify(prop.value)}${unit} (${prop.type}),\n`;
      }
      result += `  },\n`;
    }

    if (thing.states.length > 0) {
      result += `  الحالات: {\n`;
      for (const state of thing.states) {
        result += `    ${state.name}: ${state.active ? 'نشط' : 'خامل'},\n`;
      }
      result += `  },\n`;
    }

    if (thing.shape) {
      result += `  الشكل: "${thing.shape}"\n`;
    }

    result += `}\n`;
    return result;
  }

  private eventToBayan(event: any): string {
    let result = `حدث ${event.name} {\n`;
    result += `  النوع: ${event.type},\n`;
    if (event.subject) result += `  الفاعل: "${event.subject}",\n`;
    if (event.object) result += `  المفعول_به: "${event.object}",\n`;
    result += `}\n`;
    return result;
  }

  private factToBayan(fact: any): string {
    const args = fact.predicate.args.map((arg: any) => 
      arg.isVariable ? `?${arg.value}` : arg.value
    ).join(', ');
    return `حقيقة ${fact.predicate.name}(${args});`;
  }

  private causalRelationToBayan(relation: any): string {
    const typeMap: { [key: string]: string } = {
      'causes': 'يسبب',
      'prevents': 'يمنع',
      'enhances': 'يعزز',
      'weakens': 'يضعف',
      'leads_to': 'يؤدي_إلى',
      'requires': 'يتطلب',
      'enables': 'يمكّن',
      'inhibits': 'يثبط'
    };

    const arabicType = typeMap[relation.type] || relation.type;
    return `حقيقة ${arabicType}("${relation.from}", "${relation.to}", ${relation.weight});`;
  }

  /**
   * تصدير إلى تنسيق آخر
   * Export to another format
   */
  exportTo(targetPath: string, format: StorageFormat): void {
    const data = this.load();
    if (!data) {
      throw new Error('No data to export');
    }

    const exporter = new KnowledgeStorage(targetPath, format);
    exporter.saveAsJSON(data);
  }

  /**
   * إحصائيات الملف
   * File statistics
   */
  getStatistics(): {
    exists: boolean;
    size?: number;
    format: StorageFormat;
    path: string;
  } {
    const exists = fs.existsSync(this.filePath);
    const size = exists ? fs.statSync(this.filePath).size : undefined;

    return {
      exists,
      size,
      format: this.format,
      path: this.filePath
    };
  }
}

