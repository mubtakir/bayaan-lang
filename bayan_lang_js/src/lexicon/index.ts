/**
 * نظام المعاجم - Lexicon System
 * Complete lexicon management system
 *
 * Supports both Arabic and English
 * يدعم العربية والإنجليزية
 */

// Arabic lexicon components
export * from './rootAnalyzer';
export {
  DerivationGenerator,
  type Derivation,
  type DerivationType,
  type DerivationForm
} from './derivationGenerator';
export type { DerivationRule as ArabicDerivationRule } from './derivationGenerator';

// English lexicon components
export * from './englishRootAnalyzer';
export {
  EnglishDerivationGenerator,
  type EnglishDerivation,
  type EnglishDerivationType
} from './englishDerivationGenerator';
export type { DerivationRule as EnglishDerivationRule } from './englishDerivationGenerator';

// Shared components
export * from './lexiconEngine';
export * from './lexiconManager';

// Multilingual manager
export * from './multilingualLexiconManager';

