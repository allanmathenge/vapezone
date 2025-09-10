import { getCategoriesList } from "@lib/data/categories"
import { getCollectionsList } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await getCollectionsList()
  const { product_categories } = await getCategoriesList()

  return (
    <footer className="border-t border-gray-200 w-full bg-white">
      <div className="content-container flex flex-col w-full">
        <div className="w-full py-16">
          <div className="flex flex-col gap-y-20">
            {product_categories?.length > 0 && (
              <section className="px-4">
                <div className="flex flex-col items-center mb-12">
                  <h2 className="text-2xl font-light text-slate-800 mb-3 tracking-wide">Explore Our Categories</h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>
                {product_categories?.length > 0 && (
                  <section className="w-full">
                    <div
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                      data-testid="footer-categories"
                    >
                      {product_categories
                        .filter((c) => !c.parent_category)
                        .map((c) => {
                          const children = c.category_children || []
                          return (
                            <div
                              key={c.id}
                              className="flex flex-col bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-elegant transition-all duration-300 group"
                            >
                              <LocalizedClientLink
                                href={`/categories/${c.handle}`}
                                className="text-lg font-medium text-slate-800 mb-4 group-hover:text-blue-600 transition-colors duration-200 flex items-center"
                                data-testid="category-link"
                              >
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></span>
                                {c.name}
                              </LocalizedClientLink>
                              {children.length > 0 && (
                                <ul className="space-y-2 pl-5 border-l border-gray-100">
                                  {children.map((child) => (
                                    <li key={child.id}>
                                      <LocalizedClientLink
                                        href={`/categories/${child.handle}`}
                                        className="text-sm text-slate-500 hover:text-slate-800 transition-colors duration-200 py-1 block"
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

            {collections?.length > 0 && (
              <section className="px-4">
                <div className="flex flex-col items-center mb-12">
                  <h2 className="text-2xl font-light text-slate-800 mb-3 tracking-wide">Featured Collections</h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                </div>
                <ul
                  className={`grid gap-6 ${collections.length > 3
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                      : 'grid-cols-1'
                    }`}
                >
                  {collections.slice(0, 8).map((c) => (
                    <li
                      key={c.id}
                      className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-elegant transform hover:-translate-y-1 transition-all duration-300 group"
                    >
                      <LocalizedClientLink
                        href={`/collections/${c.handle}`}
                        className="flex items-center text-lg font-medium text-slate-800 group-hover:text-blue-600 transition-colors duration-200"
                      >
                        <span className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></span>
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </section>
            )}

          </div>
        </div>

        <div className="w-full border-t border-gray-100 pt-12 pb-8">
          <div className="flex flex-col items-center mb-8">
            <LocalizedClientLink
              href="/"
              className="text-xl font-light text-slate-700 hover:text-slate-900 transition-colors duration-200 tracking-wide mb-4"
            >
              M-Pesa • Buy Goods • Till No: 3763670
            </LocalizedClientLink>
            <p className="text-sm text-slate-400">Secure mobile payments powered by Safaricom</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center py-6 px-4">
            <Text className="text-sm text-slate-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} Vapezone. All rights reserved.
            </Text>
            <div className="flex items-center space-x-6">
              <MedusaCTA />
              <div className="flex space-x-4">
                <span className="text-xs text-slate-400">Premium E-Commerce Experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}