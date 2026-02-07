"use client"

/**
 * Spotlight Component
 *
 * Cursor-following spotlight effects with premium design tokens.
 * Features:
 * - Radial gradient spotlight with token-based colors
 * - Smooth cursor tracking with spring easing
 * - Reveal/mask effects
 * - Token-based glow shadows
 * - Multiple spotlight modes
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Spotlight size in pixels
   */
  size?: number
  /**
   * Spotlight color variant (uses glow tokens)
   */
  variant?: "primary" | "accent" | "success" | "warning" | "error"
  /**
   * Custom spotlight color (overrides variant)
   */
  color?: string
  /**
   * Spotlight opacity
   */
  opacity?: number
  /**
   * Blur amount
   */
  blur?: "sm" | "md" | "lg" | "xl"
  /**
   * Only show spotlight on hover
   */
  hoverOnly?: boolean
  /**
   * Disabled
   */
  disabled?: boolean
}

const variantColors = {
  primary: "var(--color-primary)",
  accent: "var(--color-accent)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  error: "var(--color-error)",
}

const blurValues = {
  sm: "var(--blur-sm)",
  md: "var(--blur-md)",
  lg: "var(--blur-lg)",
  xl: "var(--blur-xl)",
}

export function Spotlight({
  size = 400,
  variant = "primary",
  color,
  opacity = 0.15,
  blur,
  hoverOnly = false,
  disabled = false,
  className,
  children,
  ...props
}: SpotlightProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = React.useState(false)

  const spotlightColor = color || variantColors[variant]
  const blurValue = blur ? blurValues[blur] : undefined

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return

      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    },
    [disabled]
  )

  const showSpotlight = !disabled && (!hoverOnly || isHovering)

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      {/* Spotlight overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity ease-[var(--ease-spring)]"
        style={{
          opacity: showSpotlight ? 1 : 0,
          transitionDuration: "var(--duration-slow)",
        }}
      >
        <div
          className="absolute transition-[left,top] ease-[var(--ease-spring)]"
          style={{
            left: position.x - size / 2,
            top: position.y - size / 2,
            width: size,
            height: size,
            background: `radial-gradient(circle, color-mix(in srgb, ${spotlightColor} ${opacity * 100}%, transparent) 0%, transparent 70%)`,
            filter: blurValue ? `blur(${blurValue})` : undefined,
            transitionDuration: "var(--duration-fast)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-0">{children}</div>
    </div>
  )
}

// Spotlight card (card with spotlight effect on hover)
export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Spotlight color variant
   */
  variant?: "primary" | "accent" | "success" | "warning" | "error"
  /**
   * Spotlight size
   */
  spotlightSize?: number
  /**
   * Card style variant
   */
  cardVariant?: "default" | "bordered" | "glass"
  /**
   * Card padding
   */
  padding?: "sm" | "md" | "lg"
}

const cardVariantClasses = {
  default: "bg-[var(--color-surface)]",
  bordered: "bg-[var(--color-surface)] border border-[var(--color-border)]",
  glass: "bg-[var(--glass-bg)] backdrop-blur-[var(--blur-lg)] border border-[var(--glass-border)]",
}

const cardPaddingClasses = {
  sm: "p-[var(--space-4)]",
  md: "p-[var(--space-6)]",
  lg: "p-[var(--space-8)]",
}

export function SpotlightCard({
  variant = "primary",
  spotlightSize = 300,
  cardVariant = "bordered",
  padding = "md",
  className,
  children,
  ...props
}: SpotlightCardProps) {
  return (
    <Spotlight
      size={spotlightSize}
      variant={variant}
      opacity={0.15}
      hoverOnly
      className={cn(
        "rounded-[var(--radius-xl)]",
        cardVariantClasses[cardVariant],
        cardPaddingClasses[padding],
        "transition-shadow duration-[var(--duration-slow)] ease-[var(--ease-spring)]",
        "hover:shadow-[var(--shadow-card-hover)]",
        className
      )}
      {...props}
    >
      {children}
    </Spotlight>
  )
}

// Reveal spotlight (reveals hidden content on hover)
export interface RevealSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Hidden content to reveal
   */
  hiddenContent: React.ReactNode
  /**
   * Spotlight size
   */
  size?: number
  /**
   * Edge feather amount
   */
  feather?: number
}

export function RevealSpotlight({
  hiddenContent,
  size = 200,
  feather = 50,
  className,
  children,
  ...props
}: RevealSpotlightProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState({ x: -1000, y: -1000 })
  const [isHovering, setIsHovering] = React.useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false)
        setPosition({ x: -1000, y: -1000 })
      }}
      {...props}
    >
      {/* Base content */}
      <div className="relative z-0">{children}</div>

      {/* Hidden content (revealed by spotlight) */}
      <div
        className="absolute inset-0 z-10 transition-opacity pointer-events-none duration-[var(--duration-slow)] ease-[var(--ease-spring)]"
        style={{
          maskImage: `radial-gradient(circle ${size / 2}px at ${position.x}px ${position.y}px, black ${size / 2 - feather}px, transparent ${size / 2}px)`,
          WebkitMaskImage: `radial-gradient(circle ${size / 2}px at ${position.x}px ${position.y}px, black ${size / 2 - feather}px, transparent ${size / 2}px)`,
          opacity: isHovering ? 1 : 0,
        }}
      >
        {hiddenContent}
      </div>
    </div>
  )
}

// Spotlight border (border glow effect)
export interface SpotlightBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Border color variant
   */
  variant?: "primary" | "accent" | "success" | "warning" | "error"
  /**
   * Custom border color
   */
  color?: string
  /**
   * Border width
   */
  borderWidth?: number
  /**
   * Glow size
   */
  glowSize?: number
  /**
   * Border radius
   */
  radius?: "md" | "lg" | "xl" | "full"
}

const borderRadiusClasses = {
  md: "rounded-[var(--radius-md)]",
  lg: "rounded-[var(--radius-lg)]",
  xl: "rounded-[var(--radius-xl)]",
  full: "rounded-full",
}

export function SpotlightBorder({
  variant = "primary",
  color,
  borderWidth = 1,
  glowSize = 100,
  radius = "xl",
  className,
  children,
  ...props
}: SpotlightBorderProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = React.useState(false)

  const borderColor = color || variantColors[variant]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative p-[1px]",
        borderRadiusClasses[radius],
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        background: isHovering
          ? `radial-gradient(${glowSize}px circle at ${position.x}px ${position.y}px, ${borderColor}, transparent 40%)`
          : `transparent`,
      }}
      {...props}
    >
      {/* Border layer */}
      <div
        className={cn(
          "absolute inset-0",
          borderRadiusClasses[radius],
          "border transition-colors duration-[var(--duration-slow)] ease-[var(--ease-spring)]"
        )}
        style={{
          borderWidth,
          borderColor: isHovering ? borderColor : "var(--color-border)",
        }}
      />

      {/* Content */}
      <div
        className={cn(
          "relative bg-[var(--color-surface)]",
          borderRadiusClasses[radius]
        )}
      >
        {children}
      </div>
    </div>
  )
}

// Grid spotlight (highlights grid cells)
export interface GridSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Grid columns
   */
  columns?: number
  /**
   * Grid gap
   */
  gap?: "sm" | "md" | "lg"
  /**
   * Highlight color variant
   */
  variant?: "primary" | "accent" | "success" | "warning" | "error"
}

const gridGapClasses = {
  sm: "gap-[var(--space-2)]",
  md: "gap-[var(--space-4)]",
  lg: "gap-[var(--space-6)]",
}

const glowShadows = {
  primary: "var(--shadow-primary-glow)",
  accent: "var(--shadow-accent-glow)",
  success: "var(--shadow-success-glow)",
  warning: "var(--shadow-warning-glow)",
  error: "var(--shadow-error-glow)",
}

export function GridSpotlight({
  columns = 3,
  gap = "md",
  variant = "primary",
  className,
  children,
  ...props
}: GridSpotlightProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
  const highlightColor = variantColors[variant]
  const glowShadow = glowShadows[variant]

  return (
    <div
      className={cn(
        "grid",
        gridGapClasses[gap],
        className
      )}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      {...props}
    >
      {React.Children.map(children, (child, index) => (
        <div
          className="relative"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Glow effect */}
          <div
            className="absolute -inset-px rounded-[var(--radius-lg)] opacity-0 transition-opacity duration-[var(--duration-slow)] ease-[var(--ease-spring)]"
            style={{
              opacity: hoveredIndex === index ? 1 : 0,
              background: `radial-gradient(circle at center, color-mix(in srgb, ${highlightColor} 20%, transparent) 0%, transparent 70%)`,
              boxShadow: hoveredIndex === index ? glowShadow : "none",
            }}
          />
          <div className="relative">{child}</div>
        </div>
      ))}
    </div>
  )
}

// Hero spotlight (for hero sections)
export interface HeroSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of spotlights
   */
  spotlights?: Array<{
    variant?: "primary" | "accent" | "success" | "warning" | "error"
    color?: string
    size?: number
    x: number | string
    y: number | string
    blur?: "sm" | "md" | "lg" | "xl"
  }>
  /**
   * Animate spotlights
   */
  animate?: boolean
}

export function HeroSpotlight({
  spotlights = [
    { variant: "primary", size: 600, x: "20%", y: "30%" },
    { variant: "accent", size: 500, x: "80%", y: "60%" },
  ],
  animate = true,
  className,
  children,
  ...props
}: HeroSpotlightProps) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {/* Spotlight effects */}
      <div className="absolute inset-0 pointer-events-none">
        {spotlights.map((spot, index) => {
          const spotColor = spot.color || variantColors[spot.variant || "primary"]
          const spotBlur = spot.blur ? blurValues[spot.blur] : "40px"

          return (
            <div
              key={index}
              className={cn(
                "absolute rounded-full",
                animate && "animate-pulse"
              )}
              style={{
                left: spot.x,
                top: spot.y,
                width: spot.size || 400,
                height: spot.size || 400,
                background: `radial-gradient(circle, color-mix(in srgb, ${spotColor} 30%, transparent) 0%, transparent 70%)`,
                filter: `blur(${spotBlur})`,
                transform: "translate(-50%, -50%)",
                animationDuration: animate ? `${4 + index}s` : undefined,
              }}
            />
          )
        })}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
