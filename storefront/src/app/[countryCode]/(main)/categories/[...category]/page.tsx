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

    const url = `https://www.vapezone.co.ke/ke/categories/${params.category.join("/")}`

    return {
      title: `Order ${title} Online In Nairobi`,
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title: `Buy ${title} In Kenya`,
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

export default async function CategoryPage({ params, searchParams }: Props) {
  const { sortBy, page } = searchParams
  const { product_categories } = await getCategoryByHandle(params.category)

  if (!product_categories) notFound()

  const category = product_categories[product_categories.length - 1]
  const baseUrl = "https://www.vapezone.co.ke"

  const buildCategoryUrl = (categoryHandles: string[]) => {
    const path = categoryHandles.join('/')
    return `${baseUrl}/ke/categories/${path}`
  }

  const currentCategoryUrl = buildCategoryUrl(params.category)
  const products = category.products || []

  const formatPrice = (price: any): string => {
    if (!price) return "0.00"
    
    if (typeof price === 'string') {
      return parseFloat(price.replace(/,/g, '')).toFixed(2)
    } else if (typeof price === 'number') {
      return price.toFixed(2)
    }
    
    return "0.00"
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "name": "Category Navigation",
    "description": "Browse our vape product categories",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${baseUrl}/`
      },
      // Add parent categories dynamically
      ...product_categories.slice(0, -1).map((cat, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": cat.name,
        "item": buildCategoryUrl(product_categories.slice(0, index + 1).map(c => c.handle))
      })),
      // Current category
      {
        "@type": "ListItem",
        "position": product_categories.length + 1,
        "name": category.name,
        "item": currentCategoryUrl
      }
    ]
  }

  // Enhanced ItemList schema with better product data
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Best ${category.name} Vapes in Kenya`,
    "description": category.description || `Shop premium ${category.name} vape products at Vapezone Kenya. Fast delivery across Nairobi and all of Kenya.`,
    "url": currentCategoryUrl,
    "numberOfItems": products.length,
    "mainEntityOfPage": currentCategoryUrl,
    "itemListElement": products.slice(0, 20).map((product, index) => {
      const productUrl = `${baseUrl}/ke/products/${product.handle}`
      const productImage = product.thumbnail ? 
        (product.thumbnail.startsWith("http") ? product.thumbnail : `${baseUrl}${product.thumbnail}`) 
        : `${baseUrl}/default-product.webp`
      
      const rawPrice = product.variants?.[0]?.calculated_price?.calculated_amount
      const formattedPrice = formatPrice(rawPrice)
      const isInStock = (product.variants?.[0]?.inventory_quantity ?? 0) > 0
      
      return {
        "@type": "ListItem",
        "position": index + 1,
        "url": productUrl,
        "item": {
          "@type": "Product",
          "name": product.title,
          "description": product.subtitle || `${product.title} - Premium vape product available in Kenya`,
          "url": productUrl,
          "image": productImage,
          "sku": product.variants?.[0]?.sku || product.id,
          "category": category.name,
          ...(product.collection?.title && {
            "brand": {
              "@type": "Brand",
              "name": product.collection.title
            }
          }),
          "offers": {
            "@type": "Offer",
            "priceCurrency": "KES",
            "price": formattedPrice,
            "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1))
              .toISOString()
              .split("T")[0],
            "availability": isInStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "itemCondition": "https://schema.org/NewCondition",
            "seller": {
              "@type": "Organization",
              "name": "Vapezone Kenya",
              "url": baseUrl
            },
            "shippingDetails": {
              "@type": "OfferShippingDetails",
              "shippingRate": {
                "@type": "MonetaryAmount",
                "value": "0",
                "currency": "KES"
              },
              "shippingDestination": {
                "@type": "DefinedRegion",
                "addressCountry": "KE"
              }
            }
          }
        }
      }
    })
  }

  // CollectionPage schema for the category itself (more focused)
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category.name} Vape Products`,
    "description": category.description || `Complete collection of ${category.name} vape devices and accessories at Vapezone Kenya`,
    "url": currentCategoryUrl,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Vapezone Kenya",
      "url": baseUrl
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": `Featured ${category.name} Products`,
      "numberOfItems": Math.min(products.length, 10),
      "itemListElement": products.slice(0, 10).map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": product.title,
        "url": `${baseUrl}/ke/products/${product.handle}`,
        "image": product.thumbnail ? 
          (product.thumbnail.startsWith("http") ? product.thumbnail : `${baseUrl}${product.thumbnail}`) 
          : `${baseUrl}/default-product.webp`
      }))
    }
  }

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <Script
        id="itemlist-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      
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