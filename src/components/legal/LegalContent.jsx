// div.container-policy-content body blocks (CLONE_SPEC_CONTENT.md §5)
function withLink({ text, link }) {
  if (!link) return text
  const [before, after] = text.split('{link}')
  return <>{before}<a href={link.href}>{link.text}</a>{after}</>
}

export default function LegalContent({ blocks }) {
  return blocks.map((b, i) => {
    if (b.t === 'h2') return <h2 key={i}>{b.text}</h2>
    if (b.t === 'list-head') return <p key={i} className="list-head">{b.text}</p>
    return <p key={i}>{withLink(b)}</p>
  })
}
