import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import studio from "@/assets/studio.jpg";
import { BRAND, SERVICES, FAQS, ARTICLES } from "@/lib/site";
import { LineButton, CtaBand, FaqList, faqJsonLd, seo } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    ...seo("新北淡水飄眉・霧眉推薦｜日日眉好紋繡所", "日日眉好紋繡所位於新北市淡水區，提供飄眉、霧眉、飄霧眉、紋眼線與霧唇。重視個人化眉型設計、衛生流程與術後追蹤，可 LINE 免費照片評估。", "/"),
    scripts: [faqJsonLd(FAQS.slice(0, 5))],
  }),
  component: Index,
});

const steps = [
  { t: "傳送照片", d: "素顏正面、左側、右側三張自然光照片" },
  { t: "討論方案", d: "眉型、弧度、粗細、色調與個人風格" },
  { t: "預約操作", d: "一次性針具當面拆封，細緻操作" },
  { t: "術後追蹤", d: "恢復期間持續關心照護狀況" },
];

function Index() {
  return (
    <>
      <section className="container-page grid items-center gap-10 py-12 md:grid-cols-2 md:py-20">
        <div className="fade-up">
          <p className="eyebrow">Tamsui · New Taipei</p>
          <h1 className="mt-4 text-3xl leading-snug md:text-5xl">新北淡水<br />飄眉・霧眉推薦<span className="mt-3 block text-xl text-muted-foreground md:text-2xl">日日眉好紋繡所</span></h1>
          <p className="mt-6 max-w-md text-muted-foreground">從眉型比例、個人風格到術後照護，細心規劃每一個細節，打造適合妳的自然眉型。</p>
          <p className="mt-4 text-sm">飄眉｜霧眉｜飄霧眉｜沙霧感眼線｜減法霧唇</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LineButton>LINE 免費眉型評估</LineButton>
            <Link to="/pricing" className="inline-flex items-center rounded-full border border-primary px-6 py-3 text-sm">查看價格說明</Link>
          </div>
        </div>
        <img src={hero} alt="淡水飄眉自然眉型示意人像" width={1280} height={1600} className="aspect-[4/5] w-full object-cover" fetchPriority="high" />
      </section>

      <section className="container-page mt-12">
        <div className="max-w-2xl">
          <p className="eyebrow">Artist</p>
          <h2 className="mt-2 text-2xl md:text-3xl">紋繡師 {BRAND.artist}</h2>
          <p className="mt-4 font-serif text-lg">「{BRAND.motto}」</p>
          <p className="mt-4 text-muted-foreground">重視操作前的消毒與一次性針具，並在術後持續追蹤恢復狀況。每一對眉毛都從評估開始，而不是套用固定眉型。</p>
          <ul className="mt-5 space-y-2 text-sm">
            <li>・7年紋繡經歷</li>
            <li>・TISA紋繡講師</li>
            <li>・TISA高級紋繡證照</li>
          </ul>
          <Link to="/about" className="mt-6 inline-block text-sm text-champagne">認識日日眉好 →</Link>
        </div>
      </section>

      <img src={studio} alt="日日眉好紋繡所乾淨的操作環境與一次性針具" width={1280} height={912} loading="lazy" className="container-page mt-16 h-56 w-full object-cover md:h-80" />

      <section className="container-page mt-24">
        <p className="eyebrow">Services</p>
        <h2 className="mt-2 text-2xl md:text-3xl">服務項目</h2>
        <div className="mt-8 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-5">
          {SERVICES.map((s) => (
            <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group bg-card p-6 transition hover:bg-secondary">
              <p className="eyebrow">{s.en}</p>
              <h3 className="mt-2 text-xl">{s.name}</h3>
              <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{s.features[0]}</p>
              <span className="mt-4 inline-block text-sm text-champagne">了解更多 →</span>
            </Link>
          ))}
        </div>
      </section>


      <section className="container-page mt-24">
        <p className="eyebrow">Process</p>
        <h2 className="mt-2 text-2xl md:text-3xl">從評估到術後追蹤</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.t} className="border-t-2 border-champagne pt-5">
              <span className="font-serif text-3xl text-champagne">0{i + 1}</span>
              <h3 className="mt-2 text-lg">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-page mt-24 grid gap-12 md:grid-cols-[1fr_2fr]">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-2 text-2xl md:text-3xl">常見問題</h2>
          <Link to="/faq" className="mt-4 inline-block text-sm text-champagne">查看全部問題 →</Link>
        </div>
        <FaqList items={FAQS.slice(0, 5)} />
      </section>

      <section className="container-page mt-24">
        <p className="eyebrow">Journal</p>
        <h2 className="mt-2 text-2xl md:text-3xl">紋繡知識中心</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {ARTICLES.slice(0, 3).map((a) => (
            <Link key={a.slug} to="/knowledge/$slug" params={{ slug: a.slug }} className="border bg-card p-6 hover:bg-secondary">
              <h3 className="text-lg">{a.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{a.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page mt-24 grid gap-6 md:grid-cols-2">
        <div>
          <p className="eyebrow">Visit</p>
          <h2 className="mt-2 text-2xl md:text-3xl">工作室位置</h2>
          <p className="mt-4">{BRAND.address}</p>
          <p className="mt-2 text-sm text-muted-foreground">服務新北淡水、八里、蘆洲及台北市地區顧客。{BRAND.hours}</p>
        </div>
        <div className="flex items-end md:justify-end"><Link to="/contact" className="rounded-full border border-primary px-6 py-3 text-sm">交通與聯絡方式</Link></div>
      </section>

      <CtaBand />
    </>
  );
}
