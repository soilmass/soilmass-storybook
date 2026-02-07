/**
 * Header Component
 *
 * Spec: domains/components/068-header.yaml
 *
 * Rules from spec:
 * - HDR1: Header MUST include skip link as first focusable element
 * - HDR2: Header nav MUST use <nav> with aria-label
 * - HDR3: Mobile menu MUST trap focus when open
 * - HDR4: Sticky header MUST not obscure content on anchor navigation
 *
 * Tokens consumed:
 * - --color-surface, --color-border
 * - --space-4, --space-6
 * - --z-sticky, --shadow-sm
 * - --glass-bg, --blur-md (glass effect)
 */

"use client"

import { useState, useEffect } from "react"
import NextLink from "next/link"
import { Button } from "@/components/ui/button"
import { MobileMenu, MobileMenuToggle } from "./header-mobile"

interface NavItem {
  label: string
  href: string
}

export interface HeaderProps {
  /**
   * Navigation items to display
   */
  navItems?: NavItem[]
  /**
   * Whether to show CTA buttons
   */
  showCta?: boolean
}

const defaultNavItems: NavItem[] = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

/**
 * Header component following Domain 68 specification.
 * Features glass effect with backdrop blur and scroll-triggered shadow.
 *
 * @example
 * <Header />
 *
 * @example
 * <Header navItems={[{ label: "Home", href: "/" }]} />
 */
export function Header({
  navItems = defaultNavItems,
  showCta = true,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  // Track scroll position for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial position

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Skip Link - Rule HDR1 */}
      <a
        href="#main-content"
        className="
          absolute top-0 left-0 z-[9999]
          px-[var(--space-4)] py-[var(--space-3)]
          bg-[var(--color-primary)] text-[var(--color-primary-foreground)]
          font-[var(--font-medium)] no-underline
          -translate-y-full
          transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)]
          focus:translate-y-0
        "
      >
        Skip to main content
      </a>

      <header
        className={`
          sticky top-0 z-[var(--z-sticky)]
          backdrop-blur-[var(--blur-md)]
          bg-[var(--glass-bg)]
          border-b border-[var(--color-border)]/50
          transition-shadow duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          ${isScrolled ? "shadow-[var(--shadow-sm)]" : "shadow-none"}
        `}
        role="banner"
      >
        <div
          className="
            flex items-center justify-between gap-[var(--space-6)]
            max-w-[var(--container-xl)] mx-auto
            px-[var(--space-6)] py-[var(--space-4)]
          "
        >
          {/* Logo */}
          <NextLink
            href="/"
            className="
              flex-shrink-0 font-[var(--font-bold)] text-[var(--text-xl)]
              transition-opacity duration-200 hover:opacity-80
            "
          >
            Soilmass
          </NextLink>

          {/* Desktop Navigation - Rule HDR2 */}
          <nav
            className="hidden lg:flex flex-1 justify-center"
            aria-label="Main navigation"
          >
            <ul className="flex items-center gap-[var(--space-8)]">
              {navItems.map((item) => (
                <li key={item.href}>
                  <NextLink
                    href={item.href}
                    className="
                      group relative
                      text-[var(--color-muted-foreground)]
                      hover:text-[var(--color-foreground)]
                      transition-colors duration-[var(--duration-fast)]
                      font-[var(--font-medium)]
                      py-1
                    "
                  >
                    {item.label}
                    {/* Animated underline */}
                    <span
                      className="
                        absolute bottom-0 left-0 w-full h-[2px]
                        bg-[var(--color-primary)]
                        origin-left scale-x-0
                        transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                        group-hover:scale-x-100
                      "
                    />
                  </NextLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-[var(--space-3)]">
            {showCta && (
              <>
                <Button variant="ghost" className="hidden sm:inline-flex">
                  Sign in
                </Button>
                <Button className="hidden sm:inline-flex">Get Started</Button>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <MobileMenuToggle />
          </div>
        </div>
      </header>

      {/* Mobile Menu - Rule HDR3 handled in client component */}
      <MobileMenu navItems={navItems} showCta={showCta} />
    </>
  )
}
