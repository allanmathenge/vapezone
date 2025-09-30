"use client"

import { Button } from "@medusajs/ui"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import { FaWhatsapp } from "react-icons/fa"

import { useIntersection } from "@lib/hooks/use-in-view"
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
    if (varopt.option && varopt.value) {
      acc[varopt.option.title] = varopt.value
    }
    return acc
  }, {})
}

export default function ProductActions({ product, region, disabled }: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string

  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    return product.variants?.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  const inStock = useMemo(() => {
    if (!selectedVariant) return false
    if (!selectedVariant.manage_inventory || selectedVariant.allow_backorder) return true
    return (selectedVariant.inventory_quantity || 0) > 0
  }, [selectedVariant])

  const isOutOfStock = useMemo(() => {
    if (!selectedVariant?.manage_inventory) return false
    return (selectedVariant.inventory_quantity || 0) === 0 && !selectedVariant.allow_backorder
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)
  const inView = useIntersection(actionsRef, "0px")

  const setOptionValue = (title: string, value: string) => {
    setOptions(prev => ({ ...prev, [title]: value }))
  }

  const handleAddToCart = async () => {
    if (!selectedVariant?.id || !inStock) return
    
    setIsAdding(true)
    try {
      await addToCart({ variantId: selectedVariant.id, quantity: 1, countryCode })
    } catch (error) {
      alert('Failed to add item. Please try again later.')
    } finally {
      setIsAdding(false)
    }
  }

  const handleWhatsAppOrder = () => {
    if (!selectedVariant || !inStock) return
    
    const message = `Product: ${product.title}`
    const url = `https://wa.me/254798769535?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  const getButtonText = () => {
    if (!selectedVariant) return "Select variant"
    if (isOutOfStock) return "Out of stock"
    return "Add to cart"
  }

  const getWhatsAppText = () => {
    if (isOutOfStock) return "Out of stock"
    return "Order"
  }

  return (
    <div className="flex flex-col gap-4" ref={actionsRef}>
      {/* Variant Options */}
      {(product.variants?.length ?? 0) > 1 && (
        <div className="space-y-4">
          {(product.options || []).map((option) => (
            <OptionSelect
              key={option.id}
              option={option}
              current={options[option.title ?? ""]}
              updateOption={setOptionValue}
              title={option.title ?? ""}
              disabled={!!disabled || isAdding || isOutOfStock}
            />
          ))}
        </div>
      )}

      <ProductPrice product={product} variant={selectedVariant} />

      {/* Stock Status */}
      {isOutOfStock && (
        <div className="text-red-600 text-sm">Out of stock</div>
      )}

      {/* Action Buttons */}
      <Button
        onClick={handleAddToCart}
        disabled={!inStock || !selectedVariant || isAdding || isOutOfStock}
        isLoading={isAdding}
        className="w-full bg-blue-600 text-white"
      >
        {getButtonText()}
      </Button>

      <div className="flex gap-2">
        <Button
          onClick={() => window.open('tel:+254798769535')}
          className="flex-1 bg-blue-600 text-white"
        >
          <MdCall /> Call
        </Button>
        <Button
          onClick={handleWhatsAppOrder}
          disabled={!inStock || !selectedVariant || isOutOfStock}
          className="flex-1 bg-green-500 text-white"
        >
          <FaWhatsapp /> {getWhatsAppText()}
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