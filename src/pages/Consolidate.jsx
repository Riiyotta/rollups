import { useCallback, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { HeroLeftBlock, HeroEmailForm, buildAiQuery } from '../components/Hero'
import HoverLink from '../components/ui/HoverLink'
import Lottie from '../components/ui/Lottie'
import Companies from '../components/Companies'
import Faq from '../components/Faq'
import TestimonialSlider from '../components/shared/TestimonialSlider'
import UseCaseTabs, { UseCaseStat } from '../components/shared/UseCaseTabs'
import Capabilities, { INVESTOR_EXP_IMAGE } from '../components/shared/Capabilities'
import Pricing from '../components/shared/Pricing'
import useMaxWidth from '../components/shared/useMaxWidth'
import { CONSOLIDATE_FAQ_ITEMS } from '../components/shared/faqData'
import usePageMeta from '../components/shared/usePageMeta'

gsap.registerPlugin(ScrollTrigger)

const LOTTIE_SRC = '/lottie/pages/consolidate-hero.json'
const SNAPS = [0, 0.26, 0.51, 0.76, 1]
const WRAPPER_VH = 60
const PARALLAX = 0.1

// Left block shared by the desktop and mobile hero variants (spec 5.1)
function LeftBlock() {
  return (
    <HeroLeftBlock
      heading="Consolidation Vehicles"
      description="Consolidate existing stakeholders into a vehicle while preserving their QSBS eligibility. Clean up the cap table, streamline secondary transactions & more."
      descriptionWrapper
      actions={
        <div className="stack animation-item" data-direction="row" data-gap="xs" data-align="center">
          <HeroEmailForm productInterest="Consolidation Vehicles" />
        </div>
      }
      hint={
        <div className="text-reg small animation-text">
          <span className="text-light-300">Curious how CVs could work for you? </span>
          <HoverLink href="mailto:team@rollups.com" className="text-link small">Contact us</HoverLink>
        </div>
      }
      aiQuery={buildAiQuery('Consolidation Vehicles', 'https://rollups.com/consolidate.md', 'https://rollups.com/consolidate', 'https://help.rollups.com/consolidate/overview')}
    />
  )
}

// >=1024: Lenis smooth scroll (created 200ms after mount), translateY parallax on the hero, and a scroll-scrubbed
// Lottie that snaps to 5 positions (0.6s power2.out frame tween). Lenis is created here, so it exists at all widths.
function DesktopHero() {
  const heroRef = useRef(null)
  const animRef = useRef(null)

  const onReady = useCallback((anim) => {
    animRef.current = anim
    anim.setSpeed(1.5)
    anim.goToAndStop(0, true)
  }, [])

  useEffect(() => {
    let lenis
    let rafId
    let tween
    let lastTime = 0
    let lastProgress = -1
    const frameObj = { frame: 0 }

    const onScroll = () => {
      const a = (WRAPPER_VH / 100) * window.innerHeight
      const n = a * PARALLAX
      const s = Math.min(window.scrollY / a, 1)
      const offset = n * (s <= 0.5 ? s : 0.5 + 0.8 * (1 - Math.pow(1 - (s - 0.5) / 0.8, 1.5)))
      if (heroRef.current) heroRef.current.style.transform = `translateY(${offset}px)`

      const anim = animRef.current
      if (!anim) return
      const now = performance.now()
      const progress = Math.min(Math.max((5 * lenis.targetScroll) / a, 0), 1)
      if (now - lastTime < 16 || Math.abs(progress - lastProgress) < 0.01) return
      lastTime = now
      lastProgress = progress
      const snap = SNAPS.reduce((best, p) => (Math.abs(p - progress) < Math.abs(best - progress) ? p : best), SNAPS[0])
      const target = snap * (anim.totalFrames - 1)
      if (tween) tween.kill()
      frameObj.frame = anim.currentFrame
      tween = gsap.to(frameObj, {
        frame: target,
        duration: 0.6,
        ease: 'power2.out',
        onUpdate: () => anim.goToAndStop(Math.round(frameObj.frame), true),
      })
    }

    const start = setTimeout(() => {
      ScrollTrigger.refresh()
      lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
      lenis.on('scroll', onScroll)
      const raf = (time) => {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    }, 200)

    return () => {
      clearTimeout(start)
      cancelAnimationFrame(rafId)
      if (tween) tween.kill()
      if (lenis) lenis.destroy()
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
    }
  }, [])

  return (
    <div className="hero-consolidate-desktop" ref={heroRef}>
      <section className="section">
        <div className="container">
          <div className="hero-consolidate-wrapper">
            <div className="hero-content hero-consolidate-desktop-content consolidate-hero">
              <LeftBlock />
              <div className="vertical-divider" />
              <div className="hero-block" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: 450, height: 600, maxHeight: '80%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Lottie src={LOTTIE_SRC} loop={false} autoplay={false} style={{ width: '100%', height: '100%' }} onReady={onReady} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// <=1023: plays when the container crosses the viewport middle (ScrollTrigger 'top 50%'), resets on leave,
// and replays at speed 1.2 three seconds after each completion
function MobileHero() {
  const boxRef = useRef(null)
  const animRef = useRef(null)
  const replay = useRef(null)

  const spansMiddle = () => {
    const r = boxRef.current.getBoundingClientRect()
    const mid = window.innerHeight / 2
    return r.top <= mid && r.bottom >= mid
  }

  const onReady = useCallback((anim) => {
    animRef.current = anim
    anim.addEventListener('complete', () => {
      clearTimeout(replay.current)
      replay.current = setTimeout(() => {
        anim.setSpeed(1.2)
        anim.setDirection(1)
        anim.goToAndPlay(0, true)
      }, 3000)
    })
    if (spansMiddle()) anim.play()
  }, [])

  useEffect(() => {
    const play = () => animRef.current && animRef.current.play()
    const reset = () => {
      clearTimeout(replay.current)
      const anim = animRef.current
      if (!anim) return
      anim.pause()
      anim.goToAndStop(0, true)
    }
    const st = ScrollTrigger.create({
      trigger: boxRef.current,
      start: 'top 50%',
      onEnter: play,
      onEnterBack: play,
      onLeave: reset,
      onLeaveBack: reset,
    })
    if (spansMiddle()) play()
    const t = setTimeout(() => spansMiddle() && play(), 100)
    return () => {
      st.kill()
      clearTimeout(t)
      clearTimeout(replay.current)
    }
  }, [])

  return (
    <div className="hero-consolidate-mobile">
      <section className="section">
        <div className="container">
          <div className="hero-content hero-content-mobile">
            <LeftBlock />
          </div>
          <div className="hero-block">
            <div
              ref={boxRef}
              className="hero-lottie-file-container--mobile"
              style={{ width: '100%', maxWidth: 500, margin: '0 auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}
            >
              <Lottie src={LOTTIE_SRC} loop={false} autoplay={false} style={{ width: 'calc(100% - 40px)', height: '100%' }} onReady={onReady} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const TESTIMONIALS = [
  { valueprop: 'M&A readiness', content: "The Consolidation Vehicle was instrumental in streamlining Wand's acquisition of Accern by combining dozens of our stakeholders into a single row, preserving Wand's clean cap table.", meta: 'Kumesh Aroomoogan, CEO at Accern, a Wand AI Company', mobile: 'Yes' },
  { valueprop: 'Clean cap table', content: 'We signed over 30 SAFEs to raise initial funds. We feared chasing down all of those investor signatures in future financings. Our investors were happy to execute the Rollup, saving us ~$20k and ~2 weeks.', meta: 'Marie Schneegans, Co-Founder, Markprompt', mobile: 'Yes' },
  { valueprop: 'Clean cap table', content: "Rollups team supported our client's consolidation. It would have been prohibitively expensive and time consuming for our client if we had done this manually.", meta: 'Yokum Taku, Partner at WSGR', mobile: 'Yes' },
  { valueprop: 'Clean cap table', content: 'The potential lead in my round brought up that my cap table looks crowd-funded. How fast can you consolidate it?', meta: ' ', mobile: 'Yes' },
  { valueprop: 'M&A readiness', content: "Our startup has acquirers at the table. But it's going to be all equity. And they're worried about the headaches. Consolidation Vehicles are the answer.", meta: ' ', mobile: 'Yes' },
  { valueprop: 'Secondary transaction management', content: 'Every time we let employees sell on secondary, it created an issue with cap table reconciliation. Now, nothing changes on the direct cap table.', meta: ' ', mobile: 'No' },
  { valueprop: 'Advisor equity management', content: 'We gave over 100 advisors equity. It was a nightmare for anything that required signatures. Now, we just consolidate them.', meta: ' ', mobile: 'Yes' },
]

const USE_CASES = [
  {
    id: 'clean-up-legacy-investors',
    tab: 'Clean up stakeholders',
    cards: [{
      title: 'Clean up stakeholders',
      description: 'Move early angels, SAFE holders, and small check investors into a single vehicle - and off your cap table',
      image: { src: '/assets/in-action-1.80dd0b92.png', w: 936, h: 614 },
      mobileImage: { src: '/assets/pages/in-action-1-mobile.b221d009.png', w: 633, h: 456 },
      href: '/consolidate',
    }],
    steps: [
      { title: 'Get started', items: [
        'Configure your Consolidation Vehicle in the app by selecting which investors to roll up.',
        'The Rollups app provides flexible filtering and smart recommendations, and saves your work as you go.',
        'We form the vehicle that will hold the consolidated stakeholders and prepare all required paperwork for stakeholder signatures.',
      ] },
      { day: '06', title: 'Stakeholder consolidation, without the friction', items: [
        'When ready, invite stakeholders to review and sign.',
        'We provide a private portal for stakeholders to review and sign the required documents.',
        'As signatures are collected, companies get real-time updates into the consolidation progress.',
      ] },
      { day: '30', title: 'Update your cap table', items: [
        'Add the Consolidation Vehicle to your cap table, then transfer stakeholder holdings into it, removing the consolidated stakeholders from your direct cap table.',
        'Need a little help? Your law firm or our team can make the necessary updates to your cap table for you in a few minutes.',
        'Once complete, your cap table is streamlined, and you can manage your CV in the Rollups app.',
      ] },
      { day: '30+', title: 'Keep consolidating', items: [
        'Unlike traditional Special Purpose Vehicles (SPVs), Consolidation Vehicles don\'t "close" - and therefore are not just one-time use.',
        'Keep adding to your Consolidation Vehicle over time by returning to the app and adding new stakeholders.',
        'Transfers within the CV are easier than traditional transfers. Less paperwork, less admin, and less time spent on your cap table.',
      ] },
    ],
    stat: (
      <UseCaseStat
        logo={<h2 className="text-book text-light-100">$4B+ AI company (anonymous)</h2>}
        number="+85%"
        text="Rollups reduced their cap table by 85%, saving them from distraction and ~$20,000/yr in admin and legal costs."
      />
    ),
  },
  {
    id: 'simplify-acquisitions',
    tab: 'Simplify acquisitions',
    cards: [{
      title: 'Simplify acquisitions',
      description: 'When acquiring a company, consolidate their stakeholders into a single vehicle - so they never clutter your cap table.',
      image: { src: '/assets/pages/acquisition.3549754c.png', w: 870, h: 486 },
      mobileImage: { src: '/assets/pages/acquisition-mobile2.d29c06e8.png', w: 698, h: 606 },
      // spec 5.3 does not record this card's LEARN MORE target
      href: undefined,
    }],
    steps: [
      { title: 'Get started', items: [
        'Configure the Consolidation Vehicle in the app by listing the acquisition target stakeholders.',
        'Set custom ownership percentages for each stakeholder, and we prepare all required paperwork for stakeholder signatures.',
        "We form the CV entity, and prepare a private portal for the target's stakeholders to review and sign the required documents.",
      ] },
      { day: '03', title: 'Streamline your acquisition', items: [
        'When ready, invite the acquired company stakeholders to review and sign.',
        'As signatures are collected, you get real-time updates into consolidation progress.',
        'Once all stakeholders have signed, the company can close the acquisition and add one single row to their cap table.',
      ] },
      { day: '10', title: 'Update your cap table', items: [
        'Add the Consolidation Vehicle to your cap table, just a single new row.',
        'Once complete, your cap table now reflects the acquisition, and you can manage your CV in the Rollups app.',
      ] },
      { day: '15+', title: 'Keep acquiring', items: [
        "Unlike traditional Special Purpose Vehicles (SPVs), Consolidation Vehicles don't 'close' - and therefore are not just one-time use.",
        'You can keep adding new acquisitions to your CV over time by returning to the app and adding new stakeholders.',
      ] },
    ],
    stat: (
      <UseCaseStat
        logo={<h2 className="text-book text-light-100">Wand AI</h2>}
        number="$25k saved"
        text="Wand AI streamlined its acquisition of Accern's dozens of stakeholders into one entity, preserving a clean cap table for Wand AI."
      />
    ),
  },
]

const CAPABILITIES = [
  { num: '01*', title: 'Custom stakeholder portal experience', desc: 'Set up your own secure portal to share with stakeholders, and track analytics', modal: INVESTOR_EXP_IMAGE },
  { num: '02', title: 'Stakeholder KYC/AML included' },
  { num: '03', title: 'Company-friendly pricing', desc: 'So you save on cap table admin costs.' },
  { num: '04', title: 'Simple stakeholder e-signature process', desc: 'Make it easy for your stakeholders to sign consolidation documents.' },
  { num: '05', title: 'Secure banking infrastructure', desc: 'Conduct secondaries and distributions within the CV confidently on the same AngelList banking infrastructure that moved $80B in 2024 and has deployed more cumulative capital than some of the largest VC funds combined.' },
  { num: '06', title: 'Experienced team, over 20 years of combined experience', desc: "Consolidate quickly, and with confidence. Built by private market experts who've supported thousands of private companies." },
  { num: '07', title: 'Comprehensive post-consolidation action support', desc: "Enabling stakeholders within the CV to transfer? No problem! We've got you covered." },
  { num: '08', title: 'International companies and investors', desc: 'Subject to local laws and regulations, we support companies and their stakeholders in international jurisdictions.' },
]

const PRICING = [
  { name: 'Consolidate existing stakeholders', description: 'One CV is all companies need due to the flexible structure.', price: 'Starting at $100', unit: '/stakeholder/year', button: { label: 'Get Started', href: '/contact-us', variant: 'primary' } },
  { label: 'Includes', features: ['Supports multiple closes.', 'Includes the first 5 intra-CV transfers.', 'Stakeholder portals for signing & viewing docs.', 'Dedicated onboarding and support.'] },
  { name: 'Add-ons', button: { label: 'Contact Us', href: 'mailto:team@rollups.com', variant: 'secondary' } },
  { label: 'Includes', features: ['Additional intra-CV transfers.', 'Distributions to stakeholders within the CV.'] },
]

export default function Consolidate() {
  usePageMeta('Rollups | Consolidate', 'Clean up stakeholders on your cap table. For good.')
  const isMobile = useMaxWidth(767)
  return (
    <>
      <div className="hero-section-wrapper">
        <DesktopHero />
        <MobileHero />
        <div className="container" />
      </div>
      <TestimonialSlider
        className="testimonials-consolidate after-lenis-anim"
        heading={
          <>
            <h2 className="heading animation-text">Turn existing stakeholders</h2>
            <h2 className="heading animation-text">into one line on the cap table.</h2>
          </>
        }
        description={
          <p className="text-reg text-light-200 animation-text">
            Create an account, configure your CV for your use case, and invite stakeholders. {!isMobile && <br />}Track your consolidation progress, and work with our team to update your cap table.
          </p>
        }
        items={TESTIMONIALS}
      />
      <UseCaseTabs
        description="Companies consolidate existing stakeholders into a CV for a number of reasons. Here are a few common ones."
        items={USE_CASES}
      />
      <Capabilities items={CAPABILITIES} />
      <Companies />
      <Pricing title="Consolidation Vehicle Pricing" cells={PRICING} withBottomBorder={false} />
      <Faq items={CONSOLIDATE_FAQ_ITEMS} />
    </>
  )
}
