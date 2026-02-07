/**
 * Alert/Banner Component
 *
 * Alerts for important messages and notifications.
 * Features:
 * - Severity variants (info, success, warning, error)
 * - Dismissible option
 * - Icon support
 * - Inline and banner modes
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Alert variants
const alertVariants = cva(
  [
    "relative w-full rounded-[var(--radius-lg)] border p-4",
    "[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:h-5 [&>svg]:w-5",
    "[&>svg+div]:pl-8",
    "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--color-surface)] border-[var(--color-border)]",
          "text-[var(--color-text)]",
          "[&>svg]:text-[var(--color-text-muted)]",
          "shadow-[var(--shadow-sm)]",
        ],
        info: [
          "bg-[var(--color-info)]/10 border-[var(--color-info)]/20",
          "text-[var(--color-info)]",
          "[&>svg]:text-[var(--color-info)]",
          "shadow-[0_2px_8px_rgba(var(--color-info-rgb),0.15)]",
        ],
        success: [
          "bg-[var(--color-success)]/10 border-[var(--color-success)]/20",
          "text-[var(--color-success)]",
          "[&>svg]:text-[var(--color-success)]",
          "shadow-[0_2px_8px_rgba(var(--color-success-rgb),0.15)]",
        ],
        warning: [
          "bg-[var(--color-warning)]/10 border-[var(--color-warning)]/20",
          "text-[var(--color-warning)]",
          "[&>svg]:text-[var(--color-warning)]",
          "shadow-[0_2px_8px_rgba(var(--color-warning-rgb),0.15)]",
        ],
        error: [
          "bg-[var(--color-error)]/10 border-[var(--color-error)]/20",
          "text-[var(--color-error)]",
          "[&>svg]:text-[var(--color-error)]",
          "shadow-[0_2px_8px_rgba(var(--color-error-rgb),0.15)]",
        ],
      },
      // Animation variant for slide-in effect
      animate: {
        true: "animate-slide-in-left",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      animate: false,
    },
  }
)

// Icons for each variant
const AlertIcons = {
  default: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  info: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  success: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  warning: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  error: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
}

// Close button
const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "absolute right-2 top-2 p-1.5 rounded-[var(--radius-sm)]",
      "opacity-70 hover:opacity-100",
      "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-focus-ring)]",
      "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
      "active:scale-[0.92]"
    )}
    aria-label="Dismiss"
  >
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
)

// Main Alert Component
export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /**
   * Show default icon for variant
   */
  showIcon?: boolean
  /**
   * Custom icon
   */
  icon?: React.ReactNode
  /**
   * Make alert dismissible
   */
  dismissible?: boolean
  /**
   * Callback when dismissed
   */
  onDismiss?: () => void
  /**
   * Enable slide-in animation
   */
  animate?: boolean
}

export function Alert({
  variant = "default",
  showIcon = true,
  icon,
  dismissible = false,
  onDismiss,
  animate = false,
  className,
  children,
  ...props
}: AlertProps) {
  const [isVisible, setIsVisible] = React.useState(true)

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  if (!isVisible) return null

  const iconElement = icon || (showIcon && AlertIcons[variant || "default"])

  return (
    <div
      role="alert"
      className={cn(
        alertVariants({ variant, animate }),
        dismissible && "pr-10",
        className
      )}
      {...props}
    >
      {iconElement}
      <div>{children}</div>
      {dismissible && <CloseButton onClick={handleDismiss} />}
    </div>
  )
}

// Alert Title
export interface AlertTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export function AlertTitle({ className, children, ...props }: AlertTitleProps) {
  return (
    <h5
      className={cn("font-medium leading-none tracking-tight", className)}
      {...props}
    >
      {children}
    </h5>
  )
}

// Alert Description
export interface AlertDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function AlertDescription({
  className,
  children,
  ...props
}: AlertDescriptionProps) {
  return (
    <div
      className={cn("mt-1 text-sm opacity-90 [&_p]:leading-relaxed", className)}
      {...props}
    >
      {children}
    </div>
  )
}

// Banner Alert (full-width, typically at top of page)
export interface BannerProps extends AlertProps {
  /**
   * Action element (button, link)
   */
  action?: React.ReactNode
}

export function Banner({
  variant = "info",
  showIcon = true,
  icon,
  dismissible = false,
  onDismiss,
  action,
  className,
  children,
  ...props
}: BannerProps) {
  const [isVisible, setIsVisible] = React.useState(true)

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  if (!isVisible) return null

  const iconElement = icon || (showIcon && AlertIcons[variant || "info"])

  return (
    <div
      role="alert"
      className={cn(
        "w-full px-4 py-3",
        variant === "info" && "bg-[var(--color-info)] text-white",
        variant === "success" && "bg-[var(--color-success)] text-white",
        variant === "warning" && "bg-[var(--color-warning)] text-white",
        variant === "error" && "bg-[var(--color-error)] text-white",
        variant === "default" && "bg-[var(--color-surface-alt)] text-[var(--color-text)]",
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {iconElement && (
            <span className="flex-shrink-0 [&>svg]:h-5 [&>svg]:w-5">
              {iconElement}
            </span>
          )}
          <div className="text-sm font-medium">{children}</div>
        </div>
        <div className="flex items-center gap-2">
          {action}
          {dismissible && (
            <button
              type="button"
              onClick={handleDismiss}
              className={cn(
                "p-1 rounded-[var(--radius-sm)]",
                "opacity-70 hover:opacity-100",
                "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-white/50",
                "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
                "active:scale-[0.92]"
              )}
              aria-label="Dismiss"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export { alertVariants }
