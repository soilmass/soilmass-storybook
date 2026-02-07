"use client"

/**
 * Drawer/Sheet Component
 *
 * Slide-in panel from edge of screen.
 * Features:
 * - Multiple positions (left, right, bottom)
 * - Backdrop overlay
 * - Focus trapping
 * - Escape to close
 * - Size variants
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Close icon
const CloseIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export type DrawerPosition = "left" | "right" | "bottom"
export type DrawerSize = "sm" | "md" | "lg" | "xl" | "full"

// Drawer Context
interface DrawerContextValue {
  titleId: string
  descriptionId: string
  onClose: () => void
}

const DrawerContext = React.createContext<DrawerContextValue | null>(null)

function useDrawer() {
  const context = React.useContext(DrawerContext)
  if (!context) {
    throw new Error("Drawer components must be used within a Drawer")
  }
  return context
}

// Size classes by position
const sizeClasses: Record<DrawerPosition, Record<DrawerSize, string>> = {
  left: {
    sm: "w-64",
    md: "w-80",
    lg: "w-96",
    xl: "w-[32rem]",
    full: "w-screen",
  },
  right: {
    sm: "w-64",
    md: "w-80",
    lg: "w-96",
    xl: "w-[32rem]",
    full: "w-screen",
  },
  bottom: {
    sm: "h-1/4",
    md: "h-1/3",
    lg: "h-1/2",
    xl: "h-2/3",
    full: "h-screen",
  },
}

// Position classes
const positionClasses: Record<DrawerPosition, { container: string; panel: string; translate: string }> = {
  left: {
    container: "inset-y-0 left-0",
    panel: "h-full",
    translate: "-translate-x-full",
  },
  right: {
    container: "inset-y-0 right-0",
    panel: "h-full",
    translate: "translate-x-full",
  },
  bottom: {
    container: "inset-x-0 bottom-0",
    panel: "w-full",
    translate: "translate-y-full",
  },
}

export interface DrawerProps {
  /**
   * Whether drawer is open
   */
  open: boolean
  /**
   * Callback to close drawer
   */
  onClose: () => void
  /**
   * Position of drawer
   */
  position?: DrawerPosition
  /**
   * Size of drawer
   */
  size?: DrawerSize
  /**
   * Close when clicking backdrop
   */
  closeOnBackdropClick?: boolean
  /**
   * Show close button
   */
  showCloseButton?: boolean
  /**
   * Drawer content
   */
  children: React.ReactNode
  /**
   * Additional class for drawer panel
   */
  className?: string
}

export function Drawer({
  open,
  onClose,
  position = "right",
  size = "md",
  closeOnBackdropClick = true,
  showCloseButton = true,
  children,
  className,
}: DrawerProps) {
  const titleId = React.useId()
  const descriptionId = React.useId()
  const panelRef = React.useRef<HTMLDivElement>(null)
  const previousFocusRef = React.useRef<HTMLElement | null>(null)

  const posConfig = positionClasses[position]
  const sizeClass = sizeClasses[position][size]

  // Handle open/close
  React.useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement
      document.body.style.overflow = "hidden"

      // Focus first focusable element
      requestAnimationFrame(() => {
        const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        focusable?.[0]?.focus()
      })
    } else {
      document.body.style.overflow = ""
      previousFocusRef.current?.focus()
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // Escape key
  React.useEffect(() => {
    if (!open) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [open, onClose])

  // Focus trap
  React.useEffect(() => {
    if (!open) return

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !panelRef.current) return

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusable[0]
      const lastElement = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    document.addEventListener("keydown", handleTab)
    return () => document.removeEventListener("keydown", handleTab)
  }, [open])

  if (!open) return null

  return (
    <DrawerContext.Provider value={{ titleId, descriptionId, onClose }}>
      <div className="fixed inset-0 z-50">
        {/* Backdrop */}
        <div
          className={cn(
            "fixed inset-0 bg-black/50 backdrop-blur-[var(--blur-sm)]",
            "animate-in fade-in-0 duration-200 ease-[var(--ease-spring)]"
          )}
          onClick={closeOnBackdropClick ? onClose : undefined}
          aria-hidden="true"
        />

        {/* Drawer panel */}
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          className={cn(
            "fixed",
            posConfig.container,
            posConfig.panel,
            sizeClass,
            "bg-[var(--color-surface)]",
            "border border-[var(--color-border-subtle)]",
            "shadow-[var(--shadow-float)]",
            "flex flex-col",
            "animate-in duration-300 ease-[var(--ease-spring)]",
            position === "left" && "slide-in-from-left",
            position === "right" && "slide-in-from-right",
            position === "bottom" && "slide-in-from-bottom rounded-t-[var(--radius-xl)]",
            className
          )}
        >
          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              className={cn(
                "absolute top-4 right-4 z-10",
                "p-2 -m-2 rounded-[var(--radius-md)]",
                "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
                "hover:bg-[var(--color-surface-hover)]",
                "transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)]"
              )}
              aria-label="Close drawer"
            >
              <CloseIcon />
            </button>
          )}
          {children}
        </div>
      </div>
    </DrawerContext.Provider>
  )
}

// Drawer Header
export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DrawerHeader({ className, children, ...props }: DrawerHeaderProps) {
  return (
    <div
      className={cn(
        "px-6 py-4",
        "border-b border-[var(--color-border)]",
        "flex-shrink-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Drawer Title
export interface DrawerTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function DrawerTitle({ className, children, ...props }: DrawerTitleProps) {
  const { titleId } = useDrawer()

  return (
    <h2
      id={titleId}
      className={cn(
        "text-lg font-semibold text-[var(--color-text)]",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

// Drawer Description
export interface DrawerDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function DrawerDescription({ className, children, ...props }: DrawerDescriptionProps) {
  const { descriptionId } = useDrawer()

  return (
    <p
      id={descriptionId}
      className={cn(
        "text-sm text-[var(--color-text-muted)] mt-1",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

// Drawer Body
export interface DrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DrawerBody({ className, children, ...props }: DrawerBodyProps) {
  return (
    <div
      className={cn("flex-1 overflow-y-auto px-6 py-4", className)}
      {...props}
    >
      {children}
    </div>
  )
}

// Drawer Footer
export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DrawerFooter({ className, children, ...props }: DrawerFooterProps) {
  return (
    <div
      className={cn(
        "px-6 py-4",
        "border-t border-[var(--color-border)]",
        "flex-shrink-0",
        "flex justify-end gap-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
