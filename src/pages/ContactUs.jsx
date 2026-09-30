import { useEffect } from 'react'
import ContactForm from '../components/contact/ContactForm'
import usePageMeta from '../components/shared/usePageMeta'
import '../styles/contact.css'

const EXPECT = [
  'Immediate access to our platform to get started fast',
  'Start raising / consolidating in 5 minutes',
  'Help docs and email support available within the app',
  'Our team will follow up via email to answer any questions',
]

// /contact-us (CLONE_SPEC_CONTENT.md §2). No scroll reveal on this page: content is static after page-fade-in.
export default function ContactUs() {
  // description = homepage's (Rollups.html)
  usePageMeta('Rollups | Contact Us - Rollups', 'Simplify fundraises and clean up your cap table')
  // On mobile the original scrolls the form column into view 300ms after mount
  useEffect(() => {
    if (window.innerWidth > 767) return undefined
    const t = setTimeout(() => {
      const el = document.querySelector('.contact-main')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    }, 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="section contact-hero-section">
      <div className="container with-top-padding">
        <div className="contact-hero-content">
          <div className="contact-main">
            <h1 className="heading contact-main-title">Get started</h1>
            <div className="contact-benefits">
              <p className="text-reg contact-benefit">
                Complete the form to get started with any of our products.
                <br />
                We will follow up via email to answer any questions.
              </p>
            </div>
            <ContactForm />
          </div>
          <div className="contact-sidebar">
            <div className="what-to-expect">
              <h3 className="text-book text-500 what-to-expect-title">What to expect</h3>
              <div className="expect-section">
                <ul className="expect-list">
                  {EXPECT.map((t) => (
                    <li key={t}><span className="text-reg text-light-200">{t}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
