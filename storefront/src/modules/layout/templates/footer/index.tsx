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
        <div className="w-full py-20 px-6 sm:px-12">
          <div className="max-w-screen-xl mx-auto flex flex-col gap-y-16 sm:gap-y-20">

            {/* Categories */}
            {product_categories?.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-ui-fg-base mb-6 tracking-tight">Explore Categories</h2>
                {product_categories?.length > 0 && (
                  <section className="w-full">
                    <div className="flex overflow-x-auto gap-6 pb-4 -mx-6 px-6 snap-x scroll-smooth sm:hidden" data-testid="footer-categories">
                      {product_categories
                        .filter((c) => !c.parent_category)
                        .map((c) => {
                          const children = c.category_children || []

                          return (
                            <div
                              key={c.id}
                              className="flex-shrink-0 min-w-[200px] bg-slate-100 rounded snap-star p-4 border"
                            >
                              <LocalizedClientLink
                                href={`/categories/${c.handle}`}
                                className="text-ui-fg-base font-medium text-sm mb-2 block hover:text-ui-fg-hover"
                                data-testid="category-link"
                              >
                                {c.name}
                              </LocalizedClientLink>

                              {children.length > 0 && (
                                <ul className="space-y-2 pl-2 border-ui-border-light">
                                  {children.map((child) => (
                                    <li key={child.id}>
                                      <LocalizedClientLink
                                        href={`/categories/${child.handle}`}
                                        className="text-ui-fg-subtle text-sm hover:text-ui-fg-base"
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

                    <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 rounded xl:grid-cols-4 gap-10">
                      {product_categories
                        .filter((c) => !c.parent_category)
                        .map((c) => {
                          const children = c.category_children || []

                          return (
                            <div key={c.id} className="flex border bg-slate-100 flex-col gap-1">
                              <LocalizedClientLink
                                href={`/categories/${c.handle}`}
                                className="text-ui-fg-base font-medium text-sm p-2 hover:text-ui-fg-hover"
                                data-testid="category-link"
                              >
                                {c.name}
                              </LocalizedClientLink>

                              {children.length > 0 && (
                                <ul className="space-y-2 pl-3">
                                  {children.map((child) => (
                                    <li key={child.id}>
                                      <LocalizedClientLink
                                        href={`/categories/${child.handle}`}
                                        className="text-ui-fg-subtle text-sm hover:text-ui-fg-base"
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
                <h2 className="text-lg font-semibold text-ui-fg-base mb-6 tracking-tight">Collections</h2>
                <ul
                  className={`grid gap-4 text-sm text-ui-fg-subtle ${collections.length > 3 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1'
                    }`}
                >
                  {collections.slice(0, 8).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        href={`/collections/${c.handle}`}
                        className="hover:text-ui-fg-base transition-colors"
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Contact */}
            <section>
              <h2 className="text-lg font-semibold text-ui-fg-base mb-6 tracking-tight">Link With Us</h2>
              <ul className="space-y-4 text-sm text-ui-fg-subtle">
                <li>
                  <a href="/" target="_blank" rel="noreferrer" className="hover:text-ui-fg-base transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="/" target="_blank" rel="noreferrer" className="hover:text-ui-fg-base transition-colors">
                    +254 798 769 535
                  </a>
                </li>
                <li>
                  <a href="/" target="_blank" rel="noreferrer" className="hover:text-ui-fg-base transition-colors">
                    +254 784 131 234
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>


        <div className="w-full mb-16 text-ui-fg-muted">
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
