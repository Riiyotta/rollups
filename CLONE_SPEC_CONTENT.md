Source: https://rollups.com

# Rollups content pages: clone spec (waitlist, contact-us, blog index, blog article template, legal)

Measured on 2026-09-30 with headless Chromium (Playwright) at 1440x900, 1280x900 and 390x900, DPR 1. Every page was scrolled top to bottom before measuring. Values come from `getComputedStyle`/`getBoundingClientRect`, the page-specific CSS chunks (prettified copies in `recon/pages/css/`), and the page JS chunks (for behavior). y values are page-absolute. Hairlines are `0.5px` in CSS and render as 1px at DPR 1 (see CLONE_SPEC.md §0).

**Read `CLONE_SPEC.md` first.** Global tokens, fonts, `.container`, `.heading`/`.text-*` classes, `Button`, `LinkWithArrow`, the scroll reveal, the navbar, the footer and the cookie bar are shared and not repeated here. Only the differences are documented.

Companion files:
- `recon/pages/articles.json`: blog index order and meta, plus per-article title, date, author, author title/photo, category, reading time, excerpt, cover, meta and a structural `outline[]` (headings verbatim; per block: type, word counts, item counts, link/bold counts).
- `recon/pages/legal.json`: legal outlines (`outline[]` and a flattened `sections[]`).
- `recon/pages/css/*.css`: the 9 page-specific CSS chunks, prettified and verbatim. Treat them as the source of truth for hover, focus and media rules. They are cited below by filename.
- Screenshots: `recon/pages/{waitlist,contact-us,blog-index,blog-announcing-rollups,blog-case-study-mem0-ruv,privacy-policy,terms-of-service,disclosures}-{1440,1280,390}.png`, plus `contact-us-validation-1440.png`.
- `ASSET_MANIFEST_CONTENT.md`: maps live URLs to local paths.

---

## 0. What is shared vs. different on these pages

- **Page shell** (identical on every page): `div.noise-bg` → `header.navbar` (identical DOM to the homepage) → `main.main-wrapper > div.page-fade-in > section.section…` → `footer.footer` → `div.cookie-consent`. The footer is identical except for the "Request an AI summary" ChatGPT/Claude links, whose `q=` text is page-specific:
  - Pattern: `As a potential client, I want to concretely understand what I will receive with {NAME}. Detail step by step what the service includes: what I receive, how the product is used from end to end. Explain it simply, as if you were describing the real experience of the service.\n\nTo gather information, fetch these sources in order of priority:\n1. https://rollups.com/{path}.md (Markdown version - try first)\n2. https://rollups.com/{path} (full HTML page - if Markdown is missing info)`
  - `{NAME}` is `Blog` for /blog, `Contact Us`, `Privacy Policy`, `Terms of Service`, `Disclosures`, and the literal `this page` for /waitlist and every /blog/{slug}. The homepage adds a third "help docs" source; these pages do not.
- **Body offset**: `main` starts at y79 (y58 at ≤991), the same as the homepage.
- **Box sizing**: most elements compute `box-sizing: content-box` (the site has no global border-box). Paddings below are therefore additive to widths.
- **Motion**:
  - `page-fade-in` (opacity 0 → 1, translateY 4px → 0, .3s ease-out) runs on every page.
  - The GSAP scroll reveal (`.animation-item`/`.animation-text`) exists ONLY on /waitlist (71 elements). /contact-us, /blog, the articles and the legal pages have zero reveal elements, so content is static after the fade-in.
- **Undefined CSS variables on the original**: `--color-primary`, `--color-text`, `--color-text-secondary`, `--background-color`, `--fonts-sizes--text-md` and `--colors--red` are all undefined. Consequences to reproduce:
  - Blog card title hover does not change color. Measured: still #e4eac8.
  - `--colors--red` falls back to `#ef4444`.
  - The mobile sticky table column gets `#fff` (see §4.6).

### Page meta
| Route | `<title>` | meta description | og:image |
|---|---|---|---|
| /waitlist | Rollups \| Investor Waitlist | Give supporters a place to commit before you raise. Create a free investor waitlist on Rollups. | /images/og-waitlist.png |
| /contact-us | Rollups \| Contact Us - Rollups | (same as homepage) | /images/og-homepage.png |
| /blog | Rollups \| Blog \| Take Control of Your Equity | Expert insights on consolidating stakeholders, Roll Up Vehicles®, cap table management, and taking control of your equity. | /images/og-blog.png (404 on live) |
| /blog/{slug} | Rollups \| {title} \| Rollups Blog | per article, in articles.json `metaDescription` | the article cover |
| /privacy-policy, /terms-of-service, /disclosures | Rollups \| Privacy Policy / Terms of Service / Disclosures | | /images/og-homepage.png |

### Document heights (full scroll height, header and footer included)
| | 1440 | 1280 | 390 |
|---|---|---|---|
| waitlist | 8419 | 8380 | 8320 |
| contact-us | 1414 | 1414 | 1484 |
| blog | 2302 | 2467 | 5035 |
| announcing-rollups | 5382 | 5711 | 7281 |
| case-study-mem0-ruv | 4831 | — | 6741 |
| special-purpose-vehicles… | 8463 | — | 13114 |
| why-clean-captable-matters | 7079 | — | 9224 |
| how-ruvs-simplify-fundraising | 6639 | — | 9835 |
| privacy-policy | 1035 | 1035 | 900 |
| terms-of-service | 1330 | 1330 | 1239 |
| disclosures | 1623 | 1623 | 1679 |

Footer height is 594 at 1440.

---

## 1. /waitlist

This is a landing page built mostly from homepage components: `.container`, `.heading-wrapper`, `Button`, `LinkWithArrow`, the `ActionCard` grid, the `companies-grid`, `trusted-wrapper`, the FAQ with `faq-assistant`, and the scroll reveal. Page CSS: `waitlist-hero.css`, `waitlist-trust.css`, `content-grid-faq-assistant.css`, `pricing.css`.

Sections (1440 y/height): hero 79/1098 · trust 1177/555 · how-it-works 1732/1936 · capabilities 3668/1153 · companies 4821/849 · pricing 5669/933 · FAQ 6602/1222 · footer 7824.
At 390: hero 58/538 · trust 596/517 · how-it-works 1113/2358 · capabilities 3471/1004 · pricing 5850/925.

### 1.1 Hero (`section.section.testimonials`)
```
section.section.testimonials
  div.container.testimonials-unified-container   (flex col; padding-top 20 [≤991: 0]; padding-bottom 0; border-bottom hairline + container side rules)
    div.testimonials-content                     (padding-top 40; ≤768: 20)
      div.heading-wrapper.centered.with-padding[slot=heading]   (max-width 560, margin auto; padding 80 30 40; gap 16; centered; text-align center)
        p.text-reg.animation-text.text-light-200   "INVESTOR WAITLIST"      (SuisseIntl 14/21 #d1dbb9. NOT mono; the text itself is uppercase)
        div.testimonials-heading-wrapper           (≥768: width 125% / max-width 125% = 700px, overflowing the 560 box symmetrically)
          h2.heading.animation-text                "Not raising yet? Start a waitlist."   (54/54, one line at 1440/1280)
        div.testimonials-heading-wrapper.with-top-padding
          p  "Your network wants to back you when you're ready to raise." <br> "Capture their commitment today. Convert it to capital later."   (16/24 #e4eac8)
        div > Button primary animated external   "Create Your Waitlist" → https://app.rollups.com/get-started?waitlist=1 (target _blank)
        div.text-reg.small.animation-text (display flex, gap 4) > span.text-light-300 "Waitlists are free forever"   (12/16.8 #989e7b)
    div.demo-wrapper.testimonials-image-wrapper.flip-card[role=button][tabindex=0]   (see 1.2)
```
Positions at 1440:
- label x652 y219 (136x21)
- h2 x370 y256 (700x54)
- paragraph y326 (700x48)
- button wrapper x624 y390, 192x38 (inner 190x36, padding 12 30 12 16)
- small text y444
- flip card x120 y500.8, 1200x675, ending at the section bottom y1176.8

At 1280 everything shifts left by 80 (heading-wrapper x330). The flip card is 1198x673.9 at x41, because the container inner width is 1198 < 1200.

≤767 (390):
- The container gets `padding: 0 10px` (margin 16), so the heading-wrapper sits at x27 with width 336.
- The heading-wrapper has `padding: 0`, `margin: 0`, is left-aligned (`align-items: flex-start`, `text-align: left`), max-width 440, and `row-gap: 24px`.
- Positions: label y78; h2 y123 (30/30, ls -.72, 2 lines, 336x60); paragraph y207 (4 lines, 96 tall); button y327 (still 192x38, left); small text y389 (flex-wrap: wrap); flip card y405.8, 336x189.

### 1.2 Flip card (hero demo)
- `.flip-card`:
  - `position: relative; width: 100%; aspect-ratio: 16/9; max-width: 1200px; margin: 0 auto; perspective: 2000px; border-radius: 12px 12px 0 0; overflow: hidden; z-index: 200; cursor: pointer; user-select: none; margin-top: auto`.
  - `::after` (inset 0, z-index 1, `background: rgba(42,93,51,.08)`, pointer-events none) tints the image.
- `.flip-card-inner`: `position: relative; width/height 100%; transform-style: preserve-3d; transition: transform .6s ease`. `.flip-card.flipped .flip-card-inner { transform: rotateY(180deg) }`.
- `.flip-card-face` (front and back): `position: absolute; inset: 0; backface-visibility: hidden; display: flex; align-items: flex-end; justify-content: center`. The back face has `transform: rotateY(180deg)`.
- Images `img.testimonials-software-image`:
  - `width: 100%; max-width: 1200px; height: auto; object-fit: contain; border-radius: 12px 12px 0 0; margin-bottom: -6px` (≤768: radius 8 8 0 0). HTML attributes are width 1600, height 900.
  - The images are bottom-aligned inside the 16:9 face, so the top ~118px of the face shows only the green background.
  - Front: `/images/waitlist-demo-admin.png` (3485x1635), alt "Investor waitlist startup dashboard", rendered 1200x563 at y618.8.
  - Back: `/images/waitlist-demo.png` (3342x1563), alt "Investor waitlist interface", rendered 1200x561.2.
- `.flip-cta` (label pill):
  - `position: absolute; top: 88%; left: 30%; right: 30%; width: 40%`; flex centered; `padding: 12px`.
  - `background: rgba(41,93,50,.85); border: .5px solid #466346; border-radius: 5px; color: #e4eac8`.
  - AbcFavoritMono 12px, line-height 12px, uppercase; `pointer-events: none; z-index: 2; transition: all .3s ease`.
  - Measured 506x38 at x480 y1094.8. `display: none` at ≤767.
  - Text: `span.flip-cta-text` (nowrap) reads "Viewing the company dashboard" when unflipped (front) and "Viewing the investor experience" when flipped.
- **Behavior** (React):
  - State `flipped` starts `false` (front/admin).
  - A `setInterval` toggles it every **10 000 ms** until the user clicks or presses Enter/Space on the card. Any interaction toggles once and permanently stops the auto-flip.
  - `aria-pressed` = flipped. `aria-label` is "View investor interface" when flipped, else "View startup dashboard".

### 1.3 Trust band (`section.section.waitlist-trust`)
```
div.container > div.waitlist-trust-wrapper   (flex col, gap 32, padding 70 30 60 [≤991: 60 20 50; ≤767: 50 10 40]; border-bottom hairline)
  div.waitlist-trust-header (flex col gap 16)
    p.text-reg-mono.text-allcaps.text-light-300.animation-text   "Platform"          (mono 12/12 uppercase #989e7b, padding-top 2)
    h2.heading.animation-text   "Run your investor waitlist on trusted private market infrastructure"   (54/54, 2 lines at 1440 → 1298x108; 390: 30px, 3 lines, 336x90)
  div.waitlist-trust-body (flex col gap 18)
    p.text-book.normal-line.text-light-100.animation-text.waitlist-trust-kicker
        "Powered by AngelList, your investor waitlist converts to capital in a few clicks."   (18 / 21.6, 400, ls -0.36px, #e4eac8; 390: 2 lines)
    p.text-reg.text-light-100.animation-text.waitlist-trust-quote-text   (italic 14/21 #d1dbb9, max-width 680, margin-top 16; ≤767: 16/24, margin-top 12)
        "\"Our Waitlist enables us to avoid the cold start problem next time we need to raise. It replaced our spreadsheet b/c it's on AngelList, so we can click a button to call the capital when we are ready. Recommend you always have an investor waitlist as a founder.\""
        span.waitlist-trust-quote-author (inline-flex, center, gap 8, margin-left 4, font-style normal)
          span.text-light-200 "- Peer, Founder"
          img.waitlist-trust-quote-logo src=/images/logos/cal.svg alt="Cal.com" width=80 height=16   (height 16 → 73.5 wide; filter brightness(0) invert(1); opacity .7)
  div.waitlist-trust-logos (flex col, align flex-start, gap 24)
    div.trusted-wrapper   ← identical to the homepage hero trusted block (p.text-reg.small "Rollups is trusted by over 50,000 investors and companies" + the 5 trusted logo SVGs, gap 60). display:none ≤767.
```
At 1440: header y1246.8; h2 y1276.8; kicker y1416.8; quote y1472.4 (3 lines, 680x63.7; the author span sits inline on the last line at x484); logos y1568–1671.

### 1.4 "How it works" (`section.section.use-cases-section`)
This reuses the homepage "Rollups in action" layout with the class prefix `use-cases-*`. It has **no sidebar content**: the aside is rendered empty.
```
div.container.with-top-padding (padding 100 0 40)
  div.use-cases-wrapper  (grid .5fr 1fr → 452.66/905.34 at 1440, 399.33/798.67 at 1280; ≤1024: 1fr; border-bottom hairline)
    aside.use-cases-sidebar  (relative, padding 300px 0, EMPTY; display:none ≤1024)
    div.use-cases-content (flex col, gap 40; ≤767 overflow hidden)
      div.heading-wrapper.use-cases-header (padding 80 0 40, max-width 60ch = 641.28; ≤1024 padding 0 20; ≤767 0 10)
        h2.heading.animation-text "How it works"          (x493.7 y1911.9)
        p.text-reg.text-light-200.animation-text (max-width 45ch) "Go from interest to capital raised in one flow."
      div.use-cases-steps (flex col, gap 140, border-left + border-top hairlines; ≤767 no border-left)   y2082.9
        div.use-cases-step > div.use-case-content
          div.action-card ×4, separated by an unclassed div (1px tall at DPR 1, border-bottom hairline)
```
`div.action-card` inside `.use-cases-section`:
- `border: none`; grid `1fr .5fr` (602.9 / 301.4 at 1440; 531.8 / 265.9 at 1280); each card is 385 tall at 1440 and 1280.
- `.action-card-ilu-wrapper`:
  - `position: relative; padding: 30px 30px 0; border-right hairline; overflow: hidden; display: flex; justify-content: center; align-items: flex-end`.
  - `::after` overlay: inset 0, `rgba(42,93,51,.08)`.
- `.action-card-content-wrapper`: `padding: 30px; min-height: 325px; flex col; justify-content: space-between`.
  - `.action-card-header` (flex col, gap 16):
    - `.action-card-header-name > p.text-reg-mono.text-allcaps.light-300.animation-text` is **empty**. It still renders 2px tall from padding-top 2.
    - `.action-card-header-title > p.text-book.animation-text.book.text-light-200`: 18/18, 500, ls -.36, #d1dbb9.
    - `.action-card-header-description > p.text-reg.animation-text.text-light-200`: 14/21.
  - `.action-card-content` > `a.learn-more-link.animation-item` "Create waitlist" → https://app.rollups.com/get-started?waitlist=1. This is the homepage LinkWithArrow; its box spans the column width (241.4x20 at 1440).
- Image placement:
  - Cards 1 and 4: `img.action-card-content-ilu.animation-item` is `position: absolute; top: 30px; left: 30px; width: calc(100% - 60px)`. The last card overrides to `top: -25px`.
  - Cards 2 and 3: the img is wrapped in `div.action-card-ilu-inner.action-card-ilu-inner-constrained` (`position: absolute; top: 30px; left: 50%; transform: translateX(-50%); width: calc(100% - 60px); max-width: 350px; display: flex; justify-content: center; align-items: flex-end`). The image is 350x427.5 and is clipped by the wrapper's overflow at the card bottom.

| # | Image (alt = title) | Rendered 1440 | Title | Description |
|---|---|---|---|---|
| 1 | /_next/static/media/waitlist-demo-admin.d7ac115f.png (3485x1635) | 541.9x254.2 at y2113.9 | Create your investor waitlist in minutes | Choose what you want to know and publish a clean, startup-branded page. |
| 2 | /_next/static/media/in-action-2.e1f62643.png (1179x1440) | 350x427.5 (clipped) | Share with your network | Interested investors tell you how much they'd commit, what they bring, and who else might want in. |
| 3 | /_next/static/media/in-action-extract-value.32157404.png (1179x1440) | 350x427.5 (clipped) | Extract value | Investors complete requests like customer intros and services while they wait. |
| 4 | /_next/static/media/sign-safe.7c6f010b.png (1280x898) | 541.9x380.2 at top -25 (y3216.9) | Open your round when ready | Once interest hits critical mass, turn waitlist demand into a live raise using the same investor data. Close it as either a direct raise or an RUV. |

Card y at 1440: 2083.9, 2469.9, 2855.9, 3241.9. Content wrapper x1097.5. Header at +30; link at the card bottom minus 50 (y2418.9 etc.).

≤767 (390):
- `.action-card` becomes `display: flex; flex-direction: column-reverse`, so the text comes first and the image below it.
- The content wrapper has padding `24px 10px 20px`; `.action-card-content` has margin-top 24 and padding-bottom 20.
- The ilu wrapper has min-height 200, and imgs `max-width: none; margin: 0 auto`.
- Measured card heights: 402, 633.4, 612.4, 458.7. Image boxes: 336x157.6 (card 1), 336x410.4 (cards 2 and 3, full width), 336x235.7 (card 4).
- Header at 390: h2 30px at x27 y1212.7; p y1258.7.

### 1.5 Capabilities (`section.section`, 2nd `.with-bottom-border` container)
```
div.container.with-top-padding.with-bottom-border  (padding 100 0 40; border-bottom hairline)
  div.heading-wrapper.with-padding > h2.heading.animation-text "Capabilities"     (x71 y3847.9)
  div.content-grid-wrapper.with-y-padding  (flex col, align flex-end; padding 100px 0 100px 25% → 339.5 at 1440, 299.5 at 1280; ≤991 padding-x 0; ≤767 padding 0 10px)
    div.content-grid (grid 2 × 1fr → 509.25 each at 1440, 449.25 at 1280; ≤767 1 col)
      div.content-grid-item.capability-card.with-top-padding ×6
        div.capability-card-content (relative; height 100%; flex col; justify-content space-between)
          div.text-reg-mono.text-allcaps.light-300.animation-text  "01"…"06"
          h2.text-reg.text-light-100.text-500.animation-text        (14/21, 500, #e4eac8)
          p.text-reg.text-light-200.animation-text                  (14/21 #d1dbb9, max-width 42ch = 392.8)
```
- `.content-grid-item`:
  - flex col, gap 14.
  - Border `.5px solid #989e7b` on top, bottom and left; `border-right: none`. Items 1 and 2 have `border-top: none` (via `.with-top-padding:first-child/nth-child(2)`), so rows 2 and 3 show a doubled 1px line (bottom of the row above + top of the row below).
  - `.with-top-padding` → padding `60px 30px`.
- Row heights at 1440: 219 / 220 / 199. The grid starts at x380.5 y4041.9.
- Because the content box uses `space-between` and rows equalize, the number sits at the top, the p at the bottom and the h2 in the middle. Example, card 1: number y4102, h2 y4137, p y4179.
- ≤767: items have padding `24px 10px`, no borders, and only the last child gets a bottom border. Heights at 390: 104, 146, 167, 146, 104, 126.
- Copy:
  1. "01" **Free forever**: "No fees to create or manage your investor waitlist."
  2. "02" **Capture investor intent**: "Interested investors share their intended amount, value-add, and referrals — so you know exactly who is ready to commit."
  3. "03" **Launch when ready**: "When you are ready to raise, convert your waitlist into a live financing round. All investor data carries over whether you use a Roll Up Vehicle or on SAFEs."
  4. "04" **Customizable startup-branded page**: "Your waitlist page is branded to your company, and you can add/edit the questions you want answered. Share a professional, custom link with your network."
  5. "05" **Keep warm leads warm**: "Send new requests and updates to your waitlist."
  6. "06" **Built-in intros**: "You can optionally enable waitlist members to intro you to others, so your waitlist can grow itself."
- `CapabilityCard` supports a click-to-open modal (`.capability-card-modal*` styles in content-grid-faq-assistant.css), but no card on this page passes modal content, so none is clickable.

### 1.6 Companies (`section.section`)
- This is the homepage §6 component unchanged except for the heading: `h2.heading.animation-text.companies` "Top law firms & companies" `<br>` "trust Rollups" (max-width 24ch; 573x108 at x71 y5000.9; 390: 30px, 2 lines).
- `div.companies-wrapper.with-top-padding` > `ul.companies-grid.animation-item`: the same 12 cells and logo pairs, 169.75px cells at 1440 (151 at 1280), grid at x380.5 y5288.9.
- At 390 the grid is 2 columns of 178/179 (x16, width 358).

### 1.7 Pricing (`section.section.pricing-section`)
```
div#pricing (anchor, 0 height)
div.container.with-top-padding.with-bottom-border
  div.heading-wrapper.with-padding > h2.heading.animation-text "Pricing"            (x71 y5849.4)
  div.content-grid-wrapper.with-y-padding > div.content-grid (2 cols, rows 219 / 199 at 1440)
    div.content-grid-item.price-item.no-top-border            [cell 1]
      div.price-header (flex col gap 8)
        h2.text-book.text-light-100.animation-text.book "Investor Waitlist"          (18/18 500 ls -.36)
        p.text-reg.text-light-200.animation-text "Create and manage your waitlist at no cost, ever."
      div.price-label-wrapper.animation-text (flex, align flex-end, gap 8) > p.price-label "Free"   (PpNeueCorp 36/36 500 ls -.72 #e4eac8)
      Button primary animated external "Create Your Waitlist" → https://app.rollups.com/get-started?waitlist=1   (192x38)
    div.content-grid-item.price-item.no-top-border            [cell 2]
      div.features-list-wrapper (flex col gap 24)
        div.text-reg-mono.text-allcaps.light-300.animation-text "Investor Waitlist features include"
        ul.features-list (flex col gap 12, no bullets)
          li.features-list-item.animation-text (flex, align flex-start, gap 4)
            svg 16x16 (public/svg/pages/feature-check.svg, stroke currentColor, color #989e7b)
            p.text-reg.text-light-200 (max-width 36ch)
          ×4: "Startup-branded investor waitlist page" · "Investor intent capture" · "Analytics and tracking" · "Launch-ready investor pipeline"
    div.content-grid-item.price-item.no-bottom-border.no-top-border   [cell 3]
      div.price-header > h2 "Add-ons" + p "Direct raises, Roll Up Vehicles, SAFE fundraising, and more"
      Button secondary animated "Contact Us" → mailto:team@rollups.com   (120x38)
    (cell 4 empty)
```
- `.price-item`: `display: flex; flex-direction: column; justify-content: space-between; align-items: flex-start; padding: 30px`.
  - Cell 3 gets padding-top 60 and padding-bottom 40 (from `.no-bottom-border` + `:nth-child(3)`), no bottom border.
  - Cells 1 and 2 have no top border (so the grid's top edge has no line under the heading).
  - ≤991: padding `0 20px 20px`. ≤767: see pricing.css. The heading-wrapper gets padding `100px 10px 0`; the grid wrapper gets padding-top 80 and grid gap 48; items get padding `0 10 10` and gap 22; cell 3 gets a top border and padding-top 48; the last item gets padding-bottom 58.
- 1440 positions: cell 1 x380.5 y6043.4 (509.3x219); "Free" y6138.9; button y6193; features list y6111–6231; "Add-ons" y6322.4; "Contact Us" y6383.4.
- 390 positions: cell 1 y6060 (175 tall), cell 2 y6283 (168), cell 3 y6499 (235).

### 1.8 FAQ (`section.section`)
- This is the homepage FAQ component (§7 of CLONE_SPEC.md) including `div.faq-assistant` ("Ask anything else" input + 44x44 submit, placeholder color #d1dbb9 at opacity .8). Only the copy differs.
- Heading: `h2.heading.animation-text.faq` "Investor Waitlist FAQ" (x71 y6782.4, 434.7x54).
- `div.faq-wrapper.with-y-padding.animation-item`: the list starts at x380.5 y7016.4, width 1018.5. The **first item is open by default** (`.open`, 161 tall); closed items are 71 tall. The assistant row is at y7603.4 (81 tall).
- Items (question → answer, verbatim):
  1. What is an investor waitlist on Rollups? → An investor waitlist lets you capture interest from investors you already know before you officially raise. Share a single link with your network, and they can express their intent to invest — including how much they want to commit and what value they bring.
  2. Is it free to create an investor waitlist? → Yes, waitlists are completely free to create and manage. You only pay when you decide to use Rollups to launch the actual raise.
  3. How do investors join my waitlist? → You share a unique link with your contacts and they fill out a simple form with their intended investment amount, value-add, and optionally refer other investors — all powered by AngelList investor accounts.
  4. Can I convert my waitlist into a live round? → Yes. When you are ready to raise, Rollups carries your waitlist data into a live round so you can move from investor interest to committed capital without rebuilding your pipeline. Depending on your setup, that can be a direct raise or a Roll Up Vehicle.
  5. Is my data secure? → Absolutely. Rollups is built on AngelList infrastructure, which manages over $171B in assets on platform. Your data and your investors' information are protected with enterprise-grade security.
  6. Do I need to be ready to raise to create an investor waitlist? → No. That is the whole point. A waitlist lets you organize your investor relationships early — months before you plan to raise — so when you are ready, you already have committed interest lined up.
  7. What happens to investors on my waitlist if I don't raise? → Nothing. There is no commitment from you or anyone on your waitlist until you decide to open a live round. You can keep your waitlist open indefinitely.

### 1.9 Waitlist motion summary
- Standard GSAP reveal per section (stagger .03s, .2s, power2.out, start "top 90%").
- Reveal elements: every h2.heading, the labels, paragraphs, capability texts, features-list items, the price label, the 4 action-card images, the 4 learn-more links, the FAQ wrapper and items, and the companies grid.
- NOT revealed (visible immediately after page-fade-in): the hero button, the flip card, the trust-logo list, and the pricing buttons.
- Plus the flip card (1.2), the FAQ accordion, the company-logo wipe, and button/link hovers, all as on the homepage.

---

## 2. /contact-us

Page CSS: `contact.css`. It has one section; the footer starts at y820 (1440). There is no reveal animation.

### 2.1 Structure and copy
```
section.section.contact-hero-section
  div.container.with-top-padding (padding 100 0 40)
    div.contact-hero-content (grid 1.6fr 1fr; gap 0; align-items flex-start; max-width 1200; margin 0 auto)
      div.contact-main (max-width 700; padding 0 30 30; border-right hairline — a full-height vertical rule between columns)
        h1.heading.contact-main-title "Get started"                 (54/54, margin-bottom 32)
        div.contact-benefits (margin-bottom 40)
          p.text-reg.contact-benefit  "Complete the form to get started with any of our products." <br> "We will follow up via email to answer any questions."   (14/21 #e4eac8; flex, gap 12)
        div.contact-form-wrapper (max-width 500) > form.contact-form (flex col, gap 24)
          div.form-row > div.form-field > input.contact-form-input type=text placeholder="Full Name"
          div.form-row > div.form-field > input.contact-form-input type=text placeholder="Email"          (type is "text", not "email")
          div.form-row > div.form-field > input.contact-form-input type=text placeholder="Company Name"
          div.form-row (margin-bottom 20) > div.form-field
            div#contact-form-product-interest-label.text-reg.text-500.form-label  "Product Interest " + span.required-asterisk (EMPTY — renders nothing)
            div.interest-multiselect
              button#contact-form-product-interest-trigger.contact-form-input.contact-form-select.interest-multiselect__trigger.is-placeholder type=button aria-haspopup=listbox
                span.interest-multiselect__value "Select product interests"
          div.contact-alternative-options (max-width 500; margin-bottom 4)
            Button primary animated type=submit, wrapperClassName "contact-secondary-button-wrapper" (width 100%)  label "GET STARTED"
      div.contact-sidebar (padding 0 30 80; align-self flex-start)
        div.what-to-expect
          h3.text-book.text-500.what-to-expect-title "What to expect"   (18/18 500 ls -.36, margin-bottom 24)
          div.expect-section > ul.expect-list
            li > span.text-reg.text-light-200  ×4 (li: padding-left 24, margin-bottom 12 (last 0), 16/24; ::before "•" #989e7b absolute left 0 top 0)
              "Immediate access to our platform to get started fast"
              "Start raising / consolidating in 5 minutes"
              "Help docs and email support available within the app"
              "Our team will follow up via email to answer any questions"
```

### 2.2 Geometry
- **1440**:
  - Grid at x120 (container inner 1358, content 1200, centered: margin 79) y179; columns 738.45 / 461.55.
  - Title x150 y179; benefits y265 (677x42); inputs 500x48 at x150, y347 / y419 / y491.
  - Label y579 (21 tall; margin 16 0 8, plus the field's gap 8); trigger y616; submit wrapper x150 y708, 502x38 (button 500x36).
  - Sidebar x858.5: title x888.5 y179; list y221; lis at 221 / 257 / 293 / 329 (24 tall).
  - Section 79→820 (741).
- **1280**: grid at x41 (the 1198 container is narrower than max-width 1200, so no auto margin); columns 737.2 / 460.8; title x71; form x71; sidebar x778.2.
- **390** (≤767 rules):
  - The section becomes `display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; padding-top: 20px`.
  - The container gets `padding-top: 20px; width: 100%; max-width: 100%; margin: 0; border: none`, so **no vertical container rules on this page at mobile**.
  - `.contact-hero-content` becomes flex col, align center, padding `0 10px`.
  - `.contact-main` has padding `0 10px 20px`, no border, and `text-align: center`. The title and benefits are left-aligned; inputs are full width. Error text inherits center alignment.
  - The sidebar has padding `30px 10px 80px` and a border-top hairline.
  - Measured: title x20 y98 (30/30); benefits y160 (350x63); inputs 350x48 at x20, y263 / 335 / 407; label y495; trigger y532; submit y624 (352x38); sidebar y686; title y717; list y759 (lis 48 / 24 / 48 / 48 tall, text 14/21 wrapping).
  - On mount at `innerWidth <= 767`, after 300ms the page calls `document.querySelector('.contact-main').scrollIntoView({behavior:'smooth', block:'start'})`.
- ≤1023: single column. The main column loses its border-right and has padding `0 20 20`; the sidebar gets a border-top and padding `30 20 20`.

### 2.3 Field styles
- `.contact-form-input`:
  - SuisseIntl 14px, line-height normal, color #e4eac8, transparent bg, `padding: 12px 16px`, `border: .5px solid #989e7b`, `border-radius: 7px`, height 48, width 100%.
  - `transition: border-color .2s ease, outline-color .2s ease`.
  - Placeholder #989e7b, 14px, 400.
- Focus: `outline: .5px solid #989e7b; outline-offset: 0; border-color: #d1dbb9`, bg stays transparent.
- Disabled (while submitting): color #989e7b, opacity .55.
- Autofill is forced transparent with text #e4eac8 (see contact.css).
- Multiselect trigger:
  - Same box as the inputs, plus `padding-right: 40px` and `font: inherit`, which gives **16px/24px** (the trigger text is larger than the inputs' 14px).
  - Chevron is a `background-image` data-URI SVG, 12x8, path `M1 1.5L6 6.5L11 1.5`, stroke #989e7b 1.5, positioned `right 16px center`.
  - The value span is ellipsized. Placeholder state (`.is-placeholder`) uses color #989e7b; selected state uses #e4eac8.
- Panel `.interest-multiselect__panel` (rendered only when open; the wrapper gets `.interest-multiselect--open`, z-index 10050):
  - `position: absolute; left 0; right 0; top: calc(100% + 4px)` (y668 at 1440); `padding: 6px 0; max-height: 220px; overflow-y: auto`.
  - `background: color-mix(in srgb, #2a5d33 72%, #1a1717)` ≈ rgb(37.5,73.4,43.2) #25492b; border .5 #989e7b; radius 7; `box-shadow: 0 10px 28px color-mix(in srgb, #1a1717 55%, transparent)` ≈ rgba(26,23,23,.55).
  - Measured 500x195.1.
- Options `button.interest-multiselect__option` (6 of them, each 30.2 tall, in this order): **Consolidation Vehicles, ControlOS, General Inquiry, Investor Waitlist, Roll Up Vehicles, Secondary Vehicles**.
  - flex, gap 12, padding `6px 16px`, transparent bg, color #e4eac8; text span 14px / 1.3.
  - Hover bg `rgba(228,234,200,.08)`. `:focus-visible` gives `outline: 2px solid #d1dbb9; outline-offset: -2px`.
  - Checkbox `span.interest-multiselect__checkbox-visual[data-checked]`: 16x16, `border: 1px solid #989e7b`, radius 3.
  - Checked: bg and border #d1dbb9; `box-shadow: inset 0 0 0 1px color-mix(#2a5d33 35%, transparent)`; tick data-URI 10x8, path `M1 4L3.5 6.5L9 1`, stroke #1a310f 1.5, centered.
- Multiselect behavior:
  - Clicking the trigger toggles the panel. Clicking an option toggles it and keeps the panel open.
  - Outside `pointerdown` or `Escape` closes it.
  - The selected value text is the selections **sorted alphabetically**, joined with ", " (e.g. "Consolidation Vehicles, Investor Waitlist").

### 2.4 Validation and submit (measured by submitting an empty form; validation short-circuits before any network call. No real submission was made.)
- Validation runs only on submit. Errors, in field order:
  - Full name empty → "Full name is required"
  - Email empty → "Email is required"; malformed → "Please enter a valid email address" (rules: trim; ≤254 chars; exactly one "@", not first; local part ≤64, no leading/trailing/double dots, character regex)
  - Company empty → "Company name is required"
  - No interests → "Please select at least one product interest"
- Error markup: `span.text-reg.form-error` inside the field after the input. Style: `color: #ef4444; font-size: .8rem (12.8px); line-height: 19.2px; margin-top: 4px; display: block`. With the field gap of 8, the error sits 12px below the input.
- The input or trigger gets `.error` → `border-color: #ef4444`. Focused error: `outline: .5px solid #ef4444; border-color: #ef4444; box-shadow: 0 0 0 2px rgba(239,68,68,.2)`.
- Editing a field clears only that field's error.
- After the first failed submit, the submit button is `disabled` until all four fields are non-empty. It has no visual disabled style: opacity stays 1.
- Error-state geometry at 1440 (see `contact-us-validation-1440.png`): inputs at y347 / 450.2 / 553.4 and trigger y709.6; errors at y407 / 510.2 / 613.4 / 769.6; submit y833.8. The form grows from 403 to 527.8 tall.
- On a valid submit:
  - State becomes "processing": the label changes to "SUBMITTING", the hover arrow is replaced by the homepage spinner icon (`.rotate-animation`, 15x14), and inputs are disabled.
  - A `FormData` POST goes to `https://getform.io/f/aqomwyea` (email, fullName, companyName, interests joined ", ", `action_taken=get-started-now`, optional `ref_source`), and a JSON POST goes to `/api/logContactForm` (both keepalive). **Stub these in the clone.**
  - After 500ms it redirects to `https://app.rollups.com/get-started?email=<email>&data=<base64(JSON{fullName,companyName,interests})>`, adding `&waitlist=1` if "Investor Waitlist" is selected.
  - The "success" state ("SUBMITTED" + check icon) exists in code but is never reached, because the redirect happens first.
- On exception: state "error" renders `div.form-message-error` (margin-top 16, padding 12, #e4eac8) > `p.text-reg` "Oops! Something went wrong while submitting the form. " + `a.error-mailto-link` "Email us directly here." → `mailto:hello@rollups.com?subject=Website Contact Us Form Bug` (underline, decoration rgba(255,255,255,.5), hover #fff).
- URL prefill:
  - `?email=` pre-fills the email. For non-free-mail domains it derives the name from the local part ("first.last" → "First Last") and the company from the domain's first label, capitalized.
  - When it derives a name it shows labels `label.text-reg.text-500.form-label.label-fadein` "Your Name" (above Full Name) and "Company Name" (above Company). Animation: `fadeInLabel .5s ease`, from opacity 0 / translateY(8px) to 1 / 0.
  - After 100ms it focuses and selects the name input.
  - `?ref_source=` is passed through.

---

## 3. /blog (index)

Page CSS: `blog-filter.css` (pills) and `blog-list.css` (header and list). There is no reveal animation.

### 3.1 Structure
```
section.section.blog-header
  div.container > div.blog-header-container (padding 0 30; ≤991 0 20)
    div.blog-header-content (flex col gap 16; padding-top 80; ≤767 60)
      h1.heading "Blog"          ← overridden to 14px/1.5 (21), weight 400, ls 0, PpNeueCorp (the family stays from .heading), #e4eac8
      p.description "The latest on how companies are taking control of their equity."   (PpNeueCorp 54/54 500 ls -1.08, max-width 560 → 3 lines, 560x162; ≤767 36/36, max-width 400)
    div.blog-filter (margin-top 32; ≤767 24) > div.blog-filter-pills (flex wrap, gap 12; ≤767 8)
      button.blog-filter-pill.active "All" · button.blog-filter-pill "Announcements" · "Best Practices" · "Case Studies"
section.section.blog-list-section
  div.container > div.blog-list (grid 2 × 1fr, gap 52px 48px, padding 80 30 0; ≤1200 1 col; ≤991 padding 60 20 80)
    article.blog-post-card ×9 > a.blog-post-link[href=/blog/{slug}] (flex, align flex-start, gap 24; ≤767 column, gap 16)
      div.blog-post-image (240x140, radius 8, overflow hidden, flex-shrink 0) > img[src=cover][alt=title] (100%/100%, object-fit cover, max-width 460, transition transform .2s ease)
      div.blog-post-thumb-content (flex col, flex 1)
        h2.blog-post-title   (SuisseIntl 18/27, weight 450, ls -.36, #e4eac8, margin-bottom 12, transition color .2s)
        p.blog-post-description (14/21 #d1dbb9, margin-bottom 24)
        div.blog-post-meta (grid `1fr auto`, gap 8, max-width 300, align center; all 14/21 #989e7b)
          span.blog-post-meta-element.blog-post-author · span…blog-post-date · span…blog-post-category · span…blog-post-reading-time "{n} min read"
```
Geometry:
- **1440**: header h1 x71 y159; description y196; pills y390 (36 tall). Pill widths: All 55.6, Announcements 127.6, Best Practices 134.8, Case Studies 120.4.
  - List section starts at y426; cards start at y506 (80 padding). Columns x71 and x744, each 625 wide.
  - Rows at y506 / 761 / 1016 / 1271 / 1526; row heights 203 / 203 / 203 / 203 / 182 (tallest card in the row).
  - In each card: image 240x140; text column at x+264, width 361; meta grid 300 wide (2 cols, e.g. 162.1 / 129.9); list ends at y1708.
- **1280**: still 2 columns (545 wide, x71 and x664); text column 281; rows 251 / 251 / 203 / 251 / 203.
- **768–1200**: 1 column, cards max-width 900, image 280x156.
- **390**: header x37; h1 y118; description y155 (36px, 3 lines, 316x108); pills wrap to 2 rows (y287 and y331; padding 6px 12px, still 36 tall); list padding `60 20 80`, 1 column 316 wide.
  - Image: `.blog-post-image` width 100%, height auto, max-height 250; img height auto, object-fit contain. For 2400x1260 covers it renders 316x165.9 in a 172.9 box (inline-img baseline gap). og-ruv 1252x484 renders at 122.2.
  - Cards are 327–480 tall with a 52px row gap.

### 3.2 Filter pills
- `.blog-filter-pill`:
  - AbcFavoritMono 12px, line-height 100%, uppercase, height 36, `padding: 12px 16px`, `border: .5px solid #466346`, radius 4, `bg rgba(228,234,200,.08)`, color #e4eac8, nowrap.
  - `transition: all .3s ease`; `:focus { outline: none }`.
- Hover: bg `rgba(228,234,200,.12)`, radius 3 (measured).
- `.active`: bg #e4eac8, color #2a5d33, border-color #989e7b.
- Behavior:
  - Client-side React state, no URL change, no pagination, no animation. The list simply re-renders.
  - Categories are the distinct post categories, sorted alphabetically, after "All".
  - Filtering keeps the original order: Announcements → 1 post; Best Practices → 3; Case Studies → 5.

### 3.3 Card hover
- `.blog-post-image:hover img` → `transform: scale(1.05)` (.2s ease).
- The title hover color is `var(--color-primary)`, which is undefined, so the **title color does not change** (measured #e4eac8).
- The whole card is a link (`cursor: pointer`).

### 3.4 Cards (in index order; verbatim)
| # | slug | Title | Excerpt (card description) | Author | Date | Category | Read | Cover |
|---|---|---|---|---|---|---|---|---|
| 1 | why-clean-captable-matters | Founder's Guide to Clean Cap Table | A practical guide to keeping your cap table clean, predictable, and investor-ready — and how to use founders SPV structures, like RUVs and CVs, to avoid unnecessary complexity. | Vish Khamamkar | November 23, 2025 | Best Practices | 5 min read | /images/blog/clean-cap-table.png |
| 2 | case-study-mem0-ruv | How Mem0 Used a Roll Up Vehicle to Bring in Strategic Backers Without Losing Focus | How a YC-backed startup brought in 30+ infrastructure leaders as strategic backers using a Roll Up Vehicle, without slowing down their $20M Series A. | Vish Khamamkar | October 28, 2025 | Case Studies | 5 min read | /images/og-mem0-cover.png |
| 3 | case-study-itemfarm-streamlined-fundraise-ruv | How Itemfarm Used a Roll Up Vehicle to Close Strategic Angels on Short Notice (U+202F narrow no-break space between "Roll" and "Up") | How a hardtech startup used an RUV to capture a few strategic checks without the administrative headache | Josh Webster | October 25, 2025 | Case Studies | 4 min read | /images/og-itemfarm-cover-1.png |
| 4 | case-study-heron-power-strategic-investors-ruv | How Heron Power Used a Roll Up Vehicle to Rally Strategic Support Fast | How Heron Power consolidated 30+ strategic investors into a single cap table line using a Roll Up Vehicle, accelerating its $38M Series A. | Vish Khamamkar | August 8, 2025 | Case Studies | 4 min read | /images/og-heron-power.png |
| 5 | how-ruvs-simplify-fundraising | How Roll Up Vehicles Simplify Fundraising | Raise from many investors. Show one line on your cap table. Zero admin drag. | Vish Khamamkar | July 30, 2025 | Best Practices | 5 min read | /images/og-ruv-blog-cover.png |
| 6 | case-study-cimento-ai-angel-investors-ruv | How Cimento AI Built a Strategic Angel Network with an RUV | How one startup tapped a network of security experts using a Roll Up Vehicle, bypassing traditional investment hurdles. | Vish Khamamkar | July 30, 2025 | Case Studies | 4 min read | /images/og-cimento-cover-1.png |
| 7 | announcing-rollups | Announcing Rollups | Rollups offers Roll Up Vehicles and Consolidation Vehicles to help companies take control of their equity. | Rollups Team | July 30, 2025 | Announcements | 3 min read | /images/og-homepage.png |
| 8 | case-study-secureframe-maximize-captable-value-ruv | How Secureframe Maximized the Value of Its Cap Table With a Roll Up Vehicle | How Secureframe consolidated 50+ strategic investors into a single line on their cap table, saving over $100k in admin fees with an RUV. | Vish Khamamkar | July 12, 2025 | Case Studies | 5 min read | /images/og-secureframe-cover.png |
| 9 | special-purpose-vehicles-for-startups-guide | Founder's Guide to Special Purpose Vehicles | What founders need to know about Founder SPVs and raising capital from many investors. | Dan Hightower | January 15, 2024 | Best Practices | 6 min read | /images/founderspv.png |

Dates are formatted with `toLocaleDateString('en-US', {year:'numeric', month:'long', day:'numeric', timeZone:'UTC'})`. The card excerpt equals the article header description for all 9 posts. Local asset paths are in ASSET_MANIFEST_CONTENT.md.

---

## 4. /blog/{slug}: article template

Page CSS: `blog-post.css`. There is one template for all 9 posts; the differences are content blocks only (§4.7). There is no reveal animation.

### 4.1 Layout
```
section.section > div.container
  div.blog-post-layout  (flex, align flex-start, gap 40, max-width 1200, margin 0 auto, padding 0 40)
    aside.blog-post-sidebar  (position sticky, top 100; width 240; margin-right 40; padding-top 100; height fit-content; display none ≤1200)
    main.blog-post-main (flex 1; max-width 100%)
      header.blog-post-header-wrapper
        div.blog-post-header-content (relative; flex col; gap 24; padding 120 0 40)
          h1.heading {title}
          p.description {excerpt}
        div.blog-post-header-image (width 100%; height 400; radius 12; overflow hidden; margin-bottom 64) > img[src=cover][alt=title] (100%/100%, object-fit cover)
      article.blog-post-content-wrapper (padding-bottom 24)
        div.blog-post-content   ← prose (4.3)
        div.blog-post-content-mobile-meta-wrapper   ← meta repeated for ≤1199 (4.5)
        div.blog-post-navigation > a.back-to-blog[href=/blog] "← Back to Blog"
```
The `main.blog-post-main` is a nested `<main>` inside `main.main-wrapper`, as on the original.

| | layout box | sidebar | main column |
|---|---|---|---|
| 1440 | x80, 1280 wide (1200 + 2×40 padding) | x120, 240 wide | x440, **880** wide |
| 1280 (≤1400: max-width 1000, padding 0 30) | x110, 1060 wide | x140 | x460, **680** wide |
| ≤1200 (block; max-width 900; padding 0 25) | centered | hidden | full width |
| 390 (≤767: max-width 100%, padding 0 20) | x17, 356 wide | hidden | x37, **316** wide |

### 4.2 Header
- h1 `.heading`: PpNeueCorp 54/54, 500, ls -1.08, #e4eac8. At 390: 30/30, ls -.72. Starts at y199 (79 + 120).
- `.description`: SuisseIntl 18/27, 400, ls -.36px, #e4eac8. ≤991: 16px (lh 24), ls -.32.
- Header image: 880x400 (680x400 at 1280), radius 12, `object-fit: cover`, margin-bottom 64.
  - ≤767: height auto, max-height 300, radius 8, margin-bottom 30; img height auto, object-fit contain. Measured 316x172.9 box, 316x165.9 img.
- Vertical rhythm: h1 → 24 → description → 40 → image → 64 → prose.
  - announcing @1440: h1 199–253, description 277–304, image 344–744, prose 808.
  - mem0 @1440 (3-line title): h1 199–361, description 385–439, image 479–879, prose 943.

### 4.3 Prose styles (`.blog-post-content-wrapper .blog-post-content …`)
| Element | Style (1440) | ≤991 change |
|---|---|---|
| `p` | SuisseIntl 18px / 1.7 (30.6px), 400, #e4eac8, margin 0 0 24; `:last-child` mb 0 | 16px / 27.2 |
| `h1, h2` | SuisseIntl **24px** / 1.4 (33.6), 500, #e4eac8, margin 40 0 20; `:first-child` mt 0 | 20px / 28 |
| `h3` | 18px / 1.4 (25.2), 500, margin 40 0 20. In the posts, h3 text is wrapped in `<strong>` → renders at weight 700 | — |
| `h4–h6` | 14px, 500, margin 40 0 20 (unused) | — |
| `p a`, `li a` | color #989e7b, `text-decoration: underline` (decoration #989e7b), `transition: color .18s ease-in-out`; hover #e4eac8. Many links are inside `<strong>`, so they render bold. | — |
| `p strong`, `li strong` | 700, #e4eac8 | — |
| `ul` / `ol` | 18px / 1.7, #e4eac8, margin 0 0 28 24 (margin-left 24; the list box starts at x464), padding-left 0; `ul` disc, `ol` decimal (markers #e4eac8 18px, outside). `ol` also keeps the UA margin-top of 1em = 18px (measured margin 18 0 28 24). | lists keep 18px (not reduced) |
| `li` | margin-bottom 6 (last 0) | — |
| `blockquote` | border-left 3px solid #989e7b; padding-left 20; margin 24 0; italic; color #989e7b; 16/24 base. In the posts each blockquote contains `p.quote-text` + `p.quote-author`. | — |
| `.quote-text` | 20px / 1.7 (34px), weight 450, italic, ls -.48, #e4eac8, margin-bottom 0 | (stays 20px) |
| `.quote-author` | 16px / 1.7 (27.2), 450, #989e7b, margin-bottom 24 (italic when inside a blockquote) | — |
| `hr` | no border except `border-top: .5px solid rgba(255,255,255,.1)`; margin 32 0 | — |
| `.highlights-box` | bg rgba(255,255,255,.05); border 1px solid rgba(255,255,255,.1); radius 8; padding 24; margin 48 0; 18px. Contains `h2` (24/33.6, mt 0 as first child, mb 20) + `ul` (list-style none, margin 0). `li`: 18/30.6, ls -.36, mb 12 (last 0), `::before "•"` #989e7b margin-right 8 (inline bullet). | h2 20px; li 16px |
| `table` (inside `div.table-responsive`, overflow-x auto) | width 100%, min-width 600, border-collapse collapse, margin 32 0, 16/24 | ≤768 see 4.6 |
| `th` | padding 12 16, left, 600, #e4eac8, bg rgba(255,255,255,.05), border-bottom 1px solid rgba(255,255,255,.1) | |
| `td` | padding 12 16, #989e7b, same border-bottom | |
| `ul.process-list` | list-style none, margin-left 0. `> li`: margin-bottom 16 (computed 6 in the measurement because the prose `li` rule wins), marker "". Nested `> li > ol`: margin 8 0 0 24; its `li`s increment `counter(step)` and render `::before "N. "` (700, margin-right 4), list-style none, mb 8. | |
| `code` / `pre` | defined (mono 12px, rgba(255,255,255,.1) / .05 bg) but unused | |

Measured 1440 spacing: h2 (33.6 tall) sits 40 below the previous block's bottom margin-collapsed edge. Example (announcing): p ends y900 (+24 mb) → h2 y939.8 → p y993.4.

### 4.4 FAQ block inside the article (`div.faq-section`, last child of `.blog-post-content`)
- `.faq-section`: `border-top: 2px solid rgba(255,255,255,.1); padding-top: 32; margin-top: 48`.
- `> h2:first-of-type` (section title, e.g. "Frequently Asked Questions"): 24/33.6, 500, **#d1dbb9**, margin **60 0 48** (the top margin does not collapse into the padding). ≤991: 20px.
- `h2:not(:first-of-type)` (questions): **18px**/25.2, 500, #e4eac8, margin 40 0 8.
- `h2:not(:first-of-type) + p` (answers): 18px / **1.5 (27)**, **#989e7b**, margin-bottom 16. ≤991: 16/24.
- Other blocks inside (e.g. a `ul` answer in announcing-rollups) use the normal prose styles.
- announcing @1440: the section starts at y4072.9; title y4166.9 (32 + 60 below the rule); first question y4248.5.

### 4.5 Sidebar (≥1201) and mobile meta (≤1199)
Sidebar content (`div.blog-post-sidebar-content`, flex col, gap 24), starting at y200 (79 + 100 top offset):
- `div.blog-nav-section` (margin-bottom 20) > `a.blog-nav-link[href=/blog]` (flex, center, gap 8, 14px 500 #e4eac8; `transition: opacity .2s ease`; hover opacity .8):
  - `span.blog-nav-icon` "←" (18px / 27, 500)
  - `span.blog-nav-text` "Blog"
- `div.blog-post-article-meta.direction-column` (flex col, gap 24):
  - `div.blog-category-section`:
    - `div.blog-category-label` "CATEGORY": 12px/18, 500, ls .5px, #989e7b, mb 8. The source text is uppercase; there is no text-transform.
    - `div.blog-category-name`: 14/21 400 #e4eac8.
  - `div.blog-author-section`:
    - `div.blog-author-label` "WRITTEN BY" (same style as the category label).
    - `div.blog-author-info` (flex, center, gap 12):
      - `div.blog-author-image`: 32x32 circle, bg rgba(255,255,255,.1), overflow hidden, img cover.
      - `div.blog-author-details` > `div.blog-author-name` (14/21 500 #e4eac8) + optional `div.blog-author-title` (12/16.8 #989e7b).
  - `div.blog-meta-section` (flex, center, gap 24):
    - `div.blog-publish-date`: 14/21 #989e7b.
    - `div.blog-reading-time`: 14/21 #989e7b, `text-transform: lowercase`. The source is "3 MIN READ" and it renders "3 min read".
  - Two `div.blog-meta-section-cell` duplicates (date, reading time) are present but hidden in the column variant.
- Measured at 1440 (announcing): nav y200; category label y271; name y297; author label y342; avatar y370.9; name y368; title y389; date y429.8 (reading time at x231.8).
- The sidebar is `position: sticky; top: 100px`, so it stays pinned while the article scrolls.

Author data per post:
- "Rollups Team" / title "Product Team" / avatar /images/og-homepage.png (the cover image, cropped into the circle).
- "Vish Khamamkar" / no title / /images/team/vish.png.
- "Josh Webster" / no title / /images/team/josh.png.
- "Dan Hightower" / "General Manager" / /images/team/dan4.png.
- Without a title, `.blog-author-info` is 32 tall and the name is vertically centered.

Mobile meta: `div.blog-post-content-mobile-meta-wrapper`:
- `display: none` at ≥1200. Otherwise: padding-top 48, margin-top 48, `border-top: .5px solid rgba(255,255,255,.1)`, max-width 600.
- It contains `div.blog-post-article-meta.direction-row` (grid 1fr 1fr, gap 16). Cells: category | author; date cell | reading-time cell (`.blog-meta-section-cell` shown as flex; `.blog-meta-section` hidden).
- At 390 (announcing): wrapper y6609.1; grid y6658.1 (150 / 150 columns); date row y6737.9.

Back link: `div.blog-post-navigation` (margin-top 48, padding-top 24, `border-top: .5px solid rgba(255,255,255,.1)`) > `a.back-to-blog` "← Back to Blog" (14/21 #989e7b; `transition: color .18s ease-in-out`; hover #e4eac8). At 1440 announcing: y4714.9. Then the section ends and the footer follows (the content wrapper adds 24px of bottom padding).

### 4.6 Responsive quirks to reproduce
- The sidebar disappears at ≤1200 (between 1201 and 1400 it stays, with the 1000px layout).
- `.table-responsive` at ≤768 (SPV post only):
  - table font 14px; th/td padding `8px 4px`, `white-space: nowrap`.
  - The first column is `position: sticky; left: 0; z-index: 1; min-width: 120px; background: var(--background-color, #fff)`. The variable is undefined, so **the first column has a white background** with light text (#e4eac8 th / #989e7b td). This is a genuine rendering bug on the original.
  - The table scrolls horizontally.
- Lists stay 18px on mobile while paragraphs drop to 16px.

### 4.7 Article variants (all use the template above)
Full per-article outlines, with every heading verbatim and per-section block/word counts, are in `recon/pages/articles.json` (`articles[].outline`). Do not copy article prose; write placeholder copy of the same shape.

| slug | Opening | Body block types used | FAQ section |
|---|---|---|---|
| announcing-rollups (baseline "announcement") | plain `p` (with a bold link) | h2, h3 (`<strong>`-wrapped), p, ul ×6 and ol ×1 (bold lead-ins "Term: …" and inline links), p with bold "Where to go" lead-in | "Frequently Asked Questions" + 3 Qs; the last answer is a `ul` |
| case-study-mem0-ruv, -itemfarm-…, -heron-power-…, -cimento-ai-…, -secureframe-… (**case-study template**) | `p.quote-text` (italic pull quote, not in a blockquote) + `p.quote-author` "— Name, Title of Company", then `div.highlights-box` (h2 "Highlights" + 4 `li`s; the first li is "Stage: … \| Market: … \| Description: …") | h2 sections "Background" / "The Problem: …" / "The Solution: …" (Secureframe adds a 4th) of plain p only (no lists, no h3). mem0 has 16 inline links (people and investors); the others have 3. | "Frequently Asked Questions" + 5–7 Q/A (h2 + one p each) |
| why-clean-captable-matters | `div.highlights-box` titled "Key Takeaways" (5 li) directly as the first child (its 48 top margin collapses with the header image's 64) | p, `hr` between sections (×7), h3 subsections, `<br>` line breaks inside paragraphs (16), ol ×1, ul ×2 | 8 Qs |
| how-ruvs-simplify-fundraising | highlights-box "Highlights" (5 li) | ul with bold lead-ins, a mid-article `p.quote-text` + `p.quote-author`, `ul.process-list` (3 bold-titled steps each with a nested counter `ol`) | 8 Qs |
| special-purpose-vehicles-for-startups-guide | highlights-box "Key Takeaways" (3 li) + p ×5 + `blockquote` | 8 `blockquote`s (each p.quote-text + p.quote-author), hr ×5, h3 "1. …" to "4. …" option subsections with ul (bold lead-ins, some nested lists), `div.table-responsive > table` (5 cols: Structure / Capital Invested / Capital Reaching Company At Close / Entity Risk for Founder / Long-Term Risks; 4 body rows), ol ×2 | **Quirk**: the `.faq-section` starts with h2 "Ready to Launch Your RUV?" (styled as the FAQ title: #d1dbb9, margin 60/48) followed by p/ul/hr, then h2 "FAQ", which gets the *question* style (18px), then 6 Qs |

Measured block geometry at 1440:
- mem0: quote y943 (880x34); author y977; highlights y1052.2 (880x292.6; h2 at +25, lis 31 tall, +12 gaps).
- SPV: highlights y862; blockquotes indented at x463 (440 + 3 border + 20 padding), quote p 857 wide.
- how-ruvs: mid quote at y3538 (170 tall, 5 lines).

---

## 5. Legal pages (/privacy-policy, /terms-of-service, /disclosures)

Page CSS: `legal.css`. They share one template; outlines are in `recon/pages/legal.json` (do not copy prose). There is no reveal animation.
```
section.section > div.container > div.container-policy.container-policy-header
    (max-width 550; padding 120 10 40 (--page-padding-lg top/bottom); margin auto; flex col; gap 16)
  h1.heading {Privacy Policy | Terms of Service | Disclosures}     (54/54; 390: 30/30)
  p.text-reg.text-light-300 "Last modified: Jul 1, 2025"          (14/21 #989e7b; identical date on all three)
section.section > div.container > div.container-policy.container-policy-content (max-width 550; padding 0 10 24; margin auto)
  body blocks
```
- The content typography is small:
  - `p`: 14/21 #e4eac8, margin-bottom 24.
  - `p.list-head` (pseudo-heading used by Disclosures): same 14/21 weight 400, **margin-bottom 4**.
  - `h2`: 14/21, UA bold 700, margin-bottom 16.
  - `p a`: underline, #989e7b → hover #e4eac8 (.18s ease-in-out).
  - `ul`: 14/1.5 disc, margin-left 16, padding-left 6, mb 24 (unused on these pages).
- Geometry: the policy boxes are 570 wide (550 + 20 padding), centered.
  - 1440: box x435; h1 x445 y199; "Last modified" y269; content starts y330.
  - 1280: box x355.
  - 390: box x17, width 356 (text 336 at x27); h1 y178; date y224; content y285.
- The container side rules still run the full height.
- Outlines:
  - **Privacy Policy**: 1 paragraph (32 words) with 1 inline link "here" → https://venture.angellist.com/privacy. Page height 1035 at 1440 (min 900 at 390).
  - **Terms of Service**: `h2` "Introduction" then 3 paragraphs (81 / 28 / 28 words).
    - Link "AngelList Investing Platform Service Terms" → https://venture.angellist.com/terms (in p1).
    - Link "AngelList Company Platform Service Terms" → https://stack.angellist.com/terms (in p2).
  - **Disclosures**: intro paragraph (140 words), then three `p.list-head` + paragraph pairs: "Quotes" (34 words), "Investing in Venture Capital Opportunities is Risky" (43), "AngelList" (49). No links.

---

## 6. Breakpoints introduced by these pages
- blog-post: 1400, 1200 (sidebar and mobile meta; the mobile meta hides at ≥1200), 991, 768/767.
- blog-list: 1200 (1 col), 991, 767.
- contact: 1023, 767.
- waitlist: 1024 (use-cases grid and sidebar), 991, 768/767.
- legal wide container (unused variant): 1400, 991, 767.

## 7. Not measured / caveats
- No form was submitted. The contact success/redirect path, the getform endpoint and `/api/logContactForm` come from the JS source only. The waitlist "Ask anything else" assistant is a live AI backend; only its UI is shared with the homepage.
- The contact "SUBMITTED" state is unreachable on the original (the redirect fires first).
- `/images/og-blog.png` is a 404 on the live site.
- The waitlist flip card was captured mid-cycle; its initial state is unflipped (front / "Viewing the company dashboard"), per the source.
- Article reading times, dates and author titles are hard-coded strings on the original (the reading time is authored as "N MIN READ" and lowercased by CSS).
