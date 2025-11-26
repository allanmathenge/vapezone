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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 ">
              <div className="flex flex-col">
                <div className="flex flex-col mb-3">
                  <h3 className="text-lg font-light text-slate-800 tracking-wide text-nowrap overflow-hidden">Vapezone Kenya</h3>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>

                <div className="rounded-lg p-3 mt-2 border border-blue-100">
                  <div className="flex flex-col space-y-2">
                    {/* Contact Info */}
                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-semibold text-blue-900 block">Call • Text • WhatsApp</span>
                        <span className="text-base font-bold text-blue-700 block mt-1">0798769535</span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t my-2"></div>

                    {/* M-Pesa Payment */}
                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-semibold text-blue-900 block">Lipa Na M-Pesa</span>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mt-1">
                          <span className="text-sm font-medium text-gray-700">Till Number:</span>
                          <span className="text-base font-bold text-green-700">3763670</span>
                        </div>
                      </div>
                    </div>
                  </div>
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