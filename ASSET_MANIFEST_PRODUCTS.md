Source: https://rollups.com/ruv

# Asset manifest: product pages (/ruv, /ruv/calculator, /safe, /how-to-raise-capital, /consolidate)

This covers only assets that were NOT already in `public/`. For shared assets (fonts, grain, company-grid logos, in-action-1/5 images, trusted logos, hero/product Lotties, button and learn-more arrows, chatgpt/claude icons) see `ASSET_MANIFEST.md`.

Downloaded 2026-09-30 with curl. Every file returned HTTP 200. Dimensions are the intrinsic pixel size.

## Raster images: `public/assets/pages/`

| Live URL | Local path | Size | Used on |
|---|---|---|---|
| https://rollups.com/_next/static/media/2.a74381c0.png | public/assets/pages/2.a74381c0.png | 1014x771 | /ruv use case 2 "Raise international RUVs" ActionCard image (desktop, >767) |
| https://rollups.com/_next/static/media/2-mobile.4f01ba0f.png | public/assets/pages/2-mobile.4f01ba0f.png | 534x342 | same card when `innerWidth <= 767` |
| https://rollups.com/_next/static/media/investorexp.50e999a3.png | public/assets/pages/investorexp.50e999a3.png | 3264x1440 | Capability modal "Trusted investor experience" (/ruv capability 01*, /ruv "private investment page" link, /consolidate capability 01*) |
| https://rollups.com/_next/static/media/sendlinks.930f37c8.png | public/assets/pages/sendlinks.930f37c8.png | 1248x1248 | Capability modal "Create custom investor invite links" (/ruv capability 05*, /safe capability 04) |
| https://rollups.com/_next/static/media/acquisition.3549754c.png | public/assets/pages/acquisition.3549754c.png | 870x486 | /consolidate use case 2 "Simplify acquisitions" (desktop) |
| https://rollups.com/_next/static/media/acquisition-mobile2.d29c06e8.png | public/assets/pages/acquisition-mobile2.d29c06e8.png | 698x606 | same, `<= 767` |
| https://rollups.com/_next/static/media/in-action-1-mobile.b221d009.png | public/assets/pages/in-action-1-mobile.b221d009.png | 633x456 | /consolidate use case 1 "Clean up stakeholders", `<= 767` (desktop uses the existing public/assets/in-action-1.80dd0b92.png) |
| https://rollups.com/_next/static/media/create-round-safe-2.a80fc0c8.png | public/assets/pages/create-round-safe-2.a80fc0c8.png | 1280x1064 | /safe card "SAFEs, on your terms" |
| https://rollups.com/_next/static/media/sign-safe.7c6f010b.png | public/assets/pages/sign-safe.7c6f010b.png | 1280x898 | /safe card "Sign SAFEs" |
| https://rollups.com/_next/static/media/safe-usdc.b53801b7.png | public/assets/pages/safe-usdc.b53801b7.png | 1280x898 | /safe card "Get funded via bank transfer or stablecoin" |
| https://rollups.com/_next/static/media/raise-directly.6c117944.png | public/assets/pages/raise-directly.6c117944.png | 742x946 | /how-to-raise-capital Option 1 card |
| https://rollups.com/_next/static/media/spv.19f9ba70.png | public/assets/pages/spv.19f9ba70.png | 813x718 | /how-to-raise-capital Option 2 card |
| https://rollups.com/_next/static/media/rollup.98c7b028.png | public/assets/pages/rollup.98c7b028.png | 790x860 | /how-to-raise-capital Option 3 card |
| https://rollups.com/images/safe-software-demo.png (served via `/_next/image?url=%2Fimages%2Fsafe-software-demo.png&w=3840&q=95`) | public/assets/pages/safe-software-demo.png | 1114x521 | /safe flip card front ("SAFE investor interface") |
| https://rollups.com/images/safe-software-demo-admin.png (via `/_next/image`, same params) | public/assets/pages/safe-software-demo-admin.png | 1164x545 | /safe flip card back ("SAFE startup dashboard") |
| https://rollups.com/images/testimonials/DanRomero2.png | public/assets/pages/testimonial-DanRomero2.png | 357x233 | /ruv testimonial slider |
| https://rollups.com/images/testimonials/kristie.png?x=1 | public/assets/pages/testimonial-kristie.png | 357x233 | /ruv |
| https://rollups.com/images/testimonials/Zain.png | public/assets/pages/testimonial-Zain.png | 357x233 | /ruv |
| https://rollups.com/images/testimonials/Jonasnew.png | public/assets/pages/testimonial-Jonasnew.png | 357x233 | /ruv |
| https://rollups.com/images/testimonials/Shravnew.png | public/assets/pages/testimonial-Shravnew.png | 357x233 | /ruv |
| https://rollups.com/images/testimonials/anon.png | public/assets/pages/testimonial-anon.png | 357x233 | /ruv |
| https://rollups.com/images/testimonials/AN.png | public/assets/pages/testimonial-AN.png | 357x233 | /ruv |
| https://rollups.com/images/testimonials/Alexisnew.png | public/assets/pages/testimonial-Alexisnew.png | 357x233 | /ruv |

### Other files
| Live URL | Local path | Notes |
|---|---|---|
| https://rollups.com/rollups-faq-for-founders.pdf | public/assets/pages/rollups-faq-for-founders.pdf | 3.96 MB PDF. Target of the "Download PDF Guide" button on /how-to-raise-capital. Link it as `/assets/pages/rollups-faq-for-founders.pdf` or copy it to `public/rollups-faq-for-founders.pdf` to keep the original path. |

### Reused from existing `public/assets/` (not re-downloaded; byte-identical)
| Live URL | Existing local path |
|---|---|
| https://rollups.com/images/logos/loveable-logo.svg | public/assets/loveable-logo.6b32fb82.svg |
| https://rollups.com/images/logos/basis.png | public/assets/basis.3c451477.png |
| https://rollups.com/images/logos/wispr.png | public/assets/wispr.5f7509ef.png |
| https://rollups.com/images/logos/function.png | public/assets/function.69b2963b.png |
| https://rollups.com/images/logos/verse.png | public/assets/verse.60a3f84b.png |
| https://rollups.com/_next/static/media/in-action-5.7c07bb5c.png | public/assets/in-action-5.7c07bb5c.png (/ruv use case 1) |
| https://rollups.com/_next/static/media/in-action-1.80dd0b92.png | public/assets/in-action-1.80dd0b92.png (/consolidate use case 1, desktop) |
| company grid logos (basis, wispr, … 24 files) | public/assets/*.png, same as homepage |

## Inline SVGs (extracted from the live DOM / JS): `public/svg/pages/`

All are inline `<svg>` elements on the original, not network requests. `class`/`style` attributes (GSAP or React inline styles) were stripped.

| Local path | viewBox | Rendered size @1440 | Used for |
|---|---|---|---|
| public/svg/pages/secureframe-logo.svg | 0 0 120 17 | 197.6x28 | /ruv use case 1 split-card right column logo (fill #E4EAC8) |
| public/svg/pages/iterate-logo.svg | 0 0 64 64 | 28x28 | /ruv use case 2 split-card logo (rounded #E4EAC8 square, #2a5d33 "i") next to text "iterate.com" |
| public/svg/pages/feature-check.svg | 0 0 17 16 | 16x16 | pricing `.features-list-item` check icon (uses `currentColor`, color #989e7b) |
| public/svg/pages/calc-dropdown-arrow.svg | 0 0 20 20 | 20x20 | calculator scenario dropdown chevron (`currentColor`, stroke 1.5) |
| public/svg/pages/story-logo-autograph.svg | 0 0 134 28 | 153.1x32 | stories grid card 1 (Autograph) |
| public/svg/pages/story-logo-function.svg | 0 0 196 40 | 156.8x32 | stories grid card 2 (Function Health) |
| public/svg/pages/story-logo-rollfi.svg | 0 0 108 41 | 84.3x32 | stories grid card 3 (Rollfi) |
| public/svg/pages/story-logo-stellate.svg | 0 0 116 36 | 103.1x32 | stories grid card 4 (Stellate) |
| public/svg/pages/table-check.svg | 0 0 15 12 | 15x12 | comparison table check (fill #2A5D33) |
| public/svg/pages/table-cross.svg | 0 0 12 12 | 12x12 | comparison table cross (`currentColor` → #989e7b) |
| public/svg/pages/cap-table-without-ruv.svg | 0 0 355 469 | 355.3x469.4 | /how-to-raise-capital "Without RUV" panel illustration (static) |
| public/svg/pages/cap-table-with-ruv.svg | 0 0 357 367 | 355.3x365.3 | /how-to-raise-capital "With RUV" panel illustration (static) |

Reused existing SVGs: `public/svg/trusted-logo-1..5.svg` (hero trusted logos on /ruv and /consolidate, identical path data), `public/svg/action-list-decor.svg` (/how-to-raise-capital action lists), `public/svg/button-arrow.svg` (also the testimonial nav buttons), `public/svg/learn-more-arrow.svg`, `public/svg/chatgpt-icon.svg`, `public/svg/claude-icon.svg`.

## Lottie: `public/lottie/pages/`

| Source | Local path | Details |
|---|---|---|
| JS chunk https://rollups.com/_next/static/chunks/808.998505b77d060ab5.js (module 10808, `JSON.parse('…')`) | public/lottie/pages/consolidate-hero.json | "Rollups - Consolidate  v2 - Additional", v5.9.0, 25 fps, frames 0–100, 780x860, 211 KB. Used by both the desktop and the mobile /consolidate hero. |
| JS chunk https://rollups.com/_next/static/chunks/9071.0e75b06e236c2fec.js (module 49071) | (not copied) = existing public/lottie/product-raise.json | "Rollups - Raise v2", 1252x484, 175 frames. It is byte-identical to the homepage product Lottie and is used as the hero animation on /ruv and /how-to-raise-capital. |

## Screenshots: `recon/pages/`
- Full page: `ruv-1440.png`, `ruv-390.png`, `ruv-calculator-1440.png`, `ruv-calculator-390.png`, `safe-1440.png`, `safe-390.png`, `how-to-raise-capital-1440.png`, `how-to-raise-capital-390.png` (408 px wide because the comparison table's inner columns overflow the body's scroll width; the page itself uses `overflow-x: clip`, so the viewport is still 390), `consolidate-1440.png`, `consolidate-390.png`.
- Interaction states at 1440: `ruv-usecase2-1440.png` (use case 2 selected), `consolidate-usecase2-1440.png`, `ruv-modal-investorexp-1440.png`, `ruv-capmodal-sendlinks-1440.png`, `ruv-calculator-advanced-dropdown-1440.png` (advanced settings on, dropdown open), `safe-flip-1440.png`.
