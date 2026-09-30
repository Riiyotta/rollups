import { useEffect, useState } from 'react'
import '../styles/signup.css'

// Clone of app.rollups.com/setup — the page "Sign In" / "Get Started" actually leads to on
// the live site. This is a different app (Rails + Bootstrap) with its own visual system;
// see CLONE_SPEC_SIGNUP.md. The real form POSTs to /magic_link/register and emails a login
// link — there's no real backend here, so submit is stubbed: it validates the email looks
// right, then shows a "check your email" state, matching the button's own
// data-disable-with="Get started..." loading label first.
export default function SignUp() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | sent | error
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    document.body.classList.add('signup-body')
    return () => document.body.classList.remove('signup-body')
  }, [])

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const showError = touched && status !== 'submitting' && status !== 'sent' && email.length > 0 && !isValidEmail

  const onSubmit = (e) => {
    e.preventDefault()
    setTouched(true)
    if (!isValidEmail) { setStatus('error'); return }
    setStatus('submitting')
    // Stub: no real backend to send a magic link to. Simulate the round trip only.
    setTimeout(() => setStatus('sent'), 700)
  }

  return (
    <div className="signup-page">
      <div className="signup-col">
        <a className="signup-logo" href="/" aria-label="Rollups">
          <img src="/svg/signup/logo-green.svg" alt="logos" />
        </a>

        <h1 className="signup-h1">Sign up or log in to Rollups</h1>
        <p className="signup-intro">
          Most people use their work email address to sign in to Rollups. Enter it below to get started.
        </p>

        {status === 'sent' ? (
          <p className="signup-intro" role="status" style={{ marginTop: 24 }}>
            Check your inbox — we've sent a sign-in link to <strong>{email}</strong>.
          </p>
        ) : (
          <form className="signup-form" onSubmit={onSubmit} noValidate>
            <div className="signup-field">
              <label className="signup-label" htmlFor="email">Email</label>
              <input
                id="email"
                autoFocus
                placeholder="you@company.com"
                autoComplete="email"
                className={`signup-input${showError ? ' is-invalid' : email && isValidEmail ? ' is-valid' : ''}`}
                type="text"
                name="email"
                value={email}
                disabled={status === 'submitting'}
                onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle') }}
                onBlur={() => setTouched(true)}
                aria-invalid={showError}
                aria-describedby={showError ? 'email-error' : undefined}
              />
              {showError && <div className="signup-error" id="email-error">Please enter a valid email address.</div>}
            </div>
            <div className="signup-actions">
              <button type="submit" className="signup-submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Get started...' : 'Get started'}
              </button>
            </div>
          </form>
        )}

        <div className="signup-divider"><p>or</p></div>

        <div className="signup-alt-row">
          <span className="muted">
            Are you an investor looking to view your investing portfolio?{' '}
            <a href="https://venture.angellist.com/login" target="_blank" rel="noopener noreferrer">Go to AngelList</a>
          </span>
        </div>
        <div className="signup-alt-row">
          <span className="muted">
            Are you looking to manage your Cap Table?{' '}
            <a href="https://stack.angellist.com/login" target="_blank" rel="noopener noreferrer">Go to AngelList Stack</a>
          </span>
        </div>

        <p className="signup-fine-print">
          <a href="/terms-of-service">Terms and Conditions</a>
          {' · '}
          <a href="mailto:team@rollups.com">Help? Contact: team@rollups.com</a>
        </p>
      </div>
    </div>
  )
}
