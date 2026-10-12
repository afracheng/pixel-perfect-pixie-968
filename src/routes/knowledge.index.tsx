import { createFileRoute, Link } from "@tanstack/react-router";
import { ARTICLES } from "@/lib/site";
import { PageHead, CtaBand, seo } from "@/components/site";

export const Route = createFileRoute("/knowledge/")({
  head: () => seo("紋繡知識中心｜飄眉霧眉術後照護與選擇指南｜日日眉好紋繡所", "飄眉霧眉差別、術後照護、紋眉前注意事項、眉型挑選與衛生流程，由淡水紋繡師整理的實用知識。", "/knowledge"),
  component: () => (
    <>
      <PageHead eyebrow="Journal" title="紋繡知識中心" intro="整理紋繡前後最常被問到的問題，協助妳做出安心的決定。" crumbs={[{ label: "知識中心" }]} />
      <div className="container-page grid gap-6 py-16 md:grid-cols-2">
        {ARTICLES.map((a) => (
          <Link key={a.slug} to="/knowledge/$slug" params={{ slug: a.slug }} className="border bg-card p-6 hover:bg-secondary">
            <p className="text-xs text-muted-foreground">更新：{a.updated}</p>
            <h2 className="mt-2 text-xl">{a.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{a.description}</p>
          </Link>
        ))}
      </div>
      <CtaBand />
    </>
  ),
});
