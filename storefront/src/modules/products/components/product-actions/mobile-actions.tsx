import { Dialog, Transition } from "@headlessui/react"
import { Button, clx, Text } from "@medusajs/ui"
import React, { Fragment, useMemo, useState } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import X from "@modules/common/icons/x"
import { getProductPrice } from "@lib/util/get-product-price"
import OptionSelect from "./option-select"
import { HttpTypes } from "@medusajs/types"
import { FaWhatsapp, FaShoppingCart, FaChevronUp, FaClock, FaExclamationTriangle } from "react-icons/fa"
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
    if (!price) {
      return null
    }
    const { variantPrice, cheapestPrice } = price
    return variantPrice || cheapestPrice || null
  }, [price])

  const handleWhatsAppClick = () => {
    if (!variant || !inStock || isOutOfStock) return
    
    setIsWhatsAppLoading(true)
    setTimeout(() => {
      const phoneNumber = "254798769535"
      const productUrl = `${window.location.origin}/ke/products/${product.handle}`
      const message = `
Product Link: ${productUrl}
Hi, I'd like to place an order: *${product.title}*, ${selectedPrice?.original_price
          ? `${selectedPrice.original_price.toLocaleString()}`
          : "Check site for latest price"
        }
Quantity: ${quantity}
${isLastItem ? '⚠️ Last item in stock!' : ''}`

      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`
      window.open(url, "_blank", "noopener,noreferrer")
      setIsWhatsAppLoading(false)
    }, 300)
  }

  const handleCallClick = () => {
    window.open('tel:+254798769535', '_blank')
  }

  const hasVariants = (product.variants?.length ?? 0) > 1
  const variantText = variant ? Object.values(options).join(" / ") : "Select Options"

  // Get button text based on inventory status
  const getAddToCartText = () => {
    if (!variant) return "Select variant"
    if (isOutOfStock) return "Out of stock"
    if (isLastItem) return "Last item - Add to cart"
    return "Add to cart"
  }

  const getWhatsAppButtonText = () => {
    if (isOutOfStock) return "Out of stock"
    if (isLastItem) return "Last item - Order Now"
    return "Place Order"
  }

  // Inventory display text
  const getInventoryText = () => {
    if (!variant?.manage_inventory || isOutOfStock) return null
    
    if (currentInventory > 5) {
      return { text: `In stock (${currentInventory})`, color: "text-green-600" }
    } else if (currentInventory > 1) {
      return { text: `Only ${currentInventory} left`, color: "text-amber-600" }
    } else {
      return { text: "Last item!", color: "text-red-600" }
    }
  }

  const inventoryText = getInventoryText()

  return (
    <>
      {/* Enhanced Bottom Action Bar */}
      <div
        className={clx("lg:hidden inset-x-0 z-50 bottom-0 fixed transition-transform duration-300", {
          "translate-y-0": show,
          "translate-y-full": !show,
        })}
      >
        <div className="bg-gradient-to-t from-white/95 via-white/95 to-white/90 backdrop-blur-xl border-t border-gray-100/50 shadow-2xl">
          <div className="px-4 py-3">
            {/* Inventory Warning Banner */}
            {(isLastItem || isOutOfStock) && (
              <div className={clx(
                "mb-3 p-2 rounded-lg border text-xs font-medium flex items-center gap-2",
                {
                  "bg-amber-50 border-amber-200 text-amber-800": isLastItem,
                  "bg-red-50 border-red-200 text-red-800": isOutOfStock && !isLastItem
                }
              )}>
                {isLastItem ? (
                  <>
                    <FaExclamationTriangle className="flex-shrink-0" />
                    <span>Only 1 item left in stock!</span>
                  </>
                ) : (
                  <>
                    <FaExclamationTriangle className="flex-shrink-0" />
                    <span>Out of stock</span>
                  </>
                )}
              </div>
            )}

            {/* Product Summary */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <Text className="text-sm font-semibold text-gray-900 truncate" as="p">
                  {product.title}
                </Text>
                
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedPrice ? (
                    <div className="flex items-center gap-1">
                      {selectedPrice.price_type === "sale" && (
                        <Text className="line-through text-gray-500 font-thin text-xs" as="span">
                          {selectedPrice.original_price}
                        </Text>
                      )}
                      <Text
                        className={clx("font-bold text-base", {
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
                  
                  {inventoryText && (
                    <span className={clx("text-xs font-medium", inventoryText.color)}>
                      {inventoryText.text}
                    </span>
                  )}
                </div>
              </div>

              {hasVariants && (
                <Button
                  onClick={open}
                  variant="transparent"
                  size="small"
                  className="text-gray-600 hover:text-gray-900 transition-colors flex-shrink-0 ml-2"
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
                    className="flex-1 h-10 min-w-0 border border-gray-200 hover:border-gray-300"
                    data-testid="mobile-actions-button"
                  >
                    <span className="truncate text-sm">{variantText}</span>
                  </Button>
                ) : (
                  <Button
                    onClick={handleCallClick}
                    variant="primary"
                    className="flex-1 h-10 min-w-0 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow hover:shadow-sm text-white"
                    data-testid="call-button"
                  >
                    <MdCall size={16} className="mr-2" />
                    <span className="text-sm">Call To Order</span>
                  </Button>
                )}

                <Button
                  onClick={handleAddToCart}
                  disabled={!inStock || !variant || optionsDisabled || isOutOfStock}
                  className="flex-1 h-10 min-w-0 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl text-white"
                  isLoading={isAdding}
                  data-testid="mobile-cart-button"
                >
                  {!variant ? (
                    <span className="text-sm">Select variant</span>
                  ) : (
                    <>
                      <FaShoppingCart className="mr-2" size={14} />
                      <span className="text-sm">{getAddToCartText()}</span>
                    </>
                  )}
                </Button>
              </div>

              <Button
                onClick={handleWhatsAppClick}
                disabled={isWhatsAppLoading || !variant || optionsDisabled || !inStock || isOutOfStock}
                className="w-full h-10 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium transition-all duration-200 shadow hover:shadow-sm"
              >
                <FaWhatsapp className="mr-2" size={18} />
                {isWhatsAppLoading ? (
                  <span className="flex items-center text-sm">
                    <span className="animate-pulse">Opening WhatsApp...</span>
                  </span>
                ) : (
                  <span className="text-sm">{getWhatsAppButtonText()}</span>
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
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <div className="flex-1">
                    <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900 truncate">
                      {product.title}
                    </Dialog.Title>
                    {selectedPrice && (
                      <Text className="text-lg font-bold text-gray-900">
                        {selectedPrice.calculated_price}
                      </Text>
                    )}
                  </div>
                  <Button
                    onClick={close}
                    variant="transparent"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                  >
                    <X size={20} />
                  </Button>
                </div>

                {/* Inventory Status in Modal */}
                {(isLastItem || isOutOfStock || inventoryText) && (
                  <div className={clx(
                    "mx-4 mt-4 p-3 rounded-lg border text-sm font-medium flex items-center gap-2",
                    {
                      "bg-amber-50 border-amber-200 text-amber-800": isLastItem,
                      "bg-red-50 border-red-200 text-red-800": isOutOfStock && !isLastItem,
                      "bg-green-50 border-green-200 text-green-800": inventoryText && !isLastItem && !isOutOfStock
                    }
                  )}>
                    {isLastItem ? (
                      <>
                        <FaExclamationTriangle className="flex-shrink-0" />
                        <span>Only 1 item left in stock! Order now before it&apos;s gone.</span>
                      </>
                    ) : isOutOfStock ? (
                      <>
                        <FaExclamationTriangle className="flex-shrink-0" />
                        <span>This product is currently out of stock.</span>
                      </>
                    ) : (
                      <>
                        <FaClock className="flex-shrink-0" />
                        <span>{inventoryText?.text}</span>
                      </>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="max-h-[60vh] overflow-y-auto px-4 py-6">
                  <div className="flex flex-col gap-6">
                    {(product.options || []).map((option) => (
                      <div key={option.id} className="space-y-3">
                        <Text className="font-medium text-gray-900 text-base">
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

                {/* Selected Variant Info */}
                {variant && (
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <Text className="text-sm font-medium text-gray-700">Selected:</Text>
                      <Text className="text-sm text-gray-900 font-semibold">
                        {Object.values(options).join(" / ")}
                      </Text>
                    </div>
                    {inventoryText && (
                      <div className="flex items-center justify-between mt-1">
                        <Text className="text-sm font-medium text-gray-700">Stock:</Text>
                        <Text className={clx("text-sm font-semibold", inventoryText.color)}>
                          {inventoryText.text}
                        </Text>
                      </div>
                    )}
                  </div>
                )}

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                  <div className="flex gap-2">
                    <Button
                      onClick={handleCallClick}
                      variant="secondary"
                      className="flex-1 h-12 border border-gray-300"
                    >
                      <MdCall size={18} className="mr-2" />
                      <span className="text-sm">Call</span>
                    </Button>
                    
                    <Button
                      onClick={() => {
                        handleAddToCart()
                        close()
                      }}
                      disabled={!inStock || !variant || isOutOfStock}
                      className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                      isLoading={isAdding}
                    >
                      {!variant ? (
                        <span className="text-sm">Select options</span>
                      ) : !inStock || isOutOfStock ? (
                        <span className="text-sm">Out of stock</span>
                      ) : (
                        <span className="text-sm">{getAddToCartText()}</span>
                      )}
                    </Button>
                  </div>
                  
                  <Button
                    onClick={() => {
                      handleWhatsAppClick()
                      close()
                    }}
                    disabled={!inStock || !variant || isOutOfStock}
                    className="w-full h-12 mt-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                  >
                    <FaWhatsapp className="mr-2" size={18} />
                    <span className="text-sm">{getWhatsAppButtonText()}</span>
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