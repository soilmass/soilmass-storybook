/**
 * Progress Component
 *
 * Progress indicators for loading and completion states.
 * Features:
 * - Determinate (value-based) progress
 * - Indeterminate (loading) mode
 * - Size and color variants
 * - Accessible with proper ARIA
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Current value (0-100)
   */
  value?: number
  /**
   * Maximum value
   */
  max?: number
  /**
   * Indeterminate loading state
   */
  indeterminate?: boolean
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
  /**
   * Color variant
   */
  variant?: "default" | "success" | "warning" | "error"
  /**
   * Show value label
   */
  showLabel?: boolean
  /**
   * Custom label format
   */
  formatLabel?: (value: number, max: number) => string
  /**
   * Enable pulse animation on the fill
   */
  pulse?: boolean
  /**
   * Enable glow effect on the fill
   */
  glow?: boolean
}

const sizeClasses = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
}

const variantClasses = {
  default: "bg-[var(--color-primary)]",
  success: "bg-[var(--color-success)]",
  warning: "bg-[var(--color-warning)]",
  error: "bg-[var(--color-error)]",
}

export function Progress({
  value = 0,
  max = 100,
  indeterminate = false,
  size = "md",
  variant = "default",
  showLabel = false,
  formatLabel = (v, m) => `${Math.round((v / m) * 100)}%`,
  pulse = false,
  glow = false,
  className,
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const glowColors = {
    default: "shadow-[0_0_8px_var(--color-primary)]",
    success: "shadow-[0_0_8px_var(--color-success)]",
    warning: "shadow-[0_0_8px_var(--color-warning)]",
    error: "shadow-[0_0_8px_var(--color-error)]",
  }

  return (
    <div className={cn("w-full", className)} {...props}>
      {showLabel && !indeterminate && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-[var(--color-text-muted)]">Progress</span>
          <span className="font-medium text-[var(--color-text)]">
            {formatLabel(value, max)}
          </span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={indeterminate ? "Loading" : `${percentage}% complete`}
        className={cn(
          "w-full overflow-hidden rounded-full",
          "bg-[var(--color-surface-active)]",
          "shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]",
          sizeClasses[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full",
            "transition-all duration-300 ease-[var(--ease-spring)]",
            variantClasses[variant],
            indeterminate && "animate-progress-indeterminate w-1/3",
            pulse && "animate-pulse",
            glow && glowColors[variant]
          )}
          style={!indeterminate ? { width: `${percentage}%` } : undefined}
        />
      </div>
    </div>
  )
}

// Circular Progress
export interface CircularProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Current value (0-100)
   */
  value?: number
  /**
   * Maximum value
   */
  max?: number
  /**
   * Indeterminate loading state
   */
  indeterminate?: boolean
  /**
   * Size in pixels
   */
  size?: number
  /**
   * Stroke width
   */
  strokeWidth?: number
  /**
   * Color variant
   */
  variant?: "default" | "success" | "warning" | "error"
  /**
   * Show percentage in center
   */
  showValue?: boolean
}

const circularVariantClasses = {
  default: "stroke-[var(--color-primary)]",
  success: "stroke-[var(--color-success)]",
  warning: "stroke-[var(--color-warning)]",
  error: "stroke-[var(--color-error)]",
}

export function CircularProgress({
  value = 0,
  max = 100,
  indeterminate = false,
  size = 40,
  strokeWidth = 4,
  variant = "default",
  showValue = false,
  className,
  ...props
}: CircularProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={indeterminate ? "Loading" : `${Math.round(percentage)}% complete`}
      className={cn("relative inline-flex", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg
        className={cn(
          "transform -rotate-90 drop-shadow-sm",
          indeterminate && "animate-spin"
        )}
        width={size}
        height={size}
      >
        {/* Background circle */}
        <circle
          className="stroke-[var(--color-surface-active)]"
          fill="none"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ filter: "drop-shadow(inset 0 1px 2px rgba(0,0,0,0.1))" }}
        />
        {/* Progress circle */}
        <circle
          className={cn(
            "transition-all duration-300 ease-[var(--ease-spring)]",
            circularVariantClasses[variant],
            "drop-shadow-[0_0_4px_currentColor]"
          )}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: indeterminate
              ? circumference * 0.75
              : strokeDashoffset,
          }}
        />
      </svg>
      {showValue && !indeterminate && (
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            "text-xs font-medium text-[var(--color-text)]"
          )}
        >
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  )
}

// Loading Spinner
export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Size
   */
  size?: "sm" | "md" | "lg"
  /**
   * Color variant
   */
  variant?: "default" | "primary" | "white"
}

const spinnerSizes = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
}

const spinnerVariants = {
  default: "text-[var(--color-text-muted)]",
  primary: "text-[var(--color-primary)]",
  white: "text-white",
}

export function Spinner({
  size = "md",
  variant = "default",
  className,
  ...props
}: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("animate-spin", spinnerSizes[size], spinnerVariants[variant], className)}
      {...props}
    >
      <svg
        className="h-full w-full"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">Loading</span>
    </div>
  )
}
