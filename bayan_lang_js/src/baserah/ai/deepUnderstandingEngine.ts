/**
 * محرك الفهم العميق للنصوص العربية
 * Deep Understanding Engine for Arabic Texts
 * 
 * يستخدم سيماء الحروف لفهم عميق للنصوص
 * Uses letter semiotics for deep text understanding
 */

import { LetterEngine } from '../linguistics/letterEngine';
import { LetterInteractionEngine } from '../linguistics/letterInteractionEngine';
import { TextAnalyzer, TextAnalysis } from './textAnalyzer';

/**
 * رؤية عميقة للنص
 * Deep insight into text
 */
export interface DeepInsight {
    text: string;
    surfaceMeaning: string;          // المعنى السطحي
    deepMeaning: string;             // المعنى العميق
    hiddenThemes: string[];          // الموضوعات المخفية
    emotionalLayers: EmotionalLayer[];  // الطبقات العاطفية
    symbolicMeanings: string[];      // المعاني الرمزية
    psychologicalProfile: PsychologicalProfile;  // الملف النفسي
    recommendations: string[];       // توصيات
}

/**
 * طبقة عاطفية
 * Emotional layer
 */
export interface EmotionalLayer {
    level: 'surface' | 'middle' | 'deep';
    emotions: string[];
    intensity: number;  // 0-1
    description: string;
}

/**
 * الملف النفسي
 * Psychological profile
 */
export interface PsychologicalProfile {
    dominantTraits: string[];        // السمات السائدة
    emotionalState: string;          // الحالة العاطفية
    mentalState: string;             // الحالة الذهنية
    motivations: string[];           // الدوافع
    conflicts: string[];             // الصراعات
}

/**
 * تفسير حلم/رؤيا
 * Dream interpretation
 */
export interface DreamInterpretation {
    dream: string;
    symbols: DreamSymbol[];
    overallMeaning: string;
    warnings: string[];
    goodOmens: string[];
    interpretation: string;
}

/**
 * رمز في الحلم
 * Dream symbol
 */
export interface DreamSymbol {
    word: string;
    letterMeanings: string[];
    symbolicMeaning: string;
    interpretation: string;
}

/**
 * محرك الفهم العميق
 * Deep Understanding Engine
 */
export class DeepUnderstandingEngine {
    private letterEngine: LetterEngine;
    private interactionEngine: LetterInteractionEngine;
    private textAnalyzer: TextAnalyzer;

    constructor() {
        this.letterEngine = new LetterEngine();
        this.interactionEngine = new LetterInteractionEngine();
        this.textAnalyzer = new TextAnalyzer();
    }

    /**
     * فهم عميق للنص
     * Deep understanding of text
     */
    analyzeDeep(text: string): DeepInsight {
        // التحليل الأساسي
        const basicAnalysis = this.textAnalyzer.analyzeText(text);

        // استخراج المعنى السطحي
        const surfaceMeaning = this.extractSurfaceMeaning(basicAnalysis);

        // استخراج المعنى العميق
        const deepMeaning = this.extractDeepMeaning(basicAnalysis);

        // اكتشاف الموضوعات المخفية
        const hiddenThemes = this.discoverHiddenThemes(basicAnalysis);

        // تحليل الطبقات العاطفية
        const emotionalLayers = this.analyzeEmotionalLayers(basicAnalysis);

        // استخراج المعاني الرمزية
        const symbolicMeanings = this.extractSymbolicMeanings(basicAnalysis);

        // بناء الملف النفسي
        const psychologicalProfile = this.buildPsychologicalProfile(basicAnalysis);

        // توليد التوصيات
        const recommendations = this.generateRecommendations(basicAnalysis, psychologicalProfile);

        return {
            text,
            surfaceMeaning,
            deepMeaning,
            hiddenThemes,
            emotionalLayers,
            symbolicMeanings,
            psychologicalProfile,
            recommendations
        };
    }

    /**
     * تفسير حلم/رؤيا
     * Interpret a dream
     */
    interpretDream(dream: string): DreamInterpretation {
        // تحليل النص
        const analysis = this.textAnalyzer.analyzeText(dream);

        // استخراج الرموز
        const symbols: DreamSymbol[] = [];
        
        analysis.sentences.forEach(sentence => {
            sentence.words.forEach(wordAnalysis => {
                const word = wordAnalysis.word;
                const letters = word.split('');
                const letterMeanings: string[] = [];

                letters.forEach(letter => {
                    const meanings = this.letterEngine.getLetterMeanings(letter);
                    meanings.forEach(m => letterMeanings.push(m.meaning));
                });

                // تطبيق قاعدة تفسير الأحلام
                const symbolicMeaning = this.applyDreamInterpretationRule(letterMeanings);
                const interpretation = this.interpretSymbol(word, letterMeanings, symbolicMeaning);

                symbols.push({
                    word,
                    letterMeanings,
                    symbolicMeaning,
                    interpretation
                });
            });
        });

        // المعنى الكلي
        const overallMeaning = this.synthesizeDreamMeaning(symbols);

        // التحذيرات
        const warnings = this.extractWarnings(symbols);

        // البشارات
        const goodOmens = this.extractGoodOmens(symbols);

        // التفسير النهائي
        const interpretation = this.generateDreamInterpretation(
            overallMeaning,
            warnings,
            goodOmens
        );

        return {
            dream,
            symbols,
            overallMeaning,
            warnings,
            goodOmens,
            interpretation
        };
    }

    /**
     * استخراج المعنى السطحي
     */
    private extractSurfaceMeaning(analysis: TextAnalysis): string {
        return `النص يتحدث عن ${analysis.overallTheme} بنبرة ${analysis.emotionalTone}`;
    }

    /**
     * استخراج المعنى العميق
     */
    private extractDeepMeaning(analysis: TextAnalysis): string {
        const dominantMeanings = analysis.dominantMeanings.slice(0, 3).join('، ');
        return `على المستوى العميق، النص يعكس ${dominantMeanings} مع تركيز على الجوانب النفسية والروحية`;
    }

    /**
     * اكتشاف الموضوعات المخفية
     */
    private discoverHiddenThemes(analysis: TextAnalysis): string[] {
        const themes: string[] = [];
        
        // تحليل التوازن
        const avgPsychological = analysis.sentences.reduce((sum, s) => {
            const avg = s.words.reduce((wsum, w) => wsum + w.balance.psychological, 0) / s.words.length;
            return sum + avg;
        }, 0) / analysis.sentences.length;

        if (avgPsychological > 0.6) {
            themes.push('صراع نفسي داخلي');
        }

        // تحليل التماسك
        if (analysis.coherenceScore < 0.5) {
            themes.push('تشتت فكري');
        }

        // تحليل النبرة
        if (analysis.emotionalTone === 'متشائم') {
            themes.push('قلق وجودي');
        }

        return themes;
    }

    /**
     * تحليل الطبقات العاطفية
     */
    private analyzeEmotionalLayers(analysis: TextAnalysis): EmotionalLayer[] {
        const layers: EmotionalLayer[] = [];

        // الطبقة السطحية
        layers.push({
            level: 'surface',
            emotions: [analysis.emotionalTone],
            intensity: 0.7,
            description: 'المشاعر الظاهرة في النص'
        });

        // الطبقة المتوسطة
        const middleEmotions = this.extractMiddleEmotions(analysis);
        layers.push({
            level: 'middle',
            emotions: middleEmotions,
            intensity: 0.5,
            description: 'المشاعر المضمرة'
        });

        // الطبقة العميقة
        const deepEmotions = this.extractDeepEmotions(analysis);
        layers.push({
            level: 'deep',
            emotions: deepEmotions,
            intensity: 0.3,
            description: 'المشاعر اللاواعية'
        });

        return layers;
    }

    /**
     * استخراج المعاني الرمزية
     */
    private extractSymbolicMeanings(analysis: TextAnalysis): string[] {
        const symbolic: string[] = [];
        
        analysis.dominantMeanings.forEach(meaning => {
            if (meaning.includes('الحياة')) symbolic.push('التجدد والاستمرارية');
            if (meaning.includes('الموت')) symbolic.push('النهاية والتحول');
            if (meaning.includes('النور')) symbolic.push('الهداية والمعرفة');
            if (meaning.includes('الظلام')) symbolic.push('الجهل والضياع');
        });

        return symbolic;
    }

    /**
     * بناء الملف النفسي
     */
    private buildPsychologicalProfile(analysis: TextAnalysis): PsychologicalProfile {
        return {
            dominantTraits: this.extractDominantTraits(analysis),
            emotionalState: analysis.emotionalTone,
            mentalState: analysis.coherenceScore > 0.7 ? 'متماسك' : 'مشتت',
            motivations: this.extractMotivations(analysis),
            conflicts: this.extractConflicts(analysis)
        };
    }

    /**
     * توليد التوصيات
     */
    private generateRecommendations(
        analysis: TextAnalysis,
        profile: PsychologicalProfile
    ): string[] {
        const recommendations: string[] = [];

        if (profile.emotionalState === 'متشائم') {
            recommendations.push('التركيز على الجوانب الإيجابية');
        }

        if (profile.mentalState === 'مشتت') {
            recommendations.push('تحسين التماسك الفكري');
        }

        if (analysis.qualityScore < 0.5) {
            recommendations.push('تحسين جودة التعبير');
        }

        return recommendations;
    }

    // دوال مساعدة
    private extractMiddleEmotions(analysis: TextAnalysis): string[] {
        return ['قلق', 'ترقب', 'حيرة'];
    }

    private extractDeepEmotions(analysis: TextAnalysis): string[] {
        return ['خوف وجودي', 'رغبة في التغيير', 'بحث عن المعنى'];
    }

    private extractDominantTraits(analysis: TextAnalysis): string[] {
        return ['تأملي', 'حساس', 'عميق'];
    }

    private extractMotivations(analysis: TextAnalysis): string[] {
        return ['البحث عن الحقيقة', 'الرغبة في الفهم'];
    }

    private extractConflicts(analysis: TextAnalysis): string[] {
        return ['صراع بين العقل والعاطفة'];
    }

    private applyDreamInterpretationRule(letterMeanings: string[]): string {
        // تطبيق القاعدة: كل حرف كرمز
        return letterMeanings.join(' + ');
    }

    private interpretSymbol(word: string, letterMeanings: string[], symbolic: string): string {
        return `${word} يرمز إلى: ${symbolic}`;
    }

    private synthesizeDreamMeaning(symbols: DreamSymbol[]): string {
        return 'الحلم يعكس حالة نفسية معينة';
    }

    private extractWarnings(symbols: DreamSymbol[]): string[] {
        return symbols
            .filter(s => s.letterMeanings.some(m => m.includes('غضب') || m.includes('خوف')))
            .map(s => `تحذير من ${s.word}`);
    }

    private extractGoodOmens(symbols: DreamSymbol[]): string[] {
        return symbols
            .filter(s => s.letterMeanings.some(m => m.includes('حياة') || m.includes('نور')))
            .map(s => `بشارة من ${s.word}`);
    }

    private generateDreamInterpretation(
        overall: string,
        warnings: string[],
        omens: string[]
    ): string {
        let interpretation = overall + '\n\n';
        
        if (warnings.length > 0) {
            interpretation += 'التحذيرات:\n' + warnings.join('\n') + '\n\n';
        }
        
        if (omens.length > 0) {
            interpretation += 'البشارات:\n' + omens.join('\n');
        }
        
        return interpretation;
    }
}

