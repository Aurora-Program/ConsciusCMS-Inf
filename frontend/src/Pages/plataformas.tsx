import './plataformas.css';
import { useT } from '../util/useTranslation';

const Plataformas = () => {
  const t = useT();

  return (
    <div className="plataformas-page">
      {/* Hero Section */}
      <section className="aurora-hero">
    
      
            <h1 className="aurora-title">
              {t('platforms.heroTitle')} {t('platforms.heroTitleHighlight')}
            </h1>
            <p className="hero-subtitle">
              {t('platforms.heroSubtitle')}
            </p>
            <div className="hero-description">
              <p>
                {t('platforms.heroDescription')}
              </p>
            </div>
        
     
      </section>

      {/* Platform Cards */}
      <section className="platforms-section">
        <div className="container">
          <div className="platforms-grid">
            
            {/* EthicsI Foundation */}
            <div className="platform-card ethics-card">
              <div className="platform-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="platform-content">
                <h3 style={{color: 'rgb(31,41,55)', textShadow: 'none'}}>{t('platforms.ethicsi.title')}</h3>
                <p className="platform-tagline" style={{color: 'rgb(156,163,175)', textShadow: 'none'}}>{t('platforms.ethicsi.tagline')}</p>
                <p className="platform-description" style={{color: 'rgb(107,114,128)', textShadow: 'none'}}>
                  {t('platforms.ethicsi.description')}
                </p>
                <div className="platform-features">
                  {Array.isArray(t('platforms.ethicsi.features')) ? 
                    (t('platforms.ethicsi.features') as string[]).map((feature: string, index: number) => (
                      <span key={index} className="feature-tag">{feature}</span>
                    )) : 
                    ['Investigación Académica', 'Marcos Éticos', 'Publicaciones'].map((feature: string, index: number) => (
                      <span key={index} className="feature-tag">{feature}</span>
                    ))
                  }
                </div>
                <a href="/ethicsi" className="platform-cta">
                  {t('platforms.ethicsi.link')} <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>

            {/* InnvaLab */}
            <div className="platform-card innovation-card">
              <div className="platform-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <div className="platform-content">
                <h3 style={{color: 'rgb(31,41,55)', textShadow: 'none'}}>{t('platforms.innvalab.title')}</h3>
                <p className="platform-tagline" style={{color: 'rgb(156,163,175)', textShadow: 'none'}}>{t('platforms.innvalab.tagline')}</p>
                <p className="platform-description" style={{color: 'rgb(107,114,128)', textShadow: 'none'}}>
                  {t('platforms.innvalab.description')}
                </p>
                <div className="platform-features">
                  {Array.isArray(t('platforms.innvalab.features')) ? 
                    (t('platforms.innvalab.features') as string[]).map((feature: string, index: number) => (
                      <span key={index} className="feature-tag">{feature}</span>
                    )) : 
                    ['Desarrollo Tecnológico', 'Open Source', 'Prototipado'].map((feature: string, index: number) => (
                      <span key={index} className="feature-tag">{feature}</span>
                    ))
                  }
                </div>
                <a href="/innvalab" className="platform-cta">
                  {t('platforms.innvalab.link')} <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>

            {/* Harmonia Coop */}
            <div className="platform-card community-card">
              <div className="platform-icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="platform-content">
                <h3 style={{color: 'rgb(31,41,55)', textShadow: 'none'}}>{t('platforms.harmonia.title')}</h3>
                <p className="platform-tagline" style={{color: 'rgb(156,163,175)', textShadow: 'none'}}>{t('platforms.harmonia.tagline')}</p>
                <p className="platform-description" style={{color: 'rgb(107,114,128)', textShadow: 'none'}}>
                  {t('platforms.harmonia.description')}
                </p>
                <div className="platform-features">
                  {Array.isArray(t('platforms.harmonia.features')) ? 
                    (t('platforms.harmonia.features') as string[]).map((feature: string, index: number) => (
                      <span key={index} className="feature-tag">{feature}</span>
                    )) : 
                    ['Consultoría', 'Formación', 'Implementación'].map((feature: string, index: number) => (
                      <span key={index} className="feature-tag">{feature}</span>
                    ))
                  }
                </div>
                <a href="/harmonia" className="platform-cta">
                  {t('platforms.harmonia.link')} <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Synergy Section */}
      <section className="synergy-section">
        <div className="container">
          <div className="synergy-content">
            <h2 style={{color: 'rgb(31,41,55)', textShadow: 'none'}}>{t('platforms.synergy.title')}</h2>
            <p className="synergy-intro" style={{color: 'rgb(75,85,99)', textShadow: 'none'}}>
              {t('platforms.synergy.intro')}
            </p>
            
            <div className="synergy-flow">
              <div className="flow-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4 style={{color: 'rgb(31,41,55)', textShadow: 'none'}}>{t('platforms.synergy.steps.research.title')}</h4>
                  <p style={{color: 'rgb(107,114,128)', textShadow: 'none'}}>{t('platforms.synergy.steps.research.description')}</p>
                </div>
              </div>
              
              <div className="flow-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
              
              <div className="flow-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4 style={{color: 'rgb(31,41,55)', textShadow: 'none'}}>{t('platforms.synergy.steps.development.title')}</h4>
                  <p style={{color: 'rgb(107,114,128)', textShadow: 'none'}}>{t('platforms.synergy.steps.development.description')}</p>
                </div>
              </div>
              
              <div className="flow-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
              
              <div className="flow-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4 style={{color: 'rgb(31,41,55)', textShadow: 'none'}}>{t('platforms.synergy.steps.implementation.title')}</h4>
                  <p style={{color: 'rgb(107,114,128)', textShadow: 'none'}}>{t('platforms.synergy.steps.implementation.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2 style={{color: '#1f2937'}}>{t('platforms.impact.title')}</h2>
              <p style={{color: '#4b5563'}}>
                {t('platforms.impact.description')}
              </p>
              <ul className="impact-list">
                {Array.isArray(t('platforms.impact.points')) ? 
                  (t('platforms.impact.points') as string[]).map((point: string, index: number) => (
                    <li key={index} style={{color: '#4b5563'}}>
                      <i className="fas fa-check-circle"></i>
                      {point}
                    </li>
                  )) :
                  [
                    'Investigación rigurosa que informa el desarrollo tecnológico',
                    'Soluciones tecnológicas basadas en principios éticos sólidos',
                    'Implementación comunitaria que retroalimenta la investigación',
                    'Ecosistema autosostenible de innovación ética en IA'
                  ].map((point: string, index: number) => (
                    <li key={index} style={{color: '#4b5563'}}>
                      <i className="fas fa-check-circle"></i>
                      {point}
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className="col-lg-6">
              <div className="impact-stats">
                <div className="stat-item">
                  <div className="stat-number">3</div>
                  <div className="stat-label" style={{color: '#6b7280'}}>{t('platforms.impact.stats.platforms')}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">∞</div>
                  <div className="stat-label" style={{color: '#6b7280'}}>{t('platforms.impact.stats.collaboration')}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">1</div>
                  <div className="stat-label" style={{color: '#6b7280'}}>{t('platforms.impact.stats.vision')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" >
        <div className="container">
          <div className="cta-content" style={{color: 'black'}} >
            <h2 style={{color: 'black', fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem', textShadow: 'none', background:'linear-gradient(135deg, #2563eb, #1d4ed8)'}}>{t('platforms.cta.title')}</h2>
            <p style={{color: 'black', fontSize: '1.2rem', marginBottom: '2rem', opacity: '1', textShadow: 'none', background:'linear-gradient(135deg, #2563eb, #1d4ed8)'}}>
              {t('platforms.cta.description')}
            </p>
            <div className="cta-buttons">
              <a href="/manifiesto" className="btn btn-primary">
                {t('platforms.cta.buttons.manifesto')}
              </a>
              <a href="/contacto" className="btn btn-primary">
                {t('platforms.cta.buttons.collaborate')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Plataformas;
