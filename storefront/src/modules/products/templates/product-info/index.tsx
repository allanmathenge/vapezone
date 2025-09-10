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
    <div id="product-info" className="bg-ui-bg-subtle rounded-xl p-6 shadow-sm border border-ui-border-base">
      <div className="flex flex-col space-y-6">
        {/* Collection */}
        {product.collection && (
          <div className="flex flex-col space-y-1">
            <Text className="text-ui-fg-muted text-xs font-medium uppercase tracking-wider">Collection</Text>
            <LocalizedClientLink
              href={`/collections/${product.collection.handle}`}
              className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover font-medium transition-colors duration-200"
            >
              {product.collection.title}
            </LocalizedClientLink>
          </div>
        )}

        {/* Product Title */}
        <div className="flex flex-col space-y-1">
          <Text className="text-ui-fg-muted text-xs font-medium uppercase tracking-wider">Product</Text>
          <Heading
            level="h1"
            className="text-ui-fg-base text-xl font-semibold"
            data-testid="product-title"
          >
            {product.title}
          </Heading>
        </div>

        {/* Variants */}
        {product.variants && product.variants.length > 0 && (
          <div className="flex flex-col space-y-2">
            <Text className="text-ui-fg-muted text-xs font-medium uppercase tracking-wider">Variants</Text>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.variants.map((variant) => (
                <div 
                  key={variant.id} 
                  className="bg-ui-bg-component hover:bg-ui-bg-component-hover transition-colors duration-150 rounded-lg px-3 py-2 text-sm"
                >
                  {variant.title}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Availability */}
        <div className="flex items-center justify-between pt-4 border-t border-ui-border-base">
          <Text className="text-ui-fg-muted text-sm font-medium">Availability</Text>
          <div className={`flex items-center ${inStock ? 'text-ui-tag-green-text' : 'text-ui-tag-red-text'}`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${inStock ? 'bg-ui-tag-green-icon' : 'bg-ui-tag-red-icon'}`}></div>
            <span className="font-medium">{inStock ? 'In Stock' : 'Out of Stock'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo