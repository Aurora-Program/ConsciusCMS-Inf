import React from 'react';
import { useT } from '../hooks';

const DisenosDistribuidos = () => {
  const t = useT();

  return (
    <div className="aurora-page">
      <div className="aurora-container">
        
        {/* Hero Section - Distributed Network Visualization */}
        <section className="aurora-hero">
          <div style={{ position: 'relative', minHeight: '400px', background: 'linear-gradient(135deg, rgba(30, 74, 122, 0.1), rgba(46, 125, 50, 0.1))', borderRadius: '20px', padding: '60px 40px', overflow: 'hidden' }}>
            {/* Floating Network Nodes */}
            <div style={{ position: 'absolute', top: '20px', left: '10%', width: '20px', height: '20px', background: 'var(--aurora-primary)', borderRadius: '50%', opacity: '0.6' }}></div>
            <div style={{ position: 'absolute', top: '60px', right: '15%', width: '16px', height: '16px', background: 'var(--aurora-gold)', borderRadius: '50%', opacity: '0.7' }}></div>
            <div style={{ position: 'absolute', bottom: '80px', left: '20%', width: '18px', height: '18px', background: '#2e7d32', borderRadius: '50%', opacity: '0.5' }}></div>
            <div style={{ position: 'absolute', bottom: '40px', right: '25%', width: '14px', height: '14px', background: '#9c27b0', borderRadius: '50%', opacity: '0.6' }}></div>
            
            <div className="u-text-center">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, var(--aurora-primary), var(--aurora-gold))', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '20px' }}>
                  <i className="fas fa-project-diagram" style={{ color: 'white', fontSize: '2rem' }}></i>
                </div>
                <h1 style={{ fontSize: '3.5rem', margin: '0', background: 'linear-gradient(135deg, var(--aurora-primary), var(--aurora-gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '700' }}>
                  {t('distributed_designs.hero_title') || 'Diseños Distribuidos'}
                </h1>
              </div>
              <p style={{ fontSize: '1.3rem', color: '#6b7280', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
                {t('distributed_designs.hero_subtitle') || 'Arquitecturas colaborativas que transforman la manera en que creamos, compartimos y evolucionamos soluciones tecnológicas a través de redes distribuidas e inteligentes.'}
              </p>
            </div>
          </div>
        </section>

        {/* Core Principles Section */}
        <section className="aurora-section">
          <div className="u-text-center u-mb-4">
            <h2 style={{ color: 'var(--aurora-primary)', fontSize: '2.4rem', marginBottom: '16px' }}>
              {t('distributed_designs.principles_title') || 'Principios Fundamentales'}
            </h2>
            <div style={{ width: '100px', height: '4px', background: 'linear-gradient(90deg, var(--aurora-primary), var(--aurora-gold))', margin: '0 auto', borderRadius: '2px' }}></div>
          </div>

          <div className="aurora-grid-2" style={{ gap: '32px' }}>
            {/* Descentralización Inteligente */}
            <div className="aurora-card u-hover-lift" style={{ background: 'linear-gradient(135deg, rgba(30, 74, 122, 0.1), rgba(30, 74, 122, 0.05))', border: '2px solid rgba(30, 74, 122, 0.2)', position: 'relative', overflow: 'hidden', minHeight: '280px' }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'linear-gradient(135deg, var(--aurora-primary), rgba(30, 74, 122, 0.3))', borderRadius: '50%', opacity: '0.1' }}></div>
              <div style={{ position: 'relative', zIndex: '1' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, var(--aurora-primary), #2563eb)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                    <i className="fas fa-sitemap" style={{ color: 'white', fontSize: '1.5rem' }}></i>
                  </div>
                  <h3 style={{ margin: '0', color: 'var(--aurora-primary)', fontSize: '1.4rem', fontWeight: '600' }}>
                    {t('distributed_designs.decentralization_title') || 'Descentralización Inteligente'}
                  </h3>
                </div>
                <p style={{ color: '#374151', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '16px' }}>
                  {t('distributed_designs.decentralization_desc') || 'Eliminamos puntos únicos de falla mediante arquitecturas que distribuyen la lógica, los datos y la responsabilidad de manera equilibrada y resiliente.'}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ padding: '4px 12px', background: 'rgba(30, 74, 122, 0.1)', color: 'var(--aurora-primary)', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '500' }}>Autonomía</span>
                  <span style={{ padding: '4px 12px', background: 'rgba(30, 74, 122, 0.1)', color: 'var(--aurora-primary)', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '500' }}>Redundancia</span>
                  <span style={{ padding: '4px 12px', background: 'rgba(30, 74, 122, 0.1)', color: 'var(--aurora-primary)', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '500' }}>Escalabilidad</span>
                </div>
              </div>
            </div>

            {/* Colaboración Emergente */}
            <div className="aurora-card u-hover-lift" style={{ background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.1), rgba(46, 125, 50, 0.05))', border: '2px solid rgba(46, 125, 50, 0.2)', position: 'relative', overflow: 'hidden', minHeight: '280px' }}>
              <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '100px', height: '100px', background: 'linear-gradient(135deg, #2e7d32, rgba(46, 125, 50, 0.3))', borderRadius: '50%', opacity: '0.1' }}></div>
              <div style={{ position: 'relative', zIndex: '1' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #2e7d32, #4caf50)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                    <i className="fas fa-users-cog" style={{ color: 'white', fontSize: '1.5rem' }}></i>
                  </div>
                  <h3 style={{ margin: '0', color: '#2e7d32', fontSize: '1.4rem', fontWeight: '600' }}>
                    {t('distributed_designs.collaboration_title') || 'Colaboración Emergente'}
                  </h3>
                </div>
                <p style={{ color: '#374151', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '16px' }}>
                  {t('distributed_designs.collaboration_desc') || 'Facilitamos la emergencia de patrones colaborativos naturales donde cada nodo contribuye según sus capacidades y necesidades del ecosistema.'}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ padding: '4px 12px', background: 'rgba(46, 125, 50, 0.1)', color: '#2e7d32', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '500' }}>Sinergia</span>
                  <span style={{ padding: '4px 12px', background: 'rgba(46, 125, 50, 0.1)', color: '#2e7d32', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '500' }}>Adaptabilidad</span>
                  <span style={{ padding: '4px 12px', background: 'rgba(46, 125, 50, 0.1)', color: '#2e7d32', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '500' }}>Reciprocidad</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Patterns Section */}
        <section className="aurora-section">
          <div className="aurora-card" style={{ background: 'linear-gradient(135deg, rgba(240, 230, 140, 0.1), rgba(240, 230, 140, 0.05))', border: '1px solid rgba(240, 230, 140, 0.3)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '180px', height: '180px', background: 'linear-gradient(135deg, var(--aurora-gold), rgba(240, 230, 140, 0.3))', borderRadius: '50%', opacity: '0.08' }}></div>
            
            <h2 style={{ color: 'var(--aurora-gold)', fontSize: '2.2rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, var(--aurora-gold), #f59e0b)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="fas fa-drafting-compass" style={{ color: 'white', fontSize: '1.5rem' }}></i>
              </div>
              {t('distributed_designs.patterns_title') || 'Patrones de Diseño Distribuido'}
            </h2>

            <div className="aurora-grid-3" style={{ gap: '24px', marginTop: '32px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '16px', padding: '24px', position: 'relative', zIndex: '1' }}>
                <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #6366f1, #4f46e5)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <i className="fas fa-layer-group" style={{ color: 'white', fontSize: '1.2rem' }}></i>
                </div>
                <h3 style={{ color: '#4f46e5', fontSize: '1.3rem', marginBottom: '12px', fontWeight: '600' }}>
                  {t('distributed_designs.mesh_title') || 'Arquitectura de Malla'}
                </h3>
                <p style={{ margin: '0', fontSize: '0.9rem', lineHeight: '1.6', color: '#374151' }}>
                  {t('distributed_designs.mesh_desc') || 'Cada nodo puede comunicarse directamente con cualquier otro, eliminando cuellos de botella y creando rutas alternativas de comunicación.'}
                </p>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '16px', padding: '24px', position: 'relative', zIndex: '1' }}>
                <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <i className="fas fa-code-branch" style={{ color: 'white', fontSize: '1.2rem' }}></i>
                </div>
                <h3 style={{ color: '#059669', fontSize: '1.3rem', marginBottom: '12px', fontWeight: '600' }}>
                  {t('distributed_designs.consensus_title') || 'Consenso Distribuido'}
                </h3>
                <p style={{ margin: '0', fontSize: '0.9rem', lineHeight: '1.6', color: '#374151' }}>
                  {t('distributed_designs.consensus_desc') || 'Mecanismos inteligentes para la toma de decisiones colectivas, asegurando coherencia sin autoridad central.'}
                </p>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '16px', padding: '24px', position: 'relative', zIndex: '1' }}>
                <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <i className="fas fa-sync-alt" style={{ color: 'white', fontSize: '1.2rem' }}></i>
                </div>
                <h3 style={{ color: '#d97706', fontSize: '1.3rem', marginBottom: '12px', fontWeight: '600' }}>
                  {t('distributed_designs.evolution_title') || 'Evolución Continua'}
                </h3>
                <p style={{ margin: '0', fontSize: '0.9rem', lineHeight: '1.6', color: '#374151' }}>
                  {t('distributed_designs.evolution_desc') || 'Los sistemas se adaptan y mejoran automáticamente basándose en patrones de uso y retroalimentación distribuida.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Models Section */}
        <section className="aurora-section">
          <div className="u-text-center u-mb-4">
            <h2 style={{ color: 'var(--aurora-primary)', fontSize: '2.2rem', marginBottom: '16px' }}>
              {t('distributed_designs.models_title') || 'Modelos de Implementación'}
            </h2>
            <div style={{ width: '120px', height: '4px', background: 'linear-gradient(90deg, var(--aurora-primary), #9c27b0)', margin: '0 auto', borderRadius: '2px' }}></div>
          </div>

          <div className="aurora-grid-2" style={{ gap: '32px' }}>
            {/* Peer-to-Peer Enhanced */}
            <div className="aurora-card" style={{ background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.1), rgba(156, 39, 176, 0.05))', border: '1px solid rgba(156, 39, 176, 0.2)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '120px', height: '120px', background: 'linear-gradient(135deg, #9c27b0, rgba(156, 39, 176, 0.3))', borderRadius: '50%', opacity: '0.1' }}></div>
              
              <div style={{ position: 'relative', zIndex: '1' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ width: '55px', height: '55px', background: 'linear-gradient(135deg, #9c27b0, #7b1fa2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                    <i className="fas fa-share-alt-square" style={{ color: 'white', fontSize: '1.4rem' }}></i>
                  </div>
                  <h3 style={{ margin: '0', color: '#7b1fa2', fontSize: '1.4rem', fontWeight: '600' }}>
                    {t('distributed_designs.p2p_title') || 'Peer-to-Peer Mejorado'}
                  </h3>
                </div>

                <p style={{ color: '#374151', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
                  {t('distributed_designs.p2p_desc') || 'Redes donde cada participante actúa simultáneamente como cliente y servidor, compartiendo recursos y capacidades de manera inteligente.'}
                </p>

                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ color: '#7b1fa2', fontSize: '1.1rem', marginBottom: '12px', fontWeight: '500' }}>
                    {t('distributed_designs.p2p_features_title') || 'Características Clave:'}
                  </h4>
                  <ul style={{ margin: '0', paddingLeft: '0', listStyle: 'none' }}>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'start' }}>
                      <div style={{ width: '6px', height: '6px', background: '#9c27b0', borderRadius: '50%', marginTop: '8px', marginRight: '12px', minWidth: '6px' }}></div>
                      <span style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                        {t('distributed_designs.p2p_feature1') || 'Descubrimiento automático de recursos'}
                      </span>
                    </li>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'start' }}>
                      <div style={{ width: '6px', height: '6px', background: '#9c27b0', borderRadius: '50%', marginTop: '8px', marginRight: '12px', minWidth: '6px' }}></div>
                      <span style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                        {t('distributed_designs.p2p_feature2') || 'Balanceado de carga inteligente'}
                      </span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'start' }}>
                      <div style={{ width: '6px', height: '6px', background: '#9c27b0', borderRadius: '50%', marginTop: '8px', marginRight: '12px', minWidth: '6px' }}></div>
                      <span style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                        {t('distributed_designs.p2p_feature3') || 'Replicación y sincronización automática'}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Hybrid Cloud-Edge */}
            <div className="aurora-card" style={{ background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(14, 165, 233, 0.05))', border: '1px solid rgba(14, 165, 233, 0.2)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '120px', height: '120px', background: 'linear-gradient(135deg, #0ea5e9, rgba(14, 165, 233, 0.3))', borderRadius: '50%', opacity: '0.1' }}></div>
              
              <div style={{ position: 'relative', zIndex: '1' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ width: '55px', height: '55px', background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                    <i className="fas fa-cloud-download-alt" style={{ color: 'white', fontSize: '1.4rem' }}></i>
                  </div>
                  <h3 style={{ margin: '0', color: '#0284c7', fontSize: '1.4rem', fontWeight: '600' }}>
                    {t('distributed_designs.hybrid_title') || 'Híbrido Cloud-Edge'}
                  </h3>
                </div>

                <p style={{ color: '#374151', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
                  {t('distributed_designs.hybrid_desc') || 'Combinamos la potencia de la nube con el procesamiento local en el borde, optimizando latencia, costos y privacidad.'}
                </p>

                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ color: '#0284c7', fontSize: '1.1rem', marginBottom: '12px', fontWeight: '500' }}>
                    {t('distributed_designs.hybrid_benefits_title') || 'Beneficios Únicos:'}
                  </h4>
                  <ul style={{ margin: '0', paddingLeft: '0', listStyle: 'none' }}>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'start' }}>
                      <div style={{ width: '6px', height: '6px', background: '#0ea5e9', borderRadius: '50%', marginTop: '8px', marginRight: '12px', minWidth: '6px' }}></div>
                      <span style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                        {t('distributed_designs.hybrid_benefit1') || 'Procesamiento cercano al usuario'}
                      </span>
                    </li>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'start' }}>
                      <div style={{ width: '6px', height: '6px', background: '#0ea5e9', borderRadius: '50%', marginTop: '8px', marginRight: '12px', minWidth: '6px' }}></div>
                      <span style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                        {t('distributed_designs.hybrid_benefit2') || 'Escalabilidad elástica bajo demanda'}
                      </span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'start' }}>
                      <div style={{ width: '6px', height: '6px', background: '#0ea5e9', borderRadius: '50%', marginTop: '8px', marginRight: '12px', minWidth: '6px' }}></div>
                      <span style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                        {t('distributed_designs.hybrid_benefit3') || 'Resiliencia ante fallos de conectividad'}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Innovation Showcase Section */}
        <section className="aurora-section">
          <div className="aurora-card" style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05))', border: '1px solid rgba(34, 197, 94, 0.2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%2322c55e" fill-opacity="0.03" fill-rule="evenodd"%3E%3Cpath d="m0 40l40-40h-40z"/%3E%3Cpath d="m40 40v-40h-40z" fill="%2316a34a"/%3E%3C/g%3E%3C/svg%3E")', opacity: '0.1' }}></div>
            
            <div style={{ position: 'relative', zIndex: '1' }}>
              <h2 style={{ color: '#16a34a', fontSize: '2.2rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #22c55e, #16a34a)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-rocket" style={{ color: 'white', fontSize: '1.5rem' }}></i>
                </div>
                {t('distributed_designs.innovation_title') || 'Innovación en Acción'}
              </h2>

              <div className="aurora-grid-2" style={{ gap: '32px', marginTop: '32px' }}>
                <div>
                  <h3 style={{ color: '#16a34a', fontSize: '1.4rem', marginBottom: '16px', fontWeight: '600' }}>
                    {t('distributed_designs.case_study_title') || 'Casos de Uso Revolucionarios'}
                  </h3>
                  <div style={{ marginBottom: '20px', padding: '20px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', borderLeft: '4px solid #22c55e' }}>
                    <h4 style={{ color: '#16a34a', fontSize: '1.1rem', marginBottom: '8px', fontWeight: '500' }}>
                      {t('distributed_designs.case1_title') || 'Computación Científica Distribuida'}
                    </h4>
                    <p style={{ margin: '0', fontSize: '0.9rem', lineHeight: '1.5', color: '#374151' }}>
                      {t('distributed_designs.case1_desc') || 'Investigadores alrededor del mundo contribuyen con poder computacional para resolver problemas complejos como simulaciones climáticas y análisis genómicos.'}
                    </p>
                  </div>
                  <div style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', borderLeft: '4px solid #16a34a' }}>
                    <h4 style={{ color: '#16a34a', fontSize: '1.1rem', marginBottom: '8px', fontWeight: '500' }}>
                      {t('distributed_designs.case2_title') || 'Economía de Recursos Compartidos'}
                    </h4>
                    <p style={{ margin: '0', fontSize: '0.9rem', lineHeight: '1.5', color: '#374151' }}>
                      {t('distributed_designs.case2_desc') || 'Plataformas donde individuos monetizan recursos subutilizados mientras otros acceden a capacidades que no podrían costear individualmente.'}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 style={{ color: '#16a34a', fontSize: '1.4rem', marginBottom: '16px', fontWeight: '600' }}>
                    {t('distributed_designs.future_trends_title') || 'Tendencias del Futuro'}
                  </h3>
                  <div style={{ marginBottom: '20px', padding: '20px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '16px', right: '16px', width: '30px', height: '30px', background: 'linear-gradient(135deg, #22c55e, #16a34a)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className="fas fa-brain" style={{ color: 'white', fontSize: '0.8rem' }}></i>
                    </div>
                    <h4 style={{ color: '#16a34a', fontSize: '1.1rem', marginBottom: '8px', fontWeight: '500', paddingRight: '50px' }}>
                      {t('distributed_designs.trend1_title') || 'IA Distribuida y Federada'}
                    </h4>
                    <p style={{ margin: '0', fontSize: '0.9rem', lineHeight: '1.5', color: '#374151' }}>
                      {t('distributed_designs.trend1_desc') || 'Modelos de inteligencia artificial que aprenden de manera distribuida sin centralizar datos sensibles.'}
                    </p>
                  </div>
                  <div style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '16px', right: '16px', width: '30px', height: '30px', background: 'linear-gradient(135deg, #16a34a, #15803d)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className="fas fa-leaf" style={{ color: 'white', fontSize: '0.8rem' }}></i>
                    </div>
                    <h4 style={{ color: '#16a34a', fontSize: '1.1rem', marginBottom: '8px', fontWeight: '500', paddingRight: '50px' }}>
                      {t('distributed_designs.trend2_title') || 'Sostenibilidad Energética'}
                    </h4>
                    <p style={{ margin: '0', fontSize: '0.9rem', lineHeight: '1.5', color: '#374151' }}>
                      {t('distributed_designs.trend2_desc') || 'Optimización automática del consumo energético mediante coordinación inteligente entre nodos distribuidos.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="aurora-section">
          <div className="aurora-card u-text-center" style={{ background: 'linear-gradient(135deg, #1e4a7a, #2563eb)', color: 'white', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '200px', height: '200px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%' }}></div>
            <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '160px', height: '160px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '50%' }}></div>
            
            <div style={{ position: 'relative', zIndex: '1' }}>
              <h2 style={{ color: 'white', fontSize: '2.4rem', marginBottom: '20px' }}>
                {t('distributed_designs.cta_title') || 'Construye el Futuro Distribuido'}
              </h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '32px', opacity: '0.9', maxWidth: '600px', margin: '0 auto 32px auto' }}>
                {t('distributed_designs.cta_description') || 'Únete a la revolución de los sistemas distribuidos. Transforma la manera en que concebimos la tecnología, la colaboración y el progreso.'}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <button className="aurora-btn aurora-btn-secondary" style={{ background: 'white', color: 'var(--aurora-primary)', fontWeight: '600' }}>
                  {t('distributed_designs.cta_explore') || 'Explorar Casos de Uso'}
                </button>
                <button className="aurora-btn" style={{ background: 'rgba(255, 255, 255, 0.2)', border: '1px solid rgba(255, 255, 255, 0.3)', color: 'white', fontWeight: '600' }}>
                  {t('distributed_designs.cta_contribute') || 'Contribuir al Ecosistema'}
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default DisenosDistribuidos;
