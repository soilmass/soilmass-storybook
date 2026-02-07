"use client"

/**
 * Scroll To Top Component
 *
 * Premium button to scroll back to top of page.
 * Features:
 * - Smooth fade in/out with spring physics
 * - Hover glow effect
 * - Bounce animation on click
 * - Progress indicator
 * - Token-based animations
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Icons
const ArrowUpIcon = ({ className }: { className?: string }) => (
  <svg className={cn("h-5 w-5", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
)

const ChevronUpIcon = ({ className }: { className?: string }) => (
  <svg className={cn("h-5 w-5", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
)

export interface ScrollToTopProps extends React.HTMLAttributes<HTMLButtonElement> {
  threshold?: number
  showProgress?: boolean
  position?: "bottom-right" | "bottom-left" | "bottom-center"
  offset?: number
  variant?: "default" | "primary" | "minimal" | "with-text"
  size?: "sm" | "md" | "lg"
  behavior?: "smooth" | "instant"
  icon?: React.ReactNode
  label?: string
}

const positionClasses = {
  "bottom-right": "right-0",
  "bottom-left": "left-0",
  "bottom-center": "left-1/2 -translate-x-1/2",
}

const sizeClasses = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-14 w-14",
}

const variantClasses = {
  default: [
    "bg-[var(--color-surface)]",
    "border border-[var(--color-border)]",
    "text-[var(--color-text)]",
    "hover:bg-[var(--color-surface-hover)]",
    "shadow-lg",
  ],
  primary: [
    "bg-[var(--color-primary)]",
    "text-white",
    "hover:bg-[var(--color-primary-hover)]",
    "shadow-lg shadow-[var(--color-primary)]/30",
  ],
  minimal: [
    "bg-black/5 dark:bg-white/5",
    "text-[var(--color-text)]",
    "hover:bg-black/10 dark:hover:bg-white/10",
  ],
  "with-text": [
    "bg-[var(--color-surface)]",
    "border border-[var(--color-border)]",
    "text-[var(--color-text)]",
    "hover:bg-[var(--color-surface-hover)]",
    "shadow-lg",
  ],
}

export function ScrollToTop({
  threshold = 300,
  showProgress = false,
  position = "bottom-right",
  offset = 24,
  variant = "default",
  size = "md",
  behavior = "smooth",
  icon,
  label = "Back to top",
  className,
  ...props
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [scrollProgress, setScrollProgress] = React.useState(0)
  const [isBouncing, setIsBouncing] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight

      setIsVisible(scrollY > threshold)

      if (showProgress && documentHeight > 0) {
        setScrollProgress((scrollY / documentHeight) * 100)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [threshold, showProgress])

  const scrollToTop = () => {
    // Trigger bounce animation
    setIsBouncing(true)
    setTimeout(() => setIsBouncing(false), 600)

    window.scrollTo({
      top: 0,
      behavior,
    })
  }

  // Progress ring calculations
  const progressRadius = size === "sm" ? 18 : size === "md" ? 22 : 26
  const progressCircumference = 2 * Math.PI * progressRadius
  const progressOffset = progressCircumference - (scrollProgress / 100) * progressCircumference

  const iconElement = icon || (variant === "minimal" ? <ChevronUpIcon /> : <ArrowUpIcon />)

  // With text variant
  if (variant === "with-text") {
    return (
      <button
        type="button"
        onClick={scrollToTop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "fixed bottom-0 z-40",
          positionClasses[position],
          "flex items-center gap-2 px-4 py-2",
          "rounded-full",
          // Premium transitions
          "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
          "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:ring-offset-2",
          variantClasses[variant],
          // Visibility animation
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none",
          // Hover glow
          isHovered && "shadow-[0_0_24px_rgba(var(--color-primary-rgb),0.2)]",
          // Bounce on click
          isBouncing && "animate-[bounce-up_0.6s_var(--spring-bounce)]",
          className
        )}
        style={{
          bottom: offset,
          [position === "bottom-left" ? "left" : position === "bottom-right" ? "right" : undefined]: offset,
        }}
        aria-label={label}
        {...props}
      >
        <span className={cn(
          "transition-transform duration-200",
          isHovered && "-translate-y-0.5"
        )}>
          <ArrowUpIcon />
        </span>
        <span className="text-sm font-medium">{label}</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "fixed bottom-0 z-40",
        positionClasses[position],
        "rounded-full",
        // Premium transitions
        "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
        "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:ring-offset-2",
        sizeClasses[size],
        "flex items-center justify-center",
        variantClasses[variant],
        // Visibility animation with spring
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-75 pointer-events-none",
        // Hover effects
        isHovered && [
          "scale-110",
          variant === "primary"
            ? "shadow-[0_0_32px_rgba(var(--color-primary-rgb),0.4)]"
            : "shadow-[0_0_24px_rgba(var(--color-primary-rgb),0.2)]",
        ],
        // Bounce on click
        isBouncing && "animate-[bounce-up_0.6s_var(--spring-bounce)]",
        className
      )}
      style={{
        bottom: offset,
        [position === "bottom-left" ? "left" : position === "bottom-right" ? "right" : undefined]: offset,
      }}
      aria-label={label}
      {...props}
    >
      {/* Progress ring */}
      {showProgress && (
        <svg
          className="absolute inset-0 -rotate-90"
          viewBox={`0 0 ${(progressRadius + 4) * 2} ${(progressRadius + 4) * 2}`}
        >
          {/* Background circle */}
          <circle
            cx={progressRadius + 4}
            cy={progressRadius + 4}
            r={progressRadius}
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            className="opacity-20"
          />
          {/* Progress circle with glow */}
          <circle
            cx={progressRadius + 4}
            cy={progressRadius + 4}
            r={progressRadius}
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            style={{
              strokeDasharray: progressCircumference,
              strokeDashoffset: progressOffset,
              transition: "stroke-dashoffset 0.15s ease-out",
              filter: isHovered ? "drop-shadow(0 0 6px currentColor)" : undefined,
            }}
            className={cn(
              variant === "primary" ? "text-white" : "text-[var(--color-primary)]"
            )}
          />
        </svg>
      )}

      {/* Icon with hover animation */}
      <span className={cn(
        "transition-transform duration-200 ease-[var(--ease-spring)]",
        isHovered && "-translate-y-0.5"
      )}>
        {iconElement}
      </span>
    </button>
  )
}

// Scroll progress indicator (fixed bar)
export interface ScrollProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "top" | "bottom"
  height?: number
  color?: "primary" | "gradient" | string
  showPercent?: boolean
}

export function ScrollProgress({
  position = "top",
  height = 3,
  color = "primary",
  showPercent = false,
  className,
  ...props
}: ScrollProgressProps) {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      if (documentHeight > 0) {
        setProgress((window.scrollY / documentHeight) * 100)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const colorClass =
    color === "primary"
      ? "bg-[var(--color-primary)]"
      : color === "gradient"
      ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"
      : undefined

  const colorStyle = !colorClass ? { backgroundColor: color } : undefined

  return (
    <div
      className={cn(
        "fixed left-0 right-0 z-50",
        position === "top" ? "top-0" : "bottom-0",
        className
      )}
      style={{ height }}
      {...props}
    >
      <div
        className={cn(
          "h-full transition-all duration-100",
          colorClass,
          // Glow effect at the leading edge
          "shadow-[2px_0_8px_0_var(--color-primary)]"
        )}
        style={{
          width: `${progress}%`,
          ...colorStyle,
        }}
      />
      {showPercent && (
        <span
          className={cn(
            "absolute text-[10px] font-medium tabular-nums",
            position === "top" ? "top-1" : "bottom-1",
            "right-2 text-[var(--color-text-muted)]",
            "transition-opacity duration-200",
            progress > 5 ? "opacity-100" : "opacity-0"
          )}
        >
          {Math.round(progress)}%
        </span>
      )}
    </div>
  )
}

// Reading progress (for articles)
export interface ReadingProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  target?: string | React.RefObject<HTMLElement>
  height?: number
}

export function ReadingProgress({
  target,
  height = 3,
  className,
  ...props
}: ReadingProgressProps) {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      let element: HTMLElement | null = null

      if (typeof target === "string") {
        element = document.getElementById(target)
      } else if (target?.current) {
        element = target.current
      }

      if (element) {
        const rect = element.getBoundingClientRect()
        const elementTop = rect.top + window.scrollY
        const elementHeight = rect.height
        const windowHeight = window.innerHeight
        const scrollPosition = window.scrollY

        const start = elementTop - windowHeight
        const end = elementTop + elementHeight
        const current = scrollPosition - start
        const total = end - start

        const percent = Math.max(0, Math.min(100, (current / total) * 100))
        setProgress(percent)
      } else {
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight
        if (documentHeight > 0) {
          setProgress((window.scrollY / documentHeight) * 100)
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [target])

  return (
    <div
      className={cn("fixed top-0 left-0 right-0 z-50", className)}
      style={{ height }}
      {...props}
    >
      <div
        className="h-full bg-[var(--color-primary)] transition-all duration-100 shadow-[2px_0_8px_0_var(--color-primary)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

// Scroll indicator (shows scroll hint at bottom)
export interface ScrollIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
  hideAfter?: number
}

export function ScrollIndicator({
  text = "Scroll",
  hideAfter = 100,
  className,
  ...props
}: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = React.useState(true)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < hideAfter)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hideAfter])

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 text-[var(--color-text-muted)]",
        "transition-all duration-500 ease-[var(--ease-spring)]",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none",
        className
      )}
      {...props}
    >
      <span className="text-sm">{text}</span>
      <svg
        className="h-5 w-5 animate-[gentle-bounce_2s_ease-in-out_infinite]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  )
}
