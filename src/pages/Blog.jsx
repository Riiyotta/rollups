import { useState } from 'react'
import BlogCard from '../components/blog/BlogCard'
import usePageMeta from '../components/blog/usePageMeta'
import { articles, blogIndexMeta } from '../data/articles'
import '../styles/blog.css'

// "All" followed by the distinct categories, alphabetical (CLONE_SPEC_CONTENT.md §3.2)
const FILTERS = ['All', ...[...new Set(articles.map((a) => a.category))].sort()]

export default function Blog() {
  usePageMeta(blogIndexMeta.metaTitle, blogIndexMeta.metaDescription)
  const [filter, setFilter] = useState('All')
  const posts = filter === 'All' ? articles : articles.filter((a) => a.category === filter)

  return (
    <>
      <section className="section blog-header">
        <div className="container">
          <div className="blog-header-container">
            <div className="blog-header-content">
              <h1 className="heading">Blog</h1>
              <p className="description">The latest on how companies are taking control of their equity.</p>
            </div>
            <div className="blog-filter">
              <div className="blog-filter-pills">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    type="button"
                    className={`blog-filter-pill${filter === f ? ' active' : ''}`}
                    onClick={() => setFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section blog-list-section">
        <div className="container">
          <div className="blog-list">
            {posts.map((p) => <BlogCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>
    </>
  )
}
