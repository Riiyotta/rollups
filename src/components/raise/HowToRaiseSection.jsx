import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import RaiseActionCard from './RaiseActionCard'
import { RAISE_CARDS } from './raiseCards'
import '../../styles/raise.css'

gsap.registerPlugin(ScrollToPlugin)

// CLONE_SPEC_PRODUCTS.md §4.3 — the homepage "Rollups in action" sidebar logic (RollupsInAction.jsx) under
// how-to-raise-* class names. No heading: the steps start at the section top.
export default function HowToRaiseSection() {
  const [current, setCurrent] = useState(RAISE_CARDS[0].id)
  const stepsRef = useRef([])

  // Same as the homepage: of the intersecting entries in this callback batch, the one whose center is
  // nearest the viewport center becomes current.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const hits = entries.filter((e) => e.isIntersecting).sort((a, b) => {
          const vc = window.innerHeight / 2
          const ca = a.boundingClientRect.top + a.boundingClientRect.height / 2
          const cb = b.boundingClientRect.top + b.boundingClientRect.height / 2
          return Math.abs(ca - vc) - Math.abs(cb - vc)
        })
        if (hits.length > 0) setCurrent(hits[0].target.id)
      },
      { rootMargin: '-30% 0px -30% 0px', threshold: [0, 1] }
    )
    stepsRef.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const onNav = (e, id) => {
    e.preventDefault()
    gsap.to(window, { duration: 1, scrollTo: { y: `#${id}`, offsetY: 120 }, ease: 'power2.inOut' })
  }

  return (
    <section className="section how-to-raise-section">
      <div className="container">
        <div className="how-to-raise-wrapper">
          <aside className="how-to-raise-sidebar">
            <ul className="how-to-raise-sidebar-list">
              {RAISE_CARDS.map((c, i) => (
                <li key={c.id} className={`animation-item${current === c.id ? ' sidebar-item-current' : ''}`}>
                  <a href={`#${c.id}`} onClick={(e) => onNav(e, c.id)}>
                    <p className="text-reg-mono text-allcaps light-300">0{i + 1}</p>
                    <p className="text-reg text-light">{c.sidebar}</p>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
          <div className="how-to-raise-content">
            <div className="how-to-raise-steps">
              {RAISE_CARDS.map((c, i) => (
                <div key={c.id} id={c.id} className="how-to-raise-step" ref={(el) => (stepsRef.current[i] = el)}>
                  <RaiseActionCard card={c} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
