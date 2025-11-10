/**
 * مساعد الذكاء الاصطناعي للمحرر
 * AI Assistant Component for Bayan Editor
 * 
 * @author Basel Yahya Abdullah
 */

import React, { useState, useRef, useEffect } from 'react';
import { IntelligentGenerator } from '../../baserah/ai/languageGenerator/intelligentGenerator';
import { ConversationEngine, ConversationType } from '../utils/conversationEngine';

/**
 * نوع الرسالة
 * Message Type
 */
interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  codeSnippet?: string;
}

/**
 * خصائص مكون المساعد
 * AI Assistant Props
 */
export interface AIAssistantProps {
  /** الكود الحالي في المحرر */
  currentCode?: string;
  /** دالة لإدراج الكود في المحرر */
  onInsertCode?: (code: string) => void;
  /** دالة لاستبدال الكود في المحرر */
  onReplaceCode?: (code: string) => void;
  /** موضع المساعد */
  position?: 'right' | 'bottom' | 'floating';
  /** حالة الظهور */
  isVisible?: boolean;
  /** دالة التبديل */
  onToggle?: () => void;
}

/**
 * مكون مساعد الذكاء الاصطناعي
 * AI Assistant Component
 */
export const AIAssistant: React.FC<AIAssistantProps> = ({
  currentCode = '',
  onInsertCode,
  onReplaceCode,
  position = 'right',
  isVisible = true,
  onToggle
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: 'مرحباً! 👋 أنا مساعدك الذكي للغة البيان.\n\nيمكنني مساعدتك في:\n• 💬 الإجابة على أسئلة عامة عن لغة البيان\n• 📚 شرح المفاهيم البرمجية والفلسفية\n• 🎓 التعلم والتدريب\n• 💻 كتابة وتوليد الكود\n• 🔧 إصلاح الأخطاء\n• ⚡ تحسين الأداء\n\nيمكنك أن تسألني أي شيء! كيف يمكنني مساعدتك اليوم؟',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generator] = useState(() => new IntelligentGenerator());
  const [conversationEngine] = useState(() => new ConversationEngine());
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // التمرير التلقائي للأسفل
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /**
   * معالجة إرسال الرسالة
   */
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);

    try {
      // استخدام محرك المحادثة للأسئلة العامة
      const conversationResponse = await conversationEngine.processMessage(inputValue, {
        type: 'general',
        previousMessages: messages.map(m => m.content)
      });

      // إذا كان السؤال عن الكود، استخدم المولد الذكي
      let responseText = conversationResponse.text;
      let codeSnippet: string | undefined;

      if (conversationResponse.type === 'code_help' && currentCode) {
        const context = `\n\nالكود الحالي:\n${currentCode}`;
        const codeResponse = await generator.processInputWithThinkingOptimized(
          inputValue + context
        );
        responseText = (codeResponse as any).text || conversationResponse.text;
        codeSnippet = this.extractCodeFromResponse(responseText);
      }

      // تحديث الاقتراحات
      if (conversationResponse.suggestions) {
        setSuggestions(conversationResponse.suggestions);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
        codeSnippet: codeSnippet || extractCodeSnippet(responseText)
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'عذراً، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
      inputRef.current?.focus();
    }
  };

  /**
   * استخراج مقتطف الكود من الرد
   */
  const extractCodeSnippet = (text: string): string | undefined => {
    const codeMatch = text.match(/```(?:bayan|javascript)?\n([\s\S]*?)```/);
    return codeMatch ? codeMatch[1].trim() : undefined;
  };

  /**
   * معالجة الضغط على Enter
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  /**
   * إدراج الكود في المحرر
   */
  const handleInsertCode = (code: string) => {
    if (onInsertCode) {
      onInsertCode(code);
    }
  };

  /**
   * استبدال الكود في المحرر
   */
  const handleReplaceCode = (code: string) => {
    if (onReplaceCode) {
      onReplaceCode(code);
    }
  };

  if (!isVisible) return null;

  return (
    <div style={styles.container}>
      {/* الرأس */}
      <div style={styles.header}>
        <div style={styles.headerTitle}>
          <span style={styles.icon}>🤖</span>
          <span>المساعد الذكي - AI Assistant</span>
        </div>
        {onToggle && (
          <button style={styles.closeButton} onClick={onToggle}>
            ✕
          </button>
        )}
      </div>

      {/* الرسائل */}
      <div style={styles.messagesContainer}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              ...styles.message,
              ...(message.role === 'user' ? styles.userMessage : styles.assistantMessage)
            }}
          >
            <div style={styles.messageHeader}>
              <span style={styles.messageRole}>
                {message.role === 'user' ? '👤 أنت' : '🤖 المساعد'}
              </span>
              <span style={styles.messageTime}>
                {message.timestamp.toLocaleTimeString('ar-SA', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            <div style={styles.messageContent}>
              {message.content}
            </div>
            {message.codeSnippet && (
              <div style={styles.codeSnippetContainer}>
                <pre style={styles.codeSnippet}>{message.codeSnippet}</pre>
                <div style={styles.codeActions}>
                  <button
                    style={styles.codeActionButton}
                    onClick={() => handleInsertCode(message.codeSnippet!)}
                  >
                    📋 إدراج
                  </button>
                  <button
                    style={styles.codeActionButton}
                    onClick={() => handleReplaceCode(message.codeSnippet!)}
                  >
                    🔄 استبدال
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {isProcessing && (
          <div style={styles.typingIndicator}>
            <span>المساعد يكتب</span>
            <span style={styles.dots}>...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* الإدخال */}
      <div style={styles.inputContainer}>
        <textarea
          ref={inputRef}
          style={styles.input}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="اكتب سؤالك أو طلبك هنا... (Enter للإرسال، Shift+Enter لسطر جديد)"
          disabled={isProcessing}
          rows={3}
        />
        <button
          style={{
            ...styles.sendButton,
            ...(isProcessing || !inputValue.trim() ? styles.sendButtonDisabled : {})
          }}
          onClick={handleSendMessage}
          disabled={isProcessing || !inputValue.trim()}
        >
          {isProcessing ? '⏳' : '📤'} إرسال
        </button>
      </div>

      {/* اقتراحات ذكية */}
      {suggestions.length > 0 && (
        <div style={styles.suggestionsContainer}>
          <div style={styles.suggestionsTitle}>💡 اقتراحات:</div>
          <div style={styles.suggestionsGrid}>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                style={styles.suggestionButton}
                onClick={() => setInputValue(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* اقتراحات سريعة */}
      <div style={styles.quickActions}>
        <button
          style={styles.quickActionButton}
          onClick={() => setInputValue('ما هي لغة البيان؟')}
        >
          📖 عن البيان
        </button>
        <button
          style={styles.quickActionButton}
          onClick={() => setInputValue('اشرح لي ثنائية الصفر')}
        >
          🧠 الفلسفة
        </button>
        <button
          style={styles.quickActionButton}
          onClick={() => setInputValue('كيف أتعلم البيان؟')}
        >
          🎓 التعلم
        </button>
        <button
          style={styles.quickActionButton}
          onClick={() => setInputValue('اكتب دالة لـ')}
        >
          ✨ توليد كود
        </button>
      </div>
    </div>
  );
};

/**
 * الأنماط
 * Styles
 */
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#ffffff',
    borderLeft: '1px solid #e5e7eb',
    fontFamily: '"Cairo", sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontWeight: 600
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '1.1em'
  },
  icon: {
    fontSize: '1.3em'
  },
  closeButton: {
    background: 'rgba(255,255,255,0.2)',
    border: 'none',
    color: 'white',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '1.2em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s'
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  message: {
    padding: '12px 15px',
    borderRadius: '10px',
    maxWidth: '85%',
    wordWrap: 'break-word'
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#667eea',
    color: 'white',
    direction: 'rtl'
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f3f4f6',
    color: '#1f2937',
    direction: 'rtl'
  },
  messageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    fontSize: '0.85em',
    opacity: 0.8
  },
  messageRole: {
    fontWeight: 600
  },
  messageTime: {
    fontSize: '0.9em'
  },
  messageContent: {
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap'
  },
  codeSnippetContainer: {
    marginTop: '10px',
    backgroundColor: '#1e1e1e',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  codeSnippet: {
    margin: 0,
    padding: '15px',
    color: '#d4d4d4',
    fontFamily: '"Fira Code", monospace',
    fontSize: '0.9em',
    overflowX: 'auto',
    direction: 'ltr',
    textAlign: 'left'
  },
  codeActions: {
    display: 'flex',
    gap: '10px',
    padding: '10px',
    backgroundColor: '#2d2d2d',
    borderTop: '1px solid #3e3e42'
  },
  codeActionButton: {
    padding: '6px 12px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9em',
    fontFamily: '"Cairo", sans-serif',
    transition: 'all 0.3s'
  },
  typingIndicator: {
    alignSelf: 'flex-start',
    padding: '12px 15px',
    backgroundColor: '#f3f4f6',
    borderRadius: '10px',
    color: '#6b7280',
    fontStyle: 'italic'
  },
  dots: {
    marginLeft: '5px',
    animation: 'blink 1.4s infinite'
  },
  inputContainer: {
    padding: '15px 20px',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontFamily: '"Cairo", sans-serif',
    fontSize: '0.95em',
    resize: 'none',
    direction: 'rtl',
    outline: 'none'
  },
  sendButton: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: '"Cairo", sans-serif',
    fontWeight: 600,
    fontSize: '1em',
    transition: 'all 0.3s'
  },
  sendButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed'
  },
  suggestionsContainer: {
    padding: '10px 20px',
    backgroundColor: '#f0f9ff',
    borderTop: '1px solid #e5e7eb'
  },
  suggestionsTitle: {
    fontSize: '0.85em',
    color: '#667eea',
    fontWeight: 600,
    marginBottom: '8px',
    fontFamily: '"Cairo", sans-serif'
  },
  suggestionsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  suggestionButton: {
    padding: '6px 12px',
    backgroundColor: 'white',
    color: '#667eea',
    border: '1px solid #667eea',
    borderRadius: '15px',
    cursor: 'pointer',
    fontSize: '0.85em',
    fontFamily: '"Cairo", sans-serif',
    transition: 'all 0.3s',
    whiteSpace: 'nowrap'
  },
  quickActions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    padding: '0 20px 15px 20px'
  },
  quickActionButton: {
    padding: '6px 12px',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: '1px solid #e5e7eb',
    borderRadius: '15px',
    cursor: 'pointer',
    fontSize: '0.85em',
    fontFamily: '"Cairo", sans-serif',
    transition: 'all 0.3s'
  }
};

export default AIAssistant;

