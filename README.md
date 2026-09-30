# Information architecture

This documents the route/template/section structure of the Rollups clone in
this folder — a React/Vite/Tailwind pixel-fidelity clone of
[rollups.com](https://rollups.com), plus a clone of the separate sign-up app
at `app.rollups.com/setup`.

**`ia.json` is the only file here to hand-edit.** `IA.md` and `matrix.csv`
are generated from it — never edit them directly, they'll be overwritten.

```bash
node validate.mjs   # checks route/template counts, referential integrity, category coverage
node build.mjs       # regenerates IA.md (readable doc) and matrix.csv (section × template matrix)
```

Re-run both after any edit to `ia.json`.

## What the data actually shows

- **25 routes across 12 templates**, but the effort isn't evenly spread: the
  3 largest templates — Blog article (9 routes), Legal document (3), and the
  shared Product landing shape (2) — account for 14 of 25 routes (56%). The
  other 11 routes are 9 distinct one-off templates, which is where most of
  the real page-specific build work lives (calculator, comparison table,
  waitlist flip card, contact form, etc.).
- **11 sections are shared across 2+ templates; 23 are single-use/page-local**
  (see `IA.md`'s "single-use sections" list). The navbar, footer, and cookie
  bar are the only sections on all 23 marketing routes. The next tier down —
  `faq.accordion`, `proof.companies-grid`, `features.capabilities`,
  `commerce.pricing` — is genuinely reused across the 3 product-landing-style
  pages (`/ruv`, `/safe`, `/consolidate`) plus `/waitlist`, which is exactly
  why those became real shared components (`src/components/shared/*`) in the
  actual build rather than four separate copies.
- **The 9 blog articles are one template, not nine** — but they aren't one
  identical shape either. Reading the real per-article block data
  (`src/data/articles.js`) shows 4 genuine structural variants: 5 case
  studies share one shape (pull quote + author + highlights box, no
  headings-with-subheads or table), `why-clean-captable-matters` and
  `announcing-rollups` each have their own distinct shape, and
  `special-purpose-vehicles-for-startups-guide` is the only one with
  blockquotes and a table. `content.article-body`'s scope prose records this
  explicitly — the validator's "8 route numbers vs. computed 9" note for that
  section is expected, not a bug: those are per-variant counts, not an
  alternate total.
- **`/get-started` (alias `/setup`) is a deliberately separate design system**,
  not a 13th marketing template with a typo. It's a clone of the real
  `app.rollups.com/setup` page — different app, different visual system (white
  background, Inter/AngelList fonts, teal/indigo palette vs. the marketing
  site's dark green + SuisseIntl/PP Neue Corp), mounted outside the shared
  Navbar/Footer `Layout` in `App.jsx`. It carries `chrome: "none"` for exactly
  this reason — it has no `shell.*` sections at all.
- **`/careers` and `/customers` are not real rollups.com pages.** They're
  dummy stubs this clone added (`src/pages/Placeholder.jsx`) so two
  internal-looking links — the footer's "Careers" and the calculator page's
  "Read more customer stories" — have somewhere to go instead of leaving the
  SPA or 404ing. `utility.placeholder-stub`'s scope says so explicitly; don't
  mistake the "Placeholder stub" row in `IA.md`'s template table for a real
  page type.

## Provenance

Built by reading the actual routing table (`src/App.jsx`, `src/pages/routes.jsx`)
and every page component's real top-level JSX (`src/pages/*.jsx`), not by
re-deriving structure from the `CLONE_SPEC*.md` build specs already in this
folder. Those specs (and `src/data/articles.js`'s own header comment) are the
source for one caveat worth repeating here: blog article bodies and legal
document bodies in this clone are placeholder text written to match the real
source's *structural shape* (paragraph/heading/list counts) — not the live
site's real prose. `content.article-body` and `content.legal-body`'s
descriptions say this explicitly so nobody mistakes the generated body copy
for real Rollups content.
