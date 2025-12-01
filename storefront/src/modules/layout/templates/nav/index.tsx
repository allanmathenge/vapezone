import { Suspense } from "react"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import { FaUser, FaShoppingCart } from "react-icons/fa"
import { IoSearch } from "react-icons/io5"
import Image from "next/image"
import NavbarWrapper from "@modules/layout/components/navbar-wrapper"
import { getCategoriesList } from "@lib/data/categories"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const { product_categories } = await getCategoriesList()

  return (
    <NavbarWrapper>
      <div className="bg-white/95 backdrop-blur-md shadow-sm hover:shadow">
        <header className="relative h-16 mx-auto">
          <nav className="max-w-screen-2xl mx-auto px-1 sm:px-3 lg:px-4 flex items-center justify-between w-full h-full">

            {/* Left section - Logo and mobile menu */}
            <div className="flex items-center sm:flex-none">
              <div className="mr-4">
                <SideMenu regions={regions} />
              </div>
              <LocalizedClientLink
                href="/"
                className="flex items-center"
              >
                <Image
                  src="https://res.cloudinary.com/dfndhiz82/image/upload/v1764350451/image_e17lpr_p1yb0o.webp"
                  alt="Logo"
                  width={100}
                  height={20}
                />
              </LocalizedClientLink>
            </div>
            <div className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-1">
                <LocalizedClientLink
                  href="/store"
                  className="px-4 text-slate-700 hover:text-blue-600 transition-colors font-medium relative group"
                  data-testid="nav-link"
                >
                  Store
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-3/4"></span>
                </LocalizedClientLink>
                <div className="relative">
                  {product_categories?.length > 0 && (
                    <section className="flex space-x-5">
                      {product_categories
                        .filter((c) => !c.parent_category)
                        .map((c) => {
                          const children = c.category_children || []
                          return (
                            <div
                              key={c.id}
                              className="relative group"
                            >
                              <LocalizedClientLink
                                href={`/categories/${c.handle}`}
                                className="text-slate-800 flex items-center hover:text-blue-700 transition-all duration-300 font-semibold relative group"
                                data-testid="nav-link"
                                tabIndex="0"
                              >
                                {c.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full group-focus-within:w-full"></span>
                              </LocalizedClientLink>

                              {children.length > 0 && (
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-32 h-3 bg-transparent" />
                              )}
                            </div>
                          )
                        })}
                    </section>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-4 h-full basis-0 justify-end">

              {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
                <div className="hidden md:flex relative">
                  <LocalizedClientLink
                    className="flex items-center text-slate-500 hover:text-slate-700 transition-colors group"
                    href="/search"
                    scroll={false}
                    data-testid="nav-search-link"
                  >
                    
                    <div className="absolute left-3 flex items-center justify-center h-5 w-5 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                      <IoSearch className="h-3.5 w-3.5 text-slate-600" />
                    </div>
                    <span className="flex w-48 flex-1 items-center pl-11 pr-4 py-2 rounded-full bg-slate-100 text-sm overflow-hidden">
                      Search products...
                    </span>
                  </LocalizedClientLink>
                </div>
              )}

              {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
                <LocalizedClientLink
                  className="md:hidden text-slate-600 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100 flex items-center justify-center"
                  href="/search"
                  scroll={false}
                  data-testid="nav-search-link"
                >
                  <div className="relative flex items-center justify-center h-7 w-7 bg-blue-100 rounded-full">
                    <IoSearch className="h-4 w-4 text-slate-600" />
                  </div>
                </LocalizedClientLink>
              )}

              {/* Account */}
              <LocalizedClientLink
                className="text-slate-600 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100"
                href="/account"
                data-testid="nav-account-link"
              >
                <FaUser className="h-4 w-4 text-slate-600" />
              </LocalizedClientLink>

              {/* Cart */}
              <div className="flex items-center pl-1">
                <Suspense
                  fallback={
                    <LocalizedClientLink
                      className="text-slate-600 hover:text-slate-600 transition-colors flex items-center pl-1 rounded-full hover:bg-slate-100"
                      href="/cart"
                      data-testid="nav-cart-link"
                    >
                      <div className="relative">
                        <FaShoppingCart className="h-4 w-4 text-slate-600" />
                        <span className="absolute -top-3 -right-3 bg-slate-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
                      </div>
                    </LocalizedClientLink>
                  }
                >
                  <CartButton />
                </Suspense>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </NavbarWrapper>
  )
}