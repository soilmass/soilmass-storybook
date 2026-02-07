"use client"

/**
 * Select Component
 * Domain 74: Select Dropdowns
 *
 * Select input components for single selection.
 * Features:
 * - Native select (SEL1: preferred for accessibility)
 * - Custom select with full keyboard support (SEL2)
 * - Proper ARIA roles (SEL3)
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Chevron icon
const ChevronIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("h-4 w-4", className)}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
)

// Check icon for selected option
const CheckIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
)

// Native Select Component (SEL1: preferred)
export interface NativeSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * Label text
   */
  label?: string
  /**
   * Placeholder option
   */
  placeholder?: string
  /**
   * Error state
   */
  error?: boolean
  /**
   * Error message
   */
  errorMessage?: string
  /**
   * Help text
   */
  helpText?: string
}

export const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    {
      label,
      placeholder,
      error,
      errorMessage,
      helpText,
      className,
      id,
      children,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const selectId = id || generatedId
    const errorId = errorMessage ? `${selectId}-error` : undefined
    const helpId = helpText ? `${selectId}-help` : undefined

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-[var(--color-text)]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={
              [errorId, helpId].filter(Boolean).join(" ") || undefined
            }
            className={cn(
              "appearance-none block w-full min-h-[44px]",
              "py-2 pl-3 pr-10",
              "text-base text-[var(--color-text)]",
              "bg-[var(--color-surface)] border rounded-[var(--radius-md)]",
              "cursor-pointer",
              // Premium transitions
              "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
              // Rest shadow
              "shadow-[var(--shadow-xs)]",
              // Border colors
              error
                ? "border-[var(--color-error)] shadow-[var(--shadow-error-sm)] ring-1 ring-[var(--color-error)]/20"
                : "border-[var(--color-border)]",
              // Hover
              "hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-sm)]",
              // Focus
              "focus:outline-none focus:ring-[3px] focus:ring-[var(--color-focus-ring)]",
              "focus:border-[var(--color-primary)] focus:shadow-[var(--shadow-primary-sm)]",
              // Disabled
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children}
          </select>
          <ChevronIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
        </div>
        {helpText && !errorMessage && (
          <p id={helpId} className="text-sm text-[var(--color-text-muted)]">
            {helpText}
          </p>
        )}
        {errorMessage && (
          <p id={errorId} className="text-sm text-[var(--color-error)]" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    )
  }
)

NativeSelect.displayName = "NativeSelect"

// Option type for custom select
export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

// Custom Select Component with full keyboard support
export interface SelectProps {
  /**
   * Options to display
   */
  options: SelectOption[]
  /**
   * Selected value
   */
  value?: string
  /**
   * Default value
   */
  defaultValue?: string
  /**
   * Callback when value changes
   */
  onChange?: (value: string) => void
  /**
   * Placeholder text
   */
  placeholder?: string
  /**
   * Label text
   */
  label?: string
  /**
   * Disabled state
   */
  disabled?: boolean
  /**
   * Error state
   */
  error?: boolean
  /**
   * Error message
   */
  errorMessage?: string
  /**
   * Additional class names
   */
  className?: string
  /**
   * ID for the select
   */
  id?: string
}

export function Select({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select an option...",
  label,
  disabled,
  error,
  errorMessage,
  className,
  id,
}: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState(defaultValue || "")
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1)

  const currentValue = value !== undefined ? value : internalValue
  const selectedOption = options.find((o) => o.value === currentValue)

  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const listRef = React.useRef<HTMLUListElement>(null)
  const generatedId = React.useId()
  const selectId = id || generatedId
  const listboxId = `${selectId}-listbox`

  // Handle value selection
  const selectValue = React.useCallback(
    (optionValue: string) => {
      if (value === undefined) {
        setInternalValue(optionValue)
      }
      onChange?.(optionValue)
      setIsOpen(false)
      triggerRef.current?.focus()
    },
    [value, onChange]
  )

  // Keyboard navigation (SEL2)
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return

      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault()
          if (isOpen && highlightedIndex >= 0) {
            const option = options[highlightedIndex]
            if (!option.disabled) {
              selectValue(option.value)
            }
          } else {
            setIsOpen(true)
            setHighlightedIndex(
              options.findIndex((o) => o.value === currentValue)
            )
          }
          break
        case "Escape":
          setIsOpen(false)
          triggerRef.current?.focus()
          break
        case "ArrowDown":
          e.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
            setHighlightedIndex(
              options.findIndex((o) => o.value === currentValue)
            )
          } else {
            setHighlightedIndex((prev) =>
              prev < options.length - 1 ? prev + 1 : prev
            )
          }
          break
        case "ArrowUp":
          e.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
            setHighlightedIndex(
              options.findIndex((o) => o.value === currentValue)
            )
          } else {
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev))
          }
          break
        case "Home":
          if (isOpen) {
            e.preventDefault()
            setHighlightedIndex(0)
          }
          break
        case "End":
          if (isOpen) {
            e.preventDefault()
            setHighlightedIndex(options.length - 1)
          }
          break
      }
    },
    [disabled, isOpen, highlightedIndex, options, currentValue, selectValue]
  )

  // Close on outside click
  React.useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        listRef.current &&
        !listRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  // Scroll highlighted option into view
  React.useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listRef.current) {
      const option = listRef.current.children[highlightedIndex] as HTMLElement
      option?.scrollIntoView({ block: "nearest" })
    }
  }, [isOpen, highlightedIndex])

  return (
    <div className={cn("relative", className)}>
      {label && (
        <label
          id={`${selectId}-label`}
          className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
        >
          {label}
        </label>
      )}

      {/* Trigger button (SEL3: proper ARIA) */}
      <button
        ref={triggerRef}
        type="button"
        id={selectId}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-labelledby={label ? `${selectId}-label ${selectId}` : undefined}
        aria-invalid={error ? "true" : undefined}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex items-center justify-between w-full min-h-[44px]",
          "px-3 py-2 text-left",
          "bg-[var(--color-surface)] border rounded-[var(--radius-md)]",
          // Premium transitions
          "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
          // Rest shadow
          "shadow-[var(--shadow-xs)]",
          // Border colors
          error
            ? "border-[var(--color-error)] shadow-[var(--shadow-error-sm)] ring-1 ring-[var(--color-error)]/20"
            : isOpen
              ? "border-[var(--color-primary)] ring-[3px] ring-[var(--color-focus-ring)] shadow-[var(--shadow-primary-sm)]"
              : "border-[var(--color-border)]",
          // Hover
          !disabled && "hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-sm)]",
          // Disabled
          disabled && "opacity-50 cursor-not-allowed shadow-none"
        )}
      >
        <span
          className={cn(
            "truncate",
            selectedOption
              ? "text-[var(--color-text)]"
              : "text-[var(--color-text-muted)]"
          )}
        >
          {selectedOption?.label || placeholder}
        </span>
        <ChevronIcon
          className={cn(
            "flex-shrink-0 ml-2 text-[var(--color-text-muted)]",
            "transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Options dropdown (SEL3: listbox role) */}
      {isOpen && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-labelledby={label ? `${selectId}-label` : undefined}
          className={cn(
            "absolute z-50 w-full mt-1",
            "max-h-60 overflow-auto",
            "bg-[var(--color-surface)] border border-[var(--color-border)]",
            "rounded-[var(--radius-md)] shadow-[var(--shadow-lg)]",
            "py-1",
            // Animate in
            "animate-in fade-in-0 zoom-in-95 duration-[var(--duration-fast)]"
          )}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === currentValue}
              aria-disabled={option.disabled}
              onClick={() => !option.disabled && selectValue(option.value)}
              onMouseEnter={() => !option.disabled && setHighlightedIndex(index)}
              className={cn(
                "flex items-center justify-between px-3 py-2 cursor-pointer",
                "transition-colors duration-100",
                // Highlighted state
                highlightedIndex === index &&
                  !option.disabled &&
                  "bg-[var(--color-surface-hover)]",
                // Selected state
                option.value === currentValue && "text-[var(--color-primary)]",
                // Disabled state
                option.disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <span className="truncate">{option.label}</span>
              {option.value === currentValue && (
                <CheckIcon />
              )}
            </li>
          ))}
        </ul>
      )}

      {errorMessage && (
        <p className="mt-1.5 text-sm text-[var(--color-error)]" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  )
}
