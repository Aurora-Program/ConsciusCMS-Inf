import React from 'react'
import DSLLoader from './DSLLoader'

type Props = {
  action?: string
  payload?: any
  fallback?: React.ReactNode
  children?: React.ReactNode
}

// dsselect: wrapper to load/select a single page (by name/id)
export default function DSLSelect({ action = 'pages/selectPage', payload, fallback, children }: Props) {
  return (
    <DSLLoader action={action} payload={payload} fallback={fallback}>
      {children}
    </DSLLoader>
  )
}
