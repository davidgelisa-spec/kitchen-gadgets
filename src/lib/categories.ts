// Single source of truth for the site's categories (used by nav + homepage).
export interface Category {
  slug: string;
  name: string;
  tagline: string;
  icon: string; // key into src/lib/icons.ts
}

export const CATEGORIES: Category[] = [
  { slug: 'air-fryers', name: 'Air Fryers', tagline: 'Crispy food, a fraction of the oil', icon: 'air-fryers' },
  { slug: 'blenders', name: 'Blenders', tagline: 'Smoothies, soups and shakes', icon: 'blenders' },
  { slug: 'coffee-machines', name: 'Coffee Machines', tagline: 'Barista-style coffee at home', icon: 'coffee-machines' },
  { slug: 'kitchen-timers', name: 'Kitchen Timers', tagline: 'Never overcook a thing again', icon: 'kitchen-timers' },
  { slug: 'organizers', name: 'Organisers', tagline: 'Tidier, smarter kitchen storage', icon: 'organizers' },
];
