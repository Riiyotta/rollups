# Rollups Marketing Site — Design Repo

An AI-ready, machine-validated design system extracted from a pixel-fidelity
clone of https://rollups.com (React 18 + Vite + Tailwind CSS v3 + GSAP +
lottie-web + react-router-dom + Lenis on `/consolidate`), located at the
sibling project root during this build (`../`, not referenced by path
anywhere inside this package — see `extraction/measured-values.json`).

Built per this workspace's `design-repo-extraction` skill BUILD-GUIDE.md
methodology, bottom-up: tokens → primitives → components → sections →
templates → compatibility graph → schema → example instance → semantic
validator → adversarial tests → manifest/allowlist/docs.

## Status

`design-review-pending` / `productionApproved: false` — see
`registry.manifest.json`.

## Real counts (recomputed from disk, verified by `extraction/verify_all.py`)

| Layer | Count |
|---|---|
| Foundation token files | 10 (9 enforced marketing-site foundation + 1 documentation-only SignUp exception file) |
| Semantic token files | 3 |
| Component token files | 2 |
| Layout token files | 1 |
| Theme files | 1 |
| Primitives | 7 |
| Components | 9 |
| Sections | 38 |
| Templates | 12 |
| Compatibility graph rules | 10 |
| Asset roles (closed enum) | 12 |

## Route scope — three distinct tiers, do not conflate them

This clone mounts **16 total routes**. They are NOT all equivalent — read
this before generating anything:

1. **13 real cloned pages** (12 templates map to 15 routes 1:1; `/blog/:slug`
   covers 9 real article slugs under one template): `/`, `/ruv`,
   `/ruv/calculator`, `/safe`, `/how-to-raise-capital`, `/consolidate`,
   `/waitlist`, `/contact-us`, `/blog`, `/blog/:slug` (9 slugs),
   `/privacy-policy`, `/terms-of-service`, `/disclosures`.
2. **2 deliberate dummy stub pages**: `/careers`, `/customers`. These do
   **not** exist on the real rollups.com — they were added to this clone
   purely so two internal-looking links (footer "Careers", and the
   calculator page's "Read more customer stories") have somewhere to go
   instead of 404ing or leaving the SPA. `template.placeholder-stub`. Do not
   generate real marketing copy for these.
3. **1 structurally separate app page**: `/get-started` (alias `/setup`) —
   clones `app.rollups.com/setup`, a different real application (Rails +
   Bootstrap backend) with its own token system (white background,
   AngelList/Inter-family fonts, teal/indigo palette). It is mounted in
   `src/App.jsx` as a sibling `<Route>` **outside** the shared
   Navbar/Footer/CookieBar layout. **This design-repo intentionally excludes
   it from `templates/templates.json`** — see
   `tokens/00-foundation/color.signup.json` and
   `extraction/measured-values.json`'s `signupPageExclusion` note. Never
   merge its tokens into the marketing-site foundation palette.

13 real + 2 dummy + 1 separate-app = 16 total mounted routes, matching
`src/pages/routes.jsx` (15 entries, the 13 real + 2 dummy) plus
`src/App.jsx`'s sibling `/get-started` route (the `/setup` alias renders the
same component and is not counted twice).

## Other structurally unusual facts, documented rather than normalized away

- **Two nav-only dead links**: the Navbar's dropdown menus
  (`src/components/navbar/menus.js`) reference `/secondary-vehicles` and
  `/control-os`, neither of which has a matching route anywhere in
  `src/pages/routes.jsx` or `src/App.jsx`. Unlike `/careers`/`/customers`,
  these did **not** get dummy Placeholder routes. Not modeled as generatable
  pages in this design-repo. See `extraction/measured-values.json`
  `deadNavLinks`.
- **`/safe` genuinely has a shorter node sequence than `/ruv`/`/consolidate`**
  — no `testimonial.slider` section. Confirmed by direct inspection of
  `Safe.jsx` (no `TestimonialSlider` import anywhere in the file), not
  assumed by analogy. Enforced by `compatibility/graph.json`'s
  `TESTIMONIAL_SLIDER_SCOPE` rule and proven rejected in
  `schema/tests/adversarial_test.py`.
- **`/consolidate`'s hero is its own template-defining feature**: a dual
  desktop/mobile shell (Lenis smooth-scroll + a scroll-scrubbed Lottie
  snapping to 5 discrete progress points on desktop; ScrollTrigger-driven
  play/reset/replay on mobile) not present anywhere else on the site — hence
  `template.product-landing-scroll` as its own template rather than a "hero
  variant" flag on `template.product-landing`.
- **Content authenticity**: per `CLONE_SPEC_CONTENT.md` and
  `src/data/articles.js`'s own header comment, blog article bodies, legal
  document bodies, some long FAQ answers, and some option-card descriptions
  in **this source project** are placeholder/generic text matching only the
  real site's structural shape (paragraph counts, word counts, heading
  counts) — not rollups.com's actual live copy. Headings, titles, dates,
  authors, excerpts, stat numbers, and short labels/CTAs **are**
  real/verbatim. `maxWords` budgets throughout this design-repo are grounded
  in the real structural shape; treat body-copy examples as structural
  demonstrations, not literal brand copy to reuse. See
  `extraction/measured-values.json` `contentAuthenticity`.

## Real third-party content — compliance guidance

The source approximates a real company (Rollups / AngelList). Three asset
roles are **pinned** (not just closed-enum-membership-checked) to
`must-reuse-exact-or-omit`:

- `company-logo` — 24 real investor/company/law-firm logos across 12 pairs in
  the trusted-by and companies-grid sections.
- `trusted-by-logo` — 5 real logos (replit, Notion, Kit, BASE, Lovable) in
  hero/trust bands.
- `testimonial-author-photo` — real named individuals' headshots (e.g.
  `marie-founder.png` = Marie Schneegans).

`extraction/verify_all.py`'s pinned-asset-role check specifically rejects any
drift of these three roles' `generationPolicy` away from
`must-reuse-exact-or-omit` — a generic enum-membership check alone would not
catch a silent swap to `may-generate-new`. See `tokens/llm/asset-roles.json`.

## Verification

Run `extraction/verify_all.py` and `schema/tests/adversarial_test.py` — both
pass with zero failures as of this build. See `CHANGELOG.md` for the actual
verification output captured at ship time.
