// Cross-site internal linking across the Bright Picks network.
// Every site links out to its sister sites (footer "More from Bright Picks"),
// so each is discoverable from all the others. Roadmap §2.
export interface NetworkSite {
  key: string;
  name: string;
  url: string;
  tagline: string;
}

export const NETWORK: NetworkSite[] = [
  { key: 'best-bargain-picks', name: 'Best Bargain Picks', url: 'https://best-bargain-picks.pages.dev', tagline: 'Daily Amazon UK deals' },
  { key: 'budget-home-office', name: 'Budget Home Office', url: 'https://budget-home-office.pages.dev', tagline: 'Home-office gear at the budget end' },
  { key: 'deals-aggregator', name: 'UK Deals & Vouchers', url: 'https://bright-picks.com', tagline: "Today's best UK deals" },
  { key: 'kitchen-gadgets', name: 'Kitchen Gadgets', url: 'https://kitchen-gadgets-1cp.pages.dev', tagline: 'Budget kitchen gadget reviews' },
  { key: 'product-comparison', name: 'Product Comparison', url: 'https://product-comparison-6df.pages.dev', tagline: 'Side-by-side comparisons' },
];

export const SELF_KEY = 'kitchen-gadgets';
export const sisterSites: NetworkSite[] = NETWORK.filter((s) => s.key !== SELF_KEY);
