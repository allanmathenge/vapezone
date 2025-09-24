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
}) => {
  const { state, open, close } = useToggleState()
  const [isWhatsAppLoading, setIsWhatsAppLoading] = useState(false)
  const [quantity] = useState(1)

  const price = getProductPrice({
    product: product,
    variantId: variant?.id,
  })

  const selectedPrice = useMemo(() => {
    if (!price) {
      return null
    }
    const { variantPrice, cheapestPrice } = price
    return variantPrice || cheapestPrice || null
  }, [price])

  const handleWhatsAppClick = () => {
    setIsWhatsAppLoading(true)
    setTimeout(() => {
      const phoneNumber = "254798769535"
      const productUrl = `${window.location.origin}/ke/products/${product.handle}`
      const message = `
Link: ${productUrl}
Hi, I'd like to place an order: *${product.title}*, ${selectedPrice?.original_price
          ? `${selectedPrice.original_price.toLocaleString()}`
          : "Check site for latest price"
        }
Quantity: ${quantity}`

      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`
      window.open(url, "_blank", "noopener,noreferrer")
      setIsWhatsAppLoading(false)
    }, 300)
  }

  const hasVariants = (product.variants?.length ?? 0) > 1
  const variantText = variant ? Object.values(options).join(" / ") : "Select Options"

  return (
    <>
      {/* Enhanced Bottom Action Bar */}
      <div
        className={clx("lg:hidden inset-x-0 z-20 bottom-0 fixed transition-transform duration-300", {
          "translate-y-0": show,
          "translate-y-full": !show,
        })}
      >
        <div className="bg-gradient-to-t from-white/95 via-white/95 to-white/90 backdrop-blur-xl border-t border-gray-100/50 shadow-2xl">
          <div className="px-4 py-1">
            {/* Product Summary */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1 flex flex-wrap justify-between items-center gap-1 w-full min-w-0">
                <Text className="text-sm font-medium text-gray-900 truncate" as="p">
                  {product.title}
                </Text>
                <div className="flex items-center gap-2 mt-1">
                  {selectedPrice ? (
                    <div className="flex items-center gap-1">
                      {selectedPrice.price_type === "sale" && (
                        <Text className="line-through text-gray-500 font-thin text-xs" as="span">
                          {selectedPrice.original_price}
                        </Text>
                      )}
                      <Text
                        className={clx("font-semibold text-sm", {
                          "text-green-600": selectedPrice.price_type === "sale",
                          "text-gray-900": selectedPrice.price_type !== "sale",
                        })}
                        as="span"
                      >
                        {selectedPrice.calculated_price}
                      </Text>
                    </div>
                  ) : (
                    <Text className="text-gray-500 text-sm" as="span">
                      Price unavailable
                    </Text>
                  )}
                  {!inStock || isOutOfStock && variant && (
                    <span className="px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-full">
                      Out of stock
                    </span>
                  )}
                </div>
              </div>

              {hasVariants && (
                <Button
                  onClick={open}
                  variant="transparent"
                  size="small"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <FaChevronUp size={14} />
                </Button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 gap-2">
              <div className="flex gap-2">
                {hasVariants ? (
                  <Button
                    onClick={open}
                    disabled={!inStock || !variant || optionsDisabled}
                    variant="secondary"
                    className="flex-1 min-w-0"
                    data-testid="mobile-actions-button"
                  >
                    <span className="truncate">{variantText}</span>
                  </Button>
                ) : (
                  <div className="flex-1 flex gap-2">
                    <Button
                      onClick={() => window.open('tel:+254798769535')}
                      variant="primary"
                      className="flex-1 min-w-0 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl text-white text-nowrap overflow-hidden"
                      data-testid="call-button"
                    >
                      <MdCall /> Call To Order
                    </Button>
                  </div>
                )}

                <Button
                  onClick={handleAddToCart}
                  disabled={!inStock || !variant || optionsDisabled}
                  className="flex-1 min-w-0 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl text-white text-nowrap overflow-hidden"
                  isLoading={isAdding}
                  data-testid="mobile-cart-button"
                >
                  {!variant ? (
                    "Select variant"
                  ) : !inStock || isOutOfStock ? (
                    "Out of stock"
                  ) : (
                    <>
                      <FaShoppingCart className="mr-2" size={14} />
                      Add to cart
                    </>
                  )}
                </Button>
              </div>

              <Button
                onClick={handleWhatsAppClick}
                disabled={isWhatsAppLoading || !variant || optionsDisabled}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-500 hover:to-green-600 text-black font-medium py-2 transition-all duration-200 shadow-lg hover:shadow-xl rounded-lg"
              >
                <FaWhatsapp className="mr-2" size={18} />
                {isWhatsAppLoading ? (
                  <span className="flex items-center">
                    <span className="animate-pulse">Opening WhatsApp...</span>
                  </span>
                ) : (
                  "Place Order"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Variant Select Modal */}
      <Transition appear show={state} as={Fragment}>
        <Dialog as="div" className="relative z-[75]" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
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
              <Dialog.Panel className="w-full transform overflow-hidden rounded-t-2xl bg-white shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-2 border-b border-gray-100">
                  <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900">
                    Select Options
                  </Dialog.Title>
                  <Button
                    onClick={close}
                    variant="transparent"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </Button>
                </div>

                {/* Content */}
                <div className="max-h-[60vh] overflow-y-auto p-6">
                  <div className="flex flex-col gap-6">
                    {(product.options || []).map((option) => (
                      <div key={option.id} className="space-y-3">
                        <Text className="font-medium text-gray-900">
                          {option.title}
                        </Text>
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
                </div>

                {/* Footer */}
                <div className="p-2 border-t border-gray-100 bg-gray-50/50">
                  <Button
                    onClick={() => {
                      handleAddToCart()
                      close()
                    }}
                    disabled={!inStock || !variant}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    isLoading={isAdding}
                  >
                    {!variant ? "Select options first" : !inStock ? "Out of stock" : "Add to cart"}
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