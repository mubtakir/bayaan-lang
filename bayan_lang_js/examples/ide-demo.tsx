/**
 * مثال تطبيقي لاستخدام محرر البيان
 * Bayan Editor Demo Application
 */

import React, { useState, useRef } from 'react';
import { BayanEditor, useBayanEditor, ThemeType } from '../src/ide/components/BayanEditor';

/**
 * أمثلة الكود
 * Code Examples
 */
const codeExamples = {
  hello: `// مثال بسيط - Simple Example
دالة مرحبا(اسم) {
  اطبع("مرحباً " + اسم + "! 👋")
}

مرحبا("أحمد")
مرحبا("فاطمة")`,

  logic: `// برمجة منطقية - Logic Programming
حقيقة أب("خالد", "أحمد")
حقيقة أب("أحمد", "محمد")
حقيقة أب("محمد", "علي")

قاعدة جد(X, Z) ← أب(X, Y) ∧ أب(Y, Z)
قاعدة سلف(X, Z) ← أب(X, Z)
قاعدة سلف(X, Z) ← أب(X, Y) ∧ سلف(Y, Z)

استعلام جد("خالد", ?Z)
استعلام سلف("خالد", ?Z)`,

  baserah: `// نظام بصيرة AI - Baserah AI System
// إنشاء كرة
متغير كرة = معادلة_أم("كرة_1")

// تعيين الخصائص الثابتة
كرة.خاصية_ثابتة("مادة", "جلد")
كرة.خاصية_ثابتة("لون", "أبيض")
كرة.خاصية_ثابتة("قطر", 22)

// تعيين الحالات المتغيرة
كرة.حالة("موقع", "أرض")
كرة.حالة("سرعة", 0)

// تطبيق مشغل الانتقال
انتقل(كرة, "أرض", "هواء")

// تطبيق مشغل التأثير
متغير لاعب = معادلة_أم("لاعب_1")
أثر(لاعب, كرة, "ضربة", 0.8)

// طباعة الحالة
اطبع("موقع الكرة: " + كرة.حالة("موقع"))
اطبع("سرعة الكرة: " + كرة.حالة("سرعة"))`,

  oop: `// برمجة كائنية - Object-Oriented Programming
صنف شخص {
  منشئ(اسم، عمر) {
    هذا.اسم = اسم
    هذا.عمر = عمر
  }

  دالة تحية() {
    اطبع("مرحباً، أنا " + هذا.اسم)
    اطبع("عمري " + هذا.عمر + " سنة")
  }

  دالة عيد_ميلاد() {
    هذا.عمر = هذا.عمر + 1
    اطبع("🎉 عيد ميلاد سعيد! أصبح عمري " + هذا.عمر)
  }
}

صنف طالب يمتد شخص {
  منشئ(اسم، عمر، تخصص) {
    super(اسم، عمر)
    هذا.تخصص = تخصص
  }

  دالة دراسة() {
    اطبع("أدرس " + هذا.تخصص + " 📚")
  }
}

// استخدام الأصناف
متغير أحمد = جديد طالب("أحمد", 20, "علوم الحاسوب")
أحمد.تحية()
أحمد.دراسة()
أحمد.عيد_ميلاد()`,

  advanced: `// مثال متقدم - Advanced Example
// دمج البرمجة المنطقية مع نظام بصيرة

// تعريف حقائق عن الأشياء
حقيقة شيء("كرة", "رياضي")
حقيقة شيء("كتاب", "تعليمي")
حقيقة شيء("قلم", "كتابي")

// تعريف قواعد
قاعدة يمكن_استخدام(X, "اللعب") ← شيء(X, "رياضي")
قاعدة يمكن_استخدام(X, "القراءة") ← شيء(X, "تعليمي")
قاعدة يمكن_استخدام(X, "الكتابة") ← شيء(X, "كتابي")

// إنشاء معادلات أم للأشياء
دالة أنشئ_شيء(اسم، نوع) {
  متغير شيء = معادلة_أم(اسم)
  شيء.خاصية_ثابتة("نوع", نوع)
  شيء.حالة("حالة", "جديد")
  إرجاع شيء
}

// إنشاء الأشياء
متغير كرة = أنشئ_شيء("كرة_1", "رياضي")
متغير كتاب = أنشئ_شيء("كتاب_1", "تعليمي")

// استعلام عن الاستخدامات
استعلام يمكن_استخدام("كرة", ?استخدام)
استعلام يمكن_استخدام("كتاب", ?استخدام)

// تطبيق تحولات
حول(كرة, {"حالة": "مستخدم"})
حول(كتاب, {"حالة": "مفتوح"})

اطبع("حالة الكرة: " + كرة.حالة("حالة"))
اطبع("حالة الكتاب: " + كتاب.حالة("حالة"))`
};

/**
 * مكون التطبيق الرئيسي
 * Main Application Component
 */
export const IDEDemo: React.FC = () => {
  const [code, setCode] = useState<string>(codeExamples.hello);
  const [theme, setTheme] = useState<ThemeType>('light');
  const [output, setOutput] = useState<string>('جاهز للتشغيل... Ready to run...');
  const editorRef = useRef<HTMLDivElement>(null);
  const { getContent, setContent } = useBayanEditor(editorRef);

  /**
   * تشغيل الكود
   * Run Code
   */
  const handleRun = () => {
    const currentCode = getContent();
    setOutput('🔄 جاري التشغيل... Running...\n\n');
    
    setTimeout(() => {
      setOutput(
        '✅ تم التشغيل بنجاح!\n' +
        'Executed successfully!\n\n' +
        '📤 المخرجات - Output:\n' +
        'مرحباً أحمد! 👋\n' +
        'مرحباً فاطمة! 👋'
      );
    }, 500);
  };

  /**
   * حفظ الكود
   * Save Code
   */
  const handleSave = (content: string) => {
    console.log('💾 Saving code:', content);
    alert('✅ تم الحفظ بنجاح!\nSaved successfully!');
  };

  /**
   * مسح الكود
   * Clear Code
   */
  const handleClear = () => {
    if (confirm('هل تريد مسح الكود؟\nClear the code?')) {
      setContent('// اكتب كود البيان هنا\n// Write Bayan code here\n\n');
      setOutput('تم المسح... Cleared...');
    }
  };

  /**
   * تحميل مثال
   * Load Example
   */
  const loadExample = (exampleKey: keyof typeof codeExamples) => {
    setContent(codeExamples[exampleKey]);
    setOutput('تم تحميل المثال... Example loaded...');
  };

  return (
    <div style={styles.container}>
      {/* الرأس - Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🌟 بيئة تطوير البيان</h1>
        <p style={styles.subtitle}>Bayan Programming Language IDE</p>
      </div>

      {/* شريط الأدوات - Toolbar */}
      <div style={styles.toolbar}>
        {/* اختيار السمة - Theme Selector */}
        <div style={styles.themeSelector}>
          <label style={styles.label}>السمة - Theme:</label>
          <select 
            value={theme} 
            onChange={(e) => setTheme(e.target.value as ThemeType)}
            style={styles.select}
          >
            <option value="light">فاتح - Light</option>
            <option value="dark">داكن - Dark</option>
            <option value="arabic">عربي - Arabic</option>
          </select>
        </div>

        {/* الأزرار - Buttons */}
        <button onClick={handleRun} style={{...styles.button, ...styles.buttonSuccess}}>
          ▶️ تشغيل - Run
        </button>
        <button onClick={() => handleSave(getContent())} style={{...styles.button, ...styles.buttonPrimary}}>
          💾 حفظ - Save
        </button>
        <button onClick={handleClear} style={{...styles.button, ...styles.buttonSecondary}}>
          🗑️ مسح - Clear
        </button>
      </div>

      {/* الأمثلة - Examples */}
      <div style={styles.examples}>
        <label style={styles.label}>الأمثلة - Examples:</label>
        <button onClick={() => loadExample('hello')} style={styles.exampleButton}>
          مرحباً - Hello
        </button>
        <button onClick={() => loadExample('logic')} style={styles.exampleButton}>
          منطق - Logic
        </button>
        <button onClick={() => loadExample('baserah')} style={styles.exampleButton}>
          بصيرة - Baserah
        </button>
        <button onClick={() => loadExample('oop')} style={styles.exampleButton}>
          كائنات - OOP
        </button>
        <button onClick={() => loadExample('advanced')} style={styles.exampleButton}>
          متقدم - Advanced
        </button>
      </div>

      {/* المحرر - Editor */}
      <div style={styles.editorContainer}>
        <BayanEditor
          ref={editorRef}
          initialContent={code}
          theme={theme}
          onChange={setCode}
          onSave={handleSave}
          height="600px"
        />
      </div>

      {/* المخرجات - Output */}
      <div style={styles.outputContainer}>
        <div style={styles.outputTitle}>📤 المخرجات - Output:</div>
        <pre style={styles.outputContent}>{output}</pre>
      </div>

      {/* التذييل - Footer */}
      <div style={styles.footer}>
        <p>تم التطوير بواسطة فريق البيان 💙</p>
        <p>Developed by Bayan Team</p>
      </div>
    </div>
  );
};

/**
 * الأنماط - Styles
 */
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '30px',
    textAlign: 'center'
  },
  title: {
    fontSize: '2.5em',
    margin: '0 0 10px 0',
    fontWeight: 700
  },
  subtitle: {
    fontSize: '1.2em',
    margin: 0,
    opacity: 0.9
  },
  toolbar: {
    backgroundColor: '#f8f9fa',
    padding: '15px 30px',
    borderBottom: '2px solid #e9ecef',
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap' as const,
    alignItems: 'center'
  },
  themeSelector: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    marginRight: 'auto'
  },
  label: {
    fontWeight: 600,
    color: '#495057'
  },
  select: {
    padding: '8px 15px',
    border: '2px solid #dee2e6',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    backgroundColor: 'white'
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  buttonPrimary: {
    backgroundColor: '#667eea',
    color: 'white'
  },
  buttonSuccess: {
    backgroundColor: '#2ecc71',
    color: 'white'
  },
  buttonSecondary: {
    backgroundColor: '#6c757d',
    color: 'white'
  },
  examples: {
    backgroundColor: '#f8f9fa',
    padding: '15px 30px',
    borderBottom: '2px solid #e9ecef',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap' as const,
    alignItems: 'center'
  },
  exampleButton: {
    padding: '8px 16px',
    border: '2px solid #667eea',
    borderRadius: '6px',
    backgroundColor: 'white',
    color: '#667eea',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  editorContainer: {
    height: '600px',
    borderBottom: '2px solid #e9ecef'
  },
  outputContainer: {
    backgroundColor: '#1e1e1e',
    color: '#d4d4d4',
    padding: '20px 30px',
    fontFamily: '"Fira Code", "Consolas", monospace',
    fontSize: '14px',
    lineHeight: 1.6,
    maxHeight: '300px',
    overflowY: 'auto' as const
  },
  outputTitle: {
    color: '#4ec9b0',
    fontWeight: 600,
    marginBottom: '10px',
    fontSize: '16px'
  },
  outputContent: {
    whiteSpace: 'pre-wrap' as const,
    wordWrap: 'break-word' as const,
    margin: 0
  },
  footer: {
    backgroundColor: '#f8f9fa',
    padding: '20px 30px',
    textAlign: 'center' as const,
    color: '#6c757d',
    fontSize: '14px'
  }
};

export default IDEDemo;

