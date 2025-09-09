import { getCategoriesList } from "@lib/data/categories"
import { getCollectionsList } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await getCollectionsList()
  const { product_categories } = await getCategoriesList()

  return (
    <footer className="border-t border-ui-border-base w-full bg-slate-50">
      <div className="content-container flex flex-col w-full">
        <div className="w-full py-10">
          <div className="flex flex-col gap-y-16 sm:gap-y-20">
            {product_categories?.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-ui-fg-base mb-6 tracking-tight">Explore Categories</h2>
                {product_categories?.length > 0 && (
                  <section className="w-full">
                    <div
                      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
                      data-testid="footer-categories"
                    >
                      {product_categories
                        .filter((c) => !c.parent_category)
                        .map((c) => {
                          const children = c.category_children || []
                          return (
                            <div
                              key={c.id}
                              className="flex flex-col bg-white rounded border shadow-sm hover:shadow-md transition-all p-2"
                            >
                              <LocalizedClientLink
                                href={`/categories/${c.handle}`}
                                className="text-base font-semibold text-gray-800 mb-3 hover:text-blue-600"
                                data-testid="category-link"
                              >
                                {c.name}
                              </LocalizedClientLink>
                              {children.length > 0 && (
                                <ul className="space-y-1 pl-3">
                                  {children.map((child) => (
                                    <li key={child.id}>
                                      <LocalizedClientLink
                                        href={`/categories/${child.handle}`}
                                        className="text-xs text-gray-500 hover:text-gray-800 transition-colors"
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
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">
                  Collections
                </h2>
                <ul
                  className={`grid gap-3 sm:gap-8 text-sm ${collections.length > 3
                      ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                      : 'grid-cols-1'
                    }`}
                >
                  {collections.slice(0, 8).map((c) => (
                    <li
                      key={c.id}
                      className="rounded-xl border border-gray-100 bg-slate-50 p-5 shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all"
                    >
                      <LocalizedClientLink
                        href={`/collections/${c.handle}`}
                        className="block text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors"
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </section>
            )}

          </div>
        </div>


        <div className="w-full mb-8 text-ui-fg-muted">
          <LocalizedClientLink
            href="/"
            className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
          >
            M-Pesa. Buy Goods. Till No: 3763670
          </LocalizedClientLink>

          <div className="flex justify-between py-8 items-center">
            <Text className="txt-compact-small">
              © {new Date().getFullYear()} Vapezone. All rights reserved.
            </Text>
            <MedusaCTA />
          </div>

        </div>
      </div>
    </footer>
  )
}
