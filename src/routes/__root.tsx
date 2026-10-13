import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header, Footer } from "@/components/site";
import { BRAND, SERVICES } from "@/lib/site";

function NotFoundComponent() {
  return (
    <div className="container-page py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-3xl">找不到這個頁面</h1>
      <p className="mt-3 text-muted-foreground">頁面可能已移動，歡迎回到首頁或瀏覽服務項目。</p>
      <Link to="/" className="mt-8 inline-block rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground">回到首頁</Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="container-page py-32 text-center">
      <h1 className="text-2xl">頁面暫時無法載入</h1>
      <button onClick={() => { router.invalidate(); reset(); }} className="mt-6 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground">重新整理</button>
    </div>
  );
}

const orgLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: BRAND.name,
  slogan: BRAND.motto,
  address: { "@type": "PostalAddress", addressLocality: "淡水區", addressRegion: "新北市", addressCountry: "TW" },
  areaServed: BRAND.serviceAreas,
  makesOffer: SERVICES.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name } })),
  sameAs: [BRAND.instagram, BRAND.facebook],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: BRAND.name },
      { property: "og:site_name", content: BRAND.name },
      { property: "og:locale", content: "zh_TW" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500&family=Noto+Serif+TC:wght@400;500;600&display=swap" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(orgLd) }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant-TW">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main><Outlet /></main>
      <Footer />
    </QueryClientProvider>
  );
}
