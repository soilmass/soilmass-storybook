"use client"

/**
 * Tabs Component
 * Domain 66: Tabs
 *
 * Tab navigation for switching between related content panels.
 * Features:
 * - ARIA tablist/tab/tabpanel roles (TAB1)
 * - Arrow key navigation (TAB2)
 * - Single-stop navigation (TAB3)
 * - Panel association (TAB4)
 * - Underline, pills, and vertical variants
 * - Premium design: active glow, shadow lift, spring transitions
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Tabs Context
interface TabsContextValue {
  activeTab: string
  setActiveTab: (id: string) => void
  variant: "underline" | "pills"
  orientation: "horizontal" | "vertical"
  tabIds: string[]
  registerTab: (id: string) => void
  unregisterTab: (id: string) => void
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

function useTabs() {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider")
  }
  return context
}

// Main Tabs Component
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Default active tab
   */
  defaultValue?: string
  /**
   * Controlled active tab
   */
  value?: string
  /**
   * Callback when active tab changes
   */
  onValueChange?: (value: string) => void
  /**
   * Visual variant
   */
  variant?: "underline" | "pills"
  /**
   * Orientation
   */
  orientation?: "horizontal" | "vertical"
}

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  variant = "underline",
  orientation = "horizontal",
  className,
  children,
  ...props
}: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "")
  const [tabIds, setTabIds] = React.useState<string[]>([])

  const activeTab = value !== undefined ? value : internalValue

  const setActiveTab = React.useCallback(
    (id: string) => {
      if (value === undefined) {
        setInternalValue(id)
      }
      onValueChange?.(id)
    },
    [value, onValueChange]
  )

  const registerTab = React.useCallback((id: string) => {
    setTabIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const unregisterTab = React.useCallback((id: string) => {
    setTabIds((prev) => prev.filter((t) => t !== id))
  }, [])

  return (
    <TabsContext.Provider
      value={{
        activeTab,
        setActiveTab,
        variant,
        orientation,
        tabIds,
        registerTab,
        unregisterTab,
      }}
    >
      <div
        className={cn(
          "flex",
          orientation === "vertical" ? "flex-row" : "flex-col",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  )
}

// Tab List (TAB1: role="tablist")
export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Accessible label for the tab list
   */
  "aria-label"?: string
}

export function TabList({
  className,
  children,
  ...props
}: TabListProps) {
  const { variant, orientation, tabIds, activeTab, setActiveTab } = useTabs()
  const listRef = React.useRef<HTMLDivElement>(null)

  // Arrow key navigation (TAB2)
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      const currentIndex = tabIds.indexOf(activeTab)
      let newIndex = currentIndex

      if (orientation === "horizontal") {
        if (e.key === "ArrowRight") {
          e.preventDefault()
          newIndex = (currentIndex + 1) % tabIds.length
        } else if (e.key === "ArrowLeft") {
          e.preventDefault()
          newIndex = (currentIndex - 1 + tabIds.length) % tabIds.length
        }
      } else {
        if (e.key === "ArrowDown") {
          e.preventDefault()
          newIndex = (currentIndex + 1) % tabIds.length
        } else if (e.key === "ArrowUp") {
          e.preventDefault()
          newIndex = (currentIndex - 1 + tabIds.length) % tabIds.length
        }
      }

      if (e.key === "Home") {
        e.preventDefault()
        newIndex = 0
      } else if (e.key === "End") {
        e.preventDefault()
        newIndex = tabIds.length - 1
      }

      if (newIndex !== currentIndex && tabIds[newIndex]) {
        setActiveTab(tabIds[newIndex])
        // Focus the new tab
        const tabElement = listRef.current?.querySelector(
          `[data-tab-id="${tabIds[newIndex]}"]`
        ) as HTMLButtonElement
        tabElement?.focus()
      }
    },
    [tabIds, activeTab, setActiveTab, orientation]
  )

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-orientation={orientation}
      onKeyDown={handleKeyDown}
      className={cn(
        "flex",
        orientation === "vertical" ? "flex-col" : "flex-row",
        // Underline variant
        variant === "underline" && [
          "gap-1",
          orientation === "horizontal"
            ? "border-b border-[var(--color-border)]"
            : "border-r border-[var(--color-border)]",
        ],
        // Pills variant with premium surface
        variant === "pills" && [
          "gap-1 p-1",
          "bg-[var(--color-surface-alt)] rounded-[var(--radius-lg)]",
          "shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]",
        ],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Individual Tab (TAB1: role="tab")
export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Unique tab value
   */
  value: string
  /**
   * Icon to display before label
   */
  icon?: React.ReactNode
  /**
   * Badge to display after label
   */
  badge?: React.ReactNode
}

export function Tab({
  value,
  icon,
  badge,
  className,
  children,
  disabled,
  ...props
}: TabProps) {
  const { activeTab, setActiveTab, variant, orientation, registerTab, unregisterTab } =
    useTabs()

  const isActive = activeTab === value

  // Register/unregister tab
  React.useEffect(() => {
    registerTab(value)
    return () => unregisterTab(value)
  }, [value, registerTab, unregisterTab])

  return (
    <button
      type="button"
      role="tab"
      id={`tab-${value}`}
      data-tab-id={value}
      aria-selected={isActive}
      aria-controls={`panel-${value}`}
      // TAB3: Only active tab in tab order
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={() => !disabled && setActiveTab(value)}
      className={cn(
        "relative flex items-center gap-2",
        "text-sm font-medium",
        // Premium spring transition
        "transition-all duration-300 ease-[var(--ease-spring)]",
        // Focus ring with offset
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2",
        "focus-visible:ring-offset-[var(--color-surface)]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        // Underline variant
        variant === "underline" && [
          "px-4 py-2",
          "border-b-2 border-transparent",
          orientation === "horizontal" ? "-mb-px" : "-mr-px border-r-2 border-b-0",
          "text-[var(--color-text-muted)]",
          // Hover with subtle background
          "hover:text-[var(--color-text)]",
          "hover:bg-[var(--color-surface-hover)]/50",
          "rounded-t-[var(--radius-md)]",
          isActive && [
            "text-[var(--color-primary)]",
            orientation === "horizontal"
              ? "border-b-[var(--color-primary)]"
              : "border-r-[var(--color-primary)]",
            // Active indicator shadow glow
            "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5",
            "after:bg-[var(--color-primary)]",
            "after:shadow-[0_0_8px_var(--color-primary)]",
          ],
        ],
        // Pills variant
        variant === "pills" && [
          "px-3 py-1.5",
          "rounded-[var(--radius-md)]",
          "text-[var(--color-text-muted)]",
          // Hover with shadow lift
          "hover:text-[var(--color-text)]",
          "hover:bg-[var(--color-surface-hover)]",
          "hover:shadow-sm",
          isActive && [
            "bg-[var(--color-surface)] text-[var(--color-text)]",
            // Premium shadow with subtle glow
            "shadow-[0_1px_3px_rgba(0,0,0,0.1),0_0_0_1px_var(--color-primary)/10,0_0_12px_-4px_var(--color-primary)/20]",
          ],
        ],
        className
      )}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {badge && <span className="flex-shrink-0">{badge}</span>}
    </button>
  )
}

// Tab Panel (TAB1: role="tabpanel", TAB4: aria-labelledby)
export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tab value this panel corresponds to
   */
  value: string
  /**
   * Force render even when not active
   */
  forceMount?: boolean
}

export function TabPanel({
  value,
  forceMount,
  className,
  children,
  ...props
}: TabPanelProps) {
  const { activeTab } = useTabs()
  const isActive = activeTab === value

  if (!isActive && !forceMount) {
    return null
  }

  return (
    <div
      role="tabpanel"
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      hidden={!isActive}
      tabIndex={0}
      className={cn(
        "py-4",
        // Focus ring with offset
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2",
        "focus-visible:ring-offset-[var(--color-surface)]",
        // Smooth fade-in animation
        "animate-in fade-in-0 duration-300 ease-[var(--ease-spring)]",
        !isActive && "hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
