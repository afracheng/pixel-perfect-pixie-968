import { createFileRoute } from "@tanstack/react-router";
import { SERVICES, ARTICLES, canonicalUrl } from "@/lib/site";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const pages: { path: string; lastmod?: string }[] = [
          ...["/", "/about", "/portfolio", "/pricing", "/faq", "/contact", "/knowledge", ...SERVICES.map((s) => `/services/${s.slug}`), ...SERVICES.map((s) => `/portfolio/${s.slug}`)].map((path) => ({ path })),
          ...ARTICLES.map((a) => ({ path: `/knowledge/${a.slug}`, lastmod: a.updated })),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map((p) => `<url><loc>${canonicalUrl(p.path)}</loc>${p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : ""}</url>`).join("")}</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
