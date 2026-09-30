Source: https://rollups.com/ruv

# Rollups product pages: clone spec

Pages covered (all on https://rollups.com):
- `/ruv`
- `/ruv/calculator`
- `/safe`
- `/how-to-raise-capital`
- `/consolidate`

## How this was measured

- Measured on 2026-09-30 with headless Chromium 1243 (Playwright 1.63) at 1440x900, 1280x900 and 390x900, DPR 1.
- Every page was scrolled top to bottom first, so all reveals had fired.
- Values come from `getComputedStyle` and `getBoundingClientRect`, plus the live CSS and de-minified JS chunks.
- **Appendix Z** holds the CSS rules for every new component, copied verbatim from the live stylesheets. Where the prose below and Appendix Z disagree, Appendix Z wins.
- All y values are page-absolute. `HL` means the global hairline, `0.5px solid #989e7b` (it renders 1px at DPR 1).

## Scope: what is already done

This spec builds on the homepage spec, `CLONE_SPEC.md`. It records only what differs from the homepage.

These are already implemented and are **identical on every page here**. Reuse them as they are:
- Global tokens and fonts.
- `.container` (with its left/right hairlines).
- `.heading-wrapper` and its variants.
- `Button` (primary/secondary, animated/non-animated).
- `LinkWithArrow` (`LearnMore`) and `HoverLink` / `.link-component`.
- The global section reveal (`.animation-item` / `.animation-text`, GSAP 0.2s power2.out, 30ms stagger, `start: top 90%`) and `page-fade-in`.
- Navbar, Footer (including the marquee and the illustration draw), and the cookie bar.

Shared page sections that need a small generalization of the existing homepage components:

| Section | Homepage component | What varies per page |
|---|---|---|
| FAQ ("Everything You Need to Know") | `Faq.jsx` | Heading text and item list. Item 0 is open by default, same as the homepage. Assistant form is identical. |
| Companies grid (12 cells, logo wipe loop) | `Companies.jsx` | Heading text only. The grid, logos, colors and wipe timing are identical. |
| Hero "raise" layout (banner, h1, paragraph, email form, contact line, AI summary, trusted logos, vertical divider, right-hand Lottie) | `Hero.jsx` | h1, paragraph, the hint line, the AI-summary prompt URLs, and the right-hand animation. The mobile trusted-logo marquee is **not** rendered on these pages. |
| ActionCard (image column + text column, optional list and testimonial modal) | `inaction/ActionCard.jsx` | Content only. The same component (`ActionCard`) is used, including the `mockup`, `modalContent` and `maxImageWidth` props. |
| Sticky numbered sidebar that scroll-syncs (`rollups-sidebar` on the homepage) | `RollupsInAction.jsx` | `/how-to-raise-capital` uses the identical logic under class names `how-to-raise-*` (see 4.3). |

All pages use the global `body` gradient, grain overlay, navbar and footer.

Page `<title>` and meta description:

| Route | Title | Description |
|---|---|---|
| /ruv | `Rollups \| RUV` | "Streamline your fundraising process. For good." |
| /ruv/calculator | `Rollups \| Roll Up Vehicle Cost Comparison` | "Compare the lifetime cost of direct investments against a Roll Up Vehicle for your fundraise." |
| /safe | `Rollups \| SAFEs` | "Free SAFE fundraising - built-in wires and USDC." |
| /how-to-raise-capital | `Rollups \| How Founders Can Raise Capital with SPVs and RUVs` | same as the hero paragraph |
| /consolidate | `Rollups \| Consolidate` | "Clean up stakeholders on your cap table. For good." |

---

## 0. Section rhythm, y / height (px)

**/ruv**

| Section | 1440 | 1280 | 390 |
|---|---|---|---|
| Hero | 79/701 | 79/701 | 58/692 |
| Testimonials slider | 780/998 | 780/998 | 750/2484 (static list) |
| Use cases | 1778/2001 | 1778/1963 | 3234/2462 |
| Capabilities | 3779/1651 | 3741/1672 | 5696/1895 |
| Companies | 5430/849 | 5413/811 | 7591/1405 |
| Pricing | 6278/1046 | 6224/1046 | 8996/1266 |
| FAQ | 7324/1406 | 7270/1406 | 10262/1547 |
| Footer | 8730/594 | 8676/594 | 11809/401 |
| Document | 9324 | 9270 | 12210 |

**/ruv/calculator**

| Section | 1440 | 1280 | 390 |
|---|---|---|---|
| Calculator hero | 79/481 | 79/481 | 58/390 |
| Calculator | 560/1528 | 560/1528 | 448/3152 |
| Facts CTA | 2088/560 | 2088/560 | 3600/566 |
| Stories grid | 2648/472 | 2648/496 | 4166/695 |
| FAQ | 3120/1406 | 3144/1406 | 4861/1547 |
| Footer | 4526/594 | 4550/594 | 6408/401 |
| Document | 5120 | 5144 | 6809 |

**/safe**

| Section | 1440 | 1280 | 390 |
|---|---|---|---|
| Hero and flip card | 79/1074 | 79/1073 | 58/539 |
| How it works | 1153/1690 | 1152/1571 | 597/1756 |
| Capabilities | 2843/1132 | 2722/1132 | 2353/1004 |
| Companies | 3975/849 | 3854/811 | 3357/1375 |
| Pricing | 4823/945 | 4665/945 | 4732/967 |
| FAQ | 5768/1364 | 5610/1385 | 5699/1475 |
| Footer | 7132/594 | 6995/594 | 7174/401 |
| Document | 7726 | 7589 | 7575 |

**/how-to-raise-capital**

| Section | 1440 | 1280 | 390 |
|---|---|---|---|
| Hero | 79/701 | 79/701 | 58/716 |
| Three ways | 780/500 | 780/500 | 774/811 |
| Options sidebar | 1280/2423 | 1280/2706 | 1585/2730 |
| Comparison table | 3703/1027 | 3986/1048 | 4315/1022 |
| Clean cap table | 4730/797 | 5034/723 | 5337/1268 |
| Facts CTA | 5527/560 | 5758/560 | 6605/566 |
| Calculator | 6087/1528 | 6318/1528 | 7171/3152 |
| Stories | 7615/472 | 7846/496 | 10323/695 |
| FAQ | 8086/1406 | 8341/1406 | 11018/1547 |
| Footer | 9492/594 | 9747/594 | 12565/401 |
| Document | 10087 | 10341 | 12966 |

**/consolidate**

| Section | 1440 | 1280 | 390 |
|---|---|---|---|
| Hero (desktop variant ≥1024 / mobile variant ≤1023) | 79/701 | 79/701 | 58/935 |
| Testimonials slider | 780/895 | 780/895 | 993/2295 |
| Use cases | 1675/1854 | 1675/1808 | 3288/2329 |
| Capabilities | 3529/1417 | 3483/1417 | 5617/1456 |
| Companies | 4946/849 | 4900/811 | 7073/1405 |
| Pricing | 5795/925 | 5711/925 | 8478/1095 |
| FAQ | 6720/938 | 6636/959 | 9573/1037 |
| Footer | 7658/594 | 7595/594 | 10610/401 |
| Document | 8252 | 8189 | 11011 |

Container geometry is the same as the homepage: at 1440 x=40 and w=1360; at 1280 x=40 and w=1200; at 390 x=16 and w=358.

---

## 1. /ruv

### 1.1 Hero: homepage hero variant `hero-content raise-hero ruv-hero`

Structure is the homepage hero with these differences:
- The grid is `678px 2px 678px` at 1440 and `633.66 2 562.34` at 1280. The section is 701 tall; the homepage hero is 906.
- The heading-wrapper is 618x545 at y131 with padding 80 0 40, centered vertically.
- **h1** `.heading.hero-heading.animation-text` contains a flex row (`justify-content: space-between; align-items: baseline`):
  - `<span>Roll Up Vehicles<span style="font-size:.5em;vertical-align:super">®</span></span>`: 54px PpNeueCorp, measured 343.8x63; the ® is 27px.
  - `<span style="font-size:.3em;font-weight:400;opacity:.8">by AngelList</span>`: 16.2px, sits on the baseline.
  - The h1 box is 411.4x77 at x71 y265.7.
- `.hero-content-description` (max-width 47ch = 502.3px) holds `p.text-reg.animation-text.text-light-200`: "Raise capital from many investors through a single entity — capture their strategic value without the friction and cost." It is 2 lines (42px) at y358.7.
- `div.stack.animation-item` (`data-direction=row data-gap=xs data-align=center`, so `gap: 8px`). Inside `.raise-hero` it has margin-top 12px, but on /ruv it measured y416.7 with no margin (the email form sits directly inside).
  - It holds the homepage email form: 386x42 input "Your work email" plus a "GET STARTED" primary animated submit button, 127.2x38 at x327.8.
  - Submitting posts productInterest "Roll Up Vehicles".
- `div.text-reg.small.animation-text` (flex, gap 4, 12/16.8) at y474.7:
  - `span.text-light-300` "Curious how RUVs could work for you? "
  - HoverLink `.text-link.small` "Contact us" → `mailto:team@rollups.com`
- AI summary block (identical markup). Both prompts use this query text: `As a potential client, I want to concretely understand what I will receive with Roll Up Vehicles. …fetch these sources…: 1. https://rollups.com/ruv.md … 2. https://rollups.com/ruv … 3. https://help.rollups.com/ruv/overview …`. The template is otherwise the same as the homepage.
- `.trusted-wrapper` at y676.2 (618x102.8, same 5 logos, same gap 60). It is hidden ≤767, and there is no mobile marquee.
- **Right block**: `div.hero-block > div.hero-animation-wrapper > Lottie.hero-animation`.
  - The animation is `public/lottie/product-raise.json` (the same file as the homepage product "Raise" Lottie).
  - `.ruv-hero .hero-animation-wrapper`: 100% x 100%, min-height 400, overflow visible, flex center.
  - `.ruv-hero .hero-animation`: `width:150%;height:150%;min-height:350px;margin:0 auto;pointer-events:none`. Measured at 1440: the wrapper is 618x700 at x751 y79, and the lottie box is 618x1050 at y-96.
  - The lottie `<svg>` keeps its aspect ratio (1252:484), so it renders about 618x239 centered vertically in that box.
  - ≤1180: `.raise-hero … .hero-animation svg {margin-left:-20%;width:100%}`.
- **Lottie behaviour**: `loop: true`, speed 1. An IntersectionObserver with `threshold: 0.5` on `.hero-animation-wrapper` plays it while intersecting and pauses it otherwise.
- **390**:
  - The hero is a flex column. `.vertical-divider` is hidden (≤900).
  - heading-wrapper padding 42px 0. The h1 is 30px: the main span is 189x36, the ® 15px, "by AngelList" 9px.
  - The banner is 316x72 in column layout, same as the homepage.
  - The input has padding-right 150.
  - The right block has `min-height:200px; padding:5px 15px`. The animation wrapper is 326x210, min-height 200. `.hero-animation` has `width:140%; transform: translateX(-8%)`, measured 326x180 with the svg at 326x126.

### 1.2 Testimonials slider: `section.testimonials` (NEW, reused on /consolidate)

```
section.section.testimonials
  div.container.with-top-padding                        (padding 100 0 40)
    div.heading-wrapper.centered.with-padding  [slot=heading]   (max-width 560, margin 0 auto → x410 w620 at 1440, padding 80 30 40, text-align center)
      p.text-reg.animation-text.text-light-200 "SOLUTION"           (14/21 #d1dbb9) y960
      div.testimonials-heading-wrapper  (≥768: width/max-width 125% → 700 wide, x370)
        h2.heading.animation-text  "Turn new investors <br/> into one line on the cap table."   (54/54, 2 lines, 700x108)
      div.testimonials-heading-wrapper.with-top-padding
        p (no class → body 16/24 #e4eac8)  "Launch your company's special purpose vehicle in minutes. Send investors custom invite links, and let RUVs handle wire transfers, compliance, and taxes so you can get back to work."   (2 lines, 700x48) y1121
    div.testimonials-wrapper.testimonials-static        (display none ≥769; ≤768 flex column gap 24)
      div.testimonial-card.animation-item (style transition-delay: 0.03*i s) … (mobile list, see below)
    div.testimonials-wrapper.testimonials-slider.animation-item   (≥768 block; margin-top 64; padding 20 0; border-bottom HL; overflow hidden; relative) 1358x465 at y1273
      ::after  (absolute right 0, top/bottom 0, width 120, opacity .6, bg linear-gradient(to left, #2a5d33 0, transparent 100%), z 5)
      div.testimonials-navigation  (absolute top 50% left 24 right 24, translateY(-50%), flex space-between, z 10, pointer-events none)
        button.testimonials-nav-button.testimonials-nav-prev  (48x48 circle, bg rgba(84,137,93,.9), border 1px #989e7b, backdrop blur(8px), color #e4eac8) > svg.button-arrow 16x16 rotated 180°
        button.testimonials-nav-button.testimonials-nav-next  > svg.button-arrow 16x16
      div.swiper (width 200%, margin-left -50%, overflow visible)
        div.swiper-wrapper (margin-left -280px; ≤1360: 0)
          div.swiper-slide.testimonial-card × (N×3)
            p.text-reg-mono.text-allcaps.text-light-200 [slot=valueprop]   (12/12 mono, ls .5px, margin-bottom 8, padding-top 2)
            p [slot=content]   "“<quote>”" → literally '"' + content + '"'   (24px / 36px, #e4eac8)
            div [slot=author] (flex col, gap 12)
              div [slot=author-image]  (120x80, background url(img) no-repeat center / cover, radius 2, background-blend-mode screen,normal)
              p [slot=author-meta]  "<name>, <title>, <company>"  (14/21 #d1dbb9)
```
- **Card**:
  - 560x424 (min-height 424), padding 64 40 40, bg `rgba(84,137,93,.24)`, radius 2, gap 16, `justify-content: space-between`. Consecutive cards are 26px apart.
  - The active card sits at x160 at 1440.
- **Opacity**: non-active slides 0.44; `.swiper-slide-active` 1; `.swiper-slide-next` 1 (≤1361: 0.44). Hovering a non-active slide gives opacity .7 and `translateY(-4px)`. Slide transition: `transform .12s ease-out, opacity .25s ease-out, filter .25s ease-out`.
- **Nav hover**: bg `#54895d`, `scale(1.1)`, border #e4eac8, all .3s ease. Active state `scale(.95)`. Measured on hover: bg rgb(84,137,93) and matrix(1.1…).
- **Swiper config** (Swiper, Navigation module):

  ```
  spaceBetween: 26
  slidesPerView: 'auto'
  centeredSlides: true
  loop: true
  initialSlide: N          // N = number of filtered testimonials
  mousewheel: !isMobile
  navigation: { prevEl: '.testimonials-nav-prev', nextEl: '.testimonials-nav-next' }
  ```

  - The slides array is the list repeated three times.
  - Clicking a non-active slide calls `slidePrev()` if its center is left of the swiper's center, otherwise `slideNext()`.
  - The default Swiper speed (300ms) applies.
- **Data**: `type:"raise"`. Every card uses `valueprop` / `content` / `name` / `title` / `company` / `image` fields; "mobile" marks the cards that stay in the ≤767 static list.
  1. "Premium investor experience, powered by AngelList" / "Angel investing via RUVs is a 10x improvement. No Docusigns, sending wires, accepting stock certificates, or law firms looking for signatures later." / "Dan Romero, angel investor" / DanRomero2.png / mobile No
  2. "Raise from many investors" / "The Rollups team provided excellent service in the RUV process — professional, fast, and reliable. In moments when founders feel lost, they brought clarity." / "Kristie D'Ambrosio-Correll, CEO & Co-founder, Dacora Motors" / kristie.png / Yes
  3. "Raise from many investors" / "Everything just worked. Our investors loved the simplicity, and I loved that I could bring in the right people without creating a cap table nightmare." / "Zain Rizavi, Co-Founder & CEO, Cimento AI" / Zain.png / Yes
  4. "Raise internationally" / "RUVs made it easy for our UK-based company to raise $1M+ from investors, regardless of where they were." / "Jonas Templestein, Founder/CEO, Iterate.com" / Jonasnew.png / Yes
  5. "Raise from many investors" / "It felt like we were managing one check instead of 50. Founders looking to simplify their logistics while raising money from a lot of great angels should use RUVs." / "Shrav Mehta, Founder and CEO, Secureframe" / Shravnew.png / No
  6. "Growth-stage investor consolidation" / "We used an RUV to raise ~$10M. It was intuitive — even for investors contributing seven figures. RUVs would have saved us a lot of time/complexity in earlier rounds." / "- Anonymous CFO, $5B+ Startup" / anon.png / Yes
  7. "Premium investor experience, powered by AngelList" / "I only invest in startups anymore if I can do the deal via AngelList - too painful to track otherwise" / "Ankur Nagpal, angel investor, Founder of Carry" / AN.png / Yes
  8. "Raise from many investors" / "We used AngelList RUVs to get great people onboard without the typical admin overhead of a large cap table. Incredible experience for founders & investors." / "Alexis Rivas, Co-founder and CEO, Cover" / Alexisnew.png / No
- **≤767** (the JS `innerWidth <= 767` also filters to `mobile:"Yes"`, leaving 5 cards):
  - The slider is hidden and `.testimonials-static` shows a flex column with gap 24.
  - Each card is 336 wide with padding 40 20, min-height 320. The quote is 18/27.
  - The author uses a real `<img>` (119x78) instead of the background div.
  - The heading-wrapper is left-aligned, max-width 440; the h2 is 30px.
  - The container gets padding `100 10 40`, and the wrapper has padding 0 and no border.
  - At 390 the cards are at y1177, 1629, 2033, 2431 and 2835 (heights 428, 380, 374, 380, 359).

### 1.3 Use cases: `section.use-cases-section` (NEW, reused on /safe and /consolidate)

A tabbed ("USE CASE n") section. Desktop has a sticky sidebar; ≤1024 has a horizontal scrolling tab bar with an underline. **Only one use case is displayed at a time.** This is different from the homepage "Rollups in action" section, which shows all steps and syncs on scroll.

```
section.section.use-cases-section > div.container.with-top-padding
  div.use-cases-wrapper (grid .5fr 1fr → 452.66/905.34 @1440, 399.33/798.67 @1280; ≤1024: 1fr; border-bottom .5px #989e7b)
    aside.use-cases-sidebar (relative; padding 300px 0; hidden ≤1024)
      ul.use-cases-sidebar-list (sticky top 300; padding-left 30; flex col gap 16)      y2178
        li.animation-item[.sidebar-item-current] > a href="#streamline-investor-onboarding" (flex, gap 14, center)
          p.text-reg-mono.text-allcaps.light-300 "USE CASE 1"      (12 mono #989e7b, padding-top 2)
          p.text-reg.text-light "Roll up non-lead investors"     (14/21; #989e7b → current #e4eac8; hover #d1dbb9; color .25s ease)
        li > a href="#international-ruvs"  "USE CASE 2" "International RUVs"
    div.use-cases-content (flex col, gap 40; ≤767 overflow hidden)
      div.heading-wrapper.use-cases-header (max-width 60ch = 641.28; padding 80 0 40; ≤1024 padding 0 20; ≤767 0 10)
        h2.heading.animation-text "How it works"
        p.text-reg.text-light-200.animation-text (max-width 45ch = 420.8) "Companies raise from $50k to $100M+ through an RUV to enable a number of different use cases. Here are a few common ones."
      aside.use-cases-sidebar-mobile (display none; ≤1024 block)
        ul.use-cases-sidebar-list (relative; flex; gap 2rem; padding 0 10 12 20; overflow-x auto, no scrollbar)
          li.animation-item[.sidebar-item-current] > a (≤767 text-wrap nowrap; stacked: mono label above title)
          div.active-underline (absolute left 0 bottom 2px; height .5px; bg #e4eac8; radius 1; z 2; initial width 32)
      div.use-cases-steps (flex col, gap 140; border-top HL; border-left HL (≤767 none))
        div#<id>.use-cases-step (style display:block|none, opacity 1|0)
          div.use-case-content
            ActionCard (see below; border none inside use cases)
            div.split-card.no-bottom-border (grid 1fr .5fr, border-top HL)
              div.split-card-left-wrapper (padding 40 30; border-right HL) > HowItWorks
              div.split-card-right-wrapper (padding 40 30; flex col space-between) > stat component
```

**Tab logic**:
- State is the id of the current use case.
- On mount, a valid `location.hash` selects that use case. A `hashchange` listener is also registered.
- Clicking a tab calls `preventDefault` and then `history.pushState(null, '', '#id')`. It then runs a GSAP timeline:

  ```js
  gsap.timeline()
    .to(oldStep, {opacity: 0, y: -20, duration: 0.3, onComplete: () => setCurrent(id)})
    .fromTo(newStep, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.3});
  ```

  GSAP's default ease (`power1.out`) applies.
- The mobile underline:
  - It tweens to the active li: `gsap.to(underline, {x: li.offsetLeft, width: li.offsetWidth, duration: .12, ease: 'power1.out'})`.
  - After the first render the active li is also `scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'})`.
  - On resize it is set directly with `translateX(offsetLeft) width`.
  - Measured at 390 on tab 2: `translate(222px,0); width:121px`.

**ActionCard inside use cases**:
- The card is the homepage ActionCard. Here `name` is "" (so the mono label row is 2px tall) and there is no action list.
- Columns are 602.9 / 301.4 at 1440 and 531.8 / 265.9 at 1280.
- The image column has padding 30 30 0, `align-items: flex-end`, and a right border.
- The image is `img.action-card-content-ilu.animation-item`, 541.9 wide at 1440 (full column minus padding; no 440 cap here).
- The text column has padding 30. The header has gap 16. The title is `p.text-book.book.text-light-200` (18/18, 500, ls -.36, #d1dbb9) and the description is `p.text-reg.text-light-200`.
- `.action-card-content` has margin-top 100 and holds the LinkWithArrow "LEARN MORE".
- ≤767: the card is flex column-reverse (text first, then the image). The content wrapper has padding 24 10 20; the content has margin-top 24 and padding-bottom 20. The image wrapper has min-height 200 and the img is `max-width:none`.

**HowItWorks** (split-card left):

```
div.how-it-works-wrapper > div.how-it-works-content (flex col, gap 48)
  div.how-it-works-header > div.text-reg-mono.text-allcaps.text-light-300.animation-text "How it works"
  div.how-it-works-steps (flex col, gap 48)
    div.how-it-works-step.animation-text (flex col, gap 16)
      div.how-it-works-step-title (flex, center, gap 20)
        p.text-reg-mono.text-light-100  "TODAY" | "DAY 03" | "DAY 30" | "DAY 30+"   (12/12 mono, #e4eac8, NOT uppercase-transformed; literal caps)
        h2.text-book  <title>   (18/18, 500, ls -.36, #e4eac8)
      div.how-it-works-step-content (flex)
        div.vertical-line  (0.5px wide, min-width .5; margin 0 20 0 7; background linear-gradient(180deg, #989e7b, rgba(152,158,123,0)); stretches to items height)
        div.how-it-works-step-items (flex col, gap 16, max-width 478)
          p.text-reg.text-light-200  (14/21) ×n
```

- The label is `"DAY " + day_number` when set, otherwise "TODAY".
- In a step string, `[private investment page]{modal:InvestorExpTestimonial}` becomes a `<span>` styled `color:inherit;text-decoration:underline;cursor:pointer;transition:opacity .2s ease` (opacity .8 on mouseover). Clicking it opens the **capability modal** (see 1.4) with `investorexp.50e999a3.png`.
- `<a href="/consolidate">here</a>` renders as a real `<a>` with `color:inherit;text-decoration:underline`.

**Stat component** (split-card right; `split-card-right-component`: flex col, gap 48, space-between):
- The logo row is 28 tall (`split-card-right-component-logo`, margin-right auto, height 28; svg width auto).
- `div.split-card-right-component-content` (flex col, gap 8) holds:
  - `p.text-number`: PpNeueCorp 36/36, 500, ls -.72, #e4eac8
  - `h2.text-reg.text-light-100`: 14/21

**Content of the /ruv use cases**:

1. `#streamline-investor-onboarding`, tab "Roll up non-lead investors"
   - ActionCard:
     - Title "Roll up non-lead investors".
     - Description "While lead investors typically invest directly, other investors like friends, family, angels, customers, and follow-on VCs are well-suited for investing through an RUV."
     - Image `in-action-5.7c07bb5c.png` (existing), rendered 541.9x448.7.
     - Link "LEARN MORE" → /contact-us.
     - Card 904.3x478.7 at y2172.
   - HowItWorks steps:
     - TODAY "Start raising in minutes":
       - "Create an account, set your deal terms, and build your private investment page."
       - "Rollups handles entity formation and investor paperwork prep."
       - "Create custom, private, and trackable invite links for investors."
       - "Invite investors to commit and sign documents in your [private investment page]."
     - DAY 03 "Round traction, without the distraction":
       - "Avoid delays and headaches from investor accreditation, KYC, and banking, all streamlined by AngelList."
       - "Watch investor visits, commitments, and wires arrive in the real-time dashboard."
       - "Get daily digest updates on fundraising progress in your email inbox."
     - DAY 30 "Close the RUV in a few clicks":
       - "Close the RUV in just a few clicks in the app."
       - "Provide your financing agreement(s) (SAFE, convertible note, equity round docs, token warrants, etc.) for Rollups to review and sign."
       - "Receive the sum of investor capital in your bank account from one simple wire transfer that Rollups handles for you."
       - "Pay Rollups fee when you close the RUV."
     - DAY 30+ "Clean up the rest of your cap table":
       - "Add just one row (the RUV entity) to your cap table, avoiding the mess of direct stakeholders on your cap table."
       - "Rollups handles all related filings (Form D, etc), investor K-1s and post-close corporate actions."
       - "Wish you could consolidate legacy investors already on your cap table? Now you can. Rollups also helps consolidate existing stakeholders on your cap table. Learn more [here](/consolidate)."
   - Right column:
     - Logo `secureframe-logo.svg` (`.split-card-right-component-logo.animation-item`), 197.6x28.
     - Number "35%".
     - Text "Fewer stakeholders on the cap table after rolling up over 50 investors with an RUV."
     - LinkWithArrow "Read case study" → `/blog/case-study-secureframe-maximize-captable-value-ruv`. The label is uppercase via CSS; the source text is "Read case study".
   - Split card is 904.3x1087 at y2650.7. Steps are at y2753.7, 3009.7, 3228.7 and 3484.7 (heights 208, 171, 208, 213).
2. `#international-ruvs`, tab "International RUVs"
   - ActionCard:
     - Title "Raise international RUVs".
     - Description "Non-US companies can easily raise from investors, regardless of their location (subject to local restrictions)."
     - Image `2.a74381c0.png` at >767 (rendered 541.9x412) or `2-mobile.4f01ba0f.png` at ≤767.
     - LinkWithArrow → /ruv.
     - Card 904.3x442.
   - HowItWorks steps:
     - TODAY "Start raising globally from investors in minutes":
       - "Set deal terms and build your [private investment page]."
       - "Rollups handles international RUV entity setup and prepares investor paperwork and banking for cross-border investment."
       - "Create secure, trackable invite links with customizable investment amounts in USD or stablecoin USDC."
       - "Invite investors to commit and sign documents."
     - DAY 03 "Global round traction, without the headaches":
       - "Provide investors with a modern investment experience powered by AngelList."
       - "Automate cross-border legal processes—accreditation, KYC/AML, and compliance checks."
       - "Watch signatures and wire transfers arrive in real-time through the RUV dashboard and email."
     - DAY 30 "Close with ease":
       - "Finalize the international RUV with just a few clicks."
       - "Upload your financing documents (SAFE, convertible note, equity docs) for Rollups to review and execute."
       - "Receive capital in your company account in one wire transfer from Rollups, and pay RUV fees only when you close the RUV."
     - DAY 30+ "Wish you'd used RUVs before":
       - "Add just one row (the RUV entity) to your cap table, avoiding the mess of direct stakeholders on your cap table."
       - "Rollups handles ongoing related compliance including filings, tax docs, and corporate actions."
       - "Wish you could consolidate legacy investors already on your cap table? Now you can. Rollups also helps consolidate existing stakeholders on your cap table —learn more [here](/consolidate)."
   - Right column:
     - Logo row is flex, center, gap 16: `iterate-logo.svg` at 28x28, then `span.text-book` "iterate.com".
     - Number "$1M".
     - Text "Iterate, a UK-based company, raised over $1M through an RUV, and was able to include many international investors. <br/>(local restrictions apply)" (5 lines).
     - This column has no animation classes.
   - Split card is 904.3x1071.

**Geometry**:
- 1440: the wrapper is at y1878, the heading at y1958 and the steps at y2171. The sidebar list is sticky at y2178 (453x58).
- 1280: the grid is 399.33/798.67. The card is 797.7x419.8 and the split card 797.7x1108.
- 390:
  - Single column. The header has padding 0 10 and a 30px h2. The tab bar is at y3483 (356x47).
  - The card is 356x522: content 24 10 20 on top, image 336x278 below.
  - The split card is a single column; the left part has padding 20 10 40 and a bottom HL, the right part padding 20 10.

### 1.4 Capabilities: content grid + capability modal (NEW, reused on /safe and /consolidate)

```
section.section > div.container.with-top-padding.with-bottom-border (padding 100 0 40; border-bottom HL)
  div.heading-wrapper.with-padding > h2.heading.animation-text "Capabilities"
  div.content-grid-wrapper.with-y-padding (flex col, align/justify flex-end; padding 100 0 100 25% → 339.5px @1440)
    div.content-grid (grid 2×1fr → 509.25 @1440, 449.25 @1280; ≤767 1 col)
      div.content-grid-item[.capability-card][.with-top-padding|.no-bottom-border]   (flex col, gap 14, border HL except right; padding 60 30 (with-top-padding) ; first two items no top border)
        [div.capability-card-content[.clickable]]   (only for CapabilityCard items; relative, flex col, space-between)
          div.text-reg-mono.text-allcaps.light-300.animation-text  "01*"
          h2.text-reg.text-light-100.text-500.animation-text <title>     (14/21, 500, #e4eac8)
          p.text-reg.text-light-200.animation-text <desc>               (max-width 42ch = 392.8)
```
- The last row uses `.no-bottom-border`: padding 60 30 0 and no bottom border. For the 3rd and 4th items, padding-bottom is 40.
- **Clickable cards** (`modalContent` present, marked with "*" in the number):
  - `cursor:pointer; transition: opacity .2s ease`.
  - Hover: opacity .8, and the title and description are underlined.
  - The "*" is literal text.
  - Inside the clickable wrapper the h2 top is +28 and not +14 (space-between inside a taller box). Just use the same markup.
- **Modal** (rendered inside the card, portal-less):

  ```
  div.capability-card-modal-overlay  (position fixed inset 0; bg transparent; flex center; z 1000; animation fadeIn .3s ease-out)
    div.capability-card-modal-wrapper (relative)
      div.capability-card-modal  (900x700, max 90vw/90vh; border HL; radius 12; backdrop-filter blur(10px); animation modalSlideIn .3s ease-out, modalBackgroundFade .4s ease-out .2s forwards)
        button.capability-card-modal-close "×"  (absolute top 20 right 20; 32x32 circle; bg rgba(255,255,255,.1); color rgba(255,255,255,.8); hover bg .2 / #fff; all .2s)
        div.capability-card-modal-content (100%; padding 50 30 30; flex center; overflow auto; children fade via contentFadeIn .2s ease-out .15s forwards)
          div.product-image-testimonial > img.testimonial-product-image (max 100%, object-fit contain, radius 8)
  ```

  - modalBackgroundFade animates the modal background from `rgba(45,86,54,.95)` to transparent, so the modal ends as a blurred glass panel over the page.
  - ≤767 uses the `.capability-card-mobile-modal-*` variant: max-width 450, height 550 (max 80vh), wrapper margin 20, close button 28x28 at 16/16, content padding 45 20 20.
  - Close triggers: × button, mousedown outside the modal, or Escape. While open, `document.body.style.overflow = 'hidden'`.
  - The "private investment page" span modal (1.3) toggles `body.disable-scroll` instead. That is the homepage class, which also fades sections to opacity 0 over .12s.
  - Measured at 1440: the modal is 902x702 centered in the viewport at x269. investorexp renders 840x370.6 and sendlinks 620x620.
  - Caveat: in the "private investment page" case the overlay sits inside a GSAP-transformed `.use-cases-step`, so on the original it is positioned relative to that step instead of the viewport. Build it with the overlay fixed to the viewport, as intended.

**/ruv capability items** (10). Number → title → description:
- "01*" "Build your custom, private investment page" → "Set up your own secure deal page to share information with investors, and track analytics." Modal: investorexp.png ("Trusted investor experience").
- "02" "Investor accreditation, KYC/AML, and banking." → "Give your investors a world-class investment experience, powered by AngelList."
- "03" "Company-friendly pricing" → "No upfront fees, no hidden costs. Pay when you close the RUV."
- "04" "Built-in tax and compliance" → "Form D, Blue Sky filing fees, and automated K-1s for investors."
- "05*" "Create custom investor invite links" → "Set unique investment minimums and maximums (or exact amounts) for each investor invite link." Modal: sendlinks.png (alt "Create custom investor invite links").
- "06" "Trusted investor experience" → "With investor accounts powered by AngelList ($171B in assets on platform), investors can close in minutes, not weeks, by leveraging their stored KYC/AML and bank info."
- "07" "Secure banking infrastructure" → "Raise on the same AngelList banking infrastructure that moved $80B in 2024 and has deployed more cumulative capital than some of the largest VC funds combined."
- "08" "Experienced deal team, over 20 years of combined experience" → "Close quickly, and with confidence. Built by private market experts who've supported thousands of funding rounds and deals — we've seen (and solved) nearly every challenge companies face when raising capital on tight timelines."
- "09" "Comprehensive post-close action support" → "Getting acquired? Shutting down? Making some changes? No problem. We've got you covered. Just email us."
- "10" "International companies and investors" → "Subject to local laws and regulations, we support companies and investors in international jurisdictions."

Only items 01 and 05 are `capability-card`; the others are plain `content-grid-item`. Rows at 1440: y4152.7 (226), 4378.7 (227), 4605.7 (248), 4853.7 (269), 5122.7 (166).

**390**:
- The grid is 1 column (356). The wrapper has padding 0 10.
- Items have padding 24 10 and no borders, except that the last item has a bottom HL. Gap 14.
- The section is 1895 tall.

### 1.5 Companies: identical to the homepage
Heading: "Top law firms & companies trust us to consolidate stakeholders" (same as the homepage).

### 1.6 Pricing: `section.pricing-section` (NEW, reused on /safe and /consolidate)

```
section.section.pricing-section
  div#pricing  (0-height anchor)
  div.container.with-top-padding.with-bottom-border
    div.heading-wrapper.with-padding > h2.heading.animation-text "Roll Up Vehicle Pricing"
    div.content-grid-wrapper.with-y-padding > div.content-grid (2 cols)
      div.content-grid-item.price-item.no-top-border          (padding 30; flex col space-between; gap 14; border-bottom + left HL)
        div.price-header (flex col, gap 8)
          h2.text-book.text-light-100.animation-text.book  "One RUV"          (18/18 500)
          p.text-reg.text-light-200.animation-text  "Get started for free, only pay when you wrap up the RUV."
        div.price-label-wrapper.animation-text (flex, align flex-end, gap 8)
          p.price-label "Starting at $8,000"        (PpNeueCorp 36/36, 500, ls -.72, #e4eac8)
          p.price-label-unit "+ filing fees"         (SuisseIntl 18/normal, 450, ls -.36)
        Button primary animated "Get Started" → /contact-us
      div.content-grid-item.price-item.no-top-border
        div.features-list-wrapper (flex col, gap 24)
          div.text-reg-mono.text-allcaps.light-300.animation-text "The base price of $8,000 includes"
          ul.features-list (flex col, gap 12)
            li.features-list-item.animation-text (flex, gap 4, align flex-start) > svg feature-check 16x16 (#989e7b) + p.text-reg.text-light-200 (max 36ch)
      div.content-grid-item.price-item.no-bottom-border.no-top-border (padding 60 30 40)
        price-header: "Add-ons" / "For companies with unique structures, needs, or complex fundraising scenarios."
        Button secondary animated "Contact Us" → mailto:team@rollups.com
      div.content-grid-item.price-item.no-bottom-border.no-top-border
        features-list-wrapper: mono "Add-ons" + list
```
- /ruv "includes" list:
  - "RUV for US C-Corporations"
  - "Investment doc generation and digital signing"
  - "Tax support with K-1s for investors"
  - "International investor support"
  - "Future actions and distributions"
- /ruv add-ons list:
  - "RUVs for non-US companies"
  - "RUVs for LLCs"
  - "Side letters and token warrants"
  - "White-glove, dedicated support from a deal team expert via Slack, WhatsApp, and email"
- Geometry at 1440: row 1 is at y6652 (252 tall), row 2 at y6904 (279). "Get Started" is 127.2x38 at y6835. "Contact Us" is 120x38.
- ≤991: price-item padding 0 20 20.
- ≤767:
  - The container has no top padding; the heading-wrapper has padding 100 0 0.
  - The grid wrapper has padding-top 80 and the grid gap is 48.
  - Items have padding 24 10 and gap 22. Item 3 gets a top HL and padding-top 48; the last item has padding-bottom 58.
  - The section is 1266 at 390.

### 1.7 FAQ: identical component
- Heading "Everything You Need to Know".
- These 9 items are shared by /ruv, /ruv/calculator and /how-to-raise-capital. Item 0 is open.
- Answers are recorded verbatim when short; otherwise as a word count with any links.
  1. "How are Roll Up Vehicles® (RUVs) different from Special Purpose Vehicles (SPVs)?": 1 paragraph, 82 words.
  2. "Do investors in RUVs need to meet certain criteria?": 49 words.
  3. "Are investors in RUVs eligible for QSBS benefits?": "Generally, yes, QSBS eligibility flows through to investors when they invest into your RUV. Contact us for more details."
  4. "How do investors in RUVs make their investment?": 36 words.
  5. "Which companies are eligible to use RUVs?": "RUV customers are private companies that have raised (or are currently raising) venture capital. We support companies incorporated in other countries, subject to certain restrictions."
  6. "How much does an RUV cost?": 49 words, ending "To confirm pricing for your RUV, <a href="https://app.rollups.com/get-started">submit your RUV</a> or <a href="/contact-us">contact us</a>." The links are underlined and inherit color.
  7. "Are there other costs associated with RUVs?": 65 words.
  8. "Can I publicly share or market my RUV?": "By default, regulatory requirements prevent you from publicly marketing your RUV. Contact us to discuss other options that may be available."
  9. "How private are RUVs?": 35 words.
- At 1440 the open item is 203 tall. At 390 the section is 1547.

---

## 2. /ruv/calculator

### 2.1 Calculator hero: `section.ruv-calculator-hero-section` (NEW)
```
section.section.ruv-calculator-hero-section > div.container
  div.ruv-calculator-hero (flex col, center, gap 24, padding 104 40 88, text-align center)   1358x481.5
    p.ruv-calculator-hero-eyebrow "Calculator"            (SuisseIntl 14/21, #989e7b) y183
    h1.ruv-calculator-hero-title "Roll Up Vehicle Cost Comparison"   (PpNeueCorp 72px / .95 → 68.4px, 500, ls normal, #e4eac8, max-width 840; 2 lines 840x136.8) y228
    p.ruv-calculator-hero-description (18px/1.55 → 27.9px, #d1dbb9, max-width 720; 3 lines) y388.8
      "In addition to keeping a clean cap table, <a href="/ruv">Roll Up Vehicles</a> can present significant cost savings over the lifetime of the company. This calculator presents an estimate of savings from using a Roll Up Vehicle over direct investments."
      (link: #e4eac8, underline, text-underline-offset 4px)
```
- No animation classes; the section only gets the page fade-in.
- ≤991: padding 80 24 64, title 54px.
- ≤767: left-aligned, padding 56 16 48, title 36px (2 lines, 324x68.4), description 16px. The section is 390 tall at 390.

### 2.2 Cost comparison calculator (NEW, reused on /how-to-raise-capital)
```
section.section
  div#calculator (anchor)
  div.container > div.cost-comparision-calculator (relative; padding 100 40; border-top + border-bottom HL)   1358x1528
    div.cost-comparision-calculator-content (flex col, gap 40)
      div.cost-comparision-calculator-header (flex col, gap 21, max-width 550)
        h2.cost-comparision-calculator-title "Cost comparison"     (PpNeueCorp 54/54, 500, ls -1.08)
        p.cost-comparision-calculator-description "This model calculates the lifetime cost difference between a Roll Up Vehicle and direct investments. You can edit key assumptions & variables below"  (14/21 #d1dbb9)
      div.cost-comparision-calculator-inputs (flex, gap 16) — 4 × input-group (flex 1 0; flex col gap 8)      each 307.5 wide @1440
        label.cost-comparision-calculator-label (14/21 #d1dbb9) for=<id>
        input.cost-comparision-calculator-input type=text inputMode=numeric|decimal  (padding 12 16; 47 tall; border .5px rgba(228,234,200,.24); radius 4; bg transparent; 14/21 color rgba(209,219,185,.64); focus: no outline, border #989e7b, color #e4eac8; border-color .2s)
      div.cost-comparision-calculator-advanced (flex col, gap 16)
        div.cost-comparision-calculator-advanced-header (flex space-between, gap 16)
          div.…-advanced-title-wrapper (flex col gap 16, max 550)
            h3.cost-comparision-calculator-advanced-title "Advanced settings"   (PpNeueCorp 32/32, 500, ls -.64)
            p.…-advanced-description "Adjust the parameters for this calculation"  (14/21 #d1dbb9)
          button.cost-comparision-calculator-toggle[.cost-comparision-calculator-toggle-active] aria-label="Toggle advanced settings"
             (51x31, radius 16, bg rgba(84,137,93,.24), no border, padding 0)
            div.cost-comparision-calculator-toggle-knob  (27x27 at top/left 2, bg #54895d, radius 16, shadow 0 3px 7px rgba(0,0,0,.12); active → translateX(20px); transform .2s ease)
        [when on] div.cost-comparision-calculator-advanced-content (flex col gap 8)
          div.cost-comparision-calculator-advanced-grid (grid 3 cols, gap 16, margin-top 16; ≤991 2 cols; ≤767 1)  — 5 input-groups
      div.cost-comparision-calculator-scenario-row.cost-comparision-calculator-scenario-row-primary (flex, gap 16, align flex-start; padding-top 24; border-top .5px rgba(228,234,200,.24))
        div.cost-comparision-calculator-scenario-group (flex 1; flex col gap 8)
          label.cost-comparision-calculator-label "Select scenario"
          div.cost-comparision-calculator-dropdown-wrapper (relative)
            button.cost-comparision-calculator-dropdown-trigger[.…-trigger-open] aria-expanded  (flex, gap 10, padding 12 16, 47 tall, same border as inputs; hover/focus border #989e7b)
              span.cost-comparision-calculator-dropdown-value  <scenario label>   (14/21 rgba(209,219,185,.64), flex 1, left)
              div.cost-comparision-calculator-dropdown-arrow (20x20, same color; rotate(180deg) when open; transform .2s) > svg calc-dropdown-arrow
            [open] div.cost-comparision-calculator-dropdown-menu (absolute top calc(100%+4px) left/right 0; bg rgba(41,93,50,.95); blur(10px); border HL; radius 4; shadow 0 4px 24px rgba(0,0,0,.12); z 100; flex col)
              button.cost-comparision-calculator-dropdown-item[.…-item-active]  (padding 12 16, 14/21 #e4eac8, left; hover bg rgba(255,255,255,.1); active bg rgba(255,255,255,.15); bg .2s)  45 tall
          p.cost-comparision-calculator-scenario-description  (12/18, rgba(209,219,185,.64))
        div.cost-comparision-calculator-actions (flex, gap 16, padding-top 29, margin-top 5)
          Button primary animated "Calculate" (button.cost-comparision-calculator-calculate-button)  112.8x38
          Button secondary animated "Reset" (button.cost-comparision-calculator-reset-button)          84x38
      div.cost-comparision-calculator-results role=region aria-live=polite  (padding 32; border .5px rgba(228,234,200,.24); radius 12; bg rgba(41,93,50,.32); shadow 0 20px 40px rgba(0,0,0,.16))   1278x714 @1440
        div.cost-comparision-calculator-results-table-header (grid minmax(0,1fr) minmax(320px,1fr) → 598/598; gap 16; height 80; border-bottom .5px rgba(228,234,200,.24))
          div (empty)
          div.…-table-header-values (grid 3 cols gap 12; SuisseIntl 12px uppercase ls .48 rgba(209,219,185,.72), centered)
            span "Direct invest" | span "RUV" | span "Savings" (last: bg rgba(255,255,255,.05), radius 8 8 0 0)
        div.cost-comparision-calculator-results-table (flex col)
          div.cost-comparision-calculator-results-row[.…-row-highlight]  (grid same as header; height 80; border-bottom .5px rgba(228,234,200,.12); highlight row border rgba(228,234,200,.32))
            div.…-results-row-info (flex col gap 4)
              p.…-results-row-title   (PpNeueCorp 18/21.6, 500, #e4eac8)
              p.…-results-row-helper  (13/18.2, rgba(209,219,185,.64))
            div.…-results-values (grid 3 cols gap 12; height 100%)
              div.…-results-value ×3 (flex col center, gap 4, padding 0 8; 3rd also .…-results-value-savings bg rgba(255,255,255,.05))
                span.…-results-value-label  "Direct invest"|"RUV"|"Savings"   (hidden ≥992)
                span.…-results-value-amount  (PpNeueCorp 18/27, 500; highlight row 32/48, ls -.64)
      p#calculator-terms.cost-comparision-calculator-terms  (12/18, rgba(209,219,185,.64), max 720, margin-top -16, scroll-margin-top 96)
        <sup aria-hidden>†</sup>(10px) " Based on Rollups pricing compared with estimated third-party setup and administration costs. Actual costs vary by company, investor count, jurisdiction, and transaction complexity."
```

**Inputs** (the state holds strings; ids are `ruv-calculator-<key>`):

| Label | id | Default | inputMode |
|---|---|---|---|
| Number of investors | ruv-calculator-number-of-investors | "58" | numeric |
| Legal hourly rate | ruv-calculator-legal-hourly-rate | "550" | decimal |
| Years before exit | ruv-calculator-years-before-exit | "8" | numeric |
| Additional rounds | ruv-calculator-additional-rounds | "5" | numeric |
| *(advanced)* Hours per investor for reach-out & correspondence | ruv-calculator-signatureHours | "0.2" | decimal |
| *(advanced)* Hours per investor to draft documents & collect signatures | ruv-calculator-documentsHours | "0.5" | decimal |
| *(advanced)* Cost per year for cap table management per shareholder | ruv-calculator-capTableCost | "100" | decimal |
| *(advanced)* Hours per cap table entry for proformas | ruv-calculator-capTableHours | "0.1" | decimal |
| *(advanced)* Future shareholder consents | ruv-calculator-futureConsents | "4" | decimal |

Scenarios (dropdown):
- `seed`, label "Seed round (SAFE/Notes)", description "Typical SAFE or note round assumptions with higher legal touch points." Overrides: legalHourlyRate "550", yearsBeforeExit "8", additionalRounds "5".
- `equity`, label "Equity round", description "Priced equity scenario with fewer rounds and a higher legal rate." Overrides: legalHourlyRate "750", yearsBeforeExit "6", additionalRounds "4".
- Choosing an item sets the scenario, merges its overrides into the inputs, and closes the menu. A `mousedown` outside the wrapper also closes it.

**Exact formulas** (verbatim logic from the chunk). Results recompute live on every keystroke:

```js
const num = s => { const t = parseFloat(s.replace(/[^\d.-]/g, '')); return Number.isFinite(t) ? t : 0 };
const fmt = v => new Intl.NumberFormat('en-US', {style:'currency', currency:'USD', maximumFractionDigits:0}).format(v);
// t=investors a=legalRate s=exitYears r=additionalRounds o=signatureHours n=documentsHours l=capTableCost i=capTableHours c=futureConsents
const isSeed = scenario === 'seed' ? 1 : 0;
initial    = [t*a*n,      a*n];        // [direct, ruv]
lifetime   = [t*s*l,      s*l];
additional = [t*a*r*i,    a*r*i];
legal      = [t*a*o*c,    a*o*c];      // "Shareholder consent costs"
instrument = [t*a*o*isSeed, a*o*isSeed];
costs      = [0, 8000];                // "RUV Admin costs"
total      = [sum of index 0, sum of index 1];
savings(row) = row[0] - row[1];        // total savings = total[0]-total[1]
```

Rows (in order): each shows direct, RUV and savings, formatted with `fmt`, so negatives render as "-$8,000".

| # | Title | Helper |
|---|---|---|
| 0 (`.row-highlight`) | "Total costs" | helper = the current scenario label |
| 1 | "Initial closing docs" | "Drafting docs & reconciling signatures per investor." |
| 2 | "Lifetime cap table costs" | "Annual shareholder management fees for each investor until exit." |
| 3 | "Additional rounds, legal & admin costs" | "Cap table updates across future raises." |
| 4 | "Shareholder consent costs" | "Collecting signatures every time consents are needed (including exits)." |
| 5 | "Instrument conversion" | "SAFE/note conversions." |
| 6 | "RUV Admin costs" | "Standard RUVs for US C-Corps start at $8k (due at closing)." |

Measured default output (seed): Total $110,200 / $9,900 / $100,300; Initial $15,950 / $275 / $15,675; Lifetime $46,400 / $800 / $45,600; Additional $15,950 / $275 / $15,675; Consent $25,520 / $440 / $25,080; Instrument $6,380 / $110 / $6,270; Admin $0 / $8,000 / -$8,000.

Measured output after switching to "Equity round": Total $108,750 / $9,875 / $98,875; Initial $21,750 / $375 / $21,375; Lifetime $34,800 / $600 / $34,200; Additional $17,400 / $300 / $17,100; Consent $34,800 / $600 / $34,200; Instrument $0 / $0 / $0; Admin $0 / $8,000 / -$8,000.

**Buttons**:
- "Calculate" only sets `showResults = true`. Results are already shown (initial state `true`), so it is effectively a no-op.
- "Reset" restores all defaults, scenario `seed`, results shown, dropdown closed, and advanced settings off.
- The advanced toggle only shows or hides the 5 extra inputs. Their values persist while hidden.

**Geometry @1440**:

| Element | y | Size / notes |
|---|---|---|
| Title | 661.5 | 550x54 |
| Description | 736.5 | 2 lines |
| Inputs | 818.5 | 4 × 307.5 wide; input boxes at 847.5, 47 tall |
| Advanced header | 934.5 | toggle at x1308 |
| Scenario row (border-top) | 1043.5 | label at 1068.5; dropdown 1049.2x47 at y1097.5; description at 1152.5; buttons at y1102.5 |
| Results panel | 1210.5 | table header 80, 7 rows × 81 |
| Terms | 1948.5 | |

With advanced on:
- The advanced block grows to 269 tall.
- The grid is 3 × 415.3 at y1035.5, with 2 rows (y1035.5 and 1127.5).
- Everything below shifts down 200.

**1280**: the inputs row is 1118 wide and results rows use grid 518/518.

**Responsive**:
- ≤991:
  - The calculator padding is 32 24 and the title 42px.
  - Results header values are hidden and each row becomes a single column (`height: auto; padding: 20px 0`).
  - The values grid is 1 column with a top border `.5px rgba(228,234,200,.12)` and padding-top 16; value labels are visible.
- ≤767:
  - Padding 24 16. Title 32px. Advanced title 24px.
  - Inputs stack in a column and **the 4th input (Additional rounds) is hidden**.
  - The advanced header becomes a column (gap 12).
  - The scenario row stacks. Actions become a full-width column with padding-top 0.
  - The results panel has padding 24 16. Values are left-aligned with no savings background. Amounts are 16px (highlight 24px).
  - Terms margin-top -8.
  - At 390: the inputs block is 324x260 and each row is 290x309.8. The section is 3152 tall.

### 2.3 RUV facts CTA: `section.ruv-comparision-illustrated-section` > `.ruv-facts-cta` (NEW, reused on /how-to-raise-capital)
```
div.container > div.ruv-facts-cta (flex, align flex-end, justify center; padding 80 40)   1358x560
  div.ruv-facts-cta-container (flex col, gap 48, center, max 700)
    div.ruv-facts-cta-content (flex col gap 48 center)
      div.ruv-facts-cta-header (flex col gap 32)
        p.ruv-facts-cta-heading "RUVs power some of the fastest growing startups."   (PpNeueCorp 32/32, ls -.64, 400 weight (no weight set), centered, 700 wide)
        div.ruv-facts-cta-stats (flex, gap 24, height 130)
          div.ruv-facts-cta-stat-card ×2 (flex 1 → 338 wide; bg rgba(84,137,93,.16); flex col center gap 8; padding 16 24)
            p.ruv-facts-cta-stat-value "$1.5B+" | "3,000+"   (SuisseIntl 40/60, #e4eac8)
            p.ruv-facts-cta-stat-label "Raised through RUVs" | "Startups trust RUVs"   (AbcFavoritMono 12, uppercase, #989e7b)
      div.ruv-facts-cta-companies (relative, height 72)
        p.ruv-facts-cta-companies-label "Trusted by founders of"  (absolute top 6, left 50%, translate(-50%,-50%); mono 12 uppercase #989e7b; line-height 0; width 159)
        div.ruv-facts-cta-companies-list (absolute top 12, flex gap 8 center)
          div.ruv-facts-cta-company-logo ×5 (60 tall, padding 0 8) > img.ruv-facts-cta-company-logo-img (height 100%, max-width 100, contain, filter: brightness(0) saturate(100%) invert(92%) sepia(8%) saturate(400%) hue-rotate(40deg) brightness(98%) contrast(88%))
    Button primary animated .ruv-facts-cta-button-wrapper "Launch your ruv" → https://app.rollups.com/get-started   (156x38; wrapper ::after inset -.5px, inset box-shadow 0 0 0 1px #2a5d33, radius 5)
```
- Logos, in order, with alt text: Lovable (`loveable-logo.6b32fb82.svg`), Basis, Wispr, Verse, Function. All five files already exist in `public/assets`.
- The button label source is "Launch your ruv"; CSS uppercases it.
- No reveal classes.
- ≤767:
  - Padding 48 16. Gaps become 32/24/16. The heading is 24px.
  - Stats stack in a column (cards min-height 100, value 32px).
  - The companies label and list become static, and only the first 3 logos show.
  - The button is full width.

### 2.4 Stories grid: `section.stories-grid.how-to-raise-testimonials` (NEW, reused on /how-to-raise-capital)
```
section.section.stories-grid.how-to-raise-testimonials
  div.container (border-top + border-bottom HL in addition to sides)
    div.stories (grid 4×1fr → 339.5 @1440 / 299.5 @1280; 1 row; border-top HL; ≤1024 2 cols)
      div.story-card.grid-item-border.sm ×4 (padding 32; min-height 360; border .5 HL except right; margin -.5 0 0 -.5 (bottom/left overlap))  340x382
        div.content (flex col, justify flex-end, gap 24, relative z1)
          div.logo (max-height 32) > svg (height 100%, width auto)
          h4.quote.animation-text (margin-top auto; padding-top 24; SuisseIntl 20px/1.2 (sm), #e4eac8)  "“<quote>”"
          p.author.animation-text (14/21 #d1dbb9)
    div.ruv-testimonials-grid-footer (flex, justify flex-end, padding 24 32, border-top HL)   87 tall
      Button secondary animated "Read more customer stories" → /customers  (235.2x38)
```

| # | Logo | Quote | Author |
|---|---|---|---|
| 1 | story-logo-autograph.svg (153x32) | "I recommend RUVs to every founder. It's one of the most important developments in startup financing in the last decade. I think we'll look back in 10 years and realize that it's had as big an impact as SAFEs." | "Hari Raghavan, CEO, Autograph" |
| 2 | story-logo-function.svg (157x32) | "Function Health raised much of its seed and pre-A using an AngelList RUV. I recommend it to every founder." | "Jonathan Swerdlin, Co-founder, Function Health" |
| 3 | story-logo-rollfi.svg (84x32) | "The RUVs we ran saved so much time not only during Rollfi's fundraises but also we when got acquired by Priority." | "Kirubha Perumalsamy, Founder, Rollfi" |
| 4 | story-logo-stellate.svg (103x32) | "We used an RUV at Stellate with great success. 11/10 would recommend to all founders raising from individual angels" | "Max Stoiber, CEO and Co-Founder, Stellate" |

- Quotes are wrapped in literal `"` characters. The quote heights are 216, 144, 144 and 144; because of `margin-top: auto`, the shorter quotes sit lower.
- ≤1024: 2 columns, card padding 16, min-height 320.
- ≤767: min-height 280. The quote is 14px (sm) and the author 12px; the logo max-height is 24 and the content gap 16. The container padding is 0 and the footer padding 20 16 with a full-width button.
- At 390 the grid is 2×178 (613.8 tall) and the section is 695.

### 2.5 FAQ
Identical to 1.7 (same 9 RUV items, heading "Everything You Need to Know").

---

## 3. /safe

### 3.1 Hero + flip card: `section.testimonials` with `.testimonials-unified-container` (NEW)
```
section.section.testimonials
  div.container.testimonials-unified-container (padding-top 20, padding-bottom 0, border-bottom HL; ≤991 padding-top 0)
    div (style padding-top:40px)
      div.heading-wrapper.centered.with-padding [slot=heading] (max 560, centered; padding 80 30 40)   x410 w620 @1440
        p.text-reg.animation-text.text-light-200 "SAFE FUNDRAISING"     y219
        div.testimonials-heading-wrapper (700 wide) > h2.heading.animation-text "From SAFE to funded in seconds"  (1 line, 700x54) y256
        div.testimonials-heading-wrapper.with-top-padding > p (16/24 #e4eac8) "Generate and sign SAFEs with investors. Receive funds via secure wire or stablecoin transfers."  (1 line) y326
        div > Button primary animated "Start Raising" → https://app.rollups.com/get-started (external)  141.6x38 at y366
        div.text-reg.small.animation-text (flex gap 4, 12/16.8) y420
          span.text-light-300 "Just want to e-sign a SAFE without having to create an account?"
          a.text-link.small href="https://safe.new" target=_blank "Head to SAFE.new"   (plain anchor, no hover-slide box)
    div.demo-wrappertestimonials-image-wrapper.flip-card[.flipped] role=button tabIndex=0 aria-pressed aria-label
      (perspective 2000px; aspect-ratio 16/9; max-width 1200; margin 0 auto; radius 12 12 0 0; overflow hidden; z 200; cursor pointer; user-select none)   1200x675 at x120 y476.8 @1440
      div.flip-card-inner (100% x 100%; transform-style preserve-3d; transition transform .6s ease; .flipped → rotateY(180deg))
        div.flip-card-face.flip-card-front (absolute inset 0; backface hidden; rotateY(0))
          img.testimonials-software-image src=safe-software-demo.png alt="SAFE investor interface" (width 100%, max 1200, radius 12 12 0 0, margin-bottom -6; 1200x561.2)
        div.flip-card-face.flip-card-back (rotateY(180deg))
          img.testimonials-software-image src=safe-software-demo-admin.png alt="SAFE startup dashboard" (1200x561.8)
      div.flip-cta (absolute top 88%, left 30%, width 40% → 506x38 at x480 y1070.8; flex center; bg rgba(41,93,50,.85); border .5px #466346; radius 5; padding 12; AbcFavoritMono 12/12 uppercase #e4eac8; pointer-events none; z 2; hidden ≤767)
        span.flip-cta-text  "Viewing the investor experience" | "Viewing the company dashboard"  (nowrap)
```

**Flip logic**:
- `flipped` starts `false`.
- Until the user interacts, a `setInterval` toggles `flipped` every 10000 ms.
- A click, or Enter/Space, sets `userInteracted = true` (which clears the interval permanently) and toggles `flipped`.
- aria-label: "View startup dashboard" when unflipped, "View investor interface" when flipped.
- The CTA text follows the state: unflipped "Viewing the investor experience", flipped "Viewing the company dashboard".
- The images are 16:9 inside a 16:9 box but their own aspect is about 2.14:1. They sit at the top, and the lower ~110px of the card shows the section background behind the CTA pill.

**390**:
- The heading is left-aligned (max 440). The h2 is 30px on 2 lines; the p wraps to 3 lines (72 tall).
- The hint line wraps and the link drops to its own line.
- The flip card is 336x189 with radius 8 8 0 0. The CTA is hidden.
- The section is 539 tall.

### 3.2 How it works: use-cases section with one use case and no tabs
Same `use-cases-section` markup as 1.3, with these differences:
- Only one use case. Because `list.length === 1`, the sidebar `li` renders an empty `<a>`: the sidebar list is 0 tall, and the mobile tab bar is 12 tall with only the underline.
- Header p: "Used for $2.5B+ of SAFEs to date, here's how it works." (1 line, 349.7 wide).
- `use-case-content` holds **three ActionCards stacked**, separated by `<div style="border-bottom:1px solid var(--colors--light-300);margin-top:-3px">` (904.3x1). There is no split card.
  1. Image `create-round-safe-2.a80fc0c8.png` (541.9x450.4). Title "SAFEs, on your terms". Description "Design your round to meet your needs with flexibile options. Pick from 8 different SAFE templates." (typo "flexibile" is verbatim). Card height 480.4.
  2. Image `sign-safe.7c6f010b.png` (541.9x380.2). Title "Sign SAFEs". Description "Invite investors to e-sign with a simple link. We handle accreditation and help you track when funds are received. Just want to sign a SAFE without creating an account? Type SAFE.new into your browser, no account required." Card height 410.2.
  3. Image `safe-usdc.b53801b7.png` (541.9x380.2). Title "Get funded via bank transfer or stablecoin" (2 lines). Description "Receive capital from investors your way: Bank transfer or even stablecoin (USDC)." Card height 410.2.
- Each card's LinkWithArrow "LEARN MORE" points to `https://help.angelliststack.com/raise/direct/manage-your-raise-round#how-do-i-cr…` (the same help-centre URL for all three).
- At 1440 the cards are at y1504.8, 1983.2 and 2391.4.
- At 1280 the section is 1571; at 390 it is 1756.

### 3.3 Capabilities
Same grid as 1.4. **All six items are CapabilityCards** with `.with-top-padding`; only 04 has a modal (sendlinks.png).
- "01" "Build your custom, private investor deal page" → "Set up your own secure deal page to share information with investors, and track analytics."
- "02" "Free to raise with SAFEs" → "No fees, no hidden costs. Only pay if you want to upgrade to a Roll Up Vehicle."
- "03" "Trusted investor experience" → "With investor accounts powered by AngelList ($171B in assets on platform), investors can close in minutes with a few clicks."
- "04" (clickable, modal sendlinks) "Create custom investor invite links" → "Set unique investment minimums and maximums (or exact amounts) for each investor invite link."
- "05" "Built-in bank and stablecoin infrastructure" → "Receive capital from investors your way: traditional bank transfer or stablecoin (USDC) on Ethereum Mainnet."
- "06" "Many SAFE options." → "Pick from 8 different SAFE templates. Supports custom SAFEs from your law firm too. too." (the doubled "too." is verbatim)

Rows at 1440: y3216.5 (198), 3414.5 (220), 3634.5 (199). There is no `.no-bottom-border` last row, so all six items keep their bottom border.

### 3.4 Companies
Heading "Top law firms & companies trust Rollups". It is followed by a `<br/>` in the source, so it renders on 2 lines (573x108).

### 3.5 Pricing
Same markup as 1.6. Heading "SAFE Fundraising Pricing".
- Item 1:
  - "Unlimited SAFEs" / "Standard SAFEs are free. Only pay if you need a Roll Up Vehicle."
  - price-label "Free" with no unit.
  - Button primary animated "Get Started" → https://app.rollups.com/get-started.
- Item 2:
  - mono "SAFE features include".
  - List: "Free e-signature", "Convenient investor invite links", "Built-in bank connections and stablecoin support", "Board consents".
- Item 3 (no-bottom-border, padding 60 30 40):
  - "Add-ons" / "Custom SAFEs, Convertible Notes, and Roll Up Vehicles".
  - Button secondary animated "Contact Us" → mailto:team@rollups.com.
- **There is no 4th item.** The grid has 3 cells.
- Rows at 1440: y5197 (231), y5428 (199).

### 3.6 FAQ
Heading "SAFE Fundraising FAQ". Item 0 is open by default. The questions keep their typos verbatim.
1. "What is the differenence between SAFE Fundraising and Roll Up Vehicles?": 66 words.
2. "What is the differenence between SAFE.new and creating an account?": "SAFE.new allows you to sign one or two SAFEs in seconds, without creating an account. Creating an account gives you the ability to manage your round more comprehensively and securely."
3. "What stablecoins does Rollups supports for SAFEs and RUVs?": "Right now, we support USDC on Ethereum Mainnet. We will be adding more stablecoins and networks in the future. Contact us to learn more or suggest new functionaliy."
4. "How do I choose the right SAFE terms for my company?": "Create an account to see AngelList's market data. It will give you a real-time sense for round sizes and terms, by stage and industry."
5. "What are the different types of SAFEs available?": "There are 8 different types of SAFEs that offer a combination of terms: valuation caps, discounts, MFN, and pro rata rights."
6. "Can I use my custom SAFE from my law firm?": "Yes, you can use your custom SAFE from your law firm. Creat an account and then configure your custom SAFE template using our template builder."
7. "Does this tool handle accreditation checks?": 60 words.
8. "What does using SAFE Fundraising cost?": 37 words.
9. "What is a SAFE and how does it work?": 53 words, ending "You can learn more about SAFEs <a href="https://www.angellist.com/learn/safe-note" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:underline">here</a>."

The FAQ wrapper is 1050 tall at 1440.

---

## 4. /how-to-raise-capital

### 4.1 Hero: `hero-content raise-hero` without `.ruv-hero`
Homepage hero markup with these differences:
- The left `.hero-block` has `style="max-width:550px"`. At 1440 it is 610 wide including padding, and the banner wraps to 2 lines (550x49).
- No email form and no trusted logos. Instead `div.hero-stats` sits in the left block.
- **h1** `.heading.hero-heading.animation-text` > flex div (space-between, baseline): "How Founders Can Raise Capital with SPVs and RUVs". It is 3 lines, 550x162 at y225.5.
- p (`.hero-content-description` max 47ch) "Learn how founders can raise capital using SPVs and Roll Up Vehicles (RUVs), including costs, control, and cap table impact." It is 2 lines at y403.5.
- `div.stack.animation-item` (margin-top 12) holds a **non-animated** Button primary (`hoverable:false`, padding 12 16, no arrow): "Explore Roll Up Vehicles" → https://app.rollups.com/get-started. It is 206.8x38 at y473.5.
- AI summary block. The prompts reference "How Founders Can Raise Capital with SPVs and RUVs", `https://rollups.com/how-to-raise-capital.md`, `https://rollups.com/how-to-raise-capital`, and `https://help.rollups.com/ruv/overview`.
- **`div.hero-stats`** (flex, gap 24, padding 32 0) at y647, 550x132. It holds 3 × `div.hero-stat-item` (flex col, gap 8, padding 8 12 12, width 100% → 167.3):
  - `p.hero-stat-value`: SuisseIntl 24/24, 450, ls -.36, #e4eac8. Values "$1.5B+", "3,000+", "10x".
  - `p.hero-stat-label`: AbcFavoritMono 12 uppercase #989e7b. Labels "Raised through RUVs" and "Startups trust RUVs".
  - The third label is `a.hero-stat-label.hero-stat-disclosure-link` href="#calculator": "Lower costs w/ RUVs" + `sup.hero-stat-disclosure-mark` "†" (.75em).
    - Underline color rgba(209,219,185,.42), thickness 1, offset 4.
    - Hover and focus-visible: color #e4eac8, underline .9 alpha. Focus-visible adds an outline 1px rgba(209,219,185,.72) with offset 4.
    - nowrap.
  - Hidden ≤767.
- Right block: same Lottie as /ruv (`product-raise.json`, loop, IO 0.5). It does **not** have `.ruv-hero`, so the homepage `.hero-animation` sizing applies (150%/150%, margin-left -25% at 1180–1440). Measured box: 772.5x1050 at x596.5 y-88, margin `0 0 -16px -154.5px`.
- ≤900: `.raise-hero … .hero-animation svg {width:120vw; margin-left:-25vw; margin-bottom:24px}` and the vertical divider has margin-bottom 24.
- At 390 the hero is 716: h1 30px on 3 lines (316x90), then button, AI summary, divider, and the animation (see `recon/pages/how-to-raise-capital-390.png`).

### 4.2 "Three ways founders raise capital": `section.founder-options-overview-section` (NEW)
```
div.container > div.founder-options-overview (grid .5fr 1fr → 452.66/905.34; min-height 500; align stretch; border-bottom HL)
  div.founder-options-overview-intro (flex col, justify center, gap 21, padding 0 30, border-right HL)
    h2.heading.founder-options-overview-title "Three ways founders raise capital"   (54/54, ls -1.08; 3 lines 391.7x162) y917
    p.text-reg.text-light-200.founder-options-overview-description "There are three options. The manual way, traditional SPVs, and RUVs."  (2 lines) y1100
  div.founder-options-overview-options (flex)
    div.option-card[.option-card-highlighted] ×3  (flex 1 0 → 302.1; relative; padding 180 24 0; border-right HL (last none); overflow hidden; highlighted bg rgba(84,137,93,.16))
      div.option-header (absolute top 110.5 left 24; flex gap 16 center)
        p.text-reg-mono.text-allcaps.option-label "Option 1"  (mono 12/12 uppercase #e4eac8, opacity .8; highlighted 1)
        [highlighted] div.option-badge (bg #e4eac8; padding 8 16) > p.text-reg-mono.option-badge-text "Best option"  (mono 8/8 uppercase #2a5d33)   84.8x24
      div.option-content (flex col gap 8, max 272; opacity .8 unless highlighted)
        h3.text-book.option-title  (SuisseIntl 18/18, 400, ls -.36, #e4eac8)
        p.text-reg.option-subtitle   (14/21 #e4eac8)
        p.text-reg.option-description (14/21 #e4eac8)
```
| Card | Title | Subtitle | Description |
|---|---|---|---|
| Option 1 | "Take on direct shareholders" | "Investors sign SAFEs/equity docs directly" | "Adds every investor directly to the startup's cap table. Creates long-term headaches and costs when used for non-lead investors." |
| Option 2 | "A VC runs a SPV" | "A VC-led vehicle invests into the startup" | "Pools non-lead investors nicely, but have to find a VC to run it, and costs the founder's investors money." |
| Option 3 (highlighted, badge "Best option") | "Founder runs a RUV" | "Startup launches its own Roll Up Vehicle" | "Pools investors like an SPV, doesn't require a VC, and is free for the founder's investors." |

- The option content starts at y960 and the labels are at y890.5.
- No reveal classes in this section.
- ≤991: single column. The intro has padding 40 24 and a bottom border. The options stack; the cards have padding 40 24 and a bottom border, and the header becomes static with margin-bottom 16.
- ≤767: the intro and cards have padding 32 16. At 390 the section is 811 and each card about 209.

### 4.3 Options detail with sticky sidebar: `section.how-to-raise-section` (NEW class names, homepage logic)
This is the homepage "Rollups in action" pattern: all steps are visible, and the sidebar scroll-syncs and scroll-tos. It differs from 1.3's tabs.
```
div.container > div.how-to-raise-wrapper (grid .5fr 1fr; ≤1200 .35fr 1fr; ≤991 1fr; border-bottom .5 HL)
  aside.how-to-raise-sidebar (relative; padding 300 0; hidden ≤991)
    ul.how-to-raise-sidebar-list (sticky top 300; padding-left 30; flex col gap 16)   y1580
      li.animation-item[.sidebar-item-current] > a href="#raise-with-ruvs" (flex gap 14 center)
        p.text-reg-mono.text-allcaps.light-300  "0" "1"  (rendered "0 1" in DOM text; displays "01")
        p.text-reg.text-light "Take on direct shareholders"      (#989e7b; current #e4eac8; hover #d1dbb9; .25s)
      li > a href="#cap-table-cleanup"       "02" "A VC runs a SPV"
      li > a href="#streamline-acquisitions" "03" "Founder runs a RUV"
  div.how-to-raise-content (flex col gap 40)
    div.how-to-raise-steps (flex col, gap 140, border-left HL; ≤767 gap 60, no border)
      div#raise-with-ruvs.how-to-raise-step > ActionCard   (card: border-top + border-bottom HL; last card no bottom border)
      div#cap-table-cleanup.how-to-raise-step > ActionCard
      div#streamline-acquisitions.how-to-raise-step > ActionCard
```
- There is **no heading** in this section; the steps start at the section top (y1280).
- The IntersectionObserver `rootMargin -30% 0 -30% 0`, thresholds [0, 1], picks the entry nearest the viewport center. On click: `gsap.to(window, {duration: 1, scrollTo: {y: '#id', offsetY: 120}, ease: 'power2.inOut'})`. Same as the homepage.
- ActionCard overrides in this section:
  - `.action-card-ilu-wrapper` has padding 30, flex center, and `height: 600px` at ≥992 (660 with padding).
  - `.action-card-content-ilu` has max-width 440 and margin auto (320 at ≤767).
  - The text column uses the homepage `action-list` with `action-list-decor` (existing svg).

**Card 1** `#raise-with-ruvs` (904.3x696 at y1280)
- Label "Option 1". Title "Sign SAFEs/equity docs with every investor individually." (2 lines).
- Image `raise-directly.6c117944.png`, 440x561.
- Description: 2 paragraphs separated by `<br/><br/>`, 40 + 36 words. The first begins "Founders sign SAFEs or equity documents with every investor individually…". The block is 336 tall (16 lines).
- List:
  - "Annoying to manage and keep up with"
  - "Adds admin costs and slows down your company"
  - "Creates a messy cap table, which might make future VCs hesitate to invest."

**Card 2** `#cap-table-cleanup` (691.8 tall at y2116)
- Label "Option 2". Title "Get a VC to run a SPV into your company".
- Image `spv.19f9ba70.png`, 440x388.6.
- Description: 2 paragraphs, 50 + 34 words. The first begins "Founders ask a VC to run an SPV to pool their investors…".
- List:
  - "Works to pool investors effectively"
  - "But your investors are paying, and the VC isn't making any carry."
  - "And SPVs with founders as the GP are risky, as they must represent both the company and the investors in the SPV."

**Card 3** `#streamline-acquisitions` (753.8 tall at y2947.8)
- Label "Option 3". Title "Get the benefits of an SPV, but built for founders".
- Image `rollup.98c7b028.png`, 440x479.
- Description: 2 paragraphs, 49 + 47 words. The first begins "RUVs give founders the benefits of an SPV - pooling investors into a single entity - but without needing a VC…".
- List:
  - "Pool investors, avoid the mess."
  - "Lead your own vehicle, don't worry about talking a GP into doing it for free."
  - "Avoid charging your investors fees/carry, while also protecting yourself from risks with RUV's built-in Advisor"

None of these cards has a testimonial modal.

### 4.4 "How they compare" comparison table: `section.rollups-section` > `.comparision-table` (NEW; the typo "comparision" is in the class names)
```
div.container > div.comparision-table (relative; padding-top 100; border-bottom HL)   1358x1027
  div.comparision-table-header (flex col, gap 21, padding 80 30 40, max-width 40% → 603)
    h2.comparision-table-title "How they compare"   (PpNeueCorp 54/54, 500, ls -1.08) y3882.5
    p.comparision-table-description "A side-by-side look at the key differences between each fundraising approach."  (14/21 #d1dbb9)
    Button primary animated "Download PDF Guide" → /rollups-faq-for-founders.pdf   (177.6x38)
  div.comparision-table-table-wrapper[.--scrollable] (flex, justify flex-end, padding-left 25%, relative)
    div.comparision-table-table-content (flex col gap 12, max 1161)
      div.comparision-table-table-scroll[.fade-right|.fade-left|.fade-x] aria-label="Fundraising comparison table"
        div.comparision-table-table (flex; margin-top -60 at ≥1024 → it overlaps up into the header area)
          div.comparision-table-column.comparision-table-column-features (min-width 240; → 298.5 wide)
            div.comparision-table-cell.comparision-table-cell-header (empty; 88 tall; no borders)
            div.comparision-table-cell.comparision-table-cell-feature[.comparision-table-cell-alt-bg] ×7 (justify flex-start; border-top + right + left HL; 89 tall incl. border)
              p.comparision-table-feature-text  (SuisseIntl 18/normal, 400, ls -.36, #e4eac8)
          div.comparision-table-column ×3 (flex 1 0, max 240)
            div.comparision-table-cell.comparision-table-cell-header (border-right HL; last column none) > p.comparision-table-header-text (18px)
            div.comparision-table-cell[.alt-bg] ×7 (flex center; min-height 88; padding 0 32; border-top + right HL)
              either div.comparision-table-icon-wrapper.comparision-table-icon-wrapper-check (32x32 radius 8; bg #e4eac8; big layered green shadow — see Appendix Z) > svg table-check (15x12, #2a5d33)
              or     div.comparision-table-icon-wrapper.comparision-table-icon-wrapper-cross (bg rgba(84,137,93,.16)) > svg table-cross (12x12, #989e7b)
              or     p.comparision-table-text-value (12/14.4, ls -.28, #e4eac8, centered)
```
- Alt rows (rows 2, 4 and 6) use `.comparision-table-cell-alt-bg`: `background-color: rgba(54,101,62,.16)`.
- Columns at 1440: features 298.5 at x380.5, then 3 × 240 at x679, 919 and 1159. The table spans y4017.5–4728.5. The header row is 88 and body rows 89.

Data (feature / No Vehicle / RUVs / SPVs):

| Feature | No Vehicle | RUVs | SPVs |
|---|---|---|---|
| Pooled investors / streamlined cap table | cross | check | check |
| Investor costs | "$0" | "$0" | "Pay SPV fees and/or carry" |
| Can founder run it themselves? | check | check | cross |
| Company costs | "SAFEs free upfront, costs compound later" | "Free to raise, one-time flat fee paid by company at close" | "Paid by the SPV GP out of investor capital" |
| Professional administration/tax | cross | check | check |
| Investor voting | "Investor decides for themselves" | "Company can handle routine votes. Professional management by Rollups & AngelList when there are potential conflicts." | "SPV VC decides on behalf of investors. Founder can be conflicted if they are the SPV Manager." |
| Exit management | "Self-managed" | "Professionally managed" | "Professionally managed" |

**Overflow logic (JS)**:
- On scroll and resize of the scroll element, compute `hasOverflow = scrollWidth - clientWidth > 1`, `canScrollLeft = scrollLeft > 8` and `canScrollRight = scrollLeft < max - 8`.
- The wrapper gets `--scrollable` when overflowing.
- The scroll element gets `fade-right` (only right scrollable), `fade-left`, or `fade-x` (both directions).
- `.fade-right { --fade:80px; overflow:auto; mask-image: linear-gradient(to left, transparent 0, #000 var(--fade)) }`. The base `--fade` is 64px, and 64px was measured at 390.

**Responsive**:
- ≤991:
  - `.comparision-table` has padding 32 24 120. The header is full width with padding 32 16 and the title 42px.
  - The table wrapper has no left padding. The scroll box is `overflow-x:auto` with a thin scrollbar rgba(228,234,200,.35).
  - Columns are `flex: 0 0 200px`; features min-width 200. Cells have padding 24 26 and min-height 84.
- ≤767:
  - No outer padding. Title 32px. Columns are 160 wide; features min-width 140.
  - Cells have padding 16 and min-height 68; header cells 14 12.
  - Text is 12px (values 10px). Icons are 24x24 (svg 12).
  - At 390 the table scrolls horizontally (scrollWidth 640 vs 356) with a right fade. The section is 1022.

No reveal classes.

### 4.5 "The difference is a clean cap table": `section.ruv-comparision-illustrated-section` > `.ruv-comparision-illustrated` (NEW)
```
div.container > div.ruv-comparision-illustrated (flex; align stretch; min-height 500; border-bottom HL)   797.4 tall
  div.ruv-comparision-illustrated-intro (width 30% → 407.4; flex col, justify center, gap 21, padding 0 40)
    h2.heading.ruv-comparision-illustrated-title "The difference is a clean cap table"   (54/54, 3 lines 327.4x162)
    p.text-reg.text-light-200.ruv-comparision-illustrated-description "RUVs consolidate all angel checks into a single, founder-friendly line item - so you can raise faster today and keep your cap table tight for tomorrow’s rounds."  (4 lines)
    Button primary animated .ruv-comparision-illustrated-button "Launch your ruv" → https://app.rollups.com/get-started  (156x38, align-self flex-start)
  div.ruv-comparision-illustrated-visual (flex 1; padding 100 32; gap 16)  950.6 wide
    div.comparison-panel.comparison-panel-with-ruv (flex 1 0 → 435.3; flex col gap 16; bg rgba(84,137,93,.16); padding 32 40)
      div.comparison-panel-header (flex col gap 8)
        h2.comparison-panel-title "Without RUV"            (SuisseIntl 18/18, 400, ls -.36)
        p.comparison-panel-subtitle "Your cap table with 15 angel investors"   (14/21 #e4eac8)
      div.comparison-panel-content > svg cap-table-without-ruv.svg (width 100%, height auto → 355.3x469.4)
    div.comparison-panel
      h3.comparison-panel-title "With RUV" / p "Clean and simple, ready to scale"
      div.comparison-panel-content.comparison-panel-content-nested (relative) > svg cap-table-with-ruv.svg (355.3x365.3)
```
- The class name `comparison-panel-with-ruv` sits on the *Without RUV* panel. That mismatch is in the original.
- Both SVGs are static; there is no animation.
- At 1280 the section is 723 and each panel 379.3 wide.
- ≤991:
  - Column layout. The intro is full width with padding 40 24, a bottom border and gap 16. The title is 36px.
  - The visual stacks with padding 16 16 0. Panels have margin-bottom 16 and padding 40 24.
- ≤767: the intro has padding 32 16 and the title is 30px (ls -.72). Panels have padding 32 16. At 390 the section is 1268.

### 4.6 RUV facts CTA
Identical to 2.3.

### 4.7 Cost comparison calculator
Identical to 2.2 (anchor `#calculator`, the target of the hero "10x" link).

### 4.8 Stories grid
Identical to 2.4.

### 4.9 FAQ
Identical to 1.7.

---

## 5. /consolidate

### 5.0 Page-level: Lenis smooth scroll (this page only)
- The desktop hero component creates `new Lenis({duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))})` 200ms after mount, after calling `ScrollTrigger.refresh()`.
- It is driven by its own rAF loop (`lenis.raf(time)` every frame). `<html>` receives class `lenis`.
- It is destroyed on unmount.
- The mobile hero (≤1023) is a different component and does not create Lenis. The desktop component is always mounted but hidden by CSS below 1024, so Lenis exists at all widths.

### 5.1 Hero: two variants
```
div.hero-section-wrapper (relative)
  div.hero-consolidate-desktop  (display none; ≥1024 block)  — receives inline transform translateY(parallax)
    section.section > div.container > div.hero-consolidate-wrapper
      div.hero-content.hero-consolidate-desktop-content.consolidate-hero  (grid 678 2 678; border-bottom HL; 701)
        div.hero-block  — identical to the /ruv hero left block, with the differences below
        div.vertical-divider
        div.hero-block (style display:flex; center/center)
          div (style width:100%; max-width:450px; height:600px; max-height:80%; margin:0 auto; flex center)  → 450x560 at x835 y149
            Lottie (lottie-react) animationData=consolidate-hero.json autoplay=false loop=false style 100%/100%
  div.hero-consolidate-mobile (display none; ≤1023 block)
    section.section > div.container
      div.hero-content.hero-content-mobile > div.hero-block (same left content)
      div.hero-block > div.hero-lottie-file-container--mobile (style width 100%, max-width 500, margin 0 auto, flex, align flex-start, center; padding-top 100)
        Lottie (same JSON; autoplay false; loop false; style width calc(100% - 40px), height 100%)   → 316x355 at 390
  div.container (empty, 0 tall)
```

Left block differences from /ruv:
- h1 "Consolidation Vehicles" is plain text, 1 line (473.8x54 at y277.2).
- p "Consolidate existing stakeholders into a vehicle while preserving their QSBS eligibility. Clean up the cap table, streamline secondary transactions & more." (2 lines).
- The email form is the same (productInterest "Consolidation Vehicles").
- Hint: "Curious how CVs could work for you? " + "Contact us" (mailto).
- The AI prompt references "Consolidation Vehicles", `https://rollups.com/consolidate.md`, `https://rollups.com/consolidate`, and `https://help.rollups.com/consolidate/overview`.
- The trusted logos are the same.

**Desktop hero animation** (JS):
- The Lottie's `setSpeed(1.5)` is set, but frames are driven manually.
- **Parallax**: on each Lenis scroll event:

  ```js
  a = 0.6 * innerHeight;               // wrapperHeight 60 (vh)
  n = a * 0.1;                         // parallaxFactor 0.1
  s = Math.min(scrollY / a, 1);
  offset = n * (s <= .5 ? s : .5 + .8 * (1 - Math.pow(1 - (s - .5) / .8, 1.5)));
  heroDesktop.style.transform = `translateY(${offset}px)`;
  ```

  Measured at 900px viewport height:

  | scrollY | translateY |
  |---|---|
  | 0 | 0 |
  | 50 | 5 |
  | 100 | 10 |
  | 200 | 20 |
  | 400 | 44.95 |
  | 700 | 60.28 |

- **Scroll-scrubbed Lottie with snapping**:
  - `progress = clamp(5 * lenis.targetScroll / a, 0, 1)`.
  - It is throttled: skip if less than 16ms since the last update, or if |Δprogress| < 0.01.
  - Snap points `[0, 0.26, 0.51, 0.76, 1]`: the nearest point is chosen, then the frame is tweened with `gsap.to({frame: current}, {frame: snap * (totalFrames - 1), duration: 0.6, ease: 'power2.out', onUpdate: goToAndStop(Math.round(frame), true)})`. Any previous tween is killed first.
  - At 900 tall the whole animation completes within the first 108px of scroll.
  - The animation (780x860, 100 frames) shows a cap-table list with a "Consolidation Vehicle 16 — 9.4%" row expanding over the rows below it (see `recon/pages/consolidate-1440.png`).
- **Mobile hero animation**:
  - A ScrollTrigger on the container uses `start: "top 50%"`. `onEnter`/`onEnterBack` call `play()`. `onLeave`/`onLeaveBack` call `pause()`, `goToAndStop(0)`, and clear the replay timer.
  - On mount, and again after 100ms, it plays if the container spans the viewport's vertical middle.
  - `onComplete`: after 3000ms, `setSpeed(1.2)`, `setDirection(1)`, `goToAndPlay(0)`. This loops with a 3s pause.
- **390 layout**:
  - The mobile hero is 935 tall. The left block is 479.8 tall: h1 30px 1 line, p 4 lines (84), form, hint, AI. There are no trusted logos.
  - Then the lottie block, 455 tall, with padding-top 100.
  - CSS: `.consolidate-hero … heading-wrapper` has padding-top 60 at ≤768 and 42 at ≤600.

### 5.2 Testimonials slider: `section.testimonials.testimonials-consolidate.after-lenis-anim`
Same component as 1.2, with these differences:
- The h2 is **two separate `h2.heading.animation-text`**: "Turn existing stakeholders" and "into one line on the cap table." (each 700x54).
- The description is `p.text-reg.text-light-200.animation-text` (14/21, #d1dbb9): "Create an account, configure your CV for your use case, and invite stakeholders. <br/>Track your consolidation progress, and work with our team to update your cap table." The `<br/>` is omitted at ≤767. It is 2 lines, 700x42.
- Cards (`.testimonials-consolidate .testimonial-card`): min-height 280, padding 40 40 32 (≤768: min-height 240, padding 32 20). No images: `image` is "", so there is no author-image. Cards with name " " render an empty 0-height author block.
- The slider is 1358x368 at y1267. Active card 560x327.
- Data (`type:"consolidate"`), as valueprop / content / meta / mobile:
  1. "M&A readiness" / "The Consolidation Vehicle was instrumental in streamlining Wand's acquisition of Accern by combining dozens of our stakeholders into a single row, preserving Wand's clean cap table." / "Kumesh Aroomoogan, CEO at Accern, a Wand AI Company" / Yes
  2. "Clean cap table" / "We signed over 30 SAFEs to raise initial funds. We feared chasing down all of those investor signatures in future financings. Our investors were happy to execute the Rollup, saving us ~$20k and ~2 weeks." / "Marie Schneegans, Co-Founder, Markprompt" / Yes
  3. "Clean cap table" / "Rollups team supported our client's consolidation. It would have been prohibitively expensive and time consuming for our client if we had done this manually." / "Yokum Taku, Partner at WSGR" / Yes
  4. "Clean cap table" / "The potential lead in my round brought up that my cap table looks crowd-funded. How fast can you consolidate it?" / (name " ") / Yes
  5. "M&A readiness" / "Our startup has acquirers at the table. But it's going to be all equity. And they're worried about the headaches. Consolidation Vehicles are the answer." / " " / Yes
  6. "Secondary transaction management" / "Every time we let employees sell on secondary, it created an issue with cap table reconciliation. Now, nothing changes on the direct cap table." / " " / **No**
  7. "Advisor equity management" / "We gave over 100 advisors equity. It was a nightmare for anything that required signatures. Now, we just consolidate them." / " " / Yes
- ≤1023: `.testimonials.after-lenis-anim .container {padding-top:160px}`. At 390 the section is 2295 tall, with a static list of 6 cards.

### 5.3 Use cases
Same component as 1.3 (tabs). Header p: "Companies consolidate existing stakeholders into a CV for a number of reasons. Here are a few common ones."

1. `#clean-up-legacy-investors`, tab "Clean up stakeholders"
   - ActionCard:
     - Title "Clean up stakeholders".
     - Description "Move early angels, SAFE holders, and small check investors into a single vehicle - and off your cap table".
     - Image `in-action-1.80dd0b92.png` (existing; 541.9x355.5) at >767, or `in-action-1-mobile.b221d009.png` at ≤767.
     - Link "LEARN MORE" → /consolidate.
     - Card 385.5 tall.
   - HowItWorks steps:
     - TODAY "Get started":
       - "Configure your Consolidation Vehicle in the app by selecting which investors to roll up."
       - "The Rollups app provides flexible filtering and smart recommendations, and saves your work as you go."
       - "We form the vehicle that will hold the consolidated stakeholders and prepare all required paperwork for stakeholder signatures."
     - DAY 06 "Stakeholder consolidation, without the friction":
       - "When ready, invite stakeholders to review and sign."
       - "We provide a private portal for stakeholders to review and sign the required documents."
       - "As signatures are collected, companies get real-time updates into the consolidation progress."
     - DAY 30 "Update your cap table":
       - "Add the Consolidation Vehicle to your cap table, then transfer stakeholder holdings into it, removing the consolidated stakeholders from your direct cap table."
       - "Need a little help? Your law firm or our team can make the necessary updates to your cap table for you in a few minutes."
       - "Once complete, your cap table is streamlined, and you can manage your CV in the Rollups app."
     - DAY 30+ "Keep consolidating":
       - "Unlike traditional Special Purpose Vehicles (SPVs), Consolidation Vehicles don't "close" - and therefore are not just one-time use."
       - "Keep adding to your Consolidation Vehicle over time by returning to the app and adding new stakeholders."
       - "Transfers within the CV are easier than traditional transfers. Less paperwork, less admin, and less time spent on your cap table."
   - Right column:
     - The logo slot holds text: `h2.text-book.text-light-100` "$4B+ AI company (anonymous)" (2 lines, 18/18).
     - Number "+85%".
     - Text "Rollups reduced their cap table by 85%, saving them from distraction and ~$20,000/yr in admin and legal costs."
2. `#simplify-acquisitions`, tab "Simplify acquisitions"
   - ActionCard:
     - Title "Simplify acquisitions".
     - Description "When acquiring a company, consolidate their stakeholders into a single vehicle - so they never clutter your cap table."
     - Image `acquisition.3549754c.png` (541.9x302.7) at >767, or `acquisition-mobile2.d29c06e8.png` at ≤767.
     - LearnMore link.
     - Card 332.7 tall.
   - HowItWorks steps:
     - TODAY "Get started":
       - "Configure the Consolidation Vehicle in the app by listing the acquisition target stakeholders."
       - "Set custom ownership percentages for each stakeholder, and we prepare all required paperwork for stakeholder signatures."
       - "We form the CV entity, and prepare a private portal for the target's stakeholders to review and sign the required documents."
     - DAY 03 "Streamline your acquisition":
       - "When ready, invite the acquired company stakeholders to review and sign."
       - "As signatures are collected, you get real-time updates into consolidation progress."
       - "Once all stakeholders have signed, the company can close the acquisition and add one single row to their cap table."
     - DAY 10 "Update your cap table":
       - "Add the Consolidation Vehicle to your cap table, just a single new row."
       - "Once complete, your cap table now reflects the acquisition, and you can manage your CV in the Rollups app."
     - DAY 15+ "Keep acquiring":
       - "Unlike traditional Special Purpose Vehicles (SPVs), Consolidation Vehicles don't 'close' - and therefore are not just one-time use."
       - "You can keep adding new acquisitions to your CV over time by returning to the app and adding new stakeholders."
   - Right column:
     - Logo slot text "Wand AI".
     - Number "$25k saved".
     - Text "Wand AI streamlined its acquisition of Accern's dozens of stakeholders into one entity, preserving a clean cap table for Wand AI."
   - Split card 918 tall.

### 5.4 Capabilities
Same grid as 1.4. Items 01 and 02 have `.with-top-padding`, as do 03–06; 07 and 08 use `.no-bottom-border`.
- "01*" (clickable, modal investorexp.png) "Custom stakeholder portal experience" → "Set up your own secure portal to share with stakeholders, and track analytics"
- "02" "Stakeholder KYC/AML included" (no description paragraph)
- "03" "Company-friendly pricing" → "So you save on cap table admin costs."
- "04" "Simple stakeholder e-signature process" → "Make it easy for your stakeholders to sign consolidation documents."
- "05" "Secure banking infrastructure" → "Conduct secondaries and distributions within the CV confidently on the same AngelList banking infrastructure that moved $80B in 2024 and has deployed more cumulative capital than some of the largest VC funds combined."
- "06" "Experienced team, over 20 years of combined experience" → "Consolidate quickly, and with confidence. Built by private market experts who've supported thousands of private companies."
- "07" "Comprehensive post-consolidation action support" → "Enabling stakeholders within the CV to transfer? No problem! We've got you covered."
- "08" "International companies and investors" → "Subject to local laws and regulations, we support companies and their stakeholders in international jurisdictions."

### 5.5 Companies
Heading "Top law firms & companies trust us to consolidate stakeholders" (identical to the homepage).

### 5.6 Pricing
Same markup as 1.6, but the container is `.with-top-padding` **without** `.with-bottom-border`. Heading "Consolidation Vehicle Pricing".
- Item 1:
  - "Consolidate existing stakeholders" / "One CV is all companies need due to the flexible structure."
  - "Starting at $100" + unit "/stakeholder/year".
  - Button primary animated "Get Started" → /contact-us.
- Item 2:
  - mono "Includes".
  - List: "Supports multiple closes.", "Includes the first 5 intra-CV transfers.", "Stakeholder portals for signing & viewing docs.", "Dedicated onboarding and support."
- Item 3 (no-bottom-border):
  - "Add-ons" with no description.
  - Button secondary animated "Contact Us" → mailto:team@rollups.com.
- Item 4:
  - mono "Includes".
  - List: "Additional intra-CV transfers.", "Distributions to stakeholders within the CV."
- Rows at 1440: y6169 (219), y6388 (192).

### 5.7 FAQ
Heading "Everything You Need to Know". 3 items, item 0 open. The wrapper is 624 tall at 1440.
1. "How are Consolidation Vehicles (CVs) different from Roll Up Vehicles® (RUVs)?": 53 words, 1 paragraph.
2. "How do Consolidation Vehicles (CVs) actually work?": 49 words.
3. "What about my investors? Does consolidating them create negative tax consequences or remove their voting rights?": 47 words.

---

## 6. Motion summary (new or different vs the homepage)

| Where | Trigger | Animation |
|---|---|---|
| All sections with `.animation-item` / `.animation-text` | ScrollTrigger `top 90%`, once | Global reveal, unchanged. **Sections without these classes** (calculator hero, calculator, facts CTA, founder options, comparison table, clean-cap-table, parts of the stories footer) only get the page fade-in. |
| /ruv and /how-to-raise-capital hero Lottie | IntersectionObserver `.hero-animation-wrapper`, threshold .5 | `product-raise.json`, loop, speed 1; plays while visible |
| /consolidate hero (≥1024) | Lenis scroll | translateY parallax (formula 5.1) plus a snap-scrubbed Lottie (0.6s power2.out tween between snap frames) |
| /consolidate hero (≤1023) | ScrollTrigger `top 50%` | play, reset on leave, 3s pause between replays at speed 1.2 |
| Testimonial swiper | nav click, slide click, mousewheel | Swiper translate 300ms. Slide opacity .44↔1 over .25s ease-out, transform .12s. Hover on an inactive slide: translateY(-4) and opacity .7. Nav hover scale 1.1 over .3s. |
| Use-case tabs | click | Old step to opacity 0, y -20 over .3s, then new step from opacity 0, y 20 to 1/0 over .3s (GSAP default ease). Mobile underline x/width tween .12s power1.out. |
| How-to-raise sidebar | scroll / click | IntersectionObserver current-item sync and GSAP scrollTo 1s power2.inOut, offsetY 120 (as the homepage) |
| Capability modal | click | Overlay fadeIn .3s; panel modalSlideIn .3s (scale .9 → 1, y -20 → 0) plus modalBackgroundFade .4s after .2s; content contentFadeIn .2s after .15s |
| SAFE flip card | click / Enter / Space, or auto every 10s until the first interaction | `rotateY(180deg)` .6s ease, perspective 2000 |
| Calculator toggle | click | knob translateX(20px) .2s ease |
| Calculator dropdown | click | arrow rotate(180deg) .2s; menu appears instantly; item bg .2s |
| Calculator inputs | focus | border color .2s |
| Comparison table (≤991) | horizontal scroll | mask fade class switches (`fade-right` / `fade-left` / `fade-x`) |
| Hero stat link | hover / focus | color and underline color .2s |

---

## 7. Not measured / caveats

- **Email hero form** (/ruv, /consolidate): same component as the homepage. Real submission (getform endpoints `https://getform.io/f/aolowrmb` / `aqomwyea`) was not exercised.
- **FAQ "Ask anything else" assistant**: a live AI backend. Only the UI is identical to the homepage.
- **Lottie contents**: `consolidate-hero.json` and `product-raise.json` are extracted verbatim. The text inside them is glyph shapes, so no fonts are needed.
- **`/rollups-faq-for-founders.pdf`**: downloaded, not inspected.
- **"Read more customer stories" target**: `/customers`, a route not in `routes.jsx`.
- **"Read case study" target**: `/blog/case-study-secureframe-maximize-captable-value-ruv`.
- **Font weight 450** (`.price-label-unit`, `.hero-stat-value`) resolves to the SuisseIntl 500 file, same as the homepage.
- **"private investment page" modal on /ruv**: the overlay is `position: fixed` but sits inside a GSAP-transformed ancestor, so on the original it is offset to the use-case step. Build it viewport-fixed.

---

## Appendix Z: live CSS for the new components (verbatim, minified values)

- Rules are one per line and were extracted from the production stylesheets with postcss.
- `@media` rules are shown one rule per query.
- `html[data-theme=light-subpage]` rules were dropped, since they are not used on these pages.
- The homepage-shared rules (container, heading-wrapper, button, faq, companies, action-card base, navbar, footer) are omitted; see `CLONE_SPEC.md`.

### A. Page heroes (RUV / how-to-raise / consolidate)
```css
.stack {display:flex;max-width:100%}
.stack[data-direction=row] {flex-direction:row}
.stack[data-direction=column] {flex-direction:column}
.stack[data-gap="3xs"] {gap:var(--spacing-3xs)}
.stack[data-gap="2xs"] {gap:var(--spacing-2xs)}
.stack[data-gap=xs] {gap:var(--spacing-xs)}
.stack[data-gap=sm] {gap:var(--spacing-sm)}
.stack[data-gap=md] {gap:var(--spacing-md)}
.stack[data-gap=lg] {gap:var(--spacing-lg)}
.stack[data-align=start] {align-items:start}
.stack[data-align=center] {align-items:center}
.stack[data-align=end] {align-items:end}
.stack[data-justify=start] {justify-content:start}
.stack[data-justify=center] {justify-content:center}
.stack[data-justify=end] {justify-content:end}
.stack[data-justify=space-between] {justify-content:space-between}
.hero-content-description {max-width:47ch}
.consolidate-hero .hero-visual {max-width:450px!important;object-fit:contain;padding-top:100px;padding-bottom:100px;will-change:auto!important;transform:translateZ(0)!important}
@media (max-width:768px) { .consolidate-hero .hero-visual {max-width:min(400px,90vw)!important;padding:max(60px,8vh)!important;min-height:200px!important} }
@media (max-width:480px) { .consolidate-hero .hero-visual {max-width:min(350px,85vw)!important;padding:max(40px,6vh)!important} }
.raise-hero .hero-block:last-child {display:flex!important;align-items:center!important;justify-content:center!important}
.raise-hero .hero-visual {max-width:750px!important;width:100%!important;height:auto!important;object-fit:contain!important;padding:20px!important;will-change:auto!important;transform:translateZ(0)!important}
@media (max-width:768px) { .raise-hero .hero-visual {max-width:min(550px,90vw)!important;padding:max(15px,2vh)!important;min-height:250px!important} }
@media (max-width:480px) { .raise-hero .hero-visual {max-width:min(450px,85vw)!important;padding:max(10px,1.5vh)!important} }
.ruv-hero .hero-block:last-child {display:flex!important;align-items:center!important;justify-content:center!important}
.ruv-hero .hero-visual {max-width:650px!important;width:100%!important;height:auto!important;object-fit:contain!important;padding:20px!important;will-change:auto!important;transform:translateX(40px) translateZ(0)!important}
@media (max-width:768px) { .ruv-hero .hero-visual {max-width:min(500px,90vw)!important;padding:max(15px,2vh)!important;min-height:200px!important;transform:translateX(16px) translateZ(0)!important} }
@media (max-width:480px) { .ruv-hero .hero-visual {max-width:min(400px,85vw)!important;padding:max(10px,1.5vh)!important;transform:translateX(10px) translateZ(0)!important} }
@media (max-width:768px) { .ruv-hero .hero-visual-desktop {display:none!important} }
.ruv-hero .hero-visual-mobile {display:none!important}
@media (max-width:768px) { .ruv-hero .hero-visual-mobile {display:block!important} }
@media (max-width:900px) { .ruv-hero .vertical-divider {display:none!important} }
.ruv-hero .hero-animation-wrapper {width:100%!important;height:100%!important;min-height:400px!important;overflow:visible!important;display:flex!important;align-items:center!important;justify-content:center!important;position:relative!important}
@media (max-width:768px) { .ruv-hero .hero-animation-wrapper {min-height:250px!important;padding:5px 0!important} }
@media (max-width:480px) { .ruv-hero .hero-animation-wrapper {min-height:200px!important;padding:5px 0!important} }
.ruv-hero .hero-animation {width:150%!important;height:150%!important;min-height:350px!important;position:relative!important;top:0!important;margin:0 auto!important;pointer-events:none!important;display:block!important}
@media (max-width:768px) { .ruv-hero .hero-animation {width:130%!important;height:130%!important;min-height:200px!important;margin:0 auto!important;transform:translateX(-5%)!important} }
@media (max-width:480px) { .ruv-hero .hero-animation {width:140%!important;height:140%!important;min-height:180px!important;margin:0 auto!important;transform:translateX(-8%)!important} }
.ruv-hero .hero-block:last-child {min-height:400px!important}
@media (max-width:768px) { .ruv-hero .hero-block:last-child {min-height:250px!important;padding:10px 20px!important} }
@media (max-width:480px) { .ruv-hero .hero-block:last-child {min-height:200px!important;padding:5px 15px!important} }
@media (max-width:768px) { .consolidate-hero .hero-block .heading-wrapper {padding-top:60px!important} }
@media (max-width:768px) { .consolidate-hero .hero-block .hero-visual {padding:max(60px,8vh) 0!important} }
@media (max-width:600px) { .consolidate-hero .hero-block .heading-wrapper {padding-top:42px!important} }
@media (max-width:900px) { .raise-hero .hero-block .heading-wrapper {padding-top:60px!important} }
@media (max-width:600px) { .raise-hero .hero-block .heading-wrapper {padding-top:42px!important} }
@media (max-width:900px) { .ruv-hero .hero-block .heading-wrapper {padding-top:60px!important} }
@media (max-width:600px) { .ruv-hero .hero-block .heading-wrapper {padding-top:42px!important} }
.hero-consolidate-desktop {display:none}
@media (min-width:1024px) { .hero-consolidate-desktop {display:block} }
.hero-consolidate-mobile {display:none}
@media (max-width:1023px) { .hero-consolidate-mobile {display:block} }
.hero-section-wrapper {position:relative}
@media (max-width:1023px) { .hero-section-wrapper {min-height:0} }
.hero-lottie-file-container--mobile {padding-top:100px}
@media (max-width:1023px) { .testimonials.after-lenis-anim .container {padding-top:160px} }
.hero-stats {display:flex;gap:24px;align-items:flex-start;padding-top:32px;padding-bottom:32px}
@media (max-width:767px) { .hero-stats {flex-direction:column;gap:16px;margin-top:24px;display:none} }
.hero-stat-item {display:flex;flex-direction:column;gap:8px;padding:8px 12px 12px;width:100%}
@media (max-width:767px) { .hero-stat-item {width:100%;padding:8px 0 12px} }
.hero-stat-value {font-family:var(--fonts-family--font-family-primary);font-size:24px;line-height:100%;letter-spacing:-.36px;color:var(--colors--light-100);margin:0;font-weight:450}
.hero-stat-label {font-family:var(--fonts-family--font-family-tertiary);font-size:var(--fonts-sizes--text-xs);line-height:normal;color:var(--colors--light-300);text-transform:uppercase;margin:0}
.hero-stat-disclosure-link {width:-moz-fit-content;width:fit-content;white-space:nowrap;-webkit-text-decoration-line:underline;text-decoration-line:underline;-webkit-text-decoration-color:rgba(209,219,185,.42);text-decoration-color:rgba(209,219,185,.42);text-decoration-thickness:1px;text-underline-offset:4px;transition:color .2s ease,-webkit-text-decoration-color .2s ease;transition:color .2s ease,text-decoration-color .2s ease;transition:color .2s ease,text-decoration-color .2s ease,-webkit-text-decoration-color .2s ease}
.hero-stat-disclosure-link:focus-visible,.hero-stat-disclosure-link:hover {color:var(--colors--light-100);-webkit-text-decoration-color:rgba(209,219,185,.9);text-decoration-color:rgba(209,219,185,.9)}
.hero-stat-disclosure-link:focus-visible {outline:1px solid rgba(209,219,185,.72);outline-offset:4px}
.hero-stat-disclosure-mark {font-size:.75em;line-height:0}
.raise-hero .stack.animation-item {margin-top:12px}
.raise-hero.hero-content .hero-block .hero-animation-wrapper {width:100%;height:100%;display:flex;align-items:center;justify-content:center;overflow:initial;position:relative}
@media (max-width:1180px) { .raise-hero.hero-content .hero-block .hero-animation svg {margin-left:-20%!important;width:100%!important} }
@media (max-width:900px) { .raise-hero.hero-content .vertical-divider {margin-bottom:24px} }
@media (max-width:900px) { .raise-hero.hero-content .hero-block .hero-animation {margin-left:0;margin-top:0} }
@media (max-width:900px) { .raise-hero.hero-content .hero-block .hero-animation svg {width:120vw!important;margin-left:-25vw!important;margin-bottom:24px} }
```

### B. Testimonials slider + SAFE flip card
```css
section.stories-grid.how-to-raise-testimonials .container {border-top:var(--border-line-width) solid var(--colors--light-300);border-bottom:var(--border-line-width) solid var(--colors--light-300)}
section.stories-grid.how-to-raise-testimonials .stories {grid-template-rows:repeat(1,1fr);border-top:var(--border-line-width) solid var(--colors--light-300)}
section.stories-grid.how-to-raise-testimonials .story-card {min-height:360px}
@media (max-width:1024px) { section.stories-grid.how-to-raise-testimonials .story-card {min-height:320px} }
@media (max-width:767px) { section.stories-grid.how-to-raise-testimonials .story-card {min-height:280px} }
.ruv-testimonials-grid-footer {box-sizing:border-box;display:flex;align-items:center;justify-content:flex-end;width:100%;padding:24px 32px;border-top:var(--border-line-width) solid var(--colors--light-300)}
.ruv-testimonials-grid-footer .button-wrapper {margin-left:auto}
@media (max-width:767px) { .ruv-testimonials-grid-footer {justify-content:stretch;padding:20px 16px} }
@media (max-width:767px) { .ruv-testimonials-grid-footer .button,.ruv-testimonials-grid-footer .button-wrapper {width:100%} }
.testimonials .testimonials-unified-container {padding-top:20px;padding-bottom:0;border-bottom:var(--border-line-width) solid var(--colors--light-300)}
@media (max-width:991px) { .testimonials .testimonials-unified-container {padding-top:0} }
.testimonials [slot=heading] {max-width:560px;margin:auto}
@media (max-width:767px) { .testimonials [slot=heading] {max-width:440px} }
@media (min-width:768px) { .testimonials .testimonials-heading-wrapper {max-width:125%;width:125%} }
@media (min-width:768px) { .testimonials .testimonials-heading-wrapper .mobile-break {display:none} }
.testimonials .testimonials-image-wrapper {margin-top:1rem;text-align:center;width:100%;overflow:hidden}
@media (max-width:768px) { .testimonials .testimonials-image-wrapper {margin-top:2rem} }
.testimonials .testimonials-software-image {width:100%;max-width:1200px;height:auto;border-radius:12px 12px 0 0;object-fit:contain;margin-bottom:-6px}
@media (max-width:768px) { .testimonials .testimonials-software-image {max-width:100%;border-radius:8px 8px 0 0} }
.testimonials [slot=section-description] {display:block;text-align:left;max-width:480px}
@media (max-width:768px) { .testimonials .container {padding-left:10px;padding-right:10px} }
@media (max-width:768px) { .testimonials .container .centered {margin:0} }
@media (max-width:768px) { .testimonials .container .centered.with-padding,.testimonials .container .testimonials-wrapper {padding:0} }
@media (max-width:768px) { .testimonials .container .testimonials-wrapper .testimonial-card {max-width:100%;min-width:100%;width:100%} }
.testimonials-wrapper {overflow:hidden;border-bottom:var(--border-line-width) solid var(--colors--light-300);padding:20px 0;margin-top:64px}
@media (max-width:768px) { .testimonials-wrapper {padding:20px 10px;border-width:0} }
.testimonials-wrapper.testimonials-static {display:none;flex-direction:row;justify-content:center;align-items:stretch;gap:24px}
@media (max-width:768px) { .testimonials-wrapper.testimonials-static {display:flex;flex-direction:column;align-items:center} }
.testimonials-wrapper.testimonials-slider {display:none;position:relative}
@media (min-width:768px) { .testimonials-wrapper.testimonials-slider {display:block} }
.testimonials-wrapper.testimonials-slider:after,.testimonials-wrapper.testimonials-slider:before {content:"";position:absolute;top:0;bottom:0;width:120px;z-index:5;pointer-events:none;opacity:.6}
.testimonials-wrapper.testimonials-slider:after {right:0;background:linear-gradient(to left,var(--colors--green) 0,transparent 100%)}
.testimonials-wrapper .swiper {overflow:visible!important;width:200%!important;margin-left:-50%!important}
.testimonials-wrapper .swiper-wrapper {overflow:visible!important;width:100%!important;margin-left:-280px}
@media (max-width:1360px) { .testimonials-wrapper .swiper-wrapper {margin-left:0} }
.testimonials-wrapper .swiper-slide {opacity:.44;cursor:pointer;transition:all .3s ease}
.testimonials-wrapper .swiper-slide:hover:not(.swiper-slide-active) {opacity:.7;transform:translateY(-4px)}
.testimonials-wrapper .swiper-slide-active {opacity:1;cursor:default}
@media (max-width:1361px) { .testimonials-wrapper .swiper-slide-next {opacity:.44!important} }
.testimonials-wrapper .swiper-slide-next {opacity:1}
.testimonials-wrapper .testimonial-card {display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between;gap:16px;padding:64px 40px 40px;min-height:424px;background:rgba(84,137,93,.24);border-radius:2px;min-width:560px;width:560px;max-width:560px;box-sizing:border-box;transition:all .18s ease-out}
@media (max-width:768px) { .testimonials-wrapper .testimonial-card {width:100%;min-width:auto;max-width:480px;min-height:320px;padding:40px 20px} }
.testimonials-wrapper .testimonial-card.swiper-slide {transition:transform .12s ease-out,opacity .25s ease-out,filter .25s ease-out}
.testimonials-wrapper .testimonial-card [slot=content] {font-size:var(--fonts-sizes--text-2xl);font-weight:400;color:var(--colors--light-100)}
@media (max-width:768px) { .testimonials-wrapper .testimonial-card [slot=content] {font-size:var(--fonts-sizes--text-lg)} }
.testimonials-wrapper .testimonial-card [slot=valueprop] {font-size:var(--fonts-sizes--text-xs);font-weight:400;color:var(--colors--light-200);margin-bottom:8px;letter-spacing:.5px}
.testimonials-wrapper .testimonial-card [slot=author] {display:flex;flex-direction:column;gap:12px}
.testimonials-wrapper .testimonial-card [slot=author-image] {background-blend-mode:screen,normal;object-fit:contain;margin-right:auto;height:100%;width:120px;height:80px;background-size:cover;background-position:50%;background-repeat:no-repeat;border-radius:2px}
.testimonials-wrapper .testimonial-card [slot=author-meta] {font-size:var(--fonts-sizes--text-sm);color:var(--colors--light-200);margin:0}
.testimonials-navigation {position:absolute;top:50%;left:24px;right:24px;z-index:10;display:flex;justify-content:space-between;align-items:center;pointer-events:none;transform:translateY(-50%)}
@media (max-width:768px) { .testimonials-navigation {display:none} }
.testimonials-nav-button {display:flex;align-items:center;justify-content:center;width:48px;height:48px;background:rgba(84,137,93,.9);border:1px solid var(--colors--light-300);border-radius:50%;color:var(--colors--light-100);cursor:pointer;pointer-events:all;transition:all .3s ease;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
.testimonials-nav-button:hover {background:#54895d;transform:scale(1.1);border-color:var(--colors--light-100)}
.testimonials-nav-button:active {transform:scale(.95)}
.testimonials-nav-button svg {width:16px;height:16px}
.testimonials-nav-button.testimonials-nav-prev svg {transform:rotate(180deg)}
.testimonials-nav-button.swiper-button-disabled {opacity:.3;cursor:not-allowed}
.testimonials-nav-button.swiper-button-disabled:hover {transform:none;background:rgba(84,137,93,.9);border-color:var(--colors--light-300)}
.testimonials-consolidate .testimonial-card {min-height:280px;padding:40px 40px 32px}
@media (max-width:768px) { .testimonials-consolidate .testimonial-card {min-height:240px;padding:32px 20px} }
.demo-wrapper {padding-top:0}
.flip-card {perspective:2000px;cursor:pointer;aspect-ratio:16/9;max-width:1200px;margin:0 auto;border-radius:12px 12px 0 0;overflow:hidden;z-index:200}
.flip-card,.flip-card-inner {position:relative;width:100%;-webkit-user-select:none;-moz-user-select:none;user-select:none}
.flip-card-inner {height:100%;transform-style:preserve-3d;transition:transform .6s ease}
.flip-card.flipped .flip-card-inner {transform:rotateY(180deg)}
.flip-card-face {position:absolute;top:0;left:0;width:100%;height:100%;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-user-select:none;-moz-user-select:none;user-select:none}
.flip-card-front {transform:rotateY(0deg)}
.flip-card-back {transform:rotateY(180deg)}
.flip-cta {position:absolute;top:88%;left:30%;right:30%;width:40%;display:flex;justify-content:center;align-items:center;background-color:rgba(41,93,50,.85);color:var(--colors--light-100);border:var(--border-line-width) solid #466346;border-radius:5px;padding:12px;font-family:var(--fonts-family--font-family-tertiary);font-size:var(--fonts-sizes--text-xs);text-transform:uppercase;line-height:12px;-webkit-user-select:none;-moz-user-select:none;user-select:none;pointer-events:none;z-index:2;transition:all .3s ease}
@media (max-width:767px) { .flip-cta {display:none} }
.flip-cta-text {white-space:nowrap}
.testimonial-wrapper {position:relative;width:100%;height:100%;display:flex;flex-direction:column;gap:40px;align-items:stretch;justify-content:center}
.testimonial-wrapper .testimonial-content {display:flex;flex-direction:column;gap:40px;padding:64px 0}
.testimonial-wrapper .testimonial-content .testimonial-author {display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-start;gap:12px}
.testimonial-wrapper .testimonial-content .testimonial-author img {object-fit:contain;margin-right:auto;height:100%;max-width:120px;max-height:80px;border-radius:2px}
.capability-card .product-image-testimonial {width:100%;height:100%;display:flex;align-items:center;justify-content:center}
.capability-card .product-image-testimonial .testimonial-product-image {max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;border-radius:8px}
```

### C. Use cases (sidebar, split card, how-it-works)
```css
.split-card {display:grid;grid-template-columns:1fr .5fr;border-top:var(--border-line-width) solid var(--colors--light-300);border-bottom:var(--border-line-width) solid var(--colors--light-300)}
.split-card.split-card--single {grid-template-columns:1fr}
.split-card.split-card--single .split-card-left-wrapper {border-right:none}
.split-card.no-bottom-border {border-bottom:none}
@media (max-width:767px) { .split-card {grid-template-columns:1fr;padding:0!important} }
.split-card .split-card-left-wrapper {position:relative;border-right:var(--border-line-width) solid var(--colors--light-300);display:flex;flex-direction:column;align-items:flex-start;padding:40px 30px}
@media (max-width:767px) { .split-card .split-card-left-wrapper {border-right:none;border-bottom:var(--border-line-width) solid var(--colors--light-300);padding:20px 10px 40px} }
.split-card .split-card-right-wrapper {display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start;padding:40px 30px}
@media (max-width:767px) { .split-card .split-card-right-wrapper {padding:20px 10px} }
.split-card .split-card-right-wrapper .split-card-right-component {display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between;gap:48px}
.split-card .split-card-right-wrapper .split-card-right-component .split-card-right-component-content {display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between;gap:8px}
.split-card .split-card-right-wrapper .split-card-right-component .split-card-right-component-logo {margin-right:auto;height:28px}
.split-card .split-card-right-wrapper .split-card-right-component .split-card-right-component-logo svg {width:auto}
@media screen and (max-width:991px) { .split-card {flex-direction:column;padding:32px} }
@media screen and (max-width:991px) { .split-card-left-wrapper {min-height:300px} }
.how-it-works-wrapper .how-it-works-content {display:flex;flex-direction:column;align-items:flex-start;gap:48px}
.how-it-works-wrapper .how-it-works-content .how-it-works-header {display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between}
.how-it-works-wrapper .how-it-works-content .how-it-works-steps {display:flex;flex-direction:column;align-items:flex-start;gap:48px}
.how-it-works-wrapper .how-it-works-content .how-it-works-steps .how-it-works-step {display:flex;flex-direction:column;align-items:flex-start;gap:16px}
.how-it-works-wrapper .how-it-works-content .how-it-works-steps .how-it-works-step .how-it-works-step-title {display:flex;align-items:center;gap:20px}
.how-it-works-wrapper .how-it-works-content .how-it-works-steps .how-it-works-step-content {display:flex}
.how-it-works-wrapper .how-it-works-content .how-it-works-steps .how-it-works-step-content .vertical-line {width:var(--border-line-width);min-width:var(--border-line-width);background:linear-gradient(180deg,#989e7b,rgba(152,158,123,0));margin:0 20px 0 7px}
.how-it-works-wrapper .how-it-works-content .how-it-works-steps .how-it-works-step-content .how-it-works-step-items {display:flex;flex-direction:column;align-items:flex-start;gap:16px;max-width:478px}
.use-cases-section .use-cases-wrapper {border-bottom:.5px solid var(--colors--light-300);grid-template-rows:auto;grid-template-columns:.5fr 1fr;grid-auto-columns:1fr;display:grid}
@media (max-width:1024px) { .use-cases-section .use-cases-wrapper {grid-template-columns:1fr} }
.use-cases-section .use-cases-wrapper .use-cases-header {max-width:60ch}
@media (max-width:1024px) { .use-cases-section .use-cases-wrapper .use-cases-header {padding:0 20px} }
@media (max-width:767px) { .use-cases-section .use-cases-wrapper .use-cases-header {padding:0 10px} }
.use-cases-section .use-cases-wrapper .use-cases-header p {max-width:45ch}
.use-cases-section .use-cases-wrapper .use-cases-sidebar-mobile {display:none}
@media (max-width:1024px) { .use-cases-section .use-cases-wrapper .use-cases-sidebar-mobile {display:block} }
.use-cases-section .use-cases-wrapper .use-cases-sidebar-mobile .use-cases-sidebar-list {position:relative;padding-left:20px;padding-right:10px;padding-bottom:12px;display:flex;gap:2rem;overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none}
.use-cases-section .use-cases-wrapper .use-cases-sidebar-mobile .use-cases-sidebar-list::-webkit-scrollbar {display:none}
@media (max-width:767px) { .use-cases-section .use-cases-wrapper .use-cases-sidebar-mobile .use-cases-sidebar-list .animation-item:last-child {padding-right:20px} }
@media (max-width:767px) { .use-cases-section .use-cases-wrapper .use-cases-sidebar-mobile .use-cases-sidebar-list .animation-item a {text-wrap:nowrap} }
.use-cases-section .use-cases-wrapper .use-cases-sidebar-mobile .use-cases-sidebar-list .active-underline {position:absolute;left:0;bottom:2px;height:var(--border-line-width);background:var(--colors--light-100);border-radius:1px;width:32px;min-width:32px;transition:none;pointer-events:none;z-index:2}
.use-cases-section .use-cases-wrapper .use-cases-sidebar-mobile li a:hover .text-light {color:var(--colors--light-200)}
.use-cases-section .use-cases-wrapper .use-cases-sidebar-mobile li a .text-light {color:var(--colors--light-300);transition:color .25s ease}
.use-cases-section .use-cases-wrapper .use-cases-sidebar-mobile .sidebar-item-current .text-light {color:var(--colors--light-100)}
.use-cases-section .use-cases-wrapper .use-cases-sidebar {position:relative;padding:300px 0}
@media (max-width:1024px) { .use-cases-section .use-cases-wrapper .use-cases-sidebar {padding:0;display:none} }
.use-cases-section .use-cases-wrapper .use-cases-sidebar .use-cases-sidebar-list {position:-webkit-sticky;position:sticky;top:300px;padding-left:30px;display:flex;flex-direction:column;gap:16px}
.use-cases-section .use-cases-wrapper .use-cases-sidebar .use-cases-sidebar-list li a {display:flex;align-items:center;gap:14px}
.use-cases-section .use-cases-wrapper .use-cases-sidebar .use-cases-sidebar-list li a:hover .text-light {color:var(--colors--light-200)}
.use-cases-section .use-cases-wrapper .use-cases-sidebar .use-cases-sidebar-list li a .text-light {color:var(--colors--light-300);transition:color .25s ease}
.use-cases-section .use-cases-wrapper .use-cases-sidebar .use-cases-sidebar-list .sidebar-item-current .text-light {color:var(--colors--light-100)}
.use-cases-section .use-cases-wrapper .use-cases-content {display:flex;flex-direction:column;gap:40px}
@media (max-width:767px) { .use-cases-section .use-cases-wrapper .use-cases-content {overflow:hidden} }
.use-cases-section .use-cases-wrapper .use-cases-content .use-cases-steps {display:flex;flex-direction:column;gap:140px;border-left:var(--border-line-width) solid var(--colors--light-300);border-top:var(--border-line-width) solid var(--colors--light-300)}
@media (max-width:767px) { .use-cases-section .use-cases-wrapper .use-cases-content .use-cases-steps {border-left:none} }
@media (max-width:767px) { .use-cases-section .use-cases-wrapper .use-cases-content .use-cases-steps .use-case-content .split-card {border-top:none} }
@media (max-width:767px) { .use-cases-section .use-cases-wrapper .use-cases-content .use-cases-steps .use-case-content .action-card .action-card-ilu-wrapper {min-height:200px} }
@media (max-width:767px) { .use-cases-section .use-cases-wrapper .use-cases-content .use-cases-steps .use-case-content .action-card img {max-width:none;margin:0 auto} }
@media (max-width:767px) { .use-cases-section .use-cases-wrapper .use-cases-content .use-cases-steps .use-case-content .action-card .action-card-modal-wrapper img {max-width:none;margin:0} }
@media (max-width:767px) { .use-cases-section .use-cases-wrapper .use-cases-content .use-cases-steps .use-case-content .action-card .action-card-modal-wrapper .action-card-modal .action-card-modal-content {padding:10px} }
.use-cases-section .use-cases-wrapper .use-cases-content .use-cases-steps .use-cases-step .action-card {border:none}
@media (max-width:767px) { .use-cases-section .use-cases-wrapper .use-cases-content .use-cases-steps .use-cases-step .action-card {display:flex;flex-direction:column-reverse} }
@media (max-width:767px) and (max-width:767px) { .use-cases-section .use-cases-wrapper .use-cases-content .use-cases-steps .use-cases-step .action-card .action-card-content-wrapper {padding:24px 10px 20px} }
@media (max-width:767px) and (max-width:767px) { .use-cases-section .use-cases-wrapper .use-cases-content .use-cases-steps .use-cases-step .action-card .action-card-content-wrapper .action-card-content {margin-top:24px;padding-bottom:20px} }
@media (min-width:1025px) { .use-cases-sidebar-mobile .active-underline {display:none} }
```

### D. Capabilities / pricing grid + capability modal
```css
@media (max-width:767px) { .pricing-section .container.with-top-padding {padding-top:0} }
@media (max-width:767px) { .pricing-section .container.with-top-padding .heading-wrapper {padding-top:100px;padding-bottom:0} }
@media (max-width:767px) { .pricing-section .content-grid .content-grid-item:last-child {padding-bottom:58px} }
@media (max-width:767px) { .pricing-section .content-grid-wrapper {padding-top:80px} }
@media (max-width:767px) { .pricing-section .content-grid-wrapper .content-grid {gap:48px} }
@media (max-width:767px) { .pricing-section .content-grid-item {padding-top:24px;padding-bottom:24px;gap:22px} }
@media (max-width:767px) { .pricing-section .content-grid-item:nth-child(3) {border-top:var(--border-line-width) solid var(--colors--light-300)!important;padding-top:48px!important} }
@media (max-width:767px) { .pricing-section .content-grid-item.no-bottom-border {border-right:0;padding-top:0;padding-bottom:0} }
.pricing-section .content-grid-item.no-y-border {padding-top:24px}
@media (max-width:767px) { .pricing-section .content-grid-item.no-y-border {padding-top:24px;padding-bottom:24px} }
@media (max-width:767px) { .pricing-section .content-grid-item.no-top-border {border-bottom:none} }
@media (max-width:767px) { .pricing-section .with-y-padding {padding-left:0;padding-right:0} }
.pricing-section .price-item {display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start;padding:30px}
@media (max-width:991px) { .pricing-section .price-item {padding:0 20px 20px} }
@media (max-width:767px) { .pricing-section .price-item {padding:0 10px 10px} }
.pricing-section .price-item .price-header {display:flex;flex-direction:column;gap:8px}
.pricing-section .price-item .price-label-wrapper {display:flex;align-items:flex-end;gap:8px}
.pricing-section .price-item .price-label-wrapper .price-label {color:var(--colors--light-100);font-family:var(--fonts-family--font-family-secondary);font-size:36px;font-weight:500;line-height:100%;letter-spacing:-.72px}
.pricing-section .price-item .price-label-wrapper .price-label-unit {color:var(--colors--light-100);font-family:var(--fonts-family--font-family-primary);font-size:18px;font-weight:450;line-height:normal;letter-spacing:-.36px}
.pricing-section .price-item.no-top-border {border-top:none}
.pricing-section .price-item.no-bottom-border {border-bottom:none}
.pricing-section .container.with-bottom-border,.with-bottom-border {border-bottom:var(--border-line-width) solid var(--colors--light-300)}
.content-grid-wrapper {display:flex;flex-flow:column;justify-content:flex-end;align-items:flex-end;padding-left:25%}
@media (max-width:991px) { .content-grid-wrapper {padding-left:0;padding-right:0} }
@media (max-width:767px) { .content-grid-wrapper {padding-left:10px;padding-right:10px} }
.content-grid-wrapper.with-y-padding {padding-top:100px;padding-bottom:100px}
@media (max-width:991px) { .content-grid-wrapper.with-y-padding {padding-left:0;padding-right:0} }
@media (max-width:767px) { .content-grid-wrapper.with-y-padding {padding-top:0;padding-bottom:0} }
.content-grid-wrapper.with-top-padding {padding-top:100px}
@media (max-width:767px) { .content-grid-wrapper.with-top-padding {padding-top:70px} }
.content-grid {width:100%;display:grid;grid-template-columns:repeat(2,1fr);grid-gap:0;gap:0}
@media (max-width:767px) { .content-grid {grid-template-columns:repeat(1,1fr)} }
.content-grid .content-grid-item {display:flex;flex-flow:column;gap:14px;padding:0 30px 30px;border:var(--border-line-width) solid var(--colors--light-300);border-right:none}
@media (max-width:991px) { .content-grid .content-grid-item {padding:0 20px 20px} }
@media (max-width:767px) { .content-grid .content-grid-item {padding:0 10px 10px;border:none;border-left:0} }
@media (max-width:767px) { .content-grid .content-grid-item:last-child {border-bottom:var(--border-line-width) solid var(--colors--light-300)} }
@media (max-width:767px) { .content-grid .content-grid-item:nth-child(2),.content-grid .content-grid-item:nth-child(4) {border-left:0} }
.content-grid .content-grid-item.no-bottom-border {border-bottom:none;padding-bottom:0;padding-top:60px}
@media (max-width:767px) { .content-grid .content-grid-item.no-bottom-border {padding-top:24px;padding-bottom:24px;border:none} }
.content-grid .content-grid-item.no-bottom-border:nth-child(3) {padding-bottom:40px}
@media (max-width:991px) { .content-grid .content-grid-item.no-bottom-border:nth-child(3) {border-left:0} }
@media (max-width:767px) { .content-grid .content-grid-item.no-bottom-border:nth-child(3) {padding-bottom:24px} }
.content-grid .content-grid-item.no-bottom-border:nth-child(4) {padding-bottom:40px}
@media (max-width:767px) { .content-grid .content-grid-item.no-bottom-border:nth-child(4) {padding-bottom:24px} }
.content-grid .content-grid-item.no-y-border {border-top:none;border-bottom:none;padding-top:0;padding-bottom:60px}
@media (max-width:767px) { .content-grid .content-grid-item.no-y-border {padding-top:24px;padding-bottom:24px;border:none} }
@media (max-width:767px) { .content-grid .content-grid-item.no-y-border:last-child {border-bottom:var(--border-line-width) solid var(--colors--light-300)} }
@media (max-width:991px) { .content-grid .content-grid-item.no-y-border:first-child {border-left:0} }
@media (max-width:767px) { .content-grid .content-grid-item.no-y-border:first-child {border:none} }
.content-grid .content-grid-item.with-top-padding {padding-top:60px;padding-bottom:60px}
@media (max-width:767px) { .content-grid .content-grid-item.with-top-padding {padding-top:24px;padding-bottom:24px} }
.content-grid .content-grid-item.with-top-padding:first-child,.content-grid .content-grid-item.with-top-padding:nth-child(2) {border-top:none}
.content-grid-wrapper .content-grid .content-grid-item p {max-width:42ch}
.capability-card {position:relative;overflow:visible}
.capability-card .capability-card-content {position:relative;height:100%;display:flex;flex-direction:column;justify-content:space-between}
.capability-card .capability-card-content.clickable {cursor:pointer;transition:opacity .2s ease}
.capability-card .capability-card-content.clickable:hover {opacity:.8}
.capability-card .capability-card-content.clickable:hover .text-book,.capability-card .capability-card-content.clickable:hover .text-number,.capability-card .capability-card-content.clickable:hover .text-reg {text-decoration:underline}
.capability-card .capability-card-modal-overlay {position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0);display:flex;align-items:center;justify-content:center;z-index:1000;animation:fadeIn .3s ease-out}
.capability-card .capability-card-modal-overlay .capability-card-modal-wrapper {position:relative}
.capability-card .capability-card-modal-overlay .capability-card-modal-wrapper .capability-card-modal {width:900px;height:700px;max-width:90vw;max-height:90vh;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:var(--border-line-width) solid var(--colors--light-300);border-radius:12px;position:relative;animation:modalSlideIn .3s ease-out,modalBackgroundFade .4s ease-out .2s forwards;transition:-webkit-backdrop-filter .3s ease;transition:backdrop-filter .3s ease;transition:backdrop-filter .3s ease,-webkit-backdrop-filter .3s ease}
.capability-card .capability-card-modal-overlay .capability-card-modal-wrapper .capability-card-modal .capability-card-modal-close {position:absolute;top:20px;right:20px;width:32px;height:32px;background:rgba(255,255,255,.1);border:none;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;color:rgba(255,255,255,.8);z-index:10;transition:all .2s ease}
.capability-card .capability-card-modal-overlay .capability-card-modal-wrapper .capability-card-modal .capability-card-modal-close:hover {background:rgba(255,255,255,.2);color:#fff}
.capability-card .capability-card-modal-overlay .capability-card-modal-wrapper .capability-card-modal .capability-card-modal-content {width:100%;height:100%;padding:50px 30px 30px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;overflow:auto}
.capability-card .capability-card-modal-overlay .capability-card-modal-wrapper .capability-card-modal .capability-card-modal-content>* {opacity:0;animation:contentFadeIn .2s ease-out .15s forwards}
.capability-card .capability-card-mobile-modal-overlay {position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0);display:flex;align-items:center;justify-content:center;z-index:1000;animation:fadeIn .3s ease-out}
.capability-card .capability-card-mobile-modal-overlay .capability-card-mobile-modal-wrapper {position:relative;margin:20px}
.capability-card .capability-card-mobile-modal-overlay .capability-card-mobile-modal-wrapper .capability-card-mobile-modal {width:100%;max-width:450px;height:550px;max-height:80vh;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:var(--border-line-width) solid var(--colors--light-300);border-radius:12px;position:relative;animation:modalSlideIn .3s ease-out,modalBackgroundFade .4s ease-out .2s forwards;transition:-webkit-backdrop-filter .3s ease;transition:backdrop-filter .3s ease;transition:backdrop-filter .3s ease,-webkit-backdrop-filter .3s ease}
.capability-card .capability-card-mobile-modal-overlay .capability-card-mobile-modal-wrapper .capability-card-mobile-modal .capability-card-modal-close {position:absolute;top:16px;right:16px;width:28px;height:28px;background:rgba(255,255,255,.1);border:none;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;color:rgba(255,255,255,.8);z-index:10;transition:all .2s ease}
.capability-card .capability-card-mobile-modal-overlay .capability-card-mobile-modal-wrapper .capability-card-mobile-modal .capability-card-modal-close:hover {background:rgba(255,255,255,.2);color:#fff}
.capability-card .capability-card-mobile-modal-overlay .capability-card-mobile-modal-wrapper .capability-card-mobile-modal .capability-card-modal-content {width:100%;height:100%;padding:45px 20px 20px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;overflow:auto}
.capability-card .capability-card-mobile-modal-overlay .capability-card-mobile-modal-wrapper .capability-card-mobile-modal .capability-card-modal-content>* {opacity:0;animation:contentFadeIn .2s ease-out .15s forwards}
@media (max-width:767px) { .capability-card .capability-card-modal-overlay {display:none!important} }
@media (min-width:768px) { .capability-card .capability-card-mobile-modal-overlay {display:none!important} }
.features-list-wrapper {display:flex;flex-direction:column;gap:24px}
.features-list-wrapper .features-list {display:flex;flex-direction:column;gap:12px;list-style:none;padding:0;margin:0}
.features-list-wrapper .features-list .features-list-item {display:flex;align-items:flex-start;gap:4px}
.features-list-wrapper .features-list .features-list-item p {max-width:36ch}
.features-list-wrapper .features-list .features-list-item svg {width:16px;height:16px;min-width:16px;color:var(--colors--light-300)}
.text-500 {font-weight:500}
.text-number {font-size:36px;letter-spacing:-.72px;color:var(--colors--light-100)}
.heading,.text-number {font-family:var(--fonts-family--font-family-secondary);font-weight:500;line-height:100%}
```

### E. How-to-raise sidebar section
```css
.how-to-raise-section .how-to-raise-wrapper {border-bottom:.5px solid var(--colors--light-300);grid-template-rows:auto;grid-template-columns:.5fr 1fr;grid-auto-columns:1fr;display:grid}
@media (max-width:1200px) { .how-to-raise-section .how-to-raise-wrapper {grid-template-columns:.35fr 1fr} }
@media (max-width:991px) { .how-to-raise-section .how-to-raise-wrapper {grid-template-columns:1fr} }
.how-to-raise-section .how-to-raise-wrapper .how-to-raise-header {max-width:38ch}
@media (max-width:991px) { .how-to-raise-section .how-to-raise-wrapper .how-to-raise-header {padding-left:20px;padding-right:20px} }
@media (max-width:767px) { .how-to-raise-section .how-to-raise-wrapper .how-to-raise-header {padding-left:10px;padding-right:10px;padding-top:0} }
.how-to-raise-section .how-to-raise-wrapper .how-to-raise-sidebar {position:relative;padding:300px 0}
@media (max-width:991px) { .how-to-raise-section .how-to-raise-wrapper .how-to-raise-sidebar {display:none} }
.how-to-raise-section .how-to-raise-wrapper .how-to-raise-sidebar .how-to-raise-sidebar-list {position:-webkit-sticky;position:sticky;top:300px;padding-left:30px;display:flex;flex-direction:column;gap:16px}
.how-to-raise-section .how-to-raise-wrapper .how-to-raise-sidebar .how-to-raise-sidebar-list li a {display:flex;align-items:center;gap:14px}
.how-to-raise-section .how-to-raise-wrapper .how-to-raise-sidebar .how-to-raise-sidebar-list li a:hover .text-light {color:var(--colors--light-200)}
.how-to-raise-section .how-to-raise-wrapper .how-to-raise-sidebar .how-to-raise-sidebar-list li a .text-light {transition:color .25s ease;color:var(--colors--light-300)}
.how-to-raise-section .how-to-raise-wrapper .how-to-raise-sidebar .how-to-raise-sidebar-list .sidebar-item-current .text-light {color:var(--colors--light-100)}
.how-to-raise-section .how-to-raise-wrapper .how-to-raise-content {display:flex;flex-direction:column;gap:40px}
.how-to-raise-section .how-to-raise-wrapper .how-to-raise-content .how-to-raise-steps {display:flex;flex-direction:column;gap:140px;border-left:var(--border-line-width) solid var(--colors--light-300)}
.how-to-raise-section .how-to-raise-wrapper .how-to-raise-content .how-to-raise-steps .how-to-raise-step:last-child .action-card {border-bottom:none}
.how-to-raise-section .how-to-raise-wrapper .how-to-raise-content .how-to-raise-steps .how-to-raise-step .action-card-ilu-wrapper {display:flex;justify-content:center;align-items:center}
.how-to-raise-section .how-to-raise-wrapper .how-to-raise-content .how-to-raise-steps .how-to-raise-step .action-card-content-ilu {max-width:440px;margin:auto}
@media (max-width:767px) { .how-to-raise-section .how-to-raise-wrapper .how-to-raise-content .how-to-raise-steps .how-to-raise-step .action-card-content-ilu {max-width:320px} }
@media (max-width:767px) { .how-to-raise-section .how-to-raise-wrapper .how-to-raise-content .how-to-raise-steps {gap:60px;border-left:none} }
.how-to-raise-section .action-card .action-card-ilu-wrapper {padding:30px}
@media (min-width:992px) { .how-to-raise-section .action-card .action-card-ilu-wrapper {height:600px} }
```

### F. Founder options overview
```css
.founder-options-overview {display:grid;box-sizing:border-box;grid-template-columns:.5fr 1fr;border-bottom:var(--border-line-width) solid var(--colors--light-300);min-height:500px;align-items:stretch}
@media (max-width:991px) { .founder-options-overview {grid-template-columns:1fr} }
.founder-options-overview-intro {box-sizing:border-box;display:flex;flex-direction:column;flex-shrink:0;border-right:var(--border-line-width) solid var(--colors--light-300);padding:0 30px;justify-content:center;align-items:flex-start;gap:21px}
@media (max-width:991px) { .founder-options-overview-intro {width:100%;border-right:none;border-bottom:var(--border-line-width) solid var(--colors--light-300);padding:40px 24px;gap:16px} }
@media (max-width:767px) { .founder-options-overview-intro {padding:32px 16px} }
.founder-options-overview-title {font-size:54px;line-height:100%;letter-spacing:-1.08px;color:var(--colors--light-100);white-space:pre-wrap;font-family:var(--fonts-family--font-family-secondary);font-weight:500}
@media (max-width:991px) { .founder-options-overview-title {font-size:var(--fonts-sizes--text-4xl)} }
@media (max-width:767px) { .founder-options-overview-title {font-size:var(--fonts-sizes--text-3xl);letter-spacing:-.72px} }
.founder-options-overview-description {font-size:var(--fonts-sizes--text-sm);line-height:1.5;color:var(--colors--light-200);white-space:pre-wrap}
.founder-options-overview-button {align-self:flex-start}
.founder-options-overview-options {display:flex;flex:1 1;min-width:0}
@media (max-width:991px) { .founder-options-overview-options {flex-direction:column} }
.option-card {flex:1 0;position:relative;border-right:var(--border-line-width) solid var(--colors--light-300);padding:180px 24px 0;overflow:hidden}
@media (max-width:991px) { .option-card {border-right:none;border-bottom:var(--border-line-width) solid var(--colors--light-300);padding:40px 24px;min-height:auto} }
@media (max-width:767px) { .option-card {padding:32px 16px} }
.option-card:last-child {border-right:none}
@media (max-width:991px) { .option-card:last-child {border-bottom:none} }
.option-card-highlighted {background-color:rgba(84,137,93,.16)}
.option-header {display:flex;gap:16px;align-items:center;position:absolute;top:110.5px;left:24px}
@media (max-width:991px) { .option-header {position:static;margin-bottom:16px} }
.option-label {color:var(--colors--light-100);opacity:.8;font-size:var(--fonts-sizes--text-xs);text-transform:uppercase;line-height:100%;font-family:var(--fonts-family--font-family-tertiary)}
.option-card-highlighted .option-label {opacity:1}
.option-badge {background-color:var(--colors--light-100);padding:8px 16px;position:relative;display:flex;align-items:center;justify-content:center}
.option-badge-text {color:var(--colors--green);font-size:8px;text-transform:uppercase;line-height:100%;font-family:var(--fonts-family--font-family-tertiary)}
.option-content {display:flex;flex-direction:column;gap:8px;color:var(--colors--light-100);white-space:pre-wrap;max-width:272px}
@media (max-width:991px) { .option-content {max-width:100%} }
.option-card:not(.option-card-highlighted) .option-content {opacity:.8}
.option-title {font-size:18px;line-height:100%;letter-spacing:-.36px;color:var(--colors--light-100);margin:0;font-family:var(--fonts-family--font-family-primary);font-weight:400}
.option-description,.option-subtitle {font-size:var(--fonts-sizes--text-sm);line-height:1.5;color:var(--colors--light-100);font-family:var(--fonts-family--font-family-primary);font-weight:400}
```

### G. Comparison table
```css
.comparision-table {--border:var(--border-line-width) solid var(--colors--light-300);position:relative;width:100%;border-bottom:var(--border);padding-top:100px;box-sizing:border-box}
@media (max-width:991px) { .comparision-table {padding:32px 24px 120px} }
@media (max-width:767px) { .comparision-table {padding:0} }
.comparision-table-header {display:flex;flex-direction:column;align-items:flex-start;gap:21px;padding:80px 30px 40px;max-width:40%}
@media (max-width:991px) { .comparision-table-header {max-width:100%;padding:32px 16px} }
.comparision-table-title {font-family:var(--fonts-family--font-family-secondary);font-size:54px;font-weight:500;line-height:1;letter-spacing:-1.08px;color:var(--colors--light-100);margin:0}
@media (max-width:991px) { .comparision-table-title {font-size:42px;letter-spacing:-.84px} }
@media (max-width:767px) { .comparision-table-title {font-size:32px;letter-spacing:-.64px} }
.comparision-table-description {font-family:var(--fonts-family--font-family-primary);font-size:14px;line-height:1.5;color:var(--colors--light-200);margin:0}
.comparision-table-download-button .button-wrapper {border-color:var(--colors--light-300);background-color:rgba(0,0,0,0)}
@media (max-width:767px) { .comparision-table-download-button .button-wrapper {height:auto;min-height:36px} }
@media (max-width:767px) { .comparision-table-download-button .button {font-size:10px;padding:8px 12px;white-space:normal;text-align:center} }
.comparision-table-table-wrapper {display:flex;justify-content:flex-end;padding-left:25%;position:relative}
@media (max-width:991px) { .comparision-table-table-wrapper {margin-left:0;margin-top:0;padding-left:0} }
.comparision-table-table-content {width:100%;max-width:1161px;display:flex;flex-direction:column;gap:12px}
.comparision-table-table-scroll {width:100%;--fade:64px}
.comparision-table-table {display:flex;width:100%;max-width:1161px}
@media (min-width:1024px) { .comparision-table-table {margin-top:-60px} }
@media (max-width:991px) { .comparision-table-table {max-width:none} }
.comparision-table-column {max-width:240px;display:flex;flex-direction:column;flex:1 0}
@media (max-width:991px) { .comparision-table-column {flex:0 0 200px;max-width:none} }
@media (max-width:767px) { .comparision-table-column {flex:0 0 160px} }
.comparision-table-column:last-child,.comparision-table-column:last-child .comparision-table-cell {border-right:none}
.comparision-table-column-features {min-width:240px;max-width:100%}
@media (max-width:991px) { .comparision-table-column-features .comparision-table-cell-feature.comparision-table-cell-feature {border-left:none} }
.comparision-table-column-features:first-child .comparision-table-cell-header {border-right:none}
.comparision-table-column-features .comparision-table-cell-feature {border-left:var(--border)}
@media (max-width:991px) { .comparision-table-column-features {min-width:200px} }
@media (max-width:767px) { .comparision-table-column-features {min-width:140px} }
.comparision-table-cell {display:flex;align-items:center;justify-content:center;min-height:88px;padding:0 32px;border-top:var(--border);border-right:var(--border);position:relative}
@media (max-width:991px) { .comparision-table-cell {padding:24px 26px;min-height:84px} }
@media (max-width:767px) { .comparision-table-cell {padding:16px;min-height:68px} }
@media (max-width:991px) { .comparision-table-table-content {max-width:none} }
@media (max-width:991px) { .comparision-table-table-scroll {overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:thin;scrollbar-color:rgba(228,234,200,.35) rgba(0,0,0,0)} }
@media (max-width:991px) { .comparision-table-table-scroll::-webkit-scrollbar {height:6px} }
@media (max-width:991px) { .comparision-table-table-scroll::-webkit-scrollbar-track {background:rgba(0,0,0,0)} }
@media (max-width:991px) { .comparision-table-table-scroll::-webkit-scrollbar-thumb {background-color:rgba(228,234,200,.35);border-radius:999px} }
.comparision-table-cell-header {border-top:none;padding:0 32px}
@media (max-width:991px) { .comparision-table-cell-header {padding:24px 26px} }
@media (max-width:767px) { .comparision-table-cell-header {padding:14px 12px;min-height:68px} }
.comparision-table-cell-feature {justify-content:flex-start;text-align:left}
.comparision-table-cell-alt-bg {background-color:rgba(54,101,62,.16)}
.comparision-table-feature-text,.comparision-table-header-text {font-family:var(--fonts-family--font-family-primary);font-size:18px;font-weight:400;line-height:normal;letter-spacing:-.36px;color:var(--colors--light-100);margin:0}
@media (max-width:767px) { .comparision-table-feature-text,.comparision-table-header-text {font-size:12px;letter-spacing:-.24px;line-height:1.3} }
.comparision-table-text-value {font-family:var(--fonts-family--font-family-primary);font-size:12px;font-weight:400;line-height:1.2;letter-spacing:-.28px;color:var(--colors--light-100);margin:0}
@media (max-width:767px) { .comparision-table-text-value {font-size:10px;letter-spacing:-.22px;line-height:1.3} }
.comparision-table-icon-wrapper {display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;flex-shrink:0}
@media (max-width:767px) { .comparision-table-icon-wrapper {width:24px;height:24px;border-radius:6px} }
@media (max-width:767px) { .comparision-table-icon-wrapper>svg {width:12px;height:12px} }
.comparision-table-icon-wrapper-check {background-color:var(--colors--light-100);box-shadow:0 58.904px 82.672px 0 rgba(28,75,36,.4),0 24.609px 34.538px 0 rgba(28,75,36,.29),0 13.157px 18.466px 0 rgba(28,75,36,.24),0 7.376px 10.352px 0 rgba(28,75,36,.2),0 3.917px 5.498px 0 rgba(28,75,36,.16),0 1.63px 2.288px 0 rgba(28,75,36,.11)}
.comparision-table-icon-wrapper-check svg {color:var(--colors--green);stroke-width:2}
.comparision-table-icon-wrapper-cross {background-color:rgba(84,137,93,.16)}
.comparision-table-icon-wrapper-cross svg {color:var(--colors--light-300)}
.fade-right {mask-image:linear-gradient(to left,transparent 0,#000 var(--fade));-webkit-mask-image:linear-gradient(to left,transparent 0,#000 var(--fade))}
.fade-right,.fade-x {--fade:80px;overflow:auto}
```

### H. Clean cap table illustrated + comparison panels
```css
.ruv-comparision-illustrated {display:flex;border-bottom:var(--border-line-width) solid var(--colors--light-300);min-height:500px;align-items:stretch;box-sizing:border-box}
@media (max-width:991px) { .ruv-comparision-illustrated {flex-direction:column;min-height:auto} }
.ruv-comparision-illustrated-intro {display:flex;flex-direction:column;gap:21px;width:30%;flex-shrink:0;padding:0 40px;justify-content:center;align-items:flex-start;box-sizing:border-box}
@media (max-width:991px) { .ruv-comparision-illustrated-intro {width:100%;border-bottom:var(--border-line-width) solid var(--colors--light-300);padding:40px 24px;gap:16px} }
@media (max-width:767px) { .ruv-comparision-illustrated-intro {padding:32px 16px} }
.ruv-comparision-illustrated-title {font-size:54px;line-height:100%;color:var(--colors--light-100);white-space:pre-wrap;font-weight:500}
@media (max-width:991px) { .ruv-comparision-illustrated-title {font-size:var(--fonts-sizes--text-4xl)} }
@media (max-width:767px) { .ruv-comparision-illustrated-title {font-size:var(--fonts-sizes--text-3xl);letter-spacing:-.72px} }
.ruv-comparision-illustrated-description {font-size:var(--fonts-sizes--text-sm);line-height:1.5;color:var(--colors--light-200);white-space:pre-wrap}
.ruv-comparision-illustrated-button {align-self:flex-start}
.ruv-comparision-illustrated-visual {box-sizing:border-box;display:flex;flex:1 1;min-width:0;padding:100px 32px;gap:var(--spacing-md)}
@media (max-width:991px) { .ruv-comparision-illustrated-visual {flex-direction:column;gap:0;padding:16px 16px 0} }
.comparison-panel {box-sizing:border-box;flex:1 0;display:flex;flex-direction:column;gap:var(--spacing-md);background-color:rgba(84,137,93,.16);padding:32px 40px;min-height:100%}
@media (max-width:991px) { .comparison-panel {margin-bottom:16px;padding:40px 24px;min-height:auto} }
@media (max-width:991px) { .comparison-panel:last-child {border-bottom:none} }
@media (max-width:767px) { .comparison-panel {padding:32px 16px} }
.comparison-panel-header {display:flex;flex-direction:column;gap:var(--spacing-xs)}
.comparison-panel-title {font-size:18px;line-height:100%;letter-spacing:-.36px;color:var(--colors--light-100);font-family:var(--fonts-family--font-family-primary);font-weight:400}
.comparison-panel-subtitle {font-size:var(--fonts-sizes--text-sm);line-height:1.5;color:var(--colors--light-100);white-space:pre-wrap}
.comparison-panel-content {display:flex;flex-direction:column;gap:var(--spacing-xs)}
.comparison-panel-content-nested {position:relative}
.comparison-panel-content svg {width:100%;height:auto}
```

### I. RUV facts CTA
```css
.ruv-facts-cta {box-sizing:border-box;padding:80px 40px;display:flex;align-items:flex-end;justify-content:center;width:100%}
@media (max-width:991px) { .ruv-facts-cta {padding:60px 24px} }
@media (max-width:767px) { .ruv-facts-cta {padding:48px 16px} }
.ruv-facts-cta-container {display:flex;flex-direction:column;gap:48px;align-items:center;max-width:700px;width:100%}
@media (max-width:767px) { .ruv-facts-cta-container {gap:32px} }
.ruv-facts-cta-content {display:flex;flex-direction:column;gap:48px;align-items:center;width:100%}
@media (max-width:767px) { .ruv-facts-cta-content {gap:32px} }
.ruv-facts-cta-header {display:flex;flex-direction:column;gap:32px;align-items:flex-start;width:100%}
@media (max-width:767px) { .ruv-facts-cta-header {gap:24px} }
.ruv-facts-cta-heading {font-family:var(--fonts-family--font-family-secondary);font-size:32px;line-height:1;color:var(--colors--light-100);text-align:center;letter-spacing:-.64px;width:100%;margin:0;white-space:pre-wrap}
@media (max-width:767px) { .ruv-facts-cta-heading {font-size:var(--fonts-sizes--text-2xl);letter-spacing:-.48px} }
.ruv-facts-cta-stats {display:flex;gap:24px;width:100%;height:130px;justify-content:center}
@media (max-width:767px) { .ruv-facts-cta-stats {flex-direction:column;height:auto;gap:16px} }
.ruv-facts-cta-stat-card {flex:1 0;background:rgba(84,137,93,.16);box-sizing:border-box;display:flex;flex-direction:column;gap:8px;align-items:center;justify-content:center;padding:16px 24px;height:100%}
@media (max-width:767px) { .ruv-facts-cta-stat-card {height:auto;min-height:100px} }
.ruv-facts-cta-stat-value {font-family:var(--fonts-family--font-family-primary);font-size:40px;line-height:1.5;color:var(--colors--light-100);margin:0;text-align:center}
@media (max-width:767px) { .ruv-facts-cta-stat-value {font-size:32px} }
.ruv-facts-cta-stat-label {font-family:var(--fonts-family--font-family-tertiary);font-size:var(--fonts-sizes--text-xs);line-height:normal;color:var(--colors--light-300);text-transform:uppercase;margin:0;text-align:center}
.ruv-facts-cta-companies {position:relative;width:100%;height:72px}
@media (max-width:767px) { .ruv-facts-cta-companies {height:auto;min-height:72px} }
.ruv-facts-cta-companies-label {position:absolute;top:6px;left:50%;transform:translateX(-50%) translateY(-50%);font-family:var(--fonts-family--font-family-tertiary);font-size:var(--fonts-sizes--text-xs);line-height:0;color:var(--colors--light-300);text-transform:uppercase;white-space:pre-wrap;margin:0;width:159px;text-align:center}
@media (max-width:767px) { .ruv-facts-cta-companies-label {position:static;transform:none;margin-bottom:12px;width:100%} }
.ruv-facts-cta-companies-list {position:absolute;top:12px;left:0;display:flex;gap:8px;align-items:center;justify-content:center;width:100%;scrollbar-width:none;-ms-overflow-style:none}
.ruv-facts-cta-companies-list::-webkit-scrollbar {display:none}
@media (max-width:767px) { .ruv-facts-cta-companies-list {position:static;margin-top:12px} }
@media (max-width:767px) { .ruv-facts-cta-companies-list :nth-child(n+4) {display:none} }
.ruv-facts-cta-company-logo {box-sizing:border-box;display:flex;flex-direction:column;gap:10px;align-items:center;justify-content:center;height:60px;padding:0 8px}
.ruv-facts-cta-company-logo-img {height:100%;width:auto;max-width:100px;object-fit:contain;filter:brightness(0) saturate(100%) invert(92%) sepia(8%) saturate(400%) hue-rotate(40deg) brightness(98%) contrast(88%)}
.ruv-facts-cta-button-wrapper {position:relative}
.ruv-facts-cta-button-wrapper:after {content:"";position:absolute;inset:-.5px;pointer-events:none;box-shadow:inset 0 0 0 1px var(--colors--green);border-radius:5px}
@media (max-width:767px) { .ruv-facts-cta-button-wrapper,.ruv-facts-cta-button-wrapper .ruv-facts-cta-button {width:100%} }
```

### J. Cost comparison calculator
```css
.cost-comparision-calculator {position:relative;width:100%;padding:100px 40px;border-bottom:var(--border-line-width) solid var(--colors--light-300);border-top:var(--border-line-width) solid var(--colors--light-300);box-sizing:border-box}
@media (max-width:991px) { .cost-comparision-calculator {padding:32px 24px} }
@media (max-width:767px) { .cost-comparision-calculator {padding:24px 16px} }
.cost-comparision-calculator-content {display:flex;flex-direction:column;gap:40px;max-width:100%}
.cost-comparision-calculator-header {display:flex;flex-direction:column;gap:21px;max-width:550px}
.cost-comparision-calculator-title {font-family:var(--fonts-family--font-family-secondary);font-size:54px;font-weight:500;line-height:1;letter-spacing:-1.08px;color:var(--colors--light-100);margin:0}
@media (max-width:991px) { .cost-comparision-calculator-title {font-size:42px;letter-spacing:-.84px} }
@media (max-width:767px) { .cost-comparision-calculator-title {font-size:32px;letter-spacing:-.64px} }
.cost-comparision-calculator-description {font-family:var(--fonts-family--font-family-primary);font-size:14px;line-height:1.5;color:var(--colors--light-200);margin:0}
.cost-comparision-calculator-inputs {display:flex;gap:16px;width:100%}
@media (max-width:767px) { .cost-comparision-calculator-inputs {flex-direction:column} }
.cost-comparision-calculator-input-group {display:flex;flex-direction:column;gap:8px;flex:1 0;min-width:0}
@media (max-width:767px) { .cost-comparision-calculator-input-group:nth-child(4) {display:none} }
.cost-comparision-calculator-label {color:var(--colors--light-200);margin:0}
.cost-comparision-calculator-input,.cost-comparision-calculator-label {font-family:var(--fonts-family--font-family-primary);font-size:14px;line-height:1.5}
.cost-comparision-calculator-input {width:100%;padding:12px 16px;border:var(--border-line-width) solid rgba(228,234,200,.24);border-radius:4px;background:rgba(0,0,0,0);color:rgba(209,219,185,.64);box-sizing:border-box;transition:border-color .2s ease}
.cost-comparision-calculator-input:focus {outline:none;border-color:var(--colors--light-300);color:var(--colors--light-100)}
.cost-comparision-calculator-input::placeholder {color:rgba(209,219,185,.64)}
.cost-comparision-calculator-advanced {display:flex;flex-direction:column;gap:16px;width:100%}
.cost-comparision-calculator-advanced-header {display:flex;align-items:flex-start;justify-content:space-between;width:100%;gap:16px}
@media (max-width:767px) { .cost-comparision-calculator-advanced-header {flex-direction:column;gap:12px} }
.cost-comparision-calculator-advanced-title-wrapper {display:flex;flex-direction:column;gap:16px;max-width:550px}
.cost-comparision-calculator-advanced-title {font-family:var(--fonts-family--font-family-secondary);font-size:32px;font-weight:500;line-height:1;letter-spacing:-.64px;color:var(--colors--light-100);margin:0}
@media (max-width:767px) { .cost-comparision-calculator-advanced-title {font-size:24px;letter-spacing:-.48px} }
.cost-comparision-calculator-advanced-description {font-family:var(--fonts-family--font-family-primary);font-size:14px;line-height:1.5;color:var(--colors--light-200);margin:0}
.cost-comparision-calculator-toggle {position:relative;width:51px;height:31px;border-radius:16px;border:none;background:rgba(84,137,93,.24);cursor:pointer;padding:0;flex-shrink:0;transition:background-color .2s ease}
.cost-comparision-calculator-toggle-active {background:rgba(84,137,93,.24)}
.cost-comparision-calculator-toggle-knob {position:absolute;top:2px;left:2px;width:27px;height:27px;background:#54895d;border-radius:16px;box-shadow:0 3px 7px 0 rgba(0,0,0,.12);transition:transform .2s ease}
.cost-comparision-calculator-toggle-active .cost-comparision-calculator-toggle-knob {transform:translateX(20px)}
.cost-comparision-calculator-advanced-content {display:flex;flex-direction:column;gap:8px;width:100%}
.cost-comparision-calculator-scenario-row {display:flex;gap:16px;align-items:flex-start;width:100%}
@media (max-width:767px) { .cost-comparision-calculator-scenario-row {flex-direction:column;align-items:stretch} }
.cost-comparision-calculator-scenario-row-primary {padding-top:24px;border-top:var(--border-line-width) solid rgba(228,234,200,.24)}
.cost-comparision-calculator-scenario-group {display:flex;flex-direction:column;gap:8px;flex:1 0;min-width:0}
.cost-comparision-calculator-scenario-description {font-family:var(--fonts-family--font-family-primary);font-size:12px;line-height:1.5;color:rgba(209,219,185,.64);margin:0}
.cost-comparision-calculator-dropdown-wrapper {position:relative;width:100%}
.cost-comparision-calculator-dropdown-trigger {display:flex;align-items:center;gap:10px;width:100%;padding:12px 16px;border:var(--border-line-width) solid rgba(228,234,200,.24);border-radius:4px;background:rgba(0,0,0,0);cursor:pointer;box-sizing:border-box;transition:border-color .2s ease}
.cost-comparision-calculator-dropdown-trigger:hover {border-color:var(--colors--light-300)}
.cost-comparision-calculator-dropdown-trigger:focus {outline:none;border-color:var(--colors--light-300)}
.cost-comparision-calculator-dropdown-trigger-open .cost-comparision-calculator-dropdown-arrow {transform:rotate(180deg)}
.cost-comparision-calculator-dropdown-value {flex:1 0;font-family:var(--fonts-family--font-family-primary);font-size:14px;line-height:1.5;color:rgba(209,219,185,.64);text-align:left}
.cost-comparision-calculator-dropdown-arrow {display:flex;align-items:center;justify-content:center;width:20px;height:20px;flex-shrink:0;color:rgba(209,219,185,.64);transition:transform .2s ease}
.cost-comparision-calculator-dropdown-menu {position:absolute;top:calc(100% + 4px);left:0;right:0;background:rgba(41,93,50,.95);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:var(--border-line-width) solid var(--colors--light-300);border-radius:4px;box-shadow:0 4px 24px rgba(0,0,0,.12);z-index:100;overflow:hidden;display:flex;flex-direction:column}
.cost-comparision-calculator-dropdown-item {padding:12px 16px;border:none;background:rgba(0,0,0,0);font-family:var(--fonts-family--font-family-primary);font-size:14px;line-height:1.5;color:var(--colors--light-100);text-align:left;cursor:pointer;transition:background-color .2s ease}
.cost-comparision-calculator-dropdown-item:hover {background:rgba(255,255,255,.1)}
.cost-comparision-calculator-dropdown-item-active {background:rgba(255,255,255,.15)}
.cost-comparision-calculator-actions {display:flex;gap:16px;align-items:flex-start;flex-wrap:wrap;padding-top:29px;margin-top:5px}
@media (max-width:767px) { .cost-comparision-calculator-actions {flex-direction:column;width:100%;padding-top:0} }
@media (max-width:767px) { .cost-comparision-calculator-actions .button-wrapper,.cost-comparision-calculator-actions .button-wrapper button {width:100%} }
.cost-comparision-calculator-calculate-button .button-wrapper,.cost-comparision-calculator-reset-button .button-wrapper {height:32px}
.cost-comparision-calculator-calculate-button .button,.cost-comparision-calculator-reset-button .button {height:32px;padding:12px 16px;font-size:12px}
.cost-comparision-calculator-calculate-button .button-wrapper,.cost-comparision-calculator-reset-button .button-wrapper {min-width:120px}
.cost-comparision-calculator-advanced-grid {display:grid;width:100%;grid-template-columns:repeat(3,minmax(0,1fr));grid-gap:16px;gap:16px;margin-top:16px}
@media (max-width:991px) { .cost-comparision-calculator-advanced-grid {grid-template-columns:repeat(2,minmax(0,1fr))} }
@media (max-width:767px) { .cost-comparision-calculator-advanced-grid {grid-template-columns:1fr} }
.cost-comparision-calculator-results {box-sizing:border-box;display:flex;flex-direction:column;gap:0;width:100%;padding:32px;border:var(--border-line-width) solid rgba(228,234,200,.24);border-radius:12px;background:rgba(41,93,50,.32);box-shadow:0 20px 40px rgba(0,0,0,.16)}
@media (max-width:767px) { .cost-comparision-calculator-results {padding:24px 16px} }
.cost-comparision-calculator-results-table-header {display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,1fr);width:100%;height:80px;align-items:center;border-bottom:var(--border-line-width) solid rgba(228,234,200,.24);grid-gap:16px;gap:16px}
@media (max-width:991px) { .cost-comparision-calculator-results-table-header {grid-template-columns:1fr;height:auto} }
.cost-comparision-calculator-results-table-header-values {display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-gap:12px;gap:12px;font-family:var(--fonts-family--font-family-primary);font-size:12px;text-transform:uppercase;letter-spacing:.48px;color:rgba(209,219,185,.72);text-align:center;align-items:center;justify-content:center;height:100%}
.cost-comparision-calculator-results-table-header-values span {display:inline-flex;align-items:center;justify-content:center;height:100%}
.cost-comparision-calculator-results-table-header-values span:last-child {background:rgba(255,255,255,.05);border-radius:8px 8px 0 0}
@media (max-width:991px) { .cost-comparision-calculator-results-table-header-values {display:none} }
.cost-comparision-calculator-results-table {display:flex;flex-direction:column;width:100%}
.cost-comparision-calculator-results-row {display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,1fr);grid-gap:16px;gap:16px;height:80px;align-items:center;border-bottom:var(--border-line-width) solid rgba(228,234,200,.12)}
@media (max-width:991px) { .cost-comparision-calculator-results-row {grid-template-columns:1fr;height:auto;padding:20px 0} }
.cost-comparision-calculator-results-row-highlight {border-bottom-color:rgba(228,234,200,.32)}
.cost-comparision-calculator-results-row-info {display:flex;flex-direction:column;gap:4px}
.cost-comparision-calculator-results-row-title {font-family:var(--fonts-family--font-family-secondary);font-size:18px;font-weight:500;line-height:1.2;color:var(--colors--light-100);margin:0}
.cost-comparision-calculator-results-row-helper {font-family:var(--fonts-family--font-family-primary);font-size:13px;line-height:1.4;color:rgba(209,219,185,.64);margin:0}
.cost-comparision-calculator-results-values {display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-gap:12px;gap:12px;height:100%}
@media (max-width:991px) { .cost-comparision-calculator-results-values {grid-template-columns:1fr;border-top:var(--border-line-width) solid rgba(228,234,200,.12);padding-top:16px;height:auto} }
.cost-comparision-calculator-results-value {display:flex;flex-direction:column;gap:4px;align-items:center;justify-content:center;text-align:center;height:100%;padding:0 8px}
@media (max-width:767px) { .cost-comparision-calculator-results-value {background:rgba(0,0,0,0);padding:0;align-items:flex-start;justify-content:flex-start;text-align:left;gap:2px} }
.cost-comparision-calculator-results-value-savings {background:rgba(255,255,255,.05)}
@media (max-width:767px) { .cost-comparision-calculator-results-value-savings {background:rgba(0,0,0,0)} }
.cost-comparision-calculator-results-value-label {font-family:var(--fonts-family--font-family-primary);font-size:12px;text-transform:uppercase;letter-spacing:.48px;color:rgba(209,219,185,.72)}
@media (min-width:992px) { .cost-comparision-calculator-results-value-label {display:none} }
.cost-comparision-calculator-results-value-amount {font-family:var(--fonts-family--font-family-secondary);font-size:18px;font-weight:500;color:var(--colors--light-100)}
@media (max-width:767px) { .cost-comparision-calculator-results-value-amount {font-size:16px} }
.cost-comparision-calculator-results-row-highlight .cost-comparision-calculator-results-value-amount {font-size:32px;letter-spacing:-.64px}
@media (max-width:767px) { .cost-comparision-calculator-results-row-highlight .cost-comparision-calculator-results-value-amount {font-size:24px} }
.cost-comparision-calculator-terms {max-width:720px;scroll-margin-top:96px;font-family:var(--fonts-family--font-family-primary);font-size:12px;line-height:1.5;color:rgba(209,219,185,.64);margin:-16px 0 0}
@media (max-width:767px) { .cost-comparision-calculator-terms {margin-top:-8px} }
```

### K. Calculator hero
```css
.ruv-calculator-hero {box-sizing:border-box;display:flex;flex-direction:column;align-items:center;gap:24px;width:100%;padding:104px 40px 88px;text-align:center}
@media (max-width:991px) { .ruv-calculator-hero {padding:80px 24px 64px} }
@media (max-width:767px) { .ruv-calculator-hero {align-items:flex-start;padding:56px 16px 48px;text-align:left} }
.ruv-calculator-hero-eyebrow {font-family:var(--fonts-family--font-family-primary);font-size:var(--fonts-sizes--text-sm);line-height:1.5;color:var(--colors--light-300);margin:0}
.ruv-calculator-hero-title {max-width:840px;font-family:var(--fonts-family--font-family-secondary);font-size:72px;font-weight:500;line-height:.95;color:var(--colors--light-100);margin:0}
@media (max-width:991px) { .ruv-calculator-hero-title {font-size:54px} }
@media (max-width:767px) { .ruv-calculator-hero-title {font-size:var(--fonts-sizes--text-4xl)} }
.ruv-calculator-hero-description {max-width:720px;font-family:var(--fonts-family--font-family-primary);font-size:var(--fonts-sizes--text-lg);line-height:1.55;color:var(--colors--light-200);margin:0}
.ruv-calculator-hero-description a {color:var(--colors--light-100);text-decoration:underline;text-underline-offset:4px}
@media (max-width:767px) { .ruv-calculator-hero-description {font-size:var(--fonts-sizes--text-base)} }
```

### L. Stories grid
```css
.grid-item-border {border:.5px solid var(--colors--light-300);border-right:none;margin-bottom:-.5px;margin-left:-.5px}
.stories-grid .container {border-top:none}
@media (max-width:767px) { .stories-grid .container {padding:0} }
.stories-grid .heading-wrapper {display:flex;flex-direction:column;gap:16px;justify-content:center;align-items:center}
@media (max-width:767px) { .stories-grid .heading-wrapper {align-items:flex-start;padding:30px} }
.stories-grid .heading-wrapper .heading {max-width:800px}
@media (max-width:767px) { .stories-grid .heading-wrapper .heading {text-align:left} }
.stories-grid .heading-wrapper .description {text-align:center;max-width:800px}
@media (max-width:767px) { .stories-grid .heading-wrapper .description {text-align:left} }
.stories-grid .stories {display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(2,1fr);grid-gap:0;gap:0}
@media (max-width:1024px) { .stories-grid .stories {grid-template-columns:repeat(2,1fr);grid-template-rows:repeat(1,1fr);padding:0} }
.stories-grid .story-card {box-sizing:border-box;padding:32px;position:relative;min-height:400px;border-top:none}
@media (max-width:1024px) { .stories-grid .story-card {padding:16px;min-height:320px} }
.stories-grid .story-card .logo {max-height:32px;max-width:100%}
@media (max-width:767px) { .stories-grid .story-card .logo {max-height:24px} }
.stories-grid .story-card .logo svg {width:auto;height:100%;max-width:100%}
.stories-grid .story-card.lg {grid-column:span 2/span 2}
.stories-grid .story-card.xl {grid-column:span 2/span 2;grid-row:span 2/span 2;min-height:450px}
.stories-grid .story-card .content {position:relative;z-index:1;display:flex;flex-direction:column;justify-content:flex-end;height:100%;gap:24px}
@media (max-width:767px) { .stories-grid .story-card .content {gap:16px} }
.stories-grid .story-card .quote {margin-top:auto;width:100%;color:var(--Light-100,#e4eac8);font-size:var(--fonts-sizes--text-2xl);font-weight:400;line-height:1.2;word-wrap:break-word;padding-top:24px}
@media (max-width:767px) { .stories-grid .story-card .quote {font-size:var(--fonts-sizes--text-xl)} }
.stories-grid .story-card.sm .quote {font-size:var(--fonts-sizes--text-xl)}
@media (max-width:767px) { .stories-grid .story-card.sm .quote {font-size:var(--fonts-sizes--text-sm)} }
@media (max-width:767px) { .stories-grid .story-card.sm .author {font-size:var(--fonts-sizes--text-xs)} }
.stories-grid .story-card .author {width:100%;color:var(--colors--light-200);font-size:var(--fonts-sizes--text-sm);font-weight:400;word-wrap:break-word}
.stories-grid .story-card .background-image {inset:0;position:absolute;width:100%;height:100%;opacity:.3;overflow:hidden}
.stories-grid .story-card .background-image img {width:100%;height:100%;object-fit:cover;object-position:center}
```

### M. Keyframes used by these pages
```css
@keyframes fadeIn{0%{opacity:0}to{opacity:1}}
@keyframes modalSlideIn{0%{opacity:0;transform:scale(.9) translateY(-20px)}to{opacity:1;transform:scale(1) translateY(0)}}
@keyframes modalBackgroundFade{0%{background-color:rgba(45,86,54,.95)}to{background-color:rgba(0,0,0,0)!important}}
@keyframes contentFadeIn{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
```
