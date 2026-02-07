/**
 * Logo Cloud Component
 *
 * Display partner/client logos.
 * Features:
 * - Grid and flex layouts
 * - Grayscale with hover effect (color transition)
 * - Responsive wrapping
 * - With/without links
 * - Smooth marquee animation
 * - Spring transitions
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export interface LogoItem {
  /**
   * Company name (for alt text)
   */
  name: string
  /**
   * Logo image URL
   */
  src: string
  /**
   * Optional link
   */
  href?: string
  /**
   * Optional width (for sizing)
   */
  width?: number
}

export interface LogoCloudProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Logo items
   */
  logos: LogoItem[]
  /**
   * Heading text
   */
  heading?: string
  /**
   * Layout variant
   */
  variant?: "grid" | "flex" | "marquee"
  /**
   * Number of columns (for grid)
   */
  columns?: 3 | 4 | 5 | 6
  /**
   * Apply grayscale filter
   */
  grayscale?: boolean
  /**
   * Max logo height
   */
  logoHeight?: "sm" | "md" | "lg"
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
}

const logoHeightClasses = {
  sm: "max-h-6",
  md: "max-h-8",
  lg: "max-h-10",
}

const columnClasses = {
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
}

const sizeClasses = {
  sm: {
    heading: "text-sm",
    gap: "gap-6",
    padding: "py-6",
  },
  md: {
    heading: "text-base",
    gap: "gap-8",
    padding: "py-10",
  },
  lg: {
    heading: "text-lg",
    gap: "gap-10",
    padding: "py-16",
  },
}

export function LogoCloud({
  logos,
  heading,
  variant = "flex",
  columns = 5,
  grayscale = true,
  logoHeight = "md",
  size = "md",
  className,
  ...props
}: LogoCloudProps) {
  const sizeClass = sizeClasses[size]
  const heightClass = logoHeightClasses[logoHeight]

  const LogoImage = ({ logo, index }: { logo: LogoItem; index: number }) => (
    <img
      src={logo.src}
      alt={logo.name}
      style={logo.width ? { width: logo.width } : undefined}
      className={cn(
        "w-auto object-contain",
        heightClass,
        // Spring transition with stagger delay
        "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        grayscale && [
          "opacity-50 grayscale",
          "hover:opacity-100 hover:grayscale-0",
          "hover:scale-110",
        ]
      )}
    />
  )

  const renderLogo = (logo: LogoItem, index: number) => {
    const content = <LogoImage logo={logo} index={index} />

    if (logo.href) {
      return (
        <a
          key={index}
          href={logo.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center justify-center",
            "group transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            "hover:scale-105"
          )}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {content}
        </a>
      )
    }

    return (
      <div
        key={index}
        className={cn(
          "flex items-center justify-center",
          "transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        )}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        {content}
      </div>
    )
  }

  // Marquee animation variant with smooth infinite scroll
  if (variant === "marquee") {
    return (
      <div className={cn(sizeClass.padding, className)} {...props}>
        {heading && (
          <p
            className={cn(
              "text-center text-[var(--color-text-muted)] mb-8",
              sizeClass.heading
            )}
          >
            {heading}
          </p>
        )}
        <div className="relative overflow-hidden">
          {/* Gradient fade edges for premium look */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--color-background)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--color-background)] to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee hover:[animation-play-state:paused]">
            {/* Double the logos for seamless loop */}
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className={cn(
                  "flex-shrink-0 px-8",
                  "flex items-center justify-center",
                  "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                )}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className={cn(
                    "w-auto object-contain",
                    heightClass,
                    "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                    grayscale && [
                      "opacity-50 grayscale",
                      "hover:opacity-100 hover:grayscale-0",
                      "hover:scale-110",
                    ]
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Grid variant with stagger animation
  if (variant === "grid") {
    return (
      <div className={cn(sizeClass.padding, className)} {...props}>
        {heading && (
          <p
            className={cn(
              "text-center text-[var(--color-text-muted)] mb-8",
              sizeClass.heading
            )}
          >
            {heading}
          </p>
        )}
        <div
          className={cn(
            "grid items-center justify-items-center",
            columnClasses[columns],
            sizeClass.gap
          )}
        >
          {logos.map((logo, index) => renderLogo(logo, index))}
        </div>
      </div>
    )
  }

  // Flex variant (default) with stagger animation
  return (
    <div className={cn(sizeClass.padding, className)} {...props}>
      {heading && (
        <p
          className={cn(
            "text-center text-[var(--color-text-muted)] mb-8",
            sizeClass.heading
          )}
        >
          {heading}
        </p>
      )}
      <div
        className={cn(
          "flex flex-wrap items-center justify-center",
          sizeClass.gap
        )}
      >
        {logos.map((logo, index) => renderLogo(logo, index))}
      </div>
    </div>
  )
}

// Simple logo row (inline, no heading)
export interface LogoRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Logo items
   */
  logos: LogoItem[]
  /**
   * Apply grayscale
   */
  grayscale?: boolean
  /**
   * Logo size
   */
  size?: "sm" | "md" | "lg"
}

export function LogoRow({
  logos,
  grayscale = true,
  size = "md",
  className,
  ...props
}: LogoRowProps) {
  const heightClass = logoHeightClasses[size]

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-6",
        className
      )}
      {...props}
    >
      {logos.map((logo, index) => (
        <img
          key={index}
          src={logo.src}
          alt={logo.name}
          className={cn(
            "w-auto object-contain",
            heightClass,
            "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            grayscale && [
              "opacity-50 grayscale",
              "hover:opacity-100 hover:grayscale-0",
              "hover:scale-110",
            ]
          )}
        />
      ))}
    </div>
  )
}

// Logo strip with "Trusted by" text
export interface TrustedByProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Logo items
   */
  logos: LogoItem[]
  /**
   * Heading text
   */
  heading?: string
  /**
   * Layout direction
   */
  direction?: "horizontal" | "vertical"
}

export function TrustedBy({
  logos,
  heading = "Trusted by leading companies",
  direction = "horizontal",
  className,
  ...props
}: TrustedByProps) {
  return (
    <div
      className={cn(
        "flex items-center",
        direction === "horizontal"
          ? "flex-col sm:flex-row gap-6"
          : "flex-col gap-4",
        className
      )}
      {...props}
    >
      <p className="text-sm text-[var(--color-text-muted)] whitespace-nowrap">
        {heading}
      </p>
      <div className="flex flex-wrap items-center gap-6">
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo.src}
            alt={logo.name}
            className={cn(
              "h-6 w-auto object-contain",
              "opacity-50 grayscale",
              "hover:opacity-100 hover:grayscale-0 hover:scale-110",
              "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            )}
          />
        ))}
      </div>
    </div>
  )
}
