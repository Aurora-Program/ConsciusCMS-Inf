// Per-language translation files (one file per language)
import es from './translations/es.json';
import en from './translations/en.json';

export const translations = {
  ES: es,
  EN: en
};

// Types
export type TranslationKeys = keyof typeof translations.ES;
export type LanguageCode = keyof typeof translations;
