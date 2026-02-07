"use client"

/**
 * Command Palette Component
 *
 * Spotlight-style command search (Cmd+K).
 * Features:
 * - Searchable command list
 * - Keyboard navigation
 * - Sections/groups
 * - Action shortcuts display
 * - Recent commands
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Icons
const SearchIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
)

const SpinnerIcon = () => (
  <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
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

export interface CommandItem {
  /**
   * Unique identifier
   */
  id: string
  /**
   * Display label
   */
  label: string
  /**
   * Optional description
   */
  description?: string
  /**
   * Optional icon
   */
  icon?: React.ReactNode
  /**
   * Keyboard shortcut to display
   */
  shortcut?: string
  /**
   * Group this item belongs to
   */
  group?: string
  /**
   * Action to perform
   */
  onSelect: () => void
  /**
   * Whether this command is disabled
   */
  disabled?: boolean
  /**
   * Keywords for search matching
   */
  keywords?: string[]
}

export interface CommandGroup {
  /**
   * Group identifier
   */
  id: string
  /**
   * Group label
   */
  label: string
}

export interface CommandPaletteProps {
  /**
   * Whether the palette is open
   */
  open: boolean
  /**
   * Callback to close palette
   */
  onClose: () => void
  /**
   * Available commands
   */
  commands: CommandItem[]
  /**
   * Command groups
   */
  groups?: CommandGroup[]
  /**
   * Placeholder text
   */
  placeholder?: string
  /**
   * Loading state
   */
  loading?: boolean
  /**
   * Empty state message
   */
  emptyMessage?: string
  /**
   * Recent command IDs
   */
  recentIds?: string[]
}

export function CommandPalette({
  open,
  onClose,
  commands,
  groups = [],
  placeholder = "Search commands...",
  loading = false,
  emptyMessage = "No commands found",
  recentIds = [],
}: CommandPaletteProps) {
  const [query, setQuery] = React.useState("")
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)

  // Filter and group commands
  const filteredCommands = React.useMemo(() => {
    const lowerQuery = query.toLowerCase()

    return commands.filter((cmd) => {
      if (cmd.disabled) return false
      if (!query) return true

      const matchLabel = cmd.label.toLowerCase().includes(lowerQuery)
      const matchDescription = cmd.description?.toLowerCase().includes(lowerQuery)
      const matchKeywords = cmd.keywords?.some((k) =>
        k.toLowerCase().includes(lowerQuery)
      )

      return matchLabel || matchDescription || matchKeywords
    })
  }, [commands, query])

  // Group commands
  const groupedCommands = React.useMemo(() => {
    const result: { group: CommandGroup | null; items: CommandItem[] }[] = []

    // Add "Recent" group if no query and has recent
    if (!query && recentIds.length > 0) {
      const recentItems = recentIds
        .map((id) => commands.find((c) => c.id === id))
        .filter((c): c is CommandItem => c !== undefined && !c.disabled)
        .slice(0, 5)

      if (recentItems.length > 0) {
        result.push({
          group: { id: "recent", label: "Recent" },
          items: recentItems,
        })
      }
    }

    // Group by groups
    const ungrouped: CommandItem[] = []
    const grouped: Map<string, CommandItem[]> = new Map()

    filteredCommands.forEach((cmd) => {
      // Skip recent items if already shown
      if (!query && recentIds.includes(cmd.id)) return

      if (cmd.group) {
        const existing = grouped.get(cmd.group) || []
        grouped.set(cmd.group, [...existing, cmd])
      } else {
        ungrouped.push(cmd)
      }
    })

    // Add grouped items
    groups.forEach((group) => {
      const items = grouped.get(group.id)
      if (items && items.length > 0) {
        result.push({ group, items })
      }
    })

    // Add ungrouped items
    if (ungrouped.length > 0) {
      result.push({ group: null, items: ungrouped })
    }

    return result
  }, [filteredCommands, groups, query, recentIds, commands])

  // Flat list of items for navigation
  const flatItems = React.useMemo(() => {
    return groupedCommands.flatMap((g) => g.items)
  }, [groupedCommands])

  // Reset on open
  React.useEffect(() => {
    if (open) {
      setQuery("")
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  // Reset selection when results change
  React.useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev < flatItems.length - 1 ? prev + 1 : prev
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0))
        break
      case "Enter":
        e.preventDefault()
        if (flatItems[selectedIndex]) {
          flatItems[selectedIndex].onSelect()
          onClose()
        }
        break
      case "Escape":
        e.preventDefault()
        onClose()
        break
    }
  }

  // Scroll selected item into view
  React.useEffect(() => {
    if (listRef.current && flatItems[selectedIndex]) {
      const selectedId = flatItems[selectedIndex].id
      const element = listRef.current.querySelector(`[data-command-id="${selectedId}"]`)
      element?.scrollIntoView({ block: "nearest" })
    }
  }, [selectedIndex, flatItems])

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      onClick={handleBackdropClick}
    >
      {/* Backdrop - glass effect */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-[var(--blur-sm)] animate-in fade-in-0 ease-[var(--ease-spring)]"
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className={cn(
          "relative w-full max-w-lg mx-4",
          "rounded-[var(--radius-xl)]",
          "bg-[var(--color-surface)]",
          "border border-[var(--color-border-subtle)]",
          "shadow-[var(--shadow-2xl)]",
          "animate-in fade-in-0 zoom-in-95 duration-150 ease-[var(--ease-spring)]",
          "overflow-hidden"
        )}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-border)]">
          <span className="text-[var(--color-text-muted)]">
            {loading ? <SpinnerIcon /> : <SearchIcon />}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn(
              "flex-1 bg-transparent",
              "text-[var(--color-text)] text-base",
              "placeholder:text-[var(--color-text-muted)]",
              "outline-none border-none"
            )}
          />
          <kbd
            className={cn(
              "hidden sm:inline-flex items-center justify-center",
              "h-5 px-1.5 text-[10px] font-medium",
              "rounded border border-[var(--color-border)]",
              "bg-[var(--color-surface-muted)]",
              "text-[var(--color-text-muted)]"
            )}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div
          ref={listRef}
          className="max-h-[300px] overflow-y-auto py-2"
          role="listbox"
        >
          {groupedCommands.length === 0 ? (
            <div className="py-6 text-center text-sm text-[var(--color-text-muted)]">
              {emptyMessage}
            </div>
          ) : (
            groupedCommands.map(({ group, items }, groupIndex) => (
              <div key={group?.id || `ungrouped-${groupIndex}`}>
                {group && (
                  <div className="px-3 py-1.5 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                    {group.label}
                  </div>
                )}
                {items.map((item) => {
                  const isSelected =
                    flatItems[selectedIndex]?.id === item.id

                  return (
                    <div
                      key={item.id}
                      data-command-id={item.id}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        item.onSelect()
                        onClose()
                      }}
                      onMouseEnter={() => {
                        const index = flatItems.findIndex((i) => i.id === item.id)
                        if (index !== -1) setSelectedIndex(index)
                      }}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 mx-2",
                        "rounded-[var(--radius-md)]",
                        "cursor-pointer transition-colors",
                        isSelected
                          ? "bg-[var(--color-primary)] text-white"
                          : "hover:bg-[var(--color-surface-hover)]"
                      )}
                    >
                      {item.icon && (
                        <span
                          className={cn(
                            "flex-shrink-0",
                            isSelected
                              ? "text-white/80"
                              : "text-[var(--color-text-muted)]"
                          )}
                        >
                          {item.icon}
                        </span>
                      )}
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            "text-sm font-medium truncate",
                            isSelected ? "text-white" : "text-[var(--color-text)]"
                          )}
                        >
                          {item.label}
                        </p>
                        {item.description && (
                          <p
                            className={cn(
                              "text-xs truncate",
                              isSelected
                                ? "text-white/70"
                                : "text-[var(--color-text-muted)]"
                            )}
                          >
                            {item.description}
                          </p>
                        )}
                      </div>
                      {item.shortcut && (
                        <kbd
                          className={cn(
                            "flex-shrink-0 text-xs font-mono",
                            isSelected
                              ? "text-white/70"
                              : "text-[var(--color-text-muted)]"
                          )}
                        >
                          {item.shortcut}
                        </kbd>
                      )}
                    </div>
                  )
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          className={cn(
            "flex items-center justify-between gap-4 px-4 py-2",
            "border-t border-[var(--color-border)]",
            "text-xs text-[var(--color-text-muted)]"
          )}
        >
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
                ↑
              </kbd>
              <kbd className="px-1 py-0.5 rounded border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
                ↓
              </kbd>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
                ↵
              </kbd>
              <span>to select</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook to manage command palette state
export function useCommandPalette() {
  const [open, setOpen] = React.useState(false)

  // Listen for Cmd+K / Ctrl+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return {
    open,
    setOpen,
    toggle: () => setOpen((prev) => !prev),
    close: () => setOpen(false),
  }
}
