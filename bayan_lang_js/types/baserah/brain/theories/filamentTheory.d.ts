/**
 * نظرية الفتائل - Filament Theory
 *
 * المبدأ: النتيجة المعقدة مبنية من فتائل بسيطة (sigmoid + linear)
 *
 * @author Al-Mubtakir
 * @version 1.0.0
 */
/**
 * نوع الفتيل
 * Filament Type
 */
export type FilamentType = 'sigmoid' | 'linear' | 'relu' | 'tanh';
/**
 * معاملات الفتيل
 * Filament Parameters
 */
export interface FilamentParams {
    type: FilamentType;
    weight: number;
    bias: number;
    steepness?: number;
    threshold?: number;
}
/**
 * الفتيل
 * Filament
 */
export interface Filament {
    id: string;
    params: FilamentParams;
    calculate: (input: number) => number;
}
/**
 * دالة السيغمويد
 * Sigmoid function
 *
 * @param x المدخل
 * @param steepness الانحدار (افتراضي: 1)
 * @returns القيمة (0-1)
 */
export declare function sigmoid(x: number, steepness?: number): number;
/**
 * دالة خطية
 * Linear function
 *
 * @param x المدخل
 * @returns القيمة
 */
export declare function linear(x: number): number;
/**
 * دالة ReLU (Rectified Linear Unit)
 *
 * @param x المدخل
 * @param threshold العتبة (افتراضي: 0)
 * @returns القيمة
 */
export declare function relu(x: number, threshold?: number): number;
/**
 * دالة التانه (Hyperbolic Tangent)
 *
 * @param x المدخل
 * @param steepness الانحدار (افتراضي: 1)
 * @returns القيمة (-1 إلى 1)
 */
export declare function tanh(x: number, steepness?: number): number;
/**
 * إنشاء فتيل
 * Create filament
 *
 * @param id معرف الفتيل
 * @param params معاملات الفتيل
 * @returns الفتيل
 */
export declare function createFilament(id: string, params: FilamentParams): Filament;
/**
 * فئة نظرية الفتائل
 * Filament Theory Class
 */
export declare class FilamentTheory {
    private filaments;
    /**
     * إضافة فتيل
     * Add filament
     */
    addFilament(filament: Filament): void;
    /**
     * إزالة فتيل
     * Remove filament
     */
    removeFilament(id: string): boolean;
    /**
     * الحصول على فتيل
     * Get filament
     */
    getFilament(id: string): Filament | undefined;
    /**
     * حساب النتيجة من جميع الفتائل
     * Calculate result from all filaments
     *
     * @param input المدخل
     * @param combineMethod طريقة الدمج (sum, average, max, min)
     * @returns النتيجة
     */
    calculate(input: number, combineMethod?: 'sum' | 'average' | 'max' | 'min'): number;
    /**
     * حساب النتيجة من فتائل محددة
     * Calculate result from specific filaments
     */
    calculateFromFilaments(input: number, filamentIds: string[], combineMethod?: 'sum' | 'average' | 'max' | 'min'): number;
    /**
     * الحصول على عدد الفتائل
     * Get filament count
     */
    getFilamentCount(): number;
    /**
     * الحصول على جميع معرفات الفتائل
     * Get all filament IDs
     */
    getFilamentIds(): string[];
    /**
     * مسح جميع الفتائل
     * Clear all filaments
     */
    clear(): void;
    /**
     * استنساخ
     * Clone
     */
    clone(): FilamentTheory;
}
/**
 * بناء فتائل من مصفوفة معاملات
 * Build filaments from parameter array
 */
export declare function buildFilaments(paramsArray: Array<{
    id: string;
    params: FilamentParams;
}>): FilamentTheory;
