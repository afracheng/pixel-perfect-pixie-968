import { createFileRoute } from "@tanstack/react-router";
import { SERVICES } from "@/lib/site";
import { PageHead, CtaBand, TbdNote, LineButton, seo } from "@/components/site";

export const Route = createFileRoute("/pricing")({
  head: () => seo("淡水飄眉價格・霧眉費用說明｜日日眉好紋繡所", "淡水飄眉、霧眉、飄霧眉、紋眼線與霧唇的費用說明：包含哪些內容、補色安排與可能的額外費用，實際價格以個人評估為準。", "/pricing"),
  component: Pricing,
});

function Pricing() {
  return (
    <>
      <PageHead eyebrow="Pricing" title="價格與費用說明" intro="我們希望費用透明易懂。實際價格以官方確認及個人評估為準，評估免費、不強迫預約。" crumbs={[{ label: "價格說明" }]} />
      <div className="container-page py-16">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left font-serif"><th className="py-3">服務</th><th>價格</th><th>是否含補色</th><th>備註</th></tr></thead>
            <tbody>
              {SERVICES.map((s) => (
                <tr key={s.slug} className="border-b"><td className="py-4">{s.name}</td><td>依評估報價（待確認）</td><td>待確認</td><td className="text-muted-foreground">舊眉修改可能另計</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div><h2 className="text-xl">影響價格的因素</h2><ul className="mt-3 list-disc pl-5 text-muted-foreground"><li>服務項目與設計複雜度</li><li>是否有舊眉色需處理</li><li>補色次數與時間安排</li></ul></div>
          <div><h2 className="text-xl">選擇時可以留意</h2><ul className="mt-3 list-disc pl-5 text-muted-foreground"><li>報價是否清楚說明包含項目</li><li>是否提供術後追蹤</li><li>衛生流程是否透明</li></ul></div>
        </div>
        <div className="mt-10"><TbdNote>本頁價格尚待業主確認，不顯示未經確認的數字。</TbdNote></div>
        <LineButton className="mt-8">LINE 詢問價格</LineButton>
      </div>
      <CtaBand />
    </>
  );
}
