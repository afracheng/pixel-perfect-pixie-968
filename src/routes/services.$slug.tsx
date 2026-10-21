import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getService, SERVICES } from "@/lib/site";
import { PageHead, FaqList, CtaBand, LineButton, TbdNote, faqJsonLd, seo } from "@/components/site";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const s = getService(params.slug);
    if (!s) throw notFound();
    return s;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "找不到服務｜日日眉好紋繡所" }, { name: "robots", content: "noindex" }] };
    const base = seo(loaderData.title, loaderData.description, `/services/${params.slug}`, "article");
    return {
      ...base,
      scripts: [
        faqJsonLd(loaderData.faqs),
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: loaderData.name, areaServed: "新北市淡水區", provider: { "@type": "BeautySalon", name: "日日眉好紋繡所" } }) },
      ],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const s = Route.useLoaderData();
  const others = SERVICES.filter((o) => o.slug !== s.slug);
  return (
    <>
      <PageHead eyebrow={s.en} title={`淡水${s.name}｜日日眉好紋繡所`} intro={s.summary} crumbs={[{ label: "服務項目", to: "/", hash: "services" }, { label: s.name }]} />
      <div className="container-page grid gap-14 py-16 md:grid-cols-[2fr_1fr]">
        <article className="prose-zh">
          <h2>{s.name}適合什麼需求？</h2>
          <ul>{s.suits.map((x) => <li key={x}>{x}</li>)}</ul>
          <h2>{s.name}的設計特色</h2>
          <ul>{s.features.map((x) => <li key={x}>{x}</li>)}</ul>
          {(s.slug === "microblading" || s.slug === "powder-brows" || s.slug === "combo-brows") && (
            <>
              <h2>飄眉、霧眉、飄霧眉比較</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b text-left"><th className="py-2">項目</th><th>飄眉</th><th>霧眉</th><th>飄霧眉</th></tr></thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2">視覺</td><td>根根毛流</td><td>柔和妝感</td><td>前自然後有型</td></tr>
                    <tr className="border-b"><td className="py-2">常見適合膚質</td><td>中性、乾性</td><td>油性亦可評估</td><td>依評估調整</td></tr>
                    <tr><td className="py-2">適合風格</td><td>素顏感</td><td>淡妝感</td><td>兩者兼具</td></tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
          <h2>操作流程</h2>
          <ol className="list-decimal pl-5">{s.process.map((x) => <li key={x}>{x}</li>)}</ol>
          <h2>術後照護與修復追蹤</h2>
          <ul>{s.aftercare.map((x) => <li key={x}>{x}</li>)}</ul>
          <TbdNote>恢復期、留色與維持時間因膚質、體質與照護方式而有個別差異，本服務不保證永久留色或零風險，亦不取代醫療診斷。</TbdNote>
          <h2>{s.name}價格</h2>
          <p>實際價格以官方確認及個人評估為準。歡迎透過 LINE 傳照片，會依需求說明費用與補色安排。<Link to="/pricing" className="text-champagne">查看價格說明 →</Link></p>
          <h2>作品案例</h2>
          <p>真實案例照片整理中（需取得顧客授權後上架）。<Link to="/portfolio" className="text-champagne">前往作品案例 →</Link></p>
          <h2>常見問題</h2>
        </article>
        <aside className="h-fit space-y-6 md:sticky md:top-24">
          <div className="border bg-card p-6">
            <h3 className="text-lg">先免費評估再決定</h3>
            <p className="mt-2 text-sm text-muted-foreground">傳送三張自然光照片，了解是否適合{s.name}。</p>
            <LineButton className="mt-5 w-full" />
          </div>
          <div className="border p-6 text-sm">
            <p className="mb-2 font-serif">其他服務</p>
            {others.map((o) => <Link key={o.slug} to="/services/$slug" params={{ slug: o.slug }} className="block py-1 hover:text-champagne">淡水{o.name}</Link>)}
          </div>
        </aside>
        <div className="md:col-span-1 -mt-10"><FaqList items={s.faqs} /></div>
      </div>
      <CtaBand />
    </>
  );
}
