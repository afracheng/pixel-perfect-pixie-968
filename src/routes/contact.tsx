import { createFileRoute } from "@tanstack/react-router";
import { BRAND } from "@/lib/site";
import { PageHead, LineButton, TbdNote, seo } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => seo("聯絡與預約｜淡水紋繡工作室交通資訊｜日日眉好紋繡所", "日日眉好紋繡所位於新北市淡水區，服務淡水、八里、蘆洲及台北地區。透過 LINE 免費照片評估與預約。", "/contact"),
  component: () => (
    <>
      <PageHead eyebrow="Contact" title="聯絡與預約" intro="最快的方式是加入官方 LINE，傳送照片進行免費評估。" crumbs={[{ label: "聯絡預約" }]} />
      <div className="container-page grid gap-12 py-16 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl">預約三步驟</h2>
          <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
            <li>加入官方 LINE</li>
            <li>傳送素顏正面、左側、右側三張自然光照片</li>
            <li>確認方案、價格與時間後完成預約</li>
          </ol>
          <LineButton>加入 LINE 預約</LineButton>
        </div>
        <address className="not-italic space-y-3">
          <h2 className="text-xl">工作室資訊</h2>
          <p>地址：{BRAND.address}</p>
          <p>服務地區：{BRAND.serviceAreas.join("、")}</p>
          <p>LINE：<a href={BRAND.lineUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 break-all">{BRAND.lineUrl}</a></p>
          <p>{BRAND.hours}</p>
          <TbdNote>詳細地址、交通方式與營業時間待業主確認後更新，並與 Google 商家檔案保持一致。</TbdNote>
        </address>
      </div>
    </>
  ),
});
