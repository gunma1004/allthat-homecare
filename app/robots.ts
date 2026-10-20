// app/robots.ts
import { MetadataRoute } from 'next';

const BASE_URL = 'https://allthat-homecare.netlify.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'Yeti',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}