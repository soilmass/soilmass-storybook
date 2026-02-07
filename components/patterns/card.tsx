/**
 * Card Component
 *
 * Spec: domains/components/060-cards.yaml
 *
 * Rules from spec:
 * - CRD1: Interactive cards MUST be keyboard accessible
 * - CRD2: Card links MUST use proper semantic structure
 * - CRD3: Card hover effects MUST only apply on pointer devices
 *
 * Tokens consumed:
 * - --color-surface, --color-border
 * - --space-4, --space-6
 * - --shadow-sm, --shadow-md, --shadow-lg
 * - --radius-lg, --radius-xl
 * - --duration-fast, --ease-out
 */

import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  // Base styles - Premium edition with refined depth
  [
    "relative flex flex-col",
    "bg-[var(--color-surface)]",
    "rounded-[var(--radius-lg)]",
    "overflow-hidden",
    // Smooth transitions
    "transition-all duration-[var(--duration-moderate)] ease-[var(--ease-spring)]",
  ],
  {
    variants: {
      variant: {
        // Default - clean minimal
        default: [
          "bg-[var(--color-surface)]",
        ],
        // Bordered - subtle border with shadow
        bordered: [
          "border border-[var(--color-border)]",
          "shadow-[var(--shadow-xs)]",
        ],
        // Elevated - floating card effect (Linear-inspired)
        elevated: [
          "shadow-[var(--shadow-md)]",
          "border border-[var(--color-border-subtle)]",
        ],
        // Glass - frosted glass effect (Raycast-inspired)
        glass: [
          "bg-[var(--glass-bg)]",
          "backdrop-blur-[var(--blur-lg)]",
          "border border-[var(--glass-border)]",
          "shadow-[var(--shadow-glass)]",
        ],
        // Gradient - subtle gradient background
        gradient: [
          "bg-gradient-to-br from-white via-white to-[var(--color-surface-alt)]",
          "border border-[var(--color-border)]",
          "shadow-[var(--shadow-sm)]",
        ],
        // Outlined - prominent border, no fill
        outlined: [
          "bg-transparent",
          "border-2 border-[var(--color-border)]",
        ],
      },
      interactive: {
        true: [
          "cursor-pointer",
          // Only apply hover effects on pointer devices (Rule CRD3)
          "[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[var(--shadow-lg)]",
          "[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1",
          "[@media(hover:hover)_and_(pointer:fine)]:hover:border-[var(--color-border-hover)]",
          // Active state
          "active:scale-[0.99]",
          "active:shadow-[var(--shadow-md)]",
          // Focus
          "focus-visible:outline-none",
          "focus-visible:ring-[3px] focus-visible:ring-[var(--color-focus-ring)]",
          "focus-visible:ring-offset-2",
        ],
        false: "",
      },
      padding: {
        none: "",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "bordered",
      interactive: false,
      padding: "none",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /**
   * Render as a different element (e.g., article, section)
   */
  as?: "div" | "article" | "section"
}

/**
 * Card container component following Domain 60 specification.
 *
 * @example
 * // Basic card
 * <Card>
 *   <CardBody>Content here</CardBody>
 * </Card>
 *
 * @example
 * // Elevated interactive card
 * <Card variant="elevated" interactive>
 *   <CardBody>Clickable content</CardBody>
 * </Card>
 */
export function Card({
  className,
  variant,
  interactive,
  padding,
  as: Component = "div",
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(cardVariants({ variant, interactive, padding }), className)}
      {...props}
    />
  )
}

/**
 * Card Header - optional top section with border
 */
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn(
        "p-[var(--space-4)] border-b border-[var(--color-border)]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Card Body - main content area
 */
export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardBody({ className, ...props }: CardBodyProps) {
  return (
    <div
      className={cn("p-[var(--space-4)] flex-1", className)}
      {...props}
    />
  )
}

/**
 * Card Footer - optional bottom section with border
 */
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn(
        "p-[var(--space-4)] border-t border-[var(--color-border)]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Card Image - full-width image at top of card
 */
export interface CardImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {}

export function CardImage({ className, alt = "", ...props }: CardImageProps) {
  return (
    <img
      className={cn(
        "w-full aspect-[var(--aspect-video)] object-cover",
        className
      )}
      alt={alt}
      {...props}
    />
  )
}

/**
 * Card Title - heading within card
 */
export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3" | "h4"
}

export function CardTitle({
  className,
  as: Component = "h3",
  ...props
}: CardTitleProps) {
  return (
    <Component
      className={cn(
        "text-[var(--text-lg)] font-[var(--font-semibold)] text-[var(--color-foreground)] mb-[var(--space-2)]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Card Description - body text within card
 */
export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p
      className={cn(
        "text-[var(--text-base)] text-[var(--color-muted-foreground)] leading-[var(--leading-relaxed)]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Card Link - stretched link pattern for making entire card clickable
 * The link spans the entire card while allowing other interactive elements
 * to remain clickable (Rule CRD2)
 */
export interface CardLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export function CardLink({ className, ...props }: CardLinkProps) {
  return (
    <a
      className={cn(
        // Static positioning, but ::after covers the card
        "static",
        "after:content-[''] after:absolute after:inset-0 after:z-[1]",
        className
      )}
      {...props}
    />
  )
}

export { cardVariants }
