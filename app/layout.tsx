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
    // 🌟 바른케어가 뒤쪽에 오도록 배치
    default: '선입금 없는 서울 출장 안심 마사지 디렉토리 | 바른케어',
    template: '%s | 바른케어',
  },
  description:
    '100% 현장 후불 정찰제로 안전하게 이용하는 바른케어입니다. 서울 전 지역 선입금 없는 출장 마사지, 스웨디시, 아로마 힐링 케어 및 제휴점 코스 정보를 확인하세요.',
  keywords: [
    '바른케어',
    '서울출장마사지',
    '선입금없는출장마사지',
    '출장안심마사지',
    '스웨디시',
    '아로마테라피',
    '홈타이',
  ],
  authors: [{ name: '바른케어', url: SITE_URL }],
  creator: '바른케어',
  publisher: '바른케어',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: '바른케어',
    title: '바른케어 | 선입금 없는 서울 출장 안심 마사지 디렉토리',
    description:
      '100% 후불 정찰제로 안전하게 이용하는 바른케어입니다. 서울 전 지역 출장 마사지 정찰제 코스를 한눈에 비교해 보세요.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '바른케어 서울 출장 안심 마사지',
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
      description: '선입금 없는 서울 출장 안심 마사지 디렉토리 플랫폼',
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
      description: '선입금 없는 100% 현장 후불 정찰제 서울 출장 마사지 안내',
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