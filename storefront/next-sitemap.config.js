const excludedPaths = ["/checkout", "/account/*", "/checkout", "/opengraph-image.png", "/api/healthcheck"]

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://www.vapezone.co.ke/ke",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 7000,
  exclude: [ ...excludedPaths, "/[sitemap]"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: excludedPaths,
      },
    ],
  },
}
