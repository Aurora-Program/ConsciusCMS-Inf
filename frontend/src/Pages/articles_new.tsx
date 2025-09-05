import { useState, useEffect } from 'react'
import './articles.css'
import '../App.css'
import { useAppDispatch, useAppSelector } from '../hooks.js'
import { loadPages } from './pageSlice.js'
import { Link } from 'react-router-dom'
import { useT } from '../util/useTranslation'

function Articles() {
    const dispatch = useAppDispatch()
    const pages = useAppSelector(state => (state as any).pages?.pages || [])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const t = useT()

    const visitCount = localStorage.getItem('value') ? Number(localStorage.getItem('value')) : 0;

    useEffect(() => { 
        localStorage.setItem('value', String(visitCount + 1)) 
    }, [visitCount])

    useEffect(() => { 
        dispatch(loadPages())
        // Simulate loading delay for better UX
        setTimeout(() => setIsLoading(false), 1200)
    }, [dispatch])

    const articlePages = pages.filter((page: any) => page.Template === "Article")
    
    // Filter articles based on search and category
    const filteredArticles = articlePages.filter((article: any) => {
        const matchesSearch = article.Page.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (article.Title && article.Title.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (article.Content && article.Content.toLowerCase().includes(searchTerm.toLowerCase()))
        const matchesCategory = selectedCategory === 'all' || 
            (article.Category && article.Category.toLowerCase() === selectedCategory.toLowerCase())
        return matchesSearch && matchesCategory
    })

    // Get unique categories
    const categories = ['all', ...new Set(articlePages.map((article: any) => 
        article.Category || 'general'
    ))]

    // Function to get reading time estimate
    const getReadingTime = (content: string = '') => {
        const wordsPerMinute = 200
        const wordCount = content.split(' ').length
        return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
    }

    // Function to get article excerpt
    const getExcerpt = (content: string = '', maxLength: number = 150) => {
        if (content.length <= maxLength) return content
        return content.substring(0, maxLength).trim() + '...'
    }

    if (isLoading) {
        return (
            <div className="aurora-articles-container">
                <div className="aurora-articles-loading">
                    <div className="aurora-loading-spinner"></div>
                    <p className="aurora-loading-text">{t('articles.loading')}</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="aurora-articles-container">
                {/* Hero Header */}
                <header className="aurora-articles-hero">
                    <div className="aurora-container">
                        <div className="aurora-articles-hero-content">
                            <h1 className="aurora-title-main">
                                <i className="fas fa-newspaper aurora-icon-accent"></i>
                                {t('articles.title')}
                            </h1>
                            <p className="aurora-subtitle">
                                {t('articles.subtitle')}
                            </p>
                            
                            {/* Search and Filter Controls */}
                            <div className="aurora-articles-controls">
                                <div className="aurora-search-box">
                                    <i className="fas fa-search"></i>
                                    <input
                                        type="text"
                                        placeholder={t('articles.searchPlaceholder')}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="aurora-search-input"
                                    />
                                </div>
                                
                                <div className="aurora-filter-box">
                                    <i className="fas fa-filter"></i>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="aurora-filter-select"
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>
                                                {t(`articles.categories.${category}`)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Articles Content */}
                <main className="aurora-articles-main">
                    <div className="aurora-container">
                        {filteredArticles.length === 0 ? (
                            <div className="aurora-articles-empty">
                                <div className="aurora-empty-icon">
                                    <i className="fas fa-newspaper"></i>
                                </div>
                                <h2 className="aurora-empty-title">
                                    {searchTerm ? t('articles.noResults') : t('articles.noArticles')}
                                </h2>
                                <p className="aurora-empty-message">
                                    {searchTerm 
                                        ? t('articles.tryDifferentSearch')
                                        : t('articles.comingSoon')
                                    }
                                </p>
                                {searchTerm && (
                                    <button 
                                        onClick={() => setSearchTerm('')}
                                        className="aurora-btn outline"
                                    >
                                        {t('articles.clearSearch')}
                                    </button>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className="aurora-articles-stats">
                                    <p className="aurora-results-count">
                                        {t('articles.showingResults', { 
                                            count: filteredArticles.length,
                                            total: articlePages.length 
                                        })}
                                    </p>
                                </div>
                                
                                <div className="aurora-articles-grid">
                                    {filteredArticles.map((article: any, index: number) => (
                                        <article key={article.Page || index} className="aurora-article-card">
                                            <div className="aurora-article-header">
                                                <div className="aurora-article-meta">
                                                    <div className="aurora-article-date">
                                                        <i className="fas fa-calendar-alt"></i>
                                                        <time dateTime={article.Created || new Date().toISOString()}>
                                                            {new Date(article.Created || Date.now()).toLocaleDateString()}
                                                        </time>
                                                    </div>
                                                    <span className="aurora-article-category">
                                                        <i className="fas fa-tag"></i>
                                                        {article.Category || 'General'}
                                                    </span>
                                                    <div className="aurora-article-reading-time">
                                                        <i className="fas fa-clock"></i>
                                                        {getReadingTime(article.Content)} min read
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="aurora-article-content">
                                                <Link 
                                                    to={`/article/${article.Page}`} 
                                                    className="aurora-article-title-link"
                                                >
                                                    <h2 className="aurora-article-title">
                                                        {article.Title || 
                                                         article.Page.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) || 
                                                         t('articles.untitledArticle')}
                                                    </h2>
                                                </Link>

                                                <p className="aurora-article-excerpt">
                                                    {getExcerpt(
                                                        article.Excerpt || 
                                                        article.Content || 
                                                        t('articles.defaultExcerpt')
                                                    )}
                                                </p>

                                                <div className="aurora-article-tags">
                                                    {article.Tags && article.Tags.split(',').map((tag: string, tagIndex: number) => (
                                                        <span key={tagIndex} className="aurora-tag">
                                                            #{tag.trim()}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="aurora-article-footer">
                                                <Link 
                                                    to={`/article/${article.Page}`} 
                                                    className="aurora-btn primary aurora-article-read-more"
                                                >
                                                    <span>{t('articles.readMore')}</span>
                                                    <i className="fas fa-arrow-right"></i>
                                                </Link>
                                                
                                                <div className="aurora-article-author">
                                                    <i className="fas fa-user-circle"></i>
                                                    <span>{article.Author || 'Aurora Team'}</span>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Call to Action */}
                        <section className="aurora-featured-section">
                            <div className="aurora-featured-content">
                                <h2 className="aurora-featured-title">
                                    <i className="fas fa-bell aurora-icon-accent"></i>
                                    {t('articles.stayUpdated')}
                                </h2>
                                <p className="aurora-featured-subtitle">
                                    {t('articles.joinCommunity')}
                                </p>
                                <div className="aurora-featured-actions">
                                    <Link to="/message" className="aurora-btn primary large">
                                        <i className="fas fa-envelope"></i>
                                        <span>{t('articles.contactUs')}</span>
                                    </Link>
                                    <Link to="/plataformas" className="aurora-btn secondary large">
                                        <i className="fas fa-rocket"></i>
                                        <span>{t('articles.explorePlatforms')}</span>
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Articles
