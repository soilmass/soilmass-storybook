/**
 * Hero Section Component
 *
 * Landing page hero sections.
 * Features:
 * - Heading and subheading
 * - CTA buttons
 * - Image/video support
 * - Various layouts
 * - Background options
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

export interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Main heading
   */
  heading: React.ReactNode
  /**
   * Subheading/description
   */
  subheading?: React.ReactNode
  /**
   * Primary CTA text
   */
  primaryCta?: string
  /**
   * Primary CTA action
   */
  onPrimaryCta?: () => void
  /**
   * Primary CTA href
   */
  primaryCtaHref?: string
  /**
   * Secondary CTA text
   */
  secondaryCta?: string
  /**
   * Secondary CTA action
   */
  onSecondaryCta?: () => void
  /**
   * Secondary CTA href
   */
  secondaryCtaHref?: string
  /**
   * Hero image URL
   */
  image?: string
  /**
   * Image alt text
   */
  imageAlt?: string
  /**
   * Video URL (replaces image)
   */
  video?: string
  /**
   * Layout variant
   */
  layout?: "centered" | "split" | "split-reverse" | "stacked"
  /**
   * Background variant
   */
  background?: "default" | "muted" | "gradient" | "dark" | "image"
  /**
   * Background image URL (for background="image")
   */
  backgroundImage?: string
  /**
   * Size variant (affects padding)
   */
  size?: "sm" | "md" | "lg" | "xl"
  /**
   * Badge/eyebrow text above heading
   */
  badge?: string
  /**
   * Badge href
   */
  badgeHref?: string
  /**
   * Social proof element
   */
  socialProof?: React.ReactNode
}

const sizeClasses = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-32",
  xl: "py-24 md:py-40",
}

const backgroundClasses = {
  default: "bg-[var(--color-surface)]",
  muted: "bg-[var(--color-surface-muted)]",
  gradient: "bg-[image:var(--gradient-hero)]",
  dark: "bg-[var(--color-surface-inverse)]",
  image: "",
}

export function HeroSection({
  heading,
  subheading,
  primaryCta,
  onPrimaryCta,
  primaryCtaHref,
  secondaryCta,
  onSecondaryCta,
  secondaryCtaHref,
  image,
  imageAlt = "Hero image",
  video,
  layout = "centered",
  background = "default",
  backgroundImage,
  size = "lg",
  badge,
  badgeHref,
  socialProof,
  className,
  children,
  ...props
}: HeroSectionProps) {
  const isDark = background === "gradient" || background === "dark" || background === "image"

  // Content section
  const ContentSection = (
    <div
      className={cn(
        layout === "centered" && "text-center max-w-3xl mx-auto",
        layout === "stacked" && "text-center max-w-4xl mx-auto"
      )}
    >
      {/* Badge */}
      {badge && (
        <div className="mb-4">
          {badgeHref ? (
            <a
              href={badgeHref}
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1 rounded-full",
                "text-sm font-medium transition-colors",
                isDark
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-[var(--color-primary)]/10 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20"
              )}
            >
              {badge}
              <span className="text-xs">→</span>
            </a>
          ) : (
            <span
              className={cn(
                "inline-block px-3 py-1 rounded-full text-sm font-medium",
                isDark
                  ? "bg-white/10 text-white"
                  : "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
              )}
            >
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Heading */}
      <h1
        className={cn(
          "font-bold tracking-[var(--tracking-tight)]",
          "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
          layout === "centered" || layout === "stacked"
            ? "text-[var(--text-4xl)] sm:text-[var(--text-5xl)] md:text-[var(--text-6xl)] lg:text-[var(--text-7xl)]"
            : "text-[var(--text-3xl)] sm:text-[var(--text-4xl)] md:text-[var(--text-5xl)]",
          isDark ? "text-white" : "text-[var(--color-text)]"
        )}
      >
        {heading}
      </h1>

      {/* Subheading */}
      {subheading && (
        <p
          className={cn(
            "mt-6 text-lg md:text-xl max-w-2xl",
            layout === "centered" && "mx-auto",
            isDark ? "text-white/80" : "text-[var(--color-text-muted)]"
          )}
        >
          {subheading}
        </p>
      )}

      {/* CTAs */}
      {(primaryCta || secondaryCta) && (
        <div
          className={cn(
            "mt-8 flex flex-wrap gap-4",
            layout === "centered" && "justify-center",
            layout === "stacked" && "justify-center"
          )}
        >
          {primaryCta && (
            <Button
              size="lg"
              onClick={onPrimaryCta}
              {...(primaryCtaHref && { as: "a", href: primaryCtaHref })}
              className={isDark ? "bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]" : undefined}
            >
              {primaryCta}
            </Button>
          )}
          {secondaryCta && (
            <Button
              size="lg"
              variant="outline"
              onClick={onSecondaryCta}
              {...(secondaryCtaHref && { as: "a", href: secondaryCtaHref })}
              className={isDark ? "text-white border-white/30 hover:bg-white/10" : undefined}
            >
              {secondaryCta}
            </Button>
          )}
        </div>
      )}

      {/* Social proof */}
      {socialProof && <div className="mt-10">{socialProof}</div>}
    </div>
  )

  // Image/Video section
  const MediaSection = (image || video) && (
    <div
      className={cn(
        "relative",
        layout === "stacked" && "mt-12 max-w-5xl mx-auto"
      )}
    >
      {video ? (
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full rounded-[var(--radius-xl)] shadow-2xl"
        />
      ) : (
        <img
          src={image}
          alt={imageAlt}
          className={cn(
            "w-full object-cover",
            "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
            layout === "split" || layout === "split-reverse"
              ? "rounded-[var(--radius-xl)] shadow-[var(--shadow-card)]"
              : "rounded-[var(--radius-xl)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)]"
          )}
        />
      )}
    </div>
  )

  // Centered layout
  if (layout === "centered") {
    return (
      <section
        className={cn(
          "relative overflow-hidden",
          sizeClasses[size],
          backgroundClasses[background],
          className
        )}
        style={
          background === "image" && backgroundImage
            ? {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
        {...props}
      >
        {background === "image" && (
          <div className="absolute inset-0 bg-black/50" />
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {ContentSection}
          {children}
        </div>
      </section>
    )
  }

  // Stacked layout (content then image)
  if (layout === "stacked") {
    return (
      <section
        className={cn(
          "relative overflow-hidden",
          sizeClasses[size],
          backgroundClasses[background],
          className
        )}
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {ContentSection}
          {MediaSection}
          {children}
        </div>
      </section>
    )
  }

  // Split layouts
  const isReverse = layout === "split-reverse"

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        sizeClasses[size],
        backgroundClasses[background],
        className
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "grid gap-12 items-center",
            "lg:grid-cols-2 lg:gap-16",
            isReverse && "lg:[&>*:first-child]:order-2"
          )}
        >
          {ContentSection}
          {MediaSection}
        </div>
        {children}
      </div>
    </section>
  )
}

// Simple hero (minimal)
export interface SimpleHeroProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Heading
   */
  heading: string
  /**
   * Description
   */
  description?: string
  /**
   * Background variant
   */
  background?: "default" | "muted"
}

export function SimpleHero({
  heading,
  description,
  background = "default",
  className,
  ...props
}: SimpleHeroProps) {
  return (
    <section
      className={cn(
        "py-16 md:py-24",
        background === "muted" && "bg-[var(--color-surface-muted)]",
        className
      )}
      {...props}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-[var(--color-text)] sm:text-5xl">
          {heading}
        </h1>
        {description && (
          <p className="mt-6 text-xl text-[var(--color-text-muted)]">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}

// Page header (for interior pages)
export interface PageHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Page title
   */
  title: string
  /**
   * Page description
   */
  description?: string
  /**
   * Breadcrumb items
   */
  breadcrumbs?: React.ReactNode
  /**
   * Background variant
   */
  background?: "default" | "muted"
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  background = "muted",
  className,
  ...props
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "py-12 md:py-16",
        background === "muted" && "bg-[var(--color-surface-muted)]",
        className
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {breadcrumbs && <div className="mb-4">{breadcrumbs}</div>}
        <h1 className="text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-lg text-[var(--color-text-muted)] max-w-3xl">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
