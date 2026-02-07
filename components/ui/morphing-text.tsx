"use client"

/**
 * Morphing Text Component
 *
 * Text that smoothly morphs between words.
 * Features:
 * - SVG filter-based morphing
 * - Blur transition effect
 * - Configurable timing
 * - Multiple variants
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export interface MorphingTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Words to morph between
   */
  words: string[]
  /**
   * Time each word is displayed (ms)
   */
  duration?: number
  /**
   * Transition time between words (ms)
   */
  transitionDuration?: number
  /**
   * Text class name
   */
  textClassName?: string
}

export function MorphingText({
  words,
  duration = 2000,
  transitionDuration = 500,
  className,
  textClassName,
  ...props
}: MorphingTextProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isTransitioning, setIsTransitioning] = React.useState(false)
  const filterId = React.useId()

  React.useEffect(() => {
    if (words.length <= 1) return

    const interval = setInterval(() => {
      setIsTransitioning(true)

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length)
        setIsTransitioning(false)
      }, transitionDuration / 2)
    }, duration)

    return () => clearInterval(interval)
  }, [words.length, duration, transitionDuration])

  return (
    <div className={cn("relative", className)} {...props}>
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id={filterId}>
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation={isTransitioning ? "8" : "0"}
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
          </filter>
        </defs>
      </svg>

      <span
        className={cn(
          "inline-block transition-all ease-[var(--ease-spring)]",
          textClassName
        )}
        style={{
          filter: `url(#${filterId})`,
          transitionDuration: `${transitionDuration / 2}ms`,
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? "scale(var(--scale-press))" : "scale(1)",
        }}
      >
        {words[currentIndex]}
      </span>
    </div>
  )
}

// Typing morphing text
export interface TypingMorphProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Words to type
   */
  words: string[]
  /**
   * Typing speed (ms per character)
   */
  typingSpeed?: number
  /**
   * Deleting speed (ms per character)
   */
  deletingSpeed?: number
  /**
   * Pause before deleting (ms)
   */
  pauseDuration?: number
  /**
   * Show cursor
   */
  showCursor?: boolean
  /**
   * Cursor character
   */
  cursorChar?: string
  /**
   * Text class name
   */
  textClassName?: string
}

export function TypingMorph({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 1500,
  showCursor = true,
  cursorChar = "|",
  className,
  textClassName,
  ...props
}: TypingMorphProps) {
  const [text, setText] = React.useState("")
  const [wordIndex, setWordIndex] = React.useState(0)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [isPaused, setIsPaused] = React.useState(false)

  React.useEffect(() => {
    if (words.length === 0) return

    const currentWord = words[wordIndex]

    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pauseDuration)
      return () => clearTimeout(timeout)
    }

    if (isDeleting) {
      if (text === "") {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
      } else {
        const timeout = setTimeout(() => {
          setText(text.slice(0, -1))
        }, deletingSpeed)
        return () => clearTimeout(timeout)
      }
    } else {
      if (text === currentWord) {
        setIsPaused(true)
      } else {
        const timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1))
        }, typingSpeed)
        return () => clearTimeout(timeout)
      }
    }
  }, [text, wordIndex, isDeleting, isPaused, words, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <div className={cn("inline-flex", className)} {...props}>
      <span className={textClassName}>{text}</span>
      {showCursor && (
        <span className="animate-blink ml-0.5">{cursorChar}</span>
      )}

      <style jsx>{`
        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  )
}

// Flip text (letter by letter flip)
export interface FlipTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Words to flip between
   */
  words: string[]
  /**
   * Duration for each word (ms)
   */
  duration?: number
  /**
   * Flip animation duration (ms)
   */
  flipDuration?: number
  /**
   * Text class name
   */
  textClassName?: string
}

export function FlipText({
  words,
  duration = 3000,
  flipDuration = 500,
  className,
  textClassName,
  ...props
}: FlipTextProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isFlipping, setIsFlipping] = React.useState(false)

  React.useEffect(() => {
    if (words.length <= 1) return

    const interval = setInterval(() => {
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length)
        setIsFlipping(false)
      }, flipDuration / 2)
    }, duration)

    return () => clearInterval(interval)
  }, [words.length, duration, flipDuration])

  const currentWord = words[currentIndex]

  return (
    <div className={cn("inline-flex", className)} {...props}>
      {currentWord.split("").map((char, i) => (
        <span
          key={`${currentIndex}-${i}`}
          className={cn(
            "inline-block transition-transform preserve-3d",
            textClassName
          )}
          style={{
            transitionDuration: `${flipDuration}ms`,
            transitionDelay: `${i * 30}ms`,
            transform: isFlipping ? "rotateX(90deg)" : "rotateX(0deg)",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}

      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  )
}

// Slide text (words slide in/out)
export interface SlideTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Words to slide
   */
  words: string[]
  /**
   * Duration for each word (ms)
   */
  duration?: number
  /**
   * Slide direction
   */
  direction?: "up" | "down" | "left" | "right"
  /**
   * Text class name
   */
  textClassName?: string
}

export function SlideText({
  words,
  duration = 2500,
  direction = "up",
  className,
  textClassName,
  ...props
}: SlideTextProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [nextIndex, setNextIndex] = React.useState(1)
  const [isSliding, setIsSliding] = React.useState(false)

  React.useEffect(() => {
    if (words.length <= 1) return

    const interval = setInterval(() => {
      setIsSliding(true)
      setNextIndex((currentIndex + 1) % words.length)

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length)
        setIsSliding(false)
      }, 400)
    }, duration)

    return () => clearInterval(interval)
  }, [words.length, duration, currentIndex])

  const getTransform = (isCurrent: boolean, isEntering: boolean) => {
    const distance = 100
    const directionMap = {
      up: { exit: -distance, enter: distance },
      down: { exit: distance, enter: -distance },
      left: { exit: -distance, enter: distance },
      right: { exit: distance, enter: -distance },
    }

    const axis = direction === "up" || direction === "down" ? "Y" : "X"
    const values = directionMap[direction]

    if (isCurrent) {
      return isSliding ? `translate${axis}(${values.exit}%)` : `translate${axis}(0)`
    }
    return isEntering ? `translate${axis}(${values.enter}%)` : `translate${axis}(0)`
  }

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ display: "inline-block" }}
      {...props}
    >
      {/* Current word */}
      <span
        className={cn(
          "inline-block transition-transform duration-400",
          textClassName
        )}
        style={{
          transform: getTransform(true, false),
          opacity: isSliding ? 0 : 1,
        }}
      >
        {words[currentIndex]}
      </span>

      {/* Next word (entering) */}
      {isSliding && (
        <span
          className={cn(
            "absolute inset-0 inline-block transition-transform duration-400",
            textClassName
          )}
          style={{
            transform: getTransform(false, !isSliding),
          }}
        >
          {words[nextIndex]}
        </span>
      )}
    </div>
  )
}

// Fade words (simple fade transition)
export interface FadeWordsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Words to fade between
   */
  words: string[]
  /**
   * Duration for each word (ms)
   */
  duration?: number
  /**
   * Fade transition duration (ms)
   */
  fadeDuration?: number
  /**
   * Text class name
   */
  textClassName?: string
}

export function FadeWords({
  words,
  duration = 3000,
  fadeDuration = 500,
  className,
  textClassName,
  ...props
}: FadeWordsProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [opacity, setOpacity] = React.useState(1)

  React.useEffect(() => {
    if (words.length <= 1) return

    const interval = setInterval(() => {
      setOpacity(0)

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length)
        setOpacity(1)
      }, fadeDuration)
    }, duration)

    return () => clearInterval(interval)
  }, [words.length, duration, fadeDuration])

  return (
    <div className={cn("inline-block", className)} {...props}>
      <span
        className={cn("inline-block transition-opacity", textClassName)}
        style={{
          opacity,
          transitionDuration: `${fadeDuration}ms`,
        }}
      >
        {words[currentIndex]}
      </span>
    </div>
  )
}

// Scramble morph (text scrambles then reveals)
export interface ScrambleMorphProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Words to morph
   */
  words: string[]
  /**
   * Duration for each word (ms)
   */
  duration?: number
  /**
   * Scramble characters
   */
  characters?: string
  /**
   * Scramble speed (ms)
   */
  scrambleSpeed?: number
  /**
   * Text class name
   */
  textClassName?: string
}

export function ScrambleMorph({
  words,
  duration = 3000,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*",
  scrambleSpeed = 30,
  className,
  textClassName,
  ...props
}: ScrambleMorphProps) {
  const [displayText, setDisplayText] = React.useState(words[0] || "")
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    if (words.length <= 1) return

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % words.length
      const targetWord = words[nextIndex]
      const maxLength = Math.max(displayText.length, targetWord.length)
      let iteration = 0

      const scramble = setInterval(() => {
        const newText = targetWord
          .split("")
          .map((char, i) => {
            if (i < iteration) {
              return char
            }
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join("")
          .slice(0, Math.min(iteration + 5, maxLength))

        setDisplayText(newText.padEnd(targetWord.length, " ").trim())

        iteration++

        if (iteration > targetWord.length) {
          clearInterval(scramble)
          setDisplayText(targetWord)
          setCurrentIndex(nextIndex)
        }
      }, scrambleSpeed)

      return () => clearInterval(scramble)
    }, duration)

    return () => clearInterval(interval)
  }, [words, currentIndex, displayText.length, characters, scrambleSpeed, duration])

  return (
    <div className={cn("inline-block", className)} {...props}>
      <span className={cn("font-mono", textClassName)}>
        {displayText}
      </span>
    </div>
  )
}

// Gradient text morph (text with animated gradient)
export interface GradientMorphProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Words to display
   */
  words: string[]
  /**
   * Duration for each word (ms)
   */
  duration?: number
  /**
   * Gradient colors
   */
  colors?: string[]
  /**
   * Text class name
   */
  textClassName?: string
}

export function GradientMorph({
  words,
  duration = 3000,
  colors = ["var(--color-primary)", "var(--color-secondary)", "var(--color-primary)"],
  className,
  textClassName,
  ...props
}: GradientMorphProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isTransitioning, setIsTransitioning] = React.useState(false)

  React.useEffect(() => {
    if (words.length <= 1) return

    const interval = setInterval(() => {
      setIsTransitioning(true)

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length)
        setIsTransitioning(false)
      }, 300)
    }, duration)

    return () => clearInterval(interval)
  }, [words.length, duration])

  const gradient = `linear-gradient(90deg, ${colors.join(", ")})`

  return (
    <div className={cn("inline-block", className)} {...props}>
      <span
        className={cn(
          "inline-block bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x transition-all",
          textClassName
        )}
        style={{
          backgroundImage: gradient,
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? "scale(0.95)" : "scale(1)",
          transitionDuration: "300ms",
        }}
      >
        {words[currentIndex]}
      </span>

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
          animation: gradient-x 3s linear infinite;
        }
      `}</style>
    </div>
  )
}
