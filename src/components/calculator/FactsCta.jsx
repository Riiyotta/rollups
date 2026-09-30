import Button from '../ui/Button'
import '../../styles/raise.css'

// CLONE_SPEC_PRODUCTS.md §2.3 — no reveal classes (page fade-in only)
const LOGOS = [
  { src: '/assets/loveable-logo.6b32fb82.svg', alt: 'Lovable' },
  { src: '/assets/basis.3c451477.png', alt: 'Basis' },
  { src: '/assets/wispr.5f7509ef.png', alt: 'Wispr' },
  { src: '/assets/verse.60a3f84b.png', alt: 'Verse' },
  { src: '/assets/function.69b2963b.png', alt: 'Function' },
]

export default function FactsCta() {
  return (
    <section className="section ruv-comparision-illustrated-section">
      <div className="container">
        <div className="ruv-facts-cta">
          <div className="ruv-facts-cta-container">
            <div className="ruv-facts-cta-content">
              <div className="ruv-facts-cta-header">
                <p className="ruv-facts-cta-heading">RUVs power some of the fastest growing startups.</p>
                <div className="ruv-facts-cta-stats">
                  <div className="ruv-facts-cta-stat-card">
                    <p className="ruv-facts-cta-stat-value">$1.5B+</p>
                    <p className="ruv-facts-cta-stat-label">Raised through RUVs</p>
                  </div>
                  <div className="ruv-facts-cta-stat-card">
                    <p className="ruv-facts-cta-stat-value">3,000+</p>
                    <p className="ruv-facts-cta-stat-label">Startups trust RUVs</p>
                  </div>
                </div>
              </div>
              <div className="ruv-facts-cta-companies">
                <p className="ruv-facts-cta-companies-label">Trusted by founders of</p>
                <div className="ruv-facts-cta-companies-list">
                  {LOGOS.map((l) => (
                    <div className="ruv-facts-cta-company-logo" key={l.alt}>
                      <img className="ruv-facts-cta-company-logo-img" src={l.src} alt={l.alt} decoding="async" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button variant="primary" animated href="/get-started" className="ruv-facts-cta-button-wrapper">
              Launch your ruv
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
