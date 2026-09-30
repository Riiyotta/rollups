import Hero, { HeroEmailForm, RaiseHeroAnimation, buildAiQuery } from '../components/Hero'
import HoverLink from '../components/ui/HoverLink'
import RawSvg from '../components/hero/RawSvg'
import Companies from '../components/Companies'
import Faq from '../components/Faq'
import TestimonialSlider from '../components/shared/TestimonialSlider'
import UseCaseTabs, { UseCaseStat } from '../components/shared/UseCaseTabs'
import Capabilities, { ModalTextLink, INVESTOR_EXP_IMAGE, SEND_LINKS_IMAGE } from '../components/shared/Capabilities'
import Pricing from '../components/shared/Pricing'
import { RUV_FAQ_ITEMS } from '../components/shared/faqData'
import usePageMeta from '../components/shared/usePageMeta'
import secureframeSvg from '../../public/svg/pages/secureframe-logo.svg?raw'
import iterateSvg from '../../public/svg/pages/iterate-logo.svg?raw'

const T = '/assets/pages/'

const TESTIMONIALS = [
  { valueprop: 'Premium investor experience, powered by AngelList', content: 'Angel investing via RUVs is a 10x improvement. No Docusigns, sending wires, accepting stock certificates, or law firms looking for signatures later.', meta: 'Dan Romero, angel investor', image: `${T}testimonial-DanRomero2.png`, mobile: 'No' },
  { valueprop: 'Raise from many investors', content: 'The Rollups team provided excellent service in the RUV process — professional, fast, and reliable. In moments when founders feel lost, they brought clarity.', meta: "Kristie D'Ambrosio-Correll, CEO & Co-founder, Dacora Motors", image: `${T}testimonial-kristie.png`, mobile: 'Yes' },
  { valueprop: 'Raise from many investors', content: 'Everything just worked. Our investors loved the simplicity, and I loved that I could bring in the right people without creating a cap table nightmare.', meta: 'Zain Rizavi, Co-Founder & CEO, Cimento AI', image: `${T}testimonial-Zain.png`, mobile: 'Yes' },
  { valueprop: 'Raise internationally', content: 'RUVs made it easy for our UK-based company to raise $1M+ from investors, regardless of where they were.', meta: 'Jonas Templestein, Founder/CEO, Iterate.com', image: `${T}testimonial-Jonasnew.png`, mobile: 'Yes' },
  { valueprop: 'Raise from many investors', content: 'It felt like we were managing one check instead of 50. Founders looking to simplify their logistics while raising money from a lot of great angels should use RUVs.', meta: 'Shrav Mehta, Founder and CEO, Secureframe', image: `${T}testimonial-Shravnew.png`, mobile: 'No' },
  { valueprop: 'Growth-stage investor consolidation', content: 'We used an RUV to raise ~$10M. It was intuitive — even for investors contributing seven figures. RUVs would have saved us a lot of time/complexity in earlier rounds.', meta: '- Anonymous CFO, $5B+ Startup', image: `${T}testimonial-anon.png`, mobile: 'Yes' },
  { valueprop: 'Premium investor experience, powered by AngelList', content: 'I only invest in startups anymore if I can do the deal via AngelList - too painful to track otherwise', meta: 'Ankur Nagpal, angel investor, Founder of Carry', image: `${T}testimonial-AN.png`, mobile: 'Yes' },
  { valueprop: 'Raise from many investors', content: 'We used AngelList RUVs to get great people onboard without the typical admin overhead of a large cap table. Incredible experience for founders & investors.', meta: 'Alexis Rivas, Co-founder and CEO, Cover', image: `${T}testimonial-Alexisnew.png`, mobile: 'No' },
]

const here = <a href="/consolidate" style={{ color: 'inherit', textDecoration: 'underline' }}>here</a>
const pip = <ModalTextLink>private investment page</ModalTextLink>

const USE_CASES = [
  {
    id: 'streamline-investor-onboarding',
    tab: 'Roll up non-lead investors',
    cards: [{
      title: 'Roll up non-lead investors',
      description: 'While lead investors typically invest directly, other investors like friends, family, angels, customers, and follow-on VCs are well-suited for investing through an RUV.',
      image: { src: '/assets/in-action-5.7c07bb5c.png', w: 1000, h: 828 },
      href: '/contact-us',
    }],
    steps: [
      { title: 'Start raising in minutes', items: [
        'Create an account, set your deal terms, and build your private investment page.',
        'Rollups handles entity formation and investor paperwork prep.',
        'Create custom, private, and trackable invite links for investors.',
        <>Invite investors to commit and sign documents in your {pip}.</>,
      ] },
      { day: '03', title: 'Round traction, without the distraction', items: [
        'Avoid delays and headaches from investor accreditation, KYC, and banking, all streamlined by AngelList.',
        'Watch investor visits, commitments, and wires arrive in the real-time dashboard.',
        'Get daily digest updates on fundraising progress in your email inbox.',
      ] },
      { day: '30', title: 'Close the RUV in a few clicks', items: [
        'Close the RUV in just a few clicks in the app.',
        'Provide your financing agreement(s) (SAFE, convertible note, equity round docs, token warrants, etc.) for Rollups to review and sign.',
        'Receive the sum of investor capital in your bank account from one simple wire transfer that Rollups handles for you.',
        'Pay Rollups fee when you close the RUV.',
      ] },
      { day: '30+', title: 'Clean up the rest of your cap table', items: [
        'Add just one row (the RUV entity) to your cap table, avoiding the mess of direct stakeholders on your cap table.',
        'Rollups handles all related filings (Form D, etc), investor K-1s and post-close corporate actions.',
        <>Wish you could consolidate legacy investors already on your cap table? Now you can. Rollups also helps consolidate existing stakeholders on your cap table. Learn more {here}.</>,
      ] },
    ],
    stat: (
      <UseCaseStat
        logo={<RawSvg raw={secureframeSvg} />}
        logoAnimated
        number="35%"
        text="Fewer stakeholders on the cap table after rolling up over 50 investors with an RUV."
        link={{ label: 'Read case study', href: '/blog/case-study-secureframe-maximize-captable-value-ruv' }}
      />
    ),
  },
  {
    id: 'international-ruvs',
    tab: 'International RUVs',
    cards: [{
      title: 'Raise international RUVs',
      description: 'Non-US companies can easily raise from investors, regardless of their location (subject to local restrictions).',
      image: { src: `${T}2.a74381c0.png`, w: 1014, h: 771 },
      mobileImage: { src: `${T}2-mobile.4f01ba0f.png`, w: 534, h: 342 },
      href: '/ruv',
    }],
    steps: [
      { title: 'Start raising globally from investors in minutes', items: [
        <>Set deal terms and build your {pip}.</>,
        'Rollups handles international RUV entity setup and prepares investor paperwork and banking for cross-border investment.',
        'Create secure, trackable invite links with customizable investment amounts in USD or stablecoin USDC.',
        'Invite investors to commit and sign documents.',
      ] },
      { day: '03', title: 'Global round traction, without the headaches', items: [
        'Provide investors with a modern investment experience powered by AngelList.',
        'Automate cross-border legal processes—accreditation, KYC/AML, and compliance checks.',
        'Watch signatures and wire transfers arrive in real-time through the RUV dashboard and email.',
      ] },
      { day: '30', title: 'Close with ease', items: [
        'Finalize the international RUV with just a few clicks.',
        'Upload your financing documents (SAFE, convertible note, equity docs) for Rollups to review and execute.',
        'Receive capital in your company account in one wire transfer from Rollups, and pay RUV fees only when you close the RUV.',
      ] },
      { day: '30+', title: "Wish you'd used RUVs before", items: [
        'Add just one row (the RUV entity) to your cap table, avoiding the mess of direct stakeholders on your cap table.',
        'Rollups handles ongoing related compliance including filings, tax docs, and corporate actions.',
        <>Wish you could consolidate legacy investors already on your cap table? Now you can. Rollups also helps consolidate existing stakeholders on your cap table —learn more {here}.</>,
      ] },
    ],
    stat: (
      <UseCaseStat
        logo={
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, height: '100%' }}>
            <RawSvg raw={iterateSvg} style={{ width: 28, height: 28 }} />
            <span className="text-book">iterate.com</span>
          </div>
        }
        number="$1M"
        text={<>Iterate, a UK-based company, raised over $1M through an RUV, and was able to include many international investors. <br />(local restrictions apply)</>}
      />
    ),
  },
]

const CAPABILITIES = [
  { num: '01*', title: 'Build your custom, private investment page', desc: 'Set up your own secure deal page to share information with investors, and track analytics.', modal: INVESTOR_EXP_IMAGE },
  { num: '02', title: 'Investor accreditation, KYC/AML, and banking.', desc: 'Give your investors a world-class investment experience, powered by AngelList.' },
  { num: '03', title: 'Company-friendly pricing', desc: 'No upfront fees, no hidden costs. Pay when you close the RUV.' },
  { num: '04', title: 'Built-in tax and compliance', desc: 'Form D, Blue Sky filing fees, and automated K-1s for investors.' },
  { num: '05*', title: 'Create custom investor invite links', desc: 'Set unique investment minimums and maximums (or exact amounts) for each investor invite link.', modal: SEND_LINKS_IMAGE },
  { num: '06', title: 'Trusted investor experience', desc: 'With investor accounts powered by AngelList ($171B in assets on platform), investors can close in minutes, not weeks, by leveraging their stored KYC/AML and bank info.' },
  { num: '07', title: 'Secure banking infrastructure', desc: 'Raise on the same AngelList banking infrastructure that moved $80B in 2024 and has deployed more cumulative capital than some of the largest VC funds combined.' },
  { num: '08', title: 'Experienced deal team, over 20 years of combined experience', desc: "Close quickly, and with confidence. Built by private market experts who've supported thousands of funding rounds and deals — we've seen (and solved) nearly every challenge companies face when raising capital on tight timelines." },
  { num: '09', title: 'Comprehensive post-close action support', desc: "Getting acquired? Shutting down? Making some changes? No problem. We've got you covered. Just email us." },
  { num: '10', title: 'International companies and investors', desc: 'Subject to local laws and regulations, we support companies and investors in international jurisdictions.' },
]

const PRICING = [
  { name: 'One RUV', description: 'Get started for free, only pay when you wrap up the RUV.', price: 'Starting at $8,000', unit: '+ filing fees', button: { label: 'Get Started', href: '/contact-us', variant: 'primary' } },
  { label: 'The base price of $8,000 includes', features: ['RUV for US C-Corporations', 'Investment doc generation and digital signing', 'Tax support with K-1s for investors', 'International investor support', 'Future actions and distributions'] },
  { name: 'Add-ons', description: 'For companies with unique structures, needs, or complex fundraising scenarios.', button: { label: 'Contact Us', href: 'mailto:team@rollups.com', variant: 'secondary' } },
  { label: 'Add-ons', features: ['RUVs for non-US companies', 'RUVs for LLCs', 'Side letters and token warrants', 'White-glove, dedicated support from a deal team expert via Slack, WhatsApp, and email'] },
]

export default function Ruv() {
  usePageMeta('Rollups | RUV', 'Streamline your fundraising process. For good.')

  return (
    <>
      <Hero
        className="raise-hero ruv-hero"
        heading={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span>Roll Up Vehicles<span style={{ fontSize: '.5em', verticalAlign: 'super' }}>®</span></span>
            <span style={{ fontSize: '.3em', fontWeight: 400, opacity: 0.8 }}>by AngelList</span>
          </div>
        }
        description="Raise capital from many investors through a single entity — capture their strategic value without the friction and cost."
        descriptionWrapper
        actions={
          <div className="stack animation-item" data-direction="row" data-gap="xs" data-align="center">
            <HeroEmailForm productInterest="Roll Up Vehicles" />
          </div>
        }
        hint={
          <div className="text-reg small animation-text">
            <span className="text-light-300">Curious how RUVs could work for you? </span>
            <HoverLink href="mailto:team@rollups.com" className="text-link small">Contact us</HoverLink>
          </div>
        }
        aiQuery={buildAiQuery('Roll Up Vehicles', 'https://rollups.com/ruv.md', 'https://rollups.com/ruv', 'https://help.rollups.com/ruv/overview')}
        animation={<RaiseHeroAnimation />}
        animationBlockClassName="hero-block"
        showMobileMarquee={false}
        containerClassName="container"
      />
      <TestimonialSlider
        heading={<h2 className="heading animation-text">Turn new investors <br /> into one line on the cap table.</h2>}
        description={<p>Launch your company's special purpose vehicle in minutes. Send investors custom invite links, and let RUVs handle wire transfers, compliance, and taxes so you can get back to work.</p>}
        items={TESTIMONIALS}
      />
      <UseCaseTabs
        description="Companies raise from $50k to $100M+ through an RUV to enable a number of different use cases. Here are a few common ones."
        items={USE_CASES}
      />
      <Capabilities items={CAPABILITIES} />
      <Companies />
      <Pricing title="Roll Up Vehicle Pricing" cells={PRICING} />
      <Faq items={RUV_FAQ_ITEMS} />
    </>
  )
}
