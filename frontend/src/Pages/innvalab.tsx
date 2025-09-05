import '../App.css'
import { Link } from 'react-router-dom'
import { useT } from '../util/useTranslation'

const InnvaLab: React.FC = () => {
  const t = useT()

  return (
    <>
    <div className="aurora-page">
      <div className="aurora-container">
        
        {/* Hero Section - Innovation Visualization */}
        <section className="aurora-hero">
          <div style={{ position: 'relative', minHeight: '450px', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(59, 130, 246, 0.1))', borderRadius: '20px', padding: '60px 40px', overflow: 'hidden' }}>
            {/* Floating Innovation Elements */}
            <div style={{ position: 'absolute', top: '25%', left: '10%', width: '30px', height: '30px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '6px', transform: 'rotate(15deg)', opacity: '0.7' }}></div>
            <div style={{ position: 'absolute', top: '15%', right: '15%', width: '24px', height: '24px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', borderRadius: '50%', opacity: '0.8' }}></div>
            <div style={{ position: 'absolute', bottom: '20%', left: '20%', width: '36px', height: '36px', background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '8px', transform: 'rotate(-20deg)', opacity: '0.6' }}></div>
            <div style={{ position: 'absolute', bottom: '30%', right: '25%', width: '28px', height: '28px', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', borderRadius: '4px', opacity: '0.5' }}></div>
            
            {/* Connection Network */}
            <div style={{ position: 'absolute', top: '30%', left: '25%', width: '180px', height: '1px', background: 'linear-gradient(90deg, rgba(245, 158, 11, 0.4), rgba(59, 130, 246, 0.2))', transform: 'rotate(35deg)' }}></div>
            <div style={{ position: 'absolute', bottom: '35%', right: '20%', width: '120px', height: '1px', background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.3), transparent)', transform: 'rotate(-25deg)' }}></div>
            
            <div className="u-text-center">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <div style={{ width: '90px', height: '90px', background: 'linear-gradient(135deg, #f59e0b, #3b82f6)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '24px' }}>
                  <i className="fas fa-flask" style={{ color: 'white', fontSize: '2.2rem' }}></i>
                </div>
                <h1 style={{ fontSize: '3.8rem', margin: '0', background: 'linear-gradient(135deg, #f59e0b, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '700' }}>
                  {t('innvalab.hero_title')}
                </h1>
              </div>
              <p style={{ fontSize: '1.4rem', color: '#6b7280', maxWidth: '800px', margin: '0 auto 20px auto', lineHeight: '1.6' }}>
                {t('innvalab.hero_subtitle')}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{ padding: '8px 16px', background: 'rgba(245, 158, 11, 0.1)', color: '#d97706', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '500' }}>Innovación Distribuida</span>
                <span style={{ padding: '8px 16px', background: 'rgba(59, 130, 246, 0.1)', color: '#2563eb', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '500' }}>Código Abierto</span>
                <span style={{ padding: '8px 16px', background: 'rgba(16, 185, 129, 0.1)', color: '#059669', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '500' }}>Colaboración Global</span>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="aurora-section">
          <div className="aurora-card" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05))', border: '1px solid rgba(245, 158, 11, 0.2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-30px', left: '-30px', width: '120px', height: '120px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '50%', opacity: '0.08' }}></div>
            
            <div style={{ position: 'relative', zIndex: '1' }}>
              <h2 style={{ color: '#d97706', fontSize: '2.2rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-rocket" style={{ color: 'white', fontSize: '1.5rem' }}></i>
                </div>
                {t('innvalab.mission_title')}
              </h2>

              <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#374151', marginBottom: '16px' }}>
                {t('innvalab.mission_desc1')}
              </p>
              
              <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#374151', marginBottom: '20px' }}>
                {t('innvalab.mission_desc2')}
              </p>

              <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #f59e0b' }}>
                <h3 style={{ color: '#d97706', fontSize: '1.3rem', marginBottom: '12px', fontWeight: '600' }}>
                  {t('innvalab.distributed_design_title')}
                </h3>
                <p style={{ margin: '0', fontSize: '1rem', lineHeight: '1.6', color: '#374151' }}>
                  {t('innvalab.distributed_design_desc')}
                </p>
              </div>
            </div>
          </div>
        </section>
            <div className="u-text-center u-mb-4">
              <h2 className="u-mb-2" style={{ fontSize: '2.2rem', color: 'var(--aurora-gold)', fontWeight: '600' }}>
                <i className="fas fa-network-wired aurora-icon-accent"></i>
        {/* Innovation Principles Section */}
        <section className="aurora-section">
          <div className="u-text-center u-mb-4">
            <h2 style={{ color: 'var(--aurora-primary)', fontSize: '2.4rem', marginBottom: '16px' }}>
              {t('innvalab.principles_title')}
            </h2>
            <div style={{ width: '120px', height: '4px', background: 'linear-gradient(90deg, #f59e0b, #3b82f6, #10b981)', margin: '0 auto', borderRadius: '2px' }}></div>
          </div>

          <div className="aurora-grid-2" style={{ gap: '32px' }}>
            {/* Principio de Apertura */}
            <div className="aurora-card u-hover-lift" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05))', border: '2px solid rgba(245, 158, 11, 0.2)', position: 'relative', overflow: 'hidden', minHeight: '200px' }}>
              <div style={{ position: 'relative', zIndex: '1' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                    <i className="fas fa-unlock" style={{ color: 'white', fontSize: '1.2rem' }}></i>
                  </div>
                  <h3 style={{ margin: '0', color: '#d97706', fontSize: '1.4rem', fontWeight: '600' }}>
                    {t('innvalab.principles_openness_title')}
                  </h3>
                </div>
                <p style={{ color: '#374151', fontSize: '1rem', lineHeight: '1.6', margin: '0' }}>
                  {t('innvalab.principles_openness_desc')}
                </p>
              </div>
            </div>

            {/* Principio de Experimentación */}
            <div className="aurora-card u-hover-lift" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05))', border: '2px solid rgba(59, 130, 246, 0.2)', position: 'relative', overflow: 'hidden', minHeight: '200px' }}>
              <div style={{ position: 'relative', zIndex: '1' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                    <i className="fas fa-vial" style={{ color: 'white', fontSize: '1.2rem' }}></i>
                  </div>
                  <h3 style={{ margin: '0', color: '#2563eb', fontSize: '1.4rem', fontWeight: '600' }}>
                    {t('innvalab.principles_experimentation_title')}
                  </h3>
                </div>
                <p style={{ color: '#374151', fontSize: '1rem', lineHeight: '1.6', margin: '0' }}>
                  {t('innvalab.principles_experimentation_desc')}
                </p>
              </div>
            </div>

            {/* Principio de Sostenibilidad */}
            <div className="aurora-card u-hover-lift" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))', border: '2px solid rgba(16, 185, 129, 0.2)', position: 'relative', overflow: 'hidden', minHeight: '200px' }}>
              <div style={{ position: 'relative', zIndex: '1' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                    <i className="fas fa-leaf" style={{ color: 'white', fontSize: '1.2rem' }}></i>
                  </div>
                  <h3 style={{ margin: '0', color: '#059669', fontSize: '1.4rem', fontWeight: '600' }}>
                    {t('innvalab.principles_sustainability_title')}
                  </h3>
                </div>
                <p style={{ color: '#374151', fontSize: '1rem', lineHeight: '1.6', margin: '0' }}>
                  {t('innvalab.principles_sustainability_desc')}
                </p>
              </div>
            </div>

            {/* Principio de Cooperación */}
            <div className="aurora-card u-hover-lift" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.05))', border: '2px solid rgba(139, 92, 246, 0.2)', position: 'relative', overflow: 'hidden', minHeight: '200px' }}>
              <div style={{ position: 'relative', zIndex: '1' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                    <i className="fas fa-handshake" style={{ color: 'white', fontSize: '1.2rem' }}></i>
                  </div>
                  <h3 style={{ margin: '0', color: '#7c3aed', fontSize: '1.4rem', fontWeight: '600' }}>
                    {t('innvalab.principles_cooperation_title')}
                  </h3>
                </div>
                <p style={{ color: '#374151', fontSize: '1rem', lineHeight: '1.6', margin: '0' }}>
                  {t('innvalab.principles_cooperation_desc')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Areas Section */}
        <section className="aurora-section">
          <div className="u-text-center u-mb-4">
            <h2 style={{ color: 'var(--aurora-primary)', fontSize: '2.2rem', marginBottom: '16px' }}>
              {t('innvalab.technology_areas_title')}
            </h2>
          </div>

          <div className="aurora-grid-2" style={{ gap: '24px' }}>
            <div className="aurora-card" style={{ padding: '24px', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <h3 style={{ color: '#d97706', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <i className="fas fa-robot" style={{ fontSize: '1.2rem' }}></i>
                {t('innvalab.ai_intelligence_title')}
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.6', margin: '0' }}>
                {t('innvalab.ai_intelligence_desc')}
              </p>
            </div>

            <div className="aurora-card" style={{ padding: '24px', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <h3 style={{ color: '#2563eb', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <i className="fas fa-link" style={{ fontSize: '1.2rem' }}></i>
                {t('innvalab.blockchain_title')}
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.6', margin: '0' }}>
                {t('innvalab.blockchain_desc')}
              </p>
            </div>

            <div className="aurora-card" style={{ padding: '24px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <h3 style={{ color: '#059669', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <i className="fas fa-microchip" style={{ fontSize: '1.2rem' }}></i>
                {t('innvalab.iot_sensors_title')}
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.6', margin: '0' }}>
                {t('innvalab.iot_sensors_desc')}
              </p>
            </div>

            <div className="aurora-card" style={{ padding: '24px', background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
              <h3 style={{ color: '#7c3aed', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <i className="fas fa-code" style={{ fontSize: '1.2rem' }}></i>
                {t('innvalab.web_technologies_title')}
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.6', margin: '0' }}>
                {t('innvalab.web_technologies_desc')}
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="aurora-section">
          <div className="aurora-card" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(59, 130, 246, 0.1))', border: '2px solid rgba(245, 158, 11, 0.2)', textAlign: 'center', position: 'relative', overflow: 'hidden', padding: '48px 32px' }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'linear-gradient(135deg, #f59e0b, #3b82f6)', borderRadius: '50%', opacity: '0.1' }}></div>
            
            <div style={{ position: 'relative', zIndex: '1' }}>
              <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #f59e0b, #3b82f6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
                <i className="fas fa-rocket" style={{ color: 'white', fontSize: '2rem' }}></i>
              </div>
              
              <h2 style={{ fontSize: '2.2rem', marginBottom: '16px', background: 'linear-gradient(135deg, #f59e0b, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '700' }}>
                {t('innvalab.cta_title')}
              </h2>
              
              <p style={{ fontSize: '1.1rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto 32px auto', lineHeight: '1.6' }}>
                {t('innvalab.cta_description')}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/contact" style={{ padding: '16px 32px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white', textDecoration: 'none', borderRadius: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', transition: 'transform 0.2s', ':hover': { transform: 'translateY(-2px)' } }}>
                  <i className="fas fa-play"></i>
                  {t('innvalab.cta_collaborate')}
                </Link>
                <Link to="/projects" style={{ padding: '16px 32px', background: 'transparent', color: '#3b82f6', textDecoration: 'none', borderRadius: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', border: '2px solid #3b82f6', transition: 'all 0.2s' }}>
                  <i className="fas fa-search"></i>
                  {t('innvalab.cta_explore')}
                </Link>
              </div>
            </div>
          </div>
        </section>




                  {t('innvalab.link_to_projects') || 'Discover our latest research projects and innovations'}
                  </h2>
              
                <div className="u-flex u-justify-center u-gap-md u-flex-wrap">
                  <Link to="/projects" className="aurora-btn aurora-btn--primary">
                    <i className="fas fa-project-diagram"></i>
                    {t('innvalab.view_projects') || 'Projects'}
                  </Link>
                  <Link to="/plataformas/ethicsi" className="aurora-btn aurora-btn--gold">
                    <i className="fas fa-book"></i>
                    EthicsI
                  </Link>
                  <Link to="/plataformas/harmonia" className="aurora-btn aurora-btn--gold">
                    <i className="fas fa-handshake"></i>
                    Harmonia
                  </Link>
                </div>
                </div>
   </div>
    </div>
   </>
  )
}

export default InnvaLab
