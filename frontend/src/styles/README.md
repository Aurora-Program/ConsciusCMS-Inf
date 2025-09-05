# Ejemplo de Migración: Página Ideas

## Antes vs Después

### Antes (clases específicas)
```tsx
<div className="aurora-articles-container">
  <header className="aurora-articles-hero">
    <div className="aurora-container">
      <div className="aurora-articles-hero-content">
        <h1 className="aurora-title-main">Ideas</h1>
        <p className="aurora-subtitle">Collected ideas</p>
      </div>
    </div>
  </header>
  
  <article className="aurora-article-card">
    <div className="aurora-article-content">
      <h2 className="aurora-article-title">Título</h2>
      <p className="aurora-article-excerpt">Descripción...</p>
    </div>
    <div className="aurora-article-footer">
      <a className="aurora-btn primary">Ver idea</a>
    </div>
  </article>
</div>
```

### Después (clases estandarizadas)
```tsx
<div>
  <header className="aurora-hero">
    <div className="aurora-container">
      <div className="u-text-center">
        <h1 className="h1">Ideas</h1>
        <p>Collected ideas</p>
      </div>
    </div>
  </header>
  
  <article className="aurora-card">
    <div>
      <h2 className="h2">Título</h2>
      <p className="u-mb-16">Descripción...</p>
    </div>
    <div className="u-mt-16">
      <a className="aurora-btn aurora-btn--primary">Ver idea</a>
    </div>
  </article>
</div>
```

## Beneficios de la migración

### Variables CSS centralizadas
- `--aurora-primary` en lugar de colores hardcoded
- `--aurora-space-md` para spacing consistente
- `--aurora-radius` para bordes redondeados uniformes

### Clases reutilizables
- `.aurora-hero` → Hero section estándar con gradiente
- `.aurora-card` → Card component con sombra y padding
- `.aurora-btn aurora-btn--primary` → Botón primario estándar
- `.u-text-center` → Utilidad de centrado
- `.u-mb-16` → Utilidad de margin bottom

### Grid responsivo
- `.aurora-grid-3` → Grid de 3 columnas que se adapta a 2 en tablet y 1 en móvil

### Consistencia visual
- Todos los botones tienen la misma apariencia
- Spacing uniforme en toda la aplicación
- Tipografías estandarizadas (h1, h2)

## Tokens CSS utilizados

```css
:root {
  --aurora-primary: #1e4a7a;
  --aurora-space-md: 16px;
  --aurora-radius: 8px;
  --aurora-max-width: 1200px;
  --aurora-shadow-2: 0 6px 18px rgba(16,24,40,0.06);
}
```

## Próximos pasos
- [ ] Migrar página de artículos usando el mismo patrón
- [ ] Migrar página principal (home)
- [ ] Añadir más utilidades CSS según necesidades
- [ ] Crear componentes React que wrappeen las clases CSS
