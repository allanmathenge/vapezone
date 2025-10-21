import React, { Suspense } from "react"
import Head from "next/head" // Make sure to import Head

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  const generateStructuredData = () => {

    const primaryVariant = product.variants?.[0]
    
    const getPrice = () => {
      if (!primaryVariant?.calculated_price?.calculated_amount) return "0.00"
      
      const amount = primaryVariant.calculated_price.calculated_amount
      return amount.toFixed(2)
    }

    const getCurrency = () => {
      return primaryVariant?.calculated_price?.currency_code || "KES"
    }

    const getAvailability = () => {
      const inventory = primaryVariant?.inventory_quantity || 0
      return inventory > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "productId": product.id,
      "name": product.title,
      "description": product.description || product.title,
      "image": product.images?.map(img => img.url) || [],
      "sku": primaryVariant?.sku,
      "mpn": primaryVariant?.sku,
      "brand": {
        "@type": "Brand",
        "name": product.collection?.title || "Vapezone Kenya"
      },
      "offers": {
        "@type": "Offer",
        "url": typeof window !== 'undefined' 
          ? window.location.href 
          : `https://www.vapezone.co.ke/ke/products/${product.handle}`,
        "priceCurrency": getCurrency(),
        "price": getPrice(),
        "availability": getAvailability(),
        "itemCondition": "https://schema.org/NewCondition",
        "seller": {
          "@type": "Organization",
          "name": "Vapezone Kenya"
        }
      }
    }
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.vapezone.co.ke/ke"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Products",
          "item": "https://www.vapezone.co.ke/ke/store"
        },
        ...(product.collection ? [{
          "@type": "ListItem",
          "position": 3,
          "name": product.collection.title,
          "item": `https://www.vapezone.co.ke/ke/collections/${product.collection.handle}`
        }] : []),
        {
          "@type": "ListItem",
          "position": product.collection ? 4 : 3,
          "name": product.title,
          "item": typeof window !== 'undefined' 
            ? window.location.href 
            : `https://www.vapezone.co.ke/ke/products/${product.handle}`
        }
      ]
    }

    return [productSchema, breadcrumbSchema]
  }

  const structuredData = generateStructuredData()

  return (
    <>
      <Head>
        {structuredData.map((data, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(data),
            }}
          />
        ))}
      </Head>

      <div
        className="content-container flex flex-col small:flex-row small:items-start py-20 relative"
        data-testid="product-container"
      >
        <div className="content-container flex flex-col-reverse small:flex-row">
          <div className="flex flex-col small:sticky small:top-8 small:py-0 h-full small:max-w-[300px] w-full py-8 gap-y-6">
            <ProductInfo product={product} />
            <div className="small:hidden">
              <ProductTabs product={product} />
            </div>
          </div>
          <div className="flex flex-col gap-5 w-full relative">
            <ImageGallery images={product?.images || []} />
            <div className="hidden small:flex small:w-full px-6">
              <ProductTabs product={product} />
            </div>
          </div>
        </div>

        <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-12">
          <ProductOnboardingCta />
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
        </div>
      </div>
      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate