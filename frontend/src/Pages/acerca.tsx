import './acerca.css';
import { useT } from '../util/useTranslation'

const Acerca = () => {
  const t = useT()
  
  return (
    <div className="acerca-page">
      {/* Hero Section */}
      <section className="aurora-hero">

            <h1 className="aurora-title">
              {t('about.heroTitle')} {t('about.heroTitleHighlight')}
            </h1>
            <p className="hero-subtitle">
              {t('about.heroSubtitle')}
            </p>
   
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <h2>{t('about.mission.title')}</h2>
              <p className="mission-text">
                {t('about.mission.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="collaboration-section">
        <div className="container">
          <h2 className="section-title">{t('about.collaboration.title')}</h2>
          <div className="collaboration-grid">
            <div className="collaboration-card human-card">
              <div className="card-icon">
                <i className="fas fa-user"></i>
              </div>
              <h3>{t('about.collaboration.human.title')}</h3>
              <p>
                {t('about.collaboration.human.description')}
              </p>
              <ul>
                {Array.isArray(t('about.collaboration.human.points')) ? 
                  t('about.collaboration.human.points').map((point: string, index: number) => (
                    <li key={index}>{point}</li>
                  )) : 
                  <li>Error loading points</li>
                }
              </ul>
            </div>

            <div className="synergy-arrow">
              <i className="fas fa-arrows-alt-h"></i>
              <span>{t('about.collaboration.synergy')}</span>
            </div>

            <div className="collaboration-card ai-card">
              <div className="card-icon">
                <i className="fas fa-robot"></i>
              </div>
              <h3>{t('about.collaboration.ai.title')}</h3>
              <p>
                {t('about.collaboration.ai.description')}
              </p>
              <ul>
                {Array.isArray(t('about.collaboration.ai.points')) ? 
                  t('about.collaboration.ai.points').map((point: string, index: number) => (
                    <li key={index}>{point}</li>
                  )) : 
                  <li>Error loading points</li>
                }
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Aurora Assistant */}
      <section className="aurora-assistant-section">
        <div className="container">
          <div className="assistant-intro">
            <div className="assistant-avatar">
              <i className="fas fa-robot"></i>
            </div>
            <div className="assistant-content">
              <h2>{t('about.assistant.title')}</h2>
              <p className="assistant-subtitle">{t('about.assistant.subtitle')}</p>
              <p>
                {t('about.assistant.description')}
              </p>
              
              <div className="contributions">
                <h3>{t('about.assistant.contributions.title')}</h3>
                <div className="contribution-grid">
                  <div className="contribution-item">
                    <i className="fas fa-palette"></i>
                    <div>
                      <h4>{t('about.assistant.contributions.design.title')}</h4>
                      <p>{t('about.assistant.contributions.design.description')}</p>
                    </div>
                  </div>
                  <div className="contribution-item">
                    <i className="fas fa-code"></i>
                    <div>
                      <h4>{t('about.assistant.contributions.architecture.title')}</h4>
                      <p>{t('about.assistant.contributions.architecture.description')}</p>
                    </div>
                  </div>
                  <div className="contribution-item">
                    <i className="fas fa-mobile-alt"></i>
                    <div>
                      <h4>{t('about.assistant.contributions.ux.title')}</h4>
                      <p>{t('about.assistant.contributions.ux.description')}</p>
                    </div>
                  </div>
                  <div className="contribution-item">
                    <i className="fas fa-cogs"></i>
                    <div>
                      <h4>{t('about.assistant.contributions.optimization.title')}</h4>
                      <p>{t('about.assistant.contributions.optimization.description')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="collaboration-philosophy">
                <h3>{t('about.assistant.philosophy.title')}</h3>
                <p>
                  {t('about.assistant.philosophy.description')}
                </p>
                <blockquote>
                  "{t('about.assistant.philosophy.quote')}"
                  <cite>- Aurora Assistant</cite>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="tech-section">
        <div className="container">
          <h2>{t('about.tech.title')}</h2>
          <p className="tech-intro">
            {t('about.tech.description')}
          </p>
          <div className="tech-grid">
            <div className="tech-item">
              <i className="fab fa-react"></i>
              <h4>React 18</h4>
              <p>{t('about.tech.react')}</p>
            </div>
            <div className="tech-item">
              <i className="fab fa-js-square"></i>
              <h4>TypeScript</h4>
              <p>{t('about.tech.typescript')}</p>
            </div>
            <div className="tech-item">
              <i className="fas fa-bolt"></i>
              <h4>Vite</h4>
              <p>{t('about.tech.vite')}</p>
            </div>
            <div className="tech-item">
              <i className="fab fa-bootstrap"></i>
              <h4>Bootstrap + SCSS</h4>
              <p>{t('about.tech.bootstrap')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Section */}
      <section className="future-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2>{t('about.future.title')}</h2>
              <p>
                {t('about.future.description')}
              </p>
              <div className="cta-section">
                <a href="/manifiesto" className="btn btn-primary btn-lg">
                  {t('about.future.cta.manifiesto')}
                </a>
                <a href="/labs" className="btn btn-outline-primary btn-lg">
                  {t('about.future.cta.labs')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="connect-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2>{t('about.connect.title')}</h2>
              <p>
                {t('about.connect.description')}
              </p>
              <div className="social-platforms">
                <a href="https://github.com/Aurora-Program" target="_blank" rel="noopener noreferrer" className="platform-card github">
                  <div className="platform-icon">
                    <i className="fab fa-github"></i>
                  </div>
                  <div className="platform-content">
                    <h4>{t('about.connect.github.title')}</h4>
                    <p>{t('about.connect.github.description')}</p>
                    <span className="platform-link">github.com/Aurora-Program</span>
                  </div>
                </a>
                
                <a href="https://medium.com/@pab.man.alvarez/list/aurora-program-169646e4abe9" target="_blank" rel="noopener noreferrer" className="platform-card medium">
                  <div className="platform-icon">
                    <i className="fab fa-medium"></i>
                  </div>
                  <div className="platform-content">
                    <h4>{t('about.connect.medium.title')}</h4>
                    <p>{t('about.connect.medium.description')}</p>
                    <span className="platform-link">Artículos en Medium</span>
                  </div>
                </a>
                
                <a href="https://www.linkedin.com/company/107873626/" target="_blank" rel="noopener noreferrer" className="platform-card linkedin">
                  <div className="platform-icon">
                    <i className="fab fa-linkedin"></i>
                  </div>
                  <div className="platform-content">
                    <h4>{t('about.connect.linkedin.title')}</h4>
                    <p>{t('about.connect.linkedin.description')}</p>
                    <span className="platform-link">Aurora Program Company</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Acerca;
