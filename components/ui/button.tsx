/**
 * Button Component
 *
 * Spec: domains/components/051-buttons.yaml
 *
 * Rules from spec:
 * - B1: Buttons MUST have min-height 44px for touch targets
 * - B2: Primary actions use --color-primary
 * - B3: Destructive actions use --color-error
 * - B4: Disabled state reduces opacity and removes pointer events
 * - B5: Loading state shows spinner and disables interaction
 *
 * Tokens consumed:
 * - --color-primary, --color-primary-foreground, --color-primary-hover
 * - --color-secondary, --color-secondary-foreground, --color-secondary-hover
 * - --color-error, --color-error-foreground
 * - --radius-md
 * - --font-medium
 * - --duration-normal, --ease-default
 */

import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base styles - Premium edition with micro-interactions
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium",
    "rounded-[var(--radius-md)]",
    "select-none",
    // Smooth transitions for all properties
    "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
    // Premium focus ring
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2",
    // Disabled state
    "disabled:pointer-events-none disabled:opacity-50",
    // Touch target: min 44px height (WCAG 2.1 AAA)
    "min-h-[44px]",
    // Subtle press animation
    "active:scale-[0.98]",
  ],
  {
    variants: {
      variant: {
        // Primary - Gradient with colored shadow (Linear-inspired)
        primary: [
          "bg-[image:var(--gradient-primary)] text-white",
          "shadow-[var(--shadow-primary-sm)]",
          "hover:shadow-[var(--shadow-primary-md)]",
          "hover:brightness-110",
          "active:shadow-[var(--shadow-primary-sm)]",
          "active:brightness-95",
        ],
        // Secondary - Subtle with refined hover
        secondary: [
          "bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)]",
          "border border-[var(--color-border)]",
          "shadow-[var(--shadow-xs)]",
          "hover:bg-[var(--color-secondary-hover)]",
          "hover:border-[var(--color-border-hover)]",
          "hover:shadow-[var(--shadow-sm)]",
        ],
        // Outline - Clean with hover fill
        outline: [
          "border border-[var(--color-border)] bg-transparent",
          "text-[var(--color-foreground)]",
          "hover:bg-[var(--color-surface-hover)]",
          "hover:border-[var(--color-border-hover)]",
          "hover:shadow-[var(--shadow-sm)]",
        ],
        // Ghost - Minimal with subtle hover
        ghost: [
          "bg-transparent text-[var(--color-foreground)]",
          "hover:bg-[var(--color-surface-hover)]",
        ],
        // Destructive - Gradient red with glow
        destructive: [
          "bg-[image:var(--gradient-error)] text-white",
          "shadow-[var(--shadow-error-sm)]",
          "hover:shadow-[0_4px_12px_-2px_rgb(239_68_68_/_0.25)]",
          "hover:brightness-110",
          "active:brightness-95",
        ],
        // Link - Animated underline
        link: [
          "text-[var(--color-primary)]",
          "underline-offset-4 decoration-[var(--color-primary)]/30",
          "hover:decoration-[var(--color-primary)]",
          "hover:underline",
          "min-h-0",
          "active:scale-100", // Override scale for links
        ],
        // Premium - Accent gradient with glow (new)
        premium: [
          "bg-[image:var(--gradient-accent)] text-white",
          "shadow-[var(--shadow-accent-sm)]",
          "hover:shadow-[var(--shadow-accent-md)]",
          "hover:brightness-110",
          "active:brightness-95",
        ],
      },
      size: {
        sm: "h-9 px-3 text-sm rounded-[var(--radius-sm)]",
        md: "h-11 px-5 text-base",
        lg: "h-12 px-6 text-lg rounded-[var(--radius-lg)]",
        xl: "h-14 px-8 text-lg rounded-[var(--radius-lg)]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Render as a different element using Radix Slot.
   * Useful for rendering as links: <Button asChild><Link href="/">Home</Link></Button>
   */
  asChild?: boolean
}

/**
 * Button component following Domain 51 specification.
 *
 * @example
 * // Primary button (default)
 * <Button>Click me</Button>
 *
 * @example
 * // Secondary button
 * <Button variant="secondary">Cancel</Button>
 *
 * @example
 * // As a link
 * <Button asChild>
 *   <Link href="/about">Learn more</Link>
 * </Button>
 */
export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { buttonVariants }
