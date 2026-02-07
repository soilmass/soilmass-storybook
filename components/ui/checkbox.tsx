"use client"

/**
 * Checkbox Component
 * Domain 54: Checkboxes
 *
 * Checkbox input with checked, unchecked, and indeterminate states.
 * Uses native checkbox with custom styling.
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Check icon SVG
const CheckIcon = () => (
  <svg
    className="h-3 w-3 text-white"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z" />
  </svg>
)

// Minus icon for indeterminate state
const MinusIcon = () => (
  <svg
    className="h-3 w-3 text-white"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <rect x="3" y="7" width="10" height="2" rx="1" />
  </svg>
)

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /**
   * Label text for the checkbox (CHK1: must have associated label)
   */
  label?: string
  /**
   * Description text below the label
   */
  description?: string
  /**
   * Indeterminate state (CHK4: set via JavaScript)
   */
  indeterminate?: boolean
  /**
   * Error state
   */
  error?: boolean
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      indeterminate = false,
      error = false,
      size = "md",
      className,
      id,
      disabled,
      checked,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const generatedId = React.useId()
    const inputId = id || generatedId
    const descriptionId = description ? `${inputId}-description` : undefined

    // Combine refs
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    // Set indeterminate property (CHK4)
    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate
      }
    }, [indeterminate])

    // Size classes
    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-[18px] w-[18px]",
      lg: "h-5 w-5",
    }

    const labelSizeClasses = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-base",
    }

    return (
      <div className={cn("flex items-start gap-2", className)}>
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            ref={inputRef}
            id={inputId}
            disabled={disabled}
            checked={checked}
            aria-describedby={descriptionId}
            aria-invalid={error ? "true" : undefined}
            className={cn(
              // Base styles
              "peer appearance-none cursor-pointer",
              sizeClasses[size],
              // Border and background
              "rounded-[var(--radius-sm)] border-2",
              "border-[var(--color-border)] bg-transparent",
              // Premium transitions with spring animation
              "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
              // Hover
              "hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-sm)]",
              // Focus
              "focus-visible:outline-none focus-visible:ring-[3px]",
              "focus-visible:ring-[var(--color-focus-ring)] focus-visible:shadow-[var(--shadow-primary-sm)]",
              // Checked with colored shadow
              "checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)]",
              "checked:shadow-[var(--shadow-primary-sm)]",
              "checked:hover:bg-[var(--color-primary-hover)] checked:hover:border-[var(--color-primary-hover)]",
              "checked:hover:shadow-[var(--shadow-primary-md)]",
              // Disabled
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
              // Error
              error && "border-[var(--color-error)] shadow-[var(--shadow-error-sm)] ring-1 ring-[var(--color-error)]/20"
            )}
            {...props}
          />
          {/* Custom check/minus icon overlay */}
          <span
            className={cn(
              "pointer-events-none absolute inset-0",
              "flex items-center justify-center",
              "opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100",
              // Spring scale animation on check
              "scale-0 peer-checked:scale-100 peer-indeterminate:scale-100",
              "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]"
            )}
          >
            {indeterminate ? <MinusIcon /> : <CheckIcon />}
          </span>
        </div>

        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={inputId}
                className={cn(
                  labelSizeClasses[size],
                  "text-[var(--color-text)] select-none cursor-pointer",
                  "leading-tight",
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
        )}
      </div>
    )
  }
)

Checkbox.displayName = "Checkbox"

// Checkbox Group Component
export interface CheckboxGroupProps
  extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /**
   * Group label (legend)
   */
  label: string
  /**
   * Description for the group
   */
  description?: string
  /**
   * Error message
   */
  error?: string
  /**
   * Orientation
   */
  orientation?: "vertical" | "horizontal"
}

export function CheckboxGroup({
  label,
  description,
  error,
  orientation = "vertical",
  children,
  className,
  ...props
}: CheckboxGroupProps) {
  return (
    <fieldset
      className={cn("border-0 m-0 p-0", className)}
      aria-invalid={error ? "true" : undefined}
      {...props}
    >
      <legend className="text-sm font-medium text-[var(--color-text)] mb-2">
        {label}
      </legend>
      {description && (
        <p className="text-sm text-[var(--color-text-muted)] mb-3">
          {description}
        </p>
      )}
      <div
        className={cn(
          "flex gap-3",
          orientation === "vertical" ? "flex-col" : "flex-row flex-wrap"
        )}
      >
        {children}
      </div>
      {error && (
        <p className="text-sm text-[var(--color-error)] mt-2" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  )
}

// Checkbox Card variant
export interface CheckboxCardProps extends CheckboxProps {
  /**
   * Card title
   */
  title: string
  /**
   * Card description
   */
  cardDescription?: string
  /**
   * Icon to display
   */
  icon?: React.ReactNode
}

export const CheckboxCard = React.forwardRef<HTMLInputElement, CheckboxCardProps>(
  ({ title, cardDescription, icon, className, checked, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const generatedId = React.useId()

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    return (
      <label
        htmlFor={props.id || generatedId}
        className={cn(
          "relative flex cursor-pointer rounded-[var(--radius-md)]",
          "border-2 border-[var(--color-border)] p-4",
          // Premium transitions
          "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
          // Rest shadow
          "shadow-[var(--shadow-xs)]",
          // Hover
          "hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-sm)]",
          // Checked with colored shadow
          "has-[:checked]:border-[var(--color-primary)] has-[:checked]:bg-[var(--color-primary)]/5",
          "has-[:checked]:shadow-[var(--shadow-primary-sm)]",
          // Focus
          "has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-[var(--color-focus-ring)]",
          "has-[:focus-visible]:shadow-[var(--shadow-primary-sm)]",
          // Disabled
          "has-[:disabled]:opacity-50 has-[:disabled]:cursor-not-allowed has-[:disabled]:shadow-none",
          className
        )}
      >
        <input
          type="checkbox"
          ref={inputRef}
          id={props.id || generatedId}
          checked={checked}
          className="sr-only"
          {...props}
        />
        <div className="flex items-start gap-3 flex-1">
          {icon && (
            <div className="flex-shrink-0 text-[var(--color-text-muted)]">
              {icon}
            </div>
          )}
          <div className="flex-1">
            <span className="text-sm font-medium text-[var(--color-text)]">
              {title}
            </span>
            {cardDescription && (
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                {cardDescription}
              </p>
            )}
          </div>
          <div
            className={cn(
              "flex-shrink-0 h-5 w-5 rounded-[var(--radius-sm)]",
              "border-2 border-[var(--color-border)] flex items-center justify-center",
              // Premium transitions
              "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
              checked && "bg-[var(--color-primary)] border-[var(--color-primary)] shadow-[var(--shadow-primary-sm)]"
            )}
          >
            {checked && <CheckIcon />}
          </div>
        </div>
      </label>
    )
  }
)

CheckboxCard.displayName = "CheckboxCard"
