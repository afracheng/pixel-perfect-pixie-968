import { createFileRoute } from "@tanstack/react-router";
import { FAQS } from "@/lib/site";
import { PageHead, CtaBand, FaqList, faqJsonLd, seo } from "@/components/site";

export const Route = createFileRoute("/faq")({
  head: () => ({ ...seo("紋繡常見問題｜飄眉霧眉差別、價格與照護｜日日眉好紋繡所", "飄眉和霧眉差別、第一次紋繡怎麼選、免費照片評估、術後照護與預約方式，一次解答。", "/faq"), scripts: [faqJsonLd(FAQS)] }),
  component: () => (
    <>
      <PageHead eyebrow="FAQ" title="常見問題" intro="幫助妳在預約前了解清楚" crumbs={[{ label: "常見問題" }]} />
      <div className="container-page max-w-3xl py-16"><FaqList items={FAQS} /></div>
      <CtaBand />
    </>
  ),
});
