import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  description: "Discover VapeZone – your go-to destination for premium vaping products. Explore a wide range of cutting-edge vape devices, rich-flavored e-liquids, and accessories tailored for every vaping enthusiast. Enjoy expert insights, exclusive deals, and top-tier brands. Elevate your vaping experience today!",
  twitter: {
    card: "summary_large_image"
  }
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
