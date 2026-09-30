// CLONE_SPEC_PRODUCTS.md §4.3. Labels, titles, images and list items are verbatim.
// The spec records only the opening words and the word counts of each description, so the rest is
// neutral placeholder copy of matching length (paragraph word counts noted per card).
export const RAISE_CARDS = [
  {
    id: 'raise-with-ruvs',
    sidebar: 'Take on direct shareholders',
    label: 'Option 1',
    title: 'Sign SAFEs/equity docs with every investor individually.',
    image: { src: '/assets/pages/raise-directly.6c117944.png', w: 742, h: 946 },
    // 40 + 36 words
    description: [
      'Founders sign SAFEs or equity documents with every investor individually. Placeholder copy: this paragraph will describe what that process looks like early on and why it can seem quite simple, before the ongoing workload of many separate investors becomes clear.',
      'Placeholder copy: this second paragraph will explain how a long list of small direct investors can affect later fundraising, including how investors may view the cap table and how legal and accounting costs change over time.',
    ],
    list: [
      'Annoying to manage and keep up with',
      'Adds admin costs and slows down your company',
      'Creates a messy cap table, which might make future VCs hesitate to invest.',
    ],
  },
  {
    id: 'cap-table-cleanup',
    sidebar: 'A VC runs a SPV',
    label: 'Option 2',
    title: 'Get a VC to run a SPV into your company',
    image: { src: '/assets/pages/spv.19f9ba70.png', w: 813, h: 718 },
    // 50 + 34 words
    description: [
      'Founders ask a VC to run an SPV to pool their investors. Placeholder copy: this paragraph will say how that setup works, who sets up the vehicle, how fees are taken from investors in it, and what the founder must do to find a firm that will take it on.',
      'Placeholder copy: this second paragraph will summarize the tradeoffs involved, like the incentives of the organization that manages it and the uncomfortable position a founder is in if they decide to run it themselves.',
    ],
    list: [
      'Works to pool investors effectively',
      "But your investors are paying, and the VC isn't making any carry.",
      'And SPVs with founders as the GP are risky, as they must represent both the company and the investors in the SPV.',
    ],
  },
  {
    id: 'streamline-acquisitions',
    sidebar: 'Founder runs a RUV',
    label: 'Option 3',
    title: 'Get the benefits of an SPV, but built for founders',
    image: { src: '/assets/pages/rollup.98c7b028.png', w: 790, h: 860 },
    // 49 + 47 words
    description: [
      'RUVs give founders the benefits of an SPV - pooling investors into a single entity - but without needing a VC. Placeholder copy: this paragraph will explain how a founder sets up the vehicle, invites investors, and then closes the round with a single line on the cap table.',
      'Placeholder copy: this second paragraph will describe how the vehicle is administered after the round closes, how investor costs compare with those of a traditional SPV, and how the built-in advisor role helps protect the founder from the conflicts that can arise when managing investor money directly.',
    ],
    list: [
      'Pool investors, avoid the mess.',
      "Lead your own vehicle, don't worry about talking a GP into doing it for free.",
      "Avoid charging your investors fees/carry, while also protecting yourself from risks with RUV's built-in Advisor",
    ],
  },
]
