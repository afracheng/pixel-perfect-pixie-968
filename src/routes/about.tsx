import { createFileRoute } from "@tanstack/react-router";
import studio from "@/assets/studio.jpg";
import heroAsset from "@/assets/hero-portrait.jpg.asset.json";
import { BRAND } from "@/lib/site";
import { PageHead, CtaBand, seo } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => seo("認識日日眉好｜淡水紋繡師法兒的專業與理念", "認識新北淡水日日眉好紋繡所與紋繡師法兒：護理背景的衛生觀念、個人化眉型設計與負責的術後追蹤。", "/about"),
  component: About,
});

function About() {
  return (
    <>
      <PageHead eyebrow="About" title="認識日日眉好" intro={`「${BRAND.motto}」日日眉好紋繡所位於新北市淡水區，由紋繡師${BRAND.artist}親自評估與操作。`} crumbs={[{ label: "認識日日眉好" }]} />
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1fr_1.4fr]">
        <img src={heroAsset.url} alt="紋繡師法兒本人｜日日眉好紋繡所" width={1280} height={1920} loading="lazy" className="aspect-[4/5] w-full object-cover object-[50%_38%]" />
        <div className="prose-zh">
          <h2>紋繡師 {BRAND.artist}</h2>
          <p>相信好的眉型不是複製流行，而是找出最適合每個人五官與氣質的比例。每一次操作都從仔細的評估與溝通開始。</p>
          <h3>專業背景</h3>
          <ul>
            <li>7年紋繡經歷</li>
            <li>TISA紋繡講師</li>
            <li>TISA高級紋繡證照</li>
          </ul>
          <h3>衛生操作理念</h3>
          <ul>
            <li>針具一次性使用，並於顧客面前拆封</li>
            <li>操作前完成環境與皮膚消毒</li>
            <li>全程配戴手套，避免直接接觸傷口</li>
          </ul>
          <h3>術後追蹤方式</h3>
          <p>術後一週至一個月內透過 LINE 關心恢復狀況，協助判斷照護是否得宜；若有異常狀況，會建議盡速就醫。</p>
        </div>
      </div>
      <img src={studio} alt="日日眉好紋繡所工作室環境" width={1280} height={912} loading="lazy" className="container-page h-56 w-full object-cover md:h-80" />
      <CtaBand />
    </>
  );
}
