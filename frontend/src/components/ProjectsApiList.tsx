import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useT } from '../util/useTranslation'

type ApiItem = {
  Template?: string
  Page?: string
  updateUser?: string
  updateTime?: string
}

type Props = {
  items?: ApiItem[]
}

export default function ProjectsApiList({ items = [] }: Props) {
  const t = useT()
  const list = useMemo(() => items || [], [items])

  if (!list.length) return <p className="aurora-empty-message">{t('projects.noProjects') || 'No hay proyectos disponibles'}</p>

  return (
    <div className="aurora-grid" role="list">
      {list.map((it: ApiItem, idx: number) => {
        const title = it.Page || 'Untitled'
        const template = it.Template || 'Unknown'
        const slug = encodeURIComponent(String(it.Page || title))
        let formattedDate = ''
        try { formattedDate = it.updateTime ? new Date(it.updateTime).toLocaleString() : '' } catch (e) { formattedDate = it.updateTime || '' }

        return (
          <article
            key={idx}
            className="aurora-card"
            role="listitem"
            data-dsl={`Projects/Item`}
            data-template={template}
            aria-label={`${title} — ${template}`}
          >
            <header>
              <h3 className="aurora-card-title">{title}</h3>
              <p className="aurora-card-subtitle">{template}</p>
            </header>

            <section className="aurora-card-body">
              <p className="aurora-meta">{it.updateUser} {formattedDate ? `• ${formattedDate}` : ''}</p>
            </section>

            <footer className="aurora-card-actions">
              <Link to={`/project/${slug}`} className="aurora-btn primary" aria-label={`${t('projects.view') || 'Ver proyecto'} ${title}`}>
                {t('projects.view') || 'Ver proyecto'}
              </Link>
            </footer>
          </article>
        )
      })}
    </div>
  )
}
