import { getBaseURL } from "@lib/util/env";
import { Metadata } from "next";
import Script from "next/script";
import "styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  twitter: {
    card: "summary_large_image",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "VAPEZONE KENYA",
  alternateName: "VAPEZONE KE",
  url: "https://www.vapezone.co.ke",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.vapezone.co.ke/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VAPEZONE KENYA",
  url: "https://www.vapezone.co.ke",
  logo: "https://www.vapezone.co.ke/logo.png",
  sameAs: [
    "https://www.instagram.com/vapezoneke",
    "https://www.facebook.com/vapezoneke",
    "https://www.tiktok.com/@vapezoneke",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <head>

        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(websiteSchema)}
        </Script>

        <Script
          id="org-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(organizationSchema)}
        </Script>
      </head>
      <body>
        <main className="relative">{children}</main>
      </body>
    </html>
  );
}

// import { getBaseURL } from "@lib/util/env"
// import { Metadata } from "next"
// import "styles/globals.css"

// export const metadata: Metadata = {
//   metadataBase: new URL(getBaseURL()),
//   twitter: {
//     card: "summary_large_image"
//   }
// }

// export default function RootLayout(props: { children: React.ReactNode }) {
//   return (
//     <html lang="en" data-mode="light">
//       <body>
//         <main className="relative">{props.children}</main>
//       </body>
//     </html>
//   )
// }
