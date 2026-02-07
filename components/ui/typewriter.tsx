"use client"

/**
 * Typewriter Component
 *
 * Animated typing effect for text.
 * Features:
 * - Configurable typing speed
 * - Multiple strings with loop
 * - Delete animation
 * - Blinking cursor
 * - Pause between strings
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TypewriterProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Text string(s) to type
   */
  text: string | string[]
  /**
   * Typing speed in ms per character
   */
  speed?: number
  /**
   * Delete speed in ms per character
   */
  deleteSpeed?: number
  /**
   * Delay before starting to type
   */
  startDelay?: number
  /**
   * Delay after typing before deleting/switching
   */
  pauseDelay?: number
  /**
   * Loop through strings continuously
   */
  loop?: boolean
  /**
   * Show cursor
   */
  cursor?: boolean
  /**
   * Cursor character
   */
  cursorChar?: string
  /**
   * Cursor blink speed in ms
   */
  cursorBlinkSpeed?: number
  /**
   * Delete text before typing next
   */
  deleteOnChange?: boolean
  /**
   * Callback when typing completes
   */
  onComplete?: () => void
  /**
   * Callback when a string is fully typed
   */
  onStringTyped?: (index: number) => void
}

export function Typewriter({
  text,
  speed = 50,
  deleteSpeed = 30,
  startDelay = 500,
  pauseDelay = 1500,
  loop = true,
  cursor = true,
  cursorChar = "|",
  cursorBlinkSpeed = 530,
  deleteOnChange = true,
  onComplete,
  onStringTyped,
  className,
  ...props
}: TypewriterProps) {
  const strings = Array.isArray(text) ? text : [text]
  const [displayText, setDisplayText] = React.useState("")
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [isWaiting, setIsWaiting] = React.useState(true)
  const [showCursor, setShowCursor] = React.useState(true)

  // Cursor blink effect
  React.useEffect(() => {
    if (!cursor) return

    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, cursorBlinkSpeed)

    return () => clearInterval(interval)
  }, [cursor, cursorBlinkSpeed])

  // Typing effect
  React.useEffect(() => {
    const currentString = strings[currentIndex]

    // Initial delay
    if (isWaiting && displayText === "") {
      const timeout = setTimeout(() => {
        setIsWaiting(false)
      }, startDelay)
      return () => clearTimeout(timeout)
    }

    // Waiting after typing complete
    if (isWaiting) {
      return
    }

    // Typing
    if (!isDeleting) {
      if (displayText.length < currentString.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentString.slice(0, displayText.length + 1))
        }, speed)
        return () => clearTimeout(timeout)
      }

      // Finished typing this string
      onStringTyped?.(currentIndex)

      // Single string or last string without loop
      if (strings.length === 1 || (!loop && currentIndex === strings.length - 1)) {
        onComplete?.()
        return
      }

      // Pause before deleting/switching
      const timeout = setTimeout(() => {
        if (deleteOnChange) {
          setIsDeleting(true)
        } else {
          setCurrentIndex((prev) => (prev + 1) % strings.length)
          setDisplayText("")
        }
      }, pauseDelay)
      return () => clearTimeout(timeout)
    }

    // Deleting
    if (isDeleting) {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, deleteSpeed)
        return () => clearTimeout(timeout)
      }

      // Finished deleting
      setIsDeleting(false)
      setCurrentIndex((prev) => {
        const next = (prev + 1) % strings.length
        if (next === 0 && !loop) {
          onComplete?.()
        }
        return next
      })
    }
  }, [
    displayText,
    isDeleting,
    isWaiting,
    currentIndex,
    strings,
    speed,
    deleteSpeed,
    startDelay,
    pauseDelay,
    loop,
    deleteOnChange,
    onComplete,
    onStringTyped,
  ])

  return (
    <span className={cn("inline", className)} {...props}>
      {displayText}
      {cursor && (
        <span
          className={cn(
            "inline-block ml-0.5 font-light",
            !showCursor && "invisible"
          )}
          aria-hidden="true"
        >
          {cursorChar}
        </span>
      )}
    </span>
  )
}

// Typewriter with highlighting
export interface TypewriterHighlightProps extends TypewriterProps {
  /**
   * Highlight color for typed text
   */
  highlightColor?: "primary" | "gradient"
  /**
   * Static prefix text
   */
  prefix?: string
  /**
   * Static suffix text
   */
  suffix?: string
}

export function TypewriterHighlight({
  highlightColor = "primary",
  prefix,
  suffix,
  className,
  ...props
}: TypewriterHighlightProps) {
  return (
    <span className={cn("inline", className)}>
      {prefix && <span>{prefix}</span>}
      <span
        className={cn(
          highlightColor === "primary" && "text-[var(--color-primary)]",
          highlightColor === "gradient" && "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent"
        )}
      >
        <Typewriter {...props} />
      </span>
      {suffix && <span>{suffix}</span>}
    </span>
  )
}

// Hero typewriter (large text for hero sections)
export interface HeroTypewriterProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Static prefix text
   */
  prefix?: string
  /**
   * Rotating text strings
   */
  rotatingText: string[]
  /**
   * Static suffix text
   */
  suffix?: string
  /**
   * Heading level
   */
  as?: "h1" | "h2" | "h3"
  /**
   * Highlight style for rotating text
   */
  highlight?: "none" | "primary" | "gradient" | "underline"
  /**
   * Typewriter options
   */
  typewriterOptions?: Partial<TypewriterProps>
}

export function HeroTypewriter({
  prefix,
  rotatingText,
  suffix,
  as: Component = "h1",
  highlight = "primary",
  typewriterOptions,
  className,
  ...props
}: HeroTypewriterProps) {
  return (
    <Component
      className={cn(
        "text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl",
        "text-[var(--color-text)]",
        className
      )}
      {...props}
    >
      {prefix && <span>{prefix} </span>}
      <span
        className={cn(
          highlight === "primary" && "text-[var(--color-primary)]",
          highlight === "gradient" && "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent",
          highlight === "underline" && "underline decoration-[var(--color-primary)] decoration-4 underline-offset-4"
        )}
      >
        <Typewriter
          text={rotatingText}
          speed={80}
          pauseDelay={2000}
          {...typewriterOptions}
        />
      </span>
      {suffix && <span> {suffix}</span>}
    </Component>
  )
}

// Simple typing indicator (like chat apps)
export interface TypingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of dots
   */
  dots?: number
  /**
   * Animation speed in ms
   */
  speed?: number
  /**
   * Size
   */
  size?: "sm" | "md" | "lg"
  /**
   * Color
   */
  color?: "default" | "muted" | "primary"
}

const indicatorSizeClasses = {
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
  lg: "h-2.5 w-2.5",
}

const indicatorGapClasses = {
  sm: "gap-1",
  md: "gap-1.5",
  lg: "gap-2",
}

const indicatorColorClasses = {
  default: "bg-[var(--color-text)]",
  muted: "bg-[var(--color-text-muted)]",
  primary: "bg-[var(--color-primary)]",
}

export function TypingIndicator({
  dots = 3,
  speed = 400,
  size = "md",
  color = "muted",
  className,
  ...props
}: TypingIndicatorProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center",
        indicatorGapClasses[size],
        className
      )}
      role="status"
      aria-label="Typing..."
      {...props}
    >
      {Array.from({ length: dots }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "rounded-full",
            indicatorSizeClasses[size],
            indicatorColorClasses[color],
            "animate-bounce"
          )}
          style={{
            animationDelay: `${i * (speed / dots)}ms`,
            animationDuration: `${speed}ms`,
          }}
        />
      ))}
    </div>
  )
}

// Code typewriter (for terminal-style typing)
export interface CodeTypewriterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Code lines to type
   */
  lines: string[]
  /**
   * Typing speed
   */
  speed?: number
  /**
   * Delay between lines
   */
  lineDelay?: number
  /**
   * Show line numbers
   */
  showLineNumbers?: boolean
  /**
   * Prompt character
   */
  prompt?: string
}

export function CodeTypewriter({
  lines,
  speed = 30,
  lineDelay = 500,
  showLineNumbers = false,
  prompt = "$",
  className,
  ...props
}: CodeTypewriterProps) {
  const [currentLine, setCurrentLine] = React.useState(0)
  const [completedLines, setCompletedLines] = React.useState<string[]>([])

  const handleLineComplete = () => {
    setCompletedLines((prev) => [...prev, lines[currentLine]])
    if (currentLine < lines.length - 1) {
      setTimeout(() => {
        setCurrentLine((prev) => prev + 1)
      }, lineDelay)
    }
  }

  return (
    <div
      className={cn(
        "font-mono text-sm",
        "p-4 rounded-[var(--radius-lg)]",
        "bg-[var(--color-surface-inverse)] text-[var(--color-text-inverse)]",
        className
      )}
      {...props}
    >
      {/* Completed lines */}
      {completedLines.map((line, i) => (
        <div key={i} className="flex">
          {showLineNumbers && (
            <span className="mr-4 text-[var(--color-text-muted)] select-none">{i + 1}</span>
          )}
          <span className="text-[var(--color-success)] mr-2">{prompt}</span>
          <span>{line}</span>
        </div>
      ))}

      {/* Current typing line */}
      {currentLine < lines.length && (
        <div className="flex">
          {showLineNumbers && (
            <span className="mr-4 text-[var(--color-text-muted)] select-none">
              {completedLines.length + 1}
            </span>
          )}
          <span className="text-[var(--color-success)] mr-2">{prompt}</span>
          <Typewriter
            text={lines[currentLine]}
            speed={speed}
            loop={false}
            cursor={true}
            cursorChar="_"
            deleteOnChange={false}
            onComplete={handleLineComplete}
          />
        </div>
      )}
    </div>
  )
}
