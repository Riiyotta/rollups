import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import ActionCard from './inaction/ActionCard'
import { CARDS } from './inaction/cards'
import '../styles/middle.css'

gsap.registerPlugin(ScrollToPlugin)

export default function RollupsInAction() {
  const [current, setCurrent] = useState(CARDS[0].id)
  const stepsRef = useRef([])

  // Mirrors the original exactly: only entries in the current IO callback batch are considered; the
  // intersecting one whose center (from the entry's boundingClientRect) is closest to the viewport center wins.
  // So a step becomes current as soon as it enters the -30%/-30% band (spec §4 Sidebar).
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
    <section className="section rollups-section">
      <div className="container with-top-padding">
        <div className="rollups-wrapper">
          <aside className="rollups-sidebar">
            <ul className="rollups-sidebar-list">
              {CARDS.map((c, i) => (
                <li key={c.id} className={`animation-item${current === c.id ? ' sidebar-item-current' : ''}`}>
                  <a href={`#${c.id}`} onClick={(e) => onNav(e, c.id)}>
                    <p className="text-reg-mono text-allcaps light-300">0{i + 1}</p>
                    <p className="text-reg text-light">{c.sidebar}</p>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
          <div className="rollups-content">
            <div className="heading-wrapper rollups-header">
              <h2 className="heading animation-text">Rollups in action</h2>
              <p className="text-reg text-light-200 animation-text">
                Three common situations in which companies use Rollups. Don't see your use case? There are many more. Contact us.
              </p>
            </div>
            <div className="rollups-steps">
              {CARDS.map((c, i) => (
                <div key={c.id} id={c.id} className="rollups-step" ref={(el) => (stepsRef.current[i] = el)}>
                  <ActionCard card={c} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
