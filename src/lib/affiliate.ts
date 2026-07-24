// Central Amazon Associates configuration for Bright Picks — Kitchen Gadgets.
// -------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH for the affiliate tag. Every "Check price" link on
// the site is built from this file, so the tag lives in exactly one place.
//
// ✅ Live, approved Amazon Associates UK tag.
export const ASSOCIATES_TAG = 'kitchengadgetsuk-21';

const AMAZON_UK = 'https://www.amazon.co.uk';

/**
 * Build an Amazon UK affiliate SEARCH link for a product by name.
 * Used where we don't have a verified product ASIN — a search link is
 * Associates-compliant, never 404s on a discontinued item, and still
 * earns on whatever the visitor buys in that session.
 */
export function amazonSearch(query: string): string {
  return `${AMAZON_UK}/s?k=${encodeURIComponent(query)}&tag=${ASSOCIATES_TAG}`;
}

/**
 * Build an Amazon UK affiliate link to a specific product by ASIN.
 * Prefer this over amazonSearch once a real, verified ASIN is known.
 */
export function amazonProduct(asin: string): string {
  return `${AMAZON_UK}/dp/${asin}/?tag=${ASSOCIATES_TAG}`;
}
