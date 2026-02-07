/**
 * Background Patterns Component
 *
 * Decorative background patterns for sections.
 * Features:
 * - Grid patterns
 * - Dot patterns
 * - Noise textures
 * - Gradient mesh
 * - Various overlays
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Grid pattern background
export interface GridPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Grid size in pixels
   */
  size?: number
  /**
   * Line color
   */
  color?: string
  /**
   * Line opacity
   */
  opacity?: number
  /**
   * Fade effect at edges
   */
  fade?: boolean
  /**
   * Fade direction
   */
  fadeDirection?: "radial" | "top" | "bottom" | "left" | "right"
}

export function GridPattern({
  size = 40,
  color = "var(--color-border)",
  opacity = 0.5,
  fade = true,
  fadeDirection = "radial",
  className,
  children,
  ...props
}: GridPatternProps) {
  const fadeGradients = {
    radial: "radial-gradient(ellipse at center, transparent 0%, var(--color-surface) 70%)",
    top: "linear-gradient(to bottom, var(--color-surface) 0%, transparent 30%, transparent 100%)",
    bottom: "linear-gradient(to top, var(--color-surface) 0%, transparent 30%, transparent 100%)",
    left: "linear-gradient(to right, var(--color-surface) 0%, transparent 30%, transparent 100%)",
    right: "linear-gradient(to left, var(--color-surface) 0%, transparent 30%, transparent 100%)",
  }

  return (
    <div className={cn("relative", className)} {...props}>
      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(${color} 1px, transparent 1px),
            linear-gradient(90deg, ${color} 1px, transparent 1px)
          `,
          backgroundSize: `${size}px ${size}px`,
          opacity,
        }}
      />

      {/* Fade overlay */}
      {fade && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: fadeGradients[fadeDirection],
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Dot pattern background
export interface DotPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Dot spacing in pixels
   */
  spacing?: number
  /**
   * Dot size in pixels
   */
  dotSize?: number
  /**
   * Dot color
   */
  color?: string
  /**
   * Dot opacity
   */
  opacity?: number
  /**
   * Fade effect
   */
  fade?: boolean
}

export function DotPattern({
  spacing = 20,
  dotSize = 1,
  color = "var(--color-text)",
  opacity = 0.3,
  fade = true,
  className,
  children,
  ...props
}: DotPatternProps) {
  return (
    <div className={cn("relative", className)} {...props}>
      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${color} ${dotSize}px, transparent ${dotSize}px)`,
          backgroundSize: `${spacing}px ${spacing}px`,
          opacity,
        }}
      />

      {/* Fade overlay */}
      {fade && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, var(--color-surface) 70%)",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Noise texture overlay
export interface NoisePatternProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Noise opacity
   */
  opacity?: number
  /**
   * Blend mode
   */
  blendMode?: "normal" | "overlay" | "soft-light" | "multiply"
  /**
   * Noise scale (lower = finer)
   */
  scale?: number
}

export function NoisePattern({
  opacity = 0.05,
  blendMode = "overlay",
  scale = 1,
  className,
  children,
  ...props
}: NoisePatternProps) {
  // Generate noise SVG data URL
  const noiseFilter = `
    <svg xmlns="http://www.w3.org/2000/svg">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="${0.8 / scale}" numOctaves="4" stitchTiles="stitch"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)"/>
    </svg>
  `
  const noiseSvg = `data:image/svg+xml,${encodeURIComponent(noiseFilter)}`

  return (
    <div className={cn("relative", className)} {...props}>
      {/* Content first */}
      <div className="relative z-0">{children}</div>

      {/* Noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `url("${noiseSvg}")`,
          opacity,
          mixBlendMode: blendMode,
        }}
      />
    </div>
  )
}

// Gradient mesh background
export interface GradientMeshProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Gradient colors and positions
   */
  colors?: Array<{
    color: string
    x: string
    y: string
    size?: string
  }>
  /**
   * Blur amount
   */
  blur?: number
  /**
   * Animate the gradients
   */
  animate?: boolean
}

export function GradientMesh({
  colors = [
    { color: "rgba(59, 130, 246, 0.3)", x: "20%", y: "20%", size: "40%" },
    { color: "rgba(147, 51, 234, 0.3)", x: "80%", y: "30%", size: "35%" },
    { color: "rgba(236, 72, 153, 0.3)", x: "50%", y: "80%", size: "45%" },
  ],
  blur = 100,
  animate = false,
  className,
  children,
  ...props
}: GradientMeshProps) {
  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      {/* Gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        {colors.map((blob, index) => (
          <div
            key={index}
            className={cn(
              "absolute rounded-full",
              animate && "animate-float-slow"
            )}
            style={{
              left: blob.x,
              top: blob.y,
              width: blob.size || "40%",
              height: blob.size || "40%",
              background: blob.color,
              filter: `blur(${blur}px)`,
              transform: "translate(-50%, -50%)",
              animationDelay: animate ? `${index * 2}s` : undefined,
              animationDuration: animate ? `${10 + index * 2}s` : undefined,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {animate && (
        <style jsx>{`
          @keyframes float-slow {
            0%, 100% {
              transform: translate(-50%, -50%) scale(1);
            }
            50% {
              transform: translate(-50%, -50%) scale(1.1);
            }
          }
          .animate-float-slow {
            animation: float-slow ease-in-out infinite;
          }
        `}</style>
      )}
    </div>
  )
}

// Aurora/Northern lights effect
export interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Aurora colors
   */
  colors?: string[]
  /**
   * Animation speed
   */
  speed?: "slow" | "normal" | "fast"
  /**
   * Opacity
   */
  opacity?: number
}

const speedDurations = {
  slow: 20,
  normal: 12,
  fast: 6,
}

export function AuroraBackground({
  colors = ["#00ff87", "#60efff", "#0061ff", "#ff00ea"],
  speed = "normal",
  opacity = 0.5,
  className,
  children,
  ...props
}: AuroraBackgroundProps) {
  const duration = speedDurations[speed]

  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      {/* Aurora layers */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
        {colors.map((color, index) => (
          <div
            key={index}
            className="absolute inset-0 animate-aurora"
            style={{
              background: `linear-gradient(${45 + index * 30}deg, transparent 30%, ${color}40 50%, transparent 70%)`,
              animationDuration: `${duration + index * 2}s`,
              animationDelay: `${index * 1.5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>

      <style jsx>{`
        @keyframes aurora {
          0%, 100% {
            transform: translateX(-20%) rotate(-5deg);
          }
          50% {
            transform: translateX(20%) rotate(5deg);
          }
        }
        .animate-aurora {
          animation: aurora ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

// Gradient background with common presets
export interface GradientBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Gradient preset
   */
  preset?: "sunset" | "ocean" | "forest" | "aurora" | "midnight" | "custom"
  /**
   * Custom colors (for custom preset)
   */
  colors?: string[]
  /**
   * Gradient direction
   */
  direction?: "to-r" | "to-l" | "to-t" | "to-b" | "to-br" | "to-bl" | "to-tr" | "to-tl"
  /**
   * Animate gradient
   */
  animate?: boolean
}

const gradientPresets = {
  sunset: ["#ff512f", "#f09819"],
  ocean: ["#2193b0", "#6dd5ed"],
  forest: ["#134e5e", "#71b280"],
  aurora: ["#00c6ff", "#0072ff", "#7c3aed"],
  midnight: ["#0f0c29", "#302b63", "#24243e"],
}

export function GradientBackground({
  preset = "ocean",
  colors,
  direction = "to-br",
  animate = false,
  className,
  children,
  ...props
}: GradientBackgroundProps) {
  const gradientColors = preset === "custom" ? colors : gradientPresets[preset]
  const colorString = gradientColors?.join(", ") || ""

  const directionMap = {
    "to-r": "to right",
    "to-l": "to left",
    "to-t": "to top",
    "to-b": "to bottom",
    "to-br": "to bottom right",
    "to-bl": "to bottom left",
    "to-tr": "to top right",
    "to-tl": "to top left",
  }

  return (
    <div
      className={cn(
        "relative",
        animate && "bg-[length:200%_200%] animate-gradient-shift",
        className
      )}
      style={{
        background: `linear-gradient(${directionMap[direction]}, ${colorString})`,
      }}
      {...props}
    >
      {children}

      {animate && (
        <style jsx>{`
          @keyframes gradient-shift {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          .animate-gradient-shift {
            animation: gradient-shift 8s ease infinite;
          }
        `}</style>
      )}
    </div>
  )
}

// Diagonal lines pattern
export interface DiagonalLinesProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Line spacing
   */
  spacing?: number
  /**
   * Line color
   */
  color?: string
  /**
   * Line width
   */
  lineWidth?: number
  /**
   * Angle in degrees
   */
  angle?: number
  /**
   * Opacity
   */
  opacity?: number
}

export function DiagonalLines({
  spacing = 10,
  color = "var(--color-border)",
  lineWidth = 1,
  angle = 45,
  opacity = 0.5,
  className,
  children,
  ...props
}: DiagonalLinesProps) {
  return (
    <div className={cn("relative", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            ${angle}deg,
            transparent,
            transparent ${spacing - lineWidth}px,
            ${color} ${spacing - lineWidth}px,
            ${color} ${spacing}px
          )`,
          opacity,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Checkerboard pattern
export interface CheckerboardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Square size
   */
  size?: number
  /**
   * Primary color
   */
  color1?: string
  /**
   * Secondary color
   */
  color2?: string
  /**
   * Opacity
   */
  opacity?: number
}

export function Checkerboard({
  size = 20,
  color1 = "transparent",
  color2 = "var(--color-border)",
  opacity = 0.3,
  className,
  children,
  ...props
}: CheckerboardProps) {
  return (
    <div className={cn("relative", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(45deg, ${color2} 25%, transparent 25%),
            linear-gradient(-45deg, ${color2} 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, ${color2} 75%),
            linear-gradient(-45deg, transparent 75%, ${color2} 75%)
          `,
          backgroundSize: `${size}px ${size}px`,
          backgroundPosition: `0 0, 0 ${size / 2}px, ${size / 2}px -${size / 2}px, -${size / 2}px 0px`,
          backgroundColor: color1,
          opacity,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Combined pattern wrapper
export interface PatternWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Pattern type
   */
  pattern: "grid" | "dots" | "noise" | "diagonal" | "checkerboard"
  /**
   * Pattern options
   */
  patternProps?: Record<string, unknown>
  /**
   * Background color
   */
  background?: string
}

export function PatternWrapper({
  pattern,
  patternProps = {},
  background = "var(--color-surface)",
  className,
  children,
  ...props
}: PatternWrapperProps) {
  const patterns = {
    grid: GridPattern,
    dots: DotPattern,
    noise: NoisePattern,
    diagonal: DiagonalLines,
    checkerboard: Checkerboard,
  }

  const PatternComponent = patterns[pattern]

  return (
    <div className={cn("relative", className)} style={{ background }} {...props}>
      <PatternComponent {...patternProps}>{children}</PatternComponent>
    </div>
  )
}
