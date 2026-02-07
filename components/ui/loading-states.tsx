"use client"

/**
 * Loading States Component
 *
 * Premium loading indicators with design token integration.
 * Features:
 * - Token-based colors
 * - Token-based animation durations
 * - Spring easing for smooth animations
 * - Various loader styles
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Color variants using tokens
const colorVariants = {
  primary: "var(--color-primary)",
  accent: "var(--color-accent)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  error: "var(--color-error)",
  muted: "var(--color-text-muted)",
}

type ColorVariant = keyof typeof colorVariants

// Pulse loader (bouncing dots)
export interface PulseLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Loader color variant
   */
  variant?: ColorVariant
  /**
   * Custom loader color
   */
  color?: string
  /**
   * Dot size
   */
  size?: number
  /**
   * Number of dots
   */
  count?: number
}

export function PulseLoader({
  variant = "primary",
  color,
  size = 10,
  count = 3,
  className,
  ...props
}: PulseLoaderProps) {
  const loaderColor = color || colorVariants[variant]

  return (
    <div
      className={cn("inline-flex items-center gap-1", className)}
      role="status"
      aria-label="Loading"
      {...props}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-full animate-pulse-loader"
          style={{
            width: size,
            height: size,
            backgroundColor: loaderColor,
            animationDelay: `calc(var(--duration-fast) * ${i})`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes pulse-loader {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(0.5);
            opacity: 0.5;
          }
        }
        .animate-pulse-loader {
          animation: pulse-loader var(--duration-slower) var(--ease-spring) infinite;
        }
      `}</style>
    </div>
  )
}

// Dots loader (fading dots)
export interface DotsLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Loader color variant
   */
  variant?: ColorVariant
  /**
   * Custom loader color
   */
  color?: string
  /**
   * Dot size
   */
  size?: number
  /**
   * Gap between dots
   */
  gap?: number
}

export function DotsLoader({
  variant = "primary",
  color,
  size = 8,
  gap = 4,
  className,
  ...props
}: DotsLoaderProps) {
  const loaderColor = color || colorVariants[variant]

  return (
    <div
      className={cn("inline-flex items-center", className)}
      style={{ gap }}
      role="status"
      aria-label="Loading"
      {...props}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="rounded-full animate-dots-loader"
          style={{
            width: size,
            height: size,
            backgroundColor: loaderColor,
            animationDelay: `calc(var(--duration-normal) * ${i})`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes dots-loader {
          0%, 80%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          40% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-dots-loader {
          animation: dots-loader 1.4s var(--ease-spring) infinite;
        }
      `}</style>
    </div>
  )
}

// Bars loader
export interface BarsLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Loader color variant
   */
  variant?: ColorVariant
  /**
   * Custom loader color
   */
  color?: string
  /**
   * Bar width
   */
  barWidth?: number
  /**
   * Bar height
   */
  barHeight?: number
  /**
   * Number of bars
   */
  count?: number
}

export function BarsLoader({
  variant = "primary",
  color,
  barWidth = 4,
  barHeight = 24,
  count = 5,
  className,
  ...props
}: BarsLoaderProps) {
  const loaderColor = color || colorVariants[variant]

  return (
    <div
      className={cn("inline-flex items-end gap-1", className)}
      role="status"
      aria-label="Loading"
      {...props}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-sm animate-bars-loader"
          style={{
            width: barWidth,
            height: barHeight,
            backgroundColor: loaderColor,
            animationDelay: `calc(var(--duration-fast) * ${i})`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes bars-loader {
          0%, 40%, 100% {
            transform: scaleY(0.4);
          }
          20% {
            transform: scaleY(1);
          }
        }
        .animate-bars-loader {
          animation: bars-loader 1.2s var(--ease-spring) infinite;
        }
      `}</style>
    </div>
  )
}

// Circle loader (spinning ring)
export interface CircleLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Loader color variant
   */
  variant?: ColorVariant
  /**
   * Custom loader color
   */
  color?: string
  /**
   * Loader size
   */
  size?: number
  /**
   * Stroke width
   */
  strokeWidth?: number
}

export function CircleLoader({
  variant = "primary",
  color,
  size = 40,
  strokeWidth = 4,
  className,
  ...props
}: CircleLoaderProps) {
  const loaderColor = color || colorVariants[variant]
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI

  return (
    <div
      className={cn("inline-block", className)}
      role="status"
      aria-label="Loading"
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="animate-spin"
        style={{ animationDuration: "var(--duration-slowest)" }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`color-mix(in srgb, ${loaderColor} 30%, transparent)`}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={loaderColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.75}
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

// Text loader (loading text with animation)
export interface TextLoaderProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Loading text
   */
  text?: string
  /**
   * Dot animation
   */
  dots?: boolean
  /**
   * Number of dots
   */
  dotCount?: number
}

export function TextLoader({
  text = "Loading",
  dots = true,
  dotCount = 3,
  className,
  ...props
}: TextLoaderProps) {
  const [visibleDots, setVisibleDots] = React.useState(0)

  React.useEffect(() => {
    if (!dots) return

    const interval = setInterval(() => {
      setVisibleDots((prev) => (prev + 1) % (dotCount + 1))
    }, 500)

    return () => clearInterval(interval)
  }, [dots, dotCount])

  return (
    <span
      className={cn("inline-block", className)}
      role="status"
      aria-label="Loading"
      {...props}
    >
      {text}
      {dots && (
        <span className="inline-block w-8">
          {".".repeat(visibleDots)}
        </span>
      )}
    </span>
  )
}

// Bounce loader
export interface BounceLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Loader color variant
   */
  variant?: ColorVariant
  /**
   * Custom loader color
   */
  color?: string
  /**
   * Loader size
   */
  size?: number
}

export function BounceLoader({
  variant = "primary",
  color,
  size = 40,
  className,
  ...props
}: BounceLoaderProps) {
  const loaderColor = color || colorVariants[variant]

  return (
    <div
      className={cn("relative inline-block", className)}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
      {...props}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-full animate-bounce-loader"
          style={{
            backgroundColor: loaderColor,
            opacity: 0.6,
            animationDelay: i === 1 ? "-1s" : "0s",
          }}
        />
      ))}

      <style jsx>{`
        @keyframes bounce-loader {
          0%, 100% {
            transform: scale(0);
          }
          50% {
            transform: scale(1);
          }
        }
        .animate-bounce-loader {
          animation: bounce-loader 2s var(--ease-spring) infinite;
        }
      `}</style>
    </div>
  )
}

// Ripple loader
export interface RippleLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Loader color variant
   */
  variant?: ColorVariant
  /**
   * Custom loader color
   */
  color?: string
  /**
   * Loader size
   */
  size?: number
}

export function RippleLoader({
  variant = "primary",
  color,
  size = 40,
  className,
  ...props
}: RippleLoaderProps) {
  const loaderColor = color || colorVariants[variant]

  return (
    <div
      className={cn("relative inline-block", className)}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
      {...props}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-full border-2 animate-ripple-loader"
          style={{
            borderColor: loaderColor,
            animationDelay: `calc(var(--duration-slowest) * ${i * 0.5})`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes ripple-loader {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        .animate-ripple-loader {
          animation: ripple-loader 1s var(--ease-out) infinite;
        }
      `}</style>
    </div>
  )
}

// Square loader
export interface SquareLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Loader color variant
   */
  variant?: ColorVariant
  /**
   * Custom loader color
   */
  color?: string
  /**
   * Loader size
   */
  size?: number
}

export function SquareLoader({
  variant = "primary",
  color,
  size = 40,
  className,
  ...props
}: SquareLoaderProps) {
  const loaderColor = color || colorVariants[variant]

  return (
    <div
      className={cn("inline-block", className)}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
      {...props}
    >
      <div
        className="w-full h-full animate-square-loader"
        style={{ backgroundColor: loaderColor }}
      />

      <style jsx>{`
        @keyframes square-loader {
          0% {
            transform: perspective(120px) rotateX(0deg) rotateY(0deg);
          }
          50% {
            transform: perspective(120px) rotateX(-180deg) rotateY(0deg);
          }
          100% {
            transform: perspective(120px) rotateX(-180deg) rotateY(-180deg);
          }
        }
        .animate-square-loader {
          animation: square-loader 1.2s var(--ease-default) infinite;
        }
      `}</style>
    </div>
  )
}

// Grid loader
export interface GridLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Loader color variant
   */
  variant?: ColorVariant
  /**
   * Custom loader color
   */
  color?: string
  /**
   * Cell size
   */
  cellSize?: number
  /**
   * Gap between cells
   */
  gap?: number
}

export function GridLoader({
  variant = "primary",
  color,
  cellSize = 12,
  gap = 4,
  className,
  ...props
}: GridLoaderProps) {
  const loaderColor = color || colorVariants[variant]
  const delays = [0, 0.1, 0.2, 0.1, 0.2, 0.3, 0.2, 0.3, 0.4]

  return (
    <div
      className={cn("grid grid-cols-3", className)}
      style={{ gap }}
      role="status"
      aria-label="Loading"
      {...props}
    >
      {delays.map((delay, i) => (
        <div
          key={i}
          className="rounded-[var(--radius-sm)] animate-grid-loader"
          style={{
            width: cellSize,
            height: cellSize,
            backgroundColor: loaderColor,
            animationDelay: `${delay}s`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes grid-loader {
          0%, 70%, 100% {
            transform: scale3d(1, 1, 1);
          }
          35% {
            transform: scale3d(0, 0, 1);
          }
        }
        .animate-grid-loader {
          animation: grid-loader 1.3s var(--ease-spring) infinite;
        }
      `}</style>
    </div>
  )
}

// Orbit loader
export interface OrbitLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Loader color variant
   */
  variant?: ColorVariant
  /**
   * Custom loader color
   */
  color?: string
  /**
   * Loader size
   */
  size?: number
  /**
   * Dot size
   */
  dotSize?: number
}

export function OrbitLoader({
  variant = "primary",
  color,
  size = 40,
  dotSize = 8,
  className,
  ...props
}: OrbitLoaderProps) {
  const loaderColor = color || colorVariants[variant]

  return (
    <div
      className={cn("relative inline-block", className)}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
      {...props}
    >
      <div
        className="absolute inset-0 rounded-full border-2 opacity-20"
        style={{ borderColor: loaderColor }}
      />
      <div
        className="absolute animate-orbit-loader"
        style={{
          width: dotSize,
          height: dotSize,
          backgroundColor: loaderColor,
          borderRadius: "50%",
          top: -dotSize / 2,
          left: `calc(50% - ${dotSize / 2}px)`,
          transformOrigin: `${dotSize / 2}px ${size / 2 + dotSize / 2}px`,
        }}
      />

      <style jsx>{`
        @keyframes orbit-loader {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-orbit-loader {
          animation: orbit-loader var(--duration-slowest) linear infinite;
        }
      `}</style>
    </div>
  )
}

// Typing loader (three dots typing indicator)
export interface TypingLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Loader color variant
   */
  variant?: ColorVariant
  /**
   * Custom loader color
   */
  color?: string
  /**
   * Dot size
   */
  size?: number
}

export function TypingLoader({
  variant = "muted",
  color,
  size = 8,
  className,
  ...props
}: TypingLoaderProps) {
  const loaderColor = color || colorVariants[variant]

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1",
        "px-[var(--space-3)] py-[var(--space-2)]",
        "rounded-full bg-[var(--color-surface-muted)]",
        className
      )}
      role="status"
      aria-label="Typing"
      {...props}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="rounded-full animate-typing-loader"
          style={{
            width: size,
            height: size,
            backgroundColor: loaderColor,
            animationDelay: `calc(var(--duration-moderate) * ${i})`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes typing-loader {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-4px);
          }
        }
        .animate-typing-loader {
          animation: typing-loader 1s var(--ease-spring) infinite;
        }
      `}</style>
    </div>
  )
}

// Gradient loader
export interface GradientLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Gradient color variants
   */
  variants?: ColorVariant[]
  /**
   * Custom gradient colors
   */
  colors?: string[]
  /**
   * Loader size
   */
  size?: number
  /**
   * Stroke width
   */
  strokeWidth?: number
}

export function GradientLoader({
  variants = ["primary", "accent"],
  colors,
  size = 40,
  strokeWidth = 4,
  className,
  ...props
}: GradientLoaderProps) {
  const gradientId = React.useId()
  const radius = (size - strokeWidth) / 2
  const gradientColors = colors || variants.map((v) => colorVariants[v])

  return (
    <div
      className={cn("inline-block", className)}
      role="status"
      aria-label="Loading"
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="animate-spin"
        style={{ animationDuration: "var(--duration-slowest)" }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            {gradientColors.map((gradColor, i) => (
              <stop
                key={i}
                offset={`${(i / (gradientColors.length - 1)) * 100}%`}
                stopColor={gradColor}
              />
            ))}
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={radius * Math.PI * 2}
          strokeDashoffset={radius * Math.PI * 1.5}
        />
      </svg>
    </div>
  )
}

// Loading overlay
export interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Show overlay
   */
  visible?: boolean
  /**
   * Loading text
   */
  text?: string
  /**
   * Blur background
   */
  blur?: boolean
  /**
   * Loader type
   */
  loader?: "circle" | "dots" | "pulse" | "bars"
  /**
   * Loader variant
   */
  variant?: ColorVariant
}

export function LoadingOverlay({
  visible = true,
  text,
  blur = true,
  loader = "circle",
  variant = "primary",
  className,
  ...props
}: LoadingOverlayProps) {
  if (!visible) return null

  const loaders = {
    circle: <CircleLoader variant={variant} />,
    dots: <DotsLoader variant={variant} />,
    pulse: <PulseLoader variant={variant} />,
    bars: <BarsLoader variant={variant} />,
  }

  return (
    <div
      className={cn(
        "absolute inset-0 z-[var(--z-modal)] flex flex-col items-center justify-center gap-[var(--space-4)]",
        "bg-[var(--color-surface-overlay)]",
        blur && "backdrop-blur-[var(--blur-sm)]",
        className
      )}
      {...props}
    >
      {loaders[loader]}
      {text && (
        <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">{text}</p>
      )}
    </div>
  )
}

// Progress loader (indeterminate progress bar)
export interface ProgressLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Loader color variant
   */
  variant?: ColorVariant
  /**
   * Custom loader color
   */
  color?: string
  /**
   * Bar height
   */
  height?: number
}

export function ProgressLoader({
  variant = "primary",
  color,
  height = 4,
  className,
  ...props
}: ProgressLoaderProps) {
  const loaderColor = color || colorVariants[variant]

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-full bg-[var(--color-surface-muted)]",
        className
      )}
      style={{ height }}
      role="progressbar"
      aria-label="Loading"
      {...props}
    >
      <div
        className="h-full rounded-full animate-progress-loader"
        style={{ backgroundColor: loaderColor }}
      />

      <style jsx>{`
        @keyframes progress-loader {
          0% {
            width: 0%;
            margin-left: 0%;
          }
          50% {
            width: 40%;
            margin-left: 30%;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
        .animate-progress-loader {
          animation: progress-loader 1.5s var(--ease-spring) infinite;
        }
      `}</style>
    </div>
  )
}
