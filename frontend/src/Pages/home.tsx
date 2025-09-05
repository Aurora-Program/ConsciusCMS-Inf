import './home.css'
import '../App.css'

import { useEffect } from 'react'
import { useAppDispatch } from '../hooks.js'
import { selectPageAction } from './pageSlice.js'
import { Link } from 'react-router-dom'
import { useT } from '../util/useTranslation'

function Home() {
    const dispatch = useAppDispatch()
    const t = useT()

    const visitCount = localStorage.getItem('value') ? Number(localStorage.getItem('value')) : 0;

    useEffect(() => { localStorage.setItem('value', String(visitCount + 1)) }, [])
    // selectPageAction expects a pageId string; pass empty string when no specific id is needed
    useEffect(() => { dispatch(selectPageAction('')) }, [])

    return (
        <>
            <div className="home-container">
                {/* Hero Section */}
                <section className="aurora-hero">
                    <div className="hero-particles"></div>
                    <div className="hero-content">

                        <h1 className="auorora-title">
                            {t('home.heroConstruction')}
                            <br />
                            {t('home.heroTitle')}
                        </h1>
                        <h2 className="hero-subtitle">
                            {t('home.heroSubtitle')}
                        </h2>
                        <div className="hero-description">
                            <p>
                                {t('home.heroDescription')}
                            </p>
                        </div>
                        <div className="hero-cta">
                            <Link to="/manifiesto" className="cta-button primary">
                                <span>📜</span>
                                {t('home.ctaReadManifiesto')}
                            </Link>
                            <Link to="/plataformas" className="cta-button">
                                <span>🏢</span>
                                {t('home.ctaExplorePlatforms')}
                            </Link>
                            <Link to="/labs" className="cta-button">
                                <span>🧪</span>
                                {t('home.ctaJoinLabs')}
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <div className="content-wrapper">
                    {/* Featured Sections Grid */}
                    <section className="section-grid">
                        <div className="section-card hover-lift">
                            <h3>
                                <div className="section-icon">📚</div>
                                {t('platforms.ethicsi.title')}
                            </h3>
                            <p>
                                {t('platforms.ethicsi.description')}
                            </p>
                            <Link to="/plataformas/ethicsi" className="section-link">
                                {t('platforms.ethicsi.link')}
                                <span>→</span>
                            </Link>
                        </div>

                        <div className="section-card hover-lift">
                            <h3>
                                <div className="section-icon">🧪</div>
                                {t('platforms.innvalab.title')}
                            </h3>
                            <p>
                               {t('platforms.innvalab.description')}
                            </p>
                            <Link to="/plataformas/innvalab" className="section-link">
                                {t('platforms.innvalab.link')}
                                <span>→</span>
                            </Link>
                        </div>

                        <div className="section-card hover-lift">
                            <h3>
                                <div className="section-icon">🤝</div>
                                {t('platforms.harmonia.title')}
                            </h3>
                            <p>
                                {t('platforms.harmonia.description')}
                            </p>
                            <Link to="/plataformas/harmonia" className="section-link">
                                {t('platforms.harmonia.link')}
                                <span>→</span>
                            </Link>
                        </div>


                        <div className="section-card hover-lift">
                            <h3>
                                <div className="section-icon">🧪</div>
                                {t('platforms.auroralabs.title')}
                            </h3>
                            <p>
                                {t('platforms.auroralabs.description')}
                            </p>
                            <Link to="/labs" className="section-link">
                                {t('platforms.auroralabs.link')}
                                <span>→</span>
                            </Link>
                        </div>
                    </section>

                    {/* Mission Statement */}
                    <section className="featured-section">
                        <h2 className="featured-title">Our Mission</h2>
                        <p className="featured-subtitle">
                            Bridging the gap between artificial intelligence capabilities and human values 
                            through research, education, and ethical innovation.
                        </p>
                        
                        <div className="featured-grid">
                            <div className="featured-item">
                                <h4>🔬 Research</h4>
                                <p>Advancing the understanding of AI ethics through rigorous scientific inquiry</p>
                            </div>
                            <div className="featured-item">
                                <h4>🎓 Education</h4>
                                <p>Sharing knowledge and best practices for responsible AI development</p>
                            </div>
                            <div className="featured-item">
                                <h4>🤝 Collaboration</h4>
                                <p>Building partnerships between humans and AI systems for mutual benefit</p>
                            </div>
                            <div className="featured-item">
                                <h4>🌍 Impact</h4>
                                <p>Creating positive change in how society approaches artificial intelligence</p>
                            </div>
                        </div>
                    </section>

                    {/* Social Connect Section */}
                    <section className="home-social-section">
                        <div className="social-content">
                            <h3>Síguenos en nuestras plataformas</h3>
                            <p>Mantente conectado con el desarrollo del Programa Aurora</p>
                            <div className="home-social-links">
                                <a href="https://github.com/Aurora-Program" target="_blank" rel="noopener noreferrer" className="home-social-link github">
                                    <i className="fab fa-github"></i>
                                    <span>GitHub</span>
                                </a>
                                <a href="https://medium.com/@pab.man.alvarez/list/aurora-program-169646e4abe9" target="_blank" rel="noopener noreferrer" className="home-social-link medium">
                                    <i className="fab fa-medium"></i>
                                    <span>Medium</span>
                                </a>
                                <a href="https://www.linkedin.com/company/107873626/" target="_blank" rel="noopener noreferrer" className="home-social-link linkedin">
                                    <i className="fab fa-linkedin"></i>
                                    <span>LinkedIn</span>
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Home
