import { useState, useEffect, useMemo } from 'react'
import './articles.css'
import '../App.css'
import { useAppDispatch, useAppSelector } from '../hooks'
import { loadPages } from './pageSlice'
import { Link } from 'react-router-dom'
import { useT } from '../util/useTranslation'

function Products() {
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
        console.error('Error loading pages for products', err)
        setApiError(true)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [dispatch])

  // Filter pages that look like products by Template naming (memoized)
  const productPages = useMemo(() => pages.filter((p: any) => {
    const tpl = String(p.Template || '').toLowerCase()
    return tpl.includes('product') || tpl.includes('producto') || tpl.includes('products')
  }), [pages])

  const filtered = useMemo(() => {
    if (!searchTerm) return productPages
    const q = searchTerm.toLowerCase()
    return productPages.filter((pg: any) => (String(pg.Page || pg.Title || '')).toLowerCase().includes(q))
  }, [productPages, searchTerm])

  if (isLoading) {
    return (
      <div className="aurora-articles-container">
        <div className="aurora-articles-loading">
          <div className="aurora-loading-spinner"></div>
          <p className="aurora-loading-text">{t('products.loading') || 'Cargando productos...'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="aurora-articles-container">
      <header className="aurora-articles-hero">
        <div className="aurora-container">
          <div className="aurora-articles-hero-content">
            <h1 className="aurora-title-main">{t('products.title') || 'Productos'}</h1>
            <p className="aurora-subtitle">{t('products.subtitle') || 'Listado de productos'}</p>

            <div className="aurora-articles-controls">
              <div className="aurora-search-box">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder={t('products.searchPlaceholder') || 'Buscar productos...'}
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
                <i className="fas fa-box-open"></i>
              </div>
              <h2 className="aurora-empty-title">{t('products.noProducts') || 'No hay productos disponibles'}</h2>
              <p className="aurora-empty-message">{apiError ? t('products.apiError') : t('products.tryAgain') || 'Intenta más tarde'}</p>
            </div>
          ) : (
            <div className="aurora-articles-grid" role="list">
              {filtered.map((p: any, idx: number) => {
                const key = p.Page || p.id || idx
                const slug = encodeURIComponent(String(p.Page || p.Title || ''))
                return (
                  <article key={key} className="aurora-article-card" role="listitem">
                    <div className="aurora-article-content">
                      <Link to={`/product/${slug}`} className="aurora-article-title-link">
                        <h2 className="aurora-article-title">{p.Page || p.Title || 'Producto'}</h2>
                      </Link>
                      <p className="aurora-article-excerpt">{p.Description || p.Template || ''}</p>
                    </div>
                    <div className="aurora-article-footer">
                      <Link to={`/product/${slug}`} className="aurora-btn primary" aria-label={`Ver producto ${p.Page || p.Title || ''}`}>{t('products.view') || 'Ver producto'}</Link>
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

export default Products
