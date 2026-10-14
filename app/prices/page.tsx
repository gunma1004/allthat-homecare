import { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://baruncare-seoul.netlify.app";

export const metadata: Metadata = {
  // 🌟 '바른케어' 브랜드명이 항상 뒤쪽에 결합
  title: "선입금 없는 출장 안심 마사지 코스별 정찰제 이용 요금표 | 바른케어",
  description:
    "100% 현장 후불제 바른케어 코스별 정찰제 이용 요금 안내. 건식 릴렉스 스트레칭, 천연 아로마 케어, 감성 스웨디시 등 선입금 없는 투명한 테라피 코스 비용을 확인하세요.",
  keywords: [
    "출장마사지가격",
    "선입금없는출장마사지가격",
    "출장안심마사지요금",
    "스웨디시가격",
    "아로마테라피가격",
    "홈타이가격",
    "바디케어비용",
    "바른케어",
  ],
  alternates: {
    canonical: `${SITE_URL}/prices`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "선입금 없는 출장 안심 마사지 코스별 정찰제 이용 요금표 | 바른케어",
    description:
      "수도권 전 지역 엄선된 안심 네트워크! 선입금 0원, 투명하고 합리적인 힐링 바디 테라피 정찰 요금 안내.",
    url: `${SITE_URL}/prices`,
    siteName: "바른케어",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/banner.jpg`,
        width: 1200,
        height: 630,
        alt: "바른케어 코스별 이용 요금표",
      },
    ],
  },
};

interface PriceItem {
  title: string;
  price: string;
  priceNumber: number;
  desc: string;
  tag: string;
}

const priceList: PriceItem[] = [
  {
    title: "건식 릴렉스 스트레칭 (60분)",
    price: "60,000원부터",
    priceNumber: 60000,
    desc: "굳은 근육을 부드럽게 이완하고 전신 유연성을 회복시켜 주는 기본 스트레칭 프로그램",
    tag: "기본 피로회복",
  },
  {
    title: "천연 아로마 오일 힐링 케어 (60분)",
    price: "70,000원부터",
    priceNumber: 70000,
    desc: "식물성 천연 에센셜 오일을 활용하여 심신 안정과 전신 순환을 돕는 부드러운 릴렉싱 코스",
    tag: "보습 & 릴렉스",
  },
  {
    title: "감성 스웨디시 테라피 (60분)",
    price: "90,000원부터",
    priceNumber: 90000,
    desc: "섬세한 터칭 기법으로 체내 림프 순환과 깊은 휴식을 선사하는 VIP 프리미엄 프로그램",
    tag: "감성 힐링",
  },
  {
    title: "한국인 베테랑 VIP 시그니처 (60분)",
    price: "140,000원부터",
    priceNumber: 140000,
    desc: "숙련된 전문 테라피스트의 체형별 1:1 맞춤형 피로 해소 및 딥 릴렉스 솔루션",
    tag: "최고급 맞춤형",
  },
];

export default function PricesPage() {
  // 🌟 Schema.org 표준 유효성을 충족하는 OfferCatalog + Service 구조화 데이터
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "바른케어 코스별 이용 요금표",
    url: `${SITE_URL}/prices`,
    itemListElement: priceList.map((item) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: item.title,
        description: item.desc,
      },
      price: item.priceNumber,
      priceCurrency: "KRW",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "바른케어",
        url: SITE_URL,
      },
    })),
  };

  return (
    <div className="bg-[#070709] text-gray-100 min-h-screen py-10 px-4 font-sans selection:bg-amber-500 selection:text-black">
      {/* 1. 구조화 데이터 주입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto space-y-8">
        {/* 상단 타이틀 헤더 (단일 H1) */}
        <header className="text-center space-y-2">
          <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">
            TRANSPARENT PRICE SYSTEM
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            선입금 0원 투명 요금표 | 바른케어
          </h1>
          <p className="text-xs md:text-sm text-gray-400">
            100% 현장 후불 정찰제 가격 안내 / 안심 제휴 네트워크 가이드
          </p>
        </header>

        {/* 정찰제 안심 약속 공지 배너 */}
        <section className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-l-4 border-amber-500 p-4 rounded-2xl shadow-inner">
          <p className="text-xs md:text-sm font-bold text-amber-300">
            🔒 바른케어 안심 약속: 선입금 일절 없는 100% 현장 후불 정찰제를 엄격히 준수합니다.
          </p>
          <p className="text-[11px] text-gray-400 mt-1">
            모든 제휴 샵은 명시된 표준 코스 가이드라인을 준수하며, 예약금 선입금 요구나 현장 부당 추가금을 절대 요구하지 않습니다.
          </p>
        </section>

        {/* 요금 카드 목록 (H2 위계) */}
        <section className="space-y-4">
          <h2 className="text-sm font-black text-amber-400 tracking-wider uppercase">
            💎 코스별 표준 정찰제 요금표
          </h2>
          <div className="space-y-4">
            {priceList.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#111114] border border-amber-500/20 hover:border-amber-500/50 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all shadow-md"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-sm md:text-base">
                      {item.title}
                    </h3>
                    <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/30">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
                <div className="self-end sm:self-center">
                  <span className="text-amber-400 font-black text-sm md:text-base bg-black/60 px-4 py-2 rounded-xl border border-amber-500/30 shadow-inner whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 네이버 C-Rank / D.I.A. 상위 노출용 가격 & 코스 선택 가이드 칼럼 */}
        <article className="bg-[#0e0e12] border border-white/10 p-6 rounded-3xl space-y-5 text-xs sm:text-sm text-gray-300 leading-relaxed">
          <div className="border-b border-white/10 pb-3">
            <span className="text-amber-400 font-bold text-xs tracking-wider uppercase block mb-0.5">
              PRICE GUIDE & SAFETY TIPS
            </span>
            <h2 className="text-base sm:text-lg font-black text-white">
              합리적이고 안전한 웰니스 케어를 위한 코스 선택 요령
            </h2>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5">
              <span className="text-amber-400 font-bold">1.</span> 60분 vs 90분 코스, 나에게 맞는 시간대는?
            </h3>
            <p className="text-gray-400">
              특정 부위(목, 어깨 등)의 가벼운 피로 회복이 목적이라면 60분 기본 코스로도 충분한 순환 효과를 얻을 수 있습니다. 반면, 오랜 좌식 생활로 골반 지지근과 전신 림프 순환이 굳어있는 만성 피로 상태라면 후두하근부터 둔근, 하체까지 넓은 면적을 차분하게 이완시키는 90분 이상의 집중 프로그램을 선택하시는 것이 생리학적 회복 효과가 훨씬 높습니다.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5">
              <span className="text-amber-400 font-bold">2.</span> 100% 현장 후불제 확인이 필수인 이유
            </h3>
            <p className="text-gray-400">
              방문형 웰니스 서비스를 이용하실 때 가장 중요한 안전 수칙은 <strong>선입금이나 예약금을 요구하지 않는 제휴점</strong>을 이용하는 것입니다. 바른케어는 검증된 공식 파트너 네트워크를 통해 관리사가 도착한 후 프로그램을 확인하고 결제하는 정찰제 원칙을 엄격하게 준수합니다.
            </p>
          </div>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between">
            <Link
              href="/services"
              className="text-xs text-amber-400 hover:text-amber-300 font-bold underline underline-offset-4"
            >
              프로그램별 상세 특징 비교하기 →
            </Link>
            <span className="text-[11px] text-gray-500">표준 정찰제 가이드라인 준수</span>
          </div>
        </article>

        {/* 하단 CTA 버튼 */}
        <footer className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-bold text-xs px-5 py-3 rounded-2xl border border-amber-500/30 transition-all shadow-md"
          >
            <span>🏠</span> 바른케어 메인으로
          </Link>
          <a
            href="tel:0507-1280-3344"
            className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-extrabold text-xs px-6 py-3 rounded-2xl shadow-md transition-all active:scale-95"
          >
            📞 코스 실시간 문의
          </a>
        </footer>
      </div>
    </div>
  );
}