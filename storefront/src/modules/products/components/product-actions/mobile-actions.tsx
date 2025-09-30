import { Dialog, Transition } from "@headlessui/react"
import { Button, clx, Text } from "@medusajs/ui"
import React, { Fragment, useMemo, useState } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import X from "@modules/common/icons/x"
import { getProductPrice } from "@lib/util/get-product-price"
import OptionSelect from "./option-select"
import { HttpTypes } from "@medusajs/types"
import { FaWhatsapp, FaShoppingCart, FaChevronUp } from "react-icons/fa"
import { MdCall } from "react-icons/md";

type MobileActionsProps = {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
  options: Record<string, string | undefined>
  updateOptions: (title: string, value: string) => void
  inStock?: boolean
  isOutOfStock?: boolean
  handleAddToCart: () => void
  isAdding?: boolean
  show: boolean
  optionsDisabled: boolean
  currentInventory?: number
  isLastItem?: boolean
}

const MobileActions: React.FC<MobileActionsProps> = ({
  product,
  variant,
  options,
  updateOptions,
  inStock,
  isOutOfStock,
  handleAddToCart,
  isAdding,
  show,
  optionsDisabled,
  currentInventory = 0,
  isLastItem = false,
}) => {
  const { state, open, close } = useToggleState()
  const [isWhatsAppLoading, setIsWhatsAppLoading] = useState(false)
  const [quantity] = useState(1)

  const price = getProductPrice({
    product: product,
    variantId: variant?.id,
  })

  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price || {}
    return variantPrice || cheapestPrice || null
  }, [price])

  const handleWhatsAppClick = () => {
    if (!variant || !inStock || isOutOfStock) return
    
    setIsWhatsAppLoading(true)
    setTimeout(() => {
      const productUrl = `${window.location.origin}/ke/products/${product.handle}`
      const message = `Product: ${product.title}, ${selectedPrice?.calculated_price || "Check price"}`
      const url = `https://wa.me/254798769535?text=${encodeURIComponent(message)}`
      window.open(url, "_blank")
      setIsWhatsAppLoading(false)
    }, 300)
  }

  const hasVariants = (product.variants?.length ?? 0) > 1
  const variantText = variant ? Object.values(options).join(" / ") : "Select Options"

  const getAddToCartText = () => {
    if (!variant) return "Select variant"
    if (isOutOfStock) return "Out of stock"
    if (isLastItem) return "Last item"
    return "Add to cart"
  }

  const getWhatsAppText = () => {
    if (isOutOfStock) return "Out of stock"
    if (isLastItem) return "Last item"
    return "Order via WhatsApp"
  }

  return (
    <>
      <div className={clx("lg:hidden fixed bottom-0 inset-x-0 z-30 transition-transform", {
        "translate-y-0": show,
        "translate-y-full": !show,
      })}>
        <div className="bg-white border-t shadow-lg">
          <div className="px-4 py-1">
            {/* Product Info */}
            <div className="flex flex-wrap items-center justify-between mb-3">
              <div className="flex-1 min-w-0">
                <Text className="text-sm font-thin text-gray-900 truncate">
                  {product.title}
                </Text>
                {selectedPrice && (
                  <Text className="font-thin text-gray-900">
                    {selectedPrice.calculated_price}
                  </Text>
                )}
              </div>
              {hasVariants && (
                <Button onClick={open} variant="transparent" size="small">
                  <FaChevronUp size={14} />
                </Button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {hasVariants ? (
                <Button
                  onClick={open}
                  disabled={optionsDisabled}
                  variant="secondary"
                  className="flex-1 h-10"
                >
                  {variantText}
                </Button>
              ) : (
                <Button
                  onClick={() => window.open('tel:+254798769535')}
                  variant="primary"
                  className="flex-1 max-xl:h-8 bg-blue-600 text-white"
                >
                  <MdCall className="mr-2" />
                  Call
                </Button>
              )}

              <Button
                onClick={handleAddToCart}
                disabled={!inStock || !variant || isOutOfStock}
                className="flex-1 max-h-8 bg-blue-600 text-white"
                isLoading={isAdding}
              >
                <FaShoppingCart className="mr-2" />
                {getAddToCartText()}
              </Button>
            </div>

            <Button
              onClick={handleWhatsAppClick}
              disabled={!variant || !inStock || isOutOfStock}
              className="w-full h-8 mt-2 bg-green-500 text-white"
            >
              <FaWhatsapp className="mr-2" />
              {getWhatsAppText()}
            </Button>
          </div>
        </div>
      </div>

      {/* Variant Modal */}
      <Transition show={state} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed bottom-0 inset-x-0">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <Dialog.Panel className="bg-white rounded-t-xl">
                <div className="flex justify-between items-center p-4 border-b">
                  <Dialog.Title className="font-semibold">
                    Select Options
                  </Dialog.Title>
                  <Button onClick={close} variant="transparent">
                    <X size={20} />
                  </Button>
                </div>

                <div className="max-h-[60vh] overflow-y-auto p-4">
                  {(product.options || []).map((option) => (
                    <div key={option.id} className="mb-4">
                      <Text className="font-medium mb-2">{option.title}</Text>
                      <OptionSelect
                        option={option}
                        current={options[option.title ?? ""]}
                        updateOption={updateOptions}
                        title={option.title ?? ""}
                        disabled={optionsDisabled}
                      />
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t">
                  <Button
                    onClick={() => {
                      handleAddToCart()
                      close()
                    }}
                    disabled={!inStock || !variant}
                    className="w-full bg-blue-600 text-white"
                    isLoading={isAdding}
                  >
                    Add to cart
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileActions