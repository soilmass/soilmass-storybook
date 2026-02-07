"use client"

/**
 * Rating Component
 *
 * Star rating display and input.
 * Features:
 * - Read-only display
 * - Interactive selection
 * - Half-star precision
 * - Size variants
 * - Custom icons
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Star icons
const StarIcon = ({ filled, half }: { filled: boolean; half?: boolean }) => (
  <svg className="h-full w-full" viewBox="0 0 24 24">
    {half ? (
      <>
        {/* Half-filled star */}
        <defs>
          <linearGradient id="half-star">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          fill="url(#half-star)"
          stroke="currentColor"
          strokeWidth={1.5}
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        />
      </>
    ) : (
      <path
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      />
    )}
  </svg>
)

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Current rating value (0-5)
   */
  value: number
  /**
   * Maximum rating (default 5)
   */
  max?: number
  /**
   * Callback when rating changes (makes it interactive)
   */
  onChange?: (value: number) => void
  /**
   * Allow half-star ratings
   */
  allowHalf?: boolean
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg" | "xl"
  /**
   * Read-only mode (no interaction)
   */
  readOnly?: boolean
  /**
   * Disabled state
   */
  disabled?: boolean
  /**
   * Show numeric value
   */
  showValue?: boolean
  /**
   * Custom color for filled stars
   */
  color?: "default" | "primary" | "warning"
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
}

const colorClasses = {
  default: "text-[var(--color-warning)]",
  primary: "text-[var(--color-primary)]",
  warning: "text-[var(--color-warning)]",
}

const emptyColor = "text-[var(--color-border)]"

export function Rating({
  value,
  max = 5,
  onChange,
  allowHalf = false,
  size = "md",
  readOnly = false,
  disabled = false,
  showValue = false,
  color = "default",
  className,
  ...props
}: RatingProps) {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null)
  const sizeClass = sizeClasses[size]
  const filledColor = colorClasses[color]

  const isInteractive = !readOnly && !disabled && onChange

  const displayValue = hoverValue !== null ? hoverValue : value

  const handleMouseMove = (
    e: React.MouseEvent<HTMLButtonElement>,
    starIndex: number
  ) => {
    if (!isInteractive) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const isHalf = allowHalf && x < rect.width / 2

    setHoverValue(isHalf ? starIndex + 0.5 : starIndex + 1)
  }

  const handleClick = (starIndex: number, isHalf: boolean) => {
    if (!isInteractive) return

    const newValue = isHalf ? starIndex + 0.5 : starIndex + 1
    onChange?.(newValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent, starIndex: number) => {
    if (!isInteractive) return

    const step = allowHalf ? 0.5 : 1

    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        e.preventDefault()
        onChange?.(Math.min(value + step, max))
        break
      case "ArrowLeft":
      case "ArrowDown":
        e.preventDefault()
        onChange?.(Math.max(value - step, 0))
        break
      case "Home":
        e.preventDefault()
        onChange?.(0)
        break
      case "End":
        e.preventDefault()
        onChange?.(max)
        break
    }
  }

  const stars = Array.from({ length: max }, (_, i) => i)

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5",
        disabled && "opacity-50",
        className
      )}
      role={isInteractive ? "slider" : "img"}
      aria-label={`Rating: ${value} out of ${max} stars`}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      {...props}
    >
      {stars.map((starIndex) => {
        const starValue = starIndex + 1
        const isFilled = displayValue >= starValue
        const isHalf = !isFilled && displayValue >= starIndex + 0.5

        if (isInteractive) {
          return (
            <button
              key={starIndex}
              type="button"
              tabIndex={starIndex === 0 ? 0 : -1}
              disabled={disabled}
              onMouseMove={(e) => handleMouseMove(e, starIndex)}
              onMouseLeave={() => setHoverValue(null)}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = e.clientX - rect.left
                const isHalfClick = allowHalf && x < rect.width / 2
                handleClick(starIndex, isHalfClick)
              }}
              onKeyDown={(e) => handleKeyDown(e, starIndex)}
              className={cn(
                // Premium transitions with spring animation
                "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
                // Focus
                "focus:outline-none focus-visible:ring-[3px]",
                "focus-visible:ring-[var(--color-focus-ring)]",
                "rounded-sm cursor-pointer",
                sizeClass,
                isFilled || isHalf ? filledColor : emptyColor,
                // Hover glow on stars
                "hover:scale-110",
                (isFilled || isHalf) && "drop-shadow-[0_0_4px_var(--color-warning)]",
                // Selected glow
                hoverValue !== null && (isFilled || isHalf) && "drop-shadow-[0_0_8px_var(--color-warning)]"
              )}
              aria-label={`${starValue} star${starValue !== 1 ? "s" : ""}`}
            >
              <StarIcon filled={isFilled} half={isHalf} />
            </button>
          )
        }

        return (
          <span
            key={starIndex}
            className={cn(
              sizeClass,
              isFilled || isHalf ? filledColor : emptyColor,
              // Subtle glow on filled stars
              (isFilled || isHalf) && "drop-shadow-[0_0_3px_var(--color-warning)]"
            )}
          >
            <StarIcon filled={isFilled} half={isHalf} />
          </span>
        )
      })}

      {showValue && (
        <span className="ml-1.5 text-sm font-medium text-[var(--color-text)]">
          {value.toFixed(allowHalf ? 1 : 0)}
        </span>
      )}
    </div>
  )
}

// Rating display with count
export interface RatingDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Rating value
   */
  value: number
  /**
   * Number of reviews
   */
  count?: number
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
}

export function RatingDisplay({
  value,
  count,
  size = "md",
  className,
  ...props
}: RatingDisplayProps) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)} {...props}>
      <Rating value={value} size={size} readOnly />
      <span className="text-sm text-[var(--color-text)]">
        <span className="font-medium">{value.toFixed(1)}</span>
        {count !== undefined && (
          <span className="text-[var(--color-text-muted)]">
            {" "}
            ({count.toLocaleString()} {count === 1 ? "review" : "reviews"})
          </span>
        )}
      </span>
    </div>
  )
}

// Rating breakdown (for review summaries)
export interface RatingBreakdownProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Count of each rating level (5 to 1 star)
   */
  breakdown: [number, number, number, number, number]
  /**
   * Show percentages instead of counts
   */
  showPercentage?: boolean
}

export function RatingBreakdown({
  breakdown,
  showPercentage = true,
  className,
  ...props
}: RatingBreakdownProps) {
  const total = breakdown.reduce((sum, count) => sum + count, 0)
  const labels = ["5", "4", "3", "2", "1"]

  return (
    <div className={cn("space-y-2", className)} {...props}>
      {labels.map((label, index) => {
        const count = breakdown[index]
        const percentage = total > 0 ? (count / total) * 100 : 0

        return (
          <div key={label} className="flex items-center gap-2">
            <span className="w-3 text-sm text-[var(--color-text-muted)]">
              {label}
            </span>
            <StarIcon filled />
            <div className="flex-1 h-2 bg-[var(--color-surface-muted)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--color-warning)] transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="w-12 text-sm text-[var(--color-text-muted)] text-right">
              {showPercentage ? `${Math.round(percentage)}%` : count.toLocaleString()}
            </span>
          </div>
        )
      })}
    </div>
  )
}
