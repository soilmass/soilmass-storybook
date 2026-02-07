/**
 * Table Component
 *
 * Semantic table for displaying tabular data.
 * Features:
 * - Proper table structure
 * - Responsive patterns
 * - Sorting indicators
 * - Selection support
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Table Root
export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /**
   * Make table horizontally scrollable on mobile
   */
  responsive?: boolean
}

export function Table({
  responsive = true,
  className,
  children,
  ...props
}: TableProps) {
  const table = (
    <table
      className={cn(
        "w-full caption-bottom text-sm",
        "border-collapse",
        className
      )}
      {...props}
    >
      {children}
    </table>
  )

  if (responsive) {
    return (
      <div className="relative w-full overflow-auto">
        {table}
      </div>
    )
  }

  return table
}

// Table Header
export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  /**
   * Make header sticky on scroll
   */
  sticky?: boolean
}

export function TableHeader({
  sticky = false,
  className,
  children,
  ...props
}: TableHeaderProps) {
  return (
    <thead
      className={cn(
        "[&_tr]:border-b [&_tr]:border-[var(--color-border-subtle)]",
        "shadow-[var(--shadow-card)]",
        sticky && [
          "sticky top-0 z-10",
          "bg-[var(--color-surface)]/95 backdrop-blur-sm",
          "shadow-[var(--shadow-card)]"
        ],
        className
      )}
      {...props}
    >
      {children}
    </thead>
  )
}

// Table Body
export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export function TableBody({ className, children, ...props }: TableBodyProps) {
  return (
    <tbody
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    >
      {children}
    </tbody>
  )
}

// Table Footer
export interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export function TableFooter({
  className,
  children,
  ...props
}: TableFooterProps) {
  return (
    <tfoot
      className={cn(
        "border-t bg-[var(--color-surface-muted)]/50 font-medium",
        "[&>tr]:last:border-b-0",
        className
      )}
      {...props}
    >
      {children}
    </tfoot>
  )
}

// Table Row
export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   * Selected state
   */
  selected?: boolean
}

export function TableRow({
  selected,
  className,
  children,
  ...props
}: TableRowProps) {
  return (
    <tr
      className={cn(
        "border-b border-[var(--color-border-subtle)]",
        "transition-all duration-200 ease-[var(--ease-spring)]",
        "hover:bg-[var(--color-surface-hover)]/50",
        "hover:-translate-y-[1px] hover:shadow-[var(--shadow-card)]",
        selected && "bg-[var(--color-primary)]/5",
        className
      )}
      data-state={selected ? "selected" : undefined}
      {...props}
    >
      {children}
    </tr>
  )
}

// Table Head Cell
export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /**
   * Sortable column
   */
  sortable?: boolean
  /**
   * Current sort direction
   */
  sortDirection?: "asc" | "desc" | null
  /**
   * Callback when sort clicked
   */
  onSort?: () => void
}

export function TableHead({
  sortable,
  sortDirection,
  onSort,
  className,
  children,
  ...props
}: TableHeadProps) {
  const content = (
    <>
      <span>{children}</span>
      {sortable && (
        <span className="ml-1 inline-flex flex-col transition-transform duration-200 ease-[var(--ease-spring)]">
          <svg
            className={cn(
              "h-3 w-3 -mb-1 transition-colors duration-200",
              sortDirection === "asc"
                ? "text-[var(--color-text)]"
                : "text-[var(--color-text-muted)]"
            )}
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M8 4l4 4H4l4-4z" />
          </svg>
          <svg
            className={cn(
              "h-3 w-3 -mt-1 transition-colors duration-200",
              sortDirection === "desc"
                ? "text-[var(--color-text)]"
                : "text-[var(--color-text-muted)]"
            )}
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M8 12l-4-4h8l-4 4z" />
          </svg>
        </span>
      )}
    </>
  )

  return (
    <th
      className={cn(
        "h-12 px-4 text-left align-middle font-medium",
        "text-[var(--color-text-muted)]",
        "bg-[var(--color-surface)]",
        "[&:has([role=checkbox])]:pr-0",
        "transition-colors duration-200 ease-[var(--ease-spring)]",
        sortable && "cursor-pointer select-none hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]",
        className
      )}
      onClick={sortable ? onSort : undefined}
      aria-sort={
        sortDirection === "asc"
          ? "ascending"
          : sortDirection === "desc"
            ? "descending"
            : undefined
      }
      {...props}
    >
      {sortable ? (
        <div className="flex items-center">{content}</div>
      ) : (
        children
      )}
    </th>
  )
}

// Table Cell
export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {}

export function TableCell({ className, children, ...props }: TableCellProps) {
  return (
    <td
      className={cn(
        "p-4 align-middle",
        "[&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    >
      {children}
    </td>
  )
}

// Table Caption
export interface TableCaptionProps
  extends React.HTMLAttributes<HTMLTableCaptionElement> {}

export function TableCaption({
  className,
  children,
  ...props
}: TableCaptionProps) {
  return (
    <caption
      className={cn(
        "mt-4 text-sm text-[var(--color-text-muted)]",
        className
      )}
      {...props}
    >
      {children}
    </caption>
  )
}

// Empty Table State
export interface TableEmptyProps extends React.HTMLAttributes<HTMLTableRowElement> {
  colSpan: number
  message?: string
}

export function TableEmpty({
  colSpan,
  message = "No data available",
  className,
  children,
  ...props
}: TableEmptyProps) {
  return (
    <tr className={className} {...props}>
      <td
        colSpan={colSpan}
        className="h-24 text-center text-[var(--color-text-muted)]"
      >
        {children || message}
      </td>
    </tr>
  )
}
