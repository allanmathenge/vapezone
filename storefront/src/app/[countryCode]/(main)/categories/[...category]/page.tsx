import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryByHandle, listCategories } from "@lib/data/categories"
import { listRegions } from "@lib/data/regions"
import { StoreProductCategory, StoreRegion } from "@medusajs/types"
import CategoryTemplate from "@modules/categories/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type Props = {
  params: { category: string[]; countryCode: string }
  searchParams: {
    sortBy?: SortOptions
    page?: string
  }
}

export async function generateStaticParams() {
  const product_categories = await listCategories()

  if (!product_categories) return []

  const countryCodes = await listRegions().then((regions: StoreRegion[]) =>
    regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
  )

  const categoryHandles = product_categories.map((category) => category.handle)

  const staticParams = countryCodes
    ?.map((countryCode: string | undefined) =>
      categoryHandles.map((handle: string) => ({
        countryCode,
        category: [handle],
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { product_categories } = await getCategoryByHandle(params.category)

    if (!product_categories || product_categories.length === 0) {
      notFound()
    }

    const category = product_categories[product_categories.length - 1]
    const title = product_categories
      .map((category: StoreProductCategory) => category.name)
      .join(" | ")

    const description =
      category.description ??
      `Discover the best selection of ${title} vapes in Nairobi at Vapezone Kenya. Shop top brands, rich flavors and enjoy fast, reliable delivery across Kenya.`

    const url = `https://www.vapezone.co.ke/ke/${params.category.join("/")}`
    const baseUrl = "https://www.vapezone.co.ke/ke"

    const breadcrumbItems = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Vapezone Kenya",
        item: baseUrl,
      }
    ]

    if (product_categories.length > 1) {
      product_categories.forEach((cat, index) => {
        if (index < product_categories.length - 1) {
          const categoryUrl = `${baseUrl}/${product_categories.slice(0, index + 1).map(c => c.handle).join("/")}`
          breadcrumbItems.push({
            "@type": "ListItem",
            position: index + 2,
            name: cat.name,
            item: categoryUrl,
          })
        }
      })
    }

    breadcrumbItems.push({
      "@type": "ListItem",
      position: breadcrumbItems.length + 1,
      name: category.name,
      item: url,
    })

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    }

    const products = category.products || []
    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${category.name} - Vapezone Kenya`,
      description: description,
      url: url,
      numberOfItems: products.length,
      itemListElement: products.slice(0, 20).map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.title,
        url: `https://www.vapezone.co.ke/ke/products/${product.handle}`,
      })),
    }

    const breadcrumbScript = `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`
    const itemListScript = `<script type="application/ld+json">${JSON.stringify(itemListSchema)}</script>`

    return {
      title: `Shop ${title} – Best Vapes in Kenya | Shop Vapes Online At Vapezone Kenya`,
      description,
      alternates: {
        canonical: url,
      },
      other: {
        'breadcrumb-schema': breadcrumbScript,
        'itemlist-schema': itemListScript,
      },
    }
  } catch (error) {
    notFound()
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { sortBy, page } = searchParams
  const { product_categories } = await getCategoryByHandle(params.category)

  if (!product_categories) notFound()
  
  return (
    <CategoryTemplate
      categories={product_categories}
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
    />
  )
}