import React, { useEffect } from 'react'
import './article.css'
import '../App.css'
import { useAppSelector } from '../hooks'
import { useParams, Link } from 'react-router-dom'
import { DSLLoader } from '../lib/dsl'
import { getFileUrl } from '../util/files'
import { useT } from '../util/useTranslation'

const Product: React.FC = () => {
  const params = useParams<{ name?: string }>()
  const name = params.name
  const selectedPage = useAppSelector((s: any) => (s as any).pages?.selectedPage || {})

  // Helper to extract named values from the API shape
  const extractValues = (list: any[]) => {
    if (!Array.isArray(list)) return []
    return list.filter(Boolean).map((v: any) => ({
      name: v.name,
      value: v.value,
      component: v.component
    }))
  }

  const values = extractValues(selectedPage.values || selectedPage.components || [])

  const t = useT()

  // find documentation-like file for downloads (datasheet, manual, etc.)
  const normalize = (s: any) => String(s || '').toLowerCase().trim().replace(/\s+/g, ' ')

  const docValue = values.find((v: any) => {
    const n = normalize(v.name)
  return ['documentation', 'document', 'file', 'fichero', 'documentacion', 'datasheet', 'manual', 'productfile', 'specs', 'whitepaper', 'white-paper', 'white_paper', 'white paper', 'whitepapper', 'white-papper'].includes(n)
  })

  // support tagline fields as subtitle (some templates use 'Tagline' or 'Tag line')
  const subtitleValue = values.find((v: any) => {
    const n = String(v.name).toLowerCase()
    return ['subtitle', 'tagline', 'tag line', 'tag_line', 'tag-line'].includes(n)
  })

  // explicit whitepaper value (some templates provide a dedicated field)
  const whitepaperValue = values.find((v: any) => {
    const n = normalize(v.name)
  return ['whitepaper', 'white-paper', 'white_paper', 'white paper', 'whitepapper', 'white-papper'].includes(n)
  }) || docValue

  // dev-only debug to inspect loaded page values (runs in effect, doesn't render)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.debug && console.debug('product debug', { selectedPage, valuesLength: values.length, whitepaperValue, docValue })
    }
  }, [selectedPage, values.length, whitepaperValue, docValue])

  return (
    <DSLLoader action="pages/selectPage" payload={name} fallback={<div className="aurora-loading-container"><p>{t('common.loading') || 'Cargando producto...'}</p></div>}>
      <div className="aurora-article-page">
        {/* Hero / Breadcrumb */}
        <header className="aurora-article-hero">
          <div className="aurora-container">
            <div className="aurora-article-breadcrumb">
              <Link to="/" className="aurora-breadcrumb-link">{t('common.home') || 'Home'}</Link>
              <i className="fas fa-chevron-right" />
              <Link to="/products" className="aurora-breadcrumb-link">{t('products.title') || 'Products'}</Link>
              <i className="fas fa-chevron-right" />
              <span className="aurora-breadcrumb-current">{values.find(v => String(v.name).toLowerCase() === 'productname')?.value?.text || selectedPage.Page || 'Producto'}</span>
            </div>

            <div className="aurora-article-header">
              {values.find(v => ['logo', 'image', 'photo', 'productimage', 'picture'].includes(String(v.name).toLowerCase())) ? (
                <div className="aurora-hero-logo" data-dsl={values.find(v => ['logo', 'image', 'photo', 'productimage', 'picture'].includes(String(v.name).toLowerCase()))!.component}>
                  {values.find(v => ['logo', 'image', 'photo', 'productimage', 'picture'].includes(String(v.name).toLowerCase()))!.value?.name ? (
                    <img
                      src={getFileUrl(values.find(v => ['logo', 'image', 'photo', 'productimage', 'picture'].includes(String(v.name).toLowerCase()))!.value.name)}
                      alt={values.find(v => ['logo', 'image', 'photo', 'productimage', 'picture'].includes(String(v.name).toLowerCase()))!.value?.caption || 'Imagen del producto'}
                      style={{ maxWidth: 120, height: 'auto', display: 'block', marginRight: 12 }}
                      onError={(e: any) => { e.currentTarget.style.display = 'none' }}
                    />
                  ) : null}
                </div>
              ) : null}
              <h1 className="aurora-article-body-title" data-dsl={values.find(v => String(v.component).includes('ProductName'))?.component || 'Products/ProductName'}>
                {values.find(v => String(v.name).toLowerCase() === 'productname')?.value?.text || selectedPage.Page || 'Producto'}
              </h1>
              {/* subtitle removed from header and rendered inside article body for better hierarchy */}
            </div>
          </div>
        </header>

        <main className="aurora-article-main">
          <div className="aurora-container">
            <div className="aurora-article-content">
              <div className="aurora-article-body">

                {/* Subtitle placed at the top of article body */}
                {subtitleValue ? (
                  <p className="aurora-article-description aurora-subtitle" data-dsl={subtitleValue.component}>
                    {subtitleValue.value?.text}
                  </p>
                ) : null}

                {/* Overview / Description */}
                {values.find(v => String(v.name).toLowerCase() === 'overview' || String(v.name).toLowerCase() === 'description') ? (
                  <div className="aurora-article-section aurora-overview-section" data-dsl={values.find(v => String(v.name).toLowerCase() === 'overview' || String(v.name).toLowerCase() === 'description')!.component}>
                    <div className="aurora-section-content aurora-html-content" dangerouslySetInnerHTML={{ __html: String(values.find(v => String(v.name).toLowerCase() === 'overview' || String(v.name).toLowerCase() === 'description')!.value?.text || '') }} />
                  </div>
                ) : null}
                {/* Documentation handled as whitepaper below (avoid duplicate blocks) */}

                {whitepaperValue ? (
                  <div className="aurora-article-section aurora-download-section" data-dsl={whitepaperValue.component}>
                    <div className="aurora-section-content">
                      <p className="aurora-download-title">{t('products.whitepaper_title') || 'Descargar whitepaper'}</p>
                      <p className="aurora-download-file">{whitepaperValue.value?.name || whitepaperValue.value?.text || 'Whitepaper'}</p>
                      <a
                        className="aurora-download-link"
                        href={getFileUrl(whitepaperValue.value?.url || whitepaperValue.value?.name || whitepaperValue.value || '')}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('products.download_action') || 'Descargar'} <i className="fas fa-download" />
                      </a>
                    </div>
                  </div>
                ) : null}
                {/* Remaining fields (render any non-standard fields) */}
                {values.length > 0 && (
                  <div className="aurora-article-section">
                    {values.map((v, idx) => {
                      const lower = normalize(v.name)
                      // skip known fields
                      if (['productname', 'overview', 'description', 'subtitle', 'tagline', 'image', 'logo', 'content', 'price', 'documentation', 'whitepaper', 'whitepapper'].includes(lower)) return null
                      const content = typeof v.value === 'object' ? (v.value.text || v.value.name || JSON.stringify(v.value)) : String(v.value)

                      // special-case for GitHub repository links
                      if (['githubrepository', 'github_repository', 'github', 'gitHubRepository'.toLowerCase()].includes(lower)) {
                        const url = typeof v.value === 'object' ? (v.value.text || v.value.url || '') : String(v.value)
                        return (
                          <div key={idx} className="aurora-article-section" data-dsl={v.component} style={{ marginBottom: 12 }}>
                            <h3 className="aurora-section-title">{v.name}</h3>
                            <div className="aurora-section-content">
                              <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                            </div>
                          </div>
                        )
                      }

                      return (
                        <div key={idx} className="aurora-article-section" data-dsl={v.component} style={{ marginBottom: 12 }}>
                          <h3 className="aurora-section-title">{v.name}</h3>
                          <div className="aurora-section-content" dangerouslySetInnerHTML={{ __html: content || '' }} />
                        </div>
                      )
                    })}
                  </div>
                )}

              </div>
            </div>
          </div>
        </main>
      </div>
    </DSLLoader>
  )
}

export default Product
