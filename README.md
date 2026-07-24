# kitchen-gadgets (Bright Picks kitchen site)

Second niche affiliate site in the **Automated Earnings** portfolio — target `kitchen-gadgets.pages.dev`.

## Provenance / why these files are loose here
On 23 Jul 2026 an "Init Bright Picks kitchen site" commit (`f6d572f`) was pushed **into the
`budget-home-office` repo by mistake** (wrong repo — kitchen must be its own site). On 24 Jul 2026
Claude Code relocated those source files here to keep the portfolio's one-site-per-repo rule intact,
and reverted them out of the office repo. **Nothing was lost — the files below are that work.**

## What's here (raw, not yet a full project)
- `src/pages/about.astro`, `contact.astro` — Bright Picks about/contact (kitchen-branded)
- `src/pages/category/{air-fryers,blenders,coffee-machines,kitchen-timers,organizers}/` — 5 skeleton category pages
- `src/analytics.config.js` — placeholder GA id (`G-XXXXXXXXXX`)

## Still needed to become a live site (not done yet)
- Proper Astro scaffold (`package.json`, `astro.config.mjs`, `tsconfig.json`, a shared `Layout.astro`) — mirror `budget-home-office/`.
- Wire affiliate links through a central config like `budget-home-office/src/lib/affiliate.ts` (reuse the `brightpicks26-21` tag).
- Its own GitHub repo + Cloudflare Pages project.
- The `about.astro` is currently raw markdown — convert to a real Astro page using the shared Layout.

See `../EARNINGS-ROADMAP.md` for the wider plan.
