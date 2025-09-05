import { useState, useEffect } from 'react'
import '../App.css'
import { useAppDispatch, useAppSelector } from '../hooks.js'
import { selectPageAction } from './pageSlice.js'
import { useParams } from 'react-router-dom'

function Manifest() {
    const dispatch = useAppDispatch()
    const data = useAppSelector(state => state.pages.data)
    const t = localStorage.getItem('value') ? Number(localStorage.getItem('value')) : 0
    const { id } = useParams()
    const [language, setLanguage] = useState(localStorage.getItem('language') ?? "EN")

    useEffect(() => {
        localStorage.setItem('value', String(t + 1))
    }, [t])
      
    useEffect(() => { 
        dispatch(selectPageAction(id))
    }, [dispatch, id])

    // Get content from data
    const title = data.find(item => item.component === "Manifest/Title")?.value["text"] || "Aurora Program Manifest"
    const content = data.find(item => item.name === "Content")?.value["text"] || ""
    const author = data.find(item => item.component === "Article/Author")?.value["value"] || "Aurora Program"

    return (
        <div className="aurora-page-container">
            {/* Hero Section with standardized structure */}
            <header className="aurora-hero">
                <div className="aurora-hero-content">
                    <h1 className="aurora-hero-title--page">
                        <i className="fas fa-scroll aurora-icon-accent"></i>
                        {title}
                    </h1>
                    <p className="aurora-hero-subtitle">
                        Una declaración de nuestros principios y visión
                    </p>
                    <div className="aurora-hero-description">
                        <span className="aurora-tag">
                            <i className="fas fa-user"></i>
                            {author}
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main>
                <div className="aurora-container">
                    <article className="aurora-section">
                        <div className="aurora-card u-max-w-lg u-mx-auto">
                            <div className="aurora-content" 
                                 dangerouslySetInnerHTML={{ __html: content }} />
                        </div>
                    </article>
                </div>
            </main>

            {/* Footer */}
            <footer className="aurora-section u-bg-subtle">
                <div className="aurora-container">
                    <div className="u-text-center u-py-3">
                        <p className="u-text-muted">
                            &copy; 2025 <strong>{author}</strong>. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Manifest
