import { notFound } from "next/navigation"
import { Suspense } from "react"
import { ItemList, WithContext } from "schema-dts"
import ReactMarkdown from "react-markdown"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

import { Text } from "@medusajs/ui"

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

  const schemaData: WithContext<ItemList> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category.name,
    itemListElement:
      category.category_children?.map((child, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: child.name,
        url: `/categories/${child.handle}`,
      })) || [],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div
        className="flex flex-col small:flex-row small:items-start py-6 content-container"
        data-testid="category-container"
      >
        <RefinementList sortBy={sort} data-testid="sort-by-container" />

        <div className="w-full">
          <div className="flex flex-row mb-8 text-2xl-semi gap-4">
            {parents &&
              parents.map((parent) => (
                <span key={parent.id} className="text-ui-fg-subtle">
                  <LocalizedClientLink
                    className="mr-4 hover:text-black"
                    href={`/categories/${parent.handle}`}
                    data-testid="sort-by-link"
                  >
                    {parent.name}
                  </LocalizedClientLink>
                  /
                </span>
              ))}
            <h1 data-testid="category-page-title">{category.name}</h1>
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
            <Text
              className="text-medium text-ui-fg-subtle text-small-regular rounded my-5 shadow p-3 whitespace-pre-line"
              data-testid="category-description"
            >
              <div className="prose prose-blue max-w-none">
                <ReactMarkdown
                  components={{
                    h2: ({ node, ...props }) => (
                      <h2 {...props} className="text-blue-600 font-bold text-xl mt-1" />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 {...props} className="text-blue-500 font-semibold text-lg mt-1" />
                    ),
                    p: ({ node, ...props }) => (
                      <p {...props} className="text-gray-700 leading-relaxed" />
                    ),
                  }}
                >
                  {category.description.replace(/\\n/g, "\n")}
                </ReactMarkdown>
              </div>
            </Text>
          )}
        </div>
      </div>
    </>
  )
}
