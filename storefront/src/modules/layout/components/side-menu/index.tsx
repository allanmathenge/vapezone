"use client"

import { useState, useEffect, Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import { BarsThree } from "@medusajs/icons"
import { RiCloseLargeFill } from "react-icons/ri";
import { useToggleState } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { getCollectionsList } from "@lib/data/collections"

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const toggleState = useToggleState()
  const [collections, setCollections] = useState<{ id: string; title: string, handle: string }[]>([])

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const { collections } = await getCollectionsList()
        setCollections(collections)
      } catch (error) {
        console.error("Failed to fetch collections:", error)
      }
    }

    fetchCollections()
  }, [])

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
                  <BarsThree />
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
                <Popover.Panel className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-30 top-0 inset-x-0 text-sm text-ui-fg-on-color m-2 backdrop-blur-2xl">
                  <div className="flex flex-col h-full bg-black/90 rounded-rounded p-6">
                    <div className="flex justify-end" id="xmark">
                      <button data-testid="close-menu-button" onClick={close}>
                        <RiCloseLargeFill className="text-2xl"/>
                      </button>
                    </div>

                    <ul className="flex flex-col gap-6 items-start justify-start">
                      <li key="store-link">
                        <LocalizedClientLink
                          href="/store"
                          className="text-3xl leading-10 hover:text-ui-fg-disabled"
                          onClick={close}
                          data-testid="store-link"
                        >
                          Store
                        </LocalizedClientLink>
                      </li>
                      {collections.map((collection) => (
                        <li key={collection.id}>
                          <LocalizedClientLink
                            href={`/collections/${collection.handle}`}
                            className="text-3xl leading-10 hover:text-ui-fg-disabled"
                            onClick={close}
                            data-testid={`${collection.title
                              .toLowerCase()
                              .replace(/\s+/g, "-")}-link`}
                          >
                            {collection.title}
                          </LocalizedClientLink>
                        </li>
                      ))}
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
