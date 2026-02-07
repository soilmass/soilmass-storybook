/**
 * Feature Card Component
 *
 * Showcase product features.
 * Features:
 * - Icon support with glow effect
 * - Title and description
 * - Optional link
 * - Horizontal and vertical layouts
 * - Size variants
 * - Premium hover effects with shadow lift
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Arrow icon for links
const ArrowRightIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Feature icon
   */
  icon?: React.ReactNode
  /**
   * Feature title
   */
  title: string
  /**
   * Feature description
   */
  description?: string
  /**
   * Link text
   */
  linkText?: string
  /**
   * Link URL
   */
  linkHref?: string
  /**
   * Link click handler
   */
  onLinkClick?: () => void
  /**
   * Layout orientation
   */
  orientation?: "vertical" | "horizontal"
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
  /**
   * Card variant
   */
  variant?: "default" | "bordered" | "filled" | "ghost"
  /**
   * Icon position (for horizontal layout)
   */
  iconPosition?: "left" | "right"
  /**
   * Center content
   */
  centered?: boolean
}

const sizeClasses = {
  sm: {
    card: "p-4",
    icon: "h-8 w-8",
    iconWrapper: "h-10 w-10",
    title: "text-base",
    description: "text-sm",
    gap: "gap-3",
  },
  md: {
    card: "p-6",
    icon: "h-10 w-10",
    iconWrapper: "h-12 w-12",
    title: "text-lg",
    description: "text-sm",
    gap: "gap-4",
  },
  lg: {
    card: "p-8",
    icon: "h-12 w-12",
    iconWrapper: "h-16 w-16",
    title: "text-xl",
    description: "text-base",
    gap: "gap-5",
  },
}

const variantClasses = {
  default: "bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-card)]",
  bordered: "border-2 border-[var(--color-border)]",
  filled: "bg-[var(--color-surface-muted)]",
  ghost: "",
}

export function FeatureCard({
  icon,
  title,
  description,
  linkText,
  linkHref,
  onLinkClick,
  orientation = "vertical",
  size = "md",
  variant = "default",
  iconPosition = "left",
  centered = false,
  className,
  ...props
}: FeatureCardProps) {
  const sizeClass = sizeClasses[size]

  const content = (
    <>
      {/* Icon with glow effect */}
      {icon && (
        <div
          className={cn(
            "flex-shrink-0 flex items-center justify-center",
            "rounded-[var(--radius-lg)]",
            "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
            "shadow-[0_0_20px_var(--color-primary)/15]",
            "transition-all duration-300 ease-[var(--ease-spring)]",
            "group-hover:shadow-[0_0_30px_var(--color-primary)/25]",
            "group-hover:bg-[var(--color-primary)]/15",
            sizeClass.iconWrapper
          )}
        >
          <div className={sizeClass.icon}>{icon}</div>
        </div>
      )}

      {/* Text content */}
      <div className={cn("flex-1 min-w-0", centered && "text-center")}>
        <h3
          className={cn(
            "font-semibold text-[var(--color-text)]",
            sizeClass.title
          )}
        >
          {title}
        </h3>
        {description && (
          <p
            className={cn(
              "mt-2 text-[var(--color-text-muted)]",
              sizeClass.description
            )}
          >
            {description}
          </p>
        )}
        {(linkText || linkHref) && (
          <a
            href={linkHref}
            onClick={onLinkClick}
            className={cn(
              "inline-flex items-center gap-1 mt-3",
              "text-sm font-medium",
              "text-[var(--color-primary)]",
              "hover:text-[var(--color-primary-hover)]",
              "transition-all duration-200 ease-[var(--ease-spring)] group/link"
            )}
          >
            {linkText || "Learn more"}
            <span className="transition-transform duration-200 ease-[var(--ease-spring)] group-hover/link:translate-x-1">
              <ArrowRightIcon />
            </span>
          </a>
        )}
      </div>
    </>
  )

  return (
    <div
      className={cn(
        "group rounded-[var(--radius-lg)]",
        variantClasses[variant],
        sizeClass.card,
        // Premium hover effects
        "transition-all duration-300 ease-[var(--ease-spring)]",
        variant === "default" && "hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1",
        variant !== "ghost" && "active:scale-[0.98]",
        orientation === "horizontal"
          ? cn(
              "flex items-start",
              sizeClass.gap,
              iconPosition === "right" && "flex-row-reverse"
            )
          : cn(
              "flex flex-col",
              sizeClass.gap,
              centered && "items-center"
            ),
        className
      )}
      {...props}
    >
      {content}
    </div>
  )
}

// Feature grid
export interface FeatureGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns
   */
  columns?: 2 | 3 | 4
}

export function FeatureGrid({
  columns = 3,
  className,
  children,
  ...props
}: FeatureGridProps) {
  const colClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div
      className={cn("grid gap-6", colClasses[columns], className)}
      {...props}
    >
      {children}
    </div>
  )
}

// Icon feature (minimal, icon-focused)
export interface IconFeatureProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Icon
   */
  icon: React.ReactNode
  /**
   * Title
   */
  title: string
  /**
   * Description
   */
  description?: string
  /**
   * Icon color variant
   */
  iconVariant?: "primary" | "success" | "warning" | "error"
}

const iconVariantClasses = {
  primary: "bg-[var(--color-primary)]/10 text-[var(--color-primary)] shadow-[0_0_15px_var(--color-primary)/15]",
  success: "bg-[var(--color-success)]/10 text-[var(--color-success)] shadow-[0_0_15px_var(--color-success)/15]",
  warning: "bg-[var(--color-warning)]/10 text-[var(--color-warning)] shadow-[0_0_15px_var(--color-warning)/15]",
  error: "bg-[var(--color-error)]/10 text-[var(--color-error)] shadow-[0_0_15px_var(--color-error)/15]",
}

export function IconFeature({
  icon,
  title,
  description,
  iconVariant = "primary",
  className,
  ...props
}: IconFeatureProps) {
  return (
    <div className={cn("group flex items-start gap-4", className)} {...props}>
      <div
        className={cn(
          "flex-shrink-0 flex items-center justify-center",
          "h-10 w-10 rounded-[var(--radius-md)]",
          "transition-all duration-300 ease-[var(--ease-spring)]",
          "group-hover:scale-110",
          iconVariantClasses[iconVariant]
        )}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-[var(--color-text)]">{title}</h4>
        {description && (
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

// Large feature (for hero sections)
export interface LargeFeatureProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Icon
   */
  icon?: React.ReactNode
  /**
   * Title
   */
  title: string
  /**
   * Description
   */
  description: string
  /**
   * Image URL
   */
  image?: string
  /**
   * Image alt text
   */
  imageAlt?: string
  /**
   * Image position
   */
  imagePosition?: "left" | "right"
}

export function LargeFeature({
  icon,
  title,
  description,
  image,
  imageAlt,
  imagePosition = "right",
  className,
  ...props
}: LargeFeatureProps) {
  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row items-center gap-8 lg:gap-12",
        imagePosition === "left" && "lg:flex-row-reverse",
        className
      )}
      {...props}
    >
      {/* Content */}
      <div className="flex-1 min-w-0">
        {icon && (
          <div
            className={cn(
              "inline-flex items-center justify-center",
              "h-14 w-14 rounded-[var(--radius-lg)] mb-6",
              "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
              "shadow-[0_0_25px_var(--color-primary)/20]"
            )}
          >
            {icon}
          </div>
        )}
        <h2 className="text-3xl font-bold text-[var(--color-text)]">{title}</h2>
        <p className="mt-4 text-lg text-[var(--color-text-muted)]">
          {description}
        </p>
      </div>

      {/* Image */}
      {image && (
        <div className="flex-1 group">
          <img
            src={image}
            alt={imageAlt || title}
            className={cn(
              "rounded-[var(--radius-xl)]",
              "shadow-[var(--shadow-card)]",
              "transition-all duration-500 ease-[var(--ease-spring)]",
              "group-hover:shadow-[var(--shadow-card-hover)]",
              "group-hover:-translate-y-2"
            )}
          />
        </div>
      )}
    </div>
  )
}
