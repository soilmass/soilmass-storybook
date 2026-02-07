/**
 * Blog Post Card Component
 *
 * Display blog post previews.
 * Features:
 * - Featured image with scale on hover
 * - Title and excerpt
 * - Author info
 * - Date and read time
 * - Category/tags
 * - Premium shadow lift effects
 * - Horizontal and vertical layouts
 */

import * as React from "react"
import { cn } from "@/lib/utils"

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

export interface BlogPostAuthor {
  /**
   * Author name
   */
  name: string
  /**
   * Author avatar URL
   */
  avatar?: string
}

export interface BlogPostCardProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Post title
   */
  title: string
  /**
   * Post excerpt/description
   */
  excerpt?: string
  /**
   * Featured image URL
   */
  image?: string
  /**
   * Image alt text
   */
  imageAlt?: string
  /**
   * Post URL
   */
  href: string
  /**
   * Post author
   */
  author?: BlogPostAuthor
  /**
   * Publication date
   */
  date?: string
  /**
   * Read time (e.g., "5 min read")
   */
  readTime?: string
  /**
   * Category
   */
  category?: string
  /**
   * Category href
   */
  categoryHref?: string
  /**
   * Tags
   */
  tags?: string[]
  /**
   * Card variant
   */
  variant?: "vertical" | "horizontal" | "featured" | "minimal"
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: {
    card: "p-3",
    image: "h-32",
    title: "text-base",
    excerpt: "text-xs line-clamp-2",
    meta: "text-xs",
    avatar: "h-6 w-6 text-[10px]",
  },
  md: {
    card: "p-4",
    image: "h-48",
    title: "text-lg",
    excerpt: "text-sm line-clamp-2",
    meta: "text-sm",
    avatar: "h-8 w-8 text-xs",
  },
  lg: {
    card: "p-6",
    image: "h-64",
    title: "text-xl",
    excerpt: "text-base line-clamp-3",
    meta: "text-sm",
    avatar: "h-10 w-10 text-sm",
  },
}

export function BlogPostCard({
  title,
  excerpt,
  image,
  imageAlt,
  href,
  author,
  date,
  readTime,
  category,
  categoryHref,
  tags,
  variant = "vertical",
  size = "md",
  className,
  ...props
}: BlogPostCardProps) {
  const sizeClass = sizeClasses[size]

  // Author avatar element
  const AuthorAvatar = author && (
    <>
      {author.avatar ? (
        <img
          src={author.avatar}
          alt={author.name}
          className={cn(
            "rounded-full object-cover",
            "ring-2 ring-[var(--color-border)]",
            "transition-all duration-300 ease-[var(--ease-spring)]",
            "group-hover:ring-[var(--color-primary)]/50",
            sizeClass.avatar
          )}
        />
      ) : (
        <div
          className={cn(
            "flex items-center justify-center rounded-full",
            "font-medium text-white",
            sizeClass.avatar,
            getAvatarColor(author.name)
          )}
        >
          {getInitials(author.name)}
        </div>
      )}
    </>
  )

  // Meta info
  const MetaInfo = (
    <div className={cn("flex items-center gap-2 text-[var(--color-text-muted)]", sizeClass.meta)}>
      {date && <span>{date}</span>}
      {date && readTime && <span>·</span>}
      {readTime && <span>{readTime}</span>}
    </div>
  )

  // Category badge
  const CategoryBadge = category && (
    <a
      href={categoryHref}
      className={cn(
        "inline-block px-2 py-0.5 rounded-full",
        "text-xs font-medium",
        "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
        "transition-all duration-200 ease-[var(--ease-spring)]",
        "hover:bg-[var(--color-primary)]/20 hover:scale-105"
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {category}
    </a>
  )

  // Minimal variant
  if (variant === "minimal") {
    return (
      <article className={cn("group", className)} {...props}>
        <a href={href} className="block">
          <div className="flex items-center gap-2 mb-2">
            {CategoryBadge}
            {MetaInfo}
          </div>
          <h3
            className={cn(
              "font-semibold text-[var(--color-text)]",
              "transition-colors duration-200 ease-[var(--ease-spring)]",
              "group-hover:text-[var(--color-primary)]",
              sizeClass.title
            )}
          >
            {title}
          </h3>
          {excerpt && (
            <p className={cn("mt-2 text-[var(--color-text-muted)]", sizeClass.excerpt)}>
              {excerpt}
            </p>
          )}
        </a>
      </article>
    )
  }

  // Featured variant
  if (variant === "featured") {
    return (
      <article
        className={cn(
          "group relative overflow-hidden rounded-[var(--radius-xl)]",
          "bg-[var(--color-surface-inverse)]",
          "shadow-[var(--shadow-card)]",
          "transition-all duration-300 ease-[var(--ease-spring)]",
          "hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1",
          "active:scale-[0.99]",
          className
        )}
        {...props}
      >
        {/* Background image with scale effect */}
        {image && (
          <img
            src={image}
            alt={imageAlt || title}
            className={cn(
              "absolute inset-0 h-full w-full object-cover",
              "opacity-60 transition-all duration-500 ease-[var(--ease-spring)]",
              "group-hover:opacity-50 group-hover:scale-110"
            )}
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface-inverse)] via-[var(--color-surface-inverse)]/40 to-transparent" />

        {/* Content */}
        <a
          href={href}
          className={cn("relative block h-full min-h-[300px] p-6 flex flex-col justify-end")}
        >
          <div className="flex items-center gap-2 mb-3">
            {category && (
              <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">
                {category}
              </span>
            )}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          {excerpt && (
            <p className="text-white/80 line-clamp-2 mb-4">{excerpt}</p>
          )}
          <div className="flex items-center gap-3">
            {author && (
              <div className="flex items-center gap-2">
                {AuthorAvatar}
                <span className="text-sm text-white">{author.name}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-white/70">
              {date && <span>{date}</span>}
              {date && readTime && <span>·</span>}
              {readTime && <span>{readTime}</span>}
            </div>
          </div>
        </a>
      </article>
    )
  }

  // Horizontal variant
  if (variant === "horizontal") {
    return (
      <article
        className={cn(
          "group flex gap-4",
          "rounded-[var(--radius-lg)]",
          "bg-[var(--color-surface)] border border-[var(--color-border)]",
          "shadow-[var(--shadow-card)]",
          "transition-all duration-300 ease-[var(--ease-spring)]",
          "hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1",
          "active:scale-[0.98]",
          sizeClass.card,
          className
        )}
        {...props}
      >
        {/* Image */}
        {image && (
          <a href={href} className="flex-shrink-0 w-1/3 min-w-[120px] overflow-hidden rounded-[var(--radius-md)]">
            <img
              src={image}
              alt={imageAlt || title}
              className={cn(
                "h-full w-full object-cover",
                "transition-transform duration-500 ease-[var(--ease-spring)]",
                "group-hover:scale-110"
              )}
            />
          </a>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            {CategoryBadge}
          </div>
          <a href={href} className="block">
            <h3
              className={cn(
                "font-semibold text-[var(--color-text)]",
                "transition-colors duration-200 ease-[var(--ease-spring)]",
                "group-hover:text-[var(--color-primary)]",
                sizeClass.title
              )}
            >
              {title}
            </h3>
          </a>
          {excerpt && (
            <p className={cn("mt-2 text-[var(--color-text-muted)] flex-1", sizeClass.excerpt)}>
              {excerpt}
            </p>
          )}
          <div className="mt-3 flex items-center gap-3">
            {author && (
              <div className="flex items-center gap-2">
                {AuthorAvatar}
                <span className={cn("text-[var(--color-text)]", sizeClass.meta)}>
                  {author.name}
                </span>
              </div>
            )}
            {MetaInfo}
          </div>
        </div>
      </article>
    )
  }

  // Vertical variant (default)
  return (
    <article
      className={cn(
        "group flex flex-col",
        "rounded-[var(--radius-lg)]",
        "bg-[var(--color-surface)] border border-[var(--color-border)]",
        "shadow-[var(--shadow-card)]",
        "overflow-hidden",
        "transition-all duration-300 ease-[var(--ease-spring)]",
        "hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1",
        "active:scale-[0.98]",
        className
      )}
      {...props}
    >
      {/* Image with scale effect */}
      {image && (
        <a href={href} className="block overflow-hidden">
          <img
            src={image}
            alt={imageAlt || title}
            className={cn(
              "w-full object-cover",
              "transition-transform duration-500 ease-[var(--ease-spring)]",
              "group-hover:scale-110",
              sizeClass.image
            )}
          />
        </a>
      )}

      {/* Content */}
      <div className={cn("flex-1 flex flex-col", sizeClass.card)}>
        <div className="flex items-center gap-2 mb-2">
          {CategoryBadge}
          {MetaInfo}
        </div>
        <a href={href} className="block">
          <h3
            className={cn(
              "font-semibold text-[var(--color-text)]",
              "transition-colors duration-200 ease-[var(--ease-spring)]",
              "group-hover:text-[var(--color-primary)]",
              sizeClass.title
            )}
          >
            {title}
          </h3>
        </a>
        {excerpt && (
          <p className={cn("mt-2 text-[var(--color-text-muted)] flex-1", sizeClass.excerpt)}>
            {excerpt}
          </p>
        )}

        {/* Author */}
        {author && (
          <div className="mt-4 flex items-center gap-2">
            {AuthorAvatar}
            <span className={cn("text-[var(--color-text)]", sizeClass.meta)}>
              {author.name}
            </span>
          </div>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "px-2 py-0.5 rounded text-xs",
                  "bg-[var(--color-surface-muted)] text-[var(--color-text-muted)]",
                  "transition-colors duration-200 ease-[var(--ease-spring)]",
                  "hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

// Blog post grid
export interface BlogGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns
   */
  columns?: 2 | 3 | 4
}

export function BlogGrid({
  columns = 3,
  className,
  children,
  ...props
}: BlogGridProps) {
  const colClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
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

// Blog list (vertical stack)
export interface BlogListProps extends React.HTMLAttributes<HTMLDivElement> {}

export function BlogList({
  className,
  children,
  ...props
}: BlogListProps) {
  return (
    <div className={cn("space-y-6", className)} {...props}>
      {children}
    </div>
  )
}
