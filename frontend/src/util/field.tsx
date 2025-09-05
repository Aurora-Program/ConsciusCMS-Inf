import React from 'react'
import { useAppSelector } from '../hooks'

type FieldProps = {
  name: string
  source?: 'values' | 'components'
  property?: string // property to extract from object values, e.g. 'text' or 'name'
  className?: string
  fallback?: React.ReactNode
  render?: (value: any) => React.ReactNode
  children?: ((value: any) => React.ReactNode) | React.ReactNode
  page?: any // optional page object to read from instead of redux selectedPage
  allowHtml?: boolean // if true, render HTML when value contains HTML tags
}

/**
 * Field component
 * - Reads the current selectedPage from redux and finds a field by name
 * - Supports sources: values (default) then components as fallback (or vice-versa)
 * - Allows render prop or children-as-function for custom rendering
 * - If found value is HTML and no render prop is provided, it will render as HTML
 *   (use with caution; sanitize at the source if necessary)
 */
const Field: React.FC<FieldProps> = ({ name, source, property, className, fallback = null, render, children, page, allowHtml = false }) => {
  const selectedPage = page ?? useAppSelector((s: any) => (s as any).pages?.selectedPage || {})

  const findIn = (list: any[]) => {
    if (!Array.isArray(list)) return undefined
    return list.find((item: any) => item && item.name && String(item.name).toLowerCase() === name.toLowerCase())
  }

  let found: any = undefined

  if (source === 'values') {
    found = findIn(selectedPage.values)
    if (!found) found = findIn(selectedPage.components)
  } else if (source === 'components') {
    found = findIn(selectedPage.components)
    if (!found) found = findIn(selectedPage.values)
  } else {
    // default: search values first then components
    found = findIn(selectedPage.values) || findIn(selectedPage.components)
  }

  if (!found) return <>{fallback}</>

  let value: any = undefined
  if (found.value === undefined) {
    // the object itself may carry the value under different keys
    value = found
  } else if (property) {
    value = found.value?.[property]
  } else if (typeof found.value === 'object') {
    // try common properties
    value = found.value.text ?? found.value.name ?? found.value.html ?? found.value
  } else {
    value = found.value
  }

  // Allow custom render function
  if (render) return <>{render(value)}</>

  // children as function
  if (typeof children === 'function') {
    return <>{(children as (v: any) => React.ReactNode)(value)}</>
  }

  // Default rendering: return plain text by default
  if (typeof children === 'function') {
    return <>{(children as (v: any) => React.ReactNode)(value)}</>
  }

  if (typeof children !== 'function' && children) {
    return <>{children}</>
  }

  if (typeof value === 'string' && allowHtml && value.includes('<') && value.includes('>')) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: value }} />
  }

  // Return plain text node (or fallback)
  return <>{(value ?? fallback) as any}</>
}

export default Field
