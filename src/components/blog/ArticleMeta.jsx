// div.blog-post-article-meta (CLONE_SPEC_CONTENT.md §4.5).
// direction="column": sidebar (>=1201). direction="row": mobile meta grid (<1200).
// Both variants render .blog-meta-section and .blog-meta-section-cell; CSS hides the one not used.
export default function ArticleMeta({ article, direction }) {
  // the reading time is authored uppercase and lowercased by CSS on the original
  const reading = article.readingTime.toUpperCase()
  return (
    <div className={`blog-post-article-meta direction-${direction}`}>
      <div className="blog-category-section">
        <div className="blog-category-label">CATEGORY</div>
        <div className="blog-category-name">{article.category}</div>
      </div>
      <div className="blog-author-section">
        <div className="blog-author-label">WRITTEN BY</div>
        <div className="blog-author-info">
          <div className="blog-author-image"><img src={article.authorImage} alt={article.author} /></div>
          <div className="blog-author-details">
            <div className="blog-author-name">{article.author}</div>
            {article.authorTitle && <div className="blog-author-title">{article.authorTitle}</div>}
          </div>
        </div>
      </div>
      <div className="blog-meta-section">
        <div className="blog-publish-date">{article.date}</div>
        <div className="blog-reading-time">{reading}</div>
      </div>
      <div className="blog-meta-section-cell">
        <div className="blog-publish-date">{article.date}</div>
      </div>
      <div className="blog-meta-section-cell">
        <div className="blog-reading-time">{reading}</div>
      </div>
    </div>
  )
}
