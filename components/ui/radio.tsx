"use client"

/**
 * Radio Button Component
 * Domain 55: Radio Buttons
 *
 * Radio button components for single selection from a group.
 * Features:
 * - Proper fieldset/legend grouping (RAD1)
 * - Shared name attribute in groups (RAD2)
 * - Default selection support (RAD3)
 * - Keyboard navigation
 * - Card variant for prominent choices
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Radio Group Context
interface RadioGroupContextValue {
  name: string
  value: string | undefined
  onChange: (value: string) => void
  disabled?: boolean
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null)

function useRadioGroup() {
  return React.useContext(RadioGroupContext)
}

// Radio Group Component
export interface RadioGroupProps
  extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, "onChange"> {
  /**
   * Group name (RAD2: shared name attribute)
   */
  name: string
  /**
   * Group label (legend)
   */
  label: string
  /**
   * Selected value
   */
  value?: string
  /**
   * Default value (RAD3)
   */
  defaultValue?: string
  /**
   * Callback when selection changes
   */
  onChange?: (value: string) => void
  /**
   * Description text
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
  /**
   * Disable all radios in group
   */
  disabled?: boolean
}

export function RadioGroup({
  name,
  label,
  value,
  defaultValue,
  onChange,
  description,
  error,
  orientation = "vertical",
  disabled,
  className,
  children,
  ...props
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const currentValue = value !== undefined ? value : internalValue

  const handleChange = React.useCallback(
    (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)
    },
    [value, onChange]
  )

  return (
    <RadioGroupContext.Provider
      value={{ name, value: currentValue, onChange: handleChange, disabled }}
    >
      {/* RAD1: fieldset with legend for grouping */}
      <fieldset
        className={cn("border-0 m-0 p-0", className)}
        role="radiogroup"
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
            orientation === "vertical" ? "flex-col" : "flex-row flex-wrap gap-4"
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
    </RadioGroupContext.Provider>
  )
}

// Individual Radio Button
export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  /**
   * Radio value
   */
  value: string
  /**
   * Label text
   */
  label?: string
  /**
   * Description text
   */
  description?: string
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    { value, label, description, size = "md", className, disabled, id, ...props },
    ref
  ) => {
    const group = useRadioGroup()
    const generatedId = React.useId()
    const inputId = id || generatedId
    const descriptionId = description ? `${inputId}-description` : undefined

    const isDisabled = disabled || group?.disabled
    const isChecked = group ? group.value === value : props.checked

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
            type="radio"
            ref={ref}
            id={inputId}
            name={group?.name}
            value={value}
            checked={isChecked}
            disabled={isDisabled}
            onChange={() => group?.onChange(value)}
            aria-describedby={descriptionId}
            className={cn(
              "peer appearance-none cursor-pointer",
              sizeClasses[size],
              "rounded-full border-2",
              "border-[var(--color-border)] bg-transparent",
              // Premium transitions with spring animation
              "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
              // Hover
              "hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-sm)]",
              // Focus
              "focus-visible:outline-none focus-visible:ring-[3px]",
              "focus-visible:ring-[var(--color-focus-ring)] focus-visible:shadow-[var(--shadow-primary-sm)]",
              // Checked with colored shadow
              "checked:border-[var(--color-primary)] checked:bg-[var(--color-primary)]",
              "checked:shadow-[var(--shadow-primary-sm)]",
              "checked:hover:border-[var(--color-primary-hover)] checked:hover:bg-[var(--color-primary-hover)]",
              "checked:hover:shadow-[var(--shadow-primary-md)]",
              // Disabled
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            )}
            {...props}
          />
          {/* Inner dot for checked state */}
          <span
            className={cn(
              "pointer-events-none absolute inset-0",
              "flex items-center justify-center",
              "opacity-0 peer-checked:opacity-100",
              // Spring scale animation on select
              "scale-0 peer-checked:scale-100",
              "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]"
            )}
          >
            <span
              className={cn(
                "rounded-full bg-white",
                size === "sm" && "h-1.5 w-1.5",
                size === "md" && "h-2 w-2",
                size === "lg" && "h-2.5 w-2.5"
              )}
            />
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
                  isDisabled && "opacity-50 cursor-not-allowed"
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

Radio.displayName = "Radio"

// Radio Card variant for prominent choices
export interface RadioCardProps extends Omit<RadioProps, "label" | "description"> {
  /**
   * Card title
   */
  title: string
  /**
   * Card description
   */
  cardDescription?: string
  /**
   * Price or secondary info
   */
  price?: string
  /**
   * Icon to display
   */
  icon?: React.ReactNode
}

export const RadioCard = React.forwardRef<HTMLInputElement, RadioCardProps>(
  ({ value, title, cardDescription, price, icon, className, disabled, ...props }, ref) => {
    const group = useRadioGroup()
    const generatedId = React.useId()

    const isDisabled = disabled || group?.disabled
    const isChecked = group ? group.value === value : props.checked

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
          type="radio"
          ref={ref}
          id={props.id || generatedId}
          name={group?.name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          onChange={() => group?.onChange(value)}
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
          {price && (
            <span className="text-sm font-medium text-[var(--color-text)]">
              {price}
            </span>
          )}
          <div
            className={cn(
              "flex-shrink-0 h-5 w-5 rounded-full",
              "border-2 border-[var(--color-border)] flex items-center justify-center",
              // Premium transitions
              "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
              isChecked && "border-[var(--color-primary)] bg-[var(--color-primary)] shadow-[var(--shadow-primary-sm)]"
            )}
          >
            {isChecked && <span className="h-2 w-2 rounded-full bg-white" />}
          </div>
        </div>
      </label>
    )
  }
)

RadioCard.displayName = "RadioCard"
