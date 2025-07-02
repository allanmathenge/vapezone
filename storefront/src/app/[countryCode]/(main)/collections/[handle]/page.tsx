import { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  getCollectionByHandle,
  getCollectionsList,
} from "@lib/data/collections"
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

  return {
    title: `${collection.title} | Vapezone`,
    description: `Shop the ${collection.title} online at Vapezone – top brands, great flavors, fast delivery in Kenya.`,
    alternates: {
      canonical: `/${params.countryCode}/collections/${collection.handle}`
    }
  }
}

export default async function CollectionPage({ params, searchParams }: Props) {
  const { page, sortBy } = searchParams

  const collection = await getCollectionByHandle(params.handle)

  if (!collection) notFound()

  return (
    <CollectionTemplate
      collection={collection}
      page={page}
      sortBy={sortBy}
      countryCode={params.countryCode}
    />
  )
}
