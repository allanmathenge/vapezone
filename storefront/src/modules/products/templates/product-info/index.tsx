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
  // Calculate stock availability
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
    
    return product.variants?.some(
      (variant) =>
        !variant.manage_inventory ||
        variant.allow_backorder ||
        (variant.inventory_quantity || 0) > 0
    )
  }, [selectedVariant, product.variants])

  // Check if specifically out of stock (inventory = 0)
  const isOutOfStock = useMemo(() => {
    if (selectedVariant?.manage_inventory && (selectedVariant?.inventory_quantity || 0) === 0) {
      return true
    }
    return false
  }, [selectedVariant])

  // Get selected variant options for display
  const selectedOptions = useMemo(() => {
    if (!selectedVariant) return null
    return optionsAsKeymap(selectedVariant.options)
  }, [selectedVariant])

  // Stock status display configuration
  const stockStatus = useMemo(() => {
    if (!selectedVariant) {
      return {
        text: inStock ? 'Available' : 'Out of Stock',
        color: inStock ? 'text-green-600' : 'text-red-600',
        bgColor: inStock ? 'bg-green-100' : 'bg-red-100',
        dotColor: inStock ? 'bg-green-500' : 'bg-red-500'
      }
    }

    if (!selectedVariant.manage_inventory) {
      return {
        text: 'In Stock',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        dotColor: 'bg-green-500'
      }
    }

    if (selectedVariant.allow_backorder) {
      return {
        text: 'Available for Backorder',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        dotColor: 'bg-blue-500'
      }
    }

    if ((selectedVariant.inventory_quantity || 0) > 0) {
      return {
        text: 'In Stock',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        dotColor: 'bg-green-500'
      }
    }

    return {
      text: 'Out of Stock',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      dotColor: 'bg-red-500'
    }
  }, [selectedVariant, inStock])

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

        {/* Stock Status Banner */}
        <div className={`${stockStatus.bgColor} rounded-lg p-3 border ${stockStatus.color.replace('text-', 'border-')} border-opacity-30`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${stockStatus.dotColor}`}></div>
              <Text className={`font-medium ${stockStatus.color}`}>
                {stockStatus.text}
              </Text>
            </div>
            {selectedVariant?.inventory_quantity !== undefined && selectedVariant.manage_inventory && (
              <Text className={`text-sm ${stockStatus.color}`}>
                {selectedVariant.inventory_quantity} unit{selectedVariant.inventory_quantity !== 1 ? 's' : ''} available
              </Text>
            )}
          </div>
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
            <div className="grid grid-cols-1 gap-2">
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
                      ${!variantInStock ? 'opacity-60' : ''}
                    `}
                  >
                    <div className="flex justify-between items-center">
                      <span className={isSelected ? 'font-semibold' : ''}>
                        {variant.title}
                      </span>
                      {!variantInStock && (
                        <span className="text-xs text-red-500">Out of stock</span>
                      )}
                    </div>
                    {variant.manage_inventory && variantInStock && !variant.allow_backorder && (
                      <div className="text-xs text-ui-fg-muted mt-1">
                        {variant.inventory_quantity} in stock
                      </div>
                    )}
                    {variant.allow_backorder && (
                      <div className="text-xs text-blue-500 mt-1">
                        Backorder available
                      </div>
                    )}
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-ui-border-interactive rounded-full"></div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Additional Inventory Info */}
        {selectedVariant && (
          <div className="pt-4 border-t border-ui-border-base">
            <div className="grid grid-cols-2 gap-4 text-sm text-ui-fg-muted">
              <div>
                <Text className="font-medium mb-1">Inventory</Text>
                <div>{selectedVariant.manage_inventory ? 'Managed' : 'Not managed'}</div>
              </div>
              <div>
                <Text className="font-medium mb-1">Backorders</Text>
                <div>{selectedVariant.allow_backorder ? 'Allowed' : 'Not allowed'}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductInfo