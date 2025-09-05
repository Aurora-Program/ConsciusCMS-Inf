import { useT } from '../util/useTranslation';

const DesignSystemDemo = () => {
  const t = useT();

  return (
    <div className="design-system-demo">
      {/* Hero Section usando Aurora Design System */}
      <section className="aurora-hero">
        <div className="aurora-container">
          <div className="aurora-hero-content">
            <h1 className="aurora-hero-title">
              Aurora Design System <span className="aurora-gradient-text">Demo</span>
            </h1>
            <p className="aurora-hero-subtitle">
              Demostración del sistema de diseño consistente para todas las páginas de Aurora Program
            </p>
          </div>
        </div>
      </section>

      {/* Section con clases consistentes */}
      <section className="aurora-section">
        <div className="aurora-container">
          <h2 className="aurora-section-title">Tipografía Consistente</h2>
          
          <div style={{ display: 'grid', gap: '2rem', marginBottom: '3rem' }}>
            
            {/* Títulos Hero */}
            <div className="demo-block">
              <h3 className="aurora-subsection-title">Hero Titles</h3>
              <h1 className="aurora-hero-title" style={{ marginBottom: '1rem' }}>
                Título Hero Principal
              </h1>
              <h1 className="aurora-hero-title dark-version" style={{ marginBottom: '1rem' }}>
                Título Hero Versión Oscura
              </h1>
            </div>

            {/* Títulos de Sección */}
            <div className="demo-block">
              <h3 className="aurora-subsection-title">Section Titles</h3>
              <h2 className="aurora-section-title">Título de Sección</h2>
              <h3 className="aurora-subsection-title">Título de Subsección</h3>
              <h4 className="aurora-card-title">Título de Tarjeta</h4>
            </div>

            {/* Texto con gradientes */}
            <div className="demo-block">
              <h3 className="aurora-subsection-title">Gradient Text</h3>
              <p className="aurora-gradient-text" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                Texto con Gradiente Aurora
              </p>
              <p style={{ fontSize: '1.125rem', color: '#666' }}>
                Texto normal para comparar el contraste y la legibilidad
              </p>
            </div>

          </div>

          {/* Grid de tarjetas */}
          <h2 className="aurora-section-title">Componentes de Tarjetas</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            
            <div className="aurora-card">
              <h4 className="aurora-card-title">Tarjeta Base</h4>
              <p>Esta es una tarjeta estándar usando el sistema de diseño Aurora. Mantiene consistencia visual en toda la aplicación.</p>
            </div>

            <div className="aurora-card gold-accent">
              <h4 className="aurora-card-title">Tarjeta con Acento Dorado</h4>
              <p>Tarjeta con el acento dorado característico de Aurora Program. Perfecta para destacar contenido importante.</p>
            </div>

            <div className="aurora-card blue-accent">
              <h4 className="aurora-card-title">Tarjeta con Acento Azul</h4>
              <p>Tarjeta con el acento azul Aurora. Ideal para contenido técnico o información secundaria.</p>
            </div>

          </div>

          {/* Demostración de backgrounds hero */}
          <div className="demo-section">
            <h3 className="aurora-section-title">🌅 Backgrounds Hero</h3>
            <div className="demo-grid">
              <div className="demo-card aurora-bg-hero-primary" style={{ padding: '2rem', minHeight: '120px' }}>
                <h4 className="aurora-h4" style={{ color: 'white' }}>Hero Primary</h4>
                <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0 }}>Gradiente clásico Aurora</p>
              </div>
              <div className="demo-card aurora-bg-hero-atmospheric" style={{ padding: '2rem', minHeight: '120px' }}>
                <h4 className="aurora-h4" style={{ color: 'white' }}>Hero Atmospheric</h4>
                <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0 }}>Efecto complejo atmosférico</p>
              </div>
              <div className="demo-card aurora-bg-hero-minimal" style={{ padding: '2rem', minHeight: '120px' }}>
                <h4 className="aurora-h4" style={{ color: 'white' }}>Hero Minimal</h4>
                <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0 }}>Gradiente sutil</p>
              </div>
            </div>
          </div>

          {/* Demostración de backgrounds de sección */}
          <div className="demo-section">
            <h3 className="aurora-section-title">📄 Backgrounds de Sección</h3>
            <div className="demo-grid">
              <div className="demo-card aurora-bg-clean" style={{ padding: '2rem' }}>
                <h4 className="aurora-h4">Clean Background</h4>
                <p style={{ margin: 0 }}>Fondo blanco limpio para contenido</p>
              </div>
              <div className="demo-card aurora-bg-subtle" style={{ padding: '2rem' }}>
                <h4 className="aurora-h4">Subtle Background</h4>
                <p style={{ margin: 0 }}>Gris claro alternativo</p>
              </div>
              <div className="demo-card aurora-bg-gradient-subtle" style={{ padding: '2rem' }}>
                <h4 className="aurora-h4">Gradient Subtle</h4>
                <p style={{ margin: 0 }}>Gradiente suave para secciones</p>
              </div>
            </div>
          </div>

          {/* Demostración de backgrounds glassmorphism */}
          <div className="demo-section" style={{ background: 'linear-gradient(135deg, #1e4a7a 0%, #2563eb 100%)', padding: '2rem', borderRadius: '12px' }}>
            <h3 className="aurora-section-title" style={{ color: 'white' }}>✨ Backgrounds Glassmorphism</h3>
            <div className="demo-grid">
              <div className="demo-card aurora-bg-glass-light" style={{ padding: '2rem', color: 'white' }}>
                <h4 className="aurora-h4">Glass Light</h4>
                <p style={{ margin: 0, opacity: 0.9 }}>Efecto vidrio ligero</p>
              </div>
              <div className="demo-card aurora-bg-glass-medium" style={{ padding: '2rem', color: 'white' }}>
                <h4 className="aurora-h4">Glass Medium</h4>
                <p style={{ margin: 0, opacity: 0.9 }}>Efecto vidrio medio</p>
              </div>
              <div className="demo-card aurora-bg-glass-strong" style={{ padding: '2rem', color: 'white' }}>
                <h4 className="aurora-h4">Glass Strong</h4>
                <p style={{ margin: 0, opacity: 0.9 }}>Efecto vidrio fuerte</p>
              </div>
            </div>
          </div>

          {/* Demostración de backgrounds de tarjetas */}
          <div className="demo-section">
            <h3 className="aurora-section-title">🎴 Backgrounds de Tarjetas</h3>
            <div className="demo-grid">
              <div className="demo-card aurora-bg-card" style={{ padding: '2rem' }}>
                <h4 className="aurora-h4">Card Standard</h4>
                <p style={{ margin: 0 }}>Tarjeta estándar con sombra</p>
              </div>
              <div className="demo-card aurora-bg-card-gold" style={{ padding: '2rem' }}>
                <h4 className="aurora-h4">Card Gold</h4>
                <p style={{ margin: 0 }}>Tarjeta con acento dorado</p>
              </div>
              <div className="demo-card aurora-bg-card-blue" style={{ padding: '2rem' }}>
                <h4 className="aurora-h4">Card Blue</h4>
                <p style={{ margin: 0 }}>Tarjeta con acento azul</p>
              </div>
            </div>
          </div>

          {/* Demostración de utilidades */}
          <div className="demo-section">
            <h3 className="aurora-section-title">⚡ Utilidades de Background</h3>
            <div className="demo-grid">
              <div className="demo-card aurora-bg-primary" style={{ padding: '2rem', color: 'white' }}>
                <h4 className="aurora-h4">Primary Background</h4>
                <p style={{ margin: 0, opacity: 0.9 }}>Fondo azul sólido</p>
              </div>
              <div className="demo-card aurora-bg-gold" style={{ padding: '2rem' }}>
                <h4 className="aurora-h4">Gold Background</h4>
                <p style={{ margin: 0 }}>Fondo dorado sólido</p>
              </div>
              <div className="demo-card aurora-bg-gold-gradient" style={{ padding: '2rem', color: 'white' }}>
                <h4 className="aurora-h4">Gold Gradient</h4>
                <p style={{ margin: 0, opacity: 0.9 }}>Gradiente dorado</p>
              </div>
            </div>
          </div>

          {/* Feature cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            
            <div className="aurora-feature-card">
              <span className="icon">🎯</span>
              <h4 className="aurora-card-title">Consistencia</h4>
              <p>Todos los títulos y elementos siguen el mismo sistema de diseño</p>
            </div>

            <div className="aurora-feature-card gold">
              <span className="icon">✨</span>
              <h4 className="aurora-card-title">Branding</h4>
              <p>Colores y tipografía alineados con la identidad Aurora</p>
            </div>

            <div className="aurora-feature-card">
              <span className="icon">📱</span>
              <h4 className="aurora-card-title">Responsive</h4>
              <p>Adaptable a todos los tamaños de pantalla automáticamente</p>
            </div>

          </div>

        </div>
      </section>

      {/* Section alternativa */}
      <section className="aurora-section alt">
        <div className="aurora-container">
          <h2 className="aurora-section-title">Sección Alternativa</h2>
          <p style={{ textAlign: 'center', fontSize: '1.125rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
            Esta sección usa el fondo alternativo del sistema de diseño. 
            Perfecta para crear variedad visual manteniendo la consistencia.
          </p>
        </div>
      </section>

    </div>
  );
};

export default DesignSystemDemo;
