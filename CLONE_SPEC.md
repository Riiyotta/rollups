Source: https://rollups.com/?ref=saaspo.com

# Rollups landing page: clone spec

Measured on 2026-09-30 with headless Chromium 1243 (Playwright 1.63) at 1440x900, 1280x900 and 390x900, DPR 1. The page was scrolled top to bottom first so every scroll trigger had fired. Values come from `getComputedStyle` and `getBoundingClientRect`, the live CSS chunks (identical to `Rollups_files/*.css`), and the de-minified JS chunks (for GSAP and Lottie parameters). All y-coordinates below are page-absolute (they include scroll).

Reference material in `/Users/riyaghosh/V3/rollups/recon/`:
- `full-1440.png`, `viewport-1440-top.png`, `full-390.png`, `viewport-390-top.png`, `testimonial-open-1440.png`
- `lottie/*.json`: the 4 Lottie animations, pulled out of the Next.js chunks. The hero art and both product illustrations are Lottie, not images.
- `svg/*.svg`: every inline SVG icon or illustration, with GSAP inline styles removed.
- `assets/`: fonts, the grain texture and favicons. None of these are in `Rollups_files/`.

Stack on the original: Next.js App Router, GSAP 3 (ScrollTrigger, DrawSVGPlugin, ScrollToPlugin, MotionPathPlugin), `lottie-react` (SVG renderer), Swiper (mobile stage slider only).

---

## 0. Global tokens and base

### CSS custom properties (`:root`, copied verbatim)
```
--fonts-sizes--text-5xl: 3.375rem  (54px)
--fonts-sizes--text-4xl: 2.25rem   (36px)
--fonts-sizes--text-3xl: 1.875rem  (30px)
--fonts-sizes--text-2xl: 1.5rem    (24px)
--fonts-sizes--text-xl:  1.25rem   (20px)
--fonts-sizes--text-lg:  1.125rem  (18px)
--fonts-sizes--text-base:1rem      (16px)
--fonts-sizes--text-sm:  0.875rem  (14px)
--fonts-sizes--text-xs:  0.75rem   (12px)
--border-line-width: 0.5px
--border-color: var(--colors--light-300)
--fonts-family--font-family-primary:   var(--font-suisse-intl)
--fonts-family--font-family-secondary: var(--font-pp-neue-corp)
--fonts-family--font-family-tertiary:  var(--font-abc-favorit-mono)
--fonts-family--font-family-neue-montreal: var(--font-pp-neue-montreal)   (not used on the homepage)
--colors--light-100: #e4eac8   rgb(228,234,200)  primary text
--colors--light-200: #d1dbb9   rgb(209,219,185)  secondary text
--colors--light-300: #989e7b   rgb(152,158,123)  muted text + ALL hairline borders
--colors--green:     #2a5d33   rgb(42,93,51)     primary button text
--colors--black:     #1a1717
--colors--light-bg:  #ecefe7
--breakpoint-tablet: 991px; --breakpoint-mobile: 767px
--spacing-3xs:4px --spacing-2xs:6px --spacing-xs:8px --spacing-sm:12px --spacing-md:16px --spacing-lg:24px
--page-padding-lg--top:120px --page-padding-lg--bottom:40px
```

**Borders.** Every hairline is `0.5px solid #989e7b`. At DPR 1 Chrome rounds this up to 1px, which is what the measurements show; at DPR 2 it renders as a true hairline. Keep `0.5px` in the build.

### Other colors used
| Use | Value |
|---|---|
| Page gradient (html and body) | `linear-gradient(268deg, #295d32 4.2%, #273f2c 98.63%)`, html `background-color: #295d32` |
| Tinted surface (banner, product illustration panel, icons, cookie bar) | `rgba(84,137,93,.24)` |
| Hover tint (FAQ icon, assistant button) | `rgba(84,137,93,.4)` |
| Navbar background | `rgba(41,93,50,.25)` + `backdrop-filter: blur(10px)` |
| Nav dropdown background | `rgba(41,93,50,.96)` + `blur(14px)`, radius 8, `box-shadow: 0 4px 24px rgba(0,0,0,.12)` |
| Secondary button fill / hover | `rgba(228,234,200,.08)` / `rgba(228,234,200,.12)` |
| Secondary button outer border | `#466346` |
| Testimonial modal background | `#2d5636` |
| Radial highlight (`.radial-gradient`, behind the nav Get Started) | `radial-gradient(75.88% 59.69% at 50% 111.69%, rgba(228,234,200,.16) 0, rgba(65,102,72,.16) 100%)` |
| Company grid cells (6-col cycle) | `#284b2f #284d2f #284f2f #295330 #295631 #295831` |
| Text shadow on nav items | `0 1px 2px rgba(0,0,0,.3)`; the logo SVG uses `filter: drop-shadow(0 1px 2px rgba(0,0,0,.3))` |

### Fonts (all local, loaded via next/font)
| CSS family | Weight | File (live URL) | Format | Role |
|---|---|---|---|---|
| `SuisseIntl` | 400 | https://rollups.com/_next/static/media/5290de7b4d6f532b-s.p.otf | OTF | primary / body |
| `SuisseIntl` | 500 | https://rollups.com/_next/static/media/92b5edfa4d5226b1-s.p.ttf | TTF | primary medium. The 450 weight used in the CSS resolves to this file. |
| `PpNeueCorp` | (single face; used at 500) | https://rollups.com/_next/static/media/0ab3e530ecf5e18f-s.p.otf | OTF | headings (`.heading`) |
| `AbcFavoritMono` | (single) | https://rollups.com/_next/static/media/121986aa273abf09-s.p.otf | OTF | mono labels and buttons |
| `PpNeueMontrealCorp` | (single) | https://rollups.com/_next/static/media/eb0b6447daad5399-s.p.woff2 | WOFF2 | preloaded, but not used on the homepage |

All faces use `font-display: swap`. Fallback stacks and metric overrides, verbatim:
- `SuisseIntl, "SuisseIntl Fallback", system-ui, arial`. Fallback: `local("Arial")` with ascent 96.05%, descent 27.17%, line-gap 0%, size-adjust 105.26%.
- `PpNeueCorp, "PpNeueCorp Fallback", system-ui, arial`. Fallback: Arial with ascent 111.60%, descent 36.61%, line-gap 14.64%, size-adjust 93.37%.
- `AbcFavoritMono, "AbcFavoritMono Fallback", monospace, system-ui`. Fallback: Arial with ascent 79.09%, descent 25.86%, line-gap 0%, size-adjust 131.49%.

### Body and base
- `body`: SuisseIntl, 16px/1.5, color `#e4eac8`, same gradient background, `padding-top: 79px` (58px at ≤991px), antialiased, `text-rendering: optimizeLegibility`, `overflow-x: clip`, `overscroll-behavior: none`. html has `scrollbar-gutter: stable`.
- h1–h6 and p have `margin: 0`. Links have no underline and `color: inherit`. `ul` has `margin: 0; list-style: none`. `img` has `pointer-events: none`.
- **Grain overlay**: `div.noise-bg` is the first child of body. `position: fixed; inset: 0; z-index: 2; pointer-events: none; background-image: url(/_next/static/media/grain.73795782.png)` (1920x1018 PNG), `background-size: contain; background-position: 50%; background-repeat: repeat; background-attachment: fixed; filter: contrast(200%)`, opacity 1. It covers the whole viewport on top of the content.

### Text classes (computed at 1440)
| Class / role | Family | Size / line-height | Weight | Letter-spacing | Color | Notes |
|---|---|---|---|---|---|---|
| `.heading` (h1, h2) | PpNeueCorp | 54 / 54 (100%) | 500 | -1.08px | #e4eac8 | ≤991: 36px; ≤767: 30px, ls -0.72px |
| `.text-reg` | SuisseIntl | 14 / 21 (150%) | 400 | normal | inherits | |
| `.text-reg.small` | SuisseIntl | 12 / 16.8 (140%) | 400 | | | |
| `.text-reg.big` (testimonial quote) | SuisseIntl | 24 / normal | 400 | | #e4eac8 | ≤991: 16px |
| `.text-book` | SuisseIntl | 18 / 18 (100%) | 500 | -0.36px | | `.normal-line` gives lh 120% |
| `.text-book.text-logo` (nav wordmark) | SuisseIntl | 20 / 20 | 500 | -0.36px | #e4eac8 | text-shadow |
| product h3 `.text-book.text-450` | SuisseIntl | 24 / 24 | 450 | -0.36px | #e4eac8 | |
| `.text-reg-mono` | AbcFavoritMono | 12 / 12 (100%) | 400 | | | `.text-allcaps` → uppercase + `padding-top: 2px` |
| Button label | AbcFavoritMono | 12 / 12 | 400 | | | uppercase |
| `.text-link` | SuisseIntl | 14 | 400 | | #e4eac8 | `.small` = 12px; `.mono` = AbcFavoritMono |
| `.text-number` | PpNeueCorp | 36 / 36 | 500 | -0.72px | #e4eac8 | not used on the homepage |
| `.text-light-100/200/300` | | | | | #e4eac8 / #d1dbb9 / #989e7b | |

### Layout container (`.container`, used in every section, the header and the footer)
- `margin: 0 40px; max-width: 1280px`, with `border-left` and `border-right` hairlines. These vertical rules run the full page height.
- 1360–1599px: `max-width: calc(100% - 80px)`, so at 1440 the container is 1360 wide at x=40 and the inner width is 1358. Between 1280 and 1359 the max-width stays 1280. At 1280 the viewport width wins: the container is 1200 wide (margin 40).
- ≥1600: `max-width: 1520px; margin: 0 auto`.
- ≤991: margin 0 24px. ≤767: margin 0 16px (at 390, container x=16, width 358).
- `.with-top-padding` = `padding: 100px 0 40px`. `.with-bottom-padding` = `padding-bottom: 40px`.

### `.heading-wrapper`
`display: flex; flex-direction: column; gap: 16px; align-items: flex-start; justify-content: center; padding: 80px 0 40px`. ≤991: padding-top 0.
- `.with-padding` adds padding-inline 30px (≤991: 20px, ≤767: 10px).
- `.centered` centers the content; at ≤767 it goes back to left-aligned with `padding: 0 10px`.

### Buttons (`Button` component)
Markup:
```
div.button-wrapper.animated-text.button-wrapper--{primary|secondary}[.button-wrapper--animated]
  a|button.button.button--{variant}
    div.text-reg-mono.button-text   (label)
    div.button-arrow-wrapper > svg.button-arrow   (12x11, recon/svg/button-arrow.svg)
```
- **Wrapper**: 0.5px border (primary `#989e7b`, secondary `#466346`), radius 5px, height 36 plus borders, so it measures 38px.
- **Inner button**: height 36, `padding: 12px 16px`, radius 4px, AbcFavoritMono 12px/100%, uppercase.
  - Primary: bg `#e4eac8`, text `#2a5d33`.
  - Secondary: bg `rgba(228,234,200,.08)`, text `#e4eac8`.
  - Base transition: `background-color, border-radius, scale .3s ease`. `:active` gives `scale: .96`.
  - Hover: radius becomes 3px. Secondary bg also becomes `rgba(228,234,200,.12)`.
- **Animated variant** (all CTAs with an arrow: nav Sign In, nav Get Started, hero form, stage Get Started):
  - Inner padding-right is 30px, so the measured padding is `12px 30px 12px 16px`. Transition is `.3s cubic-bezier(.4,0,.2,1)` on bg, radius, padding and scale.
  - `.button-text`: `position: relative; top: 1px; transform: translateX(8px)`, transitioned 0.3s with the same curve.
  - `.button-arrow-wrapper`: `position: absolute; right: 12px; top: 13px; width: 0; max-width: 12px; overflow: hidden; opacity: 0`, width and opacity transitioned 0.3s. The arrow svg inside is 12x11 at `translateX(-8px)`.
  - On wrapper hover: arrow wrapper goes to width 12px and opacity 1; the arrow and the text go to `translateX(0)`. Measured on hover: radius 3px, arrow width 12, opacity 1.
- Measured sizes: primary "Get Started" button 125.2x36 (wrapper 127.2x38); secondary "Sign In" 96.4x36 (wrapper 98.4x38); non-animated "Show testimonial" 147.2x36 with padding `12px 16px`.

### `LinkWithArrow` ("LEARN MORE")
- `a.learn-more-link`: flex, gap 6px, center-aligned. It contains `div.text-reg-mono.text-allcaps` (AbcFavoritMono 12/12, uppercase, `padding-top: 2px`, `position: relative; top: 1px`) and `div.learn-more-icon`.
- `.learn-more-icon`: 20x20 circle, bg `rgba(84,137,93,.24)`, `justify-content: right; overflow: clip`. It holds two identical arrow svgs (viewBox 0 0 21 21, `recon/svg/learn-more-arrow.svg`) laid side by side, each `min-width: 20px; transform: scale(1.1)`.
- Hover: each svg runs `@keyframes link-arrow-slide { 0% { transform: translateX(0) scale(1.1) } to { transform: translateX(20px) scale(1.1) } }` for .5s linear, once per hover. The effect is that one arrow slides out and the next slides in. Disabled on ≤767.
- Measured: whole link 98x20, label 72x14.

### Hover-slide text links (`.link-component` + `.link-box`)
- Used by the nav dropdown triggers, the banner "Read announcement", footer links, the marquee "GET STARTED" and the cookie buttons.
- `.link-component`: `display: flex; overflow: clip; position: relative`. The first child is `div.link-box` (`position: absolute; top: 0; left: -5px; width: 5px; height: 100%; background: #e4eac8; pointer-events: none`).
- On `mouseenter` (GSAP):
  - Set the box to `left: -5px; width: 5px`.
  - Tween it to `left: 100%; width: 25px` over 1s with `ease: "back.out"`, then reset.
  - This reads as a light block sweeping across the text.
  - Every sibling `.link-component` inside the same `.multi-hover-link` fades to opacity .5 (.1s linear). On `mouseleave` they all return to opacity 1 (.1s).
- `.multi-hover-link`: `display: flex; gap: 30px; padding: 0 30px`.

### Global scroll reveal (runs on every `<section>`; the footer is excluded)
Initial CSS state: `.animation-item, .animation-text { opacity: 0; filter: blur(5px) }`, and `.animation-item` also has `transform: translateY(20px)`.

GSAP code, per section:
```js
section.querySelectorAll('.animation-item').forEach((el, i) =>
  gsap.fromTo(el, {opacity:0, y:20, filter:'blur(5px)'},
    {opacity:1, y:0, filter:'blur(0px)', duration:0.2, delay:0.03*i, ease:'power2.out',
     scrollTrigger:{trigger:el, start:'top 90%', toggleActions:'play none none none'}}));
// identical loop for '.animation-text'; start can be overridden by a data-anim-threshold attribute
```
- The index `i` counts within its section and its class type, so the stagger is 30ms.
- Animations play once and never reverse.
- There is also a CSS `transition: opacity .3s ease, transform .3s ease` on `.animation-item` (from the products CSS chunk).
- The page wrapper `div.page-fade-in` runs `@keyframes page-fade-in { 0% { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }` for .3s ease-out on load.

---

## 1. Header / Navbar (`header.navbar`)

### Behavior
- `position: fixed; top: 0; left: 0; right: 0; z-index: 1000`, bg `rgba(41,93,50,.25)`, `backdrop-filter: blur(10px)`, bottom hairline.
- Height 79 at desktop (78 inner + border) and 59 at ≤991 (58 + border).
- Nothing changes on scroll. At scrollY=1200 the background, blur and class were identical to scrollY=0. The only transition declared is `backdrop-filter .3s, background-color .3s`, used for the mobile menu open state.

### Structure (1440)
```
header.navbar
  div.container                                  x40 w1360 h78
    div.nav-wrapper (flex, space-between, align stretch)
      div.logos-wrapper (flex, center)            w784
        a.logo-wrapper.nav-logo href="/"          padding-left 20px (≤991: 10px), gap 4px
          svg 24x24 (viewBox 0 0 18 18; color #d1dbb9; drop-shadow)  → recon/svg/logo-rollups.svg
          div.text-book.text-logo  "rollups"     (20px/20px, 500, ls -.36px)
      nav.nav-menu (flex, align center, margin-left auto, 12px)
        div.nav-links > div.multi-hover-link (padding 0 0 0 30px, gap 30px)
          div.link-component.nav-link.with-padding.hide-mobile.text-reg.nav-dropdown-wrapper
            div.link-box
            button.nav-dropdown-trigger "Products" + svg.nav-dropdown-arrow (11x7)
          (same) "Resources"
        div.multi-hover-link.sign-in-desktop-only (padding 0 30px)
          Button secondary animated  "Sign In"  → https://app.rollups.com/get-started
        div.get-started-wrapper.radial-gradient.desktop-only (padding 20px 30px, border-left hairline, radial-gradient bg)
          Button primary animated "Get Started" → /contact-us
        div.get-started-wrapper.multi-hover-link.sign-in-mobile-only.hide-mobile-xs   (≤991 only)
        div.mobile-get-started-wrapper.hide-mobile-2xs (≤991 only; see Mobile)
      div.hamburger-menu (≤991: flex, min-width 64, min-height 58, border-left, padding 10px 16px)
        button.hamburger-menu-btn "Menu" / "Close" (AbcFavoritMono 12px uppercase, absolutely centered, opacity .28s ease-in-out)
    nav.nav-mobile-menu (hidden unless .is-open)
```

### Measured positions at 1440
- Logo svg at x61 y27. Wordmark at x89 y29, 62.1x20.
- "Products" trigger at x855, 78x21. It is SuisseIntl 14/21 with gap 8 to the arrow.
- "Resources" at x963.
- Sign In wrapper at x1082 y20.
- The Get Started cell spans x1211–1399 and is the full 78 tall; its button wrapper sits at x1242 y20.

### Dropdown menus
- They open on hover. Close happens after a 150ms mouseleave delay; the unmount follows 200ms later.
- The menu is `position: fixed; top: 57.5px; left: <trigger x>; z-index: 1001`, with padding 16px 8px and min-width 120.
- Hidden state is `opacity: 0; translateY(-6px)`. The `.nav-dropdown-menu-enter` class brings it to `opacity: 1; translateY(0)` with `transition: opacity .16s ease-out, transform .12s ease-out`.
- The trigger arrow rotates 180° (.2s ease) while open. Trigger hover gives opacity .8.
- Section title: 11px, ls .08em, uppercase, #989e7b, opacity .9, padding 0 12px 4px.
- Item: block, padding 8px 12px, radius 6, 14px, #e4eac8, hover bg `rgba(255,255,255,.1)` (.2s). Divider: 1px, margin 10px 8px, `rgba(255,255,255,.12)`.
- **Products** (171x265): [title] "Rollups" · "Roll Up Vehicles" /ruv · "Consolidation" /consolidate · "Secondary Vehicles" /secondary-vehicles · "Investor Waitlist" /waitlist · divider · "ControlOS" /control-os
- **Resources** (157x336): [title] "Learn" · "Raising with SPVs" /how-to-raise-capital · "Blog" /blog · "Customer Stories" /customers · divider · [title] "Product" · "SAFEs" /safe · divider · [title] "Support" · "Help Docs" https://help.rollups.com/ (target _blank)

### Responsive
- **≤991**:
  - `.nav-links` are hidden and `.sign-in-desktop-only` is hidden.
  - The hamburger is shown.
  - The Get Started cell is hidden (`.desktop-only`).
  - `.sign-in-mobile-only` is shown with padding 0 16px; its button is max-height 32 with padding `4px 30px 4px 12px`.
  - Body padding-top becomes 58.
- **≤549**: `.get-started-wrapper`, `.hide-mobile-xs` and `.multi-hover-link` inside the nav menu are hidden.
- **≤390**: `.hide-mobile-2xs` is hidden.
- At 390 the result is: logo at x27 y17 (svg 24px) and the hamburger cell at x309, 64x58, with "Menu" centered.
- `.mobile-get-started-wrapper` (≤991, homepage only):
  - It starts at `opacity: 0; translateY(10px)` and gets `.visible` (opacity 1, translateY(0), `.3s cubic-bezier(.4,0,.2,1)`).
  - Trigger: an IntersectionObserver watches the hero `.form-wrapper .form` with `threshold: .1, rootMargin: "-100px 0px"`. While the form is out of view the button becomes visible after 100ms.
  - Button: 32px tall, padding `8px 30px 8px 12px`, radius 3 (wrapper radius 4).
- **Mobile menu** (`.nav-mobile-menu.is-open`):
  - Fixed at top 58, background is the page gradient, and the navbar gets `position: absolute`.
  - The container fades in from translateY(20px) with `.3s cubic-bezier(.4,0,.2,1)`. Links use staggered transition-delays of .15s + .05s·n.
  - The closed state uses `filter: blur(10px)`.
  - Links: "Products", "Resources" (expandable, 18px/140%, padding 20px 0, bottom border `rgba(255,255,255,.1)`, arrow svg 16x16 rotating 180°).
  - Footer CTAs: "Get Started", "Sign In".
  - Menu footer: "Privacy Policy", "Terms of Service", "© 2026 Rollups. All rights reserved".
  - The body gets `.disable-scroll`, which sets overflow hidden and fades sections to opacity 0 over .12s.

---

## 2. Hero (`main > div.page-fade-in > section.section` #1)

At 1440 the section spans y79–985 (906 tall). The container has `.with-bottom-padding` (padding-bottom 40).

### Structure and copy
```
div.hero-content  (grid: 1fr auto 1fr → 678px 2px 678px; min-height 700px; border-bottom hairline)
  div.hero-block (flex column, padding 0 30px)                      x41 w678 h865
    div.banner.animation-item                                        x71 y91 618x40
      div.banner-content > p.text-reg  "Announcing Rollups: bringing companies Roll Up Vehicles® (RUVs) and more."
      div.banner-actions (flex, gap 12)
        div.link-component.text-reg-mono.text-allcaps.read-link > div.link-box + a[href="https://rollups.com/blog/announcing-rollups/"] "Read announcement"
        button.banner-close.desktop-only aria-label="Dismiss announcement"  "×"
      button.banner-close.mobile-only "×"
    div.heading-wrapper                                               x71 y131 618x710 (padding 80px 0 40px; justify center)
      h1.heading.hero-heading.animation-text  "Take control of your equity"      y386.5 559x54, max-width 25ch
      p.text-reg.animation-text.text-light-200  "Rollups makes it easy for companies to consolidate many stakeholders into one vehicle"   y456.5 (14/21 #d1dbb9)
      div.form-wrapper.animation-item > div.form-wrapper > form#email-form.form
        input#email.homepage-form-input type=text placeholder="Your work email"          386x42
        div.get-started (absolute, top 2px, right 2px) > Button primary animated <button type=submit> "GET STARTED"
      div.ai-summary-section.ai-summary-section--hero (margin-top 16px, gap 8)
        span.ai-summary-label "Request an AI summary of this page"   (12/18, #989e7b, opacity .7)
        div.ai-summary-icons (gap 8)
          a.ai-summary-link aria-label="Get AI summary with ChatGPT" → chatgpt.com/?q=…  (32x32, svg.chatgpt-icon 20x20)
          a.ai-summary-link aria-label="Get AI summary with Claude"  → claude.ai/new?q=…  (svg.claude-icon 20x20)
    div.trusted-wrapper (flex col, gap 20, color #989e7b; hidden ≤767)            y841
      p.text-reg.small.animation-text "Rollups is trusted by over 50,000 investors and companies"   (12/16.8)
      ul.trusted-logo-item-list (flex, gap 60, padding 10px 0 40px)
        li.trusted-logo-item (height 16) > div.trusted-logo (height 18) > inline svg   ×5
  div.vertical-divider   (2px column, border-left hairline)
  div.hero-block.no-padding
    div.hero-animation-wrapper (flex center, overflow clip, relative)     x721 w678 h865
      div.hero-animation (Lottie <svg> 1358x1400 viewBox)
div.trusted-wrapper-mobile   (≤767 only; padding 24px 10px 20px) > p "Rollups is trusted by over 50,000 investors and companies"
div.logo-marquee-hero        (≤767 only)
```
- AI summary query text, URL-encoded, identical for both links: `As a potential client, I want to concretely understand what I will receive with Rollups.com. Detail step by step what the service includes: what I receive, how the product is used from end to end. Explain it simply, as if you were describing the real experience of the service.\n\nTo gather information, fetch these sources in order of priority:\n1. https://rollups.com/index.md (Markdown version - try first)\n2. https://rollups.com (full HTML page - if Markdown is missing info)\n3. https://help.rollups.com/platform/overview (help docs - for additional details)`
- Trusted logos in order: replit (viewBox 68x17, rendered 72x18), Notion (73x21 → 63x18), Kit (41x19 → 39x18), BASE (49x18), Lovable (68x11 → 111x18). Files are `recon/svg/trusted-logo-1..5.svg`. Their x positions at 1440 are 71, 203, 326, 424, 533.

### Styles
- **Banner**:
  - bg `rgba(84,137,93,.24)`, radius 4, padding 8px 16px, margin-top 12, flex space-between, gap 12. Text is 11px/16.5 #e4eac8.
  - The read link is AbcFavoritMono 12 uppercase (top 1px, no wrap).
  - The close button is 24x24, 18px "×", opacity .7 (hover 1, .2s), radius 2, padding 5px 4px 4px.
  - Dismissal persists in `localStorage["banner-dismissed"]`.
  - ≤499: column layout, padding-right 30, and the close button moves to absolute top 6 right 6. ≤767: content max-width 25ch.
- **Email input**:
  - transparent bg, hairline border #989e7b, radius 7, height 42, width 386 (max 100%), padding `4px 116px 4px 16px`.
  - Font 12px/100%, color #e4eac8. The placeholder is #989e7b 12px.
  - Focus: `outline: .5px solid #989e7b`. Error: border #ef4444, focus shadow `0 0 0 2px rgba(239,68,68,.2)`.
  - ≤900: font-size 16px and padding-right 140. ≤480: padding-right 150.
  - The button sits absolute at right 2 / top 2, min-width 112. At 1440 it measures 127.2x38 at x328.
- **AI icons**: 32x32 flex center, color #989e7b, opacity .8, `transition: all .28s ease-in-out`. Hover: opacity 1, color #e4eac8, `translateY(-2px)`.
- **Hero Lottie** (`.hero-animation`):
  - Base: `position: relative; top: 10%; width: 100%; height: 100%; min-height: 400px; margin-bottom: -16px; pointer-events: none`.
  - 1180–1440px: `width: 150%; height: 150%; margin-left: -25%`. At 1440 it measured x551.5 y-42.7, 847.5x1297, top 86.47px. The art overflows the wrapper to the left and is clipped by the wrapper's `overflow: clip`.
  - 946–1180px: `width: 300%; height: 200%; margin-right: -50%; top: 10%`. 901–945px: same, with top 20%.
  - ≤900: the mobile Lottie `.hero-animation-mobile` (`min-height: 200px; width/height 100%; margin-bottom: -6px`).
  - `.hero-content .hero-block img` rules: max-width 800 (450 at ≤900), not used.

### Responsive
- **1280**: grid columns 633.66 / 2 / 562.34. The banner wraps to 2 lines (49 tall), the hero is 717 tall, and the section is 757.
- **≤991**: hero-block padding 0 20. heading-wrapper padding-top 0.
- **≤900**:
  - hero-content becomes flex column with no min-height.
  - vertical-divider becomes a horizontal rule (`width: 100%; height: 1px; border-top` hairline, `margin: 0 0 64px`).
  - heading-wrapper padding becomes 60px 0 42px (≤600: 42px 0 42px).
- **390**:
  - banner 316x72, column layout, padding `8px 30px 8px 16px`.
  - h1 30/30 with ls -0.72 at y184.
  - Paragraph is 2 lines (42 tall).
  - Input is 316 wide with 16px font.
  - Lottie wrapper is 356x368 at y528.
  - trusted-wrapper-mobile sits at y897.
  - The logo marquee is at y958 (39 tall, padding-bottom 20, bottom hairline).
- **Mobile logo marquee**:
  - `.logo-marquee-hero > .marquee-content > .marquee-logos ×3`. Each `.marquee-logos` has `display: flex; gap: 4rem (2rem at ≤768); padding-left: 2rem; animation: marquee 5s linear infinite`, where `@keyframes marquee { 0% { translateX(0) } to { translateX(-100%) } }`.
  - `.logo-item svg` has max-height 18px. Order: replit, Notion, Kit, customer.io (viewBox 103x15, `recon/svg/marquee-logo-4.svg`), Lovable, BASE (`.large-size`, min-width 60).

### Motion
- The banner, h1, paragraph, form and trusted text use the global reveal. On load they are already in view, so they reveal almost immediately with a 30ms stagger.
- **Hero Lottie** (`recon/lottie/hero-rollups-int.json`, "Rollups INT"):
  - 25fps, frames 0–292, 1358x1400.
  - Played with `speed 1.25`, `initialSegment [5, 250]` and `loop: false`, so it plays once for about 7.8s.
  - Play and pause are driven by an IntersectionObserver on `.hero-animation-wrapper` with `threshold: .5`: play when intersecting, pause otherwise.
  - ≤900 uses `hero-rollups-int-mobile.json` at speed 1.25 with no segment and no loop.

---

## 3. Products: "Two ways companies use Rollups" (section #2)

At 1440 the section spans y985–1921 (936). The container has `.with-top-padding`.

```
div.heading-wrapper.centered                                y1085 h211 (padding 80 0 40)
  p.text-reg.animation-text.text-light-200  "ROLLUPS SOLUTIONS"     (14/21 #d1dbb9; literal uppercase text)
  h2.heading.heading-products.animation-text "Two ways companies use Rollups"   707x54 (max-width 21ch; ≥1200: 31ch; ≤767: 25ch)
div.products-content-columns.with-top-padding.animation-item   (grid 1fr 1fr → 679/679; padding-top 90; border-bottom hairline)
  div.products-tabs  (hidden ≥992)
  div#product-raise.products-content-column.animation-item   (flex col, gap 50, padding 0 30 30)
    div.products-content-header (flex col, gap 18, max-width 370)
      h3.text-book.animation-text.text-450 "Raise"        (24/24, 450, ls -.36)
      div.products-content-header-description > p.text-reg.animation-text.text-light-200
         "Raise capital with Roll Up Vehicles® (RUVs) from many investors in one entity — and one line on your cap table. Powered by AngelList."
      a.learn-more-link.animation-item href="/ruv"  "LEARN MORE" + icon
    div.products-ilu-wrapper   (bg rgba(84,137,93,.24), radius 2, padding 20, flex center / align end, max-height 300)  619x271
      div.product-raise > Lottie svg (1252x484)    579x224
  div#product-consolidate.products-content-column.animation-item  (border-left hairline ≥992)
    h3 "Consolidate"
    p "Move existing stakeholders into a Consolidation Vehicle to consolidate their ownership into one entity — and one line on the cap table."
    a.learn-more-link href="/consolidate" "LEARN MORE"
    div.products-ilu-wrapper.no-bottom-padding > div.product-consolidate (flex, justify flex-end) > Lottie   578x223
```
- Positions at 1440:
  - Columns start at y1386.
  - The header is 370x143. h3 at y1386, p at y1428 (3 lines, 63 tall), link at y1509.
  - The illustration panel is at y1579.
- At 1280: columns are 599 wide and the panel is 539x240.
- **Lottie**:
  - `recon/lottie/product-raise.json` ("Rollups - Raise v2", 25fps, 175 frames, 1252x484, 9 embedded base64 PNG images, text layers set in Suisse and ABC Favorit Mono).
  - `recon/lottie/product-consolidate.json` ("Rollups - Consolidate v2", 250 frames).
  - Both use `loop: true` at speed 1. Each plays while `#product-raise` / `#product-consolidate` is ≥50% visible and pauses otherwise.
- **≤991 (tabs mode)**:
  - columns become flex column with gap 32 and padding-top 40 (60 in the ≤767 rule, but the ≤991 rule later in the CSS overrides it to 40).
  - `.products-tabs` is shown: flex, gap 8, padding 4, hairline border `rgba(152,158,123,.24)`, radius 6, centered. At ≤767 it gets `margin: 0 10px` and children are `width: 100%`.
  - The tabs are two non-hover Buttons: "Raise" (primary when active) and "Consolidate" (secondary).
  - An `.active-underline` (2px #e4eac8) slides to the active tab with GSAP (`x`, `width`, .12s power1.out).
  - Only the active column is displayed.
  - Switching tabs: the old column tweens to opacity 0, y -20 over .3s; then the new one runs fromTo opacity 0 y 20 → 1/0 over .3s.
  - Column layout becomes `flex-direction: column-reverse`, so the illustration is on top. The h3 is hidden.
  - At 390: tabs are 336x48 at y1274; each tab button is 157x36. The column is padding 0 10 10 with gap 32. The illustration panel is 336x137 with padding 0.

---

## 4. "Rollups in action" (section.rollups-section, #3)

At 1440 the section spans y1921–4437 (2516).

```
div.rollups-wrapper (grid .5fr 1fr → 452.66 / 905.34; ≤1200: .35fr 1fr; ≤991: 1fr; border-bottom hairline)
  aside.rollups-sidebar (relative, padding 300px 0; hidden ≤991)
    ul.rollups-sidebar-list (position: sticky; top: 300px; padding-left 30; flex col gap 16)
      li.animation-item[.sidebar-item-current] > a href="#raise-with-ruvs" (flex, gap 14, center)
          p.text-reg-mono.text-allcaps.light-300 "01"     (12px mono #989e7b; rendered "0" + "1")
          p.text-reg.text-light "Raise with Roll Up Vehicles®"   (14/21, #989e7b; current → #e4eac8; hover → #d1dbb9; color .25s ease)
      li > a href="#cap-table-cleanup"   "02"  "Consolidate legacy stakeholders"
      li > a href="#streamline-acquisitions" "03" "Streamline acquisitions"
  div.rollups-content (flex col, gap 40)
    div.heading-wrapper.rollups-header (max-width 38ch = 406px; padding 80 0 40)
      h2.heading.animation-text "Rollups in action"                          y2101
      p.text-reg.text-light-200.animation-text "Three common situations in which companies use Rollups. Don't see your use case? There are many more. Contact us."   (2 lines)
    div.rollups-steps (flex col, gap 140; border-left hairline)
      div.rollups-step#raise-with-ruvs > ActionCard
      div.rollups-step#cap-table-cleanup > ActionCard
      div.rollups-step#streamline-acquisitions > ActionCard   (last: no bottom border)
```
- **Sidebar**:
  - An IntersectionObserver (`rootMargin: "-30% 0px -30% 0px"`, thresholds [0, 1]) picks the step whose center is closest to the viewport center and gives its `li` the class `.sidebar-item-current`.
  - Clicking a link runs `gsap.to(window, {duration: 1, scrollTo: {y: '#id', offsetY: 120}, ease: 'power2.inOut'})`.
  - The list is sticky at top 300 within the aside. At 1440 it sits at y2321, 453x95.

### ActionCard
`div.action-card` is a grid `1fr .5fr` (602.9 / 301.4 at 1440) with top and bottom hairlines. ≤991 it becomes `.75fr 1fr`; ≤767 it becomes `1fr`.
```
div.action-card-ilu-wrapper (padding 30 30 0; border-right hairline; flex center; overflow hidden; relative)
  img.action-card-content-ilu.animation-item  (max-width 440, margin auto; object-fit contain)
  div.action-card-modal-wrapper (absolute top 8 right 8, calc(100%-16px) square, overflow clip, radius 2)
    div.action-card-modal (bg #2d5636; transform scale(0); transform-origin bottom left; transition transform .2s ease-in)
      div.action-card-modal-content (padding 30px 40px; opacity 0; filter blur(5px); transition all .25s ease-out)
        div.testimonial-wrapper > div.testimonial-content (flex col, gap 40, padding 64px 0)
          p.text-reg.big.text-light-100  <quote>          (24px / normal, 400)
          div.testimonial-author (flex col, gap 12)
            img (max-width 120, max-height 80, radius 2, object-fit contain)
            p.text-reg.text-light-200  <name> [a]
    div.button-wrapper--secondary > button.button--secondary.action-card-modal-button (absolute bottom 0 left 0) "Show testimonial" / "Hide testimonial"
div.action-card-content-wrapper (flex col, space-between, padding 30)
  div.action-card-header (flex col, gap 16)
    div.action-card-header-name > p.text-reg-mono.text-allcaps.light-300.animation-text  <label>
    div.action-card-header-title > p.text-book.animation-text.book.text-light-200  <title>   (18/18, 500, ls -.36, #d1dbb9)
    div.action-card-header-description > p.text-reg.animation-text.text-light-200 <desc>
  div.action-card-content (margin-top 100; ≤767: 24)
    div.action-list (relative, flex col gap 16)
      div.action-list-decor.animation-item (absolute left 0, 3px wide, full height) > svg (recon/svg/action-list-decor.svg, gradient #989E7B fading at both ends, stroke-opacity .6)
      ul.action-list-items (flex col, gap 16)
        li.action-list-item.animation-item (padding-left 16; ::before 3x12 #989e7b bar at top 2 left 0) > p.text-reg.small.text-light-200  (12/16.8)
    div[style="margin-top:24px"] > a.learn-more-link.animation-item  "LEARN MORE"
```
- Modal open state: `.action-card-modal-open` gives `scale(1)`, and the content goes to opacity 1 and blur 0. Measured open at 1440: 585.9x564.6; content box inset 40px; author image 120x80.
- Hover on the modal wrapper sets the button's svg path fill to #e4eac8 at fill-opacity 1.
- ≤767 (`innerWidth <= 767`):
  - The modal renders instead inside `.action-card-mobile-button-wrapper`, positioned above the button (`bottom: 100%`, min-height 200, margin-bottom 8, padding 20).
  - The illustration wrapper loses its border and padding; the img max-width is 320 (or 300).

### The three cards (verbatim copy)
1. `#raise-with-ruvs`
   - Image: `/_next/static/media/in-action-5.7c07bb5c.png` (1000x828), alt "Raise with Roll Up Vehicles®", rendered 440x364.
   - Label: "raise". Title: "Raise with Roll Up Vehicles®".
   - Description: "Raise capital from many investors in a single entity — and just one line on your cap table."
   - List:
     - "Your startup wants to include 45 friends, advisors, and angels in your round."
     - "Rather than manage 45 separate investments, you open an RUV and invite them to invest."
     - "Rollups provides a smooth online investor experience for KYC/AML, accreditation, and banking, all powered by AngelList."
     - "Track round progress, close in a few clicks, sign once, receive one wire, and just one line to your cap table."
   - Link: /ruv
   - Testimonial: "Pretty sure that RUVs are the single best fintech product ever launched. I bet NPS (for both the investors and the founders) is off the charts." Author "Auren Hoffman," with link "@auren" → https://x.com/auren. Image `auren.6a595073.png` (200x200).
2. `#cap-table-cleanup`
   - Image: `in-action-1.80dd0b92.png` (936x614), alt "Consolidate legacy stakeholders", rendered 440x289.
   - Label: "consolidate". Title: "Consolidate legacy stakeholders".
   - Description: "Regain control of your cap table by transferring early angels, SAFE holders, and small check investors into a single vehicle."
   - List:
     - "Your startup previously raised capital from 120 smaller investors."
     - "You’re now raising a Series B, and the feedback from a potential lead is that your cap table is too messy."
     - "You create a Consolidation Vehicle to compile the smaller shareholders into one entity, resulting in 74 fewer lines on your cap table."
     - "Your Series B now requires 74 fewer signatures to close, and you're able to raise without any issues or delays."
   - Link: /consolidate
   - Testimonial: "Motif signed over 30 SAFEs to raise initial funds. We feared chasing down all of those investor signatures in future financings. But our investors were happy to execute the Rollup, saving Motif ~$20,000 and ~2 weeks time." Author "Marie Schneegans, Co-Founder," with link "Markprompt" → https://www.markprompt.com/. Image `marie-founder.cda9a517.png` (1000x1000).
3. `#streamline-acquisitions`
   - Image: `in-action-3.43381e4b.png` (906x696), alt "Streamline acquisitions", rendered 440x338.
   - Label: "consolidate". Title: "Streamline acquisitions".
   - Description: "Consolidate the acquisition target’s stakeholders into one entity before adding them to your cap table and inflating your costs."
   - List:
     - "Your startup is entertaining an acquisition offer: part cash, part equity in their company."
     - "Issuing equity to the 120 stakeholders on your cap table creates complexity and cost for the acquirer."
     - "So, you open a Consolidation Vehicle to consolidate all 120 stakeholders into one entity."
     - "Now, the acquirer issues the equity to the CV once, adding just one line to their cap table, and you're able to close the deal on time."
   - Link: /consolidate
   - Testimonial: "AngelList’s consolidation vehicle was instrumental in streamlining Wand’s acquisition of Accern by combining dozens of our stakeholders into a single SPV, preserving a clean cap table for Wand." Author "Kumesh Aroomoogan, CEO at Accern, a Wand AI Company". Image `kumesh.89fad49b.png` (357x233).

### Card measurements
- **1440**: card 1 at y2293 (583 tall), card 2 at y3015 (622), card 3 at y3777 (619). The content column is 301 wide with an inner width of 241.
- **1280**: grid .35fr/1fr gives 399/799. Each card is 655 tall with columns 531.8/265.9.
- **390**:
  - Single column with no sidebar. The header has padding 0 10 40 and the h2 is 30px.
  - Steps have gap 60 and no left border.
  - Card order: content wrapper first (padding 40 10 0), then the image (320 wide), then the "Show testimonial" button.

---

## 5. "Used by companies at every stage" (section #4)

At 1440 the section spans y4437–5296 (859).
```
div.heading-wrapper.with-padding  > h2.heading.animation-text.stage "Used by companies at every stage"  (max-width 15ch; 2 lines; 456x108)
div.stage-wrapper.with-padding  (≥768: flex col, align/justify flex-end, min-height 400, padding 60 30 30 0, relative; border-bottom hairline)  y4765 h491
  div.stage-ilu-bg.hide-mobile (absolute; inset -10% 0 auto)   y4716 1358x433
    div.draw-stage-ilu > svg viewBox 0 0 1360 427 (recon/svg/stage-illustration.svg)
       path.main-path (curve, stroke gradient, .5), path.line.line-1..5 (vertical ticks #989E7B .5), path.marker.marker-1..5 (3px dots #989E7B)
    div.stage-text.stage-text-{1..5} (absolute, flex col gap 8)
      span.stage-text-mono  (AbcFavoritMono 12/12 uppercase #989e7b, margin-bottom 4)
      h3.stage-text-book > div (line1) + div (line2)   (SuisseIntl clamp(14px,1.25vw,18px) → 18px @1440, 16px @1280; lh 120%; 500; ls -.36; gap 4)
  div.stage-text-wrapper (flex col, gap 24, max-width 30ch = 320.6px, relative)  x1048 y4968
    p.text-reg.animation-text.light-200 "Rollups scales with you."
    p "Startups have used Roll Up Vehicles® (RUVs) to raise anywhere from $50k to $100M+."
    p "Growth-stage companies leverage Consolidation Vehicles (CVs) to simplify complex cap tables, and avoid friction with secondaries, liquidity events, or acquisitions."
    div.stage-button-wrapper > Button primary animated "Get Started" → /contact-us
  div.stage-slider-mobile-container > div.stages-slider-wrapper.animation-item.show-mobile  (mobile only)
```
- The paragraphs have class `light-200` but no `text-light-200`, so they compute to #e4eac8.
- Stage labels and positions (`bottom` / `left` in % of `.stage-ilu-bg`; ≤1200 bottoms in parentheses):
  1. "Pre-Seed": "Raise initial capital" / "from friends & family". bottom 2% (1%), left 7%. At 1440: x136 y5070.
  2. "Seed": "Make room for small" / "investors alongside VCs". 27% (24%), 19%.
  3. "SERIES A": "Conduct fast second" / "closes for follow-on investors". 48% (44%), 35%.
  4. "SERIES C": "Raise RUVs to" / "fund employee liquidity". 62% (60%), 53%.
  5. "Series D+": "Streamline" / "secondaries". 69% (67%), 68%.
  - The mixed case in the labels is literal source text; CSS uppercases it anyway.
- **Draw animation** (GSAP, set up 200ms after mount, ScrollTrigger on `.stage-ilu-bg`, `start: "top 80%"`, once):
  - Initial state: main path and lines at `drawSVG: "0% 0%"`; markers at `scale: 0; opacity: 0; transformOrigin: center`; texts at `opacity: 0; filter: blur(5px); y: -10`.
  - Timeline: main-path draws to `0% 100%` over 1.1s power2.inOut.
  - Each i at t = [0.2, 0.35, 0.5, 0.65, 0.8]:
    - marker to opacity 1, scale 1 over .25s `back.out(1.5)` at t
    - line draws over .25s ease none at t+.05
    - text to opacity 1, blur 0, y 0 over .25s at t+.15
- **Mobile (≤767)**:
  - The illustration is hidden. stage-wrapper has padding 0 10 and aligns flex-start.
  - The text wrapper has padding 32 0 8 and max-width 100%.
  - `.stage-slider-mobile-container` has padding 200px 0 48px. The slider-path svg (viewBox 363x77, `recon/svg/slider-path.svg`) is absolute at bottom 100px, centered.
  - The Swiper uses `slidesPerView: 1, centeredSlides, loop, mousewheel`. Slides are 200px wide and contain `.stage-text-mono-slider` plus `.stage-text-book-slider` (18px/120% 500), centered. Prev and next are LinkWithArrow icon-only buttons; prev is rotated 180°.
  - A dot follows the curved path with a GSAP MotionPath tween (progress = index/(n-1), .3s; on wrap it fades out and back in over .1s).
  - At 390 the section is 871 tall.

---

## 6. "Top law firms & companies trust us to consolidate stakeholders" (section #5)

At 1440 the section spans y5296–6145 (849).
```
div.heading-wrapper.with-padding > h2.heading.animation-text.companies  (max-width 24ch → 729px; 2 lines)
div.companies-wrapper.with-top-padding (flex col, align/justify flex-end, padding-left 25% (339.5px), padding-top 140; border-bottom hairline; ≤767: padding-left 0, padding-top 60)
  ul.companies-grid.w-list-unstyled.animation-item (grid 6×1fr → 169.75px cells; ≤767: 3 cols; ≤480: 2 cols + left/right hairlines)
    li.company-grid-item ×12 (aspect-ratio 1; border-top + border-left hairline; flex center; bg per 6n cycle)
      div.company-logo (150x60, relative, overflow hidden; ≤1279: 100x50; ≤991: 80x40; ≤767: 130x50; ≤480: 100x50)
        div.reveal-mask-1 (absolute, width 100%, overflow clip, border-right .5px rgba(152,158,123,0), z 0) > img.company-logo-image--1
        div.reveal-mask-2 (absolute, width 0, same border, z 1)                                   > img.company-logo-image--2
```
- Images are `object-fit: contain`, sized the same as `.company-logo`, with `unoptimized` and alt "Company Logo".
- At 1440 the grid spans x380.5–1399, y5764–6104 (2 rows of 169.8). At 1280 cells are 151.
- Cell backgrounds:
  - `nth-child(6n+1..6)`: #284b2f #284d2f #284f2f #295330 #295631 #295831.
  - ≤767 (3 cols): 6n+4 → #284b2f, 6n+5 → #284d2f, 6n+6 → #284f2f.
  - ≤480 (2 cols): 6n+3 → #284b2f, 6n+4 → #284d2f, 6n+5 → #284b2f, 6n+6 → #284d2f.
  - The first column's left border is removed per breakpoint (3n+1 at 481–767, odd at ≤480).
- Logo pairs in order (image 1 → image 2), all at `/_next/static/media/`:
  1. basis→wispr
  2. loveable-logo.svg→thinking.svg
  3. superlinked→boxcar
  4. aescape→commonsclinic
  5. privy→coverface
  6. silna→function
  7. amca→monad
  8. 11x→roboflow
  9. vance→socket
  10. base→succinct
  11. enam→verse
  12. branch→basis
- **Wipe loop** (GSAP timeline per cell, `repeat: -1`, `delay: 0.15*index`, `repeatDelay: 3`). This was confirmed by sampling inline styles every 500ms.
  1. Set mask2 to width 0%, opacity 1, blur 0, border-right color `rgba(152,158,123,1)` (a visible wipe line).
  2. Tween mask2 to width 100% and border alpha 0 over 1.2s `power3.inOut`. At the same time (`"<"`), mask1 goes to `blur(5px)`, opacity 0 over 1.2s power3.inOut.
  3. Swap z-index: mask1 = 1, mask2 = 0.
  4. After a 3s delay, set mask1 to width 0, opacity 1, blur 0, visible border. Tween it to 100% over 1.2s while mask2 blurs out. Swap z-index back.
  5. repeatDelay 3s, then loop.
- At 390: 2 columns of 178/179, logos 100x50, section 1405 tall.

---

## 7. FAQ: "Everything You Need to Know" (section #6)

At 1440 the section spans y6145–7225 (1080).
```
div.heading-wrapper.with-padding > h2.heading.animation-text.faq "Everything You Need to Know" (max-width 21ch; ≤767 100%)
div.faq-wrapper.with-y-padding (flex col, align/justify flex-end, padding-left 25%, padding 140 0 100; ≤991: padding-left 0, 100/80; ≤767: 0/140)
  div.faq-list-wrapper  (x380.5 w1018.5)
    ul.faq-list
      li.faq-list-item.animation-item[.open]  (border-bottom .5px transparent → hairline when open; transition border-color .15s)
        button.faq-q type=button aria-expanded (flex space-between center; padding 24px 30px 24px 0; border-bottom hairline (removed when open); ≤991 padding-inline 30; ≤767 10)
          div.faq-q-text-wrapper > div.text-reg  <question>       (14/21 #e4eac8; ≤525: max-width 24ch)
          div.faq-icon (20x20 circle bg rgba(84,137,93,.24); open → #e4eac8; li:hover → rgba(84,137,93,.4); bg .25s ease)
            div.faq-icon-line.line-1 (10x1, radius 6, #e4eac8; open → #2a5d33)
            div.faq-icon-line.line-2 (10x1 absolute, rotate(90deg); open → rotate(0) + #2a5d33; all .25s ease-out)
        div.faq-a[.open] id (max-width 80%, padding-right 60, overflow hidden, height 0, opacity 0, blur 5px)
          div.faq-rich-text (14/21 #d1dbb9, padding 4px 0 24px) > div.w-richtext <answer>
    div.faq-assistant > form.faq-assistant-form (flex, center, gap 16, padding 16px 18px 16px 0, border-bottom hairline)
      input aria-label="Ask a question about Rollups" placeholder="Ask anything else" (transparent, no border, padding 12px 0, 16px; placeholder #d1dbb9 at opacity .8)
      button type=submit aria-label="Ask question" (44x44 circle, bg rgba(84,137,93,.24), 22px "→"; disabled → opacity .4; hover rgba(84,137,93,.4); transform/bg .16s)
```
- Questions and answers (verbatim; item 1 is open by default):
  1. "What’s the difference between Rollups and Roll Up Vehicles® (RUVs)?" → "Rollups is the name of our company. Our products “rollup” companies’ stakeholders when raising capital and when consolidating existing stakeholders. When raising capital, companies use Roll Up Vehicles® (RUVs). When consolidating existing investors, it’s called a Consolidation Vehicle."
  2. "What is Rollups.com's relationship with AngelList?" → "Rollups is part of AngelList’s ecosystem of brands. AngelList.com is for VCs and investors. Rollups serves companies. Our products for fundraising and consolidating stakeholders benefit from AngelList’s core infrastructure. Your investors and stakeholders likely already have AngelList accounts, and they can use them with Rollups without any additional effort."
  3. "Can I use Rollups with my existing cap table software?" → "Yes. All of Rollups’ products work with any cap table solution."
  4. "I have questions about Roll Up Vehicles for fundraising" → `Learn more about RUVs <a style="color:inherit;text-decoration:underline" href="/ruv#faq">here</a>.`
  5. "I have questions about Consolidation Vehicles for my existing stakeholders" → `Learn more about CVs <a style="color:inherit;text-decoration:underline" href="/consolidate#faq">here</a>.`
- Multiple items can be open at once (the open state is a Set).
- Open: `gsap.fromTo(a, {height: 0, opacity: 0, filter: 'blur(5px)'}, {height: scrollHeight, opacity: 1, filter: 'blur(0px)', duration: .25, ease: 'power2.out'})`, then height is set to auto. Close reverses this to height 0, opacity 0, blur 5 over .25s power2.out.
- Item 0 animates open on mount the same way.
- Measured at 1440:
  - Question rows are 69–71 tall. The open item is 161 tall and its answer is 875 wide.
  - The icon is at x1349.
  - The assistant form is at y7004, 81 tall.
- At 390: rows are 90 tall (2-line questions) and the answer is 196 tall.

---

## 8. Footer (`footer.footer`)

At 1440 the footer spans y7225–7819 (594). It is not part of the section reveal.
```
div.container
  div.footer-wrapper (flex, space-between, align flex-end; min-height 475; padding 30; gap 16; border-bottom hairline; overflow clip; relative)   h536
    div.footer-spacer
    div.footer-links (flex col, gap 8, align flex-end)                         x1139 y7452 w230
      div.footer-links-wrapper-row > a.social-link href="https://x.com/rollupsHQ" aria-label="Follow us on X" (32x32, svg.x-icon 20x20; same hover as AI icons)
      div.ai-summary-section.ai-summary-section--footer (align flex-end) → label + ChatGPT/Claude icons (same as hero)
      div.footer-links-wrapper.multi-hover-link (padding 0!) > div.link-component.text-link.small > link-box + a href="/careers" "Careers"
      div.footer-links-wrapper.multi-hover-link (flex col, align end, gap 8)
        "Privacy Policy" /privacy-policy · "Terms of Service" /terms-of-service · "Disclosures" /disclosures   (12/18 #e4eac8)
      div.copyrights-wrapper (flex col, align flex-end, gap 8, margin-top 18; 14/21 #989e7b)
        div.copyright-content > div.copyright-icon "©" + div.copyright-year-wrapper > div.copyright-text#current-year "2026" (margin-left 5) + div.copyright-text "Rollups. All rights reserved"
        div.design-by (12px, gap 4, opacity .5 → 1 on hover .28s) "Design by" a.design-by-link href="https://altalogy.com/?ref=rollups" "Altalogy"
    div.footer-ilu-bg.draw-ilu (absolute, inset auto auto -10% -10%, max-width 1200, width 100%, height 100%; pointer-events none; hidden ≤767)  x-95 y7278 1200x535
      svg viewBox 0 0 845 432 (recon/svg/footer-illustration.svg; group opacity .5; concentric pie/arc shapes with #989E7B .5 strokes, some dashed 6 6, fills #E4EAC8 at low opacity)
  div.footer-get-started (flex, padding 20 0; overflow hidden; ≤767 padding-bottom max(env(safe-area-inset-bottom,80px),80px))
    div.marquee (flex nowrap) ×2, each containing div.marquee-flex ×4:
      div.marquee-flex (flex center; animation: scroll 5s linear infinite; paused on hover of .footer-get-started)
        div.marquee-text "One Line on Your Cap Table" + div.link-component.text-link.mono.left-space (padding-left 16) > link-box + a href="/contact-us" "GET STARTED"
        div.marquee-line (85x1 #989e7b, margin 0 24)
```
- **Marquee**:
  - Text is AbcFavoritMono 14px/130% (18.2), ls -0.26px, uppercase. The label is #989e7b and the link is #e4eac8.
  - Each `.marquee-flex` is 450.2 wide, so one `.marquee` (4 groups) is about 1801.
  - `@keyframes scroll { 0% { transform: translateX(0) } to { transform: translateX(-100%) } }` runs for 5s linear infinite on each `.marquee-flex`. Each group shifts by its own width, which gives a seamless loop.
- **Footer illustration draw** (`.draw-ilu`, ScrollTrigger `start: "top 80%"`, once):
  - Every path is set to `strokeDasharray = strokeDashoffset = length`, `drawSVG: "0% 0%"`, `fillOpacity: 0`.
  - Paths draw to `0% 100%` over 1s, stagger .05, ease none.
  - At the same time fillOpacity tweens to 0.02 over 1s, delay .5, stagger .05. The final inline fill-opacity is 0.02 on every path, which overrides the attribute values.
- **≤767**:
  - wrapper becomes flex column-reverse, align flex-start, padding 10 10 24, row-gap 40.
  - links are left-aligned in rows with gap 16. The illustration is hidden. A 26px `.footer-circle` (rgba(84,137,93,.24)) is shown.
  - At 390 the footer is 401 tall.

---

## 9. Cookie consent (fixed overlay)
```
div.cookie-consent (fixed bottom 24 right 24; padding 24; radius 4; bg rgba(84,137,93,.24); backdrop-filter blur(10px); flex, gap 24, center; z 1000; color #fff; transform .3s ease-in-out; .hidden → translateY(100px))
  div.cookie-consent__content > p.text-reg.text-light-200 "This site uses cookies"
  div.cookie-consent__buttons (gap 12) > div.link-component > link-box + button.as-button > span.text-reg-mono.text-allcaps.text-light-200 "Decline"  |  … "Accept"
```
- At 1440 it measures 321x72 at x1095 y804 (viewport).
- ≤480: it spans full width (left 0 right 0), sits at `bottom: env(safe-area-inset-bottom, 80px)`, and has radius 0 and space-between. Hidden state is translateY(100%).

---

## 10. Section rhythm summary (y / height)
| Section | 1440 | 1280 | 390 |
|---|---|---|---|
| Header | 0 / 79 (fixed) | 0 / 79 | 0 / 59 |
| Hero | 79 / 906 | 79 / 757 | 58 / 979 |
| Products | 985 / 936 | 836 / 905 | 1037 / 758 |
| Rollups in action | 1921 / 2516 | 1741 / 2732 | 1795 / 2619 |
| Stages | 4437 / 859 | 4472 / 859 | 4414 / 871 |
| Companies | 5296 / 849 | 5331 / 811 | 5285 / 1405 |
| FAQ | 6145 / 1080 | 6142 / 1080 | 6690 / 1116 |
| Footer | 7225 / 594 | 7222 / 594 | 7806 / 401 |
| Document height | 7819 | 7817 | 8207 |

Breakpoints used by the CSS: 1600, 1440, 1360, 1279/1280, 1200, 1180, 991/992, 945/946, 900/901, 767/768, 600, 549, 525, 499/500, 480/481, 390. JS breakpoints: hero Lottie switches at `innerWidth <= 900`; products tabs at `< 992`; action-card mobile modal at `<= 767`.

## 11. Not measured / caveats
- The hero and product illustrations are Lottie vector animations, so there is no raster to copy. Use the extracted JSON with `lottie-react` or `lottie-web` (SVG renderer). `product-raise.json` embeds its own base64 PNGs. The text layers in both product animations are glyph shapes (`chars`), so no font files are needed at runtime.
- The FAQ "Ask anything else" assistant is a live AI backend; only its UI was measured.
- The nav dropdowns and mobile menu contents were read at runtime (the dropdowns were opened by hover).
- The GSAP plugins used (DrawSVG, ScrollTo, MotionPath) are included in the free `gsap` npm package as of GSAP 3.13.
