
import { Link } from 'react-router-dom';
import { useT } from '../util/useTranslation'

const Foot = () => {
    const currentYear = new Date().getFullYear();
    
    const t = useT()

    return (
        <footer className="modern-footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-links">
                        <Link to="/site/avisolegal" className="footer-link">
                            {t('footer.privacyPolicy')}
                        </Link>
                        <Link to="/site/terms" className="footer-link">
                            {t('footer.termsOfService')}
                        </Link>
                    </div>
                    
                    <div className="footer-brand">
                        <span className="footer-text">
                            {t('footer.copyRight').replace('{year}', String(currentYear))}
                        </span>
                    </div>
                    
                    <div className="footer-social">
                        <span className="footer-version">{t('footer.version')}</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Foot
    