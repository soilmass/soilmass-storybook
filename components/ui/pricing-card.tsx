/**
 * Pricing Card Component
 *
 * Display pricing plans and tiers.
 * Features:
 * - Plan name and description
 * - Price with billing period
 * - Feature list (included/excluded)
 * - Premium CTA button with glow
 * - Popular/recommended badge with glow
 * - Annual/monthly toggle support
 * - Hover lift and shadow effects
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

// Icons
const CheckIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const XIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export interface PricingFeature {
  /**
   * Feature text
   */
  text: string
  /**
   * Whether feature is included
   */
  included?: boolean
  /**
   * Additional info/tooltip
   */
  info?: string
}

export interface PricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Plan name
   */
  name: string
  /**
   * Plan description
   */
  description?: string
  /**
   * Price amount
   */
  price: number | string
  /**
   * Currency symbol
   */
  currency?: string
  /**
   * Billing period (e.g., "month", "year")
   */
  period?: string
  /**
   * Features list
   */
  features: (string | PricingFeature)[]
  /**
   * CTA button text
   */
  ctaText?: string
  /**
   * CTA click handler
   */
  onCtaClick?: () => void
  /**
   * CTA link href
   */
  ctaHref?: string
  /**
   * Mark as popular/recommended
   */
  popular?: boolean
  /**
   * Popular badge text
   */
  popularText?: string
  /**
   * Highlight this card
   */
  highlighted?: boolean
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
  /**
   * Original price (for showing discount)
   */
  originalPrice?: number | string
}

const sizeClasses = {
  sm: {
    card: "p-4",
    name: "text-lg",
    price: "text-3xl",
    period: "text-sm",
    feature: "text-sm",
  },
  md: {
    card: "p-6",
    name: "text-xl",
    price: "text-4xl",
    period: "text-sm",
    feature: "text-sm",
  },
  lg: {
    card: "p-8",
    name: "text-2xl",
    price: "text-5xl",
    period: "text-base",
    feature: "text-base",
  },
}

export function PricingCard({
  name,
  description,
  price,
  currency = "$",
  period = "month",
  features,
  ctaText = "Get started",
  onCtaClick,
  ctaHref,
  popular = false,
  popularText = "Most popular",
  highlighted = false,
  size = "md",
  originalPrice,
  className,
  ...props
}: PricingCardProps) {
  const sizeClass = sizeClasses[size]
  const isHighlighted = highlighted || popular

  const normalizedFeatures: PricingFeature[] = features.map((f) =>
    typeof f === "string" ? { text: f, included: true } : f
  )

  return (
    <div
      className={cn(
        "group relative rounded-[var(--radius-xl)]",
        "border bg-[var(--color-surface)]",
        "flex flex-col",
        "transition-all duration-300 ease-[var(--ease-spring)]",
        isHighlighted
          ? cn(
              "border-[var(--color-primary)] border-2",
              "shadow-[0_0_30px_var(--color-primary)/20]",
              "hover:shadow-[0_0_40px_var(--color-primary)/30]",
              "hover:-translate-y-2"
            )
          : cn(
              "border-[var(--color-border)]",
              "shadow-[var(--shadow-card)]",
              "hover:shadow-[var(--shadow-card-hover)]",
              "hover:-translate-y-1"
            ),
        "active:scale-[0.98]",
        sizeClass.card,
        className
      )}
      {...props}
    >
      {/* Popular badge with glow */}
      {popular && (
        <div
          className={cn(
            "absolute -top-3 left-1/2 -translate-x-1/2",
            "px-4 py-1.5 rounded-full",
            "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-hover)]",
            "text-white text-xs font-semibold",
            "shadow-[0_4px_15px_var(--color-primary)/40]"
          )}
        >
          {popularText}
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3
          className={cn(
            "font-bold text-[var(--color-text)]",
            sizeClass.name
          )}
        >
          {name}
        </h3>
        {description && (
          <p className="mt-1 text-[var(--color-text-muted)] text-sm">
            {description}
          </p>
        )}
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-[var(--color-text-muted)] text-lg">
            {currency}
          </span>
          <span
            className={cn(
              "font-bold text-[var(--color-text)]",
              sizeClass.price
            )}
          >
            {price}
          </span>
          {period && (
            <span
              className={cn(
                "text-[var(--color-text-muted)]",
                sizeClass.period
              )}
            >
              /{period}
            </span>
          )}
        </div>
        {originalPrice && (
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            <span className="line-through">
              {currency}{originalPrice}
            </span>
            <span className="ml-2 text-[var(--color-success)] font-medium">
              Save {Math.round((1 - Number(price) / Number(originalPrice)) * 100)}%
            </span>
          </p>
        )}
      </div>

      {/* Premium CTA Button */}
      <Button
        variant={isHighlighted ? "primary" : "outline"}
        className={cn(
          "w-full mb-6",
          "transition-all duration-300 ease-[var(--ease-spring)]",
          isHighlighted && cn(
            "shadow-[0_4px_15px_var(--color-primary)/30]",
            "hover:shadow-[0_6px_20px_var(--color-primary)/40]",
            "hover:-translate-y-0.5"
          ),
          "active:scale-[0.98]"
        )}
        onClick={onCtaClick}
        {...(ctaHref && { as: "a", href: ctaHref })}
      >
        {ctaText}
      </Button>

      {/* Features */}
      <ul className="space-y-3 flex-1">
        {normalizedFeatures.map((feature, index) => (
          <li
            key={index}
            className={cn(
              "flex items-start gap-3",
              sizeClass.feature
            )}
          >
            <span
              className={cn(
                "flex-shrink-0 mt-0.5",
                "transition-transform duration-200 ease-[var(--ease-spring)]",
                "group-hover:scale-110",
                feature.included !== false
                  ? "text-[var(--color-success)]"
                  : "text-[var(--color-text-muted)]"
              )}
            >
              {feature.included !== false ? <CheckIcon /> : <XIcon />}
            </span>
            <span
              className={cn(
                feature.included !== false
                  ? "text-[var(--color-text)]"
                  : "text-[var(--color-text-muted)]"
              )}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Pricing grid
export interface PricingGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns
   */
  columns?: 2 | 3 | 4
}

export function PricingGrid({
  columns = 3,
  className,
  children,
  ...props
}: PricingGridProps) {
  const colClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div
      className={cn(
        "grid gap-6 items-stretch",
        colClasses[columns],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Billing toggle
export interface BillingToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Current billing period
   */
  value: "monthly" | "annual"
  /**
   * Callback when billing period changes
   */
  onChange: (value: "monthly" | "annual") => void
  /**
   * Monthly label
   */
  monthlyLabel?: string
  /**
   * Annual label
   */
  annualLabel?: string
  /**
   * Discount badge text
   */
  discountText?: string
}

export function BillingToggle({
  value,
  onChange,
  monthlyLabel = "Monthly",
  annualLabel = "Annual",
  discountText = "Save 20%",
  className,
  ...props
}: BillingToggleProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3",
        "p-1 rounded-full",
        "bg-[var(--color-surface-muted)]",
        "shadow-[var(--shadow-card)]",
        className
      )}
      {...props}
    >
      <button
        type="button"
        onClick={() => onChange("monthly")}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium",
          "transition-all duration-300 ease-[var(--ease-spring)]",
          "active:scale-[0.98]",
          value === "monthly"
            ? "bg-[var(--color-surface)] text-[var(--color-text)] shadow-sm"
            : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
        )}
      >
        {monthlyLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange("annual")}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium",
          "transition-all duration-300 ease-[var(--ease-spring)] flex items-center gap-2",
          "active:scale-[0.98]",
          value === "annual"
            ? "bg-[var(--color-surface)] text-[var(--color-text)] shadow-sm"
            : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
        )}
      >
        {annualLabel}
        {discountText && (
          <span
            className={cn(
              "px-2 py-0.5 rounded-full text-xs font-semibold",
              "bg-[var(--color-success)]/10 text-[var(--color-success)]"
            )}
          >
            {discountText}
          </span>
        )}
      </button>
    </div>
  )
}
