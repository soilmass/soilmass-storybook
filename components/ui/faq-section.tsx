"use client"

/**
 * FAQ Section Component
 *
 * Complete FAQ section for marketing pages.
 * Features:
 * - Heading and description
 * - Searchable questions
 * - Two-column layout option
 * - Accordion-based answers with spring animation
 * - Categories/groups
 * - Premium hover states
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion"

// Search icon
const SearchIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
)

export interface FAQItemData {
  /**
   * Question
   */
  question: string
  /**
   * Answer (can be string or React node)
   */
  answer: React.ReactNode
  /**
   * Optional category
   */
  category?: string
}

export interface FAQSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Section heading
   */
  heading?: string
  /**
   * Section description
   */
  description?: string
  /**
   * FAQ items
   */
  items: FAQItemData[]
  /**
   * Show search input
   */
  searchable?: boolean
  /**
   * Search placeholder
   */
  searchPlaceholder?: string
  /**
   * Layout variant
   */
  layout?: "single" | "two-column" | "sidebar"
  /**
   * Allow multiple items open
   */
  multiple?: boolean
  /**
   * Category filter
   */
  showCategories?: boolean
}

export function FAQSection({
  heading = "Frequently Asked Questions",
  description,
  items,
  searchable = false,
  searchPlaceholder = "Search questions...",
  layout = "single",
  multiple = false,
  showCategories = false,
  className,
  ...props
}: FAQSectionProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null)

  // Get unique categories
  const categories = React.useMemo(() => {
    const cats = items
      .map((item) => item.category)
      .filter((c): c is string => !!c)
    return [...new Set(cats)]
  }, [items])

  // Filter items
  const filteredItems = React.useMemo(() => {
    let filtered = items

    // Filter by category
    if (activeCategory) {
      filtered = filtered.filter((item) => item.category === activeCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.question.toLowerCase().includes(query) ||
          (typeof item.answer === "string" &&
            item.answer.toLowerCase().includes(query))
      )
    }

    return filtered
  }, [items, searchQuery, activeCategory])

  // Split items for two-column layout
  const splitItems = React.useMemo(() => {
    if (layout !== "two-column") return { left: filteredItems, right: [] }
    const mid = Math.ceil(filteredItems.length / 2)
    return {
      left: filteredItems.slice(0, mid),
      right: filteredItems.slice(mid),
    }
  }, [filteredItems, layout])

  const renderFAQList = (itemList: FAQItemData[], startIndex = 0) => (
    <Accordion type={multiple ? "multiple" : "single"}>
      {itemList.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${startIndex + index}`}
          className={cn(
            "border-b border-[var(--color-border)] last:border-b-0",
            "group/item"
          )}
          style={{
            animationDelay: `${(startIndex + index) * 50}ms`,
          }}
        >
          <AccordionTrigger
            className={cn(
              "py-5 text-left font-medium text-[var(--color-text)]",
              "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              "hover:text-[var(--color-primary)]",
              "hover:pl-2",
              "group-hover/item:bg-[var(--color-surface-hover)]/50",
              "rounded-lg -mx-2 px-2"
            )}
          >
            {item.question}
          </AccordionTrigger>
          <AccordionContent
            className={cn(
              "pb-5 text-[var(--color-text-muted)]",
              "animate-in slide-in-from-top-2 duration-300",
              "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-2"
            )}
          >
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )

  return (
    <div className={cn("py-16", className)} {...props}>
      {/* Header */}
      <div className="text-center mb-12">
        {heading && (
          <h2 className="text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
            {heading}
          </h2>
        )}
        {description && (
          <p className="mt-4 text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>

      {/* Search and filters */}
      {(searchable || (showCategories && categories.length > 0)) && (
        <div className="max-w-2xl mx-auto mb-8 space-y-4">
          {/* Search with focus glow */}
          {searchable && (
            <div className="relative group">
              <span className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]",
                "transition-colors duration-300",
                "group-focus-within:text-[var(--color-primary)]"
              )}>
                <SearchIcon />
              </span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className={cn(
                  "w-full h-12 pl-10 pr-4 rounded-[var(--radius-lg)]",
                  "border border-[var(--color-border)]",
                  "bg-[var(--color-surface)]",
                  "text-[var(--color-text)]",
                  "placeholder:text-[var(--color-text-muted)]",
                  "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                  "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50",
                  "focus:border-[var(--color-primary)]",
                  "focus:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.15)]"
                )}
              />
            </div>
          )}

          {/* Category filters with spring animation */}
          {showCategories && categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium",
                  "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                  "hover:scale-105 active:scale-95",
                  !activeCategory
                    ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/25"
                    : "bg-[var(--color-surface-muted)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
                )}
              >
                All
              </button>
              {categories.map((category, index) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium",
                    "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                    "hover:scale-105 active:scale-95",
                    activeCategory === category
                      ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/25"
                      : "bg-[var(--color-surface-muted)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* FAQ Content */}
      {layout === "two-column" ? (
        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
          <div>{renderFAQList(splitItems.left, 0)}</div>
          <div>{renderFAQList(splitItems.right, splitItems.left.length)}</div>
        </div>
      ) : layout === "sidebar" ? (
        <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-3">
          {/* Sidebar with categories */}
          {categories.length > 0 && (
            <div className="lg:col-span-1">
              <nav className="space-y-1 sticky top-24">
                <button
                  type="button"
                  onClick={() => setActiveCategory(null)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-[var(--radius-md)]",
                    "text-sm font-medium",
                    "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                    !activeCategory
                      ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] shadow-sm"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] hover:translate-x-1"
                  )}
                >
                  All questions
                </button>
                {categories.map((category, index) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-[var(--radius-md)]",
                      "text-sm font-medium",
                      "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                      activeCategory === category
                        ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] shadow-sm"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] hover:translate-x-1"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {category}
                  </button>
                ))}
              </nav>
            </div>
          )}
          {/* FAQ list */}
          <div className={categories.length > 0 ? "lg:col-span-2" : "lg:col-span-3"}>
            {renderFAQList(filteredItems)}
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          {renderFAQList(filteredItems)}
        </div>
      )}

      {/* No results */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[var(--color-text-muted)]">
            No questions found matching your search.
          </p>
        </div>
      )}
    </div>
  )
}

// Simple FAQ list without section wrapper
export interface SimpleFAQListProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * FAQ items
   */
  items: FAQItemData[]
  /**
   * Allow multiple items open
   */
  multiple?: boolean
}

export function SimpleFAQList({
  items,
  multiple = false,
  className,
  ...props
}: SimpleFAQListProps) {
  return (
    <div className={className} {...props}>
      <Accordion type={multiple ? "multiple" : "single"}>
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className={cn(
              "border-b border-[var(--color-border)] last:border-b-0",
              "group/item"
            )}
          >
            <AccordionTrigger
              className={cn(
                "py-5 text-left font-medium text-[var(--color-text)]",
                "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                "hover:text-[var(--color-primary)]",
                "hover:pl-2",
                "group-hover/item:bg-[var(--color-surface-hover)]/50",
                "rounded-lg -mx-2 px-2"
              )}
            >
              {item.question}
            </AccordionTrigger>
            <AccordionContent
              className={cn(
                "pb-5 text-[var(--color-text-muted)]",
                "animate-in slide-in-from-top-2 duration-300"
              )}
            >
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
