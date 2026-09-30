import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import Button from './ui/Button'
import StagesSlider from './stages/StagesSlider'
import { STAGES } from './stages/stagesData'
import '../styles/middle.css'

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin)

const STAGE_TIMES = [0.2, 0.35, 0.5, 0.65, 0.8]

// Scroll-triggered draw timeline (spec §5 "Draw animation") targets .main-path, .line-N, .marker-N and .stage-text-N.
const StageIllustration = () => (
  <svg width="100%" height="100%" viewBox="0 0 1360 427" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className="main-path" d="M0.741699 413.769C53.4234 323.868 352.236 12.2363 1359.61 0.523438" stroke="url(#paint0_linear_2927_1048)" strokeWidth="0.5" />
    <path className="line line-1" d="M80 331V425.5" stroke="#989E7B" strokeWidth="0.5" />
    <path className="line line-2" d="M246.5 221V315.5" stroke="#989E7B" strokeWidth="0.5" />
    <path className="line line-3" d="M464 131V225.5" stroke="#989E7B" strokeWidth="0.5" />
    <path className="line line-4" d="M701 70V164.5" stroke="#989E7B" strokeWidth="0.5" />
    <path className="line line-5" d="M909 36V130.5" stroke="#989E7B" strokeWidth="0.5" />
    <path className="marker marker-1" d="M81.6021 324.345C81.6021 325.173 80.9305 325.845 80.1021 325.845C79.2736 325.845 78.6021 325.173 78.6021 324.345C78.6021 323.516 79.2736 322.845 80.1021 322.845C80.9305 322.845 81.6021 323.516 81.6021 324.345Z" fill="#989E7B" />
    <path className="marker marker-2" d="M248.028 213.588C248.028 214.416 247.356 215.088 246.528 215.088C245.699 215.088 245.028 214.416 245.028 213.588C245.028 212.759 245.699 212.088 246.528 212.088C247.356 212.088 248.028 212.759 248.028 213.588Z" fill="#989E7B" />
    <path className="marker marker-3" d="M465.415 124.052C465.415 124.88 464.743 125.552 463.915 125.552C463.086 125.552 462.415 124.88 462.415 124.052C462.415 123.223 463.086 122.552 463.915 122.552C464.743 122.552 465.415 123.223 465.415 124.052Z" fill="#989E7B" />
    <path className="marker marker-4" d="M702.572 62.9482C702.572 63.7767 701.9 64.4482 701.072 64.4482C700.243 64.4482 699.572 63.7767 699.572 62.9482C699.572 62.1198 700.243 61.4482 701.072 61.4482C701.9 61.4482 702.572 62.1198 702.572 62.9482Z" fill="#989E7B" />
    <path className="marker marker-5" d="M910.63 29.3672C910.63 30.1956 909.959 30.8672 909.13 30.8672C908.302 30.8672 907.63 30.1956 907.63 29.3672C907.63 28.5388 908.302 27.8672 909.13 27.8672C909.959 27.8672 910.63 28.5388 910.63 29.3672Z" fill="#989E7B" />
    <defs>
      <linearGradient id="paint0_linear_2927_1048" x1="1242.77" y1="-7.44456" x2="57.7982" y2="537.775" gradientUnits="userSpaceOnUse">
        <stop stopColor="#989E7B" stopOpacity="0" />
        <stop offset="0.346154" stopColor="#989E7B" />
      </linearGradient>
    </defs>
  </svg>
)

export default function Stages() {
  const iluRef = useRef(null)

  // Measured on the original: main path 1.1s power2.inOut; per stage i at t: marker .25s back.out(1.5),
  // line .25s linear at t+.05, text .25s (default power1.out) at t+.15. Trigger: .stage-ilu-bg top 80%, once.
  useLayoutEffect(() => {
    const root = iluRef.current
    let timer
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root)
      gsap.set(q('.main-path, .line'), { drawSVG: '0% 0%' })
      gsap.set(q('.marker'), { scale: 0, opacity: 0, transformOrigin: 'center' })
      gsap.set(q('.stage-text'), { opacity: 0, filter: 'blur(5px)', y: -10 })
      timer = setTimeout(() => ctx.add(() => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 80%', once: true } })
        tl.to(q('.main-path'), { drawSVG: '0% 100%', duration: 1.1, ease: 'power2.inOut' }, 0)
        STAGE_TIMES.forEach((t, i) => {
          const n = i + 1
          tl.to(q(`.marker-${n}`), { opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(1.5)' }, t)
            .to(q(`.line-${n}`), { drawSVG: '0% 100%', duration: 0.25, ease: 'none' }, t + 0.05)
            .to(q(`.stage-text-${n}`), { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.25 }, t + 0.15)
        })
      }), 200)
    }, root)
    return () => { clearTimeout(timer); ctx.revert() }
  }, [])

  return (
    <section className="section stage-section">
      <div className="container with-top-padding">
        <div className="heading-wrapper with-padding">
          <h2 className="heading animation-text stage">Used by companies at every stage</h2>
        </div>
        <div className="stage-wrapper with-padding">
          <div ref={iluRef} className="stage-ilu-bg hide-mobile">
            <div className="draw-stage-ilu">
              <StageIllustration />
            </div>
            {STAGES.map((s, i) => (
              <div key={s.label} className={`stage-text stage-text-${i + 1}`}>
                <span className="stage-text-mono">{s.label}</span>
                <h3 className="stage-text-book">
                  <div>{s.lines[0]}</div>
                  <div>{s.lines[1]}</div>
                </h3>
              </div>
            ))}
          </div>
          <div className="stage-text-wrapper">
            <p className="text-reg animation-text light-200">Rollups scales with you.</p>
            <p className="text-reg animation-text light-200">Startups have used Roll Up Vehicles® (RUVs) to raise anywhere from $50k to $100M+.</p>
            <p className="text-reg animation-text light-200">
              Growth-stage companies leverage Consolidation Vehicles (CVs) to simplify complex cap tables, and avoid friction with secondaries, liquidity events, or acquisitions.
            </p>
            <div className="stage-button-wrapper">
              <Button variant="primary" animated href="/contact-us">Get Started</Button>
            </div>
          </div>
          <div className="stage-slider-mobile-container">
            <StagesSlider />
          </div>
        </div>
      </div>
    </section>
  )
}
