"use client"

/**
 * Floating Action Button (FAB) Component
 *
 * Premium floating button with expandable actions.
 * Features:
 * - Shadow lift on hover
 * - Scale micro-interactions
 * - Ripple effect on click
 * - Spring animations
 * - Glow effects
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Icons
const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={cn("h-6 w-6", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={cn("h-6 w-6", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export interface FABAction {
  icon: React.ReactNode
  label: string
  onClick: () => void
  variant?: "default" | "primary" | "success" | "warning" | "error"
}

export interface FABProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  label?: string
  position?: "bottom-right" | "bottom-left" | "bottom-center" | "top-right" | "top-left"
  offset?: number
  size?: "sm" | "md" | "lg"
  variant?: "primary" | "secondary" | "dark"
  actions?: FABAction[]
  menuDirection?: "up" | "down" | "left" | "right"
  extended?: boolean
  extendedLabel?: string
  showTooltip?: boolean
  pulse?: boolean
}

const positionClasses = {
  "bottom-right": "bottom-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
  "top-right": "top-0 right-0",
  "top-left": "top-0 left-0",
}

const sizeClasses = {
  sm: "h-12 w-12",
  md: "h-14 w-14",
  lg: "h-16 w-16",
}

const actionSizeClasses = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-14 w-14",
}

const variantClasses = {
  primary: [
    "bg-[var(--color-primary)] text-white",
    "shadow-lg shadow-[var(--color-primary)]/30",
  ],
  secondary: [
    "bg-[var(--color-surface)] text-[var(--color-text)]",
    "border border-[var(--color-border)]",
    "shadow-lg",
  ],
  dark: [
    "bg-[var(--color-surface-inverse)] text-[var(--color-text-inverse)]",
    "shadow-lg",
  ],
}

const actionVariantClasses = {
  default: "bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]",
  primary: "bg-[var(--color-primary)] text-white",
  success: "bg-[var(--color-success)] text-white",
  warning: "bg-[var(--color-warning)] text-white",
  error: "bg-[var(--color-error)] text-white",
}

const menuDirectionClasses = {
  up: "flex-col-reverse bottom-full mb-3",
  down: "flex-col top-full mt-3",
  left: "flex-row-reverse right-full mr-3",
  right: "flex-row left-full ml-3",
}

export function FAB({
  icon,
  label = "Actions",
  position = "bottom-right",
  offset = 24,
  size = "md",
  variant = "primary",
  actions,
  menuDirection = "up",
  extended = false,
  extendedLabel,
  showTooltip = true,
  pulse = false,
  className,
  onClick,
  ...props
}: FABProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [showTooltipState, setShowTooltipState] = React.useState(false)
  const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([])
  const [isHovered, setIsHovered] = React.useState(false)
  const hasActions = actions && actions.length > 0
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  const toggleMenu = () => {
    if (hasActions) {
      setIsOpen(!isOpen)
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Create ripple effect
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const newRipple = { x, y, id: Date.now() }
      setRipples((prev) => [...prev, newRipple])
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
      }, 600)
    }

    if (hasActions) {
      toggleMenu()
    } else {
      onClick?.(e)
    }
  }

  const handleActionClick = (action: FABAction) => {
    action.onClick()
    setIsOpen(false)
  }

  const buttonIcon = isOpen && hasActions ? <CloseIcon /> : (icon || <PlusIcon />)

  return (
    <div
      className={cn(
        "fixed z-50",
        positionClasses[position]
      )}
      style={{
        [position.includes("bottom") ? "bottom" : "top"]: offset,
        [position.includes("left") ? "left" : position.includes("right") ? "right" : undefined]:
          position.includes("center") ? undefined : offset,
      }}
    >
      {/* Backdrop when open */}
      {isOpen && hasActions && (
        <div
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px] transition-opacity duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Actions menu with staggered animation */}
      {hasActions && (
        <div
          className={cn(
            "absolute z-50",
            "flex gap-3",
            menuDirectionClasses[menuDirection],
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
            "transition-opacity duration-200"
          )}
        >
          {actions.map((action, index) => (
            <div
              key={index}
              className="relative group"
            >
              <button
                type="button"
                onClick={() => handleActionClick(action)}
                className={cn(
                  "rounded-full shadow-lg",
                  "flex items-center justify-center",
                  "transition-all duration-300 ease-[var(--ease-spring)]",
                  "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:ring-offset-2",
                  actionSizeClasses[size],
                  actionVariantClasses[action.variant || "default"],
                  // Hover effects
                  "hover:scale-110",
                  action.variant === "primary" && "hover:shadow-[0_8px_24px_rgba(var(--color-primary-rgb),0.4)]",
                  action.variant === "success" && "hover:shadow-[0_8px_24px_rgba(var(--color-success-rgb),0.4)]",
                  action.variant === "warning" && "hover:shadow-[0_8px_24px_rgba(var(--color-warning-rgb),0.4)]",
                  action.variant === "error" && "hover:shadow-[0_8px_24px_rgba(var(--color-error-rgb),0.4)]",
                  // Animation
                  isOpen
                    ? "scale-100 translate-y-0 opacity-100"
                    : menuDirection === "up"
                    ? "scale-75 translate-y-4 opacity-0"
                    : menuDirection === "down"
                    ? "scale-75 -translate-y-4 opacity-0"
                    : menuDirection === "left"
                    ? "scale-75 translate-x-4 opacity-0"
                    : "scale-75 -translate-x-4 opacity-0"
                )}
                style={{
                  transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                }}
                aria-label={action.label}
              >
                {action.icon}
              </button>

              {/* Action tooltip with spring animation */}
              {showTooltip && (
                <div
                  className={cn(
                    "absolute whitespace-nowrap",
                    "px-2.5 py-1.5 rounded-[var(--radius-md)]",
                    "bg-[var(--color-surface-inverse)] text-[var(--color-text-inverse)] text-xs font-medium",
                    "opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100",
                    "pointer-events-none transition-all duration-200 ease-[var(--ease-spring)]",
                    menuDirection === "up" || menuDirection === "down"
                      ? "right-full mr-2 top-1/2 -translate-y-1/2"
                      : "bottom-full mb-2 left-1/2 -translate-x-1/2"
                  )}
                >
                  {action.label}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Main FAB button */}
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={handleClick}
          onMouseEnter={() => {
            setShowTooltipState(true)
            setIsHovered(true)
          }}
          onMouseLeave={() => {
            setShowTooltipState(false)
            setIsHovered(false)
          }}
          className={cn(
            "relative z-50 rounded-full overflow-hidden",
            "flex items-center justify-center",
            "transition-all duration-300 ease-[var(--ease-spring)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:ring-offset-2",
            extended ? "px-6 gap-2" : sizeClasses[size],
            variantClasses[variant],
            // Hover: shadow lift and scale
            isHovered && !isOpen && [
              "scale-110",
              "-translate-y-1",
              variant === "primary" && "shadow-[0_12px_32px_rgba(var(--color-primary-rgb),0.5)]",
              variant === "secondary" && "shadow-[0_12px_32px_rgba(0,0,0,0.15)]",
              variant === "dark" && "shadow-[0_12px_32px_rgba(0,0,0,0.4)]",
            ],
            // Active state
            "active:scale-95 active:translate-y-0",
            // Rotation when open
            isOpen && "rotate-45",
            // Pulse animation
            pulse && !isOpen && "animate-[fab-pulse_2s_ease-in-out_infinite]",
            className
          )}
          aria-label={label}
          aria-expanded={hasActions ? isOpen : undefined}
          {...props}
        >
          {/* Icon with rotation */}
          <span className={cn(
            "transition-transform duration-300 ease-[var(--ease-spring)]",
            isOpen && hasActions && "rotate-[45deg]"
          )}>
            {buttonIcon}
          </span>

          {extended && extendedLabel && (
            <span className="font-medium">{extendedLabel}</span>
          )}

          {/* Ripple effects */}
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="absolute rounded-full bg-white/30 animate-[ripple_0.6s_ease-out_forwards] pointer-events-none"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: 10,
                height: 10,
                marginLeft: -5,
                marginTop: -5,
              }}
            />
          ))}
        </button>

        {/* Tooltip for main button */}
        {showTooltip && !extended && !isOpen && showTooltipState && (
          <div
            className={cn(
              "absolute whitespace-nowrap",
              "px-2.5 py-1.5 rounded-[var(--radius-md)]",
              "bg-[var(--color-surface-inverse)] text-[var(--color-text-inverse)] text-xs font-medium",
              "pointer-events-none",
              "animate-in fade-in-0 zoom-in-95 slide-in-from-right-1",
              "duration-150",
              position.includes("right")
                ? "right-full mr-3 top-1/2 -translate-y-1/2"
                : "left-full ml-3 top-1/2 -translate-y-1/2"
            )}
          >
            {label}
          </div>
        )}
      </div>
    </div>
  )
}

// Simple FAB (single action, no menu)
export interface SimpleFABProps extends Omit<FABProps, "actions" | "menuDirection"> {
  onClick: () => void
}

export function SimpleFAB(props: SimpleFABProps) {
  return <FAB {...props} />
}

// Speed dial FAB (common pattern)
export interface SpeedDialProps extends React.HTMLAttributes<HTMLDivElement> {
  actions: FABAction[]
  position?: FABProps["position"]
  offset?: number
  variant?: FABProps["variant"]
  size?: FABProps["size"]
  icon?: React.ReactNode
  label?: string
}

export function SpeedDial({
  actions,
  position = "bottom-right",
  offset = 24,
  variant = "primary",
  size = "md",
  icon,
  label = "Quick actions",
  className,
  ...props
}: SpeedDialProps) {
  return (
    <div className={className} {...props}>
      <FAB
        icon={icon}
        label={label}
        position={position}
        offset={offset}
        variant={variant}
        size={size}
        actions={actions}
        menuDirection="up"
        showTooltip
      />
    </div>
  )
}

// Chat FAB (common pattern for support chat)
export interface ChatFABProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick: () => void
  unreadCount?: number
  position?: FABProps["position"]
  offset?: number
  label?: string
  icon?: React.ReactNode
}

const ChatIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
)

export function ChatFAB({
  onClick,
  unreadCount,
  position = "bottom-right",
  offset = 24,
  label = "Chat with us",
  icon,
  className,
  ...props
}: ChatFABProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([])
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Create ripple
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const newRipple = { x, y, id: Date.now() }
      setRipples((prev) => [...prev, newRipple])
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
      }, 600)
    }
    onClick()
  }

  return (
    <div
      className={cn(
        "fixed z-50",
        positionClasses[position]
      )}
      style={{
        [position.includes("bottom") ? "bottom" : "top"]: offset,
        [position.includes("left") ? "left" : position.includes("right") ? "right" : undefined]:
          position.includes("center") ? undefined : offset,
      }}
      {...props}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "relative h-14 w-14 rounded-full overflow-hidden",
          "bg-[var(--color-primary)] text-white",
          "shadow-lg shadow-[var(--color-primary)]/30",
          "flex items-center justify-center",
          "transition-all duration-300 ease-[var(--ease-spring)]",
          "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:ring-offset-2",
          // Hover: shadow lift and scale
          isHovered && [
            "scale-110",
            "-translate-y-1",
            "shadow-[0_12px_32px_rgba(var(--color-primary-rgb),0.5)]",
          ],
          "active:scale-95 active:translate-y-0",
          className
        )}
        aria-label={label}
      >
        {icon || <ChatIcon />}

        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 animate-[ripple_0.6s_ease-out_forwards] pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 10,
              height: 10,
              marginLeft: -5,
              marginTop: -5,
            }}
          />
        ))}

        {/* Unread badge with pulse */}
        {unreadCount !== undefined && unreadCount > 0 && (
          <span
            className={cn(
              "absolute -top-1 -right-1",
              "h-5 min-w-[20px] px-1 rounded-full",
              "bg-[var(--color-error)] text-white",
              "text-xs font-semibold",
              "flex items-center justify-center",
              "animate-in zoom-in-50 duration-200",
              // Pulse when new
              "shadow-[0_0_12px_rgba(var(--color-error-rgb),0.5)]"
            )}
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>
    </div>
  )
}
