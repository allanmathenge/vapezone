"use client"

import { Button } from "@medusajs/ui"
import { FiPackage, FiShoppingBag, FiArrowRight } from "react-icons/fi"

import OrderCard from "../order-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  if (orders?.length) {
    return (
      <div className="flex flex-col gap-y-6 w-full">
        <div className="flex items-center gap-x-3 mb-2">
          <FiPackage className="w-6 h-6 text-ui-fg-interactive" />
          <h1 className="text-2xl font-semibold text-ui-fg-base">Your Orders</h1>
          <span className="bg-ui-bg-base-component text-ui-fg-on-inverted rounded-full px-2.5 py-1 text-sm font-medium">
            {orders.length}
          </span>
        </div>
        
        <p className="text-ui-fg-subtle text-base mb-6">
          Track and manage your recent purchases
        </p>

        <div className="grid gap-6">
          {orders.map((o) => (
            <div
              key={o.id}
              className="bg-ui-bg-subtle hover:bg-ui-bg-base-hover rounded-lg transition-all duration-200 ease-in-out border border-ui-border-base hover:border-ui-border-interactive shadow-sm hover:shadow-md"
            >
              <OrderCard order={o} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className="w-full flex flex-col items-center justify-center py-8 px-4 text-center"
      data-testid="no-orders-container"
    >
      <div className="bg-ui-bg-base-subtle rounded-full p-6 mb-6 border border-ui-border-base">
        <FiShoppingBag className="w-16 h-16 text-ui-fg-muted" />
      </div>
      
      <h2 className="text-2xl font-semibold text-ui-fg-base mb-3">
        No Orders Yet
      </h2>
      
      <p className="text-ui-fg-subtle text-lg max-w-md mb-8 leading-relaxed">
        Your order history will appear here once you start shopping with us
      </p>
      
      <div className="mt-2">
        <LocalizedClientLink href="/store" passHref>
          <Button 
            data-testid="continue-shopping-button"
            className="gap-x-2 group hover:shadow-lg transition-all duration-200"
            variant="primary"
          >
            <FiShoppingBag className="w-4 h-4" />
            Start Shopping
            <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderOverview