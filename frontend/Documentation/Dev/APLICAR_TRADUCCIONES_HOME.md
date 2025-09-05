# 🎯 INSTRUCCIONES PARA APLICAR TRADUCCIONES AL HOME.TSX ORIGINAL

## ✅ **TRABAJO COMPLETADO**

He añadido todas las traducciones necesarias para el Home Page con Design System Aurora:

### 📋 **ARCHIVOS ACTUALIZADOS:**
- ✅ `src/util/translations.ts` - Nuevas claves en ES/EN
- ✅ `src/Pages/home-example.tsx` - Ejemplo completo funcional
- ✅ Documentación completa creada

## 🔄 **CÓMO APLICAR AL HOME.TSX ORIGINAL**

### **Opción 1: Usar el Ejemplo Completo**
Simplemente reemplaza el contenido de `home.tsx` con el de `home-example.tsx`:

```bash
# En terminal PowerShell
Copy-Item "src/Pages/home-example.tsx" "src/Pages/home.tsx" -Force
```

### **Opción 2: Actualizar Manualmente**
Cambiar las claves de traducción existentes por las nuevas:

#### **ANTES** (home.tsx actual):
```tsx
{t('home.heroConstruction')}
{t('home.heroTitle')}
{t('home.heroSubtitle')}
```

#### **DESPUÉS** (usando nuevas claves):
```tsx
{t('home.hero.welcome')} <span className="aurora-text-gold">{t('home.hero.programName')}</span>
{t('home.hero.mainSubtitle')}
```

## 🗂️ **MAPEO DE TRADUCCIONES**

### **Hero Section:**
```tsx
// ANTES
{t('home.heroConstruction')} 
{t('home.heroTitle')}
{t('home.heroSubtitle')}

// DESPUÉS  
{t('home.hero.welcome')} <span className="aurora-text-gold">{t('home.hero.programName')}</span>
{t('home.hero.mainSubtitle')}
```

### **Botones de Acción:**
```tsx
// ANTES
{t('home.cta.Manifiesto')}
{t('home.cta.labs')}

// DESPUÉS
{t('home.hero.discoverManifiesto')}
{t('home.hero.exploreLabs')}
```

### **Características:**
```tsx
// NUEVO - Añadir sección completa
<h2 className="aurora-title-section">{t('home.features.title')}</h2>
<h3>{t('home.features.innovation.title')}</h3>
<p>{t('home.features.innovation.description')}</p>
```

## 📱 **ESTRUCTURA RECOMENDADA**

### **1. Hero Section:**
```tsx
<section className="aurora-hero">
  <div className="aurora-container">
    <h1 className="aurora-title-main">
      {t('home.hero.welcome')} <span className="aurora-text-gold">{t('home.hero.programName')}</span>
    </h1>
    <p className="aurora-subtitle">{t('home.hero.mainSubtitle')}</p>
    <div className="aurora-flex-center">
      <Link to="/Manifiesto" className="aurora-btn primary">
        {t('home.hero.discoverManifiesto')}
      </Link>
      <Link to="/labs" className="aurora-btn gold">
        {t('home.hero.exploreLabs')}
      </Link>
    </div>
  </div>
</section>
```

### **2. Features Section:**
```tsx
<section className="aurora-section">
  <div className="aurora-container">
    <h2 className="aurora-title-section">{t('home.features.title')}</h2>
    <div className="aurora-grid-3">
      <div className="aurora-feature-card gold">
        <div className="aurora-icon"><i className="fas fa-rocket"></i></div>
        <h3>{t('home.features.innovation.title')}</h3>
        <p>{t('home.features.innovation.description')}</p>
      </div>
      <!-- Más tarjetas... -->
    </div>
  </div>
</section>
```

### **3. About & Join Sections:**
```tsx
<section className="aurora-section alt">
  <div className="aurora-container">
    <div className="aurora-grid-2">
      <div className="aurora-card">
        <h3 className="aurora-title-section">{t('home.about.title')}</h3>
        <p>{t('home.about.description')}</p>
        <Link to="/acerca" className="aurora-btn outline">
          {t('home.about.learnMore')}
        </Link>
      </div>
      <div className="aurora-card gold-accent">
        <h3 className="aurora-title-section">{t('home.join.title')}</h3>
        <p>{t('home.join.description')}</p>
        <Link to="/labs" className="aurora-btn gold">
          {t('home.join.startNow')}
        </Link>
      </div>
    </div>
  </div>
</section>
```

## 🎨 **CSS NECESARIO**

Asegúrate de que `aurora-design-system.css` esté importado en `main.tsx` (ya hecho):

```tsx
// main.tsx
import './aurora-design-system.css'
```

## 🌍 **VALIDACIÓN DE TRADUCCIONES**

### **Español (ES):**
- ✅ "Bienvenido al Programa Aurora"
- ✅ "Un ecosistema de innovación y colaboración para el futuro"
- ✅ "Descubrir Manifiesto" / "Explorar Labs"

### **Inglés (EN):**
- ✅ "Welcome to Aurora Program"
- ✅ "An ecosystem of innovation and collaboration for the future"
- ✅ "Discover Manifiesto" / "Explore Labs"

## 🚀 **SIGUIENTE PASO RECOMENDADO**

**Opción Más Simple**: Usa el archivo ejemplo que ya está listo:

```powershell
# Hacer backup del home actual
Copy-Item "src/Pages/home.tsx" "src/Pages/home-backup.tsx"

# Aplicar el nuevo home con traducciones
Copy-Item "src/Pages/home-example.tsx" "src/Pages/home.tsx" -Force
```

¡Y listo! Tendrás el Home Page completamente actualizado con:
- ✅ Design System Aurora aplicado
- ✅ Traducciones ES/EN completas
- ✅ Comentarios explicativos en cada div
- ✅ Estructura responsive automática
- ✅ Compatibilidad total con el sistema existente

---

**Estado**: ✅ **LISTO PARA APLICAR**  
**Complejidad**: Muy simple (1 comando)  
**Tiempo estimado**: 30 segundos  
**Resultado**: Home Page completamente modernizado
