import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import Script from "next/script"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  twitter: {
    card: "summary_large_image"
  }
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <head>
        <Script id="website-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "VAPEZONE KENYA",
            alternateName: "VAPEZONE KE",
            url: "https://www.vapezone.co.ke"
          })}
        </Script>

        <Script id="org-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "VAPEZONE KENYA",
            url: "https://www.vapezone.co.ke",
            logo: "https://www.vapezone.co.ke/logo.png"
          })}
        </Script>
      </head>
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
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
