"use client"

import { clx } from "@medusajs/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FaChevronLeft, FaChevronRight, FaEllipsisH } from "react-icons/fa"

export function Pagination({
  page,
  totalPages,
  'data-testid': dataTestid
}: {
  page: number
  totalPages: number
  'data-testid'?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", newPage.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  const generatePageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (page <= 2) {
      return [1, 2, 3, 'ellipsis', totalPages]
    }

    if (page >= totalPages - 1) {
      return [1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages]
    }

    return [1, 'ellipsis-start', page - 1, page, page + 1, 'ellipsis-end', totalPages]
  }

  const generateMobilePageNumbers = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (page === 1) {
      return [1, 2, 'ellipsis', totalPages]
    }

    if (page === totalPages) {
      return [1, 'ellipsis', totalPages - 1, totalPages]
    }

    return [1, 'ellipsis-start', page, 'ellipsis-end', totalPages]
  }

  const PageButton = ({ 
    pageNum, 
    isActive = false,
    isDisabled = false,
    isEllipsis = false,
    size = "default"
  }: {
    pageNum: number | string
    isActive?: boolean
    isDisabled?: boolean
    isEllipsis?: boolean
    size?: "default" | "sm"
  }) => {
    const dimensions = size === "sm" ? "w-8 h-8" : "w-10 h-10"
    const textSize = size === "sm" ? "text-sm" : "text-base"
    const baseClasses = `flex items-center justify-center ${dimensions} rounded-lg transition-all duration-200 font-medium ${textSize}`
    
    if (isEllipsis) {
      return (
        <span className={`${baseClasses} text-ui-fg-muted cursor-default`}>
          <FaEllipsisH size={size === "sm" ? 12 : 14} />
        </span>
      )
    }

    if (isDisabled) {
      return (
        <span className={`${baseClasses} text-ui-fg-muted cursor-not-allowed opacity-50`}>
          {pageNum}
        </span>
      )
    }

    return (
      <button
        onClick={() => handlePageChange(Number(pageNum))}
        className={clx(baseClasses, {
          "bg-blue-50 text-blue-600 border border-blue-200 shadow-sm": isActive,
          "text-ui-fg-subtle hover:text-ui-fg-base hover:bg-ui-bg-base-hover border border-transparent hover:border-ui-border-base": !isActive
        })}
        aria-current={isActive ? "page" : undefined}
        aria-label={isActive ? `Current page, page ${pageNum}` : `Go to page ${pageNum}`}
      >
        {pageNum}
      </button>
    )
  }

  const NavigationButton = ({ 
    direction, 
    disabled,
    size = "default"
  }: {
    direction: 'prev' | 'next'
    disabled: boolean
    size?: "default" | "sm"
  }) => {
    const Icon = direction === 'prev' ? FaChevronLeft : FaChevronRight
    const label = direction === 'prev' ? 'Previous page' : 'Next page'
    const dimensions = size === "sm" ? "w-8 h-8" : "w-10 h-10"
    
    return (
      <button
        onClick={() => handlePageChange(direction === 'prev' ? page - 1 : page + 1)}
        disabled={disabled}
        className={clx(
          `flex items-center justify-center ${dimensions} rounded-lg border transition-all duration-200`,
          disabled 
            ? "text-ui-fg-muted border-ui-border-base cursor-not-allowed opacity-50" 
            : "text-ui-fg-subtle border-ui-border-base hover:text-ui-fg-base hover:border-ui-border-strong hover:bg-ui-bg-base-hover"
        )}
        aria-label={label}
      >
        <Icon size={size === "sm" ? 12 : 14} />
      </button>
    )
  }

  const pageNumbers = generatePageNumbers()
  const mobilePageNumbers = generateMobilePageNumbers()

  return (
    <div className="flex justify-center w-full mt-12">
      <nav 
        className="flex items-center gap-1 sm:gap-2" 
        aria-label="Pagination"
        data-testid={dataTestid}
      >
        {/* Mobile: Compact pagination */}
        <div className="flex sm:hidden items-center gap-1">
          <NavigationButton direction="prev" disabled={page <= 1} size="sm" />
          
          <div className="flex items-center gap-0.5">
            {mobilePageNumbers.map((pageNum, index) => {
              if (typeof pageNum === 'string' && pageNum.includes('ellipsis')) {
                return <PageButton key={`mobile-ellipsis-${index}`} pageNum={pageNum} isEllipsis size="sm" />
              }
              
              return (
                <PageButton
                  key={`mobile-${pageNum}`}
                  pageNum={pageNum}
                  isActive={pageNum === page}
                  isDisabled={pageNum === page}
                  size="sm"
                />
              )
            })}
          </div>
          
          <NavigationButton direction="next" disabled={page >= totalPages} size="sm" />
        </div>

        {/* Desktop: Full pagination */}
        <div className="hidden sm:flex items-center gap-2">
          <NavigationButton direction="prev" disabled={page <= 1} />
          
          <div className="flex items-center gap-1">
            {pageNumbers.map((pageNum, index) => {
              if (typeof pageNum === 'string' && pageNum.includes('ellipsis')) {
                return <PageButton key={`desktop-ellipsis-${index}`} pageNum={pageNum} isEllipsis />
              }
              
              return (
                <PageButton
                  key={`desktop-${pageNum}`}
                  pageNum={pageNum}
                  isActive={pageNum === page}
                  isDisabled={pageNum === page}
                />
              )
            })}
          </div>
          
          <NavigationButton direction="next" disabled={page >= totalPages} />
        </div>
      </nav>
    </div>
  )
}