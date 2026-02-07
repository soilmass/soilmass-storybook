/**
 * CTA Banner Component
 *
 * Call-to-action banners for marketing sections.
 * Features:
 * - Primary and secondary buttons with premium glow
 * - Gradient background variants
 * - Centered and split layouts
 * - Icon support
 * - Full-width option
 * - Spring transitions
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

export interface CTABannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Heading text
   */
  heading: string
  /**
   * Description text
   */
  description?: string
  /**
   * Primary button text
   */
  primaryText: string
  /**
   * Primary button action
   */
  onPrimaryClick?: () => void
  /**
   * Primary button href
   */
  primaryHref?: string
  /**
   * Secondary button text
   */
  secondaryText?: string
  /**
   * Secondary button action
   */
  onSecondaryClick?: () => void
  /**
   * Secondary button href
   */
  secondaryHref?: string
  /**
   * Layout variant
   */
  layout?: "centered" | "split" | "inline"
  /**
   * Background variant
   */
  variant?: "default" | "primary" | "gradient" | "dark" | "muted"
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
  /**
   * Optional icon
   */
  icon?: React.ReactNode
  /**
   * Full width (no max-width)
   */
  fullWidth?: boolean
}

const variantClasses = {
  default: "bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-card)]",
  primary: "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] text-white shadow-[0_8px_30px_var(--color-primary)/30]",
  gradient: "bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-hover)] to-[var(--color-secondary)] text-white shadow-[0_8px_30px_var(--color-primary)/25]",
  dark: "bg-gradient-to-br from-[var(--color-surface-inverse)] to-[var(--color-surface-inverse)]/90 text-[var(--color-text-inverse)] shadow-[0_8px_30px_rgba(0,0,0,0.3)]",
  muted: "bg-gradient-to-br from-[var(--color-surface-muted)] to-[var(--color-surface)] shadow-[var(--shadow-card)]",
}

const sizeClasses = {
  sm: {
    container: "px-6 py-8",
    heading: "text-xl sm:text-2xl",
    description: "text-sm",
    buttons: "gap-3",
  },
  md: {
    container: "px-8 py-12",
    heading: "text-2xl sm:text-3xl",
    description: "text-base",
    buttons: "gap-4",
  },
  lg: {
    container: "px-10 py-16",
    heading: "text-3xl sm:text-4xl",
    description: "text-lg",
    buttons: "gap-4",
  },
}

export function CTABanner({
  heading,
  description,
  primaryText,
  onPrimaryClick,
  primaryHref,
  secondaryText,
  onSecondaryClick,
  secondaryHref,
  layout = "centered",
  variant = "default",
  size = "md",
  icon,
  fullWidth = false,
  className,
  ...props
}: CTABannerProps) {
  const variantClass = variantClasses[variant]
  const sizeClass = sizeClasses[size]
  const isLight = variant === "default" || variant === "muted"
  const hasGlow = variant === "primary" || variant === "gradient"

  const primaryButtonVariant = isLight ? "primary" : "secondary"
  const secondaryButtonVariant = isLight ? "outline" : "ghost"

  const renderButtons = () => (
    <div
      className={cn(
        "flex flex-wrap items-center",
        sizeClass.buttons,
        layout === "centered" ? "justify-center" : "justify-start"
      )}
    >
      <Button
        variant={primaryButtonVariant}
        size={size === "lg" ? "lg" : "md"}
        onClick={onPrimaryClick}
        {...(primaryHref && { as: "a", href: primaryHref })}
        className={cn(
          "transition-all duration-300 ease-[var(--ease-spring)]",
          "active:scale-[0.98]",
          !isLight && cn(
            "bg-[var(--color-surface)] text-[var(--color-text)]",
            "hover:bg-[var(--color-surface-hover)]",
            "shadow-[0_4px_15px_rgba(255,255,255,0.2)]",
            "hover:shadow-[0_6px_20px_rgba(255,255,255,0.3)]",
            "hover:-translate-y-0.5"
          ),
          isLight && hasGlow && cn(
            "shadow-[0_4px_15px_var(--color-primary)/30]",
            "hover:shadow-[0_6px_20px_var(--color-primary)/40]"
          )
        )}
      >
        {primaryText}
      </Button>
      {secondaryText && (
        <Button
          variant={secondaryButtonVariant}
          size={size === "lg" ? "lg" : "md"}
          onClick={onSecondaryClick}
          {...(secondaryHref && { as: "a", href: secondaryHref })}
          className={cn(
            "transition-all duration-300 ease-[var(--ease-spring)]",
            "active:scale-[0.98]",
            !isLight && "text-white border-white/30 hover:bg-white/10"
          )}
        >
          {secondaryText}
        </Button>
      )}
    </div>
  )

  // Split layout
  if (layout === "split") {
    return (
      <div
        className={cn(
          "rounded-[var(--radius-xl)]",
          variantClass,
          sizeClass.container,
          "transition-all duration-300 ease-[var(--ease-spring)]",
          "hover:shadow-[var(--shadow-card-hover)]",
          !fullWidth && "max-w-5xl mx-auto",
          className
        )}
        {...props}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Content */}
          <div className="flex-1">
            {icon && (
              <div
                className={cn(
                  "mb-4 text-current opacity-80",
                  "transition-transform duration-300 ease-[var(--ease-spring)]",
                  "hover:scale-110"
                )}
              >
                {icon}
              </div>
            )}
            <h2
              className={cn(
                "font-bold",
                sizeClass.heading,
                isLight ? "text-[var(--color-text)]" : "text-current"
              )}
            >
              {heading}
            </h2>
            {description && (
              <p
                className={cn(
                  "mt-2",
                  sizeClass.description,
                  isLight ? "text-[var(--color-text-muted)]" : "text-current/80"
                )}
              >
                {description}
              </p>
            )}
          </div>

          {/* Buttons */}
          {renderButtons()}
        </div>
      </div>
    )
  }

  // Inline layout
  if (layout === "inline") {
    return (
      <div
        className={cn(
          "rounded-[var(--radius-lg)]",
          variantClass,
          "px-6 py-4",
          "transition-all duration-300 ease-[var(--ease-spring)]",
          "hover:shadow-[var(--shadow-card-hover)]",
          !fullWidth && "max-w-4xl mx-auto",
          className
        )}
        {...props}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {icon && (
              <span className="text-current opacity-80">{icon}</span>
            )}
            <p
              className={cn(
                "font-medium",
                isLight ? "text-[var(--color-text)]" : "text-current"
              )}
            >
              {heading}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {secondaryText && (
              <Button
                variant={secondaryButtonVariant}
                size="sm"
                onClick={onSecondaryClick}
                {...(secondaryHref && { as: "a", href: secondaryHref })}
                className={cn(
                  "transition-all duration-300 ease-[var(--ease-spring)]",
                  "active:scale-[0.98]",
                  !isLight && "text-white border-white/30 hover:bg-white/10"
                )}
              >
                {secondaryText}
              </Button>
            )}
            <Button
              variant={primaryButtonVariant}
              size="sm"
              onClick={onPrimaryClick}
              {...(primaryHref && { as: "a", href: primaryHref })}
              className={cn(
                "transition-all duration-300 ease-[var(--ease-spring)]",
                "active:scale-[0.98]",
                !isLight && cn(
                  "bg-[var(--color-surface)] text-[var(--color-text)]",
                  "hover:bg-[var(--color-surface-hover)]"
                )
              )}
            >
              {primaryText}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Centered layout (default)
  return (
    <div
      className={cn(
        "rounded-[var(--radius-xl)] text-center",
        variantClass,
        sizeClass.container,
        "transition-all duration-300 ease-[var(--ease-spring)]",
        "hover:shadow-[var(--shadow-card-hover)]",
        !fullWidth && "max-w-3xl mx-auto",
        className
      )}
      {...props}
    >
      {icon && (
        <div
          className={cn(
            "mb-6 flex justify-center text-current opacity-80",
            "transition-transform duration-300 ease-[var(--ease-spring)]"
          )}
        >
          <div className="hover:scale-110 transition-transform duration-300 ease-[var(--ease-spring)]">
            {icon}
          </div>
        </div>
      )}
      <h2
        className={cn(
          "font-bold",
          sizeClass.heading,
          isLight ? "text-[var(--color-text)]" : "text-current"
        )}
      >
        {heading}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-xl mx-auto",
            sizeClass.description,
            isLight ? "text-[var(--color-text-muted)]" : "text-current/80"
          )}
        >
          {description}
        </p>
      )}
      <div className="mt-8">{renderButtons()}</div>
    </div>
  )
}

// Simple CTA with just text and button
export interface SimpleCTAProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Text content
   */
  text: string
  /**
   * Button text
   */
  buttonText: string
  /**
   * Button action
   */
  onClick?: () => void
  /**
   * Button href
   */
  href?: string
}

export function SimpleCTA({
  text,
  buttonText,
  onClick,
  href,
  className,
  ...props
}: SimpleCTAProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-center gap-4",
        "p-6 rounded-[var(--radius-lg)]",
        "bg-gradient-to-br from-[var(--color-surface-muted)] to-[var(--color-surface)]",
        "shadow-[var(--shadow-card)]",
        "transition-all duration-300 ease-[var(--ease-spring)]",
        "hover:shadow-[var(--shadow-card-hover)]",
        className
      )}
      {...props}
    >
      <p className="text-[var(--color-text)] font-medium text-center sm:text-left">
        {text}
      </p>
      <Button
        onClick={onClick}
        className={cn(
          "transition-all duration-300 ease-[var(--ease-spring)]",
          "shadow-[0_4px_15px_var(--color-primary)/30]",
          "hover:shadow-[0_6px_20px_var(--color-primary)/40]",
          "hover:-translate-y-0.5",
          "active:scale-[0.98]"
        )}
        {...(href && { as: "a", href })}
      >
        {buttonText}
      </Button>
    </div>
  )
}

// Full-width CTA section
export interface CTASectionProps extends CTABannerProps {
  /**
   * Background image URL
   */
  backgroundImage?: string
  /**
   * Overlay opacity (0-1)
   */
  overlayOpacity?: number
}

export function CTASection({
  backgroundImage,
  overlayOpacity = 0.5,
  className,
  ...props
}: CTASectionProps) {
  return (
    <section
      className={cn(
        "relative py-20",
        !backgroundImage && "bg-gradient-to-br from-[var(--color-surface-muted)] to-[var(--color-surface)]",
        className
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CTABanner {...props} fullWidth />
      </div>
    </section>
  )
}
