import { Metadata } from "next"
import { notFound } from "next/navigation"
import Head from "next/head"

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

    const title = product_categories
      .map((category: StoreProductCategory) => category.name)
      .join(" | ")

    const description =
      product_categories[product_categories.length - 1].description ??
      `Discover the best selection of ${title} vapes in Nairobi at Vapezone. Shop top brands, rich flavors and enjoy fast, reliable delivery across Kenya.`

    return {
      title: `${title} – Best Vapes in Kenya | Shop Vapes Online At Vapezone`,
      description,
      alternates: {
        canonical: `${params.category.join("/")}`,
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

  const title = category.name
  const description =
    category.description ??
    `Explore the finest ${title} vapes online at Vapezone Kenya.`

  const categoryUrl = `https://www.vapezone.co.ke/${params.countryCode}/categories/${params.category.join("/")}`

  const breadcrumbItems = product_categories.map((cat, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: cat.name,
    item: `https://www.vapezone.co.ke/${params.countryCode}/categories/${params.category.slice(0, index + 1).join("/")}`,
  }))

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: title,
              description: description,
              url: categoryUrl,
              mainEntity: {
                "@type": "ItemList",
                name: title,
                itemListOrder: "https://schema.org/ItemListOrderDescending",
                itemListElement: product_categories.map((cat, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: cat.name,
                  url: `https://www.vapezone.co.ke/${params.countryCode}/categories/${params.category.slice(0, index + 1).join("/")}`,
                })),
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbItems,
            }),
          }}
        />
      </Head>

      <CategoryTemplate
        categories={product_categories}
        sortBy={sortBy}
        page={page}
        countryCode={params.countryCode}
      />
    </>
  )
}
