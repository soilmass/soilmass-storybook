/**
 * Keyboard Shortcut Component
 *
 * Display keyboard shortcuts with proper styling.
 *
 * Premium patterns:
 * - Inset shadow for pressed/3D look
 * - Subtle gradient background
 * - Spring transition on hover
 * - Glow effect on focus
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Platform detection
const isMac = typeof window !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform)

// Key symbol mappings
const keySymbols: Record<string, string> = {
  // Modifiers
  mod: isMac ? "\u2318" : "Ctrl",
  ctrl: isMac ? "\u2303" : "Ctrl",
  alt: isMac ? "\u2325" : "Alt",
  shift: "\u21E7",
  meta: "\u2318",
  cmd: "\u2318",
  command: "\u2318",
  option: "\u2325",
  control: "\u2303",

  // Special keys
  enter: "\u21B5",
  return: "\u21B5",
  backspace: "\u232B",
  delete: "\u2326",
  escape: "Esc",
  esc: "Esc",
  tab: "\u21E5",
  space: "\u2423",

  // Arrow keys
  up: "\u2191",
  down: "\u2193",
  left: "\u2190",
  right: "\u2192",
  arrowup: "\u2191",
  arrowdown: "\u2193",
  arrowleft: "\u2190",
  arrowright: "\u2192",

  // Other
  pageup: "PgUp",
  pagedown: "PgDn",
  home: "Home",
  end: "End",
}

// Get display text for a key
function getKeyDisplay(key: string): string {
  const lowerKey = key.toLowerCase()
  return keySymbols[lowerKey] || key.toUpperCase()
}

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Key or key combination (e.g., "K", "Mod+K", "Ctrl+Shift+P")
   */
  shortcut?: string
  /**
   * Alternative: array of keys
   */
  keys?: string[]
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
  /**
   * Visual variant
   */
  variant?: "default" | "outline" | "ghost" | "elevated"
}

const sizeClasses = {
  sm: "text-[10px] px-1.5 py-0.5 min-w-[20px]",
  md: "text-xs px-2 py-1 min-w-[24px]",
  lg: "text-sm px-2.5 py-1.5 min-w-[30px]",
}

const variantClasses = {
  default: [
    // Gradient background for depth
    "bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-surface-muted)]",
    "border border-[var(--color-border)]",
    // Inset shadow for pressed/3D effect
    "shadow-[inset_0_-2px_0_var(--color-border),0_1px_2px_rgba(0,0,0,0.1)]",
    // Active state - pressed look
    "active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)]",
    "active:translate-y-px",
  ],
  outline: [
    "border border-[var(--color-border)] bg-transparent",
    "shadow-sm",
  ],
  ghost: [
    "bg-[var(--color-surface-hover)]",
    "shadow-[inset_0_-1px_0_var(--color-border)]",
  ],
  elevated: [
    // More pronounced 3D effect
    "bg-gradient-to-b from-white to-[var(--color-surface-muted)]",
    "border border-[var(--color-border)]",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-2px_0_var(--color-border),0_2px_4px_rgba(0,0,0,0.1)]",
    "dark:from-[var(--color-surface)] dark:to-[var(--color-surface-muted)]",
    // Active state
    "active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]",
    "active:translate-y-0.5",
  ],
}

export function Kbd({
  shortcut,
  keys,
  size = "md",
  variant = "default",
  className,
  children,
  ...props
}: KbdProps) {
  // Parse shortcut string into keys array
  const keyList = React.useMemo(() => {
    if (keys) return keys
    if (shortcut) return shortcut.split("+").map((k) => k.trim())
    if (typeof children === "string") return [children]
    return []
  }, [keys, shortcut, children])

  if (keyList.length === 0 && !children) {
    return null
  }

  const baseClasses = cn(
    "inline-flex items-center justify-center",
    "font-mono font-medium",
    "rounded-[var(--radius-sm)]",
    "text-[var(--color-text-muted)]",
    // Spring transition
    "transition-all duration-[var(--duration-fast)] ease-[var(--ease-spring)]",
    // Hover glow
    "hover:text-[var(--color-text)]",
    "hover:shadow-[0_0_8px_var(--color-primary)]",
    sizeClasses[size],
    variantClasses[variant]
  )

  // Single key
  if (keyList.length === 1) {
    return (
      <kbd
        className={cn(baseClasses, className)}
        {...props}
      >
        {getKeyDisplay(keyList[0])}
      </kbd>
    )
  }

  // Key combination
  return (
    <span className={cn("inline-flex items-center gap-1", className)} {...props}>
      {keyList.map((key, index) => (
        <React.Fragment key={index}>
          <kbd className={baseClasses}>
            {getKeyDisplay(key)}
          </kbd>
          {index < keyList.length - 1 && (
            <span className="text-[var(--color-text-muted)] text-xs opacity-60">+</span>
          )}
        </React.Fragment>
      ))}
    </span>
  )
}

// Keyboard shortcut with description
export interface KeyboardShortcutProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Description of what the shortcut does
   */
  description: string
  /**
   * The shortcut keys
   */
  shortcut: string
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
}

export function KeyboardShortcut({
  description,
  shortcut,
  size = "md",
  className,
  ...props
}: KeyboardShortcutProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4",
        "py-1.5 group",
        "transition-colors duration-[var(--duration-fast)]",
        "hover:bg-[var(--color-surface-hover)] -mx-2 px-2 rounded-[var(--radius-sm)]",
        className
      )}
      {...props}
    >
      <span className="text-sm text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
        {description}
      </span>
      <Kbd shortcut={shortcut} size={size} />
    </div>
  )
}

// Keyboard shortcuts list/group
export interface KeyboardShortcutsListProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Group title
   */
  title?: string
  /**
   * Shortcuts to display
   */
  shortcuts: Array<{
    description: string
    shortcut: string
  }>
}

export function KeyboardShortcutsList({
  title,
  shortcuts,
  className,
  ...props
}: KeyboardShortcutsListProps) {
  return (
    <div className={cn("space-y-1", className)} {...props}>
      {title && (
        <h4 className={cn(
          "text-xs font-medium text-[var(--color-text-muted)]",
          "uppercase tracking-wider mb-3",
          "border-b border-[var(--color-border)] pb-2"
        )}>
          {title}
        </h4>
      )}
      {shortcuts.map((item, index) => (
        <KeyboardShortcut
          key={index}
          description={item.description}
          shortcut={item.shortcut}
        />
      ))}
    </div>
  )
}
