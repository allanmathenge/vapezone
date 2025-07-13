// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/checkout',
          '/account',
          '/cart',
          '/ke/account',
          '/ke/cart',
          '/api/healthcheck',
          '/opengraph-image.png',
          '/sitemap.xml',
        ],
      },
    ],
    sitemap: 'https://www.vapezone.co.ke/sitemap.xml',
  }
}
