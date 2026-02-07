"use client"

/**
 * Newsletter Form Component
 *
 * Email signup form for newsletters.
 * Features:
 * - Email input with validation
 * - Inline and stacked layouts
 * - Loading state with animations
 * - Success/error messages
 * - Privacy note option
 * - Focus glow effects
 * - Button spring animations
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

// Icons
const MailIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)

const CheckIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const SpinnerIcon = () => (
  <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)

export interface NewsletterFormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  /**
   * Form submission handler
   */
  onSubmit: (email: string) => Promise<void> | void
  /**
   * Placeholder text
   */
  placeholder?: string
  /**
   * Submit button text
   */
  buttonText?: string
  /**
   * Layout variant
   */
  layout?: "inline" | "stacked"
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
  /**
   * Privacy note text
   */
  privacyNote?: React.ReactNode
  /**
   * Success message
   */
  successMessage?: string
  /**
   * Show icon in input
   */
  showIcon?: boolean
  /**
   * Heading text
   */
  heading?: string
  /**
   * Description text
   */
  description?: string
}

const sizeClasses = {
  sm: {
    input: "h-10 text-sm px-3",
    button: "h-10 px-4 text-sm",
    inputWithIcon: "pl-10",
    icon: "left-3",
  },
  md: {
    input: "h-12 text-sm px-4",
    button: "h-12 px-6 text-sm",
    inputWithIcon: "pl-12",
    icon: "left-4",
  },
  lg: {
    input: "h-14 text-base px-5",
    button: "h-14 px-8 text-base",
    inputWithIcon: "pl-14",
    icon: "left-5",
  },
}

export function NewsletterForm({
  onSubmit,
  placeholder = "Enter your email",
  buttonText = "Subscribe",
  layout = "inline",
  size = "md",
  privacyNote,
  successMessage = "Thanks for subscribing!",
  showIcon = true,
  heading,
  description,
  className,
  ...props
}: NewsletterFormProps) {
  const [email, setEmail] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = React.useState("")

  const sizeClass = sizeClasses[size]

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    if (!validateEmail(email)) {
      setStatus("error")
      setErrorMessage("Please enter a valid email address")
      return
    }

    setStatus("loading")

    try {
      await onSubmit(email)
      setStatus("success")
      setEmail("")
    } catch (error) {
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong")
    }
  }

  // Success state with animation
  if (status === "success") {
    return (
      <div className={cn("text-center animate-in fade-in zoom-in-95 duration-500", className)}>
        <div className="inline-flex items-center gap-2 text-[var(--color-success)]">
          <span className="flex items-center justify-center h-8 w-8 rounded-full bg-[var(--color-success)]/10 animate-in zoom-in duration-300">
            <CheckIcon />
          </span>
          <span className="font-medium">{successMessage}</span>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Header */}
      {(heading || description) && (
        <div className={cn("mb-4", layout === "inline" ? "" : "text-center")}>
          {heading && (
            <h3 className="font-semibold text-[var(--color-text)]">{heading}</h3>
          )}
          {description && (
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              {description}
            </p>
          )}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={cn(
          layout === "inline"
            ? "flex flex-col sm:flex-row gap-3"
            : "space-y-3"
        )}
        {...props}
      >
        {/* Email input with focus glow */}
        <div className={cn("relative group", layout === "inline" ? "flex-1" : "")}>
          {showIcon && (
            <span
              className={cn(
                "absolute top-1/2 -translate-y-1/2",
                "text-[var(--color-text-muted)]",
                "pointer-events-none",
                "transition-colors duration-300",
                "group-focus-within:text-[var(--color-primary)]",
                sizeClass.icon
              )}
            >
              <MailIcon />
            </span>
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (status === "error") setStatus("idle")
            }}
            placeholder={placeholder}
            disabled={status === "loading"}
            aria-label="Email address"
            aria-invalid={status === "error"}
            className={cn(
              "w-full rounded-[var(--radius-lg)]",
              "border bg-[var(--color-surface)]",
              "text-[var(--color-text)]",
              "placeholder:text-[var(--color-text-muted)]",
              "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50",
              "focus:border-[var(--color-primary)]",
              "focus:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.15)]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              sizeClass.input,
              showIcon && sizeClass.inputWithIcon,
              status === "error"
                ? "border-[var(--color-error)] focus:ring-[var(--color-error)]/50"
                : "border-[var(--color-border)]"
            )}
          />
        </div>

        {/* Submit button with spring animation and glow */}
        <Button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            layout === "stacked" && "w-full",
            sizeClass.button,
            "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            "hover:scale-[1.02] hover:shadow-lg hover:shadow-[var(--color-primary)]/25",
            "active:scale-[0.98]",
            "disabled:hover:scale-100 disabled:hover:shadow-none"
          )}
        >
          {status === "loading" ? (
            <span className="flex items-center gap-2">
              <SpinnerIcon />
              <span>Subscribing...</span>
            </span>
          ) : (
            buttonText
          )}
        </Button>
      </form>

      {/* Error message with animation */}
      {status === "error" && errorMessage && (
        <p
          className="mt-2 text-sm text-[var(--color-error)] animate-in fade-in slide-in-from-top-1 duration-300"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      {/* Privacy note */}
      {privacyNote && (
        <p className="mt-3 text-xs text-[var(--color-text-muted)]">
          {privacyNote}
        </p>
      )}
    </div>
  )
}

// Newsletter section with full styling
export interface NewsletterSectionProps extends NewsletterFormProps {
  /**
   * Background variant
   */
  variant?: "default" | "muted" | "primary" | "gradient"
}

export function NewsletterSection({
  variant = "muted",
  heading = "Subscribe to our newsletter",
  description = "Get the latest updates and news delivered to your inbox.",
  className,
  ...props
}: NewsletterSectionProps) {
  const variantClasses = {
    default: "bg-[var(--color-surface)] border border-[var(--color-border)]",
    muted: "bg-[var(--color-surface-muted)]",
    primary: "bg-[var(--color-primary)] text-white",
    gradient: "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] text-white",
  }

  const isPrimary = variant === "primary" || variant === "gradient"

  return (
    <section
      className={cn(
        "py-12 px-6 rounded-[var(--radius-xl)]",
        "transition-all duration-500",
        "hover:shadow-xl",
        variantClasses[variant],
        className
      )}
    >
      <div className="max-w-xl mx-auto text-center">
        {heading && (
          <h2
            className={cn(
              "text-2xl font-bold",
              isPrimary ? "text-white" : "text-[var(--color-text)]"
            )}
          >
            {heading}
          </h2>
        )}
        {description && (
          <p
            className={cn(
              "mt-2 text-base",
              isPrimary ? "text-white/80" : "text-[var(--color-text-muted)]"
            )}
          >
            {description}
          </p>
        )}
        <div className="mt-6">
          <NewsletterForm
            layout="inline"
            heading={undefined}
            description={undefined}
            {...props}
          />
        </div>
      </div>
    </section>
  )
}

// Minimal inline newsletter (for footer)
export interface InlineNewsletterProps extends Omit<NewsletterFormProps, "layout" | "heading" | "description"> {}

export function InlineNewsletter(props: InlineNewsletterProps) {
  return (
    <NewsletterForm
      layout="inline"
      showIcon={false}
      size="sm"
      {...props}
    />
  )
}
