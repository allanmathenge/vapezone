import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import { HiPhone } from "react-icons/hi"
import { SiWhatsapp } from "react-icons/si"
import { FaUser } from "react-icons/fa"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          <div className="flex items-center gap-3 h-full">
            <a
                href="tel:+254798769535"
                className="text-red-500 txt-compact-xlarge-plus"
                data-testid="nav-store-link"
              >
                <HiPhone />
              </a>

            <a
                href="tel:+254712345678"
                data-testid="nav-store-link"
              >
                <span className="txt-compact-xlarge-plus">0798769535</span>
              </a>
              <a
                href="https://wa.me/254798769535"
                className="txt-compact-xlarge-plus text-green-500"
                target="_blank"
                data-testid="nav-store-link"
              >
                <SiWhatsapp />
              </a>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
                <LocalizedClientLink
                  className="hover:text-ui-fg-base"
                  href="/search"
                  scroll={false}
                  data-testid="nav-search-link"
                >
                  Search
                </LocalizedClientLink>
              )}
              <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-ui-fg-base border rounded-full p-1"
                href="/account"
                data-testid="nav-account-link"
              >
                <FaUser className="h-3 w-3" />
              </LocalizedClientLink>
            </div>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
