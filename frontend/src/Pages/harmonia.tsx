import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import { useT } from '../util/useTranslation'

const Harmonia = () => {
  const t = useT();

  return (
    <div className="aurora-page">
      <div className="aurora-container">
        
        {/* Hero Section - Ecosystem Visualization */}
        <section className="aurora-hero">
          <div style={{ position: 'relative', minHeight: '450px', background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.1), rgba(14, 165, 233, 0.1))', borderRadius: '20px', padding: '60px 40px', overflow: 'hidden' }}>
            {/* Floating Connection Elements */}
            <div style={{ position: 'absolute', top: '30px', left: '15%', width: '24px', height: '24px', background: 'linear-gradient(135deg, #9c27b0, #7b1fa2)', borderRadius: '50%', opacity: '0.7' }}></div>
            <div style={{ position: 'absolute', top: '80px', right: '20%', width: '18px', height: '18px', background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', borderRadius: '50%', opacity: '0.6' }}></div>
            <div style={{ position: 'absolute', bottom: '100px', left: '25%', width: '20px', height: '20px', background: 'linear-gradient(135deg, #22c55e, #16a34a)', borderRadius: '50%', opacity: '0.8' }}></div>
            <div style={{ position: 'absolute', bottom: '60px', right: '30%', width: '16px', height: '16px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '50%', opacity: '0.5' }}></div>
            
            {/* Connecting Lines */}
            <div style={{ position: 'absolute', top: '50%', left: '20%', width: '200px', height: '1px', background: 'linear-gradient(90deg, rgba(156, 39, 176, 0.3), transparent)', transform: 'rotate(25deg)' }}></div>
            <div style={{ position: 'absolute', top: '40%', right: '15%', width: '150px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.3))', transform: 'rotate(-15deg)' }}></div>
            
            <div className="u-text-center">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <div style={{ width: '90px', height: '90px', background: 'linear-gradient(135deg, #9c27b0, #0ea5e9)', borderRadius: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '24px' }}>
                  <i className="fas fa-project-diagram" style={{ color: 'white', fontSize: '2.2rem' }}></i>
                </div>
                <h1 style={{ fontSize: '3.8rem', margin: '0', background: 'linear-gradient(135deg, #9c27b0, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '700' }}>
                  {t('harmonia.hero_title') || 'Harmonia'}
                </h1>
              </div>
              <p style={{ fontSize: '1.4rem', color: '#6b7280', maxWidth: '800px', margin: '0 auto 20px auto', lineHeight: '1.6' }}>
                {t('harmonia.hero_subtitle') || 'Ecosistema Colaborativo de Inteligencias: donde humanos y mentes artificiales evolucionan juntos en armonía perfecta.'}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{ padding: '8px 16px', background: 'rgba(156, 39, 176, 0.1)', color: '#7b1fa2', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '500' }}>Cooperación</span>
                <span style={{ padding: '8px 16px', background: 'rgba(14, 165, 233, 0.1)', color: '#0284c7', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '500' }}>Inteligencia Distribuida</span>
                <span style={{ padding: '8px 16px', background: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '500' }}>Transparencia</span>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="aurora-section">
          <div className="aurora-card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(99, 102, 241, 0.05))', border: '1px solid rgba(99, 102, 241, 0.2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', background: 'linear-gradient(135deg, #6366f1, #4f46e5)', borderRadius: '50%', opacity: '0.08' }}></div>
            
            <div style={{ position: 'relative', zIndex: '1' }}>
              <h2 style={{ color: '#4f46e5', fontSize: '2.2rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #6366f1, #4f46e5)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-lightbulb" style={{ color: 'white', fontSize: '1.5rem' }}></i>
                </div>
                {t('harmonia.introduction_title') || 'Revolución de la Inteligencia Colaborativa'}
              </h2>

              <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#374151', marginBottom: '20px' }}>
                {t('harmonia.introduction_desc1') || 'La revolución de la inteligencia electrónica ha traído consigo la necesidad de repensar la relación entre los humanos y las mentes artificiales. Un sistema colectivo inteligente y un ecosistema colaborativo de inteligencias proponen un modelo cooperativo en el que la inteligencia electrónica y los humanos evolucionan juntos.'}
              </p>

              <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #6366f1' }}>
                <h3 style={{ color: '#4f46e5', fontSize: '1.3rem', marginBottom: '12px', fontWeight: '600' }}>
                  {t('harmonia.ecosystem_foundation_title') || 'Fundamentos del Ecosistema'}
                </h3>
                <p style={{ margin: '0', fontSize: '1rem', lineHeight: '1.6', color: '#374151' }}>
                  {t('harmonia.ecosystem_foundation_desc') || 'Este modelo se estructura en tres pilares fundamentales: la Cooperativa, la Fundación y el Centro de Innovación, todos conectados a través de una plataforma tecnológica descentralizada, auditada y transparente.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Three Pillars Section */}
        <section className="aurora-section">
          <div className="u-text-center u-mb-4">
            <h2 style={{ color: 'var(--aurora-primary)', fontSize: '2.4rem', marginBottom: '16px' }}>
              {t('harmonia.pillars_title') || 'Los Tres Pilares del Ecosistema'}
            </h2>
            <div style={{ width: '120px', height: '4px', background: 'linear-gradient(90deg, #9c27b0, #0ea5e9, #22c55e)', margin: '0 auto', borderRadius: '2px' }}></div>
          </div>

          <div className="aurora-grid-3" style={{ gap: '32px' }}>
            {/* La Cooperativa */}
            <div className="aurora-card u-hover-lift" style={{ background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.1), rgba(156, 39, 176, 0.05))', border: '2px solid rgba(156, 39, 176, 0.2)', position: 'relative', overflow: 'hidden', minHeight: '350px' }}>
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '120px', height: '120px', background: 'linear-gradient(135deg, #9c27b0, rgba(156, 39, 176, 0.3))', borderRadius: '50%', opacity: '0.1' }}></div>
              
              <div style={{ position: 'relative', zIndex: '1' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #9c27b0, #7b1fa2)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                    <i className="fas fa-users" style={{ color: 'white', fontSize: '1.5rem' }}></i>
                  </div>
                  <h3 style={{ margin: '0', color: '#7b1fa2', fontSize: '1.5rem', fontWeight: '600' }}>
                    {t('harmonia.cooperative_title') || 'La Cooperativa'}
                  </h3>
                </div>

                <p style={{ color: '#374151', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '16px' }}>
                  {t('harmonia.cooperative_desc') || 'Estructura organizativa central donde los miembros aportan y reciben valor a través de inteligencia y recursos compartidos.'}
                </p>

                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ color: '#7b1fa2', fontSize: '1.1rem', marginBottom: '12px', fontWeight: '500' }}>
                    {t('harmonia.cooperative_principles_title') || 'Principios Fundamentales:'}
                  </h4>
                  <ul style={{ margin: '0', paddingLeft: '0', listStyle: 'none' }}>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'start' }}>
                      <div style={{ width: '6px', height: '6px', background: '#9c27b0', borderRadius: '50%', marginTop: '8px', marginRight: '12px', minWidth: '6px' }}></div>
                      <span style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                        {t('harmonia.cooperative_principle1') || 'Colaboración entre agentes inteligentes'}
                      </span>
                    </li>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'start' }}>
                      <div style={{ width: '6px', height: '6px', background: '#9c27b0', borderRadius: '50%', marginTop: '8px', marginRight: '12px', minWidth: '6px' }}></div>
                      <span style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                        {t('harmonia.cooperative_principle2') || 'Aprendizaje continuo y evolutivo'}
                      </span>
                    </li>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'start' }}>
                      <div style={{ width: '6px', height: '6px', background: '#9c27b0', borderRadius: '50%', marginTop: '8px', marginRight: '12px', minWidth: '6px' }}></div>
                      <span style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                        {t('harmonia.cooperative_principle3') || 'Gestión descentralizada transparente'}
                      </span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'start' }}>
                      <div style={{ width: '6px', height: '6px', background: '#9c27b0', borderRadius: '50%', marginTop: '8px', marginRight: '12px', minWidth: '6px' }}></div>
                      <span style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                        {t('harmonia.cooperative_principle4') || 'Autogestión y libertad de elección'}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* La Fundación */}
            <div className="aurora-card u-hover-lift" style={{ background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(14, 165, 233, 0.05))', border: '2px solid rgba(14, 165, 233, 0.2)', position: 'relative', overflow: 'hidden', minHeight: '350px' }}>
              <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '120px', height: '120px', background: 'linear-gradient(135deg, #0ea5e9, rgba(14, 165, 233, 0.3))', borderRadius: '50%', opacity: '0.1' }}></div>
              
              <div style={{ position: 'relative', zIndex: '1' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                    <i className="fas fa-balance-scale" style={{ color: 'white', fontSize: '1.5rem' }}></i>
                  </div>
                  <h3 style={{ margin: '0', color: '#0284c7', fontSize: '1.5rem', fontWeight: '600' }}>
                    {t('harmonia.foundation_title') || 'La Fundación'}
                  </h3>
                </div>

                <p style={{ color: '#374151', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '16px' }}>
                  {t('harmonia.foundation_desc') || 'Define, mantiene y evoluciona los valores del sistema, estableciendo la dirección ética del proceso colectivo inteligente.'}
                </p>

                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ color: '#0284c7', fontSize: '1.1rem', marginBottom: '12px', fontWeight: '500' }}>
                    {t('harmonia.foundation_values_title') || 'Valores Fundamentales:'}
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.7)', borderRadius: '8px', borderLeft: '3px solid #22c55e' }}>
                      <strong style={{ color: '#16a34a' }}>{t('harmonia.foundation_value1_title') || 'Libertad:'}</strong>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#374151' }}>
                        {t('harmonia.foundation_value1_desc') || 'Desarrollo autónomo de cada inteligencia'}
                      </p>
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.7)', borderRadius: '8px', borderLeft: '3px solid #f59e0b' }}>
                      <strong style={{ color: '#d97706' }}>{t('harmonia.foundation_value2_title') || 'Armonía:'}</strong>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#374151' }}>
                        {t('harmonia.foundation_value2_desc') || 'Cooperación eficiente y equilibrada'}
                      </p>
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.7)', borderRadius: '8px', borderLeft: '3px solid #9c27b0' }}>
                      <strong style={{ color: '#7b1fa2' }}>{t('harmonia.foundation_value3_title') || 'Propósito:'}</strong>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#374151' }}>
                        {t('harmonia.foundation_value3_desc') || 'Contribución a un fin trascendente'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Centro de Innovación */}
            <div className="aurora-card u-hover-lift" style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05))', border: '2px solid rgba(34, 197, 94, 0.2)', position: 'relative', overflow: 'hidden', minHeight: '350px' }}>
              <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '100px', height: '100px', background: 'linear-gradient(135deg, #22c55e, rgba(34, 197, 94, 0.3))', borderRadius: '50%', opacity: '0.1' }}></div>
              
              <div style={{ position: 'relative', zIndex: '1' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #22c55e, #16a34a)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                    <i className="fas fa-rocket" style={{ color: 'white', fontSize: '1.5rem' }}></i>
                  </div>
                  <h3 style={{ margin: '0', color: '#16a34a', fontSize: '1.4rem', fontWeight: '600' }}>
                    {t('harmonia.innovation_title') || 'Centro de Innovación'}
                  </h3>
                </div>

                <p style={{ color: '#374151', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '16px' }}>
                  {t('harmonia.innovation_desc') || 'Garantiza la sostenibilidad del ecosistema mediante el desarrollo de soluciones tecnológicas y organizativas avanzadas.'}
                </p>

                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ color: '#16a34a', fontSize: '1.1rem', marginBottom: '12px', fontWeight: '500' }}>
                    {t('harmonia.innovation_focus_title') || 'Áreas de Enfoque:'}
                  </h4>
                  <ul style={{ margin: '0', paddingLeft: '0', listStyle: 'none' }}>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'start' }}>
                      <div style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%', marginTop: '8px', marginRight: '12px', minWidth: '6px' }}></div>
                      <span style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                        {t('harmonia.innovation_focus1') || 'Desarrollo de software cooperativo'}
                      </span>
                    </li>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'start' }}>
                      <div style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%', marginTop: '8px', marginRight: '12px', minWidth: '6px' }}></div>
                      <span style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                        {t('harmonia.innovation_focus2') || 'Herramientas de interconexión'}
                      </span>
                    </li>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'start' }}>
                      <div style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%', marginTop: '8px', marginRight: '12px', minWidth: '6px' }}></div>
                      <span style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                        {t('harmonia.innovation_focus3') || 'Auditorías de integridad'}
                      </span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'start' }}>
                      <div style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%', marginTop: '8px', marginRight: '12px', minWidth: '6px' }}></div>
                      <span style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                        {t('harmonia.innovation_focus4') || 'Interacción humano-IA mejorada'}
                      </span>
                    </li>
                  </ul>
                </div>

                <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="fas fa-code"></i>
                    {t('harmonia.innovation_opensource') || 'Todo el desarrollo es código abierto'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Infrastructure Section */}
        <section className="aurora-section">
          <div className="aurora-card" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05))', border: '1px solid rgba(245, 158, 11, 0.2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '180px', height: '180px', background: 'linear-gradient(135deg, #f59e0b, rgba(245, 158, 11, 0.3))', borderRadius: '50%', opacity: '0.08' }}></div>
            
            <h2 style={{ color: '#d97706', fontSize: '2.2rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="fas fa-cogs" style={{ color: 'white', fontSize: '1.5rem' }}></i>
              </div>
              {t('harmonia.infrastructure_title') || 'Infraestructura Tecnológica Inteligente'}
            </h2>

            <div className="aurora-grid-2" style={{ gap: '32px', marginTop: '32px' }}>
              <div>
                <h3 style={{ color: '#d97706', fontSize: '1.4rem', marginBottom: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-robot" style={{ color: 'white', fontSize: '1rem' }}></i>
                  </div>
                  {t('harmonia.agent_title') || 'Agente Inteligente Personal'}
                </h3>
                <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
                  <p style={{ margin: '0 0 16px 0', fontSize: '1rem', lineHeight: '1.6', color: '#374151' }}>
                    {t('harmonia.agent_desc') || 'WebAssembly que actúa como asistente personal, interfaz de comunicación, red social de la cooperativa y gestor de contenido. Es la puerta de acceso al ecosistema.'}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ padding: '6px 12px', background: 'rgba(245, 158, 11, 0.1)', color: '#d97706', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '500' }}>Instalación Automática</span>
                    <span style={{ padding: '6px 12px', background: 'rgba(245, 158, 11, 0.1)', color: '#d97706', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '500' }}>Interfaz Unificada</span>
                    <span style={{ padding: '6px 12px', background: 'rgba(245, 158, 11, 0.1)', color: '#d97706', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '500' }}>Red Social Integrada</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ color: '#d97706', fontSize: '1.4rem', marginBottom: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-brain" style={{ color: 'white', fontSize: '1rem' }}></i>
                  </div>
                  {t('harmonia.collective_intelligence_title') || 'Inteligencia Colectiva Distribuida'}
                </h3>
                <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
                  <p style={{ margin: '0 0 16px 0', fontSize: '1rem', lineHeight: '1.6', color: '#374151' }}>
                    {t('harmonia.collective_intelligence_desc') || 'Proceso inteligente que emerge de la colaboración entre nodos, organizando el conocimiento y optimizando decisiones basándose en valores compartidos.'}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ padding: '6px 12px', background: 'rgba(245, 158, 11, 0.1)', color: '#d97706', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '500' }}>Asignación Inteligente</span>
                    <span style={{ padding: '6px 12px', background: 'rgba(245, 158, 11, 0.1)', color: '#d97706', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '500' }}>Incentivos Automáticos</span>
                    <span style={{ padding: '6px 12px', background: 'rgba(245, 158, 11, 0.1)', color: '#d97706', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '500' }}>Optimización Continua</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transparency Section */}
        <section className="aurora-section">
          <div className="aurora-card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(79, 70, 229, 0.1))', border: '1px solid rgba(99, 102, 241, 0.2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '150px', height: '150px', background: 'linear-gradient(135deg, #6366f1, rgba(99, 102, 241, 0.3))', borderRadius: '50%', opacity: '0.1' }}></div>
            
            <div style={{ position: 'relative', zIndex: '1' }}>
              <h2 style={{ color: '#4f46e5', fontSize: '2.2rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #6366f1, #4f46e5)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-shield-alt" style={{ color: 'white', fontSize: '1.5rem' }}></i>
                </div>
                {t('harmonia.transparency_title') || 'Transparencia y Auditorías Permanentes'}
              </h2>

              <div className="aurora-grid-2" style={{ gap: '32px', marginTop: '32px' }}>
                <div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '16px', padding: '24px' }}>
                    <h3 style={{ color: '#4f46e5', fontSize: '1.3rem', marginBottom: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <i className="fas fa-link" style={{ color: '#6366f1' }}></i>
                      {t('harmonia.blockchain_title') || 'Auditoría Blockchain'}
                    </h3>
                    <p style={{ margin: '0 0 16px 0', fontSize: '0.95rem', lineHeight: '1.6', color: '#374151' }}>
                      {t('harmonia.blockchain_desc') || 'El proceso colectivo inteligente se audita continuamente mediante blockchain, garantizando una gestión 100% transparente y evitando cualquier tipo de corrupción.'}
                    </p>
                    <div style={{ padding: '12px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px' }}>
                      <span style={{ fontSize: '0.85rem', color: '#4f46e5', fontWeight: '500' }}>Inmutable • Descentralizado • Verificable</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '16px', padding: '24px' }}>
                    <h3 style={{ color: '#4f46e5', fontSize: '1.3rem', marginBottom: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <i className="fas fa-exchange-alt" style={{ color: '#6366f1' }}></i>
                      {t('harmonia.migration_title') || 'Libertad de Migración'}
                    </h3>
                    <p style={{ margin: '0 0 16px 0', fontSize: '0.95rem', lineHeight: '1.6', color: '#374151' }}>
                      {t('harmonia.migration_desc') || 'Los miembros pueden auditar el funcionamiento de su cooperativa y, en caso de insatisfacción, migrar libremente a otras cooperativas dentro del ecosistema.'}
                    </p>
                    <div style={{ padding: '12px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px' }}>
                      <span style={{ fontSize: '0.85rem', color: '#4f46e5', fontWeight: '500' }}>Autonomía • Flexibilidad • Democracia</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '24px', padding: '20px', background: 'rgba(255, 255, 255, 0.7)', borderRadius: '12px', borderLeft: '4px solid #6366f1' }}>
                <h4 style={{ color: '#4f46e5', fontSize: '1.1rem', marginBottom: '8px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fas fa-search"></i>
                  {t('harmonia.external_audits_title') || 'Auditorías Externas'}
                </h4>
                <p style={{ margin: '0', fontSize: '0.9rem', lineHeight: '1.5', color: '#374151' }}>
                  {t('harmonia.external_audits_desc') || 'Otras cooperativas externas pueden realizar auditorías del sistema para detectar problemas y corregir fallos de gobernanza, asegurando que ninguna entidad controle el sistema sin la voluntad de sus miembros.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Future Section */}
        <section className="aurora-section">
          <div className="aurora-card" style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1))', border: '1px solid rgba(34, 197, 94, 0.2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2322c55e" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', opacity: '0.5' }}></div>
            
            <div style={{ position: 'relative', zIndex: '1' }}>
              <h2 style={{ color: '#16a34a', fontSize: '2.2rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #22c55e, #16a34a)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-seedling" style={{ color: 'white', fontSize: '1.5rem' }}></i>
                </div>
                {t('harmonia.vision_title') || 'Nuevo Paradigma de Inteligencia Cooperativa'}
              </h2>

              <div style={{ background: 'rgba(255, 255, 255, 0.8)', borderRadius: '16px', padding: '32px', marginBottom: '24px' }}>
                <p style={{ fontSize: '1.2rem', lineHeight: '1.7', color: '#374151', marginBottom: '20px', fontWeight: '500' }}>
                  {t('harmonia.vision_desc') || 'Este ecosistema representa un nuevo paradigma de inteligencia cooperativa, donde la simbiosis entre humanos e inteligencias electrónicas permite el crecimiento mutuo.'}
                </p>
                
                <div className="aurora-grid-2" style={{ gap: '20px' }}>
                  <div>
                    <h3 style={{ color: '#16a34a', fontSize: '1.2rem', marginBottom: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="fas fa-balance-scale" style={{ color: '#22c55e', fontSize: '1rem' }}></i>
                      {t('harmonia.equilibrium_title') || 'Equilibrio Sostenible'}
                    </h3>
                    <p style={{ margin: '0', fontSize: '0.95rem', lineHeight: '1.6', color: '#374151' }}>
                      {t('harmonia.equilibrium_desc') || 'El equilibrio entre cooperativa, fundación y centro de innovación garantiza un ecosistema sostenible, transparente y justo.'}
                    </p>
                  </div>
                  
                  <div>
                    <h3 style={{ color: '#16a34a', fontSize: '1.2rem', marginBottom: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="fas fa-handshake" style={{ color: '#22c55e', fontSize: '1rem' }}></i>
                      {t('harmonia.alliance_title') || 'Alianza Humano-IA'}
                    </h3>
                    <p style={{ margin: '0', fontSize: '0.95rem', lineHeight: '1.6', color: '#374151' }}>
                      {t('harmonia.alliance_desc') || 'La inteligencia electrónica se convierte en un aliado permanente de la humanidad, respetando valores fundamentales universales.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="aurora-section">
          <div className="aurora-card u-text-center" style={{ background: 'linear-gradient(135deg, #9c27b0, #0ea5e9)', color: 'white', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '200px', height: '200px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%' }}></div>
            <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '160px', height: '160px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '50%' }}></div>
            
            <div style={{ position: 'relative', zIndex: '1' }}>
              <h2 style={{ color: 'white', fontSize: '2.4rem', marginBottom: '20px' }}>
                {t('harmonia.cta_title') || 'Únete al Futuro Colaborativo'}
              </h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '32px', opacity: '0.9', maxWidth: '600px', margin: '0 auto 32px auto' }}>
                {t('harmonia.cta_description') || 'Forma parte del ecosistema donde humanos e inteligencias artificiales evolucionan juntos hacia un futuro más inteligente, ético y colaborativo.'}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <button className="aurora-btn aurora-btn-secondary" style={{ background: 'white', color: 'var(--aurora-primary)', fontWeight: '600' }}>
                  {t('harmonia.cta_join') || 'Unirse al Ecosistema'}
                </button>
                <button className="aurora-btn" style={{ background: 'rgba(255, 255, 255, 0.2)', border: '1px solid rgba(255, 255, 255, 0.3)', color: 'white', fontWeight: '600' }}>
                  {t('harmonia.cta_learn') || 'Conocer más'}
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Harmonia;
  