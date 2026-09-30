import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { STAGES } from './stagesData'

gsap.registerPlugin(MotionPathPlugin)

const N = STAGES.length
const SPEED = 300 // Swiper default speed (ms)

const ArrowIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.21875 10C6.94261 10 6.71875 10.2239 6.71875 10.5C6.71875 10.7761 6.94261 11 7.21875 11V10ZM14.1348 10.8536C14.3301 10.6583 14.3301 10.3417 14.1348 10.1464L10.9528 6.96447C10.7576 6.7692 10.441 6.7692 10.2457 6.96447C10.0505 7.15973 10.0505 7.47631 10.2457 7.67157L13.0741 10.5L10.2457 13.3284C10.0505 13.5237 10.0505 13.8403 10.2457 14.0355C10.441 14.2308 10.7576 14.2308 10.9528 14.0355L14.1348 10.8536ZM7.21875 10.5V11H13.7812V10.5V10H7.21875V10.5Z" fill="currentColor" />
  </svg>
)

const NavButton = ({ invert, onClick, label }) => (
  <button type="button" className="learn-more-link animation-item" data-invert={invert ? 'true' : 'false'} onClick={onClick} aria-label={label}>
    <div className="learn-more-icon"><ArrowIcon /><ArrowIcon /></div>
  </button>
)

const Slide = ({ s }) => (
  <div className="stages-slide stage-card">
    <div className="slider-stage-text">
      <div className="stage-text-mono-slider">{s.label}</div>
      <h3 className="stage-text-book-slider">
        <div>{s.lines[0]}</div>
        <div>{s.lines[1]}</div>
      </h3>
    </div>
  </div>
)

// Replaces Swiper (slidesPerView 1, centeredSlides, loop, mousewheel) with a clone-based loop track
export default function StagesSlider() {
  const [pos, setPos] = useState(1) // track position; 1..N are real slides, 0 and N+1 are loop clones
  const [animate, setAnimate] = useState(true)
  const busy = useRef(false)
  const indexRef = useRef(0)
  const viewportRef = useRef(null)
  const pathRef = useRef(null)
  const dotRef = useRef(null)

  const dotTween = useRef(null) // paused motionPath tween (ease none); its progress is what gets animated

  // Mirrors the original: a paused gsap.to(dot, {motionPath: {path, align: path, alignOrigin: [.5,.5]}, ease: 'none'})
  // whose progress is tweened to index/(n-1) over .3s (default power1.out). On wrap the dot fades out (.1s), then
  // travels along the path invisibly (.3s), then fades back in (.1s).
  const buildDotTween = () => {
    dotTween.current?.kill()
    gsap.set(dotRef.current, { clearProps: 'transform' })
    dotTween.current = gsap.to(dotRef.current, {
      motionPath: { path: pathRef.current, align: pathRef.current, alignOrigin: [0.5, 0.5] },
      ease: 'none',
      paused: true,
    })
    dotTween.current.progress(1).progress(indexRef.current / (N - 1))
  }

  const moveDot = (from, to) => {
    const wrapped = (from === N - 1 && to === 0) || (from === 0 && to === N - 1)
    const progress = to / (N - 1)
    indexRef.current = to
    if (wrapped) {
      gsap.to(dotRef.current, {
        opacity: 0,
        duration: 0.1,
        onComplete: () => {
          gsap.to(dotTween.current, {
            progress,
            duration: 0.3,
            overwrite: true,
            onComplete: () => { gsap.to(dotRef.current, { opacity: 1, duration: 0.1 }) },
          })
        },
      })
    } else {
      gsap.to(dotTween.current, { progress, duration: 0.3, overwrite: true })
    }
  }

  const go = (dir) => {
    if (busy.current) return
    busy.current = true
    setTimeout(() => { busy.current = false }, SPEED + 50) // fallback if transitionend doesn't fire
    const from = indexRef.current
    const to = (from + dir + N) % N
    setAnimate(true)
    setPos((p) => p + dir)
    moveDot(from, to)
  }

  const onTransitionEnd = () => {
    busy.current = false
    if (pos === 0 || pos === N + 1) {
      setAnimate(false)
      setPos(pos === 0 ? N : 1)
    }
  }

  useLayoutEffect(() => {
    buildDotTween()
    // the svg is display:none above 767px, so rebuild the path tween when it becomes visible
    const mq = window.matchMedia('(max-width: 767px)')
    const onChange = () => buildDotTween()
    mq.addEventListener('change', onChange)
    return () => { mq.removeEventListener('change', onChange); dotTween.current?.kill() }
  }, [])

  // mousewheel + swipe on the slider viewport
  useEffect(() => {
    const el = viewportRef.current
    const onWheel = (e) => {
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      if (!d) return
      e.preventDefault()
      go(d > 0 ? 1 : -1)
    }
    let startX = null
    const onDown = (e) => { startX = e.clientX }
    const onUp = (e) => {
      if (startX === null) return
      const dx = e.clientX - startX
      startX = null
      if (Math.abs(dx) > 30) go(dx < 0 ? 1 : -1)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  })

  const track = [STAGES[N - 1], ...STAGES, STAGES[0]]

  return (
    <div className="stages-slider-wrapper animation-item show-mobile">
      <div className="slider-nav-container left">
        <NavButton invert onClick={() => go(-1)} label="Previous stage" />
      </div>
      <div className="stages-slider" ref={viewportRef}>
        <div
          className="stages-slider-track"
          style={{ transform: `translate3d(${-pos * 200}px, 0, 0)`, transitionDuration: animate ? `${SPEED}ms` : '0ms' }}
          onTransitionEnd={onTransitionEnd}
        >
          {track.map((s, i) => <Slide key={i} s={s} />)}
        </div>
      </div>
      <div className="slider-nav-container right">
        <NavButton onClick={() => go(1)} label="Next stage" />
      </div>
      <svg width="100%" height="100%" viewBox="0 0 363 77" fill="none" xmlns="http://www.w3.org/2000/svg" className="slider-path">
        <path ref={pathRef} className="slider-path-line" d="M0.892578 0.4375C48.8081 48.353 113.795 75.2716 181.558 75.2716C249.321 75.2716 314.308 48.353 362.224 0.43755" stroke="url(#paint0_linear_3193_2414)" strokeWidth="0.5" />
        <circle ref={dotRef} className="slider-path-dot" cx="181.5" cy="75.0205" r="1.5" fill="#989E7B" />
        <defs>
          <linearGradient id="paint0_linear_3193_2414" x1="363.713" y1="-180.228" x2="1.63753" y2="-180.228" gradientUnits="userSpaceOnUse">
            <stop stopColor="#989E7B" stopOpacity="0" />
            <stop offset="0.233641" stopColor="#989E7B" />
            <stop offset="0.781758" stopColor="#989E7B" />
            <stop offset="1" stopColor="#989E7B" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
