import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { dsselect, dsfield } from '../lib/dsl'
import { useAppSelector } from '../hooks'
import './articles.css'

const DsSelect = dsselect as any
const DsField = dsfield as any

const IdeaPage: React.FC = () => {
  const params = useParams<{ name?: string }>()
  const name = params.name

  if (!name) return <div style={{padding:20}}>Idea not specified</div>

  return (
    <DsSelect payload={name} fallback={<div style={{padding:20}}>Cargando...</div>}>
      <div className="aurora-article-page">
        <header className="aurora-article-hero">
          <div className="aurora-container">
            <div className="aurora-article-breadcrumb">
              <Link to="/" className="aurora-breadcrumb-link">Home</Link>
              <i className="fas fa-chevron-right" />
              <Link to="/ideas" className="aurora-breadcrumb-link">Ideas</Link>
              <i className="fas fa-chevron-right" />
              <span className="aurora-breadcrumb-current"><DsField slice="pages" field="Page" as="span" fallback={name} /></span>
            </div>
            <div className="aurora-article-header">
              <h1 className="aurora-article-body-title"><DsField slice="pages" field="Page" as="span" fallback={name} /></h1>
              <p className="aurora-subtitle"><DsField slice="pages" field="Subtitle" as="span" fallback={null} /></p>
              <p className="aurora-article-description"><DsField slice="pages" field="noUsed" as="span" fallback={null} /></p>
            </div>
          </div>
        </header>

        <main className="aurora-article-main">
          <div className="aurora-container">
            <div className="aurora-article-content">
              <div className="aurora-article-body aurora-html-content">
                <div className="aurora-html-content"><DsField slice="pages" field="Description" as="div" fallback={null} /></div>
                <div style={{ marginTop: 18 }}>
                  <h3>Details</h3>
                  <DsField slice="pages" field="Tags" as="p" fallback={null} />
                  <DsField slice="pages" field="Author" as="p" fallback={null} />
                </div>
              </div>
            </div>
          </div>
        </main>
        <div style={{marginTop:12}}>
          <IdeaDebugPanel />
        </div>
      </div>
    </DsSelect>
  )
}


// Debug panel exported for quick inspection while developing
export const IdeaDebugPanel: React.FC = () => {
  const selected = useAppSelector((s: any) => (s as any).editor ? (s as any).editor.selectedPage : (s as any).pages?.selectedPage)
  const pages = useAppSelector((s: any) => (s as any).pages || (s as any).editor)
  return (
    <div style={{background:'#fff8',padding:12,margin:12,borderRadius:6}}>
      <h4>Idea Debug</h4>
      <pre style={{maxHeight:300,overflow:'auto',fontSize:12}}>{JSON.stringify({ selected, pages }, null, 2)}</pre>
    </div>
  )
}

export default IdeaPage
