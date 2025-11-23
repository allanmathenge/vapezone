import { getCategoriesList } from "@lib/data/categories"
import { getCollectionsList } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await getCollectionsList()
  const { product_categories } = await getCategoriesList()

  return (
    <footer className="w-full bg-slate-50 border-t border-gray-100 ">
      <div className="content-container flex flex-col w-full">
        <div className="w-full py-12">
          <div className="flex flex-col gap-y-16">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:px-6 ">
              <div className="flex flex-col">
                <div className="flex flex-col mb-3">
                  <h3 className="text-lg font-light text-slate-800 tracking-wide text-nowrap overflow-hidden">Vapezone Kenya</h3>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>
                
                <div className="flex flex-col space-y-2 mt-2">
                  <div className="flex flex-col text-blue-900">
                    <span className="text-sm font-medium">Call • Text • Whatsapp: 0798769535</span>
                    <div className="flex-col sm:flex-row gap-1">
                      <span className="text-sm font-medium">Lipa Na Mpesa, Till: 3763670</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">Secure mobile payments powered by Safaricom</span>
                </div>
              </div>

              {/* Collections */}
              {collections?.length > 0 && (
                <div className="flex flex-col">
                  <div className="flex flex-col mb-3">
                    <h3 className="text-lg font-light text-slate-800 tracking-wide">Collections</h3>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  </div>
                  <ul className="">
                    {collections.map((c) => (
                      <li key={c.id}>
                        <LocalizedClientLink
                          href={`/collections/${c.handle}`}
                          className="text-sm text-gray-600 hover:text-blue-900 transition-colors duration-200"
                        >
                          {c.title}
                        </LocalizedClientLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Categories Quick Links */}
              {product_categories?.length > 0 && (
                <div className="flex flex-col">
                  <div className="flex flex-col mb-3">
                    <h3 className="text-lg font-light text-slate-800 tracking-wide">Categories</h3>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  </div>
                  <ul className="">
                    {product_categories
                      .filter((c) => !c.parent_category)
                      .slice(0, 6)
                      .map((c) => (
                        <li key={c.id}>
                          <LocalizedClientLink
                            href={`/categories/${c.handle}`}
                            className="text-sm text-gray-600 hover:text-blue-900 transition-colors duration-200"
                          >
                            {c.name}
                          </LocalizedClientLink>
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              {/* Legal & Blog Links */}
              <div className="flex flex-col">
                <div className="flex flex-col mb-3">
                  <h3 className="text-lg font-light text-slate-800 tracking-wide">Information</h3>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>
                <ul className="">
                  <li>
                    <LocalizedClientLink
                      href="/content/terms-of-use"
                      className="text-sm text-gray-600 hover:text-blue-900 transition-colors duration-200"
                    >
                      Terms of Service
                    </LocalizedClientLink>
                  </li>
                  <li>
                    <LocalizedClientLink
                      href="/content/privacy-policy"
                      className="text-sm text-gray-600 hover:text-blue-900 transition-colors duration-200"
                    >
                      Privacy Policy
                    </LocalizedClientLink>
                  </li>
                  <li>
                    <LocalizedClientLink
                      href="/content/blog"
                      className="text-sm text-gray-600 hover:text-blue-900 transition-colors duration-200"
                    >
                      Blog
                    </LocalizedClientLink>
                  </li>

                  <li>
                    <LocalizedClientLink
                      href="/customer-service"
                      className="text-sm text-gray-600 hover:text-blue-900 transition-colors duration-200"
                    >
                      Customer Service
                    </LocalizedClientLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full border-t border-gray-200 pt-8 pb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Text className="text-sm text-gray-600 mb-4 md:mb-0">
              © {new Date().getFullYear()} Vapezone. All rights reserved.
            </Text>
            <div className="flex items-center space-x-6">
              <MedusaCTA />
              <span className="text-xs text-gray-500">Premium E-Commerce Experience</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}