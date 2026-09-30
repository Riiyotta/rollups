import { CAPABILITIES } from './data'

// §1.5 Capabilities. CapabilityCard's click-to-open modal is not used on this page (no card passes modal content).
export default function Capabilities() {
  return (
    <section className="section">
      <div className="container with-top-padding with-bottom-border">
        <div className="heading-wrapper with-padding">
          <h2 className="heading animation-text">Capabilities</h2>
        </div>
        <div className="content-grid-wrapper with-y-padding">
          <div className="content-grid">
            {CAPABILITIES.map((c, i) => (
              <div key={c.title} className="content-grid-item capability-card with-top-padding">
                <div className="capability-card-content">
                  <div className="text-reg-mono text-allcaps light-300 animation-text">{String(i + 1).padStart(2, '0')}</div>
                  <h2 className="text-reg text-light-100 text-500 animation-text">{c.title}</h2>
                  <p className="text-reg text-light-200 animation-text">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
