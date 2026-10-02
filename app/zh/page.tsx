import type { Metadata } from "next";
import { ogMeta } from "@/lib/og";
import HomeHero from "@/components/HomeHero";
import StatsBar from "@/components/StatsBar";
import TrustBar from "@/components/TrustBar";
import PropertyCard from "@/components/PropertyCard";
import FeaturedReviews from "@/components/FeaturedReviews";
import PropertiesMap, { type MapMarker } from "@/components/PropertiesMap";
import { getByMarket } from "@/lib/data";
import { formatMoney, img } from "@/lib/format";
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

const VENTAJAS = [
  ["优质地段", "波朗科、孔德萨与休斯敦——居住与工作的最佳街区。"],
  ["设计感空间", "精装公寓，Wi-Fi、全套厨房，拎包入住。"],
  ["住多久都可以", "按晚、按月，或企业长租，按你的需要安排。"],
  ["本地团队", "熟悉每个街区的团队，为你推荐这座城市最好的部分。"],
];

export default async function ZhLanding() {
  const props = await getByMarket("mx");

  const DESTACADOS = ["condesa-coco-5", "polanco-leonora-3", "polanco-velasco"];
  const bySlug = new Map(props.map((p) => [p.slug, p]));
  const fijos = DESTACADOS.map((s) => bySlug.get(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const destacados = fijos.length >= 3 ? fijos.slice(0, 3) : [...fijos, ...props.slice(0, 3 - fijos.length)];

  const markers: MapMarker[] = props
    .filter((p) => typeof p.lat === "number" && typeof p.lng === "number")
    .map((p) => ({
      slug: p.slug,
      nombre: p.nombre,
      zonaNombre: p.zonaNombre,
      lat: p.lat as number,
      lng: p.lng as number,
      priceLabel: p.precioDesde != null ? `${formatMoney(p.precioDesde, p.currency)} / night` : null,
      image: img(p.images[0], 400),
      rating: p.rating,
      href: `/en/apartment/${p.slug}`,
    }));

  return (
    <div lang="zh-Hans">
      <div className="mx-auto max-w-6xl px-5 pt-6">
        <HomeHero lang="zh" />
      </div>

      <div className="mt-6">
        <StatsBar lang="en" />
      </div>

      <div className="mt-10">
        <TrustBar lang="en" />
      </div>

      {/* Ventajas */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VENTAJAS.map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-neutral-200 p-6">
              <h3 className="font-serif text-xl text-neutral-900">{t}</h3>
              <p className="mt-2 text-sm text-neutral-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Destacados */}
      <section className="mx-auto max-w-6xl px-5 pb-4">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl text-neutral-900">墨西哥城精选公寓</h2>
            <p className="mt-1 text-sm text-neutral-500">我们房源的一部分。</p>
          </div>
          <ZhLink
            href="/en/apartments?utm_source=zh&utm_medium=landing"
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            查看全部
          </ZhLink>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destacados.map((p) => (
            <PropertyCard key={p.beds24RoomId} property={p} search={{}} lang="en" />
          ))}
        </div>
      </section>

      {/* Dónde estamos */}
      {markers.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">我们在哪里</p>
              <h2 className="mt-3 font-serif text-3xl text-neutral-900 md:text-4xl">就在最好的街区中心</h2>
              <p className="mt-3 text-neutral-600">
                我们的公寓集中在波朗科（Polanco）与孔德萨（Condesa）：美食、文化与商务活动都在步行可及的范围内。
                在地图上看看位置，再决定住哪一套。
              </p>
              <ZhLink
                href="/en/apartments?utm_source=zh&utm_medium=map"
                className="mt-6 inline-block rounded-full bg-maia-dark px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
              >
                在地图上查看全部 →
              </ZhLink>
            </div>

            <PropertiesMap
              markers={markers}
              heightClass="h-[420px] md:h-[460px]"
              showPois
              poiGroupKeys={["cultura", "compras", "parques"]}
              poiControl={false}
              lang="en"
            />
          </div>
        </section>
      )}

      <FeaturedReviews lang="en" />

      {/* Avisos honestos */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-2xl border border-maia-strong bg-white p-6 lg:max-w-3xl">
          <h2 className="font-serif text-xl text-neutral-900">预订前请注意两件事</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-700">
            <b>服务语言：</b>我们的团队以英文和西班牙文服务，目前没有中文客服。网站其余页面也是西班牙文与英文。
          </p>
          <p className="mt-3 text-sm leading-relaxed text-neutral-700">
            <b>付款方式：</b>接受国际信用卡（Visa、Mastercard、American Express）。支付宝与微信支付正在开通中。
          </p>
        </div>
      </section>

      {/* Propósito */}
      <section className="bg-[#FBF7EC]">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-maia-yellow text-black">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 21s-6.7-4.35-9.33-8.24C.9 10.02 1.6 6.5 4.6 5.4c1.9-.7 3.9.1 5 1.7l.9 1.3.9-1.3c1.1-1.6 3.1-2.4 5-1.7 3 1.1 3.7 4.62 1.93 7.36C18.7 16.65 12 21 12 21z" />
                </svg>
              </span>
              我们的初衷
            </p>
            <h2 className="mt-3 font-serif text-2xl font-bold text-neutral-900 md:text-3xl">
              住在这里，也是在支持这座城市的社区
            </h2>
            <p className="mt-2 text-neutral-600">
              每一次入住都有一部分收入捐给 Fundación Altía，用于支持墨西哥城的儿童与社区，至今已支持
              <strong> 75 个以上的本地项目</strong>。
            </p>
          </div>
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
