"use client"

/**
 * Announcement Bar Component
 *
 * Site-wide announcements at top of page.
 * Features:
 * - Sticky positioning
 * - Dismissible with animation
 * - Link support
 * - Severity variants with subtle gradients
 * - Icon support
 * - Spring transitions
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Icons
const CloseIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const InfoIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const SparklesIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
)

export type AnnouncementVariant = "default" | "info" | "success" | "warning" | "error" | "promo"

export interface AnnouncementBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Announcement message
   */
  message: string
  /**
   * Link text
   */
  linkText?: string
  /**
   * Link URL
   */
  linkHref?: string
  /**
   * Link click handler
   */
  onLinkClick?: () => void
  /**
   * Icon to display
   */
  icon?: React.ReactNode
  /**
   * Show default icon based on variant
   */
  showDefaultIcon?: boolean
  /**
   * Color variant
   */
  variant?: AnnouncementVariant
  /**
   * Allow dismissing
   */
  dismissible?: boolean
  /**
   * Callback when dismissed
   */
  onDismiss?: () => void
  /**
   * Sticky to top
   */
  sticky?: boolean
  /**
   * Size variant
   */
  size?: "sm" | "md"
}

const variantClasses = {
  default: {
    bar: "bg-gradient-to-r from-[var(--color-surface-muted)] to-[var(--color-surface)] text-[var(--color-text)]",
    link: "text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]",
  },
  info: {
    bar: "bg-gradient-to-r from-[var(--color-info)]/15 to-[var(--color-info)]/5 text-[var(--color-info)]",
    link: "text-[var(--color-info)] hover:opacity-80",
  },
  success: {
    bar: "bg-gradient-to-r from-[var(--color-success)]/15 to-[var(--color-success)]/5 text-[var(--color-success)]",
    link: "text-[var(--color-success)] hover:opacity-80",
  },
  warning: {
    bar: "bg-gradient-to-r from-[var(--color-warning)]/15 to-[var(--color-warning)]/5 text-[var(--color-warning)]",
    link: "text-[var(--color-warning)] hover:opacity-80",
  },
  error: {
    bar: "bg-gradient-to-r from-[var(--color-error)]/15 to-[var(--color-error)]/5 text-[var(--color-error)]",
    link: "text-[var(--color-error)] hover:opacity-80",
  },
  promo: {
    bar: "bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-hover)] to-[var(--color-secondary)] text-white shadow-[0_2px_10px_var(--color-primary)/30]",
    link: "text-white/90 hover:text-white underline underline-offset-2",
  },
}

const defaultIcons: Partial<Record<AnnouncementVariant, React.ReactNode>> = {
  info: <InfoIcon />,
  promo: <SparklesIcon />,
}

export function AnnouncementBar({
  message,
  linkText,
  linkHref,
  onLinkClick,
  icon,
  showDefaultIcon = false,
  variant = "default",
  dismissible = true,
  onDismiss,
  sticky = false,
  size = "md",
  className,
  ...props
}: AnnouncementBarProps) {
  const [dismissed, setDismissed] = React.useState(false)
  const [isAnimating, setIsAnimating] = React.useState(false)

  const handleDismiss = () => {
    setIsAnimating(true)
    // Wait for animation to complete before removing
    setTimeout(() => {
      setDismissed(true)
      onDismiss?.()
    }, 300)
  }

  if (dismissed) return null

  const variantClass = variantClasses[variant]
  const displayIcon = icon || (showDefaultIcon && defaultIcons[variant])

  return (
    <div
      role="banner"
      className={cn(
        "w-full",
        "transition-all duration-300 ease-[var(--ease-spring)]",
        sticky && "sticky top-0 z-50",
        variantClass.bar,
        // Dismiss animation
        isAnimating && "opacity-0 -translate-y-full",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "max-w-7xl mx-auto px-4",
          "flex items-center justify-center gap-3",
          size === "sm" ? "py-2 text-xs" : "py-3 text-sm"
        )}
      >
        {/* Icon with animation */}
        {displayIcon && (
          <span
            className={cn(
              "flex-shrink-0",
              "transition-transform duration-300 ease-[var(--ease-spring)]",
              "hover:scale-110"
            )}
          >
            {displayIcon}
          </span>
        )}

        {/* Message */}
        <p className="flex-1 text-center">
          <span>{message}</span>
          {(linkText || linkHref) && (
            <>
              {" "}
              <a
                href={linkHref}
                onClick={onLinkClick}
                className={cn(
                  "inline-flex items-center gap-1 font-medium",
                  "transition-all duration-200 ease-[var(--ease-spring)]",
                  variantClass.link,
                  "group/link"
                )}
              >
                {linkText || "Learn more"}
                <span className="transition-transform duration-200 ease-[var(--ease-spring)] group-hover/link:translate-x-1">
                  <ArrowRightIcon />
                </span>
              </a>
            </>
          )}
        </p>

        {/* Dismiss button with animation */}
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className={cn(
              "flex-shrink-0 p-1 -m-1 rounded-[var(--radius-sm)]",
              "opacity-70 hover:opacity-100",
              "transition-all duration-200 ease-[var(--ease-spring)]",
              "hover:scale-110 hover:rotate-90",
              "active:scale-95",
              "focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2"
            )}
            aria-label="Dismiss announcement"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </div>
  )
}

// Countdown announcement bar
export interface CountdownAnnouncementProps extends Omit<AnnouncementBarProps, "message"> {
  /**
   * Message with {countdown} placeholder
   */
  message: string
  /**
   * End date/time
   */
  endDate: Date
  /**
   * Callback when countdown ends
   */
  onCountdownEnd?: () => void
}

export function CountdownAnnouncement({
  message,
  endDate,
  onCountdownEnd,
  ...props
}: CountdownAnnouncementProps) {
  const [timeLeft, setTimeLeft] = React.useState("")

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const diff = endDate.getTime() - now.getTime()

      if (diff <= 0) {
        onCountdownEnd?.()
        return "Ended"
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      if (days > 0) {
        return `${days}d ${hours}h ${minutes}m`
      }
      if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s`
      }
      return `${minutes}m ${seconds}s`
    }

    setTimeLeft(calculateTimeLeft())

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(interval)
  }, [endDate, onCountdownEnd])

  const formattedMessage = message.replace("{countdown}", timeLeft)

  return <AnnouncementBar message={formattedMessage} {...props} />
}

// Multiple announcements (carousel)
export interface AnnouncementCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of announcements
   */
  announcements: Array<{
    message: string
    linkText?: string
    linkHref?: string
    variant?: AnnouncementVariant
  }>
  /**
   * Auto-rotate interval (ms)
   */
  interval?: number
  /**
   * Allow dismissing all
   */
  dismissible?: boolean
  /**
   * Callback when all dismissed
   */
  onDismiss?: () => void
}

export function AnnouncementCarousel({
  announcements,
  interval = 5000,
  dismissible = true,
  onDismiss,
  className,
  ...props
}: AnnouncementCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [dismissed, setDismissed] = React.useState(false)
  const [isTransitioning, setIsTransitioning] = React.useState(false)

  React.useEffect(() => {
    if (announcements.length <= 1) return

    const timer = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % announcements.length)
        setIsTransitioning(false)
      }, 150)
    }, interval)

    return () => clearInterval(timer)
  }, [announcements.length, interval])

  if (dismissed || announcements.length === 0) return null

  const current = announcements[currentIndex]

  return (
    <div
      className={cn(
        "transition-opacity duration-150 ease-[var(--ease-spring)]",
        isTransitioning && "opacity-0"
      )}
    >
      <AnnouncementBar
        message={current.message}
        linkText={current.linkText}
        linkHref={current.linkHref}
        variant={current.variant}
        dismissible={dismissible}
        onDismiss={() => {
          setDismissed(true)
          onDismiss?.()
        }}
        className={className}
        {...props}
      />
    </div>
  )
}
