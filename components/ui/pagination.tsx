"use client"

/**
 * Pagination Component
 *
 * Navigation for paginated content.
 * Features:
 * - Page numbers
 * - Previous/Next buttons
 * - First/Last buttons
 * - Ellipsis for large page counts
 * - Compact mode
 * - Premium design: active page glow, hover shadow lift, spring transitions
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Icons
const ChevronLeftIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const ChevronsLeftIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
  </svg>
)

const ChevronsRightIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
  </svg>
)

const MoreHorizontalIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="6" cy="12" r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="18" cy="12" r="1.5" />
  </svg>
)

// Generate page numbers with ellipsis
function generatePages(
  current: number,
  total: number,
  siblingCount: number = 1
): (number | "ellipsis")[] {
  const pages: (number | "ellipsis")[] = []

  // Always show first page
  pages.push(1)

  // Calculate range around current page
  const leftSibling = Math.max(2, current - siblingCount)
  const rightSibling = Math.min(total - 1, current + siblingCount)

  // Add left ellipsis if needed
  if (leftSibling > 2) {
    pages.push("ellipsis")
  }

  // Add pages around current
  for (let i = leftSibling; i <= rightSibling; i++) {
    if (i !== 1 && i !== total) {
      pages.push(i)
    }
  }

  // Add right ellipsis if needed
  if (rightSibling < total - 1) {
    pages.push("ellipsis")
  }

  // Always show last page if more than 1 page
  if (total > 1) {
    pages.push(total)
  }

  return pages
}

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Current page (1-indexed)
   */
  page: number
  /**
   * Total number of pages
   */
  totalPages: number
  /**
   * Callback when page changes
   */
  onPageChange: (page: number) => void
  /**
   * Number of sibling pages to show
   */
  siblingCount?: number
  /**
   * Show first/last buttons
   */
  showFirstLast?: boolean
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
  /**
   * Compact mode (prev/next only)
   */
  compact?: boolean
}

const sizeClasses = {
  sm: "h-8 min-w-8 px-2 text-xs",
  md: "h-9 min-w-9 px-3 text-sm",
  lg: "h-10 min-w-10 px-4 text-base",
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = false,
  size = "md",
  compact = false,
  className,
  ...props
}: PaginationProps) {
  const pages = generatePages(page, totalPages, siblingCount)
  const sizeClass = sizeClasses[size]

  const canGoPrev = page > 1
  const canGoNext = page < totalPages

  const buttonBase = cn(
    "inline-flex items-center justify-center",
    "rounded-[var(--radius-md)]",
    "border border-[var(--color-border)]",
    "bg-[var(--color-surface)]",
    // Premium spring transition
    "transition-all duration-300 ease-[var(--ease-spring)]",
    // Focus ring with offset
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2",
    "focus-visible:ring-offset-[var(--color-surface)]",
    sizeClass
  )

  const buttonEnabled = cn(
    "text-[var(--color-text)]",
    // Premium: hover shadow lift
    "hover:bg-[var(--color-surface-hover)]",
    "hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]",
    "hover:-translate-y-px",
    "active:translate-y-0 active:shadow-sm"
  )

  const buttonDisabled = cn(
    "text-[var(--color-text-muted)]",
    "opacity-50 cursor-not-allowed"
  )

  const buttonActive = cn(
    "bg-[var(--color-primary)] border-[var(--color-primary)]",
    "text-white",
    // Premium: active page glow
    "shadow-[0_0_0_1px_var(--color-primary),0_2px_8px_-2px_var(--color-primary)/40,0_0_12px_-4px_var(--color-primary)/30]",
    "hover:bg-[var(--color-primary-hover)]",
    "hover:shadow-[0_0_0_1px_var(--color-primary),0_4px_12px_-2px_var(--color-primary)/50,0_0_16px_-4px_var(--color-primary)/40]"
  )

  // Compact mode
  if (compact) {
    return (
      <nav
        aria-label="Pagination"
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={!canGoPrev}
          className={cn(buttonBase, canGoPrev ? buttonEnabled : buttonDisabled)}
          aria-label="Previous page"
        >
          <ChevronLeftIcon />
          <span className="ml-1">Previous</span>
        </button>
        <span className="text-sm text-[var(--color-text-muted)] tabular-nums">
          Page <span className="font-medium text-[var(--color-text)]">{page}</span> of{" "}
          <span className="font-medium text-[var(--color-text)]">{totalPages}</span>
        </span>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={!canGoNext}
          className={cn(buttonBase, canGoNext ? buttonEnabled : buttonDisabled)}
          aria-label="Next page"
        >
          <span className="mr-1">Next</span>
          <ChevronRightIcon />
        </button>
      </nav>
    )
  }

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      {/* First page */}
      {showFirstLast && (
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={!canGoPrev}
          className={cn(buttonBase, canGoPrev ? buttonEnabled : buttonDisabled)}
          aria-label="First page"
        >
          <ChevronsLeftIcon />
        </button>
      )}

      {/* Previous */}
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={!canGoPrev}
        className={cn(buttonBase, canGoPrev ? buttonEnabled : buttonDisabled)}
        aria-label="Previous page"
      >
        <ChevronLeftIcon />
      </button>

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === "ellipsis" ? (
          <span
            key={`ellipsis-${i}`}
            className={cn(
              "inline-flex items-center justify-center",
              "text-[var(--color-text-muted)]",
              sizeClass
            )}
          >
            <MoreHorizontalIcon />
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={cn(
              buttonBase,
              p === page ? buttonActive : buttonEnabled,
              // Tabular numbers for consistent width
              "tabular-nums"
            )}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={!canGoNext}
        className={cn(buttonBase, canGoNext ? buttonEnabled : buttonDisabled)}
        aria-label="Next page"
      >
        <ChevronRightIcon />
      </button>

      {/* Last page */}
      {showFirstLast && (
        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={!canGoNext}
          className={cn(buttonBase, canGoNext ? buttonEnabled : buttonDisabled)}
          aria-label="Last page"
        >
          <ChevronsRightIcon />
        </button>
      )}
    </nav>
  )
}

// Simple pagination info
export interface PaginationInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Current page
   */
  page: number
  /**
   * Items per page
   */
  pageSize: number
  /**
   * Total number of items
   */
  totalItems: number
}

export function PaginationInfo({
  page,
  pageSize,
  totalItems,
  className,
  ...props
}: PaginationInfoProps) {
  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, totalItems)

  return (
    <div
      className={cn("text-sm text-[var(--color-text-muted)] tabular-nums", className)}
      {...props}
    >
      Showing <span className="font-medium text-[var(--color-text)]">{start}</span> to{" "}
      <span className="font-medium text-[var(--color-text)]">{end}</span> of{" "}
      <span className="font-medium text-[var(--color-text)]">{totalItems}</span> results
    </div>
  )
}
