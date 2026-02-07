/**
 * Comparison Table Component
 *
 * Compare plans, products, or features.
 * Features:
 * - Multiple columns
 * - Feature rows with check/x marks
 * - Highlighted column option
 * - Responsive mobile view
 * - Sticky headers with shadow
 * - Row hover effects
 * - Spring transitions
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Icons
const CheckIcon = () => (
  <svg className="h-5 w-5 text-[var(--color-success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const XIcon = () => (
  <svg className="h-5 w-5 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const MinusIcon = () => (
  <svg className="h-5 w-5 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
)

export type FeatureValue = boolean | string | "partial"

export interface ComparisonColumn {
  /**
   * Column header/name
   */
  name: string
  /**
   * Optional price
   */
  price?: string
  /**
   * Optional description
   */
  description?: string
  /**
   * Highlight this column
   */
  highlighted?: boolean
  /**
   * Badge text (e.g., "Popular")
   */
  badge?: string
  /**
   * CTA button text
   */
  ctaText?: string
  /**
   * CTA button action
   */
  onCtaClick?: () => void
  /**
   * CTA button href
   */
  ctaHref?: string
}

export interface ComparisonFeature {
  /**
   * Feature name
   */
  name: string
  /**
   * Optional tooltip/help text
   */
  tooltip?: string
  /**
   * Feature category (for grouping)
   */
  category?: string
  /**
   * Values for each column (in order)
   */
  values: FeatureValue[]
}

export interface ComparisonTableProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Column definitions
   */
  columns: ComparisonColumn[]
  /**
   * Feature rows
   */
  features: ComparisonFeature[]
  /**
   * Show feature categories as section headers
   */
  showCategories?: boolean
  /**
   * Sticky column headers
   */
  stickyHeaders?: boolean
}

export function ComparisonTable({
  columns,
  features,
  showCategories = true,
  stickyHeaders = true,
  className,
  ...props
}: ComparisonTableProps) {
  // Group features by category
  const groupedFeatures = React.useMemo(() => {
    if (!showCategories) return { "": features }

    const groups: Record<string, ComparisonFeature[]> = {}
    features.forEach((feature) => {
      const category = feature.category || ""
      if (!groups[category]) groups[category] = []
      groups[category].push(feature)
    })
    return groups
  }, [features, showCategories])

  const renderValue = (value: FeatureValue) => {
    if (value === true) return <CheckIcon />
    if (value === false) return <XIcon />
    if (value === "partial") return <MinusIcon />
    return <span className="text-sm text-[var(--color-text)]">{value}</span>
  }

  return (
    <div className={cn("overflow-x-auto", className)} {...props}>
      <table className="w-full border-collapse">
        {/* Header with sticky shadow */}
        <thead
          className={cn(
            stickyHeaders && "sticky top-0 z-10",
            "after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-[var(--color-border)]",
            stickyHeaders && "after:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
          )}
        >
          <tr>
            {/* Empty cell for feature names column */}
            <th className="bg-[var(--color-surface)] p-4 text-left" />

            {/* Column headers */}
            {columns.map((column, index) => (
              <th
                key={index}
                className={cn(
                  "p-6 text-center min-w-[160px]",
                  "transition-all duration-300",
                  column.highlighted
                    ? "bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary-hover)] text-white shadow-lg"
                    : "bg-[var(--color-surface)]"
                )}
              >
                {column.badge && (
                  <span
                    className={cn(
                      "inline-block px-3 py-1 mb-2 rounded-full text-xs font-semibold",
                      "animate-in fade-in slide-in-from-top-2 duration-500",
                      column.highlighted
                        ? "bg-white/20 text-white"
                        : "bg-[var(--color-primary)] text-white"
                    )}
                  >
                    {column.badge}
                  </span>
                )}
                <div
                  className={cn(
                    "font-semibold text-lg",
                    column.highlighted ? "text-white" : "text-[var(--color-text)]"
                  )}
                >
                  {column.name}
                </div>
                {column.price && (
                  <div
                    className={cn(
                      "mt-1 text-3xl font-bold",
                      column.highlighted ? "text-white" : "text-[var(--color-text)]"
                    )}
                  >
                    {column.price}
                  </div>
                )}
                {column.description && (
                  <div
                    className={cn(
                      "mt-1 text-sm",
                      column.highlighted ? "text-white/80" : "text-[var(--color-text-muted)]"
                    )}
                  >
                    {column.description}
                  </div>
                )}
                {(column.ctaText || column.ctaHref) && (
                  <a
                    href={column.ctaHref}
                    onClick={column.onCtaClick}
                    className={cn(
                      "inline-block mt-4 px-5 py-2.5 rounded-[var(--radius-md)]",
                      "text-sm font-medium",
                      "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                      "hover:scale-105 active:scale-95",
                      column.highlighted
                        ? "bg-white text-[var(--color-primary)] hover:bg-white/90 hover:shadow-lg"
                        : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] hover:shadow-lg hover:shadow-[var(--color-primary)]/25"
                    )}
                  >
                    {column.ctaText || "Get started"}
                  </a>
                )}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {Object.entries(groupedFeatures).map(([category, categoryFeatures]) => (
            <React.Fragment key={category}>
              {/* Category header */}
              {category && showCategories && (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className={cn(
                      "px-4 py-3 bg-[var(--color-surface-muted)]",
                      "text-sm font-semibold text-[var(--color-text)]",
                      "border-b border-[var(--color-border)]"
                    )}
                  >
                    {category}
                  </td>
                </tr>
              )}

              {/* Feature rows with hover effect */}
              {categoryFeatures.map((feature, featureIndex) => (
                <tr
                  key={featureIndex}
                  className={cn(
                    "border-b border-[var(--color-border)]",
                    "transition-all duration-200",
                    "hover:bg-[var(--color-surface-hover)]",
                    "group"
                  )}
                  style={{ animationDelay: `${featureIndex * 30}ms` }}
                >
                  {/* Feature name */}
                  <td className={cn(
                    "p-4 text-sm text-[var(--color-text)]",
                    "transition-all duration-200",
                    "group-hover:pl-5"
                  )}>
                    {feature.name}
                    {feature.tooltip && (
                      <span
                        className="ml-1 text-[var(--color-text-muted)] cursor-help"
                        title={feature.tooltip}
                      >
                        <svg className="inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                    )}
                  </td>

                  {/* Feature values */}
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={cn(
                        "p-4 text-center",
                        "transition-all duration-200",
                        column.highlighted && "bg-[var(--color-primary)]/5"
                      )}
                    >
                      <span className="inline-flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                        {renderValue(feature.values[colIndex])}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Simple feature comparison (two columns only)
export interface SimpleComparisonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Left column label
   */
  leftLabel: string
  /**
   * Right column label
   */
  rightLabel: string
  /**
   * Features with left/right values
   */
  features: Array<{
    name: string
    left: FeatureValue
    right: FeatureValue
  }>
  /**
   * Highlight right column
   */
  highlightRight?: boolean
}

export function SimpleComparison({
  leftLabel,
  rightLabel,
  features,
  highlightRight = true,
  className,
  ...props
}: SimpleComparisonProps) {
  const columns: ComparisonColumn[] = [
    { name: leftLabel },
    { name: rightLabel, highlighted: highlightRight },
  ]

  const comparisonFeatures: ComparisonFeature[] = features.map((f) => ({
    name: f.name,
    values: [f.left, f.right],
  }))

  return (
    <ComparisonTable
      columns={columns}
      features={comparisonFeatures}
      showCategories={false}
      className={className}
      {...props}
    />
  )
}

// Mobile-friendly comparison cards with premium styling
export interface ComparisonCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Column definitions
   */
  columns: ComparisonColumn[]
  /**
   * Feature rows
   */
  features: ComparisonFeature[]
}

export function ComparisonCards({
  columns,
  features,
  className,
  ...props
}: ComparisonCardsProps) {
  const renderValue = (value: FeatureValue) => {
    if (value === true) return <CheckIcon />
    if (value === false) return <XIcon />
    if (value === "partial") return <MinusIcon />
    return <span className="text-sm">{value}</span>
  }

  return (
    <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", className)} {...props}>
      {columns.map((column, colIndex) => (
        <div
          key={colIndex}
          className={cn(
            "rounded-[var(--radius-xl)] p-6",
            "border",
            "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            "hover:-translate-y-2 hover:shadow-xl",
            column.highlighted
              ? "border-[var(--color-primary)] bg-gradient-to-b from-[var(--color-primary)]/5 to-transparent shadow-lg shadow-[var(--color-primary)]/10"
              : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/30"
          )}
          style={{ animationDelay: `${colIndex * 100}ms` }}
        >
          {/* Header */}
          <div className="text-center mb-6">
            {column.badge && (
              <span className="inline-block px-3 py-1 mb-2 rounded-full text-xs font-semibold bg-[var(--color-primary)] text-white">
                {column.badge}
              </span>
            )}
            <h3 className="font-semibold text-xl text-[var(--color-text)]">
              {column.name}
            </h3>
            {column.price && (
              <p className="mt-1 text-3xl font-bold text-[var(--color-text)]">
                {column.price}
              </p>
            )}
            {column.description && (
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                {column.description}
              </p>
            )}
          </div>

          {/* Features */}
          <ul className="space-y-3">
            {features.map((feature, featureIndex) => (
              <li
                key={featureIndex}
                className={cn(
                  "flex items-center justify-between gap-2 py-2",
                  "border-b border-[var(--color-border)] last:border-b-0",
                  "transition-all duration-200",
                  "hover:bg-[var(--color-surface-hover)] hover:px-2 hover:-mx-2 rounded-lg"
                )}
              >
                <span className="text-sm text-[var(--color-text)]">
                  {feature.name}
                </span>
                <span className="flex-shrink-0">
                  {renderValue(feature.values[colIndex])}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          {(column.ctaText || column.ctaHref) && (
            <a
              href={column.ctaHref}
              onClick={column.onCtaClick}
              className={cn(
                "block mt-6 w-full py-3 rounded-[var(--radius-md)]",
                "text-center text-sm font-medium",
                "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                "hover:scale-[1.02] active:scale-[0.98]",
                column.highlighted
                  ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] hover:shadow-lg hover:shadow-[var(--color-primary)]/25"
                  : "border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-primary)]"
              )}
            >
              {column.ctaText || "Get started"}
            </a>
          )}
        </div>
      ))}
    </div>
  )
}
