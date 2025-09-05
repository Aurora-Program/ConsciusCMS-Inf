import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { translations, LanguageCode } from './translations';

// Hook personalizado para obtener traducciones
export const useTranslation = () => {
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);
  
  const t = (path: string): any => {
    const keys = path.split('.');
    
    // Validar que el idioma existe en las traducciones
    const availableLanguage = (currentLanguage in translations) ? currentLanguage as LanguageCode : 'ES';
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
            return `[Missing translation: ${path}]`;
          }
        }
        return fallbackValue;
      }
    }
    
    // Permitir strings, arrays, y otros tipos
    return value !== undefined ? value : `[Invalid translation path: ${path}]`;
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

// named default-style export for convenience
export default useT;
