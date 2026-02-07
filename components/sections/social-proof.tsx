/**
 * Social Proof Section Component
 *
 * Based on Marketing Site Profile requirements (Domain 74)
 * Displays testimonials, logos, and trust indicators.
 *
 * Tokens consumed:
 * - Typography: --text-3xl, --text-lg, --font-bold
 * - Spacing: --space-4, --space-6, --space-8, --space-16, --space-24
 * - Colors: --color-foreground, --color-muted-foreground
 */

import { cn } from "@/lib/utils"

// Quote icon
const QuoteIcon = () => (
  <svg
    className="w-8 h-8 text-[var(--color-primary)]/20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
)

interface Testimonial {
  quote: string
  author: {
    name: string
    title?: string
    company?: string
    avatar?: string
  }
}

interface LogoItem {
  name: string
  logo: React.ReactNode | string
}

export interface SocialProofSectionProps {
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
   * Testimonials to display
   */
  testimonials?: Testimonial[]
  /**
   * Company logos to display
   */
  logos?: LogoItem[]
  /**
   * Stats to display
   */
  stats?: { label: string; value: string }[]
  /**
   * Additional className
   */
  className?: string
}

/**
 * Social proof section for marketing pages.
 *
 * @example
 * <SocialProofSection
 *   headline="Trusted by developers worldwide"
 *   testimonials={[
 *     { quote: "Amazing product!", author: { name: "Jane Doe", title: "CEO" } }
 *   ]}
 * />
 */
export function SocialProofSection({
  id,
  headline,
  description,
  testimonials = [],
  logos = [],
  stats = [],
  className,
}: SocialProofSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "px-[var(--space-6)] py-[var(--space-24)]",
        "border-t border-[var(--color-border)]",
        "bg-[var(--color-surface-muted)]",
        className
      )}
    >
      <div className="max-w-[var(--container-xl)] mx-auto">
        {/* Header */}
        {(headline || description) && (
          <div className="text-center mb-[var(--space-16)]">
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

        {/* Stats */}
        {stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[var(--space-8)] mb-[var(--space-16)]">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-[var(--text-4xl)] font-[var(--font-bold)] text-[var(--color-foreground)]">
                  {stat.value}
                </div>
                <div className="text-[var(--text-sm)] text-[var(--color-muted-foreground)] mt-[var(--space-1)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Logos */}
        {logos.length > 0 && (
          <div className="mb-[var(--space-16)]">
            <p className="text-center text-[var(--text-sm)] text-[var(--color-muted-foreground)] mb-[var(--space-8)]">
              Trusted by teams at
            </p>
            <div className="flex flex-wrap justify-center items-center gap-[var(--space-8)] md:gap-[var(--space-12)]">
              {logos.map((logo) => (
                <div
                  key={logo.name}
                  className="text-[var(--color-muted-foreground)] opacity-60 hover:opacity-100 transition-opacity"
                >
                  {typeof logo.logo === "string" ? (
                    <span className="text-[var(--text-xl)] font-[var(--font-bold)]">
                      {logo.logo}
                    </span>
                  ) : (
                    logo.logo
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <div
            className={cn(
              "grid gap-[var(--space-8)]",
              testimonials.length === 1 && "max-w-2xl mx-auto",
              testimonials.length === 2 && "md:grid-cols-2",
              testimonials.length >= 3 && "md:grid-cols-2 lg:grid-cols-3"
            )}
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      className={cn(
        "flex flex-col",
        "p-[var(--space-6)]",
        "bg-[var(--color-surface)]",
        "border border-[var(--color-border)]",
        "rounded-[var(--radius-lg)]"
      )}
    >
      <QuoteIcon />

      {/* Quote */}
      <blockquote className="mt-[var(--space-4)] flex-1">
        <p className="text-[var(--color-foreground)] leading-[var(--leading-relaxed)]">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </blockquote>

      {/* Author */}
      <div className="mt-[var(--space-6)] flex items-center gap-[var(--space-3)]">
        {testimonial.author.avatar ? (
          <img
            src={testimonial.author.avatar}
            alt=""
            className="w-10 h-10 rounded-[var(--radius-full)] object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-[var(--radius-full)] bg-[var(--color-primary-muted)] flex items-center justify-center">
            <span className="text-[var(--text-sm)] font-[var(--font-medium)] text-[var(--color-primary)]">
              {testimonial.author.name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <div className="text-[var(--text-sm)] font-[var(--font-medium)] text-[var(--color-foreground)]">
            {testimonial.author.name}
          </div>
          {(testimonial.author.title || testimonial.author.company) && (
            <div className="text-[var(--text-sm)] text-[var(--color-muted-foreground)]">
              {testimonial.author.title}
              {testimonial.author.title && testimonial.author.company && " at "}
              {testimonial.author.company}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Logo cloud component for displaying company logos
 */
export interface LogoCloudProps {
  logos: LogoItem[]
  className?: string
}

export function LogoCloud({ logos, className }: LogoCloudProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap justify-center items-center gap-[var(--space-8)]",
        className
      )}
    >
      {logos.map((logo) => (
        <div
          key={logo.name}
          className="text-[var(--color-muted-foreground)] opacity-60 hover:opacity-100 transition-opacity"
          title={logo.name}
        >
          {typeof logo.logo === "string" ? (
            <span className="text-[var(--text-xl)] font-[var(--font-bold)]">
              {logo.logo}
            </span>
          ) : (
            logo.logo
          )}
        </div>
      ))}
    </div>
  )
}
