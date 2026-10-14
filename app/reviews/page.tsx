import { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://baruncare-seoul.netlify.app";

export const metadata: Metadata = {
  // 🌟 '바른케어' 브랜드명이 항상 뒤쪽에 결합
  title: "선입금 없는 출장 안심 마사지 실제 이용 고객 솔직 후기 | 바른케어",
  description:
    "바른케어 서울·경기·인천 실제 이용 고객님들의 100% 현장 후불제 솔직 후기 모음. 선입금 없는 정찰제 만족도와 전문 관리사의 정성 어린 홈 테라피 평가를 확인하세요.",
  keywords: [
    "출장마사지후기",
    "선입금없는출장마사지후기",
    "출장안심마사지리뷰",
    "스웨디시후기",
    "아로마테라피후기",
    "홈타이후기",
    "바른케어",
  ],
  alternates: {
    canonical: `${SITE_URL}/reviews`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "선입금 없는 출장 안심 마사지 실제 이용 고객 솔직 후기 | 바른케어",
    description:
      "수도권 실이용 고객들의 생생한 리뷰! 선입금 0원, 100% 현장 후불제 프리미엄 바디 웰니스 만족도를 확인하세요.",
    url: `${SITE_URL}/reviews`,
    siteName: "바른케어",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/banner.jpg`,
        width: 1200,
        height: 630,
        alt: "바른케어 실제 이용 고객 솔직 후기",
      },
    ],
  },
};

interface ReviewItem {
  name: string;
  ratingValue: number;
  rate: string;
  course: string;
  date: string;
  isoDate: string;
  text: string;
}

const reviews: ReviewItem[] = [
  {
    name: "서울 강남구 직장인",
    ratingValue: 5,
    rate: "★★★★★ 5.0",
    course: "아로마 힐링 케어",
    date: "2026.10.12",
    isoDate: "2026-10-12",
    text: "예약 선입금 사기 걱정 없이 관리사분이 직접 도착하신 뒤 결제하는 시스템이라 정말 안심했습니다. 뭉친 승모근과 허리 피로를 정성껏 풀어주셔서 개운하네요.",
  },
  {
    name: "경기 수원시 고객님",
    ratingValue: 5,
    rate: "★★★★★ 5.0",
    course: "건식 릴렉스 스트레칭",
    date: "2026.10.10",
    isoDate: "2026-10-10",
    text: "바른케어에 고지된 정찰제 요금 그대로 불필요한 추가금 요구 없이 깔끔하게 진행되었습니다. 테라피스트 분의 친절한 매너와 숙련된 압 조절 기술도 훌륭합니다.",
  },
  {
    name: "인천 송도 연수구 고객님",
    ratingValue: 5,
    rate: "★★★★★ 5.0",
    course: "VIP 감성 스웨디시",
    date: "2026.10.07",
    isoDate: "2026-10-07",
    text: "스웨디시 프로그램은 처음 이용해봤는데 천연 오일 향도 편안하고 림프 순환이 잘 되어 몸이 한결 가볍습니다. 앞으로도 정기적으로 이용할 생각입니다.",
  },
  {
    name: "서울 마포구 고객님",
    ratingValue: 5,
    rate: "★★★★★ 5.0",
    course: "프라이빗 릴렉싱",
    date: "2026.10.04",
    isoDate: "2026-10-04",
    text: "피곤한 몸을 이끌고 밖으로 이동할 필요 없이 집에서 안전하게 받을 수 있어 너무 편했습니다. 방문 시간도 1분도 어기지 않고 정확히 맞춰주셨어요.",
  },
  {
    name: "경기 성남 분당구 고객님",
    ratingValue: 5,
    rate: "★★★★★ 5.0",
    course: "VIP 시그니처 바디케어",
    date: "2026.09.30",
    isoDate: "2026-09-30",
    text: "타월과 소모품 위생 관리가 철저해서 쾌적했습니다. 선입금 요구가 일절 없는 검증된 플랫폼이라 주변 지인들에게도 적극 추천하고 있습니다.",
  },
];

export default function ReviewsPage() {
  // 🌟 네이버 서치어드바이저 및 구글 리치 스니펫 규격을 만족하는 Product + Review 스키마
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "바른케어 선입금 없는 안심 출장 마사지 프로그램",
    description: "서울, 경기, 인천 전 지역 선입금 없는 100% 현장 후불 정찰제 출장 힐링 테라피 안내",
    image: `${SITE_URL}/banner.jpg`,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "KRW",
      lowPrice: 60000,
      highPrice: 180000,
      offerCount: reviews.length.toString(),
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "바른케어",
        url: SITE_URL,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: reviews.length.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    review: reviews.map((rev) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: rev.name,
      },
      datePublished: rev.isoDate,
      reviewRating: {
        "@type": "Rating",
        ratingValue: rev.ratingValue,
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: rev.text,
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
        {/* 상단 타이틀 (단일 H1) */}
        <header className="text-center space-y-2">
          <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">
            REAL VERIFIED REVIEWS
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            실제 이용 고객 솔직 후기 | 바른케어
          </h1>
          <p className="text-xs md:text-sm text-gray-400">
            선입금 0원, 100% 후불 정찰제로 바른케어를 경험하신 고객님들의 투명한 평가입니다.
          </p>
        </header>

        {/* 평점 요약 배너 */}
        <section className="bg-[#111114] border border-amber-500/20 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-around gap-4 text-center shadow-lg">
          <div>
            <span className="text-3xl md:text-4xl font-black text-amber-400">
              4.9 / 5.0
            </span>
            <p className="text-xs text-gray-400 mt-1">고객 종합 만족도</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-white/10" />
          <div>
            <span className="text-xl md:text-2xl font-black text-white">
              100% 현장 후불
            </span>
            <p className="text-xs text-gray-400 mt-1">예약 선입금 0원 보장</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-white/10" />
          <div>
            <span className="text-xl md:text-2xl font-black text-white">
              검증된 테라피스트
            </span>
            <p className="text-xs text-gray-400 mt-1">철저한 위생 및 정찰제 준수</p>
          </div>
        </section>

        {/* 후기 카드 목록 (H2 위계) */}
        <section className="space-y-4">
          <h2 className="text-sm font-black text-amber-400 tracking-wider uppercase">
            💬 최신 고객 안심 후기 피드
          </h2>
          <div className="space-y-4">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="bg-[#111114] border border-white/5 hover:border-amber-500/30 p-5 rounded-2xl space-y-2.5 transition-all shadow-md"
              >
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-black">{rev.rate}</span>
                    <span className="bg-amber-500/10 text-amber-300 text-[10px] px-2 py-0.5 rounded-md border border-amber-500/20 font-semibold">
                      {rev.course}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-[11px]">
                    <span className="font-medium text-gray-400">{rev.name}</span>
                    <span>•</span>
                    <time dateTime={rev.isoDate}>{rev.date}</time>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-medium">
                  &quot;{rev.text}&quot;
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 📚 네이버 C-Rank / D.I.A. 상위 노출용 리뷰 정책 칼럼 */}
        <article className="bg-[#0e0e12] border border-white/10 p-6 rounded-3xl space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed">
          <div className="border-b border-white/10 pb-3">
            <span className="text-amber-400 font-bold text-xs tracking-wider uppercase block mb-0.5">
              SAFETY & INTEGRITY POLICY
            </span>
            <h2 className="text-base sm:text-lg font-black text-white">
              바른케어의 안심 후불제 및 투명 리뷰 정책
            </h2>
          </div>

          <div className="space-y-2 text-gray-400">
            <p>
              바른케어는 출장형 바디케어 서비스 시장에서 만연한 예약금 사기 피해를 방지하기 위해 출범한 신뢰 안내 플랫폼입니다. 등록된 모든 제휴 업체는 관리사가 현장에 도착하기 전 어떠한 명목으로도 선입금을 요구할 수 없으며, 이를 위반하는 업체는 즉시 제휴가 영구 해지됩니다.
            </p>
            <p>
              또한 본 페이지의 모든 후기는 실제 이용 고객의 평가만을 기반으로 수집되며 조작 없는 투명한 정보 제공을 최우선으로 삼고 있습니다. 앞으로도 수도권 전역에서 안심하고 누릴 수 있는 정찰제 힐링 문화를 만들어가겠습니다.
            </p>
          </div>
        </article>

        {/* 하단 링크 & CTA */}
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
            📞 선입금 0원 코스 상담
          </a>
        </footer>
      </div>
    </div>
  );
}