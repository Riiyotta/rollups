import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import LearnMore from '../ui/LearnMore'
import useMaxWidth from './useMaxWidth'
import '../../styles/products.css'

// ActionCard markup as used inside use cases: empty label row, no action list, no testimonial modal.
// (The homepage inaction/ActionCard requires list + testimonial, so the same markup is rendered here.)
function UseCaseCard({ card, isMobile }) {
  const img = isMobile && card.mobileImage ? card.mobileImage : card.image
  const ilu = (
    <div className="action-card-ilu-wrapper">
      <img
        alt={card.title}
        width={img.w}
        height={img.h}
        decoding="async"
        className="action-card-content-ilu animation-item"
        src={img.src}
      />
    </div>
  )
  return (
    <div className="action-card">
      {!isMobile && ilu}
      <div className="action-card-content-wrapper">
        <div className="action-card-header">
          <div className="action-card-header-name">
            <p className="text-reg-mono text-allcaps light-300 animation-text" />
          </div>
          <div className="action-card-header-title">
            <p className="text-book animation-text book text-light-200">{card.title}</p>
          </div>
          <div className="action-card-header-description">
            <p className="text-reg animation-text text-light-200">{card.description}</p>
          </div>
        </div>
        <div className="action-card-content">
          <LearnMore href={card.href} className="animation-item">LEARN MORE</LearnMore>
        </div>
        {isMobile && ilu}
      </div>
    </div>
  )
}

function HowItWorks({ steps }) {
  return (
    <div className="how-it-works-wrapper">
      <div className="how-it-works-content">
        <div className="how-it-works-header">
          <div className="text-reg-mono text-allcaps text-light-300 animation-text">How it works</div>
        </div>
        <div className="how-it-works-steps">
          {steps.map((s, i) => (
            <div key={i} className="how-it-works-step animation-text">
              <div className="how-it-works-step-title">
                <p className="text-reg-mono text-light-100">{s.day ? `DAY ${s.day}` : 'TODAY'}</p>
                <h2 className="text-book">{s.title}</h2>
              </div>
              <div className="how-it-works-step-content">
                <div className="vertical-line" />
                <div className="how-it-works-step-items">
                  {s.items.map((item, j) => <p key={j} className="text-reg text-light-200">{item}</p>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Split-card right column stat.
 * - logo: node for the 28px logo row; logoAnimated adds .animation-item to it
 * - number, text: stat value and caption (text may contain JSX, e.g. <br/>)
 * - link: optional { label, href } LinkWithArrow
 */
export function UseCaseStat({ logo, logoAnimated = false, number, text, link }) {
  return (
    <div className="split-card-right-component">
      <div className={`split-card-right-component-logo${logoAnimated ? ' animation-item' : ''}`}>{logo}</div>
      <div className="split-card-right-component-content">
        <p className="text-number">{number}</p>
        <h2 className="text-reg text-light-100">{text}</h2>
      </div>
      {link && <LearnMore href={link.href}>{link.label}</LearnMore>}
    </div>
  )
}

function SidebarItem({ item, index, current, single, onSelect, liRef }) {
  return (
    <li ref={liRef} className={`animation-item${current ? ' sidebar-item-current' : ''}`}>
      {single ? <a /> : (
        <a href={`#${item.id}`} onClick={(e) => onSelect(e, item.id)}>
          <p className="text-reg-mono text-allcaps light-300">USE CASE {index + 1}</p>
          <p className="text-reg text-light">{item.tab}</p>
        </a>
      )}
    </li>
  )
}

/**
 * section.use-cases-section (spec 1.3 / 3.2 / 5.3). One use case visible at a time.
 * - title / description: header h2 + p
 * - items: [{ id, tab, cards: [card], steps?: [{ day?, title, items: [node] }], stat?: node }]
 *   card = { title, description, image: { src, w, h }, mobileImage?: { src, w, h }, href }
 *   Multiple cards are stacked with the 1px light-300 divider (/safe). steps + stat render the split card.
 */
export default function UseCaseTabs({ title = 'How it works', description, items }) {
  const isMobile = useMaxWidth(767)
  const ids = items.map((i) => i.id)
  const [current, setCurrent] = useState(() => {
    const h = typeof window !== 'undefined' ? window.location.hash.slice(1) : ''
    return ids.includes(h) ? h : ids[0]
  })
  const stepRefs = useRef({})
  const mobileLis = useRef([])
  const underline = useRef(null)
  const firstRender = useRef(true)
  const tl = useRef(null)
  const single = items.length === 1

  // hash -> use case (on mount + hashchange)
  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.slice(1)
      if (ids.includes(h)) setCurrent(h)
    }
    onHash()
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const select = (e, id) => {
    e.preventDefault()
    if (id === current) return
    window.history.pushState(null, '', `#${id}`)
    const oldStep = stepRefs.current[current]
    const newStep = stepRefs.current[id]
    if (tl.current) tl.current.kill()
    tl.current = gsap.timeline()
      .to(oldStep, { opacity: 0, y: -20, duration: 0.3, onComplete: () => setCurrent(id) })
      .fromTo(newStep, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 })
  }

  useEffect(() => () => tl.current && tl.current.kill(), [])

  // mobile underline: tween to the active tab; after the first render also scroll it into view
  useLayoutEffect(() => {
    const i = ids.indexOf(current)
    const li = mobileLis.current[i]
    const u = underline.current
    if (!li || !u) return
    if (firstRender.current) {
      firstRender.current = false
      u.style.transform = `translateX(${li.offsetLeft}px)`
      u.style.width = `${li.offsetWidth}px`
      return
    }
    gsap.to(u, { x: li.offsetLeft, width: li.offsetWidth, duration: 0.12, ease: 'power1.out' })
    li.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])

  useEffect(() => {
    const onResize = () => {
      const li = mobileLis.current[ids.indexOf(current)]
      const u = underline.current
      if (!li || !u) return
      gsap.set(u, { x: li.offsetLeft, width: li.offsetWidth })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])

  return (
    <section className="section use-cases-section">
      <div className="container with-top-padding">
        <div className="use-cases-wrapper">
          <aside className="use-cases-sidebar">
            <ul className="use-cases-sidebar-list">
              {items.map((item, i) => (
                <SidebarItem key={item.id} item={item} index={i} current={item.id === current} single={single} onSelect={select} />
              ))}
            </ul>
          </aside>
          <div className="use-cases-content">
            <div className="heading-wrapper use-cases-header">
              <h2 className="heading animation-text">{title}</h2>
              <p className="text-reg text-light-200 animation-text">{description}</p>
            </div>
            <aside className="use-cases-sidebar-mobile">
              <ul className="use-cases-sidebar-list">
                {items.map((item, i) => (
                  <SidebarItem
                    key={item.id}
                    item={item}
                    index={i}
                    current={item.id === current}
                    single={single}
                    onSelect={select}
                    liRef={(el) => (mobileLis.current[i] = el)}
                  />
                ))}
                <div className="active-underline" ref={underline} />
              </ul>
            </aside>
            <div className="use-cases-steps">
              {items.map((item) => {
                const on = item.id === current
                return (
                  <div
                    key={item.id}
                    id={item.id}
                    className="use-cases-step"
                    ref={(el) => (stepRefs.current[item.id] = el)}
                    style={{ display: on ? 'block' : 'none' }}
                  >
                    <div className="use-case-content">
                      {item.cards.map((card, j) => (
                        <Fragment key={j}>
                          {j > 0 && <div style={{ borderBottom: '1px solid var(--colors--light-300)', marginTop: -3 }} />}
                          <UseCaseCard card={card} isMobile={isMobile} />
                        </Fragment>
                      ))}
                      {item.steps && (
                        <div className="split-card no-bottom-border">
                          <div className="split-card-left-wrapper">
                            <HowItWorks steps={item.steps} />
                          </div>
                          <div className="split-card-right-wrapper">{item.stat}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
