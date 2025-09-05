import React from 'react';
import { Link } from 'react-router-dom';

// EJEMPLO SIMPLE DE APLICACIÓN DEL DESIGN SYSTEM AURORA
// Sin traducciones para mostrar claramente la estructura

const SimpleHomeExample: React.FC = () => {
  return (
    <div className="home-page">
      {/* Aplicando: Hero section principal con gradiente Aurora */}
      <section className="aurora-hero">
        {/* Aplicando: Contenedor principal centrado */}
        <div className="aurora-container">
          {/* Aplicando: Título principal hero con efectos */}
          <h1 className="aurora-title-main">
            Bienvenido al <span className="aurora-text-gold">Programa Aurora</span>
          </h1>
          
          {/* Aplicando: Subtítulo descriptivo */}
          <p className="aurora-subtitle">
            Un ecosistema de innovación y colaboración para el futuro
          </p>
          
          {/* Aplicando: Flex centrado para botones de acción */}
          <div className="aurora-flex-center">
            <Link to="/Manifiesto" className="aurora-btn primary">
              Descubrir Manifiesto
            </Link>
            <Link to="/labs" className="aurora-btn gold">
              Explorar Labs
            </Link>
          </div>
        </div>
      </section>

      {/* Aplicando: Sección de contenido estándar */}
      <section className="aurora-section">
        {/* Aplicando: Contenedor principal */}
        <div className="aurora-container">
          {/* Aplicando: Título de sección */}
          <h2 className="aurora-title-section">Características Principales</h2>
          
          {/* Aplicando: Grid responsivo de 3 columnas */}
          <div className="aurora-grid-3">
            {/* Aplicando: Tarjeta de característica con acento dorado */}
            <div className="aurora-feature-card gold">
              <div className="aurora-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <h3>Innovación</h3>
              <p>Tecnologías de vanguardia para soluciones del futuro</p>
            </div>
            
            {/* Aplicando: Tarjeta de característica estándar */}
            <div className="aurora-feature-card">
              <div className="aurora-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Colaboración</h3>
              <p>Trabajo en equipo para maximizar el potencial creativo</p>
            </div>
            
            {/* Aplicando: Tarjeta de característica con acento azul */}
            <div className="aurora-feature-card">
              <div className="aurora-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Conocimiento</h3>
              <p>Aprendizaje continuo y desarrollo de competencias</p>
            </div>
          </div>
        </div>
      </section>

      {/* Aplicando: Sección alternativa con fondo diferente */}
      <section className="aurora-section alt">
        {/* Aplicando: Contenedor principal */}
        <div className="aurora-container">
          {/* Aplicando: Grid de 2 columnas para contenido mixto */}
          <div className="aurora-grid-2">
            {/* Aplicando: Tarjeta estándar con información */}
            <div className="aurora-card">
              <h3 className="aurora-title-section">Sobre Aurora</h3>
              <p>
                El Programa Aurora representa un nuevo paradigma en la educación 
                y desarrollo tecnológico. Combinamos metodologías innovadoras con 
                herramientas de vanguardia para crear un ecosistema de aprendizaje 
                único.
              </p>
              <Link to="/acerca" className="aurora-btn outline">
                Conocer Más
              </Link>
            </div>
            
            {/* Aplicando: Tarjeta con acento dorado para destacar */}
            <div className="aurora-card gold-accent">
              <h3 className="aurora-title-section">Únete al Programa</h3>
              <p>
                Forma parte de nuestra comunidad de innovadores. Accede a recursos 
                exclusivos, participa en proyectos colaborativos y desarrolla tu 
                potencial al máximo.
              </p>
              <Link to="/labs" className="aurora-btn gold">
                Comenzar Ahora
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Aplicando: Sección de estadísticas */}
      <section className="aurora-section">
        {/* Aplicando: Contenedor principal */}
        <div className="aurora-container">
          {/* Aplicando: Título de sección centrado */}
          <h2 className="aurora-title-section" style={{textAlign: 'center'}}>
            Resultados que Hablan por Sí Solos
          </h2>
          
          {/* Aplicando: Grid de 4 columnas para estadísticas */}
          <div className="aurora-grid-4">
            {/* Aplicando: Tarjeta de estadística */}
            <div className="aurora-card blue-accent">
              <div className="aurora-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="aurora-text-gold">1000+</h3>
              <p>Participantes</p>
            </div>
            
            <div className="aurora-card blue-accent">
              <div className="aurora-icon">
                <i className="fas fa-project-diagram"></i>
              </div>
              <h3 className="aurora-text-gold">150+</h3>
              <p>Proyectos</p>
            </div>
            
            <div className="aurora-card blue-accent">
              <div className="aurora-icon">
                <i className="fas fa-award"></i>
              </div>
              <h3 className="aurora-text-gold">50+</h3>
              <p>Reconocimientos</p>
            </div>
            
            <div className="aurora-card blue-accent">
              <div className="aurora-icon">
                <i className="fas fa-globe"></i>
              </div>
              <h3 className="aurora-text-gold">25+</h3>
              <p>Países</p>
            </div>
          </div>
        </div>
      </section>

      {/* Aplicando: Sección de llamada a la acción final */}
      <section className="aurora-hero" style={{paddingTop: '4rem', paddingBottom: '4rem'}}>
        {/* Aplicando: Contenedor principal */}
        <div className="aurora-container">
          {/* Aplicando: Flex centrado para contenido */}
          <div className="aurora-flex-center" style={{flexDirection: 'column', gap: '2rem'}}>
            <h2 className="aurora-title-section" style={{color: 'white', textAlign: 'center'}}>
              El Futuro Comienza Contigo
            </h2>
            <p style={{color: 'white', textAlign: 'center', maxWidth: '600px'}}>
              Únete a la revolución educativa y tecnológica. Sé parte del cambio 
              que el mundo necesita.
            </p>
            {/* Aplicando: Flex centrado para botones múltiples */}
            <div className="aurora-flex-center">
              <Link to="/Manifiesto" className="aurora-btn gold">
                Ver Manifiesto
              </Link>
              <Link to="/labs" className="aurora-btn outline" style={{borderColor: 'white', color: 'white'}}>
                Explorar Labs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimpleHomeExample;
