import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import { HiPhone } from "react-icons/hi"
import { SiWhatsapp } from "react-icons/si"
import { FaUser } from "react-icons/fa"
import { IoSearch } from "react-icons/io5"
import { getCollectionsList } from "@lib/data/collections"
import Image from "next/image"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const { collections } = await getCollectionsList()

  if (!collections) {
    return []
  }

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular gap-2 sm:gap-8">

          {/* Icon */}
          <div className="flex gap-3 basis-0 h-full items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
            <LocalizedClientLink
              href="/"
              className="sm:w-12 w-6 h-full flex items-center"
            >
              <Image
                src="https://res.cloudinary.com/dfndhiz82/image/upload/v1750862949/icon_eaafkm.png"
                alt="Icon png"
                width={75}
                height={75}
                className="shadow rounded-full p-1"
              >
              </Image>
            </LocalizedClientLink>
          </div>

          {/* Collections */}
          <div className="flex items-center flex-1 gap-x-3 h-full">
            {collections && collections.map((collection) => {
              return <div key={collection.id} className="hidden small:flex">
                <LocalizedClientLink
                  className="text-nowrap"
                  href={`/collections/${collection.handle}`}
                  data-testid="nav-link"
                >
                  {collection.title}
                </LocalizedClientLink>
              </div>
            })}
            {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
              <LocalizedClientLink
                className="flex w-full hover:text-ui-fg-base border rounded-full"
                href="/search"
                scroll={false}
                data-testid="nav-search-link"
              >
                <span className="flex w-full flex-1 items-center px-2 py-1 gap-2 text-nowrap overflow-hidden cursor-text"><IoSearch /> Search products ...</span>
              </LocalizedClientLink>
            )}
            <div className="flex gap-3">
              <a
                href="tel:+254798769535"
                className="text-red-500 hover:text-ui-fg-base"
                data-testid="nav-phone-link"
              >
                <HiPhone />
              </a>
              <a
                href="https://wa.me/254798769535"
                className="hover:text-ui-fg-base text-green-500"
                target="_blank"
                data-testid="nav-whataspp-link"
              >
                <SiWhatsapp />
              </a>
            </div>
            <div className="flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-ui-fg-base border rounded-full p-1"
                href="/account"
                data-testid="nav-account-link"
              >
                <FaUser className="h-3 w-3" />
              </LocalizedClientLink>
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
