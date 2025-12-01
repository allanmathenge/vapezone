import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Buy Wine, Spirits and Vapes Online In Nairobi",
  description: "Kenya's Premier Wines, Sprits & Vape Shop In Nairobi. Shop top brands at affordable prices & Fast delivery.",
  keywords: "Buy drinks Nairobi, buy wine online, Order whiskey, beer, rum, wines & spirits Nairobi, online vape shop Nairobi, disposable vapes, vape devices kenya, vapes Nairobi",
  alternates: {
    canonical: "https://www.vapezone.co.ke/",
  },
  openGraph: {
    title: "Buy Wines, Spirits & Vaping Products Online Nairobi",
    description: "Your ultimate Wines & Spirits Destination in Kenya - Buy Spirits & Vaping Products Online",
    url: "https://www.vapezone.co.ke/",
    siteName: "Vapezone Kenya",
    images: [
      {
        url: "https://res.cloudinary.com/dfndhiz82/image/upload/v1749511548/vape_on_ground_xxdn3g.jpg",
        width: 1200,
        height: 630,
        alt: "Vapezone Kenya - Buy wines, spirits & Vaping Products Online In Kenya",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Wine, Spirits, Drinks & Vaping Products Online In Nairobi",
    description: "Kenya's premier Wines, Spirits, Drinks & Vaping Products Shop in Nairobi",
    images: ["https://res.cloudinary.com/dfndhiz82/image/upload/v1749511548/vape_on_ground_xxdn3g.jpg"],
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

// Structured data component
function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'VapeStore',
    name: 'Vapezone Kenya',
    description: 'Premium Wines, Spirits & Vaping Products Shop in Nairobi, Kenya',
    url: 'https://www.vapezone.co.ke/',
    telephone: '+254-0798-769535',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nairobi',
      addressCountry: 'KE'
    },
    openingHours: 'Mo-Su 05:00-23:00',
    priceRange: '300-1500'
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <StructuredData />
      <Hero />
      <div className="bg-white/70">
        <div itemScope itemType="https://schema.org/Store">
          <meta itemProp="name" content="Vapezone Kenya" />
          <meta itemProp="description" content="Online Vape Shop In Nairobi, Kenya" />
          <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <meta itemProp="addressLocality" content="Nairobi" />
            <meta itemProp="addressCountry" content="KE" />
          </div>
          
          <h1 className="text-center font-semibold text-xl sm:text-2xl tracking-wide pt-4">
            Featured Products
          </h1>
          <ul className="flex flex-col gap-x-6">
            <FeaturedProducts collections={collections} region={region} />
          </ul>
        </div>
      </div>
    </>
  )
}