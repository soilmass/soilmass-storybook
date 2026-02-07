"use client"

/**
 * Tilt Card Component
 *
 * Premium 3D tilt effect with design token integration.
 * Features:
 * - Smooth perspective transformation
 * - Spring easing (--ease-spring) for return animation
 * - Shadow lift on tilt using token shadows
 * - Glare/shine effect
 * - Touch support
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum tilt angle in degrees
   */
  maxTilt?: number
  /**
   * Perspective depth
   */
  perspective?: number
  /**
   * Scale on hover (uses --scale-hover token)
   */
  scale?: number
  /**
   * Show glare effect
   */
  glare?: boolean
  /**
   * Maximum glare opacity
   */
  glareOpacity?: number
  /**
   * Reset tilt on leave
   */
  resetOnLeave?: boolean
  /**
   * Disable tilt effect
   */
  disabled?: boolean
  /**
   * Tilt axis (both, x, or y)
   */
  axis?: "both" | "x" | "y"
  /**
   * Reverse tilt direction
   */
  reverse?: boolean
  /**
   * Enable shadow lift effect
   */
  shadowLift?: boolean
  /**
   * Inner content className
   */
  innerClassName?: string
}

export function TiltCard({
  maxTilt = 15,
  perspective = 1000,
  scale = 1.02,
  glare = true,
  glareOpacity = 0.3,
  resetOnLeave = true,
  disabled = false,
  axis = "both",
  reverse = false,
  shadowLift = true,
  innerClassName,
  className,
  children,
  style,
  ...props
}: TiltCardProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [tiltStyle, setTiltStyle] = React.useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  })
  const [glareStyle, setGlareStyle] = React.useState({
    x: 50,
    y: 50,
    opacity: 0,
  })
  const [isHovering, setIsHovering] = React.useState(false)

  const multiplier = reverse ? -1 : 1

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return

      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      const tiltX = axis !== "y" ? (y - 0.5) * maxTilt * 2 * multiplier : 0
      const tiltY = axis !== "x" ? (x - 0.5) * maxTilt * 2 * multiplier * -1 : 0

      setTiltStyle({
        rotateX: tiltX,
        rotateY: tiltY,
        scale,
      })

      if (glare) {
        setGlareStyle({
          x: x * 100,
          y: y * 100,
          opacity: glareOpacity,
        })
      }
    },
    [disabled, maxTilt, scale, glare, glareOpacity, axis, multiplier]
  )

  const handleMouseEnter = React.useCallback(() => {
    if (!disabled) {
      setIsHovering(true)
    }
  }, [disabled])

  const handleMouseLeave = React.useCallback(() => {
    setIsHovering(false)
    if (resetOnLeave) {
      setTiltStyle({
        rotateX: 0,
        rotateY: 0,
        scale: 1,
      })
      setGlareStyle((prev) => ({ ...prev, opacity: 0 }))
    }
  }, [resetOnLeave])

  const handleTouchMove = React.useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (disabled) return

      const container = containerRef.current
      if (!container) return

      const touch = e.touches[0]
      const rect = container.getBoundingClientRect()
      const x = (touch.clientX - rect.left) / rect.width
      const y = (touch.clientY - rect.top) / rect.height

      const tiltX = axis !== "y" ? (y - 0.5) * maxTilt * 2 * multiplier : 0
      const tiltY = axis !== "x" ? (x - 0.5) * maxTilt * 2 * multiplier * -1 : 0

      setTiltStyle({
        rotateX: tiltX,
        rotateY: tiltY,
        scale,
      })
    },
    [disabled, maxTilt, scale, axis, multiplier]
  )

  // Calculate dynamic shadow based on tilt
  const getShadow = () => {
    if (!shadowLift || !isHovering) return "var(--shadow-card)"

    const intensity = Math.abs(tiltStyle.rotateX) + Math.abs(tiltStyle.rotateY)
    if (intensity > 10) return "var(--shadow-card-hover)"
    return "var(--shadow-lg)"
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative",
        !disabled && "cursor-pointer",
        className
      )}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      {...props}
    >
      <div
        className={cn(
          "relative w-full h-full will-change-transform",
          "transition-[transform,box-shadow]",
          innerClassName
        )}
        style={{
          transform: `rotateX(${tiltStyle.rotateX}deg) rotateY(${tiltStyle.rotateY}deg) scale(${tiltStyle.scale})`,
          transitionDuration: "var(--duration-slow)",
          transitionTimingFunction: "var(--ease-spring)",
          transformStyle: "preserve-3d",
          boxShadow: getShadow(),
          borderRadius: "inherit",
        }}
      >
        {children}

        {/* Glare effect */}
        {glare && (
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{ borderRadius: "inherit" }}
          >
            <div
              className="absolute inset-0 transition-opacity"
              style={{
                background: `radial-gradient(circle at ${glareStyle.x}% ${glareStyle.y}%, rgba(255,255,255,${glareStyle.opacity}), transparent 60%)`,
                opacity: glareStyle.opacity > 0 ? 1 : 0,
                transitionDuration: "var(--duration-slow)",
                transitionTimingFunction: "var(--ease-spring)",
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

// Tilt card wrapper with common styling
export interface TiltCardContainerProps extends TiltCardProps {
  /**
   * Card variant
   */
  variant?: "default" | "glass" | "gradient" | "dark"
  /**
   * Padding
   */
  padding?: "none" | "sm" | "md" | "lg"
  /**
   * Border radius
   */
  rounded?: "none" | "md" | "lg" | "xl"
}

const variantClasses = {
  default: "bg-[var(--color-surface)] border border-[var(--color-border)]",
  glass: "bg-[var(--glass-bg)] backdrop-blur-[var(--blur-lg)] border border-[var(--glass-border)]",
  gradient: "bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 border border-[var(--color-primary)]/20",
  dark: "bg-[var(--color-surface-inverse)] text-[var(--color-text-inverse)]",
}

const paddingClasses = {
  none: "p-0",
  sm: "p-[var(--space-4)]",
  md: "p-[var(--space-6)]",
  lg: "p-[var(--space-8)]",
}

const roundedClasses = {
  none: "rounded-none",
  md: "rounded-[var(--radius-md)]",
  lg: "rounded-[var(--radius-lg)]",
  xl: "rounded-[var(--radius-xl)]",
}

export function TiltCardContainer({
  variant = "default",
  padding = "md",
  rounded = "xl",
  className,
  children,
  ...props
}: TiltCardContainerProps) {
  return (
    <TiltCard
      className={cn(
        variantClasses[variant],
        paddingClasses[padding],
        roundedClasses[rounded],
        className
      )}
      {...props}
    >
      {children}
    </TiltCard>
  )
}

// Parallax tilt (with layered content)
export interface ParallaxTiltProps extends TiltCardProps {
  /**
   * Background layer
   */
  background?: React.ReactNode
  /**
   * Foreground layer (most parallax)
   */
  foreground?: React.ReactNode
  /**
   * Parallax intensity (0-1)
   */
  parallaxIntensity?: number
}

export function ParallaxTilt({
  background,
  foreground,
  parallaxIntensity = 0.1,
  children,
  className,
  ...props
}: ParallaxTiltProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [offset, setOffset] = React.useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    setOffset({ x, y })
  }

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 })
  }

  const bgOffset = parallaxIntensity * 10
  const fgOffset = parallaxIntensity * 30

  return (
    <TiltCard
      className={cn("overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div ref={containerRef} className="relative w-full h-full">
        {/* Background layer */}
        {background && (
          <div
            className="absolute inset-0 transition-transform"
            style={{
              transform: `translate(${offset.x * bgOffset}px, ${offset.y * bgOffset}px) scale(1.05)`,
              transitionDuration: "var(--duration-slow)",
              transitionTimingFunction: "var(--ease-spring)",
            }}
          >
            {background}
          </div>
        )}

        {/* Main content */}
        <div className="relative z-10">{children}</div>

        {/* Foreground layer */}
        {foreground && (
          <div
            className="absolute inset-0 pointer-events-none transition-transform z-20"
            style={{
              transform: `translate(${offset.x * fgOffset}px, ${offset.y * fgOffset}px)`,
              transitionDuration: "var(--duration-slow)",
              transitionTimingFunction: "var(--ease-spring)",
            }}
          >
            {foreground}
          </div>
        )}
      </div>
    </TiltCard>
  )
}

// Magnetic effect (follows cursor slightly)
export interface MagneticProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Magnetic strength
   */
  strength?: number
  /**
   * Disabled
   */
  disabled?: boolean
}

export function Magnetic({
  strength = 0.3,
  disabled = false,
  className,
  children,
  ...props
}: MagneticProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return

    const element = ref.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const x = (e.clientX - centerX) * strength
    const y = (e.clientY - centerY) * strength

    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <div
      ref={ref}
      className={cn("inline-block", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div
        className="transition-transform will-change-transform"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transitionDuration: "var(--duration-slow)",
          transitionTimingFunction: "var(--ease-spring)",
        }}
      >
        {children}
      </div>
    </div>
  )
}

// Tilt image (for product images)
export interface TiltImageProps extends TiltCardProps {
  /**
   * Image source
   */
  src: string
  /**
   * Image alt text
   */
  alt: string
  /**
   * Aspect ratio
   */
  aspectRatio?: "square" | "video" | "portrait" | "auto"
}

const aspectClasses = {
  square: "aspect-square",
  video: "aspect-[var(--aspect-video)]",
  portrait: "aspect-[var(--aspect-portrait)]",
  auto: "",
}

export function TiltImage({
  src,
  alt,
  aspectRatio = "square",
  className,
  ...props
}: TiltImageProps) {
  return (
    <TiltCard
      className={cn(
        "overflow-hidden rounded-[var(--radius-xl)]",
        aspectClasses[aspectRatio],
        className
      )}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </TiltCard>
  )
}

// Floating card (combines tilt with floating animation)
export interface FloatingCardProps extends TiltCardProps {
  /**
   * Float animation intensity
   */
  floatIntensity?: number
}

export function FloatingCard({
  floatIntensity = 10,
  className,
  children,
  ...props
}: FloatingCardProps) {
  return (
    <div
      className="animate-float"
      style={
        {
          "--float-intensity": `${floatIntensity}px`,
        } as React.CSSProperties
      }
    >
      <TiltCard className={className} {...props}>
        {children}
      </TiltCard>
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(calc(-1 * var(--float-intensity)));
          }
        }
        .animate-float {
          animation: float 3s var(--ease-spring) infinite;
        }
      `}</style>
    </div>
  )
}
