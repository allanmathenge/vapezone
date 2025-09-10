import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div
      className="flex flex-col gap-6 lg:flex-row lg:items-start py-8 content-container"
      data-testid="category-container"
    >
      {/* Sidebar Refinements */}
      <div className="lg:w-80 lg:mb-0">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sticky">
          <h2 className="text-lg font-semibold text-slate-800 mb-6 pb-3 border-b border-gray-100 flex items-center">
            <svg className="w-5 h-5 text-slate-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters & Sorting
          </h2>
          <RefinementList sortBy={sort} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="mb-8">
          <h1 
            className="text-3xl font-light text-slate-800 mb-2" 
            data-testid="store-page-title"
          >
            All Products
          </h1>
          <p className="text-slate-500 text-sm">
            Discover our complete collection of premium products
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4"></div>
        </div>
        
        <Suspense fallback={
          <div className="bg-white">
            <SkeletonProductGrid />
          </div>
        }>
          <div className="bg-white">
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={countryCode}
            />
          </div>
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate