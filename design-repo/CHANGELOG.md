# Changelog

## 1.0.0 — initial build (Situation A: from scratch)

Built against the real, current state of the sibling cloned marketing-site
project (not referenced by its local filesystem path anywhere in this
package — see `extraction/measured-values.json`).

### Spot-check findings before building (per BUILD-GUIDE.md Situation-A step 1)

`CLONE_SPEC*.md` treated as a strong first draft, spot-checked against real
`src/` files before trusting:

- Confirmed: route table (15 Layout-wrapped routes + `/get-started`/`/setup`
  sibling route), design tokens in `src/index.css`/`tailwind.config.js`, and
  most page-level section orders matched the pre-investigated brief closely.
- **Corrected**: `/safe` and `/ruv` were briefed as "variant A, same shape —
  confirm by diffing." Direct inspection of `Safe.jsx` showed it has **no
  `TestimonialSlider`** — a genuinely shorter node sequence than `/ruv`. Built
  as two separate templates (`template.product-landing` vs
  `template.product-landing-lite`), not one template with a variant flag.
- **Corrected**: `/consolidate` was briefed as "variant A or B — decide based
  on real differences." Its hero is a dual desktop/mobile Lenis +
  scroll-scrubbed-Lottie shell, structurally distinct from every other hero on
  the site, while every section AFTER the hero is identical in sequence to
  `/ruv`. Built as `template.product-landing-scroll` — same tail as
  `template.product-landing`, distinct hero node only.
- **New finding, not in the original brief**: `/ruv/calculator` was assumed
  possibly related to `/how-to-raise-capital`'s tail (both share
  `Calculator`/`FactsCta`/`StoriesGrid` components). Direct inspection
  confirmed `/ruv/calculator` has its own hero and does **not** render
  `founder-options`/`how-to-raise.steps`/`comparison.table`/`clean-captable`
  — built as its own template, `template.calculator-tool`.
- **New finding, not in the original brief**: the Navbar's dropdown menus
  (`src/components/navbar/menus.js`) reference `/secondary-vehicles` and
  `/control-os` — two dead links with no matching route in `routes.jsx` or
  `App.jsx`, distinct from the two dummy Placeholder stubs. Documented in
  `extraction/measured-values.json` and `README.md`; not modeled as a
  generatable page.
- Confirmed the pre-investigated section count claims resolved to **38 real
  section files** on disk (not a round number assumed up front) and **9
  components** / **7 primitives**, for **54 total allowlist entries** — proven
  exact by an automated parity check, not a hand count.

### Built

- 10 foundation token files (9 enforced + 1 documentation-only SignUp
  exception), 3 semantic, 2 component-scoped, 1 layout, 1 theme.
- 7 primitives, 9 components, 38 sections — one contract per distinct real
  content-bearing UI unit observed in `src/`.
- 12 templates mapped 1:1 to the 15 real Layout-wrapped routes (verified: 0
  gaps, 0 double-assignments).
- `compatibility/graph.json` — 10 rules, each checked against
  `templates/templates.json`'s real node sequences at write time (per
  MASTER-GUIDE.md 3.18), not assumption.
- `schema/pagespec.schema.json` — Draft-07, closed template/section/motion
  enums, `additionalProperties: false` throughout.
- `schema/example.pagespec.json` — real `/ruv` copy, 0 schema errors, 0
  semantic-validator errors.
- `schema/semantic_validate.py` — cross-references a PageSpec's declared
  `template` against that template's real node list (not `nodes[]` checked in
  isolation), enforces rhythm rules by severity, required
  `reducedMotionFallback`, and per-instance `maxWords` (including recursing
  into array-of-component-ref fields like `faq.accordion.items` — a bug this
  build's own adversarial suite caught and a follow-up fix corrected before
  shipping, see below).
- `schema/tests/adversarial_test.py` — 40 assertions: every one of the 12 real
  templates synthesizes a passing minimal control instance, the real example
  passes, and 12 categories of mutation (schema-layer, structural, runtime,
  template/rhythm-rule-specific) are all rejected.
- `extraction/verify_all.py` — manifest-counts recompute-and-compare,
  allowlist parity, allowlistVersion parity, citation-range validity
  (graceful no-sibling degradation), pinned-value asset-role check, no
  absolute-path check, entryPoints self-containment check.

### Bug caught and fixed during this same build session (not a later review)

`schema/tests/adversarial_test.py`'s maxWords-overflow mutation on a real FAQ
answer field initially was **not** rejected by `semantic_validate.py` — the
original `_check_maxwords` only checked top-level string fields on a
section's own `content` contract, but `faq.accordion.items` is an array of
`{"type":"ref","component":"component.faq-item"}` refs, so the real
`maxWords` budget lives in the component contract, one level deeper. Fixed by
teaching `_check_maxwords` to recurse into array-of-component-ref fields and
resolve budgets from the referenced component's own `fields`. Re-ran the full
adversarial suite after the fix: 40/40 pass (was 39/40 before the fix).

### Verification output (see caller's final report for the full transcript)

1. Draft-07 schema validation: 0 errors on the real example and all 12
   synthesized template controls.
2. Adversarial suite: 40/40 — every control passes, every mutation rejected.
3. Self-containment: `design-repo/` copied to an isolated `/tmp` directory
   with zero siblings; `verify_all.py` and `adversarial_test.py` both re-run
   clean there (citation-range check degrades to a graceful warning in that
   environment, as designed, since no sibling source tree exists there).
4. Zip cleanliness: packaged with CLI `zip`, `unzip -l design-repo.zip |
   grep -ic "__MACOSX\|\.DS_Store"` → `0`. Regenerated fresh, last, after all
   fixes — confirmed via `find design-repo -type f -newer design-repo.zip`
   returning nothing.
