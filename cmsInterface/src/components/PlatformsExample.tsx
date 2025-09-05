import React from 'react';
import { useTranslation } from '../hooks';
import TranslatedContent from './TranslatedContent';

const PlatformsExample: React.FC = () => {
  const { t } = useTranslation();

  // Ejemplo de contenido con claves de traducción como podría venir del CMS
  const sampleContent = `
    <div class="hero-section">
      <h1>[Missing translation: platforms.heroTitle] [Missing translation: platforms.heroTitleHighlight]</h1>
      <h2>[Missing translation: platforms.heroSubtitle]</h2>
      <p>[Missing translation: platforms.heroDescription]</p>
    </div>
    
    <div class="platforms-grid">
      <div class="platform-card">
        <h3>[Missing translation: platforms.ethicsi.title]</h3>
        <h4>[Missing translation: platforms.ethicsi.tagline]</h4>
        <p>[Missing translation: platforms.ethicsi.description]</p>
        <a href="#">[Missing translation: platforms.ethicsi.link]</a>
      </div>
      
      <div class="platform-card">
        <h3>[Missing translation: platforms.innvalab.title]</h3>
        <h4>[Missing translation: platforms.innvalab.tagline]</h4>
        <p>[Missing translation: platforms.innvalab.description]</p>
        <a href="#">[Missing translation: platforms.innvalab.link]</a>
      </div>
      
      <div class="platform-card">
        <h3>[Missing translation: platforms.harmonia.title]</h3>
        <h4>[Missing translation: platforms.harmonia.tagline]</h4>
        <p>[Missing translation: platforms.harmonia.description]</p>
        <a href="#">[Missing translation: platforms.harmonia.link]</a>
      </div>
    </div>
  `;

  return (
    <div className="platforms-example">
      <div className="mb-4">
        <h2 className="text-primary">🔧 Test del Sistema de Traducciones</h2>
        <p className="text-muted">
          Este componente demuestra cómo se procesan las traducciones automáticamente:
        </p>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>✅ Con TranslatedContent (Procesado)</h5>
            </div>
            <div className="card-body">
              <TranslatedContent content={sampleContent} />
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>❌ Sin procesar (Como viene del CMS)</h5>
            </div>
            <div className="card-body">
              <div dangerouslySetInnerHTML={{ __html: sampleContent }} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="alert alert-info">
          <h6>💡 Cómo funciona:</h6>
          <ul className="mb-0">
            <li>El contenido del CMS contiene claves como <code>[Missing translation: platforms.heroTitle]</code></li>
            <li>El componente <code>TranslatedContent</code> busca estos patrones</li>
            <li>Las reemplaza con las traducciones correspondientes del archivo <code>es.json</code></li>
            <li>Si no encuentra traducción, mantiene el texto original</li>
          </ul>
        </div>
      </div>

      <div className="mt-4">
        <h4>🧪 Pruebas directas del hook:</h4>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h6>platforms.heroTitle</h6>
                <p className="text-success">{t('platforms.heroTitle')}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h6>platforms.ethicsi.title</h6>
                <p className="text-success">{t('platforms.ethicsi.title')}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h6>clave.inexistente</h6>
                <p className="text-warning">{t('clave.inexistente')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformsExample;
