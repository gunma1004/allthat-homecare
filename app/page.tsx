// app/page.tsx
import { Metadata } from "next";
import MainClientUI from "./MainClientUI";

const SITE_URL = "https://allthat-homecare.netlify.app";

export const metadata: Metadata = {
  title: "서울·인천·경기 도심휴식 마사지 · 홈케어 | 올댓홈케어",
  description:
    "서울 출장마사지·스웨디시 업체를 올댓에서 확인하세요. 시·군·구별로 나눠 코스와 이용 요금, 운영 시간을 정리했습니다. 예약은 각 업체에 직접 하시면 됩니다.",
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
      "서울 출장마사지·스웨디시 업체를 올댓에서 확인하세요. 시·군·구별로 나눠 코스와 이용 요금, 운영 시간을 정리했습니다. 예약은 각 업체에 직접 하시면 됩니다.",
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
        mainEntity: [
          {
            "@type": "Question",
            name: "예약 및 상담은 어떻게 진행되나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "올댓홈케어에 등록된 제휴 업체의 전화연결 버튼을 통해 각 업체와 직접 소통하시며 코스 및 방문 일정을 조율하시면 됩니다.",
            },
          },
          {
            "@type": "Question",
            name: "수도권 전 지역 출장 이용이 가능한가요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "서울 25개 구, 인천광역시, 경기도 주요 시·군·구별 제휴 네트워크가 갖추어져 있어 계신 위치에 맞춰 편리하게 안내받으실 수 있습니다.",
            },
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#070709]">
      {/* 1. 검색엔진 구조화 데이터 (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 2. 네이버 수집 봇(Yeti)용 SSR 핵심 시맨틱 텍스트 */}
      <header className="sr-only">
        <h1>서울·인천·경기 도심휴식 마사지 · 홈케어 | 올댓홈케어</h1>
        <p>
          서울 출장마사지·스웨디시 업체를 올댓에서 확인하세요. 시·군·구별로 나눠 코스와 이용 요금, 운영 시간을 정리했습니다. 예약은 각 업체에 직접 하시면 됩니다.
        </p>
      </header>

      {/* 3. 클라이언트 메인 UI 컴포넌트 */}
      <MainClientUI />
    </main>
  );
}