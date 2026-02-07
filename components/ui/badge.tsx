/**
 * Badge Component
 *
 * Based on Domain 54 (Tags & Badges) for status indicators,
 * labels, and categorization.
 *
 * Tokens consumed:
 * - --color-primary, --color-secondary, --color-success, --color-warning, --color-error
 * - --radius-full, --radius-md
 * - --text-xs, --text-sm, --font-medium
 * - --space-1, --space-2
 */

import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  // Base styles
  [
    "inline-flex items-center justify-center",
    "font-[var(--font-medium)]",
    "whitespace-nowrap",
    "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
    "shadow-[var(--shadow-xs)]",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--color-primary)]",
          "text-[var(--color-primary-foreground)]",
          "shadow-[var(--shadow-primary-xs)]",
        ],
        secondary: [
          "bg-[var(--color-secondary)]",
          "text-[var(--color-secondary-foreground)]",
        ],
        outline: [
          "bg-transparent",
          "border border-[var(--color-border)]",
          "text-[var(--color-foreground)]",
        ],
        success: [
          "bg-[var(--color-success-muted)]",
          "text-[var(--color-success)]",
          "shadow-[0_1px_3px_rgba(var(--color-success-rgb),0.2)]",
        ],
        warning: [
          "bg-[var(--color-warning-muted)]",
          "text-[var(--color-warning)]",
          "shadow-[0_1px_3px_rgba(var(--color-warning-rgb),0.2)]",
        ],
        error: [
          "bg-[var(--color-error-muted)]",
          "text-[var(--color-error)]",
          "shadow-[0_1px_3px_rgba(var(--color-error-rgb),0.2)]",
        ],
        info: [
          "bg-[var(--color-info-muted)]",
          "text-[var(--color-info)]",
          "shadow-[0_1px_3px_rgba(var(--color-info-rgb),0.2)]",
        ],
        // Premium gradient variants
        "gradient-primary": [
          "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)]",
          "text-[var(--color-primary-foreground)]",
          "shadow-[var(--shadow-primary-sm)]",
        ],
        "gradient-success": [
          "bg-gradient-to-r from-[var(--color-success)] to-[var(--color-success-dark)]",
          "text-white",
          "shadow-[0_2px_6px_rgba(var(--color-success-rgb),0.3)]",
        ],
        "gradient-error": [
          "bg-gradient-to-r from-[var(--color-error)] to-[var(--color-error-dark)]",
          "text-white",
          "shadow-[0_2px_6px_rgba(var(--color-error-rgb),0.3)]",
        ],
      },
      size: {
        sm: "px-[var(--space-1)] py-px text-[10px] rounded-[var(--radius-sm)]",
        md: "px-[var(--space-2)] py-[var(--space-1)] text-[var(--text-xs)] rounded-[var(--radius-md)]",
        lg: "px-[var(--space-3)] py-[var(--space-1)] text-[var(--text-sm)] rounded-[var(--radius-md)]",
      },
      rounded: {
        default: "",
        full: "rounded-[var(--radius-full)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Badge component for status indicators and labels.
 *
 * @example
 * <Badge>New</Badge>
 *
 * @example
 * <Badge variant="success">Active</Badge>
 *
 * @example
 * <Badge variant="outline" rounded="full">v2.0</Badge>
 */
export function Badge({
  className,
  variant,
  size,
  rounded,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size, rounded }), className)}
      {...props}
    />
  )
}

/**
 * Status dot for inline status indicators
 */
export interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: "online" | "offline" | "busy" | "away"
}

export function StatusDot({
  status = "online",
  className,
  ...props
}: StatusDotProps) {
  const statusColors = {
    online: "bg-[var(--color-success)] shadow-[0_0_6px_rgba(var(--color-success-rgb),0.5)]",
    offline: "bg-[var(--color-muted-foreground)]",
    busy: "bg-[var(--color-error)] shadow-[0_0_6px_rgba(var(--color-error-rgb),0.5)]",
    away: "bg-[var(--color-warning)] shadow-[0_0_6px_rgba(var(--color-warning-rgb),0.5)]",
  }

  return (
    <span
      className={cn(
        "inline-block w-2 h-2 rounded-[var(--radius-full)]",
        "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
        statusColors[status],
        className
      )}
      aria-label={status}
      {...props}
    />
  )
}

export { badgeVariants }
