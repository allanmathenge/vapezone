const excludedPaths = [
  "/checkout",
  "/account",
  "/account",
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
  "peach-ice-yuoto-luscious",
  "lush-ice-yuoto-luscious",
  "mint-ice-yuoto-luscious",
  "grape-ice-yuoto-luscious",
  "strawberry-ice-cream-yuoto-thanos",
  "strawberry-kiwi-ice-yuoto-thanos",
  "energy-drink-kk-energy",
  "milk-coffee-yuoto-thanos",
  "coke-ice-yuoto-thanos",
  "coconut-melon-yuoto-thanos",
  "antonovka-apple-yuoto-thanos",
  "mouse-chef-yuoto-thanos",
  "passion-fruit-yuoto-thanos",
  "energy-drink-ice-yuoto-thanos",
  "banana-ice-yuoto-thanos",
  "tobacco-yuoto-thanos",
  "bar-salts-tobacco-10ml",
  "bar-salts-watermelon-10ml",
  "bar-salts-pineapple-ice-10ml",
  "gummy-bear-bar-salts-10ml",
  "strawberry-watermelon-kk-energy",
  "fruit-fusion-kk-energy",
  "orange-soda-kk-energy",
  "peach-ice-kk-energy",
  "wicked-haze-nasty-juice-60ml",
  "strawberry-kiwi-nasty-juice-60ml",
  "watermelon-ice-nasty-juice-60ml",
  "slow-blow-nasty-juice-60ml",
  "lemon-mint-shisha-nasty-juice-60ml",
  "grape-mixed-berries-nasty-juice-60ml",
  "asap-grape-nasty-juice-60ml",
  "green-grape-nasty-juice-60ml",
  "grape-rasberry-shisha-nasty-juice-60ml",
  "green-ape-nasty-juice-60ml",
  "mango-ice-nasty-juice-60ml",
  "double-apple-shisha-nasty-juice-60ml",
  "passion-fruit-yuoto-luscious",
  "solo-x-mango-guava",
  "guava-ice-yuoto-luscious",
  "cotton-candy-ice-yuoto-luscious",
  "pineapple-ice-yuoto-luscious",
  "solo-x-blackcurrant-lemon",
  "solo-x-mint-bubblegum",
  "bubblegum-yuoto-luscious",
  "strawberry-watermelon-ice-yuoto-thanos",
  "solo-x-peach-ice",
  "solo-x-grape-ice",
  "solo-x-energy-ice",
  "solo-x-pina-colada",
  "solo-x-blue-lush-lemonade",
  "solo-x-melon-ice",
  "solo-x-cherry-ice",
  "solo-x-cola-ice",
  "solo-x-blue-razz",
  "solo-x-tropic-mix",
  "solo-x-mango-melon",
  "solo-x-lush-ice",
  "vapengin-neptune-8000-puffs-forest-berries",
  "strawberrwatermelon-ice-yuoto-luscious",
  "two-apple-yuoto-luscious",
  "blue-razz-ice-yuoto-luscious",
  "alphonso-mango-ice-yuoto-luscious",
  "mango-ice-yuoto-luscious",
  "custard-apple-yuoto-luscious",
  "strawberry-banana-ice-yuoto-luscious",
  "energy-drink-ice-yuoto-luscious",
  "blueberry-ice-yuoto-luscious",
  "berry-melon-kk-energy",
  "kiwi-passionfruit-guava-kk-energy",
  "blue-ice-kk-energy",
  "watermelon-ice-tugboat-ultra-6000-puffs",
  "guava-blue-razz-tugboat-t-12000",
  "watermelon-bubblegum-tugboat-ultra-6000-puffs",
  "strawberry-mango-tugboat-t-12000",
  "strawberry-kiwi-tugboat-t-12000",
  "peach-mango-watermelon-tugboat-ultra-6000-puffs",
  "black-mamba-tugboat-ultra-6000-puffs",
  "strawberry-mango-tugboat-ultra-6000-puffs",
  "red-energy-tugboat-t-12000",
  "rainbow-skittles-tugboat-ultra-6000-puffs",
  "banana-ice-tugboat-ultra-6000-puffs",
  "aloe-grape-tugboat-ultra-6000-puffs",
  "blueberry-ice-tugboat-t-12000",
  "grape-tugboat-t-12000",
  "cola-ice-tugboat-t-12000",
  "watermelon-bubblegum-tugboat-t-12000",
  "peach-ice-tugboat-t-12000",
  "mango-peach-ice-tugboat-t-12000",
  "black-ice-tugboat-t-12000",
  "triple-berry-ice-tugboat-t-12000",
  "strawberry-watermelon-tugboat-t-12000",
  "cranberry-grape-tugboat-t-12000",
  "purple-rain-tugboat-t-12000",
  "cool-mint-tugboat-t-12000",
  "devil-teeth-nasty-juice-60ml",
  "blueberry-sour-rasberry-elfbar-af5000",
  "blue-razz-lemonade-elfbar-a-f-5000",
  "grape-elfbar-a-f-5000",
  "cherry-ice-elfbar-a-f-5000",
  "silver-blend-nasty-juice-60ml",
  "trap-queen-nasty-juice-60ml"
];

const searchAndStoreUrls = [
  'search',
  'store'
]

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

    const searchAndStore = searchAndStoreUrls.map((slug) => ({
      loc: `/ke/${slug}`,
      priority: 0.64,
      changefreq: 'weekly',
      lastmod: now,
    }));

    return [...staticUrls, ...collectionUrls, ...categoryUrls, ...productUrls, ...searchAndStore];
  },
};
