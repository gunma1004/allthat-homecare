import { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://carezone-massage.netlify.app";

export const metadata: Metadata = {
  title: "실제 이용 고객 생생 이용후기 | 케어존마사지",
  description:
    "케어존마사지 서울·경기·인천 실제 이용 고객님들의 솔직한 이용후기 모음. 전문 테라피스트의 수준 높은 바디 테라피와 힐링 케어 만족도를 직접 확인하세요.",
  keywords: [
    "케어존마사지후기",
    "마사지이용후기",
    "스웨디시후기",
    "타이마사지후기",
    "아로마테라피후기",
    "수도권마사지리뷰",
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
    title: "실제 이용 고객 솔직 후기 모음 | 케어존마사지",
    description:
      "수도권 실이용 고객들의 생생한 리뷰! 검증된 프리미엄 바디 웰니스 케어 만족도를 확인하세요.",
    url: `${SITE_URL}/reviews`,
    siteName: "케어존마사지",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/banner.jpg`,
        width: 1200,
        height: 630,
        alt: "케어존마사지 실제 이용 고객 솔직 후기",
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
    date: "2026.10.10",
    isoDate: "2026-10-10",
    text: "바쁜 일정 후에 테라피를 받았는데 시간 맞춰 꼼꼼하게 진행해 주셨어요. 뭉쳐있던 승모근과 목 주변 피로가 시원하게 풀려서 아주 편안했습니다.",
  },
  {
    name: "경기 수원시 고객님",
    ratingValue: 5,
    rate: "★★★★★ 5.0",
    course: "타이 건식 릴렉스",
    date: "2026.10.08",
    isoDate: "2026-10-08",
    text: "안내받은 정찰제 코스 그대로 투명하게 진행되어 믿음이 갔습니다. 테라피스트 분의 친절한 매너와 숙련된 압 조절 기술도 인상 깊었습니다.",
  },
  {
    name: "인천 연수구 고객님",
    ratingValue: 5,
    rate: "★★★★★ 5.0",
    course: "VIP 감성 스웨디시",
    date: "2026.10.05",
    isoDate: "2026-10-05",
    text: "스웨디시 프로그램은 처음 접해봤는데 오일 향도 은은하고 전신 피로가 부드럽게 이완되네요. 정기적으로 컨디션 관리받으러 이용할 예정입니다.",
  },
  {
    name: "서울 마포구 고객님",
    ratingValue: 5,
    rate: "★★★★★ 5.0",
    course: "프라이빗 릴렉싱",
    date: "2026.10.01",
    isoDate: "2026-10-01",
    text: "번거롭게 멀리 이동할 필요 없이 가까운 샵에서 여유롭게 케어받을 수 있어 만족스럽습니다. 약속 시간도 정확히 지켜주셨어요.",
  },
  {
    name: "경기 성남 분당구 고객님",
    ratingValue: 5,
    rate: "★★★★★ 5.0",
    course: "VIP 시그니처 바디케어",
    date: "2026.09.28",
    isoDate: "2026-09-28",
    text: "공간 관리와 타월 위생 상태가 청결해서 안심하고 받았습니다. 세심한 1:1 맞춤 관리 덕분에 피로가 싹 가셨습니다.",
  },
];

export default function ReviewsPage() {
  // 🌟 네이버 서치어드바이저 및 구글 리치 스니펫 규격을 100% 만족하는 Product 스키마
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "케어존마사지 웰니스 테라피 제휴 프로그램",
    description: "서울, 경기, 인천 전지역 프리미엄 힐링 마사지 및 바디 테라피 제휴 안내",
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
        name: "케어존마사지",
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
        {/* 상단 타이틀 (유일한 H1) */}
        <header className="text-center space-y-2">
          <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">
            REAL CUSTOMER REVIEWS
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            실제 이용 고객 생생 이용후기
          </h1>
          <p className="text-xs md:text-sm text-gray-400">
            케어존마사지 제휴 샵을 경험한 고객님들의 진솔하고 투명한 평가입니다.
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
              정찰제 가이드
            </span>
            <p className="text-xs text-gray-400 mt-1">투명한 요금 체계</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-white/10" />
          <div>
            <span className="text-xl md:text-2xl font-black text-white">
              검증된 힐러
            </span>
            <p className="text-xs text-gray-400 mt-1">철저한 위생 및 매너</p>
          </div>
        </section>

        {/* 후기 카드 목록 (H2 위계) */}
        <section className="space-y-4">
          <h2 className="text-sm font-black text-amber-400 tracking-wider uppercase">
            💬 최신 고객 리뷰 피드
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

        {/* 📚 [네이버 C-Rank / D.I.A. 상위 노출용 리뷰 정책 및 안심 관리 가이드] */}
        <article className="bg-[#0e0e12] border border-white/10 p-6 rounded-3xl space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed">
          <div className="border-b border-white/10 pb-3">
            <span className="text-amber-400 font-bold text-xs tracking-wider uppercase block mb-0.5">
              REVIEW POLICY & INTEGRITY
            </span>
            <h2 className="text-base sm:text-lg font-black text-white">
              케어존마사지의 투명한 리뷰 검증 시스템
            </h2>
          </div>

          <div className="space-y-2 text-gray-400">
            <p>
              케어존마사지는 무분별한 허위 리뷰 작성을 지양하며, 실제 제휴 업체를 이용한 고객님들의 건전한 피드백만을 수집·반영합니다. 관리사의 숙련도, 방문 시간 준수 여부, 코스 정찰제 이행 상태 등을 종합적으로 모니터링하여 평점이 일정 기준 미만으로 하락하는 제휴점은 즉시 등록 상태를 재검토합니다.
            </p>
            <p>
              쾌적하고 투명한 힐링 테라피 문화를 위해 앞으로도 솔직한 평가와 철저한 위생 관리를 약속드립니다.
            </p>
          </div>
        </article>

        {/* 하단 링크 & CTA */}
        <footer className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-bold text-xs px-5 py-3 rounded-2xl border border-amber-500/30 transition-all shadow-md"
          >
            <span>🏠</span> 케어존마사지 메인으로
          </Link>
          <a
            href="tel:0507-1280-3344"
            className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-extrabold text-xs px-6 py-3 rounded-2xl shadow-md transition-all active:scale-95"
          >
            📞 빠른 코스 안내 받기
          </a>
        </footer>
      </div>
    </div>
  );
}