/**
 * Testimonial Card Component
 *
 * Display customer testimonials/quotes.
 * Features:
 * - Quote with shadow effect
 * - Author info (name, title, company)
 * - Avatar with premium ring
 * - Optional rating
 * - Hover lift effects
 * - Multiple variants
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Quote icon
const QuoteIcon = () => (
  <svg
    className="h-8 w-8"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
)

// Star icon for rating
const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className="h-4 w-4"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
    />
  </svg>
)

// Generate deterministic color from string using design tokens
function getAvatarColor(name: string): string {
  const colors = [
    "bg-[var(--color-primary)]",
    "bg-[var(--color-success)]",
    "bg-[var(--color-warning)]",
    "bg-[var(--color-error)]",
    "bg-[var(--color-info)]",
    "bg-[var(--color-secondary)]",
    "bg-[var(--color-primary-hover)]",
    "bg-[var(--color-accent)]",
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

function getInitials(name: string): string {
  const parts = name.split(" ").filter(Boolean)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Testimonial quote
   */
  quote: string
  /**
   * Author name
   */
  author: string
  /**
   * Author title/role
   */
  title?: string
  /**
   * Company name
   */
  company?: string
  /**
   * Author avatar URL
   */
  avatar?: string
  /**
   * Company logo URL
   */
  companyLogo?: string
  /**
   * Rating (1-5)
   */
  rating?: number
  /**
   * Card variant
   */
  variant?: "default" | "bordered" | "filled" | "minimal"
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
  /**
   * Show quote icon
   */
  showQuoteIcon?: boolean
}

const sizeClasses = {
  sm: {
    card: "p-4",
    quote: "text-sm",
    author: "text-sm",
    title: "text-xs",
    avatar: "h-8 w-8 text-xs",
  },
  md: {
    card: "p-6",
    quote: "text-base",
    author: "text-base",
    title: "text-sm",
    avatar: "h-10 w-10 text-sm",
  },
  lg: {
    card: "p-8",
    quote: "text-lg",
    author: "text-lg",
    title: "text-base",
    avatar: "h-12 w-12 text-base",
  },
}

const variantClasses = {
  default: "bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-card)]",
  bordered: "border-2 border-[var(--color-border)]",
  filled: "bg-[var(--color-surface-muted)]",
  minimal: "",
}

export function TestimonialCard({
  quote,
  author,
  title,
  company,
  avatar,
  companyLogo,
  rating,
  variant = "default",
  size = "md",
  showQuoteIcon = true,
  className,
  ...props
}: TestimonialCardProps) {
  const sizeClass = sizeClasses[size]

  return (
    <div
      className={cn(
        "group rounded-[var(--radius-lg)]",
        variantClasses[variant],
        sizeClass.card,
        // Premium hover effects
        "transition-all duration-300 ease-[var(--ease-spring)]",
        variant === "default" && "hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1",
        variant !== "minimal" && "active:scale-[0.98]",
        className
      )}
      {...props}
    >
      {/* Quote icon with shadow */}
      {showQuoteIcon && (
        <div
          className={cn(
            "text-[var(--color-primary)]/30 mb-4",
            "drop-shadow-[0_2px_8px_var(--color-primary)/20]",
            "transition-all duration-300 ease-[var(--ease-spring)]",
            "group-hover:text-[var(--color-primary)]/40",
            "group-hover:drop-shadow-[0_4px_12px_var(--color-primary)/30]"
          )}
        >
          <QuoteIcon />
        </div>
      )}

      {/* Rating with hover effect */}
      {rating !== undefined && (
        <div
          className={cn(
            "flex items-center gap-0.5 mb-4 text-[var(--color-warning)]",
            "transition-transform duration-300 ease-[var(--ease-spring)]",
            "group-hover:scale-105"
          )}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon key={star} filled={star <= rating} />
          ))}
        </div>
      )}

      {/* Quote */}
      <blockquote
        className={cn(
          "text-[var(--color-text)]",
          sizeClass.quote
        )}
      >
        "{quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 mt-6">
        {/* Avatar with premium ring */}
        {avatar ? (
          <div className="relative">
            <div
              className={cn(
                "absolute -inset-1 rounded-full",
                "bg-gradient-to-br from-[var(--color-primary)]/30 to-[var(--color-secondary)]/30",
                "opacity-0 transition-opacity duration-300 ease-[var(--ease-spring)]",
                "group-hover:opacity-100"
              )}
            />
            <img
              src={avatar}
              alt={author}
              className={cn(
                "relative rounded-full object-cover",
                "ring-2 ring-[var(--color-border)]",
                "transition-all duration-300 ease-[var(--ease-spring)]",
                "group-hover:ring-[var(--color-primary)]/50",
                sizeClass.avatar
              )}
            />
          </div>
        ) : (
          <div
            className={cn(
              "flex items-center justify-center rounded-full",
              "font-medium text-white",
              "ring-2 ring-white/20",
              "transition-all duration-300 ease-[var(--ease-spring)]",
              "group-hover:ring-white/40 group-hover:scale-105",
              sizeClass.avatar,
              getAvatarColor(author)
            )}
          >
            {getInitials(author)}
          </div>
        )}

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "font-semibold text-[var(--color-text)]",
              sizeClass.author
            )}
          >
            {author}
          </p>
          {(title || company) && (
            <p
              className={cn(
                "text-[var(--color-text-muted)] truncate",
                sizeClass.title
              )}
            >
              {title}
              {title && company && " at "}
              {company}
            </p>
          )}
        </div>

        {/* Company logo */}
        {companyLogo && (
          <img
            src={companyLogo}
            alt={company || "Company"}
            className={cn(
              "h-8 w-auto object-contain",
              "opacity-50 transition-opacity duration-300 ease-[var(--ease-spring)]",
              "group-hover:opacity-70"
            )}
          />
        )}
      </div>
    </div>
  )
}

// Testimonial grid
export interface TestimonialGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns
   */
  columns?: 1 | 2 | 3
}

export function TestimonialGrid({
  columns = 3,
  className,
  children,
  ...props
}: TestimonialGridProps) {
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
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

// Featured testimonial (larger, centered)
export interface FeaturedTestimonialProps extends TestimonialCardProps {}

export function FeaturedTestimonial({
  className,
  ...props
}: FeaturedTestimonialProps) {
  return (
    <div className={cn("max-w-3xl mx-auto text-center", className)}>
      <TestimonialCard
        {...props}
        variant="minimal"
        size="lg"
        showQuoteIcon={false}
        className="text-center"
      />
    </div>
  )
}

// Simple quote (minimal variant)
export interface SimpleQuoteProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Quote text
   */
  quote: string
  /**
   * Attribution
   */
  attribution?: string
}

export function SimpleQuote({
  quote,
  attribution,
  className,
  ...props
}: SimpleQuoteProps) {
  return (
    <blockquote
      className={cn(
        "border-l-4 border-[var(--color-primary)] pl-4",
        "shadow-[-4px_0_15px_var(--color-primary)/15]",
        className
      )}
      {...props}
    >
      <p className="text-lg italic text-[var(--color-text)]">"{quote}"</p>
      {attribution && (
        <footer className="mt-2 text-sm text-[var(--color-text-muted)]">
          — {attribution}
        </footer>
      )}
    </blockquote>
  )
}
