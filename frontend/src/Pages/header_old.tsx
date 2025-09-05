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
                .modern-header {
                    position: relative;
                    background: linear-gradient(135deg, var(--aurora-gradient-start) 0%, var(--aurora-gradient-end) 100%);
                    color: white;
                    padding: 2rem 0;
                    overflow: hidden;
                    box-shadow: var(--shadow-lg);
                }
                
                .header-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 2rem;
                    position: relative;
                    z-index: 2;
                }
                
                .header-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 1.5rem;
                }
                
                .logo-section {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    flex: 1;
                }
                
                .logo-wrapper {
                    position: relative;
                }
                
                .logo-image {
                    width: 64px;
                    height: 64px;
                    border-radius: var(--radius-lg);
                    box-shadow: var(--shadow-md);
                    transition: transform var(--transition-normal);
                    background: rgba(255, 255, 255, 0.1);
                    padding: 8px;
                }
                
                .logo-image:hover {
                    transform: scale(1.05);
                }
                
                .brand-text {
                    flex: 1;
                }
                
                .brand-title {
                    font-size: 2.5rem;
                    font-weight: 700;
                    margin: 0;
                    line-height: 1.1;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: baseline;
                    gap: 0.5rem;
                }
                
                .gradient-text {
                    background: linear-gradient(45deg, #ffd700, #fff);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    font-weight: 800;
                }
                
                .brand-suffix {
                    color: rgba(255, 255, 255, 0.95);
                    font-weight: 500;
                }
                
                .brand-tagline {
                    margin: 0.5rem 0 0 0;
                    font-size: 1.1rem;
                    color: rgba(255, 255, 255, 0.9);
                    font-weight: 400;
                    max-width: 600px;
                    line-height: 1.4;
                }
                
                .header-actions {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                
                .aurora-effect {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: 
                        radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
                        radial-gradient(circle at 40% 40%, rgba(255, 215, 0, 0.2) 0%, transparent 50%);
                    pointer-events: none;
                    animation: aurora-flow 20s ease-in-out infinite;
                }
                
                @keyframes aurora-flow {
                    0%, 100% { opacity: 0.5; transform: translateX(0px) translateY(0px); }
                    33% { opacity: 0.8; transform: translateX(30px) translateY(-15px); }
                    66% { opacity: 0.6; transform: translateX(-20px) translateY(10px); }
                }
                
                @media (max-width: 768px) {
                    .modern-header {
                        padding: 1.5rem 0;
                    }
                    
                    .header-container {
                        padding: 0 1rem;
                    }
                    
                    .header-content {
                        flex-direction: column;
                        text-align: center;
                    }
                    
                    .logo-section {
                        flex-direction: column;
                        text-align: center;
                        gap: 1rem;
                    }
                    
                    .brand-title {
                        font-size: 2rem;
                        justify-content: center;
                    }
                    
                    .brand-tagline {
                        font-size: 1rem;
                    }
                }
                
                @media (max-width: 480px) {
                    .brand-title {
                        font-size: 1.75rem;
                        flex-direction: column;
                        gap: 0.25rem;
                    }
                    
                    .logo-image {
                        width: 56px;
                        height: 56px;
                    }
                }
            `}</style>
        </>
    )
}

export default Header