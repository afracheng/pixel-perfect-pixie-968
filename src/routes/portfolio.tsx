import { createFileRoute, Link } from "@tanstack/react-router";
import { SERVICES } from "@/lib/site";
import { PageHead, CtaBand, TbdNote, seo } from "@/components/site";

export const Route = createFileRoute("/portfolio")({
  head: () => seo("作品案例｜淡水飄眉・霧眉・霧唇真實案例｜日日眉好紋繡所", "日日眉好紋繡所的飄眉、霧眉、飄霧眉、紋眼線與霧唇作品案例，說明顧客需求與眉型設計考量。", "/portfolio"),
  component: Portfolio,
});

function Portfolio() {
  return (
    <>
      <PageHead eyebrow="Portfolio" title="作品案例" intro="每個案例都會說明顧客原本的需求、設計考量與術後追蹤資訊。" crumbs={[{ label: "作品案例" }]} />
      <div className="container-page py-16">
        <TbdNote>案例照片僅使用取得顧客授權的真實照片，不使用修圖後效果冒充操作成果。案例整理中，敬請期待。</TbdNote>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div key={s.slug} className="border bg-card">
              <div className="flex aspect-[4/3] items-center justify-center bg-secondary text-sm text-muted-foreground">{s.name}案例照片（授權後上架）</div>
              <div className="p-5">
                <h2 className="text-lg">{s.name}案例</h2>
                <p className="mt-2 text-sm text-muted-foreground">顧客需求／設計考量／術後追蹤</p>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="mt-3 inline-block text-sm text-champagne">了解{s.name} →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CtaBand />
    </>
  );
}
