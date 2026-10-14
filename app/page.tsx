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
    "스웨디시",
    "아로마테라피",
  ],
  alternates: {
    canonical: SITE_URL,
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
        alt: "온쉼테라피 메인 배너",
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
        name: "온쉼테라피",
        description: "서울, 경기, 인천 전 지역 프리미엄 바디 힐링 테라피 안내 플랫폼",
        inLanguage: "ko-KR",
      },
      {
        "@type": "HealthAndBeautyBusiness",
        "@id": `${SITE_URL}/#organization`,
        name: "온쉼테라피",
        url: SITE_URL,
        telephone: "0507-1280-3344",
        priceRange: "60,000원~180,000원",
        currenciesAccepted: "KRW",
        areaServed: "수도권 전지역",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#070709]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MainClientUI />
    </main>
  );
}