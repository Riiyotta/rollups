// /waitlist copy, verbatim from CLONE_SPEC_CONTENT.md §1
export const WAITLIST_URL = '/get-started?waitlist=1'

// §1.4 "How it works" (image alt = title). `constrained` = cards 2 and 3 (img wrapped in .action-card-ilu-inner)
export const STEPS = [
  {
    title: 'Create your investor waitlist in minutes',
    description: 'Choose what you want to know and publish a clean, startup-branded page.',
    image: { src: '/assets/pages/waitlist-demo-admin.d7ac115f.png', w: 3485, h: 1635 },
  },
  {
    title: 'Share with your network',
    description: "Interested investors tell you how much they'd commit, what they bring, and who else might want in.",
    image: { src: '/assets/pages/in-action-2.e1f62643.png', w: 1179, h: 1440 },
    constrained: true,
  },
  {
    title: 'Extract value',
    description: 'Investors complete requests like customer intros and services while they wait.',
    image: { src: '/assets/pages/in-action-extract-value.32157404.png', w: 1179, h: 1440 },
    constrained: true,
  },
  {
    title: 'Open your round when ready',
    description:
      'Once interest hits critical mass, turn waitlist demand into a live raise using the same investor data. Close it as either a direct raise or an RUV.',
    image: { src: '/assets/pages/sign-safe.7c6f010b.png', w: 1280, h: 898 },
  },
]

// §1.5 Capabilities
export const CAPABILITIES = [
  { title: 'Free forever', text: 'No fees to create or manage your investor waitlist.' },
  {
    title: 'Capture investor intent',
    text: 'Interested investors share their intended amount, value-add, and referrals — so you know exactly who is ready to commit.',
  },
  {
    title: 'Launch when ready',
    text: 'When you are ready to raise, convert your waitlist into a live financing round. All investor data carries over whether you use a Roll Up Vehicle or on SAFEs.',
  },
  {
    title: 'Customizable startup-branded page',
    text: 'Your waitlist page is branded to your company, and you can add/edit the questions you want answered. Share a professional, custom link with your network.',
  },
  { title: 'Keep warm leads warm', text: 'Send new requests and updates to your waitlist.' },
  {
    title: 'Built-in intros',
    text: 'You can optionally enable waitlist members to intro you to others, so your waitlist can grow itself.',
  },
]

// §1.7 Pricing features
export const FEATURES = [
  'Startup-branded investor waitlist page',
  'Investor intent capture',
  'Analytics and tracking',
  'Launch-ready investor pipeline',
]

// §1.8 FAQ
export const FAQ_ITEMS = [
  {
    q: 'What is an investor waitlist on Rollups?',
    a: 'An investor waitlist lets you capture interest from investors you already know before you officially raise. Share a single link with your network, and they can express their intent to invest — including how much they want to commit and what value they bring.',
  },
  {
    q: 'Is it free to create an investor waitlist?',
    a: 'Yes, waitlists are completely free to create and manage. You only pay when you decide to use Rollups to launch the actual raise.',
  },
  {
    q: 'How do investors join my waitlist?',
    a: 'You share a unique link with your contacts and they fill out a simple form with their intended investment amount, value-add, and optionally refer other investors — all powered by AngelList investor accounts.',
  },
  {
    q: 'Can I convert my waitlist into a live round?',
    a: 'Yes. When you are ready to raise, Rollups carries your waitlist data into a live round so you can move from investor interest to committed capital without rebuilding your pipeline. Depending on your setup, that can be a direct raise or a Roll Up Vehicle.',
  },
  {
    q: 'Is my data secure?',
    a: "Absolutely. Rollups is built on AngelList infrastructure, which manages over $171B in assets on platform. Your data and your investors' information are protected with enterprise-grade security.",
  },
  {
    q: 'Do I need to be ready to raise to create an investor waitlist?',
    a: 'No. That is the whole point. A waitlist lets you organize your investor relationships early — months before you plan to raise — so when you are ready, you already have committed interest lined up.',
  },
  {
    q: "What happens to investors on my waitlist if I don't raise?",
    a: 'Nothing. There is no commitment from you or anyone on your waitlist until you decide to open a live round. You can keep your waitlist open indefinitely.',
  },
]
