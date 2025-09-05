import React from 'react';
import SocialLinks from '../components/SocialLinks/SocialLinks.tsx';
import AuroraLogo from '../components/Logo/AuroraLogo.tsx';
import './Footer.css';
import { useT } from '../util/useTranslation'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const t = useT()

  return (
    <footer className="modern-footer">
      <div className="footer-content">
        <div className="footer-section footer-brand">
          <AuroraLogo size="sm" />
          <p className="footer-description">
            {t('footer.description')}
          </p>
        </div>
        
        <div className="footer-section footer-links">
          <h3>{t('footer.quickLinksTitle')}</h3>
          <ul>
            <li><a href="#dashboard">{t('footer.linkDashboard')}</a></li>
            <li><a href="#templates">{t('footer.linkTemplates')}</a></li>
            <li><a href="#settings">{t('footer.linkSettings')}</a></li>
            <li><a href="#help">{t('footer.linkHelp')}</a></li>
          </ul>
        </div>
        
        <div className="footer-section footer-social">
          <SocialLinks variant="footer" size="md" />
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <span className="copyright">
            {t('footer.copyRight').replace('{year}', String(currentYear))}
          </span>
          <div className="footer-bottom-links">
            <a href="#privacy">{t('footer.privacyLink')}</a>
            <a href="#terms">{t('footer.termsLink')}</a>
            <a href="#contact">{t('footer.contactLink')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
