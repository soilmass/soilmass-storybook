"use client"

/**
 * Toggle/Switch Component
 *
 * Boolean toggle switch for settings and preferences.
 * Features:
 * - Accessible switch role
 * - Size variants
 * - Label positioning
 * - Keyboard support
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  /**
   * Checked state
   */
  checked?: boolean
  /**
   * Default checked state
   */
  defaultChecked?: boolean
  /**
   * Callback when state changes
   */
  onCheckedChange?: (checked: boolean) => void
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
  /**
   * Label text
   */
  label?: string
  /**
   * Description text
   */
  description?: string
  /**
   * Label position
   */
  labelPosition?: "left" | "right"
}

const sizes = {
  sm: {
    track: "h-5 w-9",
    thumb: "h-4 w-4",
    translate: "translate-x-4",
  },
  md: {
    track: "h-6 w-11",
    thumb: "h-5 w-5",
    translate: "translate-x-5",
  },
  lg: {
    track: "h-7 w-14",
    thumb: "h-6 w-6",
    translate: "translate-x-7",
  },
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      checked,
      defaultChecked = false,
      onCheckedChange,
      size = "md",
      label,
      description,
      labelPosition = "right",
      disabled,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked)
    const isChecked = checked !== undefined ? checked : internalChecked

    const generatedId = React.useId()
    const toggleId = id || generatedId
    const descriptionId = description ? `${toggleId}-description` : undefined

    const handleClick = () => {
      if (disabled) return

      const newValue = !isChecked
      if (checked === undefined) {
        setInternalChecked(newValue)
      }
      onCheckedChange?.(newValue)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault()
        handleClick()
      }
    }

    const sizeConfig = sizes[size]

    const toggle = (
      <button
        ref={ref}
        type="button"
        role="switch"
        id={toggleId}
        aria-checked={isChecked}
        aria-describedby={descriptionId}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          // Track
          "relative inline-flex flex-shrink-0 cursor-pointer",
          "rounded-full border-2 border-transparent",
          // Premium spring transition
          "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
          // Focus states
          "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-focus-ring)]",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]",
          sizeConfig.track,
          // States with colored shadows
          isChecked
            ? "bg-[var(--color-primary)] shadow-[0_2px_8px_rgba(var(--color-primary-rgb),0.4)]"
            : "bg-[var(--color-surface-active)] shadow-[var(--shadow-xs)]",
          // Micro-interaction
          "active:scale-[0.98]",
          // Disabled
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        <span className="sr-only">{label || "Toggle"}</span>
        {/* Thumb */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none inline-block rounded-full",
            "bg-white ring-0",
            // Premium thumb shadow
            "shadow-[var(--shadow-sm)]",
            // Spring transform
            "transform transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
            sizeConfig.thumb,
            isChecked ? sizeConfig.translate : "translate-x-0"
          )}
        />
      </button>
    )

    if (!label && !description) {
      return toggle
    }

    return (
      <div
        className={cn(
          "flex items-start gap-3",
          labelPosition === "left" && "flex-row-reverse justify-end"
        )}
      >
        {toggle}
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={toggleId}
              className={cn(
                "text-sm font-medium text-[var(--color-text)] cursor-pointer",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <span
              id={descriptionId}
              className="text-sm text-[var(--color-text-muted)] mt-0.5"
            >
              {description}
            </span>
          )}
        </div>
      </div>
    )
  }
)

Toggle.displayName = "Toggle"

// Toggle Group for multiple related toggles
export interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Group label
   */
  label?: string
  /**
   * Description
   */
  description?: string
}

export function ToggleGroup({
  label,
  description,
  children,
  className,
  ...props
}: ToggleGroupProps) {
  return (
    <div className={cn("space-y-4", className)} role="group" {...props}>
      {(label || description) && (
        <div>
          {label && (
            <h3 className="text-sm font-medium text-[var(--color-text)]">
              {label}
            </h3>
          )}
          {description && (
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="space-y-3">{children}</div>
    </div>
  )
}
