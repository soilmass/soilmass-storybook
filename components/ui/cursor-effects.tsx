"use client"

/**
 * Cursor Effects Component
 *
 * Custom cursor effects and interactions.
 * Features:
 * - Custom cursor styles
 * - Trailing effects
 * - Spotlight following
 * - Morphing cursors
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Custom cursor context
interface CursorContextValue {
  cursorType: string
  setCursorType: (type: string) => void
  cursorText: string
  setCursorText: (text: string) => void
}

const CursorContext = React.createContext<CursorContextValue | null>(null)

export function useCursor() {
  const context = React.useContext(CursorContext)
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider")
  }
  return context
}

// Cursor provider
export interface CursorProviderProps {
  children: React.ReactNode
}

export function CursorProvider({ children }: CursorProviderProps) {
  const [cursorType, setCursorType] = React.useState("default")
  const [cursorText, setCursorText] = React.useState("")

  return (
    <CursorContext.Provider value={{ cursorType, setCursorType, cursorText, setCursorText }}>
      {children}
    </CursorContext.Provider>
  )
}

// Custom cursor component
export interface CustomCursorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Cursor size
   */
  size?: number
  /**
   * Cursor color
   */
  color?: string
  /**
   * Show outer ring
   */
  showRing?: boolean
  /**
   * Ring size
   */
  ringSize?: number
  /**
   * Blend mode
   */
  blendMode?: "normal" | "difference" | "exclusion"
  /**
   * Smoothing factor (0-1, higher = smoother)
   */
  smoothing?: number
}

export function CustomCursor({
  size = 10,
  color = "var(--color-primary)",
  showRing = true,
  ringSize = 40,
  blendMode = "normal",
  smoothing = 0.15,
  className,
  ...props
}: CustomCursorProps) {
  const cursorRef = React.useRef<HTMLDivElement>(null)
  const ringRef = React.useRef<HTMLDivElement>(null)
  const positionRef = React.useRef({ x: 0, y: 0 })
  const ringPositionRef = React.useRef({ x: 0, y: 0 })

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${positionRef.current.x}px`
        cursorRef.current.style.top = `${positionRef.current.y}px`
      }

      if (ringRef.current && showRing) {
        ringPositionRef.current.x += (positionRef.current.x - ringPositionRef.current.x) * smoothing
        ringPositionRef.current.y += (positionRef.current.y - ringPositionRef.current.y) * smoothing
        ringRef.current.style.left = `${ringPositionRef.current.x}px`
        ringRef.current.style.top = `${ringPositionRef.current.y}px`
      }

      requestAnimationFrame(animate)
    }

    document.addEventListener("mousemove", handleMouseMove)
    const animationId = requestAnimationFrame(animate)

    // Hide default cursor
    document.body.style.cursor = "none"

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
      document.body.style.cursor = ""
    }
  }, [showRing, smoothing])

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className={cn(
          "fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full",
          className
        )}
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          mixBlendMode: blendMode,
        }}
        {...props}
      />

      {/* Outer ring */}
      {showRing && (
        <div
          ref={ringRef}
          className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-transform duration-150"
          style={{
            width: ringSize,
            height: ringSize,
            borderColor: color,
            mixBlendMode: blendMode,
          }}
        />
      )}
    </>
  )
}

// Cursor trail effect
export interface CursorTrailProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of trail segments
   */
  segments?: number
  /**
   * Trail color
   */
  color?: string
  /**
   * Segment size
   */
  segmentSize?: number
  /**
   * Trail decay speed
   */
  decay?: number
}

export function CursorTrail({
  segments = 20,
  color = "var(--color-primary)",
  segmentSize = 8,
  decay = 0.9,
  className,
  ...props
}: CursorTrailProps) {
  const trailRef = React.useRef<HTMLDivElement[]>([])
  const positionsRef = React.useRef<Array<{ x: number; y: number }>>([])

  React.useEffect(() => {
    // Initialize positions
    positionsRef.current = Array(segments).fill({ x: 0, y: 0 })

    const handleMouseMove = (e: MouseEvent) => {
      positionsRef.current.unshift({ x: e.clientX, y: e.clientY })
      positionsRef.current.pop()
    }

    const animate = () => {
      trailRef.current.forEach((el, i) => {
        if (el && positionsRef.current[i]) {
          const pos = positionsRef.current[i]
          const scale = 1 - (i / segments) * 0.8
          const opacity = 1 - (i / segments)

          el.style.left = `${pos.x}px`
          el.style.top = `${pos.y}px`
          el.style.transform = `translate(-50%, -50%) scale(${scale})`
          el.style.opacity = String(opacity)
        }
      })

      requestAnimationFrame(animate)
    }

    document.addEventListener("mousemove", handleMouseMove)
    const animationId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [segments])

  return (
    <>
      {Array.from({ length: segments }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRef.current[i] = el
          }}
          className={cn(
            "fixed pointer-events-none z-[9999] rounded-full",
            className
          )}
          style={{
            width: segmentSize,
            height: segmentSize,
            backgroundColor: color,
          }}
          {...props}
        />
      ))}
    </>
  )
}

// Cursor spotlight effect
export interface CursorSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Spotlight size
   */
  size?: number
  /**
   * Spotlight color
   */
  color?: string
  /**
   * Spotlight intensity
   */
  intensity?: number
}

export function CursorSpotlight({
  size = 300,
  color = "var(--color-primary)",
  intensity = 0.3,
  className,
  children,
  ...props
}: CursorSpotlightProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const spotlightRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !spotlightRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      spotlightRef.current.style.left = `${x}px`
      spotlightRef.current.style.top = `${y}px`
    }

    const container = containerRef.current
    container?.addEventListener("mousemove", handleMouseMove)

    return () => {
      container?.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <div
        ref={spotlightRef}
        className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          opacity: intensity,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Cursor glow (follows cursor with glow effect)
export interface CursorGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Glow size
   */
  size?: number
  /**
   * Glow color
   */
  color?: string
  /**
   * Blur amount
   */
  blur?: number
}

export function CursorGlow({
  size = 200,
  color = "var(--color-primary)",
  blur = 60,
  className,
  children,
  ...props
}: CursorGlowProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [isInside, setIsInside] = React.useState(false)

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const handleMouseEnter = () => setIsInside(true)
    const handleMouseLeave = () => setIsInside(false)

    const container = containerRef.current
    container?.addEventListener("mousemove", handleMouseMove)
    container?.addEventListener("mouseenter", handleMouseEnter)
    container?.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container?.removeEventListener("mousemove", handleMouseMove)
      container?.removeEventListener("mouseenter", handleMouseEnter)
      container?.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <div
        className="absolute pointer-events-none transition-opacity duration-300"
        style={{
          left: position.x,
          top: position.y,
          width: size,
          height: size,
          transform: "translate(-50%, -50%)",
          background: color,
          filter: `blur(${blur}px)`,
          opacity: isInside ? 0.5 : 0,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Cursor text (shows text near cursor)
export interface CursorTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Text to display
   */
  text: string
  /**
   * Text offset from cursor
   */
  offset?: { x: number; y: number }
  /**
   * Show on hover only
   */
  showOnHover?: boolean
}

export function CursorText({
  text,
  offset = { x: 20, y: 20 },
  showOnHover = true,
  className,
  children,
  ...props
}: CursorTextProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const textRef = React.useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = React.useState(!showOnHover)

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !textRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      textRef.current.style.left = `${e.clientX - rect.left + offset.x}px`
      textRef.current.style.top = `${e.clientY - rect.top + offset.y}px`
    }

    const handleMouseEnter = () => showOnHover && setIsVisible(true)
    const handleMouseLeave = () => showOnHover && setIsVisible(false)

    const container = containerRef.current
    container?.addEventListener("mousemove", handleMouseMove)
    container?.addEventListener("mouseenter", handleMouseEnter)
    container?.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container?.removeEventListener("mousemove", handleMouseMove)
      container?.removeEventListener("mouseenter", handleMouseEnter)
      container?.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [offset.x, offset.y, showOnHover])

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      {...props}
    >
      {children}
      <div
        ref={textRef}
        className={cn(
          "absolute pointer-events-none z-50 px-2 py-1 rounded text-sm font-medium",
          "bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg",
          "transition-opacity duration-150",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      >
        {text}
      </div>
    </div>
  )
}

// Cursor highlight (highlights element on hover)
export interface CursorHighlightProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Highlight color
   */
  color?: string
  /**
   * Highlight padding
   */
  padding?: number
  /**
   * Border radius
   */
  radius?: string
}

export function CursorHighlight({
  color = "var(--color-primary)",
  padding = 8,
  radius = "var(--radius-md)",
  className,
  children,
  ...props
}: CursorHighlightProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div
        className="absolute pointer-events-none transition-all duration-200"
        style={{
          inset: -padding,
          borderRadius: radius,
          backgroundColor: color,
          opacity: isHovered ? 0.1 : 0,
          transform: isHovered ? "scale(1)" : "scale(0.95)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Magnetic cursor (elements attract cursor)
export interface MagneticCursorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Magnetic strength
   */
  strength?: number
  /**
   * Magnetic radius
   */
  radius?: number
}

export function MagneticCursor({
  strength = 0.3,
  radius = 100,
  className,
  children,
  ...props
}: MagneticCursorProps) {
  const elementRef = React.useRef<HTMLDivElement>(null)
  const [offset, setOffset] = React.useState({ x: 0, y: 0 })

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef.current) return

      const rect = elementRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      const distance = Math.sqrt(distX * distX + distY * distY)

      if (distance < radius) {
        const force = (radius - distance) / radius
        setOffset({
          x: distX * strength * force,
          y: distY * strength * force,
        })
      } else {
        setOffset({ x: 0, y: 0 })
      }
    }

    const handleMouseLeave = () => setOffset({ x: 0, y: 0 })

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [strength, radius])

  return (
    <div
      ref={elementRef}
      className={cn("inline-block transition-transform duration-150", className)}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

// Cursor morph (cursor changes shape on hover)
export interface CursorMorphProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Default cursor size
   */
  defaultSize?: number
  /**
   * Hover cursor size
   */
  hoverSize?: number
  /**
   * Cursor color
   */
  color?: string
  /**
   * Hover shape
   */
  hoverShape?: "circle" | "square" | "ring"
}

export function CursorMorph({
  defaultSize = 10,
  hoverSize = 50,
  color = "var(--color-primary)",
  hoverShape = "ring",
  className,
  children,
  ...props
}: CursorMorphProps) {
  const cursorRef = React.useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = React.useState(false)

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current) return
      cursorRef.current.style.left = `${e.clientX}px`
      cursorRef.current.style.top = `${e.clientY}px`
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.body.style.cursor = "none"

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.body.style.cursor = ""
    }
  }, [])

  const size = isHovering ? hoverSize : defaultSize
  const shapeStyles = {
    circle: {
      backgroundColor: isHovering ? `${color}33` : color,
      borderRadius: "50%",
    },
    square: {
      backgroundColor: isHovering ? `${color}33` : color,
      borderRadius: isHovering ? "4px" : "50%",
    },
    ring: {
      backgroundColor: isHovering ? "transparent" : color,
      border: isHovering ? `2px solid ${color}` : "none",
      borderRadius: "50%",
    },
  }

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
        style={{
          width: size,
          height: size,
          ...shapeStyles[hoverShape],
        }}
      />
      <div
        className={className}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        {...props}
      >
        {children}
      </div>
    </>
  )
}
