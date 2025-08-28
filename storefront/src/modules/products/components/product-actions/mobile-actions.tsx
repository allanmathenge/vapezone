import { Dialog, Transition } from "@headlessui/react"
import { Button, clx, Input } from "@medusajs/ui"
import React, { Fragment, useMemo, useState } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import X from "@modules/common/icons/x"
import { getProductPrice } from "@lib/util/get-product-price"
import OptionSelect from "./option-select"
import { HttpTypes } from "@medusajs/types"
import { FaWhatsapp } from "react-icons/fa"

type MobileActionsProps = {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
  options: Record<string, string | undefined>
  updateOptions: (title: string, value: string) => void
  inStock?: boolean
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
  handleAddToCart,
  isAdding,
  show,
  optionsDisabled,
}) => {
  const { state, open, close } = useToggleState()
  const [isWhatsAppLoading, setIsWhatsAppLoading] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false)

  const [quantity, setQuantity] = useState(1)
  const [delivery, setDelivery] = useState("")

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
    setConfirmModal(true)
  }

  const confirmAndRedirect = () => {
    setIsWhatsAppLoading(true)
    setTimeout(() => {
      const phoneNumber = "254798769535"
      const productUrl = `${window.location.origin}/ke/products/${product.handle}`
      const message = `
Product Link: ${productUrl}
Hi, I'd like to place an order:

Product: *${product.title}*
Quantity: ${quantity}
Delivery: ${delivery || "Nairobi CBD"}
Price Each: ${ selectedPrice?.original_price
? `${(selectedPrice.original_price).toLocaleString()} KSH`
: "Check site for latest price"
    }`
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`
      window.open(url, "_blank", "noopener,noreferrer")
      setIsWhatsAppLoading(false)
      setConfirmModal(false)
    }, 300)
  }

  return (
    <>
      {/* Bottom action bar */}
      <div
        className={clx("lg:hidden inset-x-0 z-20 bottom-0 fixed", {
          "pointer-events-none": !show,
        })}
      >
        <Transition
          as={Fragment}
          show={show}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="bg-white flex flex-col gap-y-1 justify-center items-center px-4 pb-3 h-full w-full border-t border-gray-200 shadow-xl"
            data-testid="mobile-actions"
          >
            <div className="flex items-center justify-between w-full gap-x-2">
              <span className="font-semibold text-base">{product.title}</span>
              <span>—</span>
              {selectedPrice ? (
                <div className="flex flex-col items-end gap-x-2">
                  {selectedPrice.price_type === "sale" && (
                    <p>
                      <span className="line-through text-sm text-gray-400">
                        {selectedPrice.original_price}
                      </span>
                    </p>
                  )}
                  <span
                    className={clx("font-semibold", {
                      "text-ui-fg-interactive":
                        selectedPrice.price_type === "sale",
                    })}
                  >
                    {selectedPrice.calculated_price}
                  </span>
                </div>
              ) : (
                <div></div>
              )}
            </div>

            <div className="w-full flex flex-col gap-y-3 mt-3">
              <div className="flex gap-x-4">
                <Button
                  onClick={open}
                  variant="secondary"
                  className="w-full"
                  data-testid="mobile-actions-button"
                >
                  <span>
                    {variant
                      ? Object.values(options).join(" / ")
                      : "Select Options"}
                  </span>
                </Button>
                <Button
                  onClick={handleAddToCart}
                  disabled={!inStock || !variant}
                  className="w-full"
                  isLoading={isAdding}
                  data-testid="mobile-cart-button"
                >
                  {!variant
                    ? "Select variant"
                    : !inStock
                      ? "Out of stock"
                      : "Add to cart"}
                </Button>
              </div>

              <Button
                onClick={handleWhatsAppClick}
                disabled={isWhatsAppLoading}
                className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-x-2 rounded py-2 shadow"
              >
                <FaWhatsapp size={18} />
                {isWhatsAppLoading ? "Opening..." : "Place Order"}
              </Button>
            </div>
          </div>
        </Transition>
      </div>

      {/* Confirm Order Modal */}
      <Transition appear show={confirmModal} as={Fragment}>
        <Dialog as="div" className="relative z-[80]" onClose={() => setConfirmModal(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-700 bg-opacity-75 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed bottom-0 inset-x-0">
            <div className="flex min-h-full items-center justify-center text-center">
              <Dialog.Panel className="bg-white rounded-2xl shadow-xl w-[95%] max-w-md p-6 flex flex-col gap-y-4">
                <Dialog.Title className="text-lg font-semibold">
                  Confirm Order
                </Dialog.Title>
                <p className="text-sm text-gray-600">
                  Please confirm your order details before checkout on WhatsApp.
                </p>

                <div className="flex flex-col gap-y-3 mt-2">
                  <div>
                    <label className="text-sm font-medium">Quantity</label>
                    <Input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Delivery Location
                    </label>
                    <Input
                      type="text"
                      placeholder="Delivery Location"
                      value={delivery}
                      onChange={(e) => setDelivery(e.target.value)}
                      className="w-full mt-1"
                    />
                  </div>
                </div>

                <div className="flex gap-x-3 mt-4">
                  <Button
                    variant="secondary"
                    onClick={() => setConfirmModal(false)}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={confirmAndRedirect}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    isLoading={isWhatsAppLoading}
                  >
                    Proceed
                  </Button>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Variant Select Modal (unchanged) */}
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
            <div className="fixed inset-0 bg-gray-700 bg-opacity-75 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed bottom-0 inset-x-0">
            <div className="flex min-h-full h-full items-center justify-center text-center">
              <Dialog.Panel className="w-full h-full transform overflow-hidden text-left flex flex-col gap-y-3">
                <div className="w-full flex justify-end pr-6">
                  <button
                    onClick={close}
                    className="bg-white w-12 h-12 rounded-full text-ui-fg-base flex justify-center items-center"
                  >
                    <X />
                  </button>
                </div>
                <div className="bg-white px-6 py-12">
                  {(product.variants?.length ?? 0) > 1 && (
                    <div className="flex flex-col gap-y-6">
                      {(product.options || []).map((option) => (
                        <div key={option.id}>
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
                  )}
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileActions
