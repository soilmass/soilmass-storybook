/**
 * Pricing Section Component
 *
 * Based on Marketing Site Profile requirements (Domain 73)
 * Displays pricing tiers with features and CTAs.
 *
 * Features:
 * - Card shadows with hover effects
 * - Popular badge with glow
 * - Spring transitions
 *
 * Tokens consumed:
 * - Typography: --text-3xl, --text-4xl, --font-bold
 * - Spacing: --space-4, --space-6, --space-8, --space-24
 * - Colors: --color-foreground, --color-muted-foreground, --color-primary
 */

"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Link } from "@/components/ui/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Check icon
const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-[var(--color-success)]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

interface PricingFeature {
  text: string
  included: boolean
}

interface PricingTier {
  name: string
  description: string
  price: string | number
  period?: string
  features: (string | PricingFeature)[]
  cta: {
    label: string
    href: string
  }
  highlighted?: boolean
  badge?: string
}

export interface PricingSectionProps {
  /**
   * Section id for anchor links
   */
  id?: string
  /**
   * Section headline
   */
  headline?: string
  /**
   * Section description
   */
  description?: string
  /**
   * Pricing tiers to display
   */
  tiers: PricingTier[]
  /**
   * Additional className
   */
  className?: string
}

/**
 * Pricing section for marketing pages.
 * Features card shadows, popular badge glow, and spring animations.
 *
 * @example
 * <PricingSection
 *   headline="Simple, transparent pricing"
 *   tiers={[
 *     { name: "Free", price: 0, features: ["Feature 1"], cta: { label: "Get Started", href: "/" } },
 *     { name: "Pro", price: 29, features: ["Feature 1", "Feature 2"], cta: { label: "Start Trial", href: "/" }, highlighted: true },
 *   ]}
 * />
 */
export function PricingSection({
  id,
  headline,
  description,
  tiers,
  className,
}: PricingSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Intersection Observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "px-[var(--space-6)] py-[var(--space-24)]",
        "border-t border-[var(--color-border)]",
        className
      )}
    >
      <div className="max-w-[var(--container-xl)] mx-auto">
        {/* Header */}
        {(headline || description) && (
          <div
            className={cn(
              "text-center mb-[var(--space-16)]",
              "transition-all duration-700 ease-out",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            {headline && (
              <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-foreground)]">
                {headline}
              </h2>
            )}
            {description && (
              <p className="mt-[var(--space-4)] text-[var(--color-muted-foreground)] max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Pricing Grid */}
        <div
          className={cn(
            "grid gap-[var(--space-8)]",
            tiers.length === 2 && "md:grid-cols-2 max-w-4xl mx-auto",
            tiers.length === 3 && "md:grid-cols-3",
            tiers.length >= 4 && "md:grid-cols-2 lg:grid-cols-4"
          )}
        >
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={cn(
                "transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              )}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
            >
              <PricingCard tier={tier} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingCard({ tier }: { tier: PricingTier }) {
  const formatPrice = (price: string | number) => {
    if (typeof price === "string") return price
    if (price === 0) return "Free"
    return `$${price}`
  }

  return (
    <div
      className={cn(
        "group relative flex flex-col",
        "p-[var(--space-8)]",
        "bg-[var(--color-surface)]",
        "border border-[var(--color-border)]",
        "rounded-[var(--radius-xl)]",
        "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        "hover:shadow-[var(--shadow-lg)]",
        "hover:-translate-y-1",
        tier.highlighted && [
          "border-[var(--color-primary)]",
          "shadow-[var(--shadow-xl)]",
          "scale-[1.02]",
          // Glow effect for highlighted card
          "before:absolute before:inset-0 before:-z-10",
          "before:rounded-[var(--radius-xl)]",
          "before:bg-[var(--color-primary)]/20",
          "before:blur-xl before:opacity-50",
        ]
      )}
    >
      {/* Badge with glow effect */}
      {tier.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge
            variant="default"
            rounded="full"
            className="
              shadow-[0_0_20px_var(--color-primary)/40]
              animate-[pulse_3s_ease-in-out_infinite]
            "
          >
            {tier.badge}
          </Badge>
        </div>
      )}

      {/* Tier Name */}
      <h3 className="text-[var(--text-xl)] font-[var(--font-semibold)] text-[var(--color-foreground)]">
        {tier.name}
      </h3>

      {/* Description */}
      <p className="mt-[var(--space-2)] text-[var(--text-sm)] text-[var(--color-muted-foreground)]">
        {tier.description}
      </p>

      {/* Price */}
      <div className="mt-[var(--space-6)]">
        <span className="text-[var(--text-4xl)] font-[var(--font-bold)] text-[var(--color-foreground)]">
          {formatPrice(tier.price)}
        </span>
        {tier.period && (
          <span className="text-[var(--color-muted-foreground)]">
            /{tier.period}
          </span>
        )}
      </div>

      {/* CTA with hover effects */}
      <div className="mt-[var(--space-6)]">
        <Button
          asChild
          variant={tier.highlighted ? "primary" : "outline"}
          className={cn(
            "w-full justify-center",
            "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            "hover:scale-[1.02] active:scale-[0.98]",
            tier.highlighted && "shadow-[0_0_20px_var(--color-primary)/30] hover:shadow-[0_0_30px_var(--color-primary)/50]"
          )}
        >
          <Link href={tier.cta.href} variant="nav" className="no-underline">
            {tier.cta.label}
          </Link>
        </Button>
      </div>

      {/* Features */}
      <ul className="mt-[var(--space-8)] space-y-[var(--space-3)] flex-1">
        {tier.features.map((feature, index) => {
          const text = typeof feature === "string" ? feature : feature.text
          const included =
            typeof feature === "string" ? true : feature.included

          return (
            <li
              key={index}
              className={cn(
                "flex items-start gap-[var(--space-3)]",
                "transition-opacity duration-200",
                !included && "opacity-50"
              )}
            >
              <span
                className="
                  transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                  group-hover:scale-110
                "
              >
                <CheckIcon />
              </span>
              <span className="text-[var(--text-sm)] text-[var(--color-foreground)]">
                {text}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
