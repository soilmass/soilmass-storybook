"use client"

/**
 * Theme Toggle Component
 *
 * Dark/light mode toggle with system preference support.
 * Features:
 * - Light, dark, and system modes
 * - Premium spring transitions
 * - Sun/moon morphing animation
 * - Track glow effects
 * - Persistent storage
 * - SSR-safe
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Animated Sun Icon with rays
const SunIcon = ({ className, animate = false }: { className?: string; animate?: boolean }) => (
  <svg className={cn("h-5 w-5", className)} viewBox="0 0 24 24" fill="none">
    {/* Sun center */}
    <circle
      cx="12"
      cy="12"
      r="4"
      fill="currentColor"
      className={cn(
        "origin-center",
        animate && "animate-[scale-in_0.4s_var(--spring-bounce)_forwards]"
      )}
    />
    {/* Sun rays - animated */}
    <g
      className={cn(
        "origin-center",
        animate && "animate-[spin-in_0.5s_var(--spring-bounce)_forwards]"
      )}
    >
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <line
          key={angle}
          x1="12"
          y1="2"
          x2="12"
          y2="4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          transform={`rotate(${angle} 12 12)`}
          className={cn(
            animate && "opacity-0 animate-[fade-in_0.3s_ease-out_forwards]"
          )}
          style={{ animationDelay: animate ? `${i * 30}ms` : undefined }}
        />
      ))}
    </g>
  </svg>
)

// Animated Moon Icon with crescent and stars
const MoonIcon = ({ className, animate = false }: { className?: string; animate?: boolean }) => (
  <svg className={cn("h-5 w-5", className)} viewBox="0 0 24 24" fill="none">
    {/* Moon crescent */}
    <path
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      fill="currentColor"
      className={cn(
        "origin-center",
        animate && "animate-[moon-rise_0.5s_var(--spring-bounce)_forwards]"
      )}
    />
    {/* Stars */}
    {animate && (
      <g className="opacity-0 animate-[twinkle_0.4s_0.2s_ease-out_forwards]">
        <circle cx="6" cy="6" r="0.5" fill="currentColor" />
        <circle cx="19" cy="8" r="0.4" fill="currentColor" />
        <circle cx="16" cy="4" r="0.3" fill="currentColor" />
      </g>
    )}
  </svg>
)

const SystemIcon = ({ className }: { className?: string }) => (
  <svg className={cn("h-5 w-5", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)

export type Theme = "light" | "dark" | "system"

export interface ThemeContextValue {
  theme: Theme
  resolvedTheme: "light" | "dark"
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined)

export interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  attribute?: "class" | "data-theme"
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  attribute = "class",
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">("light")

  const getSystemTheme = (): "light" | "dark" => {
    if (typeof window === "undefined") return "light"
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }

  const applyTheme = React.useCallback(
    (newTheme: "light" | "dark") => {
      const root = document.documentElement

      if (disableTransitionOnChange) {
        root.style.setProperty("transition", "none")
      }

      if (attribute === "class") {
        root.classList.remove("light", "dark")
        root.classList.add(newTheme)
      } else {
        root.setAttribute("data-theme", newTheme)
      }

      if (disableTransitionOnChange) {
        void root.offsetHeight
        root.style.removeProperty("transition")
      }

      setResolvedTheme(newTheme)
    },
    [attribute, disableTransitionOnChange]
  )

  React.useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Theme | null
    const initialTheme = stored || defaultTheme
    setThemeState(initialTheme)

    const resolved = initialTheme === "system" ? getSystemTheme() : initialTheme
    applyTheme(resolved)
  }, [storageKey, defaultTheme, applyTheme])

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = () => {
      if (theme === "system") {
        applyTheme(getSystemTheme())
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme, applyTheme])

  const setTheme = React.useCallback(
    (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme)
      setThemeState(newTheme)

      const resolved = newTheme === "system" ? getSystemTheme() : newTheme
      applyTheme(resolved)
    },
    [storageKey, applyTheme]
  )

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export interface ThemeToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "icon" | "icon-label" | "switch" | "dropdown"
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
}

export function ThemeToggle({
  variant = "icon",
  size = "md",
  className,
  ...props
}: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [isAnimating, setIsAnimating] = React.useState(false)
  const prevThemeRef = React.useRef(resolvedTheme)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (mounted && prevThemeRef.current !== resolvedTheme) {
      setIsAnimating(true)
      const timeout = setTimeout(() => setIsAnimating(false), 600)
      prevThemeRef.current = resolvedTheme
      return () => clearTimeout(timeout)
    }
  }, [resolvedTheme, mounted])

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  // Icon toggle with premium animation
  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          "group relative inline-flex items-center justify-center rounded-[var(--radius-md)]",
          "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
          "hover:bg-[var(--color-surface-hover)]",
          "hover:scale-105 active:scale-95",
          "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:ring-offset-2",
          // Subtle glow on hover
          "hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.15)]",
          sizeClasses[size],
          className
        )}
        aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
        {...props}
      >
        {mounted ? (
          <div className="relative">
            {/* Icon container with rotation animation */}
            <div
              className={cn(
                "transition-transform duration-500 ease-[var(--ease-spring)]",
                isAnimating && "animate-[icon-swap_0.5s_var(--spring-bounce)]"
              )}
            >
              {resolvedTheme === "dark" ? (
                <SunIcon animate={isAnimating} className="text-[var(--color-warning)]" />
              ) : (
                <MoonIcon animate={isAnimating} className="text-[var(--color-primary)]" />
              )}
            </div>
          </div>
        ) : (
          <div className={cn("h-5 w-5 rounded-full bg-[var(--color-border)] animate-pulse")} />
        )}
      </button>
    )
  }

  // Icon with label
  if (variant === "icon-label") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          "inline-flex items-center gap-2 px-3 py-2 rounded-[var(--radius-md)]",
          "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
          "hover:bg-[var(--color-surface-hover)]",
          "hover:scale-[1.02] active:scale-[0.98]",
          "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:ring-offset-2",
          "text-sm font-medium text-[var(--color-text)]",
          className
        )}
        {...props}
      >
        {mounted ? (
          resolvedTheme === "dark" ? (
            <>
              <SunIcon animate={isAnimating} className="h-4 w-4 text-[var(--color-warning)]" />
              <span>Light mode</span>
            </>
          ) : (
            <>
              <MoonIcon animate={isAnimating} className="h-4 w-4 text-[var(--color-primary)]" />
              <span>Dark mode</span>
            </>
          )
        ) : (
          <>
            <div className="h-4 w-4 rounded-full bg-[var(--color-border)] animate-pulse" />
            <span>Theme</span>
          </>
        )}
      </button>
    )
  }

  // Premium switch toggle with track glow
  if (variant === "switch") {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={resolvedTheme === "dark"}
        onClick={toggleTheme}
        className={cn(
          "group relative inline-flex items-center",
          "h-8 w-16 rounded-full",
          "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
          // Track styling with gradient
          resolvedTheme === "dark"
            ? "bg-gradient-to-r from-[var(--color-primary)]/20 to-[var(--color-primary)]/40"
            : "bg-gradient-to-r from-[var(--color-warning)]/20 to-[var(--color-warning)]/40",
          "border border-[var(--color-border)]",
          // Track glow on hover
          "hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.2)]",
          "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:ring-offset-2",
          className
        )}
        {...props}
      >
        {/* Track glow effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-full opacity-0 transition-opacity duration-300",
            "group-hover:opacity-100",
            resolvedTheme === "dark"
              ? "bg-[radial-gradient(ellipse_at_center,rgba(var(--color-primary-rgb),0.15),transparent_70%)]"
              : "bg-[radial-gradient(ellipse_at_center,rgba(var(--color-warning-rgb),0.15),transparent_70%)]"
          )}
        />

        {/* Icons on track */}
        <span className="absolute left-1.5 text-[var(--color-warning)] transition-opacity duration-200">
          <SunIcon className="h-4 w-4" />
        </span>
        <span className="absolute right-1.5 text-[var(--color-primary)] transition-opacity duration-200">
          <MoonIcon className="h-4 w-4" />
        </span>

        {/* Toggle thumb with glow */}
        {mounted && (
          <span
            className={cn(
              "absolute h-6 w-6 rounded-full bg-white",
              "shadow-[0_2px_8px_rgba(0,0,0,0.15)]",
              "transition-all duration-300 ease-[var(--ease-spring)]",
              // Thumb glow
              resolvedTheme === "dark"
                ? "translate-x-9 shadow-[0_0_12px_rgba(var(--color-primary-rgb),0.4)]"
                : "translate-x-1 shadow-[0_0_12px_rgba(var(--color-warning-rgb),0.4)]",
              // Scale on hover
              "group-hover:scale-110"
            )}
          />
        )}
      </button>
    )
  }

  // Dropdown
  return (
    <ThemeDropdown size={size} className={className} {...props} />
  )
}

// Theme dropdown for light/dark/system selection
interface ThemeDropdownProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg"
}

function ThemeDropdown({ size = "md", className, ...props }: ThemeDropdownProps) {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const themes: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: "light", label: "Light", icon: <SunIcon className="h-4 w-4 text-[var(--color-warning)]" /> },
    { value: "dark", label: "Dark", icon: <MoonIcon className="h-4 w-4 text-[var(--color-primary)]" /> },
    { value: "system", label: "System", icon: <SystemIcon className="h-4 w-4" /> },
  ]

  const currentTheme = themes.find((t) => t.value === theme)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "inline-flex items-center justify-center rounded-[var(--radius-md)]",
          "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
          "hover:bg-[var(--color-surface-hover)]",
          "hover:scale-105 active:scale-95",
          "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:ring-offset-2",
          sizeClasses[size],
          className
        )}
        aria-label="Select theme"
        aria-expanded={isOpen}
        {...props}
      >
        {mounted ? (
          currentTheme?.icon
        ) : (
          <div className="h-5 w-5 rounded-full bg-[var(--color-border)] animate-pulse" />
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div
            className={cn(
              "absolute right-0 mt-2 z-50",
              "w-36 py-1 rounded-[var(--radius-lg)]",
              "bg-[var(--color-surface)]",
              "border border-[var(--color-border)]",
              "shadow-lg shadow-black/10",
              "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2",
              "duration-200"
            )}
          >
            {themes.map((t, index) => (
              <button
                key={t.value}
                type="button"
                onClick={() => {
                  setTheme(t.value)
                  setIsOpen(false)
                }}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2",
                  "text-sm text-[var(--color-text)]",
                  "transition-all duration-150 ease-out",
                  "hover:bg-[var(--color-surface-hover)]",
                  "hover:translate-x-0.5",
                  theme === t.value && "bg-[var(--color-surface-muted)]"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {t.icon}
                <span>{t.label}</span>
                {theme === t.value && (
                  <svg
                    className="ml-auto h-4 w-4 text-[var(--color-primary)] animate-[scale-in_0.2s_ease-out]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// Inline theme selector (radio-style)
export interface ThemeSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  showLabels?: boolean
}

export function ThemeSelector({
  showLabels = true,
  className,
  ...props
}: ThemeSelectorProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const themes: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: "light", label: "Light", icon: <SunIcon className="h-4 w-4" /> },
    { value: "dark", label: "Dark", icon: <MoonIcon className="h-4 w-4" /> },
    { value: "system", label: "System", icon: <SystemIcon className="h-4 w-4" /> },
  ]

  if (!mounted) {
    return (
      <div className={cn("flex gap-1 p-1 rounded-[var(--radius-lg)] bg-[var(--color-surface-muted)]", className)}>
        {themes.map((t) => (
          <div
            key={t.value}
            className="px-3 py-1.5 rounded-[var(--radius-md)] animate-pulse bg-[var(--color-border)]"
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "inline-flex gap-1 p-1 rounded-[var(--radius-lg)]",
        "bg-[var(--color-surface-muted)]",
        className
      )}
      role="radiogroup"
      aria-label="Select theme"
      {...props}
    >
      {themes.map((t) => (
        <button
          key={t.value}
          type="button"
          role="radio"
          aria-checked={theme === t.value}
          onClick={() => setTheme(t.value)}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)]",
            "text-sm font-medium",
            "transition-all duration-[var(--duration-fast)] ease-[var(--ease-spring)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)]",
            theme === t.value
              ? "bg-[var(--color-surface)] text-[var(--color-text)] shadow-sm scale-[1.02]"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:scale-[1.01]"
          )}
        >
          {t.icon}
          {showLabels && <span>{t.label}</span>}
        </button>
      ))}
    </div>
  )
}
