import { clx } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

interface ProductPriceProps {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}

export default function ProductPrice({ product, variant }: ProductPriceProps) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return (
      <div className="flex flex-col gap-2">
        <div className="w-32 h-8 bg-gray-100 animate-pulse rounded-md" />
        <div className="w-24 h-4 bg-gray-100 animate-pulse rounded-md" />
      </div>
    )
  }

  const isOnSale = selectedPrice.price_type === "sale"
  const showFromPrefix = !variant

  return (
    <div className="flex flex-col gap-2">
      {/* Main Price */}
      <div className="flex items-center gap-3">
        <span
          className={clx(
            "text-2xl font-semibold tracking-tight",
            {
              "text-ui-fg-interactive": isOnSale,
              "text-ui-fg-base": !isOnSale,
            }
          )}
        >
          <span
            data-testid="product-price"
            data-value={selectedPrice.calculated_price_number}
            className="tabular-nums"
          >
            {selectedPrice.calculated_price}
          </span>
        </span>
        
        {isOnSale && (
          <span className="bg-ui-bg-interactive text-white text-sm font-medium px-2 py-1 rounded-full">
            -{selectedPrice.percentage_diff}%
          </span>
        )}
      </div>

      {/* Original Price */}
      {isOnSale && (
        <div className="flex items-center gap-2 text-sm text-ui-fg-subtle">
          <span>Original:</span>
          <span
            className="line-through tabular-nums"
            data-testid="original-product-price"
            data-value={selectedPrice.original_price_number}
          >
            {selectedPrice.original_price}
          </span>
        </div>
      )}
    </div>
  )
}