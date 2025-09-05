import { useState, useEffect, useMemo } from 'react'
import './articles.css'
import '../App.css'
import { useAppDispatch, useAppSelector } from '../hooks'
import { loadPages } from './pageSlice'
import { Link } from 'react-router-dom'
import { useT } from '../util/useTranslation'

function Projects() {
  const dispatch = useAppDispatch()
  const pages = useAppSelector(state => (state as any).pages?.pages || [])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [apiError, setApiError] = useState(false)
  const t = useT()

  useEffect(() => { 
    const loadData = async () => {
      try {
        setApiError(false)
        await dispatch(loadPages())
      } catch (err) {
        console.error('Error loading pages for projects', err)
        setApiError(true)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [dispatch])

  // Filter pages that look like projects by Template naming (memoized)
  const projectPages = useMemo(() => pages.filter((p: any) => {
    const tpl = String(p.Template || '').toLowerCase()
    return tpl.includes('project') || tpl.includes('proyecto') || tpl.includes('projects')
  }), [pages])

  const filtered = useMemo(() => {
    if (!searchTerm) return projectPages
    const q = searchTerm.toLowerCase()
    return projectPages.filter((pg: any) => (String(pg.Page || pg.Title || '')).toLowerCase().includes(q))
  }, [projectPages, searchTerm])

  if (isLoading) {
    return (
      <div className="aurora-articles-container">
        <div className="aurora-articles-loading">
          <div className="aurora-loading-spinner"></div>
          <p className="aurora-loading-text">{t('projects.loading') || 'Cargando proyectos...'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="aurora-articles-container">
      <header className="aurora-articles-hero">
        <div className="aurora-container">
          <div className="aurora-articles-hero-content">
            <h1 className="aurora-title-main">{t('projects.title') || 'Proyectos'}</h1>
            <p className="aurora-subtitle">{t('projects.subtitle') || 'Listado de proyectos'}</p>

            <div className="aurora-articles-controls">
              <div className="aurora-search-box">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder={t('projects.searchPlaceholder') || 'Buscar proyectos...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="aurora-search-input"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="aurora-articles-main">
        <div className="aurora-container">
          {filtered.length === 0 ? (
            <div className="aurora-articles-empty">
              <div className="aurora-empty-icon">
                <i className="fas fa-project-diagram"></i>
              </div>
              <h2 className="aurora-empty-title">{t('projects.noProjects') || 'No hay proyectos disponibles'}</h2>
              <p className="aurora-empty-message">{apiError ? t('projects.apiError') : t('projects.tryAgain') || 'Intenta más tarde'}</p>
            </div>
          ) : (
            <div className="aurora-articles-grid" role="list">
              {filtered.map((p: any, idx: number) => {
                const key = p.Page || p.id || idx
                const slug = encodeURIComponent(String(p.Page || p.Title || ''))
                return (
                  <article key={key} className="aurora-article-card" role="listitem">
                    <div className="aurora-article-content">
                      <Link to={`/project/${slug}`} className="aurora-article-title-link">
                        <h2 className="aurora-article-title">{p.Page || p.Title || 'Proyecto'}</h2>
                      </Link>
                      <p className="aurora-article-excerpt">{p.Description || p.Template || ''}</p>
                    </div>
                    <div className="aurora-article-footer">
                      <Link to={`/project/${slug}`} className="aurora-btn primary" aria-label={`Ver proyecto ${p.Page || p.Title || ''}`}>{t('projects.view') || 'Ver proyecto'}</Link>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Projects
