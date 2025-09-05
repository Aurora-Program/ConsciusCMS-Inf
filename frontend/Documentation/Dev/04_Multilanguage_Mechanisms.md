# Guía: Mecanismos multi-idioma para nuevas páginas

Propósito
- Explicar cómo usar el sistema de traducciones central (`src/util/translations.ts` + `useTranslation`) para que nuevas páginas soporten multi-idioma de forma automática.

Arquitectura
- `src/util/translations.ts` — objeto con claves por idioma (ES/EN).
- `src/util/useTranslation.ts` — hook `useT()` o `useTranslation()` que proporciona `t(key)`.
- `LanguageSelector` — componente que actualiza el idioma en Redux/localStorage.

Pasos para hacer una página multi-idioma
1. Añadir claves en `translations.ts` bajo la sección adecuada (ej. `home.hero.welcome`).
2. En el componente, reemplazar texto hardcodeado por `t('path.to.key')`.
3. Usar arrays en las traducciones cuando necesites listas; siempre comprobar `Array.isArray` antes de `.map()`.
4. En componentes complejos (ej. `articles-template`), añadir fallbacks si la clave falta.

Persistencia y cambios
- El selector guarda el idioma en `localStorage` y/o en Redux para persistir la preferencia.
- Cambios en runtime: `useTranslation` debe provocar re-render cuando el idioma cambie.

Errores comunes
- Claves duplicadas en `translations.ts` que sobrescriben valores.
- `t('...').map is not a function` — la clave devuelve string en vez de array.
- No actualizar `App.tsx` o no incluir `LanguageSelector` en la UI.

Prácticas recomendadas
- Nombrado jerárquico y descriptivo para claves.
- Mantener la misma estructura en todos los idiomas.
- Validar la cobertura de traducciones con scripts sencillos (grep).

Ejemplo rápido
```tsx
import { useT } from '../util/useTranslation'

const MyPage = () => {
  const t = useT()
  return (
    <div className="aurora-container">
      <h1>{t('myPage.title')}</h1>
      <p>{t('myPage.subtitle')}</p>
    </div>
  )
}
```

Ejemplo de `translations.ts` (estructura sugerida)

```ts
export const translations = {
  ES: {
    myPage: { title: 'Mi página', subtitle: 'Subtítulo en español' },
    common: { loading: 'Cargando...' }
  },
  EN: {
    myPage: { title: 'My page', subtitle: 'Subtitle in English' },
    common: { loading: 'Loading...' }
  }
}
```

Ejemplo simplificado de `useTranslation` hook

```ts
import { translations } from './translations'
import { useState } from 'react'

export function useT(){
  const [lang] = useState(localStorage.getItem('language') || 'ES')
  return (key: string) => {
    const parts = key.split('.')
    let ptr: any = translations[lang]
    for(const p of parts){ if(!ptr) return key; ptr = ptr[p] }
    return ptr ?? key
  }
}
```
