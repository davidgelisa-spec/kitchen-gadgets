// Portfolio analytics config — Google Analytics 4. See MEASUREMENT-MAP.md.
// ---------------------------------------------------------------------------
// ONE shared GA4 property across every Bright Picks site so cross-site
// reporting is directly comparable. Paste the real Measurement ID (format
// G-XXXXXXXXXX) below — the SAME value in every repo — then commit and push.
// An empty string means analytics is fully OFF: no scripts load, no cookies set.
export const GA_MEASUREMENT_ID = '';

// Stable per-site key → the `site` dimension on every event. Do not rename
// casually; it is how the portfolio is split apart in GA4 reporting.
export const SITE_KEY = 'kitchen-gadgets';

export const analyticsEnabled = GA_MEASUREMENT_ID.length > 0;
