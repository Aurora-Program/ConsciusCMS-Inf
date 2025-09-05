// Small registry that maps action strings to thunks and provides slice adapters
import { loadPages, selectPageAction } from '../Pages/pageSlice'

const actionMap: Record<string, any> = {
  'pages/loadPages': loadPages,
  'pages/selectPage': selectPageAction,
}

export function resolveAction(name: string) {
  return actionMap[name]
}

export function hasAction(name: string) {
  return Boolean(actionMap[name])
}

// Simple slice adapters for reading values; extend as needed
export function selectFieldFromSlice(state: any, slice: string, id: string | undefined, field: string) {
  if (!state) return undefined
  // Try candidate slices: the project store sometimes uses 'editor' as the slice name
  const candidates = [slice, 'editor', 'pages']
  for (const sl of candidates) {
    const sel = state[sl]?.selectedPage
    if (!sel) continue
    const doc = sel && (!id || sel.Page === id) ? sel : (state[sl]?.selectedPage || null)
    if (!doc) continue
    const normalize = (s: string) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '')
    const lev = (a: string, b: string) => {
      // simple Levenshtein
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
    const findIn = (list: any[]) => {
      if (!Array.isArray(list)) return undefined
      const target = normalize(field)
      // prefer exact matches first
      const exact = list.find((it: any) => it && it.name && normalize(it.name) === target)
      const cand = exact || list.find((it: any) => it && it.name && (normalize(it.name).includes(target) || target.includes(normalize(it.name)) || lev(normalize(it.name), target) <= 2))
      if (!cand) return undefined
      const found = cand
      if (found.value === undefined) return found
      if (typeof found.value === 'object') return found.value.text ?? found.value.name ?? JSON.stringify(found.value)
      return found.value
    }
    return findIn(doc.values) ?? findIn(doc.components)
  }

  // default: byId pattern
  // default: byId pattern across candidate slices
  for (const sl of [slice, 'editor', 'pages']) {
    if (state[sl] && state[sl].byId) {
      const entry = state[sl].byId?.[id as any]
      if (entry) return entry[field]
    }
  }
  return undefined
}

export default { resolveAction, hasAction, selectFieldFromSlice }
