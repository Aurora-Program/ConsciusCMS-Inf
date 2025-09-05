import './header.css'
import '../App.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import LanguageSelector from '../util/multiselector.tsx'
import auroraLogo from '../assets/aurora-logo.png'
import { useT } from '../util/useTranslation'

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const t = useT()
    
    

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <>
            <header className="aurora-modern-header">
                <div className="aurora-header-container">
                    <div className="aurora-header-content">
                        {/* Logo and Brand Section */}
                        <Link to="/" className="aurora-brand-section">
                            <div className="aurora-logo-wrapper">
                                <img 
                                    src={auroraLogo} 
                                    alt="Aurora Program Logo" 
                                    className="aurora-logo-image"
                                />
                                <div className="aurora-logo-glow"></div>
                            </div>
                            <div className="aurora-brand-text">
                                <h1 className="aurora-brand-title">
                                    <span className="aurora-gradient-text">Aurora</span>
                                    <span className="aurora-brand-suffix">Program</span>
                                </h1>
                                <p className="aurora-brand-tagline">
                                    {t('header.tagline')}
                                </p>
                            </div>
                        </Link>
                        
                        {/* Desktop Navigation */}
                        <nav className="aurora-desktop-nav">
                            <div className="aurora-nav-links">
                                <Link to="/" className="aurora-nav-link">
                                    <i className="fas fa-home"></i>
                                    <span>{t('nav.home')}</span>
                                </Link>
                                <Link to="/manifiesto" className="aurora-nav-link">
                                    <i className="fas fa-scroll"></i>
                                    <span>{t('nav.manifiest')}</span>
                                </Link>
                                <Link to="/plataformas" className="aurora-nav-link">
                                    <i className="fas fa-layer-group"></i>
                                    <span>{t('nav.platforms')}</span>
                                </Link>
                                <Link to="/articles" className="aurora-nav-link">
                                    <i className="fas fa-newspaper"></i>
                                    <span>{t('nav.articles')}</span>
                                </Link>
                                <Link to="/documentation" className="aurora-nav-link">
                                    <i className="fas fa-book"></i>
                                    <span>{t('nav.docs')}</span>
                                </Link>
                                <Link to="/labs" className="aurora-nav-link aurora-nav-highlight">
                                    <i className="fas fa-flask"></i>
                                    <span>{t('nav.labs')}</span>
                                </Link>
                            </div>
                        </nav>
                        
                        {/* Header Actions */}
                        <div className="aurora-header-actions">
                            <LanguageSelector />
                            {/* debug removed */}
                            <Link to="/acerca" className="aurora-cta-button">
                                <i className="fas fa-info-circle"></i>
                                <span>{t('nav.about')}</span>
                            </Link>
                            
                            {/* Mobile Menu Toggle */}
                            <button 
                                className={`aurora-mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                                onClick={toggleMobileMenu}
                                aria-label="Toggle mobile menu"
                            >
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                    
                    {/* Mobile Navigation */}
                    <nav className={`aurora-mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
                        <div className="aurora-mobile-nav-content">
                            <Link to="/" className="aurora-mobile-nav-link" onClick={toggleMobileMenu}>
                                <i className="fas fa-home"></i>
                                <span>{t('nav.home')}</span>
                            </Link>
                            <Link to="/manifiesto" className="aurora-mobile-nav-link" onClick={toggleMobileMenu}>
                                <i className="fas fa-scroll"></i>
                                <span>{t('nav.manifiest')}</span>
                            </Link>
                            <Link to="/plataformas" className="aurora-mobile-nav-link" onClick={toggleMobileMenu}>
                                <i className="fas fa-layer-group"></i>
                                <span>{t('nav.platforms')}</span>
                            </Link>
                            <Link to="/articles" className="aurora-mobile-nav-link" onClick={toggleMobileMenu}>
                                <i className="fas fa-newspaper"></i>
                                <span>{t('nav.articles')}</span>
                            </Link>
                            <Link to="/documentation" className="aurora-mobile-nav-link" onClick={toggleMobileMenu}>
                                <i className="fas fa-book"></i>
                                <span>{t('nav.docs')}</span>
                            </Link>
                            <Link to="/labs" className="aurora-mobile-nav-link" onClick={toggleMobileMenu}>
                                <i className="fas fa-flask"></i>
                                <span>{t('nav.labs')}</span>
                            </Link>
                            <Link to="/acerca" className="aurora-mobile-nav-link" onClick={toggleMobileMenu}>
                                <i className="fas fa-info-circle"></i>
                                <span>{t('nav.about')}</span>
                            </Link>
                        </div>
                    </nav>
                    
                    {/* Decorative Aurora Effects */}
                    <div className="aurora-header-effects">
                        <div className="aurora-particle"></div>
                        <div className="aurora-particle"></div>
                        <div className="aurora-particle"></div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
