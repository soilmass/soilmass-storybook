"use client"

/**
 * Magnetic Elements Component
 *
 * Elements that respond to mouse proximity.
 * Features:
 * - Magnetic attraction
 * - Smooth animations
 * - Customizable strength
 * - Multiple variants
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Base magnetic hook
export function useMagnetic(options: {
  strength?: number
  radius?: number
  smoothing?: number
} = {}) {
  const { strength = 0.3, radius = 150, smoothing = 0.1 } = options
  const ref = React.useRef<HTMLElement>(null)
  const [offset, setOffset] = React.useState({ x: 0, y: 0 })
  const targetOffset = React.useRef({ x: 0, y: 0 })
  const animationRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      const distance = Math.sqrt(distX * distX + distY * distY)

      if (distance < radius) {
        const force = (radius - distance) / radius
        targetOffset.current = {
          x: distX * strength * force,
          y: distY * strength * force,
        }
      } else {
        targetOffset.current = { x: 0, y: 0 }
      }
    }

    const handleMouseLeave = () => {
      targetOffset.current = { x: 0, y: 0 }
    }

    const animate = () => {
      setOffset((prev) => ({
        x: prev.x + (targetOffset.current.x - prev.x) * smoothing,
        y: prev.y + (targetOffset.current.y - prev.y) * smoothing,
      }))
      animationRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [strength, radius, smoothing])

  return { ref, offset }
}

// Magnetic wrapper
export interface MagneticWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Magnetic strength (0-1)
   */
  strength?: number
  /**
   * Magnetic radius
   */
  radius?: number
  /**
   * Smoothing factor
   */
  smoothing?: number
  /**
   * As child (passes ref to child)
   */
  asChild?: boolean
}

export function MagneticWrapper({
  strength = 0.3,
  radius = 150,
  smoothing = 0.1,
  asChild = false,
  className,
  children,
  ...props
}: MagneticWrapperProps) {
  const { ref, offset } = useMagnetic({ strength, radius, smoothing })

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ style?: React.CSSProperties; ref?: React.Ref<HTMLElement> }>, {
      ref: ref as React.Ref<HTMLElement>,
      style: {
        ...(children.props as { style?: React.CSSProperties }).style,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      },
    })
  }

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn("inline-block", className)}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      {...props}
    >
      {children}
    </div>
  )
}

// Magnetic button
export interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Magnetic strength
   */
  strength?: number
  /**
   * Magnetic radius
   */
  radius?: number
  /**
   * Button variant
   */
  variant?: "default" | "primary" | "secondary" | "ghost"
  /**
   * Button size
   */
  size?: "sm" | "md" | "lg"
}

export function MagneticButton({
  strength = 0.4,
  radius = 150,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: MagneticButtonProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [offset, setOffset] = React.useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = React.useState(false)

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !isHovered) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distX = e.clientX - centerX
      const distY = e.clientY - centerY

      setOffset({
        x: distX * strength,
        y: distY * strength,
      })
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [strength, isHovered])

  const handleMouseLeave = () => {
    setIsHovered(false)
    setOffset({ x: 0, y: 0 })
  }

  const variantStyles = {
    default: "bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]",
    primary: "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-hover)]",
    secondary: "bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] hover:bg-[var(--color-secondary-hover)]",
    ghost: "hover:bg-[var(--color-surface-hover)] text-[var(--color-text)]",
  }

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }

  return (
    <div
      ref={containerRef}
      className="inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={cn(
          "relative rounded-lg font-medium transition-all duration-150",
          "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)]",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
        {...props}
      >
        {children}
      </button>
    </div>
  )
}

// Magnetic link
export interface MagneticLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Magnetic strength
   */
  strength?: number
  /**
   * Underline style
   */
  underline?: "none" | "hover" | "always"
}

export function MagneticLink({
  strength = 0.3,
  underline = "hover",
  className,
  children,
  ...props
}: MagneticLinkProps) {
  const containerRef = React.useRef<HTMLSpanElement>(null)
  const [offset, setOffset] = React.useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = React.useState(false)

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !isHovered) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distX = e.clientX - centerX
      const distY = e.clientY - centerY

      setOffset({
        x: distX * strength,
        y: distY * strength,
      })
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [strength, isHovered])

  const underlineStyles = {
    none: "",
    hover: "hover:underline",
    always: "underline",
  }

  return (
    <span
      ref={containerRef}
      className="inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setOffset({ x: 0, y: 0 })
      }}
    >
      <a
        className={cn(
          "inline-block text-[var(--color-primary)] transition-all duration-150",
          underlineStyles[underline],
          className
        )}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
        {...props}
      >
        {children}
      </a>
    </span>
  )
}

// Magnetic card
export interface MagneticCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Magnetic strength
   */
  strength?: number
  /**
   * Enable 3D tilt effect
   */
  tilt?: boolean
  /**
   * Tilt intensity
   */
  tiltIntensity?: number
  /**
   * Border radius
   */
  radius?: string
}

export function MagneticCard({
  strength = 0.2,
  tilt = true,
  tiltIntensity = 10,
  radius = "var(--radius-lg)",
  className,
  children,
  ...props
}: MagneticCardProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [offset, setOffset] = React.useState({ x: 0, y: 0 })
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = React.useState(false)

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !isHovered) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distX = e.clientX - centerX
      const distY = e.clientY - centerY

      setOffset({
        x: distX * strength,
        y: distY * strength,
      })

      if (tilt) {
        const rotateX = (distY / rect.height) * tiltIntensity * -1
        const rotateY = (distX / rect.width) * tiltIntensity
        setRotation({ x: rotateX, y: rotateY })
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [strength, tilt, tiltIntensity, isHovered])

  const handleMouseLeave = () => {
    setIsHovered(false)
    setOffset({ x: 0, y: 0 })
    setRotation({ x: 0, y: 0 })
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm",
        "transition-all duration-150",
        className
      )}
      style={{
        borderRadius: radius,
        transform: `translate(${offset.x}px, ${offset.y}px) perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  )
}

// Magnetic icon
export interface MagneticIconProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Icon element
   */
  icon: React.ReactNode
  /**
   * Magnetic strength
   */
  strength?: number
  /**
   * Icon size
   */
  size?: number
  /**
   * Background color on hover
   */
  hoverBackground?: string
}

export function MagneticIcon({
  icon,
  strength = 0.5,
  size = 40,
  hoverBackground = "var(--color-surface-hover)",
  className,
  ...props
}: MagneticIconProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [offset, setOffset] = React.useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = React.useState(false)

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !isHovered) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distX = e.clientX - centerX
      const distY = e.clientY - centerY

      setOffset({
        x: distX * strength,
        y: distY * strength,
      })
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [strength, isHovered])

  return (
    <div
      ref={containerRef}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-all duration-150",
        className
      )}
      style={{
        width: size,
        height: size,
        backgroundColor: isHovered ? hoverBackground : "transparent",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setOffset({ x: 0, y: 0 })
      }}
      {...props}
    >
      <div
        className="transition-transform duration-150"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
      >
        {icon}
      </div>
    </div>
  )
}

// Magnetic image
export interface MagneticImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Magnetic strength
   */
  strength?: number
  /**
   * Enable parallax layers
   */
  parallax?: boolean
  /**
   * Border radius
   */
  radius?: string
}

export function MagneticImage({
  strength = 0.15,
  parallax = false,
  radius = "var(--radius-lg)",
  className,
  src,
  alt,
  ...props
}: MagneticImageProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [offset, setOffset] = React.useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = React.useState(false)

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !isHovered) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distX = e.clientX - centerX
      const distY = e.clientY - centerY

      setOffset({
        x: distX * strength,
        y: distY * strength,
      })
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [strength, isHovered])

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ borderRadius: radius }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setOffset({ x: 0, y: 0 })
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-150"
        style={{
          transform: parallax
            ? `translate(${offset.x * 2}px, ${offset.y * 2}px) scale(1.1)`
            : `translate(${offset.x}px, ${offset.y}px)`,
        }}
        {...props}
      />
    </div>
  )
}

// Magnetic text
export interface MagneticTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Text content
   */
  text: string
  /**
   * Magnetic strength per character
   */
  strength?: number
  /**
   * Magnetic radius
   */
  radius?: number
}

export function MagneticText({
  text,
  strength = 0.5,
  radius = 50,
  className,
  ...props
}: MagneticTextProps) {
  const containerRef = React.useRef<HTMLSpanElement>(null)
  const [charOffsets, setCharOffsets] = React.useState<Array<{ x: number; y: number }>>([])
  const charRefs = React.useRef<(HTMLSpanElement | null)[]>([])

  React.useEffect(() => {
    setCharOffsets(new Array(text.length).fill({ x: 0, y: 0 }))
  }, [text])

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newOffsets = charRefs.current.map((charRef) => {
        if (!charRef) return { x: 0, y: 0 }

        const rect = charRef.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const distX = e.clientX - centerX
        const distY = e.clientY - centerY
        const distance = Math.sqrt(distX * distX + distY * distY)

        if (distance < radius) {
          const force = (radius - distance) / radius
          return {
            x: distX * strength * force,
            y: distY * strength * force,
          }
        }

        return { x: 0, y: 0 }
      })

      setCharOffsets(newOffsets)
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [text, strength, radius])

  return (
    <span ref={containerRef} className={cn("inline-block", className)} {...props}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          ref={(el) => {
            charRefs.current[index] = el
          }}
          className="inline-block transition-transform duration-100"
          style={{
            transform: charOffsets[index]
              ? `translate(${charOffsets[index].x}px, ${charOffsets[index].y}px)`
              : undefined,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  )
}
