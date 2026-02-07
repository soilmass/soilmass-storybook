"use client"

/**
 * Avatar Component
 * Domain 57: Avatars
 *
 * User avatar components with image, initials fallback, status indicators,
 * and avatar groups.
 *
 * Premium patterns:
 * - Ring glow on hover with spring transition
 * - Status indicator pulse animation
 * - Smooth image load transition
 * - Interactive hover states with shadows
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Generate deterministic color from string (AVT2)
function stringToColor(str: string): string {
  const colors = [
    "#2563eb", // blue
    "#7c3aed", // violet
    "#db2777", // pink
    "#dc2626", // red
    "#ea580c", // orange
    "#ca8a04", // yellow
    "#16a34a", // green
    "#0891b2", // cyan
    "#4f46e5", // indigo
    "#9333ea", // purple
  ]

  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

// Extract initials from name
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

// Avatar variants with premium hover effects
const avatarVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-full bg-[var(--color-surface-alt)]",
    "overflow-hidden flex-shrink-0",
    "ring-2 ring-transparent",
    // Premium transitions
    "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
    // Hover glow effect
    "hover:ring-[var(--color-primary)]/50",
    "hover:shadow-[0_0_20px_var(--color-primary)]",
    "hover:scale-105",
  ],
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-[10px]",
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-lg",
      },
      interactive: {
        true: "cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      interactive: false,
    },
  }
)

// Status indicator styles with pulse animation
const statusVariants = cva(
  [
    "absolute bottom-0 right-0",
    "rounded-full border-2 border-[var(--color-surface)]",
    // Smooth appearance
    "transition-all duration-[var(--duration-fast)] ease-[var(--ease-spring)]",
  ],
  {
    variants: {
      size: {
        xs: "h-2 w-2",
        sm: "h-2.5 w-2.5",
        md: "h-3 w-3",
        lg: "h-3.5 w-3.5",
        xl: "h-4 w-4",
      },
      status: {
        online: [
          "bg-[var(--color-success)]",
          // Pulse animation for online status
          "animate-pulse",
          "shadow-[0_0_8px_var(--color-success)]",
        ],
        offline: "bg-[var(--color-text-muted)]",
        busy: [
          "bg-[var(--color-error)]",
          "shadow-[0_0_6px_var(--color-error)]",
        ],
        away: [
          "bg-[var(--color-warning)]",
          "shadow-[0_0_6px_var(--color-warning)]",
        ],
      },
    },
    defaultVariants: {
      size: "md",
      status: "online",
    },
  }
)

// Status labels for accessibility
const statusLabels: Record<string, string> = {
  online: "Online",
  offline: "Offline",
  busy: "Busy",
  away: "Away",
}

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  /**
   * Image source URL
   */
  src?: string | null
  /**
   * User's name (used for alt text and initials)
   */
  name: string
  /**
   * Status indicator
   */
  status?: "online" | "offline" | "busy" | "away"
  /**
   * Fallback icon when no image or name
   */
  fallbackIcon?: React.ReactNode
  /**
   * Whether avatar is interactive (clickable)
   */
  interactive?: boolean
}

export function Avatar({
  src,
  name,
  size,
  status,
  fallbackIcon,
  interactive,
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false)
  const [imageLoaded, setImageLoaded] = React.useState(false)
  const initials = getInitials(name)
  const backgroundColor = stringToColor(name)

  // Reset error state when src changes
  React.useEffect(() => {
    setImageError(false)
    setImageLoaded(false)
  }, [src])

  const showImage = src && !imageError
  const showInitials = !showImage && name

  const avatar = (
    <div
      className={cn(avatarVariants({ size, interactive }), className)}
      style={!showImage ? { backgroundColor } : undefined}
      {...props}
    >
      {showImage ? (
        <img
          src={src}
          alt={name} // AVT1: Alt text with user name
          className={cn(
            "h-full w-full object-cover",
            // Smooth fade-in when loaded
            "transition-opacity duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      ) : showInitials ? (
        <span
          className="font-medium text-white uppercase select-none"
          aria-label={name}
        >
          {initials}
        </span>
      ) : fallbackIcon ? (
        <span className="text-[var(--color-text-muted)]">{fallbackIcon}</span>
      ) : (
        // Default user icon
        <svg
          className="h-[60%] w-[60%] text-white/70"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      )}
    </div>
  )

  // Wrap with status indicator if status is provided
  if (status) {
    return (
      <div className="relative inline-block group">
        {avatar}
        <span
          className={cn(
            statusVariants({ size, status }),
            // Scale up slightly on parent hover
            "group-hover:scale-110"
          )}
          aria-label={statusLabels[status]} // AVT3: Accessible text
          role="status"
        />
      </div>
    )
  }

  return avatar
}

// Avatar Group Component
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum number of avatars to show before count
   */
  max?: number
  /**
   * Size for all avatars in the group
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  /**
   * Avatar elements
   */
  children: React.ReactNode
}

export function AvatarGroup({
  max = 4,
  size = "md",
  children,
  className,
  ...props
}: AvatarGroupProps) {
  const avatars = React.Children.toArray(children)
  const visibleAvatars = avatars.slice(0, max)
  const remainingCount = avatars.length - max

  // Size-based overlap
  const overlapClass = {
    xs: "-ml-2",
    sm: "-ml-2.5",
    md: "-ml-3",
    lg: "-ml-3.5",
    xl: "-ml-4",
  }

  return (
    <div
      className={cn(
        "flex flex-row-reverse justify-end items-center",
        className
      )}
      role="group"
      aria-label={`Group of ${avatars.length} users`}
      {...props}
    >
      {/* Overflow count */}
      {remainingCount > 0 && (
        <div
          className={cn(
            avatarVariants({ size }),
            overlapClass[size],
            "bg-[var(--color-surface-alt)] border-2 border-[var(--color-surface)]",
            "font-medium text-[var(--color-text-muted)]",
            // Subtle gradient background
            "bg-gradient-to-br from-[var(--color-surface-alt)] to-[var(--color-surface-muted)]"
          )}
          aria-label={`and ${remainingCount} more`}
        >
          +{remainingCount}
        </div>
      )}

      {/* Visible avatars (reversed for proper stacking) */}
      {visibleAvatars.reverse().map((avatar, index) => (
        <div
          key={index}
          className={cn(
            index > 0 && overlapClass[size],
            "ring-2 ring-[var(--color-surface)]",
            "rounded-full",
            // Stagger hover effect
            "transition-transform duration-[var(--duration-fast)] ease-[var(--ease-spring)]",
            "hover:z-10 hover:-translate-y-1"
          )}
        >
          {React.isValidElement(avatar)
            ? React.cloneElement(avatar as React.ReactElement<{ size?: string }>, { size })
            : avatar}
        </div>
      ))}
    </div>
  )
}

export { avatarVariants, statusVariants }
