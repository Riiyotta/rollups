import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import '../../styles/products.css'

/**
 * Capability image modal (spec 1.4). Renders both the desktop and the <=767 variant; CSS shows one.
 * Closes on the x button, a mousedown outside the panel, or Escape.
 * lockMode: 'overflow' -> document.body.style.overflow = 'hidden' (capability cards)
 *           'disable-scroll' -> body.disable-scroll (the "private investment page" link in the use cases)
 */
export function CapabilityModal({ open, onClose, image, lockMode = 'overflow' }) {
  const panels = useRef([])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    const onDown = (e) => {
      if (panels.current.some((p) => p && p.contains(e.target))) return
      onClose()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    let prevOverflow
    if (lockMode === 'overflow') {
      prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    } else {
      document.body.classList.add('disable-scroll')
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
      if (lockMode === 'overflow') document.body.style.overflow = prevOverflow
      else document.body.classList.remove('disable-scroll')
    }
  }, [open, onClose, lockMode])

  if (!open) return null
  const content = (
    <div className="capability-card-modal-content">
      <div className="product-image-testimonial">
        <img className="testimonial-product-image" src={image.src} alt={image.alt} width={image.w} height={image.h} decoding="async" />
      </div>
    </div>
  )
  const close = (
    <button type="button" className="capability-card-modal-close" aria-label="Close modal" onClick={onClose}>×</button>
  )
  return (
    <>
      <div className="capability-card-modal-overlay">
        <div className="capability-card-modal-wrapper">
          <div className="capability-card-modal" ref={(el) => (panels.current[0] = el)} role="dialog" aria-modal="true">
            {close}
            {content}
          </div>
        </div>
      </div>
      <div className="capability-card-mobile-modal-overlay">
        <div className="capability-card-mobile-modal-wrapper">
          <div className="capability-card-mobile-modal" ref={(el) => (panels.current[1] = el)} role="dialog" aria-modal="true">
            {close}
            {content}
          </div>
        </div>
      </div>
    </>
  )
}

export const INVESTOR_EXP_IMAGE = { src: '/assets/pages/investorexp.50e999a3.png', alt: 'Trusted investor experience', w: 3264, h: 1440 }
export const SEND_LINKS_IMAGE = { src: '/assets/pages/sendlinks.930f37c8.png', alt: 'Create custom investor invite links', w: 1248, h: 1248 }

// "[private investment page]{modal:InvestorExpTestimonial}" in the use-case steps: an underlined span that opens the
// capability modal. The step it sits in is GSAP-transformed, so the overlay is portalled to <body> to stay viewport-fixed.
export function ModalTextLink({ children, image = INVESTOR_EXP_IMAGE }) {
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(false)
  return (
    <>
      <span
        style={{ color: 'inherit', textDecoration: 'underline', cursor: 'pointer', transition: 'opacity .2s ease', opacity: hover ? 0.8 : 1 }}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onClick={() => setOpen(true)}
      >
        {children}
      </span>
      {open && createPortal(
        <div className="capability-card">
          <CapabilityModal open onClose={() => setOpen(false)} image={image} lockMode="disable-scroll" />
        </div>,
        document.body
      )}
    </>
  )
}

function ItemText({ item }) {
  return (
    <>
      <div className="text-reg-mono text-allcaps light-300 animation-text">{item.num}</div>
      <h2 className="text-reg text-light-100 text-500 animation-text">{item.title}</h2>
      {item.desc && <p className="text-reg text-light-200 animation-text">{item.desc}</p>}
    </>
  )
}

function CapabilityCard({ item, className }) {
  const [open, setOpen] = useState(false)
  const clickable = !!item.modal
  return (
    <div className={`content-grid-item capability-card ${className}`}>
      <div
        className={`capability-card-content${clickable ? ' clickable' : ''}`}
        onClick={clickable ? () => setOpen(true) : undefined}
      >
        <ItemText item={item} />
      </div>
      {clickable && <CapabilityModal open={open} onClose={() => setOpen(false)} image={item.modal} />}
    </div>
  )
}

/**
 * Capabilities grid (spec 1.4 / 3.3 / 5.4).
 * - items: [{ num, title, desc?, card?: bool, modal?: { src, alt, w, h } }]
 *   card: render as CapabilityCard (items with a modal are always cards and become clickable)
 * - lastRowNoBorder: last two items use .no-bottom-border instead of .with-top-padding (false on /safe)
 */
export default function Capabilities({ title = 'Capabilities', items, lastRowNoBorder = true }) {
  const n = items.length
  return (
    <section className="section">
      <div className="container with-top-padding with-bottom-border">
        <div className="heading-wrapper with-padding">
          <h2 className="heading animation-text">{title}</h2>
        </div>
        <div className="content-grid-wrapper with-y-padding">
          <div className="content-grid">
            {items.map((item, i) => {
              const cls = lastRowNoBorder && i >= n - 2 ? 'no-bottom-border' : 'with-top-padding'
              if (item.card || item.modal) return <CapabilityCard key={i} item={item} className={cls} />
              return (
                <div key={i} className={`content-grid-item ${cls}`}>
                  <ItemText item={item} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
