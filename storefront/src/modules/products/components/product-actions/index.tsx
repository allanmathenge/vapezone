"use client"

import { Button } from "@medusajs/ui"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import { FaWhatsapp } from "react-icons/fa"

import { useIntersection } from "@lib/hooks/use-in-view"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"

import MobileActions from "./mobile-actions"
import ProductPrice from "../product-price"
import { addToCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { MdCall } from "react-icons/md"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (variantOptions: any) => {
  return variantOptions?.reduce((acc: Record<string, string | undefined>, varopt: any) => {
    if (varopt.option && varopt.value !== null && varopt.value !== undefined) {
      acc[varopt.option.title] = varopt.value
    }
    return acc
  }, {})
}

export default function ProductActions({
  product,
  region,
  disabled,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [quantity] = useState(1)
  const [inventoryStatus, setInventoryStatus] = useState<Map<string, number>>(new Map())
  const [lastActionSuccess, setLastActionSuccess] = useState(true)
  const countryCode = useParams().countryCode as string

  // Initialize inventory status from product variants
  useEffect(() => {
    const initialInventory = new Map()
    product.variants?.forEach(variant => {
      if (variant.id && variant.manage_inventory) {
        initialInventory.set(variant.id, variant.inventory_quantity || 0)
      }
    })
    setInventoryStatus(initialInventory)
  }, [product.variants])

  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }
    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // Real-time inventory check for selected variant
  const currentInventory = useMemo(() => {
    if (!selectedVariant?.id) return 0
    return inventoryStatus.get(selectedVariant.id) ?? selectedVariant.inventory_quantity ?? 0
  }, [selectedVariant, inventoryStatus])

  const setOptionValue = (title: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [title]: value,
    }))
  }

  const inStock = useMemo(() => {
    if (!selectedVariant) return false
    
    if (!selectedVariant.manage_inventory) {
      return true
    }
    if (selectedVariant.allow_backorder) {
      return true
    }
    
    const inventory = currentInventory
    return inventory > 0
  }, [selectedVariant, currentInventory])

  // Enhanced out of stock check with real-time inventory
  const isOutOfStock = useMemo(() => {
    if (!selectedVariant) return false
    
    if (!selectedVariant.manage_inventory) {
      return false
    }
    
    const inventory = currentInventory
    return inventory === 0 && !selectedVariant.allow_backorder
  }, [selectedVariant, currentInventory])

  // Check if inventory is critically low (last item)
  const isLastItem = useMemo(() => {
    if (!selectedVariant?.manage_inventory) return false
    return currentInventory === 1
  }, [selectedVariant, currentInventory])

  const actionsRef = useRef<HTMLDivElement>(null)
  const inView = useIntersection(actionsRef, "0px")

  // Optimistic inventory update function
  const updateInventoryOptimistically = (variantId: string, quantity: number) => {
    setInventoryStatus(prev => {
      const newStatus = new Map(prev)
      const currentQty = newStatus.get(variantId) ?? 0
      newStatus.set(variantId, Math.max(0, currentQty - quantity))
      return newStatus
    })
  }

  const handleAddToCart = async () => {
    if (!selectedVariant?.id || !inStock || isOutOfStock) return null
    
    setIsAdding(true)
    setLastActionSuccess(true)
    
    // Optimistically update inventory before API call
    updateInventoryOptimistically(selectedVariant.id, quantity)
    
    try {
      // Since addToCart returns void, we assume success unless it throws an error
      await addToCart({
        variantId: selectedVariant.id,
        quantity,
        countryCode,
      })
      
      // If we reach here, the API call was successful
      // You could add a success notification here
      console.log('Successfully added to cart')
      
    } catch (error) {
      console.error('Failed to add to cart:', error)
      setLastActionSuccess(false)
      
      // Revert optimistic update on error
      setInventoryStatus(prev => {
        const newStatus = new Map(prev)
        const currentQty = newStatus.get(selectedVariant.id) ?? 0
        newStatus.set(selectedVariant.id, currentQty + quantity)
        return newStatus
      })
      
      // Show error message to user
      alert('Sorry, this item is no longer available. Please refresh the page.')
    } finally {
      setIsAdding(false)
    }
  }

  const handleConfirmOrder = () => {
    if (!selectedVariant?.id || !inStock || isOutOfStock) return
    
    const productUrl = `${window.location.origin}/${countryCode}/products/${product.handle}`
    
    // Optimistically update inventory for WhatsApp order
    updateInventoryOptimistically(selectedVariant.id, quantity)

    const whatsappMessage = `
Product Link: ${productUrl}
Hi, I'd like to place an order: ${product.title}, ${selectedVariant?.calculated_price?.original_amount
        ? `${(selectedVariant.calculated_price?.original_amount).toLocaleString()}`
        : "Check site for latest price"
      }
Quantity: ${quantity}
${isLastItem ? '⚠️ Last item in stock!' : ''}`

    const whatsappLink = `https://wa.me/254798769535?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappLink, "_blank")
  }

  // Get button text based on inventory status
  const getAddToCartText = () => {
    if (!selectedVariant) return "Select variant"
    if (isOutOfStock) return "Out of stock"
    if (isLastItem) return "Last item - Add to cart"
    return "Add to cart"
  }

  const getWhatsAppButtonText = () => {
    if (isOutOfStock) return "Out of stock"
    if (isLastItem) return "Last item - Order Now"
    return "Place Order"
  }

  return (
    <div className="flex flex-col gap-y-2" ref={actionsRef}>
      {/* Inventory Warning Banner */}
      {isLastItem && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-2">
          <div className="flex items-center gap-2 text-amber-800 text-sm font-medium">
            <span className="flex w-2 h-2 bg-amber-500 rounded-full"></span>
            ⚠️ Only 1 item left in stock!
          </div>
        </div>
      )}
      
      {isOutOfStock && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-2">
          <div className="flex items-center gap-2 text-red-800 text-sm font-medium">
            <span className="flex w-2 h-2 bg-red-500 rounded-full"></span>
            Out of stock
          </div>
        </div>
      )}

      {/* Error Banner */}
      {!lastActionSuccess && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-2">
          <div className="flex items-center gap-2 text-red-800 text-sm font-medium">
            <span className="flex w-2 h-2 bg-red-500 rounded-full"></span>
            Failed to add item to cart. Please try again.
          </div>
        </div>
      )}

      <div>
        {(product.variants?.length ?? 0) > 1 && (
          <div className="flex flex-col gap-y-4">
            {(product.options || []).map((option) => (
              <div key={option.id}>
                <OptionSelect
                  option={option}
                  current={options[option.title ?? ""]}
                  updateOption={setOptionValue}
                  title={option.title ?? ""}
                  data-testid="product-options"
                  disabled={!!disabled || isAdding || isOutOfStock}
                />
              </div>
            ))}
            <Divider />
          </div>
        )}
      </div>

      <ProductPrice product={product} variant={selectedVariant} />

      {/* Inventory display */}
      {selectedVariant?.manage_inventory && !isOutOfStock && (
        <div className="text-sm text-gray-600 mb-2">
          {currentInventory > 5 ? (
            <span className="text-green-600">In stock ({currentInventory} available)</span>
          ) : currentInventory > 1 ? (
            <span className="text-amber-600">Only {currentInventory} left in stock</span>
          ) : (
            <span className="text-red-600">Last item!</span>
          )}
        </div>
      )}

      <Button
        onClick={handleAddToCart}
        disabled={!inStock || !selectedVariant || !!disabled || isAdding || isOutOfStock}
        variant="primary"
        className="min-w-0 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl text-white text-nowrap overflow-hidden"
        isLoading={isAdding}
        data-testid="add-product-button"
      >
        {getAddToCartText()}
      </Button>

      <div className="flex-1 flex gap-2">
        <Button
          onClick={() => window.open('tel:+254798769535')}
          variant="primary"
          className="flex-1 h-8 min-w-0 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow hover:shadow-sm text-white text-nowrap overflow-hidden"
          data-testid="call-button"
        >
          <MdCall /> Call To Order
        </Button>
        <Button
          onClick={handleConfirmOrder}
          disabled={!inStock || !selectedVariant || !!disabled || isAdding || isOutOfStock}
          variant="secondary"
          className="flex-1 h-8 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 text-white text-nowrap overflow-hidden"
        >
          <FaWhatsapp size={18} />
          {getWhatsAppButtonText()}
        </Button>
      </div>

      <MobileActions
        product={product}
        variant={selectedVariant}
        options={options}
        updateOptions={setOptionValue}
        inStock={inStock}
        isOutOfStock={isOutOfStock}
        handleAddToCart={handleAddToCart}
        isAdding={isAdding}
        show={!inView}
        optionsDisabled={!!disabled || isAdding || isOutOfStock}
        currentInventory={currentInventory}
        isLastItem={isLastItem}
      />
    </div>
  )
}