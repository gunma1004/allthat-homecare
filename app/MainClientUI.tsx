import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE_URL = 'https://onshim-therapy.netlify.app';

export const viewport: Viewport = {
  themeColor: '#070709',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '온쉼테라피 | 서울·경기·인천 출장 웰니스 마사지 예약 플랫폼',
    template: '%s | 온쉼테라피',
  },
  description:
    '도심 속 편안한 휴식을 선사하는 온쉼테라피입니다. 서울, 경기, 인천 전 지역 출장 마사지, 스웨디시, 아로마 힐링 케어 및 투명한 정찰제 제휴 안내를 확인하세요.',
  keywords: [
    '온쉼테라피',
    '출장마사지',
    '서울출장마사지',
    '경기출장마사지',
    '인천출장마사지',
    '출장 웰니스 마사지',
    '출장 아로마마사지',
    '출장 안심 마사지',
    '스웨디시',
    '마사지예약',
  ],
  authors: [{ name: '온쉼테라피', url: SITE_URL }],
  creator: '온쉼테라피',
  publisher: '온쉼테라피',
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: '온쉼테라피',
    title: '온쉼테라피 | 서울·경기·인천 출장 웰니스 마사지 예약 플랫폼',
    description:
      '도심 속 편안한 휴식을 선사하는 온쉼테라피입니다. 출장 마사지, 스웨디시, 아로마 힐링 케어 정보 및 최적의 정찰제 코스를 한눈에 확인하세요.',
    images: [
      {
        url: '/og-image.png', // public/og-image.png (권장 1200x630)
        width: 1200,
        height: 630,
        alt: '온쉼테라피 - 수도권 프리미엄 출장 웰니스 마사지',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // 네이버 서치어드바이저 신규 등록 시 발급받은 사이트 소유확인 키
  verification: {
    other: {
      'naver-site-verification': '새로운_네이버_인증키_입력',
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

// 🌟 네이버 및 구글 검색엔진 최적화 글로벌 JSON-LD (WebSite + HealthAndBeautyBusiness 복합 스키마)
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: '온쉼테라피',
      description: '서울, 경기, 인천 전 지역 출장 웰니스 마사지 & 프리미엄 테라피 안내 플랫폼',
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
      inLanguage: 'ko-KR',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': ['HealthAndBeautyBusiness', 'Organization'],
      '@id': `${SITE_URL}/#organization`,
      name: '온쉼테라피',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-image.png`,
        width: '512',
        height: '512',
      },
      image: `${SITE_URL}/banner.jpg`,
      description: '수도권 전역 1:1 맞춤 출장 타이, 아로마, 감성 스웨디시 정찰제 힐링 케어 안내',
      telephone: '0507-1280-3344',
      priceRange: '60,000원~180,000원',
      currenciesAccepted: 'KRW',
      paymentAccepted: 'Cash, Credit Card',
      areaServed: [
        {
          '@type': 'AdministrativeArea',
          name: '서울특별시',
        },
        {
          '@type': 'AdministrativeArea',
          name: '경기도',
        },
        {
          '@type': 'AdministrativeArea',
          name: '인천광역시',
        },
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: '서울특별시',
        addressRegion: '수도권',
        addressCountry: 'KR',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '0507-1280-3344',
        contactType: 'customer service',
        areaServed: 'KR',
        availableLanguage: ['Korean'],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 🌟 suppressHydrationWarning 추가로 브라우저 확장프로그램 및 SSR-CSR 불일치 충돌 방지
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#070709] text-gray-100 antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}