import { Text, clx } from "@medusajs/ui"
import { VariantPrice } from "types/global"

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null
  }

  return (
    <>
      <div className="flex flex-wrap items-center">
        {price.price_type === "sale" && (
        <Text
          data-testid="original-price"
        >
          <span className="line-through text-xs font-thin text-ui-fg-muted mr-1">{price.original_price}</span>
        </Text>
      )}
      <Text
        className={clx("text-ui-fg-muted", {
          "text-ui-fg-interactive": price.price_type === "sale",
        })}
        data-testid="price"
      >
        {price.calculated_price}
      </Text>
      </div>
    </>
  )
}
