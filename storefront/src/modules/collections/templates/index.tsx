import { Suspense } from "react"
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
  
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: collection.title,
    url: url,
    numberOfItems: collection.products?.length || 0,
    itemListElement: (collection.products || [])
      .slice(0, 12)
      .map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.title,
        url: `${url?.replace(/\/$/, "")}/products/${product.handle}`,
      })),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.vapezone.co.ke/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: collection.title,
        item: url,
      },
    ],
  }

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container">
      <RefinementList sortBy={sort} />
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1>{collection.title}</h1>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([itemListSchema, breadcrumbSchema]),
          }}
        />
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
  )
}
