import { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"

import ProductTemplate from "@modules/products/templates"
import { getRegion, listRegions } from "@lib/data/regions"
import { getProductByHandle, getProductsList } from "@lib/data/products"

import { Product as SchemaProduct, WithContext } from "schema-dts"

type Props = {
  params: { countryCode: string; handle: string }
}

export async function generateStaticParams() {
  const countryCodes = await listRegions().then(
    (regions) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean) as string[]
  )

  if (!countryCodes) {
    return null
  }

  const products = await Promise.all(
    countryCodes.map((countryCode) => {
      return getProductsList({ countryCode })
    })
  ).then((responses) =>
    responses.map(({ response }) => response.products).flat()
  )

  const staticParams = countryCodes
    ?.map((countryCode) =>
      products.map((product) => ({
        countryCode,
        handle: product.handle,
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = params
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const product = await getProductByHandle(handle, region.id)
  const canonicalUrl = `https://www.vapezone.co.ke/ke/products/${product.handle}`
  if (!product) {
    notFound()
  }

  return {
    title: `${product.title} | Kenya’s Trusted Vape Store For Top Brands & Flavors`,
    description: product.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.title}`,
      description: `${product.subtitle}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const pricedProduct = await getProductByHandle(params.handle, region.id)
  if (!pricedProduct) {
    notFound()
  }

  const productSchema: WithContext<SchemaProduct> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pricedProduct.title,
    description:
      pricedProduct.subtitle ||
      `Explore ${pricedProduct.title} — available now at Vapezone Kenya. Premium quality, fast shipping.`,
    image: pricedProduct.thumbnail ? [pricedProduct.thumbnail] : [],
    sku: pricedProduct.id,
    brand: {
      "@type": "Brand",
      name: "Vapezone",
    },
    offers: {
      "@type": "Offer",
      url: `https://www.vapezone.co.ke/ke/products/${pricedProduct.handle}`,
      priceCurrency: region.currency_code.toUpperCase(),
      price: (pricedProduct.variants?.[0]?.calculated_price?.original_amount || 0) / 100,
      itemCondition: "https://schema.org/NewCondition",
      availability:
        (pricedProduct.variants?.[0]?.inventory_quantity ?? 0) > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    }
  }

  return (
    <>
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      <ProductTemplate
        product={pricedProduct}
        region={region}
        countryCode={params.countryCode}
      />
    </>
  )
}


// import { Metadata } from "next"
// import { notFound } from "next/navigation"

// import ProductTemplate from "@modules/products/templates"
// import { getRegion, listRegions } from "@lib/data/regions"
// import { getProductByHandle, getProductsList } from "@lib/data/products"

// type Props = {
//   params: { countryCode: string; handle: string }
// }

// export async function generateStaticParams() {
//   const countryCodes = await listRegions().then(
//     (regions) =>
//       regions
//         ?.map((r) => r.countries?.map((c) => c.iso_2))
//         .flat()
//         .filter(Boolean) as string[]
//   )

//   if (!countryCodes) {
//     return null
//   }

//   const products = await Promise.all(
//     countryCodes.map((countryCode) => {
//       return getProductsList({ countryCode })
//     })
//   ).then((responses) =>
//     responses.map(({ response }) => response.products).flat()
//   )

//   const staticParams = countryCodes
//     ?.map((countryCode) =>
//       products.map((product) => ({
//         countryCode,
//         handle: product.handle,
//       }))
//     )
//     .flat()

//   return staticParams
// }

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { handle } = params
//   const region = await getRegion(params.countryCode)

//   if (!region) {
//     notFound()
//   }

//   const product = await getProductByHandle(handle, region.id)
//   const canonicalUrl = `https://www.vapezone.co.ke/ke/products/${product.handle}`
//   if (!product) {
//     notFound()
//   }

//   return {
//     title: `${product.title} | Kenya’s Trusted Vape Store for Top Brands & Flavors`,
//     description: `${product.description}`,
//     alternates: {
//       canonical: canonicalUrl,
//     },
//     openGraph: {
//       title: `${product.title}`,
//       description: `${product.subtitle}`,
//       images: product.thumbnail ? [product.thumbnail] : [],
//     },
//   }
// }

// export default async function ProductPage({ params }: Props) {
//   const region = await getRegion(params.countryCode)

//   if (!region) {
//     notFound()
//   }

//   const pricedProduct = await getProductByHandle(params.handle, region.id)
//   if (!pricedProduct) {
//     notFound()
//   }

//   return (
//     <>
//       <ProductTemplate
//         product={pricedProduct}
//         region={region}
//         countryCode={params.countryCode}
//       />
//     </>
//   )
// }
