/**
 * Social Links Component
 *
 * Social media profile links with icons.
 * Features:
 * - Major platform icons
 * - Size variants
 * - Color variants with glow on hover
 * - Horizontal/vertical layouts
 * - Spring scale transitions
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Social media icons
const socialIcons = {
  twitter: (
    <svg className="h-full w-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  facebook: (
    <svg className="h-full w-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  instagram: (
    <svg className="h-full w-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  linkedin: (
    <svg className="h-full w-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  github: (
    <svg className="h-full w-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  youtube: (
    <svg className="h-full w-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  discord: (
    <svg className="h-full w-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  ),
  tiktok: (
    <svg className="h-full w-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  ),
  dribbble: (
    <svg className="h-full w-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.816zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" />
    </svg>
  ),
  email: (
    <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  website: (
    <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
}

export type SocialPlatform = keyof typeof socialIcons

export interface SocialLink {
  /**
   * Social platform
   */
  platform: SocialPlatform
  /**
   * Profile URL
   */
  href: string
  /**
   * Custom label (for accessibility)
   */
  label?: string
}

export interface SocialLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Social links
   */
  links: SocialLink[]
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
  /**
   * Color variant
   */
  variant?: "default" | "muted" | "colored"
  /**
   * Layout direction
   */
  direction?: "horizontal" | "vertical"
  /**
   * Gap between icons
   */
  gap?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
}

const containerSizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
}

const gapClasses = {
  sm: "gap-2",
  md: "gap-3",
  lg: "gap-4",
}

const variantClasses = {
  default: "text-[var(--color-text)] hover:text-[var(--color-primary)]",
  muted: "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
  colored: "", // Uses platform-specific colors
}

// Platform-specific colors with glow effects
const platformColors: Partial<Record<SocialPlatform, { hover: string; glow: string }>> = {
  twitter: { hover: "hover:text-black", glow: "hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]" },
  facebook: { hover: "hover:text-[#1877F2]", glow: "hover:shadow-[0_0_20px_rgba(24,119,242,0.4)]" },
  instagram: { hover: "hover:text-[#E4405F]", glow: "hover:shadow-[0_0_20px_rgba(228,64,95,0.4)]" },
  linkedin: { hover: "hover:text-[#0A66C2]", glow: "hover:shadow-[0_0_20px_rgba(10,102,194,0.4)]" },
  github: { hover: "hover:text-black", glow: "hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]" },
  youtube: { hover: "hover:text-[#FF0000]", glow: "hover:shadow-[0_0_20px_rgba(255,0,0,0.4)]" },
  discord: { hover: "hover:text-[#5865F2]", glow: "hover:shadow-[0_0_20px_rgba(88,101,242,0.4)]" },
  tiktok: { hover: "hover:text-black", glow: "hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]" },
  dribbble: { hover: "hover:text-[#EA4C89]", glow: "hover:shadow-[0_0_20px_rgba(234,76,137,0.4)]" },
}

export function SocialLinks({
  links,
  size = "md",
  variant = "default",
  direction = "horizontal",
  gap = "md",
  className,
  ...props
}: SocialLinksProps) {
  return (
    <div
      className={cn(
        "flex items-center",
        direction === "vertical" ? "flex-col" : "flex-row",
        gapClasses[gap],
        className
      )}
      {...props}
    >
      {links.map((link, index) => {
        const icon = socialIcons[link.platform]
        const platformStyle = platformColors[link.platform]
        const colorClass =
          variant === "colored"
            ? cn("text-[var(--color-text-muted)]", platformStyle?.hover, platformStyle?.glow)
            : variantClasses[variant]

        return (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "relative flex items-center justify-center",
              "rounded-full",
              containerSizeClasses[size],
              "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              "hover:scale-125",
              "hover:bg-[var(--color-surface-hover)]",
              colorClass
            )}
            aria-label={link.label || `Follow us on ${link.platform}`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className={sizeClasses[size]}>{icon}</span>
          </a>
        )
      })}
    </div>
  )
}

// Social share buttons
export interface SocialShareProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * URL to share
   */
  url: string
  /**
   * Share title
   */
  title?: string
  /**
   * Platforms to show
   */
  platforms?: Array<"twitter" | "facebook" | "linkedin" | "email">
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
  /**
   * Show labels
   */
  showLabels?: boolean
}

export function SocialShare({
  url,
  title = "",
  platforms = ["twitter", "facebook", "linkedin", "email"],
  size = "md",
  showLabels = false,
  className,
  ...props
}: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareUrls: Record<string, string> = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
  }

  const labels: Record<string, string> = {
    twitter: "Twitter",
    facebook: "Facebook",
    linkedin: "LinkedIn",
    email: "Email",
  }

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {showLabels && (
        <span className="text-sm text-[var(--color-text-muted)] mr-2">Share:</span>
      )}
      {platforms.map((platform, index) => (
        <a
          key={platform}
          href={shareUrls[platform]}
          target={platform !== "email" ? "_blank" : undefined}
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-1.5 p-2 rounded-[var(--radius-md)]",
            "text-[var(--color-text-muted)]",
            "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            "hover:text-[var(--color-text)]",
            "hover:bg-[var(--color-surface-hover)]",
            "hover:scale-110",
            "active:scale-95"
          )}
          aria-label={`Share on ${labels[platform]}`}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <span className={sizeClasses[size]}>{socialIcons[platform]}</span>
          {showLabels && (
            <span className="text-sm">{labels[platform]}</span>
          )}
        </a>
      ))}
    </div>
  )
}
