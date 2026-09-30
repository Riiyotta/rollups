import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import useMaxWidth from './useMaxWidth'
import '../../styles/products.css'

const SLIDE_W = 560
const GAP = 26 // Swiper spaceBetween
const SPEED = 300 // Swiper default speed

const NavArrow = () => (
  <svg className="button-arrow" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.0505 5.65157H0.949505" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.26172 1.86353L11.0496 5.6514L7.26172 9.43927" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// Card body; `staticImg` = the <=767 static list, which uses a real <img> instead of the background div
function CardBody({ t, staticImg }) {
  const hasAuthor = t.meta && t.meta.trim()
  return (
    <>
      <p className="text-reg-mono text-allcaps text-light-200" slot="valueprop">{t.valueprop}</p>
      <p slot="content">{'"' + t.content + '"'}</p>
      <div slot="author">
        {hasAuthor && t.image && (staticImg
          ? <img src={t.image} alt={t.meta} width={119} height={78} />
          : <div slot="author-image" style={{ backgroundImage: `url(${t.image})` }} />)}
        {hasAuthor && <p slot="author-meta">{t.meta}</p>}
      </div>
    </>
  )
}

// Minimal re-implementation of the original Swiper config:
// spaceBetween 26, slidesPerView 'auto', centeredSlides, loop (list x3, initialSlide N), mousewheel on desktop,
// prev/next buttons, click on a non-active slide = slidePrev/slideNext, 300ms transitions.
function Slider({ items, mousewheel }) {
  const N = items.length
  const slides = [...items, ...items, ...items]
  const swiperRef = useRef(null)
  const [index, setIndex] = useState(N)
  const [width, setWidth] = useState(0)
  const [jumping, setJumping] = useState(false) // loop re-position without transitions
  const animating = useRef(false)
  const indexRef = useRef(N)

  useLayoutEffect(() => {
    const measure = () => swiperRef.current && setWidth(swiperRef.current.offsetWidth)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const go = useCallback((dir) => {
    // loopPreventsSliding (Swiper default): ignore while a transition is running
    if (animating.current) return
    const next = indexRef.current + dir
    if (next < 0 || next >= slides.length) return
    animating.current = true
    indexRef.current = next
    setJumping(false)
    setIndex(next)
  }, [slides.length])

  const onTransitionEnd = (e) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return
    animating.current = false
    const i = indexRef.current
    const fixed = i < N ? i + N : i >= 2 * N ? i - N : i
    if (fixed !== i) {
      indexRef.current = fixed
      setJumping(true)
      setIndex(fixed)
    }
  }

  // re-enable transitions the frame after a loop jump
  useEffect(() => {
    if (!jumping) return
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setJumping(false)))
    return () => cancelAnimationFrame(r)
  }, [jumping])

  // Swiper Mousewheel (defaults): always captures the wheel over the slider; a new gesture (direction change,
  // bigger delta, or >150ms since the previous event) triggers one slide
  useEffect(() => {
    if (!mousewheel) return
    const el = swiperRef.current
    let prev = null
    let lastScroll = 0
    const onWheel = (e) => {
      e.preventDefault()
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX : -e.deltaY
      if (delta === 0) return
      const now = Date.now()
      const ev = { time: now, delta: Math.abs(delta), direction: Math.sign(delta) }
      const trigger = !prev || ev.direction !== prev.direction || ev.delta > prev.delta || ev.time > prev.time + 150
      prev = ev
      if (!trigger) return
      if (ev.delta >= 6 && now - lastScroll < 60) return
      lastScroll = now
      go(delta < 0 ? 1 : -1)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [mousewheel, go])

  const tx = width / 2 - (index * (SLIDE_W + GAP) + SLIDE_W / 2)

  return (
    <div className="testimonials-wrapper testimonials-slider animation-item">
      <div className="testimonials-navigation">
        <button type="button" className="testimonials-nav-button testimonials-nav-prev" aria-label="Previous slide" onClick={() => go(-1)}>
          <NavArrow />
        </button>
        <button type="button" className="testimonials-nav-button testimonials-nav-next" aria-label="Next slide" onClick={() => go(1)}>
          <NavArrow />
        </button>
      </div>
      <div className="swiper" ref={swiperRef}>
        <div
          className={`swiper-wrapper${jumping ? ' swiper-no-transition' : ''}`}
          style={{ transform: `translate3d(${tx}px, 0, 0)`, transitionDuration: jumping ? '0ms' : `${SPEED}ms` }}
          onTransitionEnd={onTransitionEnd}
        >
          {slides.map((t, i) => {
            const cls = i === index ? ' swiper-slide-active' : i === index + 1 ? ' swiper-slide-next' : i === index - 1 ? ' swiper-slide-prev' : ''
            return (
              <div
                key={i}
                className={`swiper-slide testimonial-card${cls}`}
                style={{ marginRight: GAP }}
                onClick={() => i !== index && go(i < index ? -1 : 1)}
              >
                <CardBody t={t} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/**
 * section.testimonials (spec 1.2 / 5.2).
 * - eyebrow: small line above the heading ("SOLUTION")
 * - heading: node(s) rendered inside div.testimonials-heading-wrapper (pass the h2 element(s))
 * - description: node rendered inside div.testimonials-heading-wrapper.with-top-padding (pass the <p>)
 * - items: [{ valueprop, content, meta, image, mobile: 'Yes'|'No' }]
 * - className: extra section classes (e.g. 'testimonials-consolidate after-lenis-anim')
 */
export default function TestimonialSlider({ eyebrow = 'SOLUTION', heading, description, items, className = '' }) {
  const isMobile = useMaxWidth(767)
  const list = isMobile ? items.filter((t) => t.mobile === 'Yes') : items

  return (
    <section className={`section testimonials${className ? ` ${className}` : ''}`}>
      <div className="container with-top-padding">
        <div className="heading-wrapper centered with-padding" slot="heading">
          <p className="text-reg animation-text text-light-200">{eyebrow}</p>
          <div className="testimonials-heading-wrapper">{heading}</div>
          <div className="testimonials-heading-wrapper with-top-padding">{description}</div>
        </div>
        <div className="testimonials-wrapper testimonials-static">
          {list.map((t, i) => (
            <div key={i} className="testimonial-card animation-item" style={{ transitionDelay: `${0.03 * i}s` }}>
              <CardBody t={t} staticImg />
            </div>
          ))}
        </div>
        {!isMobile && <Slider key={list.length} items={list} mousewheel={!isMobile} />}
      </div>
    </section>
  )
}
