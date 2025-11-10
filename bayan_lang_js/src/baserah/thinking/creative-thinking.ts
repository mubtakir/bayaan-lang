/**
 * محرك التفكير الإبداعي المتقدم - Advanced Creative Thinking Engine
 *
 * محرك متخصص في توليد الأفكار الإبداعية والابتكارات
 * يستخدم تقنيات متعددة للإبداع والابتكار
 *
 * @author Basel Yahya Abdullah
 */

/**
 * نوع الإبداع
 */
export enum CreativityType {
  DIVERGENT = 'تباعدي',        // توليد أفكار متعددة
  CONVERGENT = 'تقاربي',        // دمج الأفكار
  LATERAL = 'جانبي',            // تفكير خارج الصندوق
  ASSOCIATIVE = 'ترابطي',       // ربط المفاهيم
  ANALOGICAL = 'قياسي',         // استخدام التشبيهات
  COMBINATORIAL = 'تركيبي',     // دمج العناصر
  TRANSFORMATIONAL = 'تحويلي'   // تحويل المفاهيم
}

/**
 * تقنية الإبداع
 */
export enum CreativeTechnique {
  BRAINSTORMING = 'عصف_ذهني',
  SCAMPER = 'سكامبر',
  MIND_MAPPING = 'خريطة_ذهنية',
  RANDOM_INPUT = 'مدخل_عشوائي',
  REVERSE_THINKING = 'تفكير_عكسي',
  FORCED_CONNECTIONS = 'روابط_قسرية',
  ATTRIBUTE_LISTING = 'قائمة_صفات',
  MORPHOLOGICAL_ANALYSIS = 'تحليل_مورفولوجي'
}

/**
 * فكرة إبداعية
 */
export interface CreativeIdea {
  id: string;
  content: string;
  type: CreativityType;
  technique: CreativeTechnique;
  originality: number;      // 0-1
  feasibility: number;      // 0-1
  impact: number;           // 0-1
  novelty: number;          // 0-1
  value: number;            // 0-1
  connections: string[];
  timestamp: Date;
}

/**
 * جلسة إبداعية
 */
export interface CreativeSession {
  id: string;
  topic: string;
  ideas: CreativeIdea[];
  techniques: CreativeTechnique[];
  duration: number;
  totalIdeas: number;
  bestIdeas: CreativeIdea[];
  timestamp: Date;
}

/**
 * محرك التفكير الإبداعي المتقدم
 */
export class CreativeThinking {
  private sessions: CreativeSession[];
  private ideaCounter: number;
  private knownConcepts: Set<string>;
  private conceptConnections: Map<string, string[]>;

  constructor() {
    this.sessions = [];
    this.ideaCounter = 0;
    this.knownConcepts = new Set();
    this.conceptConnections = new Map();
  }

  /**
   * توليد أفكار - الدالة الرئيسية
   */
  generateIdeas(
    topic: string,
    count: number = 10,
    type: CreativityType = CreativityType.DIVERGENT
  ): CreativeIdea[] {
    const ideas: CreativeIdea[] = [];

    // استخدام تقنيات متعددة
    const techniques = this.selectTechniques(type);

    techniques.forEach(technique => {
      const generatedIdeas = this.applyTechnique(topic, technique, Math.ceil(count / techniques.length));
      ideas.push(...generatedIdeas);
    });

    // تقييم الأفكار
    ideas.forEach(idea => {
      this.evaluateIdea(idea);
    });

    // ترتيب حسب القيمة
    ideas.sort((a, b) => b.value - a.value);

    return ideas.slice(0, count);
  }

  /**
   * بدء جلسة إبداعية
   */
  startCreativeSession(topic: string, duration: number = 30): CreativeSession {
    const startTime = Date.now();
    const techniques = [
      CreativeTechnique.BRAINSTORMING,
      CreativeTechnique.SCAMPER,
      CreativeTechnique.MIND_MAPPING,
      CreativeTechnique.RANDOM_INPUT
    ];

    const ideas = this.generateIdeas(topic, 20, CreativityType.DIVERGENT);

    const session: CreativeSession = {
      id: `session_${Date.now()}`,
      topic,
      ideas,
      techniques,
      duration: (Date.now() - startTime) / 1000,
      totalIdeas: ideas.length,
      bestIdeas: ideas.slice(0, 5),
      timestamp: new Date()
    };

    this.sessions.push(session);
    return session;
  }

  /**
   * اختيار التقنيات المناسبة
   */
  private selectTechniques(type: CreativityType): CreativeTechnique[] {
    switch (type) {
      case CreativityType.DIVERGENT:
        return [
          CreativeTechnique.BRAINSTORMING,
          CreativeTechnique.RANDOM_INPUT,
          CreativeTechnique.MIND_MAPPING
        ];
      case CreativityType.CONVERGENT:
        return [
          CreativeTechnique.SCAMPER,
          CreativeTechnique.MORPHOLOGICAL_ANALYSIS
        ];
      case CreativityType.LATERAL:
        return [
          CreativeTechnique.REVERSE_THINKING,
          CreativeTechnique.RANDOM_INPUT
        ];
      case CreativityType.ASSOCIATIVE:
        return [
          CreativeTechnique.FORCED_CONNECTIONS,
          CreativeTechnique.MIND_MAPPING
        ];
      case CreativityType.ANALOGICAL:
        return [
          CreativeTechnique.ATTRIBUTE_LISTING,
          CreativeTechnique.SCAMPER
        ];
      case CreativityType.COMBINATORIAL:
        return [
          CreativeTechnique.MORPHOLOGICAL_ANALYSIS,
          CreativeTechnique.FORCED_CONNECTIONS
        ];
      case CreativityType.TRANSFORMATIONAL:
        return [
          CreativeTechnique.SCAMPER,
          CreativeTechnique.REVERSE_THINKING
        ];
      default:
        return [CreativeTechnique.BRAINSTORMING];
    }
  }

  /**
   * تطبيق تقنية إبداعية
   */
  private applyTechnique(
    topic: string,
    technique: CreativeTechnique,
    count: number
  ): CreativeIdea[] {
    switch (technique) {
      case CreativeTechnique.BRAINSTORMING:
        return this.brainstorm(topic, count);
      case CreativeTechnique.SCAMPER:
        return this.scamper(topic, count);
      case CreativeTechnique.MIND_MAPPING:
        return this.mindMap(topic, count);
      case CreativeTechnique.RANDOM_INPUT:
        return this.randomInput(topic, count);
      case CreativeTechnique.REVERSE_THINKING:
        return this.reverseThinking(topic, count);
      case CreativeTechnique.FORCED_CONNECTIONS:
        return this.forcedConnections(topic, count);
      case CreativeTechnique.ATTRIBUTE_LISTING:
        return this.attributeListing(topic, count);
      case CreativeTechnique.MORPHOLOGICAL_ANALYSIS:
        return this.morphologicalAnalysis(topic, count);
      default:
        return this.brainstorm(topic, count);
    }
  }

  /**
   * عصف ذهني
   */
  private brainstorm(topic: string, count: number): CreativeIdea[] {
    const ideas: CreativeIdea[] = [];
    const variations = [
      `${topic} بطريقة جديدة`,
      `${topic} في سياق مختلف`,
      `${topic} مع تحسينات`,
      `${topic} بتكنولوجيا حديثة`,
      `${topic} للمستقبل`,
      `${topic} بشكل مبسط`,
      `${topic} بشكل معقد`,
      `${topic} بتكلفة أقل`,
      `${topic} بجودة أعلى`,
      `${topic} بسرعة أكبر`
    ];

    for (let i = 0; i < Math.min(count, variations.length); i++) {
      ideas.push(this.createIdea(
        variations[i],
        CreativityType.DIVERGENT,
        CreativeTechnique.BRAINSTORMING
      ));
    }

    return ideas;
  }

  /**
   * تقنية SCAMPER
   * Substitute, Combine, Adapt, Modify, Put to other uses, Eliminate, Reverse
   */
  private scamper(topic: string, count: number): CreativeIdea[] {
    const ideas: CreativeIdea[] = [];
    const scamperActions = [
      `استبدال عنصر في ${topic}`,
      `دمج ${topic} مع شيء آخر`,
      `تكييف ${topic} لاستخدام جديد`,
      `تعديل ${topic} بطريقة مبتكرة`,
      `استخدام ${topic} لغرض آخر`,
      `إزالة عنصر من ${topic}`,
      `عكس ${topic} أو قلبه`
    ];

    for (let i = 0; i < Math.min(count, scamperActions.length); i++) {
      ideas.push(this.createIdea(
        scamperActions[i],
        CreativityType.TRANSFORMATIONAL,
        CreativeTechnique.SCAMPER
      ));
    }

    return ideas;
  }

  /**
   * خريطة ذهنية
   */
  private mindMap(topic: string, count: number): CreativeIdea[] {
    const ideas: CreativeIdea[] = [];
    const branches = [
      `${topic} - الفوائد`,
      `${topic} - التحديات`,
      `${topic} - الفرص`,
      `${topic} - التطبيقات`,
      `${topic} - الابتكارات`,
      `${topic} - المستقبل`
    ];

    for (let i = 0; i < Math.min(count, branches.length); i++) {
      ideas.push(this.createIdea(
        branches[i],
        CreativityType.ASSOCIATIVE,
        CreativeTechnique.MIND_MAPPING
      ));
    }

    return ideas;
  }

  /**
   * مدخل عشوائي
   */
  private randomInput(topic: string, count: number): CreativeIdea[] {
    const ideas: CreativeIdea[] = [];
    const randomWords = ['شجرة', 'ماء', 'نور', 'سرعة', 'لون', 'صوت', 'رائحة', 'ملمس'];

    for (let i = 0; i < Math.min(count, randomWords.length); i++) {
      ideas.push(this.createIdea(
        `${topic} + ${randomWords[i]} = فكرة جديدة`,
        CreativityType.LATERAL,
        CreativeTechnique.RANDOM_INPUT
      ));
    }

    return ideas;
  }

  /**
   * تفكير عكسي
   */
  private reverseThinking(topic: string, count: number): CreativeIdea[] {
    const ideas: CreativeIdea[] = [];
    const reversals = [
      `عكس ${topic} تماماً`,
      `ماذا لو لم يكن ${topic} موجوداً؟`,
      `${topic} بالاتجاه المعاكس`,
      `${topic} من النهاية إلى البداية`
    ];

    for (let i = 0; i < Math.min(count, reversals.length); i++) {
      ideas.push(this.createIdea(
        reversals[i],
        CreativityType.LATERAL,
        CreativeTechnique.REVERSE_THINKING
      ));
    }

    return ideas;
  }

  /**
   * روابط قسرية
   */
  private forcedConnections(topic: string, count: number): CreativeIdea[] {
    const ideas: CreativeIdea[] = [];
    const concepts = ['طبيعة', 'تكنولوجيا', 'فن', 'علم', 'رياضة'];

    for (let i = 0; i < Math.min(count, concepts.length); i++) {
      ideas.push(this.createIdea(
        `ربط ${topic} مع ${concepts[i]}`,
        CreativityType.ASSOCIATIVE,
        CreativeTechnique.FORCED_CONNECTIONS
      ));
    }

    return ideas;
  }

  /**
   * قائمة الصفات
   */
  private attributeListing(topic: string, count: number): CreativeIdea[] {
    const ideas: CreativeIdea[] = [];
    const attributes = ['الحجم', 'اللون', 'الشكل', 'المادة', 'الوظيفة'];

    for (let i = 0; i < Math.min(count, attributes.length); i++) {
      ideas.push(this.createIdea(
        `تغيير ${attributes[i]} في ${topic}`,
        CreativityType.TRANSFORMATIONAL,
        CreativeTechnique.ATTRIBUTE_LISTING
      ));
    }

    return ideas;
  }

  /**
   * تحليل مورفولوجي
   */
  private morphologicalAnalysis(topic: string, count: number): CreativeIdea[] {
    const ideas: CreativeIdea[] = [];
    const dimensions = ['البعد الأول', 'البعد الثاني', 'البعد الثالث'];

    for (let i = 0; i < Math.min(count, dimensions.length); i++) {
      ideas.push(this.createIdea(
        `${topic} في ${dimensions[i]}`,
        CreativityType.COMBINATORIAL,
        CreativeTechnique.MORPHOLOGICAL_ANALYSIS
      ));
    }

    return ideas;
  }

  /**
   * إنشاء فكرة
   */
  private createIdea(
    content: string,
    type: CreativityType,
    technique: CreativeTechnique
  ): CreativeIdea {
    this.ideaCounter++;

    return {
      id: `idea_${this.ideaCounter}_${Date.now()}`,
      content,
      type,
      technique,
      originality: 0,
      feasibility: 0,
      impact: 0,
      novelty: 0,
      value: 0,
      connections: [],
      timestamp: new Date()
    };
  }

  /**
   * تقييم الفكرة
   */
  private evaluateIdea(idea: CreativeIdea): void {
    // تقييم الأصالة (هل الفكرة جديدة؟)
    idea.originality = this.evaluateOriginality(idea.content);

    // تقييم الجدوى (هل يمكن تنفيذها؟)
    idea.feasibility = this.evaluateFeasibility(idea.content);

    // تقييم التأثير (ما مدى تأثيرها؟)
    idea.impact = this.evaluateImpact(idea.content);

    // تقييم الجدة (مدى الابتكار)
    idea.novelty = this.evaluateNovelty(idea.content);

    // حساب القيمة الإجمالية
    idea.value = (
      idea.originality * 0.3 +
      idea.feasibility * 0.2 +
      idea.impact * 0.3 +
      idea.novelty * 0.2
    );
  }

  private evaluateOriginality(content: string): number {
    // فحص إذا كانت الفكرة موجودة مسبقاً
    const isKnown = this.knownConcepts.has(content);
    return isKnown ? 0.3 : 0.8;
  }

  private evaluateFeasibility(content: string): number {
    // تقييم بسيط للجدوى
    return 0.6 + Math.random() * 0.3;
  }

  private evaluateImpact(content: string): number {
    // تقييم التأثير المحتمل
    return 0.5 + Math.random() * 0.4;
  }

  private evaluateNovelty(content: string): number {
    // تقييم مدى الجدة
    return 0.6 + Math.random() * 0.3;
  }

  /**
   * دمج الأفكار
   */
  combineIdeas(idea1: CreativeIdea, idea2: CreativeIdea): CreativeIdea {
    const combined = this.createIdea(
      `${idea1.content} + ${idea2.content}`,
      CreativityType.COMBINATORIAL,
      CreativeTechnique.FORCED_CONNECTIONS
    );

    combined.connections = [idea1.id, idea2.id];
    this.evaluateIdea(combined);

    return combined;
  }

  /**
   * توسيع فكرة
   */
  expandIdea(idea: CreativeIdea, count: number = 5): CreativeIdea[] {
    const expanded: CreativeIdea[] = [];

    for (let i = 0; i < count; i++) {
      const newIdea = this.createIdea(
        `${idea.content} - توسيع ${i + 1}`,
        idea.type,
        idea.technique
      );
      newIdea.connections = [idea.id];
      this.evaluateIdea(newIdea);
      expanded.push(newIdea);
    }

    return expanded;
  }

  /**
   * تحسين فكرة
   */
  improveIdea(idea: CreativeIdea): CreativeIdea {
    const improved = this.createIdea(
      `${idea.content} - محسّن`,
      idea.type,
      CreativeTechnique.SCAMPER
    );

    improved.connections = [idea.id];
    improved.originality = Math.min(idea.originality + 0.1, 1.0);
    improved.feasibility = Math.min(idea.feasibility + 0.15, 1.0);
    improved.impact = Math.min(idea.impact + 0.1, 1.0);
    improved.novelty = Math.min(idea.novelty + 0.05, 1.0);

    this.evaluateIdea(improved);

    return improved;
  }

  /**
   * الحصول على أفضل الأفكار
   */
  getBestIdeas(count: number = 10): CreativeIdea[] {
    const allIdeas = this.sessions.flatMap(s => s.ideas);
    allIdeas.sort((a, b) => b.value - a.value);
    return allIdeas.slice(0, count);
  }

  /**
   * الحصول على الجلسات
   */
  getSessions(): CreativeSession[] {
    return this.sessions;
  }

  /**
   * إحصائيات الإبداع
   */
  getStatistics(): any {
    const allIdeas = this.sessions.flatMap(s => s.ideas);

    return {
      totalSessions: this.sessions.length,
      totalIdeas: allIdeas.length,
      averageOriginality: allIdeas.reduce((sum, i) => sum + i.originality, 0) / allIdeas.length || 0,
      averageFeasibility: allIdeas.reduce((sum, i) => sum + i.feasibility, 0) / allIdeas.length || 0,
      averageImpact: allIdeas.reduce((sum, i) => sum + i.impact, 0) / allIdeas.length || 0,
      averageNovelty: allIdeas.reduce((sum, i) => sum + i.novelty, 0) / allIdeas.length || 0,
      averageValue: allIdeas.reduce((sum, i) => sum + i.value, 0) / allIdeas.length || 0,
      techniqueUsage: this.getTechniqueUsage(allIdeas)
    };
  }

  private getTechniqueUsage(ideas: CreativeIdea[]): Record<string, number> {
    const usage: Record<string, number> = {};

    ideas.forEach(idea => {
      const technique = idea.technique;
      usage[technique] = (usage[technique] || 0) + 1;
    });

    return usage;
  }
}
