import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../hooks'
import { loadPages, selectPageAction } from '../Pages/pageSlice'

type LoaderProps = {
  fetchDetails?: boolean // if true, after loading pages also fetch each page's full data
  children: (items: any[], isLoading: boolean, error?: any) => React.ReactNode
  pageIds?: string[] // optional list of page ids to fetch instead of all pages
  onLoaded?: (items: any[]) => void
}

const Loader: React.FC<LoaderProps> = ({ fetchDetails = false, children, pageIds, onLoaded }) => {
  const dispatch = useAppDispatch()
  const [items, setItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const pagesPayload: any[] = await dispatch(loadPages()).unwrap()
        // pagesPayload is expected to be an array of { Page, Template }
        let ids: string[] = pageIds && pageIds.length > 0 ? pageIds : pagesPayload.map(p => p.Page)

        if (fetchDetails) {
          // fetch details for each id
          const promises = ids.map(id => dispatch(selectPageAction(id)).unwrap().then((r: any) => r.selectedPage || r).catch(err => ({ _error: err, id })))
          const results = await Promise.all(promises)
          if (!mounted) return
          setItems(results)
          if (onLoaded) onLoaded(results)
        } else {
          // return minimal page list
          const minimal = pageIds && pageIds.length > 0 ? ids.map(p => ({ Page: p })) : pagesPayload
          if (!mounted) return
          setItems(minimal)
          if (onLoaded) onLoaded(minimal)
        }
      } catch (err) {
        if (!mounted) return
        console.error('Loader error:', err)
        setError(err)
      } finally {
        if (!mounted) return
        setIsLoading(false)
      }
    }

    load()
    return () => { mounted = false }
  }, [dispatch, fetchDetails, pageIds, onLoaded])

  return <>{children(items, isLoading, error)}</>
}

export default Loader
