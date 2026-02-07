"use client"

/**
 * Search Input Component
 *
 * Input field optimized for search with suggestions.
 * Features:
 * - Search icon
 * - Clear button
 * - Loading state
 * - Suggestions dropdown
 * - Keyboard navigation
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Icons
const SearchIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
)

const CloseIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const SpinnerIcon = () => (
  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)

export interface SearchSuggestion {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
}

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "type"> {
  /**
   * Current search value
   */
  value?: string
  /**
   * Callback when value changes
   */
  onChange?: (value: string) => void
  /**
   * Callback when search is submitted
   */
  onSearch?: (value: string) => void
  /**
   * Suggestions to display
   */
  suggestions?: SearchSuggestion[]
  /**
   * Callback when a suggestion is selected
   */
  onSelectSuggestion?: (suggestion: SearchSuggestion) => void
  /**
   * Loading state (shows spinner)
   */
  loading?: boolean
  /**
   * Show suggestions even when empty (recent searches)
   */
  showSuggestionsWhenEmpty?: boolean
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: {
    input: "h-8 text-sm pl-8 pr-8",
    icon: "left-2",
    clear: "right-2",
  },
  md: {
    input: "h-10 text-sm pl-10 pr-10",
    icon: "left-3",
    clear: "right-3",
  },
  lg: {
    input: "h-12 text-base pl-12 pr-12",
    icon: "left-4",
    clear: "right-4",
  },
}

export function SearchInput({
  value = "",
  onChange,
  onSearch,
  suggestions = [],
  onSelectSuggestion,
  loading = false,
  showSuggestionsWhenEmpty = false,
  size = "md",
  placeholder = "Search...",
  disabled,
  className,
  ...props
}: SearchInputProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listRef = React.useRef<HTMLUListElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const sizeClass = sizeClasses[size]

  // Show dropdown when focused and has suggestions
  const showDropdown =
    isOpen && (suggestions.length > 0 || (showSuggestionsWhenEmpty && value === ""))

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange?.(newValue)
    setIsOpen(true)
    setHighlightedIndex(-1)
  }

  // Handle clear
  const handleClear = () => {
    onChange?.("")
    inputRef.current?.focus()
    setIsOpen(false)
  }

  // Handle search submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
      onSelectSuggestion?.(suggestions[highlightedIndex])
    } else {
      onSearch?.(value)
    }
    setIsOpen(false)
  }

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion: SearchSuggestion) => {
    onSelectSuggestion?.(suggestion)
    setIsOpen(false)
    inputRef.current?.focus()
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) {
      if (e.key === "ArrowDown" && suggestions.length > 0) {
        setIsOpen(true)
        setHighlightedIndex(0)
        e.preventDefault()
      }
      return
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Escape":
        e.preventDefault()
        setIsOpen(false)
        setHighlightedIndex(-1)
        break
      case "Enter":
        if (highlightedIndex >= 0) {
          e.preventDefault()
          handleSelectSuggestion(suggestions[highlightedIndex])
        }
        break
    }
  }

  // Scroll highlighted item into view
  React.useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement
      item?.scrollIntoView({ block: "nearest" })
    }
  }, [highlightedIndex])

  // Close on click outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <form onSubmit={handleSubmit}>
        {/* Search icon */}
        <span
          className={cn(
            "absolute top-1/2 -translate-y-1/2",
            "text-[var(--color-text-muted)]",
            "pointer-events-none",
            sizeClass.icon
          )}
        >
          <SearchIcon />
        </span>

        {/* Input */}
        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          role="combobox"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          aria-controls={showDropdown ? "search-suggestions" : undefined}
          aria-activedescendant={
            highlightedIndex >= 0 ? `suggestion-${highlightedIndex}` : undefined
          }
          className={cn(
            "w-full rounded-[var(--radius-md)]",
            "border border-[var(--color-border)]",
            "bg-[var(--color-surface)]",
            "text-[var(--color-text)]",
            "placeholder:text-[var(--color-text-muted)]",
            // Premium transitions
            "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
            // Rest shadow
            "shadow-[var(--shadow-xs)]",
            // Hover
            "hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-sm)]",
            // Focus with glow
            "focus:outline-none focus:ring-[3px] focus:ring-[var(--color-focus-ring)]",
            "focus:border-[var(--color-primary)] focus:shadow-[var(--shadow-primary-sm)]",
            // Disabled
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
            // Hide native search clear button
            "[&::-webkit-search-cancel-button]:hidden",
            sizeClass.input
          )}
          {...props}
        />

        {/* Clear button or loading spinner */}
        {(value || loading) && (
          <span
            className={cn(
              "absolute top-1/2 -translate-y-1/2",
              "text-[var(--color-text-muted)]",
              sizeClass.clear
            )}
          >
            {loading ? (
              <SpinnerIcon />
            ) : (
              <button
                type="button"
                onClick={handleClear}
                className={cn(
                  "p-0.5 rounded-[var(--radius-sm)]",
                  "hover:bg-[var(--color-surface-hover)]",
                  "hover:text-[var(--color-text)]",
                  "transition-colors"
                )}
                aria-label="Clear search"
              >
                <CloseIcon />
              </button>
            )}
          </span>
        )}
      </form>

      {/* Suggestions dropdown */}
      {showDropdown && (
        <ul
          ref={listRef}
          id="search-suggestions"
          role="listbox"
          className={cn(
            "absolute z-50 w-full mt-1",
            "max-h-60 overflow-auto",
            "rounded-[var(--radius-md)]",
            "border border-[var(--color-border)]",
            "bg-[var(--color-surface)]",
            "shadow-[var(--shadow-lg)]",
            "py-1",
            // Animate in
            "animate-in fade-in-0 zoom-in-95 duration-[var(--duration-fast)]"
          )}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.id}
              id={`suggestion-${index}`}
              role="option"
              aria-selected={highlightedIndex === index}
              onClick={() => handleSelectSuggestion(suggestion)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={cn(
                "flex items-center gap-3 px-3 py-2",
                "cursor-pointer transition-colors",
                highlightedIndex === index
                  ? "bg-[var(--color-surface-hover)]"
                  : "hover:bg-[var(--color-surface-hover)]"
              )}
            >
              {suggestion.icon && (
                <span className="text-[var(--color-text-muted)] flex-shrink-0">
                  {suggestion.icon}
                </span>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--color-text)] truncate">
                  {suggestion.label}
                </p>
                {suggestion.description && (
                  <p className="text-xs text-[var(--color-text-muted)] truncate">
                    {suggestion.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// Simple search input without suggestions
export interface SimpleSearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
  /**
   * Loading state
   */
  loading?: boolean
}

export function SimpleSearchInput({
  size = "md",
  loading = false,
  className,
  ...props
}: SimpleSearchInputProps) {
  const sizeClass = sizeClasses[size]

  return (
    <div className={cn("relative", className)}>
      <span
        className={cn(
          "absolute top-1/2 -translate-y-1/2",
          "text-[var(--color-text-muted)]",
          "pointer-events-none",
          sizeClass.icon
        )}
      >
        {loading ? <SpinnerIcon /> : <SearchIcon />}
      </span>
      <input
        type="search"
        className={cn(
          "w-full rounded-[var(--radius-md)]",
          "border border-[var(--color-border)]",
          "bg-[var(--color-surface)]",
          "text-[var(--color-text)]",
          "placeholder:text-[var(--color-text-muted)]",
          // Premium transitions
          "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
          // Rest shadow
          "shadow-[var(--shadow-xs)]",
          // Hover
          "hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-sm)]",
          // Focus with glow
          "focus:outline-none focus:ring-[3px] focus:ring-[var(--color-focus-ring)]",
          "focus:border-[var(--color-primary)] focus:shadow-[var(--shadow-primary-sm)]",
          // Disabled
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
          "[&::-webkit-search-cancel-button]:hidden",
          sizeClass.input,
          "pr-3" // No clear button in simple version
        )}
        {...props}
      />
    </div>
  )
}
