import { useState } from "react";
import { Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PortfolioCase } from "@/lib/portfolio";

function PhotoPair({ item }: { item?: PortfolioCase }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {(["before", "after"] as const).map((stage) => (
        <figure key={stage} className="min-w-0">
          {item ? <img src={item[stage]} alt={`${item.title}・${stage === "before" ? "施作前" : item.afterLabel}`} className="aspect-[4/3] w-full rounded object-contain bg-secondary" loading="lazy" /> : (
            <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded border border-dashed bg-secondary/50 text-muted-foreground">
              <Images className="size-6" aria-hidden="true" />
              <span className="text-xs sm:text-sm">授權照片待上架</span>
            </div>
          )}
          <figcaption className="mt-2 text-sm">{stage === "before" ? "施作前" : item?.afterLabel ?? "施作後"}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function CaseDetails({ item }: { item: PortfolioCase }) {
  return <dl className="mt-6 space-y-4 text-sm">{[
    ["原本需求", item.need], ["設計考量", item.design], ["改善與追蹤", item.outcome],
  ].map(([label, value]) => <div key={label}><dt className="font-medium">{label}</dt><dd className="mt-1 text-muted-foreground">{value}</dd></div>)}</dl>;
}

export function CaseComparison({ cases }: { cases: PortfolioCase[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const compared = cases.filter((item) => selected.includes(item.id));
  return (
    <>
      <section className="mt-10">
        <h2 className="text-2xl">施作前後對比</h2>
        {cases.length === 0 ? (
          <div className="mt-6 max-w-3xl">
            <PhotoPair />
            <p className="mt-4 text-sm text-muted-foreground">真實案例照片與設計紀錄整理中。</p>
          </div>
        ) : <div className="mt-6 grid gap-8 md:grid-cols-2">{cases.map((item) => (
          <article key={item.id} className="min-w-0 rounded border bg-card p-4 sm:p-6">
            <h3 className="mb-4 text-lg">{item.title}</h3>
            <PhotoPair item={item} />
            <CaseDetails item={item} />
            <Button variant={selected.includes(item.id) ? "secondary" : "outline"} aria-pressed={selected.includes(item.id)} disabled={!selected.includes(item.id) && selected.length >= 2} className="mt-6" onClick={() => setSelected((current) => current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id])}>
              <Images />{selected.includes(item.id) ? "取消比較" : "加入比較"}
            </Button>
          </article>
        ))}</div>}
      </section>
      <section className="mt-14 border-t pt-10" aria-label="不同客戶案例比較">
        <h2 className="text-2xl">不同客戶案例比較</h2>
        {compared.length === 2 ? <div className="mt-6 grid gap-8 md:grid-cols-2">{compared.map((item) => <article key={item.id} className="min-w-0"><h3 className="mb-4 text-lg">{item.title}</h3><PhotoPair item={item} /><CaseDetails item={item} /></article>)}</div> : <p className="mt-4 text-sm text-muted-foreground">{cases.length === 0 ? "待授權案例上架後開放比較。" : cases.length === 1 ? "更多授權案例整理中。" : `已選 ${compared.length} / 2 個案例`}</p>}
      </section>
    </>
  );
}