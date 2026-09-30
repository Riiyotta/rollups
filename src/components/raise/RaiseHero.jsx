import { useEffect, useRef, useState } from 'react'
import Button from '../ui/Button'
import HoverLink from '../ui/HoverLink'
import Lottie from '../ui/Lottie'
import RawSvg from '../hero/RawSvg'
import chatgptSvg from '../../../public/svg/chatgpt-icon.svg?raw'
import claudeSvg from '../../../public/svg/claude-icon.svg?raw'
import '../../styles/top.css'
import '../../styles/raise.css'

// CLONE_SPEC_PRODUCTS.md §4.1 — homepage hero markup, `hero-content raise-hero` (no .ruv-hero), no email form,
// no trusted logos, hero-stats in the left block, product-raise.json on the right.
const TITLE = 'How Founders Can Raise Capital with SPVs and RUVs'
const AI_QUERY = encodeURIComponent(
  `As a potential client, I want to concretely understand what I will receive with ${TITLE}. Detail step by step what the service includes: what I receive, how the product is used from end to end. Explain it simply, as if you were describing the real experience of the service.\n\nTo gather information, fetch these sources in order of priority:\n1. https://rollups.com/how-to-raise-capital.md (Markdown version - try first)\n2. https://rollups.com/how-to-raise-capital (full HTML page - if Markdown is missing info)\n3. https://help.rollups.com/ruv/overview (help docs - for additional details)`
)
const BANNER_KEY = 'banner-dismissed'

// Lottie `product-raise.json`: loop, speed 1; IntersectionObserver (threshold .5) on .hero-animation-wrapper plays/pauses it
function RaiseAnimation() {
  const wrapRef = useRef(null)
  const animRef = useRef(null)
  const inView = useRef(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting
        const anim = animRef.current
        if (!anim) return
        if (entry.isIntersecting) anim.play()
        else anim.pause()
      },
      { threshold: 0.5 }
    )
    io.observe(wrapRef.current)
    return () => io.disconnect()
  }, [])

  const onReady = (anim) => {
    animRef.current = anim
    anim.setSpeed(1)
    if (inView.current) anim.play()
  }

  return (
    <div className="hero-animation-wrapper" ref={wrapRef}>
      <Lottie src="/lottie/product-raise.json" loop autoplay={false} className="hero-animation" onReady={onReady} />
    </div>
  )
}

export default function RaiseHero() {
  const [bannerDismissed, setBannerDismissed] = useState(() => {
    try { return !!localStorage.getItem(BANNER_KEY) } catch { return false }
  })
  const dismissBanner = () => {
    try { localStorage.setItem(BANNER_KEY, 'true') } catch { /* ignore */ }
    setBannerDismissed(true)
  }

  return (
    <section className="section">
      <div className="container">
        <div className="hero-content raise-hero">
          <div className="hero-block" style={{ maxWidth: 550 }}>
            {!bannerDismissed && (
              <div className="banner animation-item">
                <div className="banner-content">
                  <p className="text-reg">Announcing Rollups: bringing companies Roll Up Vehicles® (RUVs) and more.</p>
                </div>
                <div className="banner-actions">
                  <HoverLink className="text-reg-mono text-allcaps read-link">
                    <a href="https://rollups.com/blog/announcing-rollups/">Read announcement</a>
                  </HoverLink>
                  <button className="banner-close desktop-only" aria-label="Dismiss announcement" type="button" onClick={dismissBanner}>×</button>
                </div>
                <button className="banner-close mobile-only" aria-label="Dismiss announcement" type="button" onClick={dismissBanner}>×</button>
              </div>
            )}
            <div className="heading-wrapper">
              <h1 className="heading hero-heading animation-text">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>{TITLE}</div>
              </h1>
              <div className="hero-content-description">
                <p className="text-reg animation-text text-light-200">
                  Learn how founders can raise capital using SPVs and Roll Up Vehicles (RUVs), including costs, control, and cap table impact.
                </p>
              </div>
              <div className="stack animation-item" data-direction="row" data-gap="xs" data-align="center">
                <Button variant="primary" href="/get-started">Explore Roll Up Vehicles</Button>
              </div>
              <div className="ai-summary-section ai-summary-section--hero">
                <span className="ai-summary-label">Request an AI summary of this page</span>
                <div className="ai-summary-icons">
                  <a href={`https://chatgpt.com/?q=${AI_QUERY}`} target="_blank" rel="noopener noreferrer" className="ai-summary-link" aria-label="Get AI summary with ChatGPT">
                    <RawSvg raw={chatgptSvg} className="chatgpt-icon" />
                  </a>
                  <a href={`https://claude.ai/new?q=${AI_QUERY}`} target="_blank" rel="noopener noreferrer" className="ai-summary-link" aria-label="Get AI summary with Claude">
                    <RawSvg raw={claudeSvg} className="claude-icon" />
                  </a>
                </div>
              </div>
            </div>
            <div className="hero-stats">
              <div className="hero-stat-item">
                <p className="hero-stat-value">$1.5B+</p>
                <p className="hero-stat-label">Raised through RUVs</p>
              </div>
              <div className="hero-stat-item">
                <p className="hero-stat-value">3,000+</p>
                <p className="hero-stat-label">Startups trust RUVs</p>
              </div>
              <div className="hero-stat-item">
                <p className="hero-stat-value">10x</p>
                <a className="hero-stat-label hero-stat-disclosure-link" href="#calculator">
                  Lower costs w/ RUVs<sup className="hero-stat-disclosure-mark">†</sup>
                </a>
              </div>
            </div>
          </div>
          <div className="vertical-divider" />
          <div className="hero-block">
            <RaiseAnimation />
          </div>
        </div>
      </div>
    </section>
  )
}
