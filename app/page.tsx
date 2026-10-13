// app/page.tsx
import { Metadata } from "next";
import MainClientUI from "./MainClientUI";

const SITE_URL = "https://carezone-massage.netlify.app";

export const metadata: Metadata = {
  title: "서울·인천·경기 출장 마사지&테라피 제휴 할인 플랫폼 | 케어존마사지",
  description:
    "서울, 인천, 경기 전 지역 출장마사지, 스웨디시, 타이, 아로마 힐링 케어 정보 및 최저가 제휴 할인 플랫폼 케어존마사지입니다.",
  keywords: [
    "케어존마사지",
    "서울출장마사지",
    "경기출장마사지",
    "인천출장마사지",
    "스웨디시",
    "타이마사지",
    "아로마테라피",
    "수도권출장케어",
    "마사지할인",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "서울·인천·경기 출장 마사지&테라피 제휴 할인 플랫폼 | 케어존마사지",
    description:
      "서울, 인천, 경기 출장마사지 웰니스 테라피 제휴 정보를 비교하고 실시간 최저가 할인을 확인하세요.",
    url: SITE_URL,
    siteName: "케어존마사지",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/banner.jpg",
        width: 1200,
        height: 630,
        alt: "케어존마사지 메인 배너",
      },
    ],
  },
};

export default function Page() {
  // 메인 페이지 전용 WebSite & Service 구조화 데이터
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "케어존마사지",
        description: "서울, 경기, 인천 전 지역 출장 마사지 및 테라피 제휴 플랫폼",
        inLanguage: "ko-KR",
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "케어존마사지",
        url: SITE_URL,
        telephone: "0507-1280-3344",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "0507-1280-3344",
          contactType: "customer service",
          areaServed: ["KR"],
          availableLanguage: ["Korean"],
        },
      },
    ],
  };

  return (
    <>
      {/* 1. 검색엔진 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 2. 네이버 수집 봇(Yeti)용 서버 사이드 핵심 시맨틱 텍스트 (SSR 보장) 
          클라이언트 UI가 렌더링되기 전 Yeti가 HTML 소스만 긁어가도 
          H1과 본문 주요 키워드가 즉시 수집되어 빈 페이지 판정을 원천 차단합니다. */}
      <header className="sr-only">
        <h1>서울·인천·경기 출장 마사지 & 웰니스 테라피 예약 플랫폼 케어존</h1>
        <p>
          케어존마사지는 서울 강남·강서·마포, 경기 수원·성남·고양, 인천 송도·부평 등 
          수도권 전 지역의 스웨디시, 타이마사지, 아로마테라피 홈케어 및 방문 힐링 서비스 정보를 제공합니다.
        </p>
      </header>

      {/* 3. 실제 사용자 인터랙션 클라이언트 컴포넌트 */}
      <main>
        <MainClientUI />
      </main>
    </>
  );
}