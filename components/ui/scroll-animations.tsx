"use client"

/**
 * Scroll Animations Component
 *
 * Scroll-triggered animation effects.
 * Features:
 * - IntersectionObserver based
 * - Multiple animation types
 * - Configurable thresholds
 * - Stagger support
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Fade in on scroll
export interface FadeInOnScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Animation direction
   */
  direction?: "up" | "down" | "left" | "right" | "none"
  /**
   * Animation duration (ms)
   */
  duration?: number
  /**
   * Animation delay (ms)
   */
  delay?: number
  /**
   * Offset distance for directional fade
   */
  offset?: number
  /**
   * Intersection threshold (0-1)
   */
  threshold?: number
  /**
   * Only animate once
   */
  once?: boolean
}

export function FadeInOnScroll({
  direction = "up",
  duration = 600,
  delay = 0,
  offset = 30,
  threshold = 0.1,
  once = true,
  className,
  children,
  ...props
}: FadeInOnScrollProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, once])

  const getInitialTransform = () => {
    switch (direction) {
      case "up": return `translateY(${offset}px)`
      case "down": return `translateY(-${offset}px)`
      case "left": return `translateX(${offset}px)`
      case "right": return `translateX(-${offset}px)`
      default: return "none"
    }
  }

  return (
    <div
      ref={ref}
      className={cn("transition-all", className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : getInitialTransform(),
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

// Scale on scroll
export interface ScaleOnScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Initial scale
   */
  initialScale?: number
  /**
   * Final scale
   */
  finalScale?: number
  /**
   * Animation duration (ms)
   */
  duration?: number
  /**
   * Intersection threshold
   */
  threshold?: number
  /**
   * Only animate once
   */
  once?: boolean
}

export function ScaleOnScroll({
  initialScale = 0.8,
  finalScale = 1,
  duration = 600,
  threshold = 0.1,
  once = true,
  className,
  children,
  ...props
}: ScaleOnScrollProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, once])

  return (
    <div
      ref={ref}
      className={cn("transition-all", className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `scale(${isVisible ? finalScale : initialScale})`,
        transitionDuration: `${duration}ms`,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

// Slide in on scroll
export interface SlideInOnScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Slide direction
   */
  direction?: "left" | "right" | "up" | "down"
  /**
   * Slide distance
   */
  distance?: number
  /**
   * Animation duration (ms)
   */
  duration?: number
  /**
   * Animation delay (ms)
   */
  delay?: number
  /**
   * Intersection threshold
   */
  threshold?: number
  /**
   * Only animate once
   */
  once?: boolean
}

export function SlideInOnScroll({
  direction = "left",
  distance = 100,
  duration = 600,
  delay = 0,
  threshold = 0.1,
  once = true,
  className,
  children,
  ...props
}: SlideInOnScrollProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, once])

  const getTransform = () => {
    if (isVisible) return "translate(0, 0)"
    switch (direction) {
      case "left": return `translateX(-${distance}px)`
      case "right": return `translateX(${distance}px)`
      case "up": return `translateY(-${distance}px)`
      case "down": return `translateY(${distance}px)`
    }
  }

  return (
    <div
      ref={ref}
      className={cn("transition-all", className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

// Rotate on scroll
export interface RotateOnScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Initial rotation (degrees)
   */
  initialRotation?: number
  /**
   * Final rotation (degrees)
   */
  finalRotation?: number
  /**
   * Animation duration (ms)
   */
  duration?: number
  /**
   * Intersection threshold
   */
  threshold?: number
  /**
   * Only animate once
   */
  once?: boolean
}

export function RotateOnScroll({
  initialRotation = -10,
  finalRotation = 0,
  duration = 600,
  threshold = 0.1,
  once = true,
  className,
  children,
  ...props
}: RotateOnScrollProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, once])

  return (
    <div
      ref={ref}
      className={cn("transition-all", className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `rotate(${isVisible ? finalRotation : initialRotation}deg)`,
        transitionDuration: `${duration}ms`,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

// Parallax scroll
export interface ParallaxScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Parallax speed (negative = opposite direction)
   */
  speed?: number
  /**
   * Parallax direction
   */
  direction?: "vertical" | "horizontal"
}

export function ParallaxScroll({
  speed = 0.5,
  direction = "vertical",
  className,
  children,
  ...props
}: ParallaxScrollProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [offset, setOffset] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementCenter = rect.top + rect.height / 2
      const distanceFromCenter = elementCenter - windowHeight / 2
      setOffset(distanceFromCenter * speed)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  const transform = direction === "vertical"
    ? `translateY(${offset}px)`
    : `translateX(${offset}px)`

  return (
    <div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{ transform }}
      {...props}
    >
      {children}
    </div>
  )
}

// Stagger children animation
export interface StaggerChildrenProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Delay between children (ms)
   */
  staggerDelay?: number
  /**
   * Animation type
   */
  animation?: "fade" | "slide-up" | "slide-left" | "scale"
  /**
   * Animation duration (ms)
   */
  duration?: number
  /**
   * Intersection threshold
   */
  threshold?: number
  /**
   * Only animate once
   */
  once?: boolean
}

export function StaggerChildren({
  staggerDelay = 100,
  animation = "fade",
  duration = 500,
  threshold = 0.1,
  once = true,
  className,
  children,
  ...props
}: StaggerChildrenProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, once])

  const getAnimationStyles = (index: number) => {
    const baseDelay = index * staggerDelay
    const baseStyles = {
      transitionDuration: `${duration}ms`,
      transitionDelay: `${baseDelay}ms`,
    }

    if (!isVisible) {
      switch (animation) {
        case "fade":
          return { ...baseStyles, opacity: 0 }
        case "slide-up":
          return { ...baseStyles, opacity: 0, transform: "translateY(20px)" }
        case "slide-left":
          return { ...baseStyles, opacity: 0, transform: "translateX(-20px)" }
        case "scale":
          return { ...baseStyles, opacity: 0, transform: "scale(0.9)" }
      }
    }

    return { ...baseStyles, opacity: 1, transform: "none" }
  }

  return (
    <div ref={ref} className={className} {...props}>
      {React.Children.map(children, (child, index) => (
        <div
          className="transition-all"
          style={getAnimationStyles(index)}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

// Reveal on scroll (with mask)
export interface RevealOnScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Reveal direction
   */
  direction?: "up" | "down" | "left" | "right"
  /**
   * Animation duration (ms)
   */
  duration?: number
  /**
   * Intersection threshold
   */
  threshold?: number
  /**
   * Only animate once
   */
  once?: boolean
  /**
   * Background color for the reveal mask
   */
  maskColor?: string
}

export function RevealOnScroll({
  direction = "up",
  duration = 800,
  threshold = 0.1,
  once = true,
  maskColor = "var(--color-primary)",
  className,
  children,
  ...props
}: RevealOnScrollProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, once])

  const getMaskTransform = () => {
    if (!isVisible) return "scaleX(1)"
    switch (direction) {
      case "up":
      case "down":
        return "scaleY(0)"
      case "left":
      case "right":
        return "scaleX(0)"
    }
  }

  const getMaskOrigin = () => {
    switch (direction) {
      case "up": return "top"
      case "down": return "bottom"
      case "left": return "left"
      case "right": return "right"
    }
  }

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {children}
      <div
        className="absolute inset-0 pointer-events-none transition-transform"
        style={{
          backgroundColor: maskColor,
          transform: getMaskTransform(),
          transformOrigin: getMaskOrigin(),
          transitionDuration: `${duration}ms`,
          transitionTimingFunction: "cubic-bezier(0.77, 0, 0.175, 1)",
        }}
      />
    </div>
  )
}

// Counter on scroll
export interface CounterOnScrollProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Target number
   */
  target: number
  /**
   * Animation duration (ms)
   */
  duration?: number
  /**
   * Number of decimal places
   */
  decimals?: number
  /**
   * Prefix
   */
  prefix?: string
  /**
   * Suffix
   */
  suffix?: string
  /**
   * Intersection threshold
   */
  threshold?: number
  /**
   * Only animate once
   */
  once?: boolean
}

export function CounterOnScroll({
  target,
  duration = 2000,
  decimals = 0,
  prefix = "",
  suffix = "",
  threshold = 0.1,
  once = true,
  className,
  ...props
}: CounterOnScrollProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const [count, setCount] = React.useState(0)
  const [hasAnimated, setHasAnimated] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasAnimated)) {
          setHasAnimated(true)

          const startTime = Date.now()
          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3) // Ease out cubic
            setCount(target * eased)

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }

          requestAnimationFrame(animate)
          if (once) observer.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration, threshold, once, hasAnimated])

  return (
    <span ref={ref} className={className} {...props}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  )
}

// Progress bar on scroll
export interface ProgressOnScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Target progress (0-100)
   */
  target: number
  /**
   * Animation duration (ms)
   */
  duration?: number
  /**
   * Progress bar height
   */
  height?: number
  /**
   * Progress bar color
   */
  color?: string
  /**
   * Background color
   */
  backgroundColor?: string
  /**
   * Border radius
   */
  radius?: string
  /**
   * Intersection threshold
   */
  threshold?: number
  /**
   * Only animate once
   */
  once?: boolean
}

export function ProgressOnScroll({
  target,
  duration = 1000,
  height = 8,
  color = "var(--color-primary)",
  backgroundColor = "var(--color-surface-muted)",
  radius = "var(--radius-full)",
  threshold = 0.1,
  once = true,
  className,
  ...props
}: ProgressOnScrollProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [progress, setProgress] = React.useState(0)
  const [hasAnimated, setHasAnimated] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasAnimated)) {
          setHasAnimated(true)

          const startTime = Date.now()
          const animate = () => {
            const elapsed = Date.now() - startTime
            const currentProgress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - currentProgress, 3)
            setProgress(target * eased)

            if (currentProgress < 1) {
              requestAnimationFrame(animate)
            }
          }

          requestAnimationFrame(animate)
          if (once) observer.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration, threshold, once, hasAnimated])

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{
        height,
        backgroundColor,
        borderRadius: radius,
      }}
      {...props}
    >
      <div
        className="h-full transition-all"
        style={{
          width: `${progress}%`,
          backgroundColor: color,
          borderRadius: radius,
        }}
      />
    </div>
  )
}

// Text reveal on scroll (letter by letter)
export interface TextRevealOnScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Text to reveal
   */
  text: string
  /**
   * Delay between letters (ms)
   */
  letterDelay?: number
  /**
   * Animation duration per letter (ms)
   */
  duration?: number
  /**
   * Intersection threshold
   */
  threshold?: number
  /**
   * Only animate once
   */
  once?: boolean
}

export function TextRevealOnScroll({
  text,
  letterDelay = 30,
  duration = 300,
  threshold = 0.1,
  once = true,
  className,
  ...props
}: TextRevealOnScrollProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, once])

  return (
    <div ref={ref} className={cn("inline-block", className)} {...props}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block transition-all"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(100%)",
            transitionDuration: `${duration}ms`,
            transitionDelay: `${index * letterDelay}ms`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  )
}
