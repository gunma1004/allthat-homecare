import { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://baruncare-seoul.netlify.app";

export const metadata: Metadata = {
  // 🌟 '바른케어' 브랜드명이 항상 뒤쪽에 결합
  title: "선입금 없는 안심 출장 마사지 프로그램 안내 | 바른케어",
  description:
    "100% 현장 후불 정찰제로 안전하게 만나는 바른케어 코스 안내. 스트레칭 건식 릴렉스, 최고급 식물성 아로마 오일 케어, 섬세한 감성 스웨디시 등 체계적인 힐링 테라피 코스를 확인하세요.",
  keywords: [
    "출장마사지프로그램",
    "선입금없는출장마사지",
    "스웨디시코스",
    "아로마테라피",
    "바디케어코스",
    "홈타이",
    "바른케어",
  ],
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "선입금 없는 안심 출장 마사지 프로그램 안내 | 바른케어",
    description: "100% 현장 후불제 개인 맞춤형 릴렉싱 케어와 안락한 프라이빗 바디 테라피 상세 코스 가이드.",
    url: `${SITE_URL}/services`,
    siteName: "바른케어",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/banner.jpg`,
        width: 1200,
        height: 630,
        alt: "바른케어 바디 케어 프로그램 가이드",
      },
    ],
  },
};

const programs = [
  {
    step: "01",
    name: "클래식 건식 릴렉스 스트레칭",
    desc: "전신의 뭉친 근육과 일상 긴장으로 굳은 관절을 부드럽게 풀어주는 스트레칭 중심의 전통 바디 케어 코스입니다.",
    target: "운동 부족, 만성 뻐근함, 하체 부종 완화",
  },
  {
    step: "02",
    name: "천연 에센셜 아로마 오일 케어",
    desc: "엄선된 천연 식물성 에센셜 오일을 사용하여 피부 자극 없이 부드럽게 체내 순환과 피로 해소를 돕는 릴렉싱 코스입니다.",
    target: "스트레스 완화, 피부 보습, 림프 순환",
  },
  {
    step: "03",
    name: "VIP 안심 감성 스웨디시",
    desc: "섬세한 유러피언 터칭 기법으로 림프 순환을 촉진하고 지친 몸과 마음에 깊은 평온을 선사하는 시그니처 감성 케어입니다.",
    target: "극도의 피로, 수면 장애, 심신 안정",
  },
];

export default function ServicesPage() {
  // Schema.org W3C 표준 규격 ItemList 구조화 데이터
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "바른케어 프리미엄 바디 테라피 코스 리스트",
    url: `${SITE_URL}/services`,
    itemListElement: programs.map((prog, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Service",
        name: prog.name,
        description: prog.desc,
        provider: {
          "@type": "Organization",
          name: "바른케어",
          url: SITE_URL,
        },
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

      <div className="max-w-4xl mx-auto space-y-10">
        {/* 상단 타이틀 */}
        <header className="text-center space-y-2">
          <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">
            CERTIFIED CARE SERVICE
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            선입금 0원 안심 프로그램 안내 | 바른케어
          </h1>
          <p className="text-xs md:text-sm text-gray-400">
            고객님의 컨디션과 취향에 맞춘 100% 현장 후불 정찰제 힐링 솔루션
          </p>
        </header>

        {/* 3대 핵심 프로그램 카드 */}
        <section className="space-y-4">
          <h2 className="text-sm font-black text-amber-400 tracking-wider uppercase">
            💎 시그니처 웰니스 프로그램 라인업
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.map((prog) => (
              <div
                key={prog.step}
                className="bg-[#111114] border border-amber-500/20 hover:border-amber-500/50 p-6 rounded-3xl space-y-3 transition-all shadow-md flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="text-amber-400 text-2xl font-black">{prog.step}</div>
                  <h3 className="font-bold text-lg text-white">{prog.name}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{prog.desc}</p>
                </div>
                <div className="pt-3 border-t border-white/5 text-[11px] text-amber-300/80 font-medium">
                  추천 대상: {prog.target}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 네이버 C-Rank / D.I.A. 상위 노출용 전문 칼럼 */}
        <article className="bg-[#0e0e12] border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6 text-xs sm:text-sm text-gray-300 leading-relaxed">
          <div className="border-b border-white/10 pb-4">
            <span className="text-amber-400 font-extrabold text-xs tracking-widest block uppercase mb-1">
              BARUNCARE WELLNESS THEORY
            </span>
            <h2 className="text-lg sm:text-xl font-black text-white">
              신체 피로 패턴에 맞는 올바른 관리 기법 선택 가이드 | 바른케어
            </h2>
            <p className="text-gray-400 text-xs mt-1">
              건식 스트레칭, 아로마 림프 케어, 감성 스웨디시의 작용 메커니즘 차이
            </p>
          </div>

          <div className="space-y-2.5">
            <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
              <span className="text-amber-400 font-bold">1.</span> 수동적 스트레칭 중심의 전통 건식 릴렉스 케어
            </h3>
            <p className="text-gray-400">
              오일을 바르지 않고 편안한 복장 상태에서 진행되는 건식 관리는 압박 요법과 관절 신전(스트레칭)을 결합한 형태입니다. 바쁜 일상에서 전신 스트레칭을 하기 어려운 현대인들에게 이상적이며, 둔근과 햄스트링, 척추 기립근을 넓은 면적으로 견인하여 관절 가동 범위를 물리적으로 넓혀줍니다. 무겁고 뻐근한 몸을 시원하게 정돈하고자 할 때 권장됩니다.
            </p>
          </div>

          <div className="space-y-2.5">
            <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
              <span className="text-amber-400 font-bold">2.</span> 천연 식물성 에센셜을 활용한 아로마 림프 케어
            </h3>
            <p className="text-gray-400">
              피부에 식물성 베이스 오일을 도포하여 마찰 저항을 덜어낸 상태로 진행되는 부드러운 관리입니다. 후각을 통해 대뇌 변연계를 자극하는 아로마테라피 원리를 접목하여 만성적인 교감신경 흥분을 안정화시키며, 서혜부와 액와부 등 주요 림프절을 따라 피부층을 미세하게 자극하여 부종 완화와 혈액 순환을 촉진합니다.
            </p>
          </div>

          <div className="space-y-2.5">
            <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
              <span className="text-amber-400 font-bold">3.</span> 심신의 깊은 이완과 힐링을 돕는 감성 스웨디시
            </h3>
            <p className="text-gray-400">
              유러피언 정통 테크닉에서 발전한 스웨디시는 강한 통증성 지압을 지양하고, 혈류와 심장 방향으로 부드럽고 리드미컬하게 밀어 올리는 섬세한 수기 기법입니다. 통증 수용기를 자극하지 않으면서 피로 물질 배출을 유도하므로, 스트레스로 인한 수면 장애나 극심한 피로감을 겪는 분들에게 안정감 있는 휴식을 제공합니다.
            </p>
          </div>
        </article>

        {/* 안심 정찰제 안내 박스 */}
        <section className="bg-[#0e0e12] border border-white/10 p-6 rounded-3xl text-center space-y-2 shadow-inner">
          <p className="text-xs md:text-sm text-gray-300 font-semibold">
            ✨ 바른케어의 모든 프로그램은 선입금 없는 100% 후불 정찰제로 운영됩니다.
          </p>
          <p className="text-[11px] text-gray-500">
            숙련된 전문 테라피스트의 정성 어린 1:1 맞춤형 케어로 안전하게 일상의 활력을 되찾아보세요.
          </p>
          <div className="pt-2">
            <Link
              href="/prices"
              className="text-xs text-amber-400 hover:text-amber-300 font-bold underline underline-offset-4"
            >
              코스별 정찰제 이용 요금표 확인하기 →
            </Link>
          </div>
        </section>

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
            📞 프로그램 맞춤 상담
          </a>
        </footer>
      </div>
    </div>
  );
}