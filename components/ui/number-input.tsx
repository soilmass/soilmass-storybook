"use client"

/**
 * Number Input Component
 *
 * Numeric input with increment/decrement controls.
 * Features:
 * - Increment/decrement buttons
 * - Min/max validation
 * - Step increments
 * - Keyboard support (arrow keys)
 * - Formatted display
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Icons
const MinusIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
)

const PlusIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  /**
   * Current value
   */
  value?: number
  /**
   * Default value
   */
  defaultValue?: number
  /**
   * Callback when value changes
   */
  onChange?: (value: number) => void
  /**
   * Minimum value
   */
  min?: number
  /**
   * Maximum value
   */
  max?: number
  /**
   * Step increment
   */
  step?: number
  /**
   * Label text
   */
  label?: string
  /**
   * Error state
   */
  error?: boolean
  /**
   * Error message
   */
  errorMessage?: string
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
  /**
   * Hide controls
   */
  hideControls?: boolean
  /**
   * Format value for display
   */
  formatValue?: (value: number) => string
  /**
   * Parse input string to number
   */
  parseValue?: (value: string) => number
}

const sizeClasses = {
  sm: {
    input: "h-8 text-sm px-2",
    button: "h-8 w-8",
  },
  md: {
    input: "h-10 text-base px-3",
    button: "h-10 w-10",
  },
  lg: {
    input: "h-12 text-lg px-4",
    button: "h-12 w-12",
  },
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value,
      defaultValue = 0,
      onChange,
      min = -Infinity,
      max = Infinity,
      step = 1,
      label,
      error,
      errorMessage,
      size = "md",
      hideControls = false,
      formatValue = (v) => String(v),
      parseValue = (v) => parseFloat(v) || 0,
      disabled,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const [inputValue, setInputValue] = React.useState(formatValue(defaultValue))
    const [isFocused, setIsFocused] = React.useState(false)

    const currentValue = value !== undefined ? value : internalValue
    const generatedId = React.useId()
    const inputId = id || generatedId

    // Sync input display when value changes externally
    React.useEffect(() => {
      if (!isFocused) {
        setInputValue(formatValue(currentValue))
      }
    }, [currentValue, formatValue, isFocused])

    const updateValue = React.useCallback(
      (newValue: number) => {
        const clampedValue = Math.min(Math.max(newValue, min), max)
        // Round to step
        const steppedValue = Math.round(clampedValue / step) * step
        // Fix floating point precision
        const finalValue = parseFloat(steppedValue.toFixed(10))

        if (value === undefined) {
          setInternalValue(finalValue)
        }
        onChange?.(finalValue)
      },
      [min, max, step, value, onChange]
    )

    const increment = () => {
      if (!disabled) {
        updateValue(currentValue + step)
      }
    }

    const decrement = () => {
      if (!disabled) {
        updateValue(currentValue - step)
      }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
    }

    const handleBlur = () => {
      setIsFocused(false)
      const parsed = parseValue(inputValue)
      updateValue(parsed)
      setInputValue(formatValue(parsed))
    }

    const handleFocus = () => {
      setIsFocused(true)
      setInputValue(String(currentValue))
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault()
          increment()
          break
        case "ArrowDown":
          e.preventDefault()
          decrement()
          break
      }
    }

    const sizeConfig = sizeClasses[size]
    const canDecrement = currentValue > min
    const canIncrement = currentValue < max

    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
          >
            {label}
          </label>
        )}

        <div className="flex">
          {/* Decrement button */}
          {!hideControls && (
            <button
              type="button"
              onClick={decrement}
              disabled={disabled || !canDecrement}
              tabIndex={-1}
              className={cn(
                "flex items-center justify-center",
                "border border-r-0 border-[var(--color-border)]",
                "rounded-l-[var(--radius-md)]",
                "bg-[var(--color-surface)] text-[var(--color-text-muted)]",
                // Premium transitions
                "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
                // Hover
                "hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]",
                "hover:shadow-[var(--shadow-sm)]",
                // Active
                "active:scale-95",
                // Disabled
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100",
                sizeConfig.button,
                error && "border-[var(--color-error)]"
              )}
              aria-label="Decrease value"
            >
              <MinusIcon />
            </button>
          )}

          {/* Input */}
          <input
            ref={ref}
            type="text"
            inputMode="numeric"
            id={inputId}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            aria-invalid={error ? "true" : undefined}
            className={cn(
              "flex-1 min-w-0 text-center",
              "border border-[var(--color-border)]",
              "bg-[var(--color-surface)] text-[var(--color-text)]",
              // Premium transitions
              "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
              // Rest shadow
              "shadow-[var(--shadow-xs)]",
              // Hover
              "hover:shadow-[var(--shadow-sm)]",
              // Focus
              "focus:outline-none focus:ring-[3px] focus:ring-[var(--color-focus-ring)]",
              "focus:border-[var(--color-primary)] focus:shadow-[var(--shadow-primary-sm)]",
              // Disabled
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
              hideControls && "rounded-[var(--radius-md)]",
              sizeConfig.input,
              error && "border-[var(--color-error)] shadow-[var(--shadow-error-sm)] ring-1 ring-[var(--color-error)]/20"
            )}
            {...props}
          />

          {/* Increment button */}
          {!hideControls && (
            <button
              type="button"
              onClick={increment}
              disabled={disabled || !canIncrement}
              tabIndex={-1}
              className={cn(
                "flex items-center justify-center",
                "border border-l-0 border-[var(--color-border)]",
                "rounded-r-[var(--radius-md)]",
                "bg-[var(--color-surface)] text-[var(--color-text-muted)]",
                // Premium transitions
                "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
                // Hover
                "hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]",
                "hover:shadow-[var(--shadow-sm)]",
                // Active
                "active:scale-95",
                // Disabled
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100",
                sizeConfig.button,
                error && "border-[var(--color-error)]"
              )}
              aria-label="Increase value"
            >
              <PlusIcon />
            </button>
          )}
        </div>

        {errorMessage && (
          <p className="mt-1.5 text-sm text-[var(--color-error)]" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    )
  }
)

NumberInput.displayName = "NumberInput"

// Quantity selector variant (common e-commerce pattern)
export interface QuantitySelectorProps
  extends Omit<NumberInputProps, "min" | "hideControls"> {
  /**
   * Minimum quantity (default: 1)
   */
  minQuantity?: number
}

export function QuantitySelector({
  minQuantity = 1,
  defaultValue = 1,
  ...props
}: QuantitySelectorProps) {
  return (
    <NumberInput
      min={minQuantity}
      defaultValue={defaultValue}
      {...props}
    />
  )
}
