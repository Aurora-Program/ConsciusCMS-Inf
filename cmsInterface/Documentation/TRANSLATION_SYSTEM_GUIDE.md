# Sistema de Traducciones Aurora - Guía Completa

## Introducción

El Programa Aurora implementa un sistema de traducciones completo que permite cambiar idiomas dinámicamente en toda la aplicación. Este sistema está diseñado para ser escalable, fácil de usar y mantener.

## Arquitectura del Sistema

### 1. Estructura de Archivos

```
src/
├── util/
│   ├── translations.ts      # Archivo principal con todas las traducciones
│   └── useTranslation.ts    # Hook personalizado para usar traducciones
|   └── translations/          # folder with diferent transaltion
|           ├──  en.json # English
|           └──  es.json # Spanish
|
└── Pages/
      └── [component].tsx      # Componentes que usan traducciones

```

### 2. Componentes Principales

#### translations.ts
- IMporta todas las traducciones desde la carpeta traducciones. json files.
- Estructura jerárquica para facilitar la organización
- Soporte para múltiples idiomas (ES, EN)

#### useTranslation.ts
- Hook personalizado que proporciona la función `t()`
- Maneja la lógica de selección de idioma
- Utiliza localStorage para persistir la selección

#### LanguageSelector
- Componente para cambiar entre idiomas
- Actualiza el estado global del idioma

## Guía de Implementación Paso a Paso

### Paso 1: Añadir Traducciones al Archivo translations.ts

1. **Ubicar la sección correcta** en `src/util/translations.ts`
2. **Añadir las claves** tanto en español (ES) como en inglés (EN)

```typescript
export const translations = {
  ES: {
    // Sección About/Acerca
    about: {
      heroTitle: "Acerca del",
      heroTitleHighlight: "Programa Aurora",
      heroSubtitle: "Una iniciativa colaborativa entre humanos e inteligencias artificiales",
      
      mission: {
        title: "Nuestra Misión",
        description: "El Programa Aurora representa un enfoque pionero..."
      },
      
      collaboration: {
        title: "Colaboración Humano-IA",
        human: {
          title: "Visión Humana",
          description: "Los creadores humanos aportan creatividad...",
          points: [
            "Definición de objetivos éticos",
            "Supervisión y validación",
            "Experiencia de usuario",
            "Contexto cultural y social"
          ]
        }
      }
    }
  },
  
  EN: {
    // Sección About
    about: {
      heroTitle: "About the",
      heroTitleHighlight: "Aurora Program",
      heroSubtitle: "A collaborative initiative between humans and artificial intelligences",
      
      mission: {
        title: "Our Mission",
        description: "The Aurora Program represents a pioneering approach..."
      },
      
      collaboration: {
        title: "Human-AI Collaboration",
        human: {
          title: "Human Vision",
          description: "Human creators contribute creativity...",
          points: [
            "Ethical objectives definition",
            "Supervision and validation",
            "User experience",
            "Cultural and social context"
          ]
        }
      }
    }
  }
}
```

### Paso 2: Importar el Hook en el Componente

```typescript
import { useT } from '../util/useTranslation'

function ComponentName() {
    const t = useT()
    // ...resto del componente
}
```

### Paso 3: Reemplazar Texto Hardcodeado

**Antes (hardcodeado):**
```tsx
<h1>Acerca del <span>Programa Aurora</span></h1>
```

**Después (con traducciones):**
```tsx
<h1>{t('about.heroTitle')} <span>{t('about.heroTitleHighlight')}</span></h1>
```

### Paso 4: Manejar Arrays de Texto

**Para listas o arrays:**
```tsx
<ul>
  {t('about.collaboration.human.points').map((point: string, index: number) => (
    <li key={index}>{point}</li>
  ))}
</ul>
```

### Paso 5: Verificar la Implementación

1. **Comprobar que el selector de idiomas funciona**
2. **Verificar que todos los textos cambian correctamente**
3. **Validar que no hay errores en consola**

## Estructura de Claves Recomendada

### Convenciones de Nomenclatura

1. **Usar camelCase** para las claves: `heroTitle`, `missionDescription`
2. **Organizar jerárquicamente**: `about.hero.title`, `about.mission.description`
3. **Ser descriptivo**: `ctaReadManifesto` mejor que `button1`
4. **Mantener consistencia**: Si usas `title` en una sección, úsalo en todas

### Organización por Secciones

```typescript
{
  // Navegación global
  nav: { home: "...", about: "..." },
  
  // Elementos comunes
  common: { loading: "...", error: "..." },
  
  // Páginas específicas
  home: { hero: {...}, features: {...} },
  about: { hero: {...}, mission: {...} },
  articles: { title: "...", filters: {...} }
}
```

## Mejores Prácticas

### 1. Consistencia
- Usar las mismas claves en ambos idiomas
- Mantener la misma estructura jerárquica
- Validar que no falten traducciones

### 2. Mantenimiento
- Comentar secciones complejas
- Agrupar traducciones relacionadas
- Usar nombres descriptivos

### 3. Performance
- El hook `useT()` es eficiente y no causa re-renders innecesarios
- Las traducciones se cargan una vez al inicio

### 4. Debugging
```typescript
// Para debuggear, puedes añadir logs:
const t = useT()
console.log('Current language:', t('_currentLang')) // Si implementas esta función
```

## Ejemplo Completo: Convertir Página About

### Antes (hardcodeado):
```tsx
const Acerca = () => {
  return (
    <div>
      <h1>Acerca del Programa Aurora</h1>
      <p>Una iniciativa colaborativa...</p>
    </div>
  )
}
```

### Después (con traducciones):
```tsx
import { useT } from '../util/useTranslation'

const Acerca = () => {
  const t = useT()
  
  return (
    <div>
      <h1>{t('about.heroTitle')} {t('about.heroTitleHighlight')}</h1>
      <p>{t('about.heroSubtitle')}</p>
    </div>
  )
}
```

## Solución de Problemas Comunes

### 1. La traducción no aparece
- **Verificar** que la clave existe en `translations.ts`
- **Comprobar** que está en ambos idiomas (ES y EN)
- **Revisar** la sintaxis del objeto JavaScript
- **⚠️ CRÍTICO: Verificar duplicaciones** - Si hay múltiples secciones con la misma clave (ej. múltiples `about: {}`), la última sobrescribe a las anteriores

### 2. Error "[Missing translation: ...]"
- **Causa común**: Secciones duplicadas en el archivo de traducciones
- **Solución**: Buscar y eliminar duplicaciones con `grep -n "claveDuplicada:" src/util/translations.ts`
- **Ejemplo**: Si tienes dos secciones `about: {}`, solo la última será válida

### 3. El idioma no cambia
- **Verificar** que `LanguageSelector` está importado correctamente
- **Comprobar** que el localStorage se está actualizando
- **Revisar** la consola para errores

### 4. Error "t(...).map is not a function"
- **Causa**: La traducción devuelve string en lugar de array
- **Solución**: Verificar que la función `useTranslation` tiene tipo de retorno `any` en lugar de `string`
- **Protección**: Usar `Array.isArray(t('clave'))` antes de `.map()`

### 5. Error de TypeScript
- **Asegurar** que las claves son consistentes
- **Verificar** que el tipo de retorno coincide (string vs array)

## Comandos Útiles para Validar

```bash
# Buscar texto hardcodeado que debería ser traducido
grep -r "\"[A-Za-z]" src/Pages/ | grep -v "className\|import\|export"

# Verificar que una clave existe en ambos idiomas
grep -n "keyName" src/util/translations.ts
```

## Próximos Pasos

1. **Implementar esta guía** en la página About
2. **Crear templates** para páginas nuevas
3. **Añadir más idiomas** si es necesario
4. **Crear tests** para validar traducciones

---

## Cambios recientes (25-08-2025)

Se han realizado cambios recientes en el sistema de traducciones para soportar la localización completa de la página de Perfil y varios diálogos/ventanas modales.

- Archivos añadidos/actualizados:
  - `src/profile.tsx` — ahora usa el hook `useT()` y llamadas `t('profile.*')` en cabeceras, etiquetas, placeholders y botones de los modales.
  - `src/util/translations/en.json` — se añadieron las claves bajo `profile` (títulos de modal, labels, placeholders, textos de licencia y botones).
  - `src/util/translations/es.json` — se añadieron las mismas claves en español para mantener la paridad.

- Claves principales añadidas (resumen):
  - `profile.siteModalTitle`, `profile.siteModalLabel`, `profile.siteModalPlaceholder`
  - `profile.logoModalTitle`, `profile.logoModalLabel`, `profile.saveLogo`
  - `profile.loginImageModalTitle`, `profile.loginImageModalLabel`, `profile.saveImage`
  - `profile.contactModalTitle`, `profile.contactModalLabel`, `profile.contactModalPlaceholder`
  - `profile.phoneModalTitle`, `profile.phoneModalLabel`, `profile.phoneModalPlaceholder`
  - `profile.emailModalTitle`, `profile.emailModalLabel`, `profile.emailModalPlaceholder`
  - `profile.licenseModalTitle`, `profile.termsHeading`, `profile.termsIntro`, `profile.termsSection*`, `profile.termsList*`, `profile.noteStrong`, `profile.noteBody`, `profile.understood`

- Notas importantes:
  - Asegúrate de que las claves añadidas existan en ambos archivos (`en.json` / `es.json`) para evitar que el hook haga fallback inesperado.
  - Anteriormente hubo un fallo 500 causado por un `en.json` malformado; se corrigió y ahora ambos JSON son válidos.

## Verificación rápida (runtime)

1. Reinicia el servidor de desarrollo y abre la aplicación.
2. Abre DevTools → Network y filtra por `en.json`/`es.json` para confirmar que las peticiones devuelven HTTP 200 cuando cambias el idioma.
3. Cambia el idioma desde el selector de idioma en la UI y confirma que los textos en `Perfil` y los modales se actualizan.
4. Si no se actualizan:
   - Verifica en Redux que `state.language.currentLanguage` cambie a `EN` o `ES`.
   - Confirma en Network que la traducción correspondiente fue solicitada (200).
   - Comprueba la consola por errores o por claves faltantes que el hook pueda reportar.

---

*Esta guía debe actualizarse cada vez que se añadan nuevas funcionalidades al sistema de traducciones.*
