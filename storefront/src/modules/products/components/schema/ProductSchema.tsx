import React from "react"
import { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "@lib/util/get-product-price"

type Props = {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}

const ProductSchema = ({ product, variant }: Props) => {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) return null

  const offer = {
    "@type": "Offer",
    priceCurrency: "KES",
    price: selectedPrice.calculated_price_number.toFixed(2),
    availability:
      variant?.inventory_quantity && variant.inventory_quantity > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    itemCondition: "https://schema.org/NewCondition",
    url: `https://www.vapezone.co.ke/ke/products/${product.handle}`,
  }

  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    productID: product.id || product.handle,
    name: product.title,
    image: product.thumbnail
      ? [
        `https://www.vapezone.co.ke${product.thumbnail.startsWith("/")
          ? product.thumbnail
          : `/${product.thumbnail}`
        }`,
      ]
      : [],
    description: product.subtitle || product.description,
    sku: variant?.sku || product.variants?.[0]?.sku || "",
    brand: {
      "@type": "Brand",
      name:
        (typeof product.metadata?.brand === "string" &&
          product.metadata.brand.trim()) ||
        "Vapezone Kenya",
    },
    offers: offer,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default ProductSchema
