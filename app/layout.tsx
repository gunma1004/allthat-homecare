// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

const SITE_URL = 'https://carezone-massage.netlify.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '경기·인천·서울 출장 마사지 할인 예약 플랫폼 | 케어존마사지',
    template: '%s | 케어존마사지',
  },
  description:
    '서울, 인천, 경기 전 지역 출장마사지, 스웨디시, 타이, 아로마 힐링 케어 정보 및 최저가 제휴 할인 플랫폼 케어존마사지입니다.',
  keywords: [
    '케어존마사지',
    '서울출장마사지',
    '경기출장마사지',
    '인천출장마사지',
    '스웨디시',
    '타이마사지',
    '아로마마사지',
    '마사지할인',
  ],
  authors: [{ name: '케어존마사지', url: SITE_URL }],
  creator: '케어존마사지',
  publisher: '케어존마사지',
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: '케어존마사지',
    title: '경기·인천·서울 출장 마사지 할인 예약 플랫폼 | 케어존마사지',
    description:
      '서울, 인천, 경기 출장마사지, 스웨디시, 타이, 아로마 힐링 케어 정보 및 최저가 제휴 할인 플랫폼 케어존마사지입니다.',
    images: [
      {
        url: '/og-image.png', // public/og-image.png
        width: 1200,
        height: 630,
        alt: '케어존마사지 - 경기·인천·서울 힐링케어 플랫폼',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    // 네이버 및 구글 봇 전체에 동일하게 적용
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // 네이버 서치어드바이저 소유권 확인 태그
  verification: {
    other: {
      'naver-site-verification': '9992595a7b731f47f23a2ac97bd1c3c1f93cb664',
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

// 사이트 전체를 대표하는 JSON-LD (WebSite + Organization 구조화 데이터)
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: '케어존마사지',
      description: '경기·인천·서울 출장 힐링케어 마사지 할인 예약 플랫폼',
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
      inLanguage: 'ko-KR',
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: '케어존마사지',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-image.png`,
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
    <html lang="ko">
      <head>
        {/* 네이버 서치어드바이저가 즉시 파싱할 수 있도록 head 최상단에 스크립트 주입 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}