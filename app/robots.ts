// app/robots.ts
import { MetadataRoute } from 'next';

const BASE_URL = 'https://baruncare-seoul.netlify.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 1. 일반 검색 로봇 기본 허용 규칙
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // 2. 네이버 검색 봇 (Yeti) 명시적 허용
      {
        userAgent: 'Yeti',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // 3. 구글 검색 봇 (Googlebot) 명시적 허용
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