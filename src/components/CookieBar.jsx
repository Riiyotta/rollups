import { useEffect, useState } from 'react'
import HoverLink from './ui/HoverLink'
import '../styles/bottom.css'

const STORAGE_KEY = 'cookie-consent'

const EXPIRATION_DAYS = 365

// Same storage format as the original: JSON { accepted, analytics, date } where date is the expiry
function readChoice() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const { date } = JSON.parse(raw)
    if (new Date(date) > new Date()) return raw
    window.localStorage.removeItem(STORAGE_KEY)
    return null
  } catch { return null }
}

export default function CookieBar() {
  // Already answered on a previous visit: don't render at all
  const [answered] = useState(() => readChoice() !== null)
  // The original mounts with .hidden (translateY(100px)) and drops it after mount, so the bar slides up
  // via its CSS transition (transform .3s ease-in-out). Two rAFs make sure the hidden state is painted first.
  const [hidden, setHidden] = useState(true)
  useEffect(() => {
    if (answered) return undefined
    let r2
    const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => setHidden(false)) })
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2) }
  }, [answered])

  if (answered) return null

  const choose = (accepted) => {
    const date = new Date()
    date.setDate(date.getDate() + EXPIRATION_DAYS)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted, analytics: accepted, date: date.toISOString() }))
      window.localStorage.setItem('cookieConsent', JSON.stringify({ analytics: accepted }))
    } catch { /* storage unavailable: just dismiss */ }
    setHidden(true)
  }

  return (
    <div className={`cookie-consent ${hidden ? 'hidden' : ''}`}>
      <div className="cookie-consent__content">
        <p className="text-reg text-light-200">This site uses cookies</p>
      </div>
      <div className="cookie-consent__buttons">
        <HoverLink>
          <button className="as-button" onClick={() => choose(false)}>
            <span className="text-reg-mono text-allcaps text-light-200">Decline</span>
          </button>
        </HoverLink>
        <HoverLink>
          <button className="as-button" onClick={() => choose(true)}>
            <span className="text-reg-mono text-allcaps text-light-200">Accept</span>
          </button>
        </HoverLink>
      </div>
    </div>
  )
}
