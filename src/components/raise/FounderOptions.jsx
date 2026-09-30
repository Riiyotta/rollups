import '../../styles/raise.css'

// CLONE_SPEC_PRODUCTS.md §4.2 — no reveal classes in this section
const OPTIONS = [
  {
    label: 'Option 1',
    title: 'Take on direct shareholders',
    subtitle: 'Investors sign SAFEs/equity docs directly',
    description: "Adds every investor directly to the startup's cap table. Creates long-term headaches and costs when used for non-lead investors.",
  },
  {
    label: 'Option 2',
    title: 'A VC runs a SPV',
    subtitle: 'A VC-led vehicle invests into the startup',
    description: "Pools non-lead investors nicely, but have to find a VC to run it, and costs the founder's investors money.",
  },
  {
    label: 'Option 3',
    title: 'Founder runs a RUV',
    subtitle: 'Startup launches its own Roll Up Vehicle',
    description: "Pools investors like an SPV, doesn't require a VC, and is free for the founder's investors.",
    highlighted: true,
  },
]

export default function FounderOptions() {
  return (
    <section className="section founder-options-overview-section">
      <div className="container">
        <div className="founder-options-overview">
          <div className="founder-options-overview-intro">
            <h2 className="heading founder-options-overview-title">Three ways founders raise capital</h2>
            <p className="text-reg text-light-200 founder-options-overview-description">
              There are three options. The manual way, traditional SPVs, and RUVs.
            </p>
          </div>
          <div className="founder-options-overview-options">
            {OPTIONS.map((o) => (
              <div key={o.label} className={`option-card${o.highlighted ? ' option-card-highlighted' : ''}`}>
                <div className="option-header">
                  <p className="text-reg-mono text-allcaps option-label">{o.label}</p>
                  {o.highlighted && (
                    <div className="option-badge"><p className="text-reg-mono option-badge-text">Best option</p></div>
                  )}
                </div>
                <div className="option-content">
                  <h3 className="text-book option-title">{o.title}</h3>
                  <p className="text-reg option-subtitle">{o.subtitle}</p>
                  <p className="text-reg option-description">{o.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
