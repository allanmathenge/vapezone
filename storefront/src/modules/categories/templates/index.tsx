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

    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": category.name,
      "description": category.description
        ? category.description.replace(/<[^>]*>/g, '').substring(0, 160)
        : `${category.name} - Vape & Drinking Products at Vapezone Kenya`,
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
        className="flex rounded-rounded flex-col mt-12 small:flex-row small:items-start py-8 content-container"
        data-testid="category-container"
      >
        <RefinementList sortBy={sort} data-testid="sort-by-container" />

        <div className="w-full space-y-6 mt-2">
          {parents && parents.length > 0 && (
            <nav className="flex items-center space-x-2 text-sm text-gray-600" aria-label="Breadcrumb">
              {parents.map((parent, index) => (
                <div key={parent.id} className="flex items-center space-x-2">
                  <LocalizedClientLink
                    className="hover:text-blue-600 transition-colors duration-200 px-2 py-1 rounded-md hover:bg-blue-50"
                    href={`/categories/${parent.handle}`}
                    data-testid="breadcrumb-link"
                  >
                    {parent.parent_category?.name}
                  </LocalizedClientLink>
                  {index < parents.length - 1 && (
                    <span className="text-gray-400">/</span>
                  )}
                </div>
              ))}
            </nav>
          )}

          {/* Category Header */}
          <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-500 rounded-sm shadow-sm">
            <div className="px-6 py-4">
              <h1
                className="text-2xl sm:text-3xl font-bold text-white text-center"
                data-testid="category-page-title"
              >
                {category.name}
              </h1>
            </div>
          </header>
          {category.category_children && category.category_children.length > 0 && (
            <section className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Subcategories</h2>
              </div>
              <div className="p-6">
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.category_children.map((c) => (
                    <li key={c.id}>
                      <div className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group">
                        <InteractiveLink href={`/categories/${c.handle}`}>
                          <span className="flex items-center">
                            <span className="text-gray-900 group-hover:text-blue-700 font-medium transition-colors duration-200">
                              {c.name}
                            </span>
                          </span>
                        </InteractiveLink>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
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
              className="bg-white rounded-xl border text-small-regular small:txt-compact-medium border-gray-100 my-6 shadow-sm"
              data-testid="category-description"
            >
              <div className="prose px-2 sm:px-6 text-ui-fg-subtle prose-gray max-w-none">
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
                        className="text-gray-600 space-y-2 mb-4 list-disc list-inside"
                      />
                    ),

                    li: ({ node, ...props }) => (
                      <li
                        {...props}
                        className="text-gray-600 space-y-2 mb-4 list-disc list-inside leading-relaxed"
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