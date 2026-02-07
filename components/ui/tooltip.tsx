"use client"

/**
 * Tooltip Component
 *
 * Contextual help displayed on hover/focus.
 * Features:
 * - Multiple positioning options
 * - Delay before showing
 * - Accessible via keyboard focus
 * - Arrow indicator
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export type TooltipPlacement = "top" | "right" | "bottom" | "left"

export interface TooltipProps {
  /**
   * Tooltip content
   */
  content: React.ReactNode
  /**
   * Trigger element
   */
  children: React.ReactElement
  /**
   * Placement relative to trigger
   */
  placement?: TooltipPlacement
  /**
   * Delay before showing (ms)
   */
  delay?: number
  /**
   * Disable tooltip
   */
  disabled?: boolean
  /**
   * Additional class for tooltip content
   */
  className?: string
}

// Placement-specific styles
const placementStyles: Record<TooltipPlacement, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
}

// Arrow styles
const arrowStyles: Record<TooltipPlacement, string> = {
  top: "top-full left-1/2 -translate-x-1/2 border-t-[var(--color-foreground)] border-x-transparent border-b-transparent",
  right: "right-full top-1/2 -translate-y-1/2 border-r-[var(--color-foreground)] border-y-transparent border-l-transparent",
  bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-[var(--color-foreground)] border-x-transparent border-t-transparent",
  left: "left-full top-1/2 -translate-y-1/2 border-l-[var(--color-foreground)] border-y-transparent border-r-transparent",
}

export function Tooltip({
  content,
  children,
  placement = "top",
  delay = 200,
  disabled = false,
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [shouldRender, setShouldRender] = React.useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const tooltipId = React.useId()

  const showTooltip = React.useCallback(() => {
    if (disabled) return

    timeoutRef.current = setTimeout(() => {
      setShouldRender(true)
      // Small delay to allow render before animation
      requestAnimationFrame(() => setIsVisible(true))
    }, delay)
  }, [delay, disabled])

  const hideTooltip = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsVisible(false)
    // Wait for animation to complete before unmounting
    setTimeout(() => setShouldRender(false), 150)
  }, [])

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Clone child to add event handlers and aria attributes
  const trigger = React.cloneElement(children, {
    onMouseEnter: (e: React.MouseEvent) => {
      showTooltip()
      children.props.onMouseEnter?.(e)
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hideTooltip()
      children.props.onMouseLeave?.(e)
    },
    onFocus: (e: React.FocusEvent) => {
      showTooltip()
      children.props.onFocus?.(e)
    },
    onBlur: (e: React.FocusEvent) => {
      hideTooltip()
      children.props.onBlur?.(e)
    },
    "aria-describedby": shouldRender ? tooltipId : undefined,
  })

  return (
    <div className="relative inline-flex">
      {trigger}
      {shouldRender && (
        <div
          id={tooltipId}
          role="tooltip"
          className={cn(
            "absolute z-50 pointer-events-none",
            "px-2.5 py-1.5 text-xs font-medium",
            "text-white bg-[var(--color-foreground)]",
            "rounded-[var(--radius-sm)]",
            "whitespace-nowrap",
            // Premium shadow
            "shadow-[var(--shadow-popover)]",
            // Animation - scale in with spring
            "transition-all duration-[var(--duration-fast)] ease-[var(--ease-spring)]",
            "origin-center",
            isVisible
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95",
            // Placement
            placementStyles[placement],
            className
          )}
        >
          {content}
          {/* Arrow */}
          <span
            className={cn(
              "absolute w-0 h-0",
              "border-4 border-solid",
              arrowStyles[placement]
            )}
          />
        </div>
      )}
    </div>
  )
}

// Simple wrapper for icon buttons with tooltips
export interface IconButtonWithTooltipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Tooltip text
   */
  tooltip: string
  /**
   * Tooltip placement
   */
  tooltipPlacement?: TooltipPlacement
  /**
   * Icon element
   */
  icon: React.ReactNode
}

export function IconButtonWithTooltip({
  tooltip,
  tooltipPlacement = "top",
  icon,
  className,
  ...props
}: IconButtonWithTooltipProps) {
  return (
    <Tooltip content={tooltip} placement={tooltipPlacement}>
      <button
        type="button"
        className={cn(
          "inline-flex items-center justify-center",
          "h-9 w-9 rounded-[var(--radius-md)]",
          "text-[var(--color-text-muted)]",
          "hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]",
          "hover:shadow-[var(--shadow-sm)]",
          "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-focus-ring)]",
          "focus-visible:shadow-[var(--shadow-primary-sm)]",
          "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
          "active:scale-[0.95]",
          className
        )}
        {...props}
      >
        {icon}
        <span className="sr-only">{tooltip}</span>
      </button>
    </Tooltip>
  )
}
