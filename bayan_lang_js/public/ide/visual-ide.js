// Global state
let blocks = [];
let selectedBlock = null;
let blockIdCounter = 0;

// Block templates
const blockTemplates = {
    'print': {
        title: 'اطبع / Print',
        icon: 'fa-print',
        color: '#667eea',
        fields: [
            { name: 'message', label: 'الرسالة / Message', type: 'text', default: 'مرحباً' }
        ],
        generateCode: (data) => `اطبع('${data.message}');`
    },
    'variable': {
        title: 'متغير / Variable',
        icon: 'fa-box',
        color: '#10b981',
        fields: [
            { name: 'name', label: 'الاسم / Name', type: 'text', default: 'x' },
            { name: 'value', label: 'القيمة / Value', type: 'text', default: '0' }
        ],
        generateCode: (data) => `متغير ${data.name} = ${data.value};`
    },
    'function': {
        title: 'دالة / Function',
        icon: 'fa-function',
        color: '#f59e0b',
        fields: [
            { name: 'name', label: 'الاسم / Name', type: 'text', default: 'myFunction' },
            { name: 'params', label: 'المعاملات / Parameters', type: 'text', default: '' },
            { name: 'body', label: 'الجسم / Body', type: 'textarea', default: '// كود هنا' }
        ],
        generateCode: (data) => `دالة ${data.name}(${data.params}) {\n    ${data.body}\n}`
    },
    'if': {
        title: 'إذا / If',
        icon: 'fa-question',
        color: '#8b5cf6',
        fields: [
            { name: 'condition', label: 'الشرط / Condition', type: 'text', default: 'x > 0' },
            { name: 'body', label: 'الجسم / Body', type: 'textarea', default: '// كود هنا' }
        ],
        generateCode: (data) => `إذا (${data.condition}) {\n    ${data.body}\n}`
    },
    'loop': {
        title: 'حلقة / Loop',
        icon: 'fa-sync',
        color: '#ec4899',
        fields: [
            { name: 'variable', label: 'المتغير / Variable', type: 'text', default: 'i' },
            { name: 'start', label: 'البداية / Start', type: 'text', default: '0' },
            { name: 'end', label: 'النهاية / End', type: 'text', default: '10' },
            { name: 'body', label: 'الجسم / Body', type: 'textarea', default: '// كود هنا' }
        ],
        generateCode: (data) => `لكل (متغير ${data.variable} = ${data.start}; ${data.variable} < ${data.end}; ${data.variable}++) {\n    ${data.body}\n}`
    },
    'class': {
        title: 'صنف / Class',
        icon: 'fa-cube',
        color: '#06b6d4',
        fields: [
            { name: 'name', label: 'الاسم / Name', type: 'text', default: 'MyClass' },
            { name: 'properties', label: 'الخصائص / Properties', type: 'textarea', default: '' },
            { name: 'methods', label: 'الدوال / Methods', type: 'textarea', default: '' }
        ],
        generateCode: (data) => `صنف ${data.name} {\n    ${data.properties}\n    ${data.methods}\n}`
    },
    'mother-equation': {
        title: 'معادلة أم / Mother Equation',
        icon: 'fa-equals',
        color: '#ef4444',
        fields: [
            { name: 'id', label: 'المعرف / ID', type: 'text', default: 'obj_1' },
            { name: 'properties', label: 'الخصائص / Properties', type: 'textarea', default: '' }
        ],
        generateCode: (data) => `متغير ${data.id} = معادلة_أم("${data.id}");\n${data.properties}`
    },
    'operator': {
        title: 'مشغل / Operator',
        icon: 'fa-arrows-alt',
        color: '#f97316',
        fields: [
            { name: 'operator', label: 'المشغل / Operator', type: 'select', options: ['انتقل/Go', 'أثر/Affect', 'حول/Transform', 'أنشئ/Create'], default: 'انتقل/Go' },
            { name: 'params', label: 'المعاملات / Parameters', type: 'text', default: '' }
        ],
        generateCode: (data) => {
            const op = data.operator.split('/')[0];
            return `${op}(${data.params});`;
        }
    }
};

// Drag and drop handlers
let draggedType = null;

document.querySelectorAll('.tool-item').forEach(item => {
    item.addEventListener('dragstart', (e) => {
        draggedType = e.target.closest('.tool-item').dataset.type;
        e.dataTransfer.effectAllowed = 'copy';
    });
});

function allowDrop(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
}

function drop(e) {
    e.preventDefault();
    if (draggedType && blockTemplates[draggedType]) {
        createBlock(draggedType, e.clientX, e.clientY);
        draggedType = null;
        
        // Remove empty message
        const emptyMsg = document.querySelector('.canvas-empty');
        if (emptyMsg) {
            emptyMsg.style.display = 'none';
        }
    }
}

// Create block
function createBlock(type, x, y) {
    const template = blockTemplates[type];
    const blockId = `block-${blockIdCounter++}`;
    
    const blockData = {
        id: blockId,
        type: type,
        template: template,
        data: {}
    };
    
    // Initialize data with defaults
    template.fields.forEach(field => {
        blockData.data[field.name] = field.default;
    });
    
    blocks.push(blockData);
    
    // Create DOM element
    const blockEl = document.createElement('div');
    blockEl.className = 'block';
    blockEl.id = blockId;
    blockEl.style.position = 'absolute';
    blockEl.style.left = (x - 300) + 'px';
    blockEl.style.top = (y - 100) + 'px';
    
    blockEl.innerHTML = `
        <div class="block-header">
            <div class="block-title" style="color: ${template.color}">
                <i class="fas ${template.icon}"></i>
                ${template.title}
            </div>
            <div class="block-actions">
                <button class="block-btn" onclick="editBlock('${blockId}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="block-btn" onclick="deleteBlock('${blockId}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="block-content" id="${blockId}-content">
            ${renderBlockContent(blockData)}
        </div>
    `;
    
    // Make draggable
    makeDraggable(blockEl);
    
    // Add to canvas
    const canvas = document.getElementById('canvas');
    canvas.appendChild(blockEl);
    
    updateStats();
}

// Render block content
function renderBlockContent(blockData) {
    let html = '';
    blockData.template.fields.forEach(field => {
        const value = blockData.data[field.name] || field.default;
        html += `
            <div class="block-label">${field.label}:</div>
            ${field.type === 'textarea' 
                ? `<textarea class="block-input" rows="3" onchange="updateBlockData('${blockData.id}', '${field.name}', this.value)">${value}</textarea>`
                : field.type === 'select'
                ? `<select class="block-input" onchange="updateBlockData('${blockData.id}', '${field.name}', this.value)">
                    ${field.options.map(opt => `<option value="${opt}" ${opt === value ? 'selected' : ''}>${opt}</option>`).join('')}
                   </select>`
                : `<input type="text" class="block-input" value="${value}" onchange="updateBlockData('${blockData.id}', '${field.name}', this.value)">`
            }
        `;
    });
    return html;
}

// Update block data
function updateBlockData(blockId, fieldName, value) {
    const block = blocks.find(b => b.id === blockId);
    if (block) {
        block.data[fieldName] = value;
    }
}

// Make element draggable
function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    const header = element.querySelector('.block-header');
    header.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }
    
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Edit block
function editBlock(blockId) {
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;
    
    selectedBlock = block;
    
    // Show properties
    const propsContent = document.getElementById('properties-content');
    let html = '<h4 style="color: #cccccc; margin-bottom: 15px;">تحرير / Edit</h4>';
    
    block.template.fields.forEach(field => {
        const value = block.data[field.name] || field.default;
        html += `
            <div class="property-group">
                <div class="property-label">${field.label}</div>
                ${field.type === 'textarea'
                    ? `<textarea class="property-input" rows="4" onchange="updateBlockData('${blockId}', '${field.name}', this.value)">${value}</textarea>`
                    : field.type === 'select'
                    ? `<select class="property-input" onchange="updateBlockData('${blockId}', '${field.name}', this.value)">
                        ${field.options.map(opt => `<option value="${opt}" ${opt === value ? 'selected' : ''}>${opt}</option>`).join('')}
                       </select>`
                    : `<input type="text" class="property-input" value="${value}" onchange="updateBlockData('${blockId}', '${field.name}', this.value)">`
                }
            </div>
        `;
    });
    
    propsContent.innerHTML = html;
}

// Delete block
function deleteBlock(blockId) {
    if (confirm('هل تريد حذف هذا العنصر؟ / Delete this block?')) {
        blocks = blocks.filter(b => b.id !== blockId);
        const blockEl = document.getElementById(blockId);
        if (blockEl) {
            blockEl.remove();
        }
        updateStats();
        
        // Show empty message if no blocks
        if (blocks.length === 0) {
            const emptyMsg = document.querySelector('.canvas-empty');
            if (emptyMsg) {
                emptyMsg.style.display = 'block';
            }
        }
    }
}

// Generate code
function generateCode() {
    if (blocks.length === 0) {
        alert('لا توجد كتل! اسحب كتلة من صندوق الأدوات أولاً\nNo blocks! Drag a block from the toolbox first');
        return;
    }

    let code = '// Generated by Bayan Visual IDE\n// تم التوليد بواسطة بيئة البيان المرئية\n\n';

    blocks.forEach(block => {
        code += block.template.generateCode(block.data) + '\n';
    });

    // Store generated code
    window.generatedCode = code;

    // Show in modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;

    modal.innerHTML = `
        <div style="background: #1e1e1e; padding: 30px; border-radius: 10px; max-width: 800px; width: 90%; max-height: 80vh; overflow: auto; border: 2px solid #667eea;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="color: #667eea; margin: 0;">
                    <i class="fas fa-code"></i> الكود المولد / Generated Code
                </h2>
                <button onclick="this.closest('div').parentElement.remove()" style="background: #ef4444; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">
                    <i class="fas fa-times"></i> إغلاق
                </button>
            </div>
            <div style="background: #0d1117; padding: 20px; border-radius: 5px; margin-bottom: 15px; overflow-x: auto;">
                <pre style="margin: 0; color: #d4d4d4; font-family: 'Fira Code', monospace; font-size: 14px; line-height: 1.6;">${highlightCode(code)}</pre>
            </div>
            <div style="text-align: center;">
                <button onclick="copyCode()" style="background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 0 5px; font-size: 16px;">
                    <i class="fas fa-copy"></i> نسخ / Copy
                </button>
                <button onclick="downloadCode()" style="background: #667eea; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 0 5px; font-size: 16px;">
                    <i class="fas fa-download"></i> تنزيل / Download
                </button>
                <button onclick="openInRunner()" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 0 5px; font-size: 16px;">
                    <i class="fas fa-rocket"></i> فتح في المحرر النهائي / Open in Runner
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Highlight code
function highlightCode(code) {
    return code
        .replace(/(دالة|متغير|إذا|لكل|صنف|ارجع|اطبع|معادلة_أم|انتقل|أثر|حول)/g, '<span class="keyword">$1</span>')
        .replace(/('.*?'|".*?")/g, '<span class="string">$1</span>')
        .replace(/(\d+)/g, '<span class="number">$1</span>')
        .replace(/(\/\/.*)/g, '<span class="comment">$1</span>');
}

// Copy code
function copyCode() {
    if (!window.generatedCode) {
        alert('لا يوجد كود! ولّد الكود أولاً\nNo code! Generate code first');
        return;
    }
    navigator.clipboard.writeText(window.generatedCode).then(() => {
        alert('✅ تم النسخ بنجاح!\n✅ Copied successfully!');
    }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = window.generatedCode;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('✅ تم النسخ بنجاح!\n✅ Copied successfully!');
    });
}

// Download code
function downloadCode() {
    if (!window.generatedCode) {
        alert('لا يوجد كود! ولّد الكود أولاً\nNo code! Generate code first');
        return;
    }
    const blob = new Blob([window.generatedCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bayan-code.bn';
    a.click();
    URL.revokeObjectURL(url);
    alert('✅ تم التنزيل بنجاح!\n✅ Downloaded successfully!');
}

// Run code
function runCode() {
    if (blocks.length === 0) {
        alert('لا توجد كتل! اسحب كتلة من صندوق الأدوات أولاً\nNo blocks! Drag a block from the toolbox first');
        return;
    }

    // Generate code first
    let code = '// Generated by Bayan Visual IDE\n// تم التوليد بواسطة بيئة البيان المرئية\n\n';
    blocks.forEach(block => {
        code += block.template.generateCode(block.data) + '\n';
    });
    window.generatedCode = code;

    // Show execution info
    alert('🚀 الكود جاهز للتشغيل!\n\n' +
          '📋 الخطوات:\n' +
          '1. انقر "توليد الكود" لرؤية الكود\n' +
          '2. انقر "نسخ" لنسخ الكود\n' +
          '3. الصق الكود في محرر البيان\n' +
          '4. شغّل الكود\n\n' +
          '🚀 Code is ready to run!\n\n' +
          '📋 Steps:\n' +
          '1. Click "Generate Code" to see the code\n' +
          '2. Click "Copy" to copy the code\n' +
          '3. Paste in Bayan editor\n' +
          '4. Run the code');
}

// Clear canvas
function clearCanvas() {
    if (confirm('هل تريد مسح كل العناصر؟ / Clear all blocks?')) {
        blocks = [];
        const canvas = document.getElementById('canvas');
        canvas.innerHTML = `
            <div class="canvas-empty">
                <i class="fas fa-mouse-pointer"></i>
                <p>اسحب الأدوات من اليمين وأفلتها هنا</p>
                <p style="font-size: 0.9em; margin-top: 10px; opacity: 0.7;">Drag tools from the right and drop them here</p>
            </div>
        `;
        updateStats();
    }
}

// Save project
function saveProject() {
    if (blocks.length === 0) {
        alert('لا توجد كتل للحفظ!\nNo blocks to save!');
        return;
    }

    const project = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        blockCount: blocks.length,
        blocks: blocks.map(b => ({
            id: b.id,
            type: b.type,
            data: b.data,
            position: {
                left: document.getElementById(b.id)?.style.left || '0px',
                top: document.getElementById(b.id)?.style.top || '0px'
            }
        }))
    };

    const blob = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bayan-project-${Date.now()}.bayan`;
    a.click();
    URL.revokeObjectURL(url);
    alert('✅ تم حفظ المشروع بنجاح!\n✅ Project saved successfully!');
}

// Update stats
function updateStats() {
    document.getElementById('block-count').textContent = `${blocks.length} عناصر`;

    let lineCount = 0;
    blocks.forEach(block => {
        const code = block.template.generateCode(block.data);
        lineCount += code.split('\n').length;
    });
    document.getElementById('line-count').textContent = `${lineCount} أسطر`;
}

// Open in Runner - فتح في المحرر النهائي
function openInRunner() {
    if (!window.generatedCode) {
        alert('لا يوجد كود! ولّد الكود أولاً\nNo code! Generate code first');
        return;
    }

    // Save code to localStorage
    localStorage.setItem('bayanCode', window.generatedCode);

    // Open runner in new tab
    window.open('bayan-runner.html', '_blank');

    // Show success message
    alert('✅ تم فتح المحرر النهائي في نافذة جديدة!\n✅ Opened runner in new tab!');
}

// Initialize
updateStats();

