import '../App.css'
import { Link } from 'react-router-dom'
import { useT } from '../util/useTranslation'

const EthicsI: React.FC = () => {
  const t = useT()

  return (
    <div className="aurora-page-container">
      {/* Hero Section */}
      <header className="aurora-hero">
        <div className="aurora-hero-content">
          <h1 className="aurora-hero-title--page">
            <div className="aurora-icon-accent">📚</div>
            {t('ethicsi.title') || 'EthicsI'}
          </h1>
          <p className="aurora-hero-subtitle">
            {t('ethicsi.subtitle') || 'Foundation para la Ética e Inteligencia: El Motor Ético de Aurora Alliance'}
          </p>
          <div className="aurora-hero-description">
            <Link to="/" className="aurora-tag">
              <i className="fas fa-home"></i>
              {t('common.home') || 'Home'}
            </Link>
            <Link to="/platforms" className="aurora-tag">
              <i className="fas fa-th-large"></i>
              {t('nav.platforms') || 'Platforms'}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="aurora-container">
          {/* Mission Section */}
          <section className="aurora-section">
            <div className="aurora-card" style={{ background: 'linear-gradient(135deg, rgba(30, 74, 122, 0.1), rgba(37, 99, 235, 0.05))', border: '1px solid rgba(30, 74, 122, 0.2)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '100px', height: '100px', background: 'linear-gradient(135deg, var(--aurora-primary), var(--aurora-primary-600))', borderRadius: '50%', opacity: '0.1' }}></div>
              <h2 className="u-mb-3" style={{ position: 'relative', zIndex: '1', color: 'var(--aurora-primary)', fontSize: '2rem', borderBottom: '3px solid var(--aurora-primary)', paddingBottom: '12px', display: 'inline-block' }}>
                <i className="fas fa-compass aurora-icon-accent"></i>
                {t('ethicsi.mission_title') || 'Misión'}
              </h2>
              <div style={{ position: 'relative', zIndex: '1', padding: '20px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', marginTop: '16px' }}>
                <p style={{ margin: '0', fontSize: '1.1rem', lineHeight: '1.7', color: '#4a5568' }}>
                  {t('ethicsi.mission_description') || 'EthicsI Foundation es el motor ético de Aurora Alliance, diseñado para liderar con propósito e integrar principios éticos en decisiones globales. Actuamos como un puente entre la reflexión filosófica y la implementación práctica, creando guías claras para la acción.'}
                </p>
              </div>
            </div>
          </section>

          {/* Strategic Pillars Section */}
          <section className="aurora-section">
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'linear-gradient(135deg, var(--aurora-gold), var(--aurora-gold-400))', borderRadius: '50%', marginBottom: '20px' }}>
                <i className="fas fa-columns" style={{ fontSize: '2rem', color: 'white' }}></i>
              </div>
              <h2 style={{ margin: '0', fontSize: '2.5rem', background: 'linear-gradient(135deg, var(--aurora-gold), var(--aurora-gold-400))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {t('ethicsi.strategic_pillars_title') || 'Pilares Estratégicos'}
              </h2>
              <div style={{ width: '120px', height: '4px', background: 'linear-gradient(90deg, var(--aurora-gold), var(--aurora-gold-400))', margin: '16px auto', borderRadius: '2px' }}></div>
            </div>

            <div className="aurora-grid-auto u-gap-xl">
              <div className="aurora-card u-hover-lift" style={{ background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05))', border: '2px solid rgba(76, 175, 80, 0.3)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '0', left: '0', width: '60px', height: '60px', background: 'linear-gradient(135deg, #4caf50, #81c784)', borderRadius: '0 0 100% 0', opacity: '0.2' }}></div>
                <div style={{ position: 'relative', zIndex: '1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #4caf50, #81c784)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                      <i className="fas fa-atom" style={{ color: 'white', fontSize: '1.3rem' }}></i>
                    </div>
                    <h3 style={{ margin: '0', color: '#2e7d32', fontSize: '1.3rem', fontWeight: '600' }}>
                      {t('ethicsi.reality_vision_title') || 'Visión de la Realidad (Fundamentos Científicos y Tecnológicos):'}
                    </h3>
                  </div>
                  <div style={{ paddingLeft: '66px' }}>
                    <ul style={{ margin: '0', paddingLeft: '0', listStyle: 'none' }}>
                      <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'start' }}>
                        <div style={{ width: '6px', height: '6px', background: '#4caf50', borderRadius: '50%', marginTop: '8px', marginRight: '12px', minWidth: '6px' }}></div>
                        <span>{t('ethicsi.reality_vision_point1') || 'Analizamos el mundo físico y sus interacciones para construir un entendimiento sólido de nuestra posición en el universo.'}</span>
                      </li>
                      <li style={{ display: 'flex', alignItems: 'start' }}>
                        <div style={{ width: '6px', height: '6px', background: '#4caf50', borderRadius: '50%', marginTop: '8px', marginRight: '12px', minWidth: '6px' }}></div>
                        <span>{t('ethicsi.reality_vision_point2') || 'Integramos conceptos científicos y tecnológicos para conectar la ética con el progreso.'}</span>
                      </li>
                    </ul>
                  </div>
                  <div style={{ marginTop: '16px', padding: '8px 12px', background: 'rgba(76, 175, 80, 0.1)', borderRadius: '20px', display: 'inline-block' }}>
                    <span style={{ fontSize: '0.85rem', color: '#2e7d32', fontWeight: '500' }}>Ciencia & Tecnología</span>
                  </div>
                </div>
              </div>

              <div className="aurora-card u-hover-lift" style={{ background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.1), rgba(255, 152, 0, 0.05))', border: '2px solid rgba(255, 152, 0, 0.3)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '0', right: '0', width: '60px', height: '60px', background: 'linear-gradient(135deg, #ff9800, #ffb74d)', borderRadius: '0 0 0 100%', opacity: '0.2' }}></div>
                <div style={{ position: 'relative', zIndex: '1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #ff9800, #ffb74d)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                      <i className="fas fa-leaf" style={{ color: 'white', fontSize: '1.3rem' }}></i>
                    </div>
                    <h3 style={{ margin: '0', color: '#e65100', fontSize: '1.3rem', fontWeight: '600' }}>
                      {t('ethicsi.life_mode_title') || 'Modo de Vida (Sostenibilidad y Colaboración):'}
                    </h3>
                  </div>
                  <div style={{ paddingLeft: '66px' }}>
                    <ul style={{ margin: '0', paddingLeft: '0', listStyle: 'none' }}>
                      <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'start' }}>
                        <div style={{ width: '6px', height: '6px', background: '#ff9800', borderRadius: '50%', marginTop: '8px', marginRight: '12px', minWidth: '6px' }}></div>
                        <span>{t('ethicsi.life_mode_point1') || 'Promovemos principios éticos aplicables a comunidades y organizaciones.'}</span>
                      </li>
                      <li style={{ display: 'flex', alignItems: 'start' }}>
                        <div style={{ width: '6px', height: '6px', background: '#ff9800', borderRadius: '50%', marginTop: '8px', marginRight: '12px', minWidth: '6px' }}></div>
                        <span>{t('ethicsi.life_mode_point2') || 'Diseñamos modelos sostenibles que fomentan la colaboración, la innovación y el respeto mutuo.'}</span>
                      </li>
                    </ul>
                  </div>
                  <div style={{ marginTop: '16px', padding: '8px 12px', background: 'rgba(255, 152, 0, 0.1)', borderRadius: '20px', display: 'inline-block' }}>
                    <span style={{ fontSize: '0.85rem', color: '#e65100', fontWeight: '500' }}>Sostenibilidad</span>
                  </div>
                </div>
              </div>

              <div className="aurora-card u-hover-lift" style={{ background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.1), rgba(156, 39, 176, 0.05))', border: '2px solid rgba(156, 39, 176, 0.3)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', bottom: '0', left: '0', width: '60px', height: '60px', background: 'linear-gradient(135deg, #9c27b0, #ba68c8)', borderRadius: '0 100% 0 0', opacity: '0.2' }}></div>
                <div style={{ position: 'relative', zIndex: '1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #9c27b0, #ba68c8)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                      <i className="fas fa-star" style={{ color: 'white', fontSize: '1.3rem' }}></i>
                    </div>
                    <h3 style={{ margin: '0', color: '#6a1b9a', fontSize: '1.3rem', fontWeight: '600' }}>
                      {t('ethicsi.life_purpose_title') || 'Propósito de la Vida (Impacto y Trascendencia):'}
                    </h3>
                  </div>
                  <div style={{ paddingLeft: '66px' }}>
                    <ul style={{ margin: '0', paddingLeft: '0', listStyle: 'none' }}>
                      <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'start' }}>
                        <div style={{ width: '6px', height: '6px', background: '#9c27b0', borderRadius: '50%', marginTop: '8px', marginRight: '12px', minWidth: '6px' }}></div>
                        <span>{t('ethicsi.life_purpose_point1') || 'Orientamos a individuos y organizaciones hacia metas significativas.'}</span>
                      </li>
                      <li style={{ display: 'flex', alignItems: 'start' }}>
                        <div style={{ width: '6px', height: '6px', background: '#9c27b0', borderRadius: '50%', marginTop: '8px', marginRight: '12px', minWidth: '6px' }}></div>
                        <span>{t('ethicsi.life_purpose_point2') || 'Proporcionamos estrategias para alinear las acciones empresariales y personales con valores trascendentales.'}</span>
                      </li>
                    </ul>
                  </div>
                  <div style={{ marginTop: '16px', padding: '8px 12px', background: 'rgba(156, 39, 176, 0.1)', borderRadius: '20px', display: 'inline-block' }}>
                    <span style={{ fontSize: '0.85rem', color: '#6a1b9a', fontWeight: '500' }}>Trascendencia</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Valuation and Prioritization Section */}
          <section className="aurora-section u-bg-subtle">
            <div className="aurora-container">
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px', gap: '16px' }}>
                <div style={{ flex: '1', height: '2px', background: 'linear-gradient(90deg, transparent, var(--aurora-primary), transparent)' }}></div>
                <h2 style={{ margin: '0', fontSize: '2rem', color: 'var(--aurora-primary)', textAlign: 'center' }}>
                  <i className="fas fa-balance-scale aurora-icon-accent"></i>
                  {t('ethicsi.valuation_title') || 'Valoración y Priorización'}
                </h2>
                <div style={{ flex: '1', height: '2px', background: 'linear-gradient(90deg, transparent, var(--aurora-primary), transparent)' }}></div>
              </div>

              <div className="aurora-grid-2 u-gap-xl">
                <div className="aurora-card" style={{ background: 'linear-gradient(135deg, rgba(63, 81, 181, 0.1), rgba(63, 81, 181, 0.05))', border: '2px solid rgba(63, 81, 181, 0.2)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', background: 'linear-gradient(135deg, #3f51b5, #5c6bc0)', borderRadius: '50%', opacity: '0.1' }}></div>
                  <div style={{ position: 'relative', zIndex: '1' }}>
                    <h3 className="u-mb-3" style={{ color: '#1a237e', fontSize: '1.4rem', borderLeft: '4px solid #3f51b5', paddingLeft: '16px' }}>
                      <i className="fas fa-users" style={{ color: '#3f51b5', marginRight: '8px' }}></i>
                      {t('ethicsi.participative_approach_title') || 'Enfoque Participativo:'}
                    </h3>
                    <div style={{ paddingLeft: '20px' }}>
                      <div className="u-mb-3" style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                        <div style={{ minWidth: '28px', height: '28px', background: '#3f51b5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
                          <i className="fas fa-user-friends" style={{ color: 'white', fontSize: '0.8rem' }}></i>
                        </div>
                        <p style={{ margin: '0', fontSize: '0.95rem', lineHeight: '1.6' }}>
                          {t('ethicsi.participative_approach_point1') || 'Nuestra comunidad de expertos y colaboradores evalúa cada artículo en base a su relevancia e impacto.'}
                        </p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                        <div style={{ minWidth: '28px', height: '28px', background: '#5c6bc0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
                          <i className="fas fa-list-ol" style={{ color: 'white', fontSize: '0.8rem' }}></i>
                        </div>
                        <p style={{ margin: '0', fontSize: '0.95rem', lineHeight: '1.6' }}>
                          {t('ethicsi.participative_approach_point2') || 'Las valoraciones determinan las prioridades estratégicas para el ecosistema.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="aurora-card" style={{ background: 'linear-gradient(135deg, rgba(0, 150, 136, 0.1), rgba(0, 150, 136, 0.05))', border: '2px solid rgba(0, 150, 136, 0.2)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '80px', height: '80px', background: 'linear-gradient(135deg, #009688, #4db6ac)', borderRadius: '50%', opacity: '0.1' }}></div>
                  <div style={{ position: 'relative', zIndex: '1' }}>
                    <h3 className="u-mb-3" style={{ color: '#004d40', fontSize: '1.4rem', borderLeft: '4px solid #009688', paddingLeft: '16px' }}>
                      <i className="fas fa-chart-bar" style={{ color: '#009688', marginRight: '8px' }}></i>
                      {t('ethicsi.analytical_tools_title') || 'Herramientas Analíticas:'}
                    </h3>
                    <div style={{ paddingLeft: '20px' }}>
                      <div className="u-mb-3" style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                        <div style={{ minWidth: '28px', height: '28px', background: '#009688', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
                          <i className="fas fa-brain" style={{ color: 'white', fontSize: '0.8rem' }}></i>
                        </div>
                        <p style={{ margin: '0', fontSize: '0.95rem', lineHeight: '1.6' }}>
                          {t('ethicsi.analytical_tools_point1') || 'Utilizamos métricas claras y herramientas de inteligencia avanzada para identificar tendencias éticas emergentes y guiar decisiones clave.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Connection with EthosSI Section */}
          <section className="aurora-section">
            <div style={{ position: 'relative', marginBottom: '48px' }}>
              <div style={{ position: 'absolute', inset: '0', background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.05), rgba(156, 39, 176, 0.05), rgba(103, 58, 183, 0.05))', borderRadius: '24px', filter: 'blur(1px)' }}></div>
              <div style={{ position: 'relative', padding: '48px 32px', textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', background: 'linear-gradient(135deg, #e91e63, #9c27b0, #673ab7)', borderRadius: '50%', marginBottom: '24px' }}>
                  <i className="fas fa-link" style={{ fontSize: '2.5rem', color: 'white' }}></i>
                </div>
                <h2 style={{ margin: '0 0 16px 0', fontSize: '2.5rem', background: 'linear-gradient(135deg, #e91e63, #9c27b0, #673ab7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {t('ethicsi.ethos_connection_title') || 'Conexión con EthosSI'}
                </h2>
                <p style={{ margin: '0', fontSize: '1.1rem', color: '#6c757d', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
                  {t('ethicsi.ethos_connection_intro') || 'EthicsI Foundation trabaja en estrecha colaboración con EthosSI, una inteligencia simbiótica avanzada que traduce principios éticos en acciones concretas:'}
                </p>
              </div>
            </div>

            <div className="aurora-grid-2 u-gap-xl">
              <div className="aurora-card u-hover-lift" style={{ background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.1), rgba(233, 30, 99, 0.05))', border: '2px solid rgba(233, 30, 99, 0.3)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '0', right: '0', width: '80px', height: '80px', background: 'linear-gradient(135deg, #e91e63, #f06292)', borderRadius: '0 0 0 100%', opacity: '0.1' }}></div>
                <div style={{ position: 'relative', zIndex: '1' }}>
                  <h3 className="u-mb-3" style={{ color: '#ad1457', fontSize: '1.4rem', display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #e91e63, #f06292)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px' }}>
                      <i className="fas fa-route" style={{ color: 'white', fontSize: '1rem' }}></i>
                    </div>
                    {t('ethicsi.strategic_guide_title') || 'Guía Estratégica:'}
                  </h3>
                  <div style={{ paddingLeft: '52px' }}>
                    <p style={{ margin: '0', lineHeight: '1.6', color: '#4a5568' }}>
                      {t('ethicsi.strategic_guide_desc') || 'EthosSI transforma la visión de EthicsI en políticas y decisiones que benefician tanto a las organizaciones como a las comunidades.'}
                    </p>
                  </div>
                  <div style={{ marginTop: '16px', padding: '8px 12px', background: 'rgba(233, 30, 99, 0.1)', borderRadius: '20px', display: 'inline-block' }}>
                    <span style={{ fontSize: '0.85rem', color: '#ad1457', fontWeight: '500' }}>Transformación Estratégica</span>
                  </div>
                </div>
              </div>

              <div className="aurora-card u-hover-lift" style={{ background: 'linear-gradient(135deg, rgba(103, 58, 183, 0.1), rgba(103, 58, 183, 0.05))', border: '2px solid rgba(103, 58, 183, 0.3)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '0', left: '0', width: '80px', height: '80px', background: 'linear-gradient(135deg, #673ab7, #9575cd)', borderRadius: '0 0 100% 0', opacity: '0.1' }}></div>
                <div style={{ position: 'relative', zIndex: '1' }}>
                  <h3 className="u-mb-3" style={{ color: '#4527a0', fontSize: '1.4rem', display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #673ab7, #9575cd)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px' }}>
                      <i className="fas fa-expand-arrows-alt" style={{ color: 'white', fontSize: '1rem' }}></i>
                    </div>
                    {t('ethicsi.alignment_scalability_title') || 'Alineación y Escalabilidad:'}
                  </h3>
                  <div style={{ paddingLeft: '52px' }}>
                    <p style={{ margin: '0', lineHeight: '1.6', color: '#4a5568' }}>
                      {t('ethicsi.alignment_scalability_desc') || 'Aseguramos que las estrategias empresariales y sociales se alineen con un marco ético global, escalable y adaptable.'}
                    </p>
                  </div>
                  <div style={{ marginTop: '16px', padding: '8px 12px', background: 'rgba(103, 58, 183, 0.1)', borderRadius: '20px', display: 'inline-block' }}>
                    <span style={{ fontSize: '0.85rem', color: '#4527a0', fontWeight: '500' }}>Marco Global</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Join Section */}
          <section className="aurora-section u-bg-subtle">
            <div className="aurora-container">
              <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <div style={{ display: 'inline-block', padding: '16px 24px', background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(139, 195, 74, 0.05))', borderRadius: '50px', marginBottom: '16px' }}>
                  <i className="fas fa-hands-helping" style={{ fontSize: '2rem', color: '#388e3c' }}></i>
                </div>
                <h2 style={{ margin: '0', fontSize: '2.2rem', color: '#2e7d32' }}>
                  {t('ethicsi.why_join_title') || 'Por qué unirse a EthicsI Foundation'}
                </h2>
                <div style={{ width: '100px', height: '3px', background: 'linear-gradient(90deg, #4caf50, #8bc34a)', margin: '16px auto', borderRadius: '2px' }}></div>
              </div>

              <div className="aurora-grid-auto u-gap-lg">
                <div className="aurora-card u-hover-lift" style={{ background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 193, 7, 0.05))', border: '2px solid rgba(255, 193, 7, 0.3)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '100px', height: '3px', background: 'linear-gradient(90deg, #ffc107, #ffeb3b)' }}></div>
                  <div style={{ padding: '20px' }}>
                    <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #ffc107, #ffeb3b)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                      <i className="fas fa-crown" style={{ color: 'white', fontSize: '1.5rem' }}></i>
                    </div>
                    <h3 style={{ margin: '0 0 12px 0', color: '#f57f17', fontSize: '1.3rem' }}>
                      {t('ethicsi.ethical_leadership_title') || 'Liderazgo Ético:'}
                    </h3>
                    <p style={{ margin: '0', lineHeight: '1.6', color: '#4a5568' }}>
                      {t('ethicsi.ethical_leadership_desc') || 'Posicione a su organización como líder en sostenibilidad, innovación y responsabilidad social.'}
                    </p>
                  </div>
                </div>

                <div className="aurora-card u-hover-lift" style={{ background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(33, 150, 243, 0.05))', border: '2px solid rgba(33, 150, 243, 0.3)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '100px', height: '3px', background: 'linear-gradient(90deg, #2196f3, #64b5f6)' }}></div>
                  <div style={{ padding: '20px' }}>
                    <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #2196f3, #64b5f6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                      <i className="fas fa-network-wired" style={{ color: 'white', fontSize: '1.5rem' }}></i>
                    </div>
                    <h3 style={{ margin: '0 0 12px 0', color: '#0d47a1', fontSize: '1.3rem' }}>
                      {t('ethicsi.innovation_network_title') || 'Red de Innovación:'}
                    </h3>
                    <p style={{ margin: '0', lineHeight: '1.6', color: '#4a5568' }}>
                      {t('ethicsi.innovation_network_desc') || 'Colabore con una comunidad global de expertos y organizaciones comprometidas con la trascendencia.'}
                    </p>
                  </div>
                </div>

                <div className="aurora-card u-hover-lift" style={{ background: 'linear-gradient(135deg, rgba(121, 85, 72, 0.1), rgba(121, 85, 72, 0.05))', border: '2px solid rgba(121, 85, 72, 0.3)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '100px', height: '3px', background: 'linear-gradient(90deg, #795548, #a1887f)' }}></div>
                  <div style={{ padding: '20px' }}>
                    <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #795548, #a1887f)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                      <i className="fas fa-chart-line" style={{ color: 'white', fontSize: '1.5rem' }}></i>
                    </div>
                    <h3 style={{ margin: '0 0 12px 0', color: '#3e2723', fontSize: '1.3rem' }}>
                      {t('ethicsi.measurable_impact_title') || 'Impacto Mensurable:'}
                    </h3>
                    <p style={{ margin: '0', lineHeight: '1.6', color: '#4a5568' }}>
                      {t('ethicsi.measurable_impact_desc') || 'Utilice nuestra guía estratégica para generar resultados tangibles en términos de propósito, colaboración y progreso ético.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="aurora-section u-bg-subtle">
            <div className="aurora-container">
              <div className="u-text-center u-py-4">
                <h2 className="u-mb-3">
                  <i className="fas fa-rocket aurora-icon-accent"></i>
                  Explore Our Ecosystem
                </h2>
                <p className="u-mb-4">
                  {t('ethicsi.link_to_products') || 'Discover how EthicsI integrates with our product ecosystem'}
                </p>
                <div className="u-flex u-justify-center u-gap-md u-flex-wrap">
                  <Link to="/products" className="aurora-btn aurora-btn--primary">
                    <i className="fas fa-cube"></i>
                    {t('ethicsi.view_products') || 'Products'}
                  </Link>
                  <Link to="/plataformas/harmonia" className="aurora-btn aurora-btn--gold">
                    <i className="fas fa-handshake"></i>
                    Harmonia
                  </Link>
                  <Link to="/plataformas/innvalab" className="aurora-btn aurora-btn--gold">
                    <i className="fas fa-flask"></i>
                    InnovaLab
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default EthicsI
