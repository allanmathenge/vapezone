import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useMemo } from "react"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
  selectedVariant?: HttpTypes.StoreProductVariant
}

const ProductInfo = ({ product, selectedVariant }: ProductInfoProps) => {
  const inStock = useMemo(() => {
    if (selectedVariant) {
      if (!selectedVariant.manage_inventory) return true
      if (selectedVariant.allow_backorder) return true
      return (selectedVariant.inventory_quantity || 0) > 0
    }
    
    return product.variants?.some(variant =>
      !variant.manage_inventory ||
      variant.allow_backorder ||
      (variant.inventory_quantity || 0) > 0
    )
  }, [selectedVariant, product.variants])

  const stockStatus = useMemo(() => {
    if (!selectedVariant) {
      return {
        text: inStock ? 'In Stock' : 'Out of Stock',
        color: inStock ? 'text-emerald-600' : 'text-rose-600',
        bgColor: inStock ? 'bg-emerald-50' : 'bg-rose-50',
        dotColor: inStock ? 'bg-emerald-500' : 'bg-rose-500',
        borderColor: inStock ? 'border-emerald-200' : 'border-rose-200'
      }
    }

    if (!selectedVariant.manage_inventory) {
      return {
        text: 'In Stock',
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        dotColor: 'bg-emerald-500',
        borderColor: 'border-emerald-200'
      }
    }

    if (selectedVariant.allow_backorder) {
      return {
        text: 'Available for Backorder',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        dotColor: 'bg-blue-500',
        borderColor: 'border-blue-200'
      }
    }

    if ((selectedVariant.inventory_quantity || 0) > 0) {
      return {
        text: 'In Stock',
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        dotColor: 'bg-emerald-500',
        borderColor: 'border-emerald-200'
      }
    }

    return {
      text: 'Out of Stock',
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      dotColor: 'bg-rose-500',
      borderColor: 'border-rose-200'
    }
  }, [selectedVariant, inStock])

  const InfoSection = ({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) => (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <Text className="text-ui-fg-muted font-medium uppercase tracking-wider mb-1">
        {title}
      </Text>
      {children}
    </div>
  )

  return (
    <div className="bg-white text-small-regular rounded-xl p-6 shadow-sm border border-ui-border-base">
      <div className="small:space-y-6 space-y-3 text-slate-600">
        {product.collection && (
          <InfoSection title="Collection">
            <LocalizedClientLink
              href={`/collections/${product.collection.handle}`}
              className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover font-medium transition-colors duration-200 hover:underline"
            >
              {product.collection.title}
            </LocalizedClientLink>
          </InfoSection>
        )}
        
        <InfoSection title="Product">
          <Heading
            level="h1"
            className="leading-tight"
            data-testid="product-title"
          >
            {product.title}
          </Heading>
        </InfoSection>

        <div className={`${stockStatus.bgColor} ${stockStatus.borderColor} rounded-lg p-4 border`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-2.5 h-2.5 rounded-full ${stockStatus.dotColor}`}></div>
              <Text className={`font-semibold text-sm ${stockStatus.color}`}>
                {stockStatus.text}
              </Text>
            </div>
            {selectedVariant?.inventory_quantity !== undefined && selectedVariant.manage_inventory && (
              <Text className={`text-sm font-medium ${stockStatus.color}`}>
                {selectedVariant.inventory_quantity} unit{selectedVariant.inventory_quantity !== 1 ? 's' : ''}
              </Text>
            )}
          </div>
        </div>

        {product.variants && product.variants.length > 0 && (
          <InfoSection title={selectedVariant ? "Available Variants" : "Variants"}>
            <div className="hidden small:grid grid-cols-1 gap-2">
              {product.variants.map((variant) => {
                const isSelected = selectedVariant?.id === variant.id
                const variantInStock = !variant.manage_inventory || 
                  variant.allow_backorder || 
                  (variant.inventory_quantity || 0) > 0
                
                return (
                  <div 
                    key={variant.id} 
                    className={`
                      relative rounded-lg px-4 py-1 text-sm transition-all duration-200
                      border-2 flex flex-col space-y-1
                      ${isSelected 
                        ? 'bg-blue-50 border-blue-500 shadow-sm' 
                        : 'border-ui-border-base hover:border-ui-border-interactive'
                      }
                      ${!variantInStock ? 'opacity-50 grayscale' : ''}
                    `}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`font-thin  ${isSelected ? 'text-blue-800' : 'text-ui-fg-base'}`}>
                        {variant.title}
                      </span>
                      {!variantInStock && (
                        <span className="text-rose-600 font-thin px-2 rounded-full">
                          Out of stock
                        </span>
                      )}
                    </div>
                    <div className="">
                      {variant.manage_inventory && variantInStock && !variant.allow_backorder && (
                        <div className="text-ui-fg-muted">
                          {variant.inventory_quantity} units available
                        </div>
                      )}
                      {variant.allow_backorder && (
                        <div className="text-blue-600 font-thin">
                          ✓ Backorder available
                        </div>
                      )}
                    </div>

                    {isSelected && (
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            
            {/* Mobile variant summary */}
            <div className="small:hidden">
              <Text className="text-ui-fg-base">
                {product.variants.length} variant{product.variants.length !== 1 ? 's' : ''}
                {selectedVariant && ` • Selected: ${selectedVariant.title}`}
              </Text>
            </div>
          </InfoSection>
        )}

        {/* Product Details */}
        <div className="grid grid-cols-2 gap-4">
          <InfoSection title="Weight">
            <Text className="text-ui-fg-base font-medium">
              {product.weight ? `${product.weight}g` : "-"}
            </Text>
          </InfoSection>

          <InfoSection title="Dimensions">
            <Text className="text-ui-fg-base font-medium">
              {product.length && product.width && product.height
                ? `${product.length} × ${product.width} × ${product.height} mm`
                : "-"}
            </Text>
          </InfoSection>
        </div>

        {/* Country Of Origin */}
        <InfoSection title="Type">
          <Text className="text-ui-fg-base font-medium">
            {product.type ? product.type.value : "-"}
          </Text>
        </InfoSection>
      </div>
    </div>
  )
}

export default ProductInfo