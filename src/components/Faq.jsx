import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import '../styles/bottom.css'

const linkStyle = { color: 'inherit', textDecoration: 'underline' }

// Copy verbatim from spec §7
const HOME_ITEMS = [
  {
    q: 'What’s the difference between Rollups and Roll Up Vehicles® (RUVs)?',
    a: 'Rollups is the name of our company. Our products “rollup” companies’ stakeholders when raising capital and when consolidating existing stakeholders. When raising capital, companies use Roll Up Vehicles® (RUVs). When consolidating existing investors, it’s called a Consolidation Vehicle.',
  },
  {
    q: "What is Rollups.com's relationship with AngelList?",
    a: 'Rollups is part of AngelList’s ecosystem of brands. AngelList.com is for VCs and investors. Rollups serves companies. Our products for fundraising and consolidating stakeholders benefit from AngelList’s core infrastructure. Your investors and stakeholders likely already have AngelList accounts, and they can use them with Rollups without any additional effort.',
  },
  {
    q: 'Can I use Rollups with my existing cap table software?',
    a: 'Yes. All of Rollups’ products work with any cap table solution.',
  },
  {
    q: 'I have questions about Roll Up Vehicles for fundraising',
    a: <>Learn more about RUVs <a style={linkStyle} href="/ruv#faq">here</a>.</>,
  },
  {
    q: 'I have questions about Consolidation Vehicles for my existing stakeholders',
    a: <>Learn more about CVs <a style={linkStyle} href="/consolidate#faq">here</a>.</>,
  },
]

function animateOpen(el) {
  gsap.killTweensOf(el)
  gsap.fromTo(el,
    { height: 0, opacity: 0, filter: 'blur(5px)' },
    { height: el.scrollHeight, opacity: 1, filter: 'blur(0px)', duration: 0.25, ease: 'power2.out', onComplete: () => gsap.set(el, { height: 'auto' }) })
}

function animateClose(el) {
  gsap.killTweensOf(el)
  gsap.fromTo(el,
    { height: el.offsetHeight },
    { height: 0, opacity: 0, filter: 'blur(5px)', duration: 0.25, ease: 'power2.out' })
}

// title / items default to the homepage FAQ; items = [{ q, a }] where a is a string or JSX.
// Item 0 is open by default; the "Ask anything else" assistant block is identical on every page.
export default function Faq({ title = 'Everything You Need to Know', items = HOME_ITEMS, revealWrapper = false }) {
  const [open, setOpen] = useState(() => new Set([0]))
  const [question, setQuestion] = useState('')
  const answers = useRef([])
  const openRef = useRef(open) // source of truth for rapid successive toggles (avoids a stale `open` closure)

  // Item 0 animates open on mount
  useLayoutEffect(() => {
    const el = answers.current[0]
    animateOpen(el)
    return () => gsap.killTweensOf(el)
  }, [])

  const toggle = (i) => {
    const el = answers.current[i]
    const next = new Set(openRef.current)
    if (next.has(i)) { next.delete(i); animateClose(el) } else { next.add(i); animateOpen(el) }
    openRef.current = next
    setOpen(next)
  }

  // The AI assistant backend is out of scope: submit is a no-op
  const onSubmit = (e) => e.preventDefault()

  return (
    <section className="section">
      <div className="container with-top-padding">
        <div className="heading-wrapper with-padding">
          <h2 className="heading animation-text faq">{title}</h2>
        </div>
        <div className={`faq-wrapper with-y-padding${revealWrapper ? ' animation-item' : ''}`}>
          <div className="faq-list-wrapper">
            <ul role="list" className="faq-list">
              {items.map((item, i) => {
                const isOpen = open.has(i)
                const o = isOpen ? ' open' : ''
                const id = `faq-a-${i}`
                return (
                  <li key={i} role="listitem" className={`faq-list-item animation-item${o}`}>
                    <button type="button" className="faq-q" aria-expanded={isOpen} aria-controls={id} onClick={() => toggle(i)}>
                      <div className="faq-q-text-wrapper"><div className="text-reg">{item.q}</div></div>
                      <div className={`faq-icon${o}`}>
                        <div className={`faq-icon-line line-1${o}`} />
                        <div className={`faq-icon-line line-2${o}`} />
                      </div>
                    </button>
                    <div id={id} ref={(el) => (answers.current[i] = el)} className={`faq-a${o}`} inert={isOpen ? undefined : ''}>
                      <div className="faq-rich-text"><div className="w-richtext">{item.a}</div></div>
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className="faq-assistant">
              <form className="faq-assistant-form" onSubmit={onSubmit}>
                <input aria-label="Ask a question about Rollups" placeholder="Ask anything else" maxLength={2000} value={question} onChange={(e) => setQuestion(e.target.value)} />
                <button type="submit" aria-label="Ask question" disabled={!question.trim()}>
                  <span aria-hidden="true">→</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
