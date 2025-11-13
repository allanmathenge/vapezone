import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Buy Vapes, E-Liquids & Accessories Online In Nairobi",
  description: "Kenya's premier vape shop in Nairobi. Buy premium vaping devices, flavored e-liquids, pods, coils & accessories. Fast delivery, expert advice, affordable prices. Shop top vape brands with reliable service for vaping enthusiasts.",
  keywords: "vapes nairobi, e-liquids kenya, vaping accessories, vape shop nairobi, disposable vapes, vape devices kenya",
  alternates: {
    canonical: "https://www.vapezone.co.ke/",
  },
  openGraph: {
    title: "Vapezone Kenya | Buy Vapes & E-Liquids in Nairobi",
    description: "Your ultimate vaping destination in Kenya - Premium devices, rich e-liquids & expert service",
    url: "https://www.vapezone.co.ke/",
    siteName: "Vapezone Kenya",
    images: [
      {
        url: "https://res.cloudinary.com/dfndhiz82/image/upload/v1749511548/vape_on_ground_xxdn3g.jpg",
        width: 1200,
        height: 630,
        alt: "Vapezone Kenya - Buy Vaping Products Online In Kenya",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vapezone Kenya | Buy Vapes, E-Liquids & Vape Accessories",
    description: "Kenya's premier vape shop for devices, e-liquids & accessories",
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
    description: 'Premium Online vape shop in Nairobi, Kenya',
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
      <div>
        <div itemScope itemType="https://schema.org/Store">
          <meta itemProp="name" content="Vapezone Kenya" />
          <meta itemProp="description" content="Online Vape Shop In Nairobi, Kenya" />
          <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <meta itemProp="addressLocality" content="Nairobi" />
            <meta itemProp="addressCountry" content="KE" />
          </div>
          
          <h1 className="text-center font-semibold text-xl sm:text-2xl tracking-wide mt-4">
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