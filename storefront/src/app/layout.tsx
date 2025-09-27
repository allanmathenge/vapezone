import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next";
import "styles/globals.css";
import type { WithContext, Organization } from "schema-dts";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: "Vapezone Kenya | Premium Vapes & Accessories, Fast Delivery",
  description: "Vapezone Kenya is your number One online vape shop. Explore premium vapes, e-liquids, pods & accessories at the best prices. Fast delivery in Nairobi & across Kenya.",
  twitter: {
    card: "summary_large_image",
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
    areaServed: "KE",
    availableLanguage: ["en", "sw"]
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "KE"
  },
  sameAs: [
    "https://twitter.com/vapezonekenya",
    "https://www.instagram.com/vapezonekenya/",
    "https://www.facebook.com/profile.php?id=61579752452893",
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
        <meta name="google-site-verification" content="rvso-U-jCpwFY1c7ut5up56n4_dc4oL_0zqtiO4Pyf8" />
        <meta name="author" content="Vapezone Kenya" />
        <link rel="canonical" href="https://www.vapezone.co.ke/" />
      </head>
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  );
}