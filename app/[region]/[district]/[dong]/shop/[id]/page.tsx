// app/[region]/[district]/[dong]/shop/[id]/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { regionData } from "@/data/regions";
import { SHOPS_DATA } from "@/data/shops";

const SITE_URL = "https://allthat-homecare.netlify.app";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
    dong: string;
    id: string;
  }>;
}

function safeDecode(str: string): string {
  if (!str) return "";
  let decoded = str;
  try {
    decoded = decodeURIComponent(decodeURIComponent(str));
  } catch {
    try {
      decoded = decodeURIComponent(str);
    } catch {
      decoded = str;
    }
  }
  return decoded.trim();
}

function getRegionFullName(region: string): string {
  switch (region?.toLowerCase()) {
    case "seoul": return "서울특별시";
    case "gyeonggi": return "경기도";
    case "incheon": return "인천광역시";
    default: return region || "";
  }
}

// 🌟 [필수] 수도권 모든 동 × 샵(1~5) 조합을 정적 빌드(SSG)로 사전 생성하여 수집 타임아웃 504 원천 차단
export async function generateStaticParams() {
  const paths: { region: string; district: string; dong: string; id: string }[] = [];
  const shopIds = Object.keys(SHOPS_DATA);

  for (const [regionKey, regionVal] of Object.entries(regionData)) {
    for (const districtVal of Object.values(regionVal.districts)) {
      for (const dongName of districtVal.dongs) {
        for (const id of shopIds) {
          paths.push({
            region: regionKey,
            district: districtVal.name,
            dong: dongName,
            id,
          });
        }
      }
    }
  }
  return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region, district, dong, id } = await params;
  const districtName = safeDecode(district);
  const dongName = safeDecode(dong);
  const shopId = parseInt(id, 10);
  const shop = SHOPS_DATA[shopId];

  if (!shop) return {};

  const title = `${dongName} 출장 전구역 마사지 ${shop.name} | 테라피 힐링 홈타이 25분 칼도착`;
  const description = `${dongName} 출장마사지 24시간 안심 호출 센터. ${shop.name} 전문 테라피스트가 고객님의 공간으로 직접 방문하여 테라피 피로를 말끔히 덜어드립니다.`;
  const canonicalUrl = `${SITE_URL}/${region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}/shop/${shopId}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: canonicalUrl },
    keywords: [
      `${dongName} 출장마사지`,
      `${dongName}출장마사지`,
      `${dongName} ${shop.name}`,
      `${dongName} 홈타이`,
      `${dongName} 스웨디시`,
      "올댓홈케어",
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "올댓홈케어",
      locale: "ko_KR",
      type: "website",
      images: [
        {
          url: `${SITE_URL}${shop.image}`,
          width: 800,
          height: 600,
          alt: `${districtName} ${dongName} ${shop.name}`,
        },
      ],
    },
  };
}

export default async function DongShopDetailPage({ params }: PageProps) {
  const { region, district, dong, id } = await params;
  const districtName = safeDecode(district);
  const dongName = safeDecode(dong);
  const shopId = parseInt(id, 10);
  const shop = SHOPS_DATA[shopId];

  const currentRegion = regionData[region];
  if (!currentRegion || !shop) {
    notFound();
  }

  const regionFullName = getRegionFullName(region);
  const currentUrl = `${SITE_URL}/${region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}/shop/${shopId}`;
  const allShops = Object.values(SHOPS_DATA);

  // 🌟 네이버 서치어드바이저 & 구글 공용 정형 데이터 (레퍼런스 동일)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${currentUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: `${regionFullName.slice(0, 2)} 출장 홈케어`, item: `${SITE_URL}/${region}` },
          { "@type": "ListItem", position: 3, name: `${districtName} 케어`, item: `${SITE_URL}/${region}/${encodeURIComponent(districtName)}` },
          { "@type": "ListItem", position: 4, name: `${dongName} 케어`, item: `${SITE_URL}/${region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}` },
          { "@type": "ListItem", position: 5, name: shop.name, item: currentUrl },
        ],
      },
      {
        "@type": "HealthAndBeautyBusiness",
        "@id": `${currentUrl}#business`,
        name: `${regionFullName} ${districtName} ${dongName} 안심 방문 케어 - ${shop.name}`,
        description: shop.tagline,
        url: currentUrl,
        telephone: shop.phone,
        image: `${SITE_URL}${shop.image}`,
        priceRange: shop.basePrice,
        currenciesAccepted: "KRW",
        paymentAccepted: "Cash, Credit Card (100% 현장 후불제)",
        openingHours: "Mo-Su 00:00-24:00",
        areaServed: {
          "@type": "AdministrativeArea",
          name: `${regionFullName} ${districtName} ${dongName}`,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: `${districtName} ${dongName}`,
          addressRegion: regionFullName,
          addressCountry: "KR",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${shop.name} 정규 힐링 코스 요금표`,
          itemListElement: shop.courses.flatMap((c) =>
            c.offers.map((offer) => ({
              "@type": "Offer",
              name: `${shop.name} ${offer.name}`,
              description: offer.desc,
              price: offer.price,
              priceCurrency: "KRW",
              availability: "https://schema.org/InStock",
              url: currentUrl,
            }))
          ),
        },
      },
    ],
  };

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 헤더 */}
      <header className="bg-[#050505]/90 border-b border-amber-500/20 backdrop-blur-xl sticky top-0 z-40 px-4 py-3 shadow-[0_4px_20px_rgba(245,158,11,0.08)]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-black text-xs shadow-sm">
              올
            </span>
            <span className="text-lg font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              올댓홈케어
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href={`/${region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}`}
              className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all"
            >
              ← {dongName} 지역 목록으로
            </Link>
          </div>
        </div>
      </header>

      {/* 5단계 브레드크럼 */}
      <nav className="bg-[#0c0c0e] border-b border-white/5 py-2.5 px-4 text-xs text-gray-400">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <Link href="/" className="text-amber-400 hover:underline">홈</Link>
          <span>&gt;</span>
          <Link href={`/${region}`} className="hover:text-gray-200">{regionFullName.slice(0, 2)}</Link>
          <span>&gt;</span>
          <Link href={`/${region}/${encodeURIComponent(districtName)}`} className="hover:text-gray-200">{districtName}</Link>
          <span>&gt;</span>
          <Link href={`/${region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}`} className="text-gray-400 hover:text-gray-200">
            {dongName}
          </Link>
          <span>&gt;</span>
          <span className="text-gray-200">{shop.name}</span>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
        {/* 상단 메인 샵 배너 */}
        <section className="bg-[#121214] border border-white/10 rounded-3xl overflow-hidden shadow-lg">
          <div className="relative h-64 md:h-80 w-full overflow-hidden bg-neutral-900">
            <img
              src={shop.image}
              alt={`${regionFullName} ${districtName} ${dongName} 안심 방문 케어 - ${shop.name}`}
              className="w-full h-full object-cover filter brightness-[0.75]"
            />
            <span className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-xs font-black px-3.5 py-1.5 rounded-full shadow-md">
              ✨ 만족도 1위 추천
            </span>
          </div>
          <div className="p-6 md:p-8 space-y-4 -mt-8 relative z-10 bg-[#121214] rounded-t-3xl border-t border-amber-500/20">
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/30">
              📍 {regionFullName} {districtName} {dongName} 안심 방문 제휴처
            </span>
            <h1 className="text-xl md:text-3xl font-black text-white leading-tight">
              {regionFullName} {districtName} {dongName} 안심 방문 케어 - {shop.name}
            </h1>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed bg-black/40 p-4 rounded-2xl border border-white/5">
              {shop.tagline}
            </p>
          </div>
        </section>

        {/* 동일 동 5개 공식 제휴처 카드 탭 */}
        <section className="bg-[#121214] border border-white/10 p-6 rounded-3xl space-y-4 shadow-md">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">
              PARTNER SHOPS IN {dongName}
            </span>
            <h3 className="text-base md:text-xl font-black text-white mt-1">
              ✨ {regionFullName} {districtName} {dongName} 공식 제휴처 (총 {allShops.length}곳)
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {allShops.map((item) => {
              const isSelected = item.id === shop.id;
              const shopUrl = `/${region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}/shop/${item.id}`;

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                    isSelected
                      ? "bg-amber-500/10 border-amber-500/50 shadow-sm"
                      : "bg-black/40 border-white/10 hover:border-amber-500/30"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-white/10"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-white truncate">{item.name}</span>
                        {isSelected && (
                          <span className="text-[10px] bg-amber-500 text-black font-black px-2 py-0.5 rounded-full">
                            선택됨
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-400 truncate mt-0.5">{item.tagline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={shopUrl}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? "bg-amber-500 text-black font-black shadow-xs"
                          : "bg-white/5 text-gray-300 border border-white/10 hover:bg-amber-500 hover:text-black hover:border-amber-500"
                      }`}
                    >
                      {isSelected ? "안내 보기" : "샵 선택"}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 6대 코스 및 요금표 */}
        <section className="bg-[#121214] border border-white/10 p-6 md:p-8 rounded-3xl space-y-6 shadow-md">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">PROGRAM & PRICE</span>
            <h2 className="text-lg md:text-2xl font-black text-white mt-1">
              💎 {shop.name} 정규 코스 및 요금
            </h2>
          </div>

          <div className="space-y-6">
            {shop.courses.map((course, cIdx) => (
              <div key={cIdx} className="bg-black/40 border border-white/10 p-5 rounded-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-extrabold text-white text-base">{course.category}</h3>
                  {course.badge && (
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2.5 py-0.5 rounded-full border border-amber-500/30">
                      {course.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400">{course.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.offers.map((offer, oIdx) => (
                    <div
                      key={oIdx}
                      className="p-3.5 bg-[#18181c] rounded-xl border border-white/10 flex justify-between items-center shadow-xs"
                    >
                      <span className="text-xs font-bold text-gray-300">⏱️ {offer.time}</span>
                      <span className="text-sm font-black text-amber-400">{offer.priceText}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 하단 고정 전화예약 / 문자상담 플로팅 바 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0c]/95 backdrop-blur-xl border-t border-amber-500/20 p-3 md:p-4 shadow-2xl">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-3">
          <a
            href={`tel:${shop.phone.replace(/-/g, "")}`}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black py-3.5 rounded-2xl text-xs md:text-sm shadow-md transition-transform active:scale-95"
          >
            📞 전화예약 ({shop.phone})
          </a>
          <a
            href={`sms:${shop.phone.replace(/-/g, "")}`}
            className="flex items-center justify-center gap-2 bg-[#18181c] hover:bg-[#222228] border border-white/10 text-white font-black py-3.5 rounded-2xl text-xs md:text-sm transition-transform active:scale-95"
          >
            💬 문자상담
          </a>
        </div>
      </div>
    </div>
  );
}