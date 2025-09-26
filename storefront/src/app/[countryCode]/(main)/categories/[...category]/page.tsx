import { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"

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

    return {
      title: `Shop ${title} – Best Vapes in Kenya | Vapezone Kenya`,
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title: `Shop ${title} - Vapezone Kenya`,
        description,
        url,
        siteName: 'Vapezone Kenya',
        type: 'website',
      },
    }
  } catch (error) {
    notFound()
  }
}

// Helper function to build proper URLs
const buildCategoryUrl = (categoryHandles: string[], baseUrl: string = "https://www.vapezone.co.ke/") => {
  const path = categoryHandles.join('/')
  return `${baseUrl}/${path}`
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { sortBy, page } = searchParams
  const { product_categories } = await getCategoryByHandle(params.category)

  if (!product_categories) notFound()

  const category = product_categories[product_categories.length - 1]
  const baseUrl = "https://www.vapezone.co.ke"

  // Build breadcrumb schema
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${baseUrl}/`,
    }
  ]

  // Add parent categories to breadcrumb
  if (product_categories.length > 1) {
    product_categories.forEach((cat, index) => {
      if (index < product_categories.length - 1) {
        const categoryPath = product_categories.slice(0, index + 1).map(c => c.handle)
        breadcrumbItems.push({
          "@type": "ListItem",
          position: index + 2,
          name: cat.name,
          item: buildCategoryUrl(categoryPath),
        })
      }
    })
  }

  // Add current category
  breadcrumbItems.push({
    "@type": "ListItem",
    position: breadcrumbItems.length + 1,
    name: category.name,
    item: buildCategoryUrl(params.category),
  })

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  }

  // Build ItemList schema for products in this category
  const products = category.products || []
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${category.name} - Vapezone Kenya`,
    description: category.description || `Browse our selection of ${category.name} vape products`,
    url: buildCategoryUrl(params.category),
    numberOfItems: products.length,
    itemListElement: products.slice(0, 20).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.title,
        url: `${baseUrl}/ke/products/${product.handle}`,
        image: product.thumbnail ? 
          (product.thumbnail.startsWith("http") ? product.thumbnail : `${baseUrl}${product.thumbnail}`) 
          : `${baseUrl}/default-product.webp`,
        offers: {
          "@type": "Offer",
          priceCurrency: "KES",
          price: product.variants?.[0]?.calculated_price?.calculated_amount || 0,
          availability: (product.variants?.[0]?.inventory_quantity ?? 0) > 0 
            ? "https://schema.org/InStock" 
            : "https://schema.org/OutOfStock",
        },
        brand: {
          "@type": "Brand",
          name: "Vapezone Kenya"
        }
      }
    })),
  }

  // Optional: Collection schema for the category itself
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} - Vapezone Kenya`,
    description: category.description || `Shop ${category.name} vape products in Kenya`,
    url: buildCategoryUrl(params.category),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.slice(0, 10).map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${baseUrl}/ke/products/${product.handle}`
      }))
    }
  }

  return (
    <>
      {/* Breadcrumb Schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Product List Schema */}
      <Script
        id="itemlist-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      
      {/* Collection Schema (Optional) */}
      <Script
        id="collection-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <CategoryTemplate
        categories={product_categories}
        sortBy={sortBy}
        page={page}
        countryCode={params.countryCode}
      />
    </>
  )
}