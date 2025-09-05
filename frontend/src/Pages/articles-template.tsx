// === IMPORTS NECESARIOS ===
import './article.css'  // Estilos específicos para artículos
import '../App.css'     // Estilos globales de la aplicación

import { useEffect } from 'react'
// Hooks personalizados para Redux con TypeScript
import { useAppDispatch, useAppSelector } from '../hooks.js'
// Acción asíncrona que obtiene datos de la API por ID
import { selectPageAction } from './pageSlice.js'
import { useParams } from 'react-router-dom'
import { useTranslation } from '../util/useTranslation'

/**
 * COMPONENTE ARTICLES TEMPLATE - BASADO EN EXAMPLE.TSX
 * 
 * PROPÓSITO: Template para mostrar artículos individuales con Design System Aurora
 * 
 * CAMPOS DEFINIDOS:
 * - Title: Título del artículo
 * - Content: Contenido HTML del artículo
 * 
 * FLUJO DE DATOS:
 * URL → useParams() → selectPageAction(id) → API → Redux Store → useSelector → Template
 */

function ArticlesTemplate() {

    // === CONEXIÓN CON REDUX ===
    const dispatch = useAppDispatch()
    // Obtiene el array 'data' del estado Redux (viene de pageSlice)
    // Este 'data' contiene todos los componentes del artículo desde la API
    const data = useAppSelector(state => (state as any).pages?.data || [])

    // === SISTEMA DE TRADUCCIONES ===
    const { t } = useTranslation()

    // === PARÁMETROS DE URL ===
    const { id } = useParams<{ id: string }>()

    // === PARÁMETROS Y ESTADO LOCAL ===
    // Contador de visitas (se guarda en localStorage)
    const visitCount = localStorage.getItem('value') ? Number(localStorage.getItem('value')) : 0;

    // === EFECTOS ===
    // Incrementa contador de visitas cada vez que se monta el componente
    useEffect(() => {
        localStorage.setItem('value', String(visitCount + 1))
    }, [])
      
    // EFECTO PRINCIPAL: Obtiene datos de la API cuando cambia el ID
    useEffect(() => { 
        dispatch(selectPageAction())  // Dispatch de acción asíncrona
    }, [dispatch])

    /**
     * FUNCIONES AUXILIARES PROFESIONALES
     */
    
    // Función para calcular tiempo de lectura estimado
    const calculateReadingTime = (content: string): number => {
        if (!content) return 1;
        const wordsPerMinute = 200; // Promedio de lectura en español
        const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length; // Elimina HTML y cuenta palabras
        const minutes = Math.ceil(words / wordsPerMinute);
        return Math.max(1, minutes); // Mínimo 1 minuto
    };

    // Obtener contenido del artículo
    const articleContent = data.find((item: any) => item.name === "Content")?.value["text"] || "";
    const readingTime = calculateReadingTime(articleContent);

    /**
     * ESTRUCTURA DE DATOS PARA ARTICLES:
     * 
     * [
     *   { component: "Articles/Title", value: { text: "Mi Artículo" } },
     *   { name: "Content", value: { text: "<p>Contenido HTML...</p>" } }
     * ]
     * 
     * PATRONES DE BÚSQUEDA:
     * - Articles/Title → ?.value["text"] (título del artículo)
     * - Content → ?.value["text"] (contenido HTML)
     */ 

    // === TEMPLATE CON DESIGN SYSTEM AURORA ===
    return (
        <>
            {/* Aplicando: Contenedor principal de página */}
            <div className="articles-template-page">
                
                {/* Aplicando: Hero section para el título del artículo */}
                <section className="aurora-hero">
                    {/* Aplicando: Contenedor principal centrado */}
                    <div className="aurora-container">
                        
                        {/* Aplicando: Breadcrumbs profesionales */}
                        <nav className="aurora-breadcrumb" style={{marginBottom: '2rem'}}>
                            <div className="aurora-flex-center" style={{justifyContent: 'flex-start', gap: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)'}}>
                                <a href="/" style={{color: 'rgba(255,255,255,0.8)', textDecoration: 'none'}}>
                                    {t('articles.template.breadcrumb.home')}
                                </a>
                                <span>›</span>
                                <a href="/articles" style={{color: 'rgba(255,255,255,0.8)', textDecoration: 'none'}}>
                                    {t('articles.template.breadcrumb.articles')}
                                </a>
                                <span>›</span>
                                <span style={{color: '#F0E68C'}}>
                                    {data.find((item: any) => item.component === "Articles/Title")?.value["text"]?.substring(0, 30) || t('articles.template.loading')}...
                                </span>
                            </div>
                        </nav>

                        {/* Aplicando: Header profesional del artículo */}
                        <header className="article-header" style={{textAlign: 'center', maxWidth: '800px', margin: '0 auto'}}>
                            
                            {/* Aplicando: Categoría del artículo */}
                            <div className="article-category" style={{marginBottom: '1rem'}}>
                                <span className="aurora-btn outline" style={{
                                    fontSize: '0.8rem', 
                                    padding: '0.3rem 1rem',
                                    borderColor: '#F0E68C',
                                    color: '#F0E68C',
                                    background: 'rgba(240, 230, 140, 0.1)',
                                    pointerEvents: 'none'
                                }}>
                                    📰 Artículo #{id || "Unknown"}
                                </span>
                            </div>

                            {/* Aplicando: Título principal del artículo con gradiente dorado */}
                            <h1 className="aurora-title-main" id="article-title" style={{
                                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                                lineHeight: '1.2',
                                marginBottom: '1.5rem',
                                fontWeight: '700'
                            }}>
                                <span className="aurora-text-gold">
                                    {data.find((item: any) => item.component === "Articles/Title")?.value["text"] || t('articles.template.loading')}
                                </span>
                            </h1>
                            
                            {/* Aplicando: Metadata profesional del artículo */}
                            <div className="article-meta-header" style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '2rem',
                                flexWrap: 'wrap',
                                marginBottom: '2rem',
                                color: 'rgba(255,255,255,0.9)',
                                fontSize: '0.95rem'
                            }}>
                                
                                {/* Aplicando: Fecha de publicación */}
                                <div className="meta-item" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                    <span style={{color: '#F0E68C'}}>📅</span>
                                    <span>{new Date().toLocaleDateString('es-ES', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}</span>
                                </div>

                                {/* Aplicando: Tiempo de lectura estimado */}
                                <div className="meta-item" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                    <span style={{color: '#F0E68C'}}>⏱️</span>
                                    <span>{readingTime} {t('articles.template.meta.readingTime')}</span>
                                </div>

                                {/* Aplicando: Contador de visitas */}
                                <div className="meta-item" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                    <span style={{color: '#F0E68C'}}>👀</span>
                                    <span>{t('articles.template.visits')} {visitCount}</span>
                                </div>

                                {/* Aplicando: Autor (si está disponible) */}
                                <div className="meta-item" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                    <span style={{color: '#F0E68C'}}>✍️</span>
                                    <span>Aurora Program</span>
                                </div>
                                
                            </div>

                            {/* Aplicando: Línea separadora elegante */}
                            <div style={{
                                width: '100px',
                                height: '2px',
                                background: 'linear-gradient(90deg, transparent, #F0E68C, transparent)',
                                margin: '0 auto 2rem auto'
                            }}></div>

                            {/* Aplicando: Resumen del artículo (si está disponible) */}
                            <div className="article-summary" style={{
                                background: 'rgba(240, 230, 140, 0.1)',
                                border: '1px solid rgba(240, 230, 140, 0.3)',
                                borderRadius: '8px',
                                padding: '1.5rem',
                                maxWidth: '600px',
                                margin: '0 auto',
                                color: 'rgba(255,255,255,0.9)',
                                fontSize: '1.1rem',
                                lineHeight: '1.6'
                            }}>
                                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem'}}>
                                    <span style={{color: '#F0E68C', fontSize: '1.2rem'}}>📋</span>
                                    <strong>Resumen del artículo</strong>
                                </div>
                                <p style={{margin: '0', fontStyle: 'italic'}}>
                                    En este artículo exploraremos los conceptos principales relacionados con el tema presentado, 
                                    proporcionando una visión completa y actualizada para lectores interesados en profundizar 
                                    en el conocimiento del Programa Aurora.
                                </p>
                            </div>

                        </header>
                        
                    </div>
                </section>

                {/* Aplicando: Sección principal de contenido */}
                <section className="aurora-section">
                    {/* Aplicando: Contenedor principal */}
                    <div className="aurora-container">
                        
                        {/* Aplicando: Tarjeta principal para el contenido */}
                        <div className="aurora-card">
                            {/* Aplicando: Área de contenido del artículo */}
                            <div className="article-content" id="article-content">
                                <div dangerouslySetInnerHTML={{ 
                                    __html: data.find((item: any) => item.name === "Content")?.value["text"] || `<p>${t('articles.template.noContent')}</p>` 
                                }}/>
                            </div>
                        </div>

                        {/* Aplicando: Sección de navegación o acciones adicionales */}
                        <div className="aurora-flex-center" style={{marginTop: '2rem'}}>
                            {/* Aplicando: Botón para volver a la lista de artículos */}
                            <a href="/articles" className="aurora-btn outline">
                                {t('articles.template.backToArticles')}
                            </a>
                            
                            {/* Aplicando: Botón de acción principal */}
                            <button className="aurora-btn primary" onClick={() => window.print()}>
                                {t('articles.template.printArticle')}
                            </button>
                        </div>

                    </div>
                </section>

                {/* Aplicando: Sección alternativa para información adicional */}
                <section className="aurora-section alt">
                    {/* Aplicando: Contenedor principal */}
                    <div className="aurora-container">
                        
                        {/* Aplicando: Grid de 2 columnas para contenido relacionado */}
                        <div className="aurora-grid-2">
                            
                            {/* Aplicando: Tarjeta con información del artículo */}
                            <div className="aurora-card blue-accent">
                                <h3 className="aurora-title-section">{t('articles.template.articleInfo.title')}</h3>
                                <div className="article-meta">
                                    <p><strong>{t('articles.template.articleInfo.id')}</strong> {id || "N/A"}</p>
                                    <p><strong>{t('articles.template.articleInfo.articleTitle')}</strong> {data.find((item: any) => item.component === "Articles/Title")?.value["text"] || t('articles.template.noTitle')}</p>
                                    <p><strong>{t('articles.template.visits')}</strong> {visitCount}</p>
                                    <p><strong>{t('articles.template.articleInfo.lastUpdate')}</strong> {new Date().toLocaleDateString()}</p>
                                </div>
                            </div>
                            
                            {/* Aplicando: Tarjeta con acciones adicionales */}
                            <div className="aurora-card gold-accent">
                                <h3 className="aurora-title-section">{t('articles.template.actions.title')}</h3>
                                <div className="article-actions">
                                    <p>{t('articles.template.actions.likedArticle')}</p>
                                    <div className="aurora-flex-center">
                                        <button className="aurora-btn gold">
                                            {t('articles.template.actions.like')}
                                        </button>
                                        <button className="aurora-btn outline">
                                            {t('articles.template.actions.share')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </section>

                {/* Aplicando: Footer del artículo */}
                <footer className="aurora-section">
                    <div className="aurora-container">
                        <div className="aurora-flex-center">
                            <p style={{textAlign: 'center', color: '#666'}}>
                                &copy; 2025 Aurora Program. {t('articles.template.footer.rights')}
                                <br />
                                {t('articles.template.footer.article')} "{data.find((item: any) => item.component === "Articles/Title")?.value["text"] || t('articles.template.noTitle')}"
                            </p>
                        </div>
                    </div>
                </footer>

            </div>
        </>
    )
}

/**
 * GUÍA DE USO DEL TEMPLATE ARTICLES:
 * 
 * CAMPOS DISPONIBLES:
 * 1. Articles/Title → Título del artículo (value.text)
 * 2. Content → Contenido HTML completo (value.text)
 * 
 * ESTRUCTURA VISUAL:
 * - Hero Section: Título destacado con gradiente dorado
 * - Content Section: Contenido principal en tarjeta Aurora
 * - Info Section: Metadata y acciones en grid 2 columnas
 * - Footer: Información de copyright y título
 * 
 * CARACTERÍSTICAS:
 * - Design System Aurora completamente aplicado
 * - Responsive design automático
 * - Contador de visitas funcional
 * - Botones de acción (imprimir, volver, compartir)
 * - Información de metadata
 * - Comentarios explicativos en cada div
 * 
 * PERSONALIZACIÓN:
 * - Cambiar colores modificando clases aurora-*
 * - Añadir más campos modificando los component patterns
 * - Personalizar acciones en la sección de botones
 * - Adaptar metadata según necesidades
 */

export default ArticlesTemplate
