import WaitlistHero from '../components/waitlist/WaitlistHero'
import WaitlistTrust from '../components/waitlist/WaitlistTrust'
import HowItWorks from '../components/waitlist/HowItWorks'
import Capabilities from '../components/waitlist/Capabilities'
import Pricing from '../components/waitlist/Pricing'
import { FAQ_ITEMS } from '../components/waitlist/data'
import Companies from '../components/Companies'
import Faq from '../components/Faq'
import usePageMeta from '../components/shared/usePageMeta'
import '../styles/waitlist.css'

// /waitlist (CLONE_SPEC_CONTENT.md §1). The only content page with the GSAP scroll reveal: the
// .animation-item / .animation-text classes below are picked up by the global useReveal hook.
// .waitlist-page only scopes this page's CSS; it adds no box of its own.
export default function Waitlist() {
  usePageMeta('Rollups | Investor Waitlist', 'Give supporters a place to commit before you raise. Create a free investor waitlist on Rollups.')
  return (
    <div className="waitlist-page">
      <WaitlistHero />
      <WaitlistTrust />
      <HowItWorks />
      <Capabilities />
      <Companies
        title={
          <>
            Top law firms &amp; companies
            <br />
            trust Rollups
          </>
        }
      />
      <Pricing />
      <Faq title="Investor Waitlist FAQ" items={FAQ_ITEMS} revealWrapper />
    </div>
  )
}
