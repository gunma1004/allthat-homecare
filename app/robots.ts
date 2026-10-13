// app/robots.ts
import { MetadataRoute } from 'next';

const BASE_URL = 'https://carezone-massage.netlify.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 1. 일반 웹 크롤러 기본 규칙
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'], // 불필요한 내부 API 및 관리자 경로 차단
      },
      // 2. 네이버 수집 봇(Yeti) 전용 명시적 허용
      {
        userAgent: 'Yeti',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // 3. 구글 수집 봇(Googlebot) 명시적 허용
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}