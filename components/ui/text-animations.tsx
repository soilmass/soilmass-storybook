"use client"

/**
 * Text Animations Component
 *
 * Animated text effects for headings and content.
 * Features:
 * - Blur fade in
 * - Word rotate/flip
 * - Staggered reveal
 * - Wavy text
 * - Letter by letter animation
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Blur fade in text
export interface BlurFadeTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Text content
   */
  text: string
  /**
   * Animation delay in ms
   */
  delay?: number
  /**
   * Animation duration in ms
   */
  duration?: number
  /**
   * Blur amount
   */
  blur?: number
  /**
   * Direction to animate from
   */
  direction?: "up" | "down" | "left" | "right"
  /**
   * Distance to travel
   */
  distance?: number
  /**
   * Animate on mount or when in view
   */
  animateOnView?: boolean
  /**
   * Viewport threshold
   */
  threshold?: number
}

export function BlurFadeText({
  text,
  delay = 0,
  duration = 500,
  blur = 10,
  direction = "up",
  distance = 20,
  animateOnView = true,
  threshold = 0.5,
  className,
  ...props
}: BlurFadeTextProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = React.useState(!animateOnView)

  React.useEffect(() => {
    if (!animateOnView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [animateOnView, threshold])

  const directionTransform = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
  }

  return (
    <div
      ref={ref}
      className={cn("transition-all ease-[var(--ease-spring)]", className)}
      style={{
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? "blur(0)" : `blur(${blur}px)`,
        transform: isVisible ? "translate(0)" : directionTransform[direction],
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      {...props}
    >
      {text}
    </div>
  )
}

// Word rotate/flip animation
export interface WordRotateProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Words to rotate through
   */
  words: string[]
  /**
   * Duration each word is shown (ms)
   */
  duration?: number
  /**
   * Animation type
   */
  animation?: "fade" | "slide" | "flip" | "blur"
  /**
   * Transition duration (ms)
   */
  transitionDuration?: number
}

export function WordRotate({
  words,
  duration = 2000,
  animation = "fade",
  transitionDuration = 300,
  className,
  ...props
}: WordRotateProps) {
  const [index, setIndex] = React.useState(0)
  const [isAnimating, setIsAnimating] = React.useState(false)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length)
        setIsAnimating(false)
      }, transitionDuration)
    }, duration)

    return () => clearInterval(interval)
  }, [words.length, duration, transitionDuration])

  const animationStyles = {
    fade: {
      opacity: isAnimating ? 0 : 1,
    },
    slide: {
      opacity: isAnimating ? 0 : 1,
      transform: isAnimating ? "translateY(-100%)" : "translateY(0)",
    },
    flip: {
      opacity: isAnimating ? 0 : 1,
      transform: isAnimating ? "rotateX(90deg)" : "rotateX(0)",
    },
    blur: {
      opacity: isAnimating ? 0 : 1,
      filter: isAnimating ? "blur(8px)" : "blur(0)",
    },
  }

  return (
    <span
      className={cn("inline-block transition-all ease-[var(--ease-spring)]", className)}
      style={{
        ...animationStyles[animation],
        transitionDuration: `${transitionDuration}ms`,
      }}
      {...props}
    >
      {words[index]}
    </span>
  )
}

// Staggered text reveal (word by word or letter by letter)
export interface StaggeredTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Text content
   */
  text: string
  /**
   * Stagger by words or letters
   */
  by?: "word" | "letter"
  /**
   * Delay between each element (ms)
   */
  staggerDelay?: number
  /**
   * Initial delay before animation starts (ms)
   */
  delay?: number
  /**
   * Animation duration per element (ms)
   */
  duration?: number
  /**
   * Animate on mount or when in view
   */
  animateOnView?: boolean
  /**
   * Animation variant
   */
  animation?: "fade" | "slide-up" | "slide-down" | "blur"
}

export function StaggeredText({
  text,
  by = "word",
  staggerDelay = 50,
  delay = 0,
  duration = 300,
  animateOnView = true,
  animation = "fade",
  className,
  ...props
}: StaggeredTextProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = React.useState(!animateOnView)

  React.useEffect(() => {
    if (!animateOnView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [animateOnView])

  const elements = by === "word" ? text.split(" ") : text.split("")

  const getAnimationStyle = (index: number) => {
    const elementDelay = delay + index * staggerDelay

    if (!isVisible) {
      return {
        opacity: 0,
        transform: animation === "slide-up" ? "translateY(20px)" :
                   animation === "slide-down" ? "translateY(-20px)" : undefined,
        filter: animation === "blur" ? "blur(8px)" : undefined,
      }
    }

    return {
      opacity: 1,
      transform: "translateY(0)",
      filter: "blur(0)",
      transitionDelay: `${elementDelay}ms`,
      transitionDuration: `${duration}ms`,
    }
  }

  return (
    <div ref={ref} className={cn("inline", className)} {...props}>
      {elements.map((element, index) => (
        <span
          key={index}
          className="inline-block transition-all"
          style={getAnimationStyle(index)}
        >
          {element}
          {by === "word" && index < elements.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </div>
  )
}

// Wavy text animation
export interface WavyTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Text content
   */
  text: string
  /**
   * Wave animation duration (ms)
   */
  duration?: number
  /**
   * Delay between letters (ms)
   */
  delay?: number
  /**
   * Wave height in pixels
   */
  height?: number
  /**
   * Continuous animation
   */
  loop?: boolean
}

export function WavyText({
  text,
  duration = 1000,
  delay = 50,
  height = 10,
  loop = true,
  className,
  ...props
}: WavyTextProps) {
  const letters = text.split("")

  return (
    <div className={cn("inline-flex", className)} {...props}>
      {letters.map((letter, index) => (
        <span
          key={index}
          className="inline-block animate-wave"
          style={{
            animationDuration: `${duration}ms`,
            animationDelay: `${index * delay}ms`,
            animationIterationCount: loop ? "infinite" : 1,
            ["--wave-height" as string]: `${height}px`,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
      <style jsx>{`
        @keyframes wave {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(calc(-1 * var(--wave-height)));
          }
        }
        .animate-wave {
          animation: wave ease-in-out;
        }
      `}</style>
    </div>
  )
}

// Scramble text effect
export interface ScrambleTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Final text to display
   */
  text: string
  /**
   * Characters to use for scrambling
   */
  characters?: string
  /**
   * Animation duration (ms)
   */
  duration?: number
  /**
   * Trigger animation on hover
   */
  hoverTrigger?: boolean
}

export function ScrambleText({
  text,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  duration = 1000,
  hoverTrigger = false,
  className,
  ...props
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = React.useState(text)
  const [isAnimating, setIsAnimating] = React.useState(!hoverTrigger)

  const scramble = React.useCallback(() => {
    const textLength = text.length
    const scrambleDuration = duration
    const interval = scrambleDuration / (textLength * 3)
    let iteration = 0

    const intervalId = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration / 3) {
              return text[index]
            }
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join("")
      )

      iteration++

      if (iteration >= textLength * 3) {
        clearInterval(intervalId)
        setDisplayText(text)
      }
    }, interval)

    return () => clearInterval(intervalId)
  }, [text, characters, duration])

  React.useEffect(() => {
    if (isAnimating && !hoverTrigger) {
      return scramble()
    }
  }, [isAnimating, hoverTrigger, scramble])

  const handleMouseEnter = () => {
    if (hoverTrigger) {
      scramble()
    }
  }

  return (
    <span
      className={cn("font-mono", className)}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {displayText}
    </span>
  )
}

// Counting text (for numbers)
export interface CountingTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Target number
   */
  value: number
  /**
   * Starting number
   */
  from?: number
  /**
   * Duration in ms
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
}

export function CountingText({
  value,
  from = 0,
  duration = 2000,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  ...props
}: CountingTextProps) {
  const [count, setCount] = React.useState(from)
  const ref = React.useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const startTime = Date.now()
          const startValue = from
          const endValue = value

          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic

            setCount(startValue + (endValue - startValue) * eased)

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }

          requestAnimationFrame(animate)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value, from, duration])

  return (
    <span ref={ref} className={cn("tabular-nums", className)} {...props}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  )
}

// Text reveal on scroll
export interface TextRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Text content
   */
  text: string
  /**
   * Reveal style
   */
  variant?: "highlight" | "underline" | "opacity"
  /**
   * Highlight/underline color
   */
  color?: string
}

export function TextReveal({
  text,
  variant = "opacity",
  color = "var(--color-primary)",
  className,
  ...props
}: TextRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementTop = rect.top
      const elementHeight = rect.height

      // Calculate progress based on element position
      const start = windowHeight * 0.8
      const end = windowHeight * 0.2
      const current = start - elementTop

      const newProgress = Math.max(0, Math.min(1, current / (start - end)))
      setProgress(newProgress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (variant === "highlight") {
    return (
      <div ref={ref} className={cn("relative inline", className)} {...props}>
        <span className="relative z-10">{text}</span>
        <span
          className="absolute left-0 bottom-0 h-[0.3em] z-0"
          style={{
            width: `${progress * 100}%`,
            backgroundColor: color,
            opacity: 0.3,
          }}
        />
      </div>
    )
  }

  if (variant === "underline") {
    return (
      <div ref={ref} className={cn("relative inline-block", className)} {...props}>
        <span>{text}</span>
        <span
          className="absolute left-0 bottom-0 h-0.5"
          style={{
            width: `${progress * 100}%`,
            backgroundColor: color,
          }}
        />
      </div>
    )
  }

  // Opacity variant
  const words = text.split(" ")
  return (
    <div ref={ref} className={cn("inline", className)} {...props}>
      {words.map((word, index) => {
        const wordProgress = (index + 1) / words.length
        const opacity = progress >= wordProgress ? 1 : 0.2

        return (
          <span
            key={index}
            className="inline-block transition-opacity duration-200"
            style={{ opacity }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </span>
        )
      })}
    </div>
  )
}

// Glitch text effect
export interface GlitchTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Text content
   */
  text: string
  /**
   * Glitch colors
   */
  colors?: [string, string]
  /**
   * Intensity
   */
  intensity?: "low" | "medium" | "high"
}

export function GlitchText({
  text,
  colors = ["var(--color-error)", "var(--color-info)"],
  intensity = "medium",
  className,
  ...props
}: GlitchTextProps) {
  const intensityValues = {
    low: { offset: 1, duration: 3 },
    medium: { offset: 2, duration: 2 },
    high: { offset: 4, duration: 1 },
  }

  const { offset, duration } = intensityValues[intensity]

  return (
    <div
      className={cn("relative inline-block", className)}
      {...props}
    >
      {/* Base text */}
      <span className="relative z-10">{text}</span>

      {/* Glitch layers */}
      <span
        className="absolute inset-0 animate-glitch-1"
        style={{
          color: colors[0],
          clipPath: "inset(0 0 50% 0)",
          animationDuration: `${duration}s`,
          ["--glitch-offset" as string]: `${offset}px`,
        }}
        aria-hidden
      >
        {text}
      </span>
      <span
        className="absolute inset-0 animate-glitch-2"
        style={{
          color: colors[1],
          clipPath: "inset(50% 0 0 0)",
          animationDuration: `${duration * 0.7}s`,
          ["--glitch-offset" as string]: `${-offset}px`,
        }}
        aria-hidden
      >
        {text}
      </span>

      <style jsx>{`
        @keyframes glitch-1 {
          0%, 100% {
            transform: translateX(0);
          }
          20% {
            transform: translateX(var(--glitch-offset));
          }
          40% {
            transform: translateX(calc(-1 * var(--glitch-offset)));
          }
          60% {
            transform: translateX(var(--glitch-offset));
          }
          80% {
            transform: translateX(0);
          }
        }
        @keyframes glitch-2 {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(calc(-1 * var(--glitch-offset)));
          }
          50% {
            transform: translateX(var(--glitch-offset));
          }
          75% {
            transform: translateX(calc(-1 * var(--glitch-offset)));
          }
        }
        .animate-glitch-1 {
          animation: glitch-1 linear infinite;
        }
        .animate-glitch-2 {
          animation: glitch-2 linear infinite;
        }
      `}</style>
    </div>
  )
}
