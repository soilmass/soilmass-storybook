"use client"

/**
 * Copy Button Component
 *
 * Copy-to-clipboard functionality with premium feedback.
 * Features:
 * - Clipboard API integration
 * - Animated success checkmark
 * - Spring transitions
 * - Tooltip with entrance animation
 * - Glow effect on success
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Animated Copy Icon
const CopyIcon = ({ className }: { className?: string }) => (
  <svg className={cn("h-4 w-4", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
)

// Animated Check Icon with draw-in effect
const CheckIcon = ({ className, animate = false }: { className?: string; animate?: boolean }) => (
  <svg className={cn("h-4 w-4", className)} viewBox="0 0 24 24" fill="none">
    <path
      d="M5 13l4 4L19 7"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        animate && "animate-[draw-check_0.3s_ease-out_forwards]"
      )}
      style={{
        strokeDasharray: 24,
        strokeDashoffset: animate ? 0 : 24,
      }}
    />
  </svg>
)

const LinkIcon = ({ className }: { className?: string }) => (
  <svg className={cn("h-4 w-4", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    />
  </svg>
)

export interface CopyButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  value: string
  variant?: "default" | "ghost" | "outline" | "minimal"
  size?: "sm" | "md" | "lg"
  showTooltip?: boolean
  tooltipText?: string
  copiedText?: string
  copiedDuration?: number
  iconType?: "copy" | "link"
  showLabel?: boolean
  label?: string
  copiedLabel?: string
  onCopy?: (value: string) => void
  onError?: (error: Error) => void
}

const sizeClasses = {
  sm: "h-7 w-7",
  md: "h-9 w-9",
  lg: "h-11 w-11",
}

const sizeWithLabelClasses = {
  sm: "h-7 px-2 gap-1.5",
  md: "h-9 px-3 gap-2",
  lg: "h-11 px-4 gap-2",
}

const variantClasses = {
  default: [
    "bg-[var(--color-surface)]",
    "border border-[var(--color-border)]",
    "text-[var(--color-text)]",
    "hover:bg-[var(--color-surface-hover)]",
  ],
  ghost: [
    "text-[var(--color-text-muted)]",
    "hover:text-[var(--color-text)]",
    "hover:bg-[var(--color-surface-hover)]",
  ],
  outline: [
    "border border-[var(--color-border)]",
    "text-[var(--color-text)]",
    "hover:bg-[var(--color-surface-hover)]",
  ],
  minimal: [
    "text-[var(--color-text-muted)]",
    "hover:text-[var(--color-text)]",
  ],
}

export function CopyButton({
  value,
  variant = "ghost",
  size = "md",
  showTooltip = true,
  tooltipText = "Copy",
  copiedText = "Copied!",
  copiedDuration = 2000,
  iconType = "copy",
  showLabel = false,
  label = "Copy",
  copiedLabel = "Copied",
  onCopy,
  onError,
  className,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)
  const [showTooltipState, setShowTooltipState] = React.useState(false)
  const [isAnimating, setIsAnimating] = React.useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout>()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setIsAnimating(true)
      onCopy?.(value)

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        setCopied(false)
        setIsAnimating(false)
      }, copiedDuration)
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error("Failed to copy"))
    }
  }

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const Icon = iconType === "link" ? LinkIcon : CopyIcon
  const currentLabel = copied ? copiedLabel : label
  const currentTooltip = copied ? copiedText : tooltipText

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onClick={handleCopy}
        onMouseEnter={() => setShowTooltipState(true)}
        onMouseLeave={() => setShowTooltipState(false)}
        className={cn(
          "inline-flex items-center justify-center rounded-[var(--radius-md)]",
          "transition-all duration-[var(--duration-fast)] ease-[var(--ease-spring)]",
          "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:ring-offset-2",
          // Micro-interactions
          "hover:scale-105 active:scale-95",
          showLabel ? sizeWithLabelClasses[size] : sizeClasses[size],
          variantClasses[variant],
          // Success state with glow
          copied && [
            "text-[var(--color-success)]",
            "shadow-[0_0_16px_rgba(var(--color-success-rgb),0.3)]",
            "scale-110",
          ],
          className
        )}
        aria-label={currentTooltip}
        {...props}
      >
        {/* Icon container with swap animation */}
        <span
          className={cn(
            "relative flex items-center justify-center",
            "transition-transform duration-300 ease-[var(--ease-spring)]",
            copied && "text-[var(--color-success)]"
          )}
        >
          {copied ? (
            <CheckIcon animate={isAnimating} className="text-[var(--color-success)]" />
          ) : (
            <Icon />
          )}
        </span>

        {showLabel && (
          <span
            className={cn(
              "text-sm transition-all duration-200",
              copied && "text-[var(--color-success)]"
            )}
          >
            {currentLabel}
          </span>
        )}

        {/* Success ripple effect */}
        {isAnimating && (
          <span
            className={cn(
              "absolute inset-0 rounded-[var(--radius-md)]",
              "animate-[ripple-out_0.4s_ease-out_forwards]",
              "bg-[var(--color-success)]/20"
            )}
          />
        )}
      </button>

      {/* Tooltip with spring animation */}
      {showTooltip && showTooltipState && (
        <div
          className={cn(
            "absolute bottom-full left-1/2 -translate-x-1/2 mb-2",
            "px-2 py-1 rounded-[var(--radius-sm)]",
            "text-xs font-medium whitespace-nowrap",
            "bg-[var(--color-surface-inverse)] text-[var(--color-text-inverse)]",
            "pointer-events-none",
            "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-1",
            "duration-150",
            // Success tooltip glow
            copied && "shadow-[0_0_12px_rgba(var(--color-success-rgb),0.3)]"
          )}
        >
          {currentTooltip}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[var(--color-surface-inverse)]" />
        </div>
      )}
    </div>
  )
}

// Copy link button
export interface CopyLinkButtonProps extends Omit<CopyButtonProps, "value" | "iconType"> {
  url?: string
}

export function CopyLinkButton({
  url,
  tooltipText = "Copy link",
  copiedText = "Link copied!",
  label = "Copy link",
  copiedLabel = "Copied",
  ...props
}: CopyLinkButtonProps) {
  const [currentUrl, setCurrentUrl] = React.useState(url || "")

  React.useEffect(() => {
    if (!url && typeof window !== "undefined") {
      setCurrentUrl(window.location.href)
    }
  }, [url])

  return (
    <CopyButton
      value={currentUrl}
      iconType="link"
      tooltipText={tooltipText}
      copiedText={copiedText}
      label={label}
      copiedLabel={copiedLabel}
      {...props}
    />
  )
}

// Copy code block with premium styling
export interface CopyCodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  showLineNumbers?: boolean
}

export function CopyCodeBlock({
  code,
  language,
  showLineNumbers = false,
  className,
  ...props
}: CopyCodeBlockProps) {
  const lines = code.split("\n")

  return (
    <div
      className={cn(
        "group relative rounded-[var(--radius-lg)] overflow-hidden",
        "bg-[var(--color-surface-inverse)]",
        "transition-shadow duration-300",
        "hover:shadow-lg",
        className
      )}
      {...props}
    >
      {/* Copy button with hover reveal */}
      <div className={cn(
        "absolute top-2 right-2 z-10",
        "opacity-0 group-hover:opacity-100",
        "transition-all duration-200",
        "translate-y-1 group-hover:translate-y-0"
      )}>
        <CopyButton
          value={code}
          variant="ghost"
          size="sm"
          className="text-[var(--color-text-muted)] hover:text-[var(--color-text-inverse)] hover:bg-white/10"
        />
      </div>

      {/* Language badge */}
      {language && (
        <div className="absolute top-2 left-3 text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
          {language}
        </div>
      )}

      {/* Code content */}
      <pre
        className={cn(
          "p-4 pt-10 overflow-x-auto",
          "text-sm font-mono text-[var(--color-text-inverse)]"
        )}
      >
        <code>
          {showLineNumbers ? (
            <table className="border-collapse">
              <tbody>
                {lines.map((line, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    <td className="pr-4 text-[var(--color-text-muted)] select-none text-right">
                      {index + 1}
                    </td>
                    <td className="whitespace-pre">{line}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            code
          )}
        </code>
      </pre>
    </div>
  )
}

// Copy input (text field with copy button)
export interface CopyInputProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  label?: string
  readOnly?: boolean
}

export function CopyInput({
  value,
  label,
  className,
  ...props
}: CopyInputProps) {
  return (
    <div className={cn("space-y-1.5", className)} {...props}>
      {label && (
        <label className="block text-sm font-medium text-[var(--color-text)]">
          {label}
        </label>
      )}
      <div className="flex group">
        <input
          type="text"
          value={value}
          readOnly
          className={cn(
            "flex-1 h-10 px-3",
            "rounded-l-[var(--radius-md)]",
            "border border-r-0 border-[var(--color-border)]",
            "bg-[var(--color-surface-muted)]",
            "text-[var(--color-text)]",
            "text-sm font-mono",
            "transition-all duration-200",
            "focus:outline-none",
            "group-hover:border-[var(--color-border-hover)]"
          )}
        />
        <CopyButton
          value={value}
          variant="default"
          className="rounded-l-none border-l-0"
          showLabel
          label="Copy"
          copiedLabel="Copied"
        />
      </div>
    </div>
  )
}

// Share URL component
export interface ShareUrlProps extends React.HTMLAttributes<HTMLDivElement> {
  url: string
  title?: string
  description?: string
}

export function ShareUrl({
  url,
  title = "Share this link",
  description,
  className,
  ...props
}: ShareUrlProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-[var(--radius-lg)]",
        "border border-[var(--color-border)]",
        "bg-[var(--color-surface)]",
        "transition-all duration-200",
        "hover:shadow-md hover:border-[var(--color-border-hover)]",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-[var(--color-text)]">{title}</h4>
          {description && (
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              {description}
            </p>
          )}
          <p className="mt-2 text-sm font-mono text-[var(--color-text-muted)] truncate">
            {url}
          </p>
        </div>
        <CopyLinkButton url={url} variant="default" />
      </div>
    </div>
  )
}
