"use client"

/**
 * Glass Effect Components
 *
 * Premium glassmorphism with design token integration.
 * Features:
 * - Token-based blur (--blur-sm/md/lg/xl)
 * - Token-based glass backgrounds (--glass-bg, --glass-border)
 * - Spring easing transitions
 * - Various glass variants
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Blur intensity mappings
const blurClasses = {
  sm: "backdrop-blur-[var(--blur-sm)]",
  md: "backdrop-blur-[var(--blur-md)]",
  lg: "backdrop-blur-[var(--blur-lg)]",
  xl: "backdrop-blur-[var(--blur-xl)]",
}

// Basic glass panel
export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Blur intensity
   */
  blur?: "sm" | "md" | "lg" | "xl"
  /**
   * Background opacity (0-1)
   */
  opacity?: number
  /**
   * Border style
   */
  border?: "none" | "light" | "medium" | "strong"
  /**
   * Border radius
   */
  radius?: "md" | "lg" | "xl" | "2xl"
  /**
   * Enable hover effect
   */
  hoverEffect?: boolean
}

const borderStyles = {
  none: "",
  light: "border border-[var(--glass-border)]",
  medium: "border border-white/20",
  strong: "border border-white/30",
}

const radiusClasses = {
  md: "rounded-[var(--radius-md)]",
  lg: "rounded-[var(--radius-lg)]",
  xl: "rounded-[var(--radius-xl)]",
  "2xl": "rounded-[var(--radius-2xl)]",
}

export function GlassPanel({
  blur = "md",
  opacity = 0.1,
  border = "light",
  radius = "lg",
  hoverEffect = false,
  className,
  children,
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "transition-all duration-[var(--duration-slow)] ease-[var(--ease-spring)]",
        blurClasses[blur],
        borderStyles[border],
        radiusClasses[radius],
        hoverEffect && "hover:bg-white/20 hover:border-white/30",
        className
      )}
      style={{
        backgroundColor: `color-mix(in srgb, white ${opacity * 100}%, transparent)`,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

// Glass card with more structure
export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Blur intensity
   */
  blur?: "sm" | "md" | "lg" | "xl"
  /**
   * Glass tint color variant
   */
  tint?: "light" | "dark" | "primary" | "accent"
  /**
   * Border radius
   */
  radius?: "md" | "lg" | "xl" | "2xl"
  /**
   * Add shadow
   */
  shadow?: boolean
  /**
   * Gradient border
   */
  gradientBorder?: boolean
}

const tintColors = {
  light: "var(--glass-bg)",
  dark: "var(--glass-bg-dark)",
  primary: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
  accent: "color-mix(in srgb, var(--color-accent) 10%, transparent)",
}

export function GlassCard({
  blur = "lg",
  tint = "light",
  radius = "lg",
  shadow = true,
  gradientBorder = false,
  className,
  children,
  ...props
}: GlassCardProps) {
  if (gradientBorder) {
    return (
      <div
        className={cn("relative p-px", radiusClasses[radius], className)}
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.05))",
        }}
        {...props}
      >
        <div
          className={cn(
            "relative overflow-hidden h-full",
            blurClasses[blur],
            shadow && "shadow-[var(--shadow-glass)]",
            radiusClasses[radius]
          )}
          style={{
            backgroundColor: tintColors[tint],
          }}
        >
          {children}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-[var(--glass-border)]",
        blurClasses[blur],
        shadow && "shadow-[var(--shadow-glass)]",
        radiusClasses[radius],
        className
      )}
      style={{
        backgroundColor: tintColors[tint],
      }}
      {...props}
    >
      {children}
    </div>
  )
}

// Frosted glass effect
export interface FrostedGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Frost intensity
   */
  intensity?: "light" | "medium" | "heavy"
  /**
   * Border radius
   */
  radius?: "md" | "lg" | "xl" | "2xl"
}

const frostIntensity = {
  light: { blur: "sm" as const, saturation: 180 },
  medium: { blur: "lg" as const, saturation: 180 },
  heavy: { blur: "xl" as const, saturation: 200 },
}

export function FrostedGlass({
  intensity = "medium",
  radius = "lg",
  className,
  children,
  ...props
}: FrostedGlassProps) {
  const settings = frostIntensity[intensity]

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-white/30",
        radiusClasses[radius],
        className
      )}
      style={{
        backdropFilter: `blur(var(--blur-${settings.blur})) saturate(${settings.saturation}%)`,
        WebkitBackdropFilter: `blur(var(--blur-${settings.blur})) saturate(${settings.saturation}%)`,
        backgroundColor: "var(--glass-bg)",
      }}
      {...props}
    >
      {children}
    </div>
  )
}

// Glass button
export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant
   */
  variant?: "default" | "primary" | "success" | "error"
  /**
   * Button size
   */
  size?: "sm" | "md" | "lg"
  /**
   * Blur intensity
   */
  blur?: "sm" | "md" | "lg"
}

const buttonVariantStyles = {
  default: "bg-white/10 border-[var(--glass-border)] hover:bg-white/20 text-white",
  primary: "bg-[var(--color-primary)]/20 border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/30 text-[var(--color-primary-foreground)]",
  success: "bg-[var(--color-success)]/20 border-[var(--color-success)]/30 hover:bg-[var(--color-success)]/30 text-[var(--color-success-foreground)]",
  error: "bg-[var(--color-error)]/20 border-[var(--color-error)]/30 hover:bg-[var(--color-error)]/30 text-[var(--color-error-foreground)]",
}

const buttonSizeStyles = {
  sm: "px-[var(--space-3)] py-1.5 text-[var(--text-sm)]",
  md: "px-[var(--space-4)] py-[var(--space-2)] text-[var(--text-base)]",
  lg: "px-[var(--space-6)] py-[var(--space-3)] text-[var(--text-lg)]",
}

export function GlassButton({
  variant = "default",
  size = "md",
  blur = "md",
  className,
  children,
  ...props
}: GlassButtonProps) {
  return (
    <button
      className={cn(
        "relative overflow-hidden border",
        "rounded-[var(--radius-lg)]",
        "font-[var(--font-medium)]",
        "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
        "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "active:scale-[var(--scale-press)]",
        blurClasses[blur],
        buttonVariantStyles[variant],
        buttonSizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

// Glass input
export interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Blur intensity
   */
  blur?: "sm" | "md" | "lg"
  /**
   * Error state
   */
  error?: boolean
}

export function GlassInput({
  blur = "md",
  error = false,
  className,
  ...props
}: GlassInputProps) {
  return (
    <input
      className={cn(
        "w-full px-[var(--space-4)] py-[var(--space-2)]",
        "rounded-[var(--radius-lg)]",
        "bg-white/10 border",
        "text-white placeholder:text-white/50",
        "focus:outline-none focus:ring-2",
        "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
        blurClasses[blur],
        error
          ? "border-[var(--color-error)]/50 focus:ring-[var(--color-error)]/30"
          : "border-[var(--glass-border)] focus:ring-[var(--color-focus-ring)] focus:border-white/40",
        className
      )}
      {...props}
    />
  )
}

// Glass modal/overlay
export interface GlassModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Modal is open
   */
  open?: boolean
  /**
   * Close handler
   */
  onClose?: () => void
  /**
   * Blur intensity for backdrop
   */
  backdropBlur?: "sm" | "md" | "lg"
  /**
   * Modal size
   */
  size?: "sm" | "md" | "lg" | "xl" | "full"
}

const modalSizeStyles = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full mx-[var(--space-4)]",
}

export function GlassModal({
  open = false,
  onClose,
  backdropBlur = "md",
  size = "md",
  className,
  children,
  ...props
}: GlassModalProps) {
  if (!open) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-[var(--space-4)]",
        blurClasses[backdropBlur]
      )}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden",
          "bg-[var(--glass-bg)] border border-[var(--glass-border)]",
          "rounded-[var(--radius-2xl)]",
          "shadow-[var(--shadow-glass-lg)]",
          "backdrop-blur-[var(--blur-xl)]",
          modalSizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}

// Glass navigation bar
export interface GlassNavProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Blur intensity
   */
  blur?: "md" | "lg" | "xl"
  /**
   * Fixed position
   */
  fixed?: boolean
  /**
   * Position
   */
  position?: "top" | "bottom"
}

export function GlassNav({
  blur = "lg",
  fixed = true,
  position = "top",
  className,
  children,
  ...props
}: GlassNavProps) {
  return (
    <nav
      className={cn(
        "left-0 right-0 z-[var(--z-sticky)]",
        "bg-[var(--glass-bg)] border-[var(--glass-border)]",
        blurClasses[blur],
        fixed ? "fixed" : "relative",
        position === "top" ? "top-0 border-b" : "bottom-0 border-t",
        className
      )}
      style={{
        backdropFilter: `blur(var(--blur-${blur})) saturate(180%)`,
        WebkitBackdropFilter: `blur(var(--blur-${blur})) saturate(180%)`,
      }}
      {...props}
    >
      {children}
    </nav>
  )
}

// Glass tooltip
export interface GlassTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tooltip content
   */
  content: React.ReactNode
  /**
   * Tooltip position
   */
  position?: "top" | "bottom" | "left" | "right"
  /**
   * Blur intensity
   */
  blur?: "sm" | "md" | "lg"
}

const tooltipPositionStyles = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-[var(--space-2)]",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-[var(--space-2)]",
  left: "right-full top-1/2 -translate-y-1/2 mr-[var(--space-2)]",
  right: "left-full top-1/2 -translate-y-1/2 ml-[var(--space-2)]",
}

export function GlassTooltip({
  content,
  position = "top",
  blur = "md",
  className,
  children,
  ...props
}: GlassTooltipProps) {
  const [show, setShow] = React.useState(false)

  return (
    <div
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      {...props}
    >
      {children}

      {show && (
        <div
          className={cn(
            "absolute z-[var(--z-tooltip)]",
            "px-[var(--space-3)] py-1.5",
            "rounded-[var(--radius-lg)]",
            "text-[var(--text-sm)] text-white whitespace-nowrap",
            "bg-[var(--glass-bg)] border border-[var(--glass-border)]",
            "animate-fade-in",
            blurClasses[blur],
            tooltipPositionStyles[position]
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}

// Glass badge
export interface GlassBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Badge variant
   */
  variant?: "default" | "success" | "warning" | "error" | "info"
  /**
   * Badge size
   */
  size?: "sm" | "md" | "lg"
}

const badgeVariantStyles = {
  default: "bg-white/20 border-[var(--glass-border)] text-white",
  success: "bg-[var(--color-success)]/20 border-[var(--color-success)]/30 text-[var(--color-success)]",
  warning: "bg-[var(--color-warning)]/20 border-[var(--color-warning)]/30 text-[var(--color-warning)]",
  error: "bg-[var(--color-error)]/20 border-[var(--color-error)]/30 text-[var(--color-error)]",
  info: "bg-[var(--color-info)]/20 border-[var(--color-info)]/30 text-[var(--color-info)]",
}

const badgeSizeStyles = {
  sm: "px-[var(--space-2)] py-0.5 text-[var(--text-xs)]",
  md: "px-2.5 py-1 text-[var(--text-sm)]",
  lg: "px-[var(--space-3)] py-1.5 text-[var(--text-base)]",
}

export function GlassBadge({
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}: GlassBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border",
        "font-[var(--font-medium)]",
        "backdrop-blur-[var(--blur-sm)]",
        badgeVariantStyles[variant],
        badgeSizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

// Glass container with noise texture
export interface NoiseGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Blur intensity
   */
  blur?: "md" | "lg" | "xl"
  /**
   * Noise opacity
   */
  noiseOpacity?: number
  /**
   * Border radius
   */
  radius?: "md" | "lg" | "xl" | "2xl"
}

export function NoiseGlass({
  blur = "lg",
  noiseOpacity = 0.05,
  radius = "lg",
  className,
  children,
  ...props
}: NoiseGlassProps) {
  return (
    <div
      className={cn("relative overflow-hidden", radiusClasses[radius], className)}
      {...props}
    >
      {/* Glass background */}
      <div
        className={cn(
          "absolute inset-0 border border-[var(--glass-border)]",
          blurClasses[blur],
          radiusClasses[radius]
        )}
        style={{
          backgroundColor: "var(--glass-bg)",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          radiusClasses[radius]
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: noiseOpacity,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
