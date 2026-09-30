import Button from '../ui/Button'
import FlipCard from './FlipCard'
import { WAITLIST_URL } from './data'

// §1.1 Hero (section.section.testimonials). The button and flip card are NOT scroll-revealed (§1.9).
export default function WaitlistHero() {
  return (
    <section className="section testimonials">
      <div className="container testimonials-unified-container">
        <div className="testimonials-content">
          <div className="heading-wrapper centered with-padding" slot="heading">
            <p className="text-reg animation-text text-light-200">INVESTOR WAITLIST</p>
            <div className="testimonials-heading-wrapper">
              <h2 className="heading animation-text">Not raising yet? Start a waitlist.</h2>
            </div>
            <div className="testimonials-heading-wrapper with-top-padding">
              <p>
                Your network wants to back you when you&apos;re ready to raise.
                <br />
                Capture their commitment today. Convert it to capital later.
              </p>
            </div>
            <div>
              <Button variant="primary" animated href={WAITLIST_URL} target="_blank">Create Your Waitlist</Button>
            </div>
            <div className="text-reg small animation-text">
              <span className="text-light-300">Waitlists are free forever</span>
            </div>
          </div>
        </div>
        <FlipCard />
      </div>
    </section>
  )
}
