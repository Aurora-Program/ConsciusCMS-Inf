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
    useEffect(() => { dispatch(selectPageAction()) }, [])

    return (
        <>
            {/* Aplicando: Contenedor principal de página */}
            <div className="home-container">
                
                {/* Aplicando: Hero section con gradiente Aurora y efectos */}
                <section className="aurora-hero hero-section">
                    <div className="hero-particles"></div>
                    {/* Aplicando: Contenedor principal centrado */}
                    <div className="aurora-container hero-content">

                        {/* Aplicando: Título principal hero blanco */}
                        <h1 className="aurora-title-main hero-title">
                            {t('home.heroConstruction')}
                            <br />
                            {/* Aplicando: Texto con gradiente dorado para destacar */}
                            <span className="aurora-text-gold">{t('home.title')}</span>
                        </h1>
                        
                        {/* Aplicando: Subtítulo hero */}
                        <h2 className="aurora-subtitle hero-subtitle">
                            {t('home.subtitle')}
                        </h2>
                        
                        {/* Aplicando: Contenedor de descripción */}
                        <div className="hero-description">
                            <p className="aurora-subtitle">
                                {t('home.description')}
                            </p>
                        </div>
                        
                        {/* Aplicando: Flex centrado para botones de acción */}
                        <div className="aurora-flex-center hero-cta">
                            <Link to="/Manifiesto" className="aurora-btn primary cta-button">
                                {t('home.cta.Manifiesto')}
                            </Link>
                            <Link to="/plataformas" className="aurora-btn gold cta-button">
                                {t('home.cta.platforms')}
                            </Link>
                            <Link to="/labs" className="aurora-btn outline cta-button" style={{borderColor: 'white', color: 'white'}}>
                                {t('home.cta.labs')}
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Aplicando: Sección de contenido estándar */}
                <section className="aurora-section">
                    {/* Aplicando: Contenedor principal centrado */}
                    <div className="aurora-container content-wrapper">
                        
                        {/* Aplicando: Título de sección */}
                        <h2 className="aurora-title-section">Plataformas Destacadas</h2>
                        
                        {/* Aplicando: Grid de 4 columnas para plataformas */}
                        <div className="aurora-grid-4 section-grid">
                            
                            {/* Aplicando: Tarjeta de plataforma EthicsI */}
                            <div className="aurora-feature-card section-card hover-lift">
                                <div className="aurora-icon section-icon">📚</div>
                                <h3>EthicsI Foundation</h3>
                                <p>{t('home.platforms.ethicsi.description')}</p>
                                <Link to="/plataformas/ethicsi" className="aurora-btn outline">
                                    {t('home.platforms.ethicsi.link')}
                                </Link>
                            </div>

                            {/* Aplicando: Tarjeta de plataforma InnvaLab */}
                            <div className="aurora-feature-card section-card hover-lift">
                                <div className="aurora-icon section-icon">🔬</div>
                                <h3>InnvaLab</h3>
                                <p>{t('home.platforms.innvalab.description')}</p>
                                <Link to="/plataformas/innvalab" className="aurora-btn outline">
                                    {t('home.platforms.innvalab.link')}
                                </Link>
                            </div>

                            {/* Aplicando: Tarjeta de plataforma Harmonia */}
                            <div className="aurora-feature-card section-card hover-lift">
                                <div className="aurora-icon section-icon">🤝</div>
                                <h3>Harmonia Coop</h3>
                                <p>{t('home.platforms.harmonia.description')}</p>
                                <Link to="/plataformas/harmonia" className="aurora-btn outline">
                                    {t('home.platforms.harmonia.link')}
                                </Link>
                            </div>

                            {/* Aplicando: Tarjeta de plataforma Labs */}
                            <div className="aurora-feature-card gold section-card hover-lift">
                                <div className="aurora-icon section-icon">🧪</div>
                                <h3>Aurora Labs</h3>
                                <p>{t('home.platforms.labs.description')}</p>
                                <Link to="/labs" className="aurora-btn gold">
                                    {t('home.platforms.labs.link')}
                                </Link>
                            </div>
                            
                        </div>
                    </div>
                </section>

                {/* Aplicando: Sección alternativa con misión */}
                <section className="aurora-section alt featured-section">
                    <div className="aurora-container">
                        <h2 className="aurora-title-section featured-title">{t('home.mission.title')}</h2>
                        <p className="aurora-subtitle featured-subtitle">
                            {t('home.mission.subtitle')}
                        </p>
                        
                        <div className="aurora-grid-4 featured-grid">
                            <div className="aurora-card featured-item">
                                <h4>{t('home.featured.research')}</h4>
                                <p>{t('home.featured.researchDesc')}</p>
                            </div>
                            <div className="aurora-card featured-item">
                                <h4>{t('home.featured.education')}</h4>
                                <p>{t('home.featured.educationDesc')}</p>
                            </div>
                            <div className="aurora-card featured-item">
                                <h4>{t('home.featured.collaboration')}</h4>
                                <p>{t('home.featured.collaborationDesc')}</p>
                            </div>
                            <div className="aurora-card featured-item">
                                <h4>{t('home.featured.impact')}</h4>
                                <p>{t('home.featured.impactDesc')}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Aplicando: Sección de redes sociales */}
                <section className="aurora-section home-social-section">
                    <div className="aurora-container">
                        <div className="social-content">
                            <h3 className="aurora-title-section">{t('home.social.title')}</h3>
                            <p className="aurora-subtitle">{t('home.social.subtitle')}</p>
                            <div className="aurora-flex-center home-social-links">
                                <a href="https://github.com/Aurora-Program" target="_blank" rel="noopener noreferrer" className="aurora-btn outline home-social-link github">
                                    <i className="fab fa-github"></i>
                                    <span>GitHub</span>
                                </a>
                                <a href="https://medium.com/@pab.man.alvarez/list/aurora-program-169646e4abe9" target="_blank" rel="noopener noreferrer" className="aurora-btn outline home-social-link medium">
                                    <i className="fab fa-medium"></i>
                                    <span>Medium</span>
                                </a>
                                <a href="https://www.linkedin.com/company/107873626/" target="_blank" rel="noopener noreferrer" className="aurora-btn outline home-social-link linkedin">
                                    <i className="fab fa-linkedin"></i>
                                    <span>LinkedIn</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                
            </div>
        </>
    )
}

export default Home
