/**
 * Bento Grid Component
 *
 * Flexible bento box grid layouts.
 * Features:
 * - Variable cell sizes
 * - Responsive layouts
 * - Stagger animation on scroll
 * - Card shadows with hover lift
 * - Glassmorphism support
 * - Gradient accents
 * - Spring transitions
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns
   */
  columns?: 2 | 3 | 4
  /**
   * Gap between items
   */
  gap?: "sm" | "md" | "lg"
  /**
   * Children (BentoItem components)
   */
  children: React.ReactNode
}

const columnClasses = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
}

const gapClasses = {
  sm: "gap-3",
  md: "gap-4 md:gap-6",
  lg: "gap-6 md:gap-8",
}

export function BentoGrid({
  columns = 3,
  gap = "md",
  className,
  children,
  ...props
}: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1",
        columnClasses[columns],
        gapClasses[gap],
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{ style?: React.CSSProperties }>, {
            style: {
              ...child.props.style,
              animationDelay: `${index * 100}ms`,
            },
          })
        }
        return child
      })}
    </div>
  )
}

export interface BentoItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Column span
   */
  colSpan?: 1 | 2 | 3 | 4
  /**
   * Row span
   */
  rowSpan?: 1 | 2 | 3
  /**
   * Background variant
   */
  variant?: "default" | "muted" | "glass" | "gradient" | "primary" | "dark"
  /**
   * Background image
   */
  backgroundImage?: string
  /**
   * Icon
   */
  icon?: React.ReactNode
  /**
   * Title
   */
  title?: string
  /**
   * Description
   */
  description?: string
  /**
   * Header content
   */
  header?: React.ReactNode
  /**
   * Featured/highlighted item
   */
  featured?: boolean
}

const colSpanClasses = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
}

const rowSpanClasses = {
  1: "md:row-span-1",
  2: "md:row-span-2",
  3: "md:row-span-3",
}

const variantClasses = {
  default: "bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm",
  muted: "bg-[var(--color-surface-muted)] border border-[var(--color-border)] shadow-sm",
  glass: "bg-white/10 backdrop-blur-md border border-white/20 shadow-lg",
  gradient: "bg-gradient-to-br from-[var(--color-primary)]/10 via-transparent to-[var(--color-secondary)]/10 border border-[var(--color-primary)]/20 shadow-sm",
  primary: "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] text-white shadow-lg shadow-[var(--color-primary)]/25",
  dark: "bg-[var(--color-surface-inverse)] text-[var(--color-text-inverse)] shadow-lg",
}

export function BentoItem({
  colSpan = 1,
  rowSpan = 1,
  variant = "default",
  backgroundImage,
  icon,
  title,
  description,
  header,
  featured = false,
  className,
  children,
  style,
  ...props
}: BentoItemProps) {
  const isDark = variant === "primary" || variant === "dark"

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "rounded-[var(--radius-xl)]",
        "p-6 md:p-8",
        // Premium shadow and hover effects
        "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        "hover:-translate-y-2",
        "hover:shadow-xl",
        // Stagger animation support
        "animate-in fade-in slide-in-from-bottom-4",
        featured && "ring-2 ring-[var(--color-primary)] ring-offset-2 ring-offset-[var(--color-background)]",
        colSpanClasses[colSpan],
        rowSpanClasses[rowSpan],
        variantClasses[variant],
        backgroundImage && "bg-cover bg-center",
        className
      )}
      style={{
        ...style,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
      }}
      {...props}
    >
      {/* Background overlay for image */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      )}

      {/* Gradient accent line */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-1",
        "bg-gradient-to-r from-transparent via-[var(--color-primary)]/50 to-transparent",
        "opacity-0 transition-opacity duration-500",
        "group-hover:opacity-100"
      )} />

      {/* Content */}
      <div className={cn("relative z-10", rowSpan > 1 && "h-full flex flex-col")}>
        {/* Header/custom content area */}
        {header && (
          <div className="mb-4">{header}</div>
        )}

        {/* Icon with gradient background */}
        {icon && (
          <div
            className={cn(
              "mb-4 inline-flex items-center justify-center",
              "h-12 w-12 rounded-[var(--radius-lg)]",
              "transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              "group-hover:scale-110",
              isDark || backgroundImage
                ? "bg-white/10"
                : "bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/5 text-[var(--color-primary)]"
            )}
          >
            {icon}
          </div>
        )}

        {/* Title */}
        {title && (
          <h3
            className={cn(
              "text-lg md:text-xl font-semibold",
              isDark || backgroundImage ? "text-white" : "text-[var(--color-text)]"
            )}
          >
            {title}
          </h3>
        )}

        {/* Description */}
        {description && (
          <p
            className={cn(
              "mt-2 text-sm leading-relaxed",
              isDark || backgroundImage ? "text-white/80" : "text-[var(--color-text-muted)]",
              rowSpan > 1 && "flex-1"
            )}
          >
            {description}
          </p>
        )}

        {/* Children */}
        {children}
      </div>
    </div>
  )
}

// Feature bento (common pattern for feature showcases)
export interface FeatureBentoProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Features
   */
  features: Array<{
    icon: React.ReactNode
    title: string
    description: string
    colSpan?: 1 | 2
    rowSpan?: 1 | 2
    variant?: BentoItemProps["variant"]
    backgroundImage?: string
  }>
  /**
   * Grid columns
   */
  columns?: 2 | 3 | 4
}

export function FeatureBento({
  features,
  columns = 3,
  className,
  ...props
}: FeatureBentoProps) {
  return (
    <BentoGrid columns={columns} className={className} {...props}>
      {features.map((feature, index) => (
        <BentoItem
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          colSpan={feature.colSpan}
          rowSpan={feature.rowSpan}
          variant={feature.variant}
          backgroundImage={feature.backgroundImage}
          className="group"
        />
      ))}
    </BentoGrid>
  )
}

// Bento card with image
export interface BentoImageCardProps extends Omit<BentoItemProps, "backgroundImage"> {
  /**
   * Image URL
   */
  image: string
  /**
   * Image alt text
   */
  imageAlt?: string
  /**
   * Image position
   */
  imagePosition?: "top" | "bottom" | "background"
}

export function BentoImageCard({
  image,
  imageAlt = "",
  imagePosition = "top",
  icon,
  title,
  description,
  className,
  children,
  ...props
}: BentoImageCardProps) {
  if (imagePosition === "background") {
    return (
      <BentoItem
        backgroundImage={image}
        icon={icon}
        title={title}
        description={description}
        className={cn("group", className)}
        {...props}
      >
        {children}
      </BentoItem>
    )
  }

  return (
    <BentoItem
      className={cn("p-0 overflow-hidden group", className)}
      {...props}
    >
      {imagePosition === "top" && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={image}
            alt={imageAlt}
            className={cn(
              "w-full h-full object-cover",
              "transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              "group-hover:scale-110"
            )}
          />
        </div>
      )}
      <div className="p-6">
        {icon && (
          <div className={cn(
            "mb-4 inline-flex items-center justify-center h-12 w-12 rounded-[var(--radius-lg)]",
            "bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/5 text-[var(--color-primary)]",
            "transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            "group-hover:scale-110"
          )}>
            {icon}
          </div>
        )}
        {title && (
          <h3 className="text-lg font-semibold text-[var(--color-text)]">
            {title}
          </h3>
        )}
        {description && (
          <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
            {description}
          </p>
        )}
        {children}
      </div>
      {imagePosition === "bottom" && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={image}
            alt={imageAlt}
            className={cn(
              "w-full h-full object-cover",
              "transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              "group-hover:scale-110"
            )}
          />
        </div>
      )}
    </BentoItem>
  )
}

// Bento stats card
export interface BentoStatsCardProps extends BentoItemProps {
  /**
   * Stats to display
   */
  stats: Array<{
    value: string | number
    label: string
  }>
  /**
   * Layout
   */
  layout?: "horizontal" | "vertical" | "grid"
}

export function BentoStatsCard({
  stats,
  layout = "grid",
  title,
  className,
  ...props
}: BentoStatsCardProps) {
  return (
    <BentoItem
      title={title}
      className={cn("group", className)}
      {...props}
    >
      <div
        className={cn(
          "mt-4",
          layout === "horizontal" && "flex items-center justify-between gap-4",
          layout === "vertical" && "space-y-4",
          layout === "grid" && "grid grid-cols-2 gap-4"
        )}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className={cn(
              layout === "horizontal" ? "text-center" : "",
              "transition-transform duration-300",
              "group-hover:scale-105"
            )}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <div className={cn(
              "text-2xl md:text-3xl font-bold",
              "bg-gradient-to-r from-[var(--color-text)] to-[var(--color-text-muted)] bg-clip-text"
            )}>
              {stat.value}
            </div>
            <div className="text-sm text-[var(--color-text-muted)]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </BentoItem>
  )
}

// Animated bento item (with premium hover effects)
export interface AnimatedBentoItemProps extends BentoItemProps {
  /**
   * Hover effect
   */
  hoverEffect?: "lift" | "scale" | "glow" | "border"
}

export function AnimatedBentoItem({
  hoverEffect = "lift",
  className,
  ...props
}: AnimatedBentoItemProps) {
  const hoverClasses = {
    lift: "hover:-translate-y-3 hover:shadow-2xl",
    scale: "hover:scale-[1.03]",
    glow: "hover:shadow-[0_0_40px_rgba(var(--color-primary-rgb),0.3)]",
    border: "hover:border-[var(--color-primary)] hover:ring-4 hover:ring-[var(--color-primary)]/10",
  }

  return (
    <BentoItem
      className={cn(
        "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        hoverClasses[hoverEffect],
        "group",
        className
      )}
      {...props}
    />
  )
}

// Bento grid preset layouts
export interface BentoLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Layout preset
   */
  layout: "hero-left" | "hero-right" | "featured-top" | "balanced"
  /**
   * Items (requires specific number based on layout)
   */
  items: Array<{
    icon?: React.ReactNode
    title: string
    description: string
    variant?: BentoItemProps["variant"]
    backgroundImage?: string
  }>
}

export function BentoLayout({
  layout,
  items,
  className,
  ...props
}: BentoLayoutProps) {
  // Define layout configurations
  const layouts: Record<string, Array<{ colSpan: 1 | 2; rowSpan: 1 | 2 }>> = {
    "hero-left": [
      { colSpan: 2, rowSpan: 2 },
      { colSpan: 1, rowSpan: 1 },
      { colSpan: 1, rowSpan: 1 },
      { colSpan: 1, rowSpan: 1 },
      { colSpan: 1, rowSpan: 1 },
    ],
    "hero-right": [
      { colSpan: 1, rowSpan: 1 },
      { colSpan: 1, rowSpan: 1 },
      { colSpan: 2, rowSpan: 2 },
      { colSpan: 1, rowSpan: 1 },
      { colSpan: 1, rowSpan: 1 },
    ],
    "featured-top": [
      { colSpan: 2, rowSpan: 1 },
      { colSpan: 1, rowSpan: 1 },
      { colSpan: 1, rowSpan: 1 },
      { colSpan: 1, rowSpan: 1 },
      { colSpan: 1, rowSpan: 1 },
    ],
    balanced: [
      { colSpan: 1, rowSpan: 1 },
      { colSpan: 2, rowSpan: 1 },
      { colSpan: 2, rowSpan: 1 },
      { colSpan: 1, rowSpan: 1 },
    ],
  }

  const config = layouts[layout] || layouts.balanced

  return (
    <BentoGrid columns={3} className={className} {...props}>
      {items.slice(0, config.length).map((item, index) => (
        <BentoItem
          key={index}
          colSpan={config[index].colSpan}
          rowSpan={config[index].rowSpan}
          icon={item.icon}
          title={item.title}
          description={item.description}
          variant={item.variant}
          backgroundImage={item.backgroundImage}
          featured={index === 0 && (layout === "hero-left" || layout === "hero-right")}
          className="group"
        />
      ))}
    </BentoGrid>
  )
}
