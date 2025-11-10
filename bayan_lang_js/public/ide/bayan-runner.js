// Bayan Runner JavaScript

// Examples
const examples = {
    'hello': `// مثال: مرحباً بالعالم
اطبع('مرحباً بالعالم!');
اطبع('Hello World!');`,

    'variables': `// مثال: المتغيرات
متغير اسم = 'أحمد';
متغير عمر = 25;
متغير مدينة = 'الرياض';

اطبع('الاسم: ' + اسم);
اطبع('العمر: ' + عمر);
اطبع('المدينة: ' + مدينة);`,

    'loop': `// مثال: الحلقات
اطبع('عد من 1 إلى 10:');

لكل (متغير i = 1; i <= 10; i++) {
    اطبع(i);
}`,

    'function': `// مثال: الدوال
دالة جمع(أ, ب) {
    ارجع أ + ب;
}

دالة ضرب(أ, ب) {
    ارجع أ * ب;
}

متغير نتيجة1 = جمع(5, 3);
متغير نتيجة2 = ضرب(4, 7);

اطبع('5 + 3 = ' + نتيجة1);
اطبع('4 × 7 = ' + نتيجة2);`,

    'baserah': `// مثال: نظام بصيرة AI
متغير كرة = معادلة_أم('كرة');
كرة.خاصية_ثابتة('لون', 'أبيض');
كرة.خاصية_ثابتة('نصف_قطر', 10);
كرة.حالة('موقع', 'أرض');
كرة.حالة('سرعة', 0);

اطبع('الكرة:');
اطبع('اللون: ' + كرة.خاصية('لون'));
اطبع('الموقع: ' + كرة.حالة('موقع'));

// تطبيق مشغل الانتقال
انتقل(كرة, 'أرض', 'هواء');
اطبع('الموقع الجديد: ' + كرة.حالة('موقع'));`
};

// Load example
function loadExample(name) {
    const editor = document.getElementById('code-editor');
    if (examples[name]) {
        editor.value = examples[name];
        showStatus('تم تحميل المثال! / Example loaded!', 'info');
    }
}

// Clear editor
function clearEditor() {
    if (confirm('هل تريد مسح الكود؟ / Clear code?')) {
        document.getElementById('code-editor').value = '';
        document.getElementById('output').textContent = 'تم المسح / Cleared';
        showStatus('تم مسح المحرر / Editor cleared', 'info');
    }
}

// Save code
function saveCode() {
    const code = document.getElementById('code-editor').value;
    if (!code.trim()) {
        showStatus('لا يوجد كود للحفظ! / No code to save!', 'error');
        return;
    }
    
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bayan-code-${Date.now()}.bn`;
    a.click();
    URL.revokeObjectURL(url);
    
    showStatus('✅ تم حفظ الكود! / Code saved!', 'success');
}

// Show status message
function showStatus(message, type) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.className = `status ${type}`;
    status.style.display = 'block';
    
    setTimeout(() => {
        status.style.display = 'none';
    }, 3000);
}

// Compile code (translate to JavaScript)
function compileCode() {
    const code = document.getElementById('code-editor').value;
    const output = document.getElementById('output');
    
    if (!code.trim()) {
        showStatus('لا يوجد كود للترجمة! / No code to compile!', 'error');
        return;
    }
    
    try {
        // Simple translation (this is a simplified version)
        let jsCode = translateBayanToJS(code);
        
        output.textContent = '// Compiled JavaScript:\n\n' + jsCode;
        showStatus('✅ تمت الترجمة بنجاح! / Compiled successfully!', 'success');
    } catch (error) {
        output.textContent = '❌ خطأ في الترجمة / Compilation Error:\n\n' + error.message;
        showStatus('❌ فشلت الترجمة / Compilation failed', 'error');
    }
}

// Run code
function runCode() {
    const code = document.getElementById('code-editor').value;
    const output = document.getElementById('output');
    
    if (!code.trim()) {
        showStatus('لا يوجد كود للتشغيل! / No code to run!', 'error');
        return;
    }
    
    try {
        // Clear output
        output.textContent = '';
        
        // Translate Bayan to JavaScript
        let jsCode = translateBayanToJS(code);
        
        // Capture console.log output
        const logs = [];
        const originalLog = console.log;
        console.log = function(...args) {
            logs.push(args.map(arg => String(arg)).join(' '));
            originalLog.apply(console, args);
        };
        
        // Execute the code
        try {
            eval(jsCode);
            
            // Display output
            if (logs.length > 0) {
                output.textContent = logs.join('\n');
            } else {
                output.textContent = '✅ تم التنفيذ بنجاح (لا يوجد مخرجات)\n✅ Executed successfully (no output)';
            }
            
            showStatus('✅ تم التشغيل بنجاح! / Executed successfully!', 'success');
        } finally {
            // Restore console.log
            console.log = originalLog;
        }
    } catch (error) {
        output.textContent = '❌ خطأ في التنفيذ / Runtime Error:\n\n' + error.message + '\n\n' + error.stack;
        showStatus('❌ فشل التشغيل / Execution failed', 'error');
    }
}

// Simple Bayan to JavaScript translator
function translateBayanToJS(code) {
    let js = code;

    // Comments - preserve them
    js = js.replace(/\/\/ (.*)/g, '// $1');

    // Built-in functions - MUST BE BEFORE KEYWORDS to avoid conflicts
    js = js.replace(/اطبع/g, '__bayan_print');

    // Keywords
    js = js.replace(/متغير/g, 'let');
    js = js.replace(/ثابت/g, 'const');
    js = js.replace(/دالة/g, 'function');
    js = js.replace(/ارجع/g, 'return');
    js = js.replace(/إذا/g, 'if');
    js = js.replace(/وإلا/g, 'else');
    js = js.replace(/لكل/g, 'for');
    js = js.replace(/بينما/g, 'while');
    js = js.replace(/صنف/g, 'class');
    js = js.replace(/جديد/g, 'new');
    js = js.replace(/هذا/g, 'this');
    js = js.replace(/صحيح/g, 'true');
    js = js.replace(/خطأ/g, 'false');
    js = js.replace(/لاشيء/g, 'null');

    // Baserah AI - Mother Equation
    js = js.replace(/معادلة_أم/g, '__mother_equation');

    // Baserah AI - Operators
    js = js.replace(/انتقل/g, '__go_operator');
    js = js.replace(/أثر/g, '__affect_operator');
    js = js.replace(/ارتبط/g, '__bond_operator');
    js = js.replace(/تحول/g, '__transform_operator');
    
    // Add Baserah AI runtime
    const baserahRuntime = `
// Bayan Runtime - وقت تشغيل البيان

// Print function - دالة الطباعة
function __bayan_print(...args) {
    console.log(...args);
}

// Baserah AI Runtime - وقت تشغيل بصيرة AI
class __MotherEquation {
    constructor(id) {
        this.id = id;
        this.properties = new Map();
        this.states = new Map();
        this.history = [];
    }

    خاصية_ثابتة(key, value) {
        this.properties.set(key, value);
    }

    خاصية(key) {
        return this.properties.get(key);
    }

    حالة(key, value) {
        if (value !== undefined) {
            this.states.set(key, value);
            this.history.push({ time: Date.now(), states: new Map(this.states) });
        }
        return this.states.get(key);
    }
}

function __mother_equation(id) {
    return new __MotherEquation(id);
}

function __go_operator(obj, from, to) {
    if (obj && obj.حالة) {
        obj.حالة('موقع', to);
        __bayan_print(\`✅ انتقل \${obj.id} من \${from} إلى \${to}\`);
    }
}

function __affect_operator(source, target, property, value) {
    if (target && target.حالة) {
        target.حالة(property, value);
        __bayan_print(\`✅ أثر \${source.id} على \${target.id}\`);
    }
}

function __bond_operator(obj1, obj2, bondType) {
    __bayan_print(\`✅ ارتبط \${obj1.id} مع \${obj2.id} بنوع \${bondType}\`);
}

function __transform_operator(obj, property, newValue) {
    if (obj && obj.حالة) {
        const oldValue = obj.حالة(property);
        obj.حالة(property, newValue);
        __bayan_print(\`✅ تحول \${obj.id}: \${property} من \${oldValue} إلى \${newValue}\`);
    }
}

`;

    return baserahRuntime + '\n' + js;
}

// Open in Visual IDE - فتح في IDE المرئي
function openInVisualIDE() {
    const code = document.getElementById('code-editor').value;

    if (code.trim()) {
        // Save code to localStorage
        localStorage.setItem('bayanCodeFromRunner', code);

        // Show info message
        alert('💡 ملاحظة: IDE المرئي يعمل بالكتل المرئية فقط.\nالكود النصي سيتم حفظه للرجوع إليه.\n\n💡 Note: Visual IDE works with visual blocks only.\nText code will be saved for reference.');
    }

    // Open Visual IDE
    window.location.href = 'visual-ide.html';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check if there's code from Visual IDE
    const savedCode = localStorage.getItem('bayanCode');
    if (savedCode) {
        // Load the code into editor
        document.getElementById('code-editor').value = savedCode;

        // Clear localStorage
        localStorage.removeItem('bayanCode');

        // Show success message
        showStatus('✅ تم تحميل الكود من IDE المرئي! / Code loaded from Visual IDE!', 'success');
    } else {
        showStatus('مرحباً! اكتب كود البيان وانقر "تشغيل" / Welcome! Write Bayan code and click "Run"', 'info');
    }
});

