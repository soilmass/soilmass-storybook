"use client"

/**
 * Language Selector Component
 *
 * Locale/language selection dropdown.
 * Features:
 * - Flag icons (emoji or custom)
 * - Native language names
 * - Various display styles
 * - Keyboard navigation
 * - Persistent selection
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Globe icon for default
const GlobeIcon = ({ className }: { className?: string }) => (
  <svg className={cn("h-5 w-5", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
    />
  </svg>
)

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={cn("h-4 w-4", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={cn("h-4 w-4", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

export interface Language {
  code: string
  name: string
  nativeName?: string
  flag?: string
  dir?: "ltr" | "rtl"
}

// Common language data
export const commonLanguages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "en-GB", name: "English (UK)", nativeName: "English (UK)", flag: "🇬🇧" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹" },
  { code: "pt-BR", name: "Portuguese (Brazil)", nativeName: "Português (Brasil)", flag: "🇧🇷" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", flag: "🇳🇱" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
  { code: "zh", name: "Chinese (Simplified)", nativeName: "简体中文", flag: "🇨🇳" },
  { code: "zh-TW", name: "Chinese (Traditional)", nativeName: "繁體中文", flag: "🇹🇼" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦", dir: "rtl" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷" },
  { code: "pl", name: "Polish", nativeName: "Polski", flag: "🇵🇱" },
  { code: "sv", name: "Swedish", nativeName: "Svenska", flag: "🇸🇪" },
  { code: "da", name: "Danish", nativeName: "Dansk", flag: "🇩🇰" },
  { code: "no", name: "Norwegian", nativeName: "Norsk", flag: "🇳🇴" },
  { code: "fi", name: "Finnish", nativeName: "Suomi", flag: "🇫🇮" },
  { code: "el", name: "Greek", nativeName: "Ελληνικά", flag: "🇬🇷" },
  { code: "he", name: "Hebrew", nativeName: "עברית", flag: "🇮🇱", dir: "rtl" },
  { code: "th", name: "Thai", nativeName: "ไทย", flag: "🇹🇭" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", flag: "🇻🇳" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "uk", name: "Ukrainian", nativeName: "Українська", flag: "🇺🇦" },
  { code: "cs", name: "Czech", nativeName: "Čeština", flag: "🇨🇿" },
]

export interface LanguageSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Available languages
   */
  languages: Language[]
  /**
   * Currently selected language code
   */
  value: string
  /**
   * Change handler
   */
  onChange: (code: string) => void
  /**
   * Display variant
   */
  variant?: "dropdown" | "inline" | "minimal" | "button"
  /**
   * Show flags
   */
  showFlags?: boolean
  /**
   * Show native names
   */
  showNativeNames?: boolean
  /**
   * Size
   */
  size?: "sm" | "md" | "lg"
  /**
   * Align dropdown
   */
  align?: "left" | "right"
  /**
   * Placeholder when no selection
   */
  placeholder?: string
}

const sizeClasses = {
  sm: "h-8 text-sm",
  md: "h-10 text-sm",
  lg: "h-12 text-base",
}

export function LanguageSelector({
  languages,
  value,
  onChange,
  variant = "dropdown",
  showFlags = true,
  showNativeNames = true,
  size = "md",
  align = "right",
  placeholder = "Select language",
  className,
  ...props
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const selectedLanguage = languages.find((lang) => lang.code === value)

  // Close on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Escape":
        setIsOpen(false)
        break
      case "Enter":
      case " ":
        setIsOpen(!isOpen)
        break
      case "ArrowDown":
        if (isOpen) {
          const currentIndex = languages.findIndex((l) => l.code === value)
          const nextIndex = (currentIndex + 1) % languages.length
          onChange(languages[nextIndex].code)
        } else {
          setIsOpen(true)
        }
        e.preventDefault()
        break
      case "ArrowUp":
        if (isOpen) {
          const currentIndex = languages.findIndex((l) => l.code === value)
          const prevIndex = currentIndex === 0 ? languages.length - 1 : currentIndex - 1
          onChange(languages[prevIndex].code)
        }
        e.preventDefault()
        break
    }
  }

  // Minimal variant (just icon)
  if (variant === "minimal") {
    return (
      <div ref={containerRef} className={cn("relative", className)} {...props}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={cn(
            "inline-flex items-center justify-center",
            "rounded-[var(--radius-md)]",
            "hover:bg-[var(--color-surface-hover)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)]",
            "transition-colors",
            sizeClasses[size],
            size === "sm" ? "w-8" : size === "md" ? "w-10" : "w-12"
          )}
          aria-label="Select language"
          aria-expanded={isOpen}
        >
          {selectedLanguage?.flag || <GlobeIcon />}
        </button>

        {isOpen && (
          <LanguageDropdown
            languages={languages}
            value={value}
            onChange={(code) => {
              onChange(code)
              setIsOpen(false)
            }}
            showFlags={showFlags}
            showNativeNames={showNativeNames}
            align={align}
          />
        )}
      </div>
    )
  }

  // Button variant
  if (variant === "button") {
    return (
      <div ref={containerRef} className={cn("relative", className)} {...props}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={cn(
            "inline-flex items-center gap-2 px-3",
            "rounded-[var(--radius-md)]",
            "border border-[var(--color-border)]",
            "bg-[var(--color-surface)]",
            "hover:bg-[var(--color-surface-hover)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)]",
            "transition-colors",
            sizeClasses[size]
          )}
          aria-label="Select language"
          aria-expanded={isOpen}
        >
          {showFlags && selectedLanguage?.flag && (
            <span className="text-lg">{selectedLanguage.flag}</span>
          )}
          <span className="text-[var(--color-text)]">
            {selectedLanguage?.code.toUpperCase() || "EN"}
          </span>
          <ChevronDownIcon className={cn("text-[var(--color-text-muted)] transition-transform", isOpen && "rotate-180")} />
        </button>

        {isOpen && (
          <LanguageDropdown
            languages={languages}
            value={value}
            onChange={(code) => {
              onChange(code)
              setIsOpen(false)
            }}
            showFlags={showFlags}
            showNativeNames={showNativeNames}
            align={align}
          />
        )}
      </div>
    )
  }

  // Inline variant (horizontal list)
  if (variant === "inline") {
    return (
      <div
        className={cn(
          "inline-flex gap-1 p-1 rounded-[var(--radius-lg)]",
          "bg-[var(--color-surface-muted)]",
          className
        )}
        role="radiogroup"
        aria-label="Select language"
        {...props}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            role="radio"
            aria-checked={value === lang.code}
            onClick={() => onChange(lang.code)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)]",
              "text-sm font-medium transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)]",
              value === lang.code
                ? "bg-[var(--color-surface)] text-[var(--color-text)] shadow-sm"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            )}
          >
            {showFlags && lang.flag && <span>{lang.flag}</span>}
            <span>{lang.code.toUpperCase()}</span>
          </button>
        ))}
      </div>
    )
  }

  // Default dropdown variant
  return (
    <div ref={containerRef} className={cn("relative", className)} {...props}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={cn(
          "inline-flex items-center justify-between gap-2 w-full px-3",
          "rounded-[var(--radius-md)]",
          "border border-[var(--color-border)]",
          "bg-[var(--color-surface)]",
          "hover:bg-[var(--color-surface-hover)]",
          "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)]",
          "transition-colors",
          sizeClasses[size]
        )}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          {showFlags && selectedLanguage?.flag && (
            <span className="text-lg">{selectedLanguage.flag}</span>
          )}
          <span className="text-[var(--color-text)]">
            {showNativeNames && selectedLanguage?.nativeName
              ? selectedLanguage.nativeName
              : selectedLanguage?.name || placeholder}
          </span>
        </span>
        <ChevronDownIcon className={cn("text-[var(--color-text-muted)] transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <LanguageDropdown
          languages={languages}
          value={value}
          onChange={(code) => {
            onChange(code)
            setIsOpen(false)
          }}
          showFlags={showFlags}
          showNativeNames={showNativeNames}
          align={align}
        />
      )}
    </div>
  )
}

// Dropdown menu component
interface LanguageDropdownProps {
  languages: Language[]
  value: string
  onChange: (code: string) => void
  showFlags?: boolean
  showNativeNames?: boolean
  align?: "left" | "right"
}

function LanguageDropdown({
  languages,
  value,
  onChange,
  showFlags = true,
  showNativeNames = true,
  align = "right",
}: LanguageDropdownProps) {
  return (
    <div
      className={cn(
        "absolute z-50 mt-1",
        "min-w-[200px] max-h-[300px] overflow-auto",
        "py-1 rounded-[var(--radius-lg)]",
        "bg-[var(--color-surface)]",
        "border border-[var(--color-border)]",
        "shadow-lg",
        "animate-in fade-in-0 zoom-in-95",
        align === "right" ? "right-0" : "left-0"
      )}
    >
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => onChange(lang.code)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2",
            "text-sm text-[var(--color-text)]",
            "hover:bg-[var(--color-surface-hover)]",
            "focus:outline-none focus:bg-[var(--color-surface-hover)]",
            value === lang.code && "bg-[var(--color-surface-muted)]"
          )}
        >
          {showFlags && lang.flag && (
            <span className="text-lg w-6 text-center">{lang.flag}</span>
          )}
          <span className="flex-1 text-left">
            {showNativeNames && lang.nativeName ? (
              <span>
                <span className="font-medium">{lang.nativeName}</span>
                {lang.nativeName !== lang.name && (
                  <span className="text-[var(--color-text-muted)] ml-1">
                    ({lang.name})
                  </span>
                )}
              </span>
            ) : (
              lang.name
            )}
          </span>
          {value === lang.code && (
            <CheckIcon className="text-[var(--color-primary)]" />
          )}
        </button>
      ))}
    </div>
  )
}

// Simple language toggle (for two languages)
export interface LanguageToggleProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Two languages to toggle between
   */
  languages: [Language, Language]
  /**
   * Currently selected language code
   */
  value: string
  /**
   * Change handler
   */
  onChange: (code: string) => void
  /**
   * Show flags
   */
  showFlags?: boolean
  /**
   * Size
   */
  size?: "sm" | "md" | "lg"
}

export function LanguageToggle({
  languages,
  value,
  onChange,
  showFlags = true,
  size = "md",
  className,
  ...props
}: LanguageToggleProps) {
  const currentIndex = languages.findIndex((l) => l.code === value)
  const currentLang = languages[currentIndex] || languages[0]
  const otherLang = languages[currentIndex === 0 ? 1 : 0]

  const toggle = () => {
    onChange(otherLang.code)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "inline-flex items-center gap-2 px-3",
        "rounded-[var(--radius-md)]",
        "border border-[var(--color-border)]",
        "bg-[var(--color-surface)]",
        "hover:bg-[var(--color-surface-hover)]",
        "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)]",
        "transition-colors",
        sizeClasses[size],
        className
      )}
      aria-label={`Switch to ${otherLang.name}`}
      {...props}
    >
      {showFlags && currentLang?.flag && (
        <span className="text-lg">{currentLang.flag}</span>
      )}
      <span className="text-[var(--color-text)] font-medium">
        {currentLang?.code.toUpperCase()}
      </span>
    </button>
  )
}
