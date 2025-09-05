 # Guía: Estandarización de estilos y plantilla de diseño

 Objetivo
 - Crear un conjunto de reglas, variables y componentes CSS reutilizables (Design System) que garantice consistencia, accesibilidad y facilidad de mantenimiento.

 Alcance
 - Frontend web del proyecto (carpetas bajo `src/`), snippets y plantillas que puedan reutilizarse en páginas y componentes React.

 Resultado esperado
 - Un conjunto de ficheros CSS organizados por propósito.
 - Tokens (variables) centralizados y documentados.
 - Conjunto de clases utilitarias y de componentes base con nomenclatura consistente (`aurora-*`).

 Estructura de ficheros recomendada (src/styles/)
 - `aurora-tokens.css`      — variables globales (colores, tipografías, spacing, breakpoints)
 - `aurora-base.css`        — reset, tipografías base, reglas globales
 - `aurora-layout.css`      — containers, grid, utilidades de layout
 - `aurora-components.css`  — componentes (card, btn, hero, badge, modal)
 - `aurora-utils.css`       — helpers atómicos (spacing, text, visibility)
 - `aurora-theme-dark.css`  — solo variables para tema oscuro (si aplica)

 Convenciones y naming
 - Prefijo de clases: `aurora-` (ej: `.aurora-container`, `.aurora-card`).
 - Prefijo de variables: `--aurora-` (ej: `--aurora-primary`, `--aurora-space-md`).
 - Componentes vs utilidades:
   - Componentes: nombres descriptivos y encapsulados (`.aurora-card`, `.aurora-hero`).
   - Utilidades: prefijo `u-` o `util-` para uso rápido (`.u-mt-16`, `.u-text-center`).
 - Mobile-first: usar `min-width` para media queries y diseñar primero para móvil.
 - Evitar estilos inline salvo casos justificados; documentar excepciones.

 Tokens (ejemplo minimalista — `aurora-tokens.css`)
 ```css
 :root{
   /* Colors */
   --aurora-primary: #1e4a7a;
   --aurora-primary-600: #2563eb;
   --aurora-accent: #F0E68C;
   --aurora-bg: #ffffff;
   --aurora-text: #111827;
   --aurora-muted: #6b7280;

   /* Spacing */
   --aurora-space-xs: 4px;
   --aurora-space-sm: 8px;
   --aurora-space-md: 16px;
   --aurora-space-lg: 24px;
   --aurora-space-xl: 48px;

   /* Radii & sizes */
   --aurora-radius: 8px;
   --aurora-max-width: 1200px;

   /* Typography */
   --aurora-font-sans: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
   --aurora-font-base: 16px;
   --aurora-line-height: 1.5;

   /* Breakpoints */
   --aurora-breakpoint-sm: 600px;
   --aurora-breakpoint-md: 900px;
   --aurora-breakpoint-lg: 1200px;
 }
 ```

 Base y utilidades (ejemplos — `aurora-base.css`, `aurora-utils.css`)
 ```css
 /* aurora-base.css */
 *{box-sizing:border-box}
 html{font-family:var(--aurora-font-sans);font-size:var(--aurora-font-base);line-height:var(--aurora-line-height)}
 body{margin:0;background:var(--aurora-bg);color:var(--aurora-text)}
 .aurora-container{max-width:var(--aurora-max-width);margin:0 auto;padding:0 var(--aurora-space-md)}

 /* aurora-utils.css */
 .u-mt-8{margin-top:8px}.u-mt-16{margin-top:16px}
 .u-mb-16{margin-bottom:16px}
 .u-text-center{text-align:center}
 .u-hidden{display:none}
 .u-truncate{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
 .sr-only{position:absolute;width:1px;height:1px;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);border:0;padding:0}
 ```

 Componentes base (ejemplos — `aurora-components.css`)
 ```css
 .aurora-hero{background:linear-gradient(135deg,var(--aurora-primary),var(--aurora-primary-600));padding:var(--aurora-space-xl) 0;color:#fff}
 .aurora-section{padding:var(--aurora-space-lg) 0}
 .aurora-card{background:#fff;border-radius:var(--aurora-radius);box-shadow:0 6px 18px rgba(0,0,0,.06);padding:var(--aurora-space-md)}
 .aurora-btn{border-radius:var(--aurora-radius);padding:10px 16px;border:0;cursor:pointer;display:inline-block}
 .aurora-btn--primary{background:var(--aurora-primary);color:#fff}
 .aurora-btn--muted{background:transparent;color:var(--aurora-muted);border:1px solid #e5e7eb}
 .aurora-grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
 @media (max-width:900px){.aurora-grid-3{grid-template-columns:repeat(2,1fr)}}
 @media (max-width:600px){.aurora-grid-3{grid-template-columns:1fr}}
 ```

 Theming
 - Mantener variables en `aurora-tokens.css`. Para tema oscuro crear `aurora-theme-dark.css` que reescriba variables.

 Migración: proceso recomendado para una página
 1. Añadir la importación de los CSS del Design System en la página/componente (si no existe):
    - `import "../styles/aurora-base.css"` (o incluir en entry point global `main.tsx`).
 2. Localizar estilos inline y clases locales.
 3. Mapear cada estilo a una clase `aurora-*` o una utilidad `u-*`.
 4. Extraer colores/tamaños a tokens si son nuevos.
 5. Probar visualmente en dispositivos y ejecutar accesibilidad básica.
 6. Eliminar estilos obsoletos y limpiar CSS no usado.

 QA y validación
 - Accesibilidad: ejecutar Lighthouse / axe para comprobar contraste y foco.
 - Visual: validar Desktop / Tablet / Mobile; añadir capturas o tests visuales si es posible.
 - Performance: comprobar tamaño CSS final; preferir clases reutilizables sobre duplicación.

 Herramientas útiles
 - Lighthouse, axe-core, Storybook (para componentes), Chromatic (visual regression), PurgeCSS/UnoCSS (limpieza de estilos no usados).

 Pequeñas reglas de oro
 - Prefiere variables sobre valores literales.
 - Documenta cada componente en `aurora-components.css` con un breve comentario.
 - Usa utilidades para spacing en lugar de estilos inline.

 Plantilla práctica (quick-start)
 - Crear `src/styles/aurora-tokens.css` y pegar tokens.
 - Crear `src/styles/aurora-base.css`, `aurora-utils.css`, `aurora-components.css` con snippets arriba.
 - Incluir en `src/main.tsx` o `src/index.css`:
 ```ts
 import './styles/aurora-tokens.css'
 import './styles/aurora-base.css'
 import './styles/aurora-utils.css'
 import './styles/aurora-components.css'
 ```

 Recomendación final
 - Empezar migrando 1-2 páginas (página principal y un listado) como piloto. Documentar el flujo y convertir el resto por lotes.

 Recursos y archivos relevantes
 - `src/aurora-design-system.css` (si existe actualmente)
 - `src/aurora-palette.css` (paleta actual)
 - `Documentation/Dev/AURORA_DESIGN_SYSTEM_GUIDE.md`

 ---

 ## Estado de implementación

 ✅ **Completado:**
 - Archivos CSS creados en `src/styles/`
 - Tokens y variables centralizadas
 - Componentes base (hero, card, btn, grid)
 - Utilidades atómicas
 - Importación en `main.tsx`
 - Migración piloto: `src/Pages/ideas.tsx`

 📋 **Completado recientemente:**
 - ✅ **Integración completa de patrones de articles.css**: Los estilos de alta calidad de `articles.css` han sido extraídos e integrados en el sistema estandarizado, incluyendo:
   - Sistema de colores extendido con variantes
   - Gradientes sofisticados y animaciones elegantes
   - Componentes mejorados (cards con acentos dorados, hero animado, controles de búsqueda)
   - Utilidades expandidas con efectos hover y transiciones
   - Sistema de tags y estados de carga
 - ✅ **Tipografía de Hero estandarizada**: Basado en los estilos de la página `idea.tsx`, se ha creado un sistema consistente de títulos para heroes:
   - `.aurora-hero-title`: 3.5rem, peso 800, con sombra de texto
   - `.aurora-hero-subtitle`: 1.3rem, peso 300, centrado con max-width 800px
   - `.aurora-hero-description`: 1rem, peso 400, centrado con max-width 600px
   - Responsivo automático (reduce a 2.5rem en mobile)
 - ✅ **Estructura de Hero de ancho completo**: Basado en la página `articles.tsx`, se ha estandarizado la estructura de hero:
   - `.aurora-hero`: Hero que ocupa 100% del ancho del viewport
   - `.aurora-hero-content`: Contenedor interno centrado con max-width para el contenido
   - `.aurora-page-container`: Contenedor de página completa con gradiente de fondo
   - Estructura responsive que funciona en todos los dispositivos
 
 📋 **Por hacer:**
 - ✅ **Migración de manifest.tsx completada**: Página manifest estandarizada usando el sistema Aurora con:
   - Estructura de hero de ancho completo con título y subtítulo
   - Contenido en card centrada con estilos de artículo
   - Footer estandarizado con utilidades Aurora
   - Eliminación de CSS específico (manifest.css ya no necesario)
   - Uso completo de clases estandarizadas (.aurora-hero, .aurora-card, .aurora-content, etc.)
 - Migrar páginas adicionales usando los nuevos patrones mejorados y tipografía estandarizada
 - Tests de accesibilidad con componentes mejorados
 - Documentación de componentes avanzados extraídos de articles.css

### Ejemplo de Hero con Tipografía Estandarizada y Ancho Completo

```html
<!-- Estructura estándar de página principal con hero de ancho completo -->
<div class="aurora-page-container">
  <header class="aurora-hero">
    <div class="aurora-hero-content">
      <h1 class="aurora-hero-title">
        <i class="fas fa-newspaper aurora-icon-accent"></i>
        Título Principal
      </h1>
      <p class="aurora-hero-subtitle">Subtítulo descriptivo elegante</p>
      <!-- Controles adicionales para páginas de listado -->
      <div class="aurora-articles-controls">
        <div class="aurora-search-box">
          <input type="text" class="aurora-search-input" placeholder="Buscar...">
        </div>
      </div>
    </div>
  </header>
  
  <main>
    <div class="aurora-container">
      <section class="aurora-section">
        <!-- Contenido de la página -->
      </section>
    </div>
  </main>
</div>

<!-- Estructura para páginas individuales (como idea.tsx, manifest.tsx) -->
<div class="aurora-page-container">
  <header class="aurora-hero">
    <div class="aurora-hero-content">
      <h1 class="aurora-hero-title--page">
        <i class="fas fa-scroll aurora-icon-accent"></i>
        Título de Página Individual
      </h1>
      <p class="aurora-hero-subtitle">Subtítulo descriptivo</p>
      <div class="aurora-hero-description">
        <span class="aurora-tag">Categoría</span>
      </div>
    </div>
  </header>
</div>
```

### Diferencias de Títulos:
- **`.aurora-hero-title`**: Para páginas principales (3.5rem, peso 800) - como articles.tsx
- **`.aurora-hero-title--page`**: Para páginas individuales (2.5rem, peso 700) - como idea.tsx, manifest.tsx

### Estructura de Hero Estándar:
- **`.aurora-hero`**: Hero de ancho completo (100% del viewport)
- **`.aurora-hero-content`**: Contenedor interno que ocupa 100% del ancho con padding lateral
- **`.aurora-page-container`**: Contenedor de página completa con fondo
- **`.aurora-container`**: Contenedor estándar para contenido (max-width: 1200px)
- **`.aurora-icon-accent`**: Iconos con color dorado y efecto glow

 ## Ejemplo práctico de migración

 Ver `src/styles/README.md` para ejemplo detallado del antes/después de la página Ideas.

 ### Clases más utilizadas (actualizadas con patrones de articles.css)
 ```css
 .aurora-page-container /* Contenedor de página completa con fondo gradient */
 .aurora-container    /* Contenedor principal con max-width centrado */
 .aurora-hero        /* Hero section de ancho completo con gradiente y animaciones */
 .aurora-hero-content /* Contenedor interno del hero (100% ancho, padding lateral) */
 .aurora-hero-title  /* Título principal estandarizado (3.5rem, peso 800) - para páginas principales */
 .aurora-hero-title--page /* Título para páginas individuales (2.5rem, peso 700) - como idea.tsx */
 .aurora-hero-subtitle /* Subtítulo estandarizado (1.3rem, peso 300) */
 .aurora-hero-description /* Descripción hero (1rem, peso 400) */
 .aurora-section     /* Sección con padding vertical */
 .aurora-card        /* Card con acento dorado y hover effects */
 .aurora-content     /* Estilos para contenido de artículos/manifest (tipografía, párrafos, listas) */
 .aurora-icon-accent /* Iconos con color dorado y glow effect */
 .aurora-btn--primary /* Botón primario con transformaciones */
 .aurora-btn--gold   /* Botón con gradiente dorado */
 .aurora-grid-auto   /* Grid responsivo con auto-fill */
 .aurora-search-input /* Input de búsqueda estilizado */
 .aurora-tag         /* Tags con estilo dorado */
 .u-hover-lift       /* Efecto hover de elevación */
 .u-text-center      /* Centrar texto */
 .u-gap-lg          /* Gap usando tokens de espaciado */
 .u-max-w-lg         /* Max width large (960px) */
 .u-mx-auto          /* Margin horizontal auto (centrado) */
 .u-bg-subtle        /* Background color subtle */
 ```

 **Estado actual:** Sistema de diseño completamente funcional con patrones de alta calidad integrados de articles.css. Listo para migración de páginas adicionales.
