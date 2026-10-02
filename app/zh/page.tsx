import type { Metadata } from "next";
import Image from "next/image";
import { ogMeta } from "@/lib/og";
import { SUPPORT_EMAIL } from "@/lib/contact";
import { ZhWhatsApp, ZhLink } from "@/components/ZhCta";

export const metadata: Metadata = {
  ...ogMeta("墨西哥城精装公寓", "直接预订 · 波朗科与孔德萨", "zh_CN"),
  title: "墨西哥城精装公寓出租 · 波朗科与孔德萨",
  description:
    "墨西哥城波朗科（Polanco）与孔德萨（Condesa）精装公寓，按晚或按月出租。专业清洁、密码锁自助入住、24 小时支持。直接预订，价格低于平台。",
  alternates: {
    canonical: "/zh",
    languages: { "es-MX": "/", en: "/en", "zh-Hans": "/zh" },
  },
};

const RAZONES = [
  ["价格更低", "同样的公寓，直接预订比 Airbnb 等平台便宜，因为不收平台服务费。"],
  ["直接沟通", "预订前后都直接与我们联系，不经过平台转达。"],
  ["住得越久越划算", "停留的晚数越多，折扣越大；一个月以上另有长租价格。"],
];

const ZONAS = [
  ["波朗科 Polanco", "/zonas/polanco.webp", "使馆与商务区。米其林餐厅、马塞奥大道购物街、查普尔特佩克公园与国家人类学博物馆都在步行或几分钟车程内。"],
  ["孔德萨 Condesa", "/zonas/condesa.webp", "绿树成荫的街道、咖啡馆与设计小店。安静、适合步行，是长住与周末探索的好选择。"],
];

const INCLUYE = [
  "全套厨房、餐具与洗衣机",
  "高速 Wi-Fi 与办公空间",
  "每位客人入住前专业清洁",
  "密码锁自助入住，无需等人交接钥匙",
  "床品、毛巾与基本洗漱用品",
  "24 小时在线支持",
];

export default function ZhLanding() {
  return (
    <div lang="zh-Hans">
      {/* Portada */}
      <section className="bg-gradient-to-br from-[#FDF3CF] via-white to-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-16 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">
              MAIA HOME · 墨西哥城
            </p>
            <h1 className="mt-3 font-serif text-3xl leading-tight text-neutral-900 md:text-5xl">
              墨西哥城精装公寓
              <span className="block text-maia-strong">直接预订更便宜</span>
            </h1>
            <p className="mt-5 max-w-md leading-relaxed text-neutral-600">
              我们在波朗科与孔德萨两个街区直接运营 40 套精装公寓，按晚或按月出租。
              专业清洁、密码锁自助入住、24 小时支持。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ZhLink
                href="/departamentos?utm_source=zh&utm_medium=landing"
                className="rounded-xl bg-maia-yellow px-5 py-3 text-sm font-bold text-black transition hover:bg-maia-strong"
              >
                查看公寓 →
              </ZhLink>
              <ZhWhatsApp className="rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-800 transition hover:border-maia-strong">
                WhatsApp 咨询
              </ZhWhatsApp>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-4 ring-maia-yellow">
            <Image
              src="/hero/hero-03.jpg"
              alt="墨西哥城波朗科区精装公寓的客厅"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Por qué directo */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="font-serif text-2xl text-neutral-900 md:text-3xl">为什么直接向我们预订</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {RAZONES.map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-neutral-200 p-6">
              <h3 className="text-base font-semibold text-neutral-900">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Zonas */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h2 className="font-serif text-2xl text-neutral-900 md:text-3xl">两个街区</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {ZONAS.map(([t, img, d]) => (
              <div key={t} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                <div className="relative aspect-[16/9]">
                  <Image src={img} alt={t} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-neutral-900">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="font-serif text-2xl text-neutral-900 md:text-3xl">每套公寓都包含</h2>
        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {INCLUYE.map((t) => (
            <li key={t} className="flex items-start gap-3 text-sm text-neutral-700">
              <span className="mt-0.5 font-bold text-maia-strong">✓</span>
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* Advertencias honestas */}
      <section className="mx-auto max-w-6xl px-5 pb-14">
        <div className="rounded-2xl border border-maia-strong bg-white p-6 lg:max-w-3xl">
          <h2 className="font-serif text-xl text-neutral-900">预订前请注意两件事</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-700">
            <b>服务语言：</b>我们的团队以英文和西班牙文服务，目前没有中文客服。网站其余页面也是西班牙文与英文。
          </p>
          <p className="mt-3 text-sm leading-relaxed text-neutral-700">
            <b>付款方式：</b>接受国际信用卡（Visa、Mastercard、American Express）。目前不支持支付宝与微信支付。
          </p>
        </div>
      </section>

      {/* Cierre */}
      <section className="bg-maia-dark text-white">
        <div className="mx-auto max-w-6xl px-5 py-16 text-center">
          <h2 className="font-serif text-2xl md:text-3xl">告诉我们日期，我们回复可住的公寓与价格</h2>
          <p className="mx-auto mt-4 max-w-xl text-neutral-300">
            用英文或西班牙文联系我们即可。回复通常在 24 小时内。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ZhWhatsApp className="rounded-xl bg-maia-yellow px-6 py-3 text-sm font-bold text-black transition hover:bg-maia-strong">
              WhatsApp 咨询
            </ZhWhatsApp>
            <ZhLink
              href={`mailto:${SUPPORT_EMAIL}`}
              className="rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-maia-yellow"
            >
              {SUPPORT_EMAIL}
            </ZhLink>
          </div>
        </div>
      </section>
    </div>
  );
}
