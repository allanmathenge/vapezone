import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Shop Vapes & E-Liquids Online in Kenya",
  description: "Discover top vape brands, disposable vapes, pods and e-liquids at Vapezone Kenya. Shop online for premium vaping products and fast delivery.",
  alternates: {
    canonical: "https://www.vapezone.co.ke/ke/store",
  },
}

type Params = {
  searchParams: {
    sortBy?: SortOptions
    page?: string
  }
  params: {
    countryCode: string
  }
}

export default async function StorePage({ searchParams, params }: Params) {
  const { sortBy, page } = searchParams

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
    />
  )
}
