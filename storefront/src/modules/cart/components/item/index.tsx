"use client"

import { Table, Text, clx } from "@medusajs/ui"

import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
}

const Item = ({ item, type = "full" }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { handle } = item.variant?.product ?? {}

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    const message = await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  // TODO: Update this to grab the actual max inventory
  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  return (
    <Table.Row className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg shadow-md items-center">
      <Table.Cell className="flex items-center">
        <LocalizedClientLink href={`/products/${handle}`} className="flex w-16 md:w-24">
          <Thumbnail
            thumbnail={item.variant?.product?.thumbnail}
            images={item.variant?.product?.images}
            size="square"
            className="rounded-md transition-transform transform hover:scale-105"
          />
        </LocalizedClientLink>
        <div className="ml-4">
          <Text className="txt-medium-plus" data-testid="product-title">{item.product_title}</Text>
          <LineItemOptions variant={item.variant} data-testid="product-variant" />
        </div>
      </Table.Cell>

      <Table.Cell className="flex justify-center">
        <div className="flex gap-2 items-center">
          <CartItemSelect
            value={item.quantity}
            onChange={(value) => changeQuantity(parseInt(value.target.value))}
            className="rounded-md border p-2"
            data-testid="product-select-button"
          >
            {Array.from({ length: Math.min(maxQuantity, 10) }, (_, i) => (
              <option value={i + 1} key={i}>{i + 1}</option>
            ))}
            <option value={1} key={1}>1</option>
          </CartItemSelect>
          {updating && <Spinner />}
          <ErrorMessage error={error} data-testid="product-error-message" />
        </div>
      </Table.Cell>

      {/* Total Column */}
      <Table.Cell className="flex justify-end items-center">
        <div className="text-right">
          {type === "preview" && (
            <span className="flex gap-x-1">
              <Text>{item.quantity}x </Text>
              <LineItemUnitPrice item={item} style="tight" />
            </span>
          )}
          <LineItemPrice item={item} style="tight" />
        </div>
        {type === "full" && <DeleteButton id={item.id} data-testid="product-delete-button" />}
      </Table.Cell>
    </Table.Row>
  )
}

export default Item
