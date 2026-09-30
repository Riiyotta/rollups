import Button from '../ui/Button'
import RawSvg from '../hero/RawSvg'
import withoutRuv from '../../../public/svg/pages/cap-table-without-ruv.svg?raw'
import withRuv from '../../../public/svg/pages/cap-table-with-ruv.svg?raw'
import '../../styles/raise.css'

// CLONE_SPEC_PRODUCTS.md §4.5 — static SVGs, no reveal classes. `comparison-panel-with-ruv` sits on the
// "Without RUV" panel, as on the original.
export default function CleanCapTable() {
  return (
    <section className="section ruv-comparision-illustrated-section">
      <div className="container">
        <div className="ruv-comparision-illustrated">
          <div className="ruv-comparision-illustrated-intro">
            <h2 className="heading ruv-comparision-illustrated-title">The difference is a clean cap table</h2>
            <p className="text-reg text-light-200 ruv-comparision-illustrated-description">
              RUVs consolidate all angel checks into a single, founder-friendly line item - so you can raise faster today and keep your cap table tight for tomorrow’s rounds.
            </p>
            <Button variant="primary" animated href="/get-started" className="ruv-comparision-illustrated-button">
              Launch your ruv
            </Button>
          </div>
          <div className="ruv-comparision-illustrated-visual">
            <div className="comparison-panel comparison-panel-with-ruv">
              <div className="comparison-panel-header">
                <h2 className="comparison-panel-title">Without RUV</h2>
                <p className="comparison-panel-subtitle">Your cap table with 15 angel investors</p>
              </div>
              <div className="comparison-panel-content"><RawSvg raw={withoutRuv} /></div>
            </div>
            <div className="comparison-panel">
              <div className="comparison-panel-header">
                <h3 className="comparison-panel-title">With RUV</h3>
                <p className="comparison-panel-subtitle">Clean and simple, ready to scale</p>
              </div>
              <div className="comparison-panel-content comparison-panel-content-nested"><RawSvg raw={withRuv} /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
