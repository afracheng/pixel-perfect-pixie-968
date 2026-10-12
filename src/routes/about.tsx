import { createFileRoute } from "@tanstack/react-router";
import studio from "@/assets/studio.jpg";
import { BRAND } from "@/lib/site";
import { PageHead, CtaBand, TbdNote, seo } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => seo("認識日日眉好｜淡水紋繡師法兒的專業與理念", "認識新北淡水日日眉好紋繡所與紋繡師法兒：護理背景的衛生觀念、個人化眉型設計與負責的術後追蹤。", "/about"),
  component: About,
});

function About() {
  return (
    <>
      <PageHead eyebrow="About" title="認識日日眉好" intro={`「${BRAND.motto}」日日眉好紋繡所位於新北市淡水區，由紋繡師${BRAND.artist}親自評估與操作。`} crumbs={[{ label: "認識日日眉好" }]} />
      <div className="container-page grid gap-12 py-16 md:grid-cols-2">
        <img src={studio} alt="日日眉好紋繡所工作室環境" width={1280} height={912} loading="lazy" className="w-full object-cover" />
        <div className="prose-zh">
          <h2>紋繡師 {BRAND.artist}</h2>
          <p>相信好的眉型不是複製流行，而是找出最適合每個人五官與氣質的比例。每一次操作都從仔細的評估與溝通開始。</p>
          <h3>專業背景</h3>
          <ul>
            <li>護理師背景（執照資訊待確認）</li>
            <li>紋繡年資：待確認</li>
            <li>競賽經歷：待業主提供可核實的獎項名稱、年份與證明</li>
            <li>專業進修：待確認</li>
          </ul>
          <TbdNote>為確保資訊真實可信，以上資歷將在取得可驗證資料後更新，不使用未經證實的宣稱。</TbdNote>
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
      <CtaBand />
    </>
  );
}
