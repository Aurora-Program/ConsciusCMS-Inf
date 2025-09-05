import './header.css'
import './inicio.css'
import '../App.css'
import LanguageSelector from '../util/multiselector.tsx'
import auroraLogo from '../assets/aurora-logo.png'

function Header() {
    return (
        <>
            <header className="modern-header">
                <div className="header-container">
                    <div className="header-content">
                        <div className="logo-section">
                            <div className="logo-wrapper">
                                <img 
                                    src={auroraLogo} 
                                    alt="Aurora Program Logo" 
                                    className="logo-image"
                                />
                            </div>
                            <div className="brand-text">
                                <h1 className="brand-title">
                                    <span className="gradient-text">Aurora</span>
                                    <span className="brand-suffix">Program</span>
                                </h1>
                                <p className="brand-tagline">
                                    Fostering ethical values for electronic intelligences and humanity
                                </p>
                            </div>
                        </div>
                        
                        {/* Optional: Add language selector and additional actions */}
                        <div className="header-actions">
                            <LanguageSelector />
                        </div>
                    </div>
                    
                    {/* Decorative aurora effect */}
                    <div className="aurora-effect"></div>
                </div>
            </header>
        </>
    )
}

export default Header
