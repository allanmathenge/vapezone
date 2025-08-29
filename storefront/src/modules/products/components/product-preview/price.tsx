import { Text, clx } from "@medusajs/ui"
import { VariantPrice } from "types/global"

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null
  }
  const formatPrice = (value: string | number) => {
    const numeric = typeof value === "string" ? parseFloat(value.replace(/[^0-9.-]+/g, "")) : value
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(numeric)
  }

  return (
    <>
      {price.price_type === "sale" && (
        <Text
          className="line-through text-xs text-ui-fg-muted"
          data-testid="original-price"
        >
          {formatPrice(price.original_price_number)}
        </Text>
      )}
      <Text
        className={clx("text-ui-fg-muted", {
          "text-ui-fg-interactive": price.price_type === "sale",
        })}
        data-testid="price"
      >
        {formatPrice(price.calculated_price_number)}
      </Text>
    </>
  )
}
