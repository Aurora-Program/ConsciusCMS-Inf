# AURORA DESIGN SYSTEM - GUÍA DE COMPONENTES ESTANDARIZADOS

## 🎯 **Propósito**
Este sistema define componentes CSS estándar con estilos consistentes que se aplican a través de toda la aplicación Aurora Program, garantizando coherencia visual y facilidad de mantenimiento.

## 📋 **Cómo Implementar**

### 1. **Importar en main.tsx**
```tsx
import './aurora-design-system.css'
```

### 2. **Aplicar clases a componentes existentes**
Comentar en cada div el estilo que se aplica antes del código.

## 🏗️ **COMPONENTES DISPONIBLES**

### **📦 CONTENEDORES**

#### `aurora-container`
**Uso**: Contenedor principal con ancho máximo y centrado
```tsx
// Aplicando: Contenedor principal estandarizado
<div className="aurora-container">
  {/* Contenido */}
</div>
```

#### `aurora-hero`
**Uso**: Sección hero con fondo gradiente y efectos
```tsx
// Aplicando: Hero section con gradiente Aurora y animaciones
<section className="aurora-hero">
  <div className="aurora-container">
    <h1 className="aurora-title-main">Título Principal</h1>
  </div>
</section>
```

#### `aurora-section`
**Uso**: Sección de contenido general
```tsx
// Aplicando: Sección de contenido estándar
<section className="aurora-section">
  {/* Contenido */}
</section>

// Aplicando: Sección alternativa con fondo gris claro
<section className="aurora-section alt">
  {/* Contenido */}
</section>
```

### **🃏 TARJETAS**

#### `aurora-card`
**Uso**: Tarjeta base para contenido
```tsx
// Aplicando: Tarjeta estándar con sombra y hover effect
<div className="aurora-card">
  <h3>Título de la tarjeta</h3>
  <p>Contenido de la tarjeta</p>
</div>

// Aplicando: Tarjeta con acento dorado lateral
<div className="aurora-card gold-accent">
  <h3>Tarjeta importante</h3>
</div>

// Aplicando: Tarjeta con acento azul lateral
<div className="aurora-card blue-accent">
  <h3>Tarjeta informativa</h3>
</div>
```

#### `aurora-feature-card`
**Uso**: Tarjeta para características o servicios
```tsx
// Aplicando: Tarjeta de característica con icono centrado
<div className="aurora-feature-card">
  <i className="fas fa-star icon"></i>
  <h3>Característica</h3>
  <p>Descripción</p>
</div>

// Aplicando: Tarjeta de característica con acento dorado
<div className="aurora-feature-card gold">
  <i className="fas fa-crown icon"></i>
  <h3>Característica Premium</h3>
</div>
```

### **✍️ TIPOGRAFÍA**

#### Títulos Estándar
```tsx
// Aplicando: Título principal (para h1 importantes)
<h1 className="aurora-title-main">Título Principal</h1>

// Aplicando: Título principal versión oscura
<h1 className="aurora-title-main dark">Título en Página Clara</h1>

// Aplicando: Título de sección (para h2)
<h2 className="aurora-title-section">Título de Sección</h2>

// Aplicando: Texto con gradiente dorado
<span className="aurora-text-gold">Texto Destacado</span>

// Aplicando: Subtítulo estándar
<p className="aurora-subtitle">Subtítulo descriptivo</p>

// Aplicando: Subtítulo versión oscura
<p className="aurora-subtitle dark">Subtítulo en fondo claro</p>
```

### **🔘 BOTONES**

```tsx
// Aplicando: Botón primario Aurora
<button className="aurora-btn primary">
  Acción Principal
</button>

// Aplicando: Botón dorado para acciones especiales
<button className="aurora-btn gold">
  <i className="fas fa-star"></i>
  Acción Premium
</button>

// Aplicando: Botón outline para acciones secundarias
<button className="aurora-btn outline">
  Acción Secundaria
</button>
```

### **📐 LAYOUTS Y GRIDS**

```tsx
// Aplicando: Grid de 2 columnas responsivo
<div className="aurora-grid-2">
  <div>Columna 1</div>
  <div>Columna 2</div>
</div>

// Aplicando: Grid de 3 columnas para características
<div className="aurora-grid-3">
  <div className="aurora-feature-card">Feature 1</div>
  <div className="aurora-feature-card">Feature 2</div>
  <div className="aurora-feature-card">Feature 3</div>
</div>

// Aplicando: Flex centrado para elementos en línea
<div className="aurora-flex-center">
  <span>Elemento 1</span>
  <span>Elemento 2</span>
</div>

// Aplicando: Flex con espacio entre elementos
<div className="aurora-flex-between">
  <h3>Título</h3>
  <button className="aurora-btn primary">Acción</button>
</div>
```

### **🎨 ELEMENTOS ESPECIALES**

```tsx
// Aplicando: Badge/etiqueta estándar
<span className="aurora-badge">Nuevo</span>

// Aplicando: Badge dorado para elementos premium
<span className="aurora-badge gold">Premium</span>

// Aplicando: Separador visual con gradiente
<div className="aurora-divider"></div>

// Aplicando: Cita destacada con estilo Aurora
<blockquote className="aurora-quote">
  <p>Esta es una cita importante del contenido.</p>
  <cite>— Fuente de la cita</cite>
</blockquote>

// Aplicando: Icono estándar Aurora
<div className="aurora-icon">
  <i className="fas fa-lightbulb"></i>
</div>

// Aplicando: Icono dorado de mayor tamaño
<div className="aurora-icon gold large">
  <i className="fas fa-crown"></i>
</div>
```

## 🔄 **MIGRACIÓN DE PÁGINAS EXISTENTES**

### **Ejemplo: Transformar una página actual**

**ANTES** (sin estandarización):
```tsx
<div style={{padding: '2rem', background: '#f5f5f5'}}>
  <h1 style={{color: '#2563eb', fontSize: '2.5rem'}}>Título</h1>
  <div style={{background: 'white', padding: '1.5rem', borderRadius: '8px'}}>
    <p>Contenido</p>
  </div>
</div>
```

**DESPUÉS** (con componentes Aurora):
```tsx
// Aplicando: Sección alternativa con fondo gris
<section className="aurora-section alt">
  <div className="aurora-container">
    {/* Aplicando: Título de sección estandarizado */}
    <h1 className="aurora-title-section">Título</h1>
    
    {/* Aplicando: Tarjeta estándar Aurora */}
    <div className="aurora-card">
      <p>Contenido</p>
    </div>
  </div>
</section>
```

## 📝 **PROCESO DE IMPLEMENTACIÓN**

### **Paso 1**: Importar Design System
```tsx
// En main.tsx
import './aurora-design-system.css'
```

### **Paso 2**: Identificar Componentes en Páginas
```tsx
// Antes de cada div, comentar el componente que se aplica
function HomePage() {
  return (
    <>
      {/* Aplicando: Hero section con gradiente Aurora */}
      <section className="aurora-hero">
        <div className="aurora-container">
          {/* Aplicando: Título principal blanco */}
          <h1 className="aurora-title-main">Aurora Program</h1>
          {/* Aplicando: Subtítulo hero */}
          <p className="aurora-subtitle">Descripción del programa</p>
        </div>
      </section>
      
      {/* Aplicando: Sección de contenido estándar */}
      <section className="aurora-section">
        <div className="aurora-container">
          {/* Aplicando: Grid de 3 columnas para características */}
          <div className="aurora-grid-3">
            <div className="aurora-feature-card">
              <i className="fas fa-brain icon"></i>
              <h3>IA Ética</h3>
              <p>Desarrollo responsable</p>
            </div>
            {/* Más tarjetas... */}
          </div>
        </div>
      </section>
    </>
  )
}
```

### **Paso 3**: Reemplazar Estilos Personalizados
- Reemplazar CSS custom por clases Aurora
- Usar variables CSS definidas
- Mantener comentarios explicativos

## 🎯 **VENTAJAS DEL SISTEMA**

✅ **Consistencia Visual**: Todos los componentes siguen los mismos patrones
✅ **Mantenibilidad**: Cambios centralizados afectan toda la aplicación
✅ **Rapidez de Desarrollo**: Componentes predefinidos aceleran el desarrollo
✅ **Responsivo**: Todos los componentes incluyen diseño adaptativo
✅ **Documentación**: Cada uso está comentado y explicado
✅ **Escalabilidad**: Fácil añadir nuevos componentes al sistema

## 🔧 **SIGUIENTES PASOS**

1. **Importar** design system en main.tsx
2. **Aplicar** a header.tsx (ya actualizado)
3. **Migrar** home.tsx con comentarios
4. **Continuar** con acerca.tsx, labs.tsx, etc.
5. **Verificar** consistencia visual
6. **Documentar** nuevos componentes que surjan

---

**Resultado**: Una aplicación completamente estandarizada con componentes coherentes, fácil de mantener y expandir.
