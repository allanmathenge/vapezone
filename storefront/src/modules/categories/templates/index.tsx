import { notFound } from "next/navigation"
import { Suspense } from "react"
import ReactMarkdown from "react-markdown"
import Head from "next/head"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

export default function CategoryTemplate({
  categories,
  sortBy,
  page,
  countryCode,
}: {
  categories: HttpTypes.StoreProductCategory[]
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  const category = categories[categories.length - 1]
  const parents = categories.slice(0, categories.length - 1)

  if (!category || !countryCode) notFound()
  const generateStructuredData = () => {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.vapezone.co.ke/ke"
        },
        ...parents.map((parent, index) => ({
          "@type": "ListItem",
          "position": index + 2,
          "name": parent.name,
          "item": `https://www.vapezone.co.ke/ke/categories/${parent.handle}`
        })),
        {
          "@type": "ListItem",
          "position": parents.length + 2,
          "name": category.name,
          "item": typeof window !== 'undefined'
            ? window.location.href
            : `https://www.vapezone.co.ke/ke/categories/${category.handle}`
        }
      ]
    }

    // CollectionPage schema for the category
    const collectionPageSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": category.name,
      "description": category.description
        ? category.description.replace(/<[^>]*>/g, '').substring(0, 160)
        : `${category.name} - Vape Products at Vapezone Kenya`,
      "url": typeof window !== 'undefined'
        ? window.location.href
        : `https://www.vapezone.co.ke/ke/categories/${category.handle}`,
      "breadcrumb": breadcrumbSchema,
      "mainEntity": {
        "@type": "ItemList",
        "name": `Products in ${category.name}`,
        "description": `Browse our collection of ${category.name} products`,
        "numberOfItems": category.products?.length || 0,
        "itemListOrder": "https://schema.org/ItemListOrderAscending"
      }
    }

    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": category.name,
      "description": category.description
        ? category.description.replace(/<[^>]*>/g, '').substring(0, 160)
        : `${category.name} - Vape Products at Vapezone Kenya`,
      "url": typeof window !== 'undefined'
        ? window.location.href
        : `https://www.vapezone.co.ke/ke/categories/${category.handle}`,
      "breadcrumb": breadcrumbSchema,
      "mainEntity": {
        "@type": "Collection",
        "name": category.name,
        "description": category.description,
        "hasPart": category.category_children?.map(child => ({
          "@type": "Collection",
          "name": child.name,
          "url": `https://www.vapezone.co.ke/ke/categories/${child.handle}`
        }))
      }
    }

    return [breadcrumbSchema, webPageSchema]
  }

  const structuredData = generateStructuredData()

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

      <div
        className="flex flex-col mt-12 small:flex-row small:items-start py-8 content-container"
        data-testid="category-container"
      >
        <RefinementList sortBy={sort} data-testid="sort-by-container" />

        <div className="w-full">
          <div className="flex bg-blue-100 flex-row pb-4 text-2xl-semi gap-4">
            {parents &&
              parents.map((parent) => (
                <span key={parent.id} className="text-ui-fg-subtle">
                  <LocalizedClientLink
                    className="mr-4 hover:text-black"
                    href={`/categories/${parent.handle}`}
                    data-testid="sort-by-link"
                  >
                    {parent.parent_category?.name}
                  </LocalizedClientLink>
                  /
                </span>
              ))}
            <h1 className="text-xl sm:text-2xl text-slate-600" data-testid="category-page-title">{`${category.name}`}</h1>
          </div>

          {category.category_children && (
            <div className="mb-8 text-base-large">
              <ul className="grid grid-cols-1 gap-2">
                {category.category_children.map((c) => (
                  <li key={c.id}>
                    <InteractiveLink href={`/categories/${c.handle}`}>
                      {c.name}
                    </InteractiveLink>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              categoryId={category.id}
              countryCode={countryCode}
            />
          </Suspense>
          {category.description && (
            <div
              className="bg-white rounded-xl border border-gray-100 p-6 my-6 shadow-sm"
              data-testid="category-description"
            >
              <div className="prose text-ui-fg-subtle prose-gray max-w-none">
                <ReactMarkdown
                  components={{
                    h2: ({ node, ...props }) => (
                      <h2
                        {...props}
                        className="text-gray-800 font-semibold mb-4 mt-6"
                      />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3
                        {...props}
                        className="text-gray-700 font-semibold mb-3 mt-5"
                      />
                    ),
                    p: ({ node, ...props }) => (
                      <p
                        {...props}
                        className="text-gray-600 leading-relaxed mb-4"
                      />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul
                        {...props}
                        className="text-gray-600 space-y-2 mb-4 list-inside"
                      />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol
                        {...props}
                        className="text-gray-600 space-y-2 mb-4 list-decimal list-inside"
                      />
                    ),
                    li: ({ node, ...props }) => (
                      <li
                        {...props}
                        className="text-gray-600 space-y-2 mb-4 list-decimal list-inside leading-relaxed"
                      />
                    ),
                    a: ({ node, ...props }) => (
                      <a
                        {...props}
                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      />
                    ),
                  }}
                >
                  {category.description.replace(/\\n/g, "\n")}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}