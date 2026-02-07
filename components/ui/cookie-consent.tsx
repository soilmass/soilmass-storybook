"use client"

/**
 * Cookie Consent Component
 *
 * GDPR-compliant cookie consent banner.
 * Features:
 * - Accept/reject all options
 * - Granular preference management
 * - Persistent storage
 * - Customizable text
 * - Multiple positions
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

export interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always true
  analytics: false,
  marketing: false,
  preferences: false,
}

export interface CookieConsentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Heading text
   */
  heading?: string
  /**
   * Description text
   */
  description?: string
  /**
   * Accept all button text
   */
  acceptAllText?: string
  /**
   * Reject all button text
   */
  rejectAllText?: string
  /**
   * Customize button text
   */
  customizeText?: string
  /**
   * Save preferences button text
   */
  saveText?: string
  /**
   * Privacy policy link URL
   */
  privacyPolicyUrl?: string
  /**
   * Privacy policy link text
   */
  privacyPolicyText?: string
  /**
   * Cookie policy link URL
   */
  cookiePolicyUrl?: string
  /**
   * Cookie policy link text
   */
  cookiePolicyText?: string
  /**
   * Position
   */
  position?: "bottom" | "bottom-left" | "bottom-right" | "top"
  /**
   * Variant
   */
  variant?: "banner" | "modal" | "floating"
  /**
   * Storage key for preferences
   */
  storageKey?: string
  /**
   * Callback when consent is given
   */
  onAccept?: (preferences: CookiePreferences) => void
  /**
   * Callback when consent is rejected
   */
  onReject?: () => void
  /**
   * Show preference categories
   */
  showCategories?: boolean
  /**
   * Category descriptions
   */
  categoryDescriptions?: {
    necessary?: string
    analytics?: string
    marketing?: string
    preferences?: string
  }
}

const defaultCategoryDescriptions = {
  necessary: "Essential cookies required for the website to function. Cannot be disabled.",
  analytics: "Help us understand how visitors interact with our website.",
  marketing: "Used to deliver personalized advertisements.",
  preferences: "Remember your settings and preferences.",
}

const positionClasses = {
  bottom: "bottom-0 left-0 right-0",
  "bottom-left": "bottom-4 left-4 max-w-md",
  "bottom-right": "bottom-4 right-4 max-w-md",
  top: "top-0 left-0 right-0",
}

export function CookieConsent({
  heading = "We use cookies",
  description = "We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking \"Accept All\", you consent to our use of cookies.",
  acceptAllText = "Accept All",
  rejectAllText = "Reject All",
  customizeText = "Customize",
  saveText = "Save Preferences",
  privacyPolicyUrl,
  privacyPolicyText = "Privacy Policy",
  cookiePolicyUrl,
  cookiePolicyText = "Cookie Policy",
  position = "bottom",
  variant = "banner",
  storageKey = "cookie-consent",
  onAccept,
  onReject,
  showCategories = true,
  categoryDescriptions = defaultCategoryDescriptions,
  className,
  ...props
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [showPreferences, setShowPreferences] = React.useState(false)
  const [preferences, setPreferences] = React.useState<CookiePreferences>(defaultPreferences)

  // Check for existing consent on mount
  React.useEffect(() => {
    const stored = localStorage.getItem(storageKey)
    if (!stored) {
      setIsVisible(true)
    } else {
      try {
        const parsed = JSON.parse(stored)
        setPreferences(parsed)
      } catch {
        setIsVisible(true)
      }
    }
  }, [storageKey])

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(storageKey, JSON.stringify(prefs))
    setIsVisible(false)
    onAccept?.(prefs)
  }

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    }
    setPreferences(allAccepted)
    saveConsent(allAccepted)
  }

  const handleRejectAll = () => {
    const allRejected: CookiePreferences = {
      necessary: true, // Necessary cookies can't be rejected
      analytics: false,
      marketing: false,
      preferences: false,
    }
    setPreferences(allRejected)
    saveConsent(allRejected)
    onReject?.()
  }

  const handleSavePreferences = () => {
    saveConsent(preferences)
    setShowPreferences(false)
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === "necessary") return // Can't toggle necessary cookies
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  if (!isVisible) return null

  const mergedDescriptions = { ...defaultCategoryDescriptions, ...categoryDescriptions }

  // Floating variant
  if (variant === "floating") {
    return (
      <div
        className={cn(
          "fixed z-50 p-4",
          "rounded-[var(--radius-xl)]",
          "bg-[var(--color-surface)]",
          "border border-[var(--color-border)]",
          "shadow-xl",
          positionClasses[position],
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-heading"
        {...props}
      >
        <h2
          id="cookie-consent-heading"
          className="font-semibold text-[var(--color-text)]"
        >
          {heading}
        </h2>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          {description}
        </p>

        {/* Preference toggles */}
        {showPreferences && showCategories && (
          <div className="mt-4 space-y-3">
            {(Object.keys(preferences) as Array<keyof CookiePreferences>).map((key) => (
              <div key={key} className="flex items-start gap-3">
                <button
                  type="button"
                  role="switch"
                  aria-checked={preferences[key]}
                  disabled={key === "necessary"}
                  onClick={() => togglePreference(key)}
                  className={cn(
                    "relative mt-0.5 h-5 w-9 rounded-full transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:ring-offset-2",
                    preferences[key]
                      ? "bg-[var(--color-primary)]"
                      : "bg-[var(--color-border)]",
                    key === "necessary" && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform",
                      preferences[key] && "translate-x-4"
                    )}
                  />
                </button>
                <div className="flex-1">
                  <div className="text-sm font-medium text-[var(--color-text)] capitalize">
                    {key}
                  </div>
                  <div className="text-xs text-[var(--color-text-muted)]">
                    {mergedDescriptions[key]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Links */}
        {(privacyPolicyUrl || cookiePolicyUrl) && (
          <div className="mt-3 flex gap-4 text-xs">
            {privacyPolicyUrl && (
              <a
                href={privacyPolicyUrl}
                className="text-[var(--color-primary)] hover:underline"
              >
                {privacyPolicyText}
              </a>
            )}
            {cookiePolicyUrl && (
              <a
                href={cookiePolicyUrl}
                className="text-[var(--color-primary)] hover:underline"
              >
                {cookiePolicyText}
              </a>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          {showPreferences ? (
            <>
              <Button size="sm" onClick={handleSavePreferences}>
                {saveText}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowPreferences(false)}
              >
                Back
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" onClick={handleAcceptAll}>
                {acceptAllText}
              </Button>
              <Button size="sm" variant="outline" onClick={handleRejectAll}>
                {rejectAllText}
              </Button>
              {showCategories && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowPreferences(true)}
                >
                  {customizeText}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    )
  }

  // Banner variant (default)
  return (
    <div
      className={cn(
        "fixed z-50",
        "bg-[var(--color-surface)]",
        "border-t border-[var(--color-border)]",
        "shadow-lg",
        position === "top" && "border-t-0 border-b",
        positionClasses[position],
        className
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-heading"
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <h2
              id="cookie-consent-heading"
              className="font-semibold text-[var(--color-text)]"
            >
              {heading}
            </h2>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              {description}
              {(privacyPolicyUrl || cookiePolicyUrl) && (
                <span className="ml-1">
                  {privacyPolicyUrl && (
                    <a
                      href={privacyPolicyUrl}
                      className="text-[var(--color-primary)] hover:underline"
                    >
                      {privacyPolicyText}
                    </a>
                  )}
                  {privacyPolicyUrl && cookiePolicyUrl && " • "}
                  {cookiePolicyUrl && (
                    <a
                      href={cookiePolicyUrl}
                      className="text-[var(--color-primary)] hover:underline"
                    >
                      {cookiePolicyText}
                    </a>
                  )}
                </span>
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:flex-shrink-0">
            <Button size="sm" onClick={handleAcceptAll}>
              {acceptAllText}
            </Button>
            <Button size="sm" variant="outline" onClick={handleRejectAll}>
              {rejectAllText}
            </Button>
            {showCategories && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowPreferences(true)}
              >
                {customizeText}
              </Button>
            )}
          </div>
        </div>

        {/* Expanded preferences */}
        {showPreferences && showCategories && (
          <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {(Object.keys(preferences) as Array<keyof CookiePreferences>).map((key) => (
                <div
                  key={key}
                  className="flex items-start gap-3 p-3 rounded-[var(--radius-md)] bg-[var(--color-surface-muted)]"
                >
                  <button
                    type="button"
                    role="switch"
                    aria-checked={preferences[key]}
                    disabled={key === "necessary"}
                    onClick={() => togglePreference(key)}
                    className={cn(
                      "relative mt-0.5 h-5 w-9 flex-shrink-0 rounded-full transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:ring-offset-2",
                      preferences[key]
                        ? "bg-[var(--color-primary)]"
                        : "bg-[var(--color-border)]",
                      key === "necessary" && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform",
                        preferences[key] && "translate-x-4"
                      )}
                    />
                  </button>
                  <div>
                    <div className="text-sm font-medium text-[var(--color-text)] capitalize">
                      {key}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)] mt-0.5">
                      {mergedDescriptions[key]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" onClick={handleSavePreferences}>
                {saveText}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowPreferences(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Simple cookie consent (just accept/reject)
export interface SimpleCookieConsentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Message text
   */
  message?: string
  /**
   * Accept button text
   */
  acceptText?: string
  /**
   * Learn more link URL
   */
  learnMoreUrl?: string
  /**
   * Learn more link text
   */
  learnMoreText?: string
  /**
   * Storage key
   */
  storageKey?: string
  /**
   * Callback on accept
   */
  onAccept?: () => void
}

export function SimpleCookieConsent({
  message = "This website uses cookies to ensure you get the best experience.",
  acceptText = "Got it",
  learnMoreUrl,
  learnMoreText = "Learn more",
  storageKey = "cookie-consent-simple",
  onAccept,
  className,
  ...props
}: SimpleCookieConsentProps) {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const stored = localStorage.getItem(storageKey)
    if (!stored) {
      setIsVisible(true)
    }
  }, [storageKey])

  const handleAccept = () => {
    localStorage.setItem(storageKey, "accepted")
    setIsVisible(false)
    onAccept?.()
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 right-4 z-50",
        "p-4 rounded-[var(--radius-lg)]",
        "bg-[var(--color-surface-inverse)] text-[var(--color-text-inverse)]",
        "shadow-xl",
        "flex flex-col sm:flex-row sm:items-center gap-3",
        "max-w-2xl mx-auto",
        className
      )}
      {...props}
    >
      <p className="flex-1 text-sm">
        {message}
        {learnMoreUrl && (
          <a
            href={learnMoreUrl}
            className="ml-1 underline hover:no-underline"
          >
            {learnMoreText}
          </a>
        )}
      </p>
      <Button
        size="sm"
        onClick={handleAccept}
        className="bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
      >
        {acceptText}
      </Button>
    </div>
  )
}

// Cookie consent hook
export function useCookieConsent(storageKey = "cookie-consent") {
  const [preferences, setPreferences] = React.useState<CookiePreferences | null>(null)

  React.useEffect(() => {
    const stored = localStorage.getItem(storageKey)
    if (stored) {
      try {
        setPreferences(JSON.parse(stored))
      } catch {
        setPreferences(null)
      }
    }
  }, [storageKey])

  const hasConsent = preferences !== null
  const canUseAnalytics = preferences?.analytics ?? false
  const canUseMarketing = preferences?.marketing ?? false
  const canUsePreferences = preferences?.preferences ?? false

  const resetConsent = () => {
    localStorage.removeItem(storageKey)
    setPreferences(null)
    window.location.reload()
  }

  return {
    preferences,
    hasConsent,
    canUseAnalytics,
    canUseMarketing,
    canUsePreferences,
    resetConsent,
  }
}
