import { Suspense } from "react"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import { FaUser, FaChevronDown } from "react-icons/fa"
import { IoSearch, IoClose } from "react-icons/io5"
import { getCollectionsList } from "@lib/data/collections"
import Image from "next/image"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const { collections } = await getCollectionsList()

  if (!collections) {
    return []
  }

  return (
    <div className="sticky top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300 shadow-sm hover:shadow-md">
      <header className="relative h-16 mx-auto">
        <nav className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full h-full">
          
          {/* Left section - Logo and mobile menu */}
          <div className="flex items-center flex-1 sm:flex-none">
            <div className="mr-2 sm:mr-4">
              <SideMenu regions={regions} />
            </div>
            <LocalizedClientLink
              href="/"
              className="flex items-center transition-transform hover:scale-105"
            >
              <Image
                src="https://res.cloudinary.com/dfndhiz82/image/upload/v1750862949/icon_eaafkm.png"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="ml-2 text-xl font-semibold text-slate-800 hidden sm:block">Vapezone Kenya</span>
            </LocalizedClientLink>
          </div>

          {/* Center section - Navigation links with all collections */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-1">
              <LocalizedClientLink
                href="/store"
                className="px-4 py-2 text-slate-700 hover:text-blue-600 transition-colors font-medium relative group"
                data-testid="nav-link"
              >
                All Products
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-3/4"></span>
              </LocalizedClientLink>
              
              {/* Collections dropdown for larger screens */}
              <div className="relative group">
                <button className="px-4 py-2 flex items-center text-slate-700 hover:text-blue-600 transition-colors font-medium">
                  Collections
                  <FaChevronDown className="ml-1 h-3 w-3 transition-transform group-hover:rotate-180" />
                </button>
                
                <div className="absolute top-full left-0 w-96 bg-white shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="grid grid-cols-2 gap-2 p-4">
                    {collections.map((collection) => (
                      <LocalizedClientLink
                        key={collection.id}
                        className="px-3 py-2 text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md transition-colors"
                        href={`/collections/${collection.handle}`}
                        data-testid="nav-link"
                      >
                        {collection.title}
                      </LocalizedClientLink>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Display top 4 collections individually for easy access */}
              {collections.slice(0, 4).map((collection) => (
                <div key={collection.id} className="hidden xl:block">
                  <LocalizedClientLink
                    className="px-4 py-2 text-slate-700 hover:text-blue-600 transition-colors font-medium relative group"
                    href={`/collections/${collection.handle}`}
                    data-testid="nav-link"
                  >
                    {collection.title}
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-3/4"></span>
                  </LocalizedClientLink>
                </div>
              ))}
            </div>
          </div>

          {/* Right section - Search, account and cart */}
          <div className="flex items-center justify-end flex-1 sm:flex-none space-x-4 sm:space-x-6">
            {/* Enhanced Search - visible on desktop */}
            {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
              <div className="hidden md:flex relative">
                <LocalizedClientLink
                  className="flex items-center text-slate-500 hover:text-slate-700 transition-colors group"
                  href="/search"
                  scroll={false}
                  data-testid="nav-search-link"
                >
                  {/* Larger search icon with improved visibility */}
                  <div className="absolute left-3 flex items-center justify-center h-5 w-5 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                    <IoSearch className="h-3.5 w-3.5 text-blue-600" />
                  </div>
                  <span className="flex w-48 flex-1 items-center pl-11 pr-4 py-2 rounded-full bg-slate-100 text-sm cursor-text overflow-hidden transition-all hover:w-52">
                    Search products...
                  </span>
                </LocalizedClientLink>
              </div>
            )}
            
            {/* Enhanced Mobile search icon - larger and more accessible */}
            {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
              <LocalizedClientLink
                className="md:hidden text-slate-600 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-slate-100 flex items-center justify-center"
                href="/search"
                scroll={false}
                data-testid="nav-search-link"
              >
                <div className="relative flex items-center justify-center h-7 w-7 bg-blue-100 rounded-full">
                  <IoSearch className="h-4 w-4 text-blue-600" />
                </div>
              </LocalizedClientLink>
            )}
            
            {/* Account */}
            <LocalizedClientLink
              className="text-slate-600 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-slate-100"
              href="/account"
              data-testid="nav-account-link"
            >
              <FaUser className="h-4 w-4" />
            </LocalizedClientLink>
            
            {/* Cart */}
            <div className="flex items-center">
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="text-slate-600 hover:text-blue-600 transition-colors flex items-center p-2 rounded-full hover:bg-slate-100"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    <div className="relative">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
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
  )
}