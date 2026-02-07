/**
 * Avatar Stack Component
 *
 * Display overlapping avatars for social proof.
 * Features:
 * - Overlapping layout with ring effects
 * - Overflow indicator (+N)
 * - Size variants
 * - Interactive hover expand with spring
 * - Customizable overlap
 * - Glowing rings on hover
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, type AvatarProps } from "./avatar"

export interface AvatarStackItem {
  /**
   * User name
   */
  name: string
  /**
   * Image URL
   */
  src?: string
  /**
   * Alt text
   */
  alt?: string
}

export interface AvatarStackProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of avatars to display
   */
  avatars: AvatarStackItem[]
  /**
   * Maximum avatars to show before +N
   */
  max?: number
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg" | "xl"
  /**
   * Show total count
   */
  showCount?: boolean
  /**
   * Expand on hover
   */
  expandOnHover?: boolean
  /**
   * Direction to stack
   */
  direction?: "left" | "right"
}

const sizeClasses = {
  sm: {
    avatar: "h-7 w-7 text-[10px]",
    overlap: "-ml-2",
    overlapRight: "-mr-2",
    expandedGap: "ml-1",
    ring: "ring-2",
    count: "text-xs",
  },
  md: {
    avatar: "h-9 w-9 text-xs",
    overlap: "-ml-2.5",
    overlapRight: "-mr-2.5",
    expandedGap: "ml-1.5",
    ring: "ring-2",
    count: "text-sm",
  },
  lg: {
    avatar: "h-11 w-11 text-sm",
    overlap: "-ml-3",
    overlapRight: "-mr-3",
    expandedGap: "ml-2",
    ring: "ring-[3px]",
    count: "text-sm",
  },
  xl: {
    avatar: "h-14 w-14 text-base",
    overlap: "-ml-4",
    overlapRight: "-mr-4",
    expandedGap: "ml-2.5",
    ring: "ring-[3px]",
    count: "text-base",
  },
}

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

export function AvatarStack({
  avatars,
  max = 4,
  size = "md",
  showCount = false,
  expandOnHover = false,
  direction = "left",
  className,
  ...props
}: AvatarStackProps) {
  const sizeClass = sizeClasses[size]
  const visibleAvatars = avatars.slice(0, max)
  const overflowCount = avatars.length - max
  const hasOverflow = overflowCount > 0

  return (
    <div
      className={cn(
        "inline-flex items-center",
        expandOnHover && "group",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex items-center",
          direction === "right" && "flex-row-reverse"
        )}
      >
        {visibleAvatars.map((avatar, index) => (
          <div
            key={index}
            className={cn(
              "relative rounded-full",
              sizeClass.ring,
              "ring-[var(--color-surface)]",
              "transition-all duration-300",
              "hover:z-50 hover:scale-110",
              "hover:ring-[var(--color-primary)]/30",
              "hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb,59,130,246),0.3)]",
              index > 0 && (direction === "left" ? sizeClass.overlap : sizeClass.overlapRight),
              expandOnHover && [
                "group-hover:ml-0 group-hover:mr-0",
                index > 0 && `group-hover:${sizeClass.expandedGap}`
              ]
            )}
            style={{
              zIndex: direction === "left" ? visibleAvatars.length - index : index,
              transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
          >
            {avatar.src ? (
              <img
                src={avatar.src}
                alt={avatar.alt || avatar.name}
                className={cn(
                  "rounded-full object-cover",
                  sizeClass.avatar
                )}
              />
            ) : (
              <div
                className={cn(
                  "flex items-center justify-center rounded-full",
                  "font-medium text-white",
                  sizeClass.avatar,
                  getAvatarColor(avatar.name)
                )}
              >
                {getInitials(avatar.name)}
              </div>
            )}
          </div>
        ))}

        {/* Overflow indicator with hover effects */}
        {hasOverflow && (
          <div
            className={cn(
              "relative rounded-full",
              sizeClass.ring,
              "ring-[var(--color-surface)]",
              "transition-all duration-300",
              "hover:scale-110",
              "hover:ring-[var(--color-primary)]/30",
              direction === "left" ? sizeClass.overlap : sizeClass.overlapRight,
              expandOnHover && "group-hover:ml-0 group-hover:mr-0"
            )}
            style={{
              zIndex: 0,
              transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
          >
            <div
              className={cn(
                "flex items-center justify-center rounded-full",
                "font-semibold",
                "bg-[var(--color-surface-muted)]",
                "text-[var(--color-text-muted)]",
                "shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]",
                sizeClass.avatar
              )}
            >
              +{overflowCount}
            </div>
          </div>
        )}
      </div>

      {/* Optional count text */}
      {showCount && (
        <span
          className={cn(
            "ml-3 font-medium text-[var(--color-text)]",
            sizeClass.count
          )}
        >
          {avatars.length} {avatars.length === 1 ? "person" : "people"}
        </span>
      )}
    </div>
  )
}

// Avatar stack with action
export interface AvatarStackWithActionProps extends AvatarStackProps {
  /**
   * Action button label
   */
  actionLabel?: string
  /**
   * Action button callback
   */
  onAction?: () => void
}

export function AvatarStackWithAction({
  actionLabel = "View all",
  onAction,
  ...props
}: AvatarStackWithActionProps) {
  return (
    <div className="inline-flex items-center gap-4">
      <AvatarStack {...props} />
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className={cn(
            "text-sm font-medium",
            "text-[var(--color-primary)]",
            "hover:text-[var(--color-primary-hover)]",
            "hover:scale-105",
            "active:scale-95",
            "transition-all duration-300"
          )}
          style={{
            transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

// Social proof variant with text
export interface SocialProofStackProps extends Omit<AvatarStackProps, "showCount"> {
  /**
   * Social proof text (e.g., "Join 1,000+ users")
   */
  text: string
}

export function SocialProofStack({
  text,
  ...props
}: SocialProofStackProps) {
  return (
    <div className="inline-flex items-center gap-4">
      <AvatarStack {...props} expandOnHover />
      <span className="text-sm text-[var(--color-text-muted)]">{text}</span>
    </div>
  )
}

// Interactive avatar stack with tooltips
export interface InteractiveAvatarStackProps extends AvatarStackProps {
  /**
   * Callback when avatar is clicked
   */
  onAvatarClick?: (avatar: AvatarStackItem, index: number) => void
}

export function InteractiveAvatarStack({
  avatars,
  max = 4,
  size = "md",
  direction = "left",
  onAvatarClick,
  className,
  ...props
}: InteractiveAvatarStackProps) {
  const sizeClass = sizeClasses[size]
  const visibleAvatars = avatars.slice(0, max)
  const overflowCount = avatars.length - max
  const hasOverflow = overflowCount > 0

  return (
    <div
      className={cn(
        "inline-flex items-center",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex items-center",
          direction === "right" && "flex-row-reverse"
        )}
      >
        {visibleAvatars.map((avatar, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onAvatarClick?.(avatar, index)}
            className={cn(
              "relative rounded-full",
              sizeClass.ring,
              "ring-[var(--color-surface)]",
              "transition-all duration-300",
              "hover:z-50 hover:scale-125",
              "hover:ring-[var(--color-primary)]",
              "hover:shadow-[0_0_25px_rgba(var(--color-primary-rgb,59,130,246),0.4)]",
              "focus:outline-none focus:ring-[var(--color-focus)]",
              "active:scale-110",
              index > 0 && (direction === "left" ? sizeClass.overlap : sizeClass.overlapRight)
            )}
            style={{
              zIndex: direction === "left" ? visibleAvatars.length - index : index,
              transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
            title={avatar.name}
          >
            {avatar.src ? (
              <img
                src={avatar.src}
                alt={avatar.alt || avatar.name}
                className={cn(
                  "rounded-full object-cover",
                  sizeClass.avatar
                )}
              />
            ) : (
              <div
                className={cn(
                  "flex items-center justify-center rounded-full",
                  "font-medium text-white",
                  sizeClass.avatar,
                  getAvatarColor(avatar.name)
                )}
              >
                {getInitials(avatar.name)}
              </div>
            )}
          </button>
        ))}

        {/* Overflow indicator */}
        {hasOverflow && (
          <button
            type="button"
            onClick={() => onAvatarClick?.(avatars[max], max)}
            className={cn(
              "relative rounded-full",
              sizeClass.ring,
              "ring-[var(--color-surface)]",
              "transition-all duration-300",
              "hover:scale-125",
              "hover:ring-[var(--color-primary)]",
              "hover:shadow-[0_0_25px_rgba(var(--color-primary-rgb,59,130,246),0.4)]",
              "focus:outline-none focus:ring-[var(--color-focus)]",
              "active:scale-110",
              direction === "left" ? sizeClass.overlap : sizeClass.overlapRight
            )}
            style={{
              zIndex: 0,
              transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
            title={`View ${overflowCount} more`}
          >
            <div
              className={cn(
                "flex items-center justify-center rounded-full",
                "font-semibold",
                "bg-[var(--color-surface-muted)]",
                "text-[var(--color-text-muted)]",
                "shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]",
                sizeClass.avatar
              )}
            >
              +{overflowCount}
            </div>
          </button>
        )}
      </div>
    </div>
  )
}
