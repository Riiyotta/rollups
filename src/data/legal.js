// Legal pages (CLONE_SPEC_CONTENT.md §5; recon/pages/legal.json).
// Titles, "Last modified" line, headings, list-heads and link texts/hrefs are verbatim.
// Paragraph bodies are original placeholder copy with the same shape and similar word counts.
// Block: { t: 'h2' | 'p' | 'list-head', text } ; p text may contain one {link} token replaced by `link`.
const LAST_MODIFIED = 'Last modified: Jul 1, 2025'

export const legalPages = {
  'privacy-policy': {
    title: 'Privacy Policy',
    metaTitle: 'Rollups | Privacy Policy',
    metaDescription: 'Simplify fundraises and clean up your cap table',
    lastModified: LAST_MODIFIED,
    blocks: [
      {
        t: 'p', // 32 words, 1 link
        text: 'This placeholder paragraph stands in for the privacy notice. It will explain in general terms how information is collected, used and protected, and where the full policy can be read {link}.',
        link: { text: 'here', href: 'https://venture.angellist.com/privacy' },
      },
    ],
  },
  'terms-of-service': {
    title: 'Terms of Service',
    metaTitle: 'Rollups | Terms of Service',
    metaDescription: 'Simplify fundraises and clean up your cap table',
    lastModified: LAST_MODIFIED,
    blocks: [
      { t: 'h2', text: 'Introduction' },
      {
        t: 'p', // 81 words, 1 link
        text: 'This placeholder paragraph introduces the terms that apply to the service. The final copy will describe, in plain and neutral language, who provides the platform, which parties are involved, and how the agreement is formed when someone creates an account or uses the product. It will also point readers to the related {link} for further detail, and explain that those terms may be updated from time to time. Nothing in this sample text is a binding statement or legal advice.',
        link: { text: 'AngelList Investing Platform Service Terms', href: 'https://venture.angellist.com/terms' },
      },
      {
        t: 'p', // 28 words, 1 link
        text: 'A second placeholder paragraph will describe the terms that apply to company users, and where to find the {link} that govern those accounts in more detail.',
        link: { text: 'AngelList Company Platform Service Terms', href: 'https://stack.angellist.com/terms' },
      },
      {
        t: 'p', // 28 words
        text: 'A closing placeholder paragraph will summarise how questions about these terms can be raised, and how updates to this page are communicated to people who use the service.',
      },
    ],
  },
  disclosures: {
    title: 'Disclosures',
    metaTitle: 'Rollups | Disclosures',
    metaDescription: 'Simplify fundraises and clean up your cap table',
    lastModified: LAST_MODIFIED,
    blocks: [
      {
        t: 'p', // 140 words
        text: 'This placeholder paragraph stands in for the general disclosure statement. The final copy will explain, in neutral terms, what the website is for and what it is not for. It will describe the kind of information shown on these pages, who prepares it, and the limits of that information. It will note that nothing on the site is an offer to sell or a solicitation to buy any security, and that any investment is made only through the relevant legal documents. It will explain that past results are not a guide to future outcomes, that figures may be estimates, and that readers should seek their own professional advice before making decisions. It will also describe which regulated entities provide which services, and where readers can find further regulatory information. This sample wording is not a legal statement.',
      },
      { t: 'list-head', text: 'Quotes' },
      {
        t: 'p', // 34 words
        text: 'Placeholder text for this item will explain that quoted statements reflect the views of the people quoted, may not be representative of other users, and should not be read as an endorsement or a guarantee.',
      },
      { t: 'list-head', text: 'Investing in Venture Capital Opportunities is Risky' },
      {
        t: 'p', // 43 words
        text: 'Placeholder text for this item will describe, in general terms, the risks involved in early-stage investing. It will note that investments can lose value, may be difficult to sell, and can take many years to return capital, if they return any at all.',
      },
      { t: 'list-head', text: 'AngelList' },
      {
        t: 'p', // 49 words
        text: 'Placeholder text for this item will describe the relationship between this website and its infrastructure provider in plain language. It will explain which company operates which part of the service, which entities hold the relevant registrations, and where readers can learn more about the provider and the services it supplies.',
      },
    ],
  },
}
