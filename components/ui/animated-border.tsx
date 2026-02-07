"use client"

/**
 * Animated Border Component
 *
 * Animated border effects for cards and buttons.
 * Features:
 * - Rotating gradient borders
 * - Shimmer/beam effects
 * - Pulse borders
 * - Rainbow gradients
 * - Glow effects
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Gradient border with rotation animation
export interface GradientBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Gradient colors
   */
  colors?: string[]
  /**
   * Border width
   */
  borderWidth?: number
  /**
   * Border radius
   */
  radius?: "md" | "lg" | "xl" | "full"
  /**
   * Animation duration in seconds
   */
  duration?: number
  /**
   * Background color inside
   */
  background?: string
  /**
   * Animate on hover only
   */
  hoverOnly?: boolean
  /**
   * Disable animation
   */
  disabled?: boolean
}

const radiusClasses = {
  md: "rounded-[var(--radius-md)]",
  lg: "rounded-[var(--radius-lg)]",
  xl: "rounded-[var(--radius-xl)]",
  full: "rounded-full",
}

export function GradientBorder({
  colors = ["#ff0080", "#7928ca", "#0070f3", "#00dfd8"],
  borderWidth = 2,
  radius = "xl",
  duration = 3,
  background = "var(--color-surface)",
  hoverOnly = false,
  disabled = false,
  className,
  children,
  style,
  ...props
}: GradientBorderProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  const shouldAnimate = !disabled && (!hoverOnly || isHovered)
  const gradientColors = colors.join(", ")

  return (
    <div
      className={cn(
        "relative p-[var(--border-width)]",
        radiusClasses[radius],
        "overflow-hidden",
        className
      )}
      style={
        {
          "--border-width": `${borderWidth}px`,
          ...style,
        } as React.CSSProperties
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Animated gradient background */}
      <div
        className={cn(
          "absolute inset-0",
          shouldAnimate && "animate-spin-slow"
        )}
        style={{
          background: `conic-gradient(from 0deg, ${gradientColors}, ${colors[0]})`,
          animationDuration: shouldAnimate ? `${duration}s` : undefined,
          animationPlayState: shouldAnimate ? "running" : "paused",
        }}
      />

      {/* Inner content with background */}
      <div
        className={cn("relative", radiusClasses[radius])}
        style={{ background }}
      >
        {children}
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
      `}</style>
    </div>
  )
}

// Shimmer border (moving highlight)
export interface ShimmerBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Shimmer color
   */
  color?: string
  /**
   * Border color
   */
  borderColor?: string
  /**
   * Border width
   */
  borderWidth?: number
  /**
   * Border radius
   */
  radius?: "md" | "lg" | "xl" | "full"
  /**
   * Animation duration in seconds
   */
  duration?: number
  /**
   * Background color inside
   */
  background?: string
}

export function ShimmerBorder({
  color = "rgba(255, 255, 255, 0.8)",
  borderColor = "var(--color-border)",
  borderWidth = 1,
  radius = "xl",
  duration = 2,
  background = "var(--color-surface)",
  className,
  children,
  ...props
}: ShimmerBorderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        radiusClasses[radius],
        className
      )}
      {...props}
    >
      {/* Static border */}
      <div
        className={cn(
          "absolute inset-0",
          radiusClasses[radius],
          "border"
        )}
        style={{ borderColor, borderWidth }}
      />

      {/* Shimmer effect */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius: "inherit" }}
      >
        <div
          className="absolute h-full w-[200%] animate-shimmer-border"
          style={{
            background: `linear-gradient(90deg, transparent 0%, transparent 40%, ${color} 50%, transparent 60%, transparent 100%)`,
            animationDuration: `${duration}s`,
          }}
        />
      </div>

      {/* Content */}
      <div
        className={cn("relative", radiusClasses[radius])}
        style={{ background }}
      >
        {children}
      </div>

      <style jsx>{`
        @keyframes shimmer-border {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0%);
          }
        }
        .animate-shimmer-border {
          animation: shimmer-border linear infinite;
        }
      `}</style>
    </div>
  )
}

// Beam border (traveling light beam)
export interface BeamBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Beam color
   */
  color?: string
  /**
   * Beam length in pixels
   */
  beamLength?: number
  /**
   * Border width
   */
  borderWidth?: number
  /**
   * Border radius
   */
  radius?: "md" | "lg" | "xl"
  /**
   * Animation duration in seconds
   */
  duration?: number
  /**
   * Background color inside
   */
  background?: string
  /**
   * Direction
   */
  direction?: "clockwise" | "counterclockwise"
}

export function BeamBorder({
  color = "var(--color-primary)",
  beamLength = 100,
  borderWidth = 2,
  radius = "xl",
  duration = 4,
  background = "var(--color-surface)",
  direction = "clockwise",
  className,
  children,
  ...props
}: BeamBorderProps) {
  return (
    <div
      className={cn(
        "relative p-[var(--border-width)]",
        radiusClasses[radius],
        "overflow-hidden",
        className
      )}
      style={
        {
          "--border-width": `${borderWidth}px`,
        } as React.CSSProperties
      }
      {...props}
    >
      {/* Border background */}
      <div
        className={cn(
          "absolute inset-0",
          radiusClasses[radius]
        )}
        style={{ background: "var(--color-border)" }}
      />

      {/* Beam */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius: "inherit" }}
      >
        <div
          className="absolute w-full h-full"
          style={{
            animation: `beam-rotate ${duration}s linear infinite ${direction === "counterclockwise" ? "reverse" : ""}`,
          }}
        >
          <div
            className="absolute top-0 left-1/2"
            style={{
              width: beamLength,
              height: borderWidth * 2,
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
              transform: "translateX(-50%)",
              filter: "blur(1px)",
            }}
          />
        </div>
      </div>

      {/* Inner content */}
      <div
        className={cn("relative", radiusClasses[radius])}
        style={{ background }}
      >
        {children}
      </div>

      <style jsx>{`
        @keyframes beam-rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

// Pulse border (pulsing glow effect)
export interface PulseBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Glow color
   */
  color?: string
  /**
   * Border width
   */
  borderWidth?: number
  /**
   * Border radius
   */
  radius?: "md" | "lg" | "xl" | "full"
  /**
   * Animation duration in seconds
   */
  duration?: number
  /**
   * Background color inside
   */
  background?: string
  /**
   * Maximum glow spread
   */
  glowSize?: number
}

export function PulseBorder({
  color = "var(--color-primary)",
  borderWidth = 2,
  radius = "xl",
  duration = 2,
  background = "var(--color-surface)",
  glowSize = 20,
  className,
  children,
  ...props
}: PulseBorderProps) {
  return (
    <div
      className={cn(
        "relative",
        radiusClasses[radius],
        className
      )}
      {...props}
    >
      {/* Pulsing glow */}
      <div
        className={cn(
          "absolute inset-0",
          radiusClasses[radius],
          "animate-pulse-glow"
        )}
        style={{
          border: `${borderWidth}px solid ${color}`,
          boxShadow: `0 0 ${glowSize}px ${color}`,
          animationDuration: `${duration}s`,
        }}
      />

      {/* Content */}
      <div
        className={cn("relative", radiusClasses[radius])}
        style={{
          background,
          border: `${borderWidth}px solid transparent`,
        }}
      >
        {children}
      </div>

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

// Rainbow border
export interface RainbowBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Border width
   */
  borderWidth?: number
  /**
   * Border radius
   */
  radius?: "md" | "lg" | "xl" | "full"
  /**
   * Animation duration in seconds
   */
  duration?: number
  /**
   * Background color inside
   */
  background?: string
}

export function RainbowBorder({
  borderWidth = 2,
  radius = "xl",
  duration = 3,
  background = "var(--color-surface)",
  className,
  children,
  ...props
}: RainbowBorderProps) {
  return (
    <GradientBorder
      colors={["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#9400d3"]}
      borderWidth={borderWidth}
      radius={radius}
      duration={duration}
      background={background}
      className={className}
      {...props}
    >
      {children}
    </GradientBorder>
  )
}

// Dashed animated border
export interface DashedBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Dash color
   */
  color?: string
  /**
   * Border width
   */
  borderWidth?: number
  /**
   * Dash length
   */
  dashLength?: number
  /**
   * Gap length
   */
  gapLength?: number
  /**
   * Border radius
   */
  radius?: "md" | "lg" | "xl"
  /**
   * Animation duration in seconds
   */
  duration?: number
  /**
   * Background color
   */
  background?: string
}

export function DashedBorder({
  color = "var(--color-primary)",
  borderWidth = 2,
  dashLength = 10,
  gapLength = 5,
  radius = "xl",
  duration = 2,
  background = "var(--color-surface)",
  className,
  children,
  ...props
}: DashedBorderProps) {
  return (
    <div
      className={cn(
        "relative",
        radiusClasses[radius],
        className
      )}
      style={{
        background,
      }}
      {...props}
    >
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        style={{ borderRadius: "inherit" }}
      >
        <rect
          x={borderWidth / 2}
          y={borderWidth / 2}
          width={`calc(100% - ${borderWidth}px)`}
          height={`calc(100% - ${borderWidth}px)`}
          fill="none"
          stroke={color}
          strokeWidth={borderWidth}
          strokeDasharray={`${dashLength} ${gapLength}`}
          rx={radius === "xl" ? 16 : radius === "lg" ? 12 : 8}
          className="animate-dash"
          style={{
            animationDuration: `${duration}s`,
          }}
        />
      </svg>

      <div className="relative">{children}</div>

      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -${(dashLength + gapLength) * 2}px;
          }
        }
        .animate-dash {
          animation: dash linear infinite;
        }
      `}</style>
    </div>
  )
}

// Border button (button with animated border)
export interface BorderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Border variant
   */
  variant?: "gradient" | "shimmer" | "pulse" | "rainbow"
  /**
   * Border colors (for gradient)
   */
  colors?: string[]
  /**
   * Size
   */
  size?: "sm" | "md" | "lg"
}

const buttonSizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3",
  lg: "px-8 py-4 text-lg",
}

export function BorderButton({
  variant = "gradient",
  colors,
  size = "md",
  className,
  children,
  ...props
}: BorderButtonProps) {
  const content = (
    <button
      type="button"
      className={cn(
        "font-medium transition-colors",
        "hover:bg-[var(--color-surface-hover)]",
        "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:ring-offset-2",
        buttonSizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )

  switch (variant) {
    case "shimmer":
      return <ShimmerBorder radius="lg">{content}</ShimmerBorder>
    case "pulse":
      return <PulseBorder radius="lg">{content}</PulseBorder>
    case "rainbow":
      return <RainbowBorder radius="lg">{content}</RainbowBorder>
    default:
      return (
        <GradientBorder colors={colors} radius="lg" hoverOnly>
          {content}
        </GradientBorder>
      )
  }
}
