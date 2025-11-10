/**
 * محرر البيان الأساسي مع المساعد الذكي
 * Bayan Basic Editor Component with AI Assistant
 */

import React, { useRef, useEffect, useState } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLineGutter, highlightActiveLine } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { autocompletion, completionKeymap } from '@codemirror/autocomplete';
import { bracketMatching, foldGutter, foldKeymap } from '@codemirror/language';
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
import { lintKeymap } from '@codemirror/lint';

import { bayanLightTheme, bayanDarkTheme, bayanArabicTheme } from '../themes/bayanTheme';
import { bayanLightSyntax, bayanDarkSyntax } from '../themes/bayanSyntax';
import { bayanAutocomplete } from '../utils/bayanAutocomplete';
import AIAssistant from './AIAssistant';
import CodeMonitor from '../utils/codeMonitor';
import ErrorDetector from '../utils/errorDetector';

/**
 * أنواع السمات المتاحة
 * Available Theme Types
 */
export type ThemeType = 'light' | 'dark' | 'arabic';

/**
 * خصائص مكون المحرر
 * Editor Component Props
 */
export interface BayanEditorProps {
  /** المحتوى الأولي - Initial content */
  initialContent?: string;
  /** السمة - Theme */
  theme?: ThemeType;
  /** دالة التغيير - On change callback */
  onChange?: (content: string) => void;
  /** دالة الحفظ - On save callback */
  onSave?: (content: string) => void;
  /** القراءة فقط - Read only */
  readOnly?: boolean;
  /** الارتفاع - Height */
  height?: string;
  /** عرض أرقام الأسطر - Show line numbers */
  showLineNumbers?: boolean;
  /** إظهار المساعد الذكي - Show AI Assistant */
  showAIAssistant?: boolean;
  /** إظهار كشف الأخطاء - Show error detection */
  showErrorDetection?: boolean;
}

/**
 * مكون محرر البيان
 * Bayan Editor Component
 */
export const BayanEditor: React.FC<BayanEditorProps> = ({
  initialContent = '// اكتب كود البيان هنا\n// Write Bayan code here\n\nاطبع("مرحباً بالعالم! 🌍")\nprint("Hello World! 🌍")',
  theme = 'light',
  onChange,
  onSave,
  readOnly = false,
  height = '100%',
  showLineNumbers = true,
  showAIAssistant = true,
  showErrorDetection = true
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(theme);
  const [isAIVisible, setIsAIVisible] = useState(showAIAssistant);
  const [errors, setErrors] = useState<any[]>([]);
  const [predictions, setPredictions] = useState<any[]>([]);
  const codeMonitorRef = useRef(new CodeMonitor());
  const errorDetectorRef = useRef(new ErrorDetector());

  /**
   * تهيئة المحرر
   * Initialize Editor
   */
  useEffect(() => {
    if (!editorRef.current) return;

    // اختيار السمة
    const themeExtension = currentTheme === 'dark' 
      ? bayanDarkTheme 
      : currentTheme === 'arabic'
      ? bayanArabicTheme
      : bayanLightTheme;

    const syntaxExtension = currentTheme === 'dark'
      ? bayanDarkSyntax
      : bayanLightSyntax;

    // إنشاء حالة المحرر
    const startState = EditorState.create({
      doc: initialContent,
      extensions: [
        // الميزات الأساسية
        showLineNumbers ? lineNumbers() : [],
        highlightActiveLineGutter(),
        highlightActiveLine(),
        history(),
        foldGutter(),
        bracketMatching(),
        highlightSelectionMatches(),
        
        // اللغة والإكمال التلقائي
        javascript(),
        autocompletion({
          override: [bayanAutocomplete],
          activateOnTyping: true,
          maxRenderedOptions: 10
        }),
        
        // السمات
        themeExtension,
        syntaxExtension,
        
        // اختصارات لوحة المفاتيح
        keymap.of([
          ...defaultKeymap,
          ...historyKeymap,
          ...foldKeymap,
          ...completionKeymap,
          ...searchKeymap,
          ...lintKeymap,
          // اختصار الحفظ
          {
            key: 'Ctrl-s',
            mac: 'Cmd-s',
            run: (view) => {
              if (onSave) {
                onSave(view.state.doc.toString());
              }
              return true;
            }
          }
        ]),
        
        // مستمع التغييرات
        EditorView.updateListener.of(update => {
          if (update.docChanged && onChange) {
            const content = update.state.doc.toString();
            onChange(content);
          }
        }),
        
        // القراءة فقط
        EditorView.editable.of(!readOnly),
        
        // الارتفاع
        EditorView.theme({
          '&': { height: height }
        })
      ]
    });

    // إنشاء عرض المحرر
    editorViewRef.current = new EditorView({
      state: startState,
      parent: editorRef.current
    });

    // التنظيف
    return () => {
      editorViewRef.current?.destroy();
      editorViewRef.current = null;
    };
  }, [currentTheme, showLineNumbers, readOnly, height]);

  /**
   * تحديث المحتوى عند تغيير initialContent
   * Update content when initialContent changes
   */
  useEffect(() => {
    if (editorViewRef.current && initialContent !== editorViewRef.current.state.doc.toString()) {
      const transaction = editorViewRef.current.state.update({
        changes: {
          from: 0,
          to: editorViewRef.current.state.doc.length,
          insert: initialContent
        }
      });
      editorViewRef.current.dispatch(transaction);
    }
  }, [initialContent]);

  /**
   * تحديث السمة
   * Update theme
   */
  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  /**
   * دوال عامة للتحكم في المحرر
   * Public methods to control the editor
   */
  const getContent = (): string => {
    return editorViewRef.current?.state.doc.toString() || '';
  };

  const setContent = (content: string): void => {
    if (editorViewRef.current) {
      const transaction = editorViewRef.current.state.update({
        changes: {
          from: 0,
          to: editorViewRef.current.state.doc.length,
          insert: content
        }
      });
      editorViewRef.current.dispatch(transaction);
    }
  };

  const focus = (): void => {
    editorViewRef.current?.focus();
  };

  // مراقبة التغييرات وكشف الأخطاء
  useEffect(() => {
    if (!editorViewRef.current) return;

    const checkCode = async () => {
      const code = getContent();

      // كشف الأخطاء
      if (showErrorDetection) {
        const detectedErrors = await errorDetectorRef.current.detectErrors(code);
        setErrors(detectedErrors);
      }

      // مراقبة الكود والتوقعات
      const cursorPos = editorViewRef.current?.state.selection.main.head;
      const line = editorViewRef.current?.state.doc.lineAt(cursorPos || 0);
      const result = await codeMonitorRef.current.monitorCodeChange(code, {
        line: line?.number || 0,
        column: cursorPos ? cursorPos - (line?.from || 0) : 0
      });

      setPredictions(result.predictions);
    };

    // تأخير الفحص لتجنب الفحص المتكرر
    const timer = setTimeout(checkCode, 500);
    return () => clearTimeout(timer);
  }, [initialContent, showErrorDetection]);

  // دوال للتفاعل مع المساعد الذكي
  const handleInsertCode = (code: string) => {
    if (editorViewRef.current) {
      const pos = editorViewRef.current.state.selection.main.head;
      const transaction = editorViewRef.current.state.update({
        changes: { from: pos, insert: code }
      });
      editorViewRef.current.dispatch(transaction);
      editorViewRef.current.focus();
    }
  };

  const handleReplaceCode = (code: string) => {
    setContent(code);
    editorViewRef.current?.focus();
  };

  // حفظ الدوال في ref للوصول إليها من الخارج
  useEffect(() => {
    if (editorRef.current) {
      (editorRef.current as any).getContent = getContent;
      (editorRef.current as any).setContent = setContent;
      (editorRef.current as any).focus = focus;
    }
  });

  return (
    <div style={{ display: 'flex', width: '100%', height: height, position: 'relative' }}>
      {/* المحرر */}
      <div
        ref={editorRef}
        className="bayan-editor"
        style={{
          flex: isAIVisible ? '1 1 60%' : '1 1 100%',
          height: height,
          overflow: 'auto',
          fontFamily: '"Fira Code", "Cairo", "Consolas", monospace',
          transition: 'flex 0.3s ease'
        }}
      />

      {/* المساعد الذكي */}
      {showAIAssistant && (
        <AIAssistant
          currentCode={getContent()}
          onInsertCode={handleInsertCode}
          onReplaceCode={handleReplaceCode}
          position="right"
          isVisible={isAIVisible}
          onToggle={() => setIsAIVisible(!isAIVisible)}
        />
      )}

      {/* عرض الأخطاء */}
      {showErrorDetection && errors.length > 0 && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: isAIVisible ? '40%' : 0,
          maxHeight: '150px',
          overflowY: 'auto',
          backgroundColor: '#fff3cd',
          borderTop: '2px solid #ffc107',
          padding: '10px',
          fontSize: '12px',
          fontFamily: 'Cairo, sans-serif'
        }}>
          <strong>⚠️ تنبيهات:</strong>
          {errors.slice(0, 5).map((error, index) => (
            <div key={index} style={{
              padding: '5px',
              marginTop: '5px',
              backgroundColor: error.severity === 'error' ? '#f8d7da' : '#d1ecf1',
              borderLeft: `3px solid ${error.severity === 'error' ? '#dc3545' : '#0c5460'}`,
              borderRadius: '3px'
            }}>
              <strong>السطر {error.line}:</strong> {error.message}
              {error.description && <div style={{ fontSize: '11px', marginTop: '3px' }}>{error.description}</div>}
            </div>
          ))}
        </div>
      )}

      {/* عرض التوقعات */}
      {predictions.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: isAIVisible ? 'calc(40% + 10px)' : '10px',
          maxWidth: '300px',
          backgroundColor: '#e7f3ff',
          border: '1px solid #0066cc',
          borderRadius: '5px',
          padding: '10px',
          fontSize: '12px',
          fontFamily: 'Cairo, sans-serif',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <strong>💡 اقتراحات:</strong>
          {predictions.slice(0, 3).map((pred, index) => (
            <div key={index} style={{
              padding: '5px',
              marginTop: '5px',
              cursor: 'pointer',
              backgroundColor: '#fff',
              borderRadius: '3px',
              border: '1px solid #ccc'
            }}
            onClick={() => handleInsertCode(pred.text)}>
              {pred.description} ({Math.round(pred.confidence * 100)}%)
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Hook لاستخدام المحرر
 * Hook to use the editor
 */
export const useBayanEditor = (editorRef: React.RefObject<HTMLDivElement>) => {
  const getContent = (): string => {
    return (editorRef.current as any)?.getContent?.() || '';
  };

  const setContent = (content: string): void => {
    (editorRef.current as any)?.setContent?.(content);
  };

  const focus = (): void => {
    (editorRef.current as any)?.focus?.();
  };

  return { getContent, setContent, focus };
};

export default BayanEditor;

