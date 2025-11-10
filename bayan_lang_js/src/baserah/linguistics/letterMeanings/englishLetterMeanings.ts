/**
 * English Letter Meanings Database
 * قاعدة بيانات معاني الحروف الإنجليزية
 * 
 * This module provides semantic meanings for English letters
 * based on phonetic properties, historical etymology, and usage patterns.
 * 
 * Note: These are placeholder meanings that will be filled with proper
 * research-based meanings later.
 */

import { LetterMeaning, MeaningSource } from './letterMeaningAnalyzer';

export interface EnglishLetterData {
  letter: string;
  meanings: string[];
  phonetic: string;
  articulationPoint: string;
  examples: string[];
}

/**
 * English Letter Meanings Database
 * قاعدة بيانات معاني الحروف الإنجليزية
 * 
 * Temporary structure - to be filled with proper meanings later
 */
export const ENGLISH_LETTER_MEANINGS: EnglishLetterData[] = [
  {
    letter: 'a',
    meanings: ['meaning1', 'meaning2', 'meaning3'],
    phonetic: '/eɪ/ or /æ/',
    articulationPoint: 'open vowel',
    examples: []
  },
  {
    letter: 'b',
    meanings: ['meaning1', 'meaning2', 'meaning3'],
    phonetic: '/b/',
    articulationPoint: 'bilabial plosive',
    examples: []
  },
  {
    letter: 'c',
    meanings: ['meaning1', 'meaning2', 'meaning3'],
    phonetic: '/k/ or /s/',
    articulationPoint: 'velar/alveolar',
    examples: []
  },
  {
    letter: 'd',
    meanings: ['meaning1', 'meaning2', 'meaning3'],
    phonetic: '/d/',
    articulationPoint: 'alveolar plosive',
    examples: []
  },
  {
    letter: 'e',
    meanings: ['meaning1', 'meaning2', 'meaning3'],
    phonetic: '/iː/ or /ɛ/',
    articulationPoint: 'front vowel',
    examples: []
  },
  {
    letter: 'f',
    meanings: ['meaning1', 'meaning2', 'meaning3'],
    phonetic: '/f/',
    articulationPoint: 'labiodental fricative',
    examples: []
  },
  {
    letter: 'g',
    meanings: ['meaning1', 'meaning2', 'meaning3'],
    phonetic: '/ɡ/ or /dʒ/',
    articulationPoint: 'velar plosive',
    examples: []
  },
  {
    letter: 'h',
    meanings: ['meaning1', 'meaning2', 'meaning3'],
    phonetic: '/h/',
    articulationPoint: 'glottal fricative',
    examples: []
  },
  {
    letter: 'i',
    meanings: ['meaning1', 'meaning2', 'meaning3'],
    phonetic: '/aɪ/ or /ɪ/',
    articulationPoint: 'front vowel',
    examples: []
  },
  {
    letter: 'j',
    meanings: ['meaning1', 'meaning2', 'meaning3'],
    phonetic: '/dʒ/',
    articulationPoint: 'palato-alveolar affricate',
    examples: []
  },
  {
    letter: 'k',
    meanings: ['meaning1', 'meaning2', 'meaning3'],
    phonetic: '/k/',
    articulationPoint: 'velar plosive',
    examples: []
  },
  {
    letter: 'l',
    meanings: ['meaning1', 'meaning2', 'meaning3'],
    phonetic: '/l/',
    articulationPoint: 'alveolar lateral',
    examples: []
  },
  {
    letter: 'm',
    meanings: ['meaning1', 'meaning2', 'meaning3'],
    phonetic: '/m/',
    articulationPoint: 'bilabial nasal',
    examples: []
  },
  {
    letter: 'n',
    meanings: ['meaning1', 'meaning2', 'meaning3'],
    phonetic: '/n/',
    articulationPoint: 'alveolar nasal',
    examples: []
  },
  {
    letter: 'o',
    meanings: ['meaning1', 'meaning2', 'meaning3'],
    phonetic: '/oʊ/ or /ɒ/',
    articulationPoint: 'back vowel',
    examples: []
  },
  {
    letter: 'p',
    meanings: ['meaning1', 'meaning2', 'meaning3'],
    phonetic: '/p/',
    articulationPoint: 'bilabial plosive',
    examples: []
  },
  {
    letter: 'q',
    meanings: ['meaning1', 'meaning2', 'meaning3'],
    phonetic: '/kw/',
    articulationPoint: 'velar plosive + labial',
    examples: []
  },
  {
    letter: 'r',
    meanings: ['meaning1', 'meaning2', 'meaning3'],
    phonetic: '/r/',
    articulationPoint: 'alveolar approximant',
    examples: []
  },
  {
    letter: 's',
    meanings: ['meaning1', 'meaning2', 'meaning3'],
    phonetic: '/s/ or /z/',
    articulationPoint: 'alveolar fricative',
    examples: []
  },
  {
    letter: 't',
    meanings: ['meaning1', 'meaning2', 'meaning3'],
    phonetic: '/t/',
    articulationPoint: 'alveolar plosive',
    examples: []
  },
  {
    letter: 'u',
    meanings: ['meaning1', 'meaning2', 'meaning3'],
    phonetic: '/juː/ or /ʌ/',
    articulationPoint: 'back vowel',
    examples: []
  },
  {
    letter: 'v',
    meanings: ['meaning1', 'meaning2', 'meaning3'],
    phonetic: '/v/',
    articulationPoint: 'labiodental fricative',
    examples: []
  },
  {
    letter: 'w',
    meanings: ['meaning1', 'meaning2', 'meaning3'],
    phonetic: '/w/',
    articulationPoint: 'labial-velar approximant',
    examples: []
  },
  {
    letter: 'x',
    meanings: ['meaning1', 'meaning2', 'meaning3'],
    phonetic: '/ks/ or /z/',
    articulationPoint: 'velar + alveolar',
    examples: []
  },
  {
    letter: 'y',
    meanings: ['meaning1', 'meaning2', 'meaning3'],
    phonetic: '/j/ or /aɪ/',
    articulationPoint: 'palatal approximant',
    examples: []
  },
  {
    letter: 'z',
    meanings: ['meaning1', 'meaning2', 'meaning3'],
    phonetic: '/z/',
    articulationPoint: 'alveolar fricative',
    examples: []
  }
];

/**
 * Initialize English letter meanings in the system
 * تهيئة معاني الحروف الإنجليزية في النظام
 */
export function initializeEnglishLetterMeanings(): Map<string, LetterMeaning[]> {
  const meanings = new Map<string, LetterMeaning[]>();
  let meaningCounter = 0;

  for (const letterData of ENGLISH_LETTER_MEANINGS) {
    const letterMeanings: LetterMeaning[] = [];

    for (let i = 0; i < letterData.meanings.length; i++) {
      const meaning: LetterMeaning = {
        id: `en_meaning_${meaningCounter++}`,
        letter: letterData.letter,
        meaning: letterData.meanings[i],
        opposite: null,
        examples: letterData.examples,
        strength: 1.0,
        confidence: 0.5, // Lower confidence since these are placeholders
        source: 'system' as MeaningSource,
        wordsCount: letterData.examples.length,
        timestamp: Date.now()
      };

      letterMeanings.push(meaning);
    }

    meanings.set(letterData.letter, letterMeanings);
  }

  return meanings;
}

/**
 * Get phonetic information for an English letter
 * الحصول على المعلومات الصوتية لحرف إنجليزي
 */
export function getPhoneticInfo(letter: string): EnglishLetterData | undefined {
  return ENGLISH_LETTER_MEANINGS.find(data => data.letter === letter.toLowerCase());
}

/**
 * Analyze English name/word using letter meanings
 * تحليل اسم/كلمة إنجليزية باستخدام معاني الحروف
 */
export function analyzeEnglishWord(word: string): {
  word: string;
  letters: string[];
  meanings: string[];
  phonetics: string[];
} {
  const letters = word.toLowerCase().split('');
  const meanings: string[] = [];
  const phonetics: string[] = [];

  for (const letter of letters) {
    const letterData = getPhoneticInfo(letter);
    if (letterData) {
      meanings.push(...letterData.meanings);
      phonetics.push(letterData.phonetic);
    }
  }

  // Remove duplicates
  const uniqueMeanings = [...new Set(meanings)];

  return {
    word,
    letters,
    meanings: uniqueMeanings,
    phonetics
  };
}

/**
 * Export for use in examples
 */
export const englishLetterMeaningsForExamples = {
  'a': ['meaning1', 'meaning2', 'meaning3'],
  'b': ['meaning1', 'meaning2', 'meaning3'],
  'c': ['meaning1', 'meaning2', 'meaning3'],
  'd': ['meaning1', 'meaning2', 'meaning3'],
  'e': ['meaning1', 'meaning2', 'meaning3'],
  'f': ['meaning1', 'meaning2', 'meaning3'],
  'g': ['meaning1', 'meaning2', 'meaning3'],
  'h': ['meaning1', 'meaning2', 'meaning3'],
  'i': ['meaning1', 'meaning2', 'meaning3'],
  'j': ['meaning1', 'meaning2', 'meaning3'],
  'k': ['meaning1', 'meaning2', 'meaning3'],
  'l': ['meaning1', 'meaning2', 'meaning3'],
  'm': ['meaning1', 'meaning2', 'meaning3'],
  'n': ['meaning1', 'meaning2', 'meaning3'],
  'o': ['meaning1', 'meaning2', 'meaning3'],
  'p': ['meaning1', 'meaning2', 'meaning3'],
  'q': ['meaning1', 'meaning2', 'meaning3'],
  'r': ['meaning1', 'meaning2', 'meaning3'],
  's': ['meaning1', 'meaning2', 'meaning3'],
  't': ['meaning1', 'meaning2', 'meaning3'],
  'u': ['meaning1', 'meaning2', 'meaning3'],
  'v': ['meaning1', 'meaning2', 'meaning3'],
  'w': ['meaning1', 'meaning2', 'meaning3'],
  'x': ['meaning1', 'meaning2', 'meaning3'],
  'y': ['meaning1', 'meaning2', 'meaning3'],
  'z': ['meaning1', 'meaning2', 'meaning3']
};

