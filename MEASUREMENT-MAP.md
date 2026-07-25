# Measurement Map — Bright Picks portfolio analytics

_This file is identical across all five Bright Picks repos. This copy lives in
**kitchen-gadgets** (`https://kitchen-gadgets-1cp.pages.dev`, Amazon tag `kitchengadgetsuk-21`)._

## The point of this
See what gets **traffic**, what gets **clicks**, and which pages/sites are most
likely to produce the **first 3 qualifying Amazon sales** (the Associates
survival gate: ≥3 sales within 180 days of sign-up). Clicks are the leading
indicator we can measure directly — Amazon sales themselves show up in the
Amazon Associates dashboard, not GA4.

## One shared GA4 property for the whole portfolio
All five sites send to **one GA4 Measurement ID** so reporting is directly
comparable. Every event carries a `site` parameter to split the portfolio apart.

| Site (SITE_KEY)      | Live host                              | Amazon tag          |
|----------------------|----------------------------------------|---------------------|
| best-bargain-picks   | best-bargain-picks.pages.dev           | bestbargainpicks-21 |
| budget-home-office   | budget-home-office.pages.dev           | budgethomeoffice-21 |
| deals-aggregator     | deals-aggregator.pages.dev             | dealsaggregator-21  |
| kitchen-gadgets      | kitchen-gadgets-1cp.pages.dev          | kitchengadgetsuk-21 |
| product-comparison   | product-comparison-6df.pages.dev       | productcomparison-21|

## Implementation (lightweight, static-site friendly)
- `src/lib/analytics.ts` — config: `GA_MEASUREMENT_ID` (shared, same in every
  repo), `SITE_KEY` (per site), `analyticsEnabled`.
- `src/components/Analytics.astro` — **identical in every repo.** Loads gtag.js
  and attaches one delegated click listener. Renders **nothing** when
  `GA_MEASUREMENT_ID` is empty (no scripts, no cookies) — so the site stays clean
  until analytics is switched on.
- Wired once in `src/layouts/Layout.astro` (`<Analytics />` in `<head>`), so it
  covers every page.

## Which events fire, and where
| Event             | Fires when…                                                        | Where |
|-------------------|--------------------------------------------------------------------|-------|
| `page_view`       | any page loads (GA4 automatic); carries the `site` dimension        | every page |
| `affiliate_click` | a visitor clicks any outbound **Amazon** product/search/deal link  | anywhere an Amazon link appears |
| `bounty_click`    | a visitor clicks a **membership bounty** CTA (Prime/Audible/Kindle)| homepages with the Bounties block (deals-aggregator, best-bargain-picks) |

Detection is automatic: any `<a>` whose host contains `amazon.` → `affiliate_click`;
any `<a data-cta-type="bounty">` → `bounty_click`. New links are covered with no
extra wiring.

### Parameters sent with each click event
| Param           | Meaning                                              |
|-----------------|------------------------------------------------------|
| `site`          | which site (SITE_KEY) — the portfolio dimension      |
| `page_path`     | pathname the click happened on                       |
| `page_type`     | home / category / review / info / other (from path)  |
| `category`      | category slug (from URL, or nearest `[data-category]`)|
| `cta_position`  | ordinal of the link on the page (1 = first)          |
| `item_name`     | nearest product/card heading text                    |
| `link_url`      | full outbound URL                                    |
| `link_domain`   | destination host                                     |
| `affiliate_tag` | the `tag=` value on the Amazon URL                   |
| `bounty_program`| bounty events only: Prime / Audible / Kindle Unlimited|

## What success looks like
1. **Traffic exists at all** — `page_view` count climbs above ~0/day. (Survival
   gate can't be hit with no visitors; this is the first thing to watch.)
2. **Clicks happen** — `affiliate_click` / `bounty_click` fire. A healthy
   click-through means the pages and CTAs are working.
3. **Which pages/sites convert attention to clicks** — compare `affiliate_click`
   per `page_view` by `site`, `page_type`, `category`, and `cta_position`.
   The highest click-through pages are where to push traffic to chase the first
   3 sales.
4. **Sales** — confirmed only in the **Amazon Associates dashboard**. Use GA4 to
   find the pages driving the most clicks, then read Associates for actual orders.

## What to inspect in GA4
- **Reports → Realtime** — confirm `page_view` and click events arrive after go-live.
- **Reports → Engagement → Events** — event counts for `affiliate_click`, `bounty_click`.
- **Explore → Free-form** — dimension `site` × metric event count to compare sites;
  add `page_type` / `category` / `cta_position` to see what converts.
- **Admin → Custom definitions** — register the params you want as report
  dimensions (see manual steps).

## Manual Google-side steps (cannot be done from code)
1. Create **one GA4 property** with a single **web data stream**; copy its
   Measurement ID (`G-XXXXXXXXXX`).
2. Paste that ID into `GA_MEASUREMENT_ID` in **every** repo's
   `src/lib/analytics.ts` (deals-aggregator: it lives in `src/lib/site.config.ts`,
   re-exported by analytics.ts) — same value everywhere — then commit + push.
   Cloudflare Pages auto-deploys.
3. In **Admin → Custom definitions → Custom dimensions**, register these
   event-scoped params so they appear in reports:
   `site`, `page_type`, `category`, `cta_position`, `item_name`,
   `link_domain`, `affiliate_tag`, `bounty_program`.
4. (Optional) Mark `affiliate_click` and `bounty_click` as **key events**
   (conversions) so they show in the conversion reports.
5. Verify in **Realtime** that events arrive from each domain.

## Compliance note
The privacy page on every site now discloses Google Analytics 4, its cookies,
and a Google opt-out link, and states no advertising/cross-site identifiers are
enabled. **Cookie-consent banner:** these are static sites with no consent
banner. GA4 sets analytics cookies; under UK PECR that is a known gap shared by
the whole portfolio. It is disclosed (not hidden), but adding a lightweight
consent banner / Google Consent Mode is a separate decision if you want to be
fully strict. Nothing here claims the sites are cookie-free.
