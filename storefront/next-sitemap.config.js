const excludedPaths = [
  "/checkout",
  "/account/*",
  "/opengraph-image.png",
  "/api/healthcheck",
];

const staticPages = [
  { loc: '/ke', priority: 1.0 },
  { loc: '/ke/account', priority: 0.8 },
  { loc: '/ke/cart', priority: 0.8 },
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
];

const productSlugs = [
  'mango-ice-yuoto-luscious',
  'peach-ice-yuoto-luscious',
  'lush-ice-yuoto-luscious',
  'mint-ice-yuoto-luscious',
  'solo-x-mint-bubblegum',
  'solo-x-mango-guava',
  'solo-x-blackcurrant-lemon',
  'bubblegum-yuoto-luscious',
  'pineapple-ice-yuoto-luscious',
  'cotton-candy-ice-yuoto-luscious',
  'grape-ice-yuoto-luscious',
  'guava-ice-yuoto-luscious',
  'passion-fruit-yuoto-luscious',
  'bar-salts-pineapple-ice-10ml',
  'bar-salts-watermelon-10ml',
  'gummy-bear-bar-salts-10ml',
  'bar-salts-tobacco-10ml',
];

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://www.vapezone.co.ke",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: [...excludedPaths],
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

