import React from 'react'
import DSLLoader from './DSLLoader'

type Props = {
  action?: string
  payload?: any
  template?: string | RegExp
  fallback?: React.ReactNode
  children?: React.ReactNode
}

// dsloadlist: wrapper specialized to load pages lists
export default function DSLLoadList({ action = 'pages/loadPages', payload, template, fallback, children }: Props) {
  // If a template is provided, forward it as the payload so the thunk can use it
  const effectivePayload = template ?? payload
  return (
    <DSLLoader action={action} payload={effectivePayload} fallback={fallback}>
      {children}
    </DSLLoader>
  )
}
