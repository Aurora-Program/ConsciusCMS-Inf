import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { translations, LanguageCode } from './translations';

// Hook personalizado para obtener traducciones
export const useTranslation = () => {
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);
  
  const t = (path: string): any => {
    const keys = path.split('.');
    
  // Normalizar y validar que el idioma existe en las traducciones (acepta 'es'/'en' lowercase)
  const langKey = String(currentLanguage).toUpperCase();
  const availableLanguage = (langKey in translations) ? (langKey as LanguageCode) : 'ES';
  let value: any = translations[availableLanguage];
    
  for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        // Fallback al español si no se encuentra la traducción
        let fallbackValue: any = translations.ES;
    for (const fallbackKey of keys) {
          if (fallbackValue && typeof fallbackValue === 'object' && fallbackKey in fallbackValue) {
            fallbackValue = fallbackValue[fallbackKey];
          } else {
      console.warn(`Missing translation: ${path} for language ${availableLanguage}`);
            // Return undefined so callers can use `t('key') || 'fallback'` to provide a fallback
            return undefined;
          }
        }
        return fallbackValue;
      }
    }
    
  // Permitir strings, arrays, y otros tipos
    // Debug log for troubleshooting language resolution
    try {
      // Only log for projects.* keys to avoid noisy logs
      if (path.startsWith('projects')) {
        console.debug(`[i18n] resolved '${path}' for language ${availableLanguage}:`, value);
      }
    } catch (e) {
      // ignore
    }
    return value !== undefined ? value : undefined;
  };

  return {
    t,
    currentLanguage,
    isLoading: useSelector((state: RootState) => state.language.isLoading)
  };
};

// Hook simplificado para obtener solo la función de traducción
export const useT = () => {
  const { t } = useTranslation();
  return t;
};
