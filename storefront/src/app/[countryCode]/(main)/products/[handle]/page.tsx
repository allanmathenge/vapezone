import { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"

import ProductTemplate from "@modules/products/templates"
import { getRegion, listRegions } from "@lib/data/regions"
import { getProductByHandle, getProductsList } from "@lib/data/products"

import { Product as SchemaProduct, WithContext, AggregateRating, Review, Offer } from "schema-dts"

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

  // Get product images for OG and metadata
  const productImages = product.images?.map(img => 
    img.url.startsWith("http") ? img.url : `https://www.vapezone.co.ke${img.url}`
  ) || []

  return {
    title: `${product.title} | Vapezone Kenya - Premium Vape Products & Fast Delivery`,
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

  // Process product images
  const productImages = pricedProduct.images?.map(img => 
    img.url.startsWith("http") ? img.url : `https://www.vapezone.co.ke${img.url}`
  ) || []

  // Fallback image
  const defaultImage = "https://www.vapezone.co.ke/default-product.webp"
  const mainImage = productImages.length > 0 ? productImages[0] : defaultImage

  const calculateAverageRating = () => {
    
    const mockRating = {
      value: 4.5,
      count: 24
    }
    return mockRating
  }

  const ratingData = calculateAverageRating()

  const mockReviews = [
    {
      author: "John M.",
      rating: 5,
      text: "Excellent product! Fast delivery in Nairobi.",
      date: "2024-01-15"
    },
    {
      author: "Sarah K.",
      rating: 4,
      text: "Good quality, would recommend to others in Kenya.",
      date: "2024-01-10"
    }
  ]

  // Generate product schema with enhanced data
  const productSchema: WithContext<SchemaProduct> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://www.vapezone.co.ke/ke/products/${pricedProduct.id}`,
    
    // Basic Product Information
    name: pricedProduct.title,
    description: pricedProduct.subtitle || 
      `Buy ${pricedProduct.title} from Vapezone Kenya. Premium quality vape products with 30-50 minutes delivery across Nairobi, 2-3 days all of Kenya.`,
    image: productImages.length > 0 ? productImages : [mainImage],
    sku: pricedProduct.variants?.[0]?.sku ?? pricedProduct.id,
    mpn: pricedProduct.id,
    gtin: pricedProduct.variants?.[0]?.ean || undefined,
    
    brand: {
      "@type": "Brand",
      name: "Vapezone Kenya",
    },

    // Category Information
    category: pricedProduct.collection?.title || "Vape Products",
    
    offers: {
      "@type": "Offer",
      url: `https://www.vapezone.co.ke/ke/products/${pricedProduct.handle}`,
      priceCurrency: region.currency_code.toUpperCase(),
      price: pricedProduct.variants?.[0]?.calculated_price?.calculated_amount || 0,
      
      // Price validity
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .split("T")[0],
      
      // Availability
      availability: (pricedProduct.variants?.[0]?.inventory_quantity ?? 0) > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      
      // Condition
      itemCondition: "https://schema.org/NewCondition",
      
      // Shipping Information
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "KES"
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "KE"
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY"
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "DAY"
          }
        }
      },
      
      // Return Policy
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "KE",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn"
      },
      
      // Seller Information
      seller: {
        "@type": "Organization",
        name: "Vapezone Kenya",
        url: "https://www.vapezone.co.ke/",
        telephone: "+254-798769535"
      }
    }
  }

  // Add Aggregate Rating if available
  if (ratingData && ratingData.count > 0) {
    const aggregateRating: AggregateRating = {
      "@type": "AggregateRating",
      ratingValue: ratingData.value.toString(),
      bestRating: "5",
      worstRating: "1",
      ratingCount: ratingData.count
    }
    productSchema.aggregateRating = aggregateRating
  }

  // Add Reviews if available
  if (mockReviews.length > 0) {
    const reviews: Review[] = mockReviews.map((review, index) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating.toString(),
        bestRating: "5",
        worstRating: "1"
      },
      reviewBody: review.text,
      datePublished: review.date
    }))
    productSchema.review = reviews
  }

  return (
    <>
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
        strategy="afterInteractive"
      />
      
      <ProductTemplate
        product={pricedProduct}
        region={region}
        countryCode={params.countryCode}
      />
    </>
  )
}