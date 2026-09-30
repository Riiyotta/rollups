import filler from './filler'

// FAQ item lists for <Faq items={...} />. Short answers are verbatim from CLONE_SPEC_PRODUCTS.md; answers the spec
// records only as a word count use neutral placeholder copy of the same length (filler).
const linkStyle = { color: 'inherit', textDecoration: 'underline' }

// Shared by /ruv, /ruv/calculator and /how-to-raise-capital (spec 1.7)
export const RUV_FAQ_ITEMS = [
  { q: 'How are Roll Up Vehicles® (RUVs) different from Special Purpose Vehicles (SPVs)?', a: filler(82) },
  { q: 'Do investors in RUVs need to meet certain criteria?', a: filler(49) },
  {
    q: 'Are investors in RUVs eligible for QSBS benefits?',
    a: 'Generally, yes, QSBS eligibility flows through to investors when they invest into your RUV. Contact us for more details.',
  },
  { q: 'How do investors in RUVs make their investment?', a: filler(36) },
  {
    q: 'Which companies are eligible to use RUVs?',
    a: 'RUV customers are private companies that have raised (or are currently raising) venture capital. We support companies incorporated in other countries, subject to certain restrictions.',
  },
  {
    q: 'How much does an RUV cost?',
    a: (
      <>
        {filler(37)} To confirm pricing for your RUV, <a style={linkStyle} href="/get-started">submit your RUV</a> or{' '}
        <a style={linkStyle} href="/contact-us">contact us</a>.
      </>
    ),
  },
  { q: 'Are there other costs associated with RUVs?', a: filler(65) },
  {
    q: 'Can I publicly share or market my RUV?',
    a: 'By default, regulatory requirements prevent you from publicly marketing your RUV. Contact us to discuss other options that may be available.',
  },
  { q: 'How private are RUVs?', a: filler(35) },
]

// /safe (spec 3.6), typos verbatim
export const SAFE_FAQ_ITEMS = [
  { q: 'What is the differenence between SAFE Fundraising and Roll Up Vehicles?', a: filler(66, true) },
  {
    q: 'What is the differenence between SAFE.new and creating an account?',
    a: 'SAFE.new allows you to sign one or two SAFEs in seconds, without creating an account. Creating an account gives you the ability to manage your round more comprehensively and securely.',
  },
  {
    q: 'What stablecoins does Rollups supports for SAFEs and RUVs?',
    a: 'Right now, we support USDC on Ethereum Mainnet. We will be adding more stablecoins and networks in the future. Contact us to learn more or suggest new functionaliy.',
  },
  {
    q: 'How do I choose the right SAFE terms for my company?',
    a: "Create an account to see AngelList's market data. It will give you a real-time sense for round sizes and terms, by stage and industry.",
  },
  {
    q: 'What are the different types of SAFEs available?',
    a: 'There are 8 different types of SAFEs that offer a combination of terms: valuation caps, discounts, MFN, and pro rata rights.',
  },
  {
    q: 'Can I use my custom SAFE from my law firm?',
    a: 'Yes, you can use your custom SAFE from your law firm. Creat an account and then configure your custom SAFE template using our template builder.',
  },
  { q: 'Does this tool handle accreditation checks?', a: filler(60) },
  { q: 'What does using SAFE Fundraising cost?', a: filler(37) },
  {
    q: 'What is a SAFE and how does it work?',
    a: (
      <>
        {filler(46)} You can learn more about SAFEs{' '}
        <a href="https://www.angellist.com/learn/safe-note" target="_blank" rel="noopener noreferrer" style={linkStyle}>here</a>.
      </>
    ),
  },
]

// /consolidate (spec 5.7)
export const CONSOLIDATE_FAQ_ITEMS = [
  { q: 'How are Consolidation Vehicles (CVs) different from Roll Up Vehicles® (RUVs)?', a: filler(53) },
  { q: 'How do Consolidation Vehicles (CVs) actually work?', a: filler(49) },
  {
    q: 'What about my investors? Does consolidating them create negative tax consequences or remove their voting rights?',
    a: filler(47),
  },
]
