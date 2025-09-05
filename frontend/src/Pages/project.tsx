import './article.css'
import '../App.css'
import { useAppSelector } from '../hooks'
import { useParams, Link } from 'react-router-dom'
import { DSLLoader } from '../lib/dsl'
import { getFileUrl } from '../util/files'
import { useT } from '../util/useTranslation'

const Project: React.FC = () => {
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

  // try to locate a documentation/file value from the API
  const docValue = values.find((v: any) => {
    const n = String(v.name).toLowerCase()
    return ['documentation', 'document', 'file', 'fichero', 'documentacion'].includes(n)
  })

  return (
    <DSLLoader action="pages/selectPage" payload={name} fallback={<div className="aurora-loading-container"><p>{t('common.loading') || 'Cargando proyecto...'}</p></div>}>
      <div className="aurora-article-page">
        {/* Hero / Breadcrumb */}
        <header className="aurora-article-hero">
          <div className="aurora-container">
            <div className="aurora-article-breadcrumb">
              <Link to="/" className="aurora-breadcrumb-link">{t('common.home') || 'Home'}</Link>
              <i className="fas fa-chevron-right" />
              <Link to="/projects" className="aurora-breadcrumb-link">{t('projects.title') || 'Projects'}</Link>
              <i className="fas fa-chevron-right" />
              <span className="aurora-breadcrumb-current">{values.find(v => String(v.name).toLowerCase() === 'projectname')?.value?.text || selectedPage.Page || 'Proyecto'}</span>
            </div>

            <div className="aurora-article-header">
              {values.find(v => String(v.name).toLowerCase() === 'logo') ? (
                <div className="aurora-hero-logo" data-dsl={values.find(v => String(v.name).toLowerCase() === 'logo')!.component}>
                  {values.find(v => String(v.name).toLowerCase() === 'logo')!.value?.name ? (
                    <img
                      src={getFileUrl(values.find(v => String(v.name).toLowerCase() === 'logo')!.value.name)}
                      alt={values.find(v => String(v.name).toLowerCase() === 'logo')!.value?.caption || 'Logo'}
                      style={{ maxWidth: 120, height: 'auto', display: 'block', marginRight: 12 }}
                      onError={(e: any) => { e.currentTarget.style.display = 'none' }}
                    />
                  ) : null}
                </div>
              ) : null}
              <h1 className="aurora-article-body-title" data-dsl={values.find(v => String(v.component).includes('ProjectName'))?.component || 'Projects/ProjectName'}>
                {values.find(v => String(v.name).toLowerCase() === 'projectname')?.value?.text || selectedPage.Page || 'Proyecto'}
              </h1>
              {/* subtitle removed from header and rendered inside article body for better hierarchy */}
            </div>
          </div>
        </header>

        <main className="aurora-article-main">
          <div className="aurora-container">
            <div className="aurora-article-content">
              <div className="aurora-article-body">

                {/* dev debug removed */}

                {/* Featured image removed (logo moved into hero) */}

                {/* Overview / Description */}
                {/* Subtitle placed at the top of article body for better reading flow */}
                {values.find(v => String(v.name).toLowerCase() === 'subtitle') ? (
                  <p className="aurora-article-description aurora-subtitle" data-dsl={values.find(v => String(v.name).toLowerCase() === 'subtitle')!.component}>
                    {values.find(v => String(v.name).toLowerCase() === 'subtitle')!.value?.text}
                  </p>
                ) : null}

                {values.find(v => String(v.name).toLowerCase() === 'overview') ? (
                  <div className="aurora-article-section aurora-overview-section" data-dsl={values.find(v => String(v.name).toLowerCase() === 'overview')!.component}>
                    <div className="aurora-section-content aurora-html-content" dangerouslySetInnerHTML={{ __html: String(values.find(v => String(v.name).toLowerCase() === 'overview')!.value?.text || '') }} />
                  </div>
                ) : null}

             

                {/* Remaining fields */}
                {values.length > 0 && (
                  <div className="aurora-article-section">
                    {values.map((v, idx) => {
                      const lower = String(v.name).toLowerCase()
                      if (['projectname', 'overview', 'subtitle', 'logo', 'content'].includes(lower)) return null
                      const content = typeof v.value === 'object' ? (v.value.text || v.value.name || JSON.stringify(v.value)) : String(v.value)
                      return (
                        <>
                        <div key={idx} className="aurora-article-section" data-dsl={v.component} style={{ marginBottom: 12 }}>
                          <h3 className="aurora-section-title">{v.name}</h3>
                          <div className="aurora-section-content" dangerouslySetInnerHTML={{ __html: content || '' }} />
                        
                     
                      <a
                        className="aurora-download-link"
                        href={getFileUrl(docValue.value?.name || docValue.value || '')}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('projects.download_action') || 'Descargar'} <i className="fas fa-download" />
                      </a>
                    </div>    
                        </>
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

export default Project
 
