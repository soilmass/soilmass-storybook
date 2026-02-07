"use client"

/**
 * Header Mobile Menu - Client Component
 *
 * Handles mobile menu interactivity with focus trapping.
 * Spec: domains/components/068-header.yaml - Rule HDR3
 *
 * Features:
 * - Spring-animated drawer slide
 * - Staggered menu item animations
 * - Focus trapping for accessibility
 */

import { useEffect, useRef, useState, createContext, useContext } from "react"
import NextLink from "next/link"
import { Button } from "@/components/ui/button"

// Context for mobile menu state
const MobileMenuContext = createContext<{
  isOpen: boolean
  setIsOpen: (open: boolean) => void
} | null>(null)

export function MobileMenuProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <MobileMenuContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MobileMenuContext.Provider>
  )
}

function useMobileMenu() {
  const context = useContext(MobileMenuContext)
  if (!context) {
    // Return default state when not wrapped in provider
    return { isOpen: false, setIsOpen: () => {} }
  }
  return context
}

// Menu icon with spring animation
function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

// Close icon with spring animation
function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

/**
 * Mobile menu toggle button with spring transition
 */
export function MobileMenuToggle() {
  const [isOpen, setIsOpen] = useState(false)

  // Store state in window for access by MobileMenu
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as unknown as { __mobileMenuState: { isOpen: boolean; setIsOpen: (open: boolean) => void } }).__mobileMenuState = { isOpen, setIsOpen }
    }
  }, [isOpen])

  return (
    <button
      type="button"
      className="
        lg:hidden
        flex items-center justify-center
        p-[var(--space-2)]
        text-[var(--color-foreground)]
        hover:bg-[var(--color-surface-hover)]
        rounded-[var(--radius-md)]
        transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        hover:scale-105 active:scale-95
      "
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      onClick={() => setIsOpen(!isOpen)}
    >
      <span className="transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </span>
    </button>
  )
}

interface NavItem {
  label: string
  href: string
}

interface MobileMenuProps {
  navItems: NavItem[]
  showCta?: boolean
}

/**
 * Mobile menu overlay with spring-animated drawer and focus trapping
 */
export function MobileMenu({ navItems, showCta = true }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Sync with toggle button state
  useEffect(() => {
    if (typeof window === "undefined") return

    const checkState = () => {
      const state = (window as unknown as { __mobileMenuState?: { isOpen: boolean } }).__mobileMenuState
      if (state && state.isOpen !== isOpen) {
        setIsOpen(state.isOpen)
      }
    }

    const interval = setInterval(checkState, 50)
    return () => clearInterval(interval)
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const state = (window as unknown as { __mobileMenuState?: { setIsOpen: (open: boolean) => void } }).__mobileMenuState
        state?.setIsOpen(false)
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Focus trap - Rule HDR3
  useEffect(() => {
    if (!isOpen || !menuRef.current) return

    const menu = menuRef.current
    const focusableElements = menu.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
    const firstFocusable = focusableElements[0]
    const lastFocusable = focusableElements[focusableElements.length - 1]

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault()
          lastFocusable?.focus()
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault()
          firstFocusable?.focus()
        }
      }
    }

    document.addEventListener("keydown", handleTab)
    firstFocusable?.focus()

    return () => document.removeEventListener("keydown", handleTab)
  }, [isOpen])

  const closeMenu = () => {
    const state = (window as unknown as { __mobileMenuState?: { setIsOpen: (open: boolean) => void } }).__mobileMenuState
    state?.setIsOpen(false)
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop with fade animation */}
      <div
        className="
          lg:hidden fixed inset-0 z-[199]
          bg-black/60 backdrop-blur-sm
          animate-in fade-in duration-300
        "
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Menu Panel with spring slide animation */}
      <div
        ref={menuRef}
        className="
          lg:hidden fixed inset-y-0 right-0 z-[200]
          w-full max-w-sm
          bg-[var(--color-surface)]
          border-l border-[var(--color-border)]
          p-[var(--space-6)]
          shadow-[var(--shadow-xl)]
          animate-in slide-in-from-right duration-300
          [animation-timing-function:cubic-bezier(0.34,1.56,0.64,1)]
        "
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Close button with spring animation */}
        <div className="flex justify-end mb-[var(--space-6)]">
          <button
            type="button"
            className="
              p-[var(--space-2)]
              text-[var(--color-foreground)]
              hover:bg-[var(--color-surface-hover)]
              rounded-[var(--radius-md)]
              transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
              hover:scale-105 hover:rotate-90 active:scale-95
            "
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Navigation with staggered animations */}
        <nav aria-label="Mobile navigation">
          <ul className="flex flex-col gap-[var(--space-2)]">
            {navItems.map((item, index) => (
              <li
                key={item.href}
                className="animate-in slide-in-from-right fade-in duration-300"
                style={{
                  animationDelay: `${(index + 1) * 50}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <NextLink
                  href={item.href}
                  className="
                    group relative block
                    py-[var(--space-3)] px-[var(--space-4)]
                    text-[var(--text-lg)] font-[var(--font-medium)]
                    text-[var(--color-foreground)]
                    hover:bg-[var(--color-surface-hover)]
                    rounded-[var(--radius-md)]
                    transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    hover:translate-x-1
                  "
                  onClick={closeMenu}
                >
                  {item.label}
                  {/* Animated arrow indicator */}
                  <span
                    className="
                      absolute right-4 top-1/2 -translate-y-1/2
                      opacity-0 -translate-x-2
                      transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                      group-hover:opacity-100 group-hover:translate-x-0
                      text-[var(--color-primary)]
                    "
                  >
                    &rarr;
                  </span>
                </NextLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Buttons with staggered animation */}
        {showCta && (
          <div
            className="
              flex flex-col gap-[var(--space-3)]
              mt-[var(--space-8)] pt-[var(--space-6)]
              border-t border-[var(--color-border)]
              animate-in slide-in-from-right fade-in duration-300
            "
            style={{
              animationDelay: `${(navItems.length + 1) * 50}ms`,
              animationFillMode: "backwards",
            }}
          >
            <Button
              variant="ghost"
              className="w-full justify-center transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign in
            </Button>
            <Button className="w-full justify-center transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
