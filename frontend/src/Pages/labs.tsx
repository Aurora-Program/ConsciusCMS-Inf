import './labs.css';

const Labs = () => {
  return (
    <div className="labs-page">
      {/* Hero Section */}
      <section className="aurora-hero">
    
            <h1 className="aurora-title">
              Aurora Labs
            </h1>
            <p className="hero-subtitle">
              Laboratorio de experimentación e innovación en inteligencia artificial ética
            </p>
            <div className="hero-description">
              <p>
                En Aurora Labs exploramos el futuro de la IA a través de experimentos, prototipos 
                y demostraciones que materializan nuestros principios éticos en tecnologías tangibles.
              </p>
            </div>
            <div className="hero-cta">
              <a href="#experimentos" className="btn btn-primary btn-lg">
                Explorar Experimentos
              </a>

        </div>
      </section>

      {/* Features Section */}
      <section className="labs-features">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-flask"></i>
                </div>
                <h3>Experimentación</h3>
                <p>
                  Pruebas de concepto y experimentos que exploran nuevas fronteras 
                  en el desarrollo ético de IA.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-code-branch"></i>
                </div>
                <h3>Prototipado</h3>
                <p>
                  Desarrollo rápido de prototipos funcionales que demuestran 
                  la viabilidad de nuestras propuestas éticas.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-eye"></i>
                </div>
                <h3>Demostración</h3>
                <p>
                  Showcases interactivos que permiten experimentar directamente 
                  con nuestras innovaciones en IA ética.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Experiments */}
      <section id="experimentos" className="experiments-section">
        <div className="container">
          <div className="section-header">
            <h2>Experimentos Actuales</h2>
            <p>
              Proyectos en desarrollo que exploran diferentes aspectos de la IA ética
            </p>
          </div>

          <div className="experiments-grid">
            {/* Bias Detection Tool */}
            <div className="experiment-card">
              <div className="experiment-status active">
                <span>En Desarrollo</span>
              </div>
              <div className="experiment-content">
                <h3>Detector de Sesgos Algorítmicos</h3>
                <p className="experiment-description">
                  Herramienta de análisis automático que identifica y cuantifica sesgos 
                  en modelos de machine learning antes de su implementación.
                </p>
                <div className="experiment-tags">
                  <span className="tag">Machine Learning</span>
                  <span className="tag">Fairness</span>
                  <span className="tag">Análisis</span>
                </div>
                <div className="experiment-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '75%'}}></div>
                  </div>
                  <span className="progress-text">75% Completado</span>
                </div>
                <a href="#" className="experiment-link">
                  Ver Prototipo <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>

            {/* Transparent AI Dashboard */}
            <div className="experiment-card">
              <div className="experiment-status active">
                <span>Beta Testing</span>
              </div>
              <div className="experiment-content">
                <h3>Modelo Aurora</h3>
                <p className="experiment-description">
                  Modelo Aurora, es un modelo de inteligencia artificial basado en algrebra boolena.
                </p>
                <div className="experiment-tags">
                  <span className="tag">Fractalidad</span>
                  <span className="tag">Tensores emergentes</span>
                  <span className="tag">Aprendizaje recurisvo</span>
                </div>
                <div className="experiment-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '90%'}}></div>
                  </div>
                  <span className="progress-text">80% Completado</span>
                </div>
                <a href="#" className="experiment-link">
                  Pronto Demo <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>

            {/* Privacy Preserving ML */}
            <div className="experiment-card">
              <div className="experiment-status research">
                <span>Investigación</span>
              </div>
              <div className="experiment-content">
                <h3>Genesis</h3>
                <p className="experiment-description">
                  Framework para la creacion de tensores fracteles semanticos.
                </p>
                <div className="experiment-tags">
                  <span className="tag">Tensores</span>
                  <span className="tag">Semanticos</span>
                  <span className="tag">Framewort</span>
                </div>
                <div className="experiment-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '45%'}}></div>
                  </div>
                  <span className="progress-text">25% Completado</span>
                </div>
                <a href="#" className="experiment-link">
                  Ver Investigación <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>

            {/* Community Impact Tracker */}

          </div>
        </div>
      </section>

      {/* Interactive Demos */}
      <section className="demos-section">
        <div className="container">
          <div className="section-header">
            <h2>Demostraciones Interactivas</h2>
            <p>
              Proyectos
            </p>
          </div>

          <div className="demos-grid">
            <div className="demo-card">
              <div className="demo-preview">
                <div className="demo-placeholder">
                  <i className="fas fa-chart-line"></i>
                </div>
              </div>
              <div className="demo-content">
                <h3>Trinity-3</h3>
                <p>
                  Nucleo inteligente del programa Aurora
                </p>
                <a href="#" className="demo-launch">
                  Lanzar Demo <i className="fas fa-play"></i>
                </a>
              </div>
            </div>

            <div className="demo-card">
              <div className="demo-preview">
                <div className="demo-placeholder">
                  <i className="fas fa-brain"></i>
                </div>
              </div>
              <div className="demo-content">
                <h3>Genesis</h3>
                <p>
                  Modulo de transformacion de tensores fractales semanticos.
                </p>
                <a href="/chatbot" className="demo-launch">
                  Lanzar Demo <i className="fas fa-play"></i>
                </a>
              </div>
            </div>

            <div className="demo-card">
              <div className="demo-preview">
                <div className="demo-placeholder">
                  <i className="fas fa-shield-alt"></i>
                </div>
              </div>
              <div className="demo-content">
                <h3>Chatbot</h3>
                <p>
                  Experiemental chatbot basado en el modelo Aurora. 
                </p>
                <a href="#" className="demo-launch">
                  Lanzar Demo <i className="fas fa-play"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="collaboration-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2>Colabora con Nosotros</h2>
              <p>
                Aurora Labs es un espacio abierto para la innovación colaborativa. 
                Invitamos a investigadores, desarrolladores y organizaciones a 
                contribuir con sus ideas y expertise.
              </p>
              <ul className="collaboration-list">
                <li>
                  <i className="fas fa-code"></i>
                  Contribuye a nuestros proyectos open source
                </li>
                <li>
                  <i className="fas fa-lightbulb"></i>
                  Propón nuevos experimentos e ideas
                </li>
                <li>
                  <i className="fas fa-users"></i>
                  Únete a nuestro programa de investigación colaborativa
                </li>
                <li>
                  <i className="fas fa-graduation-cap"></i>
                  Participa en nuestros workshops y seminarios
                </li>
              </ul>
              <div className="collaboration-cta">
                <a href="/contacto" className="btn btn-primary">
                  Únete al Lab
                </a>
                <a href="https://github.com/aurora-program" className="btn btn-outline-primary">
                  Ver en GitHub
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="collaboration-visual">
                <div className="visual-nodes">
                  <div className="node node-1">
                    <i className="fas fa-user-graduate"></i>
                  </div>
                  <div className="node node-2">
                    <i className="fas fa-laptop-code"></i>
                  </div>
                  <div className="node node-3">
                    <i className="fas fa-building"></i>
                  </div>
                  <div className="node node-center">
                    <i className="fas fa-atom"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Mantente al Día</h2>
            <p>
              Recibe actualizaciones sobre nuestros últimos experimentos y descubrimientos
            </p>
            <form className="newsletter-form">
              <div className="form-group">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Tu email para updates del lab"
                />
                <button type="submit" className="btn btn-primary">
                  Suscribirse
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Labs;
