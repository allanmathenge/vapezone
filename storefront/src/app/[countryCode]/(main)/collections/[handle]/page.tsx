import { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import { getCollectionByHandle, getCollectionsList } from "@lib/data/collections"
import { listRegions } from "@lib/data/regions"
import { StoreCollection, StoreRegion } from "@medusajs/types"

import CollectionTemplate from "@modules/collections/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type Props = {
  params: { handle: string; countryCode: string }
  searchParams: {
    page?: string
    sortBy?: SortOptions
  }
}

export const PRODUCT_LIMIT = 12

export async function generateStaticParams() {
  const { collections } = await getCollectionsList()

  if (!collections) return []

  const countryCodes = await listRegions().then(
    (regions: StoreRegion[]) =>
      regions
        ?.flatMap((r) => r.countries?.map((c) => c.iso_2))
        .filter(Boolean) as string[]
  )

  const collectionHandles = collections.map(
    (collection: StoreCollection) => collection.handle
  )

  return countryCodes
    .flatMap((countryCode: string) =>
      collectionHandles.map((handle: string | undefined) => ({
        countryCode,
        handle,
      }))
    )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const collection = await getCollectionByHandle(params.handle)

  if (!collection) notFound()

  const canonicalUrl = `https://www.vapezone.co.ke/${params.countryCode}/collections/${collection.handle}`

  return {
    title: `Explore ${collection.title} Online In Kenya, `,
    description: `Shop the ${collection.title} online at Vapezone Kenya – top brands, great flavors, fast delivery in Kenya.`,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: `${collection.title} - Vapezone Kenya`,
      description: `Shop ${collection.title} with fast delivery across Kenya`,
      url: canonicalUrl,
      siteName: 'Vapezone Kenya',
      type: 'website',
    },
  }
}

export default async function CollectionPage({ params, searchParams }: Props) {
  const { page, sortBy } = searchParams
  const { countryCode, handle } = params

  const collection = await getCollectionByHandle(handle)

  if (!collection) notFound()

  const baseUrl = "https://www.vapezone.co.ke"
  const canonicalUrl = `${baseUrl}/${countryCode}/collections/${handle}`
  const products = collection.products || []

  // Safe price formatter
  const formatPrice = (price: any): string => {
    if (!price) return "0.00"
    
    if (typeof price === 'string') {
      return parseFloat(price.replace(/,/g, '')).toFixed(2)
    } else if (typeof price === 'number') {
      return price.toFixed(2)
    }
    
    return "0.00"
  }

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${baseUrl}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Collections",
        "item": `${baseUrl}/${countryCode}/collections`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": collection.title,
        "item": canonicalUrl
      }
    ]
  }

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": collection.title,
    "description": collection.title || `Shop ${collection.title} vape products with fast delivery across Kenya`,
    "url": canonicalUrl,
    "mainEntity": {
      "@type": "ItemList",
      "name": `Featured ${collection.title} Products`,
      "description": `Best selling ${collection.title} vape devices and accessories`,
      "numberOfItems": products.length,
      "itemListElement": products.slice(0, 20).map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": product.title,
          "description": product.subtitle || `${product.title} - Available at Vapezone Kenya`,
          "url": `${baseUrl}/${countryCode}/products/${product.handle}`,
          "image": product.thumbnail ? 
            (product.thumbnail.startsWith("http") ? product.thumbnail : `${baseUrl}${product.thumbnail}`) 
            : `${baseUrl}/default-product.webp`,
          "sku": product.variants?.[0]?.sku || product.id,
          ...(product.collection?.title && {
            "brand": {
              "@type": "Brand",
              "name": product.collection.title
            }
          }),
          "offers": {
            "@type": "Offer",
            "priceCurrency": "KES",
            "price": formatPrice(product.variants?.[0]?.calculated_price?.calculated_amount),
            "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1))
              .toISOString()
              .split("T")[0],
            "availability": (product.variants?.[0]?.inventory_quantity ?? 0) > 0 
              ? "https://schema.org/InStock" 
              : "https://schema.org/OutOfStock",
            "itemCondition": "https://schema.org/NewCondition",
            "seller": {
              "@type": "Organization",
              "name": "Vapezone Kenya",
              "url": baseUrl
            }
          }
        }
      }))
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": "Vapezone Kenya",
      "url": baseUrl
    }
  }

  // ItemList Schema (Alternative approach)
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${collection.title} - Vape Products Collection`,
    "description": `Complete collection of ${collection.title} vape devices and accessories`,
    "url": canonicalUrl,
    "numberOfItems": products.length,
    "itemListElement": products.slice(0, 15).map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${baseUrl}/${countryCode}/products/${product.handle}`
    }))
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
      
      {/* Collection Schema - Most important for collection pages */}
      <Script
        id="collection-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      
      {/* ItemList Schema - Alternative representation */}
      <Script
        id="itemlist-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <CollectionTemplate
        collection={collection}
        page={page}
        sortBy={sortBy}
        countryCode={countryCode}
        url={canonicalUrl}
      />
    </>
  )
}