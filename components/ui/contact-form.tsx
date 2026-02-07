"use client"

/**
 * Contact Form Component
 *
 * Contact page form with validation.
 * Features:
 * - Name, email, subject, message fields
 * - Field validation
 * - Loading state with animations
 * - Success/error messages
 * - Optional fields
 * - Focus glow effects
 * - Submit button glow
 * - Spring transitions
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Input, Textarea, FormField, Label, FormError } from "./input"

// Icons
const CheckIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

export interface ContactFormData {
  name: string
  email: string
  subject?: string
  phone?: string
  company?: string
  message: string
}

export interface ContactFormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  /**
   * Form submission handler
   */
  onSubmit: (data: ContactFormData) => Promise<void> | void
  /**
   * Show subject field
   */
  showSubject?: boolean
  /**
   * Show phone field
   */
  showPhone?: boolean
  /**
   * Show company field
   */
  showCompany?: boolean
  /**
   * Subject options (if provided, shows select instead of input)
   */
  subjectOptions?: string[]
  /**
   * Submit button text
   */
  submitText?: string
  /**
   * Success message
   */
  successMessage?: string
  /**
   * Success description
   */
  successDescription?: string
  /**
   * Form heading
   */
  heading?: string
  /**
   * Form description
   */
  description?: string
  /**
   * Variant
   */
  variant?: "default" | "card"
}

export function ContactForm({
  onSubmit,
  showSubject = true,
  showPhone = false,
  showCompany = false,
  subjectOptions,
  submitText = "Send message",
  successMessage = "Message sent!",
  successDescription = "We'll get back to you as soon as possible.",
  heading,
  description,
  variant = "default",
  className,
  ...props
}: ContactFormProps) {
  const [formData, setFormData] = React.useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    phone: "",
    company: "",
    message: "",
  })
  const [errors, setErrors] = React.useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = React.useState("")

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true // Optional field
    return /^[\d\s\-+()]{7,}$/.test(phone)
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (showPhone && formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    if (!validate()) return

    setStatus("loading")

    try {
      await onSubmit(formData)
      setStatus("success")
      setFormData({
        name: "",
        email: "",
        subject: "",
        phone: "",
        company: "",
        message: "",
      })
    } catch (error) {
      setStatus("error")
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      )
    }
  }

  // Success state with animation
  if (status === "success") {
    return (
      <div
        className={cn(
          "text-center py-12 animate-in fade-in zoom-in-95 duration-500",
          variant === "card" && [
            "rounded-[var(--radius-xl)]",
            "bg-[var(--color-surface)]",
            "border border-[var(--color-border)]",
            "p-8",
            "shadow-lg",
          ],
          className
        )}
      >
        <div className={cn(
          "inline-flex items-center justify-center h-16 w-16 rounded-full",
          "bg-[var(--color-success)]/10 text-[var(--color-success)] mb-4",
          "animate-in zoom-in duration-500"
        )}>
          <CheckIcon />
        </div>
        <h3 className="text-xl font-semibold text-[var(--color-text)]">
          {successMessage}
        </h3>
        <p className="mt-2 text-[var(--color-text-muted)]">
          {successDescription}
        </p>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "mt-6",
            "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            "hover:scale-105 active:scale-95"
          )}
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    )
  }

  // Input focus styles
  const inputFocusStyles = cn(
    "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
    "focus:ring-2 focus:ring-[var(--color-primary)]/50",
    "focus:border-[var(--color-primary)]",
    "focus:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.15)]"
  )

  return (
    <div
      className={cn(
        variant === "card" && [
          "rounded-[var(--radius-xl)]",
          "bg-[var(--color-surface)]",
          "border border-[var(--color-border)]",
          "p-6 md:p-8",
          "shadow-lg",
          "transition-all duration-500",
          "hover:shadow-xl",
        ],
        className
      )}
    >
      {/* Header */}
      {(heading || description) && (
        <div className="mb-6">
          {heading && (
            <h2 className="text-2xl font-bold text-[var(--color-text)]">
              {heading}
            </h2>
          )}
          {description && (
            <p className="mt-2 text-[var(--color-text-muted)]">{description}</p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} {...props}>
        <div className="space-y-5">
          {/* Name and Email row */}
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField className="group">
              <Label htmlFor="name" className="transition-colors duration-200 group-focus-within:text-[var(--color-primary)]">
                Name *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange("name")}
                placeholder="Your name"
                error={!!errors.name}
                disabled={status === "loading"}
                className={inputFocusStyles}
              />
              {errors.name && <FormError className="animate-in fade-in slide-in-from-top-1 duration-200">{errors.name}</FormError>}
            </FormField>

            <FormField className="group">
              <Label htmlFor="email" className="transition-colors duration-200 group-focus-within:text-[var(--color-primary)]">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
                placeholder="your@email.com"
                error={!!errors.email}
                disabled={status === "loading"}
                className={inputFocusStyles}
              />
              {errors.email && <FormError className="animate-in fade-in slide-in-from-top-1 duration-200">{errors.email}</FormError>}
            </FormField>
          </div>

          {/* Phone and Company row */}
          {(showPhone || showCompany) && (
            <div className="grid gap-5 sm:grid-cols-2">
              {showPhone && (
                <FormField className="group">
                  <Label htmlFor="phone" className="transition-colors duration-200 group-focus-within:text-[var(--color-primary)]">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange("phone")}
                    placeholder="+1 (555) 000-0000"
                    error={!!errors.phone}
                    disabled={status === "loading"}
                    className={inputFocusStyles}
                  />
                  {errors.phone && <FormError className="animate-in fade-in slide-in-from-top-1 duration-200">{errors.phone}</FormError>}
                </FormField>
              )}

              {showCompany && (
                <FormField className="group">
                  <Label htmlFor="company" className="transition-colors duration-200 group-focus-within:text-[var(--color-primary)]">
                    Company
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange("company")}
                    placeholder="Your company"
                    disabled={status === "loading"}
                    className={inputFocusStyles}
                  />
                </FormField>
              )}
            </div>
          )}

          {/* Subject */}
          {showSubject && (
            <FormField className="group">
              <Label htmlFor="subject" className="transition-colors duration-200 group-focus-within:text-[var(--color-primary)]">
                Subject
              </Label>
              {subjectOptions ? (
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange("subject")}
                  disabled={status === "loading"}
                  className={cn(
                    "w-full h-12 px-4 rounded-[var(--radius-md)]",
                    "border border-[var(--color-border)]",
                    "bg-[var(--color-surface)]",
                    "text-[var(--color-text)]",
                    "focus:outline-none",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    inputFocusStyles
                  )}
                >
                  <option value="">Select a subject</option>
                  {subjectOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange("subject")}
                  placeholder="How can we help?"
                  disabled={status === "loading"}
                  className={inputFocusStyles}
                />
              )}
            </FormField>
          )}

          {/* Message */}
          <FormField className="group">
            <Label htmlFor="message" className="transition-colors duration-200 group-focus-within:text-[var(--color-primary)]">
              Message *
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={handleChange("message")}
              placeholder="Tell us more about your inquiry..."
              rows={5}
              error={!!errors.message}
              disabled={status === "loading"}
              className={inputFocusStyles}
            />
            {errors.message && <FormError className="animate-in fade-in slide-in-from-top-1 duration-200">{errors.message}</FormError>}
          </FormField>

          {/* Error message */}
          {status === "error" && errorMessage && (
            <div className={cn(
              "p-4 rounded-[var(--radius-md)]",
              "bg-[var(--color-error)]/10 text-[var(--color-error)] text-sm",
              "animate-in fade-in slide-in-from-top-2 duration-300"
            )}>
              {errorMessage}
            </div>
          )}

          {/* Submit button with glow effect */}
          <Button
            type="submit"
            className={cn(
              "w-full sm:w-auto",
              "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              "hover:scale-[1.02] hover:shadow-lg hover:shadow-[var(--color-primary)]/25",
              "active:scale-[0.98]",
              "disabled:hover:scale-100 disabled:hover:shadow-none"
            )}
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <span className="flex items-center gap-2">
                <SpinnerIcon />
                <span>Sending...</span>
              </span>
            ) : (
              submitText
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

// Simple contact form (name, email, message only)
export interface SimpleContactFormProps extends Omit<ContactFormProps, "showSubject" | "showPhone" | "showCompany" | "subjectOptions"> {}

export function SimpleContactForm(props: SimpleContactFormProps) {
  return (
    <ContactForm
      showSubject={false}
      showPhone={false}
      showCompany={false}
      {...props}
    />
  )
}
