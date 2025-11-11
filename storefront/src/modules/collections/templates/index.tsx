import { Suspense } from "react"
import Head from "next/head"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"

type Props = {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  countryCode: string
  url?: string 
}

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
  url,
}: Props) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  
  const generateStructuredData = () => {
    const collectionUrl = `https://www.vapezone.co.ke/ke/collections/${collection.handle}`
    
    const collectionPageSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": collection.title,
      "description": collection.metadata?.description || `Browse ${collection.title} products at Vapezone Kenya`,
      "url": collectionUrl,
      "mainEntity": {
        "@type": "Collection",
        "name": collection.title,
        "description": collection.metadata?.description || `${collection.title} collection at Vapezone Kenya`,
        "numberOfItems": collection.metadata?.product_count || 0,
        "url": collectionUrl
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.vapezone.co.ke/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Collections",
            "item": "https://www.vapezone.co.ke/ke/store"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": collection.title,
            "item": collectionUrl
          }
        ]
      }
    }

    // Website schema for organization info
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Vapezone Kenya",
      "url": "https://www.vapezone.co.ke/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.vapezone.co.ke/ke/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }

    return [collectionPageSchema, websiteSchema]
  }

  const structuredData = generateStructuredData()

  console.log(collection, "Collection <<<----------------")

  return (
    <>
      <Head>
        {structuredData.map((data, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(data),
            }}
          />
        ))}
      </Head>

      <div className="flex flex-col small:flex-row small:items-start py-16 content-container">
        <RefinementList sortBy={sort} />
        <div className="w-full">
          <h1 className="text-2xl small:text-3xl my-4">{`${collection.title}`}</h1>
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              collectionId={collection.id}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </>
  )
}