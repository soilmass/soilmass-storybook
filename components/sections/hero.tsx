/**
 * Hero Section Component
 *
 * Based on Marketing Site Profile requirements (Domain 71)
 * Follows patterns from Linear, Vercel, and Stripe landing pages.
 *
 * Key characteristics:
 * - Full-width with max-width constraint
 * - Large headline with gradient or emphasis
 * - Supporting description text
 * - Primary and secondary CTA buttons with glow effects
 * - Gradient mesh background
 *
 * Tokens consumed:
 * - Typography: --text-4xl through --text-6xl, --font-bold
 * - Spacing: --space-6, --space-8, --space-16, --space-24
 * - Colors: --color-foreground, --color-muted-foreground
 */

import { Button } from "@/components/ui/button"
import { Link } from "@/components/ui/link"
import { cn } from "@/lib/utils"

interface HeroAction {
  label: string
  href: string
  variant?: "primary" | "secondary" | "outline"
}

export interface HeroProps {
  /**
   * Main headline - supports React nodes for text emphasis
   */
  headline: React.ReactNode
  /**
   * Supporting description text
   */
  description?: string
  /**
   * Call-to-action buttons
   */
  actions?: HeroAction[]
  /**
   * Alignment of content
   */
  align?: "left" | "center"
  /**
   * Optional badge/announcement above headline
   */
  badge?: React.ReactNode
  /**
   * Additional content below actions (e.g., social proof, trust logos)
   */
  children?: React.ReactNode
  /**
   * Additional className for the section
   */
  className?: string
}

/**
 * Hero section for marketing landing pages.
 * Features gradient mesh background and CTA button glow effects.
 *
 * @example
 * <Hero
 *   headline="Build faster with Soilmass"
 *   description="The design system specification that powers modern web products."
 *   actions={[
 *     { label: "Get Started", href: "/docs" },
 *     { label: "Learn More", href: "#features", variant: "outline" }
 *   ]}
 * />
 */
export function Hero({
  headline,
  description,
  actions = [],
  align = "center",
  badge,
  children,
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        "px-[var(--space-6)] py-[var(--space-24)] md:py-[var(--space-32)]",
        className
      )}
    >
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Primary gradient blob */}
        <div
          className="
            absolute top-[-20%] left-[10%] w-[60%] h-[60%]
            bg-[var(--color-primary)]/20
            rounded-full blur-[120px]
            animate-[pulse_8s_ease-in-out_infinite]
          "
        />
        {/* Secondary gradient blob */}
        <div
          className="
            absolute bottom-[-10%] right-[10%] w-[50%] h-[50%]
            bg-[var(--color-accent)]/15
            rounded-full blur-[100px]
            animate-[pulse_10s_ease-in-out_infinite_2s]
          "
        />
        {/* Tertiary accent blob */}
        <div
          className="
            absolute top-[30%] right-[20%] w-[30%] h-[30%]
            bg-[var(--color-primary)]/10
            rounded-full blur-[80px]
            animate-[pulse_12s_ease-in-out_infinite_4s]
          "
        />
        {/* Subtle grid overlay */}
        <div
          className="
            absolute inset-0
            bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)]
            bg-[size:4rem_4rem]
            opacity-[0.03]
          "
        />
      </div>

      <div
        className={cn(
          "max-w-[var(--container-xl)] mx-auto",
          align === "center" && "text-center",
          align === "left" && "text-left"
        )}
      >
        {/* Badge/Announcement */}
        {badge && (
          <div
            className={cn(
              "mb-[var(--space-6)]",
              align === "center" && "flex justify-center"
            )}
          >
            {badge}
          </div>
        )}

        {/* Headline */}
        <h1
          className={cn(
            "text-[var(--text-4xl)] sm:text-[var(--text-5xl)] lg:text-[var(--text-6xl)]",
            "font-[var(--font-bold)]",
            "leading-[var(--leading-tight)] tracking-tight",
            "text-[var(--color-foreground)]",
            align === "center" && "max-w-4xl mx-auto"
          )}
        >
          {headline}
        </h1>

        {/* Description */}
        {description && (
          <p
            className={cn(
              "mt-[var(--space-6)]",
              "text-[var(--text-lg)] sm:text-[var(--text-xl)]",
              "text-[var(--color-muted-foreground)]",
              "leading-[var(--leading-relaxed)]",
              align === "center" && "max-w-2xl mx-auto"
            )}
          >
            {description}
          </p>
        )}

        {/* Actions with glow effects */}
        {actions.length > 0 && (
          <div
            className={cn(
              "mt-[var(--space-8)]",
              "flex flex-wrap gap-[var(--space-4)]",
              align === "center" && "justify-center"
            )}
          >
            {actions.map((action, index) => {
              const isPrimary = action.variant === "primary" || (index === 0 && !action.variant)
              return (
                <div
                  key={action.href}
                  className={cn(
                    "relative group",
                    isPrimary && "before:absolute before:inset-0 before:-z-10 before:rounded-[var(--radius-lg)] before:bg-[var(--color-primary)]/50 before:blur-xl before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-70"
                  )}
                >
                  <Button
                    asChild
                    variant={
                      action.variant ?? (index === 0 ? "primary" : "outline")
                    }
                    size="lg"
                    className={cn(
                      "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                      "hover:scale-[1.02] active:scale-[0.98]",
                      isPrimary && "shadow-[0_0_20px_var(--color-primary)/30] hover:shadow-[0_0_30px_var(--color-primary)/50]"
                    )}
                  >
                    <Link href={action.href} variant="nav" className="no-underline">
                      {action.label}
                    </Link>
                  </Button>
                </div>
              )
            })}
          </div>
        )}

        {/* Additional content */}
        {children && <div className="mt-[var(--space-12)]">{children}</div>}
      </div>
    </section>
  )
}

/**
 * Hero Badge - announcement or version badge above headline
 */
export interface HeroBadgeProps {
  children: React.ReactNode
  href?: string
  className?: string
}

export function HeroBadge({ children, href, className }: HeroBadgeProps) {
  const badgeStyles = cn(
    "inline-flex items-center gap-[var(--space-2)]",
    "px-[var(--space-4)] py-[var(--space-2)]",
    "text-[var(--text-sm)] font-[var(--font-medium)]",
    "bg-[var(--color-primary-muted)] text-[var(--color-primary)]",
    "rounded-[var(--radius-full)]",
    "border border-[var(--color-primary)]/20",
    "shadow-[0_0_20px_var(--color-primary)/10]",
    "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
    className
  )

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          badgeStyles,
          "hover:bg-[var(--color-primary)]/20",
          "hover:shadow-[0_0_30px_var(--color-primary)/20]",
          "hover:scale-[1.02]"
        )}
      >
        {children}
      </Link>
    )
  }

  return <span className={badgeStyles}>{children}</span>
}

/**
 * Gradient text for hero headlines
 */
export interface HeroGradientTextProps {
  children: React.ReactNode
  className?: string
}

export function HeroGradientText({ children, className }: HeroGradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary)]",
        "bg-[length:200%_auto]",
        "bg-clip-text text-transparent",
        "animate-[gradient-shift_8s_linear_infinite]",
        className
      )}
      style={{
        // Fallback for browsers without animation support
        backgroundSize: "200% auto",
      }}
    >
      {children}
    </span>
  )
}
