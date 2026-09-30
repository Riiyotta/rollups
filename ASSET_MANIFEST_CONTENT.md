Source: https://rollups.com

# Asset manifest: content pages (waitlist, contact-us, blog, articles, legal)

This covers assets used by these pages that were not already in `public/` for the homepage. Fonts, the grain texture, navbar/footer SVGs, trusted logos, company-grid logos (`public/assets/*.png|svg`) and the learn-more/button arrows are shared with the homepage. See `ASSET_MANIFEST.md`.

Everything below was downloaded on 2026-09-30. Sizes are the intrinsic pixel dimensions of the files.

## Waitlist (`/waitlist`)
| Live URL | Local path | Intrinsic | Rendered at 1440 | Use |
|---|---|---|---|---|
| https://rollups.com/images/waitlist-demo-admin.png | public/assets/pages/waitlist-demo-admin.png | 3485x1635 PNG | 1200x563 | Hero flip card, FRONT face ("company dashboard"). `<img width=1600 height=900>`, unoptimized |
| https://rollups.com/images/waitlist-demo.png | public/assets/pages/waitlist-demo.png | 3342x1563 PNG | 1200x561 | Hero flip card, BACK face ("investor experience") |
| https://rollups.com/_next/static/media/waitlist-demo-admin.d7ac115f.png | public/assets/pages/waitlist-demo-admin.d7ac115f.png | 3485x1635 PNG | 542x254 | "How it works" step 1 illustration (byte-identical to waitlist-demo-admin.png) |
| https://rollups.com/_next/static/media/in-action-2.e1f62643.png | public/assets/pages/in-action-2.e1f62643.png | 1179x1440 PNG | 350x427.5 | Step 2 "Share with your network" |
| https://rollups.com/_next/static/media/in-action-extract-value.32157404.png | public/assets/pages/in-action-extract-value.32157404.png | 1179x1440 PNG | 350x427.5 | Step 3 "Extract value" |
| https://rollups.com/_next/static/media/sign-safe.7c6f010b.png | public/assets/pages/sign-safe.7c6f010b.png | 1280x898 PNG | 542x380 | Step 4 "Open your round when ready" |
| https://rollups.com/images/logos/cal.svg | public/svg/pages/cal.svg | 101x22 SVG | 73.5x16 | Quote-author logo (Cal.com). CSS `filter: brightness(0) invert(1); opacity: .7` |
| inline SVG (features list check) | public/svg/pages/feature-check.svg (already present from another page; identical paths, viewBox 0 0 17 16, stroke=currentColor) | 16x16 | 16x16 | Pricing "features include" list bullets |
| https://rollups.com/images/og-waitlist.png | public/assets/pages/og-waitlist.png | 2400x1260 PNG | (meta only) | og:image |
| Company logos (`/_next/static/media/{basis,wispr,loveable-logo,thinking,superlinked,boxcar,aescape,commonsclinic,privy,coverface,silna,function,amca,monad,11x,roboflow,vance,socket,base,succinct,enam,verse,branch}.*`) | public/assets/*.png/svg (already present) | 220x120 | 150x60 | Same `companies-grid` as the homepage |

## Blog index + articles
| Live URL | Local path | Intrinsic | Use |
|---|---|---|---|
| https://rollups.com/images/blog/clean-cap-table.png | public/assets/pages/blog-clean-cap-table.png | 2400x1260 | Cover: why-clean-captable-matters (card + header + og) |
| https://rollups.com/images/og-mem0-cover.png | public/assets/pages/og-mem0-cover.png | 2160x1408 | Cover: case-study-mem0-ruv |
| https://rollups.com/images/og-itemfarm-cover-1.png | public/assets/pages/og-itemfarm-cover-1.png | 4320x2816 | Cover: case-study-itemfarm-streamlined-fundraise-ruv |
| https://rollups.com/images/og-heron-power.png | public/assets/pages/og-heron-power.png | 4320x2816 | Cover: case-study-heron-power-strategic-investors-ruv |
| https://rollups.com/images/og-ruv-blog-cover.png | public/assets/pages/og-ruv-blog-cover.png | 1252x484 | Cover: how-ruvs-simplify-fundraising |
| https://rollups.com/images/og-cimento-cover-1.png | public/assets/pages/og-cimento-cover-1.png | 2160x1408 | Cover: case-study-cimento-ai-angel-investors-ruv |
| https://rollups.com/images/og-homepage.png | public/assets/pages/og-homepage.png | 2400x1260 | Cover AND author avatar: announcing-rollups ("Rollups Team"). Also the og:image for /contact-us and the legal pages |
| https://rollups.com/images/og-secureframe-cover.png | public/assets/pages/og-secureframe-cover.png | 2160x1408 | Cover: case-study-secureframe-maximize-captable-value-ruv |
| https://rollups.com/images/founderspv.png | public/assets/pages/founderspv.png | 2400x1260 | Cover: special-purpose-vehicles-for-startups-guide |
| https://rollups.com/images/team/vish.png | public/assets/pages/team-vish.png | 105x105 | Author photo "Vish Khamamkar" (32x32 circle) |
| https://rollups.com/images/team/josh.png | public/assets/pages/team-josh.png | 105x105 | Author photo "Josh Webster" |
| https://rollups.com/images/team/dan4.png | public/assets/pages/team-dan4.png | 105x105 | Author photo "Dan Hightower" |
| https://rollups.com/images/og-blog.png | NOT downloaded (returns 404 on the live site) | n/a | `/blog` og:image meta; broken on the original |

Article bodies contain no inline images and no inline SVGs.

## Contact, legal
There are no page-specific images. The contact submit button's "SUBMITTING" spinner (15x14, `.rotate-animation`) and "SUBMITTED" check (15x14, stroke #2A5D33) are the same components (webpack modules 96706 and 24002) as the homepage hero form, so reuse them. The multiselect chevron and the checkbox tick are CSS data-URIs (see CLONE_SPEC_CONTENT.md §2).

## Reference files (not for shipping)
- `recon/pages/css/*.css`: prettified copies of the 9 page-specific CSS chunks (`blog-filter`, `blog-list`, `blog-post`, `contact`, `legal`, `pricing`, `waitlist-hero`, `waitlist-trust`, `content-grid-faq-assistant`). These are the ground truth for hover, focus and media-query rules.
- `recon/pages/*-1440.png`, `*-1280.png`, `*-390.png`: full-page screenshots. Blog index is `blog-index-*.png`; articles are `blog-announcing-rollups-*`, `blog-case-study-mem0-ruv-*`; `contact-us-validation-1440.png` shows the error state.
