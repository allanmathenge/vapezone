import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next";
import "styles/globals.css";
import type { WithContext, Organization, SearchAction } from "schema-dts";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Vapezone Kenya | Premium Vapes & Accessories, Fast Delivery",
    template: "%s | Vapezone Kenya"
  },
  description: "Vapezone Kenya is your number One online vape shop. Explore premium vapes, e-liquids, pods & accessories at the best prices. Fast delivery in Nairobi & across Kenya.",
  keywords: "vapes Kenya, e-liquids Nairobi, vape shop Kenya, disposable vapes, vaping accessories, e-cigarettes Kenya, vape pods, vape mods, vapes Nairobi, Vapezone, vape price Kenya, vapes",
  robots: "index, follow",
  authors: [{ name: "Vapezone Kenya" }],
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://www.vapezone.co.ke/',
    siteName: 'Vapezone Kenya',
    title: 'Vapezone Kenya | Premium Vapes & Accessories, Fast Delivery',
    description: 'Vapezone Kenya is your number One online vape shop. Explore premium vapes, e-liquids, pods & accessories at the best prices.',
    images: [
      {
        url: 'https://res.cloudinary.com/dfndhiz82/image/upload/v1749511548/vape_on_ground_xxdn3g.jpg',
        width: 1200,
        height: 630,
        alt: 'Vapezone Kenya - Premium Vape Shop',
      },
    ],
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
  description: "Premium vape products and accessories in Kenya. Best quality vapes & e-liquids at the best price & fast delivery.",
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
        name: "Vape Device Sales",
        description: "Premium vape devices and kits"
      }
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service", 
        name: "E-liquid Sales",
        description: "Various flavors of premium e-liquids"
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
        {/* Additional meta tags can be added here if needed */}
      </head>
      <body>
        <main id="main-content" className="relative" role="main">
          {props.children}
        </main>
      </body>
    </html>
  );
}