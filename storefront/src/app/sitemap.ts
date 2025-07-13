import type { MetadataRoute } from 'next'
import { getCollectionsList } from "@lib/data/collections"
import { getCategoriesList } from "@lib/data/categories"
import { getAllProducts } from '@lib/data/products'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { collections } = await getCollectionsList()
  const { product_categories } = await getCategoriesList()
  const products = await getAllProducts()

  return [
    {
      url: 'https://www.vapezone.co.ke/ke',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    {
      url: 'https://www.vapezone.co.ke/ke/store',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://www.vapezone.co.ke/ke/search',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
    ...collections
      .filter((c: any) => c.handle)
      .map((collection: any) => ({
        url: `https://www.vapezone.co.ke/ke/collections/${collection.handle}`,
        lastModified: new Date(collection.updated_at || collection.created_at),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
    ...product_categories
      .filter((c: any) => c.handle)
      .map((category: any) => ({
        url: `https://www.vapezone.co.ke/ke/categories/${category.handle}`,
        lastModified: new Date(category.updated_at || category.created_at),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
    ...products
      .filter((p: any) => p.handle)
      .map((product: any) => ({
        url: `https://www.vapezone.co.ke/ke/products/${product.handle}`,
        lastModified: new Date(product.updated_at || product.created_at),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
  ]
}
