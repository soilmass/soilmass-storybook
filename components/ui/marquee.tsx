"use client"

/**
 * Marquee Component
 *
 * Infinite scrolling content animation.
 * Features:
 * - Smooth infinite scroll with linear timing
 * - Horizontal/vertical scrolling
 * - Configurable speed and direction
 * - Pause on hover with smooth transition
 * - Gradient fade edges
 * - Duplicate content for seamless loop
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Scroll direction
   */
  direction?: "left" | "right" | "up" | "down"
  /**
   * Speed in pixels per second
   */
  speed?: number
  /**
   * Pause on hover
   */
  pauseOnHover?: boolean
  /**
   * Show gradient fade on edges
   */
  fade?: boolean
  /**
   * Fade width in pixels
   */
  fadeWidth?: number
  /**
   * Gap between repeated items
   */
  gap?: number
  /**
   * Number of times to duplicate content
   */
  repeat?: number
}

export function Marquee({
  direction = "left",
  speed = 50,
  pauseOnHover = true,
  fade = true,
  fadeWidth = 64,
  gap = 24,
  repeat = 2,
  className,
  children,
  ...props
}: MarqueeProps) {
  const isHorizontal = direction === "left" || direction === "right"
  const isReverse = direction === "right" || direction === "down"

  // Calculate animation duration based on speed
  // Using a consistent linear calculation for smooth scrolling
  const baseDuration = 1000 / speed * 20

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        pauseOnHover && "group",
        className
      )}
      {...props}
    >
      {/* Gradient fades with smoother appearance */}
      {fade && (
        <>
          <div
            className={cn(
              "absolute z-10 pointer-events-none",
              isHorizontal
                ? "top-0 bottom-0 left-0 bg-gradient-to-r from-[var(--color-surface)] via-[var(--color-surface)]/80 to-transparent"
                : "left-0 right-0 top-0 bg-gradient-to-b from-[var(--color-surface)] via-[var(--color-surface)]/80 to-transparent"
            )}
            style={isHorizontal ? { width: fadeWidth } : { height: fadeWidth }}
          />
          <div
            className={cn(
              "absolute z-10 pointer-events-none",
              isHorizontal
                ? "top-0 bottom-0 right-0 bg-gradient-to-l from-[var(--color-surface)] via-[var(--color-surface)]/80 to-transparent"
                : "left-0 right-0 bottom-0 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)]/80 to-transparent"
            )}
            style={isHorizontal ? { width: fadeWidth } : { height: fadeWidth }}
          />
        </>
      )}

      {/* Scrolling content with smooth pause transition */}
      <div
        className={cn(
          "flex",
          isHorizontal ? "flex-row" : "flex-col"
        )}
        style={{ gap }}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0",
              isHorizontal ? "flex-row" : "flex-col",
              "marquee-content",
              pauseOnHover && "group-hover:[animation-play-state:paused]"
            )}
            style={{
              gap,
              animation: `marquee-${isHorizontal ? "horizontal" : "vertical"} ${baseDuration}s linear infinite`,
              animationDirection: isReverse ? "reverse" : "normal",
            }}
          >
            {children}
          </div>
        ))}
      </div>

      {/* Animation keyframes with smooth transitions */}
      <style jsx>{`
        @keyframes marquee-horizontal {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% - ${gap}px));
          }
        }
        @keyframes marquee-vertical {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(calc(-100% - ${gap}px));
          }
        }
        .marquee-content {
          will-change: transform;
          transition: animation-play-state 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

// Text marquee (simple scrolling text)
export interface TextMarqueeProps extends Omit<MarqueeProps, "children"> {
  /**
   * Text to scroll
   */
  text: string
  /**
   * Text size
   */
  size?: "sm" | "md" | "lg" | "xl"
  /**
   * Text color
   */
  color?: "default" | "muted" | "primary"
  /**
   * Font weight
   */
  weight?: "normal" | "medium" | "semibold" | "bold"
  /**
   * Separator between repeated text
   */
  separator?: string
}

const textSizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-2xl",
}

const textColorClasses = {
  default: "text-[var(--color-text)]",
  muted: "text-[var(--color-text-muted)]",
  primary: "text-[var(--color-primary)]",
}

const textWeightClasses = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
}

export function TextMarquee({
  text,
  size = "md",
  color = "default",
  weight = "normal",
  separator = "",
  ...props
}: TextMarqueeProps) {
  return (
    <Marquee {...props}>
      <span
        className={cn(
          "whitespace-nowrap",
          textSizeClasses[size],
          textColorClasses[color],
          textWeightClasses[weight]
        )}
      >
        {text}
        {separator && <span className="mx-4 text-[var(--color-text-muted)]">{separator}</span>}
      </span>
    </Marquee>
  )
}

// Logo marquee (for partner/client logos)
export interface LogoMarqueeProps extends Omit<MarqueeProps, "children"> {
  /**
   * Logo items
   */
  logos: Array<{
    src: string
    alt: string
    href?: string
  }>
  /**
   * Logo height
   */
  logoHeight?: number
  /**
   * Grayscale logos
   */
  grayscale?: boolean
  /**
   * Logo opacity
   */
  opacity?: number
}

export function LogoMarquee({
  logos,
  logoHeight = 32,
  grayscale = true,
  opacity = 0.6,
  gap = 48,
  ...props
}: LogoMarqueeProps) {
  return (
    <Marquee gap={gap} {...props}>
      {logos.map((logo, index) => {
        const img = (
          <img
            key={index}
            src={logo.src}
            alt={logo.alt}
            style={{ height: logoHeight }}
            className={cn(
              "w-auto object-contain",
              grayscale && "grayscale hover:grayscale-0",
              "hover:scale-110",
              "transition-all duration-500"
            )}
          />
        )

        if (logo.href) {
          return (
            <a
              key={index}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "shrink-0",
                "hover:opacity-100",
                "transition-all duration-500"
              )}
              style={{ opacity }}
            >
              {img}
            </a>
          )
        }

        return (
          <div
            key={index}
            className={cn(
              "shrink-0",
              "hover:opacity-100",
              "transition-all duration-500"
            )}
            style={{ opacity }}
          >
            {img}
          </div>
        )
      })}
    </Marquee>
  )
}

// Card marquee (for testimonials, features, etc.)
export interface CardMarqueeProps extends Omit<MarqueeProps, "children"> {
  /**
   * Card content
   */
  children: React.ReactNode[]
  /**
   * Card width
   */
  cardWidth?: number
}

export function CardMarquee({
  children,
  cardWidth = 320,
  gap = 24,
  ...props
}: CardMarqueeProps) {
  return (
    <Marquee gap={gap} {...props}>
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className={cn(
            "shrink-0",
            "hover:scale-[1.02]",
            "transition-transform duration-500"
          )}
          style={{
            width: cardWidth,
            transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
          }}
        >
          {child}
        </div>
      ))}
    </Marquee>
  )
}

// Announcement ticker (news ticker style)
export interface AnnouncementTickerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Announcements
   */
  announcements: Array<{
    text: string
    href?: string
    badge?: string
  }>
  /**
   * Speed
   */
  speed?: number
  /**
   * Background color
   */
  variant?: "default" | "primary" | "dark"
}

const tickerVariantClasses = {
  default: "bg-[var(--color-surface-muted)]",
  primary: "bg-[var(--color-primary)] text-white",
  dark: "bg-[var(--color-surface-inverse)] text-[var(--color-text-inverse)]",
}

export function AnnouncementTicker({
  announcements,
  speed = 40,
  variant = "default",
  className,
  ...props
}: AnnouncementTickerProps) {
  return (
    <div
      className={cn(
        "py-2.5 overflow-hidden",
        tickerVariantClasses[variant],
        className
      )}
      {...props}
    >
      <Marquee speed={speed} fade={false} gap={64}>
        {announcements.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 whitespace-nowrap"
          >
            {item.badge && (
              <span
                className={cn(
                  "px-2.5 py-1 text-xs font-semibold rounded-full",
                  "transition-all duration-300",
                  "hover:scale-105",
                  variant === "primary"
                    ? "bg-white/20 text-white"
                    : variant === "dark"
                    ? "bg-white/10 text-white"
                    : "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                )}
              >
                {item.badge}
              </span>
            )}
            {item.href ? (
              <a
                href={item.href}
                className={cn(
                  "text-sm font-medium",
                  "hover:underline underline-offset-2",
                  "transition-all duration-300",
                  variant === "default" && "text-[var(--color-text)]"
                )}
              >
                {item.text}
              </a>
            ) : (
              <span className="text-sm font-medium">{item.text}</span>
            )}
          </div>
        ))}
      </Marquee>
    </div>
  )
}

// Image strip marquee
export interface ImageStripMarqueeProps extends Omit<MarqueeProps, "children"> {
  /**
   * Image items
   */
  images: Array<{
    src: string
    alt: string
  }>
  /**
   * Image height
   */
  imageHeight?: number
  /**
   * Rounded corners
   */
  rounded?: boolean
}

export function ImageStripMarquee({
  images,
  imageHeight = 200,
  rounded = true,
  gap = 16,
  ...props
}: ImageStripMarqueeProps) {
  return (
    <Marquee gap={gap} {...props}>
      {images.map((image, index) => (
        <div
          key={index}
          className={cn(
            "shrink-0 overflow-hidden",
            "shadow-[0_4px_20px_rgb(0,0,0,0.08)]",
            "hover:shadow-[0_8px_30px_rgb(0,0,0,0.15)]",
            "hover:scale-105",
            "transition-all duration-500",
            rounded && "rounded-[var(--radius-lg)]"
          )}
          style={{
            height: imageHeight,
            transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
          }}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-auto object-cover"
          />
        </div>
      ))}
    </Marquee>
  )
}
