import React, { useState } from 'react'

type DownloadOptions = {
  filename?: string
  preview?: boolean // if true, open in new tab instead of forcing download
  onStarted?: () => void
  onComplete?: (url: string) => void
  onError?: (err: any) => void
}

export const getFileUrl = (path: string) => {
  const base = import.meta.env.VITE_CONTENT_BUCKET_URL || ''
  return base.endsWith('/') ? base + path : base + '/' + path
}

export async function downloadFile(path: string, options?: DownloadOptions) {
  const url = getFileUrl(path)
  try {
    options?.onStarted && options.onStarted()
    const res = await fetch(url, { method: 'GET' })
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
    const blob = await res.blob()
    const objectUrl = URL.createObjectURL(blob)
    if (options?.preview) {
      window.open(objectUrl, '_blank')
      options?.onComplete && options.onComplete(objectUrl)
      // revoke later
      setTimeout(() => URL.revokeObjectURL(objectUrl), 60 * 1000)
      return objectUrl
    }

    const a = document.createElement('a')
    a.href = objectUrl
    a.download = options?.filename || path.split('/').pop() || 'download'
    document.body.appendChild(a)
    a.click()
    a.remove()
    options?.onComplete && options.onComplete(objectUrl)
    // schedule revoke
    setTimeout(() => URL.revokeObjectURL(objectUrl), 60 * 1000)
    return objectUrl
  } catch (err) {
    options?.onError && options.onError(err)
    throw err
  }
}

type DownloadButtonProps = {
  path: string
  label?: string
  preview?: boolean
  className?: string
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ path, label, preview = false, className }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const handleClick = async () => {
    setLoading(true)
    setError(null)
    try {
      await downloadFile(path, {
        preview,
        onStarted: () => {},
        onComplete: () => setLoading(false),
        onError: (e) => setError(e)
      })
    } catch (err) {
      setError(err)
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'inline-block' }}>
      <button className={className || 'aurora-btn'} onClick={handleClick} disabled={loading}>
        {loading ? 'Descargando...' : (label || 'Descargar')}
      </button>
      {error ? <div style={{ color: 'red', marginTop: 6, fontSize: 12 }}>Error al descargar</div> : null}
    </div>
  )
}

export default DownloadButton
