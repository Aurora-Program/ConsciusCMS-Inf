import React from 'react'
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
            <div className="aurora-icon-accent">⚖️</div>
            {t('ethicsi.hero_title') || 'EthicsI Foundation'}
          </h1>
          <p className="aurora-hero-subtitle">
            {t('ethicsi.hero_subtitle') || 'El Motor Ético de Aurora Alliance'}
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
              <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '60px', height: '60px', background: 'linear-gradient(135deg, var(--aurora-gold), var(--aurora-gold-400))', borderRadius: '50%', opacity: '0.15' }}></div>
              
              <h2 className="u-mb-3" style={{ position: 'relative', zIndex: '1', color: 'var(--aurora-primary)', fontSize: '2.2rem', borderBottom: '3px solid var(--aurora-primary)', paddingBottom: '12px', display: 'inline-block' }}>
                <i className="fas fa-compass aurora-icon-accent" style={{ marginRight: '12px' }}></i>
                {t('ethicsi.mission_title') || 'Misión'}
              </h2>
              
              <div style={{ position: 'relative', zIndex: '1', padding: '24px', background: 'rgba(255, 255, 255, 0.9)', borderRadius: '16px', marginTop: '20px', boxShadow: '0 4px 20px rgba(30, 74, 122, 0.1)' }}>
                <p style={{ margin: '0', fontSize: '1.2rem', lineHeight: '1.8', color: '#374151', fontWeight: '400'}}>
                  {t('ethicsi.mission_desc') || 'EthicsI Foundation es el motor ético de Aurora Alliance, diseñado para liderar con propósito e integrar principios éticos en decisiones globales. Actuamos como un puente entre la reflexión filosófica y la implementación práctica, creando guías claras para la acción.'}
                </p>
              </div>
            </div>
          </section>

          {/* Strategic Pillars Section */}
          <section className="aurora-section">
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '90px', height: '90px', background: 'linear-gradient(135deg, var(--aurora-gold), var(--aurora-gold-400))', borderRadius: '50%', marginBottom: '24px', boxShadow: '0 8px 30px rgba(240, 230, 140, 0.3)' }}>
                <i className="fas fa-columns" style={{ fontSize: '2.2rem', color: 'white' }}></i>
              </div>
              <h2 style={{ margin: '0', fontSize: '2.8rem', background: 'linear-gradient(135deg, var(--aurora-gold), var(--aurora-gold-400))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '700'}}>
                {t('ethicsi.pillars_title') || 'Pilares Estratégicos'}
              </h2>
              <div style={{ width: '120px', height: '4px', background: 'linear-gradient(90deg, var(--aurora-gold), var(--aurora-gold-400))', margin: '20px auto', borderRadius: '2px' }}></div>
            </div>

            <div className="aurora-grid-3" style={{ gap: '32px' }}>
              {/* Pilar 1 - Visión de la Realidad */}
              <div className="aurora-card u-hover-lift" style={{ background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05))', border: '2px solid rgba(76, 175, 80, 0.3)', position: 'relative', overflow: 'hidden', minHeight: '320px' }}>
                <div style={{ position: 'absolute', top: '0', left: '0', width: '60px', height: '60px', background: 'linear-gradient(135deg, #4caf50, #81c784)', borderRadius: '0 0 100% 0', opacity: '0.2' }}></div>
                <div style={{ position: 'relative', zIndex: '1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #4caf50, #81c784)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                      <i className="fas fa-atom" style={{ color: 'white', fontSize: '1.3rem' }}></i>
                    </div>
                    <h3 style={{ margin: '0', color: '#2e7d32', fontSize: '1.4rem', fontWeight: '600' }}>
                      {t('ethicsi.pillar1_title') || 'Visión de la Realidad'}
                    </h3>
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '16px', fontStyle: 'italic' }}>
                    {t('ethicsi.pillar1_subtitle') || '(Fundamentos Científicos y Tecnológicos)'}
                  </p>
                  <ul style={{ margin: '0', paddingLeft: '0', listStyle: 'none' }}>
                    <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'start' }}>
                      <div style={{ width: '6px', height: '6px', background: '#4caf50', borderRadius: '50%', marginTop: '8px', marginRight: '12px', minWidth: '6px' }}></div>
                      <span style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                        {t('ethicsi.pillar1_point1') || 'Analizamos el mundo físico y sus interacciones para construir un entendimiento sólido de nuestra posición en el universo.'}
                      </span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'start' }}>
                      <div style={{ width: '6px', height: '6px', background: '#4caf50', borderRadius: '50%', marginTop: '8px', marginRight: '12px', minWidth: '6px' }}></div>
                      <span style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                        {t('ethicsi.pillar1_point2') || 'Integramos conceptos científicos y tecnológicos para conectar la ética con el progreso.'}
                      </span>
                    </li>
                  </ul>
                  <div style={{ marginTop: '16px', padding: '8px 12px', background: 'rgba(76, 175, 80, 0.1)', borderRadius: '20px', display: 'inline-block' }}>
                    <span style={{ fontSize: '0.85rem', color: '#2e7d32', fontWeight: '500' }}>Ciencia & Tecnología</span>
                  </div>
                </div>
              </div>

              {/* Pilar 2 - Modo de Vida */}
              <div className="aurora-card u-hover-lift" style={{ background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.1), rgba(255, 152, 0, 0.05))', border: '2px solid rgba(255, 152, 0, 0.3)', position: 'relative', overflow: 'hidden', minHeight: '320px' }}>
                <div style={{ position: 'absolute', top: '0', right: '0', width: '60px', height: '60px', background: 'linear-gradient(135deg, #ff9800, #ffb74d)', borderRadius: '0 0 0 100%', opacity: '0.2' }}></div>
                <div style={{ position: 'relative', zIndex: '1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #ff9800, #ffb74d)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                      <i className="fas fa-leaf" style={{ color: 'white', fontSize: '1.3rem' }}></i>
                    </div>
                    <h3 style={{ margin: '0', color: '#e65100', fontSize: '1.4rem', fontWeight: '600' }}>
                      {t('ethicsi.pillar2_title') || 'Modo de Vida'}
                    </h3>
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '16px', fontStyle: 'italic' }}>
                    {t('ethicsi.pillar2_subtitle') || '(Sostenibilidad y Colaboración)'}
                  </p>
                  <ul style={{ margin: '0', paddingLeft: '0', listStyle: 'none' }}>
                    <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'start' }}>
                      <div style={{ width: '6px', height: '6px', background: '#ff9800', borderRadius: '50%', marginTop: '8px', marginRight: '12px', minWidth: '6px' }}></div>
                      <span style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                        {t('ethicsi.pillar2_point1') || 'Promovemos principios éticos aplicables a comunidades y organizaciones.'}
                      </span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'start' }}>
                      <div style={{ width: '6px', height: '6px', background: '#ff9800', borderRadius: '50%', marginTop: '8px', marginRight: '12px', minWidth: '6px' }}></div>
                      <span style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                        {t('ethicsi.pillar2_point2') || 'Diseñamos modelos sostenibles que fomentan la colaboración, la innovación y el respeto mutuo.'}
                      </span>
                    </li>
                  </ul>
                  <div style={{ marginTop: '16px', padding: '8px 12px', background: 'rgba(255, 152, 0, 0.1)', borderRadius: '20px', display: 'inline-block' }}>
                    <span style={{ fontSize: '0.85rem', color: '#e65100', fontWeight: '500' }}>Sostenibilidad</span>
                  </div>
                </div>
              </div>

              {/* Pilar 3 - Propósito de la Vida */}
              <div className="aurora-card u-hover-lift" style={{ background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.1), rgba(156, 39, 176, 0.05))', border: '2px solid rgba(156, 39, 176, 0.3)', position: 'relative', overflow: 'hidden', minHeight: '320px' }}>
                <div style={{ position: 'absolute', bottom: '0', left: '0', width: '60px', height: '60px', background: 'linear-gradient(135deg, #9c27b0, #ba68c8)', borderRadius: '0 100% 0 0', opacity: '0.2' }}></div>
                <div style={{ position: 'relative', zIndex: '1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #9c27b0, #ba68c8)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                      <i className="fas fa-star" style={{ color: 'white', fontSize: '1.3rem' }}></i>
                    </div>
                    <h3 style={{ margin: '0', color: '#6a1b9a', fontSize: '1.4rem', fontWeight: '600' }}>
                      {t('ethicsi.pillar3_title') || 'Propósito de la Vida'}
                    </h3>
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '16px', fontStyle: 'italic' }}>
                    {t('ethicsi.pillar3_subtitle') || '(Impacto y Trascendencia)'}
                  </p>
                  <ul style={{ margin: '0', paddingLeft: '0', listStyle: 'none' }}>
                    <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'start' }}>
                      <div style={{ width: '6px', height: '6px', background: '#9c27b0', borderRadius: '50%', marginTop: '8px', marginRight: '12px', minWidth: '6px' }}></div>
                      <span style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                        {t('ethicsi.pillar3_point1') || 'Orientamos a individuos y organizaciones hacia metas significativas.'}
                      </span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'start' }}>
                      <div style={{ width: '6px', height: '6px', background: '#9c27b0', borderRadius: '50%', marginTop: '8px', marginRight: '12px', minWidth: '6px' }}></div>
                      <span style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                        {t('ethicsi.pillar3_point2') || 'Proporcionamos estrategias para alinear las acciones empresariales y personales con valores trascendentales.'}
                      </span>
                    </li>
                  </ul>
                  <div style={{ marginTop: '16px', padding: '8px 12px', background: 'rgba(156, 39, 176, 0.1)', borderRadius: '20px', display: 'inline-block' }}>
                    <span style={{ fontSize: '0.85rem', color: '#6a1b9a', fontWeight: '500' }}>Trascendencia</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Valoración y Priorización Section */}
          <section className="aurora-section">
            <div className="aurora-card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(79, 70, 229, 0.05))', border: '1px solid rgba(99, 102, 241, 0.2)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '120px', height: '120px', background: 'linear-gradient(135deg, #6366f1, #4f46e5)', borderRadius: '50%', opacity: '0.08' }}></div>
              
              <h2 style={{ color: 'var(--aurora-primary)', fontSize: '2.2rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #6366f1, #4f46e5)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-chart-line" style={{ color: 'white', fontSize: '1.5rem' }}></i>
                </div>
                {t('ethicsi.valuation_title') || 'Valoración y Priorización'}
              </h2>

              <div className="aurora-grid-3" style={{ gap: '24px', marginTop: '32px' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '16px', padding: '24px', position: 'relative', zIndex: '1' }}>
                  <h3 style={{ color: '#4f46e5', fontSize: '1.3rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <i className="fas fa-users" style={{ color: '#6366f1' }}></i>
                    {t('ethicsi.valuation_method_title') || 'Enfoque Participativo'}
                  </h3>
                  <p style={{ margin: '0', fontSize: '0.9rem', lineHeight: '1.6', color: '#374151' }}>
                    {t('ethicsi.valuation_method_desc') || 'Nuestra comunidad de expertos y colaboradores evalúa cada artículo en base a su relevancia e impacto.'}
                  </p>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '16px', padding: '24px', position: 'relative', zIndex: '1' }}>
                  <h3 style={{ color: '#4f46e5', fontSize: '1.3rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <i className="fas fa-brain" style={{ color: '#6366f1' }}></i>
                    {t('ethicsi.valuation_criteria_title') || 'Herramientas Analíticas'}
                  </h3>
                  <p style={{ margin: '0', fontSize: '0.9rem', lineHeight: '1.6', color: '#374151' }}>
                    {t('ethicsi.valuation_criteria_desc') || 'Utilizamos métricas claras y herramientas de inteligencia avanzada para identificar tendencias éticas emergentes y guiar decisiones clave.'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Conexión con EthosSI Section */}
          <section className="aurora-section">
            <div className="aurora-card" style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(190, 24, 93, 0.05), rgba(147, 51, 234, 0.05))', border: '2px solid rgba(236, 72, 153, 0.2)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '80px', height: '80px', background: 'linear-gradient(135deg, #ec4899, #be185d)', borderRadius: '50%', opacity: '0.15' }}></div>
              <div style={{ position: 'absolute', bottom: '-30px', right: '-30px', width: '100px', height: '100px', background: 'linear-gradient(135deg, #9333ea, #7c3aed)', borderRadius: '50%', opacity: '0.1' }}></div>
              
              <h2 style={{ position: 'relative', color: 'var(--aurora-primary)', fontSize: '2.4rem', marginBottom: '24px', textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', background: 'linear-gradient(135deg, #ec4899, #be185d, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '700' }}>
                  <i className="fas fa-link" style={{ color: '#ec4899' }}></i>
                  {t('ethicsi.ethos_title') || 'Conexión con EthosSI'}
                </div>
              </h2>
              
              <div style={{ position: 'relative', textAlign: 'center', background: 'rgba(255, 255, 255, 0.95)', borderRadius: '20px', padding: '32px', marginBottom: '24px' }}>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#374151', margin: '0 0 24px 0' }}>
                  {t('ethicsi.ethos_desc') || 'EthicsI Foundation trabaja en estrecha colaboración con EthosSI, una inteligencia simbiótica avanzada que traduce principios éticos en acciones concretas:'}
                </p>
              </div>

              <div className="aurora-grid-3" style={{ gap: '24px', position: 'relative', zIndex: '1' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
                  <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #ec4899, #be185d)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                    <i className="fas fa-compass" style={{ color: 'white', fontSize: '1.2rem' }}></i>
                  </div>
                  <h3 style={{ color: '#be185d', fontSize: '1.2rem', marginBottom: '12px', fontWeight: '600' }}>
                    {t('ethicsi.ethos_guide_title') || 'Guía Estratégica'}
                  </h3>
                  <p style={{ margin: '0', fontSize: '0.9rem', lineHeight: '1.6', color: '#374151' }}>
                    {t('ethicsi.ethos_guide_description') || 'EthosSI transforma la visión de EthicsI en políticas y decisiones que benefician tanto a las organizaciones como a las comunidades.'}
                  </p>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
                  <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #be185d, #9333ea)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                    <i className="fas fa-sync-alt" style={{ color: 'white', fontSize: '1.2rem' }}></i>
                  </div>
                  <h3 style={{ color: '#9333ea', fontSize: '1.2rem', marginBottom: '12px', fontWeight: '600' }}>
                    {t('ethicsi.ethos_alignment_title') || 'Alineación y Escalabilidad'}
                  </h3>
                  <p style={{ margin: '0', fontSize: '0.9rem', lineHeight: '1.6', color: '#374151' }}>
                    {t('ethicsi.ethos_alignment_description') || 'Aseguramos que las estrategias empresariales y sociales se alineen con un marco ético global, escalable y adaptable.'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Join Section */}
          <section className="aurora-section">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '90px', height: '90px', background: 'linear-gradient(135deg, var(--aurora-gold), var(--aurora-gold-400))', borderRadius: '50%', marginBottom: '24px', boxShadow: '0 8px 30px rgba(240, 230, 140, 0.3)' }}>
                <i className="fas fa-handshake" style={{ fontSize: '2.2rem', color: 'white' }}></i>
              </div>
              <h2 style={{ fontSize: '2.8rem', background: 'linear-gradient(135deg, var(--aurora-gold), var(--aurora-gold-400))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '16px', fontWeight: '700' }}>
                {t('ethicsi.why_join_title') || '¿Por qué unirse a EthicsI Foundation?'}
              </h2>
              <div style={{ width: '120px', height: '4px', background: 'linear-gradient(90deg, var(--aurora-gold), var(--aurora-gold-400))', margin: '20px auto', borderRadius: '2px' }}></div>
            </div>

            <div className="aurora-grid-3" style={{ gap: '28px' }}>
              <div className="aurora-card u-hover-lift" style={{ textAlign: 'center', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05))', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '32px 24px' }}>
                <div style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)' }}>
                  <i className="fas fa-crown" style={{ color: 'white', fontSize: '1.8rem' }}></i>
                </div>
                <h3 style={{ color: '#1e40af', marginBottom: '16px', fontSize: '1.3rem', fontWeight: '600' }}>
                  {t('ethicsi.reason1_title') || 'Liderazgo Ético'}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: '0', lineHeight: '1.6' }}>
                  {t('ethicsi.reason1_desc') || 'Posicione a su organización como líder en sostenibilidad, innovación y responsabilidad social.'}
                </p>
              </div>

              <div className="aurora-card u-hover-lift" style={{ textAlign: 'center', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '32px 24px' }}>
                <div style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)' }}>
                  <i className="fas fa-network-wired" style={{ color: 'white', fontSize: '1.8rem' }}></i>
                </div>
                <h3 style={{ color: '#065f46', marginBottom: '16px', fontSize: '1.3rem', fontWeight: '600' }}>
                  {t('ethicsi.reason2_title') || 'Red de Innovación'}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: '0', lineHeight: '1.6' }}>
                  {t('ethicsi.reason2_desc') || 'Colabore con una comunidad global de expertos y organizaciones comprometidas con la trascendencia.'}
                </p>
              </div>

              <div className="aurora-card u-hover-lift" style={{ textAlign: 'center', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.05))', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '32px 24px' }}>
                <div style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)' }}>
                  <i className="fas fa-chart-bar" style={{ color: 'white', fontSize: '1.8rem' }}></i>
                </div>
                <h3 style={{ color: '#92400e', marginBottom: '16px', fontSize: '1.3rem', fontWeight: '600' }}>
                  {t('ethicsi.reason3_title') || 'Impacto Mensurable'}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: '0', lineHeight: '1.6' }}>
                  {t('ethicsi.reason3_desc') || 'Utilice nuestra guía estratégica para generar resultados tangibles en términos de propósito, colaboración y progreso ético.'}
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="aurora-section">
            <div className="aurora-card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, var(--aurora-primary), var(--aurora-primary-600))', color: 'white', padding: '48px 32px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '150px', height: '150px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%' }}></div>
              <div style={{ position: 'absolute', bottom: '-30px', right: '-30px', width: '100px', height: '100px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '50%' }}></div>
              
              <div style={{ position: 'relative', zIndex: '1', marginBottom: '32px' }}>
                <div style={{ width: '90px', height: '90px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px auto', boxShadow: '0 8px 30px rgba(255, 255, 255, 0.2)' }}>
                  <i className="fas fa-rocket" style={{ fontSize: '2.2rem' }}></i>
                </div>
                <h2 style={{ fontSize: '2.8rem', marginBottom: '20px', textShadow: '0 2px 4px rgba(0,0,0,0.1)', fontWeight: '700', color: 'white' }}>
                  {t('ethicsi.cta_title') || 'Únete a EthicsI Foundation'}
                </h2>
                <p style={{ fontSize: '1.3rem', opacity: '0.95', maxWidth: '650px', margin: '0 auto', lineHeight: '1.6' }}>
                  {t('ethicsi.cta_desc') || 'Sé parte del cambio. Lidera con propósito y ayuda a construir un futuro donde la ética y la innovación trabajen juntas para el bienestar de toda la humanidad.'}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: '1' }}>
                <Link 
                  to="/platforms" 
                  className="aurora-btn aurora-btn--gold" 
                  style={{ padding: '18px 36px', fontSize: '1.1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', fontWeight: '600', boxShadow: '0 4px 15px rgba(240, 230, 140, 0.3)' }}
                >
                  <i className="fas fa-play"></i>
                  {t('ethicsi.cta_button') || 'Comenzar Ahora'}
                </Link>
                <Link 
                  to="/about" 
                  className="aurora-btn" 
                  style={{ padding: '18px 36px', fontSize: '1.1rem', background: 'rgba(255, 255, 255, 0.15)', color: 'white', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', border: '2px solid rgba(255, 255, 255, 0.3)', fontWeight: '600', backdropFilter: 'blur(10px)' }}
                >
                  <i className="fas fa-info-circle"></i>
                  {t('common.learn_more') || 'Saber Más'}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default EthicsI
       
