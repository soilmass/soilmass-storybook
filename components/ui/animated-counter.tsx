"use client"

/**
 * Animated Counter Component
 *
 * Animated number counter with formatting.
 * Features:
 * - Count up/down animation
 * - Viewport detection (animate when visible)
 * - Currency/percentage/number formatting
 * - Customizable duration and easing
 * - Suffix/prefix support
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Easing functions
const easings = {
  linear: (t: number) => t,
  easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
  easeIn: (t: number) => t * t * t,
  easeInOut: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
}

export interface AnimatedCounterProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Target value to count to
   */
  value: number
  /**
   * Starting value
   */
  from?: number
  /**
   * Animation duration in ms
   */
  duration?: number
  /**
   * Easing function
   */
  easing?: keyof typeof easings
  /**
   * Number of decimal places
   */
  decimals?: number
  /**
   * Prefix (e.g., "$")
   */
  prefix?: string
  /**
   * Suffix (e.g., "%", "k", "+")
   */
  suffix?: string
  /**
   * Format as currency
   */
  currency?: string
  /**
   * Locale for formatting
   */
  locale?: string
  /**
   * Separator for thousands
   */
  separator?: string
  /**
   * Animate when element enters viewport
   */
  animateOnView?: boolean
  /**
   * Viewport threshold (0-1)
   */
  threshold?: number
  /**
   * Delay before animation starts (ms)
   */
  delay?: number
  /**
   * Callback when animation completes
   */
  onComplete?: () => void
  /**
   * Re-animate when value changes
   */
  reanimateOnChange?: boolean
}

export function AnimatedCounter({
  value,
  from = 0,
  duration = 2000,
  easing = "easeOut",
  decimals = 0,
  prefix = "",
  suffix = "",
  currency,
  locale = "en-US",
  separator,
  animateOnView = true,
  threshold = 0.5,
  delay = 0,
  onComplete,
  reanimateOnChange = false,
  className,
  ...props
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = React.useState(from)
  const [hasAnimated, setHasAnimated] = React.useState(false)
  const elementRef = React.useRef<HTMLSpanElement>(null)
  const animationRef = React.useRef<number>()
  const previousValue = React.useRef(value)

  // Format number
  const formatNumber = (num: number): string => {
    if (currency) {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(num)
    }

    let formatted = num.toFixed(decimals)

    if (separator) {
      const parts = formatted.split(".")
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
      formatted = parts.join(".")
    } else {
      formatted = new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(num)
    }

    return `${prefix}${formatted}${suffix}`
  }

  // Animate function
  const animate = React.useCallback(
    (startValue: number, endValue: number) => {
      const startTime = performance.now()
      const easingFn = easings[easing]

      const tick = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easedProgress = easingFn(progress)
        const currentValue = startValue + (endValue - startValue) * easedProgress

        setDisplayValue(currentValue)

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(tick)
        } else {
          setDisplayValue(endValue)
          onComplete?.()
        }
      }

      if (delay > 0) {
        setTimeout(() => {
          animationRef.current = requestAnimationFrame(tick)
        }, delay)
      } else {
        animationRef.current = requestAnimationFrame(tick)
      }
    },
    [duration, easing, delay, onComplete]
  )

  // Viewport intersection observer
  React.useEffect(() => {
    if (!animateOnView || hasAnimated) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            animate(from, value)
          }
        })
      },
      { threshold }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [animateOnView, hasAnimated, from, value, threshold, animate])

  // Animate on mount if not using viewport detection
  React.useEffect(() => {
    if (!animateOnView && !hasAnimated) {
      setHasAnimated(true)
      animate(from, value)
    }
  }, [animateOnView, hasAnimated, from, value, animate])

  // Re-animate on value change
  React.useEffect(() => {
    if (reanimateOnChange && hasAnimated && value !== previousValue.current) {
      animate(previousValue.current, value)
      previousValue.current = value
    }
  }, [value, reanimateOnChange, hasAnimated, animate])

  // Cleanup
  React.useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <span
      ref={elementRef}
      className={cn("tabular-nums", className)}
      {...props}
    >
      {formatNumber(displayValue)}
    </span>
  )
}

// Stats counter with label
export interface StatsCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Counter value
   */
  value: number
  /**
   * Label text
   */
  label: string
  /**
   * Description text
   */
  description?: string
  /**
   * Counter prefix
   */
  prefix?: string
  /**
   * Counter suffix
   */
  suffix?: string
  /**
   * Animation duration
   */
  duration?: number
  /**
   * Decimal places
   */
  decimals?: number
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg" | "xl"
}

const statsSizeClasses = {
  sm: {
    value: "text-2xl",
    label: "text-sm",
    description: "text-xs",
  },
  md: {
    value: "text-3xl sm:text-4xl",
    label: "text-sm",
    description: "text-xs",
  },
  lg: {
    value: "text-4xl sm:text-5xl",
    label: "text-base",
    description: "text-sm",
  },
  xl: {
    value: "text-5xl sm:text-6xl",
    label: "text-lg",
    description: "text-base",
  },
}

export function StatsCounter({
  value,
  label,
  description,
  prefix,
  suffix,
  duration = 2000,
  decimals = 0,
  size = "md",
  className,
  ...props
}: StatsCounterProps) {
  const sizeClass = statsSizeClasses[size]

  return (
    <div className={cn("text-center", className)} {...props}>
      <div className={cn("font-bold text-[var(--color-text)]", sizeClass.value)}>
        <AnimatedCounter
          value={value}
          prefix={prefix}
          suffix={suffix}
          duration={duration}
          decimals={decimals}
        />
      </div>
      <div className={cn("mt-1 font-medium text-[var(--color-text)]", sizeClass.label)}>
        {label}
      </div>
      {description && (
        <div className={cn("mt-0.5 text-[var(--color-text-muted)]", sizeClass.description)}>
          {description}
        </div>
      )}
    </div>
  )
}

// Stats grid
export interface StatsGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Stats items
   */
  stats: Array<{
    value: number
    label: string
    description?: string
    prefix?: string
    suffix?: string
  }>
  /**
   * Number of columns
   */
  columns?: 2 | 3 | 4
  /**
   * Size variant
   */
  size?: StatsCounterProps["size"]
  /**
   * Animation duration
   */
  duration?: number
  /**
   * Stagger delay between items (ms)
   */
  staggerDelay?: number
}

const gridColumnClasses = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
}

export function StatsGrid({
  stats,
  columns = 4,
  size = "md",
  duration = 2000,
  staggerDelay = 100,
  className,
  ...props
}: StatsGridProps) {
  return (
    <div
      className={cn(
        "grid gap-8",
        gridColumnClasses[columns],
        className
      )}
      {...props}
    >
      {stats.map((stat, index) => (
        <StatsCounter
          key={index}
          value={stat.value}
          label={stat.label}
          description={stat.description}
          prefix={stat.prefix}
          suffix={stat.suffix}
          duration={duration}
          size={size}
        />
      ))}
    </div>
  )
}

// Compact counter (inline)
export interface CompactCounterProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Counter value
   */
  value: number
  /**
   * Prefix
   */
  prefix?: string
  /**
   * Suffix
   */
  suffix?: string
  /**
   * Format large numbers (1000 -> 1k)
   */
  compact?: boolean
  /**
   * Animation duration
   */
  duration?: number
}

function formatCompactNumber(num: number): { value: number; suffix: string } {
  const absNum = Math.abs(num)
  if (absNum >= 1000000000) {
    return { value: num / 1000000000, suffix: "B" }
  }
  if (absNum >= 1000000) {
    return { value: num / 1000000, suffix: "M" }
  }
  if (absNum >= 1000) {
    return { value: num / 1000, suffix: "K" }
  }
  return { value: num, suffix: "" }
}

export function CompactCounter({
  value,
  prefix = "",
  suffix = "",
  compact = true,
  duration = 1500,
  className,
  ...props
}: CompactCounterProps) {
  const { value: displayValue, suffix: compactSuffix } = compact
    ? formatCompactNumber(value)
    : { value, suffix: "" }

  const decimals = compact && Math.abs(displayValue) < 10 ? 1 : 0

  return (
    <AnimatedCounter
      value={displayValue}
      prefix={prefix}
      suffix={compactSuffix + suffix}
      duration={duration}
      decimals={decimals}
      className={className}
      {...props}
    />
  )
}

// Percentage counter with visual indicator
export interface PercentageCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Percentage value (0-100)
   */
  value: number
  /**
   * Label
   */
  label?: string
  /**
   * Show bar indicator
   */
  showBar?: boolean
  /**
   * Bar color
   */
  barColor?: "primary" | "success" | "warning" | "error"
  /**
   * Size
   */
  size?: "sm" | "md" | "lg"
}

const barColorClasses = {
  primary: "bg-[var(--color-primary)]",
  success: "bg-[var(--color-success)]",
  warning: "bg-[var(--color-warning)]",
  error: "bg-[var(--color-error)]",
}

export function PercentageCounter({
  value,
  label,
  showBar = true,
  barColor = "primary",
  size = "md",
  className,
  ...props
}: PercentageCounterProps) {
  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div className={cn("space-y-2", className)} {...props}>
      <div className="flex items-baseline justify-between">
        {label && (
          <span className="text-sm text-[var(--color-text-muted)]">{label}</span>
        )}
        <span
          className={cn(
            "font-bold text-[var(--color-text)]",
            size === "sm" && "text-lg",
            size === "md" && "text-2xl",
            size === "lg" && "text-3xl"
          )}
        >
          <AnimatedCounter
            value={clampedValue}
            suffix="%"
            decimals={0}
            duration={1500}
          />
        </span>
      </div>
      {showBar && (
        <div className="h-2 w-full rounded-full bg-[var(--color-surface-muted)] overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-1000 ease-out",
              barColorClasses[barColor]
            )}
            style={{ width: `${clampedValue}%` }}
          />
        </div>
      )}
    </div>
  )
}
