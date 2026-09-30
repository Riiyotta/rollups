// article.blog-post-card (CLONE_SPEC_CONTENT.md §3.1, §3.3)
export default function BlogCard({ post }) {
  return (
    <article className="blog-post-card">
      <a className="blog-post-link" href={`/blog/${post.slug}`}>
        <div className="blog-post-image"><img src={post.cover} alt={post.title} /></div>
        <div className="blog-post-thumb-content">
          <h2 className="blog-post-title">{post.title}</h2>
          <p className="blog-post-description">{post.excerpt}</p>
          <div className="blog-post-meta">
            <span className="blog-post-meta-element blog-post-author">{post.author}</span>
            <span className="blog-post-meta-element blog-post-date">{post.date}</span>
            <span className="blog-post-meta-element blog-post-category">{post.category}</span>
            <span className="blog-post-meta-element blog-post-reading-time">{post.readingTime}</span>
          </div>
        </div>
      </a>
    </article>
  )
}
