# https://rollups.com (marketing site) + https://app.rollups.com/setup (sign-up app) — cloned into /Users/riyaghosh/V3/rollups

Source: https://rollups.com (marketing site) + https://app.rollups.com/setup (sign-up app) — cloned into /Users/riyaghosh/V3/rollups
Status: **measured-from-mirror** · production approved: **false**
25 routes · 12 templates · 34 unique sections

> Generated from `ia.json` by `build.mjs`. Edit the JSON, not this file.

## Shape of the site

The largest 3 templates (Blog article, Legal document, Product landing (RUV / Consolidate)) account for 14 of 25 routes (56%). The remaining 11 routes span 9 templates.

| template | routes | share |
|---|---:|---:|
| Blog article | 9 | 36% |
| Legal document | 3 | 12% |
| Product landing (RUV / Consolidate) | 2 | 8% |
| Placeholder stub | 2 | 8% |
| Sign up / log in | 2 | 8% |
| Homepage | 1 | 4% |
| SAFE product landing | 1 | 4% |
| RUV calculator | 1 | 4% |
| How to raise capital guide | 1 | 4% |
| Waitlist landing | 1 | 4% |
| Contact form | 1 | 4% |
| Blog index | 1 | 4% |

## Page chrome

**23 routes carry chrome = `full`** — Homepage, Product landing (RUV / Consolidate), SAFE product landing, RUV calculator, How to raise capital guide, Waitlist landing, Contact form, Blog index, Blog article, Legal document, Placeholder stub.

**2 routes carry chrome = `none`** — Sign up / log in.

## Sections by reuse

How widely a section is shared determines whether it belongs in a shared
component library or stays local to its page.

| section | category | templates | routes | implementation | scope |
|---|---|---:|---:|---|---|
| `shell.navbar` | SHELL | 11 | 23 | `src/components/Navbar.jsx` | Present on all 23 routes inside the shared Layout (every route except /get-started and /setup, which mount SignUp outside it). |
| `shell.footer` | SHELL | 11 | 23 | `src/components/Footer.jsx` | Present on all 23 routes inside the shared Layout. |
| `shell.cookie-bar` | SHELL | 11 | 23 | `src/components/CookieBar.jsx` | Present on all 23 routes inside the shared Layout. |
| `content.article-body` | CONTENT | 1 | 9 | `src/components/blog/ArticleBody.jsx` | All 9 blog article routes under /blog/:slug, rendered by one component but with per-article block data (src/data/articles.js) producing 4 real structural variants: 5 case-study articles share one shape (author+h2+hl+p+quote, no h3/hr/table); why-clean-captable-matters and announcing-rollups each have their own distinct shape (h2/h3/hr/ol/ul with no quote, vs h2/h3/ol/ul with no hr/quote respectively); how-ruvs-simplify-fundraising adds a numbered 'process' block; special-purpose-vehicles-for-startups-guide is the only one with blockquotes and a table. |
| `content.article-meta` | CONTENT | 1 | 9 | `src/components/blog/ArticleMeta.jsx` | All 9 blog article routes. |
| `faq.accordion` | FAQ | 6 | 7 | `src/components/Faq.jsx` | Homepage, /ruv, /ruv/calculator, /safe, /how-to-raise-capital, /consolidate, /waitlist — 7 routes, one shared component taking a title + items prop (item counts real and vary: 5 homepage/SAFE-adjacent items, 9 RUV items reused on /ruv/calculator and /how-to-raise-capital, 3 on /consolidate, 7 on /waitlist). |
| `proof.companies-grid` | PROOF | 4 | 5 | `src/components/Companies.jsx` | Homepage plus /ruv, /safe, /consolidate, /waitlist — 5 routes, same component with a title prop. |
| `features.capabilities` | FEATURES | 3 | 4 | `src/components/shared/Capabilities.jsx` | /ruv, /safe, /consolidate, /waitlist — 4 routes, shared component with page-specific items. |
| `commerce.pricing` | COMMERCE | 3 | 4 | `src/components/shared/Pricing.jsx` | /ruv, /safe, /consolidate, /waitlist — 4 routes, shared component with page-specific title/cells props. |
| `features.use-case-tabs` | FEATURES | 2 | 3 | `src/components/shared/UseCaseTabs.jsx` | /ruv, /safe, /consolidate — 3 routes, shared component with page-specific items. |
| `content.legal-body` | CONTENT | 1 | 3 | `src/components/legal/LegalContent.jsx` | /privacy-policy, /terms-of-service, /disclosures — 3 routes, one shared component (disclosures uses paragraph pseudo-headings instead of real headings, per source structure). |
| `proof.stories-grid` | PROOF | 2 | 2 | `src/components/calculator/StoriesGrid.jsx` | /ruv/calculator and /how-to-raise-capital — 2 routes, shared component. |
| `commerce.calculator` | COMMERCE | 2 | 2 | `src/components/calculator/Calculator.jsx` | /ruv/calculator and /how-to-raise-capital — 2 routes, shared component. |
| `commerce.facts-cta` | COMMERCE | 2 | 2 | `src/components/calculator/FactsCta.jsx` | /ruv/calculator and /how-to-raise-capital — 2 routes, shared component. |
| `hero.product-raise` | HERO | 1 | 2 | `src/components/Hero.jsx (RaiseHeroAnimation / HeroLeftBlock variants)` | Shared shape used by /ruv and /consolidate (2 routes) — same underlying Hero.jsx props contract, though /consolidate additionally wraps it with Lenis smooth-scroll and a scroll-scrubbed animation (see motion note on template.product-consolidate). |
| `proof.testimonial-slider` | PROOF | 1 | 2 | `src/components/shared/TestimonialSlider.jsx` | /ruv (8 cards) and /consolidate (7 cards) — 2 routes. |
| `form.signup` | FORM | 1 | 2 | `src/pages/SignUp.jsx` | /get-started and /setup — 1 template, 2 route aliases, mounted as a sibling <Route> outside the shared Layout (no shell.* sections apply here). |
| `utility.placeholder-stub` | UTILITY | 1 | 2 | `src/pages/Placeholder.jsx` | /careers and /customers — 2 dummy routes, not real rollups.com content. |
| `hero.marketing-home` | HERO | 1 | 1 | `src/components/Hero.jsx` | Homepage only (1 route). |
| `hero.safe` | HERO | 1 | 1 | `src/pages/Safe.jsx (SafeHero, FlipCard)` | /safe only (1 route). |
| `hero.raise-guide` | HERO | 1 | 1 | `src/components/raise/RaiseHero.jsx` | /how-to-raise-capital only (1 route). |
| `hero.calculator` | HERO | 1 | 1 | `src/pages/RuvCalculator.jsx (CalculatorHero)` | /ruv/calculator only (1 route). |
| `hero.waitlist` | HERO | 1 | 1 | `src/components/waitlist/WaitlistHero.jsx` | /waitlist only (1 route). |
| `proof.waitlist-trust` | PROOF | 1 | 1 | `src/components/waitlist/WaitlistTrust.jsx` | /waitlist only (1 route). |
| `features.products-raise-consolidate` | FEATURES | 1 | 1 | `src/components/Products.jsx` | Homepage only (1 route). |
| `features.rollups-in-action` | FEATURES | 1 | 1 | `src/components/RollupsInAction.jsx` | Homepage only (1 route). |
| `features.stages` | FEATURES | 1 | 1 | `src/components/Stages.jsx` | Homepage only (1 route). |
| `features.founder-options` | FEATURES | 1 | 1 | `src/components/raise/FounderOptions.jsx` | /how-to-raise-capital only (1 route). |
| `features.how-to-raise` | FEATURES | 1 | 1 | `src/components/raise/HowToRaiseSection.jsx` | /how-to-raise-capital only (1 route). |
| `features.comparison-table` | FEATURES | 1 | 1 | `src/components/raise/ComparisonTable.jsx` | /how-to-raise-capital only (1 route). |
| `features.clean-cap-table` | FEATURES | 1 | 1 | `src/components/raise/CleanCapTable.jsx` | /how-to-raise-capital only (1 route). |
| `features.waitlist-how-it-works` | FEATURES | 1 | 1 | `src/components/waitlist/HowItWorks.jsx` | /waitlist only (1 route). |
| `content.blog-index` | CONTENT | 1 | 1 | `src/pages/Blog.jsx, src/components/blog/BlogCard.jsx` | /blog only (1 route). |
| `form.contact` | FORM | 1 | 1 | `src/components/contact/ContactForm.jsx` | /contact-us only (1 route). |

**11 shared sections** appear in more than one template and belong in a component library.

**23 single-use sections** appear in exactly one template. Building these
as "reusable" components up front would be speculative — keep them page-local
until a second caller actually appears.

## Templates

### Homepage — `template.marketing-home`

1 route · `/` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×11 |
| 2 | HERO | `hero.marketing-home` | page-local |
| 3 | FEATURES | `features.products-raise-consolidate` | page-local |
| 4 | FEATURES | `features.rollups-in-action` | page-local |
| 5 | FEATURES | `features.stages` | page-local |
| 6 | PROOF | `proof.companies-grid` | shared ×4 |
| 7 | FAQ | `faq.accordion` | shared ×6 |
| 8 | SHELL | `shell.footer` | shared ×11 |
| 9 | SHELL | `shell.cookie-bar` | shared ×11 |

### Product landing (RUV / Consolidate) — `template.product-landing`

2 routes · `/ruv`, `/consolidate` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×11 |
| 2 | HERO | `hero.product-raise` | page-local |
| 3 | PROOF | `proof.testimonial-slider` | page-local |
| 4 | FEATURES | `features.use-case-tabs` | shared ×2 |
| 5 | FEATURES | `features.capabilities` | shared ×3 |
| 6 | PROOF | `proof.companies-grid` | shared ×4 |
| 7 | COMMERCE | `commerce.pricing` | shared ×3 |
| 8 | FAQ | `faq.accordion` | shared ×6 |
| 9 | SHELL | `shell.footer` | shared ×11 |
| 10 | SHELL | `shell.cookie-bar` | shared ×11 |

### SAFE product landing — `template.safe-landing`

1 route · `/safe` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×11 |
| 2 | HERO | `hero.safe` | page-local |
| 3 | FEATURES | `features.use-case-tabs` | shared ×2 |
| 4 | FEATURES | `features.capabilities` | shared ×3 |
| 5 | PROOF | `proof.companies-grid` | shared ×4 |
| 6 | COMMERCE | `commerce.pricing` | shared ×3 |
| 7 | FAQ | `faq.accordion` | shared ×6 |
| 8 | SHELL | `shell.footer` | shared ×11 |
| 9 | SHELL | `shell.cookie-bar` | shared ×11 |

### RUV calculator — `template.calculator-tool`

1 route · `/ruv/calculator` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×11 |
| 2 | HERO | `hero.calculator` | page-local |
| 3 | COMMERCE | `commerce.calculator` | shared ×2 |
| 4 | COMMERCE | `commerce.facts-cta` | shared ×2 |
| 5 | PROOF | `proof.stories-grid` | shared ×2 |
| 6 | FAQ | `faq.accordion` | shared ×6 |
| 7 | SHELL | `shell.footer` | shared ×11 |
| 8 | SHELL | `shell.cookie-bar` | shared ×11 |

### How to raise capital guide — `template.raise-guide`

1 route · `/how-to-raise-capital` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×11 |
| 2 | HERO | `hero.raise-guide` | page-local |
| 3 | FEATURES | `features.founder-options` | page-local |
| 4 | FEATURES | `features.how-to-raise` | page-local |
| 5 | FEATURES | `features.comparison-table` | page-local |
| 6 | FEATURES | `features.clean-cap-table` | page-local |
| 7 | COMMERCE | `commerce.facts-cta` | shared ×2 |
| 8 | COMMERCE | `commerce.calculator` | shared ×2 |
| 9 | PROOF | `proof.stories-grid` | shared ×2 |
| 10 | FAQ | `faq.accordion` | shared ×6 |
| 11 | SHELL | `shell.footer` | shared ×11 |
| 12 | SHELL | `shell.cookie-bar` | shared ×11 |

### Waitlist landing — `template.waitlist-landing`

1 route · `/waitlist` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×11 |
| 2 | HERO | `hero.waitlist` | page-local |
| 3 | PROOF | `proof.waitlist-trust` | page-local |
| 4 | FEATURES | `features.waitlist-how-it-works` | page-local |
| 5 | FEATURES | `features.capabilities` | shared ×3 |
| 6 | PROOF | `proof.companies-grid` | shared ×4 |
| 7 | COMMERCE | `commerce.pricing` | shared ×3 |
| 8 | FAQ | `faq.accordion` | shared ×6 |
| 9 | SHELL | `shell.footer` | shared ×11 |
| 10 | SHELL | `shell.cookie-bar` | shared ×11 |

### Contact form — `template.contact-form`

1 route · `/contact-us` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×11 |
| 2 | FORM | `form.contact` | page-local |
| 3 | SHELL | `shell.footer` | shared ×11 |
| 4 | SHELL | `shell.cookie-bar` | shared ×11 |

### Blog index — `template.blog-index`

1 route · `/blog` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×11 |
| 2 | CONTENT | `content.blog-index` | page-local |
| 3 | SHELL | `shell.footer` | shared ×11 |
| 4 | SHELL | `shell.cookie-bar` | shared ×11 |

### Blog article — `template.blog-post`

9 routes · `/blog/why-clean-captable-matters`, `/blog/case-study-mem0-ruv`, `/blog/case-study-itemfarm-streamlined-fundraise-ruv`, `/blog/case-study-heron-power-strategic-investors-ruv`, `/blog/how-ruvs-simplify-fundraising`, `/blog/case-study-cimento-ai-angel-investors-ruv`, `/blog/announcing-rollups`, `/blog/case-study-secureframe-maximize-captable-value-ruv`, `/blog/special-purpose-vehicles-for-startups-guide` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×11 |
| 2 | CONTENT | `content.article-meta` | page-local |
| 3 | CONTENT | `content.article-body` | page-local |
| 4 | SHELL | `shell.footer` | shared ×11 |
| 5 | SHELL | `shell.cookie-bar` | shared ×11 |

### Legal document — `template.legal-doc`

3 routes · `/privacy-policy`, `/terms-of-service`, `/disclosures` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×11 |
| 2 | CONTENT | `content.legal-body` | page-local |
| 3 | SHELL | `shell.footer` | shared ×11 |
| 4 | SHELL | `shell.cookie-bar` | shared ×11 |

### Placeholder stub — `template.placeholder-stub`

2 routes · `/careers`, `/customers` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.navbar` | shared ×11 |
| 2 | UTILITY | `utility.placeholder-stub` | page-local |
| 3 | SHELL | `shell.footer` | shared ×11 |
| 4 | SHELL | `shell.cookie-bar` | shared ×11 |

### Sign up / log in — `template.signup`

2 routes · `/get-started`, `/setup` · chrome: **none**

| # | category | section | |
|---:|---|---|---|
| 1 | FORM | `form.signup` | page-local |

## Section reference

### SHELL

_Chrome shared across the marketing site: fixed navbar, footer, cookie consent bar. Present on every route inside the shared Layout; absent on the standalone sign-up app._

**`shell.navbar`** — Fixed, blurred-background top navigation: logo/wordmark, Products/Resources dropdowns, Sign In and Get Started actions, mobile hamburger menu.

· Present on all 23 routes inside the shared Layout (every route except /get-started and /setup, which mount SignUp outside it). · appears on 23 routes · implemented by `src/components/Navbar.jsx`

**`shell.footer`** — Site footer: link columns, self-drawing line illustration, 'One Line on Your Cap Table' marquee, copyright, per-page AI-summary links (ChatGPT/Claude) that vary by current route.

· Present on all 23 routes inside the shared Layout. · appears on 23 routes · implemented by `src/components/Footer.jsx`

**`shell.cookie-bar`** — Fixed bottom-right cookie consent bar with accept/decline, slides in on load and remembers the choice in localStorage.

· Present on all 23 routes inside the shared Layout. · appears on 23 routes · implemented by `src/components/CookieBar.jsx`

### HERO

_Above-the-fold, page-opening block: headline, primary CTA, and page-specific supporting art (Lottie animation, flip card, or stat row)._

**`hero.marketing-home`** — Homepage hero: announcement banner, 'Take control of your equity' headline, an embedded HeroEmailForm capture (productInterest defaults to the general homepage value), AI-summary links, trusted-by logo row, hero Lottie animation (desktop) / logo marquee (mobile). The email form is a props-driven sub-piece of this component, not a separately placed section — see HeroEmailForm in Hero.jsx.

· Homepage only (1 route). · appears on 1 routes · implemented by `src/components/Hero.jsx`

**`hero.product-raise`** — Product-page hero built on the shared Hero component with page-specific heading/description, an embedded HeroEmailForm whose productInterest prop is set per page ('Roll Up Vehicles' on /ruv, 'Consolidation Vehicles' on /consolidate), and a looping product Lottie animation to the right.

· Shared shape used by /ruv and /consolidate (2 routes) — same underlying Hero.jsx props contract, though /consolidate additionally wraps it with Lenis smooth-scroll and a scroll-scrubbed animation (see motion note on template.product-consolidate). · appears on 2 routes · implemented by `src/components/Hero.jsx (RaiseHeroAnimation / HeroLeftBlock variants)`

**`hero.safe`** — Custom SAFE-page hero: headline, 'Start Raising' CTA, and a flip card that auto-rotates between two product screenshots every 10s until the user interacts.

· /safe only (1 route). · appears on 1 routes · implemented by `src/pages/Safe.jsx (SafeHero, FlipCard)`

**`hero.raise-guide`** — 'How to raise capital' hero: headline, 3 stat callouts, and a link to the in-page calculator anchor.

· /how-to-raise-capital only (1 route). · appears on 1 routes · implemented by `src/components/raise/RaiseHero.jsx`

**`hero.calculator`** — Calculator-page hero: title and intro copy framing the cost calculator below.

· /ruv/calculator only (1 route). · appears on 1 routes · implemented by `src/pages/RuvCalculator.jsx (CalculatorHero)`

**`hero.waitlist`** — Waitlist hero: headline plus a 16:9 flip card (company dashboard front/back) that auto-flips every 10s until clicked.

· /waitlist only (1 route). · appears on 1 routes · implemented by `src/components/waitlist/WaitlistHero.jsx`

### PROOF

_Social proof: testimonial slider/quotes, investor/company logo grid, customer stories._

**`proof.testimonial-slider`** — Horizontally-scrollable slider of customer/investor testimonial cards with quote, author meta, and photo.

· /ruv (8 cards) and /consolidate (7 cards) — 2 routes. · appears on 2 routes · implemented by `src/components/shared/TestimonialSlider.jsx`

**`proof.companies-grid`** — 6x2 grid of investor/law-firm/company logos, each cell looping a GSAP wipe between two real logos; heading text varies per page.

· Homepage plus /ruv, /safe, /consolidate, /waitlist — 5 routes, same component with a title prop. · appears on 5 routes · implemented by `src/components/Companies.jsx`

**`proof.waitlist-trust`** — Trust band: heading, supporting copy, an italic founder quote (Cal.com) with logo, and a trusted-logo row.

· /waitlist only (1 route). · appears on 1 routes · implemented by `src/components/waitlist/WaitlistTrust.jsx`

**`proof.stories-grid`** — 4-card grid of customer story summaries with logo, quote, and outcome, linking toward /customers.

· /ruv/calculator and /how-to-raise-capital — 2 routes, shared component. · appears on 2 routes · implemented by `src/components/calculator/StoriesGrid.jsx`

### FEATURES

_Product explanation and capability modules: capability grids, use-case tabs, step-by-step 'how it works' cards, comparison content._

**`features.products-raise-consolidate`** — 'Two ways companies use Rollups' — Raise and Consolidate columns, each looping its own product Lottie; collapses to tabs below 992px.

· Homepage only (1 route). · appears on 1 routes · implemented by `src/components/Products.jsx`

**`features.rollups-in-action`** — Sticky numbered sidebar plus 3 ActionCards (image, step list, 'Show testimonial' toggle) describing the product flow.

· Homepage only (1 route). · appears on 1 routes · implemented by `src/components/RollupsInAction.jsx`

**`features.stages`** — 'Used by companies at every stage' — a self-drawing curve (GSAP DrawSVG) with 5 stage labels; becomes a swipeable slider on mobile.

· Homepage only (1 route). · appears on 1 routes · implemented by `src/components/Stages.jsx`

**`features.use-case-tabs`** — 'How it works' tabbed use-case explainer: switchable tabs, each revealing a set of step cards with image and copy.

· /ruv, /safe, /consolidate — 3 routes, shared component with page-specific items. · appears on 3 routes · implemented by `src/components/shared/UseCaseTabs.jsx`

**`features.capabilities`** — Numbered capability grid; some items open an image modal with additional detail.

· /ruv, /safe, /consolidate, /waitlist — 4 routes, shared component with page-specific items. · appears on 4 routes · implemented by `src/components/shared/Capabilities.jsx`

**`features.founder-options`** — 'Three ways founders raise capital' — 3 option cards, one marked 'Best option'.

· /how-to-raise-capital only (1 route). · appears on 1 routes · implemented by `src/components/raise/FounderOptions.jsx`

**`features.how-to-raise`** — 3 option cards paired with a sticky sidebar that tracks scroll position, reusing the homepage's scroll-sync logic under how-to-raise-* class names.

· /how-to-raise-capital only (1 route). · appears on 1 routes · implemented by `src/components/raise/HowToRaiseSection.jsx`

**`features.comparison-table`** — 4-column x 7-row comparison table; scrolls horizontally with edge fades at ≤991px.

· /how-to-raise-capital only (1 route). · appears on 1 routes · implemented by `src/components/raise/ComparisonTable.jsx`

**`features.clean-cap-table`** — 'The difference is a clean cap table' — two static illustrated SVG comparison panels (with vs without a RUV).

· /how-to-raise-capital only (1 route). · appears on 1 routes · implemented by `src/components/raise/CleanCapTable.jsx`

**`features.waitlist-how-it-works`** — 4-card 'how it works' walkthrough with an empty sidebar variant of the homepage ActionCard layout.

· /waitlist only (1 route). · appears on 1 routes · implemented by `src/components/waitlist/HowItWorks.jsx`

### COMMERCE

_Pricing, calculators, and conversion CTAs that lead toward signing up or contacting sales._

**`commerce.pricing`** — Pricing grid with plan cell(s), feature checklist, and CTA button; title and cell contents vary per page.

· /ruv, /safe, /consolidate, /waitlist — 4 routes, shared component with page-specific title/cells props. · appears on 4 routes · implemented by `src/components/shared/Pricing.jsx`

**`commerce.calculator`** — Interactive cost calculator: 4 base inputs + 5 advanced inputs, Seed/Equity scenario presets, live recompute on every keystroke, Reset button.

· /ruv/calculator and /how-to-raise-capital — 2 routes, shared component. · appears on 2 routes · implemented by `src/components/calculator/Calculator.jsx`

**`commerce.facts-cta`** — Stat band ($1.5B+ / 3,000+) with trusted logos and a 'Launch your ruv' CTA.

· /ruv/calculator and /how-to-raise-capital — 2 routes, shared component. · appears on 2 routes · implemented by `src/components/calculator/FactsCta.jsx`

### CONTENT

_Long-form or structured body content: article prose, legal document text, blog listing/filtering._

**`content.article-body`** — Structured article body: prose blocks (p/h2/h3/ul/ol/blockquote/table/hr) whose shape is real per article (paragraph/heading/list counts match the original), but whose actual wording is placeholder copy generated to match that shape — not the live site's real prose.

· All 9 blog article routes under /blog/:slug, rendered by one component but with per-article block data (src/data/articles.js) producing 4 real structural variants: 5 case-study articles share one shape (author+h2+hl+p+quote, no h3/hr/table); why-clean-captable-matters and announcing-rollups each have their own distinct shape (h2/h3/hr/ol/ul with no quote, vs h2/h3/ol/ul with no hr/quote respectively); how-ruvs-simplify-fundraising adds a numbered 'process' block; special-purpose-vehicles-for-startups-guide is the only one with blockquotes and a table. · appears on 9 routes · implemented by `src/components/blog/ArticleBody.jsx`

**`content.article-meta`** — Article metadata block: category, author (name/title/photo), publish date, reading time — rendered as a sticky sidebar (desktop) or inline block (mobile, <1200px).

· All 9 blog article routes. · appears on 9 routes · implemented by `src/components/blog/ArticleMeta.jsx`

**`content.blog-index`** — Blog listing: 4 client-side filter pills (no URL change), grid of BlogCards (title, excerpt, author, date, category, cover), 2 columns above 1200px / 1 below.

· /blog only (1 route). · appears on 1 routes · implemented by `src/pages/Blog.jsx, src/components/blog/BlogCard.jsx`

**`content.legal-body`** — Legal document body: centered 550px text column, 'Last modified' line, heading/paragraph blocks. Bodies are original placeholder text following the real outline shape (heading count, paragraph count) of the source document, not the live site's real legal text.

· /privacy-policy, /terms-of-service, /disclosures — 3 routes, one shared component (disclosures uses paragraph pseudo-headings instead of real headings, per source structure). · appears on 3 routes · implemented by `src/components/legal/LegalContent.jsx`

### FORM

_Data-collection forms: contact form, waitlist capture, the separate sign-up/login form._

**`form.contact`** — Two-column contact form: full field/validation states (4 error messages, email-format rules), a product-interest multiselect, ?email= prefill, and a 'What to expect' sidebar list. Submit is stubbed (no real endpoint) — shows a loading state then a stubbed 'submitted' state.

· /contact-us only (1 route). · appears on 1 routes · implemented by `src/components/contact/ContactForm.jsx`

**`form.signup`** — Single-field (email only) sign-up/login form belonging to a deliberately SEPARATE visual system (white background, AngelList/Inter fonts, teal/indigo palette — not the marketing site's dark tokens), cloned from the real app.rollups.com/setup page that 'Sign In'/'Get Started' link to on the live site. No navbar/footer. Submit is stubbed — simulates the loading label then a 'check your email' confirmation; no real magic-link backend.

· /get-started and /setup — 1 template, 2 route aliases, mounted as a sibling <Route> outside the shared Layout (no shell.* sections apply here). · appears on 2 routes · implemented by `src/pages/SignUp.jsx`

### FAQ

_Question/answer accordion content, present in several page-specific variants._

**`faq.accordion`** — Question/answer accordion, GSAP-animated open/close, first item open by default, plus an 'Ask anything else' free-text input (stubbed, no real backend).

· Homepage, /ruv, /ruv/calculator, /safe, /how-to-raise-capital, /consolidate, /waitlist — 7 routes, one shared component taking a title + items prop (item counts real and vary: 5 homepage/SAFE-adjacent items, 9 RUV items reused on /ruv/calculator and /how-to-raise-capital, 3 on /consolidate, 7 on /waitlist). · appears on 7 routes · implemented by `src/components/Faq.jsx`

### UTILITY

_Non-marketing scaffolding: placeholder/stub pages for links with no real destination in this clone._

**`utility.placeholder-stub`** — Minimal stub page (just a heading in a container) used for links that point at paths not present in the real rollups.com sitemap. Added by this clone so the footer 'Careers' link and the calculator page's 'Read more customer stories' link have somewhere to go instead of 404ing.

· /careers and /customers — 2 dummy routes, not real rollups.com content. · appears on 2 routes · implemented by `src/pages/Placeholder.jsx`
