"use client"

/**
 * Cookie Consent Banner
 * Domain 67: Cookie Consent Banner
 *
 * GDPR/ePrivacy Directive compliant cookie consent UI.
 * Features:
 * - Bottom bar placement (default)
 * - Accept/Reject/Customize buttons
 * - Preference center with category toggles
 * - Consent persistence via localStorage
 * - Accessible focus management
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Cookie consent categories
export interface CookiePreferences {
  necessary: boolean // Always true, cannot be disabled
  analytics: boolean
  marketing: boolean
  functional: boolean
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
}

// Storage key for consent
const CONSENT_KEY = "cookie-consent"
const CONSENT_VERSION = "1.0"

interface StoredConsent {
  version: string
  timestamp: string
  preferences: CookiePreferences
}

// Check if consent has been given
function getStoredConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null

  try {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) return null

    const parsed = JSON.parse(stored) as StoredConsent
    // Re-prompt if version changed
    if (parsed.version !== CONSENT_VERSION) return null

    return parsed
  } catch {
    return null
  }
}

// Save consent to localStorage
function saveConsent(preferences: CookiePreferences): void {
  if (typeof window === "undefined") return

  const consent: StoredConsent = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    preferences,
  }

  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent))
}

// Cookie category toggle component
interface CategoryToggleProps {
  id: string
  label: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
}

function CategoryToggle({
  id,
  label,
  description,
  checked,
  disabled,
  onChange,
}: CategoryToggleProps) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="flex h-6 items-center">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className={cn(
            "h-4 w-4 rounded border-[var(--color-border)]",
            "text-[var(--color-primary)] focus:ring-[var(--color-primary)]",
            "focus:ring-2 focus:ring-offset-2",
            disabled && "cursor-not-allowed opacity-60"
          )}
        />
      </div>
      <div className="flex-1">
        <label
          htmlFor={id}
          className={cn(
            "text-sm font-medium text-[var(--color-text)]",
            disabled && "cursor-not-allowed"
          )}
        >
          {label}
          {disabled && (
            <span className="ml-2 text-xs text-[var(--color-text-muted)]">
              (Required)
            </span>
          )}
        </label>
        <p className="mt-1 text-xs text-[var(--color-text-muted)]">
          {description}
        </p>
      </div>
    </div>
  )
}

// Preference center modal
interface PreferenceCenterProps {
  preferences: CookiePreferences
  onPreferencesChange: (preferences: CookiePreferences) => void
  onSave: () => void
  onCancel: () => void
}

function PreferenceCenter({
  preferences,
  onPreferencesChange,
  onSave,
  onCancel,
}: PreferenceCenterProps) {
  const panelRef = React.useRef<HTMLDivElement>(null)

  // Focus trap
  React.useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    const focusableElements = panel.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    firstElement?.focus()

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onCancel()
        return
      }

      if (e.key !== "Tab") return

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

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onCancel])

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    onPreferencesChange({ ...preferences, [key]: value })
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="preference-center-title"
    >
      <div
        ref={panelRef}
        className={cn(
          "w-full max-w-lg rounded-[var(--radius-lg)] p-6",
          "bg-[var(--glass-bg)] backdrop-blur-[var(--blur-lg)]",
          "shadow-[var(--shadow-popover)] border border-[var(--color-border)]",
          "animate-scale-in"
        )}
      >
        <h2
          id="preference-center-title"
          className="text-lg font-semibold text-[var(--color-text)]"
        >
          Cookie Preferences
        </h2>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Manage your cookie preferences below. You can enable or disable
          different types of cookies. Note that disabling some cookies may
          affect your experience.
        </p>

        <div className="mt-6 divide-y divide-[var(--color-border)]">
          <CategoryToggle
            id="necessary"
            label="Necessary Cookies"
            description="Essential for the website to function. Cannot be disabled."
            checked={preferences.necessary}
            disabled
            onChange={() => {}}
          />
          <CategoryToggle
            id="functional"
            label="Functional Cookies"
            description="Enable enhanced functionality and personalization."
            checked={preferences.functional}
            onChange={(checked) => updatePreference("functional", checked)}
          />
          <CategoryToggle
            id="analytics"
            label="Analytics Cookies"
            description="Help us understand how visitors interact with the website."
            checked={preferences.analytics}
            onChange={(checked) => updatePreference("analytics", checked)}
          />
          <CategoryToggle
            id="marketing"
            label="Marketing Cookies"
            description="Used to deliver personalized advertisements."
            checked={preferences.marketing}
            onChange={(checked) => updatePreference("marketing", checked)}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save Preferences</Button>
        </div>
      </div>
    </div>
  )
}

// Main Cookie Consent Banner
export interface CookieConsentBannerProps {
  /**
   * Privacy policy link
   */
  privacyPolicyUrl?: string
  /**
   * Cookie policy link
   */
  cookiePolicyUrl?: string
  /**
   * Callback when consent is given
   */
  onConsent?: (preferences: CookiePreferences) => void
  /**
   * Additional class names
   */
  className?: string
}

export function CookieConsentBanner({
  privacyPolicyUrl = "/privacy",
  cookiePolicyUrl = "/cookies",
  onConsent,
  className,
}: CookieConsentBannerProps) {
  const [showBanner, setShowBanner] = React.useState(false)
  const [showPreferences, setShowPreferences] = React.useState(false)
  const [preferences, setPreferences] =
    React.useState<CookiePreferences>(DEFAULT_PREFERENCES)

  const bannerRef = React.useRef<HTMLDivElement>(null)

  // Check for existing consent on mount
  React.useEffect(() => {
    const existingConsent = getStoredConsent()
    if (existingConsent) {
      setPreferences(existingConsent.preferences)
      setShowBanner(false)
    } else {
      setShowBanner(true)
    }
  }, [])

  // Focus management - focus first button when banner appears
  React.useEffect(() => {
    if (showBanner && !showPreferences && bannerRef.current) {
      const firstButton = bannerRef.current.querySelector<HTMLButtonElement>("button")
      firstButton?.focus()
    }
  }, [showBanner, showPreferences])

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    }
    saveConsent(allAccepted)
    setPreferences(allAccepted)
    setShowBanner(false)
    onConsent?.(allAccepted)
  }

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    }
    saveConsent(onlyNecessary)
    setPreferences(onlyNecessary)
    setShowBanner(false)
    onConsent?.(onlyNecessary)
  }

  const handleSavePreferences = () => {
    saveConsent(preferences)
    setShowPreferences(false)
    setShowBanner(false)
    onConsent?.(preferences)
  }

  const handleOpenPreferences = () => {
    setShowPreferences(true)
  }

  const handleClosePreferences = () => {
    setShowPreferences(false)
  }

  if (!showBanner) return null

  return (
    <>
      {/* Main banner */}
      <div
        ref={bannerRef}
        role="dialog"
        aria-modal="false"
        aria-label="Cookie consent"
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50",
          "border-t border-[var(--color-border)]",
          "bg-[var(--glass-bg)] backdrop-blur-[var(--blur-lg)]",
          "p-4 shadow-[var(--shadow-float)] sm:p-6",
          "animate-slide-in-from-bottom",
          "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
          className
        )}
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <p className="text-sm text-[var(--color-text)]">
                We use cookies to enhance your browsing experience, serve
                personalized content, and analyze our traffic. By clicking
                &quot;Accept All&quot;, you consent to our use of cookies.{" "}
                <a
                  href={privacyPolicyUrl}
                  className="text-[var(--color-link)] underline hover:text-[var(--color-link-hover)]"
                >
                  Privacy Policy
                </a>
                {" | "}
                <a
                  href={cookiePolicyUrl}
                  className="text-[var(--color-link)] underline hover:text-[var(--color-link-hover)]"
                >
                  Cookie Policy
                </a>
              </p>
            </div>

            <div className="flex flex-wrap gap-2 sm:flex-nowrap">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectAll}
                className="flex-1 sm:flex-none"
              >
                Reject All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenPreferences}
                className="flex-1 sm:flex-none"
              >
                Customize
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="flex-1 sm:flex-none"
              >
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Preference center modal */}
      {showPreferences && (
        <PreferenceCenter
          preferences={preferences}
          onPreferencesChange={setPreferences}
          onSave={handleSavePreferences}
          onCancel={handleClosePreferences}
        />
      )}
    </>
  )
}

// Hook to access current cookie preferences
export function useCookieConsent(): CookiePreferences | null {
  const [preferences, setPreferences] =
    React.useState<CookiePreferences | null>(null)

  React.useEffect(() => {
    const consent = getStoredConsent()
    if (consent) {
      setPreferences(consent.preferences)
    }
  }, [])

  return preferences
}

// Utility to check if a specific category is consented
export function hasCookieConsent(category: keyof CookiePreferences): boolean {
  const consent = getStoredConsent()
  if (!consent) return false
  return consent.preferences[category]
}
