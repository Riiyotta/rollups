import { Fragment, useEffect, useState } from 'react'
import LearnMore from '../ui/LearnMore'
import { STEPS, WAITLIST_URL } from './data'
import '../../styles/middle.css'

// Same JS switch as the homepage ActionCard: at <=767 the illustration is rendered inside
// .action-card-content-wrapper, after .action-card-content (this is what produces the measured
// 390 card heights 402 / 633.4 / 612.4 / 458.7 and the 336-wide static images).
function useIsMobile() {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 767)
  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth <= 767)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return mobile
}

function StepCard({ step, isMobile }) {
  const img = (
    <img
      alt={step.title}
      width={step.image.w}
      height={step.image.h}
      decoding="async"
      className="action-card-content-ilu animation-item"
      src={step.image.src}
    />
  )
  const ilu = (
    <div className="action-card-ilu-wrapper">
      {step.constrained ? <div className="action-card-ilu-inner action-card-ilu-inner-constrained">{img}</div> : img}
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
            <p className="text-book animation-text book text-light-200">{step.title}</p>
          </div>
          <div className="action-card-header-description">
            <p className="text-reg animation-text text-light-200">{step.description}</p>
          </div>
        </div>
        <div className="action-card-content">
          <LearnMore href={WAITLIST_URL} className="animation-item">Create waitlist</LearnMore>
        </div>
        {isMobile && ilu}
      </div>
    </div>
  )
}

// §1.4 "How it works": homepage "Rollups in action" layout with the use-cases-* prefix and an EMPTY sidebar
export default function HowItWorks() {
  const isMobile = useIsMobile()
  return (
    <section className="section use-cases-section">
      <div className="container with-top-padding">
        <div className="use-cases-wrapper">
          <aside className="use-cases-sidebar" />
          <div className="use-cases-content">
            <div className="heading-wrapper use-cases-header">
              <h2 className="heading animation-text">How it works</h2>
              <p className="text-reg text-light-200 animation-text">Go from interest to capital raised in one flow.</p>
            </div>
            <div className="use-cases-steps">
              <div className="use-cases-step">
                <div className="use-case-content">
                  {STEPS.map((s, i) => (
                    <Fragment key={s.title}>
                      {i > 0 && <div className="use-case-divider" />}
                      <StepCard step={s} isMobile={isMobile} />
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
