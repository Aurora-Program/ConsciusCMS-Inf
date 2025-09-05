import './home.css'
import '../App.css'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks.js'
import { selectPageAction } from './pageSlice.js'
import { Link } from 'react-router-dom'
import { useT } from '../util/useTranslation'

function Home() {
    const dispatch = useAppDispatch()
    const data = useAppSelector(state => (state as any).pages?.data || [])
    const t = useT()

    const visitCount = localStorage.getItem('value') ? Number(localStorage.getItem('value')) : 0;

    useEffect(() => { localStorage.setItem('value', String(visitCount + 1)) }, [])
    useEffect(() => { dispatch(selectPageAction()) }, [])

    return (
        <>
            <div className="home-container">
                {/* Hero Section */}
                <section className="hero-section">
                    <div className="hero-particles"></div>
                    <div className="hero-content">

                        <h1 className="hero-title">
                            {t('home.heroConstruction')}
                            <br />
                            {t('home.title')}
                        </h1>
                        <h2 className="hero-subtitle">
                            {t('home.subtitle')}
                        </h2>
                        <div className="hero-description">
                            <p>
                                {t('home.description')}
                            </p>
                        </div>
                        <div className="hero-cta">
                            <Link to="/manifiesto" className="cta-button primary">
                                <span>📜</span>
                                {t('home.cta.Manifiesto')}
                            </Link>
                            <Link to="/plataformas" className="cta-button">
                                <span>🏢</span>
                                {t('home.cta.platforms')}
                            </Link>
                            <Link to="/labs" className="cta-button">
                                <span>🧪</span>
                                {t('home.cta.labs')}
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
                                {t('home.platforms.ethicsi.title')}
                            </h3>
                            <p>
                                {t('home.platforms.ethicsi.description')}
                            </p>
                            <Link to="/plataformas/ethicsi" className="section-link">
                                {t('home.platforms.ethicsi.link')}
                                <span>→</span>
                            </Link>
                        </div>

                        <div className="section-card hover-lift">
                            <h3>
                                <div className="section-icon">🔬</div>
                                {t('home.platforms.innvalab.title')}
                            </h3>
                            <p>
                                {t('home.platforms.innvalab.description')}
                            </p>
                            <Link to="/plataformas/innvalab" className="section-link">
                                {t('home.platforms.innvalab.link')}
                                <span>→</span>
                            </Link>
                        </div>

                        <div className="section-card hover-lift">
                            <h3>
                                <div className="section-icon">🤝</div>
                                {t('home.platforms.harmonia.title')}
                            </h3>
                            <p>
                                {t('home.platforms.harmonia.description')}
                            </p>
                            <Link to="/plataformas/harmonia" className="section-link">
                                {t('home.platforms.harmonia.link')}
                                <span>→</span>
                            </Link>
                        </div>

                        <div className="section-card hover-lift">
                            <h3>
                                <div className="section-icon">🧪</div>
                                {t('home.platforms.labs.title')}
                            </h3>
                            <p>
                                {t('home.platforms.labs.description')}
                            </p>
                            <Link to="/labs" className="section-link">
                                {t('home.platforms.labs.link')}
                                <span>→</span>
                            </Link>
                        </div>
                    </section>

                    {/* Mission Statement */}
                    <section className="featured-section">
                        <h2 className="featured-title">{t('home.mission.title')}</h2>
                        <p className="featured-subtitle">
                            {t('home.mission.subtitle')}
                        </p>
                        
                        <div className="featured-grid">
                            <div className="featured-item">
                                <h4>{t('home.featured.research')}</h4>
                                <p>{t('home.featured.researchDesc')}</p>
                            </div>
                            <div className="featured-item">
                                <h4>{t('home.featured.education')}</h4>
                                <p>{t('home.featured.educationDesc')}</p>
                            </div>
                            <div className="featured-item">
                                <h4>{t('home.featured.collaboration')}</h4>
                                <p>{t('home.featured.collaborationDesc')}</p>
                            </div>
                            <div className="featured-item">
                                <h4>{t('home.featured.impact')}</h4>
                                <p>{t('home.featured.impactDesc')}</p>
                            </div>
                        </div>
                    </section>

                    {/* Social Connect Section */}
                    <section className="home-social-section">
                        <div className="social-content">
                            <h3>{t('home.social.title')}</h3>
                            <p>{t('home.social.subtitle')}</p>
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
