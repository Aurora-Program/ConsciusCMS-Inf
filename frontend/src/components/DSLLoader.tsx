import React, { PropsWithChildren, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import registry from './reduxRegistry'

type DSLLoaderProps = PropsWithChildren<{
  action: string
  payload?: any
  fallback?: React.ReactNode
  error?: React.ReactNode
}>

export default function DSLLoader({ action, payload, fallback = 'Cargando…', error = 'Error', children }: DSLLoaderProps) {
  const dispatch = useAppDispatch()

  const resolved = registry.resolveAction(action)
  // Very small status detection: try to read statusById from slice if pattern 'slice/action'
  const parts = action.split('/')
  const primary = parts[0]

  // Some slices are named differently than the action prefix (e.g. pageSlice name is 'editor').
  // Try the action prefix first, then fall back to known slice names.
  const candidateSlices = [primary, 'editor', 'pages']

  const status = useAppSelector((s: any) => {
    for (const sl of candidateSlices) {
      if (s[sl] && s[sl].statusById && payload !== undefined) {
        return s[sl].statusById?.[payload] ?? 'idle'
      }
    }
    return 'succeeded'
  })

  // Keep a ref of the last dispatched payload per resolved function to avoid repeated dispatch loops
  const lastDispatched = useRef<any>(undefined)

  useEffect(() => {
    if (!resolved) return
    // If payload hasn't changed since last dispatch for this loader, skip
    if (lastDispatched.current === payload) return

    const run = async () => {
      try {
        await (dispatch(resolved(payload)) as any)
        lastDispatched.current = payload
      } catch (e) {
        // swallow errors here; slice reducers should surface status
      }
    }

    run()
  }, [resolved, payload, dispatch])

  if (status === 'loading' || status === 'idle') return <>{fallback}</>
  if (status === 'failed') return <>{error}</>
  return <>{children}</>
}
