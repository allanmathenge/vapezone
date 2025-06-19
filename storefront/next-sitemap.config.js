const excludedPaths = ["/checkout", "/account/*", "/checkout", "/opengraph-image.png", "/api/healthcheck"]

module.exports = {
  siteUrl: 'https://www.vapezone.co.ke',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  outDir: './public',
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
