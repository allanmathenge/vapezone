import { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"

import ProductTemplate from "@modules/products/templates"
import { getRegion, listRegions } from "@lib/data/regions"
import { getProductByHandle, getProductsList } from "@lib/data/products"

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

  const productImages = product.images?.map(img => 
    img.url.startsWith("http") ? img.url : `https://www.vapezone.co.ke${img.url}`
  ) || []

  return {
    title: `${product.title}`,
    description: product.subtitle || `Buy ${product.title} at Vapezone Kenya. Best prices, fast delivery across Kenya.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.title} | Vapezone Kenya`,
      description: product.subtitle || `Get ${product.title} delivered across Kenya. Premium quality vape products, Fast delivery.`,
      images: productImages.length > 0 ? productImages : ['/default-product.webp'],
      
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} | Vapezone Kenya`,
      description: product.subtitle || `Buy ${product.title} - Best prices in Kenya.`,
      images: productImages.length > 0 ? [productImages[0]] : ['/default-product.webp'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
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

  const productImages = pricedProduct.images?.map(img => 
    img.url.startsWith("http") ? img.url : `https://www.vapezone.co.ke${img.url}`
  ) || []

  const firstVariant = pricedProduct.variants?.[0]

  const getFormattedPrice = (): string => {
    const priceData = firstVariant?.calculated_price;
    
    if (!priceData) {
      return "0.00";
    }

    // Handle different possible price structures
    const rawPrice = priceData.calculated_amount || 
                    (priceData as any).amount || 
                    priceData;

    if (typeof rawPrice === 'string') {
      return parseFloat(rawPrice.replace(/,/g, '')).toFixed(2);
    } else if (typeof rawPrice === 'number') {
      return rawPrice.toFixed(2);
    }
    
    return "0.00";
  }

  const formattedPrice = getFormattedPrice();

  const isInStock = (firstVariant?.inventory_quantity ?? 0) > 0;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    
    "name": pricedProduct.title,
    "description": pricedProduct.subtitle || `Buy ${pricedProduct.title} - Premium vape products with fast delivery across Kenya. 30-50 minutes delivery in Nairobi, 2-3 days nationwide.`,
    "image": productImages.length > 0 ? productImages : ["https://www.vapezone.co.ke/default-product.webp"],
    
    "offers": {
      "@type": "Offer",
      "url": `https://www.vapezone.co.ke/ke/products/${pricedProduct.handle}`,
      "priceCurrency": "KES",
      "price": formattedPrice,
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .split("T")[0],
      
      "availability": isInStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "KES"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "KE"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 1
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 3
          }
        }
      },
      
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "Vapezone Kenya",
        "url": "https://www.vapezone.co.ke/",
        "telephone": "+254798769535",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "KE"
        }
      }
    },
    
    "sku": firstVariant?.sku || pricedProduct.id,
    "mpn": pricedProduct.id,
    "brand": {
      "@type": "Brand",
      "name": pricedProduct.collection?.title || "Premium Vape"
    },
    
    "category": pricedProduct.collection?.title || "Vape Products"
  }

  return (
    <>
      <Script
        id="product-structured-data"
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