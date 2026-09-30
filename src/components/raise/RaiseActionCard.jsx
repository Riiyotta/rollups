import { Fragment, useEffect, useState } from 'react'
import RawSvg from '../hero/RawSvg'
import decorSvg from '../../../public/svg/action-list-decor.svg?raw'
import '../../styles/middle.css'

// Homepage ActionCard markup (inaction/ActionCard.jsx) for /how-to-raise-capital §4.3. The shared component
// always renders a testimonial modal + LEARN MORE link; these cards have neither, so the markup is mirrored here.
function useIsMobile() {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 767)
  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth <= 767)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return mobile
}

export default function RaiseActionCard({ card }) {
  const isMobile = useIsMobile()

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
            <p className="text-reg animation-text text-light-200">
              {card.description.map((para, i) => (
                <Fragment key={i}>
                  {i > 0 && <><br /><br /></>}
                  {para}
                </Fragment>
              ))}
            </p>
          </div>
        </div>
        <div className="action-card-content">
          <div className="action-list">
            <div className="action-list-decor animation-item">
              <RawSvg raw={decorSvg} />
            </div>
            <ul className="action-list-items">
              {card.list.map((item) => (
                <li key={item} className="action-list-item animation-item">
                  <p className="text-reg small text-light-200">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {isMobile && ilu}
      </div>
    </div>
  )
}
