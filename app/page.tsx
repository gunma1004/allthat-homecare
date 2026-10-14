// app/page.tsx
import { Metadata } from "next";
import MainClientUI from "./MainClientUI";

const SITE_URL = "https://onshim-therapy.netlify.app";

export const metadata: Metadata = {
  title: "온쉼테라피 | 서울·경기·인천 출장 웰니스 마사지 예약 플랫폼",
  description:
    "도심 속 편안한 휴식을 선사하는 온쉼테라피입니다. 서울, 경기, 인천 전 지역 출장 마사지, 스웨디시, 아로마 힐링 케어 및 투명한 정찰제 제휴 안내를 확인하세요.",
  keywords: [
    "온쉼테라피",
    "출장마사지",
    "서울출장마사지",
    "경기출장마사지",
    "인천출장마사지",
    "출장웰니스마사지",
    "스웨디시",
    "아로마테라피",
    "바디케어",
    "마사지예약",
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
    title: "온쉼테라피 | 서울·경기·인천 출장 웰니스 마사지 예약 플랫폼",
    description:
      "도심 속 편안한 휴식을 선사하는 온쉼테라피입니다. 출장 마사지, 스웨디시, 아로마 힐링 케어 정보 및 최적의 정찰제 코스를 한눈에 확인하세요.",
    url: SITE_URL,
    siteName: "온쉼테라피",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/banner.jpg`,
        width: 1200,
        height: 630,
        alt: "온쉼테라피 수도권 출장 웰니스 마사지 메인 배너",
      },
    ],
  },
};

export default function Page() {
  // 🌟 [포근 레퍼런스 기준 4대 복합 JSON-LD] WebSite + HealthAndBeautyBusiness + BreadcrumbList + FAQPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. 공식 웹사이트 정보
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "온쉼테라피",
        description: "서울, 경기, 인천 전 지역 출장 웰니스 마사지 및 프리미엄 테라피 안내 플랫폼",
        inLanguage: "ko-KR",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      // 2. 비즈니스 엔터티 정보 (HealthAndBeautyBusiness + Organization)
      {
        "@type": ["HealthAndBeautyBusiness", "Organization"],
        "@id": `${SITE_URL}/#organization`,
        name: "온쉼테라피",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/og-image.png`,
        },
        image: `${SITE_URL}/banner.jpg`,
        telephone: "0507-1280-3344",
        priceRange: "60,000원~180,000원",
        currenciesAccepted: "KRW",
        areaServed: {
          "@type": "AdministrativeArea",
          name: "수도권 (서울특별시, 경기도, 인천광역시)",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "0507-1280-3344",
          contactType: "customer service",
          areaServed: "KR",
          availableLanguage: "Korean",
        },
      },
      // 3. 네이버/구글 상단 탐색 경로 (BreadcrumbList)
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
      // 4. 검색 결과 화면 아코디언 노출 지원 (FAQPage)
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "온쉼테라피 예약 및 상담은 어떻게 진행되나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "각 제휴 업체의 전화연결 버튼을 통해 담당 매니저와 직접 연결되며, 원하시는 코스와 방문 시간을 편리하게 조율하실 수 있습니다.",
            },
          },
          {
            "@type": "Question",
            name: "수도권 전 지역 출장 방문이 가능한가요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "네, 서울 25개 구, 경기도 31개 시·군, 인천 전역의 주요 권역별로 신속한 방문 케어가 가능하도록 제휴 네트워크가 구축되어 있습니다.",
            },
          },
          {
            "@type": "Question",
            name: "예약금이나 선입금을 요구하나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "온쉼테라피의 모든 공식 제휴 업체는 100% 현장 후불 정찰제로 운영되며 사전 선입금을 절대 요구하지 않습니다.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      {/* 1. 검색엔진 구조화 데이터 주입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 2. 네이버 수집 봇(Yeti)용 서버 사이드 핵심 시맨틱 텍스트 (SSR 최적화) */}
      <header className="sr-only">
        <h1>서울·인천·경기 출장 웰니스 마사지 & 테라피 예약 플랫폼 온쉼테라피</h1>
        <p>
          온쉼테라피는 서울 강남·마포·영등포, 경기 수원·성남·고양, 인천 송도·부평 등 수도권 전 지역의 전문 출장 마사지, 스웨디시, 아로마 릴렉싱 케어, 1:1 맞춤 바디 테라피 제휴 정보를 제공합니다. 선입금 없는 100% 후불 정찰제로 안심하고 이용하세요.
        </p>
      </header>

      {/* 3. 실제 메인 클라이언트 UI */}
     <main>
  <MainClientUI>{null}</MainClientUI>
</main>
    </>
  );
}