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

  const sortedProducts = [...products].sort((a, b) => {
    const getProductStockStatus = (product: HttpTypes.StoreProduct) => {
      if (!product.variants || product.variants.length === 0) return false

      return product.variants.some(variant => {
        // If inventory is managed, check quantity
        if (variant.manage_inventory !== false) {
          return (variant.inventory_quantity || 0) > 0
        }
        return true
      })
    }

    const aInStock = getProductStockStatus(a)
    const bInStock = getProductStockStatus(b)

    if (aInStock && !bInStock) return -1
    if (!aInStock && bInStock) return 1
    return 0
  })


  return (
    <div className="content-container small:py-3">
      <div className="flex justify-between my-4">
        <Text className="txt-xlarge font-bold">{collection.title}</Text>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          Explore
        </InteractiveLink>
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-3 gap-y-5 small:gap-y-4">
        {sortedProducts.slice(0, 4).map((product) => (
          <li key={product.id}>
            {/* @ts-ignore */}
            <ProductPreview product={product} region={region} isFeatured />
          </li>
        ))}
      </ul>
    </div>
  )
}