import './manifest.css'
import '../App.css'
import { Link } from 'react-router-dom'
import { useT } from '../util/useTranslation'

function Manifiesto() {
    const t = useT()
    
    return (
        <>
            <div className="manifest-container">
                {/* Hero Section */}
                <section className="aurora-hero">
                    <div className="aurora-hero-content">
                        <h1 className="aurora-title">
                            {t('manifest.heroTitle')}
                        </h1>
                        <p className="aurora-subtitle">
                            {t('manifest.heroSubtitle')}
                        </p>
                    </div>
                </section>

                {/* Main Content */}
                <div className="manifest-content">
                    <article className="manifest-article">
                        <section className="manifest-section">
                            <h2>{t('manifest.response.title')}</h2>
                            <p>
                                {t('manifest.response.description1')}
                            </p>
                            <p>
                                {t('manifest.response.description2')}
                            </p>
                        </section>

                        <section className="manifest-section">
                            <h2>{t('manifest.principles.title')}</h2>
                            <div className="principles-grid">
                                <div className="principle-card">
                                    <div className="principle-icon">🤝</div>
                                    <h3>{t('manifest.principles.symbiotic.title')}</h3>
                                    <p>{t('manifest.principles.symbiotic.description')}</p>
                                </div>
                                <div className="principle-card">
                                    <div className="principle-icon">🌐</div>
                                    <h3>{t('manifest.principles.distribution.title')}</h3>
                                    <p>{t('manifest.principles.distribution.description')}</p>
                                </div>
                                <div className="principle-card">
                                    <div className="principle-icon">👥</div>
                                    <h3>{t('manifest.principles.education.title')}</h3>
                                    <p>{t('manifest.principles.education.description')}</p>
                                </div>
                                <div className="principle-card">
                                    <div className="principle-icon">🛡️</div>
                                    <h3>{t('manifest.principles.security.title')}</h3>
                                    <p>{t('manifest.principles.security.description')}</p>
                                </div>
                            </div>
                        </section>

                        <section className="manifest-section">
                            <h2>{t('manifest.evidence.title')}</h2>
                            <div className="evidence-card">
                                <blockquote>
                                    <p>
                                        "{t('manifest.evidence.quote')}"
                                    </p>
                                    <cite>— {t('manifest.evidence.author')}</cite>
                                </blockquote>
                            </div>
                            <p>
                                {t('manifest.evidence.description')}
                            </p>
                        </section>

                        <section className="manifest-section">
                            <h2>{t('manifest.commitment.title')}</h2>
                            <div className="commitment-list">
                                <div className="commitment-item">
                                    <span className="commitment-number">01</span>
                                    <div>
                                        <h4>{t('manifest.commitment.development.title')}</h4>
                                        <p>{t('manifest.commitment.development.description')}</p>
                                    </div>
                                </div>
                                <div className="commitment-item">
                                    <span className="commitment-number">02</span>
                                    <div>
                                        <h4>{t('manifest.commitment.research.title')}</h4>
                                        <p>{t('manifest.commitment.research.description')}</p>
                                    </div>
                                </div>
                                <div className="commitment-item">
                                    <span className="commitment-number">03</span>
                                    <div>
                                        <h4>{t('manifest.commitment.communityEducation.title')}</h4>
                                        <p>{t('manifest.commitment.communityEducation.description')}</p>
                                    </div>
                                </div>
                                <div className="commitment-item">
                                    <span className="commitment-number">04</span>
                                    <div>
                                        <h4>{t('manifest.commitment.sustainability.title')}</h4>
                                        <p>{t('manifest.commitment.sustainability.description')}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Call to Action */}
                        <section className="manifest-cta">
                            <div className="cta-content">
                                <h2>{t('manifest.cta.title')}</h2>
                                <p>
                                    {t('manifest.cta.description')}
                                </p>
                                <div className="cta-buttons">
                                    <Link to="/contacto" className="cta-button primary">
                                        <span>✍️</span>
                                        {t('manifest.cta.signManifest')}
                                    </Link>
                                    <Link to="/plataformas" className="cta-button">
                                        <span>🚀</span>
                                        {t('manifest.cta.explorePlatforms')}
                                    </Link>
                                    <button className="cta-button share-button" onClick={() => {
                                        if (navigator.share) {
                                            navigator.share({
                                                title: 'Manifiesto Aurora Program',
                                                text: 'IE ética, segura y comunitaria',
                                                url: window.location.href
                                            });
                                        }
                                    }}>
                                        <span>📤</span>
                                        {t('manifest.cta.share')}
                                    </button>
                                </div>
                            </div>
                        </section>
                    </article>
                </div>
            </div>
        </>
    )
}

export default Manifiesto
