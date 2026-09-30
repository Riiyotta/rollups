import { createWriter, split } from './placeholder'

// Renders an article outline (src/data/articles.js) as .blog-post-content with placeholder copy.
// Block shapes follow CLONE_SPEC_CONTENT.md §4.3/§4.4/§4.7.

// Inline paragraph content: links (2-word anchors), bold spans, <br> breaks, all placed evenly.
function inline(words, { l = 0, s = 0, br = 0, bo = 0 }, w) {
  if (bo) return <strong>{words.join(' ')}</strong>
  const n = words.length
  const spans = []
  const extraStrong = Math.max(0, s - l)
  const len = n >= 4 ? 2 : 1
  if (l === 0 && s > 0) {
    // bold lead-in at the start of the paragraph
    spans.push({ start: 0, len: Math.min(3, n), strong: true, link: false })
  } else {
    const total = l + extraStrong
    for (let i = 0; i < total; i += 1) {
      const start = Math.min(n - len, Math.floor((i * n) / total))
      spans.push({ start, len, link: i < l, strong: i < l ? i < s : true })
    }
  }
  const breaks = new Set()
  for (let k = 1; k <= br; k += 1) breaks.add(Math.floor((k * n) / (br + 1)))

  const nodes = []
  let i = 0
  let buf = []
  const flush = () => {
    if (buf.length) nodes.push(buf.join(' ') + ' ')
    buf = []
  }
  while (i < n) {
    if (breaks.has(i) && i > 0) {
      flush()
      nodes.push(<br key={`br${i}`} />)
    }
    const sp = spans.find((x) => x.start === i)
    if (sp) {
      flush()
      const txt = words.slice(i, i + sp.len).join(' ')
      let node = sp.link ? <a href={w.href()}>{txt}</a> : txt
      if (sp.strong) node = <strong>{node}</strong>
      nodes.push(<span key={`s${i}`}>{node}{i + sp.len < n ? ' ' : ''}</span>)
      i += sp.len
    } else {
      buf.push(words[i])
      i += 1
    }
  }
  if (buf.length) nodes.push(buf.join(' '))
  return nodes
}

function listItem(count, idx, opts, w, nestedTag) {
  const { bold = 0, l = 0, nest = false } = opts
  const isBold = idx < bold
  const isLink = idx < l
  if (isBold && isLink) {
    const lead = w.words(count)
    return <strong><a href={w.href()}>{lead.join(' ').replace(/\.$/, '')}</a></strong>
  }
  let lead = null
  let rest = count
  if (isBold) {
    lead = w.leadIn(idx)
    rest = Math.max(1, count - lead.split(' ').length)
  }
  let nested = null
  if (nest) {
    const [head, ...tail] = split(rest, 3)
    rest = head
    const NTag = nestedTag
    nested = (
      <NTag>
        {tail.map((n, j) => <li key={j}>{w.text(n)}</li>)}
      </NTag>
    )
  }
  const words = w.words(rest)
  return (
    <>
      {lead && <><strong>{lead}</strong>{' '}</>}
      {isLink ? inline(words, { l: 1 }, w) : words.join(' ')}
      {nested}
    </>
  )
}

function List({ b, w }) {
  const Tag = b.t === 'ol' ? 'ol' : 'ul'
  // nested sub-lists go on the longest items
  const nestIdx = new Set(
    b.items.map((c, i) => [c, i]).sort((a, z) => z[0] - a[0]).slice(0, b.nested || 0).map((x) => x[1])
  )
  return (
    <Tag>
      {b.items.map((count, i) => (
        <li key={i}>{listItem(count, i, { bold: b.bold, l: b.l, nest: nestIdx.has(i) }, w, 'ul')}</li>
      ))}
    </Tag>
  )
}

// ul.process-list: bold step title + nested counter <ol> (3 sub-steps each; see handoff gap note)
function ProcessList({ b, w }) {
  return (
    <ul className="process-list">
      {b.items.map((count, i) => {
        const title = `Step ${i + 1}: ${w.leadIn(i).replace(':', '')}`
        const subs = split(Math.max(3, count - 3), 3)
        return (
          <li key={i}>
            <strong>{title}</strong>
            <ol>
              {subs.map((n, j) => <li key={j}>{w.text(n)}</li>)}
            </ol>
          </li>
        )
      })}
    </ul>
  )
}

function Highlights({ b, w, caseStudy }) {
  return (
    <div className="highlights-box">
      <h2>{b.h}</h2>
      <ul>
        {b.items.map((count, i) => (
          <li key={i}>
            {caseStudy && i === 0
              ? `Stage: Placeholder | Market: Placeholder | Description: ${w.text(Math.max(2, count - 6))}`
              : w.text(count)}
          </li>
        ))}
      </ul>
    </div>
  )
}

const quoteText = (w, n) => `“${w.text(n)}”`
function quoteAuthor(n) {
  const extra = ['and', 'Example', 'Role', 'at', 'Sample', 'Organisation', 'Placeholder', 'Team', 'Group', 'Region']
  const mid = extra.slice(0, Math.max(0, n - 6)).join(' ')
  return `— Placeholder Name, Title${mid ? ' ' + mid : ''} of Company`
}

function Table({ b, w }) {
  const perCell = Math.max(2, Math.round((b.w - b.rows * 2) / (b.rows * (b.headers.length - 1))))
  return (
    <div className="table-responsive">
      <table>
        <thead>
          <tr>{b.headers.map((h) => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {Array.from({ length: b.rows }, (_, r) => (
            <tr key={r}>
              <td>{`Option ${r + 1}`}</td>
              {b.headers.slice(1).map((h) => <td key={h}>{w.text(perCell)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function renderBlocks(blocks, article, w, inFaq) {
  let topic = null
  return blocks.map((b, i) => {
    switch (b.t) {
      case 'h2':
      case 'h3': {
        const isQuestion = inFaq && b.t === 'h2' && i > 0
        topic = inFaq ? null : b.text
        if (isQuestion) topic = null
        return b.t === 'h2' ? <h2 key={i}>{b.text}</h2> : <h3 key={i}><strong>{b.text}</strong></h3>
      }
      case 'p': {
        const words = w.words(b.w, topic && b.w >= 10 ? topic : null)
        topic = null
        return <p key={i}>{inline(words, b, w)}</p>
      }
      case 'hr':
        return <hr key={i} />
      case 'hl':
        return <Highlights key={i} b={b} w={w} caseStudy={article.slug.startsWith('case-study')} />
      case 'ul':
      case 'ol':
        topic = null
        return <List key={i} b={b} w={w} />
      case 'process':
        return <ProcessList key={i} b={b} w={w} />
      case 'quote':
        return <p key={i} className="quote-text">{quoteText(w, b.w)}</p>
      case 'author':
        return <p key={i} className="quote-author">{quoteAuthor(b.w)}</p>
      case 'bq':
        return (
          <blockquote key={i}>
            <p className="quote-text">{quoteText(w, Math.max(4, b.w - 6))}</p>
            <p className="quote-author">{quoteAuthor(6)}</p>
          </blockquote>
        )
      case 'table':
        return <Table key={i} b={b} w={w} />
      default:
        return null
    }
  })
}

export default function ArticleBody({ article }) {
  const w = createWriter()
  const { blocks, faqStart } = article
  const body = faqStart == null ? blocks : blocks.slice(0, faqStart)
  const faq = faqStart == null ? [] : blocks.slice(faqStart)
  return (
    <div className="blog-post-content">
      {renderBlocks(body, article, w, false)}
      {faq.length > 0 && <div className="faq-section">{renderBlocks(faq, article, w, true)}</div>}
    </div>
  )
}
