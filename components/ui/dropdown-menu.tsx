"use client"

/**
 * Dropdown Menu Component
 *
 * Action menus for contextual options.
 * Features:
 * - Trigger element
 * - Menu items with icons
 * - Separators
 * - Keyboard navigation
 * - Disabled items
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Menu Context
interface DropdownMenuContextValue {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  activeIndex: number
  setActiveIndex: (index: number) => void
  menuRef: React.RefObject<HTMLDivElement | null>
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null)

function useDropdownMenu() {
  const context = React.useContext(DropdownMenuContext)
  if (!context) {
    throw new Error("DropdownMenu components must be used within a DropdownMenu")
  }
  return context
}

// Root component
export interface DropdownMenuProps {
  children: React.ReactNode
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState(-1)
  const menuRef = React.useRef<HTMLDivElement>(null)

  return (
    <DropdownMenuContext.Provider
      value={{ isOpen, setIsOpen, activeIndex, setActiveIndex, menuRef }}
    >
      <div className="relative inline-block">{children}</div>
    </DropdownMenuContext.Provider>
  )
}

// Trigger
export interface DropdownMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export function DropdownMenuTrigger({
  asChild,
  children,
  className,
  ...props
}: DropdownMenuTriggerProps) {
  const { isOpen, setIsOpen, setActiveIndex } = useDropdownMenu()

  const handleClick = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setActiveIndex(-1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setIsOpen(true)
      setActiveIndex(0)
    }
  }

  return (
    <button
      type="button"
      aria-haspopup="menu"
      aria-expanded={isOpen}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={className}
      {...props}
    >
      {children}
    </button>
  )
}

// Content
export interface DropdownMenuContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end"
  sideOffset?: number
}

export function DropdownMenuContent({
  align = "start",
  sideOffset = 4,
  children,
  className,
  ...props
}: DropdownMenuContentProps) {
  const { isOpen, setIsOpen, activeIndex, setActiveIndex, menuRef } = useDropdownMenu()
  const items = React.useRef<HTMLElement[]>([])

  // Close on outside click
  React.useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, setIsOpen, menuRef])

  // Keyboard navigation
  React.useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const itemCount = items.current.length

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setActiveIndex((prev) => (prev + 1) % itemCount)
          break
        case "ArrowUp":
          e.preventDefault()
          setActiveIndex((prev) => (prev - 1 + itemCount) % itemCount)
          break
        case "Home":
          e.preventDefault()
          setActiveIndex(0)
          break
        case "End":
          e.preventDefault()
          setActiveIndex(itemCount - 1)
          break
        case "Escape":
          setIsOpen(false)
          break
        case "Enter":
        case " ":
          e.preventDefault()
          if (activeIndex >= 0) {
            items.current[activeIndex]?.click()
          }
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, activeIndex, setActiveIndex, setIsOpen])

  // Focus active item
  React.useEffect(() => {
    if (isOpen && activeIndex >= 0 && items.current[activeIndex]) {
      items.current[activeIndex].focus()
    }
  }, [isOpen, activeIndex])

  if (!isOpen) return null

  const alignClass = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  }

  return (
    <div
      ref={menuRef as React.RefObject<HTMLDivElement>}
      role="menu"
      aria-orientation="vertical"
      className={cn(
        "absolute z-50 min-w-[8rem] overflow-hidden",
        "rounded-[var(--radius-md)]",
        "border border-[var(--color-border-subtle)]",
        "bg-[var(--color-surface)]",
        "shadow-[var(--shadow-dropdown)]",
        "p-1",
        "animate-in fade-in-0 zoom-in-95 duration-150 ease-[var(--ease-spring)]",
        alignClass[align],
        className
      )}
      style={{ marginTop: sideOffset }}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === DropdownMenuItem) {
          return React.cloneElement(child as React.ReactElement<{ _index?: number; _ref?: (el: HTMLElement | null) => void }>, {
            _index: index,
            _ref: (el: HTMLElement | null) => {
              if (el) items.current[index] = el
            },
          })
        }
        return child
      })}
    </div>
  )
}

// Item
export interface DropdownMenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  shortcut?: string
  destructive?: boolean
  _index?: number
  _ref?: (el: HTMLElement | null) => void
}

export function DropdownMenuItem({
  icon,
  shortcut,
  destructive,
  disabled,
  children,
  className,
  onClick,
  _index,
  _ref,
  ...props
}: DropdownMenuItemProps) {
  const { setIsOpen, activeIndex } = useDropdownMenu()
  const isActive = _index === activeIndex

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onClick?.(e)
      setIsOpen(false)
    }
  }

  return (
    <button
      ref={_ref}
      type="button"
      role="menuitem"
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center",
        "rounded-[var(--radius-sm)] px-2 py-1.5 text-sm outline-none",
        "transition-colors",
        isActive && "bg-[var(--color-surface-hover)]",
        destructive
          ? "text-[var(--color-error)] focus:bg-[var(--color-error)]/10"
          : "text-[var(--color-text)]",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {icon && <span className="mr-2 h-4 w-4 flex-shrink-0">{icon}</span>}
      <span className="flex-1">{children}</span>
      {shortcut && (
        <span className="ml-auto text-xs text-[var(--color-text-muted)]">
          {shortcut}
        </span>
      )}
    </button>
  )
}

// Separator
export function DropdownMenuSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="separator"
      className={cn("-mx-1 my-1 h-px bg-[var(--color-border)]", className)}
      {...props}
    />
  )
}

// Label (non-interactive)
export function DropdownMenuLabel({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "px-2 py-1.5 text-xs font-medium text-[var(--color-text-muted)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Group
export function DropdownMenuGroup({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div role="group" {...props}>
      {children}
    </div>
  )
}
