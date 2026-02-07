/**
 * Empty State Component
 *
 * Placeholder for when there's no content to display.
 * Features:
 * - Illustration/icon
 * - Title and description
 * - Action button
 * - Variants for different contexts
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "./button"

// Default empty illustration
const DefaultIllustration = () => (
  <svg
    className="h-24 w-24 text-[var(--color-text-muted)]"
    fill="none"
    viewBox="0 0 96 96"
    stroke="currentColor"
    strokeWidth={1}
  >
    <rect x="12" y="20" width="72" height="56" rx="4" />
    <path d="M12 32h72" />
    <circle cx="24" cy="26" r="2" />
    <circle cx="32" cy="26" r="2" />
    <circle cx="40" cy="26" r="2" />
    <rect x="24" y="44" width="48" height="4" rx="1" />
    <rect x="24" y="52" width="36" height="4" rx="1" />
    <rect x="24" y="60" width="24" height="4" rx="1" />
  </svg>
)

// No results illustration
const NoResultsIllustration = () => (
  <svg
    className="h-24 w-24 text-[var(--color-text-muted)]"
    fill="none"
    viewBox="0 0 96 96"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <circle cx="40" cy="40" r="24" />
    <path d="M58 58l16 16" strokeLinecap="round" />
    <path d="M32 40h16" strokeLinecap="round" />
  </svg>
)

// Error illustration
const ErrorIllustration = () => (
  <svg
    className="h-24 w-24 text-[var(--color-error)]"
    fill="none"
    viewBox="0 0 96 96"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <circle cx="48" cy="48" r="32" />
    <path d="M48 32v20" strokeLinecap="round" />
    <circle cx="48" cy="62" r="2" fill="currentColor" />
  </svg>
)

// Success illustration
const SuccessIllustration = () => (
  <svg
    className="h-24 w-24 text-[var(--color-success)]"
    fill="none"
    viewBox="0 0 96 96"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <circle cx="48" cy="48" r="32" />
    <path d="M34 48l10 10 18-20" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const illustrations = {
  default: DefaultIllustration,
  noResults: NoResultsIllustration,
  error: ErrorIllustration,
  success: SuccessIllustration,
}

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Title text
   */
  title: string
  /**
   * Description text
   */
  description?: string
  /**
   * Preset illustration type
   */
  variant?: keyof typeof illustrations
  /**
   * Custom icon/illustration
   */
  icon?: React.ReactNode
  /**
   * Primary action button
   */
  action?: {
    label: string
    onClick: () => void
    variant?: ButtonProps["variant"]
  }
  /**
   * Secondary action button
   */
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: {
    container: "py-8 px-4",
    icon: "h-16 w-16",
    title: "text-base",
    description: "text-sm",
    gap: "gap-3",
  },
  md: {
    container: "py-12 px-6",
    icon: "h-24 w-24",
    title: "text-lg",
    description: "text-sm",
    gap: "gap-4",
  },
  lg: {
    container: "py-16 px-8",
    icon: "h-32 w-32",
    title: "text-xl",
    description: "text-base",
    gap: "gap-6",
  },
}

export function EmptyState({
  title,
  description,
  variant = "default",
  icon,
  action,
  secondaryAction,
  size = "md",
  className,
  ...props
}: EmptyStateProps) {
  const Illustration = illustrations[variant]
  const sizeConfig = sizeClasses[size]

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        "rounded-[var(--radius-lg)]",
        "bg-[var(--color-surface)]",
        "border border-[var(--color-border-subtle)]",
        "shadow-[var(--shadow-card)]",
        "animate-[fadeIn_0.4s_ease-[var(--ease-spring)]]",
        sizeConfig.container,
        sizeConfig.gap,
        className
      )}
      {...props}
    >
      {/* Icon/Illustration */}
      {icon || (
        <div
          className={cn(
            "text-[var(--color-text-muted)]",
            "animate-[fadeIn_0.5s_ease-[var(--ease-spring)]_0.1s_both]",
            sizeConfig.icon
          )}
        >
          <Illustration />
        </div>
      )}

      {/* Text content */}
      <div className="space-y-1 animate-[slideUp_0.4s_ease-[var(--ease-spring)]_0.2s_both]">
        <h3
          className={cn(
            "font-semibold text-[var(--color-text)]",
            sizeConfig.title
          )}
        >
          {title}
        </h3>
        {description && (
          <p
            className={cn(
              "text-[var(--color-text-muted)] max-w-sm",
              sizeConfig.description
            )}
          >
            {description}
          </p>
        )}
      </div>

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="flex items-center gap-3 mt-2 animate-[slideUp_0.4s_ease-[var(--ease-spring)]_0.3s_both]">
          {action && (
            <Button
              variant={action.variant || "primary"}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="outline" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

// Convenience components for common cases
export function NoResults({
  query,
  onClear,
  ...props
}: Omit<EmptyStateProps, "title" | "variant"> & {
  query?: string
  onClear?: () => void
}) {
  return (
    <EmptyState
      variant="noResults"
      title="No results found"
      description={
        query
          ? `No results for "${query}". Try a different search term.`
          : "Try adjusting your search or filters."
      }
      action={
        onClear
          ? {
              label: "Clear search",
              onClick: onClear,
              variant: "outline",
            }
          : undefined
      }
      {...props}
    />
  )
}

export function ErrorState({
  onRetry,
  ...props
}: Omit<EmptyStateProps, "title" | "variant"> & {
  onRetry?: () => void
}) {
  return (
    <EmptyState
      variant="error"
      title="Something went wrong"
      description="We encountered an error loading this content. Please try again."
      action={
        onRetry
          ? {
              label: "Try again",
              onClick: onRetry,
            }
          : undefined
      }
      {...props}
    />
  )
}

export function SuccessState({
  ...props
}: Omit<EmptyStateProps, "variant">) {
  return <EmptyState variant="success" {...props} />
}
