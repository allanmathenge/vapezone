import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryByHandle, listCategories } from "@lib/data/categories"
import { listRegions } from "@lib/data/regions"
import { StoreProductCategory, StoreRegion } from "@medusajs/types"
import CategoryTemplate from "@modules/categories/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import type { WithContext, CollectionPage, ItemList } from "schema-dts"

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

  const categoryName = product_categories.map((c) => c.name).join(" | ")
  const categoryDescription =
    product_categories[product_categories.length - 1].description ??
    `Explore a wide range of ${categoryName} vapes on Vapezone Kenya. Quality brands, fast delivery, great prices.`

  const exampleProducts = product_categories[product_categories.length - 1]?.products ?? []

  const itemListSchema: WithContext<ItemList> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: categoryName,
    description: categoryDescription,
    itemListElement: exampleProducts.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.title,
      url: `https://www.vapezone.co.ke/ke/products/${product.handle}`,
    })),
  }

  const collectionSchema: WithContext<CollectionPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${categoryName} – Vapezone Kenya`,
    description: categoryDescription,
    mainEntity: itemListSchema,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema),
        }}
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





// import { Metadata } from "next"
// import { notFound } from "next/navigation"

// import { getCategoryByHandle, listCategories } from "@lib/data/categories"
// import { listRegions } from "@lib/data/regions"
// import { StoreProductCategory, StoreRegion } from "@medusajs/types"
// import CategoryTemplate from "@modules/categories/templates"
// import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

// type Props = {
//   params: { category: string[]; countryCode: string }
//   searchParams: {
//     sortBy?: SortOptions
//     page?: string
//   }
// }

// export async function generateStaticParams() {
//   const product_categories = await listCategories()

//   if (!product_categories) return []

//   const countryCodes = await listRegions().then((regions: StoreRegion[]) =>
//     regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
//   )

//   const categoryHandles = product_categories.map((category) => category.handle)

//   const staticParams = countryCodes
//     ?.map((countryCode: string | undefined) =>
//       categoryHandles.map((handle: string) => ({
//         countryCode,
//         category: [handle],
//       }))
//     )
//     .flat()

//   return staticParams
// }

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   try {
//     const { product_categories } = await getCategoryByHandle(params.category)

//     const title = product_categories
//       .map((category: StoreProductCategory) => category.name)
//       .join(" | ")

//     const description =
//       product_categories[product_categories.length - 1].description ??
//       `Discover the best selection of ${title} vapes in Nairobi at Vapezone. Shop top brands, rich flavors and enjoy fast, reliable delivery across Kenya.`
      
//     return {
//       title: `${title} – Best Vapes in Kenya | Shop Vapes Online At Vapezone`,
//       description,
//       alternates: {
//         canonical: `${params.category.join("/")}`,
//       },
//     }
//   } catch (error) {
//     notFound()
//   }
// }

// export default async function CategoryPage({ params, searchParams }: Props) {
//   const { sortBy, page } = searchParams
//   const { product_categories } = await getCategoryByHandle(params.category)

//   if (!product_categories) notFound()
//   return (
//     <>
//       <CategoryTemplate
//         categories={product_categories}
//         sortBy={sortBy}
//         page={page}
//         countryCode={params.countryCode}
//       />
//     </>
//   )
// }
