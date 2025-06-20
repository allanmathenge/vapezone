const excludedPaths = ["/checkout", "/account/*", "/opengraph-image.png", "/api/healthcheck"]

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://www.vapezone.co.ke",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
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
