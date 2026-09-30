import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import '../styles/bottom.css'

// Logo pairs (image 1 -> image 2), spec §6. width/height are the original <img> attributes.
const PAIRS = [
  [['basis.3c451477.png', 220, 120], ['wispr.5f7509ef.png', 220, 120]],
  [['loveable-logo.6b32fb82.svg', 120, 20], ['thinking.5b0e222a.svg', 44, 26]],
  [['superlinked.3ca6931a.png', 220, 120], ['boxcar.00381ef5.png', 220, 120]],
  [['aescape.70228900.png', 220, 120], ['commonsclinic.e497074f.png', 220, 120]],
  [['privy.7386caec.png', 220, 120], ['coverface.6ea58fc1.png', 220, 120]],
  [['silna.72540588.png', 220, 120], ['function.69b2963b.png', 220, 120]],
  [['amca.3e08fc9f.png', 220, 120], ['monad.eebd6d9b.png', 220, 120]],
  [['11x.241344f9.png', 220, 120], ['roboflow.bbbf56ea.png', 220, 120]],
  [['vance.91c23b7b.png', 220, 120], ['socket.07f8f5a4.png', 220, 120]],
  [['base.d11301f2.png', 220, 120], ['succinct.582edfdf.png', 220, 120]],
  [['enam.8c59a762.png', 220, 120], ['verse.60a3f84b.png', 220, 120]],
  [['branch.547baa5e.png', 220, 120], ['basis.3c451477.png', 220, 120]],
]

const LINE_ON = 'rgba(152,158,123,1)'
const LINE_OFF = 'rgba(152,158,123,0)'
const EASE = 'power3.inOut'

// One wipe: `incoming` sweeps 0% -> 100% with a visible right-edge line while `outgoing` blurs out,
// then z-index swaps so the next incoming mask sits on top
function wipe(tl, incoming, outgoing, position) {
  tl.set(incoming, { width: '0%', opacity: 1, filter: 'blur(0px)', borderColor: LINE_ON }, position)
    .to(incoming, { width: '100%', borderColor: LINE_OFF, duration: 1.2, ease: EASE })
    .to(outgoing, { filter: 'blur(5px)', opacity: 0, duration: 1.2, ease: EASE }, '<')
    .set(outgoing, { zIndex: 1 })
    .set(incoming, { zIndex: 0 })
}

// title defaults to the homepage heading (string or JSX)
export default function Companies({ title = 'Top law firms & companies trust us to consolidate stakeholders' }) {
  const gridRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gridRef.current.querySelectorAll('.company-logo').forEach((logo, i) => {
        const m1 = logo.querySelector('.reveal-mask-1')
        const m2 = logo.querySelector('.reveal-mask-2')
        const tl = gsap.timeline({ repeat: -1, delay: 0.15 * i, repeatDelay: 3 })
        wipe(tl, m2, m1) // ends with mask1 z1, mask2 z0
        wipe(tl, m1, m2, '+=3') // ends with mask1 z0, mask2 z1
      })
    }, gridRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section">
      <div className="container with-top-padding">
        <div className="heading-wrapper with-padding">
          <h2 className="heading animation-text companies">{title}</h2>
        </div>
        <div className="companies-wrapper with-top-padding">
          <ul role="list" ref={gridRef} className="companies-grid w-list-unstyled animation-item">
            {PAIRS.map(([a, b], i) => (
              <li key={i} className="company-grid-item">
                <div className="company-logo">
                  <div className="reveal-mask-1">
                    <img alt="Company Logo" loading="lazy" decoding="async" width={a[1]} height={a[2]} className="company-logo-image--1" src={`/assets/${a[0]}`} />
                  </div>
                  <div className="reveal-mask-2">
                    <img alt="Company Logo" loading="lazy" decoding="async" width={b[1]} height={b[2]} className="company-logo-image--2" src={`/assets/${b[0]}`} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
