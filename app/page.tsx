import { Metadata } from "next";
import MainClientUI from "./MainClientUI";

const SITE_URL = "https://baruncare-seoul.netlify.app";

export const metadata: Metadata = {
  // 🌟 '바른케어'가 뒤쪽에 배치된 타이틀
  title: "선입금 없는 서울·경기·인천 출장 안심 마사지 예약 플랫폼 | 바른케어",
  description:
    "100% 현장 후불 정찰제 바른케어! 서울·경기·인천 전 지역 선입금 없는 안심 출장 마사지, 스웨디시 정찰제 코스를 투명하게 확인하세요..",
  keywords: [
    "출장마사지",
    "서울출장마사지",
    "경기출장마사지",
    "인천출장마사지",
    "선입금없는출장마사지",
    "출장안심마사지",
    "스웨디시",
    "아로마테라피",
    "바디케어",
    "바른케어",
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
    title: "선입금 없는 서울·경기·인천 출장 안심 마사지 예약 플랫폼 | 바른케어",
    description:
      "100% 현장 후불 정찰제 바른케어! 서울·경기·인천 전 지역 선입금 없는 안심 출장 마사지, 스웨디시 정찰제 코스를 투명하게 확인하세요.",
    url: SITE_URL,
    siteName: "바른케어",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/banner.jpg`,
        width: 1200,
        height: 630,
        alt: "바른케어 수도권 출장 안심 마사지 메인 배너",
      },
    ],
  },
};

export default function Page() {
  // 🌟 네이버 및 구글 검색엔진 최적화 4대 복합 스키마
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "바른케어",
        description: "선입금 없는 서울, 경기, 인천 출장 안심 마사지 및 테라피 안내 플랫폼",
        inLanguage: "ko-KR",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      {
        "@type": ["HealthAndBeautyBusiness", "Organization"],
        "@id": `${SITE_URL}/#organization`,
        name: "바른케어",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/og-image.png`,
        },
        image: `${SITE_URL}/banner.jpg`,
        telephone: "0507-1280-3344",
        priceRange: "60,000원~180,000원",
        currenciesAccepted: "KRW",
        paymentAccepted: "Cash, Credit Card",
        areaServed: [
          {
            "@type": "AdministrativeArea",
            name: "서울특별시",
          },
          {
            "@type": "AdministrativeArea",
            name: "경기도",
          },
          {
            "@type": "AdministrativeArea",
            name: "인천광역시",
          },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "서울특별시",
          addressRegion: "수도권",
          addressCountry: "KR",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "0507-1280-3344",
          contactType: "customer service",
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
        mainEntity: [
          {
            "@type": "Question",
            name: "선입금이나 예약금을 요구하나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "바른케어의 모든 공식 제휴 업체는 100% 현장 후불 정찰제로 운영되며 사전 선입금을 절대 요구하지 않습니다.",
            },
          },
          {
            "@type": "Question",
            name: "수도권 전 지역 출장 이용이 가능한가요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "네, 서울 25개 구, 경기도 31개 시·군, 인천 전역의 주요 권역별로 등록된 제휴 샵 정보를 편리하게 확인하실 수 있습니다.",
            },
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#070709]">
      {/* 1. 검색엔진 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 2. 네이버 수집 봇(Yeti)용 SSR 핵심 시맨틱 텍스트 */}
      <header className="sr-only">
        <h1>선입금 없는 서울·인천·경기 출장 안심 마사지 & 테라피 예약 플랫폼 바른케어</h1>
        <p>
          바른케어는 서울 강남·마포·영등포, 경기 수원·성남·고양, 인천 송도·부평 등 수도권 전 지역의 전문 출장 마사지, 스웨디시, 아로마 릴렉싱 케어 제휴 정보를 제공합니다. 예약 선입금 사기 걱정 없는 100% 후불 정찰제로 안심하고 이용하세요.
        </p>
      </header>

      {/* 3. 메인 인터랙션 UI 컴포넌트 */}
      <MainClientUI />
    </main>
  );
}