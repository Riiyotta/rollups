Source: https://app.rollups.com/setup (reached by following the "Sign In" link on https://rollups.com, which points to https://app.rollups.com/get-started and 302-redirects to https://app.rollups.com/setup)

# Rollups app sign-up / login page: clone spec

Measured 2026-09-30 with headless Chromium (Playwright 1.63) at 1440×900, 1280×900 and 390×900, DPR 1. Values are computed styles pulled with `getComputedStyle`/`getBoundingClientRect` in one batched `page.evaluate`, plus the actual served CSS (`https://app.rollups.com/vite/assets/employee-DHAmJDqb.css` and `https://app.rollups.com/fonts/styles_1.0.3.css`) and page source (view-source, not rendered DOM diffing) for hover/focus/invalid states that can't be captured from a single static computed-style snapshot.

Screenshots: `/Users/riyaghosh/V3/rollups/recon/signup-1440.png` (full page, desktop), `/Users/riyaghosh/V3/rollups/recon/signup-390.png` (full page, mobile).

Assets downloaded (new, not already in `public/`):
- `/Users/riyaghosh/V3/rollups/public/svg/signup/logo-green.svg` — full wordmark lockup (mark + "rollups" text), viewBox `0 0 1920 485`. This is the logo actually used in the app header at `.navbar-brand-img`. It is **not** the same file as the marketing site's `public/svg/logo-rollups.svg` (that one is icon-only, viewBox `0 0 18 18`) — different asset, do not reuse.
- `/Users/riyaghosh/V3/rollups/public/svg/signup/logo-black.svg` — black variant of the same wordmark (referenced in page metadata as `buildLogo`, not visibly used on this page, saved for completeness).
- `/Users/riyaghosh/V3/rollups/public/assets/signup/apple-icon.png` — 180×180 apple-touch-icon for app.rollups.com (different from the marketing site's `public/apple-icon.png`).
- `/Users/riyaghosh/V3/rollups/public/assets/signup/favicon-32x32.png` — 32×32 favicon for app.rollups.com.

---

## 0. IMPORTANT — this is a different visual system from rollups.com

This page does **not** share design tokens with the rollups.com marketing site. Do not reuse the marketing site's CSS variables, fonts, or color palette. Specifically:

| | rollups.com (marketing) | app.rollups.com/setup (this page) |
|---|---|---|
| Fonts | SuisseIntl, PP Neue Corp, ABC Favorit Mono | **AngelList** (custom variable font, weight range 1–999) with **Inter** and system-sans fallback |
| Background | dark (`#1a1717` black) | **white** (`#ffffff`) |
| Primary text | light/cream (`#e4eac8`) | **dark teal** `rgb(0, 43, 49)` / `#002b31` |
| Accent/button color | green `#2a5d33` | **dark teal** `#002b31` (button bg), **teal** `#009bb1` (input focus ring) |
| Link color | — | **indigo/blue** `#5955ff` |
| Framework | Next.js, GSAP, Lottie | **Ruby on Rails** (server-rendered ERB), Bootstrap 4-derived utility classes, jQuery + rails-ujs, no GSAP/Lottie |
| Border hairlines | `#989e7b` @ 0.5px | `rgba(138,138,123,0.1)` @ 1px (line-divider only) |

Build this page as a self-contained visual system using the tokens below — do not inherit anything from `CLONE_SPEC.md`.

This is **not** a third-party auth widget (no Clerk/Auth0/Firebase Auth iframe or embed). It is a plain server-rendered HTML form (`<form action="/magic_link/register" method="post">`) styled with the app's own Bootstrap-based CSS bundle. It can be built as a normal form; there is no live widget to approximate.

---

## 1. Page flow / routing notes

- `https://rollups.com` → click "Sign In" (header, both desktop and mobile nav) → `href="https://app.rollups.com/get-started"`.
- `app.rollups.com/get-started` issues a redirect (likely 302) to `app.rollups.com/setup`, which serves the actual page (confirmed: `page.url()` after navigation and network-idle resolves to `/setup`, HTTP 200, page `<title>Rollups</title>`).
- The "Get Started" buttons on the marketing site (hero, footer, nav) go to `https://rollups.com/contact-us` instead — a different, separate contact/sales-lead form, **not** this page. Only "Sign In" reaches `/setup`.
- No visible multi-step flow on this page itself: it's a single email-capture step. Submitting presumably sends a magic-link email (POST to `/magic_link/register`) and the next step (code entry / redirect) happens after email verification, which is out of scope (we did not submit the form, per instructions).
- No OAuth/SSO buttons (no "Continue with Google" etc.) are present anywhere on this page.
- Below the form are two outbound links to sibling AngelList products (not part of this app, informational only): "Go to AngelList" (`https://venture.angellist.com/login`) and "Go to AngelList Stack" (`https://stack.angellist.com/login`).
- An invisible Google reCAPTCHA v2 badge is loaded (`grecaptcha-badge`, fixed position, bottom-right, `256×60`, translated off-screen at `right:-186px` until triggered). It's a bottom-right floating badge — include a placeholder/mimic only if reCAPTCHA integration is in scope; otherwise it can be omitted since it has no visual presence until interaction.

---

## 2. DOM structure (verbatim, simplified)

```html
<section>
  <div class="container d-flex flex-column">
    <div class="row align-items-center justify-content-center no-gutters min-vh-100">
      <div class="min-vh-100 col-12 col-md-8 col-lg-8 full-width-border">   <!-- centered content column, hairline L/R borders -->
        <div class="mt-6 mt-md-8">
          <a class="navbar-brand" href="/">
            <img src=".../logo-green-....svg" class="navbar-brand-img" alt="logos">
          </a>

          <div class="mt-8">
            <h1 class="mb-4 font-weight-bold">Sign up or log in to Rollups</h1>

            <p class="mb-2">Most people use their work email address to sign in to Rollups. Enter it below to get started.</p>

            <form class="mb-1 mt-2" action="/magic_link/register" accept-charset="UTF-8" method="post">
              <input type="hidden" name="authenticity_token" value="..." autocomplete="off">
              <div class="form-group">
                <label for="email">Email</label><br>
                <input id="email" autofocus placeholder="you@company.com" autocomplete="email" class="form-control" type="text" name="email">
              </div>
              <div class="actions">
                <input type="submit" name="commit" value="Get started" class="btn btn-block btn-primary mt-1" data-disable-with="Get started...">
              </div>
              <input autocomplete="off" type="hidden" name="data" id="data">
              <input autocomplete="off" type="hidden" name="referral" id="referral">
              <input autocomplete="off" type="hidden" name="ruv" id="ruv">
            </form>

            <div class="line-divider mt-6 mb-4">
              <p class="text-adapt-info text-muted mb-0">or</p>
            </div>

            <div class="mb-2 text-adapt-info">
              <span class="font-size-sm text-muted">Are you an investor looking to view your investing portfolio?
                <a class="text-info font-size-sm" href="https://venture.angellist.com/login">Go to AngelList</a></span>
            </div>
            <div class="mb-2 text-adapt-info">
              <span class="font-size-sm text-muted">Are you looking to manage your Cap Table?
                <a class="text-info font-size-sm" href="https://stack.angellist.com/login">Go to AngelList Stack</a></span>
            </div>

            <p class="mt-6 mb-0 font-size-sm text-left text-muted">
              <a class="py-6 text-muted font-size-sm" href="/terms">Terms and Conditions</a>
              ·
              <a class="py-6 text-muted font-size-sm" href="mailto:team@rollups.com">Help? Contact: team@rollups.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

Notes on structure:
- `.container` centers a single `.row` with `min-vh-100` (full viewport height) and vertical centering (`align-items-center`).
- The content column (`.col-12 col-md-8 col-lg-8`) has hairline vertical borders (`.full-width-border`) only on left/right, creating a bounded reading column against the full-bleed white page — visible in the screenshots as faint vertical rules at the column edges.
- Everything is server-rendered; no client hydration/JS framework markup.

---

## 3. Verbatim copy

- Logo alt text: `logos`
- H1: **"Sign up or log in to Rollups"**
- Intro paragraph: **"Most people use their work email address to sign in to Rollups. Enter it below to get started."**
- Field label: **"Email"**
- Input placeholder: **"you@company.com"**
- Submit button label: **"Get started"**
- Submit button loading/disabled label (via `data-disable-with`): **"Get started..."**
- Divider text: **"or"**
- Row 1: **"Are you an investor looking to view your investing portfolio? "** + link **"Go to AngelList"** (→ `https://venture.angellist.com/login`)
- Row 2: **"Are you looking to manage your Cap Table? "** + link **"Go to AngelList Stack"** (→ `https://stack.angellist.com/login`)
- Footer/fine print: **"Terms and Conditions"** (→ `/terms`) · **"Help? Contact: team@rollups.com"** (→ `mailto:team@rollups.com`)
- Page `<title>`: "Rollups"
- Meta description: "Everything companies need to take control of their equity."

---

## 4. Form field and validation states

Single field: **Email**
- `<input id="email" type="text" name="email" placeholder="you@company.com" autocomplete="email" autofocus>` — note: `type="text"`, not `type="email"`; **no `required` attribute**; no client-side HTML5 validation fires (`checkValidity()` returns `true` for any string, confirmed by test). Validation is presumably server-side after POST to `/magic_link/register`.
- Hidden fields alongside it: `authenticity_token` (Rails CSRF), `data`, `referral`, `ruv` — all empty/hidden, likely populated by JS for analytics/attribution (not inspectable without triggering app JS execution paths we didn't reverse-engineer; irrelevant to visual clone).

**States (from the served CSS bundle, `employee-DHAmJDqb.css`; not all reproducible via static computed-style since they require `:hover`/`:focus`/pseudo-classes):**

- Base `.form-control`:
  `padding: 13px 20px` (`.8125rem 1.25rem`); `font-size: 17px` (`1.0625rem`); `font-weight: 400`; `line-height: 1.6`; `color: #000`; `background: #fff`; `border: 1px solid #f3f4f2`; `border-radius: 6px` (`.375rem`); `box-shadow: none`; `transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out`.
  (Live computed border differs from this base rule because `#email` also carries the `:focus`-equivalent teal border baked in by autofocus at load — see Focus below. If not autofocused, expect the `#f3f4f2` pale-grey border shown in the base rule.)
- Placeholder color: `#30403799` (i.e. `#304037` at 60% opacity — this is the same muted color used elsewhere as `.text-muted`).
- `:focus` — `border-color: #009bb1` (teal), `outline: 0`, `box-shadow: none`. **This is the state visible in both screenshots** because the input has the `autofocus` HTML attribute, so it's focused on page load. Computed at all 3 widths: `border: 1px solid rgb(0, 155, 177)`.
- `:valid` / `.is-valid` — `border-color: #03ab25` (green); focus+valid adds `box-shadow: 0 0 0 4px #03ab2540` (green glow, 25% alpha spread).
- `:invalid` / `.is-invalid` — `border-color: #d44113` (red-orange); focus+invalid adds `box-shadow: 0 0 0 4px #d4411340`. Associated `.invalid-feedback` text (hidden by default, shown via sibling selector when `.is-invalid` is present): `color: #d44113`, `font-size: 88.2%` (~15px given a 17px base), `margin-top: .25rem`.
- `:disabled` / `[readonly]` — `background-color: #f3f4f2`, `opacity: 1`.
- No visible inline error state could be triggered without submitting the form (out of scope per instructions) — the above is derived from the CSS rules, not an observed live error render. Build should show the `.invalid-feedback` red text beneath the field only after a failed submission, matching Bootstrap's standard `is-invalid` pattern.

**Submit button** (`input[type=submit].btn.btn-block.btn-primary`):
- Base: `background: #002b31`; `color: #fff`; `border: 0 solid #002b31`; `box-shadow: none`; `border-radius: 4px`; `padding: 8px 16px`; `font-size: 14px`; `font-weight: 500`; `line-height: 24px`; full width (`btn-block`); height `40px`.
- `:hover` (not `.disabled`/`.loading`): `background-color: #002b31` (unchanged) but adds `box-shadow: 0 0 0 2px #002b31` — i.e. a 2px outline-style ring appears on hover rather than a color change. (A second, more generic `.btn-primary:hover` rule in the same bundle sets `background-color:#00090b; border-color:#000` — the more specific same-bundle rule using `box-shadow` ring is the one that actually applies given selector specificity/order; implement the ring-on-hover behavior to match.)
- `:focus`/`.focus`: `background-color:#00090b; border-color:#000; box-shadow:0 0 0 4px #264b5080` (soft teal-blue focus ring).
- `:active`: `background-color:#000; border-color:#000`.
- Submitting state (`data-disable-with="Get started..."`): rails-ujs swaps the button label to "Get started..." and presumably disables it during the POST — exact disabled visual style not separately declared beyond the generic `.disabled`/`:disabled` opacity dimming inherited from Bootstrap defaults (not overridden in this bundle, so assume default Bootstrap `.6` opacity dim).

---

## 5. Typography (computed, identical across 1440 / 1280 / 390 — only layout width changes, not type scale)

Font stack everywhere: `AngelList, Inter, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`.

| Role | Selector | Size | Weight | Line-height | Letter-spacing | Color |
|---|---|---|---|---|---|---|
| Body base | `body` | 17px | 400 | 27.2px | normal | `rgb(0,43,49)` / `#002b31` |
| H1 | `h1.mb-4.font-weight-bold` | 28px | 550 | 40px | -0.28px | `#002b31` |
| Logo wordmark (image, no text) | `.navbar-brand` | n/a — image | — | — | — | — |
| Intro paragraph | `p.mb-2` | 14px | 400 | 24px | normal | `#002b31` |
| Field label | `label` | 14px | 400 | 24px | normal | `#002b31` |
| Input text | `#email.form-control` | 14px* | 400 | 22.4px | normal | `#000` (placeholder `#30403799`) |
| Submit button | `input[type=submit].btn-primary` | 14px | 500 | 24px | normal | `#fff` |
| Divider "or" | `.line-divider p.text-muted` | 14px | 400 | 24px | normal | `rgba(48,64,55,0.6)` |
| Investor/Cap-Table body text | `.text-adapt-info span.text-muted` (row wrapper computed) | 14px (inline span) — row `div` itself computes 17px/27.2px but the actual visible text runs at the nested `span.font-size-sm.text-muted` | 400 | 24px→27.2px (row) | normal | `rgba(29,42,41,0.8)` row / `rgba(48,64,55,0.6)` muted span |
| Investor/Cap-Table links | `a.text-info.font-size-sm` | 13px | 400 | 20.8px | normal | `rgb(89,85,255)` / `#5955ff` (hover `#0e09ff`) |
| Footer fine print | `p.mt-6.font-size-sm.text-muted` and its `a` children | 13px | 400 | 24px | normal | `rgba(48,64,55,0.6)` |

\* Note: the CSS source rule for `.form-control` specifies `font-size: 1.0625rem` (17px) but the live computed value returned `14px` for the `#email` element — likely a Bootstrap `.form-control` override further down the cascade or a `font-size-sm`-equivalent utility applied to inputs specifically in this bundle; trust the **measured 14px / line-height 22.4px** value for the actual rendered input text, and use it as the source of truth over the stylesheet excerpt.

H1 font-weight is unusual: computed `550` (a fractional/variable-font weight only possible because `AngelList` is a true variable font covering weight `1–999`; the "bold" utility class also targets `550`, not the standard `700`). If the build environment can't load a true variable font, approximate with `font-weight: 600` (semibold) using Inter as the practical fallback, since Inter is the actual `@font-face` fallback served in the `<link>` tag (`Inter:wght@400;500;550`) — Inter is loaded specifically at weights 400, 500 and 550 to match.

---

## 6. Color tokens (hex, extracted from computed RGB + source CSS)

| Token | Value | Usage |
|---|---|---|
| `--al-teal-900` | `#002b31` | primary text, H1, intro, labels, button background |
| `--al-teal-900-hover` | `#00090b` | button hover/focus background (near-black teal) |
| `--al-teal-active` | `#000000` | button active background/border |
| `--al-teal-focus-ring` | `#264b5080` | button focus box-shadow (32% alpha) |
| `--al-input-border` | `#f3f4f2` | default (unfocused) input border |
| `--al-input-focus-border` | `#009bb1` | focused input border (teal) |
| `--al-valid` | `#03ab25` | valid input border |
| `--al-valid-ring` | `#03ab2540` | valid input focus ring (25% alpha) |
| `--al-invalid` | `#d44113` | invalid input border + error text |
| `--al-invalid-ring` | `#d4411340` | invalid input focus ring (25% alpha) |
| `--al-muted` | `rgba(48,64,55,0.6)` (`#304037` @ 60%) | divider "or", footer fine print, muted body copy |
| `--al-body-80` | `rgba(29,42,41,0.8)` (`#1d2a29` @ 80%) | investor/cap-table row text |
| `--al-link` | `#5955ff` | "Go to AngelList" / "Go to AngelList Stack" links |
| `--al-link-hover` | `#0e09ff` | link hover |
| `--al-placeholder` | `rgba(48,64,55,0.6)` (`#304037` @ 60%) | input placeholder text |
| `--al-white` | `#ffffff` | page background, button text |
| `--al-hairline` | `rgba(138,138,123,0.1)` | column side borders + line-divider rule (very faint, ~10% alpha) |

---

## 7. Layout / spacing (per width)

Shared structure at all 3 widths: single centered column, `min-vh-100`, vertically centered via flex. Only the column's horizontal position/width and outer gutters change.

| | 1440px | 1280px | 390px |
|---|---|---|---|
| `.container` width | 1040px | 1040px | 350px (full width minus 20px×2 padding) |
| `.container` horizontal margin | 200px each side | 120px each side | 0 (just `padding: 0 20px`) |
| Content column (`.col-lg-8`) width | 560px | 560px | 350px (100% at this breakpoint — `.col-12`) |
| Content column `x`-offset from viewport left | 440px | 360px | 20px |
| Content column padding | `40px` all sides | `40px` all sides | `40px` all sides |
| Logo top margin | `mt-6 mt-md-8` → 88px from column top at ≥768px, 72px below 768px (Bootstrap spacing: `mt-6`≈72px mobile / `mt-8`≈88px desktop) | same as 1440 (still ≥768px) | 72px (mobile `mt-6` applies) |
| Logo (`navbar-brand-img`) rendered size | 79.2×20px | 79.2×20px | 79.2×20px (fixed, does not scale) |
| Gap: logo → H1 | `mt-8` wrapper = 88px→ H1 top at y=174 (desktop) | same | 76px → H1 top at y=158 (mobile, `mt-8` computes smaller due to responsive spacing scale) |
| H1 → intro paragraph gap | `mb-4` = 16px | 16px | 16px |
| Intro → form gap | `mt-2` on form = 8px, plus paragraph `mb-2` 8px → ~16px visual gap | same | same |
| Label → input gap | `mb-*` on label = 8px (label margin-bottom) | 8px | 8px |
| Input height | 50.4px (`padding: 13px 20px` + 22.4px line-height + 1px border ×2) | 50.4px | 50.4px |
| Input → button gap | button `mt-1` = 4px | 4px | 4px |
| Button height | 40px | 40px | 40px |
| Button → divider gap | divider `mt-6` = 32px | 32px | 32px |
| Divider → investor rows gap | divider `mb-4` = 16px | 16px | 16px |
| Investor row 1 → row 2 gap | row `mb-2` = 8px | 8px | 8px |
| Cap-table row → footer fine print gap | footer `mt-6` = 32px | 32px | 32px |
| Content max text width | 478px (column width 560 − 2×40 padding) | 478px | 268px (350 − 2×40 padding) |

Content column border: `1px solid rgba(138,138,123,0.1)` on left and right only (top/bottom = `0px`), producing two faint vertical hairlines flanking the reading column against the white page background — visible in both screenshots as the very light vertical lines near the column edges. At 390px width the column spans the full container so the hairlines sit close to the viewport edges (`x=20` and `x=370`ish).

---

## 8. Assets

| Asset | Type | Dimensions (natural) | Rendered size | Notes |
|---|---|---|---|---|
| `logo-green-*.svg` | inline `<img>`, SVG | viewBox 1920×485 (≈3.96:1 aspect) | 79.2×20px (all widths — fixed, not responsive) | Full wordmark: icon mark + "rollups" text, green. Saved to `public/svg/signup/logo-green.svg`. |
| `logo-black-*.svg` | referenced only in `<meta name="branding">` JSON as `buildLogo`, not rendered on page | same viewBox | n/a (not used in visible DOM) | Saved to `public/svg/signup/logo-black.svg` for completeness; skip unless a dark-mode/build variant is needed. |
| `apple-icon-*.png` | `<link rel="apple-touch-icon">` | 180×180 | n/a (favicon only) | Saved to `public/assets/signup/apple-icon.png`. |
| `favicon-32x32-*.png` | `<link rel="icon">` | 32×32 | n/a | Saved to `public/assets/signup/favicon-32x32.png`. |
| reCAPTCHA badge | injected iframe, Google-hosted | 256×60 | fixed bottom-right, `bottom:14px; right:-186px` (off-screen until active) | Not a static asset; only include if implementing live reCAPTCHA. Purely functional, no custom styling to replicate beyond Google's default badge. |
| AngelList variable font | `@font-face`, `.woff2`/`.woff`/`.ttf` | n/a | n/a | Hosted externally at `https://storage.googleapis.com/stack-public-cdn-no-pii/AngelList-VF.woff2` (normal) and `AngelList-Italic-VF.woff2` (italic), both `font-weight: 1 999` (true variable font). **Not downloaded** — external Google Cloud Storage asset, likely proprietary/licensed to AngelList; recommend NOT vendoring this file. Use `Inter` (loaded via Google Fonts `family=Inter:wght@400;500;550`) as the practical substitute — it's already the documented fallback in the page's own font stack. |

No hero image, illustration, product screenshot, or decorative graphic on this page — it is text/form only, apart from the logo.

---

## 9. Motion

None observed. No CSS `transition`/`animation` beyond the standard Bootstrap `.15s ease-in-out` micro-transition on `.form-control` border-color/box-shadow (for focus state), and the default browser/UA behavior for `autofocus` (instant, no animation). No scroll-triggered effects, no on-load entrance animation, no JS-driven animation library loaded on this page (confirmed: no GSAP/Lottie/ScrollTrigger in the network requests — only jQuery, Popper, and a `popovers` bundle used elsewhere in the app, not on this page's visible elements). The reCAPTCHA badge slide-in (`transition: right 0.3s`) is Google's own inline style, not custom to Rollups.

---

## 10. Responsive breakpoint behavior

Bootstrap-standard breakpoints apply (`col-md-8`, `col-lg-8`): the content column is `100%` width below the `md` breakpoint (768px) and `66.67%` (8/12 columns) at `md` and above, but in practice — because the container itself also has fixed side margins that grow with viewport width (see table in §7) — the rendered column width plateaus at **560px** for any container ≥ roughly 1040px content width, and shrinks to fill available width (minus 20px gutters) below that. No distinct tablet-specific layout was observed between 1280 and 1440 (both render identically at 560px column / 1040px container). Test at 991px (Bootstrap's `md`/`lg` breakpoint) if pixel-perfect tablet behavior matters; not separately measured here since the task specified 1440/1280/390 only.
