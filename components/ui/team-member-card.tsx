/**
 * Team Member Card Component
 *
 * Display team member profiles.
 * Features:
 * - Photo with premium hover effect
 * - Name, role, and bio
 * - Social links with animations
 * - Multiple card styles
 * - Hover lift and shadow effects
 * - Grid layout helper
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { SocialLinks, type SocialLink } from "./social-links"

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

export interface TeamMemberCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Member name
   */
  name: string
  /**
   * Role/title
   */
  role: string
  /**
   * Bio/description
   */
  bio?: string
  /**
   * Photo URL
   */
  photo?: string
  /**
   * Social links
   */
  socialLinks?: SocialLink[]
  /**
   * Card variant
   */
  variant?: "default" | "centered" | "horizontal" | "minimal"
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
  /**
   * Link to profile page
   */
  href?: string
  /**
   * Click handler
   */
  onClick?: () => void
}

const sizeClasses = {
  sm: {
    card: "p-4",
    photo: "h-16 w-16",
    photoText: "text-lg",
    name: "text-base",
    role: "text-xs",
    bio: "text-xs",
  },
  md: {
    card: "p-6",
    photo: "h-24 w-24",
    photoText: "text-2xl",
    name: "text-lg",
    role: "text-sm",
    bio: "text-sm",
  },
  lg: {
    card: "p-8",
    photo: "h-32 w-32",
    photoText: "text-3xl",
    name: "text-xl",
    role: "text-base",
    bio: "text-base",
  },
}

export function TeamMemberCard({
  name,
  role,
  bio,
  photo,
  socialLinks,
  variant = "default",
  size = "md",
  href,
  onClick,
  className,
  ...props
}: TeamMemberCardProps) {
  const sizeClass = sizeClasses[size]
  const isClickable = href || onClick

  const Wrapper = isClickable ? "a" : "div"
  const wrapperProps = isClickable
    ? { href, onClick, role: "button", tabIndex: 0 }
    : {}

  // Photo element with premium hover effect
  const PhotoElement = (
    <div className="relative">
      {/* Glow ring on hover */}
      <div
        className={cn(
          "absolute -inset-1 rounded-full",
          "bg-gradient-to-br from-[var(--color-primary)]/40 to-[var(--color-secondary)]/40",
          "opacity-0 blur-sm transition-all duration-300 ease-[var(--ease-spring)]",
          "group-hover:opacity-100"
        )}
      />
      {photo ? (
        <img
          src={photo}
          alt={name}
          className={cn(
            "relative rounded-full object-cover",
            "ring-2 ring-[var(--color-border)]",
            "transition-all duration-300 ease-[var(--ease-spring)]",
            "group-hover:ring-[var(--color-primary)]/50",
            "group-hover:scale-105",
            sizeClass.photo
          )}
        />
      ) : (
        <div
          className={cn(
            "relative flex items-center justify-center rounded-full",
            "font-semibold text-white",
            "ring-2 ring-white/20",
            "transition-all duration-300 ease-[var(--ease-spring)]",
            "group-hover:ring-white/40 group-hover:scale-105",
            sizeClass.photo,
            sizeClass.photoText,
            getAvatarColor(name)
          )}
        >
          {getInitials(name)}
        </div>
      )}
    </div>
  )

  // Horizontal variant
  if (variant === "horizontal") {
    return (
      <Wrapper
        className={cn(
          "group flex items-start gap-4",
          "rounded-[var(--radius-lg)]",
          "bg-[var(--color-surface)] border border-[var(--color-border)]",
          "shadow-[var(--shadow-card)]",
          "transition-all duration-300 ease-[var(--ease-spring)]",
          isClickable && "hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 cursor-pointer",
          "active:scale-[0.98]",
          sizeClass.card,
          className
        )}
        {...wrapperProps}
        {...props}
      >
        {PhotoElement}
        <div className="flex-1 min-w-0">
          <h3 className={cn("font-semibold text-[var(--color-text)]", sizeClass.name)}>
            {name}
          </h3>
          <p className={cn("text-[var(--color-primary)]", sizeClass.role)}>
            {role}
          </p>
          {bio && (
            <p className={cn("mt-2 text-[var(--color-text-muted)] line-clamp-2", sizeClass.bio)}>
              {bio}
            </p>
          )}
          {socialLinks && socialLinks.length > 0 && (
            <div
              className={cn(
                "mt-3 opacity-70 transition-opacity duration-300 ease-[var(--ease-spring)]",
                "group-hover:opacity-100"
              )}
            >
              <SocialLinks links={socialLinks} size="sm" variant="muted" />
            </div>
          )}
        </div>
      </Wrapper>
    )
  }

  // Minimal variant
  if (variant === "minimal") {
    return (
      <Wrapper
        className={cn(
          "group flex items-center gap-3",
          "transition-all duration-300 ease-[var(--ease-spring)]",
          isClickable && "hover:opacity-80 cursor-pointer",
          className
        )}
        {...wrapperProps}
        {...props}
      >
        <div className="relative">
          {photo ? (
            <img
              src={photo}
              alt={name}
              className={cn(
                "h-10 w-10 rounded-full object-cover",
                "ring-2 ring-[var(--color-border)]",
                "transition-all duration-300 ease-[var(--ease-spring)]",
                "group-hover:ring-[var(--color-primary)]/50 group-hover:scale-105"
              )}
            />
          ) : (
            <div
              className={cn(
                "flex items-center justify-center h-10 w-10 rounded-full",
                "text-sm font-semibold text-white",
                "transition-transform duration-300 ease-[var(--ease-spring)]",
                "group-hover:scale-105",
                getAvatarColor(name)
              )}
            >
              {getInitials(name)}
            </div>
          )}
        </div>
        <div>
          <p className="font-medium text-[var(--color-text)]">{name}</p>
          <p className="text-sm text-[var(--color-text-muted)]">{role}</p>
        </div>
      </Wrapper>
    )
  }

  // Centered variant
  if (variant === "centered") {
    return (
      <Wrapper
        className={cn(
          "group text-center",
          "rounded-[var(--radius-lg)]",
          "bg-[var(--color-surface)] border border-[var(--color-border)]",
          "shadow-[var(--shadow-card)]",
          "transition-all duration-300 ease-[var(--ease-spring)]",
          isClickable && "hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-2 cursor-pointer",
          "active:scale-[0.98]",
          sizeClass.card,
          className
        )}
        {...wrapperProps}
        {...props}
      >
        <div className="flex justify-center mb-4">
          {PhotoElement}
        </div>
        <h3 className={cn("font-semibold text-[var(--color-text)]", sizeClass.name)}>
          {name}
        </h3>
        <p className={cn("text-[var(--color-primary)]", sizeClass.role)}>
          {role}
        </p>
        {bio && (
          <p className={cn("mt-3 text-[var(--color-text-muted)]", sizeClass.bio)}>
            {bio}
          </p>
        )}
        {socialLinks && socialLinks.length > 0 && (
          <div
            className={cn(
              "mt-4 flex justify-center",
              "opacity-70 transition-opacity duration-300 ease-[var(--ease-spring)]",
              "group-hover:opacity-100"
            )}
          >
            <SocialLinks links={socialLinks} size="sm" variant="muted" />
          </div>
        )}
      </Wrapper>
    )
  }

  // Default variant
  return (
    <Wrapper
      className={cn(
        "group rounded-[var(--radius-lg)]",
        "bg-[var(--color-surface)] border border-[var(--color-border)]",
        "shadow-[var(--shadow-card)]",
        "transition-all duration-300 ease-[var(--ease-spring)]",
        isClickable && "hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 cursor-pointer",
        "active:scale-[0.98]",
        sizeClass.card,
        className
      )}
      {...wrapperProps}
      {...props}
    >
      <div className="flex items-start gap-4">
        {PhotoElement}
        <div className="flex-1 min-w-0">
          <h3 className={cn("font-semibold text-[var(--color-text)]", sizeClass.name)}>
            {name}
          </h3>
          <p className={cn("text-[var(--color-primary)]", sizeClass.role)}>
            {role}
          </p>
        </div>
      </div>
      {bio && (
        <p className={cn("mt-4 text-[var(--color-text-muted)]", sizeClass.bio)}>
          {bio}
        </p>
      )}
      {socialLinks && socialLinks.length > 0 && (
        <div
          className={cn(
            "mt-4 opacity-70 transition-opacity duration-300 ease-[var(--ease-spring)]",
            "group-hover:opacity-100"
          )}
        >
          <SocialLinks links={socialLinks} size="sm" variant="muted" />
        </div>
      )}
    </Wrapper>
  )
}

// Team grid
export interface TeamGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns
   */
  columns?: 2 | 3 | 4
}

export function TeamGrid({
  columns = 3,
  className,
  children,
  ...props
}: TeamGridProps) {
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

// Team section with heading
export interface TeamSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Section heading
   */
  heading?: string
  /**
   * Section description
   */
  description?: string
  /**
   * Number of columns
   */
  columns?: 2 | 3 | 4
}

export function TeamSection({
  heading = "Meet Our Team",
  description,
  columns = 3,
  className,
  children,
  ...props
}: TeamSectionProps) {
  return (
    <section className={cn("py-16", className)} {...props}>
      <div className="text-center mb-12">
        {heading && (
          <h2 className="text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
            {heading}
          </h2>
        )}
        {description && (
          <p className="mt-4 text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>
      <TeamGrid columns={columns}>
        {children}
      </TeamGrid>
    </section>
  )
}
