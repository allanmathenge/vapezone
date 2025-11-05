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
            {product_categories?.length > 0 && (
              <section className="">
                <div className="flex flex-col items-center mb-6">
                  <h2 className="text-2xl font-light text-slate-800 mb-3 tracking-wide">Brands</h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>
                {product_categories?.length > 0 && (
                  <section className="w-full">
                    <div
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                      data-testid="footer-categories"
                    >
                      {product_categories
                        .filter((c) => !c.parent_category)
                        .map((c) => {
                          const children = c.category_children || []
                          return (
                            <div
                              key={c.id}
                              className="flex flex-col bg-white rounded-sm p-5 border border-gray-100 hover:shadow-sm transition-all duration-200 group"
                            >
                              <LocalizedClientLink
                                href={`/categories/${c.handle}`}
                                className="text-base font-medium tracking-wide text-gray-800 group-hover:text-blue-700 transition-colors duration-200 flex items-center"
                                data-testid="category-link"
                              >
                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 group-hover:scale-125 transition-transform duration-200"></span>
                                {c.name}
                              </LocalizedClientLink>
                              {children.length > 0 && (
                                <ul className="space-y-1 pl-5">
                                  {children.map((child) => (
                                    <li key={child.id}>
                                      <LocalizedClientLink
                                        href={`/categories/${child.handle}`}
                                        className="text-sm text-ui-fg-subtle text-nowrap overflow-hidden text-ellipsis text-gray-600 hover:text-blue-900 transition-colors duration-200 block"
                                        data-testid="category-link"
                                      >
                                        {child.name}
                                      </LocalizedClientLink>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          )
                        })}
                    </div>
                  </section>
                )}
              </section>
            )}

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
                      <span className="text-sm font-medium">M-Pesa • Buy Goods • </span>
                      <span className="text-sm font-medium">Till No: 3763670</span>
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
                    <h3 className="text-lg font-light text-slate-800 tracking-wide">Brands</h3>
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