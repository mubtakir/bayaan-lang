/**
 * سمات محرر البيان
 * Bayan Editor Themes
 */

import { EditorView } from '@codemirror/view';

/**
 * السمة الفاتحة
 * Light Theme
 */
export const bayanLightTheme = EditorView.theme({
  '&': {
    color: '#24292e',
    backgroundColor: '#ffffff',
    height: '100%',
    fontSize: '14px',
    fontFamily: '"Fira Code", "Cairo", "Droid Arabic Naskh", "Consolas", monospace'
  },
  
  '.cm-content': {
    caretColor: '#24292e',
    padding: '10px 0'
  },
  
  '.cm-line': {
    padding: '0 10px',
    lineHeight: '1.6'
  },
  
  '&.cm-focused .cm-cursor': {
    borderLeftColor: '#24292e',
    borderLeftWidth: '2px'
  },
  
  '&.cm-focused .cm-selectionBackground, ::selection': {
    backgroundColor: '#0366d625'
  },
  
  '.cm-selectionBackground': {
    backgroundColor: '#0366d625'
  },
  
  '.cm-gutters': {
    backgroundColor: '#f6f8fa',
    color: '#6a737d',
    border: 'none',
    borderRight: '1px solid #e1e4e8'
  },
  
  '.cm-activeLineGutter': {
    backgroundColor: '#e1e4e8'
  },
  
  '.cm-activeLine': {
    backgroundColor: '#f6f8fa'
  },
  
  '.cm-lineNumbers .cm-gutterElement': {
    padding: '0 16px 0 8px',
    minWidth: '40px',
    textAlign: 'right'
  },
  
  '.cm-foldPlaceholder': {
    backgroundColor: '#e1e4e8',
    border: 'none',
    color: '#6a737d'
  },
  
  '.cm-tooltip': {
    border: '1px solid #e1e4e8',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  
  '.cm-tooltip-autocomplete': {
    '& > ul': {
      fontFamily: '"Cairo", sans-serif',
      maxHeight: '300px'
    },
    '& > ul > li[aria-selected]': {
      backgroundColor: '#0366d6',
      color: '#ffffff'
    }
  },
  
  '.cm-matchingBracket': {
    backgroundColor: '#34d05840',
    outline: '1px solid #34d058'
  },
  
  '.cm-nonmatchingBracket': {
    backgroundColor: '#d73a4940',
    outline: '1px solid #d73a49'
  },
  
  '.cm-searchMatch': {
    backgroundColor: '#ffdf5d',
    outline: '1px solid #ffdf5d'
  },
  
  '.cm-searchMatch.cm-searchMatch-selected': {
    backgroundColor: '#ffd33d'
  }
}, { dark: false });

/**
 * السمة الداكنة
 * Dark Theme
 */
export const bayanDarkTheme = EditorView.theme({
  '&': {
    color: '#c9d1d9',
    backgroundColor: '#0d1117',
    height: '100%',
    fontSize: '14px',
    fontFamily: '"Fira Code", "Cairo", "Droid Arabic Naskh", "Consolas", monospace'
  },
  
  '.cm-content': {
    caretColor: '#c9d1d9',
    padding: '10px 0'
  },
  
  '.cm-line': {
    padding: '0 10px',
    lineHeight: '1.6'
  },
  
  '&.cm-focused .cm-cursor': {
    borderLeftColor: '#c9d1d9',
    borderLeftWidth: '2px'
  },
  
  '&.cm-focused .cm-selectionBackground, ::selection': {
    backgroundColor: '#388bfd40'
  },
  
  '.cm-selectionBackground': {
    backgroundColor: '#388bfd40'
  },
  
  '.cm-gutters': {
    backgroundColor: '#161b22',
    color: '#8b949e',
    border: 'none',
    borderRight: '1px solid #21262d'
  },
  
  '.cm-activeLineGutter': {
    backgroundColor: '#21262d'
  },
  
  '.cm-activeLine': {
    backgroundColor: '#161b22'
  },
  
  '.cm-lineNumbers .cm-gutterElement': {
    padding: '0 16px 0 8px',
    minWidth: '40px',
    textAlign: 'right'
  },
  
  '.cm-foldPlaceholder': {
    backgroundColor: '#21262d',
    border: 'none',
    color: '#8b949e'
  },
  
  '.cm-tooltip': {
    border: '1px solid #21262d',
    backgroundColor: '#161b22',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
  },
  
  '.cm-tooltip-autocomplete': {
    '& > ul': {
      fontFamily: '"Cairo", sans-serif',
      maxHeight: '300px'
    },
    '& > ul > li[aria-selected]': {
      backgroundColor: '#388bfd',
      color: '#ffffff'
    }
  },
  
  '.cm-matchingBracket': {
    backgroundColor: '#3fb95040',
    outline: '1px solid #3fb950'
  },
  
  '.cm-nonmatchingBracket': {
    backgroundColor: '#f8514940',
    outline: '1px solid #f85149'
  },
  
  '.cm-searchMatch': {
    backgroundColor: '#ffd33d40',
    outline: '1px solid #ffd33d'
  },
  
  '.cm-searchMatch.cm-searchMatch-selected': {
    backgroundColor: '#ffd33d60'
  }
}, { dark: true });

/**
 * السمة العربية (فاتحة مع دعم RTL محسّن)
 * Arabic Theme (Light with Enhanced RTL Support)
 */
export const bayanArabicTheme = EditorView.theme({
  '&': {
    color: '#2c3e50',
    backgroundColor: '#f8f9fa',
    height: '100%',
    fontSize: '16px',
    fontFamily: '"Cairo", "Droid Arabic Naskh", "Amiri", "Traditional Arabic", sans-serif',
    direction: 'rtl'
  },
  
  '.cm-content': {
    caretColor: '#2c3e50',
    padding: '10px 0',
    direction: 'rtl',
    textAlign: 'right'
  },
  
  '.cm-line': {
    padding: '0 10px',
    lineHeight: '1.8',
    direction: 'rtl',
    textAlign: 'right'
  },
  
  '&.cm-focused .cm-cursor': {
    borderLeftColor: '#e74c3c',
    borderLeftWidth: '2px'
  },
  
  '&.cm-focused .cm-selectionBackground, ::selection': {
    backgroundColor: '#3498db33'
  },
  
  '.cm-selectionBackground': {
    backgroundColor: '#3498db33'
  },
  
  '.cm-gutters': {
    backgroundColor: '#ecf0f1',
    color: '#7f8c8d',
    border: 'none',
    borderLeft: '1px solid #bdc3c7'
  },
  
  '.cm-activeLineGutter': {
    backgroundColor: '#bdc3c7'
  },
  
  '.cm-activeLine': {
    backgroundColor: '#ecf0f1'
  },
  
  '.cm-lineNumbers .cm-gutterElement': {
    padding: '0 8px 0 16px',
    minWidth: '40px',
    textAlign: 'left',
    fontFamily: '"Cairo", sans-serif'
  },
  
  '.cm-foldPlaceholder': {
    backgroundColor: '#bdc3c7',
    border: 'none',
    color: '#7f8c8d'
  },
  
  '.cm-tooltip': {
    border: '1px solid #bdc3c7',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    direction: 'rtl'
  },
  
  '.cm-tooltip-autocomplete': {
    '& > ul': {
      fontFamily: '"Cairo", sans-serif',
      maxHeight: '300px',
      direction: 'rtl',
      textAlign: 'right'
    },
    '& > ul > li': {
      direction: 'rtl',
      textAlign: 'right'
    },
    '& > ul > li[aria-selected]': {
      backgroundColor: '#3498db',
      color: '#ffffff'
    }
  },
  
  '.cm-matchingBracket': {
    backgroundColor: '#2ecc7140',
    outline: '1px solid #2ecc71'
  },
  
  '.cm-nonmatchingBracket': {
    backgroundColor: '#e74c3c40',
    outline: '1px solid #e74c3c'
  },
  
  '.cm-searchMatch': {
    backgroundColor: '#f39c1240',
    outline: '1px solid #f39c12'
  },
  
  '.cm-searchMatch.cm-searchMatch-selected': {
    backgroundColor: '#f39c1260'
  }
}, { dark: false });

