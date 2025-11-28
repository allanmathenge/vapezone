import { getCategoriesList } from "@lib/data/categories"
import { getCollectionsList } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await getCollectionsList()
  const { product_categories } = await getCategoriesList()

  return (
    <footer className="w-full bg-gradient-to-b from-slate-50 to-slate-100 border-t border-slate-200">
      <div className="content-container flex flex-col w-full">
        {/* Main Footer Content */}
        <div className="w-full py-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24">
            
            {/* Brand & Contact Section */}
            <div className="lg:flex-1 max-w-md">
              <div className="flex flex-col mb-6">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Vapezone Kenya
                </h3>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300">
                <div className="space-y-4">
                  {/* Phone & WhatsApp */}
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Call • Text • WhatsApp</span>
                      <span className="text-lg font-bold text-slate-800 block mt-1">0798 769 535</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-slate-100"></div>

                  {/* M-Pesa Payment */}
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Lipa Na M-Pesa</span>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mt-1">
                        <span className="text-sm font-medium text-slate-600">Till Number:</span>
                        <span className="text-lg font-bold text-green-600">3763670</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Links Grid */}
            <div className="lg:flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              
              {/* Collections */}
              {collections?.length > 0 && (
                <div className="flex flex-col">
                  <div className="flex flex-col mb-4">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Collections</h3>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                  </div>
                  <ul className="space-y-3">
                    {collections.map((c) => (
                      <li key={c.id}>
                        <LocalizedClientLink
                          href={`/collections/${c.handle}`}
                          className="text-sm text-slate-600 hover:text-blue-600 transition-all duration-200 hover:translate-x-1 hover:font-medium block py-1"
                        >
                          {c.title}
                        </LocalizedClientLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Categories */}
              {product_categories?.length > 0 && (
                <div className="flex flex-col">
                  <div className="flex flex-col mb-4">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Categories</h3>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                  </div>
                  <ul className="space-y-3">
                    {product_categories
                      .filter((c) => !c.parent_category)
                      .slice(0, 6)
                      .map((c) => (
                        <li key={c.id}>
                          <LocalizedClientLink
                            href={`/categories/${c.handle}`}
                            className="text-sm text-slate-600 hover:text-blue-600 transition-all duration-200 hover:translate-x-1 hover:font-medium block py-1"
                          >
                            {c.name}
                          </LocalizedClientLink>
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              {/* Information */}
              <div className="flex flex-col">
                <div className="flex flex-col mb-4">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Information</h3>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                </div>
                <ul className="space-y-3">
                  <li>
                    <LocalizedClientLink
                      href="/content/terms-of-use"
                      className="text-sm text-slate-600 hover:text-blue-600 transition-all duration-200 hover:translate-x-1 hover:font-medium block py-1"
                    >
                      Terms of Service
                    </LocalizedClientLink>
                  </li>
                  <li>
                    <LocalizedClientLink
                      href="/content/privacy-policy"
                      className="text-sm text-slate-600 hover:text-blue-600 transition-all duration-200 hover:translate-x-1 hover:font-medium block py-1"
                    >
                      Privacy Policy
                    </LocalizedClientLink>
                  </li>
                  <li>
                    <LocalizedClientLink
                      href="/content/blog"
                      className="text-sm text-slate-600 hover:text-blue-600 transition-all duration-200 hover:translate-x-1 hover:font-medium block py-1"
                    >
                      Blog & News
                    </LocalizedClientLink>
                  </li>
                  <li>
                    <LocalizedClientLink
                      href="/customer-service"
                      className="text-sm text-slate-600 hover:text-blue-600 transition-all duration-200 hover:translate-x-1 hover:font-medium block py-1"
                    >
                      Customer Service
                    </LocalizedClientLink>
                  </li>
                  <li>
                    <LocalizedClientLink
                      href="/shipping-returns"
                      className="text-sm text-slate-600 hover:text-blue-600 transition-all duration-200 hover:translate-x-1 hover:font-medium block py-1"
                    >
                      Shipping & Returns
                    </LocalizedClientLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full border-t border-slate-200 backdrop-blur-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <Text className="text-sm text-slate-600 text-center sm:text-left">
                  © {new Date().getFullYear()} Vapezone Kenya. All rights reserved.
                </Text>
                <div className="hidden sm:block w-px h-4 bg-slate-300"></div>
                <span className="text-xs text-slate-500">Premium E-Commerce Experience</span>
              </div>

              {/* Medusa CTA & Social Proof */}
              <div className="flex items-center space-x-6">
                <MedusaCTA />
                {/* Trust Badges */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Secure Payments</span>
                  </div>
                  <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-500">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>Nationwide Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}