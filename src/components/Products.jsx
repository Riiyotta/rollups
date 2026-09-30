import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Button from './ui/Button'
import LearnMore from './ui/LearnMore'
import Lottie from './ui/Lottie'
import '../styles/top.css'

const PRODUCTS = [
  {
    id: 'product-raise',
    tabId: 'raise',
    tab: 'Raise',
    title: 'Raise',
    text: 'Raise capital with Roll Up Vehicles® (RUVs) from many investors in one entity — and one line on your cap table. Powered by AngelList.',
    href: '/ruv',
    lottie: '/lottie/product-raise.json',
    lottieClass: 'product-raise',
    iluClass: 'products-ilu-wrapper',
  },
  {
    id: 'product-consolidate',
    tabId: 'consolidate',
    tab: 'Consolidate',
    title: 'Consolidate',
    text: 'Move existing stakeholders into a Consolidation Vehicle to consolidate their ownership into one entity — and one line on the cap table.',
    href: '/consolidate',
    lottie: '/lottie/product-consolidate.json',
    lottieClass: 'product-consolidate',
    iluClass: 'products-ilu-wrapper no-bottom-padding',
  },
]

const useIsTabs = () => {
  const [tabs, setTabs] = useState(() => window.innerWidth < 992)
  useEffect(() => {
    const onResize = () => setTabs(window.innerWidth < 992)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return tabs
}

// Loops at speed 1.
// Desktop: lottie-react autoplay + IntersectionObserver(threshold .5) on #product-<id> -> play/pause.
// Tabs mode (<992): the live site renders the columns with ids "raise"/"consolidate", so its observer
// target (#product-raise) doesn't exist and both Lotties simply autoplay (the hidden one keeps running too).
function ProductColumn({ product, active, isTabs, columnRef }) {
  const animRef = useRef(null)
  const inView = useRef(false)

  useEffect(() => {
    if (isTabs) {
      if (animRef.current) animRef.current.play()
      return
    }
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
    io.observe(columnRef.current)
    return () => io.disconnect()
  }, [columnRef, isTabs])

  const onReady = (anim) => {
    animRef.current = anim
    anim.setSpeed(1)
    if (isTabs || inView.current) anim.play()
  }

  // Tabs mode mirrors the live markup: `products-content-column [active]`, no .animation-item,
  // React-controlled inline display/opacity (the CSS `transition: opacity .3s ease` smooths the GSAP tween)
  const tabProps = isTabs
    ? { id: product.tabId, className: `products-content-column ${active ? 'active' : ''}`, style: { display: active ? 'flex' : 'none', opacity: active ? 1 : 0 } }
    : { id: product.id, className: 'products-content-column animation-item' }

  return (
    <div ref={columnRef} {...tabProps}>
      <div className="products-content-header">
        <h3 className="text-book animation-text text-450">{product.title}</h3>
        <div className="products-content-header-description">
          <p className="text-reg animation-text text-light-200">{product.text}</p>
        </div>
        <LearnMore href={product.href} className="animation-item">LEARN MORE</LearnMore>
      </div>
      <div className={product.iluClass}>
        <Lottie src={product.lottie} loop autoplay={false} className={product.lottieClass} onReady={onReady} />
      </div>
    </div>
  )
}

export default function Products() {
  const isTabs = useIsTabs()
  const [active, setActive] = useState(0)
  const colRefs = [useRef(null), useRef(null)]
  const tabRefs = [useRef(null), useRef(null)]
  const prevActive = useRef(0)
  const wasTabs = useRef(isTabs)

  // Live site: gsap.timeline().to(old, {opacity:0, y:-20, .3s, onComplete: setActive(new)})
  //                         .fromTo(new, {opacity:0, y:20}, {opacity:1, y:0, .3s})   (default ease power1.out)
  // The outgoing column is left at inline opacity 0 / translateY(-20px) and display:none.
  const selectTab = (i) => {
    if (i === active) return
    const oldEl = colRefs[active].current
    const newEl = colRefs[i].current
    if (!oldEl || !newEl) { setActive(i); return }
    gsap.timeline()
      .to(oldEl, { opacity: 0, y: -20, duration: 0.3, onComplete: () => setActive(i) })
      .fromTo(newEl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 })
  }

  // After a switch the active tab button is scrolled into view (smooth, inline center, block nearest)
  useEffect(() => {
    if (prevActive.current === active) return
    prevActive.current = active
    tabRefs[active].current?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [active])

  // Resizing from tabs mode back to the grid: the columns become .animation-item again (CSS opacity 0),
  // so show them rather than leaving them hidden.
  useEffect(() => {
    if (wasTabs.current && !isTabs) gsap.set(colRefs.map((r) => r.current), { opacity: 1, y: 0, filter: 'blur(0px)' })
    wasTabs.current = isTabs
  }, [isTabs])

  return (
    <section className="section">
      <div className="container with-top-padding">
        <div className="heading-wrapper centered">
          <p className="text-reg animation-text text-light-200">ROLLUPS SOLUTIONS</p>
          <h2 className="heading heading-products animation-text">Two ways companies use Rollups</h2>
        </div>
        <div className="products-content-columns with-top-padding animation-item">
          <div className="products-tabs">
            {PRODUCTS.map((p, i) => (
              <div className="tab-button-wrapper" key={p.id} ref={tabRefs[i]}>
                <Button variant={i === active ? 'primary' : 'secondary'} type="button" onClick={() => selectTab(i)}>
                  {p.tab}
                </Button>
              </div>
            ))}
          </div>
          <div className="products-content-wrapper">
            {PRODUCTS.map((p, i) => (
              <ProductColumn key={p.id} product={p} active={i === active} isTabs={isTabs} columnRef={colRefs[i]} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
