import { useCallback, useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from './ui/Button'
import HoverLink from './ui/HoverLink'
import Lottie from './ui/Lottie'
import RawSvg from './hero/RawSvg'
import chatgptSvg from '../../public/svg/chatgpt-icon.svg?raw'
import claudeSvg from '../../public/svg/claude-icon.svg?raw'
import trusted1 from '../../public/svg/trusted-logo-1.svg?raw'
import trusted2 from '../../public/svg/trusted-logo-2.svg?raw'
import trusted3 from '../../public/svg/trusted-logo-3.svg?raw'
import trusted4 from '../../public/svg/trusted-logo-4.svg?raw'
import trusted5 from '../../public/svg/trusted-logo-5.svg?raw'
import marquee1 from '../../public/svg/marquee-logo-1.svg?raw'
import marquee2 from '../../public/svg/marquee-logo-2.svg?raw'
import marquee3 from '../../public/svg/marquee-logo-3.svg?raw'
import marquee4 from '../../public/svg/marquee-logo-4.svg?raw'
import marquee5 from '../../public/svg/marquee-logo-5.svg?raw'
import marquee6 from '../../public/svg/marquee-logo-6.svg?raw'
import '../styles/top.css'

// AI-summary prompt template (identical on every page; only the subject and the three source URLs vary)
export const buildAiQuery = (subject, md, html, help) =>
  `As a potential client, I want to concretely understand what I will receive with ${subject}. Detail step by step what the service includes: what I receive, how the product is used from end to end. Explain it simply, as if you were describing the real experience of the service.\n\nTo gather information, fetch these sources in order of priority:\n1. ${md} (Markdown version - try first)\n2. ${html} (full HTML page - if Markdown is missing info)\n3. ${help} (help docs - for additional details)`

const HOME_AI_QUERY = buildAiQuery('Rollups.com', 'https://rollups.com/index.md', 'https://rollups.com', 'https://help.rollups.com/platform/overview')

// replit, Notion, Kit, BASE, Lovable
const TRUSTED_LOGOS = [trusted1, trusted2, trusted3, trusted4, trusted5]
// replit, Notion, Kit, customer.io, Lovable, BASE (.large-size)
const MARQUEE_LOGOS = [marquee1, marquee2, marquee3, marquee4, marquee5, marquee6]

const BANNER_KEY = 'banner-dismissed'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const useIsMobileLottie = () => {
  const [mobile, setMobile] = useState(() => window.innerWidth <= 900)
  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth <= 900)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return mobile
}

function HeroAnimation() {
  const wrapRef = useRef(null)
  const animRef = useRef(null)
  const inView = useRef(false)
  const mobile = useIsMobileLottie()
  // Live site: hero Lottie JSON is a dynamic-import chunk that resolves after the global reveal has
  // measured its ScrollTriggers (so e.g. the "trusted by" line, pushed down ~165px once the art sizes the
  // row, still reveals on load at 1440x900). Mount the art after 'reveal:ready' to keep that ordering.
  const [artReady, setArtReady] = useState(() => !!window.__revealReady)
  useEffect(() => {
    if (artReady) return
    const on = () => setArtReady(true)
    window.addEventListener('reveal:ready', on)
    return () => window.removeEventListener('reveal:ready', on)
  }, [artReady])

  // Play while .hero-animation-wrapper is >=50% visible, pause otherwise
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

  const onReady = useCallback(
    (anim) => {
      animRef.current = anim
      // the art just sized the hero row: re-measure triggers below it (tweens already played are unaffected)
      requestAnimationFrame(() => ScrollTrigger.refresh())
      anim.setSpeed(1.25)
      // desktop: initialSegment [5, 250]; mobile: no segment
      if (!mobile) anim.setSegment(5, 250)
      anim.goToAndStop(0, true)
      if (inView.current) anim.play()
    },
    [mobile]
  )

  return (
    <div className="hero-animation-wrapper" ref={wrapRef}>
      {!artReady ? null : mobile ? (
        <Lottie key="m" src="/lottie/hero-rollups-int-mobile.json" loop={false} autoplay={false} className="hero-animation-mobile" onReady={onReady} />
      ) : (
        <Lottie key="d" src="/lottie/hero-rollups-int.json" loop={false} autoplay={false} className="hero-animation" onReady={onReady} />
      )}
    </div>
  )
}

// Looping hero Lottie used by /ruv and /how-to-raise-capital (product-raise.json):
// loop, speed 1, plays while .hero-animation-wrapper is >=50% visible (IntersectionObserver), pauses otherwise
export function RaiseHeroAnimation({ src = '/lottie/product-raise.json' }) {
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

  const onReady = useCallback((anim) => {
    animRef.current = anim
    anim.setSpeed(1)
    if (inView.current) anim.play()
  }, [])

  return (
    <div className="hero-animation-wrapper" ref={wrapRef}>
      <Lottie src={src} loop autoplay={false} className="hero-animation" onReady={onReady} />
    </div>
  )
}

// Homepage email form. productInterest (e.g. "Roll Up Vehicles") is sent as a hidden field on the product pages.
export function HeroEmailForm({ productInterest }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)
  const onSubmit = (e) => {
    e.preventDefault()
    setError(!EMAIL_RE.test(email.trim()))
  }
  return (
    <form id="email-form" name="email-form" className="form" onSubmit={onSubmit} noValidate>
      {productInterest && <input type="hidden" name="productInterest" value={productInterest} />}
      <input
        className={`homepage-form-input ${error ? 'error' : ''}`}
        maxLength={256}
        placeholder="Your work email"
        type="text"
        id="email"
        name="email"
        data-processing="false"
        value={email}
        onChange={(e) => { setEmail(e.target.value); if (error) setError(false) }}
      />
      <div className="get-started">
        <Button variant="primary" animated type="submit">GET STARTED</Button>
      </div>
    </form>
  )
}

const HOME_ACTIONS = (
  <div className="form-wrapper animation-item">
    <div className="form-wrapper">
      <HeroEmailForm />
    </div>
  </div>
)

// Left column of the hero (banner, heading-wrapper, trusted logos). Exported so page variants that need a
// different outer wrapper (e.g. /consolidate's desktop/mobile heroes) render the identical block.
export function HeroLeftBlock({
  heading = 'Take control of your equity',
  description = 'Rollups makes it easy for companies to consolidate many stakeholders into one vehicle',
  descriptionWrapper = false,
  actions = HOME_ACTIONS,
  hint = null,
  aiQuery = HOME_AI_QUERY,
  showTrusted = true,
  style,
  children,
}) {
  const [bannerDismissed, setBannerDismissed] = useState(() => {
    try { return !!localStorage.getItem(BANNER_KEY) } catch { return false }
  })
  const dismissBanner = () => {
    try { localStorage.setItem(BANNER_KEY, 'true') } catch { /* ignore */ }
    setBannerDismissed(true)
  }
  const q = encodeURIComponent(aiQuery)
  const desc = <p className="text-reg animation-text text-light-200">{description}</p>

  return (
    <div className="hero-block" style={style}>
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
        <h1 className="heading hero-heading animation-text">{heading}</h1>
        {descriptionWrapper ? <div className="hero-content-description">{desc}</div> : desc}
        {actions}
        {hint}
        <div className="ai-summary-section ai-summary-section--hero">
          <span className="ai-summary-label">Request an AI summary of this page</span>
          <div className="ai-summary-icons">
            <a href={`https://chatgpt.com/?q=${q}`} target="_blank" rel="noopener noreferrer" className="ai-summary-link" aria-label="Get AI summary with ChatGPT">
              <RawSvg raw={chatgptSvg} className="chatgpt-icon" />
            </a>
            <a href={`https://claude.ai/new?q=${q}`} target="_blank" rel="noopener noreferrer" className="ai-summary-link" aria-label="Get AI summary with Claude">
              <RawSvg raw={claudeSvg} className="claude-icon" />
            </a>
          </div>
        </div>
      </div>
      {children}
      {showTrusted && (
        <div className="trusted-wrapper">
          <p className="text-reg small animation-text">Rollups is trusted by over 50,000 investors and companies</p>
          <ul role="list" className="trusted-logo-item-list">
            {TRUSTED_LOGOS.map((raw, i) => (
              <li className="trusted-logo-item" key={i}>
                <div className="trusted-logo"><RawSvg raw={raw} /></div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

/**
 * Hero. With no props it renders the homepage hero exactly.
 * - className: extra classes on .hero-content (e.g. 'raise-hero ruv-hero')
 * - heading / description / descriptionWrapper / actions / hint / aiQuery / showTrusted / leftBlockStyle /
 *   leftBlockChildren: forwarded to HeroLeftBlock (leftBlockChildren renders after the heading-wrapper, e.g. .hero-stats)
 * - animation: right-hand content (default: homepage HeroAnimation); animationBlockClassName: classes on its .hero-block
 * - showMobileMarquee: homepage-only mobile "trusted" line + logo marquee (false on the product pages)
 * - containerClassName: classes of the inner container (homepage 'container with-bottom-padding'; product heroes 'container')
 */
export default function Hero({
  className = '',
  heading,
  description,
  descriptionWrapper,
  actions,
  hint,
  aiQuery,
  showTrusted,
  leftBlockStyle,
  leftBlockChildren,
  animation,
  animationBlockClassName = 'hero-block no-padding',
  showMobileMarquee = true,
  containerClassName = 'container with-bottom-padding',
}) {
  return (
    <section className="section">
      <div className={containerClassName}>
        <div className={`hero-content${className ? ` ${className}` : ''}`}>
          <HeroLeftBlock
            heading={heading}
            description={description}
            descriptionWrapper={descriptionWrapper}
            actions={actions}
            hint={hint}
            aiQuery={aiQuery}
            showTrusted={showTrusted}
            style={leftBlockStyle}
          >
            {leftBlockChildren}
          </HeroLeftBlock>
          <div className="vertical-divider" />
          <div className={animationBlockClassName}>
            {animation ?? <HeroAnimation />}
          </div>
        </div>
        {showMobileMarquee && (
          <>
            <div className="trusted-wrapper-mobile">
              <p className="text-reg small animation-text">Rollups is trusted by over 50,000 investors and companies</p>
            </div>
            <div className="logo-marquee-hero">
              <div className="marquee-content">
                {[0, 1, 2].map((n) => (
                  <div className="marquee-logos" key={n} aria-hidden={n > 0 || undefined}>
                    {MARQUEE_LOGOS.map((raw, i) => (
                      <div className={`logo-item ${i === 5 ? 'large-size' : ''}`} key={i}>
                        <RawSvg raw={raw} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
