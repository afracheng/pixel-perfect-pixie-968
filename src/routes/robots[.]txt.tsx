import { createFileRoute } from "@tanstack/react-router";
import { siteUrl } from "@/lib/utils";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const txt = `User-agent: *\nAllow: /\nSitemap: ${siteUrl(request)}/sitemap.xml\n`;
        return new Response(txt, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
      },
    },
  },
});
