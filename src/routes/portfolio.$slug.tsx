import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getService } from "@/lib/site";
import { CtaBand, PageHead, seo, TbdNote } from "@/components/site";
import { CaseComparison } from "@/components/case-comparison";
import { PORTFOLIO_CASES } from "@/lib/portfolio";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return service;
  },
  head: ({ loaderData, params }) => {
    const base = seo(
      loaderData ? `${loaderData.name}作品案例｜日日眉好紋繡所` : "案例分類不存在｜日日眉好紋繡所",
      loaderData ? `新北淡水日日眉好紋繡所的${loaderData.name}作品案例，包含顧客需求、設計考量與術後追蹤資訊。` : "此案例分類不存在，請返回作品案例選擇服務項目。",
      `/portfolio/${params.slug}`,
    );
    return loaderData ? base : { ...base, meta: [...base.meta, { name: "robots", content: "noindex" }] };
  },
  component: PortfolioCategory,
  notFoundComponent: () => (
    <div className="container-page py-16">
      <h1 className="text-3xl">找不到案例分類</h1>
      <Link to="/portfolio" className="mt-6 inline-block text-champagne">← 返回作品案例</Link>
    </div>
  ),
});

function PortfolioCategory() {
  const service = Route.useLoaderData();
  return (
    <>
      <PageHead eyebrow={service.en} title={`${service.name}作品案例`} crumbs={[{ label: "作品案例", to: "/portfolio" }, { label: `${service.name}案例` }]} />
      <section className="container-page py-16">
        <TbdNote>僅刊登取得顧客授權的真實案例，保留原始照片；個人膚況與恢復結果因人而異。</TbdNote>
        <CaseComparison key={service.slug} cases={PORTFOLIO_CASES.filter((item) => item.serviceSlug === service.slug)} />
        <div className="mt-8 flex flex-wrap gap-6 text-sm text-champagne">
          <Link to="/portfolio">← 返回作品案例</Link>
          <Link to="/services/$slug" params={{ slug: service.slug }}>了解{service.name} →</Link>
        </div>
      </section>
      <CtaBand />
    </>
  );
}