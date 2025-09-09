import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {

  const inStock = product.variants?.some(
    (variant) =>
      !variant.manage_inventory ||
      variant.allow_backorder ||
      (variant.inventory_quantity || 0) > 0
  )

  return (
    <div id="product-info">
      <div className="flex flex-col space-y-6 lg:max-w-[500px] mx-auto">
        <div className="flex flex-col border p-2 space-y-2">
          <div className="flex gap-2 items-center text-sm text-ui-fg-muted">
            <span className="font-semibold">Collection:</span>
            {product.collection && (
              <LocalizedClientLink
                href={`/collections/${product.collection.handle}`}
                className="hover:text-blue-700"
              >
                {product.collection.title}
              </LocalizedClientLink>
            )}
          </div>

          <div className="flex gap-2 items-center text-ui-fg-muted">
            <span className="font-semibold">Name:</span>
            <Heading
              level="h1"
              className="text-xs sm:text-sm"
              data-testid="product-title"
            >
              {product.title}
            </Heading>
          </div>
          {product.variants && product.variants.length > 0 && (
            <div className="flex gap-2 items-start text-ui-fg-muted">
              <span className="font-semibold">Variant:</span>
              <div className="flex flex-col text-xs">
                {product.variants.map((variant) => (
                  <span key={variant.id}>{variant.title}</span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 items-center text-ui-fg-muted">
            <span className="font-semibold">Availability:</span>
            <span className={inStock ? "text-green-600" : "text-red-600"}>
              {inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
