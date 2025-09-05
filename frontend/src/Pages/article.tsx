import { useState, useEffect } from 'react'
import './article.css'
import '../App.css'
import { useAppDispatch, useAppSelector } from '../hooks.js'
import { loadPages, selectPageAction } from './pageSlice.js'
import { Link, useParams } from 'react-router-dom'
import { useT } from '../util/useTranslation'

function Article() {
    const dispatch = useAppDispatch()
    const pages = useAppSelector(state => (state as any).pages?.pages || [])
    const selectedPage = useAppSelector(state => (state as any).pages?.selectedPage || {})
    const [isLoading, setIsLoading] = useState(true)
    const [article, setArticle] = useState<any>(null)
    const { id } = useParams()
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
            }
        }
        
        loadData()
    }, [dispatch])

    useEffect(() => {
        if (id) {
            console.log("=== ARTICLE SELECTPAGE DEBUG ===");
            console.log("Loading article with Page ID:", id);
            
            setIsLoading(true);
            
            // Use selectPageAction to load complete article content
            dispatch(selectPageAction(id))
                .unwrap()
                .then((result) => {
                    console.log("selectPageAction successful:", result);
                    console.log("Selected page:", result.selectedPage);
                    console.log("Selected page keys:", Object.keys(result.selectedPage || {}));
                    console.log("Selected page values:", result.selectedPage?.values);
                    setArticle(result.selectedPage);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("selectPageAction failed:", error);
                    setIsLoading(false);
                });
        }
    }, [id, dispatch])

    // Monitor selectedPage from Redux store
    useEffect(() => {
        if (selectedPage && selectedPage.Page) {
            console.log("=== REDUX SELECTEDPAGE UPDATE ===");
            console.log("Redux selectedPage updated:", selectedPage);
            console.log("Page:", selectedPage.Page);
            console.log("Template:", selectedPage.Template);
            console.log("Values:", selectedPage.values);
            console.log("Components:", selectedPage.components);
            setArticle(selectedPage);
        }
    }, [selectedPage])

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

    if (!article) {
        return (
            <div className="aurora-container aurora-article-container">
                <div className="aurora-article-not-found">
                    <div className="aurora-empty-icon">
                        <i className="fas fa-file-alt"></i>
                    </div>
                    <h1>{t('article.notFound')}</h1>
                    <p>{t('article.notFoundMessage')}</p>
                    
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
                        Looking for article ID: {id}<br/>
                        Total pages available: {pages.length}<br/>
                        Available page IDs: {pages.map((p: any) => p.Page).join(', ')}
                    </div>
                    
                    <Link to="/articles" className="aurora-btn primary">
                        {t('article.backToArticles')}
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="aurora-article-page">
            {/* Hero Section */}
            <header className="aurora-article-hero">
                <div className="aurora-container">
                    <div className="aurora-article-breadcrumb">
                        <Link to="/" className="aurora-breadcrumb-link">
                            {t('common.home')}
                        </Link>
                        <i className="fas fa-chevron-right"></i>
                        {/* Dynamic breadcrumb based on article template */}
                        {article.Template && (
                            article.Template.toLowerCase().includes('doc') ||
                            article.Template.toLowerCase().includes('guide') ||
                            article.Template.toLowerCase().includes('tutorial')
                        ) ? (
                            <Link to="/documentation" className="aurora-breadcrumb-link">
                                Documentación
                            </Link>
                        ) : (
                            <Link to="/articles" className="aurora-breadcrumb-link">
                                {t('navigation.articles')}
                            </Link>
                        )}
                        <i className="fas fa-chevron-right"></i>
                        <span className="aurora-breadcrumb-current">
                            {article.Page || 'Artículo'}
                        </span>
                    </div>
                    
                    <div className="aurora-article-header">
                        <h1 className="aurora-article-body-title">
                            {article.Page || 'Artículo'}
                        </h1>
                    </div>
                </div>
            </header>

            {/* Article Content */}
            <main className="aurora-article-main">
                <div className="aurora-container">
                    <div className="aurora-article-content">
                        
                        {/* Contenido del artículo */}
                        <div className="aurora-article-body">
                            {/* Buscar específicamente el campo Content y su propiedad text */}
                            {article.values && article.values.length > 0 ? (
                                (() => {
                                    // Buscar el campo "Content"
                                    const contentField = article.values.find((value: any) => 
                                        value.name && value.name.toLowerCase() === 'content'
                                    );
                                    
                                    console.log("=== CONTENT FIELD DEBUG ===");
                                    console.log("Found content field:", contentField);
                                    
                                    if (contentField && contentField.value && contentField.value.text) {
                                        console.log("Content text found:", contentField.value.text);
                                        const htmlContent = contentField.value.text;
                                        
                                        return (
                                            <div className="aurora-article-section">
                                                <div className="aurora-section-content">
                                                    {/* Renderizar el texto como HTML */}
                                                    {htmlContent.includes('<') && htmlContent.includes('>') ? (
                                                        <div 
                                                            className="aurora-html-content"
                                                            dangerouslySetInnerHTML={{ __html: htmlContent }} 
                                                        />
                                                    ) : (
                                                        <div className="aurora-html-content">
                                                            <p>{htmlContent}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        console.log("Content field structure:", contentField);
                                        return (
                                            <div className="aurora-article-section">
                                                <h3 className="aurora-section-title">Contenido no encontrado</h3>
                                                <p className="aurora-text-content">
                                                    No se encontró el campo 'Content' con la propiedad 'text'.
                                                </p>
                                                <div style={{ 
                                                    marginTop: '15px',
                                                    padding: '10px', 
                                                    backgroundColor: '#f8f9fa', 
                                                    borderRadius: '8px',
                                                    fontSize: '12px'
                                                }}>
                                                    <strong>Debug - Campos disponibles:</strong><br/>
                                                    {article.values.map((v: any, i: number) => (
                                                        <div key={i}>
                                                            <strong>{v.name}:</strong> {typeof v.value === 'object' ? JSON.stringify(Object.keys(v.value)) : typeof v.value}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    }
                                })()
                            ) : article.components && article.components.length > 0 ? (
                                (() => {
                                    // Buscar el campo "Content" en components
                                    const contentComponent = article.components.find((comp: any) => 
                                        comp.name && comp.name.toLowerCase() === 'content'
                                    );
                                    
                                    console.log("=== CONTENT COMPONENT DEBUG ===");
                                    console.log("Found content component:", contentComponent);
                                    
                                    if (contentComponent && contentComponent.value && contentComponent.value.text) {
                                        console.log("Component content text found:", contentComponent.value.text);
                                        const htmlContent = contentComponent.value.text;
                                        
                                        return (
                                            <div className="aurora-article-section">
                                                <div className="aurora-section-content">
                                                    {/* Renderizar el texto como HTML */}
                                                    {htmlContent.includes('<') && htmlContent.includes('>') ? (
                                                        <div 
                                                            className="aurora-html-content"
                                                            dangerouslySetInnerHTML={{ __html: htmlContent }} 
                                                        />
                                                    ) : (
                                                        <div className="aurora-html-content">
                                                            <p>{htmlContent}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        console.log("Content component structure:", contentComponent);
                                        return (
                                            <div className="aurora-article-section">
                                                <h3 className="aurora-section-title">Contenido no encontrado</h3>
                                                <p className="aurora-text-content">
                                                    No se encontró el componente 'Content' con la propiedad 'text'.
                                                </p>
                                                <div style={{ 
                                                    marginTop: '15px',
                                                    padding: '10px', 
                                                    backgroundColor: '#f8f9fa', 
                                                    borderRadius: '8px',
                                                    fontSize: '12px'
                                                }}>
                                                    <strong>Debug - Componentes disponibles:</strong><br/>
                                                    {article.components.map((c: any, i: number) => (
                                                        <div key={i}>
                                                            <strong>{c.name}:</strong> {typeof c.value === 'object' ? JSON.stringify(Object.keys(c.value)) : typeof c.value}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    }
                                })()
                            ) : (
                                <div className="aurora-article-placeholder">
                                    <div className="aurora-article-section">
                                        <h3 className="aurora-section-title">Artículo cargado</h3>
                                        <p className="aurora-text-content">
                                            El artículo se ha cargado correctamente desde la base de datos, 
                                            pero no se encontró contenido en los campos esperados.
                                        </p>
                                        <small style={{ 
                                            color: '#666', 
                                            fontSize: '0.875rem',
                                            display: 'block',
                                            marginTop: '1rem',
                                            fontStyle: 'italic'
                                        }}>
                                            Revisa la consola del navegador para más detalles sobre la estructura de datos.
                                        </small>
                                    </div>
                                    
                                    {/* Debug info for content */}
                                    <div style={{ 
                                        marginTop: '20px', 
                                        padding: '15px', 
                                        backgroundColor: '#f5f5f5', 
                                        borderRadius: '8px',
                                        fontSize: '12px'
                                    }}>
                                        <strong>Article Debug Info:</strong><br/>
                                        Page ID: {article.Page}<br/>
                                        Template: {article.Template}<br/>
                                        Available properties: {Object.keys(article).join(', ')}<br/>
                                        Full object: {JSON.stringify(article, null, 2)}
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Tags */}
                        {article.Tags && (
                            <div className="aurora-article-tags-section">
                                <h3>{t('article.tags')}</h3>
                                <div className="aurora-article-tags">
                                    {(Array.isArray(article.Tags) 
                                        ? article.Tags 
                                        : article.Tags.split(',')
                                    ).map((tag: string, index: number) => (
                                        <span key={index} className="aurora-tag">
                                            #{tag.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Navigation */}
                    <div className="aurora-article-navigation">
                        <Link to="/articles" className="aurora-btn outline">
                            <i className="fas fa-arrow-left"></i>
                            {t('article.backToArticles')}
                        </Link>
                        
                        <div className="aurora-article-share">
                            <span>{t('article.share')}</span>
                            <button className="aurora-share-btn" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                                <i className="fas fa-link"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            
            {/* Footer */}
            <footer className="aurora-article-footer">
                <div className="aurora-container">
                    <p>&copy; 2025 {article.Author || 'Aurora Team'}. {t('common.allRightsReserved')}</p>
                </div>
            </footer>
        </div>
    )
}

export default Article