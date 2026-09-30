import { useEffect, useState } from 'react'
import Button from '../ui/Button'
import LearnMore from '../ui/LearnMore'

// Original switches the testimonial modal location in JS at innerWidth <= 767
function useIsMobile() {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 767)
  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth <= 767)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return mobile
}

const ListDecor = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3" height="100%" viewBox="0 0 3 240" fill="none">
    <path d="M1.00006 0.778515L1.58104 240" stroke="url(#paint0_linear_2900_7028)" strokeOpacity="0.6" />
    <defs>
      <linearGradient id="paint0_linear_2900_7028" x1="1.58105" y1="-0.0926207" x2="1.58105" y2="236.877" gradientUnits="userSpaceOnUse">
        <stop stopColor="#989E7B" stopOpacity="0" />
        <stop offset="0.05" stopColor="#989E7B" />
        <stop offset="0.908654" stopColor="#989E7B" />
        <stop offset="1" stopColor="#989E7B" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
)

function Testimonial({ t }) {
  return (
    <div className="action-card-modal-content">
      <div className="testimonial-wrapper">
        <div className="testimonial-content">
          <p className="text-reg big text-light-100">{t.quote}</p>
          <div className="testimonial-author">
            <img alt="author" width={t.image.w} height={t.image.h} decoding="async" src={t.image.src} />
            <p className="text-reg text-light-200">
              {t.author}
              {t.link && (
                <>
                  {' '}
                  <a href={t.link.href} target="_blank" rel="noopener noreferrer">{t.link.label}</a>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ActionCard({ card }) {
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()
  const toggle = () => setOpen((o) => !o)
  const label = open ? 'Hide testimonial' : 'Show testimonial'
  const modalClass = open ? ' action-card-modal-open' : ''

  // On mobile the original nests the illustration and the testimonial button inside .action-card-content-wrapper
  const ilu = (
    <div className="action-card-ilu-wrapper">
      <img
        alt={card.title}
        width={card.image.w}
        height={card.image.h}
        decoding="async"
        className="action-card-content-ilu animation-item"
        src={card.image.src}
      />
      {!isMobile && (
        <div className="action-card-modal-wrapper">
          <div className={`action-card-modal${modalClass}`}>
            <Testimonial t={card.testimonial} />
          </div>
          <Button variant="secondary" type="button" onClick={toggle} className="action-card-modal-button-wrapper">
            {label}
          </Button>
        </div>
      )}
    </div>
  )

  return (
    <div className="action-card">
      {!isMobile && ilu}

      <div className="action-card-content-wrapper">
        <div className="action-card-header">
          <div className="action-card-header-name">
            <p className="text-reg-mono text-allcaps light-300 animation-text">{card.label}</p>
          </div>
          <div className="action-card-header-title">
            <p className="text-book animation-text book text-light-200">{card.title}</p>
          </div>
          <div className="action-card-header-description">
            <p className="text-reg animation-text text-light-200">{card.description}</p>
          </div>
        </div>
        <div className="action-card-content">
          <div className="action-list">
            <div className="action-list-decor animation-item">
              <ListDecor />
            </div>
            <ul className="action-list-items">
              {card.list.map((item) => (
                <li key={item} className="action-list-item animation-item">
                  <p className="text-reg small text-light-200">{item}</p>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ marginTop: 24 }}>
            <LearnMore href={card.href} className="animation-item">LEARN MORE</LearnMore>
          </div>
        </div>
        {isMobile && ilu}
        {isMobile && (
          <div className="action-card-mobile-button-wrapper">
            <div className="action-card-mobile-modal-wrapper">
              <div className={`action-card-mobile-modal${modalClass}`}>
                <Testimonial t={card.testimonial} />
              </div>
            </div>
            <Button variant="secondary" type="button" onClick={toggle}>
              {label}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
