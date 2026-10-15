// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE_URL = 'https://baruncare-seoul.netlify.app';

export const viewport: Viewport = {
  themeColor: '#070709',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '바른케어 | 서울 프리미엄 출장 웰니스 마사지',
    template: '%s | 바른케어',
  },
  description:
    '도심 속 편안한 휴식을 선사하는 바른케어입니다. 서울 전 지역 프리미엄 홈케어 출장 마사지 및 맞춤형 웰니스 테라피 서비스를 제공합니다.',
  keywords: [
    '바른케어',
    '출장마사지',
    '출장웰니스',
    '스웨디시테라피',
    '아로마마사지',
    '홈케어마사지',
    '서울출장테라피',
  ],
  authors: [{ name: '바른케어', url: SITE_URL }],
  creator: '바른케어',
  publisher: '바른케어',
  verification: {
    other: {
      'naver-site-verification': 'e24a53d5f7eecaaaa936c978d4ce2398dce29f79',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: '바른케어',
    title: '바른케어 | 서울 프리미엄 출장 웰니스 테라피',
    description:
      '도심 속 편안한 휴식을 선사하는 바른케어입니다. 전문 테라피스트의 프라이빗한 1:1 맞춤형 홈케어 서비스를 만나보세요.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '바른케어 - 서울 프리미엄 출장 웰니스 테라피',
      },
    ],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: '바른케어',
      description: '서울 전 지역 출장 웰니스 마사지 및 프리미엄 테라피 안내 플랫폼',
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
      inLanguage: 'ko-KR',
    },
    {
      '@type': ['HealthAndBeautyBusiness', 'Organization'],
      '@id': `${SITE_URL}/#organization`,
      name: '바른케어',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-image.png`,
      },
      image: `${SITE_URL}/banner.jpg`,
      description: '서울 전역 1:1 맞춤 출장 스웨디시, 아로마, 웰니스 힐링 케어 안내',
      telephone: '0507-1280-3344',
      priceRange: '60,000원~180,000원',
      currenciesAccepted: 'KRW',
      paymentAccepted: 'Cash, Credit Card',
      areaServed: {
        '@type': 'AdministrativeArea',
        name: '서울특별시',
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