/**
 * مكتبة الذكاء الاصطناعي للغة البيان
 */
/**
 * الشبكات العصبية
 */
/**
 * دالة التنشيط
 */
export type دالة_تنشيط = (س: number) => number;
/**
 * دوال التنشيط الشائعة
 */
export declare const دوال_التنشيط: {
    /**
     * Sigmoid
     */
    سيجمويد: (س: number) => number;
    /**
     * مشتقة Sigmoid
     */
    مشتقة_سيجمويد: (س: number) => number;
    /**
     * ReLU (Rectified Linear Unit)
     */
    ريلو: (س: number) => number;
    /**
     * مشتقة ReLU
     */
    مشتقة_ريلو: (س: number) => number;
    /**
     * Tanh
     */
    تانه: (س: number) => number;
    /**
     * مشتقة Tanh
     */
    مشتقة_تانه: (س: number) => number;
    /**
     * Leaky ReLU
     */
    ريلو_متسرب: (س: number, ألفا?: number) => number;
    /**
     * Softmax (للمصفوفات)
     */
    سوفت_ماكس: (مصفوفة: number[]) => number[];
};
/**
 * دوال الخسارة
 */
export declare const دوال_الخسارة: {
    /**
     * Mean Squared Error
     */
    خطأ_تربيعي_متوسط: (متوقع: number[], فعلي: number[]) => number;
    /**
     * Cross Entropy
     */
    إنتروبيا_تقاطعية: (متوقع: number[], فعلي: number[]) => number;
    /**
     * Mean Absolute Error
     */
    خطأ_مطلق_متوسط: (متوقع: number[], فعلي: number[]) => number;
};
/**
 * التعلم الآلي - خوارزميات التصنيف
 */
export declare const التصنيف: {
    /**
     * K-Nearest Neighbors (KNN)
     */
    أقرب_ك_جيران: (بيانات_تدريب: {
        ميزات: number[];
        تصنيف: any;
    }[], نقطة_اختبار: number[], ك?: number) => any;
    /**
     * Naive Bayes Classifier (مبسط)
     */
    بايز_ساذج: (بيانات_تدريب: {
        ميزات: number[];
        تصنيف: string;
    }[], نقطة_اختبار: number[]) => string;
};
/**
 * التعلم الآلي - الانحدار
 */
export declare const الانحدار: {
    /**
     * الانحدار الخطي البسيط
     */
    انحدار_خطي_بسيط: (نقاط: {
        س: number;
        ص: number;
    }[]) => {
        ميل: number;
        تقاطع: number;
        توقع: (س: number) => number;
    };
};
/**
 * التجميع (Clustering)
 */
export declare const التجميع: {
    /**
     * K-Means Clustering
     */
    ك_متوسطات: (نقاط: number[][], ك: number, تكرارات_قصوى?: number) => {
        مراكز: number[][];
        تجميعات: number[];
    };
};
