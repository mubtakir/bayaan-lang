/**
 * المشغلات الرياضية اللغوية - Linguistic Mathematical Operators
 * مشغلات جديدة لتمثيل الأفعال والأحداث في اللغة الطبيعية
 *
 * بدلاً من العمليات التقليدية (+, -, *, /)، نستخدم مشغلات تحاكي الأفعال الطبيعية
 */
import { MotherEquation } from './motherEquation';
/**
 * نتيجة تطبيق مشغل
 */
export interface OperatorResult {
    success: boolean;
    message: string;
    affectedObjects: MotherEquation[];
    changes: Map<string, any>;
}
/**
 * رموز خاصة للأدوار
 */
export declare enum Role {
    ACTOR = "\u0641\u0627\u0639\u0644",// الفاعل
    OBJECT = "\u0645\u0641\u0639\u0648\u0644",// المفعول به
    RECIPIENT = "\u0645\u062A\u0644\u0642\u064A",// المتلقي
    INSTRUMENT = "\u0623\u062F\u0627\u0629",// الأداة
    LOCATION = "\u0645\u0643\u0627\u0646",// المكان
    TIME = "\u0632\u0645\u0627\u0646"
}
/**
 * المشغلات الرياضية اللغوية
 */
export declare class LinguisticOperators {
    /**
     * 1. مشغل الانتقال - Go Operator
     * يمثل انتقال كائن من مكان إلى آخر
     *
     * Go(object, fromLocation, toLocation)
     */
    static Go(object: MotherEquation, fromLocation: any, toLocation: any): OperatorResult;
    /**
     * 2. مشغل التأثير - Affect Operator
     * يمثل تأثير كائن على آخر
     *
     * Affect(actor, recipient, effectType, intensity)
     */
    static Affect(actor: MotherEquation, recipient: MotherEquation, effectType: string, intensity?: number): OperatorResult;
    /**
     * 3. مشغل الالتحام - Bond Operator
     * يمثل التحام كائنين بزاوية معينة
     *
     * Bond(object1, object2, angle, bondType)
     */
    static Bond(object1: MotherEquation, object2: MotherEquation, angle?: number, bondType?: string): OperatorResult;
    /**
     * 4. مشغل التحول - Transform Operator
     * يمثل تحول وتغيير في خصائص وحالات الكائن
     * يفيد للتعبير عن: صنع، عمل، أنجز، حوّل، غيّر
     *
     * Transform(object, transformations)
     */
    static Transform(object: MotherEquation, transformations: Map<string, any>): OperatorResult;
    /**
     * 5. مشغل الفاعل - Actor Operator
     * يحدد الكائن كفاعل في الحدث
     *
     * Actor(object)
     */
    static Actor(object: MotherEquation): MotherEquation;
    /**
     * 6. مشغل المفعول - Object Operator
     * يحدد الكائن كمفعول به في الحدث
     *
     * Object(object)
     */
    static Object(object: MotherEquation): MotherEquation;
    /**
     * 7. مشغل الإنشاء - Create Operator
     * يمثل إنشاء كائن جديد من مكونات
     * يفيد للتعبير عن: صنع، بنى، أنشأ، كوّن
     *
     * Create(components, recipe)
     */
    static Create(components: MotherEquation[], recipe: Map<string, any>): MotherEquation;
    /**
     * 8. مشغل التدمير - Destroy Operator
     * يمثل تدمير أو إزالة كائن
     * يفيد للتعبير عن: هدم، كسر، أزال، محا
     *
     * Destroy(object, method)
     */
    static Destroy(object: MotherEquation, method?: string): OperatorResult;
    /**
     * 9. مشغل النقل - Transfer Operator
     * يمثل نقل شيء من مكان/شخص إلى آخر
     * يفيد للتعبير عن: نقل، أعطى، سلّم، حوّل
     *
     * Transfer(object, from, to, property)
     */
    static Transfer(object: MotherEquation, from: MotherEquation, to: MotherEquation, property?: string): OperatorResult;
    /**
     * 10. مشغل الدمج - Merge Operator
     * يمثل دمج كائنين أو أكثر في كائن واحد
     * يفيد للتعبير عن: دمج، خلط، مزج، وحّد
     *
     * Merge(objects, mergeStrategy)
     */
    static Merge(objects: MotherEquation[], mergeStrategy?: 'average' | 'sum' | 'max' | 'min'): MotherEquation;
    /**
     * 11. مشغل التفكيك - Decompose Operator
     * يمثل تفكيك كائن إلى مكوناته
     * يفيد للتعبير عن: فكك، حلل، قسّم، جزّأ
     *
     * Decompose(object, parts)
     */
    static Decompose(object: MotherEquation, parts: number): MotherEquation[];
    /**
     * 12. مشغل التطور - Evolve Operator
     * يمثل تطور تدريجي للكائن عبر الزمن
     * يفيد للتعبير عن: نما، تطور، تقدم، نضج
     *
     * Evolve(object, evolutionFunction, steps)
     */
    static Evolve(object: MotherEquation, evolutionFunction: (current: any, step: number) => any, steps?: number): OperatorResult;
    /**
     * 13. مشغل التفاعل - Interact Operator
     * يمثل تفاعل متبادل بين كائنين
     * يفيد للتعبير عن: تفاعل، تبادل، تعاون، تصادم
     *
     * Interact(object1, object2, interactionType)
     */
    static Interact(object1: MotherEquation, object2: MotherEquation, interactionType: 'exchange' | 'collision' | 'cooperation' | 'competition'): OperatorResult;
    /**
     * 14. مشغل الاحتواء - Contain Operator
     * يمثل احتواء كائن لكائن آخر
     * يفيد للتعبير عن: احتوى، ضمّ، شمل، حوى
     *
     * Contain(container, content)
     */
    static Contain(container: MotherEquation, content: MotherEquation): OperatorResult;
    /**
     * 15. مشغل الإطلاق - Release Operator
     * يمثل إطلاق أو تحرير كائن
     * يفيد للتعبير عن: أطلق، حرر، أفرج، أخرج
     *
     * Release(container, content)
     */
    static Release(container: MotherEquation, content: MotherEquation): OperatorResult;
}
