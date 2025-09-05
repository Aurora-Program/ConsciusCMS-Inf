import React from 'react'
import Loader from '../util/loader'
import { DownloadButton } from '../util/files'

type DocumentsListProps = {
  fetchDetails?: boolean
  fileNames?: string[]
  emptyMessage?: React.ReactNode
}

const defaultFileNames = ['document', 'fichero', 'fichero ', 'file', 'fichero']

export default function DocumentsList({ fetchDetails = true, fileNames = defaultFileNames, emptyMessage }: DocumentsListProps) {
  const extractFilePath = (doc: any) => {
    const checkList = (list: any[]) => {
      if (!Array.isArray(list)) return null
      for (const v of list) {
        if (!v || !v.name) continue
        const n = String(v.name).toLowerCase()
        if (fileNames.includes(n)) {
          if (!v.value) continue
          if (typeof v.value === 'object') return v.value.name || v.value.path || v.value.text || null
          return String(v.value)
        }
      }
      return null
    }
    return checkList(doc.values) || checkList(doc.components)
  }

  return (
    <Loader fetchDetails={fetchDetails}>
      {(items: any[], loading: boolean, error: any) => {
        if (loading) return <p>Cargando documentos...</p>
        if (error) return <p>Error cargando documentos</p>

        const list = (items || []).map((doc: any, idx: number) => {
          const path = extractFilePath(doc)
          return { idx, doc, path }
        }).filter((i: any) => i.path)

        if (!list || list.length === 0) return <p>{emptyMessage ?? 'No se encontraron archivos adjuntos en las páginas.'}</p>

        return (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {list.map((item: any) => (
              <li key={item.idx} style={{ marginBottom: 10 }}>
                <span role="img" aria-hidden>📄</span>
                &nbsp;
                <DownloadButton path={item.path} label={item.doc.Page || item.path} className="aurora-link" />
                &nbsp;
                <div style={{ fontSize: 12, color: '#333', display: 'inline-block', marginLeft: 8 }}>{item.doc.Page || '(sin título)'}</div>
              </li>
            ))}
          </ul>
        )
      }}
    </Loader>
  )
}
