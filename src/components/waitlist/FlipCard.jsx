import { useEffect, useRef, useState } from 'react'

const AUTO_FLIP_MS = 10000

// §1.2 hero demo flip card. Starts on the front (company dashboard); auto-toggles every 10s until the
// first click / Enter / Space, which toggles once and stops the auto-flip for good.
export default function FlipCard() {
  const [flipped, setFlipped] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    timer.current = setInterval(() => setFlipped((f) => !f), AUTO_FLIP_MS)
    return () => clearInterval(timer.current)
  }, [])

  const interact = () => {
    clearInterval(timer.current)
    setFlipped((f) => !f)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      interact()
    }
  }

  return (
    <div
      className={`demo-wrapper testimonials-image-wrapper flip-card${flipped ? ' flipped' : ''}`}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={flipped ? 'View investor interface' : 'View startup dashboard'}
      onClick={interact}
      onKeyDown={onKeyDown}
    >
      <div className="flip-card-inner">
        <div className="flip-card-face flip-card-front">
          <img
            src="/assets/pages/waitlist-demo-admin.png"
            alt="Investor waitlist startup dashboard"
            width={1600}
            height={900}
            decoding="async"
            className="testimonials-software-image"
          />
        </div>
        <div className="flip-card-face flip-card-back">
          <img
            src="/assets/pages/waitlist-demo.png"
            alt="Investor waitlist interface"
            width={1600}
            height={900}
            decoding="async"
            className="testimonials-software-image"
          />
        </div>
      </div>
      <div className="flip-cta">
        <span className="flip-cta-text">{flipped ? 'Viewing the investor experience' : 'Viewing the company dashboard'}</span>
      </div>
    </div>
  )
}
