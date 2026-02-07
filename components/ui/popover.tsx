"use client"

/**
 * Popover Component
 *
 * Floating content panels for additional information or controls.
 * Features:
 * - Multiple positioning options
 * - Arrow indicator
 * - Focus management
 * - Click outside to close
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export type PopoverPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "right"
  | "right-start"
  | "right-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"

// Popover Context
interface PopoverContextValue {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement | null>
  contentRef: React.RefObject<HTMLDivElement | null>
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null)

function usePopover() {
  const context = React.useContext(PopoverContext)
  if (!context) {
    throw new Error("Popover components must be used within a Popover")
  }
  return context
}

// Root component
export interface PopoverProps {
  /**
   * Controlled open state
   */
  open?: boolean
  /**
   * Default open state
   */
  defaultOpen?: boolean
  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function Popover({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const triggerRef = React.useRef<HTMLElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)

  const isOpen = open !== undefined ? open : internalOpen

  const setIsOpen = React.useCallback(
    (newOpen: boolean) => {
      if (open === undefined) {
        setInternalOpen(newOpen)
      }
      onOpenChange?.(newOpen)
    },
    [open, onOpenChange]
  )

  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen, triggerRef, contentRef }}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  )
}

// Trigger
export interface PopoverTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ asChild, children, onClick, ...props }, forwardedRef) => {
    const { isOpen, setIsOpen, triggerRef } = usePopover()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsOpen(!isOpen)
      onClick?.(e)
    }

    // Combine refs
    const ref = React.useCallback(
      (node: HTMLButtonElement) => {
        (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node
        if (typeof forwardedRef === "function") {
          forwardedRef(node)
        } else if (forwardedRef) {
          forwardedRef.current = node
        }
      },
      [triggerRef, forwardedRef]
    )

    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    )
  }
)

PopoverTrigger.displayName = "PopoverTrigger"

// Content
export interface PopoverContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Placement relative to trigger
   */
  placement?: PopoverPlacement
  /**
   * Offset from trigger
   */
  sideOffset?: number
  /**
   * Show arrow
   */
  showArrow?: boolean
}

const placementStyles: Record<PopoverPlacement, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  "top-start": "bottom-full left-0 mb-2",
  "top-end": "bottom-full right-0 mb-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
  "right-start": "left-full top-0 ml-2",
  "right-end": "left-full bottom-0 ml-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  "bottom-start": "top-full left-0 mt-2",
  "bottom-end": "top-full right-0 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  "left-start": "right-full top-0 mr-2",
  "left-end": "right-full bottom-0 mr-2",
}

export function PopoverContent({
  placement = "bottom",
  sideOffset = 4,
  showArrow = false,
  children,
  className,
  ...props
}: PopoverContentProps) {
  const { isOpen, setIsOpen, triggerRef, contentRef } = usePopover()

  // Close on outside click
  React.useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        contentRef.current &&
        !contentRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, setIsOpen, contentRef, triggerRef])

  // Close on Escape
  React.useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, setIsOpen, triggerRef])

  // Focus first focusable element
  React.useEffect(() => {
    if (isOpen && contentRef.current) {
      const focusable = contentRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      focusable[0]?.focus()
    }
  }, [isOpen, contentRef])

  if (!isOpen) return null

  return (
    <div
      ref={contentRef as React.RefObject<HTMLDivElement>}
      role="dialog"
      aria-modal="false"
      className={cn(
        "absolute z-50",
        "min-w-[8rem] rounded-[var(--radius-lg)]",
        "border border-[var(--color-border-subtle)]",
        "bg-[var(--color-surface)]",
        "shadow-[var(--shadow-popover)] p-4",
        "animate-in fade-in-0 zoom-in-95 duration-150 ease-[var(--ease-spring)]",
        placementStyles[placement],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Close button
export interface PopoverCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function PopoverClose({
  children,
  onClick,
  ...props
}: PopoverCloseProps) {
  const { setIsOpen } = usePopover()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen(false)
    onClick?.(e)
  }

  return (
    <button type="button" onClick={handleClick} {...props}>
      {children || "Close"}
    </button>
  )
}
