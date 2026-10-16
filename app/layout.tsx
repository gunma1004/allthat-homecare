// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE_URL = 'https://allthat-homecare.netlify.app';

export const viewport: Viewport = {
  themeColor: '#070709',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '서울·인천·경기 도심휴식 마사지 · 홈케어 | 올댓홈케어',
    template: '%s | 올댓홈케어',
  },
  description:
    '서울 출장마사지·스웨디시 업체를 올댓에서 확인하세요. 시·군·구별로 나눠 코스와 이용 요금, 운영 시간을 정리했습니다. 예약은 각 업체에 직접 하시면 됩니다.',
  keywords: [
    '올댓홈케어',
    '서울출장마사지',
    '인천출장마사지',
    '경기출장마사지',
    '홈케어마사지',
    '스웨디시',
    '아로마마사지',
    '도심휴식마사지',
  ],
  authors: [{ name: '올댓홈케어', url: SITE_URL }],
  creator: '올댓홈케어',
  publisher: '올댓홈케어',
  verification: {
    other: {
      // 네이버 서치어드바이저 사이트 등록 후 발급받은 실제 키 값으로 교체하세요.
      'naver-site-verification': '여기에_올댓홈케어_네이버_검증키_입력',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: '올댓홈케어',
    title: '서울·인천·경기 도심휴식 마사지 · 홈케어 | 올댓홈케어',
    description:
      '서울 출장마사지·스웨디시 업체를 올댓에서 확인하세요. 시·군·구별로 나눠 코스와 이용 요금, 운영 시간을 정리했습니다. 예약은 각 업체에 직접 하시면 됩니다.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '올댓홈케어 - 서울·인천·경기 도심휴식 마사지 및 홈케어 안내',
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
      name: '올댓홈케어',
      alternateName: 'All That Homecare',
      description:
        '서울·인천·경기 지역 출장마사지, 스웨디시, 홈케어 업체 코스 및 요금 정보 안내 디렉터리 플랫폼',
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
      inLanguage: 'ko-KR',
    },
    {
      '@type': ['Organization'],
      '@id': `${SITE_URL}/#organization`,
      name: '올댓홈케어',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-image.png`,
      },
      image: `${SITE_URL}/og-image.png`,
      description:
        '서울, 인천, 경기도 시·군·구별 출장 홈케어 및 스웨디시 제휴 업체 정보 안내',
      areaServed: [
        {
          '@type': 'AdministrativeArea',
          name: '서울특별시',
        },
        {
          '@type': 'AdministrativeArea',
          name: '인천광역시',
        },
        {
          '@type': 'AdministrativeArea',
          name: '경기도',
        },
      ],
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