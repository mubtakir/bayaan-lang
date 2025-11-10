/**
 * محرر البيان الأساسي
 * Bayan Basic Editor Component
 */
import React from 'react';
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
}
/**
 * مكون محرر البيان
 * Bayan Editor Component
 */
export declare const BayanEditor: React.FC<BayanEditorProps>;
/**
 * Hook لاستخدام المحرر
 * Hook to use the editor
 */
export declare const useBayanEditor: (editorRef: React.RefObject<HTMLDivElement>) => {
    getContent: () => string;
    setContent: (content: string) => void;
    focus: () => void;
};
export default BayanEditor;
