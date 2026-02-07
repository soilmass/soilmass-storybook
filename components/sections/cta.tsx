/**
 * CTA (Call to Action) Section Component
 *
 * Based on Marketing Site Profile requirements (Domain 75)
 * Conversion-focused section with strong visual emphasis.
 *
 * Features:
 * - Gradient background option
 * - Button glow animations
 * - Spring transitions
 *
 * Tokens consumed:
 * - Typography: --text-2xl, --text-3xl, --font-bold
 * - Spacing: --space-4, --space-6, --space-8, --space-24
 * - Colors: --color-surface-muted, --color-foreground, --color-muted-foreground
 */

import { Button } from "@/components/ui/button"
import { Link } from "@/components/ui/link"
import { cn } from "@/lib/utils"

interface CTAAction {
  label: string
  href: string
  variant?: "primary" | "secondary" | "outline"
}

export interface CTASectionProps {
  /**
   * CTA headline
   */
  headline: string
  /**
   * Supporting text
   */
  description?: string
  /**
   * Action buttons
   */
  actions?: CTAAction[]
  /**
   * Visual variant
   */
  variant?: "default" | "muted" | "primary" | "gradient"
  /**
   * Additional className
   */
  className?: string
  /**
   * Additional content (e.g., code snippet, input)
   */
  children?: React.ReactNode
}

/**
 * CTA section for marketing pages.
 * Features gradient backgrounds and button glow effects.
 *
 * @example
 * <CTASection
 *   headline="Ready to get started?"
 *   description="Join thousands of developers building with Soilmass."
 *   actions={[{ label: "Start Free", href: "/signup" }]}
 * />
 */
export function CTASection({
  headline,
  description,
  actions = [],
  variant = "muted",
  className,
  children,
}: CTASectionProps) {
  const variants = {
    default: "bg-[var(--color-surface)]",
    muted: "bg-[var(--color-surface-muted)]",
    primary: "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]",
    gradient: "bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary)]/90 to-[var(--color-accent)] text-white",
  }

  const textColors = {
    default: {
      headline: "text-[var(--color-foreground)]",
      description: "text-[var(--color-muted-foreground)]",
    },
    muted: {
      headline: "text-[var(--color-foreground)]",
      description: "text-[var(--color-muted-foreground)]",
    },
    primary: {
      headline: "text-[var(--color-primary-foreground)]",
      description: "text-[var(--color-primary-foreground)]/80",
    },
    gradient: {
      headline: "text-white",
      description: "text-white/80",
    },
  }

  const isPrimaryOrGradient = variant === "primary" || variant === "gradient"

  return (
    <section
      className={cn(
        "relative px-[var(--space-6)] py-[var(--space-24)]",
        "border-t border-[var(--color-border)]",
        "overflow-hidden",
        variants[variant],
        className
      )}
    >
      {/* Gradient mesh overlay for gradient variant */}
      {variant === "gradient" && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating orbs */}
          <div
            className="
              absolute top-[-20%] right-[-10%] w-[40%] h-[40%]
              bg-white/10
              rounded-full blur-[80px]
              animate-[pulse_8s_ease-in-out_infinite]
            "
          />
          <div
            className="
              absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%]
              bg-white/5
              rounded-full blur-[100px]
              animate-[pulse_10s_ease-in-out_infinite_2s]
            "
          />
          {/* Subtle grid overlay */}
          <div
            className="
              absolute inset-0
              bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]
              bg-[size:4rem_4rem]
            "
          />
        </div>
      )}

      <div className="relative max-w-[var(--container-lg)] mx-auto text-center">
        {/* Headline */}
        <h2
          className={cn(
            "text-[var(--text-3xl)] font-[var(--font-bold)]",
            textColors[variant].headline
          )}
        >
          {headline}
        </h2>

        {/* Description */}
        {description && (
          <p
            className={cn(
              "mt-[var(--space-4)] max-w-xl mx-auto",
              textColors[variant].description
            )}
          >
            {description}
          </p>
        )}

        {/* Actions with glow effects */}
        {actions.length > 0 && (
          <div className="mt-[var(--space-8)] flex flex-wrap justify-center gap-[var(--space-4)]">
            {actions.map((action, index) => {
              const buttonVariant = isPrimaryOrGradient
                ? index === 0
                  ? "secondary"
                  : "outline"
                : action.variant ?? (index === 0 ? "primary" : "outline")

              const isPrimaryButton = buttonVariant === "primary" || (isPrimaryOrGradient && index === 0)

              return (
                <div
                  key={action.href}
                  className={cn(
                    "relative group",
                    isPrimaryButton && !isPrimaryOrGradient && "before:absolute before:inset-0 before:-z-10 before:rounded-[var(--radius-lg)] before:bg-[var(--color-primary)]/50 before:blur-xl before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-70"
                  )}
                >
                  <Button
                    asChild
                    variant={buttonVariant}
                    size="lg"
                    className={cn(
                      "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                      "hover:scale-[1.02] active:scale-[0.98]",
                      isPrimaryButton && !isPrimaryOrGradient && "shadow-[0_0_20px_var(--color-primary)/30] hover:shadow-[0_0_30px_var(--color-primary)/50]",
                      isPrimaryOrGradient && index === 0 && "bg-white text-[var(--color-primary)] hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
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
        {children && <div className="mt-[var(--space-8)]">{children}</div>}
      </div>
    </section>
  )
}

/**
 * Code snippet CTA - displays a copyable code block
 */
export interface CodeSnippetCTAProps {
  code: string
  className?: string
}

export function CodeSnippetCTA({ code, className }: CodeSnippetCTAProps) {
  return (
    <pre
      className={cn(
        "mx-auto max-w-xl overflow-x-auto",
        "rounded-[var(--radius-lg)]",
        "bg-[var(--color-foreground)] text-[var(--color-background)]",
        "p-[var(--space-4)] text-[var(--text-sm)] text-left",
        "font-mono",
        "shadow-[var(--shadow-lg)]",
        "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        "hover:shadow-[var(--shadow-xl)] hover:scale-[1.01]",
        className
      )}
    >
      <code>{code}</code>
    </pre>
  )
}
