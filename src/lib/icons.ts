// Self-authored inline SVG icons (original line-art — no third-party licence).
// Used as decorative category glyphs and the site mark. 24x24, stroke = currentColor.

const svg = (paths: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

const ICONS: Record<string, string> = {
  // Bright Picks mark — a spark
  spark: svg('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/>'),

  'air-fryers': svg('<rect x="5" y="4" width="14" height="16" rx="3"/><path d="M8 8h8"/><circle cx="12" cy="14" r="2.5"/>'),
  blenders: svg('<path d="M8 3h8l-1 8H9L8 3Z"/><path d="M10 11v4a2 2 0 0 0 2 2 2 2 0 0 0 2-2v-4"/><path d="M9 21h6"/><path d="M12 17v4"/>'),
  'coffee-machines': svg('<path d="M4 8h13v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z"/><path d="M17 9h2a2 2 0 0 1 0 4h-2"/><path d="M8 3v2M12 3v2"/>'),
  'kitchen-timers': svg('<circle cx="12" cy="13" r="7"/><path d="M12 13V9"/><path d="M10 2h4"/><path d="M12 2v2"/><path d="M18 7l1.5-1.5"/>'),
  organizers: svg('<rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><path d="M10 7h4M10 17h4"/>'),
};

export function icon(name: string): string {
  return ICONS[name] ?? ICONS.spark;
}
