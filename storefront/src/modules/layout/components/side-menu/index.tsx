"use client"

import { useState, useEffect, useMemo, useId, Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import { IoIosMenu, IoIosArrowDown, IoIosArrowForward } from "react-icons/io"
import { RiCloseLargeFill } from "react-icons/ri"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { getCategoriesList } from "@lib/data/categories"

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
}

type Category = HttpTypes.StoreProductCategory

const SideMenu = ({ regions }: SideMenuProps) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    const fetchCategories = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const { product_categories } = await getCategoriesList()
        if (!isMounted) return
        setCategories(product_categories || [])
      } catch (err) {
        if (!isMounted) return
        setError("Failed to load categories. Please try again.")
        // Optional: log error externally here
        console.error("Failed to fetch categories:", err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
    fetchCategories()
    return () => {
      isMounted = false
    }
  }, [])

  const topLevelCategories = useMemo(
    () => categories.filter((c) => !c.parent_category),
    [categories]
  )

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(categoryId)) next.delete(categoryId)
      else next.add(categoryId)
      return next
    })
  }

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex small:hidden h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
                  aria-label="Open menu"
                >
                  <IoIosMenu className="text-2xl text-slate-600" />
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100 backdrop-blur-2xl"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl"
                leaveTo="opacity-0"
              >
                <Popover.Panel
                  className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-30 top-0 inset-x-0 text-ui-fg-on-color m-2 backdrop-blur-3xl"
                  static
                >
                  <nav
                    aria-label="Side menu"
                    className="flex flex-col h-full bg-black/80 backdrop-blur rounded-rounded p-6 overflow-y-auto"
                  >
                    <div className="flex justify-end" id="xmark">
                      <button
                        data-testid="close-menu-button"
                        onClick={close}
                        className="p-2 rounded hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                        aria-label="Close menu"
                      >
                        <RiCloseLargeFill className="text-2xl" />
                      </button>
                    </div>

                    <ul className="flex flex-col gap-1 items-start justify-start">
                      {isLoading ? (
                        <CategorySkeleton />
                      ) : error ? (
                        <li className="w-full">
                          <div className="text-red-400 text-sm bg-red-900/40 border border-red-700/50 rounded p-3">
                            {error}
                          </div>
                        </li>
                      ) : (
                        <>
                          <li key="store-link" className="w-full">
                            <LocalizedClientLink
                              href="/store"
                              className="leading-10 hover:text-ui-fg-disabled block w-full py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
                              onClick={close}
                              data-testid="store-link"
                            >
                              Store
                            </LocalizedClientLink>
                          </li>

                          {topLevelCategories.length === 0 ? (
                            <li className="w-full">
                              <div className="text-sm text-gray-300 py-2">
                                No categories available.
                              </div>
                            </li>
                          ) : (
                            topLevelCategories.map((category) => (
                              <CategoryItem
                                key={category.id}
                                category={category}
                                isExpanded={expandedCategories.has(category.id)}
                                onToggle={() => toggleCategory(category.id)}
                                onClose={close}
                              />
                            ))
                          )}
                        </>
                      )}
                    </ul>
                  </nav>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu

function CategoryItem({
  category,
  isExpanded,
  onToggle,
  onClose,
}: {
  category: Category
  isExpanded: boolean
  onToggle: () => void
  onClose: () => void
}) {
  const panelId = useId()
  const children = useMemo(
    () =>
      (category.category_children || [])
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name)),
    [category.category_children]
  )

  const hasChildren = children.length > 0

  return (
    <li className="w-full">
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between w-full">
          <LocalizedClientLink
            href={`/categories/${category.handle}`}
            className="leading-10 hover:text-ui-fg-disabled flex-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
            onClick={onClose}
            data-testid={`${category.name.toLowerCase().replace(/\s+/g, "-")}-link`}
          >
            {category.name}
          </LocalizedClientLink>

          {hasChildren && (
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onToggle()
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  onToggle()
                }
              }}
              className="p-1 hover:bg-gray-700 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              aria-expanded={isExpanded}
              aria-controls={panelId}
              aria-label={isExpanded ? `Collapse ${category.name}` : `Expand ${category.name}`}
            >
              {isExpanded ? (
                <IoIosArrowDown className="text-lg" />
              ) : (
                <IoIosArrowForward className="text-lg" />
              )}
            </button>
          )}
        </div>

        {hasChildren && isExpanded && (
          <ul id={panelId} className="flex flex-col gap-1 ml-4 mt-1 pl-4 border-l border-white/10">
            {children.map((child) => (
              <li key={child.id}>
                <LocalizedClientLink
                  href={`/categories/${child.handle}`}
                  className="leading-8 hover:text-ui-fg-disabled block py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
                  onClick={onClose}
                  data-testid={`${child.name.toLowerCase().replace(/\s+/g, "-")}-link`}
                >
                  {child.name}
                </LocalizedClientLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  )
}

function CategorySkeleton() {
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="h-10 bg-gray-700/60 rounded animate-pulse" />
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex flex-col w-full gap-2">
          <div className="flex items-center justify-between w-full">
            <div className="h-6 bg-gray-700/60 rounded flex-1 animate-pulse" />
            <div className="w-6 h-6 bg-gray-700/60 rounded ml-2 animate-pulse" />
          </div>
          <ChildCategorySkeleton />
        </div>
      ))}
    </div>
  )
}

function ChildCategorySkeleton() {
  return (
    <ul className="flex flex-col gap-1 ml-4 mt-1 pl-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <li key={index}>
          <div className="h-5 bg-gray-700/60 rounded animate-pulse" />
        </li>
      ))}
    </ul>
  )
}
