"use client"

/**
 * Tag Input Component
 *
 * Input for entering multiple tags/chips.
 * Features:
 * - Add tags with Enter key
 * - Remove with Backspace or click
 * - Optional suggestions dropdown
 * - Max tags limit
 * - Duplicate prevention
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Icons
const CloseIcon = () => (
  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export interface TagInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  /**
   * Current tags
   */
  value: string[]
  /**
   * Callback when tags change
   */
  onChange: (tags: string[]) => void
  /**
   * Suggestions for autocomplete
   */
  suggestions?: string[]
  /**
   * Maximum number of tags
   */
  maxTags?: number
  /**
   * Allow duplicate tags
   */
  allowDuplicates?: boolean
  /**
   * Delimiter keys (default: Enter, comma)
   */
  delimiters?: string[]
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
  /**
   * Error state
   */
  error?: boolean
  /**
   * Error message
   */
  errorMessage?: string
  /**
   * Label
   */
  label?: string
}

const sizeClasses = {
  sm: {
    container: "min-h-8 text-sm",
    tag: "h-5 text-xs px-1.5",
    input: "text-sm",
  },
  md: {
    container: "min-h-10 text-sm",
    tag: "h-6 text-sm px-2",
    input: "text-sm",
  },
  lg: {
    container: "min-h-12 text-base",
    tag: "h-7 text-base px-2.5",
    input: "text-base",
  },
}

export function TagInput({
  value = [],
  onChange,
  suggestions = [],
  maxTags,
  allowDuplicates = false,
  delimiters = ["Enter", ","],
  size = "md",
  error,
  errorMessage,
  label,
  placeholder = "Add tag...",
  disabled,
  className,
  id,
  ...props
}: TagInputProps) {
  const [inputValue, setInputValue] = React.useState("")
  const [isFocused, setIsFocused] = React.useState(false)
  const [showSuggestions, setShowSuggestions] = React.useState(false)
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const generatedId = React.useId()
  const inputId = id || generatedId

  const sizeClass = sizeClasses[size]

  // Filter suggestions
  const filteredSuggestions = React.useMemo(() => {
    if (!inputValue.trim()) return suggestions
    const query = inputValue.toLowerCase()
    return suggestions.filter(
      (s) =>
        s.toLowerCase().includes(query) &&
        (allowDuplicates || !value.includes(s))
    )
  }, [inputValue, suggestions, value, allowDuplicates])

  const canAddMore = !maxTags || value.length < maxTags

  const addTag = (tag: string) => {
    const trimmed = tag.trim()
    if (!trimmed) return
    if (!canAddMore) return
    if (!allowDuplicates && value.includes(trimmed)) return

    onChange([...value, trimmed])
    setInputValue("")
    setShowSuggestions(false)
    setHighlightedIndex(-1)
  }

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle delimiter keys
    if (delimiters.includes(e.key)) {
      e.preventDefault()
      if (highlightedIndex >= 0 && filteredSuggestions[highlightedIndex]) {
        addTag(filteredSuggestions[highlightedIndex])
      } else if (inputValue) {
        addTag(inputValue)
      }
      return
    }

    // Handle backspace to remove last tag
    if (e.key === "Backspace" && !inputValue && value.length > 0) {
      removeTag(value.length - 1)
      return
    }

    // Handle suggestion navigation
    if (showSuggestions && filteredSuggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        )
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1))
      } else if (e.key === "Escape") {
        setShowSuggestions(false)
        setHighlightedIndex(-1)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    // Check for comma delimiter in input
    if (delimiters.includes(",") && newValue.includes(",")) {
      const parts = newValue.split(",")
      parts.forEach((part, i) => {
        if (i < parts.length - 1 && part.trim()) {
          addTag(part)
        }
      })
      setInputValue(parts[parts.length - 1])
    } else {
      setInputValue(newValue)
    }
    setShowSuggestions(true)
    setHighlightedIndex(-1)
  }

  // Click outside to close suggestions
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

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

      <div
        ref={containerRef}
        className="relative"
        onClick={() => inputRef.current?.focus()}
      >
        <div
          className={cn(
            "flex flex-wrap items-center gap-1.5 p-1.5",
            "rounded-[var(--radius-md)]",
            "border bg-[var(--color-surface)]",
            // Premium transitions
            "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
            "cursor-text",
            // Rest shadow
            "shadow-[var(--shadow-xs)]",
            // Focus state
            isFocused
              ? "border-[var(--color-primary)] ring-[3px] ring-[var(--color-focus-ring)] shadow-[var(--shadow-primary-sm)]"
              : "border-[var(--color-border)] hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-sm)]",
            // Error
            error && "border-[var(--color-error)] shadow-[var(--shadow-error-sm)] ring-1 ring-[var(--color-error)]/20",
            // Disabled
            disabled && "opacity-50 cursor-not-allowed bg-[var(--color-surface-muted)] shadow-none",
            sizeClass.container
          )}
        >
          {/* Tags */}
          {value.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className={cn(
                "inline-flex items-center gap-1",
                "rounded-[var(--radius-sm)]",
                "bg-[var(--color-surface-muted)]",
                "text-[var(--color-text)]",
                // Tag shadow and transitions
                "shadow-[var(--shadow-xs)]",
                "transition-all duration-[var(--duration-fast)] ease-[var(--ease-spring)]",
                "hover:shadow-[var(--shadow-sm)]",
                sizeClass.tag
              )}
            >
              {tag}
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeTag(index)
                  }}
                  className={cn(
                    "rounded-full p-0.5",
                    "text-[var(--color-text-muted)]",
                    "hover:text-[var(--color-text)]",
                    "hover:bg-[var(--color-surface-hover)]",
                    "transition-colors"
                  )}
                  aria-label={`Remove ${tag}`}
                >
                  <CloseIcon />
                </button>
              )}
            </span>
          ))}

          {/* Input */}
          {canAddMore && (
            <input
              ref={inputRef}
              id={inputId}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                setIsFocused(true)
                setShowSuggestions(true)
              }}
              onBlur={() => setIsFocused(false)}
              placeholder={value.length === 0 ? placeholder : ""}
              disabled={disabled}
              className={cn(
                "flex-1 min-w-[80px] bg-transparent",
                "outline-none border-none",
                "text-[var(--color-text)]",
                "placeholder:text-[var(--color-text-muted)]",
                sizeClass.input
              )}
              {...props}
            />
          )}
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && !disabled && (
          <ul
            className={cn(
              "absolute z-50 w-full mt-1",
              "max-h-48 overflow-auto",
              "rounded-[var(--radius-md)]",
              "border border-[var(--color-border)]",
              "bg-[var(--color-surface)]",
              "shadow-[var(--shadow-lg)] py-1",
              // Animate in
              "animate-in fade-in-0 zoom-in-95 duration-[var(--duration-fast)]"
            )}
            role="listbox"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={suggestion}
                role="option"
                aria-selected={highlightedIndex === index}
                onClick={() => addTag(suggestion)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={cn(
                  "px-3 py-1.5 cursor-pointer",
                  "text-sm text-[var(--color-text)]",
                  // Premium transition
                  "transition-all duration-[var(--duration-fast)] ease-[var(--ease-spring)]",
                  highlightedIndex === index
                    ? "bg-[var(--color-surface-hover)]"
                    : "hover:bg-[var(--color-surface-hover)]"
                )}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Helper text */}
      {maxTags && (
        <p className="mt-1 text-xs text-[var(--color-text-muted)]">
          {value.length} / {maxTags} tags
        </p>
      )}

      {/* Error message */}
      {errorMessage && (
        <p className="mt-1 text-sm text-[var(--color-error)]" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  )
}

// Read-only tag list
export interface TagListProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tags to display
   */
  tags: string[]
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
  /**
   * Color variant
   */
  variant?: "default" | "primary" | "outline"
}

export function TagList({
  tags,
  size = "md",
  variant = "default",
  className,
  ...props
}: TagListProps) {
  const sizeClass = sizeClasses[size]

  const variantClasses = {
    default: "bg-[var(--color-surface-muted)] text-[var(--color-text)]",
    primary: "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
    outline: "border border-[var(--color-border)] text-[var(--color-text)]",
  }

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)} {...props}>
      {tags.map((tag, index) => (
        <span
          key={`${tag}-${index}`}
          className={cn(
            "inline-flex items-center rounded-[var(--radius-sm)]",
            sizeClass.tag,
            variantClasses[variant]
          )}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}
