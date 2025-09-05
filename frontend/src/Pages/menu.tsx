
import './inicio.css'
import '../App.css'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar  from 'react-bootstrap/Navbar';

import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './menu.css'
import {   Offcanvas} from 'react-bootstrap';
import LanguageSelector from '../util/multiselector.tsx'
import { useT } from '../util/useTranslation'

function Menu() {
    const t = useT()
    
    return (
        <>
            <div className="modern-navigation">
                <Navbar expand="lg" className="modern-navbar">
                    <Container fluid className="nav-container">
                        <Navbar.Brand as={Link} to="/home" className="nav-brand">
                            <span className="nav-brand-text">Aurora Program</span>
                        </Navbar.Brand>
                        
                        <Navbar.Toggle 
                            aria-controls="offcanvasNavbar-expand-lg" 
                            className="modern-toggle"
                        />
                        
                        <Navbar.Offcanvas
                            id="offcanvasNavbar-expand-lg"
                            aria-labelledby="offcanvasNavbarLabel-expand-lg"
                            placement="end"
                            className="modern-offcanvas"
                        >
                            <Offcanvas.Header closeButton className="offcanvas-header-modern">
                                <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg" className="offcanvas-title-modern">
                                    Aurora Program
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            
                            <Offcanvas.Body className="offcanvas-body-modern">
                                <Nav className="modern-nav">
                                    <Nav.Link as={Link} to="/home" className="modern-nav-link">
                                        <span className="nav-icon"><i className="fas fa-home"></i></span>
                                        <span>{t('nav.home')}</span>
                                    </Nav.Link>
                                    
                                    <Nav.Link as={Link} to="/manifiesto" className="modern-nav-link">
                                        <span className="nav-icon"><i className="fas fa-scroll"></i></span>
                                        <span>{t('nav.Manifiesto')}</span>
                                    </Nav.Link>
                                    
                                    <Nav.Link as={Link} to="/plataformas" className="modern-nav-link">
                                        <span className="nav-icon"><i className="fas fa-layer-group"></i></span>
                                        <span>{t('nav.platforms')}</span>
                                    </Nav.Link>
                                    
                                    <Nav.Link as={Link} to="/labs" className="modern-nav-link">
                                        <span className="nav-icon"><i className="fas fa-flask"></i></span>
                                        <span>{t('nav.labs')}</span>
                                    </Nav.Link>
                                    
                                    <Nav.Link as={Link} to="/articles" className="modern-nav-link">
                                        <span className="nav-icon"><i className="fas fa-blog"></i></span>
                                        <span>{t('nav.articles')}</span>
                                    </Nav.Link>
                                    
                                    <Nav.Link as={Link} to="/acerca" className="modern-nav-link">
                                        <span className="nav-icon"><i className="fas fa-info-circle"></i></span>
                                        <span>{t('nav.about')}</span>
                                    </Nav.Link>
                                </Nav>
                                
                                <div className="nav-footer">
                                    <div className="language-selector-wrapper">
                                        <LanguageSelector />
                                    </div>
                                </div>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            </div>
        </>
    )
}

export default Menu