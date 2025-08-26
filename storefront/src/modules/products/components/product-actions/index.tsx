"use client"

import { Button, Input } from "@medusajs/ui"
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
  const [showPrompt, setShowPrompt] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [address, setAddress] = useState("")
  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options
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
Hi, I'd like to place an order

Product: ${product.title}
${selectedVariant ? `Variant: ${selectedVariant.title}` : ""}
Quantity: ${quantity}
Price: ${
      selectedVariant?.calculated_price?.original_amount
        ? `${(selectedVariant.calculated_price?.original_amount).toLocaleString()} ${region.currency_code.toUpperCase()}`
        : "Check site for latest price"
    }
Delivery Location: ${address}
Product Link: ${productUrl}
    `

    const whatsappLink = `https://wa.me/254798769535?text=${encodeURIComponent(
      whatsappMessage
    )}`

    window.open(whatsappLink, "_blank")
    setShowPrompt(false)
  }

  return (
    <>
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
                    disabled={!!disabled || isAdding}
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
          disabled={!inStock || !selectedVariant || !!disabled || isAdding}
          variant="primary"
          className="w-full h-10"
          isLoading={isAdding}
          data-testid="add-product-button"
        >
          {!selectedVariant
            ? "Select variant"
            : !inStock
            ? "Out of stock"
            : "Add to cart"}
        </Button>

        <Button
          onClick={() => setShowPrompt(true)}
          variant="secondary"
          className="w-full h-10 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white"
        >
          <FaWhatsapp size={18} />
          Place Order
        </Button>

        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>

      {/* Order Prompt Modal */}
      {showPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 shadow-2xl flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Confirm Your Order
            </h2>

            <Input
              type="text"
              placeholder="Enter Delivery Location"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border rounded-lg p-2"
            />
            <Input
              type="number"
              min={1}
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded-lg p-2"
            />

            <div className="flex gap-2 mt-4">
              <Button
                onClick={() => setShowPrompt(false)}
                variant="secondary"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmOrder}
                disabled={!address}
                variant="primary"
                className={`flex-1 ${
                  address
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Confirm on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
