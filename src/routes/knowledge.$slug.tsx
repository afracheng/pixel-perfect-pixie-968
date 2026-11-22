import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getArticle, getService, BRAND, SITE_URL, canonicalUrl } from "@/lib/site";
import { PageHead, CtaBand, TbdNote, seo, breadcrumbJsonLd, shareImage } from "@/components/site";

export const Route = createFileRoute("/knowledge/$slug")({
  loader: ({ params }) => {
    const a = getArticle(params.slug);
    if (!a) throw notFound();
    return a;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "找不到文章｜日日眉好 紋繡設計所" }, { name: "robots", content: "noindex" }] };
    return {
      ...seo(`${loaderData.title}｜日日眉好 紋繡設計所`, loaderData.description, `/knowledge/${params.slug}`, "article"),
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: loaderData.title, description: loaderData.description, inLanguage: "zh-Hant-TW", image: shareImage, datePublished: loaderData.updated, dateModified: loaderData.updated, mainEntityOfPage: canonicalUrl(`/knowledge/${params.slug}`), author: { "@type": "Person", name: BRAND.artist, jobTitle: "紋繡師", url: canonicalUrl("/about") }, publisher: { "@id": `${SITE_URL}/#business` } }) },
        breadcrumbJsonLd([{ name: "知識中心", path: "/knowledge" }, { name: loaderData.title, path: `/knowledge/${params.slug}` }]),
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const a = Route.useLoaderData();
  const svc = getService(a.service);
  return (
    <>
      <PageHead eyebrow="Journal" title={a.title} intro={a.description} crumbs={[{ label: "知識中心", to: "/knowledge" }, { label: a.title }]} />
      <article className="container-page max-w-3xl py-14 prose-zh">
        <p className="text-sm text-muted-foreground">作者：紋繡師 {BRAND.artist}｜更新日期：{a.updated}</p>
        {a.body.map((b) => (<section key={b.h}><h2>{b.h}</h2>{b.p.map((p) => <p key={p}>{p}</p>)}</section>))}
        <TbdNote>本文為一般美容資訊，不取代醫療診斷。若有皮膚疾病或異常反應，請諮詢醫師。</TbdNote>
        {svc && <p className="mt-8">相關服務：<Link to="/services/$slug" params={{ slug: svc.slug }} className="text-champagne">淡水{svc.name} →</Link></p>}
      </article>
      <CtaBand />
    </>
  );
}
