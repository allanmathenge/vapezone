const excludedPaths = [
  "/checkout",
  "/account",
  "/account/*",
  "/cart",
  "/ke/account",
  "/ke/cart",
  "/api/healthcheck",
  "/opengraph-image.png",
  "/sitemap.xml" // prevent sitemap.xml itself from being indexed
];

const staticPages = [
  { loc: '/ke', priority: 1.0 },
  { loc: '/ke/store', priority: 0.64 },
];

const collectionPages = [
  'disposables',
  'accessories',
  'nic-salts',
  'pod-mods',
  'pod-devices',
  'mods',
];

const categoryPages = [
  'yuoto',
  'smoat',
  'voopoo-drag',
  'argus-series',
  'smok',
  'uwell-caliburn-series',
  'Solo X 1500 Puffs',
  'Bar Salts',
  'Vapengin Neptune',
];

const productSlugs = [
'peach-ice-yuoto-luscious',
'lush-ice-yuoto-luscious',
'mint-ice-yuoto-luscious',
'grape-ice-yuoto-luscious',
'guava-ice-yuoto-luscious',
'pineapple-ice-yuoto-luscious',
'cotton-candy-ice-yuoto-luscious',
'passion-fruit-yuoto-luscious',
'bubblegum-yuoto-luscious',
'bar-salts-tobacco-10ml',
'bar-salts-pineapple-ice-10ml',
'gummy-bear-bar-salts-10ml',
'bar-salts-watermelon-10ml',
'yuoto-xxl-strawberry-watermelon-ice',
'yuoto-xxl-pineapple-ice',
'yuoto-xxl-peach-ice',
'yuoto-xxl-banana-ice',
'yuoto-xxl-coke-ice',
'yuoto-xxl-passion-fruit',
'energy-drink-ice-yuoto-xxl',
'two-apple-yuoto-xxl',
'pina-colada-ice-yuoto-xxl',
'yuoto-xxl-guava-ice',
'yuoto-xxl-lychee-ice',
'yuoto-xxl-red-wine',
'solo-x-mango-guava',
'solo-x-blackcurrant-lemon',
'solo-x-mint-bubblegum'
];

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://www.vapezone.co.ke",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: excludedPaths,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: excludedPaths,
      },
    ],
  },
  additionalPaths: async (config) => {
    const now = new Date().toISOString();

    // Static pages
    const staticUrls = staticPages.map((page) => ({
      loc: page.loc,
      priority: page.priority,
      changefreq: 'monthly',
      lastmod: now,
    }));

    // Collections
    const collectionUrls = collectionPages.map((slug) => ({
      loc: `/ke/collections/${slug}`,
      priority: 0.8,
      changefreq: 'monthly',
      lastmod: now,
    }));

    // Categories
    const categoryUrls = categoryPages.map((slug) => ({
      loc: `/ke/categories/${slug}`,
      priority: 0.8,
      changefreq: 'monthly',
      lastmod: now,
    }));

    // Product pages
    const productUrls = productSlugs.map((slug) => ({
      loc: `/ke/products/${slug}`,
      priority: 0.64,
      changefreq: 'weekly',
      lastmod: now,
    }));

    return [...staticUrls, ...collectionUrls, ...categoryUrls, ...productUrls];
  },
};
