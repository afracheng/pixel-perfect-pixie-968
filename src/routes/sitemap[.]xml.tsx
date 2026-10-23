import { createFileRoute } from "@tanstack/react-router";
import { SERVICES, ARTICLES } from "@/lib/site";
import { siteUrl } from "@/lib/utils";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const base = siteUrl(request);
        const paths = ["/", "/about", "/portfolio", "/pricing", "/faq", "/contact", "/knowledge", ...SERVICES.map((s) => `/services/${s.slug}`), ...ARTICLES.map((a) => `/knowledge/${a.slug}`)];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((p) => `<url><loc>${base}${p}</loc></url>`).join("")}</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
