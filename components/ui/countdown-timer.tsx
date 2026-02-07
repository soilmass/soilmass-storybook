"use client"

/**
 * Countdown Timer Component
 *
 * Premium timer counting down to a target date.
 * Features:
 * - Number flip animation with 3D perspective
 * - Urgency glow effect (red pulse when time is low)
 * - Spring transitions
 * - Multiple display variants
 * - Token-based styling
 */

import * as React from "react"
import { cn } from "@/lib/utils"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const difference = targetDate.getTime() - new Date().getTime()

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    total: difference,
  }
}

export interface CountdownTimerProps extends React.HTMLAttributes<HTMLDivElement> {
  targetDate: Date | string
  variant?: "default" | "cards" | "flip" | "minimal" | "large"
  showDays?: boolean
  showHours?: boolean
  showMinutes?: boolean
  showSeconds?: boolean
  labels?: {
    days?: string
    hours?: string
    minutes?: string
    seconds?: string
  }
  onComplete?: () => void
  completedMessage?: string
  separator?: string
  colorScheme?: "default" | "primary" | "dark"
  /**
   * Enable urgency mode when time is low (adds red glow)
   */
  urgencyThreshold?: number // in seconds
}

const defaultLabels = {
  days: "Days",
  hours: "Hours",
  minutes: "Minutes",
  seconds: "Seconds",
}

export function CountdownTimer({
  targetDate,
  variant = "default",
  showDays = true,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
  labels = defaultLabels,
  onComplete,
  completedMessage = "Time's up!",
  separator = ":",
  colorScheme = "default",
  urgencyThreshold = 60, // 1 minute by default
  className,
  ...props
}: CountdownTimerProps) {
  const target = typeof targetDate === "string" ? new Date(targetDate) : targetDate
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft>(() => calculateTimeLeft(target))
  const [isComplete, setIsComplete] = React.useState(false)

  // Check if we're in urgency mode
  const isUrgent = timeLeft.total > 0 && timeLeft.total / 1000 <= urgencyThreshold

  React.useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(target)
      setTimeLeft(newTimeLeft)

      if (newTimeLeft.total <= 0 && !isComplete) {
        setIsComplete(true)
        onComplete?.()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [target, isComplete, onComplete])

  const mergedLabels = { ...defaultLabels, ...labels }

  const units = [
    { value: timeLeft.days, label: mergedLabels.days, show: showDays },
    { value: timeLeft.hours, label: mergedLabels.hours, show: showHours },
    { value: timeLeft.minutes, label: mergedLabels.minutes, show: showMinutes },
    { value: timeLeft.seconds, label: mergedLabels.seconds, show: showSeconds },
  ].filter((unit) => unit.show)

  // Complete state with animation
  if (isComplete) {
    return (
      <div
        className={cn(
          "text-center py-6",
          "animate-in fade-in-0 zoom-in-95 duration-500",
          colorScheme === "primary" && "text-[var(--color-primary)]",
          colorScheme === "dark" && "text-white",
          className
        )}
        {...props}
      >
        <p className="text-2xl font-bold animate-[pulse_2s_ease-in-out_infinite]">
          {completedMessage}
        </p>
      </div>
    )
  }

  // Minimal variant (just numbers)
  if (variant === "minimal") {
    return (
      <div
        className={cn(
          "font-mono text-lg tabular-nums",
          "transition-all duration-300",
          colorScheme === "primary" && "text-[var(--color-primary)]",
          colorScheme === "dark" && "text-white",
          isUrgent && [
            "text-[var(--color-error)]",
            "animate-[urgency-pulse_1s_ease-in-out_infinite]",
          ],
          className
        )}
        {...props}
      >
        {units.map((unit, index) => (
          <React.Fragment key={unit.label}>
            {index > 0 && <span className="text-[var(--color-text-muted)]">{separator}</span>}
            <AnimatedNumber value={unit.value} />
          </React.Fragment>
        ))}
      </div>
    )
  }

  // Large variant
  if (variant === "large") {
    return (
      <div
        className={cn(
          "flex justify-center gap-4 sm:gap-8",
          isUrgent && "animate-[urgency-glow_1s_ease-in-out_infinite]",
          className
        )}
        {...props}
      >
        {units.map((unit, index) => (
          <React.Fragment key={unit.label}>
            {index > 0 && (
              <div className="flex items-center text-4xl sm:text-6xl font-light text-[var(--color-text-muted)]">
                {separator}
              </div>
            )}
            <div className="text-center">
              <div
                className={cn(
                  "text-4xl sm:text-6xl md:text-7xl font-bold tabular-nums",
                  "transition-all duration-300",
                  colorScheme === "primary" && "text-[var(--color-primary)]",
                  colorScheme === "dark" && "text-white",
                  colorScheme === "default" && "text-[var(--color-text)]",
                  isUrgent && [
                    "text-[var(--color-error)]",
                    "drop-shadow-[0_0_12px_rgba(var(--color-error-rgb),0.5)]",
                  ]
                )}
              >
                <AnimatedNumber value={unit.value} large />
              </div>
              <div className="mt-2 text-xs sm:text-sm uppercase tracking-wider text-[var(--color-text-muted)]">
                {unit.label}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    )
  }

  // Cards variant with glow
  if (variant === "cards") {
    return (
      <div className={cn("flex justify-center gap-3 sm:gap-4", className)} {...props}>
        {units.map((unit) => (
          <div
            key={unit.label}
            className={cn(
              "flex flex-col items-center p-3 sm:p-4 min-w-[70px] sm:min-w-[90px]",
              "rounded-[var(--radius-lg)]",
              "transition-all duration-300",
              colorScheme === "default" && "bg-[var(--color-surface-muted)]",
              colorScheme === "primary" && "bg-[var(--color-primary)] text-white",
              colorScheme === "dark" && "bg-[var(--color-surface-inverse)] text-[var(--color-text-inverse)]",
              isUrgent && [
                "bg-[var(--color-error)]/10",
                "border border-[var(--color-error)]/30",
                "shadow-[0_0_20px_rgba(var(--color-error-rgb),0.2)]",
              ]
            )}
          >
            <span
              className={cn(
                "text-2xl sm:text-4xl font-bold tabular-nums",
                colorScheme === "default" && "text-[var(--color-text)]",
                isUrgent && "text-[var(--color-error)]"
              )}
            >
              <AnimatedNumber value={unit.value} />
            </span>
            <span
              className={cn(
                "text-xs uppercase tracking-wider mt-1",
                colorScheme === "default" && "text-[var(--color-text-muted)]",
                colorScheme === "primary" && "text-white/80",
                colorScheme === "dark" && "text-[var(--color-text-muted)]"
              )}
            >
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    )
  }

  // Flip variant with 3D animation
  if (variant === "flip") {
    return (
      <div
        className={cn(
          "flex justify-center gap-3 sm:gap-6",
          isUrgent && "animate-[urgency-glow_1s_ease-in-out_infinite]",
          className
        )}
        {...props}
      >
        {units.map((unit) => (
          <div key={unit.label} className="text-center">
            <FlipUnit
              value={unit.value}
              colorScheme={colorScheme}
              isUrgent={isUrgent}
            />
            <div className="mt-2 text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Default variant
  return (
    <div
      className={cn(
        "flex justify-center gap-6 sm:gap-8",
        isUrgent && "animate-[urgency-glow_1s_ease-in-out_infinite]",
        className
      )}
      {...props}
    >
      {units.map((unit) => (
        <div key={unit.label} className="text-center">
          <div
            className={cn(
              "text-3xl sm:text-5xl font-bold tabular-nums",
              "transition-all duration-300",
              colorScheme === "primary" && "text-[var(--color-primary)]",
              colorScheme === "dark" && "text-white",
              colorScheme === "default" && "text-[var(--color-text)]",
              isUrgent && [
                "text-[var(--color-error)]",
                "drop-shadow-[0_0_8px_rgba(var(--color-error-rgb),0.4)]",
              ]
            )}
          >
            <AnimatedNumber value={unit.value} />
          </div>
          <div className="mt-1 text-xs sm:text-sm text-[var(--color-text-muted)] uppercase tracking-wider">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  )
}

// Animated number component with slide transition
interface AnimatedNumberProps {
  value: number
  large?: boolean
}

function AnimatedNumber({ value, large = false }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = React.useState(value)
  const [isAnimating, setIsAnimating] = React.useState(false)
  const prevValueRef = React.useRef(value)

  React.useEffect(() => {
    if (value !== prevValueRef.current) {
      setIsAnimating(true)
      const timeout = setTimeout(() => {
        setDisplayValue(value)
        setIsAnimating(false)
      }, 150)
      prevValueRef.current = value
      return () => clearTimeout(timeout)
    }
  }, [value])

  return (
    <span className="relative inline-block overflow-hidden">
      <span
        className={cn(
          "inline-block transition-all duration-200 ease-[var(--ease-spring)]",
          isAnimating && "-translate-y-full opacity-0"
        )}
      >
        {String(displayValue).padStart(2, "0")}
      </span>
    </span>
  )
}

// Premium flip unit with 3D perspective animation
interface FlipUnitProps {
  value: number
  colorScheme?: "default" | "primary" | "dark"
  isUrgent?: boolean
}

function FlipUnit({ value, colorScheme = "default", isUrgent = false }: FlipUnitProps) {
  const [prevValue, setPrevValue] = React.useState(value)
  const [isFlipping, setIsFlipping] = React.useState(false)

  React.useEffect(() => {
    if (value !== prevValue) {
      setIsFlipping(true)
      const timeout = setTimeout(() => {
        setPrevValue(value)
        setIsFlipping(false)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [value, prevValue])

  const displayValue = String(value).padStart(2, "0")
  const prevDisplayValue = String(prevValue).padStart(2, "0")

  return (
    <div
      className={cn(
        "relative h-16 w-14 sm:h-20 sm:w-[72px]",
        "[perspective:1000px]",
        colorScheme === "default" && "text-[var(--color-text)]",
        colorScheme === "primary" && "text-[var(--color-primary)]",
        colorScheme === "dark" && "text-white",
        isUrgent && "text-[var(--color-error)]"
      )}
    >
      {/* Static background card */}
      <div
        className={cn(
          "absolute inset-0 rounded-[var(--radius-md)] overflow-hidden",
          "shadow-lg",
          colorScheme === "default" && "bg-[var(--color-surface-muted)]",
          colorScheme === "primary" && "bg-[var(--color-primary)]/10",
          colorScheme === "dark" && "bg-[var(--color-surface-inverse)]",
          isUrgent && [
            "bg-[var(--color-error)]/10",
            "shadow-[0_0_16px_rgba(var(--color-error-rgb),0.3)]",
          ]
        )}
      >
        {/* Top half */}
        <div className="absolute inset-x-0 top-0 h-1/2 flex items-end justify-center overflow-hidden border-b border-black/5">
          <span className="text-2xl sm:text-3xl font-bold translate-y-1/2 tabular-nums">
            {displayValue}
          </span>
        </div>
        {/* Bottom half */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 flex items-start justify-center overflow-hidden">
          <span className="text-2xl sm:text-3xl font-bold -translate-y-1/2 tabular-nums">
            {displayValue}
          </span>
        </div>
        {/* Center line with subtle shadow */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      </div>

      {/* Flipping top half - falls down */}
      {isFlipping && (
        <div
          className={cn(
            "absolute inset-x-0 top-0 h-1/2 rounded-t-[var(--radius-md)] overflow-hidden",
            "origin-bottom backface-hidden",
            "[transform-style:preserve-3d]",
            colorScheme === "default" && "bg-[var(--color-surface-muted)]",
            colorScheme === "primary" && "bg-[var(--color-primary)]/10",
            colorScheme === "dark" && "bg-[var(--color-surface-inverse)]",
            isUrgent && "bg-[var(--color-error)]/10"
          )}
          style={{
            animation: "flip-top-down 0.3s ease-in forwards",
          }}
        >
          <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
            <span className="text-2xl sm:text-3xl font-bold translate-y-1/2 tabular-nums">
              {prevDisplayValue}
            </span>
          </div>
        </div>
      )}

      {/* Flipping bottom half - comes up */}
      {isFlipping && (
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 h-1/2 rounded-b-[var(--radius-md)] overflow-hidden",
            "origin-top backface-hidden",
            "[transform-style:preserve-3d]",
            colorScheme === "default" && "bg-[var(--color-surface-muted)]",
            colorScheme === "primary" && "bg-[var(--color-primary)]/10",
            colorScheme === "dark" && "bg-[var(--color-surface-inverse)]",
            isUrgent && "bg-[var(--color-error)]/10"
          )}
          style={{
            animation: "flip-bottom-up 0.3s 0.15s ease-out forwards",
            transform: "rotateX(90deg)",
          }}
        >
          <div className="absolute inset-0 flex items-start justify-center overflow-hidden">
            <span className="text-2xl sm:text-3xl font-bold -translate-y-1/2 tabular-nums">
              {displayValue}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

// Compact countdown (inline)
export interface CompactCountdownProps extends React.HTMLAttributes<HTMLSpanElement> {
  targetDate: Date | string
  showLabels?: boolean
  completedText?: string
  urgencyThreshold?: number
}

export function CompactCountdown({
  targetDate,
  showLabels = true,
  completedText = "Ended",
  urgencyThreshold = 60,
  className,
  ...props
}: CompactCountdownProps) {
  const target = typeof targetDate === "string" ? new Date(targetDate) : targetDate
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft>(() => calculateTimeLeft(target))

  const isUrgent = timeLeft.total > 0 && timeLeft.total / 1000 <= urgencyThreshold

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(target))
    }, 1000)
    return () => clearInterval(timer)
  }, [target])

  if (timeLeft.total <= 0) {
    return (
      <span
        className={cn(
          "text-[var(--color-text-muted)]",
          "animate-in fade-in-0 duration-300",
          className
        )}
        {...props}
      >
        {completedText}
      </span>
    )
  }

  const parts = []
  if (timeLeft.days > 0) {
    parts.push(`${timeLeft.days}${showLabels ? "d" : ""}`)
  }
  parts.push(`${String(timeLeft.hours).padStart(2, "0")}${showLabels ? "h" : ""}`)
  parts.push(`${String(timeLeft.minutes).padStart(2, "0")}${showLabels ? "m" : ""}`)
  parts.push(`${String(timeLeft.seconds).padStart(2, "0")}${showLabels ? "s" : ""}`)

  return (
    <span
      className={cn(
        "font-mono tabular-nums",
        "transition-all duration-300",
        isUrgent && [
          "text-[var(--color-error)]",
          "animate-[urgency-pulse_1s_ease-in-out_infinite]",
        ],
        className
      )}
      {...props}
    >
      {parts.join(showLabels ? " " : ":")}
    </span>
  )
}

// Event countdown with title
export interface EventCountdownProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  targetDate: Date | string
  variant?: "default" | "cards" | "large" | "flip"
  onComplete?: () => void
  urgencyThreshold?: number
}

export function EventCountdown({
  title,
  description,
  targetDate,
  variant = "default",
  onComplete,
  urgencyThreshold = 300, // 5 minutes for events
  className,
  ...props
}: EventCountdownProps) {
  const target = typeof targetDate === "string" ? new Date(targetDate) : targetDate
  const timeLeft = calculateTimeLeft(target)
  const isUrgent = timeLeft.total > 0 && timeLeft.total / 1000 <= urgencyThreshold

  return (
    <div
      className={cn(
        "text-center p-6 sm:p-10",
        "rounded-[var(--radius-xl)]",
        "bg-[var(--color-surface-muted)]",
        "transition-all duration-500",
        isUrgent && [
          "bg-[var(--color-error)]/5",
          "ring-2 ring-[var(--color-error)]/20",
          "shadow-[0_0_40px_rgba(var(--color-error-rgb),0.1)]",
        ],
        className
      )}
      {...props}
    >
      <h3
        className={cn(
          "text-xl sm:text-2xl font-bold",
          "transition-colors duration-300",
          isUrgent ? "text-[var(--color-error)]" : "text-[var(--color-text)]"
        )}
      >
        {title}
      </h3>
      {description && (
        <p className="mt-2 text-[var(--color-text-muted)]">{description}</p>
      )}
      <div className="mt-6">
        <CountdownTimer
          targetDate={targetDate}
          variant={variant}
          onComplete={onComplete}
          urgencyThreshold={urgencyThreshold}
        />
      </div>
    </div>
  )
}

// Flash sale countdown with urgency styling
export interface FlashSaleCountdownProps extends React.HTMLAttributes<HTMLDivElement> {
  targetDate: Date | string
  label?: string
  onComplete?: () => void
}

export function FlashSaleCountdown({
  targetDate,
  label = "Sale ends in",
  onComplete,
  className,
  ...props
}: FlashSaleCountdownProps) {
  const target = typeof targetDate === "string" ? new Date(targetDate) : targetDate
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft>(() => calculateTimeLeft(target))

  const isUrgent = timeLeft.total > 0 && timeLeft.total / 1000 <= 300 // 5 minutes

  React.useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(target)
      setTimeLeft(newTimeLeft)
      if (newTimeLeft.total <= 0) {
        onComplete?.()
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [target, onComplete])

  if (timeLeft.total <= 0) return null

  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 px-4 py-2",
        "rounded-full",
        "transition-all duration-300",
        isUrgent
          ? [
              "bg-[var(--color-error)]",
              "text-white",
              "shadow-[0_0_20px_rgba(var(--color-error-rgb),0.4)]",
              "animate-[urgency-pulse_1s_ease-in-out_infinite]",
            ]
          : [
              "bg-[var(--color-warning)]",
              "text-white",
            ],
        className
      )}
      {...props}
    >
      <span className="text-sm font-medium">{label}</span>
      <span className="font-mono font-bold tabular-nums">
        {timeLeft.hours > 0 && `${String(timeLeft.hours).padStart(2, "0")}:`}
        {String(timeLeft.minutes).padStart(2, "0")}:
        {String(timeLeft.seconds).padStart(2, "0")}
      </span>
    </div>
  )
}
