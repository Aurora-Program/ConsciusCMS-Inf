import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../util/useTranslation';

// EJEMPLO DE APLICACIÓN DEL DESIGN SYSTEM - HOME CON TRADUCCIONES
// Este es un ejemplo funcional con el sistema de traducciones

const HomeExample: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="home-page">
      {/* Aplicando: Hero section principal con gradiente Aurora */}
      <section className="aurora-hero">
        {/* Aplicando: Contenedor principal centrado */}
        <div className="aurora-container">
          {/* Aplicando: Título principal hero con efectos */}
          <h1 className="aurora-title-main">
            {t('home.hero.welcome')} <span className="aurora-text-gold">{t('home.hero.programName')}</span>
          </h1>
          
          {/* Aplicando: Subtítulo descriptivo */}
          <p className="aurora-subtitle">
            {t('home.hero.mainSubtitle')}
          </p>
          
          {/* Aplicando: Flex centrado para botones de acción */}
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

      {/* Aplicando: Sección de contenido estándar */}
      <section className="aurora-section">
        {/* Aplicando: Contenedor principal */}
        <div className="aurora-container">
          {/* Aplicando: Título de sección */}
          <h2 className="aurora-title-section">
            {t('home.features.title')}
          </h2>
          
          {/* Aplicando: Grid responsivo de 3 columnas */}
          <div className="aurora-grid-3">
            {/* Aplicando: Tarjeta de característica con acento dorado */}
            <div className="aurora-feature-card gold">
              <div className="aurora-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <h3>{t('home.features.innovation.title')}</h3>
              <p>{t('home.features.innovation.description')}</p>
            </div>
            
            {/* Aplicando: Tarjeta de característica estándar */}
            <div className="aurora-feature-card">
              <div className="aurora-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>{t('home.features.collaboration.title')}</h3>
              <p>{t('home.features.collaboration.description')}</p>
            </div>
            
            {/* Aplicando: Tarjeta de característica con acento azul */}
            <div className="aurora-feature-card">
              <div className="aurora-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>{t('home.features.knowledge.title')}</h3>
              <p>{t('home.features.knowledge.description')}</p>
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
              <h3 className="aurora-title-section">{t('home.about.title')}</h3>
              <p>{t('home.about.description')}</p>
              <Link to="/acerca" className="aurora-btn outline">
                {t('home.about.learnMore')}
              </Link>
            </div>
            
            {/* Aplicando: Tarjeta con acento dorado para destacar */}
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

      {/* Aplicando: Sección de estadísticas */}
      <section className="aurora-section">
        {/* Aplicando: Contenedor principal */}
        <div className="aurora-container">
          {/* Aplicando: Título de sección centrado */}
          <h2 className="aurora-title-section" style={{textAlign: 'center'}}>
            {t('home.stats.title')}
          </h2>
          
          {/* Aplicando: Grid de 4 columnas para estadísticas */}
          <div className="aurora-grid-4">
            {/* Aplicando: Tarjeta de estadística */}
            <div className="aurora-card blue-accent">
              <div className="aurora-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="aurora-text-gold">1000+</h3>
              <p>{t('home.stats.participants')}</p>
            </div>
            
            <div className="aurora-card blue-accent">
              <div className="aurora-icon">
                <i className="fas fa-project-diagram"></i>
              </div>
              <h3 className="aurora-text-gold">150+</h3>
              <p>{t('home.stats.projects')}</p>
            </div>
            
            <div className="aurora-card blue-accent">
              <div className="aurora-icon">
                <i className="fas fa-award"></i>
              </div>
              <h3 className="aurora-text-gold">50+</h3>
              <p>{t('home.stats.awards')}</p>
            </div>
            
            <div className="aurora-card blue-accent">
              <div className="aurora-icon">
                <i className="fas fa-globe"></i>
              </div>
              <h3 className="aurora-text-gold">25+</h3>
              <p>{t('home.stats.countries')}</p>
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
              {t('home.finalCta.title')}
            </h2>
            <p style={{color: 'white', textAlign: 'center', maxWidth: '600px'}}>
              {t('home.finalCta.description')}
            </p>
            {/* Aplicando: Flex centrado para botones múltiples */}
            <div className="aurora-flex-center">
              <Link to="/Manifiesto" className="aurora-btn gold">
                {t('home.finalCta.viewManifiesto')}
              </Link>
              <Link to="/labs" className="aurora-btn outline" style={{borderColor: 'white', color: 'white'}}>
                {t('home.finalCta.exploreLabs')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeExample;
