import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Shop Vapes Online in Kenya | Vapezone - Kenya’s Trusted Online Vape Store for Top Brands & Flavors",
  description:
    "Your ultimate destination for premium vaping products in Nairobi - Fast, Affordable & Reliable! Explore a wide range of vape devices, rich-flavored e-liquids and accessories tailored for every vaping enthusiast. Enjoy expert insights, exclusive deals and top-tier brands and elevate your vaping experience today!",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <div className="pt-8">
        <h1 className="text-center font-semibold text-xl sm:text-2xl">Feartured products</h1>
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
