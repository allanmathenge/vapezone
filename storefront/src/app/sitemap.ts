import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: ""
        }
    ].map((route: MetadataRoute.Sitemap[number]) => ({
        ...route,
        url: "https://www.vapezone.co.ke" + route.url
    }))
}