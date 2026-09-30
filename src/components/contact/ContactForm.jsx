import { useEffect, useMemo, useRef, useState } from 'react'
import { CheckIcon, SpinnerIcon } from './icons'

// CLONE_SPEC_CONTENT.md §2.3-2.4; logic ported from the original contact-us page chunk.

// Panel order (already alphabetical on the original)
const INTERESTS = ['Consolidation Vehicles', 'ControlOS', 'General Inquiry', 'Investor Waitlist', 'Roll Up Vehicles', 'Secondary Vehicles']

const FREE_MAIL = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com', 'icloud.com', 'aol.com', 'protonmail.com', 'mail.com',
  'yandex.com', 'zoho.com', 'fastmail.com', 'tutanota.com', 'hey.com', 'mail.ru', 'qq.com', '163.com', '126.com', 'sina.com', 'sohu.com',
]

const INVALID_EMAIL = 'Please enter a valid email address'

// Returns an error message or null
function validateEmail(value) {
  const t = value.trim()
  if (!t) return 'Email is required'
  if (t.length > 254) return INVALID_EMAIL
  const at = t.indexOf('@')
  if (at <= 0 || at !== t.lastIndexOf('@')) return INVALID_EMAIL
  const local = t.slice(0, at)
  const domain = t.slice(at + 1)
  if (local.length > 64 || local.startsWith('.') || local.endsWith('.') || local.includes('..') || !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local)) {
    return INVALID_EMAIL
  }
  const labels = domain.split('.')
  if (domain.length > 253 || labels.length < 2 || labels.some((l) => l.length === 0 || l.length > 63 || !/^[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(l))) {
    return INVALID_EMAIL
  }
  return null
}

// ?email= prefill: "first.last@acme.io" -> name "First Last", company "Acme" (skipped for free-mail domains)
function deriveFromEmail(email) {
  const [local, domain] = email.toLowerCase().split('@')
  if (!domain || FREE_MAIL.includes(domain)) return { name: '', company: '' }
  const label = domain.split('.')[0]
  let name = ''
  if (local.includes('.')) {
    const parts = local.split('.')
    if (parts.length === 2 && parts[0].length > 1 && parts[1].length >= 1) {
      name = parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ')
    }
  } else if (local.length > 1) {
    name = local.charAt(0).toUpperCase() + local.slice(1)
  }
  if (name && name.split(' ')[0].length <= 1) name = ''
  return { name, company: label.charAt(0).toUpperCase() + label.slice(1) }
}

const Arrow = () => (
  <svg className="button-arrow" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.0505 5.65157H0.949505" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.26172 1.86353L11.0496 5.6514L7.26172 9.43927" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function ContactForm() {
  const [data, setData] = useState({ email: '', fullName: '', companyName: '', interests: [] })
  const [status, setStatus] = useState('idle') // idle | processing | success | error
  const [showLabels, setShowLabels] = useState(false)
  const [errors, setErrors] = useState({})
  const [attempted, setAttempted] = useState(false)
  const [open, setOpen] = useState(false)
  const nameRef = useRef(null)
  const multiRef = useRef(null)
  const stubTimer = useRef(null)

  // ?email= / ?ref_source= prefill (ref_source would only be forwarded to the stubbed endpoints)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const email = params.get('email')
    if (!email) return undefined
    const { name, company } = deriveFromEmail(email)
    setData((d) => ({
      ...d,
      email,
      ...(name || company ? { fullName: name || d.fullName, companyName: company || d.companyName } : {}),
    }))
    if (company) setShowLabels(true)
    const t = setTimeout(() => {
      if (nameRef.current) {
        nameRef.current.focus()
        nameRef.current.select()
      }
    }, 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => () => clearTimeout(stubTimer.current), [])

  // Close the panel on outside pointerdown (capture) or Escape
  useEffect(() => {
    if (!open) return undefined
    const onPointer = (e) => {
      if (multiRef.current && !multiRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer, true)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer, true)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Editing a field clears only that field's error (and re-arms the submit button, as on the original)
  const setField = (key, value) => {
    setData((d) => ({ ...d, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
    if (attempted) setAttempted(false)
  }

  const toggleInterest = (item) => {
    setData((d) => ({
      ...d,
      interests: d.interests.includes(item) ? d.interests.filter((i) => i !== item) : [...d.interests, item],
    }))
    if (errors.interests) setErrors((e) => ({ ...e, interests: undefined }))
    if (attempted) setAttempted(false)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const next = {}
    const emailError = validateEmail(data.email)
    if (emailError) next.email = emailError
    if (!data.fullName.trim()) next.fullName = 'Full name is required'
    if (!data.companyName.trim()) next.companyName = 'Company name is required'
    if (data.interests.length === 0) next.interests = 'Please select at least one product interest'
    setErrors(next)
    setAttempted(true)
    if (Object.keys(next).length > 0) return

    try {
      setStatus('processing')
      // STUB: the original POSTs FormData to https://getform.io/f/aqomwyea plus JSON to /api/logContactForm
      // (keepalive), then after 500ms redirects to https://app.rollups.com/get-started?email=…&data=…[&waitlist=1].
      // The clone makes no network call and does not redirect: after the same 500ms it shows the
      // original's (otherwise unreachable) "SUBMITTED" state and stops there.
      stubTimer.current = setTimeout(() => setStatus('success'), 500)
    } catch {
      setStatus('error')
    }
  }

  const allFilled = useMemo(
    () => data.email.trim() !== '' && data.fullName.trim() !== '' && data.companyName.trim() !== '' && data.interests.length > 0,
    [data]
  )
  const selectedText = useMemo(
    () => (data.interests.length === 0 ? '' : [...data.interests].sort((a, b) => a.localeCompare(b)).join(', ')),
    [data.interests]
  )

  const processing = status === 'processing'
  const buttonText = processing ? 'SUBMITTING' : status === 'success' ? 'SUBMITTED' : 'GET STARTED'
  const buttonIcon = processing ? <SpinnerIcon /> : status === 'success' ? <CheckIcon /> : null
  const cls = (key) => `contact-form-input ${errors[key] ? 'error' : ''}`

  return (
    <div className="contact-form-wrapper">
      <form className="contact-form" onSubmit={onSubmit}>
        <div className="form-row">
          <div className="form-field">
            {showLabels && <label className="text-reg text-500 form-label label-fadein">Your Name</label>}
            <input
              ref={nameRef}
              className={cls('fullName')}
              type="text"
              placeholder="Full Name"
              value={data.fullName}
              onChange={(e) => setField('fullName', e.target.value)}
              disabled={processing}
            />
            {errors.fullName && <span className="text-reg form-error">{errors.fullName}</span>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <input
              className={cls('email')}
              type="text"
              placeholder="Email"
              value={data.email}
              onChange={(e) => setField('email', e.target.value)}
              disabled={processing}
            />
            {errors.email && <span className="text-reg form-error">{errors.email}</span>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            {showLabels && <label className="text-reg text-500 form-label label-fadein">Company Name</label>}
            <input
              className={cls('companyName')}
              type="text"
              placeholder="Company Name"
              value={data.companyName}
              onChange={(e) => setField('companyName', e.target.value)}
              disabled={processing}
            />
            {errors.companyName && <span className="text-reg form-error">{errors.companyName}</span>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <div id="contact-form-product-interest-label" className="text-reg text-500 form-label">
              Product Interest <span className="required-asterisk" />
            </div>
            <div ref={multiRef} className={`interest-multiselect${open ? ' interest-multiselect--open' : ''}`}>
              <button
                type="button"
                id="contact-form-product-interest-trigger"
                className={`contact-form-input contact-form-select interest-multiselect__trigger ${errors.interests ? 'error' : ''} ${data.interests.length === 0 ? 'is-placeholder' : ''}`}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls="contact-form-interests-panel"
                aria-labelledby="contact-form-product-interest-label"
                aria-invalid={!!errors.interests}
                aria-describedby={errors.interests ? 'contact-form-interests-error' : undefined}
                disabled={processing}
                onClick={(e) => {
                  e.stopPropagation()
                  setOpen((o) => !o)
                }}
              >
                <span className="interest-multiselect__value">{data.interests.length === 0 ? 'Select product interests' : selectedText}</span>
              </button>
              {open && (
                <div id="contact-form-interests-panel" className="interest-multiselect__panel" role="group" aria-labelledby="contact-form-product-interest-label">
                  {INTERESTS.map((item) => {
                    const checked = data.interests.includes(item)
                    return (
                      <button
                        key={item}
                        type="button"
                        className="interest-multiselect__option"
                        aria-pressed={checked}
                        aria-label={item}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          toggleInterest(item)
                        }}
                        onKeyDown={(e) => {
                          if (e.key === ' ' || e.key === 'Enter') {
                            e.preventDefault()
                            e.stopPropagation()
                            toggleInterest(item)
                          }
                        }}
                      >
                        <span className="interest-multiselect__checkbox-visual" data-checked={checked} aria-hidden="true" />
                        <span className="interest-multiselect__option-text">{item}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
            {errors.interests && (
              <span id="contact-form-interests-error" className="text-reg form-error">{errors.interests}</span>
            )}
          </div>
        </div>
        <div className="contact-alternative-options">
          <div className="button-wrapper animated-text contact-secondary-button-wrapper button-wrapper--primary button-wrapper--animated">
            <button className="button button--primary" type="submit" disabled={processing || (attempted && !allFilled)}>
              <div className="text-reg-mono button-text">{buttonText}</div>
              {buttonIcon ? <div slot="icon">{buttonIcon}</div> : <div className="button-arrow-wrapper"><Arrow /></div>}
            </button>
          </div>
        </div>
      </form>
      {status === 'error' && (
        <div className="form-message-error">
          <p className="text-reg">
            Oops! Something went wrong while submitting the form.{' '}
            <a href="mailto:hello@rollups.com?subject=Website Contact Us Form Bug" className="error-mailto-link">Email us directly here.</a>
          </p>
        </div>
      )}
    </div>
  )
}
