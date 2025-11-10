/**
 * المساعد الذكي للمحرر - نسخة JavaScript
 * AI Assistant for Editor - JavaScript Version
 * 
 * @author Basel Yahya Abdullah
 */

class AIAssistantJS {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = {
      position: options.position || 'right',
      width: options.width || '400px',
      onInsertCode: options.onInsertCode || null,
      onReplaceCode: options.onReplaceCode || null,
      getCurrentCode: options.getCurrentCode || (() => ''),
      apiUrl: options.apiUrl || 'http://localhost:3001'
    };

    this.messages = [];
    this.isVisible = true;
    this.isTyping = false;
    this.suggestions = [];
    this.conversationHistory = [];

    // تهيئة المولد الذكي (احتياطي)
    this.intelligentGenerator = new IntelligentGeneratorBrowser();
    this.useRealAPI = true; // استخدام API الحقيقي
    this.apiConnected = false;
    console.log('🧠 المساعد الذكي جاهز - سيتصل بالخادم الحقيقي على', this.options.apiUrl);

    this.checkAPIConnection();
    this.init();
  }

  /**
   * فحص اتصال API
   */
  async checkAPIConnection() {
    try {
      const response = await fetch(`${this.options.apiUrl}/api/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        this.apiConnected = true;
        console.log('✅ متصل بالخادم الذكي الحقيقي');
      } else {
        throw new Error('فشل الاتصال');
      }
    } catch (error) {
      this.apiConnected = false;
      this.useRealAPI = false;
      console.warn('⚠️ لم يتم الاتصال بالخادم - سيتم استخدام النظام الاحتياطي');
      console.warn('💡 لتشغيل الخادم: npx ts-node src/api/intelligentAssistantServer.ts');
    }
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    const html = `
      <div class="ai-assistant ${this.isVisible ? 'visible' : 'hidden'}" style="
        width: ${this.options.width};
        height: 100%;
        display: flex;
        flex-direction: column;
        background: #f8f9fa;
        border-left: 1px solid #dee2e6;
        font-family: 'Cairo', sans-serif;
      ">
        <!-- Header -->
        <div class="ai-header" style="
          padding: 15px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
        ">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 24px;">🤖</span>
            <div>
              <h3 style="margin: 0; font-size: 16px;">المساعد الذكي</h3>
              <p style="margin: 0; font-size: 12px; opacity: 0.9;">AI Assistant</p>
            </div>
          </div>
          <button id="ai-toggle" style="
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
          ">
            ✕
          </button>
        </div>

        <!-- Messages -->
        <div id="ai-messages" class="ai-messages" style="
          flex: 1;
          overflow-y: auto;
          padding: 15px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        ">
          <div class="message system" style="
            padding: 10px;
            background: #e3f2fd;
            border-radius: 8px;
            font-size: 14px;
          ">
            مرحباً! 👋 أنا مساعدك الذكي المتطور.<br><br>
            <strong>🧠 مبني على نظام ذكاء اصطناعي كامل:</strong><br>
            • 16 طبقة تفكير متقدمة<br>
            • نموذج لغوي توليدي بدون شبكات عصبية<br>
            • 3 نظريات ثورية (ثنائية الصفر، تعامد الأضداد، الفتائل اللغوية)<br><br>
            <strong>💬 يمكنني التحاور معك في:</strong><br>
            • 🔬 <strong>العلوم:</strong> فيزياء، كيمياء، أحياء، رياضيات<br>
            • 📖 <strong>الثقافة:</strong> أدب، تاريخ، فلسفة<br>
            • 💭 <strong>الحياة:</strong> صحة، علاقات، مهارات<br>
            • 💻 <strong>التقنية:</strong> برمجة، ذكاء اصطناعي، تطوير<br>
            • ✨ <strong>البرمجة:</strong> كتابة كود، إصلاح أخطاء، تحسين أداء<br><br>
            <strong>اسألني عن أي شيء!</strong> سواء كان علمياً، ثقافياً، حياتياً، أو برمجياً 😊
          </div>
        </div>

        <!-- Suggestions -->
        <div id="ai-suggestions" class="ai-suggestions" style="
          padding: 10px;
          background: #f0f9ff;
          border-top: 1px solid #e5e7eb;
          display: none;
        ">
          <div style="font-size: 12px; color: #667eea; font-weight: 600; margin-bottom: 8px;">
            💡 اقتراحات:
          </div>
          <div id="suggestions-list" style="display: flex; flex-wrap: wrap; gap: 8px;"></div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions" style="
          padding: 10px;
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
          border-top: 1px solid #dee2e6;
        ">
          <button class="quick-btn" data-action="about" style="
            padding: 5px 10px;
            background: #e3f2fd;
            border: 1px solid #90caf9;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
            font-family: 'Cairo', sans-serif;
          ">
            📖 عن البيان
          </button>
          <button class="quick-btn" data-action="philosophy" style="
            padding: 5px 10px;
            background: #f3e5f5;
            border: 1px solid #ce93d8;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
            font-family: 'Cairo', sans-serif;
          ">
            🧠 الفلسفة
          </button>
          <button class="quick-btn" data-action="learn" style="
            padding: 5px 10px;
            background: #fff3e0;
            border: 1px solid #ffb74d;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
            font-family: 'Cairo', sans-serif;
          ">
            🎓 التعلم
          </button>
          <button class="quick-btn" data-action="generate" style="
            padding: 5px 10px;
            background: #e8f5e9;
            border: 1px solid #81c784;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
            font-family: 'Cairo', sans-serif;
          ">
            ✨ توليد كود
          </button>
          <button class="quick-btn" data-action="science" style="
            padding: 5px 10px;
            background: #e1f5fe;
            border: 1px solid #4fc3f7;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
            font-family: 'Cairo', sans-serif;
          ">
            🔬 علوم
          </button>
          <button class="quick-btn" data-action="culture" style="
            padding: 5px 10px;
            background: #fce4ec;
            border: 1px solid #f48fb1;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
            font-family: 'Cairo', sans-serif;
          ">
            📚 ثقافة
          </button>
          <button class="quick-btn" data-action="life" style="
            padding: 5px 10px;
            background: #f1f8e9;
            border: 1px solid #aed581;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
            font-family: 'Cairo', sans-serif;
          ">
            💭 حياة
          </button>
          <button class="quick-btn" data-action="comment" style="
            padding: 5px 10px;
            background: #f3e5f5;
            border: 1px solid #ba68c8;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
            font-family: 'Cairo', sans-serif;
          ">
            💬 أضف تعليقات
          </button>
        </div>

        <!-- Input -->
        <div class="ai-input-container" style="
          padding: 15px;
          border-top: 1px solid #dee2e6;
          background: white;
        ">
          <div style="display: flex; gap: 10px;">
            <input 
              type="text" 
              id="ai-input" 
              placeholder="اكتب سؤالك أو طلبك هنا..."
              style="
                flex: 1;
                padding: 10px;
                border: 1px solid #dee2e6;
                border-radius: 5px;
                font-family: 'Cairo', sans-serif;
                font-size: 14px;
              "
            />
            <button id="ai-send" style="
              padding: 10px 20px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              font-family: 'Cairo', sans-serif;
              font-weight: bold;
            ">
              إرسال
            </button>
          </div>
        </div>
      </div>
    `;

    this.container.innerHTML = html;
  }

  attachEventListeners() {
    // Toggle button
    const toggleBtn = document.getElementById('ai-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggle());
    }

    // Send button
    const sendBtn = document.getElementById('ai-send');
    const input = document.getElementById('ai-input');
    
    if (sendBtn && input) {
      sendBtn.addEventListener('click', () => this.sendMessage());
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.sendMessage();
      });
    }

    // Quick action buttons
    const quickBtns = document.querySelectorAll('.quick-btn');
    quickBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.getAttribute('data-action');
        this.handleQuickAction(action);
      });
    });
  }

  async sendMessage() {
    const input = document.getElementById('ai-input');
    const message = input.value.trim();

    if (!message) return;

    // Add user message
    this.addMessage('user', message);
    input.value = '';

    // Show typing indicator
    this.showTyping();

    try {
      let result;

      // محاولة استخدام API الحقيقي أولاً
      if (this.useRealAPI && this.apiConnected) {
        try {
          result = await this.sendToRealAPI(message);
          console.log('✅ تم استخدام الخادم الذكي الحقيقي');
        } catch (apiError) {
          console.warn('⚠️ فشل الاتصال بالخادم - التحول للنظام الاحتياطي');
          this.apiConnected = false;
          result = await this.intelligentGenerator.processWithThinking(message);
        }
      } else {
        // استخدام النظام الاحتياطي
        result = await this.intelligentGenerator.processWithThinking(message);
        console.log('ℹ️ تم استخدام النظام الاحتياطي');
      }

      this.hideTyping();

      // عرض الرد
      let responseText = result.response || result.text || 'لا يوجد رد';

      // إضافة معلومات التحليل إذا كانت مفيدة
      const thinkingResults = result.thinking || result.thinkingResults || {};
      if (Object.keys(thinkingResults).length > 0) {
        const thinkingInfo = `\n\n🧠 تم التحليل بـ ${Object.keys(thinkingResults).length} طبقة تفكير`;
        responseText += thinkingInfo;
      }

      // إضافة معلومات الثقة
      if (result.confidence) {
        const confidencePercent = Math.round(result.confidence * 100);
        responseText += `\n💯 مستوى الثقة: ${confidencePercent}%`;
      }

      this.addMessage('assistant', responseText);

      // توليد اقتراحات ذكية بناءً على الفئات
      const categories = result.categories || [];
      const suggestions = this.generateSmartSuggestions(categories, message);
      this.updateSuggestions(suggestions);

    } catch (error) {
      this.hideTyping();
      console.error('خطأ في المعالجة:', error);
      this.addMessage('assistant', 'عذراً، حدث خطأ في المعالجة. حاول مرة أخرى.');
    }
  }

  /**
   * إرسال رسالة إلى API الحقيقي
   */
  async sendToRealAPI(message) {
    const response = await fetch(`${this.options.apiUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'فشل في المعالجة');
    }

    return data.response;
  }

  generateResponse(message, code) {
    // استجابات بسيطة للتجربة
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('اشرح') || lowerMessage.includes('explain')) {
      return `هذا الكود يحتوي على:\n• ${code.split('\n').length} سطر\n• ${(code.match(/دالة|function/g) || []).length} دالة\n• ${(code.match(/متغير|var|let|const/g) || []).length} متغير`;
    } else if (lowerMessage.includes('دالة') || lowerMessage.includes('function')) {
      return '```bayan\nدالة مثال(معامل) {\n    // كود الدالة هنا\n    ارجع معامل * 2؛\n}\n```';
    } else if (lowerMessage.includes('حلقة') || lowerMessage.includes('loop')) {
      return '```bayan\nلكل (متغير i = 0؛ i < 10؛ i++) {\n    اطبع(i)؛\n}\n```';
    } else if (lowerMessage.includes('صنف') || lowerMessage.includes('class')) {
      return '```bayan\nصنف مثال {\n    متغير خاصية؛\n    \n    دالة دالة_مثال() {\n        // كود هنا\n    }\n}\n```';
    }
    
    return 'شكراً على سؤالك! كيف يمكنني مساعدتك في كتابة كود البيان؟';
  }

  addMessage(role, content) {
    const messagesContainer = document.getElementById('ai-messages');
    if (!messagesContainer) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    
    const bgColor = role === 'user' ? '#e3f2fd' : '#f1f8e9';
    const align = role === 'user' ? 'flex-end' : 'flex-start';
    
    messageDiv.style.cssText = `
      padding: 10px;
      background: ${bgColor};
      border-radius: 8px;
      font-size: 14px;
      align-self: ${align};
      max-width: 80%;
    `;

    // Extract code if present
    const codeMatch = content.match(/```(?:bayan|javascript)?\n([\s\S]*?)```/);
    if (codeMatch) {
      const textPart = content.replace(/```(?:bayan|javascript)?\n[\s\S]*?```/, '').trim();
      const codePart = codeMatch[1].trim();
      
      messageDiv.innerHTML = `
        ${textPart ? `<p style="margin: 0 0 10px 0;">${textPart}</p>` : ''}
        <pre style="
          background: #2d2d2d;
          color: #f8f8f2;
          padding: 10px;
          border-radius: 5px;
          overflow-x: auto;
          margin: 0;
          font-family: 'Fira Code', monospace;
          font-size: 12px;
        ">${this.escapeHtml(codePart)}</pre>
        <div style="margin-top: 10px; display: flex; gap: 5px;">
          <button onclick="aiAssistant.insertCode(\`${this.escapeJs(codePart)}\`)" style="
            padding: 5px 10px;
            background: #4caf50;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            font-size: 11px;
          ">إدراج</button>
          <button onclick="aiAssistant.replaceCode(\`${this.escapeJs(codePart)}\`)" style="
            padding: 5px 10px;
            background: #2196f3;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            font-size: 11px;
          ">استبدال</button>
        </div>
      `;
    } else {
      messageDiv.textContent = content;
    }

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  showTyping() {
    const messagesContainer = document.getElementById('ai-messages');
    if (!messagesContainer) return;

    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.style.cssText = `
      padding: 10px;
      background: #f1f8e9;
      border-radius: 8px;
      font-size: 14px;
      align-self: flex-start;
      max-width: 80%;
    `;
    typingDiv.textContent = '⌛ جاري الكتابة...';

    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  hideTyping() {
    const typingDiv = document.getElementById('typing-indicator');
    if (typingDiv) typingDiv.remove();
  }

  handleQuickAction(action) {
    const actions = {
      about: 'ما هي لغة البيان؟',
      philosophy: 'اشرح لي ثنائية الصفر',
      learn: 'كيف أتعلم البيان؟',
      generate: 'اكتب دالة لـ',
      science: 'أخبرني عن الجاذبية',
      culture: 'ما هو الشعر العربي؟',
      life: 'كيف أحسن صحتي؟'
    };

    const input = document.getElementById('ai-input');
    if (input && actions[action]) {
      input.value = actions[action];
      this.sendMessage();
    }
  }

  insertCode(code) {
    if (this.options.onInsertCode) {
      this.options.onInsertCode(code);
    }
  }

  replaceCode(code) {
    if (this.options.onReplaceCode) {
      this.options.onReplaceCode(code);
    }
  }

  toggle() {
    this.isVisible = !this.isVisible;
    this.container.style.display = this.isVisible ? 'block' : 'none';
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  escapeJs(text) {
    return text.replace(/`/g, '\\`').replace(/\$/g, '\\$');
  }

  // محرك المحادثة العامة
  detectConversationType(message) {
    const msg = message.toLowerCase();

    // كلمات مفتاحية لكل نوع
    const keywords = {
      bayan_language: ['لغة البيان', 'البيان', 'bayan', 'ميزات', 'features'],
      philosophy: ['ثنائية الصفر', 'تعامد الأضداد', 'الفتائل', 'النظرية', 'الفلسفة'],
      learning: ['تعلم', 'علمني', 'مسار', 'تدريب', 'learn', 'teach'],
      technical: ['طبقات التفكير', 'الذكاء الاصطناعي', 'المحرك', 'النظام'],
      programming: ['خوارزمية', 'برمجة', 'algorithm', 'programming'],
      code_help: ['اكتب', 'دالة', 'صنف', 'برنامج', 'function', 'class']
    };

    for (const [type, words] of Object.entries(keywords)) {
      if (words.some(word => msg.includes(word))) {
        return type;
      }
    }

    return 'general';
  }

  generateConversationResponse(message, type) {
    const responses = {
      bayan_language: {
        'ما هي لغة البيان': 'لغة البيان هي لغة برمجة ثورية ثنائية اللغة (عربي/إنجليزي) طورها باسل يحيى عبدالله بعد 40 عاماً من البحث في الذكاء الاصطناعي. تدعم البرمجة الإجرائية والكائنية والمنطقية.',
        'ميزات': '• ثنائية اللغة: عربي وإنجليزي في نفس الملف\n• متعددة النماذج: إجرائية + كائنية + منطقية\n• ذكاء اصطناعي مدمج: نموذج لغوي بدون شبكات عصبية\n• 16 طبقة تفكير متقدمة\n• نظريات ثورية: ثنائية الصفر، تعامد الأضداد، الفتائل اللغوية',
        'كيف أبدأ': '1. افتح المحرر\n2. اكتب كودك بالعربية أو الإنجليزية\n3. استخدم المساعد الذكي للمساعدة\n4. شغّل الكود واختبره\n\nمثال:\nدالة مرحبا() {\n    اطبع("مرحباً بك!")؛\n}\nمرحبا()؛'
      },
      philosophy: {
        'ثنائية الصفر': 'نظرية ثنائية الصفر: كل كلمة لها نقطة صفر - توازن بين المعاني المتضادة. مثلاً "حار" و "بارد" لهما نقطة صفر هي "معتدل". هذه النظرية تساعد الذكاء الاصطناعي على فهم المعاني بعمق.\n\nمثال: حار ←→ معتدل ←→ بارد',
        'تعامد الأضداد': 'نظرية تعامد الأضداد: الأضداد لا تكون على خط واحد، بل في فضاء متعدد الأبعاد. مثلاً "كبير/صغير" متعامد مع "طويل/قصير".\n\nمثال: كبير/صغير ⊥ طويل/قصير',
        'الفتائل': 'نظرية الفتائل اللغوية: المعاني تتطور عبر خيوط دلالية متصلة. كل كلمة لها "فتيل" من المعاني المرتبطة.\n\nمثال: كتاب → قراءة → علم → معرفة'
      },
      learning: {
        'default': 'مسار تعلم لغة البيان:\n\n📚 المرحلة 1: الأساسيات\n• الكلمات المفتاحية\n• المتغيرات والأنواع\n• العمليات الحسابية\n\n📚 المرحلة 2: البنى التحكمية\n• الشروط والحلقات\n• الدوال\n\n📚 المرحلة 3: البرمجة الكائنية\n• الأصناف والكائنات\n• الوراثة\n\n📚 المرحلة 4: المتقدم\n• البرمجة المنطقية\n• الذكاء الاصطناعي'
      },
      general: {
        'default': 'مرحباً! 👋\n\nأنا المساعد الذكي للغة البيان. يمكنني مساعدتك في:\n\n• الإجابة على أسئلة عن لغة البيان\n• شرح المفاهيم البرمجية\n• النقاش الفلسفي والنظريات\n• التعلم والتدريب\n• كتابة وتوليد الكود\n\nكيف يمكنني مساعدتك اليوم؟'
      }
    };

    // البحث عن رد مناسب
    if (responses[type]) {
      for (const [key, value] of Object.entries(responses[type])) {
        if (message.toLowerCase().includes(key.toLowerCase())) {
          return { text: value, suggestions: this.getSuggestions(type) };
        }
      }
      if (responses[type].default) {
        return { text: responses[type].default, suggestions: this.getSuggestions(type) };
      }
    }

    return {
      text: 'شكراً على سؤالك! يمكنك أن تسألني عن:\n• لغة البيان وميزاتها\n• النظريات الفلسفية\n• كيفية التعلم\n• كتابة الكود',
      suggestions: ['ما هي لغة البيان؟', 'اشرح ثنائية الصفر', 'كيف أتعلم البيان؟']
    };
  }

  getSuggestions(type) {
    const suggestions = {
      bayan_language: ['أخبرني المزيد عن ميزات البيان', 'كيف أبدأ في تعلم البيان؟', 'ما الفرق بين البيان واللغات الأخرى؟'],
      philosophy: ['اشرح لي ثنائية الصفر بمثال', 'كيف تساعد هذه النظريات في الذكاء الاصطناعي؟', 'ما العلاقة بين النظريات الثلاث؟'],
      learning: ['أعطني مثال على المرحلة 1', 'كيف أتقدم للمرحلة التالية؟', 'أريد تمارين عملية'],
      general: ['ما هي لغة البيان؟', 'كيف أبدأ؟', 'ما هي الميزات؟']
    };

    return suggestions[type] || suggestions.general;
  }

  updateSuggestions(suggestions) {
    const suggestionsContainer = document.getElementById('ai-suggestions');
    const suggestionsList = document.getElementById('suggestions-list');

    if (!suggestionsContainer || !suggestionsList) return;

    if (suggestions && suggestions.length > 0) {
      suggestionsList.innerHTML = '';
      suggestions.forEach(suggestion => {
        const btn = document.createElement('button');
        btn.textContent = suggestion;
        btn.style.cssText = `
          padding: 6px 12px;
          background: white;
          color: #667eea;
          border: 1px solid #667eea;
          border-radius: 15px;
          cursor: pointer;
          font-size: 12px;
          font-family: 'Cairo', sans-serif;
        `;
        btn.onclick = () => {
          const input = document.getElementById('ai-input');
          if (input) {
            input.value = suggestion;
          }
        };
        suggestionsList.appendChild(btn);
      });
      suggestionsContainer.style.display = 'block';
    } else {
      suggestionsContainer.style.display = 'none';
    }
  }

  /**
   * توليد اقتراحات ذكية بناءً على الفئات
   */
  generateSmartSuggestions(categories, lastMessage) {
    const suggestions = [];

    if (categories.includes('science')) {
      suggestions.push('أخبرني المزيد عن هذا الموضوع العلمي');
      suggestions.push('ما هي التطبيقات العملية؟');
      suggestions.push('هل هناك اكتشافات حديثة؟');
    }

    if (categories.includes('culture')) {
      suggestions.push('ما رأيك في هذا الموضوع؟');
      suggestions.push('هل لديك أمثلة أخرى؟');
      suggestions.push('كيف أتعمق في هذا المجال؟');
    }

    if (categories.includes('life')) {
      suggestions.push('كيف أطبق هذا في حياتي؟');
      suggestions.push('ما هي النصائح العملية؟');
      suggestions.push('هل لديك تجارب شخصية؟');
    }

    if (categories.includes('technology')) {
      suggestions.push('كيف يعمل هذا تقنياً؟');
      suggestions.push('ما هو المستقبل في هذا المجال؟');
      suggestions.push('هل يمكنني تعلم هذا؟');
    }

    // اقتراحات عامة
    if (suggestions.length === 0) {
      suggestions.push('أخبرني المزيد');
      suggestions.push('هل لديك أمثلة؟');
      suggestions.push('ما رأيك؟');
    }

    return suggestions.slice(0, 3); // أقصى 3 اقتراحات
  }
}

// Global instance
let aiAssistant = null;

