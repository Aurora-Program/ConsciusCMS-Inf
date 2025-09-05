import React, { useEffect, useMemo, useState } from 'react'
import './articles.css'
import '../App.css'
import { Link } from 'react-router-dom'
import { dsloadlist, dslist } from '../lib/dsl'
const DsLoadList = dsloadlist as any
const DsList = dslist as any
import { useT } from '../util/useTranslation'
import { useAppSelector } from '../hooks'

const EmptyIdeas: React.FC = () => {
  const pagesRef = useAppSelector((s: any) => {
    const ps = (s as any).pages || (s as any).editor
    if (!ps) return null
    if (Array.isArray(ps.pages)) return ps.pages
    if (ps.byId && typeof ps.byId === 'object') return ps.byId
    return null
  })
  const all = React.useMemo(() => {
    if (!pagesRef) return []
    return Array.isArray(pagesRef) ? pagesRef : Object.values(pagesRef as any)
  }, [pagesRef])
  const count = all.length
  const t = useT()

  return (
    <div className="aurora-articles-empty u-text-center">
      <h2 className="h2">{t('ideas.noIdeas') || 'No hay ninguna idea todavía'}</h2>
      <p className="u-mb-16">{t('ideas.tryAgain') || 'Intenta más tarde'}</p>
      <p className="u-mt-8" style={{fontSize:'14px', color: 'var(--aurora-muted)'}}>{`Total pages in slice: ${count}`}</p>
    </div>
  )
}

const IdeasPage: React.FC = () => {
  const t = useT()
  // use dedicated IdeaPage at route /idea/:name for details; this component is list-only

  // List view: load pages via DSLLoader + DSLList (declarative DSL-only rendering)

  return (
    <div>
      <header className="aurora-hero">
        <div className="aurora-container">
          <div className="u-text-center">
            <h1 className="h1">{t('ideas.listTitle') || 'Ideas'}</h1>
            <p>{t('ideas.listSubtitle') || 'Collected ideas and proposals'}</p>
          </div>
        </div>
      </header>

      <main className="aurora-section">
        <div className="aurora-container">
          <DsLoadList template={/idea|innova/i} fallback={
            <div className="u-text-center">
              <div className="aurora-loading-spinner"></div>
              <p>{t('ideas.loading') || 'Cargando ideas...'}</p>
            </div>
          }>
            <div role="list">
              <div className="aurora-grid-3" role="list">
                {/** small helper: when empty, show how many pages exist in the slice for debugging */}
                <DsList template={/idea|ideas|innova/i} empty={<EmptyIdeas/>}>
                  {(p: any, idx: number) => {
                    const key = p.Page || p.id || idx
                    const slug = encodeURIComponent(String(p.Page || p.Title || ''))
                    return (
                      <article key={key} className="aurora-card" role="listitem">
                        <div>
                          <Link to={`/idea/${slug}`} className="aurora-article-title-link">
                            <h2 className="h2">{p.Page || p.Title || 'Idea'}</h2>
                          </Link>
                          <p className="u-mb-16">{p.Description || p.Decription || p.Template || ''}</p>
                        </div>
                        <div className="u-mt-16">
                          <Link to={`/idea/${slug}`} className="aurora-btn aurora-btn--primary">{t('ideas.view') || 'Ver idea'}</Link>
                        </div>
                      </article>
                    )
                  }}
                </DsList>
              </div>
            </div>
          </DsLoadList>
        </div>
      </main>
    </div>
  )
}

export default IdeasPage
