
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.vapezone.co.ke";

  // List your site paths here
  const paths = ["", "/store",];

  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
  }));
}


// import type { MetadataRoute } from "next";

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//     return [
//         {
//             url: ""
//         }
//     ].map((route: MetadataRoute.Sitemap[number]) => ({
//         ...route,
//         url: "https://www.vapezone.co.ke" + route.url,
//         lastModified: new Date().toISOString(),
//     }))
// }