import { useState, useEffect } from 'react'
import './documentation.css'
import '../App.css'
import { useAppDispatch, useAppSelector } from '../hooks.js'
import { loadPages } from './pageSlice.js'
import { Link } from 'react-router-dom'
import { useT } from '../util/useTranslation'
import { useMemo } from 'react'

function Documentation() {
    const dispatch = useAppDispatch()
    const pages = useAppSelector(state => (state as any).pages?.pages || [])
    const [isLoading, setIsLoading] = useState(true)
    const [docs, setDocs] = useState<any[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const t = useT()

    const visitCount = localStorage.getItem('value') ? Number(localStorage.getItem('value')) : 0;

    useEffect(() => { 
        localStorage.setItem('value', String(visitCount + 1)) 
    }, [visitCount])

    useEffect(() => { 
        const loadData = async () => {
            try {
                await dispatch(loadPages())
            } catch (error) {
                console.error("Error loading pages:", error)
            } finally {
                setIsLoading(false)
            }
        }
        
        loadData()
    }, [dispatch])

    useEffect(() => {
        if (pages.length > 0) {
            console.log("=== DOCUMENTATION PAGES DEBUG ===");
            console.log("Total pages:", pages.length);
            
            // Filter for documentation pages (you can adjust this filter based on your data structure)
            const documentationPages = pages.filter((page: any) => 
                page.Template && (
                    page.Template.toLowerCase().includes('doc') ||
                    page.Template.toLowerCase().includes('guide') ||
                    page.Template.toLowerCase().includes('tutorial') ||
                    page.Template.toLowerCase() === 'documentation'
                )
            );
            
            console.log("Found documentation pages:", documentationPages.length);
            console.log("Documentation pages:", documentationPages);
            
            setDocs(documentationPages);
        }
    }, [pages])

    // Filter docs based on search and category
    const filteredDocs = docs.filter((doc: any) => {
        const matchesSearch = doc.Page?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            doc.Template?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || doc.Template?.toLowerCase().includes(selectedCategory.toLowerCase());
        return matchesSearch && matchesCategory;
    });

    // Get unique categories from docs
    const categories = ['all', ...Array.from(new Set(docs.map((doc: any) => doc.Template || 'General')))];

    // Local PDFs bundled in the repo under src/Pages/Documentation/Content
    const localPdfs = useMemo(() => {
        try {
            // Use Vite-friendly URL constructor to resolve asset path
            const portfolio = new URL('./Documentation/Content/Aurora Program - Portfolio.pdf', import.meta.url).href
            return [
                { key: 'portfolio', title: 'Aurora Program - Portfolio', url: portfolio }
            ]
        } catch (e) {
            console.warn('Could not resolve local PDFs', e)
            return []
        }
    }, [])
    const [selectedLocalPdf, setSelectedLocalPdf] = useState<string | null>(null)

    if (isLoading) {
        return (
            <div className="aurora-loading-container">
                <div className="aurora-loading-spinner">
                    <div className="aurora-spinner"></div>
                </div>
                <p>{t('common.loading')}</p>
            </div>
        )
    }

    return (
        <div className="aurora-documentation-page">
            {/* Hero Section */}
            <header className="aurora-docs-hero">
                <div className="aurora-container">
                    <div className="aurora-docs-breadcrumb">
                        <Link to="/" className="aurora-breadcrumb-link">
                            {t('common.home')}
                        </Link>
                        <i className="fas fa-chevron-right"></i>
                        <span className="aurora-breadcrumb-current">
                            Documentación
                        </span>
                    </div>
                    
                    <div className="aurora-docs-header">
                        <h1 className="aurora-docs-title">
                            <i className="fas fa-book"></i>
                            Documentación
                        </h1>
                        <p className="aurora-docs-subtitle">
                            Guías, tutoriales y documentación técnica
                        </p>
                    </div>
                </div>
            </header>

            {/* Search and Filters */}
            <section className="aurora-docs-controls">
                <div className="aurora-container">
                    <div className="aurora-search-bar">
                        <div className="aurora-search-input-group">
                            <i className="fas fa-search"></i>
                            <input
                                type="text"
                                placeholder="Buscar documentación..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="aurora-search-input"
                            />
                        </div>
                    </div>
                    
                    <div className="aurora-filter-tabs">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`aurora-filter-tab ${selectedCategory === category ? 'active' : ''}`}
                            >
                                {category === 'all' ? 'Todos' : category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Documentation Grid */}
            <main className="aurora-docs-main">
                <div className="aurora-container">
                    {filteredDocs.length > 0 ? (
                        <>
                            <div className="aurora-docs-stats">
                                <p>Mostrando {filteredDocs.length} de {docs.length} documentos</p>
                            </div>
                            
                            <div className="aurora-docs-grid">
                                {filteredDocs.map((doc: any, index: number) => (
                                    <div key={index} className="aurora-doc-card">
                                        <div className="aurora-doc-header">
                                            <div className="aurora-doc-icon">
                                                <i className="fas fa-file-alt"></i>
                                            </div>
                                            <div className="aurora-doc-badge">
                                                {doc.Template || 'General'}
                                            </div>
                                        </div>
                                        
                                        <div className="aurora-doc-content">
                                            <h3 className="aurora-doc-title">
                                                {doc.Page || 'Documento sin título'}
                                            </h3>
                                            <p className="aurora-doc-description">
                                                Documentación técnica: {doc.Page || 'diversos temas'}
                                            </p>
                                        </div>
                                        
                                        <div className="aurora-doc-footer">
                                            <Link 
                                                to={`/document/${encodeURIComponent(doc.Page)}`}
                                                className="aurora-doc-link"
                                            >
                                                Leer documentación
                                                <i className="fas fa-arrow-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Local PDFs bundled with the repo */}
                            {localPdfs.length > 0 && (
                                <section style={{ marginTop: 24 }}>
                                    <h2>PDFs locales</h2>
                                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                        {localPdfs.map((p: any) => (
                                            <div key={p.key} style={{ border: '1px solid #eee', padding: 12, borderRadius: 6 }}>
                                                <div style={{ fontWeight: 600 }}>{p.title}</div>
                                                <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                                                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="aurora-doc-link">Abrir en pestaña</a>
                                                    <button onClick={() => setSelectedLocalPdf(p.url)} className="aurora-doc-link">Ver aquí</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {selectedLocalPdf && (
                                        <div style={{ marginTop: 16 }}>
                                            <button onClick={() => setSelectedLocalPdf(null)} style={{ marginBottom: 8 }}>Cerrar visor</button>
                                            <div style={{ border: '1px solid #ddd' }}>
                                                <iframe src={selectedLocalPdf} title="PDF Viewer" style={{ width: '100%', height: '70vh', border: 0 }} />
                                            </div>
                                        </div>
                                    )}
                                </section>
                            )}
                        </>
                    ) : (
                        <div className="aurora-empty-state">
                            <div className="aurora-empty-icon">
                                <i className="fas fa-search"></i>
                            </div>
                            <h3>No se encontró documentación</h3>
                            {searchTerm ? (
                                <p>No hay documentos que coincidan con "{searchTerm}"</p>
                            ) : (
                                <p>No hay documentación disponible en este momento.</p>
                            )}
                            
                            {/* Debug info */}
                            <div style={{ 
                                marginTop: '20px', 
                                padding: '15px', 
                                backgroundColor: '#f5f5f5', 
                                borderRadius: '8px',
                                fontSize: '12px',
                                textAlign: 'left'
                            }}>
                                <strong>Debug Info:</strong><br/>
                                Total pages loaded: {pages.length}<br/>
                                Documentation pages found: {docs.length}<br/>
                                Search term: {searchTerm || 'none'}<br/>
                                Selected category: {selectedCategory}<br/>
                                Available templates: {Array.from(new Set(pages.map((p: any) => p.Template))).join(', ')}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Quick Links */}
            <section className="aurora-docs-quick-links">
                <div className="aurora-container">
                    <h2 >Enlaces Rápidos</h2>
                    <div className="aurora-quick-links-grid">
                        <Link to="/articles" className="aurora-quick-link">
                            <i className="fas fa-newspaper"></i>
                            <span>Artículos</span>
                        </Link>
                        <Link to="/" className="aurora-quick-link">
                            <i className="fas fa-home"></i>
                            <span>Inicio</span>
                        </Link>
                        <a href="https://github.com/Aurora-Program" className="aurora-quick-link" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-github"></i>
                            <span>GitHub</span>
                        </a>
                        <Link to="/labs" className="aurora-quick-link">
                            <i className="fas fa-flask"></i>
                            <span>Labs</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Documentation
