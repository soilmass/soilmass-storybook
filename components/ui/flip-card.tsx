"use client"

/**
 * Flip Card Component
 *
 * 3D flip card with front and back.
 * Features:
 * - Hover or click to flip
 * - Horizontal/vertical flip
 * - Spring timing for natural motion
 * - Shadow depth on flip
 * - Multiple variants
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Front content
   */
  front: React.ReactNode
  /**
   * Back content
   */
  back: React.ReactNode
  /**
   * Flip direction
   */
  direction?: "horizontal" | "vertical"
  /**
   * Flip trigger
   */
  trigger?: "hover" | "click"
  /**
   * Animation duration (ms)
   */
  duration?: number
  /**
   * Controlled flip state
   */
  flipped?: boolean
  /**
   * Callback when flipped
   */
  onFlip?: (flipped: boolean) => void
  /**
   * Height of the card
   */
  height?: string | number
}

export function FlipCard({
  front,
  back,
  direction = "horizontal",
  trigger = "hover",
  duration = 600,
  flipped: controlledFlipped,
  onFlip,
  height = 300,
  className,
  ...props
}: FlipCardProps) {
  const [internalFlipped, setInternalFlipped] = React.useState(false)
  const isControlled = controlledFlipped !== undefined
  const isFlipped = isControlled ? controlledFlipped : internalFlipped

  const handleFlip = () => {
    if (trigger === "click") {
      const newState = !isFlipped
      if (!isControlled) {
        setInternalFlipped(newState)
      }
      onFlip?.(newState)
    }
  }

  const rotateAxis = direction === "horizontal" ? "rotateY" : "rotateX"
  const backRotation = direction === "horizontal" ? "rotateY(180deg)" : "rotateX(180deg)"

  return (
    <div
      className={cn(
        "relative flip-card-container",
        trigger === "click" && "cursor-pointer",
        className
      )}
      style={{ height: typeof height === "number" ? `${height}px` : height }}
      onClick={handleFlip}
      onMouseEnter={trigger === "hover" ? () => !isControlled && setInternalFlipped(true) : undefined}
      onMouseLeave={trigger === "hover" ? () => !isControlled && setInternalFlipped(false) : undefined}
      {...props}
    >
      <div
        className={cn(
          "relative w-full h-full flip-card-inner",
          "shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
          isFlipped && "shadow-[0_20px_60px_rgb(0,0,0,0.25)]"
        )}
        style={{
          transform: isFlipped ? `${rotateAxis}(180deg)` : `${rotateAxis}(0deg)`,
          transition: `transform ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow ${duration}ms ease-out`,
        }}
      >
        {/* Front */}
        <div className="absolute inset-0 flip-card-face">
          {front}
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flip-card-face"
          style={{ transform: backRotation }}
        >
          {back}
        </div>
      </div>

      <style jsx>{`
        .flip-card-container {
          perspective: 1200px;
        }
        .flip-card-inner {
          transform-style: preserve-3d;
        }
        .flip-card-face {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </div>
  )
}

// Flip card with styled front/back components
export interface FlipCardFrontProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Background color
   */
  background?: string
  /**
   * Border radius
   */
  radius?: string
}

export function FlipCardFront({
  background = "var(--color-surface)",
  radius = "var(--radius-xl)",
  className,
  children,
  ...props
}: FlipCardFrontProps) {
  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center",
        "border border-[var(--color-border)]",
        "shadow-[0_4px_20px_rgb(0,0,0,0.08)]",
        "transition-shadow duration-500",
        "hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
        className
      )}
      style={{
        backgroundColor: background,
        borderRadius: radius,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export interface FlipCardBackProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Background color
   */
  background?: string
  /**
   * Border radius
   */
  radius?: string
}

export function FlipCardBack({
  background = "var(--color-surface-muted)",
  radius = "var(--radius-xl)",
  className,
  children,
  ...props
}: FlipCardBackProps) {
  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center",
        "border border-[var(--color-border)]",
        "shadow-[0_4px_20px_rgb(0,0,0,0.08)]",
        className
      )}
      style={{
        backgroundColor: background,
        borderRadius: radius,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

// Profile flip card
export interface ProfileFlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Profile image
   */
  image: string
  /**
   * Person name
   */
  name: string
  /**
   * Role/title
   */
  role: string
  /**
   * Bio text
   */
  bio: string
  /**
   * Social links
   */
  socials?: Array<{
    icon: React.ReactNode
    href: string
    label: string
  }>
  /**
   * Card height
   */
  height?: number
}

export function ProfileFlipCard({
  image,
  name,
  role,
  bio,
  socials,
  height = 400,
  className,
  ...props
}: ProfileFlipCardProps) {
  return (
    <FlipCard
      height={height}
      className={className}
      front={
        <div className={cn(
          "w-full h-full rounded-xl overflow-hidden",
          "bg-[var(--color-surface)]",
          "border border-[var(--color-border)]",
          "shadow-[0_4px_20px_rgb(0,0,0,0.08)]",
          "group-hover:shadow-[0_12px_40px_rgb(0,0,0,0.15)]",
          "transition-shadow duration-500"
        )}>
          <img
            src={image}
            alt={name}
            className="w-full h-2/3 object-cover"
          />
          <div className="p-4 text-center">
            <h3 className="font-semibold text-lg text-[var(--color-text)]">{name}</h3>
            <p className="text-sm text-[var(--color-text-muted)]">{role}</p>
          </div>
        </div>
      }
      back={
        <div className={cn(
          "w-full h-full rounded-xl overflow-hidden",
          "bg-[var(--color-surface-muted)]",
          "border border-[var(--color-border)]",
          "p-6 flex flex-col justify-between",
          "shadow-[0_4px_20px_rgb(0,0,0,0.08)]"
        )}>
          <div>
            <h3 className="font-semibold text-lg text-[var(--color-text)] mb-3">{name}</h3>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{bio}</p>
          </div>
          {socials && socials.length > 0 && (
            <div className="flex gap-4 justify-center mt-4">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className={cn(
                    "text-[var(--color-text-muted)]",
                    "hover:text-[var(--color-primary)]",
                    "hover:scale-110",
                    "active:scale-95",
                    "transition-all duration-300"
                  )}
                  style={{
                    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          )}
        </div>
      }
      {...props}
    />
  )
}

// Product flip card
export interface ProductFlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Product image
   */
  image: string
  /**
   * Product name
   */
  name: string
  /**
   * Product price
   */
  price: string
  /**
   * Original price (for sale items)
   */
  originalPrice?: string
  /**
   * Product description
   */
  description: string
  /**
   * Product features
   */
  features?: string[]
  /**
   * Card height
   */
  height?: number
}

export function ProductFlipCard({
  image,
  name,
  price,
  originalPrice,
  description,
  features,
  height = 350,
  className,
  ...props
}: ProductFlipCardProps) {
  return (
    <FlipCard
      height={height}
      className={className}
      front={
        <div className={cn(
          "w-full h-full rounded-xl overflow-hidden",
          "bg-[var(--color-surface)]",
          "border border-[var(--color-border)]",
          "shadow-[0_4px_20px_rgb(0,0,0,0.08)]",
          "hover:shadow-[0_12px_40px_rgb(0,0,0,0.15)]",
          "transition-shadow duration-500"
        )}>
          <div className="h-3/5 bg-[var(--color-surface-muted)] flex items-center justify-center p-4">
            <img
              src={image}
              alt={name}
              className={cn(
                "max-w-full max-h-full object-contain",
                "transition-transform duration-500",
                "group-hover:scale-105"
              )}
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-[var(--color-text)]">{name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-bold text-lg text-[var(--color-primary)]">{price}</span>
              {originalPrice && (
                <span className="text-sm text-[var(--color-text-muted)] line-through">
                  {originalPrice}
                </span>
              )}
            </div>
          </div>
        </div>
      }
      back={
        <div className={cn(
          "w-full h-full rounded-xl overflow-hidden",
          "bg-[var(--color-surface)]",
          "border border-[var(--color-border)]",
          "p-5 flex flex-col",
          "shadow-[0_4px_20px_rgb(0,0,0,0.08)]"
        )}>
          <h3 className="font-semibold text-[var(--color-text)] mb-2">{name}</h3>
          <p className="text-sm text-[var(--color-text-muted)] mb-4 leading-relaxed">{description}</p>
          {features && features.length > 0 && (
            <ul className="flex-1 space-y-2">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="text-sm text-[var(--color-text-muted)] flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
          <button
            className={cn(
              "mt-auto w-full py-2.5 rounded-lg",
              "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]",
              "font-medium",
              "hover:opacity-90 hover:scale-[1.02]",
              "active:scale-[0.98]",
              "transition-all duration-300",
              "shadow-[0_2px_10px_rgba(var(--color-primary-rgb,59,130,246),0.3)]",
              "hover:shadow-[0_4px_20px_rgba(var(--color-primary-rgb,59,130,246),0.4)]"
            )}
            style={{
              transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
          >
            Add to Cart
          </button>
        </div>
      }
      {...props}
    />
  )
}

// Info flip card (icon front, text back)
export interface InfoFlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Front icon
   */
  icon: React.ReactNode
  /**
   * Title
   */
  title: string
  /**
   * Description (shown on back)
   */
  description: string
  /**
   * Icon background color
   */
  iconBackground?: string
  /**
   * Card height
   */
  height?: number
}

export function InfoFlipCard({
  icon,
  title,
  description,
  iconBackground = "var(--color-primary)",
  height = 200,
  className,
  ...props
}: InfoFlipCardProps) {
  return (
    <FlipCard
      height={height}
      className={className}
      front={
        <div className={cn(
          "w-full h-full rounded-xl",
          "bg-[var(--color-surface)]",
          "border border-[var(--color-border)]",
          "flex flex-col items-center justify-center p-6 gap-4",
          "shadow-[0_4px_20px_rgb(0,0,0,0.08)]",
          "hover:shadow-[0_12px_40px_rgb(0,0,0,0.15)]",
          "transition-shadow duration-500"
        )}>
          <div
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center text-white",
              "shadow-[0_4px_20px_rgba(var(--color-primary-rgb,59,130,246),0.4)]",
              "hover:shadow-[0_8px_30px_rgba(var(--color-primary-rgb,59,130,246),0.5)]",
              "hover:scale-110",
              "transition-all duration-500"
            )}
            style={{
              backgroundColor: iconBackground,
              transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
          >
            {icon}
          </div>
          <h3 className="font-semibold text-[var(--color-text)] text-center">{title}</h3>
        </div>
      }
      back={
        <div className={cn(
          "w-full h-full rounded-xl",
          "bg-[var(--color-surface-muted)]",
          "border border-[var(--color-border)]",
          "flex items-center justify-center p-6",
          "shadow-[0_4px_20px_rgb(0,0,0,0.08)]"
        )}>
          <p className="text-sm text-[var(--color-text-muted)] text-center leading-relaxed">{description}</p>
        </div>
      }
      {...props}
    />
  )
}

// Flip card grid
export interface FlipCardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns
   */
  columns?: 1 | 2 | 3 | 4
  /**
   * Gap between cards
   */
  gap?: number
}

export function FlipCardGrid({
  columns = 3,
  gap = 24,
  className,
  children,
  ...props
}: FlipCardGridProps) {
  const columnClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div
      className={cn("grid", columnClass[columns], className)}
      style={{ gap }}
      {...props}
    >
      {children}
    </div>
  )
}

// Reveal card (content reveals on flip)
export interface RevealCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Hidden content (front - teaser)
   */
  teaser: React.ReactNode
  /**
   * Revealed content (back)
   */
  reveal: React.ReactNode
  /**
   * Reveal text on front
   */
  revealText?: string
  /**
   * Card height
   */
  height?: number
}

export function RevealCard({
  teaser,
  reveal,
  revealText = "Click to reveal",
  height = 250,
  className,
  ...props
}: RevealCardProps) {
  const [isFlipped, setIsFlipped] = React.useState(false)

  return (
    <FlipCard
      height={height}
      trigger="click"
      flipped={isFlipped}
      onFlip={setIsFlipped}
      className={className}
      front={
        <div className={cn(
          "w-full h-full rounded-xl",
          "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)]",
          "text-white flex flex-col items-center justify-center p-6 gap-4",
          "shadow-[0_8px_30px_rgba(var(--color-primary-rgb,59,130,246),0.3)]",
          "hover:shadow-[0_12px_40px_rgba(var(--color-primary-rgb,59,130,246),0.4)]",
          "transition-shadow duration-500"
        )}>
          <div className="text-4xl">{teaser}</div>
          <p className={cn(
            "text-sm opacity-80",
            "animate-pulse"
          )}>{revealText}</p>
        </div>
      }
      back={
        <div className={cn(
          "w-full h-full rounded-xl",
          "bg-[var(--color-surface)]",
          "border border-[var(--color-border)]",
          "flex items-center justify-center p-6",
          "shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
        )}>
          {reveal}
        </div>
      }
      {...props}
    />
  )
}

// Stat flip card (shows stat on front, detail on back)
export interface StatFlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Stat value (e.g., "99%", "$1.2M")
   */
  value: string
  /**
   * Stat label
   */
  label: string
  /**
   * Detail text on back
   */
  detail: string
  /**
   * Card height
   */
  height?: number
}

export function StatFlipCard({
  value,
  label,
  detail,
  height = 180,
  className,
  ...props
}: StatFlipCardProps) {
  return (
    <FlipCard
      height={height}
      className={className}
      front={
        <div className={cn(
          "w-full h-full rounded-xl",
          "bg-[var(--color-surface)]",
          "border border-[var(--color-border)]",
          "flex flex-col items-center justify-center p-6",
          "shadow-[0_4px_20px_rgb(0,0,0,0.08)]",
          "hover:shadow-[0_12px_40px_rgb(0,0,0,0.15)]",
          "transition-shadow duration-500"
        )}>
          <span className={cn(
            "text-4xl font-bold",
            "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-hover)]",
            "bg-clip-text text-transparent"
          )}>{value}</span>
          <span className="mt-2 text-sm text-[var(--color-text-muted)]">{label}</span>
        </div>
      }
      back={
        <div className={cn(
          "w-full h-full rounded-xl",
          "bg-[var(--color-surface-muted)]",
          "border border-[var(--color-border)]",
          "flex items-center justify-center p-6",
          "shadow-[0_4px_20px_rgb(0,0,0,0.08)]"
        )}>
          <p className="text-sm text-[var(--color-text-muted)] text-center leading-relaxed">{detail}</p>
        </div>
      }
      {...props}
    />
  )
}
