// app/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import RegionSearchBox from "@/components/RegionSearchBox"; // 3단계 셀렉트 검색창만 클라이언트 컴포넌트로 분리
import { regionData } from "@/data/regions"; // 지역 데이터 분리

const SITE_URL = "https://allthat-homecare.netlify.app";

export const metadata: Metadata = {
  title: "서울·인천·경기 도심휴식 마사지 · 홈케어 | 올댓홈케어",
  description:
    "서울 출장마사지·스웨디시 업체를 올댓홈케어에서 비교하세요. 시·군·구별 코스, 정찰제 요금, 운영 시간을 확인하고 각 업체에 바로 예약할 수 있습니다.",
  keywords: [
    "올댓홈케어",
    "서울출장마사지",
    "인천출장마사지",
    "경기출장마사지",
    "홈케어마사지",
    "스웨디시",
    "아로마마사지",
    "도심휴식마사지",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "서울·인천·경기 도심휴식 마사지 · 홈케어 | 올댓홈케어",
    description:
      "서울 출장마사지·스웨디시 업체를 올댓홈케어에서 비교하세요. 시·군·구별 코스, 정찰제 요금, 운영 시간을 확인하고 각 업체에 바로 예약할 수 있습니다.",
    url: SITE_URL,
    siteName: "올댓홈케어",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/banner.jpg`,
        width: 1200,
        height: 630,
        alt: "올댓홈케어 - 서울·인천·경기 도심휴식 마사지 및 홈케어 안내",
      },
    ],
  },
};

const initialShops = [
  {
    id: 1,
    name: "바른안심테라피",
    desc: "서울·경기·인천 전지역 신속 안내, 정성 가득한 프리미엄 감성 바디 테라피 & 1:1 맞춤 케어",
    phone: "0507-1280-3140",
    price: "90,000원부터~",
    image: "/shop1.jpg",
  },
  {
    id: 2,
    name: "오늘밤바른케어",
    desc: "최고급 천연 아로마 오일 블렌딩, 지친 일상을 깨우는 고품격 프라이빗 힐링 바디 테라피 전문",
    phone: "0507-1280-3199",
    price: "60,000원부터~",
    image: "/shop2.jpg",
  },
  {
    id: 3,
    name: "주주안심홈타이",
    desc: "재방문율 1위, 철저한 위생 관리와 숙련된 테라피스트의 정통 바디 릴렉싱 프로그램",
    phone: "0507-1280-3197",
    price: "60,000원부터~",
    image: "/shop3.jpg",
  },
  {
    id: 4,
    name: "골든바른테라피",
    desc: "전문 테라피스트의 VIP 집중 피로회복 솔루션, 수도권 어디서나 편안하게 만나는 맞춤 힐링",
    phone: "0507-1280-3360",
    price: "60,000원부터~",
    image: "/shop4.jpg",
  },
  {
    id: 5,
    name: "퀸즈바른홈케어",
    desc: "수도권 전역 빠른 안내, 검증된 전문 매니저의 힐링 테라피 & 프리미엄 바디 밸런스 프로그램",
    phone: "0507-1280-3296",
    price: "60,000원부터~",
    image: "/shop5.jpg",
  },
];

const faqData = [
  {
    question: "예약 및 상담은 어떻게 진행되나요?",
    answer:
      "올댓홈케어에 등록된 제휴 업체의 전화연결 버튼을 통해 각 업체와 직접 소통하시며 코스 및 방문 일정을 조율하시면 됩니다.",
  },
  {
    question: "수도권 전 지역 출장 이용이 가능한가요?",
    answer:
      "서울 25개 구, 인천광역시, 경기도 주요 시·군·구별 제휴 네트워크가 갖추어져 있어 계신 위치에 맞춰 편리하게 안내받으실 수 있습니다.",
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "올댓홈케어",
        alternateName: "All That Homecare",
        description:
          "서울, 인천, 경기 전 지역 출장마사지, 스웨디시, 홈케어 업체 코스 및 요금 정보 안내 디렉터리 플랫폼",
        inLanguage: "ko-KR",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "올댓홈케어",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/og-image.png`,
        },
        image: `${SITE_URL}/banner.jpg`,
        description:
          "서울·인천·경기도 시·군·구별 출장 홈케어 및 스웨디시 제휴 업체 정보 안내",
        areaServed: [
          { "@type": "AdministrativeArea", name: "서울특별시" },
          { "@type": "AdministrativeArea", name: "경기도" },
          { "@type": "AdministrativeArea", name: "인천광역시" },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "0507-1280-3344",
          contactType: "customer support",
          areaServed: "KR",
          availableLanguage: ["Korean"],
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "홈",
            item: SITE_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: faqData.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="bg-[#070709] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* 1. 단일 표준 구조화 데이터 삽입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-12">
        {/* 2. 실제 시각적으로 노출되는 상단 H1 메인 배너 (sr-only 삭제) */}
        <section className="text-center my-2">
          <div className="overflow-hidden rounded-3xl border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.12)] relative h-60 md:h-72 flex items-center justify-center p-6 bg-gradient-to-b from-[#141418] to-[#0a0a0d]">
            <div className="relative z-10 space-y-3">
              <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold text-xs tracking-wider">
                도심 속 프라이빗 웰니스 큐레이션
              </span>
              <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight drop-shadow-lg">
                서울·인천·경기{" "}
                <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                  도심휴식 마사지 · 홈케어 | 올댓홈케어
                </span>
              </h1>
              <p className="text-gray-200 text-xs md:text-sm font-medium max-w-lg mx-auto leading-relaxed drop-shadow">
                서울 출장마사지·스웨디시 업체를 올댓홈케어에서 비교하세요. 시·군·구별 코스, 정찰제 요금, 운영 시간을 확인하고 각 업체에 바로 예약할 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 3. 추천 제휴 샵 목록: SSR로 즉시 본문 텍스트 제공 */}
        <section className="space-y-6">
          <div className="text-center mb-4">
            <p className="text-xs text-amber-400 font-bold tracking-widest uppercase">CERTIFIED PARTNERS</p>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">🏆 올댓홈케어 추천 제휴 샵</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {initialShops.map((lShop) => (
              <div
                key={lShop.id}
                className="bg-[#111114] border border-amber-500/20 rounded-2xl p-4 flex gap-4 items-center shadow-md"
              >
                <img
                  src={lShop.image}
                  alt={`${lShop.name} - ${lShop.desc}`}
                  width={96}
                  height={96}
                  loading="lazy"
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border border-white/10 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-sm md:text-base text-white truncate">
                    {lShop.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-1 line-clamp-2 leading-snug">
                    {lShop.desc}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-xs font-black text-amber-400">{lShop.price}</span>
                    <a
                      href={`tel:${lShop.phone.replace(/-/g, "")}`}
                      className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs px-3.5 py-1.5 rounded-xl shadow transition-colors flex items-center gap-1"
                    >
                      <span>📞</span> 전화연결
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. 클라이언트 전용 검색 박스 */}
        <section className="pt-6 border-t border-white/10">
          <RegionSearchBox />
        </section>

        {/* 5. 네이버 Yeti 수집용 전체 시·군·구 링크 트리 (순수 HTML <a> 태그 보장) */}
        <section className="bg-[#0b0b0e] border border-white/5 p-6 rounded-3xl space-y-5">
          <div className="border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
              <span>🗺️</span> 수도권 전 지역 출장 테라피 바로가기
            </h3>
            <p className="text-[11px] text-gray-400 mt-1">
              원하시는 시·군·구를 클릭하시면 해당 지역의 전문 출장 웰니스 목록으로 바로 이동합니다.
            </p>
          </div>

          <div className="space-y-6 pt-1">
            {Object.entries(regionData).map(([rKey, rVal]) => (
              <div key={rKey} className="space-y-2">
                <h4 className="text-xs font-bold text-gray-300 border-l-2 border-amber-500 pl-2">
                  {rVal.name}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {Object.entries(rVal.districts).map(([dKey, dVal]) => (
                    <Link
                      key={dKey}
                      href={`/${rKey}/${encodeURIComponent(dVal.name)}`}
                      className="text-xs bg-neutral-900/80 hover:bg-neutral-800 text-gray-300 hover:text-amber-400 px-3 py-2 rounded-xl border border-white/5 transition-all text-center truncate block"
                    >
                      {dVal.name} 출장 마사지
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. FAQ: details/summary로 구현하여 본문 텍스트와 JSON-LD 100% 매칭 */}
        <section className="space-y-4">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">FAQ</span>
            <h3 className="text-xl font-black text-white mt-1">자주 묻는 질문 | 올댓홈케어</h3>
          </div>
          <div className="space-y-3">
            {faqData.map((item, idx) => (
              <details
                key={idx}
                className="bg-neutral-900/70 rounded-2xl border border-white/5 overflow-hidden group"
              >
                <summary className="w-full p-4 text-left flex justify-between items-center font-bold text-sm text-gray-200 cursor-pointer list-none hover:text-amber-400 transition-colors">
                  <span className="flex items-center gap-2">
                    <span className="text-amber-400">Q.</span> {item.question}
                  </span>
                  <span className="text-amber-400 text-lg group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-4 pb-4 text-xs text-gray-300 leading-relaxed border-t border-white/5 pt-3 bg-black/40">
                  <span className="text-amber-400 font-bold">A. </span>
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </section>
      </main>

      {/* 7. 푸터 */}
      <footer className="bg-[#040406] border-t border-white/10 py-10 text-center text-gray-500 text-xs mt-auto">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div>
            <a
              href="tel:0507-1280-3344"
              className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-bold px-4 py-2 rounded-xl border border-amber-500/30 text-xs shadow-md"
            >
              🤝 올댓홈케어 입점 및 제휴 문의
            </a>
          </div>
          <p className="text-gray-400 font-medium">
            올댓홈케어는 서울·인천·경기 전 지역의 출장 마사지 및 홈케어 코스, 요금 정보를 중개·안내하는 플랫폼입니다.
          </p>
          <p className="text-[11px] text-gray-600">
            COPYRIGHT &copy; ALL THAT HOMECARE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}