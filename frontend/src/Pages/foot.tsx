import { Link } from 'react-router-dom'
import './footer.css'
import { useT } from '../util/useTranslation'

function Foot() {
    const t = useT()
    
    return (
        <>
            <footer className="modern-footer">
                <div className="footer-container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <div className="footer-brand">
                                <h3 className="footer-title">
                                    <span className="footer-gradient-text">Aurora</span>Program
                                </h3>
                                <p className="footer-tagline">
                                    {t('footer.tagline')}
                                </p>
                                <div className="ai-collaboration">
                                    <p className="ai-credit">
                                        <i className="fas fa-robot aurora-icon"></i>
                                        {t('footer.aiCredit')}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="footer-section">
                            <h4>{t('footer.navigation')}</h4>
                            <div className="footer-links">
                                <Link to="/home">{t('nav.home')}</Link>
                                <Link to="/manifiesto">{t('nav.Manifiesto')}</Link>
                                <Link to="/plataformas">{t('nav.platforms')}</Link>
                                <Link to="/labs">{t('nav.labs')}</Link>
                            </div>
                        </div>
                        
                        <div className="footer-section">
                            <h4>{t('footer.platforms')}</h4>
                            <div className="footer-links">
                                <Link to="/plataformas/ethicsi">{t('home.platforms.ethicsi.title')}</Link>
                                <Link to="/plataformas/innvalab">{t('home.platforms.innvalab.title')}</Link>
                                <Link to="/plataformas/harmonia">{t('home.platforms.harmonia.title')}</Link>
                            </div>
                        </div>
                        
                        <div className="footer-section">
                            <h4>{t('footer.resources')}</h4>
                            <div className="footer-links">
                                <Link to="/articles">{t('nav.articles')}</Link>
                                <Link to="/docs">{t('nav.docs')}</Link>
                                <Link to="/gobernanza">Gobernanza</Link>
                                <Link to="/roadmap">Roadmap</Link>
                            </div>
                        </div>
                        
                        <div className="footer-section">
                            <h4>{t('footer.support')}</h4>
                            <div className="footer-links">
                                <Link to="/faq">FAQ</Link>
                                <Link to="/contacto">{t('nav.contact')}</Link>
                                <Link to="/codigo">Código de Conducta</Link>
                                <Link to="/privacidad">{t('footer.legal.privacy')}</Link>
                            </div>
                        </div>
                        
                        <div className="footer-section">
                            <h4>{t('footer.followUs')}</h4>
                            <div className="footer-social">
                                <a href="https://github.com/Aurora-Program" target="_blank" rel="noopener noreferrer" className="social-link github">
                                    <i className="fab fa-github"></i>
                                    <span>GitHub</span>
                                </a>
                                <a href="https://medium.com/@pab.man.alvarez/list/aurora-program-169646e4abe9" target="_blank" rel="noopener noreferrer" className="social-link medium">
                                    <i className="fab fa-medium"></i>
                                    <span>Medium</span>
                                </a>
                                <a href="https://www.linkedin.com/company/107873626/" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                                    <i className="fab fa-linkedin"></i>
                                    <span>LinkedIn</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="footer-bottom">
                        <div className="footer-copyright">
                            <p>{t('footer.copyright')}</p>
                            <p className="ai-attribution">
                                <span className="aurora-gradient-text">🤝</span> 
                                {t('footer.aiAttribution')}
                            </p>
                        </div>
                        <div className="footer-legal">
                            <Link to="/privacy">{t('footer.legal.privacy')}</Link>
                            <Link to="/terms">{t('footer.legal.terms')}</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Foot