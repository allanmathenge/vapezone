import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next";
import "styles/globals.css";
import type { WithContext, Organization, SearchAction } from "schema-dts";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Buy Vapes & Drinks Online In Kenya With Fast Delivery",
    template: "%s "
  },
  description: "Vapezone Kenya is your number One online vape shop. Explore premium vapes, drinks, wines, rum & cognac at the best prices. Fast delivery in Nairobi & across Kenya.",
  keywords: "Buy vapes Kenya, Online Liquor Nairobi, online wines & Spirits Kenya, disposable vapes, Beer brands, buy alcohol online Kenya, vape pods, vape mods, drinks Nairobi, Drinks price online, vape price Kenya, wines",
  robots: "index, follow",
  authors: [{ name: "Vapezone Kenya" }],
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://www.vapezone.co.ke/',
    siteName: 'Vapezone Kenya',
    title: 'Buy Premium Vapes & Drinks In Kenya with Fast Delivery',
    description: 'Vapezone Kenya is your number One online vape shop. Explore premium vapes, drinks like wines, rum cognac of all origins around the would at the best prices.',
    images: [
      {
        url: 'https://res.cloudinary.com/dfndhiz82/image/upload/v1749511548/vape_on_ground_xxdn3g.jpg',
        width: 1200,
        height: 630,
        alt: 'Vapezone Kenya - Premium Vape Shop In Kenya',
      },
    ],
  },
  other: {
    "age-verification": "18+",
    "restricted-products": "alcohol,tobacco"
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vapezonekenya',
    creator: '@vapezonekenya',
  },
  alternates: {
    canonical: 'https://www.vapezone.co.ke/'
  },
  verification: {
    google: 'rvso-U-jCpwFY1c7ut5up56n4_dc4oL_0zqtiO4Pyf8',
  },
};

const orgSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Vapezone Kenya",
  url: "https://www.vapezone.co.ke/",
  logo: "https://www.vapezone.co.ke/logo.png",
  description: "Premium vape products and Drinks Online in Kenya. Best quality vapes & drinks like wine, rum, cognac & spirits at the best price sourced all around the world.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+254-798769535",
    contactType: "customer service",
    areaServed: "Kenya",
    availableLanguage: ["en", "sw"]
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "KE",
    addressLocality: "Nairobi",
    addressRegion: "Nairobi County"
  },
  sameAs: [
    "https://twitter.com/vapezonekenya",
    "https://www.instagram.com/vapezonekenya/",
    "https://www.facebook.com/profile.php?id=61579752452893",
  ],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.vapezone.co.ke/ke/search?q={search_term_string}"
    },
    "query-input": {
      "@type": "PropertyValueSpecification",
      valueRequired: true,
      valueName: "search_term_string"
    }
  } as SearchAction,
  areaServed: {
    "@type": "Country",
    name: "Kenya"
  },
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Vape, Wines & Spirits Sales",
        description: "Premium vape devices, variety of Drinks at exclusive offers"
      }
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service", 
        name: "Electronic Cigs and Drinks Sales",
        description: "Various flavors & brands of Vapes, variety of drinks like wines, spirits, whisky and rum"
      }
    }
  ]
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const schemaString = JSON.stringify(orgSchema);
  
  return (
    <html lang="en" data-mode="light">
      <head>
        <script
          key="org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaString }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <main id="main-content" className="relative" role="main">
          {props.children}
        </main>
      </body>
    </html>
  );
}