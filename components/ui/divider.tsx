/**
 * Divider Component
 *
 * Spec: domains/components/056-dividers.yaml
 *
 * Rules from spec:
 * - DIV1: Dividers MUST use semantic <hr> element
 * - DIV2: Decorative dividers MUST have role='presentation'
 *
 * Tokens consumed:
 * - --divider-color, --divider-width
 * - --space-4, --space-6
 *
 * Premium patterns:
 * - Subtle gradient option with shimmer effect
 * - Fade at edges for elegant separation
 * - Spring transition for visibility changes
 */

import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const dividerVariants = cva(
  // Base styles
  "border-none transition-opacity duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
  {
    variants: {
      orientation: {
        horizontal: [
          "w-full",
          "h-[var(--divider-width)]",
          "bg-[var(--divider-color)]",
        ],
        vertical: [
          "inline-block",
          "w-[var(--divider-width)] h-[1em]",
          "bg-[var(--divider-color)]",
          "align-middle mx-[var(--space-2)]",
        ],
      },
      spacing: {
        none: "",
        sm: "",
        md: "",
        lg: "",
      },
      lineStyle: {
        solid: "",
        dashed: "bg-transparent border-t-[var(--divider-width)] border-dashed border-[var(--divider-color)]",
        dotted: "bg-transparent border-t-[var(--divider-width)] border-dotted border-[var(--divider-color)]",
        gradient: [
          // Premium gradient effect
          "bg-gradient-to-r from-transparent via-[var(--divider-color)] to-transparent",
        ],
        glow: [
          // Premium glow divider
          "bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent",
          "shadow-[0_0_8px_var(--color-primary)]",
          "opacity-60",
        ],
      },
      fade: {
        none: "",
        edges: [
          // Fade at edges using mask
          "[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]",
        ],
        left: [
          "[mask-image:linear-gradient(to_right,transparent,black_30%)]",
        ],
        right: [
          "[mask-image:linear-gradient(to_left,transparent,black_30%)]",
        ],
      },
    },
    compoundVariants: [
      // Horizontal spacing
      { orientation: "horizontal", spacing: "sm", className: "my-[var(--space-2)]" },
      { orientation: "horizontal", spacing: "md", className: "my-[var(--space-4)]" },
      { orientation: "horizontal", spacing: "lg", className: "my-[var(--space-6)]" },
      // Gradient style needs different height for visibility
      { orientation: "horizontal", lineStyle: "gradient", className: "h-px" },
      { orientation: "horizontal", lineStyle: "glow", className: "h-px" },
    ],
    defaultVariants: {
      orientation: "horizontal",
      spacing: "md",
      lineStyle: "solid",
      fade: "none",
    },
  }
)

export interface DividerProps
  extends Omit<React.HTMLAttributes<HTMLHRElement>, "style">,
    VariantProps<typeof dividerVariants> {
  /**
   * Whether this divider is purely decorative (no semantic meaning).
   * When true, adds role="presentation" to hide from screen readers.
   */
  decorative?: boolean
  /**
   * Renamed from 'style' to 'lineStyle' to avoid conflict with HTMLAttributes
   */
  lineStyle?: "solid" | "dashed" | "dotted" | "gradient" | "glow"
}

/**
 * Divider component following Domain 56 specification.
 *
 * @example
 * // Basic horizontal divider
 * <Divider />
 *
 * @example
 * // Gradient divider with edge fade
 * <Divider lineStyle="gradient" fade="edges" />
 *
 * @example
 * // Glowing accent divider
 * <Divider lineStyle="glow" spacing="lg" />
 *
 * @example
 * // Vertical divider inline with text
 * Home <Divider orientation="vertical" /> About
 */
export function Divider({
  className,
  orientation,
  spacing,
  lineStyle,
  fade,
  decorative = false,
  ...props
}: DividerProps) {
  // Vertical dividers can't use <hr>, use span instead
  if (orientation === "vertical") {
    return (
      <span
        className={cn(dividerVariants({ orientation, spacing, lineStyle, fade }), className)}
        role="presentation"
        aria-hidden="true"
        {...(props as React.HTMLAttributes<HTMLSpanElement>)}
      />
    )
  }

  return (
    <hr
      className={cn(dividerVariants({ orientation, spacing, lineStyle, fade }), className)}
      role={decorative ? "presentation" : undefined}
      aria-hidden={decorative ? "true" : undefined}
      {...props}
    />
  )
}

/**
 * Divider with centered text (e.g., "or continue with")
 */
export interface DividerWithTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  /**
   * Line style for the divider segments
   */
  lineStyle?: "solid" | "gradient"
}

export function DividerWithText({
  className,
  children,
  lineStyle = "solid",
  ...props
}: DividerWithTextProps) {
  const lineClass = lineStyle === "gradient"
    ? "bg-gradient-to-r from-transparent to-[var(--divider-color)]"
    : "bg-[var(--divider-color)]"

  const lineClassReverse = lineStyle === "gradient"
    ? "bg-gradient-to-l from-transparent to-[var(--divider-color)]"
    : "bg-[var(--divider-color)]"

  return (
    <div
      className={cn(
        "flex items-center gap-[var(--space-4)] my-[var(--space-4)]",
        className
      )}
      role="presentation"
      {...props}
    >
      <div className={cn("flex-1 h-px", lineClass)} />
      <span className={cn(
        "text-[var(--text-sm)] text-[var(--color-muted-foreground)]",
        "uppercase tracking-wider font-medium",
        "px-2"
      )}>
        {children}
      </span>
      <div className={cn("flex-1 h-px", lineClassReverse)} />
    </div>
  )
}

export { dividerVariants }
