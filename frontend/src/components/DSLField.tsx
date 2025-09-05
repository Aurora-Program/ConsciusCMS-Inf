import React, { PropsWithChildren } from 'react'
import { useAppSelector } from '../hooks'
import registry from './reduxRegistry'

type DSLFieldProps = PropsWithChildren<{
  slice?: string
  field: string
  id?: string
  as?: keyof JSX.IntrinsicElements | React.ElementType
  fallback?: React.ReactNode
  className?: string
  html?: boolean // force render as HTML
}>

function looksLikeHtml(s: any) {
  return typeof s === 'string' && /<[^>]+>/i.test(s)
}

export default function DSLField({
  slice = 'pages',
  field,
  id,
  as = 'span',
  fallback = null,
  className,
  html = false,
}: DSLFieldProps) {
  const value = useAppSelector((s: any) => registry.selectFieldFromSlice(s, slice, id, field))

  // If registry didn't find a value, try a tolerant fallback directly on selectedPage
  const fallbackValue = useAppSelector((s: any) => {
    try {
      const state = s as any
      const candidates = [state[slice], state.editor, state.pages]
      const sel = candidates.find((c: any) => c && c.selectedPage)?.selectedPage
      const doc = sel || (candidates.find((c: any) => Array.isArray(c?.values)) || null)
      if (!doc) return undefined
      const list = doc.values || doc.data || []
      const normalize = (x: string) => String(x || '').toLowerCase().replace(/[^a-z0-9]/g, '')
      const lev = (a: string, b: string) => {
        const A = a.split('')
        const B = b.split('')
        const m = A.length, n = B.length
        const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
        for (let i = 0; i <= m; i++) dp[i][0] = i
        for (let j = 0; j <= n; j++) dp[0][j] = j
        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            const cost = A[i - 1] === B[j - 1] ? 0 : 1
            dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)
          }
        }
        return dp[m][n]
      }
      const target = normalize(field)
      // prefer exact
      let found = list.find((it: any) => it && it.name && normalize(it.name) === target)
      if (!found) {
        found = list.find((it: any) => it && it.name && (normalize(it.name).includes(target) || target.includes(normalize(it.name)) || lev(normalize(it.name), target) <= 2))
      }
      if (!found) return undefined
      const val = found.value
      if (val === undefined || val === null) return undefined
      if (typeof val === 'object') return val.text ?? val.name ?? JSON.stringify(val)
      return String(val)
    } catch {
      return undefined
    }
  })

  const effective = value === undefined || value === null ? fallbackValue : value

  if (effective === undefined || effective === null) return <>{fallback}</>

  const Tag = as as React.ElementType

  // If the value looks like HTML, render it as HTML inside the element
  if (html || looksLikeHtml(effective)) {
    return <Tag className={className} dangerouslySetInnerHTML={{ __html: String(effective) }} />
  }

  if (typeof effective === 'object') {
    try {
      return <Tag className={className}>{JSON.stringify(effective)}</Tag>
    } catch {
      return <>{fallback}</>
    }
  }

  return <Tag className={className}>{String(effective)}</Tag>
}
