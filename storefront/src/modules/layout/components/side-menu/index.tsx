"use client"

import { useState, useEffect, Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import { IoIosMenu, IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { RiCloseLargeFill } from "react-icons/ri";
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { getCategoriesList } from "@lib/data/categories"

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const [categories, setCategories] = useState<HttpTypes.StoreProductCategory[]>([])
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true)
        const { product_categories } = await getCategoriesList()
        setCategories(product_categories || [])
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId)
      } else {
        newSet.add(categoryId)
      }
      return newSet
    })
  }

  const topLevelCategories = categories.filter((c) => !c.parent_category)

  const CategorySkeleton = () => (
    <div className="flex flex-col w-full gap-2">
      <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
      
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex flex-col w-full gap-1">
          <div className="flex items-center justify-between w-full">
            <div className="h-6 bg-gray-700 rounded flex-1 animate-pulse"></div>
            <div className="w-6 h-6 bg-gray-700 rounded ml-2 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  )

  // Skeleton for child categories
  const ChildCategorySkeleton = () => (
    <ul className="flex flex-col gap-1 ml-4 mt-1 pl-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <li key={index}>
          <div className="h-6 bg-gray-700 rounded animate-pulse"></div>
        </li>
      ))}
    </ul>
  )

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
                <Popover.Panel className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-30 top-0 inset-x-0 text-ui-fg-on-color m-2 backdrop-blur-3xl">
                  <div className="flex flex-col h-full bg-black/90 backdrop-blur-lg rounded-rounded p-6 overflow-y-auto">
                    <div className="flex justify-end" id="xmark">
                      <button data-testid="close-menu-button" onClick={close}>
                        <RiCloseLargeFill className="text-2xl"/>
                      </button>
                    </div>

                    <ul className="flex flex-col gap-1 items-start justify-start">
                      {isLoading ? (
                        <CategorySkeleton />
                      ) : (
                        <>
                          <li key="store-link" className="w-full">
                            <LocalizedClientLink
                              href="/store"
                              className="leading-10 hover:text-ui-fg-disabled block w-full py-2"
                              onClick={close}
                              data-testid="store-link"
                            >
                              Store
                            </LocalizedClientLink>
                          </li>
                          {topLevelCategories.map((category) => {
                            const children = category.category_children || []
                            const isExpanded = expandedCategories.has(category.id)
                            
                            return (
                              <li key={category.id} className="w-full">
                                <div className="flex flex-col w-full">
                                  <div className="flex items-center justify-between w-full">
                                    <LocalizedClientLink
                                      href={`/categories/${category.handle}`}
                                      className="leading-10 hover:text-ui-fg-disabled flex-1 py-1"
                                      onClick={close}
                                      data-testid={`${category.name
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}-link`}
                                    >
                                      {category.name}
                                    </LocalizedClientLink>
                                    {children.length > 0 && (
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault()
                                          e.stopPropagation()
                                          toggleCategory(category.id)
                                        }}
                                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                                      >
                                        {isExpanded ? (
                                          <IoIosArrowDown className="text-lg" />
                                        ) : (
                                          <IoIosArrowForward className="text-lg" />
                                        )}
                                      </button>
                                    )}
                                  </div>
                                  
                                  {/* Child categories with expand/collapse */}
                                  {children.length > 0 && isExpanded && (
                                    <ul className="flex flex-col gap-1 ml-4 mt-1 pl-4">
                                      {children.reverse().map((child) => (
                                        <li key={child.id}>
                                          <LocalizedClientLink
                                            href={`/categories/${child.handle}`}
                                            className="leading-8 hover:text-ui-fg-disabled block py-1"
                                            onClick={close}
                                            data-testid={`${child.name
                                              .toLowerCase()
                                              .replace(/\s+/g, "-")}-link`}
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
                          })}
                        </>
                      )}
                    </ul>
                  </div>
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

    {/* <div className="flex flex-col gap-y-3">
          <div
            className="flex justify-between"
            onMouseEnter={toggleState.open}
            onMouseLeave={toggleState.close}
          >
            {regions && (
              <CountrySelect
                toggleState={toggleState}
                regions={regions}
              />
            )}
            <ArrowRightMini
              className={clx(
                "transition-transform duration-150",
                toggleState.state ? "-rotate-90" : ""
              )}
            /> 
          </div>
        <Text className="flex justify-between txt-compact-small">
            © {new Date().getFullYear()} Vapezone. All rights reserved.
        </Text>
    </div> */}
