/**
 * Features Section Component
 *
 * Based on Marketing Site Profile requirements (Domain 72)
 * Displays product features in a grid layout with premium animations.
 *
 * Features:
 * - Feature cards with hover shadows and glow
 * - Staggered entrance animations
 * - Smooth spring transitions
 *
 * Tokens consumed:
 * - Typography: --text-3xl, --font-bold, --font-semibold
 * - Spacing: --space-4, --space-6, --space-8, --space-16, --space-24
 * - Colors: --color-foreground, --color-muted-foreground, --color-primary
 */

"use client"

import { useEffect, useRef, useState } from "react"
import {
  Card,
  CardBody,
  CardTitle,
  CardDescription,
} from "@/components/patterns/card"
import { cn } from "@/lib/utils"

interface Feature {
  title: string
  description: string
  icon?: React.ReactNode
}

export interface FeaturesSectionProps {
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
   * Features to display
   */
  features: Feature[]
  /**
   * Number of columns in the grid
   */
  columns?: 2 | 3 | 4
  /**
   * Additional className
   */
  className?: string
}

/**
 * Features section for marketing pages.
 * Features staggered card animations and hover effects.
 *
 * @example
 * <FeaturesSection
 *   headline="Everything you need"
 *   features={[
 *     { title: "Fast", description: "Built for speed" },
 *     { title: "Secure", description: "Enterprise ready" },
 *   ]}
 * />
 */
export function FeaturesSection({
  id,
  headline,
  description,
  features,
  columns = 3,
  className,
}: FeaturesSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Intersection Observer for staggered entrance animation
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

  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  }

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

        {/* Features Grid with staggered animation */}
        <div className={cn("grid gap-[var(--space-8)]", gridCols[columns])}>
          {features.map((feature, index) => (
            <div
              key={feature.title}
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
              <FeatureCard feature={feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Individual feature card with hover effects
 */
function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <Card
      variant="bordered"
      className="
        group relative
        transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        hover:shadow-[var(--shadow-lg)]
        hover:-translate-y-1
        hover:border-[var(--color-primary)]/30
      "
    >
      {/* Subtle glow effect on hover */}
      <div
        className="
          absolute inset-0 -z-10 rounded-[inherit]
          bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
        "
      />

      <CardBody>
        {feature.icon && (
          <div
            className="
              mb-[var(--space-4)] text-[var(--color-primary)]
              transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
              group-hover:scale-110
            "
          >
            {feature.icon}
          </div>
        )}
        <CardTitle className="transition-colors duration-200 group-hover:text-[var(--color-primary)]">
          {feature.title}
        </CardTitle>
        <CardDescription>{feature.description}</CardDescription>
      </CardBody>
    </Card>
  )
}

/**
 * Simple feature icon wrapper with consistent styling
 */
export function FeatureIcon({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        inline-flex items-center justify-center
        w-10 h-10
        rounded-[var(--radius-md)]
        bg-[var(--color-primary-muted)]
        text-[var(--color-primary)]
        transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        group-hover:bg-[var(--color-primary)]/20
        group-hover:shadow-[0_0_20px_var(--color-primary)/20]
      "
    >
      {children}
    </div>
  )
}
