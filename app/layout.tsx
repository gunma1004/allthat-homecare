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
    '서울 출장마사지·스웨디시 업체를 올댓홈케어에서 비교하세요. 시·군·구별 코스, 정찰제 요금, 운영 시간을 확인하고 각 업체에 바로 예약할 수 있습니다.',
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
  // 네이버 및 구글 수집 허용 명시
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: '올댓홈케어',
    title: '서울·인천·경기 도심휴식 마사지 · 홈케어 | 올댓홈케어',
    description:
      '서울 출장마사지·스웨디시 업체를 올댓홈케어에서 비교하세요. 시·군·구별 코스, 정찰제 요금, 운영 시간을 확인하고 각 업체에 바로 예약할 수 있습니다.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '올댓홈케어 - 서울·인천·경기 도심휴식 마사지 및 홈케어 안내',
      },
    ],
  },
  // layout에서는 alternates.canonical을 비워두고, 각 page.tsx에서 자기 주소를 relative path('/')로 지정해야 서브페이지 누락이 방지됩니다.
  alternates: {
    canonical: './',
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
      '@type': 'Organization',
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
        { '@type': 'AdministrativeArea', name: '서울특별시' },
        { '@type': 'AdministrativeArea', name: '인천광역시' },
        { '@type': 'AdministrativeArea', name: '경기도' },
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
        {/* 네이버 서치어드바이저 소유확인 태그를 직접 명시하여 파싱 누락 방지 */}
        <meta
          name="naver-site-verification"
          content="8ba4d22371a9323f3f813c92454dd8fc6420a5ad"
        />
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