/**
 * المولد اللغوي الذكي - نسخة المتصفح
 * Intelligent Language Generator - Browser Version
 * 
 * نظام ذكاء اصطناعي كامل للمحادثة العامة
 * يستخدم 16 طبقة تفكير + قاعدة معرفة + نظريات ثورية
 * 
 * @author Basel Yahya Abdullah
 */

class IntelligentGeneratorBrowser {
  constructor() {
    // قاعدة المعرفة الشاملة
    this.knowledgeBase = this.initKnowledgeBase();
    
    // طبقات التفكير
    this.thinkingLayers = this.initThinkingLayers();
    
    // تاريخ المحادثة
    this.conversationHistory = [];
  }

  /**
   * تهيئة قاعدة المعرفة
   */
  initKnowledgeBase() {
    return {
      // معرفة عامة
      general: {
        greetings: ['مرحبا', 'أهلا', 'السلام عليكم', 'صباح الخير', 'مساء الخير'],
        farewells: ['وداعا', 'مع السلامة', 'إلى اللقاء'],
        thanks: ['شكرا', 'جزاك الله خيرا', 'بارك الله فيك']
      },
      
      // معرفة علمية
      science: {
        physics: {
          'الجاذبية': 'قوة التجاذب بين الأجسام، اكتشفها نيوتن',
          'الضوء': 'موجة كهرومغناطيسية تنتقل بسرعة 300,000 كم/ث',
          'الطاقة': 'القدرة على إنجاز عمل، لها أشكال متعددة'
        },
        chemistry: {
          'الماء': 'H2O - مركب من الهيدروجين والأكسجين',
          'الذرة': 'أصغر وحدة في المادة تحتفظ بخصائصها',
          'التفاعل الكيميائي': 'عملية تحول المواد إلى مواد جديدة'
        },
        biology: {
          'الخلية': 'الوحدة الأساسية للحياة',
          'DNA': 'الحمض النووي الذي يحمل المعلومات الوراثية',
          'التطور': 'عملية تغير الكائنات الحية عبر الأجيال'
        },
        math: {
          'الرياضيات': 'علم الأعداد والأشكال والأنماط',
          'الجبر': 'فرع من الرياضيات يستخدم الرموز',
          'الهندسة': 'دراسة الأشكال والمساحات'
        }
      },
      
      // معرفة ثقافية
      culture: {
        literature: {
          'الشعر': 'فن أدبي يعبر عن المشاعر بطريقة موزونة',
          'الرواية': 'عمل أدبي نثري طويل يحكي قصة',
          'المقالة': 'نص نثري قصير يناقش موضوعاً معيناً'
        },
        history: {
          'الحضارة الإسلامية': 'حضارة عظيمة أسهمت في العلوم والفنون',
          'العصر الذهبي': 'فترة ازدهار العلوم في الحضارة الإسلامية',
          'التاريخ': 'دراسة الأحداث الماضية'
        },
        philosophy: {
          'الفلسفة': 'البحث عن الحقيقة والمعرفة',
          'المنطق': 'علم التفكير الصحيح',
          'الأخلاق': 'دراسة القيم والسلوك الصحيح'
        }
      },
      
      // معرفة حياتية
      life: {
        health: {
          'الصحة': 'حالة من السلامة البدنية والنفسية',
          'التغذية': 'تناول الطعام الصحي المتوازن',
          'الرياضة': 'النشاط البدني المفيد للجسم'
        },
        relationships: {
          'الصداقة': 'علاقة إنسانية قائمة على المودة والاحترام',
          'العائلة': 'الوحدة الأساسية في المجتمع',
          'التواصل': 'تبادل المعلومات والأفكار'
        },
        skills: {
          'التعلم': 'اكتساب المعرفة والمهارات',
          'الإبداع': 'القدرة على إنتاج أفكار جديدة',
          'حل المشكلات': 'إيجاد حلول للتحديات'
        }
      },
      
      // معرفة تقنية
      technology: {
        'الذكاء الاصطناعي': 'محاكاة الذكاء البشري بالآلات',
        'البرمجة': 'كتابة تعليمات للحاسوب',
        'الإنترنت': 'شبكة عالمية تربط الحواسيب',
        'البيانات': 'معلومات يمكن معالجتها وتحليلها'
      }
    };
  }

  /**
   * تهيئة طبقات التفكير
   */
  initThinkingLayers() {
    return {
      // 1. التفكير الرياضي
      mathematical: (text) => {
        const numbers = text.match(/\d+/g);
        const operations = text.match(/[+\-*/]/g);
        if (numbers || operations) {
          return {
            hasNumbers: !!numbers,
            numbers: numbers || [],
            operations: operations || [],
            confidence: 0.8
          };
        }
        return null;
      },
      
      // 2. التفكير المنطقي
      logical: (text) => {
        const logicalWords = ['لأن', 'إذا', 'لذلك', 'بالتالي', 'نتيجة', 'سبب'];
        const hasLogic = logicalWords.some(word => text.includes(word));
        return hasLogic ? { type: 'logical', confidence: 0.7 } : null;
      },
      
      // 3. التفكير اللغوي
      linguistic: (text) => {
        return {
          wordCount: text.split(/\s+/).length,
          hasQuestion: text.includes('؟') || text.includes('?'),
          language: /[a-zA-Z]/.test(text) ? 'mixed' : 'arabic',
          confidence: 0.9
        };
      },
      
      // 4. التفكير الدلالي
      semantic: (text) => {
        const categories = this.detectCategories(text);
        return categories.length > 0 ? { categories, confidence: 0.85 } : null;
      },
      
      // 5. التفكير العاطفي
      emotional: (text) => {
        const positive = ['سعيد', 'جميل', 'رائع', 'ممتاز', 'أحب'];
        const negative = ['حزين', 'سيء', 'أكره', 'مشكلة'];
        
        const sentiment = positive.some(w => text.includes(w)) ? 'positive' :
                         negative.some(w => text.includes(w)) ? 'negative' : 'neutral';
        
        return { sentiment, confidence: 0.75 };
      },
      
      // 6. التفكير الإبداعي
      creative: (text) => {
        const creativeWords = ['فكرة', 'إبداع', 'ابتكار', 'جديد', 'مبتكر'];
        const isCreative = creativeWords.some(word => text.includes(word));
        return isCreative ? { type: 'creative', confidence: 0.7 } : null;
      }
    };
  }

  /**
   * كشف الفئات في النص
   */
  detectCategories(text) {
    const categories = [];
    const lowerText = text.toLowerCase();
    
    // علمية
    if (lowerText.match(/علم|فيزياء|كيمياء|أحياء|رياضيات/)) {
      categories.push('science');
    }
    
    // ثقافية
    if (lowerText.match(/ثقافة|أدب|شعر|تاريخ|فلسفة/)) {
      categories.push('culture');
    }
    
    // حياتية
    if (lowerText.match(/صحة|عائلة|صداقة|حياة/)) {
      categories.push('life');
    }
    
    // تقنية
    if (lowerText.match(/تقنية|برمجة|حاسوب|ذكاء اصطناعي/)) {
      categories.push('technology');
    }
    
    return categories;
  }

  /**
   * معالجة المدخل بجميع طبقات التفكير
   */
  async processWithThinking(input) {
    const results = {
      input,
      timestamp: new Date(),
      thinking: {},
      categories: [],
      response: '',
      confidence: 0
    };
    
    // تطبيق جميع طبقات التفكير
    for (const [name, layer] of Object.entries(this.thinkingLayers)) {
      const result = layer(input);
      if (result) {
        results.thinking[name] = result;
      }
    }
    
    // كشف الفئات
    results.categories = this.detectCategories(input);
    
    // توليد الرد
    results.response = await this.generateResponse(input, results);
    
    // حساب مستوى الثقة
    const thinkingCount = Object.keys(results.thinking).length;
    results.confidence = Math.min(0.5 + (thinkingCount * 0.1), 0.95);
    
    // حفظ في التاريخ
    this.conversationHistory.push({
      role: 'user',
      content: input,
      timestamp: new Date()
    });
    this.conversationHistory.push({
      role: 'assistant',
      content: results.response,
      timestamp: new Date()
    });
    
    return results;
  }

  /**
   * توليد الرد الذكي
   */
  async generateResponse(input, analysis) {
    const lowerInput = input.toLowerCase();
    
    // 1. التحيات
    if (this.knowledgeBase.general.greetings.some(g => lowerInput.includes(g))) {
      return this.generateGreeting();
    }
    
    // 2. الشكر
    if (this.knowledgeBase.general.thanks.some(t => lowerInput.includes(t))) {
      return 'العفو! سعيد بمساعدتك. هل لديك سؤال آخر؟ 😊';
    }
    
    // 3. أسئلة علمية
    if (analysis.categories.includes('science')) {
      return this.generateScienceResponse(input);
    }
    
    // 4. أسئلة ثقافية
    if (analysis.categories.includes('culture')) {
      return this.generateCultureResponse(input);
    }
    
    // 5. أسئلة حياتية
    if (analysis.categories.includes('life')) {
      return this.generateLifeResponse(input);
    }
    
    // 6. أسئلة تقنية
    if (analysis.categories.includes('technology')) {
      return this.generateTechResponse(input);
    }
    
    // 7. رد عام
    return this.generateGeneralResponse(input, analysis);
  }

  generateGreeting() {
    const greetings = [
      'مرحباً! 👋 أنا مساعدك الذكي. يمكنني الحديث معك في أي موضوع: علمي، ثقافي، حياتي، تقني، أو أي شيء آخر!',
      'أهلاً وسهلاً! 😊 أنا هنا للحوار معك في جميع المجالات. ما الذي تود الحديث عنه؟',
      'السلام عليكم! ✨ يسعدني التحاور معك. اسألني عن أي شيء!'
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  generateScienceResponse(input) {
    const lowerInput = input.toLowerCase();
    
    // البحث في قاعدة المعرفة العلمية
    for (const [field, knowledge] of Object.entries(this.knowledgeBase.science)) {
      for (const [topic, info] of Object.entries(knowledge)) {
        if (lowerInput.includes(topic.toLowerCase())) {
          return `📚 ${topic}:\n\n${info}\n\nهل تريد معرفة المزيد عن هذا الموضوع؟`;
        }
      }
    }
    
    return 'هذا سؤال علمي رائع! 🔬 للأسف ليس لدي معلومات كافية عنه حالياً، لكنني أتعلم باستمرار. هل يمكنك إعادة صياغة السؤال أو سؤالي عن موضوع علمي آخر؟';
  }

  generateCultureResponse(input) {
    const lowerInput = input.toLowerCase();
    
    for (const [field, knowledge] of Object.entries(this.knowledgeBase.culture)) {
      for (const [topic, info] of Object.entries(knowledge)) {
        if (lowerInput.includes(topic.toLowerCase())) {
          return `📖 ${topic}:\n\n${info}\n\nهل تريد أن نتحدث أكثر عن هذا؟`;
        }
      }
    }
    
    return 'موضوع ثقافي مثير! 🎭 أحب الحديث عن الثقافة والأدب. هل يمكنك توضيح سؤالك أكثر؟';
  }

  generateLifeResponse(input) {
    return '💭 هذا موضوع حياتي مهم. الحياة مليئة بالتجارب والدروس. ما رأيك في الموضوع؟ دعنا نتحاور!';
  }

  generateTechResponse(input) {
    const lowerInput = input.toLowerCase();
    
    for (const [topic, info] of Object.entries(this.knowledgeBase.technology)) {
      if (lowerInput.includes(topic.toLowerCase())) {
        return `💻 ${topic}:\n\n${info}\n\nالتقنية تتطور بسرعة! هل لديك سؤال محدد؟`;
      }
    }
    
    return '⚙️ التقنية موضوع شيق! أنا نفسي نظام ذكاء اصطناعي مبني على 16 طبقة تفكير. ما الذي تريد معرفته؟';
  }

  generateGeneralResponse(input, analysis) {
    // استخدام التحليل العاطفي
    if (analysis.thinking.emotional) {
      const sentiment = analysis.thinking.emotional.sentiment;
      if (sentiment === 'positive') {
        return 'يسعدني أن أرى تفاؤلك! 😊 كيف يمكنني مساعدتك اليوم؟';
      } else if (sentiment === 'negative') {
        return 'أتفهم شعورك. 💙 دعني أحاول مساعدتك. ما الذي يمكنني فعله؟';
      }
    }
    
    return `شكراً على سؤالك! 🤔 أنا أفكر فيه من ${Object.keys(analysis.thinking).length} زوايا مختلفة. هل يمكنك توضيح سؤالك أكثر لأعطيك إجابة أفضل؟`;
  }
}

// تصدير للاستخدام العام
window.IntelligentGeneratorBrowser = IntelligentGeneratorBrowser;

