import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const { products } = collection
  if (!products) {
    return null
  }

  return (
    <div className="content-container small:py-3">
      <div className="flex justify-between mb-4">
        <Text className="txt-xlarge font-bold">{collection.title}</Text>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          View
        </InteractiveLink>
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-3 gap-y-3 small:gap-y-4">
        {products &&
          products.slice(0, 12).map((product) => (
            <li key={product.id}>
              {/* @ts-ignore */}
              <ProductPreview product={product} region={region} isFeatured />
            </li>
          ))}
      </ul>
    </div>
  )
}
