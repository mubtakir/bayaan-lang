/**
 * المحرك المنطقي للغة البيان
 * يدعم البرمجة المنطقية مع الحقائق والقواعد والاستدلال
 */

/**
 * المصطلح (Term) - يمكن أن يكون قيمة أو متغير
 */
export class Term {
  constructor(
    public value: any,
    public isVariable: boolean = false
  ) {}

  toString(): string {
    return this.isVariable ? `?${this.value}` : String(this.value);
  }

  equals(other: Term): boolean {
    if (this.isVariable !== other.isVariable) return false;
    return this.value === other.value;
  }

  clone(): Term {
    return new Term(this.value, this.isVariable);
  }
}

/**
 * المحمول (Predicate) - يمثل علاقة مع معاملات
 */
export class Predicate {
  constructor(
    public name: string,
    public args: Term[]
  ) {}

  toString(): string {
    const argsStr = this.args.map(arg => arg.toString()).join(', ');
    return `${this.name}(${argsStr})`;
  }

  equals(other: Predicate): boolean {
    if (this.name !== other.name) return false;
    if (this.args.length !== other.args.length) return false;
    
    for (let i = 0; i < this.args.length; i++) {
      if (!this.args[i].equals(other.args[i])) return false;
    }
    
    return true;
  }

  clone(): Predicate {
    return new Predicate(
      this.name,
      this.args.map(arg => arg.clone())
    );
  }

  /**
   * استبدال المتغيرات بقيمها من الاستبدال
   */
  substitute(substitution: Substitution): Predicate {
    const newArgs = this.args.map(arg => {
      if (arg.isVariable) {
        if (substitution.has(arg.value)) {
          const value = substitution.get(arg.value);
          // إذا كانت القيمة Term object (متغير آخر)
          if (typeof value === 'object' && value.isVariable !== undefined) {
            // إذا كان المتغير المربوط له قيمة أيضاً، نتبع السلسلة
            if (substitution.has(value.value)) {
              const nextValue = substitution.get(value.value);
              if (typeof nextValue === 'object' && nextValue.isVariable !== undefined) {
                return nextValue.clone();
              }
              return new Term(nextValue, false);
            }
            return value.clone();
          }
          // التحقق إذا كانت القيمة متغير آخر (string)
          if (typeof value === 'string' && substitution.has(value)) {
            const nextValue = substitution.get(value);
            if (typeof nextValue === 'object' && nextValue.isVariable !== undefined) {
              return nextValue.clone();
            }
            return new Term(nextValue, false);
          }
          return new Term(value, false);
        }
        // المتغير غير مربوط، نبقيه كما هو
        return arg.clone();
      }
      return arg.clone();
    });

    return new Predicate(this.name, newArgs);
  }
}

/**
 * الحقيقة (Fact) - محمول بدون شروط
 */
export class Fact {
  constructor(public predicate: Predicate) {}

  toString(): string {
    return `${this.predicate.toString()}.`;
  }

  clone(): Fact {
    return new Fact(this.predicate.clone());
  }
}

/**
 * القاعدة (Rule) - محمول يعتمد على محمولات أخرى
 */
export class Rule {
  constructor(
    public head: Predicate,
    public body: Predicate[]
  ) {}

  toString(): string {
    const bodyStr = this.body.map(pred => pred.toString()).join(' ∧ ');
    return `${this.head.toString()} :- ${bodyStr}`;
  }

  clone(): Rule {
    return new Rule(
      this.head.clone(),
      this.body.map(pred => pred.clone())
    );
  }

  /**
   * إعادة تسمية المتغيرات لتجنب التعارضات
   */
  renameVariables(suffix: string): Rule {
    const renameMap = new Map<string, string>();
    
    const renameTerm = (term: Term): Term => {
      if (term.isVariable) {
        if (!renameMap.has(term.value)) {
          renameMap.set(term.value, `${term.value}_${suffix}`);
        }
        return new Term(renameMap.get(term.value)!, true);
      }
      return term.clone();
    };
    
    const renamePredicate = (pred: Predicate): Predicate => {
      return new Predicate(
        pred.name,
        pred.args.map(renameTerm)
      );
    };
    
    return new Rule(
      renamePredicate(this.head),
      this.body.map(renamePredicate)
    );
  }
}

/**
 * نوع عنصر المعرفة
 */
export type KnowledgeItem = Fact | Rule;

/**
 * الاستبدال (Substitution) - ربط المتغيرات بالقيم
 */
export class Substitution {
  private bindings: Map<string, any> = new Map();

  set(variable: string, value: any): void {
    this.bindings.set(variable, value);
  }

  get(variable: string): any | undefined {
    return this.bindings.get(variable);
  }

  has(variable: string): boolean {
    return this.bindings.has(variable);
  }

  clone(): Substitution {
    const newSub = new Substitution();
    newSub.bindings = new Map(this.bindings);
    return newSub;
  }

  merge(other: Substitution): Substitution | null {
    const merged = this.clone();
    
    for (const [key, value] of other.bindings) {
      if (merged.has(key)) {
        // التحقق من عدم وجود تعارض
        if (merged.get(key) !== value) {
          return null; // تعارض
        }
      } else {
        merged.set(key, value);
      }
    }
    
    return merged;
  }

  toString(): string {
    const entries = Array.from(this.bindings.entries())
      .map(([k, v]) => `${k} = ${v}`)
      .join(', ');
    return `{${entries}}`;
  }

  toObject(): Record<string, any> {
    const obj: Record<string, any> = {};
    for (const [key, value] of this.bindings) {
      obj[key] = value;
    }
    return obj;
  }

  getAll(): Map<string, any> {
    return this.bindings;
  }
}

/**
 * المحرك المنطقي الرئيسي
 */
export class LogicEngine {
  private knowledgeBase: Map<string, KnowledgeItem[]> = new Map();
  private ruleCounter = 0;
  public cutEncountered = false; // لتتبع عامل القطع

  /**
   * إضافة حقيقة إلى قاعدة المعرفة
   */
  addFact(fact: Fact): void {
    const key = fact.predicate.name;
    
    if (!this.knowledgeBase.has(key)) {
      this.knowledgeBase.set(key, []);
    }
    
    this.knowledgeBase.get(key)!.push(fact);
  }

  /**
   * إضافة قاعدة إلى قاعدة المعرفة
   */
  addRule(rule: Rule): void {
    const key = rule.head.name;
    
    if (!this.knowledgeBase.has(key)) {
      this.knowledgeBase.set(key, []);
    }
    
    this.knowledgeBase.get(key)!.push(rule);
  }

  /**
   * استعلام عن هدف
   */
  query(goal: Predicate, substitution: Substitution = new Substitution(), filterResults: boolean = true): Substitution[] {
    // تطبيق الاستبدال على الهدف أولاً
    const substitutedGoal = goal.substitute(substitution);

    // معالجة خاصة للمقارنات الحسابية
    if (['>', '<', '>=', '<=', '==', '!='].includes(substitutedGoal.name)) {
      if (substitutedGoal.args.length === 2) {
        // الحصول على القيم - إما مباشرة أو من الاستبدال
        let left = substitutedGoal.args[0].value;
        let right = substitutedGoal.args[1].value;

        // إذا كانت متغيرات، حل قيمها
        if (substitutedGoal.args[0].isVariable) {
          left = this.resolveValue(left, substitution);
        }
        if (substitutedGoal.args[1].isVariable) {
          right = this.resolveValue(right, substitution);
        }

        let result = false;
        switch (substitutedGoal.name) {
          case '>':
            result = this.greaterThan(left, right);
            break;
          case '<':
            result = this.lessThan(left, right);
            break;
          case '>=':
            result = this.greaterThanOrEqual(left, right);
            break;
          case '<=':
            result = this.lessThanOrEqual(left, right);
            break;
          case '==':
            result = this.arithmeticEqual(left, right);
            break;
          case '!=':
            result = this.arithmeticNotEqual(left, right);
            break;
        }

        return result ? [substitution] : [];
      }
    }

    const solutions: Substitution[] = [];
    const items = this.knowledgeBase.get(substitutedGoal.name) || [];

    // جمع المتغيرات الأصلية من الهدف
    const originalVars = goal.args
      .filter(arg => arg.isVariable)
      .map(arg => arg.value);

    for (const item of items) {
      if (item instanceof Fact) {
        // محاولة توحيد الهدف المستبدل مع الحقيقة
        const newSub = this.unify(substitutedGoal, item.predicate, substitution.clone());
        if (newSub) {
          solutions.push(newSub);
        }
      } else if (item instanceof Rule) {
        // محاولة إثبات القاعدة
        const ruleSolutions = this.proveRule(item, substitutedGoal, substitution.clone());

        if (filterResults) {
          // تصفية الحلول لإرجاع المتغيرات الأصلية فقط
          for (const sol of ruleSolutions) {
            const filteredSub = new Substitution();
            for (const varName of originalVars) {
              const value = this.resolveValue(varName, sol);
              if (value !== undefined) {
                filteredSub.set(varName, value);
              }
            }
            solutions.push(filteredSub);
          }
        } else {
          // إرجاع جميع الحلول بدون تصفية
          solutions.push(...ruleSolutions);
        }
      }
    }

    return solutions;
  }

  /**
   * حل قيمة متغير من خلال تتبع المراجع
   */
  private resolveValue(varName: string, substitution: Substitution): any {
    // البحث عن القيمة النهائية للمتغير
    // إذا كان المتغير مربوطاً بمتغير آخر، نتبع السلسلة
    const visited = new Set<string>();
    let currentVar = varName;

    while (substitution.has(currentVar)) {
      if (visited.has(currentVar)) {
        // حلقة لانهائية
        return undefined;
      }
      visited.add(currentVar);

      const value = substitution.get(currentVar);

      // إذا كانت القيمة Term object (متغير)
      if (typeof value === 'object' && value.isVariable !== undefined) {
        if (value.isVariable) {
          // متغير آخر، نتابع
          currentVar = value.value;
          continue;
        } else {
          // قيمة ثابتة
          return value.value;
        }
      }

      // إذا كانت القيمة string وهي متغير آخر
      if (typeof value === 'string' && substitution.has(value)) {
        currentVar = value;
        continue;
      }

      // قيمة نهائية
      return value;
    }

    return undefined;
  }

  /**
   * إثبات قاعدة
   */
  private proveRule(rule: Rule, goal: Predicate, substitution: Substitution): Substitution[] {
    // إعادة تسمية المتغيرات في القاعدة لتجنب التعارضات
    const renamedRule = rule.renameVariables(String(this.ruleCounter++));

    // توحيد رأس القاعدة مع الهدف
    const headSub = this.unify(renamedRule.head, goal, substitution.clone());
    if (!headSub) {
      return [];
    }

    // إثبات جسم القاعدة
    return this.proveGoals(renamedRule.body, headSub);
  }

  /**
   * إثبات قائمة من الأهداف
   */
  private proveGoals(goals: Predicate[], substitution: Substitution): Substitution[] {
    if (goals.length === 0) {
      return [substitution];
    }

    const [firstGoal, ...restGoals] = goals;

    // معالجة خاصة لعامل القطع
    if (firstGoal.name === 'cut' || firstGoal.name === 'قطع' || firstGoal.name === 'اقطع') {
      // القطع ينجح دائماً ويمنع التراجع
      this.cutEncountered = true;
      return this.proveGoals(restGoals, substitution);
    }

    // الحصول على حلول الهدف الأول مع الاستبدال الحالي
    // لا نقوم بتصفية النتائج هنا لأننا نحتاج إلى جميع المتغيرات
    const firstSolutions = this.query(firstGoal, substitution, false);

    // لكل حل من الهدف الأول، حاول إثبات باقي الأهداف
    const allSolutions: Substitution[] = [];

    for (const solution of firstSolutions) {
      const restSolutions = this.proveGoals(restGoals, solution);
      allSolutions.push(...restSolutions);

      // إذا تم مواجهة القطع، توقف عن التراجع
      if (this.cutEncountered) {
        this.cutEncountered = false; // إعادة تعيين
        break;
      }
    }

    return allSolutions;
  }

  /**
   * توحيد محمولين
   */
  private unify(pred1: Predicate, pred2: Predicate, substitution: Substitution): Substitution | null {
    // التحقق من تطابق الأسماء
    if (pred1.name !== pred2.name) {
      return null;
    }

    // التحقق من تطابق عدد المعاملات
    if (pred1.args.length !== pred2.args.length) {
      return null;
    }

    let currentSub = substitution.clone();

    // توحيد كل معامل
    for (let i = 0; i < pred1.args.length; i++) {
      const result = this.unifyTerms(pred1.args[i], pred2.args[i], currentSub);
      if (!result) {
        return null;
      }
      currentSub = result;
    }

    return currentSub;
  }

  /**
   * توحيد مصطلحين
   */
  private unifyTerms(term1: Term, term2: Term, substitution: Substitution): Substitution | null {
    // إذا كان كلاهما نفس المتغير
    if (term1.isVariable && term2.isVariable && term1.value === term2.value) {
      return substitution;
    }

    // إذا كان term1 متغيراً
    if (term1.isVariable) {
      return this.unifyVariable(term1, term2, substitution);
    }

    // إذا كان term2 متغيراً
    if (term2.isVariable) {
      return this.unifyVariable(term2, term1, substitution);
    }

    // إذا كان كلاهما قيماً
    if (term1.value === term2.value) {
      return substitution;
    }

    // فشل التوحيد
    return null;
  }

  /**
   * توحيد متغير مع مصطلح
   */
  private unifyVariable(variable: Term, term: Term, substitution: Substitution): Substitution | null {
    // التحقق من وجود ربط سابق للمتغير
    if (substitution.has(variable.value)) {
      const boundValue = substitution.get(variable.value);
      // إذا كانت القيمة المربوطة متغيراً آخر
      if (typeof boundValue === 'object' && boundValue.isVariable) {
        return this.unifyTerms(boundValue, term, substitution);
      }
      // توحيد القيمة المربوطة مع المصطلح
      return this.unifyTerms(new Term(boundValue, false), term, substitution);
    }

    // إذا كان المصطلح متغيراً مربوطاً
    if (term.isVariable && substitution.has(term.value)) {
      const boundValue = substitution.get(term.value);
      const newSub = substitution.clone();
      // إذا كانت القيمة المربوطة متغيراً آخر
      if (typeof boundValue === 'object' && boundValue.isVariable) {
        newSub.set(variable.value, boundValue);
      } else {
        newSub.set(variable.value, boundValue);
      }
      return newSub;
    }

    // إنشاء ربط جديد
    const newSub = substitution.clone();
    // إذا كان المصطلح متغيراً، نحفظه كـ Term object
    if (term.isVariable) {
      newSub.set(variable.value, term);
    } else {
      newSub.set(variable.value, term.value);
    }

    return newSub;
  }

  /**
   * الحصول على ملخص قاعدة المعرفة
   */
  getKnowledgeSummary(): Record<string, { facts: number; rules: number }> {
    const summary: Record<string, { facts: number; rules: number }> = {};

    for (const [predicate, items] of this.knowledgeBase) {
      const facts = items.filter(item => item instanceof Fact).length;
      const rules = items.filter(item => item instanceof Rule).length;
      summary[predicate] = { facts, rules };
    }

    return summary;
  }

  /**
   * الحصول على جميع الحقائق
   */
  getAllFacts(): Fact[] {
    const facts: Fact[] = [];

    for (const items of this.knowledgeBase.values()) {
      for (const item of items) {
        if (item instanceof Fact) {
          facts.push(item);
        }
      }
    }

    return facts;
  }

  /**
   * الحصول على جميع القواعد
   */
  getAllRules(): Rule[] {
    const rules: Rule[] = [];

    for (const items of this.knowledgeBase.values()) {
      for (const item of items) {
        if (item instanceof Rule) {
          rules.push(item);
        }
      }
    }

    return rules;
  }

  /**
   * حذف حقيقة
   */
  removeFact(predicate: Predicate): boolean {
    const items = this.knowledgeBase.get(predicate.name);
    if (!items) return false;

    const index = items.findIndex(item =>
      item instanceof Fact && item.predicate.equals(predicate)
    );

    if (index !== -1) {
      items.splice(index, 1);
      return true;
    }

    return false;
  }

  /**
   * حذف قاعدة
   */
  removeRule(rule: Rule): boolean {
    const items = this.knowledgeBase.get(rule.head.name);
    if (!items) return false;

    const index = items.findIndex(item =>
      item instanceof Rule &&
      item.head.equals(rule.head) &&
      item.body.length === rule.body.length &&
      item.body.every((pred, i) => pred.equals(rule.body[i]))
    );

    if (index !== -1) {
      items.splice(index, 1);
      return true;
    }

    return false;
  }

  /**
   * مسح قاعدة المعرفة
   */
  clear(): void {
    this.knowledgeBase.clear();
    this.ruleCounter = 0;
  }

  /**
   * مسح محمول معين
   */
  clearPredicate(predicateName: string): void {
    this.knowledgeBase.delete(predicateName);
  }

  /**
   * التحقق من وجود حقيقة
   */
  hasFact(predicate: Predicate): boolean {
    const items = this.knowledgeBase.get(predicate.name);
    if (!items) return false;

    return items.some(item =>
      item instanceof Fact && item.predicate.equals(predicate)
    );
  }

  /**
   * عدد العناصر في قاعدة المعرفة
   */
  size(): number {
    let count = 0;
    for (const items of this.knowledgeBase.values()) {
      count += items.length;
    }
    return count;
  }

  /**
   * طباعة قاعدة المعرفة
   */
  print(): void {
    console.log('=== قاعدة المعرفة ===');

    for (const [predicate, items] of this.knowledgeBase) {
      console.log(`\n${predicate}:`);

      for (const item of items) {
        console.log(`  ${item.toString()}`);
      }
    }

    console.log('\n===================');
  }

  /**
   * النفي كفشل (Negation as Failure)
   * يتحقق من عدم إمكانية إثبات الهدف
   */
  negationAsFailure(goal: Predicate, substitution: Substitution = new Substitution()): boolean {
    const solutions = this.query(goal, substitution, false);
    return solutions.length === 0;
  }

  /**
   * FindAll - جمع كل الحلول
   * يجمع كل قيم المتغير المحدد من جميع الحلول
   */
  findAll(template: Term, goal: Predicate, substitution: Substitution = new Substitution()): any[] {
    const solutions = this.query(goal, substitution, false);
    const results: any[] = [];

    for (const sol of solutions) {
      if (template.isVariable) {
        const value = this.resolveValue(template.value, sol);
        if (value !== undefined) {
          results.push(value);
        }
      } else {
        results.push(template.value);
      }
    }

    return results;
  }

  /**
   * BagOf - جمع الحلول مع السماح بالتكرار
   * مثل findAll لكن يحافظ على ترتيب الحلول
   */
  bagOf(template: Term, goal: Predicate, substitution: Substitution = new Substitution()): any[] {
    return this.findAll(template, goal, substitution);
  }

  /**
   * SetOf - جمع الحلول الفريدة فقط
   * مثل findAll لكن بدون تكرار
   */
  setOf(template: Term, goal: Predicate, substitution: Substitution = new Substitution()): any[] {
    const results = this.findAll(template, goal, substitution);
    return Array.from(new Set(results));
  }

  /**
   * Assert - إضافة حقيقة أو قاعدة ديناميكياً
   */
  assertFact(predicate: Predicate): void {
    this.addFact(new Fact(predicate));
  }

  /**
   * Assert Rule - إضافة قاعدة ديناميكياً
   */
  assertRule(head: Predicate, body: Predicate[]): void {
    this.addRule(new Rule(head, body));
  }

  /**
   * Retract - حذف حقيقة ديناميكياً
   */
  retractFact(predicate: Predicate): boolean {
    return this.removeFact(predicate);
  }

  /**
   * Retract Rule - حذف قاعدة ديناميكياً
   */
  retractRule(head: Predicate, body: Predicate[]): boolean {
    return this.removeRule(new Rule(head, body));
  }

  /**
   * Member - التحقق من عضوية عنصر في قائمة
   */
  member(element: Term, list: any[]): boolean {
    if (!Array.isArray(list)) return false;

    for (const item of list) {
      if (element.isVariable || element.value === item) {
        return true;
      }
    }

    return false;
  }

  /**
   * Append - دمج قائمتين
   */
  append(list1: any[], list2: any[]): any[] {
    if (!Array.isArray(list1) || !Array.isArray(list2)) {
      return [];
    }
    return [...list1, ...list2];
  }

  /**
   * Length - طول القائمة
   */
  listLength(list: any[]): number {
    if (!Array.isArray(list)) return 0;
    return list.length;
  }

  /**
   * Is - التقييم الحسابي
   * يقيّم تعبير حسابي ويوحده مع النتيجة
   */
  evaluateArithmetic(result: Term, expression: any, substitution: Substitution): Substitution | null {
    try {
      // تقييم التعبير
      let value: number;

      if (typeof expression === 'number') {
        value = expression;
      } else if (typeof expression === 'string') {
        // محاولة تقييم التعبير كـ JavaScript
        value = eval(expression);
      } else {
        return null;
      }

      // توحيد النتيجة
      if (result.isVariable) {
        const newSub = substitution.clone();
        newSub.set(result.value, value);
        return newSub;
      } else if (result.value === value) {
        return substitution;
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * مطابقة نمط القوائم [Head|Tail]
   * Pattern matching for lists with [Head|Tail] syntax
   */
  unifyList(pattern: any, list: any[], substitution: Substitution): Substitution | null {
    // إذا كان النمط قائمة عادية
    if (Array.isArray(pattern)) {
      if (pattern.length !== list.length) {
        return null;
      }

      let currentSub = substitution;
      for (let i = 0; i < pattern.length; i++) {
        const term1 = new Term(pattern[i], false);
        const term2 = new Term(list[i], false);

        // توحيد بسيط للعناصر
        if (term1.isVariable) {
          const newSub = currentSub.clone();
          newSub.set(term1.value, term2.value);
          currentSub = newSub;
        } else if (term1.value !== term2.value) {
          return null;
        }
      }
      return currentSub;
    }

    // إذا كان النمط [Head|Tail]
    if (pattern && typeof pattern === 'object' && 'head' in pattern && 'tail' in pattern) {
      if (list.length === 0) {
        return null; // لا يمكن مطابقة قائمة فارغة مع [Head|Tail]
      }

      const head = list[0];
      const tail = list.slice(1);

      // توحيد Head
      let currentSub = substitution;
      if (pattern.head.isVariable) {
        currentSub = currentSub.clone();
        currentSub.set(pattern.head.value, head);
      } else if (pattern.head.value !== head) {
        return null;
      }

      // توحيد Tail
      if (pattern.tail.isVariable) {
        currentSub = currentSub.clone();
        currentSub.set(pattern.tail.value, tail);
      } else if (Array.isArray(pattern.tail.value)) {
        const tailResult = this.unifyList(pattern.tail.value, tail, currentSub);
        if (!tailResult) return null;
        currentSub = tailResult;
      } else if (JSON.stringify(pattern.tail.value) !== JSON.stringify(tail)) {
        return null;
      }

      return currentSub;
    }

    return null;
  }

  /**
   * عمليات حسابية منطقية متقدمة
   * Advanced arithmetic operations in logic context
   */

  /**
   * مقارنة: أكبر من
   * Greater than comparison
   */
  greaterThan(left: any, right: any): boolean {
    const leftVal = typeof left === 'number' ? left : parseFloat(left);
    const rightVal = typeof right === 'number' ? right : parseFloat(right);
    return !isNaN(leftVal) && !isNaN(rightVal) && leftVal > rightVal;
  }

  /**
   * مقارنة: أصغر من
   * Less than comparison
   */
  lessThan(left: any, right: any): boolean {
    const leftVal = typeof left === 'number' ? left : parseFloat(left);
    const rightVal = typeof right === 'number' ? right : parseFloat(right);
    return !isNaN(leftVal) && !isNaN(rightVal) && leftVal < rightVal;
  }

  /**
   * مقارنة: أكبر من أو يساوي
   * Greater than or equal comparison
   */
  greaterThanOrEqual(left: any, right: any): boolean {
    const leftVal = typeof left === 'number' ? left : parseFloat(left);
    const rightVal = typeof right === 'number' ? right : parseFloat(right);
    return !isNaN(leftVal) && !isNaN(rightVal) && leftVal >= rightVal;
  }

  /**
   * مقارنة: أصغر من أو يساوي
   * Less than or equal comparison
   */
  lessThanOrEqual(left: any, right: any): boolean {
    const leftVal = typeof left === 'number' ? left : parseFloat(left);
    const rightVal = typeof right === 'number' ? right : parseFloat(right);
    return !isNaN(leftVal) && !isNaN(rightVal) && leftVal <= rightVal;
  }

  /**
   * مقارنة: يساوي (حسابياً)
   * Arithmetic equality
   */
  arithmeticEqual(left: any, right: any): boolean {
    const leftVal = typeof left === 'number' ? left : parseFloat(left);
    const rightVal = typeof right === 'number' ? right : parseFloat(right);
    return !isNaN(leftVal) && !isNaN(rightVal) && leftVal === rightVal;
  }

  /**
   * مقارنة: لا يساوي (حسابياً)
   * Arithmetic inequality
   */
  arithmeticNotEqual(left: any, right: any): boolean {
    return !this.arithmeticEqual(left, right);
  }
}

