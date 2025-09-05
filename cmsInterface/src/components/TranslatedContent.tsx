import React from 'react';
import { translate } from '../hooks/useTranslation';

interface TranslatedContentProps {
  content: string;
  className?: string;
}

const TranslatedContent: React.FC<TranslatedContentProps> = ({ content, className = '' }) => {
  // Procesar el contenido para reemplazar las claves de traducción
  const processContent = (text: string): string => {
    if (!text) return '';
    
    console.log('Original content:', text); // Debug log
    
    // Buscar patrones como [Missing translation: clave.de.traduccion]
    const translationPattern = /\[Missing translation:\s*([^\]]+)\]/g;
    
    let processedText = text.replace(translationPattern, (match, translationKey) => {
      console.log('Processing key:', translationKey); // Debug log
      
      if (translationKey) {
        const translation = translate(translationKey.trim());
        console.log('Translation result:', translation); // Debug log
        
        // Si encontramos una traducción válida (que no empiece con [Missing translation:)
        if (translation && !translation.startsWith('[Missing translation:')) {
          return translation;
        }
      }
      // Si no hay traducción, devolver el texto original
      return match;
    });
    
    console.log('Processed content:', processedText); // Debug log
    
    return processedText;
  };

  const processedContent = processContent(content);

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: processedContent }} 
    />
  );
};

export default TranslatedContent;
