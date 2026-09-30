import { useParams } from 'react-router-dom'
import ArticleBody from '../components/blog/ArticleBody'
import ArticleMeta from '../components/blog/ArticleMeta'
import usePageMeta from '../components/blog/usePageMeta'
import { getArticle } from '../data/articles'
import '../styles/blog.css'

// Article template (CLONE_SPEC_CONTENT.md §4)
export default function BlogPost() {
  const { slug } = useParams()
  const article = getArticle(slug)
  usePageMeta(article ? article.metaTitle : 'Rollups | Blog', article?.metaDescription)

  return (
    <section className="section">
      <div className="container">
        <div className="blog-post-layout">
          {article && (
            <aside className="blog-post-sidebar">
              <div className="blog-post-sidebar-content">
                <div className="blog-nav-section">
                  <a className="blog-nav-link" href="/blog">
                    <span className="blog-nav-icon">←</span>
                    <span className="blog-nav-text">Blog</span>
                  </a>
                </div>
                <ArticleMeta article={article} direction="column" />
              </div>
            </aside>
          )}
          <main className="blog-post-main">
            {article ? (
              <>
                <header className="blog-post-header-wrapper">
                  <div className="blog-post-header-content">
                    <h1 className="heading">{article.title}</h1>
                    <p className="description">{article.excerpt}</p>
                  </div>
                  <div className="blog-post-header-image"><img src={article.cover} alt={article.title} /></div>
                </header>
                <article className="blog-post-content-wrapper">
                  <ArticleBody article={article} />
                  <div className="blog-post-content-mobile-meta-wrapper">
                    <ArticleMeta article={article} direction="row" />
                  </div>
                  <div className="blog-post-navigation">
                    <a className="back-to-blog" href="/blog">← Back to Blog</a>
                  </div>
                </article>
              </>
            ) : (
              <>
                <header className="blog-post-header-wrapper">
                  <div className="blog-post-header-content">
                    <h1 className="heading">Post not found</h1>
                    <p className="description">This article does not exist or may have been moved.</p>
                  </div>
                </header>
                <article className="blog-post-content-wrapper">
                  <div className="blog-post-navigation">
                    <a className="back-to-blog" href="/blog">← Back to Blog</a>
                  </div>
                </article>
              </>
            )}
          </main>
        </div>
      </div>
    </section>
  )
}
