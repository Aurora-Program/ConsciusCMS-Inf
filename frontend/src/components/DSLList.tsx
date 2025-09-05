import React from 'react'
import { useAppSelector } from '../hooks'

type DSLListProps = {
  slice?: string
  template?: string | RegExp
  children: (item: any, idx: number) => React.ReactNode
  empty?: React.ReactNode
}

export default function DSLList({ slice = 'pages', template, children, empty = <em>(no items)</em> }: DSLListProps) {
  // Select a stable reference from the store (either the pages array or the byId object)
  const pagesRef = useAppSelector((s: any) => {
    const candidates = [slice, 'editor', 'pages']
    for (const sl of candidates) {
      const stateSlice = (s as any)[sl]
      if (!stateSlice) continue
      if (Array.isArray(stateSlice.pages)) return stateSlice.pages
      if (stateSlice.byId && typeof stateSlice.byId === 'object') return stateSlice.byId
    }
    return null
  })

  // Memoize conversion to array so we return the same array instance when possible
  const pages = React.useMemo(() => {
    if (!pagesRef) return []
    if (Array.isArray(pagesRef)) return pagesRef as any[]
    try {
      return Object.values(pagesRef as any)
    } catch {
      return []
    }
  }, [pagesRef])

  const filtered = React.useMemo(() => {
    if (!template) return pages
    const test = typeof template === 'string'
      ? (v: string) => String(v || '').toLowerCase().includes(template.toLowerCase())
      : (v: string) => {
          let rx = template as RegExp
          try {
            if (!rx.flags.includes('i')) rx = new RegExp(rx.source, rx.flags + 'i')
          } catch {}
          return rx.test(String(v || ''))
        }
    // Try matching against several common fields: Template, template, Type, Page, Title, Name
    return pages.filter((p: any) => {
      const candidate = String(p.Template || p.template || p.Type || p.Page || p.page || p.Title || p.Name || '')
      return test(candidate)
    })
  }, [pages, template])

  if (!filtered || filtered.length === 0) return <>{empty}</>
  return <>{filtered.map((it: any, i: number) => children(it, i))}</>
}
