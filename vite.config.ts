// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages build (see .github/workflows/deploy-pages.yml): static prerender under
// the repo sub-path, no server runtime. Lovable builds leave GITHUB_PAGES_BASE unset.
const pagesBase = process.env["GITHUB_PAGES_BASE"];

export default defineConfig(
  pagesBase
    ? {
        nitro: false,
        vite: { base: pagesBase },
        tanstackStart: {
          server: { entry: "server" },
          router: { basepath: pagesBase },
          spa: { enabled: true },
          prerender: { enabled: true, crawlLinks: true, failOnError: false },
          pages: [{ path: "/sitemap.xml" }, { path: "/robots.txt" }],
        },
      }
    : {
        tanstackStart: {
          // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
          // nitro/vite builds from this
          server: { entry: "server" },
        },
      },
);
