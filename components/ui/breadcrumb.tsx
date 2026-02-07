/**
 * Breadcrumb Component
 *
 * Navigation breadcrumbs for showing page hierarchy.
 * Features:
 * - Semantic nav landmark
 * - Proper ARIA attributes
 * - Customizable separator
 * - Truncation for long paths
 * - Premium design: hover underline animation, muted text hierarchy
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { Link } from "./link"

// Default separator
const ChevronSeparator = () => (
  <svg
    className="h-4 w-4 flex-shrink-0 text-[var(--color-text-muted)]/60"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
)

// Breadcrumb Root
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Custom separator element
   */
  separator?: React.ReactNode
  /**
   * Maximum items to show (collapses middle items)
   */
  maxItems?: number
}

const BreadcrumbContext = React.createContext<{
  separator: React.ReactNode
}>({
  separator: <ChevronSeparator />,
})

export function Breadcrumb({
  separator = <ChevronSeparator />,
  maxItems,
  className,
  children,
  ...props
}: BreadcrumbProps) {
  const items = React.Children.toArray(children)

  // Handle collapsing if maxItems is set
  let displayItems = items
  if (maxItems && items.length > maxItems) {
    const firstItems = items.slice(0, 1)
    const lastItems = items.slice(-(maxItems - 2))
    displayItems = [
      ...firstItems,
      <BreadcrumbEllipsis key="ellipsis" />,
      ...lastItems,
    ]
  }

  return (
    <BreadcrumbContext.Provider value={{ separator }}>
      <nav aria-label="Breadcrumb" className={className} {...props}>
        <ol className="flex items-center flex-wrap gap-1.5">
          {displayItems.map((child, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <li
                  role="presentation"
                  aria-hidden="true"
                  className={cn(
                    "flex items-center",
                    // Premium: fade separator with spring timing
                    "transition-opacity duration-300 ease-[var(--ease-spring)]"
                  )}
                >
                  {separator}
                </li>
              )}
              {child}
            </React.Fragment>
          ))}
        </ol>
      </nav>
    </BreadcrumbContext.Provider>
  )
}

// Breadcrumb Item
export interface BreadcrumbItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  /**
   * Whether this is the current page
   */
  isCurrentPage?: boolean
}

export function BreadcrumbItem({
  isCurrentPage,
  className,
  children,
  ...props
}: BreadcrumbItemProps) {
  return (
    <li
      className={cn("flex items-center", className)}
      aria-current={isCurrentPage ? "page" : undefined}
      {...props}
    >
      {children}
    </li>
  )
}

// Breadcrumb Link
export interface BreadcrumbLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Render as current page (not a link)
   */
  isCurrentPage?: boolean
}

export function BreadcrumbLink({
  isCurrentPage,
  className,
  children,
  href,
  ...props
}: BreadcrumbLinkProps) {
  if (isCurrentPage) {
    return (
      <span
        className={cn(
          "text-sm font-medium text-[var(--color-text)]",
          className
        )}
        aria-current="page"
      >
        {children}
      </span>
    )
  }

  return (
    <Link
      href={href || "#"}
      variant="muted"
      className={cn(
        "relative text-sm text-[var(--color-text-muted)]",
        // Premium: smooth color transition
        "transition-colors duration-300 ease-[var(--ease-spring)]",
        "hover:text-[var(--color-text)]",
        // Premium: animated underline on hover
        "after:absolute after:left-0 after:bottom-0 after:h-px",
        "after:w-0 after:bg-[var(--color-text)]",
        "after:transition-all after:duration-300 after:ease-[var(--ease-spring)]",
        "hover:after:w-full",
        // Focus ring with offset
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2",
        "focus-visible:ring-offset-[var(--color-surface)]",
        "rounded-sm",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}

// Breadcrumb Ellipsis (for collapsed items)
export interface BreadcrumbEllipsisProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

export function BreadcrumbEllipsis({
  className,
  ...props
}: BreadcrumbEllipsisProps) {
  return (
    <li className="flex items-center">
      <span
        role="presentation"
        className={cn(
          "flex h-6 w-6 items-center justify-center",
          "text-[var(--color-text-muted)]",
          // Premium: subtle hover effect
          "rounded-[var(--radius-sm)]",
          "transition-all duration-300 ease-[var(--ease-spring)]",
          "hover:bg-[var(--color-surface-hover)]",
          "hover:text-[var(--color-text)]",
          "cursor-default",
          className
        )}
        {...props}
      >
        <svg
          className="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="6" cy="12" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="18" cy="12" r="2" />
        </svg>
        <span className="sr-only">More pages</span>
      </span>
    </li>
  )
}

// Breadcrumb Page (current page, not a link)
export interface BreadcrumbPageProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

export function BreadcrumbPage({
  className,
  children,
  ...props
}: BreadcrumbPageProps) {
  return (
    <span
      className={cn(
        "text-sm font-medium text-[var(--color-text)]",
        // Premium: slight emphasis with primary tint
        "relative",
        className
      )}
      aria-current="page"
      {...props}
    >
      {children}
    </span>
  )
}

// Breadcrumb Separator (if you need to customize per-item)
export interface BreadcrumbSeparatorProps
  extends React.LiHTMLAttributes<HTMLLIElement> {}

export function BreadcrumbSeparator({
  className,
  children,
  ...props
}: BreadcrumbSeparatorProps) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex items-center",
        "text-[var(--color-text-muted)]/60",
        className
      )}
      {...props}
    >
      {children || <ChevronSeparator />}
    </li>
  )
}

// Convenience component for simple breadcrumbs
export interface SimpleBreadcrumbProps {
  items: Array<{
    label: string
    href?: string
  }>
  className?: string
}

export function SimpleBreadcrumb({ items, className }: SimpleBreadcrumbProps) {
  return (
    <Breadcrumb className={className}>
      {items.map((item, index) => (
        <BreadcrumbItem key={index}>
          {index === items.length - 1 ? (
            <BreadcrumbPage>{item.label}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
          )}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}
