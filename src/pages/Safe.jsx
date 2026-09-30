import { useEffect, useRef, useState } from 'react'
import Button from '../components/ui/Button'
import Companies from '../components/Companies'
import Faq from '../components/Faq'
import UseCaseTabs from '../components/shared/UseCaseTabs'
import Capabilities, { SEND_LINKS_IMAGE } from '../components/shared/Capabilities'
import Pricing from '../components/shared/Pricing'
import { SAFE_FAQ_ITEMS } from '../components/shared/faqData'
import usePageMeta from '../components/shared/usePageMeta'

const P = '/assets/pages/'
// Spec 3.2 records this URL truncated ("…#how-do-i-cr…"); the fragment is unknown, so only the page URL is used.
const HELP_URL = 'https://help.angelliststack.com/raise/direct/manage-your-raise-round'

// Spec 3.1: flips every 10s until the first click / Enter / Space, which toggles and stops the auto-flip for good
function FlipCard() {
  const [flipped, setFlipped] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    if (userInteracted) return
    timer.current = setInterval(() => setFlipped((f) => !f), 10000)
    return () => clearInterval(timer.current)
  }, [userInteracted])

  const flip = () => {
    setUserInteracted(true)
    setFlipped((f) => !f)
  }
  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      flip()
    }
  }

  return (
    <div
      className={`demo-wrappertestimonials-image-wrapper flip-card${flipped ? ' flipped' : ''}`}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={flipped ? 'View investor interface' : 'View startup dashboard'}
      onClick={flip}
      onKeyDown={onKey}
    >
      <div className="flip-card-inner">
        <div className="flip-card-face flip-card-front">
          <img className="testimonials-software-image" src={`${P}safe-software-demo.png`} alt="SAFE investor interface" width={1114} height={521} />
        </div>
        <div className="flip-card-face flip-card-back">
          <img className="testimonials-software-image" src={`${P}safe-software-demo-admin.png`} alt="SAFE startup dashboard" width={1164} height={545} />
        </div>
      </div>
      <div className="flip-cta">
        <span className="flip-cta-text">{flipped ? 'Viewing the company dashboard' : 'Viewing the investor experience'}</span>
      </div>
    </div>
  )
}

function SafeHero() {
  return (
    <section className="section testimonials">
      <div className="container testimonials-unified-container">
        <div style={{ paddingTop: 40 }}>
          <div className="heading-wrapper centered with-padding" slot="heading">
            <p className="text-reg animation-text text-light-200">SAFE FUNDRAISING</p>
            <div className="testimonials-heading-wrapper">
              <h2 className="heading animation-text">From SAFE to funded in seconds</h2>
            </div>
            <div className="testimonials-heading-wrapper with-top-padding">
              <p>Generate and sign SAFEs with investors. Receive funds via secure wire or stablecoin transfers.</p>
            </div>
            <div>
              <Button variant="primary" animated href="/get-started">Start Raising</Button>
            </div>
            <div className="text-reg small animation-text">
              <span className="text-light-300">Just want to e-sign a SAFE without having to create an account?</span>
              <a className="text-link small" href="https://safe.new" target="_blank" rel="noopener noreferrer">Head to SAFE.new</a>
            </div>
          </div>
        </div>
        <FlipCard />
      </div>
    </section>
  )
}

const HOW_IT_WORKS = [
  {
    // spec 3.2 does not record this use case's id/tab label (list.length === 1 renders an empty sidebar link)
    id: 'safe-fundraising',
    tab: '',
    cards: [
      {
        title: 'SAFEs, on your terms',
        description: 'Design your round to meet your needs with flexibile options. Pick from 8 different SAFE templates.',
        image: { src: `${P}create-round-safe-2.a80fc0c8.png`, w: 1280, h: 1064 },
        href: HELP_URL,
      },
      {
        title: 'Sign SAFEs',
        description: 'Invite investors to e-sign with a simple link. We handle accreditation and help you track when funds are received. Just want to sign a SAFE without creating an account? Type SAFE.new into your browser, no account required.',
        image: { src: `${P}sign-safe.7c6f010b.png`, w: 1280, h: 898 },
        href: HELP_URL,
      },
      {
        title: 'Get funded via bank transfer or stablecoin',
        description: 'Receive capital from investors your way: Bank transfer or even stablecoin (USDC).',
        image: { src: `${P}safe-usdc.b53801b7.png`, w: 1280, h: 898 },
        href: HELP_URL,
      },
    ],
  },
]

const CAPABILITIES = [
  { num: '01', title: 'Build your custom, private investor deal page', desc: 'Set up your own secure deal page to share information with investors, and track analytics.', card: true },
  { num: '02', title: 'Free to raise with SAFEs', desc: 'No fees, no hidden costs. Only pay if you want to upgrade to a Roll Up Vehicle.', card: true },
  { num: '03', title: 'Trusted investor experience', desc: 'With investor accounts powered by AngelList ($171B in assets on platform), investors can close in minutes with a few clicks.', card: true },
  { num: '04', title: 'Create custom investor invite links', desc: 'Set unique investment minimums and maximums (or exact amounts) for each investor invite link.', modal: SEND_LINKS_IMAGE },
  { num: '05', title: 'Built-in bank and stablecoin infrastructure', desc: 'Receive capital from investors your way: traditional bank transfer or stablecoin (USDC) on Ethereum Mainnet.', card: true },
  { num: '06', title: 'Many SAFE options.', desc: 'Pick from 8 different SAFE templates. Supports custom SAFEs from your law firm too. too.', card: true },
]

const PRICING = [
  { name: 'Unlimited SAFEs', description: 'Standard SAFEs are free. Only pay if you need a Roll Up Vehicle.', price: 'Free', button: { label: 'Get Started', href: '/get-started', variant: 'primary' } },
  { label: 'SAFE features include', features: ['Free e-signature', 'Convenient investor invite links', 'Built-in bank connections and stablecoin support', 'Board consents'] },
  { name: 'Add-ons', description: 'Custom SAFEs, Convertible Notes, and Roll Up Vehicles', button: { label: 'Contact Us', href: 'mailto:team@rollups.com', variant: 'secondary' } },
]

export default function Safe() {
  usePageMeta('Rollups | SAFEs', 'Free SAFE fundraising - built-in wires and USDC.')
  return (
    <>
      <SafeHero />
      <UseCaseTabs description="Used for $2.5B+ of SAFEs to date, here's how it works." items={HOW_IT_WORKS} />
      <Capabilities items={CAPABILITIES} lastRowNoBorder={false} />
      <Companies title={<>Top law firms &amp; companies trust Rollups<br /></>} />
      <Pricing title="SAFE Fundraising Pricing" cells={PRICING} />
      <Faq title="SAFE Fundraising FAQ" items={SAFE_FAQ_ITEMS} />
    </>
  )
}
