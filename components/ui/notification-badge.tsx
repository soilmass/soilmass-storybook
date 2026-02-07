"use client"

/**
 * Notification Badge Component
 *
 * Premium badge indicators for notifications and counts.
 * Features:
 * - Pulse animation with glow
 * - Count change animation (scale + slide)
 * - Spring transitions
 * - Entrance/exit animations
 * - Token-based colors
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export interface NotificationBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  count?: number
  max?: number
  dot?: boolean
  ping?: boolean
  variant?: "default" | "primary" | "success" | "warning" | "error"
  size?: "sm" | "md" | "lg"
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left"
  showZero?: boolean
  hidden?: boolean
}

const variantClasses = {
  default: "bg-[var(--color-text-muted)] text-white",
  primary: "bg-[var(--color-primary)] text-white",
  success: "bg-[var(--color-success)] text-white",
  warning: "bg-[var(--color-warning)] text-white",
  error: "bg-[var(--color-error)] text-white",
}

const variantGlowClasses = {
  default: "shadow-[0_0_8px_rgba(var(--color-text-muted-rgb),0.4)]",
  primary: "shadow-[0_0_12px_rgba(var(--color-primary-rgb),0.5)]",
  success: "shadow-[0_0_12px_rgba(var(--color-success-rgb),0.5)]",
  warning: "shadow-[0_0_12px_rgba(var(--color-warning-rgb),0.5)]",
  error: "shadow-[0_0_12px_rgba(var(--color-error-rgb),0.5)]",
}

const sizeClasses = {
  sm: "min-w-[16px] h-4 text-[10px]",
  md: "min-w-[20px] h-5 text-xs",
  lg: "min-w-[24px] h-6 text-sm",
}

const dotSizeClasses = {
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
}

const positionClasses = {
  "top-right": "top-0 right-0 translate-x-1/2 -translate-y-1/2",
  "top-left": "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
  "bottom-right": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
  "bottom-left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
}

export function NotificationBadge({
  count,
  max = 99,
  dot = false,
  ping = false,
  variant = "error",
  size = "md",
  position,
  showZero = false,
  hidden = false,
  className,
  children,
  ...props
}: NotificationBadgeProps) {
  const [displayCount, setDisplayCount] = React.useState(count)
  const [isAnimating, setIsAnimating] = React.useState(false)
  const prevCountRef = React.useRef(count)

  // Animate count changes
  React.useEffect(() => {
    if (count !== prevCountRef.current) {
      setIsAnimating(true)
      const timeout = setTimeout(() => {
        setDisplayCount(count)
        setIsAnimating(false)
      }, 150)
      prevCountRef.current = count
      return () => clearTimeout(timeout)
    }
  }, [count])

  // Determine if badge should be visible
  const isVisible = !hidden && (dot || showZero || (count !== undefined && count > 0))

  if (!isVisible) return null

  const formattedCount = displayCount !== undefined && displayCount > max ? `${max}+` : displayCount

  // Dot variant
  if (dot) {
    return (
      <span
        className={cn(
          "relative inline-block rounded-full",
          dotSizeClasses[size],
          variantClasses[variant],
          // Glow effect
          variantGlowClasses[variant],
          position && ["absolute", positionClasses[position]],
          // Entrance animation
          "animate-in zoom-in-50 duration-200",
          className
        )}
        {...props}
      >
        {ping && (
          <>
            {/* Ping animation ring */}
            <span
              className={cn(
                "absolute inset-0 rounded-full",
                variantClasses[variant],
                "animate-[ping-slow_2s_ease-out_infinite]"
              )}
            />
            {/* Secondary ping for layered effect */}
            <span
              className={cn(
                "absolute inset-0 rounded-full",
                variantClasses[variant],
                "animate-[ping-slow_2s_0.5s_ease-out_infinite]",
                "opacity-50"
              )}
            />
          </>
        )}
      </span>
    )
  }

  // Count badge
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center",
        "font-semibold rounded-full px-1.5",
        sizeClasses[size],
        variantClasses[variant],
        // Glow effect
        variantGlowClasses[variant],
        position && ["absolute", positionClasses[position]],
        // Entrance animation
        "animate-in zoom-in-50 duration-200 ease-[var(--ease-spring)]",
        className
      )}
      {...props}
    >
      {/* Count with change animation */}
      <span
        className={cn(
          "transition-all duration-150 ease-[var(--ease-spring)]",
          isAnimating && "scale-125 opacity-0"
        )}
      >
        {formattedCount}
      </span>

      {ping && (
        <>
          <span
            className={cn(
              "absolute inset-0 rounded-full",
              variantClasses[variant],
              "animate-[ping-slow_2s_ease-out_infinite]"
            )}
          />
        </>
      )}
    </span>
  )
}

// Badge wrapper for positioning
export interface BadgeWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  badgeProps: NotificationBadgeProps
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left"
}

export function BadgeWrapper({
  badgeProps,
  position = "top-right",
  className,
  children,
  ...props
}: BadgeWrapperProps) {
  return (
    <div className={cn("relative inline-flex", className)} {...props}>
      {children}
      <NotificationBadge {...badgeProps} position={position} />
    </div>
  )
}

// Icon with badge
export interface IconBadgeProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  count?: number
  dot?: boolean
  badgeVariant?: NotificationBadgeProps["variant"]
  variant?: "default" | "ghost" | "outline"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  "aria-label": string
}

const iconButtonSizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
}

const iconButtonVariantClasses = {
  default: "bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)]",
  ghost: "hover:bg-[var(--color-surface-hover)]",
  outline: "border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]",
}

export function IconBadge({
  icon,
  count,
  dot = false,
  badgeVariant = "error",
  variant = "ghost",
  size = "md",
  onClick,
  className,
  ...props
}: IconBadgeProps) {
  const hasNotification = dot || (count !== undefined && count > 0)

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full",
        "transition-all duration-200 ease-[var(--ease-spring)]",
        "hover:scale-105 active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:ring-offset-2",
        iconButtonSizeClasses[size],
        iconButtonVariantClasses[variant],
        className
      )}
      {...props}
    >
      <span className="text-[var(--color-text)]">{icon}</span>
      {hasNotification && (
        <NotificationBadge
          count={dot ? undefined : count}
          dot={dot}
          variant={badgeVariant}
          size={size === "lg" ? "md" : "sm"}
          position="top-right"
          ping={dot}
        />
      )}
    </button>
  )
}

// Notification indicator (inline text badge)
export interface NotificationIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string
  count?: number
  variant?: "default" | "primary" | "success" | "warning" | "error"
  isNew?: boolean
}

export function NotificationIndicator({
  label,
  count,
  variant = "default",
  isNew = false,
  className,
  ...props
}: NotificationIndicatorProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2",
        className
      )}
      {...props}
    >
      <span className="text-[var(--color-text)]">{label}</span>
      {isNew ? (
        <span
          className={cn(
            "px-1.5 py-0.5 text-[10px] font-semibold uppercase rounded",
            "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
            "animate-in slide-in-from-left-2 duration-200"
          )}
        >
          New
        </span>
      ) : count !== undefined && count > 0 ? (
        <span
          className={cn(
            "inline-flex items-center justify-center",
            "min-w-[18px] h-[18px] px-1 text-[10px] font-medium rounded-full",
            variantClasses[variant],
            variantGlowClasses[variant],
            "animate-in zoom-in-50 duration-200"
          )}
        >
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </span>
  )
}

// Status indicator (online/offline dot) with premium animations
export interface StatusIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: "online" | "offline" | "away" | "busy" | "invisible"
  size?: "sm" | "md" | "lg"
  pulse?: boolean
}

const statusColors = {
  online: "bg-[var(--color-success)]",
  offline: "bg-[var(--color-text-muted)]",
  away: "bg-[var(--color-warning)]",
  busy: "bg-[var(--color-error)]",
  invisible: "bg-[var(--color-text-muted)] ring-2 ring-white",
}

const statusGlowColors = {
  online: "shadow-[0_0_8px_rgba(var(--color-success-rgb),0.5)]",
  offline: "",
  away: "shadow-[0_0_8px_rgba(var(--color-warning-rgb),0.5)]",
  busy: "shadow-[0_0_8px_rgba(var(--color-error-rgb),0.5)]",
  invisible: "",
}

const statusLabels = {
  online: "Online",
  offline: "Offline",
  away: "Away",
  busy: "Busy",
  invisible: "Invisible",
}

export function StatusIndicator({
  status,
  size = "md",
  pulse = false,
  className,
  ...props
}: StatusIndicatorProps) {
  const shouldPulse = pulse && status === "online"

  return (
    <span
      className={cn(
        "relative inline-block rounded-full",
        dotSizeClasses[size],
        statusColors[status],
        statusGlowColors[status],
        "transition-all duration-200",
        className
      )}
      role="status"
      aria-label={statusLabels[status]}
      {...props}
    >
      {shouldPulse && (
        <>
          <span
            className={cn(
              "absolute inset-0 rounded-full",
              statusColors[status],
              "animate-[ping-slow_2s_ease-out_infinite]"
            )}
          />
        </>
      )}
    </span>
  )
}

// Unread count (for messaging apps) with premium animations
export interface UnreadCountProps extends React.HTMLAttributes<HTMLSpanElement> {
  count: number
  max?: number
  variant?: "filled" | "outline" | "subtle"
}

export function UnreadCount({
  count,
  max = 99,
  variant = "filled",
  className,
  ...props
}: UnreadCountProps) {
  const [displayCount, setDisplayCount] = React.useState(count)
  const [isAnimating, setIsAnimating] = React.useState(false)
  const prevCountRef = React.useRef(count)

  // Animate count changes
  React.useEffect(() => {
    if (count !== prevCountRef.current) {
      setIsAnimating(true)
      const timeout = setTimeout(() => {
        setDisplayCount(count)
        setIsAnimating(false)
      }, 100)
      prevCountRef.current = count
      return () => clearTimeout(timeout)
    }
  }, [count])

  if (count <= 0) return null

  const formattedCount = displayCount > max ? `${max}+` : displayCount

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center",
        "min-w-[20px] h-5 px-1.5 text-xs font-semibold rounded-full",
        "transition-all duration-200 ease-[var(--ease-spring)]",
        variant === "filled" && [
          "bg-[var(--color-primary)] text-white",
          "shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.4)]",
        ],
        variant === "outline" && "border-2 border-[var(--color-primary)] text-[var(--color-primary)]",
        variant === "subtle" && "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
        // Animation on count change
        isAnimating && "scale-125",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "transition-all duration-100",
          isAnimating && "opacity-0 -translate-y-1"
        )}
      >
        {formattedCount}
      </span>
    </span>
  )
}

// Animated notification dot with entrance
export interface AnimatedDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  visible?: boolean
  variant?: "default" | "primary" | "success" | "warning" | "error"
  size?: "sm" | "md" | "lg"
}

export function AnimatedDot({
  visible = true,
  variant = "error",
  size = "md",
  className,
  ...props
}: AnimatedDotProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full",
        dotSizeClasses[size],
        variantClasses[variant],
        variantGlowClasses[variant],
        "transition-all duration-300 ease-[var(--ease-spring)]",
        visible
          ? "scale-100 opacity-100"
          : "scale-0 opacity-0",
        className
      )}
      {...props}
    />
  )
}
