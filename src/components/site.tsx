import { Link } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { BRAND, SERVICES } from "@/lib/site";

const nav = [
  { to: "/about", label: "認識日日眉好" },
  { to: "/portfolio", label: "作品案例" },
  { to: "/pricing", label: "價格說明" },
  { to: "/knowledge", label: "知識中心" },
  { to: "/faq", label: "常見問題" },
  { to: "/contact", label: "聯絡預約" },
] as const;

export function LineButton({ children = "LINE 免費評估", className = "" }: { children?: ReactNode; className?: string }) {
  return (
    <a href={BRAND.lineUrl} target="_blank" rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full bg-line px-6 py-3 text-sm font-medium text-line-foreground transition hover:opacity-90 ${className}`}>
      {children}
    </a>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="container-page flex flex-wrap items-center gap-x-4 gap-y-2 py-3 lg:h-16 lg:py-0">
        <Link to="/" className="mr-auto font-serif text-base tracking-widest whitespace-nowrap md:text-lg">{BRAND.name}</Link>
        <nav aria-label="主導覽" className="order-last flex w-full flex-wrap items-center gap-x-4 gap-y-2 text-xs lg:order-none lg:w-auto lg:flex-nowrap lg:gap-6 lg:text-sm">
          {nav.map((n) => <Link key={n.to} to={n.to} className="whitespace-nowrap hover:text-champagne" activeProps={{ className: "text-champagne" }}>{n.label}</Link>)}
        </nav>
        <LineButton className="px-4 py-2 text-xs lg:text-sm">LINE 諮詢</LineButton>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl tracking-widest">{BRAND.name}</p>
          <p className="mt-3 text-sm opacity-80">「{BRAND.motto}」</p>
          <p className="mt-3 text-sm opacity-80">服務地區：{BRAND.serviceAreas.join("、")}</p>
        </div>
        <div className="text-sm">
          <p className="mb-3 eyebrow">Services</p>
          {SERVICES.map((s) => <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="block py-1 opacity-80 hover:opacity-100">淡水{s.name}</Link>)}
        </div>
        <address className="not-italic text-sm opacity-80 space-y-1">
          <p className="mb-3 eyebrow opacity-100">Contact</p>
          <p>地址：{BRAND.address}</p>
          <p>LINE：{BRAND.lineId}</p>
          <p>{BRAND.hours}</p>
          <p className="flex gap-4 pt-2"><a href={BRAND.instagram}>Instagram</a><a href={BRAND.facebook}>Facebook</a></p>
        </address>
      </div>
      <p className="border-t border-primary-foreground/20 py-5 text-center text-xs opacity-60">© {new Date().getFullYear()} {BRAND.name}｜本網站內容為美容服務資訊，不取代醫療診斷</p>
    </footer>
  );
}

export function Crumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="麵包屑" className="text-xs text-muted-foreground">
      <Link to="/">首頁</Link>
      {items.map((i) => <span key={i.label}> ／ {i.to ? <a href={i.to}>{i.label}</a> : <span aria-current="page">{i.label}</span>}</span>)}
    </nav>
  );
}

export function PageHead({ eyebrow, title, intro, crumbs }: { eyebrow: string; title: string; intro?: string; crumbs: { label: string; to?: string }[] }) {
  return (
    <section className="border-b bg-secondary/60">
      <div className="container-page py-14 md:py-20 fade-up">
        <Crumbs items={crumbs} />
        <p className="eyebrow mt-6">{eyebrow}</p>
        <h1 className="mt-3 text-3xl md:text-4xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-muted-foreground">{intro}</p>}
      </div>
    </section>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y border-y">
      {items.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none justify-between font-serif text-lg">
            {f.q}<span className="text-champagne transition group-open:rotate-45">＋</span>
          </summary>
          <p className="mt-3 text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="container-page mt-24">
      <div className="bg-blush/60 px-6 py-14 text-center md:px-16">
        <p className="eyebrow">Free Assessment</p>
        <h2 className="mt-3 text-2xl md:text-3xl">先傳照片，免費評估適合的眉型</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">提供素顏正面、左側、右側三張自然光照片，紋繡師會依妳的五官比例與原生眉毛給予建議。</p>
        <LineButton className="mt-8">加入 LINE 免費評估</LineButton>
      </div>
    </section>
  );
}

export function TbdNote({ children }: { children: ReactNode }) {
  return <p className="border-l-2 border-champagne bg-muted px-4 py-3 text-sm text-muted-foreground">{children}</p>;
}

export const faqJsonLd = (items: { q: string; a: string }[]) => ({
  type: "application/ld+json",
  children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }),
});

export const seo = (title: string, description: string, path: string, type = "website") => ({
  meta: [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: path },
    { name: "twitter:card", content: "summary_large_image" },
  ],
  links: [{ rel: "canonical", href: path }],
});
