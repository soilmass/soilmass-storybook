/**
 * Timeline Component
 *
 * Display chronological events.
 * Features:
 * - Vertical layout with connecting line
 * - Custom icons per item
 * - Timestamps
 * - Alternating sides option
 * - Compact variant
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Default icon
const CircleIcon = () => (
  <div className="h-2.5 w-2.5 rounded-full bg-current" />
)

export interface TimelineItem {
  /**
   * Item title
   */
  title: string
  /**
   * Item description/content
   */
  description?: React.ReactNode
  /**
   * Timestamp or date
   */
  timestamp?: string
  /**
   * Custom icon
   */
  icon?: React.ReactNode
  /**
   * Icon color variant
   */
  variant?: "default" | "primary" | "success" | "warning" | "error"
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Timeline items
   */
  items: TimelineItem[]
  /**
   * Layout variant
   */
  variant?: "default" | "alternating" | "compact"
  /**
   * Show connecting line
   */
  showLine?: boolean
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
}

const variantColors = {
  default: "text-[var(--color-text-muted)] bg-[var(--color-surface-muted)] shadow-[var(--shadow-card)]",
  primary: "text-[var(--color-primary)] bg-[var(--color-primary)]/10 shadow-[0_0_8px_var(--color-primary)/30]",
  success: "text-[var(--color-success)] bg-[var(--color-success)]/10 shadow-[0_0_8px_var(--color-success)/30]",
  warning: "text-[var(--color-warning)] bg-[var(--color-warning)]/10 shadow-[0_0_8px_var(--color-warning)/30]",
  error: "text-[var(--color-error)] bg-[var(--color-error)]/10 shadow-[0_0_8px_var(--color-error)/30]",
}

const sizeClasses = {
  sm: {
    iconContainer: "h-6 w-6",
    title: "text-sm",
    description: "text-xs",
    timestamp: "text-[10px]",
    gap: "gap-3",
    padding: "pb-6",
  },
  md: {
    iconContainer: "h-8 w-8",
    title: "text-base",
    description: "text-sm",
    timestamp: "text-xs",
    gap: "gap-4",
    padding: "pb-8",
  },
  lg: {
    iconContainer: "h-10 w-10",
    title: "text-lg",
    description: "text-base",
    timestamp: "text-sm",
    gap: "gap-5",
    padding: "pb-10",
  },
}

export function Timeline({
  items,
  variant = "default",
  showLine = true,
  size = "md",
  className,
  ...props
}: TimelineProps) {
  const sizeClass = sizeClasses[size]

  // Compact variant
  if (variant === "compact") {
    return (
      <div className={cn("relative", className)} {...props}>
        {showLine && (
          <div
            className="absolute left-1 top-2 bottom-2 w-0.5 bg-gradient-to-b from-[var(--color-primary)]/50 via-[var(--color-border)] to-[var(--color-border)] shadow-[0_0_4px_var(--color-primary)/20]"
            aria-hidden="true"
          />
        )}
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li
              key={index}
              className="relative flex items-start gap-3 pl-5 animate-[fadeIn_0.3s_ease-[var(--ease-spring)]_both]"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Dot */}
              <div
                className={cn(
                  "absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full",
                  "ring-2 ring-[var(--color-surface)]",
                  "transition-all duration-300 ease-[var(--ease-spring)]",
                  item.variant === "primary" && "bg-[var(--color-primary)] shadow-[0_0_6px_var(--color-primary)]",
                  item.variant === "success" && "bg-[var(--color-success)] shadow-[0_0_6px_var(--color-success)]",
                  item.variant === "warning" && "bg-[var(--color-warning)] shadow-[0_0_6px_var(--color-warning)]",
                  item.variant === "error" && "bg-[var(--color-error)] shadow-[0_0_6px_var(--color-error)]",
                  (!item.variant || item.variant === "default") &&
                    "bg-[var(--color-text-muted)]"
                )}
              />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[var(--color-text)]">
                    {item.title}
                  </span>
                  {item.timestamp && (
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {item.timestamp}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">
                    {item.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // Alternating variant
  if (variant === "alternating") {
    return (
      <div className={cn("relative", className)} {...props}>
        {showLine && (
          <div
            className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[var(--color-primary)]/50 via-[var(--color-border)] to-[var(--color-border)] shadow-[0_0_4px_var(--color-primary)/20]"
            aria-hidden="true"
          />
        )}
        <ul className="space-y-0">
          {items.map((item, index) => {
            const isLeft = index % 2 === 0
            const itemVariant = item.variant || "default"

            return (
              <li
                key={index}
                className={cn(
                  "relative flex items-start",
                  sizeClass.padding,
                  isLeft ? "flex-row" : "flex-row-reverse",
                  "animate-[fadeIn_0.3s_ease-[var(--ease-spring)]_both]"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Content side */}
                <div
                  className={cn(
                    "w-[calc(50%-1.5rem)] flex-shrink-0",
                    isLeft ? "text-right pr-6" : "text-left pl-6"
                  )}
                >
                  {item.timestamp && (
                    <p
                      className={cn(
                        "text-[var(--color-text-muted)]",
                        sizeClass.timestamp
                      )}
                    >
                      {item.timestamp}
                    </p>
                  )}
                  <h3
                    className={cn(
                      "font-medium text-[var(--color-text)]",
                      sizeClass.title
                    )}
                  >
                    {item.title}
                  </h3>
                  {item.description && (
                    <p
                      className={cn(
                        "mt-1 text-[var(--color-text-muted)]",
                        sizeClass.description
                      )}
                    >
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Icon */}
                <div
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2",
                    "flex items-center justify-center rounded-full",
                    "ring-4 ring-[var(--color-surface)]",
                    sizeClass.iconContainer,
                    variantColors[itemVariant]
                  )}
                >
                  {item.icon || <CircleIcon />}
                </div>

                {/* Empty side for spacing */}
                <div className="w-[calc(50%-1.5rem)] flex-shrink-0" />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  // Default variant
  return (
    <div className={cn("relative", className)} {...props}>
      {showLine && (
        <div
          className={cn(
            "absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-primary)]/50 via-[var(--color-border)] to-[var(--color-border)] shadow-[0_0_4px_var(--color-primary)/20]",
            size === "sm" && "left-3",
            size === "md" && "left-4",
            size === "lg" && "left-5"
          )}
          aria-hidden="true"
        />
      )}
      <ul className="space-y-0">
        {items.map((item, index) => {
          const itemVariant = item.variant || "default"
          const isLast = index === items.length - 1

          return (
            <li
              key={index}
              className={cn(
                "relative flex",
                sizeClass.gap,
                !isLast && sizeClass.padding,
                "animate-[fadeIn_0.3s_ease-[var(--ease-spring)]_both]"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div
                className={cn(
                  "relative z-10 flex-shrink-0",
                  "flex items-center justify-center rounded-full",
                  "ring-4 ring-[var(--color-surface)]",
                  "transition-all duration-300 ease-[var(--ease-spring)]",
                  "hover:scale-110",
                  sizeClass.iconContainer,
                  variantColors[itemVariant]
                )}
              >
                {item.icon || <CircleIcon />}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3
                    className={cn(
                      "font-medium text-[var(--color-text)]",
                      sizeClass.title
                    )}
                  >
                    {item.title}
                  </h3>
                  {item.timestamp && (
                    <span
                      className={cn(
                        "text-[var(--color-text-muted)]",
                        sizeClass.timestamp
                      )}
                    >
                      {item.timestamp}
                    </span>
                  )}
                </div>
                {item.description && (
                  <div
                    className={cn(
                      "mt-1 text-[var(--color-text-muted)]",
                      sizeClass.description
                    )}
                  >
                    {item.description}
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// Simple timeline with just titles
export interface SimpleTimelineProps
  extends Omit<TimelineProps, "items"> {
  /**
   * Event titles in order
   */
  events: string[]
  /**
   * Timestamps for each event
   */
  timestamps?: string[]
}

export function SimpleTimeline({
  events,
  timestamps = [],
  ...props
}: SimpleTimelineProps) {
  const items: TimelineItem[] = events.map((title, index) => ({
    title,
    timestamp: timestamps[index],
  }))

  return <Timeline items={items} {...props} />
}
