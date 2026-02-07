"use client"

/**
 * Text Highlight Component
 *
 * Premium text highlighting with design token integration.
 * Features:
 * - Token-based highlight colors (--color-*-muted)
 * - Spring easing animations
 * - Multiple highlight styles
 * - Animated reveal effects
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Color variant mappings
const colorVariants = {
  primary: {
    bg: "var(--color-primary-muted)",
    border: "var(--color-primary)",
    color: "var(--color-primary)",
  },
  accent: {
    bg: "var(--color-accent-muted)",
    border: "var(--color-accent)",
    color: "var(--color-accent)",
  },
  success: {
    bg: "var(--color-success-muted)",
    border: "var(--color-success)",
    color: "var(--color-success)",
  },
  warning: {
    bg: "var(--color-warning-muted)",
    border: "var(--color-warning)",
    color: "var(--color-warning)",
  },
  error: {
    bg: "var(--color-error-muted)",
    border: "var(--color-error)",
    color: "var(--color-error)",
  },
}

type ColorVariant = keyof typeof colorVariants

// Basic highlight on hover
export interface HighlightOnHoverProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Highlight color variant
   */
  variant?: ColorVariant
  /**
   * Custom highlight color
   */
  color?: string
  /**
   * Highlight type
   */
  type?: "background" | "underline" | "box"
}

export function HighlightOnHover({
  variant = "primary",
  color,
  type = "background",
  className,
  children,
  ...props
}: HighlightOnHoverProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const highlightColor = color || colorVariants[variant].bg

  const getStyles = () => {
    switch (type) {
      case "background":
        return {
          backgroundColor: isHovered ? highlightColor : "transparent",
          transition: "background-color var(--duration-slow) var(--ease-spring)",
        }
      case "underline":
        return {
          backgroundImage: `linear-gradient(${colorVariants[variant].border}, ${colorVariants[variant].border})`,
          backgroundSize: isHovered ? "100% 2px" : "0% 2px",
          backgroundPosition: "0 100%",
          backgroundRepeat: "no-repeat",
          transition: "background-size var(--duration-slow) var(--ease-spring)",
        }
      case "box":
        return {
          boxShadow: isHovered ? `inset 0 -0.5em 0 ${highlightColor}` : "none",
          transition: "box-shadow var(--duration-slow) var(--ease-spring)",
        }
    }
  }

  return (
    <span
      className={cn("inline", className)}
      style={getStyles()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </span>
  )
}

// Animated underline
export interface UnderlineAnimationProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Underline color variant
   */
  variant?: ColorVariant
  /**
   * Custom underline color
   */
  color?: string
  /**
   * Underline thickness
   */
  thickness?: number
  /**
   * Animation direction
   */
  direction?: "left" | "right" | "center" | "edges"
  /**
   * Always show (not just on hover)
   */
  always?: boolean
}

export function UnderlineAnimation({
  variant = "primary",
  color,
  thickness = 2,
  direction = "left",
  always = false,
  className,
  children,
  ...props
}: UnderlineAnimationProps) {
  const [isHovered, setIsHovered] = React.useState(always)
  const underlineColor = color || colorVariants[variant].border

  const getUnderlineStyles = () => {
    const baseStyles = {
      position: "absolute" as const,
      bottom: 0,
      height: thickness,
      backgroundColor: underlineColor,
      transition: "all var(--duration-slow) var(--ease-spring)",
    }

    switch (direction) {
      case "left":
        return {
          ...baseStyles,
          left: 0,
          width: isHovered ? "100%" : "0%",
        }
      case "right":
        return {
          ...baseStyles,
          right: 0,
          width: isHovered ? "100%" : "0%",
        }
      case "center":
        return {
          ...baseStyles,
          left: "50%",
          transform: "translateX(-50%)",
          width: isHovered ? "100%" : "0%",
        }
      case "edges":
        return {
          ...baseStyles,
          left: 0,
          right: 0,
          width: "100%",
          transform: isHovered ? "scaleX(1)" : "scaleX(0)",
        }
    }
  }

  return (
    <span
      className={cn("relative inline-block", className)}
      onMouseEnter={() => !always && setIsHovered(true)}
      onMouseLeave={() => !always && setIsHovered(false)}
      {...props}
    >
      {children}
      <span style={getUnderlineStyles()} />
    </span>
  )
}

// Box highlight (marker effect)
export interface BoxHighlightProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Highlight color variant
   */
  variant?: ColorVariant
  /**
   * Custom highlight color
   */
  color?: string
  /**
   * Highlight coverage (0-1)
   */
  coverage?: number
  /**
   * Animate on scroll
   */
  animateOnScroll?: boolean
  /**
   * Always visible
   */
  always?: boolean
}

export function BoxHighlight({
  variant = "warning",
  color,
  coverage = 0.4,
  animateOnScroll = false,
  always = true,
  className,
  children,
  ...props
}: BoxHighlightProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = React.useState(always && !animateOnScroll)
  const highlightColor = color || colorVariants[variant].bg

  React.useEffect(() => {
    if (!animateOnScroll) {
      setIsVisible(always)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [animateOnScroll, always])

  return (
    <span
      ref={ref}
      className={cn("relative inline", className)}
      {...props}
    >
      <span
        className="absolute inset-0 -z-10"
        style={{
          backgroundColor: highlightColor,
          transform: isVisible ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transitionDuration: "var(--duration-slowest)",
          transitionTimingFunction: "var(--ease-spring)",
          transitionProperty: "transform",
          top: `${(1 - coverage) * 100}%`,
        }}
      />
      {children}
    </span>
  )
}

// Gradient highlight
export interface GradientHighlightProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Gradient color variants
   */
  variants?: [ColorVariant, ColorVariant]
  /**
   * Custom gradient colors
   */
  colors?: string[]
  /**
   * Animate gradient
   */
  animate?: boolean
}

export function GradientHighlight({
  variants = ["primary", "accent"],
  colors,
  animate = true,
  className,
  children,
  ...props
}: GradientHighlightProps) {
  const gradientColors = colors || [
    colorVariants[variants[0]].color,
    colorVariants[variants[1]].color,
    colorVariants[variants[0]].color,
  ]
  const gradient = `linear-gradient(90deg, ${gradientColors.join(", ")})`

  return (
    <span
      className={cn(
        "inline bg-clip-text text-transparent",
        animate && "bg-[length:200%_auto] animate-gradient-x",
        className
      )}
      style={{
        backgroundImage: gradient,
      }}
      {...props}
    >
      {children}

      {animate && (
        <style jsx>{`
          @keyframes gradient-x {
            0%, 100% {
              background-position: 0% center;
            }
            50% {
              background-position: 100% center;
            }
          }
          .animate-gradient-x {
            animation: gradient-x 3s var(--ease-default) infinite;
          }
        `}</style>
      )}
    </span>
  )
}

// Typewriter highlight
export interface TypewriterHighlightProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Highlight color variant
   */
  variant?: ColorVariant
  /**
   * Custom highlight color
   */
  color?: string
  /**
   * Typing speed (ms per character)
   */
  speed?: number
  /**
   * Start delay (ms)
   */
  delay?: number
}

export function TypewriterHighlight({
  variant = "primary",
  color,
  speed = 50,
  delay = 0,
  className,
  children,
  ...props
}: TypewriterHighlightProps) {
  const text = typeof children === "string" ? children : ""
  const [visibleChars, setVisibleChars] = React.useState(0)
  const highlightColor = color || colorVariants[variant].bg

  React.useEffect(() => {
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleChars((prev) => {
          if (prev >= text.length) {
            clearInterval(interval)
            return prev
          }
          return prev + 1
        })
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [text, speed, delay])

  return (
    <span className={cn("relative inline", className)} {...props}>
      <span className="invisible">{text}</span>
      <span
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, ${highlightColor} ${(visibleChars / text.length) * 100}%, transparent ${(visibleChars / text.length) * 100}%)`,
        }}
      >
        {text.slice(0, visibleChars)}
        <span className="invisible">{text.slice(visibleChars)}</span>
      </span>
    </span>
  )
}

// Strikethrough animation
export interface StrikethroughProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Strikethrough color variant
   */
  variant?: ColorVariant
  /**
   * Custom strikethrough color
   */
  color?: string
  /**
   * Strikethrough thickness
   */
  thickness?: number
  /**
   * Animate on mount
   */
  animateOnMount?: boolean
}

export function Strikethrough({
  variant = "error",
  color,
  thickness = 2,
  animateOnMount = true,
  className,
  children,
  ...props
}: StrikethroughProps) {
  const [isActive, setIsActive] = React.useState(!animateOnMount)
  const strikeColor = color || colorVariants[variant].border

  React.useEffect(() => {
    if (animateOnMount) {
      const timeout = setTimeout(() => setIsActive(true), 100)
      return () => clearTimeout(timeout)
    }
  }, [animateOnMount])

  return (
    <span
      className={cn("relative inline-block", className)}
      {...props}
    >
      {children}
      <span
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 origin-left"
        style={{
          height: thickness,
          backgroundColor: strikeColor,
          transform: isActive ? "scaleX(1) translateY(-50%)" : "scaleX(0) translateY(-50%)",
          transitionDuration: "var(--duration-slowest)",
          transitionTimingFunction: "var(--ease-spring)",
          transitionProperty: "transform",
        }}
      />
    </span>
  )
}

// Circle highlight
export interface CircleHighlightProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Circle color variant
   */
  variant?: ColorVariant
  /**
   * Custom circle color
   */
  color?: string
  /**
   * Circle thickness
   */
  thickness?: number
  /**
   * Animate on hover
   */
  animateOnHover?: boolean
}

export function CircleHighlight({
  variant = "primary",
  color,
  thickness = 2,
  animateOnHover = true,
  className,
  children,
  ...props
}: CircleHighlightProps) {
  const [isActive, setIsActive] = React.useState(!animateOnHover)
  const circleColor = color || colorVariants[variant].border

  return (
    <span
      className={cn("relative inline-block px-2", className)}
      onMouseEnter={() => animateOnHover && setIsActive(true)}
      onMouseLeave={() => animateOnHover && setIsActive(false)}
      {...props}
    >
      {children}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <ellipse
          cx="50"
          cy="50"
          rx="48"
          ry="45"
          fill="none"
          stroke={circleColor}
          strokeWidth={thickness}
          strokeDasharray="300"
          strokeDashoffset={isActive ? 0 : 300}
          style={{
            transition: "stroke-dashoffset var(--duration-slowest) var(--ease-spring)",
          }}
        />
      </svg>
    </span>
  )
}

// Brush stroke highlight
export interface BrushHighlightProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Brush color variant
   */
  variant?: ColorVariant
  /**
   * Custom brush color
   */
  color?: string
  /**
   * Brush style
   */
  type?: "underline" | "through" | "background"
}

export function BrushHighlight({
  variant = "primary",
  color,
  type = "underline",
  className,
  children,
  ...props
}: BrushHighlightProps) {
  const [isActive, setIsActive] = React.useState(false)
  const brushColor = color || colorVariants[variant].border

  React.useEffect(() => {
    const timeout = setTimeout(() => setIsActive(true), 100)
    return () => clearTimeout(timeout)
  }, [])

  const getPath = () => {
    switch (type) {
      case "underline":
        return "M0,95 Q25,85 50,95 T100,90"
      case "through":
        return "M0,50 Q25,45 50,55 T100,50"
      case "background":
        return "M5,10 Q25,5 50,15 T95,10 L95,90 Q75,95 50,85 T5,90 Z"
    }
  }

  return (
    <span
      className={cn("relative inline-block", className)}
      {...props}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none -z-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d={getPath()}
          fill={type === "background" ? `color-mix(in srgb, ${brushColor} 30%, transparent)` : "none"}
          stroke={type !== "background" ? brushColor : "none"}
          strokeWidth={type !== "background" ? 4 : 0}
          strokeLinecap="round"
          strokeDasharray="200"
          strokeDashoffset={isActive ? 0 : 200}
          style={{
            transition: "stroke-dashoffset var(--duration-slowest) var(--ease-spring), fill var(--duration-slowest) var(--ease-spring)",
          }}
        />
      </svg>
      {children}
    </span>
  )
}

// Split color text
export interface SplitColorProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * First half color variant
   */
  variant1?: ColorVariant
  /**
   * Second half color variant
   */
  variant2?: ColorVariant
  /**
   * Custom first half color
   */
  color1?: string
  /**
   * Custom second half color
   */
  color2?: string
  /**
   * Split position (0-100)
   */
  splitAt?: number
  /**
   * Animate split
   */
  animate?: boolean
}

export function SplitColor({
  variant1,
  variant2 = "primary",
  color1 = "var(--color-text)",
  color2,
  splitAt = 50,
  animate = false,
  className,
  children,
  ...props
}: SplitColorProps) {
  const [split, setSplit] = React.useState(animate ? 0 : splitAt)
  const firstColor = color1 || (variant1 ? colorVariants[variant1].color : "var(--color-text)")
  const secondColor = color2 || colorVariants[variant2].color

  React.useEffect(() => {
    if (animate) {
      const timeout = setTimeout(() => setSplit(splitAt), 100)
      return () => clearTimeout(timeout)
    }
  }, [animate, splitAt])

  return (
    <span
      className={cn("relative inline-block", className)}
      style={{
        background: `linear-gradient(90deg, ${firstColor} ${split}%, ${secondColor} ${split}%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        transition: animate ? "background var(--duration-slowest) var(--ease-spring)" : undefined,
      }}
      {...props}
    >
      {children}
    </span>
  )
}

// Marker highlight (like a real marker) - uses primary-muted token
export interface MarkerHighlightProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Marker color variant
   */
  variant?: ColorVariant
  /**
   * Custom marker color
   */
  color?: string
  /**
   * Marker opacity
   */
  opacity?: number
  /**
   * Animate drawing
   */
  animate?: boolean
}

export function MarkerHighlight({
  variant = "primary",
  color,
  opacity = 1,
  animate = true,
  className,
  children,
  ...props
}: MarkerHighlightProps) {
  const [width, setWidth] = React.useState(animate ? 0 : 100)
  const markerColor = color || colorVariants[variant].bg

  React.useEffect(() => {
    if (animate) {
      const timeout = setTimeout(() => setWidth(100), 100)
      return () => clearTimeout(timeout)
    }
  }, [animate])

  return (
    <span
      className={cn("relative inline", className)}
      {...props}
    >
      <span
        className="absolute inset-0 -z-10 -mx-1 -skew-x-3 rounded-[var(--radius-sm)]"
        style={{
          backgroundColor: markerColor,
          opacity,
          width: `${width}%`,
          transition: animate ? "width var(--duration-slowest) var(--ease-spring)" : undefined,
        }}
      />
      {children}
    </span>
  )
}
