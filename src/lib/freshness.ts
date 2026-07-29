// Weekly freshness helpers — deterministic and build-time only (no runtime JS).
// A weekly rebuild (see .github/workflows/weekly-refresh.yml) re-runs these, so
// the homepage visibly changes at least once a week for crawlers and readers.
// Roadmap §3.

/** ISO-week seed, e.g. 202730 — stable within a week, changes every Monday. */
export function weekSeed(d: Date = new Date()): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = (date.getUTCDay() + 6) % 7;
  date.setUTCDate(date.getUTCDate() - dayNum + 3);
  const firstThursday = new Date(Date.UTC(date.getUTCFullYear(), 0, 4));
  const week =
    1 +
    Math.round(
      ((date.getTime() - firstThursday.getTime()) / 86400000 -
        3 +
        ((firstThursday.getUTCDay() + 6) % 7)) /
        7,
    );
  return date.getUTCFullYear() * 100 + week;
}

/** Rotate an array by the current week so the lead items change weekly. */
export function weeklyRotate<T>(arr: T[], seed: number = weekSeed()): T[] {
  if (arr.length < 2) return arr.slice();
  const off = ((seed % arr.length) + arr.length) % arr.length;
  return arr.slice(off).concat(arr.slice(0, off));
}

/**
 * DEPRECATED for user-facing "last updated" text (VSC-013, 2026-07-29).
 * This returns the BUILD date, not the date anything was actually re-checked,
 * so printing it told visitors a page had been refreshed when only a rebuild
 * had run. Every site-facing use was removed. Do not reintroduce it into page
 * copy: show a date only when it comes from a real data refresh (the pattern
 * deals-aggregator and product-comparison use, reading generatedAt from the
 * dataset). Kept only because buildDate() below shares this module.
 */
export function updatedLabel(d: Date = new Date()): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** ISO date (YYYY-MM-DD) for sitemap <lastmod>. */
export function buildDate(d: Date = new Date()): string {
  return d.toISOString().slice(0, 10);
}
