"use client"

/**
 * Toast & Notification Component
 * Domain 80: Toast & Notification
 *
 * Toast notifications with severity levels, auto-dismiss, and actions.
 *
 * Premium patterns:
 * - Spring slide-in animation
 * - Colored shadows per severity variant
 * - Smooth dismiss animation with scale
 * - Progress bar for auto-dismiss
 * - Hover pause on timer
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Toast severity types
export type ToastSeverity = "info" | "success" | "warning" | "error"

// Toast position
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

// Individual toast data
export interface ToastData {
  id: string
  title?: string
  message: string
  severity?: ToastSeverity
  duration?: number // ms, 0 = no auto-dismiss
  action?: {
    label: string
    onClick: () => void
  }
  onDismiss?: () => void
}

// Severity-based styles including colored shadows
const severityStyles: Record<ToastSeverity, { border: string; shadow: string; icon: string }> = {
  info: {
    border: "border-l-[var(--color-info)]",
    shadow: "shadow-[0_4px_20px_-4px_var(--color-info)]",
    icon: "text-[var(--color-info)]",
  },
  success: {
    border: "border-l-[var(--color-success)]",
    shadow: "shadow-[0_4px_20px_-4px_var(--color-success)]",
    icon: "text-[var(--color-success)]",
  },
  warning: {
    border: "border-l-[var(--color-warning)]",
    shadow: "shadow-[0_4px_20px_-4px_var(--color-warning)]",
    icon: "text-[var(--color-warning)]",
  },
  error: {
    border: "border-l-[var(--color-error)]",
    shadow: "shadow-[0_4px_20px_-4px_var(--color-error)]",
    icon: "text-[var(--color-error)]",
  },
}

// Icons for each severity
const SeverityIcon = ({ severity }: { severity: ToastSeverity }) => {
  const iconClasses = cn("h-5 w-5 flex-shrink-0", severityStyles[severity].icon)

  switch (severity) {
    case "success":
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case "error":
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case "warning":
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    default: // info
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
  }
}

// Close button
const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex-shrink-0 rounded-[var(--radius-sm)] p-1",
      "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
      "hover:bg-[var(--color-surface-hover)]",
      "transition-all duration-[var(--duration-fast)] ease-[var(--ease-spring)]",
      "hover:scale-110",
      "focus:outline-2 focus:outline-offset-1 focus:outline-[var(--color-focus)]"
    )}
    aria-label="Dismiss notification"
  >
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
)

// Progress bar component
const ProgressBar = ({ duration, isPaused }: { duration: number; isPaused: boolean }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--color-surface-muted)] overflow-hidden rounded-b-[var(--radius-md)]">
      <div
        className={cn(
          "h-full bg-current opacity-30",
          "origin-left",
          isPaused ? "animate-none" : "animate-[shrink_linear_forwards]"
        )}
        style={{
          animationDuration: `${duration}ms`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      />
    </div>
  )
}

// Single Toast Component
export interface ToastProps extends ToastData {
  onClose: () => void
}

export function Toast({
  title,
  message,
  severity = "info",
  duration = 5000,
  action,
  onClose,
  onDismiss,
}: ToastProps) {
  const [isExiting, setIsExiting] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const remainingRef = React.useRef(duration)
  const startTimeRef = React.useRef(Date.now())

  // Handle close with animation
  const handleClose = React.useCallback(() => {
    setIsExiting(true)
    setTimeout(() => {
      onClose()
      onDismiss?.()
    }, 300) // Match animation duration
  }, [onClose, onDismiss])

  // Pause timer on hover
  const pauseTimer = React.useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      remainingRef.current -= Date.now() - startTimeRef.current
    }
    setIsHovered(true)
  }, [])

  // Resume timer on mouse leave
  const resumeTimer = React.useCallback(() => {
    setIsHovered(false)
    if (duration > 0 && remainingRef.current > 0) {
      startTimeRef.current = Date.now()
      timerRef.current = setTimeout(handleClose, remainingRef.current)
    }
  }, [duration, handleClose])

  // Auto-dismiss timer
  React.useEffect(() => {
    if (duration > 0) {
      startTimeRef.current = Date.now()
      timerRef.current = setTimeout(handleClose, duration)
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    }
  }, [duration, handleClose])

  const styles = severityStyles[severity]

  return (
    <div
      role="alert"
      aria-live={severity === "error" ? "assertive" : "polite"}
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
      className={cn(
        "relative w-full max-w-sm rounded-[var(--radius-md)]",
        "bg-[var(--color-surface)] border border-[var(--color-border)]",
        "border-l-4",
        styles.border,
        styles.shadow,
        "p-4 overflow-hidden",
        // Premium spring animation
        "transition-all duration-300 ease-[var(--ease-spring)]",
        isExiting
          ? "translate-x-full opacity-0 scale-95"
          : "translate-x-0 opacity-100 scale-100",
        // Entrance animation
        !isExiting && "animate-in slide-in-from-right-full fade-in duration-300"
      )}
    >
      <div className="flex items-start gap-3">
        <SeverityIcon severity={severity} />

        <div className="flex-1 min-w-0">
          {title && (
            <p className="text-sm font-medium text-[var(--color-text)]">
              {title}
            </p>
          )}
          <p
            className={cn(
              "text-sm text-[var(--color-text-muted)]",
              title && "mt-1"
            )}
          >
            {message}
          </p>

          {action && (
            <button
              onClick={() => {
                action.onClick()
                handleClose()
              }}
              className={cn(
                "mt-2 text-sm font-medium",
                "text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]",
                "transition-colors duration-[var(--duration-fast)]",
                "focus:outline-none focus:underline",
                "hover:underline"
              )}
            >
              {action.label}
            </button>
          )}
        </div>

        <CloseButton onClick={handleClose} />
      </div>

      {/* Progress bar for auto-dismiss */}
      {duration > 0 && <ProgressBar duration={duration} isPaused={isHovered} />}
    </div>
  )
}

// Toast Container/Provider
interface ToastContextValue {
  addToast: (toast: Omit<ToastData, "id">) => string
  removeToast: (id: string) => void
  toasts: ToastData[]
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

// Generate unique ID
let toastCounter = 0
function generateId(): string {
  return `toast-${++toastCounter}-${Date.now()}`
}

export interface ToastProviderProps {
  children: React.ReactNode
  /**
   * Position of the toast container
   */
  position?: ToastPosition
  /**
   * Maximum number of visible toasts
   */
  maxToasts?: number
}

export function ToastProvider({
  children,
  position = "top-right",
  maxToasts = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastData[]>([])

  const addToast = React.useCallback(
    (toast: Omit<ToastData, "id">) => {
      const id = generateId()
      setToasts((prev) => {
        const newToasts = [...prev, { ...toast, id }]
        // Limit to maxToasts
        return newToasts.slice(-maxToasts)
      })
      return id
    },
    [maxToasts]
  )

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // Position classes
  const positionClasses: Record<ToastPosition, string> = {
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
  }

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toasts }}>
      {children}

      {/* Toast container */}
      <div
        className={cn(
          "fixed z-[100] flex flex-col gap-3",
          "pointer-events-none",
          positionClasses[position]
        )}
        aria-label="Notifications"
      >
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast {...toast} onClose={() => removeToast(toast.id)} />
          </div>
        ))}
      </div>

      {/* Keyframe for progress bar */}
      <style jsx global>{`
        @keyframes shrink {
          from {
            transform: scaleX(1);
          }
          to {
            transform: scaleX(0);
          }
        }
      `}</style>
    </ToastContext.Provider>
  )
}

// Hook to use toast
export function useToast() {
  const context = React.useContext(ToastContext)

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }

  return {
    toast: context.addToast,
    dismiss: context.removeToast,
    toasts: context.toasts,
    // Convenience methods
    success: (message: string, options?: Partial<Omit<ToastData, "id" | "message" | "severity">>) =>
      context.addToast({ message, severity: "success", ...options }),
    error: (message: string, options?: Partial<Omit<ToastData, "id" | "message" | "severity">>) =>
      context.addToast({ message, severity: "error", ...options }),
    warning: (message: string, options?: Partial<Omit<ToastData, "id" | "message" | "severity">>) =>
      context.addToast({ message, severity: "warning", ...options }),
    info: (message: string, options?: Partial<Omit<ToastData, "id" | "message" | "severity">>) =>
      context.addToast({ message, severity: "info", ...options }),
  }
}

// Simple toast function for use outside React components
// Requires ToastProvider to be mounted
let globalAddToast: ((toast: Omit<ToastData, "id">) => string) | null = null

export function setGlobalToast(fn: (toast: Omit<ToastData, "id">) => string) {
  globalAddToast = fn
}

export function toast(options: Omit<ToastData, "id">) {
  if (!globalAddToast) {
    console.warn("Toast provider not mounted. Toast will not be shown.")
    return ""
  }
  return globalAddToast(options)
}

toast.success = (message: string, options?: Partial<Omit<ToastData, "id" | "message" | "severity">>) =>
  toast({ message, severity: "success", ...options })

toast.error = (message: string, options?: Partial<Omit<ToastData, "id" | "message" | "severity">>) =>
  toast({ message, severity: "error", ...options })

toast.warning = (message: string, options?: Partial<Omit<ToastData, "id" | "message" | "severity">>) =>
  toast({ message, severity: "warning", ...options })

toast.info = (message: string, options?: Partial<Omit<ToastData, "id" | "message" | "severity">>) =>
  toast({ message, severity: "info", ...options })
