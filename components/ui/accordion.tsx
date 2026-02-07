"use client"

/**
 * Accordion Component
 * Domain 67: Accordions
 *
 * Expandable/collapsible content sections with accessible disclosure patterns.
 * Features:
 * - Single and multi-expand modes
 * - Keyboard accessible (button triggers)
 * - ARIA attributes for screen readers
 * - Animated height transitions with spring easing
 * - Bordered and flush variants
 * - Premium design: subtle shadows, smooth spring animations
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Chevron icon for accordion trigger
const ChevronIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("h-5 w-5", className)}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
)

// Accordion Context
interface AccordionContextValue {
  openItems: string[]
  toggleItem: (id: string) => void
  type: "single" | "multiple"
  variant: "bordered" | "flush"
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)

function useAccordion() {
  const context = React.useContext(AccordionContext)
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion")
  }
  return context
}

// Item Context for nested components
interface AccordionItemContextValue {
  itemId: string
  isOpen: boolean
  triggerId: string
  contentId: string
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null)

function useAccordionItem() {
  const context = React.useContext(AccordionItemContext)
  if (!context) {
    throw new Error("AccordionItem components must be used within an AccordionItem")
  }
  return context
}

// Root Accordion Component
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Type of accordion behavior
   * - single: only one item can be open at a time
   * - multiple: multiple items can be open
   */
  type?: "single" | "multiple"
  /**
   * Default open items (by id)
   */
  defaultOpen?: string[]
  /**
   * Controlled open items
   */
  open?: string[]
  /**
   * Callback when open items change
   */
  onOpenChange?: (open: string[]) => void
  /**
   * Visual variant
   */
  variant?: "bordered" | "flush"
}

export function Accordion({
  type = "single",
  defaultOpen = [],
  open,
  onOpenChange,
  variant = "bordered",
  className,
  children,
  ...props
}: AccordionProps) {
  const [internalOpen, setInternalOpen] = React.useState<string[]>(defaultOpen)

  const openItems = open !== undefined ? open : internalOpen

  const toggleItem = React.useCallback(
    (id: string) => {
      let newOpen: string[]

      if (type === "single") {
        // Single mode: toggle this item, close others
        newOpen = openItems.includes(id) ? [] : [id]
      } else {
        // Multiple mode: toggle this item
        newOpen = openItems.includes(id)
          ? openItems.filter((i) => i !== id)
          : [...openItems, id]
      }

      if (open === undefined) {
        setInternalOpen(newOpen)
      }
      onOpenChange?.(newOpen)
    },
    [type, openItems, open, onOpenChange]
  )

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type, variant }}>
      <div
        className={cn(
          // Premium shadow for bordered variant
          variant === "bordered" && [
            "border border-[var(--color-border)] rounded-[var(--radius-lg)]",
            "overflow-hidden",
            "shadow-sm",
            "bg-[var(--color-surface)]",
          ],
          className
        )}
        {...props}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

// Accordion Item
export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Unique identifier for this item
   */
  value: string
}

export function AccordionItem({
  value,
  className,
  children,
  ...props
}: AccordionItemProps) {
  const { openItems, variant } = useAccordion()
  const isOpen = openItems.includes(value)

  const triggerId = `accordion-trigger-${value}`
  const contentId = `accordion-content-${value}`

  return (
    <AccordionItemContext.Provider
      value={{ itemId: value, isOpen, triggerId, contentId }}
    >
      <div
        className={cn(
          "border-b border-[var(--color-border)] last:border-b-0",
          // Premium: subtle background change when open
          isOpen && variant === "bordered" && "bg-[var(--color-surface-alt)]/30",
          // Spring transition for background
          "transition-colors duration-300 ease-[var(--ease-spring)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}

// Accordion Trigger (Header Button)
export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Optional heading level wrapper
   */
  as?: "h2" | "h3" | "h4" | "h5" | "h6"
}

export function AccordionTrigger({
  as: Heading,
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  const { toggleItem } = useAccordion()
  const { itemId, isOpen, triggerId, contentId } = useAccordionItem()

  const button = (
    <button
      type="button"
      id={triggerId}
      aria-expanded={isOpen} // ACC2
      aria-controls={contentId} // ACC2
      onClick={() => toggleItem(itemId)}
      className={cn(
        // ACC1: Must be button
        "flex w-full items-center justify-between",
        "px-4 py-4 text-left",
        "text-base font-medium text-[var(--color-text)]",
        "bg-transparent border-0 cursor-pointer",
        // Premium: subtle shadow lift on hover
        "hover:bg-[var(--color-surface-hover)]",
        "hover:shadow-[inset_0_-1px_0_var(--color-border),0_1px_2px_rgba(0,0,0,0.04)]",
        // Focus ring with offset
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2",
        "focus-visible:ring-offset-[var(--color-surface)]",
        "focus-visible:z-10 focus-visible:relative",
        // Spring transition
        "transition-all duration-300 ease-[var(--ease-spring)]",
        className
      )}
      {...props}
    >
      <span className="flex-1">{children}</span>
      <ChevronIcon
        className={cn(
          "flex-shrink-0 ml-2 text-[var(--color-text-muted)]",
          // Premium spring rotation
          "transition-transform duration-500 ease-[var(--ease-spring)]",
          isOpen && "rotate-180"
        )}
      />
    </button>
  )

  if (Heading) {
    return <Heading className="m-0">{button}</Heading>
  }

  return button
}

// Accordion Content
export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps) {
  const { isOpen, triggerId, contentId } = useAccordionItem()
  const contentRef = React.useRef<HTMLDivElement>(null)

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        // ACC3: Animate height changes using grid with spring easing
        "grid",
        "transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-spring)]",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}
      {...props}
    >
      <div ref={contentRef} className="overflow-hidden">
        <div
          className={cn(
            "px-4 pb-4 pt-0",
            "text-[var(--color-text-muted)]",
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

// Simple FAQ Accordion helper
export interface FAQItem {
  question: string
  answer: React.ReactNode
}

export interface FAQAccordionProps extends Omit<AccordionProps, "children"> {
  items: FAQItem[]
}

export function FAQAccordion({ items, ...props }: FAQAccordionProps) {
  return (
    <Accordion {...props}>
      {items.map((item, index) => (
        <AccordionItem key={index} value={`faq-${index}`}>
          <AccordionTrigger as="h3">{item.question}</AccordionTrigger>
          <AccordionContent>
            {typeof item.answer === "string" ? (
              <p className="text-[var(--color-text-muted)]">{item.answer}</p>
            ) : (
              item.answer
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
