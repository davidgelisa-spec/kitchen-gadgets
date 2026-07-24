import type { APIRoute } from 'astro';
import { CATEGORIES } from '../lib/categories';
import { buildDate } from '../lib/freshness';

const base = 'https://kitchen-gadgets.pages.dev';

export const GET: APIRoute = () => {
  const lastmod = buildDate();
  const urls = [
    '/', '/about/', '/contact/', '/disclosure/', '/privacy/',
    ...CATEGORIES.map((c) => `/category/${c.slug}/`),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${base}${u}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq></url>`).join('\n')}
</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
