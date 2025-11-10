/**
 * نظام المعاجم - Lexicon System
 * Complete lexicon management system
 *
 * Supports both Arabic and English
 * يدعم العربية والإنجليزية
 */
export * from './rootAnalyzer';
export { DerivationGenerator, type Derivation, type DerivationType, type DerivationForm } from './derivationGenerator';
export type { DerivationRule as ArabicDerivationRule } from './derivationGenerator';
export * from './englishRootAnalyzer';
export { EnglishDerivationGenerator, type EnglishDerivation, type EnglishDerivationType } from './englishDerivationGenerator';
export type { DerivationRule as EnglishDerivationRule } from './englishDerivationGenerator';
export * from './lexiconEngine';
export * from './lexiconManager';
export * from './multilingualLexiconManager';
