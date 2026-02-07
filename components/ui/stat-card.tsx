/**
 * Stat/Metric Card Component
 *
 * Display KPIs and metrics.
 * Features:
 * - Value and label
 * - Trend indicator (up/down)
 * - Comparison text
 * - Optional icon
 * - Size variants
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Icons
const TrendUpIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const TrendDownIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
)

export type TrendDirection = "up" | "down" | "neutral"

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Metric label
   */
  label: string
  /**
   * Metric value
   */
  value: string | number
  /**
   * Trend direction
   */
  trend?: TrendDirection
  /**
   * Trend percentage or value
   */
  trendValue?: string | number
  /**
   * Comparison text (e.g., "vs last month")
   */
  comparison?: string
  /**
   * Optional icon
   */
  icon?: React.ReactNode
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
  /**
   * Visual variant
   */
  variant?: "default" | "filled" | "outline"
  /**
   * Loading state
   */
  loading?: boolean
}

const sizeClasses = {
  sm: {
    container: "p-3",
    label: "text-xs",
    value: "text-xl",
    trend: "text-xs",
    icon: "h-8 w-8",
  },
  md: {
    container: "p-4",
    label: "text-sm",
    value: "text-2xl",
    trend: "text-sm",
    icon: "h-10 w-10",
  },
  lg: {
    container: "p-6",
    label: "text-base",
    value: "text-4xl",
    trend: "text-base",
    icon: "h-12 w-12",
  },
}

const variantClasses = {
  default: "bg-[var(--color-surface)] border border-[var(--color-border-subtle)] shadow-[var(--shadow-card)]",
  filled: "bg-[var(--color-surface-muted)] shadow-[var(--shadow-card)]",
  outline: "border-2 border-[var(--color-border-subtle)] shadow-[var(--shadow-card)]",
}

const trendColors = {
  up: "text-[var(--color-success)]",
  down: "text-[var(--color-error)]",
  neutral: "text-[var(--color-text-muted)]",
}

export function StatCard({
  label,
  value,
  trend,
  trendValue,
  comparison,
  icon,
  size = "md",
  variant = "default",
  loading = false,
  className,
  ...props
}: StatCardProps) {
  const sizeClass = sizeClasses[size]

  if (loading) {
    return (
      <div
        className={cn(
          "rounded-[var(--radius-lg)]",
          variantClasses[variant],
          sizeClass.container,
          className
        )}
        {...props}
      >
        <div className="animate-pulse space-y-3">
          <div className="h-4 w-24 bg-[var(--color-surface-muted)] rounded" />
          <div className="h-8 w-32 bg-[var(--color-surface-muted)] rounded" />
          <div className="h-3 w-20 bg-[var(--color-surface-muted)] rounded" />
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)]",
        variantClasses[variant],
        sizeClass.container,
        "transition-all duration-300 ease-[var(--ease-spring)]",
        "hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1",
        "animate-[fadeIn_0.3s_ease-[var(--ease-spring)]]",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Label */}
          <p
            className={cn(
              "font-medium text-[var(--color-text-muted)]",
              sizeClass.label
            )}
          >
            {label}
          </p>

          {/* Value */}
          <p
            className={cn(
              "font-bold text-[var(--color-text)] mt-1",
              "drop-shadow-[0_0_8px_rgba(0,0,0,0.05)]",
              sizeClass.value
            )}
          >
            {value}
          </p>

          {/* Trend */}
          {(trend || trendValue || comparison) && (
            <div
              className={cn(
                "flex items-center gap-1.5 mt-2",
                "animate-[slideUp_0.4s_ease-[var(--ease-spring)]_0.1s_both]",
                sizeClass.trend
              )}
            >
              {trend && trend !== "neutral" && (
                <span className={cn(
                  "flex items-center transition-transform duration-300",
                  trend === "up" && "animate-[bounceUp_0.5s_ease-[var(--ease-spring)]]",
                  trend === "down" && "animate-[bounceDown_0.5s_ease-[var(--ease-spring)]]",
                  trendColors[trend]
                )}>
                  {trend === "up" ? <TrendUpIcon /> : <TrendDownIcon />}
                </span>
              )}
              {trendValue && (
                <span className={cn("font-medium", trend ? trendColors[trend] : "")}>
                  {typeof trendValue === "number"
                    ? `${trendValue > 0 ? "+" : ""}${trendValue}%`
                    : trendValue}
                </span>
              )}
              {comparison && (
                <span className="text-[var(--color-text-muted)]">
                  {comparison}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Icon */}
        {icon && (
          <div
            className={cn(
              "flex-shrink-0 flex items-center justify-center",
              "rounded-[var(--radius-md)]",
              "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
              "transition-transform duration-300 ease-[var(--ease-spring)]",
              "group-hover:scale-110",
              sizeClass.icon
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}

// Stat group for displaying multiple stats
export interface StatGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns
   */
  columns?: 2 | 3 | 4
}

export function StatGroup({
  columns = 4,
  className,
  children,
  ...props
}: StatGroupProps) {
  const colClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div
      className={cn("grid gap-4", colClasses[columns], className)}
      {...props}
    >
      {children}
    </div>
  )
}

// Inline stat (for use within cards or lists)
export interface InlineStatProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Stat label
   */
  label: string
  /**
   * Stat value
   */
  value: string | number
  /**
   * Value suffix
   */
  suffix?: string
}

export function InlineStat({
  label,
  value,
  suffix,
  className,
  ...props
}: InlineStatProps) {
  return (
    <div className={cn("flex items-baseline gap-2", className)} {...props}>
      <span className="text-2xl font-bold text-[var(--color-text)]">
        {value}
        {suffix && (
          <span className="text-sm font-normal text-[var(--color-text-muted)]">
            {suffix}
          </span>
        )}
      </span>
      <span className="text-sm text-[var(--color-text-muted)]">{label}</span>
    </div>
  )
}

// Comparison stat (for before/after or A/B)
export interface ComparisonStatProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Label
   */
  label: string
  /**
   * Before value
   */
  before: string | number
  /**
   * After value
   */
  after: string | number
  /**
   * Before label
   */
  beforeLabel?: string
  /**
   * After label
   */
  afterLabel?: string
}

export function ComparisonStat({
  label,
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
  ...props
}: ComparisonStatProps) {
  const beforeNum = typeof before === "number" ? before : parseFloat(before)
  const afterNum = typeof after === "number" ? after : parseFloat(after)
  const change = !isNaN(beforeNum) && !isNaN(afterNum) && beforeNum !== 0
    ? ((afterNum - beforeNum) / beforeNum) * 100
    : null

  return (
    <div
      className={cn(
        "p-4 rounded-[var(--radius-lg)]",
        "bg-[var(--color-surface)] border border-[var(--color-border-subtle)]",
        "shadow-[var(--shadow-card)]",
        "transition-all duration-300 ease-[var(--ease-spring)]",
        "hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1",
        className
      )}
      {...props}
    >
      <p className="text-sm font-medium text-[var(--color-text-muted)]">
        {label}
      </p>
      <div className="flex items-center gap-4 mt-2">
        <div>
          <p className="text-xs text-[var(--color-text-muted)]">{beforeLabel}</p>
          <p className="text-lg font-semibold text-[var(--color-text)]">{before}</p>
        </div>
        <div className="text-[var(--color-text-muted)]">→</div>
        <div>
          <p className="text-xs text-[var(--color-text-muted)]">{afterLabel}</p>
          <p className="text-lg font-semibold text-[var(--color-text)]">{after}</p>
        </div>
        {change !== null && (
          <div
            className={cn(
              "ml-auto px-2 py-1 rounded-[var(--radius-sm)] text-sm font-medium",
              change > 0
                ? "bg-[var(--color-success)]/10 text-[var(--color-success)]"
                : change < 0
                ? "bg-[var(--color-error)]/10 text-[var(--color-error)]"
                : "bg-[var(--color-surface-muted)] text-[var(--color-text-muted)]"
            )}
          >
            {change > 0 ? "+" : ""}{change.toFixed(1)}%
          </div>
        )}
      </div>
    </div>
  )
}
