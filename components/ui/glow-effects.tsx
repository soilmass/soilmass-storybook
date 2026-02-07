"use client"

/**
 * Glow Effects Component
 *
 * Premium glow effect components with design token integration.
 * Features:
 * - Token-based glow colors (--shadow-*-glow)
 * - Spring easing animations
 * - Pulsing effects with token durations
 * - Neon effects
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Glow variant configuration
const glowVariants = {
  primary: {
    color: "var(--color-primary)",
    shadow: "var(--shadow-primary-glow)",
    shadowMd: "var(--shadow-primary-md)",
  },
  accent: {
    color: "var(--color-accent)",
    shadow: "var(--shadow-accent-glow)",
    shadowMd: "var(--shadow-accent-md)",
  },
  success: {
    color: "var(--color-success)",
    shadow: "var(--shadow-success-glow)",
    shadowMd: "var(--shadow-success-md)",
  },
  warning: {
    color: "var(--color-warning)",
    shadow: "var(--shadow-warning-glow)",
    shadowMd: "var(--shadow-warning-md)",
  },
  error: {
    color: "var(--color-error)",
    shadow: "var(--shadow-error-glow)",
    shadowMd: "var(--shadow-error-md)",
  },
}

type GlowVariant = keyof typeof glowVariants

// Basic glow wrapper
export interface GlowProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Glow color variant
   */
  variant?: GlowVariant
  /**
   * Custom glow color (overrides variant)
   */
  color?: string
  /**
   * Glow intensity (blur radius)
   */
  intensity?: number
  /**
   * Enable animation
   */
  animate?: boolean
}

export function Glow({
  variant = "primary",
  color,
  intensity = 20,
  animate = false,
  className,
  children,
  ...props
}: GlowProps) {
  const glowColor = color || glowVariants[variant].color

  return (
    <div
      className={cn(
        "relative inline-block",
        animate && "animate-glow",
        className
      )}
      style={{
        filter: `drop-shadow(0 0 ${intensity}px ${glowColor})`,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

// Pulsing glow
export interface PulseGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Glow color variant
   */
  variant?: GlowVariant
  /**
   * Custom glow color
   */
  color?: string
  /**
   * Min glow intensity
   */
  minIntensity?: number
  /**
   * Max glow intensity
   */
  maxIntensity?: number
}

export function PulseGlow({
  variant = "primary",
  color,
  minIntensity = 10,
  maxIntensity = 30,
  className,
  children,
  ...props
}: PulseGlowProps) {
  const glowColor = color || glowVariants[variant].color

  return (
    <div
      className={cn("relative inline-block animate-pulse-glow", className)}
      style={{
        "--glow-color": glowColor,
        "--min-intensity": `${minIntensity}px`,
        "--max-intensity": `${maxIntensity}px`,
      } as React.CSSProperties}
      {...props}
    >
      {children}

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            filter: drop-shadow(0 0 var(--min-intensity) var(--glow-color));
          }
          50% {
            filter: drop-shadow(0 0 var(--max-intensity) var(--glow-color));
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s var(--ease-spring) infinite;
        }
      `}</style>
    </div>
  )
}

// Glow card
export interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Glow color variant
   */
  variant?: GlowVariant
  /**
   * Custom glow color
   */
  color?: string
  /**
   * Show glow on hover only
   */
  hoverOnly?: boolean
  /**
   * Border radius
   */
  radius?: "md" | "lg" | "xl"
}

const radiusClasses = {
  md: "rounded-[var(--radius-md)]",
  lg: "rounded-[var(--radius-lg)]",
  xl: "rounded-[var(--radius-xl)]",
}

export function GlowCard({
  variant = "primary",
  color,
  hoverOnly = true,
  radius = "lg",
  className,
  children,
  ...props
}: GlowCardProps) {
  const glowConfig = glowVariants[variant]
  const glowColor = color || glowConfig.color

  return (
    <div
      className={cn(
        "relative bg-[var(--color-surface)] border border-[var(--color-border)]",
        "transition-shadow duration-[var(--duration-slow)] ease-[var(--ease-spring)]",
        radiusClasses[radius],
        className
      )}
      style={{
        boxShadow: hoverOnly ? undefined : glowConfig.shadow,
      }}
      data-hover-glow={hoverOnly ? glowConfig.shadow : undefined}
      {...props}
    >
      {children}

      <style jsx>{`
        div:hover {
          box-shadow: ${glowConfig.shadow};
        }
      `}</style>
    </div>
  )
}

// Neon text
export interface NeonTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Neon color variant
   */
  variant?: GlowVariant
  /**
   * Custom neon color
   */
  color?: string
  /**
   * Glow intensity
   */
  intensity?: number
  /**
   * Flicker effect
   */
  flicker?: boolean
  /**
   * As element
   */
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export function NeonText({
  variant = "primary",
  color,
  intensity = 2,
  flicker = false,
  as: Component = "span",
  className,
  children,
  ...props
}: NeonTextProps) {
  const neonColor = color || glowVariants[variant].color

  return (
    <Component
      className={cn(
        "relative inline-block",
        flicker && "animate-neon-flicker",
        className
      )}
      style={{
        color: neonColor,
        textShadow: `
          0 0 ${5 * intensity}px ${neonColor},
          0 0 ${10 * intensity}px ${neonColor},
          0 0 ${20 * intensity}px ${neonColor},
          0 0 ${40 * intensity}px ${neonColor}
        `,
      }}
      {...props}
    >
      {children}

      {flicker && (
        <style jsx>{`
          @keyframes neon-flicker {
            0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
              text-shadow:
                0 0 ${5 * intensity}px ${neonColor},
                0 0 ${10 * intensity}px ${neonColor},
                0 0 ${20 * intensity}px ${neonColor},
                0 0 ${40 * intensity}px ${neonColor};
            }
            20%, 24%, 55% {
              text-shadow: none;
            }
          }
          .animate-neon-flicker {
            animation: neon-flicker 3s infinite;
          }
        `}</style>
      )}
    </Component>
  )
}

// Glow border
export interface GlowBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Border color variant
   */
  variant?: GlowVariant
  /**
   * Custom border color
   */
  color?: string
  /**
   * Border width
   */
  borderWidth?: number
  /**
   * Border radius
   */
  radius?: "md" | "lg" | "xl"
  /**
   * Animate the glow
   */
  animate?: boolean
}

export function GlowBorder({
  variant = "primary",
  color,
  borderWidth = 2,
  radius = "lg",
  animate = false,
  className,
  children,
  ...props
}: GlowBorderProps) {
  const glowConfig = glowVariants[variant]
  const borderColor = color || glowConfig.color

  return (
    <div
      className={cn(
        "relative",
        radiusClasses[radius],
        animate && "animate-glow-border",
        className
      )}
      style={{
        padding: borderWidth,
        background: borderColor,
        boxShadow: glowConfig.shadow,
      }}
      {...props}
    >
      <div
        className={cn(
          "relative bg-[var(--color-surface)] h-full w-full",
          radiusClasses[radius]
        )}
        style={{
          borderRadius: `calc(var(--radius-${radius === "md" ? "md" : radius === "lg" ? "lg" : "xl"}) - ${borderWidth}px)`
        }}
      >
        {children}
      </div>

      {animate && (
        <style jsx>{`
          @keyframes glow-border {
            0%, 100% {
              box-shadow: ${glowConfig.shadow};
            }
            50% {
              box-shadow: ${glowConfig.shadow}, ${glowConfig.shadow};
            }
          }
          .animate-glow-border {
            animation: glow-border 2s var(--ease-spring) infinite;
          }
        `}</style>
      )}
    </div>
  )
}

// Glow orb (decorative floating orb)
export interface GlowOrbProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Orb color variant
   */
  variant?: GlowVariant
  /**
   * Custom orb color
   */
  color?: string
  /**
   * Orb size
   */
  size?: number
  /**
   * Glow blur
   */
  blur?: "md" | "lg" | "xl"
  /**
   * Enable floating animation
   */
  float?: boolean
}

const blurValues = {
  md: "var(--blur-md)",
  lg: "var(--blur-lg)",
  xl: "var(--blur-xl)",
}

export function GlowOrb({
  variant = "primary",
  color,
  size = 100,
  blur = "xl",
  float = true,
  className,
  ...props
}: GlowOrbProps) {
  const orbColor = color || glowVariants[variant].color

  return (
    <div
      className={cn(
        "rounded-full pointer-events-none",
        float && "animate-float-orb",
        className
      )}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${orbColor} 0%, transparent 70%)`,
        filter: `blur(${blurValues[blur]})`,
      }}
      {...props}
    >
      {float && (
        <style jsx>{`
          @keyframes float-orb {
            0%, 100% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-20px) scale(1.1);
            }
          }
          .animate-float-orb {
            animation: float-orb 3s var(--ease-spring) infinite;
          }
        `}</style>
      )}
    </div>
  )
}

// Multi-color glow
export interface MultiGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Glow color variants (cycles through)
   */
  variants?: GlowVariant[]
  /**
   * Custom glow colors
   */
  colors?: string[]
  /**
   * Glow intensity
   */
  intensity?: number
}

export function MultiGlow({
  variants = ["primary", "accent"],
  colors,
  intensity = 20,
  className,
  children,
  ...props
}: MultiGlowProps) {
  const glowColors = colors || variants.map((v) => glowVariants[v].color)

  return (
    <div
      className={cn("relative inline-block animate-multi-glow", className)}
      style={{
        "--intensity": `${intensity}px`,
      } as React.CSSProperties}
      {...props}
    >
      {children}

      <style jsx>{`
        @keyframes multi-glow {
          ${glowColors.map((color, i) => `
            ${(i / glowColors.length) * 100}% {
              filter: drop-shadow(0 0 var(--intensity) ${color});
            }
          `).join("")}
          100% {
            filter: drop-shadow(0 0 var(--intensity) ${glowColors[0]});
          }
        }
        .animate-multi-glow {
          animation: multi-glow 3s var(--ease-default) infinite;
        }
      `}</style>
    </div>
  )
}

// Spotlight glow (follows mouse within element)
export interface SpotlightGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Spotlight color variant
   */
  variant?: GlowVariant
  /**
   * Custom spotlight color
   */
  color?: string
  /**
   * Spotlight size
   */
  size?: number
  /**
   * Spotlight intensity
   */
  intensity?: number
}

export function SpotlightGlow({
  variant = "primary",
  color,
  size = 200,
  intensity = 0.5,
  className,
  children,
  ...props
}: SpotlightGlowProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState({ x: 50, y: 50 })

  const spotlightColor = color || glowVariants[variant].color

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setPosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      {...props}
    >
      {/* Spotlight */}
      <div
        className="absolute pointer-events-none transition-opacity duration-[var(--duration-slow)] ease-[var(--ease-spring)]"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          width: size,
          height: size,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${spotlightColor} 0%, transparent 70%)`,
          opacity: intensity,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Gradient glow background
export interface GradientGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Gradient color variants
   */
  variants?: GlowVariant[]
  /**
   * Custom gradient colors
   */
  colors?: string[]
  /**
   * Blur intensity
   */
  blur?: "lg" | "xl"
  /**
   * Animate the gradient
   */
  animate?: boolean
}

export function GradientGlow({
  variants = ["primary", "accent"],
  colors,
  blur = "xl",
  animate = true,
  className,
  children,
  ...props
}: GradientGlowProps) {
  const gradientColors = colors || variants.map((v) => glowVariants[v].color)

  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      {/* Gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {gradientColors.map((glowColor, index) => (
          <div
            key={index}
            className={cn("absolute rounded-full", animate && "animate-gradient-glow")}
            style={{
              left: `${20 + index * 30}%`,
              top: `${30 + (index % 2) * 30}%`,
              width: "40%",
              height: "40%",
              background: glowColor,
              filter: `blur(${blurValues[blur]})`,
              opacity: 0.5,
              animationDelay: `${index * 0.5}s`,
              animationDuration: `${6 + index}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {animate && (
        <style jsx>{`
          @keyframes gradient-glow {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            25% {
              transform: translate(10%, 10%) scale(1.1);
            }
            50% {
              transform: translate(-5%, 5%) scale(0.9);
            }
            75% {
              transform: translate(-10%, -10%) scale(1.1);
            }
          }
          .animate-gradient-glow {
            animation: gradient-glow var(--ease-spring) infinite;
          }
        `}</style>
      )}
    </div>
  )
}

// Ambient glow (behind element)
export interface AmbientGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Glow color variant
   */
  variant?: GlowVariant
  /**
   * Custom glow color
   */
  color?: string
  /**
   * Glow blur
   */
  blur?: "md" | "lg" | "xl"
  /**
   * Glow offset from element
   */
  offset?: number
}

export function AmbientGlow({
  variant = "primary",
  color,
  blur = "lg",
  offset = 10,
  className,
  children,
  ...props
}: AmbientGlowProps) {
  const ambientColor = color || glowVariants[variant].color

  return (
    <div className={cn("relative", className)} {...props}>
      {/* Ambient glow layer */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: -offset,
          background: ambientColor,
          filter: `blur(${blurValues[blur]})`,
          opacity: 0.5,
          borderRadius: "inherit",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
