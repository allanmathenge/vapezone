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
import { MdCall } from "react-icons/md";

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
  const [quantity] = useState(1) // default quantity
  const countryCode = useParams().countryCode as string

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

  const setOptionValue = (title: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [title]: value,
    }))
  }

  const inStock = useMemo(() => {
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }
    if (selectedVariant?.allow_backorder) {
      return true
    }
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }
    return false
  }, [selectedVariant])

  // Check if inventory quantity is 0
  const isOutOfStock = useMemo(() => {
    if (selectedVariant?.manage_inventory && (selectedVariant?.inventory_quantity || 0) === 0) {
      return true
    }
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)
  const inView = useIntersection(actionsRef, "0px")

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null
    setIsAdding(true)
    await addToCart({
      variantId: selectedVariant.id,
      quantity,
      countryCode,
    })
    setIsAdding(false)
  }

  const handleConfirmOrder = () => {
    const productUrl = `${window.location.origin}/${countryCode}/products/${product.handle}`

    const whatsappMessage = `
Product Link: ${productUrl}
Hi, I'd like to place an order: ${product.title}, ${selectedVariant?.calculated_price?.original_amount
        ? `${(selectedVariant.calculated_price?.original_amount).toLocaleString()}`
        : "Check site for latest price"
      }
Quantity: ${quantity}`

    const whatsappLink = `https://wa.me/254798769535?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappLink, "_blank")
  }

  return (
    <div className="flex flex-col gap-y-2" ref={actionsRef}>
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

      <Button
        onClick={handleAddToCart}
        disabled={!inStock || !selectedVariant || !!disabled || isAdding || isOutOfStock}
        variant="primary"
        className="min-w-0 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl text-white text-nowrap overflow-hidden"
        isLoading={isAdding}
        data-testid="add-product-button"
      >
        {!selectedVariant
          ? "Select variant"
          : !inStock || isOutOfStock
            ? "Out of stock"
            : "Add to cart"}
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
          {isOutOfStock ? "Out of stock" : "Place Order"}
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
      />
    </div>
  )
}