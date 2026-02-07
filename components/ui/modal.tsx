"use client"

/**
 * Modal & Dialog Component
 * Domain 64: Modals & Dialogs
 *
 * Overlay dialog components for focused interactions.
 * Features:
 * - Focus trapping (MOD1)
 * - Escape key dismissal (MOD2)
 * - Native dialog element (MOD3)
 * - Proper ARIA labeling (MOD4)
 * - Size variants
 * - Animation
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

// Close icon
const CloseIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
)

// Modal sizes
const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
  full: "max-w-[calc(100vw-2rem)]",
}

// Modal Context
interface ModalContextValue {
  titleId: string
  descriptionId: string
  onClose: () => void
}

const ModalContext = React.createContext<ModalContextValue | null>(null)

function useModal() {
  const context = React.useContext(ModalContext)
  if (!context) {
    throw new Error("Modal components must be used within a Modal")
  }
  return context
}

// Main Modal Component
export interface ModalProps {
  /**
   * Whether the modal is open
   */
  open: boolean
  /**
   * Callback when modal should close
   */
  onClose: () => void
  /**
   * Modal size
   */
  size?: keyof typeof sizeClasses
  /**
   * Whether clicking backdrop closes modal
   */
  closeOnBackdropClick?: boolean
  /**
   * Whether to show close button
   */
  showCloseButton?: boolean
  /**
   * Modal content
   */
  children: React.ReactNode
  /**
   * Additional class names for modal content
   */
  className?: string
}

export function Modal({
  open,
  onClose,
  size = "md",
  closeOnBackdropClick = true,
  showCloseButton = true,
  children,
  className,
}: ModalProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null)
  const previousFocusRef = React.useRef<HTMLElement | null>(null)
  const titleId = React.useId()
  const descriptionId = React.useId()

  // Handle open/close
  React.useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      // Store previously focused element
      previousFocusRef.current = document.activeElement as HTMLElement

      // Open dialog
      dialog.showModal()

      // Focus first focusable element
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      focusable[0]?.focus()

      // Prevent body scroll (MOD5 related - lock background)
      document.body.style.overflow = "hidden"
    } else {
      dialog.close()
      document.body.style.overflow = ""

      // Restore focus
      previousFocusRef.current?.focus()
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // Handle Escape key (MOD2)
  React.useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, onClose])

  // Focus trap (MOD1)
  React.useEffect(() => {
    if (!open) return

    const dialog = dialogRef.current
    if (!dialog) return

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      const focusable = dialog.querySelectorAll<HTMLElement>(
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

    dialog.addEventListener("keydown", handleFocusTrap)
    return () => dialog.removeEventListener("keydown", handleFocusTrap)
  }, [open])

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!open) return null

  return (
    <ModalContext.Provider value={{ titleId, descriptionId, onClose }}>
      {/* MOD3: Native dialog element */}
      <dialog
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={cn(
          // Reset dialog styles
          "fixed inset-0 m-0 p-0 max-w-none max-h-none",
          "w-full h-full",
          "bg-transparent border-0",
          // Backdrop - glass effect with blur
          "backdrop:bg-black/50 backdrop:backdrop-blur-[var(--blur-sm)]",
          // Animation
          "animate-in fade-in duration-200 ease-[var(--ease-spring)]"
        )}
        onClick={handleBackdropClick}
      >
        {/* Modal content */}
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className={cn(
              "relative w-full",
              sizeClasses[size],
              "bg-[var(--color-surface)] rounded-[var(--radius-lg)]",
              "border border-[var(--color-border-subtle)]",
              "shadow-[var(--shadow-2xl)]",
              "animate-in zoom-in-95 duration-200 ease-[var(--ease-spring)]",
              className
            )}
            onClick={(e) => e.stopPropagation()}
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
                aria-label="Close dialog"
              >
                <CloseIcon />
              </button>
            )}
            {children}
          </div>
        </div>
      </dialog>
    </ModalContext.Provider>
  )
}

// Modal Header
export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ModalHeader({ className, children, ...props }: ModalHeaderProps) {
  return (
    <div
      className={cn(
        "px-6 py-4",
        "border-b border-[var(--color-border)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Modal Title (MOD4: aria-labelledby)
export interface ModalTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4"
}

export function ModalTitle({
  as: Heading = "h2",
  className,
  children,
  ...props
}: ModalTitleProps) {
  const { titleId } = useModal()

  return (
    <Heading
      id={titleId}
      className={cn(
        "text-lg font-semibold text-[var(--color-text)]",
        className
      )}
      {...props}
    >
      {children}
    </Heading>
  )
}

// Modal Description
export interface ModalDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function ModalDescription({
  className,
  children,
  ...props
}: ModalDescriptionProps) {
  const { descriptionId } = useModal()

  return (
    <p
      id={descriptionId}
      className={cn("text-sm text-[var(--color-text-muted)] mt-1", className)}
      {...props}
    >
      {children}
    </p>
  )
}

// Modal Body
export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ModalBody({ className, children, ...props }: ModalBodyProps) {
  return (
    <div
      className={cn("px-6 py-4 overflow-y-auto", className)}
      {...props}
    >
      {children}
    </div>
  )
}

// Modal Footer
export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ModalFooter({ className, children, ...props }: ModalFooterProps) {
  return (
    <div
      className={cn(
        "px-6 py-4",
        "border-t border-[var(--color-border)]",
        "flex justify-end gap-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Confirmation Dialog Helper
export interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: "default" | "destructive"
  loading?: boolean
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  loading,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} size="sm" showCloseButton={false}>
      <ModalHeader>
        <ModalTitle>{title}</ModalTitle>
        {description && <ModalDescription>{description}</ModalDescription>}
      </ModalHeader>
      <ModalFooter>
        <Button variant="outline" onClick={onClose} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button
          variant={variant === "destructive" ? "destructive" : "primary"}
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? "Loading..." : confirmLabel}
        </Button>
      </ModalFooter>
    </Modal>
  )
}
