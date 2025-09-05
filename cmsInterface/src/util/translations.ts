// Per-language translation files (one file per language)
// Note: the folder is `Translations` (capital T) on disk; keep import casing consistent
import es from './Translations/es.json';
import en from './Translations/en.json';
import fr from './Translations/fr.json';

export const translations = {
  ES: es,
  EN: en,
  FR: fr
} as const;

// Types
export type TranslationKeys = keyof typeof translations.ES;
export type LanguageCode = keyof typeof translations;
