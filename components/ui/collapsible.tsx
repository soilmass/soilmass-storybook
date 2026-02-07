"use client"

/**
 * Collapsible/Disclosure Component
 *
 * Simple expandable content section.
 *
 * Premium patterns:
 * - Spring open/close animation
 * - Chevron rotation with spring easing
 * - Smooth height transitions
 * - Hover glow effects
 * - Focus ring styling
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Chevron icon with spring rotation
const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    className={cn(
      "h-4 w-4",
      "transition-transform duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
      open && "rotate-180"
    )}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
)

// Context
interface CollapsibleContextValue {
  open: boolean
  contentId: string
  toggle: () => void
}

const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(null)

function useCollapsible() {
  const context = React.useContext(CollapsibleContext)
  if (!context) {
    throw new Error("Collapsible components must be used within a Collapsible")
  }
  return context
}

export interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Controlled open state
   */
  open?: boolean
  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void
  /**
   * Default open state (uncontrolled)
   */
  defaultOpen?: boolean
  /**
   * Disable the collapsible
   */
  disabled?: boolean
}

export function Collapsible({
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  disabled = false,
  className,
  children,
  ...props
}: CollapsibleProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const contentId = React.useId()

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const toggle = React.useCallback(() => {
    if (disabled) return

    if (isControlled) {
      onOpenChange?.(!open)
    } else {
      setUncontrolledOpen(!open)
      onOpenChange?.(!open)
    }
  }, [disabled, isControlled, open, onOpenChange])

  return (
    <CollapsibleContext.Provider value={{ open, contentId, toggle }}>
      <div
        data-state={open ? "open" : "closed"}
        data-disabled={disabled || undefined}
        className={className}
        {...props}
      >
        {children}
      </div>
    </CollapsibleContext.Provider>
  )
}

// Collapsible Trigger with premium styling
export interface CollapsibleTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Whether to show the default chevron icon
   */
  showIcon?: boolean
}

export function CollapsibleTrigger({
  showIcon = true,
  className,
  children,
  ...props
}: CollapsibleTriggerProps) {
  const { open, contentId, toggle } = useCollapsible()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-expanded={open}
      aria-controls={contentId}
      className={cn(
        "flex items-center justify-between w-full",
        "text-left text-[var(--color-text)]",
        // Premium focus ring
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2",
        "focus-visible:rounded-[var(--radius-sm)]",
        // Disabled state
        "disabled:opacity-50 disabled:cursor-not-allowed",
        // Spring transition
        "transition-all duration-[var(--duration-fast)] ease-[var(--ease-spring)]",
        className
      )}
      {...props}
    >
      {children}
      {showIcon && (
        <span
          className={cn(
            "text-[var(--color-text-muted)] ml-2",
            "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
            // Glow on open
            open && "text-[var(--color-primary)] drop-shadow-[0_0_4px_var(--color-primary)]"
          )}
        >
          <ChevronIcon open={open} />
        </span>
      )}
    </button>
  )
}

// Collapsible Content with spring animation
export interface CollapsibleContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CollapsibleContent({
  className,
  children,
  ...props
}: CollapsibleContentProps) {
  const { open, contentId } = useCollapsible()
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [height, setHeight] = React.useState<number | undefined>(undefined)

  // Measure content height for animation
  React.useEffect(() => {
    if (contentRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setHeight(entry.contentRect.height)
        }
      })

      resizeObserver.observe(contentRef.current)
      return () => resizeObserver.disconnect()
    }
  }, [])

  return (
    <div
      id={contentId}
      role="region"
      hidden={!open}
      className={cn(
        "overflow-hidden",
        // Spring transition for height
        "transition-[height,opacity] duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
        open ? "opacity-100" : "opacity-0",
        className
      )}
      style={{
        height: open ? height : 0,
      }}
      {...props}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  )
}

// Pre-composed simple collapsible with premium styling
export interface SimpleCollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Trigger label
   */
  label: React.ReactNode
  /**
   * Controlled open state
   */
  open?: boolean
  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void
  /**
   * Default open state
   */
  defaultOpen?: boolean
  /**
   * Disabled state
   */
  disabled?: boolean
}

export function SimpleCollapsible({
  label,
  open,
  onOpenChange,
  defaultOpen = false,
  disabled = false,
  className,
  children,
  ...props
}: SimpleCollapsibleProps) {
  return (
    <Collapsible
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
      disabled={disabled}
      className={cn(
        "border border-[var(--color-border)] rounded-[var(--radius-md)]",
        // Shadow and glow effect
        "shadow-sm",
        "transition-shadow duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
        "hover:shadow-md hover:shadow-[var(--color-primary)]/5",
        className
      )}
      {...props}
    >
      <CollapsibleTrigger
        disabled={disabled}
        className={cn(
          "px-4 py-3 font-medium",
          "hover:bg-[var(--color-surface-hover)]",
          "rounded-[var(--radius-md)]",
          "transition-colors duration-[var(--duration-fast)]",
          // Group for child animations
          "group"
        )}
      >
        {label}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className={cn(
          "px-4 pb-4 pt-2 text-[var(--color-text-muted)]",
          // Fade in animation
          "animate-in fade-in duration-200"
        )}>
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

// Disclosure - simpler variant with premium styling
export interface DisclosureProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Summary/trigger text
   */
  summary: React.ReactNode
  /**
   * Controlled open state
   */
  open?: boolean
  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void
  /**
   * Default open state
   */
  defaultOpen?: boolean
}

export function Disclosure({
  summary,
  open,
  onOpenChange,
  defaultOpen = false,
  className,
  children,
  ...props
}: DisclosureProps) {
  return (
    <Collapsible
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
      className={className}
      {...props}
    >
      <CollapsibleTrigger
        className={cn(
          "py-2 font-medium text-sm",
          "hover:text-[var(--color-primary)]",
          "transition-all duration-[var(--duration-fast)] ease-[var(--ease-spring)]",
          // Hover glow
          "hover:drop-shadow-[0_0_4px_var(--color-primary)]"
        )}
      >
        {summary}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className={cn(
          "pb-2 text-sm text-[var(--color-text-muted)]",
          // Fade and slide animation
          "animate-in fade-in slide-in-from-top-2 duration-200"
        )}>
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
