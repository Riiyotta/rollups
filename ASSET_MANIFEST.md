Source: https://rollups.com/?ref=saaspo.com

# Asset manifest

Columns:
- **Local status**: whether the file already exists in `Rollups_files/` or `public/assets/`.
- **Recon copy**: a file this recon run downloaded or extracted into `/Users/riyaghosh/V3/rollups/recon/`. The Build step copies it into `public/`.

Dimensions are measured pixel sizes. "Rendered" is the CSS box size at 1440.

## 1. Fonts (all missing from `Rollups_files/`; downloaded to `recon/assets/`)
| Live URL | Family / weight | Format | Suggested local path | Local status | Recon copy |
|---|---|---|---|---|---|
| https://rollups.com/_next/static/media/5290de7b4d6f532b-s.p.otf | SuisseIntl 400 | OTF 194 KB | public/assets/fonts/SuisseIntl-Regular.otf | MISSING | recon/assets/5290de7b4d6f532b-s.p.otf |
| https://rollups.com/_next/static/media/92b5edfa4d5226b1-s.p.ttf | SuisseIntl 500 | TTF 231 KB | public/assets/fonts/SuisseIntl-Medium.ttf | MISSING | recon/assets/92b5edfa4d5226b1-s.p.ttf |
| https://rollups.com/_next/static/media/0ab3e530ecf5e18f-s.p.otf | PpNeueCorp (headings) | OTF 141 KB | public/assets/fonts/PPNeueCorp.otf | MISSING | recon/assets/0ab3e530ecf5e18f-s.p.otf |
| https://rollups.com/_next/static/media/121986aa273abf09-s.p.otf | AbcFavoritMono | OTF 63 KB | public/assets/fonts/ABCFavoritMono.otf | MISSING | recon/assets/121986aa273abf09-s.p.otf |
| https://rollups.com/_next/static/media/eb0b6447daad5399-s.p.woff2 | PpNeueMontrealCorp (loaded, unused on home) | WOFF2 52 KB | public/assets/fonts/PPNeueMontrealCorp.woff2 (optional) | MISSING | recon/assets/eb0b6447daad5399-s.p.woff2 |

## 2. Raster / SVG files (`/_next/static/media/`)
| Live URL | Dimensions | Used in | Suggested local path | Local status |
|---|---|---|---|---|
| https://rollups.com/_next/static/media/grain.73795782.png | 1920x1018 PNG | `.noise-bg` fixed grain overlay | public/assets/grain.png | **MISSING**, recon/assets/grain.73795782.png |
| https://rollups.com/_next/static/media/in-action-5.7c07bb5c.png | 1000x828 | Action card 1 (rendered 440x364) | public/assets/in-action-5.png | present |
| https://rollups.com/_next/static/media/in-action-1.80dd0b92.png | 936x614 | Action card 2 (440x289) | public/assets/in-action-1.png | present |
| https://rollups.com/_next/static/media/in-action-3.43381e4b.png | 906x696 | Action card 3 (440x338) | public/assets/in-action-3.png | present |
| https://rollups.com/_next/static/media/auren.6a595073.png | 200x200 | Testimonial 1 author | public/assets/auren.png | present |
| https://rollups.com/_next/static/media/marie-founder.cda9a517.png | 1000x1000 | Testimonial 2 author | public/assets/marie-founder.png | present |
| https://rollups.com/_next/static/media/kumesh.89fad49b.png | 357x233 | Testimonial 3 author | public/assets/kumesh.png | present |
| https://rollups.com/_next/static/media/basis.3c451477.png | 220x120 | Company grid cell 1 (img1) and cell 12 (img2) | public/assets/logos/basis.png | present |
| https://rollups.com/_next/static/media/wispr.5f7509ef.png | 220x120 | cell 1 img2 | public/assets/logos/wispr.png | present |
| https://rollups.com/_next/static/media/loveable-logo.6b32fb82.svg | 120x20 SVG | cell 2 img1 | public/assets/logos/loveable-logo.svg | present |
| https://rollups.com/_next/static/media/thinking.5b0e222a.svg | 44x26 SVG (viewBox 70x26) | cell 2 img2 | public/assets/logos/thinking.svg | present |
| https://rollups.com/_next/static/media/superlinked.3ca6931a.png | 220x120 | cell 3 img1 | public/assets/logos/superlinked.png | present |
| https://rollups.com/_next/static/media/boxcar.00381ef5.png | 220x120 | cell 3 img2 | public/assets/logos/boxcar.png | present |
| https://rollups.com/_next/static/media/aescape.70228900.png | 220x120 | cell 4 img1 | public/assets/logos/aescape.png | present |
| https://rollups.com/_next/static/media/commonsclinic.e497074f.png | 220x120 | cell 4 img2 | public/assets/logos/commonsclinic.png | present |
| https://rollups.com/_next/static/media/privy.7386caec.png | 220x120 | cell 5 img1 | public/assets/logos/privy.png | present |
| https://rollups.com/_next/static/media/coverface.6ea58fc1.png | 220x120 | cell 5 img2 | public/assets/logos/coverface.png | present |
| https://rollups.com/_next/static/media/silna.72540588.png | 220x120 | cell 6 img1 | public/assets/logos/silna.png | present |
| https://rollups.com/_next/static/media/function.69b2963b.png | 220x120 | cell 6 img2 | public/assets/logos/function.png | present |
| https://rollups.com/_next/static/media/amca.3e08fc9f.png | 220x120 | cell 7 img1 | public/assets/logos/amca.png | present |
| https://rollups.com/_next/static/media/monad.eebd6d9b.png | 220x120 | cell 7 img2 | public/assets/logos/monad.png | present |
| https://rollups.com/_next/static/media/11x.241344f9.png | 220x120 | cell 8 img1 | public/assets/logos/11x.png | present |
| https://rollups.com/_next/static/media/roboflow.bbbf56ea.png | 220x120 | cell 8 img2 | public/assets/logos/roboflow.png | present |
| https://rollups.com/_next/static/media/vance.91c23b7b.png | 220x120 | cell 9 img1 | public/assets/logos/vance.png | present |
| https://rollups.com/_next/static/media/socket.07f8f5a4.png | 220x120 | cell 9 img2 | public/assets/logos/socket.png | present |
| https://rollups.com/_next/static/media/base.d11301f2.png | 220x120 | cell 10 img1 | public/assets/logos/base.png | present |
| https://rollups.com/_next/static/media/succinct.582edfdf.png | 220x120 | cell 10 img2 | public/assets/logos/succinct.png | present |
| https://rollups.com/_next/static/media/enam.8c59a762.png | 220x120 | cell 11 img1 | public/assets/logos/enam.png | present |
| https://rollups.com/_next/static/media/verse.60a3f84b.png | 220x120 | cell 11 img2 | public/assets/logos/verse.png | present |
| https://rollups.com/_next/static/media/branch.547baa5e.png | 220x120 | cell 12 img1 | public/assets/logos/branch.png | present |

"present" means the file exists in both `Rollups_files/` and `public/assets/` under its hashed name (for example `public/assets/basis.3c451477.png`). The build can keep the hashed names; the suggested paths are only a cleaner option.

## 3. Lottie animations (MISSING locally; extracted from JS chunks to `recon/lottie/`)
These are not network files. On the live site they are `JSON.parse('…')` modules inside lazy-loaded chunks.
| Source chunk (live) | Name / specs | Used in | Suggested local path | Recon copy |
|---|---|---|---|---|
| https://rollups.com/_next/static/chunks/1893.dcf3943af9020bbe.js | "Rollups INT", 1358x1400, 25fps, op 292 | Hero, desktop (>900px) | public/assets/lottie/hero.json | recon/lottie/hero-rollups-int.json |
| https://rollups.com/_next/static/chunks/5488.18b8d5aadf462ea0.js | "Rollups INT Mobile", 1358x1400, 25fps, op 292 | Hero, ≤900px | public/assets/lottie/hero-mobile.json | recon/lottie/hero-rollups-int-mobile.json |
| https://rollups.com/_next/static/chunks/9071.0e75b06e236c2fec.js | "Rollups - Raise v2", 1252x484, 25fps, op 175, 9 embedded PNGs | Products "Raise" | public/assets/lottie/product-raise.json | recon/lottie/product-raise.json |
| https://rollups.com/_next/static/chunks/6086.8ac09038a2c2643d.js | "Rollups - Consolidate v2", 1252x484, 25fps, op 250 | Products "Consolidate" | public/assets/lottie/product-consolidate.json | recon/lottie/product-consolidate.json |

## 4. Inline SVGs (MISSING as files; extracted to `recon/svg/`)
| File | viewBox / rendered size | Used in |
|---|---|---|
| recon/svg/logo-rollups.svg | 0 0 18 18, rendered 24x24, color #d1dbb9 | Nav logo mark |
| recon/svg/nav-dropdown-arrow.svg | 0 0 11 7 | Products/Resources caret |
| recon/svg/nav-mobile-arrow.svg | 0 0 16 16 | Mobile menu expandable caret |
| recon/svg/button-arrow.svg | 0 0 12 11 | Animated button arrow |
| recon/svg/learn-more-arrow.svg | 0 0 21 21, rendered 20x20 (x2 per icon) | "LEARN MORE" circle icon |
| recon/svg/chatgpt-icon.svg | 0 0 24 24, rendered 20x20 | AI summary (hero + footer) |
| recon/svg/claude-icon.svg | 0 0 24 24, rendered 20x20 | AI summary (hero + footer) |
| recon/svg/x-icon.svg | 0 0 24 24, rendered 20x20 | Footer X/Twitter link |
| recon/svg/trusted-logo-1.svg | 0 0 68 17, 72x18 | replit (hero trusted row) |
| recon/svg/trusted-logo-2.svg | 0 0 73 21, 63x18 | Notion |
| recon/svg/trusted-logo-3.svg | 0 0 41 19, 39x18 | Kit |
| recon/svg/trusted-logo-4.svg | 0 0 49 18, 49x18 | BASE |
| recon/svg/trusted-logo-5.svg | 0 0 68 11, 111x18 | Lovable |
| recon/svg/marquee-logo-1..6.svg | replit, Notion, Kit, **customer.io (0 0 103 15, mobile marquee only)**, Lovable, BASE | Mobile hero logo marquee |
| recon/svg/action-list-decor.svg | 0 0 3 240, 3 x 100% | Action card list gradient rail |
| recon/svg/stage-illustration.svg | 0 0 1360 427 | "Every stage" curve (main-path, line-1..5, marker-1..5). GSAP inline styles removed. |
| recon/svg/slider-path.svg | 0 0 363 77 | Mobile stage slider curve |
| recon/svg/swiper-nav-icon.svg | 0 0 11 20 | Swiper default nav (hidden via CSS) |
| recon/svg/footer-illustration.svg | 0 0 845 432, rendered 1200x535 | Footer line-art (draw-ilu). GSAP inline styles removed. |

## 5. Favicons / meta (MISSING; downloaded to `recon/assets/`)
| Live URL | Size | Suggested path |
|---|---|---|
| https://rollups.com/favicon.ico | ICO | public/favicon.ico |
| https://rollups.com/favicon-32x32-v2.png | 32x32 | public/favicon-32x32.png |
| https://rollups.com/favicon-16x16-v2.png | 16x16 | public/favicon-16x16.png |
| https://rollups.com/apple-icon.png | 180x180 | public/apple-icon.png |

Page `<title>`: "Rollups". Meta description: "Simplify fundraises and clean up your cap table". `<html lang="en">`.

## 6. Not needed for the clone
- The Next.js JS chunks, PostHog scripts (`config.js`, `posthog-recorder.js`, `surveys.js`, `web-vitals-with-attribution.js`, `dead-clicks-autocapture.js`) and Vercel `script.js` in `Rollups_files/` are analytics or runtime only.
- No `<video>`, `<canvas>` or `<iframe>` elements exist on the page.

## Missing-asset summary
1. The 5 font files (section 1).
2. `grain.73795782.png` (noise overlay).
3. The 4 Lottie JSONs (hero desktop, hero mobile, product raise, product consolidate).
4. All inline SVG icons, logos and illustrations (section 4), including the customer.io logo used only in the mobile marquee.
5. Favicons.

Every item has a copy in `/Users/riyaghosh/V3/rollups/recon/`.
