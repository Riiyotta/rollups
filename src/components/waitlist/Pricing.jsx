import Button from '../ui/Button'
import RawSvg from '../hero/RawSvg'
import checkSvg from '../../../public/svg/pages/feature-check.svg?raw'
import { FEATURES, WAITLIST_URL } from './data'

// §1.7 Pricing. The two buttons are NOT scroll-revealed (§1.9). Grid cell 4 is empty (no element).
export default function Pricing() {
  return (
    <section className="section pricing-section">
      <div id="pricing" />
      <div className="container with-top-padding with-bottom-border">
        <div className="heading-wrapper with-padding">
          <h2 className="heading animation-text">Pricing</h2>
        </div>
        <div className="content-grid-wrapper with-y-padding">
          <div className="content-grid">
            <div className="content-grid-item price-item no-top-border">
              <div className="price-header">
                <h2 className="text-book text-light-100 animation-text book">Investor Waitlist</h2>
                <p className="text-reg text-light-200 animation-text">Create and manage your waitlist at no cost, ever.</p>
              </div>
              <div className="price-label-wrapper animation-text">
                <p className="price-label">Free</p>
              </div>
              <Button variant="primary" animated href={WAITLIST_URL} target="_blank">Create Your Waitlist</Button>
            </div>
            <div className="content-grid-item price-item no-top-border">
              <div className="features-list-wrapper">
                <div className="text-reg-mono text-allcaps light-300 animation-text">Investor Waitlist features include</div>
                <ul className="features-list">
                  {FEATURES.map((f) => (
                    <li key={f} className="features-list-item animation-text">
                      <RawSvg raw={checkSvg} />
                      <p className="text-reg text-light-200">{f}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="content-grid-item price-item no-bottom-border no-top-border">
              <div className="price-header">
                <h2 className="text-book text-light-100 animation-text book">Add-ons</h2>
                <p className="text-reg text-light-200 animation-text">Direct raises, Roll Up Vehicles, SAFE fundraising, and more</p>
              </div>
              <Button variant="secondary" animated href="mailto:team@rollups.com">Contact Us</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
