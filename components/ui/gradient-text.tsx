/**
 * Gradient Text Component
 *
 * Premium gradient text with design token integration.
 * Features:
 * - Token-based gradient colors
 * - Multiple gradient presets using design system
 * - Animated gradients with token durations
 * - Spring easing animations
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Gradient presets using design tokens
const gradientPresets = {
  primary: "from-[var(--color-primary)] via-[var(--color-primary-hover)] to-[var(--color-primary-active)]",
  accent: "from-[var(--color-accent)] via-[var(--color-accent-hover)] to-[var(--color-accent)]",
  "primary-accent": "from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary)]",
  success: "from-[var(--color-success)] via-[var(--color-success-hover)] to-[var(--color-success)]",
  warning: "from-[var(--color-warning)] via-[var(--color-warning-hover)] to-[var(--color-warning)]",
  error: "from-[var(--color-error)] via-[var(--color-error-hover)] to-[var(--color-error)]",
  sunset: "from-orange-500 via-pink-500 to-purple-500",
  ocean: "from-cyan-500 via-blue-500 to-indigo-500",
  forest: "from-green-500 via-emerald-500 to-teal-500",
  fire: "from-yellow-500 via-orange-500 to-red-500",
  candy: "from-pink-500 via-purple-500 to-indigo-500",
  aurora: "from-green-400 via-cyan-500 to-blue-500",
  rainbow: "from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500",
  gold: "from-yellow-400 via-amber-500 to-orange-500",
  silver: "from-gray-300 via-gray-400 to-gray-500",
  rose: "from-rose-400 via-pink-500 to-fuchsia-500",
  lime: "from-lime-400 via-green-500 to-emerald-500",
}

export type GradientPreset = keyof typeof gradientPresets

export interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Text content
   */
  children: React.ReactNode
  /**
   * Gradient preset
   */
  gradient?: GradientPreset
  /**
   * Custom gradient (overrides preset)
   */
  customGradient?: string
  /**
   * Gradient direction
   */
  direction?: "to-r" | "to-l" | "to-t" | "to-b" | "to-tr" | "to-tl" | "to-br" | "to-bl"
  /**
   * Animate the gradient
   */
  animate?: boolean
  /**
   * Font weight
   */
  weight?: "normal" | "medium" | "semibold" | "bold" | "extrabold"
}

const weightClasses = {
  normal: "font-[var(--font-normal)]",
  medium: "font-[var(--font-medium)]",
  semibold: "font-[var(--font-semibold)]",
  bold: "font-[var(--font-bold)]",
  extrabold: "font-[var(--font-extrabold)]",
}

export function GradientText({
  children,
  gradient = "primary",
  customGradient,
  direction = "to-r",
  animate = false,
  weight = "bold",
  className,
  style,
  ...props
}: GradientTextProps) {
  const gradientClass = customGradient || gradientPresets[gradient]

  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent",
        `bg-gradient-${direction}`,
        gradientClass,
        weightClasses[weight],
        animate && "bg-[length:200%_auto] animate-gradient",
        className
      )}
      style={{
        ...style,
        ...(animate && { animationDuration: "var(--duration-slowest)" }),
      }}
      {...props}
    >
      {children}
      {animate && (
        <style jsx>{`
          @keyframes gradient {
            0%, 100% {
              background-position: 0% center;
            }
            50% {
              background-position: 100% center;
            }
          }
          .animate-gradient {
            animation: gradient var(--duration-slowest) var(--ease-default) infinite;
            animation-duration: 3s;
          }
        `}</style>
      )}
    </span>
  )
}

// Gradient heading
export interface GradientHeadingProps extends GradientTextProps {
  /**
   * Heading level
   */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  /**
   * Size preset
   */
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
}

const headingSizeClasses = {
  sm: "text-[var(--text-xl)] sm:text-[var(--text-2xl)]",
  md: "text-[var(--text-2xl)] sm:text-[var(--text-3xl)]",
  lg: "text-[var(--text-3xl)] sm:text-[var(--text-4xl)]",
  xl: "text-[var(--text-4xl)] sm:text-[var(--text-5xl)]",
  "2xl": "text-[var(--text-5xl)] sm:text-[var(--text-6xl)]",
  "3xl": "text-[var(--text-6xl)] sm:text-[var(--text-7xl)]",
}

export function GradientHeading({
  as: Component = "h2",
  size = "lg",
  className,
  ...props
}: GradientHeadingProps) {
  return (
    <Component className={cn(headingSizeClasses[size], "tracking-[var(--tracking-tight)]", className)}>
      <GradientText {...props} />
    </Component>
  )
}

// Shimmer text (gradient animation effect)
export interface ShimmerTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Text content
   */
  children: React.ReactNode
  /**
   * Shimmer color variant
   */
  variant?: "silver" | "gold" | "primary"
}

const shimmerColors = {
  silver: "from-gray-400 via-gray-200 to-gray-400",
  gold: "from-yellow-600 via-yellow-400 to-yellow-600",
  primary: "from-[var(--color-primary)] via-[var(--color-primary-hover)] to-[var(--color-primary)]",
}

export function ShimmerText({
  children,
  variant = "silver",
  className,
  ...props
}: ShimmerTextProps) {
  return (
    <span
      className={cn(
        "inline-block relative overflow-hidden",
        className
      )}
      {...props}
    >
      <span className="opacity-30">{children}</span>
      <span
        className={cn(
          "absolute inset-0",
          "bg-gradient-to-r bg-clip-text text-transparent",
          shimmerColors[variant],
          "bg-[length:200%_100%]"
        )}
        style={{
          animation: "shimmer 2s var(--ease-default) infinite",
        }}
      >
        {children}
      </span>
      <style jsx>{`
        @keyframes shimmer {
          from {
            background-position: 200% center;
          }
          to {
            background-position: -200% center;
          }
        }
      `}</style>
    </span>
  )
}

// Glow text
export interface GlowTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Text content
   */
  children: React.ReactNode
  /**
   * Glow color variant
   */
  variant?: "primary" | "accent" | "success" | "warning" | "error" | "white"
  /**
   * Custom glow color
   */
  customColor?: string
  /**
   * Glow intensity
   */
  intensity?: "subtle" | "medium" | "strong"
  /**
   * Animate glow
   */
  animate?: boolean
}

const glowIntensity = {
  subtle: "0 0 10px",
  medium: "0 0 20px",
  strong: "0 0 30px",
}

const glowColors = {
  primary: "var(--color-primary)",
  accent: "var(--color-accent)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  error: "var(--color-error)",
  white: "rgba(255, 255, 255, 0.8)",
}

export function GlowText({
  children,
  variant = "primary",
  customColor,
  intensity = "medium",
  animate = false,
  className,
  style,
  ...props
}: GlowTextProps) {
  const glowColor = customColor || glowColors[variant]

  return (
    <span
      className={cn(
        "inline-block",
        animate && "animate-pulse",
        className
      )}
      style={{
        textShadow: `${glowIntensity[intensity]} ${glowColor}`,
        animationDuration: animate ? "var(--duration-slowest)" : undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  )
}

// Outline text (stroke effect)
export interface OutlineTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Text content
   */
  children: React.ReactNode
  /**
   * Stroke color variant
   */
  variant?: "primary" | "accent" | "success" | "warning" | "error"
  /**
   * Custom stroke color
   */
  strokeColor?: string
  /**
   * Stroke width in pixels
   */
  strokeWidth?: number
  /**
   * Fill with gradient
   */
  gradient?: GradientPreset
  /**
   * Transparent fill
   */
  transparent?: boolean
}

export function OutlineText({
  children,
  variant = "primary",
  strokeColor,
  strokeWidth = 2,
  gradient,
  transparent = false,
  className,
  style,
  ...props
}: OutlineTextProps) {
  const outlineColor = strokeColor || glowColors[variant]

  if (gradient) {
    return (
      <span
        className={cn(
          "inline-block bg-clip-text text-transparent",
          `bg-gradient-to-r ${gradientPresets[gradient]}`,
          className
        )}
        style={{
          WebkitTextStroke: `${strokeWidth}px ${outlineColor}`,
          ...style,
        }}
        {...props}
      >
        {children}
      </span>
    )
  }

  return (
    <span
      className={cn(
        "inline-block",
        transparent && "text-transparent",
        className
      )}
      style={{
        WebkitTextStroke: `${strokeWidth}px ${outlineColor}`,
        color: transparent ? "transparent" : undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  )
}

// Split color text (different colors for different words)
export interface SplitColorTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Text segments with colors
   */
  segments: Array<{
    text: string
    variant?: "primary" | "accent" | "success" | "warning" | "error"
    color?: string
    gradient?: GradientPreset
  }>
  /**
   * Separator between segments
   */
  separator?: string
}

export function SplitColorText({
  segments,
  separator = " ",
  className,
  ...props
}: SplitColorTextProps) {
  return (
    <span className={cn("inline", className)} {...props}>
      {segments.map((segment, index) => (
        <React.Fragment key={index}>
          {index > 0 && separator}
          {segment.gradient ? (
            <GradientText gradient={segment.gradient}>{segment.text}</GradientText>
          ) : (
            <span style={{ color: segment.color || (segment.variant ? glowColors[segment.variant] : undefined) }}>
              {segment.text}
            </span>
          )}
        </React.Fragment>
      ))}
    </span>
  )
}

// Highlight text (marker effect) - uses primary-muted token
export interface HighlightTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Text content
   */
  children: React.ReactNode
  /**
   * Highlight color variant
   */
  variant?: "primary" | "accent" | "success" | "warning" | "error"
  /**
   * Highlight style
   */
  type?: "solid" | "underline" | "box"
}

const highlightColors = {
  primary: "bg-[var(--color-primary-muted)]",
  accent: "bg-[var(--color-accent-muted)]",
  success: "bg-[var(--color-success-muted)]",
  warning: "bg-[var(--color-warning-muted)]",
  error: "bg-[var(--color-error-muted)]",
}

const highlightUnderlineColors = {
  primary: "border-[var(--color-primary)]",
  accent: "border-[var(--color-accent)]",
  success: "border-[var(--color-success)]",
  warning: "border-[var(--color-warning)]",
  error: "border-[var(--color-error)]",
}

export function HighlightText({
  children,
  variant = "primary",
  type = "solid",
  className,
  ...props
}: HighlightTextProps) {
  if (type === "underline") {
    return (
      <span
        className={cn(
          "border-b-2",
          highlightUnderlineColors[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }

  if (type === "box") {
    return (
      <span
        className={cn(
          "px-1 rounded-[var(--radius-sm)]",
          highlightColors[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }

  return (
    <span
      className={cn(
        "-mx-1 px-1",
        highlightColors[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
