import { createFileRoute } from "@tanstack/react-router";
import { SERVICES, ARTICLES, canonicalUrl } from "@/lib/site";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const paths = ["/", "/about", "/portfolio", "/pricing", "/faq", "/contact", "/knowledge", ...SERVICES.map((s) => `/services/${s.slug}`), ...SERVICES.map((s) => `/portfolio/${s.slug}`), ...ARTICLES.map((a) => `/knowledge/${a.slug}`)];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((p) => `<url><loc>${canonicalUrl(p)}</loc></url>`).join("")}</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
