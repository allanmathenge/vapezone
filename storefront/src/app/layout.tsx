import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next";
import "styles/globals.css";
import type { WithContext, Organization } from "schema-dts";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: "Vapezone Kenya | Number One Online Vape Shop in Kenya – Premium Vapes, Fast Delivery",
  description: "Vapezone Kenya is your number One online vape shop. Explore premium vapes, e-liquids, pods & accessories at the best prices. Fast delivery in Nairobi & across Kenya.",
  twitter: {
    card: "summary_large_image",
  },
};

const orgSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Vapezone Kenya",
  url: "https://www.vapezone.co.ke/ke/",
  logo: "https://www.vapezone.co.ke/logo.png",
  sameAs: [
    "https://twitter.com/vapezonekenya",
    "https://www.instagram.com/vapezonekenya/",
    "https://www.facebook.com/profile.php?id=61579752452893",
  ]
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <head>
        <script
          key="org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(orgSchema),
          }}
        />
        <meta name="google-site-verification" content="rvso-U-jCpwFY1c7ut5up56n4_dc4oL_0zqtiO4Pyf8" />
      </head>
      <body>
        <main className="relative">{props.children}</main>
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
