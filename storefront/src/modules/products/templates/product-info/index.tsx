import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useMemo } from "react"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
  selectedVariant?: HttpTypes.StoreProductVariant
}

const optionsAsKeymap = (variantOptions: any) => {
  return variantOptions?.reduce((acc: Record<string, string | undefined>, varopt: any) => {
    if (varopt.option && varopt.value !== null && varopt.value !== undefined) {
      acc[varopt.option.title] = varopt.value
    }
    return acc
  }, {})
}

const ProductInfo = ({ product, selectedVariant }: ProductInfoProps) => {
  // Calculate stock availability based on selected variant (same logic as ProductActions)
  const inStock = useMemo(() => {
    if (selectedVariant) {
      if (!selectedVariant.manage_inventory) {
        return true
      }
      if (selectedVariant.allow_backorder) {
        return true
      }
      if ((selectedVariant.inventory_quantity || 0) > 0) {
        return true
      }
      return false
    }
    
    // Fallback to general product availability if no variant selected
    return product.variants?.some(
      (variant) =>
        !variant.manage_inventory ||
        variant.allow_backorder ||
        (variant.inventory_quantity || 0) > 0
    )
  }, [selectedVariant, product.variants])

  // Get selected variant options for display
  const selectedOptions = useMemo(() => {
    if (!selectedVariant) return null
    return optionsAsKeymap(selectedVariant.options)
  }, [selectedVariant])

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

        {/* Selected Variant Options */}
        {selectedOptions && Object.keys(selectedOptions).length > 0 && (
          <div className="flex flex-col space-y-2">
            <Text className="text-ui-fg-muted text-xs font-medium uppercase tracking-wider">Selected Options</Text>
            <div className="space-y-2">
              {Object.entries(selectedOptions).map(([optionTitle, optionValue]) => (
                <div key={optionTitle} className="flex justify-between items-center bg-ui-bg-component rounded-lg px-3 py-2">
                  <Text className="text-ui-fg-muted text-sm font-medium">{optionTitle}</Text>
                  
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Variants */}
        {product.variants && product.variants.length > 0 && (
          <div className="flex flex-col space-y-2">
            <Text className="text-ui-fg-muted text-xs font-medium uppercase tracking-wider">
              {selectedVariant ? 'Available Variants' : 'Variants'}
            </Text>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.variants.map((variant) => {
                const isSelected = selectedVariant?.id === variant.id
                const variantInStock = !variant.manage_inventory || 
                  variant.allow_backorder || 
                  (variant.inventory_quantity || 0) > 0
                
                return (
                  <div 
                    key={variant.id} 
                    className={`
                      relative rounded-lg px-3 py-2 text-sm transition-all duration-150
                      ${isSelected 
                        ? 'bg-ui-bg-component-hover border-2 border-ui-border-interactive' 
                        : 'bg-ui-bg-component hover:bg-ui-bg-component-hover border border-ui-border-base'
                      }
                    `}
                  >
                    <div className="flex justify-between items-center">
                      <span className={isSelected ? 'font-semibold' : ''}>
                        {variant.title}
                      </span>
                      {!variantInStock && (
                        <span className="text-xs text-ui-fg-muted">(Out of stock)</span>
                      )}
                    </div>
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-ui-border-interactive rounded-full"></div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Availability Status */}
        <div className="flex items-center justify-between pt-4 border-t border-ui-border-base">
          <Text className="text-ui-fg-muted text-sm font-medium">Availability</Text>
          <div className={`flex items-center ${inStock ? 'text-ui-tag-green-text' : 'text-ui-tag-red-text'}`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${inStock ? 'bg-ui-tag-green-icon' : 'bg-ui-tag-red-icon'}`}></div>
            <span className="font-medium">
              {selectedVariant 
                ? (inStock ? 'In Stock' : 'Out of Stock')
                : (inStock ? 'Available' : 'Out of Stock')
              }
            </span>
          </div>
        </div>

        {/* Inventory Details */}
        {selectedVariant && selectedVariant.manage_inventory && (
          <div className="flex flex-col space-y-1 text-xs text-ui-fg-muted">
            <div className="flex justify-between">
              <span>Inventory managed</span>
              <span>{selectedVariant.allow_backorder ? 'Backorders allowed' : 'No backorders'}</span>
            </div>
            {selectedVariant.inventory_quantity !== undefined && (
              <div className="flex justify-between">
                <span>Current stock</span>
                <span className={selectedVariant.inventory_quantity > 0 ? 'text-ui-tag-green-text' : 'text-ui-tag-red-text'}>
                  {selectedVariant.inventory_quantity} units
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductInfo