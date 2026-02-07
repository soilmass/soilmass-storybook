/**
 * Skeleton Loader Component
 * Domain 80: Skeleton Loaders
 *
 * Placeholder content shown while real content loads.
 * Features:
 * - aria-busy for screen readers (SKL1)
 * - Matches layout of actual content (SKL2)
 * - Respects reduced motion (SKL3)
 * - Shimmer animation
 * - Text, image, avatar, card variants
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Base Skeleton component
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Shape variant
   */
  variant?: "text" | "circular" | "rectangular"
  /**
   * Width (CSS value)
   */
  width?: string | number
  /**
   * Height (CSS value)
   */
  height?: string | number
  /**
   * Disable animation
   */
  animation?: "pulse" | "wave" | "none"
}

export function Skeleton({
  variant = "text",
  width,
  height,
  animation = "wave",
  className,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        // Base styles
        "bg-[var(--color-surface-alt)]",
        "relative overflow-hidden",
        // Shape variants
        variant === "text" && "h-[1em] rounded-[var(--radius-sm)]",
        variant === "circular" && "rounded-full",
        variant === "rectangular" && "rounded-[var(--radius-md)]",
        // Animation
        animation === "pulse" && "animate-pulse",
        animation === "wave" && [
          "after:absolute after:inset-0",
          "after:-translate-x-full",
          "after:bg-gradient-to-r",
          "after:from-transparent after:via-white/20 after:to-transparent",
          "after:animate-[shimmer_2s_infinite_ease-[var(--ease-spring)]]",
        ],
        animation === "none" && "",
        // Reduced motion (SKL3)
        "motion-reduce:after:animate-none motion-reduce:animate-none",
        className
      )}
      style={{
        width: width,
        height: variant !== "text" ? height : undefined,
        ...style,
      }}
      {...props}
    />
  )
}

// Skeleton Text - for paragraph placeholders
export interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of lines
   */
  lines?: number
  /**
   * Width of last line (as percentage)
   */
  lastLineWidth?: string
  /**
   * Gap between lines
   */
  gap?: string
}

export function SkeletonText({
  lines = 3,
  lastLineWidth = "75%",
  gap = "0.5em",
  className,
  ...props
}: SkeletonTextProps) {
  return (
    <div
      className={cn("flex flex-col", className)}
      style={{ gap }}
      role="presentation"
      {...props}
    >
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? lastLineWidth : "100%"}
        />
      ))}
    </div>
  )
}

// Skeleton Avatar
export interface SkeletonAvatarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Size
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

const avatarSizes = {
  xs: "h-6 w-6",
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
}

export function SkeletonAvatar({
  size = "md",
  className,
  ...props
}: SkeletonAvatarProps) {
  return (
    <Skeleton
      variant="circular"
      className={cn(avatarSizes[size], className)}
      {...props}
    />
  )
}

// Skeleton Image
export interface SkeletonImageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Aspect ratio
   */
  aspectRatio?: "video" | "square" | "portrait" | "auto"
}

const aspectRatios = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  auto: "",
}

export function SkeletonImage({
  aspectRatio = "video",
  className,
  ...props
}: SkeletonImageProps) {
  return (
    <Skeleton
      variant="rectangular"
      className={cn("w-full", aspectRatios[aspectRatio], className)}
      {...props}
    />
  )
}

// Skeleton Button
export interface SkeletonButtonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Size
   */
  size?: "sm" | "md" | "lg"
}

const buttonSizes = {
  sm: "h-9 w-20",
  md: "h-10 w-24",
  lg: "h-11 w-28",
}

export function SkeletonButton({
  size = "md",
  className,
  ...props
}: SkeletonButtonProps) {
  return (
    <Skeleton
      variant="rectangular"
      className={cn(buttonSizes[size], className)}
      {...props}
    />
  )
}

// Skeleton Card composition
export interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Show image placeholder
   */
  showImage?: boolean
  /**
   * Show avatar in header
   */
  showAvatar?: boolean
  /**
   * Number of text lines
   */
  lines?: number
}

export function SkeletonCard({
  showImage = true,
  showAvatar = true,
  lines = 2,
  className,
  ...props
}: SkeletonCardProps) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading"
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)]",
        "overflow-hidden",
        "shadow-[var(--shadow-card)]",
        "animate-[fadeIn_0.3s_ease-[var(--ease-spring)]]",
        className
      )}
      {...props}
    >
      {showImage && <SkeletonImage aspectRatio="video" />}
      <div className="p-4 space-y-4">
        {showAvatar && (
          <div className="flex items-center gap-3">
            <SkeletonAvatar size="md" />
            <div className="flex-1 space-y-2">
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="60%" height="0.75em" />
            </div>
          </div>
        )}
        <SkeletonText lines={lines} />
      </div>
    </div>
  )
}

// Skeleton List composition
export interface SkeletonListProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of list items
   */
  items?: number
  /**
   * Show avatar for each item
   */
  showAvatar?: boolean
}

export function SkeletonList({
  items = 5,
  showAvatar = true,
  className,
  ...props
}: SkeletonListProps) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading list"
      className={cn("divide-y divide-[var(--color-border)]", className)}
      {...props}
    >
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 py-3">
          {showAvatar && <SkeletonAvatar size="sm" />}
          <div className="flex-1">
            <Skeleton variant="text" width={`${70 + Math.random() * 20}%`} />
          </div>
        </div>
      ))}
    </div>
  )
}

// Skeleton Table Row
export interface SkeletonTableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   * Number of columns
   */
  columns?: number
}

export function SkeletonTableRow({
  columns = 4,
  className,
  ...props
}: SkeletonTableRowProps) {
  return (
    <tr className={className} {...props}>
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton
            variant="text"
            width={`${50 + Math.random() * 40}%`}
          />
        </td>
      ))}
    </tr>
  )
}

// Wrapper with aria-busy (SKL1)
export interface SkeletonContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Loading state
   */
  isLoading: boolean
  /**
   * Loading label for screen readers
   */
  loadingLabel?: string
}

export function SkeletonContainer({
  isLoading,
  loadingLabel = "Loading content",
  children,
  className,
  ...props
}: SkeletonContainerProps) {
  return (
    <div
      aria-busy={isLoading}
      aria-label={isLoading ? loadingLabel : undefined}
      className={className}
      {...props}
    >
      {children}
    </div>
  )
}
