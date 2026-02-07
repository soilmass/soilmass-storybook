"use client"

/**
 * Code Block Component
 *
 * Display code snippets with premium styling.
 *
 * Premium patterns:
 * - Syntax highlight glow effect
 * - Copy button animation with checkmark
 * - Smooth line highlight transitions
 * - Header gradient and shadows
 * - Spring transitions throughout
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Icons with animations
const CopyIcon = () => (
  <svg
    className="h-4 w-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-spring)] group-hover:scale-110"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
)

const CheckIcon = () => (
  <svg
    className="h-4 w-4 text-[var(--color-success)] animate-in zoom-in duration-200"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Code content
   */
  code: string
  /**
   * Language label
   */
  language?: string
  /**
   * Show line numbers
   */
  showLineNumbers?: boolean
  /**
   * Lines to highlight (1-indexed)
   */
  highlightLines?: number[]
  /**
   * Show copy button
   */
  showCopy?: boolean
  /**
   * Title/filename
   */
  title?: string
  /**
   * Max height before scrolling
   */
  maxHeight?: number | string
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
  /**
   * Word wrap
   */
  wrap?: boolean
  /**
   * Enable glow effect on highlighted lines
   */
  glowHighlight?: boolean
}

const sizeClasses = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
}

export function CodeBlock({
  code,
  language,
  showLineNumbers = true,
  highlightLines = [],
  showCopy = true,
  title,
  maxHeight,
  size = "md",
  wrap = false,
  glowHighlight = true,
  className,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)
  const lines = code.split("\n")

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] overflow-hidden",
        "border border-[var(--color-border)]",
        "bg-[var(--color-surface-muted)]",
        // Subtle shadow
        "shadow-sm",
        // Hover glow effect
        "transition-shadow duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
        isHovered && "shadow-[0_0_20px_-5px_var(--color-primary)]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Header with gradient */}
      {(title || language || showCopy) && (
        <div
          className={cn(
            "flex items-center justify-between gap-2 px-4 py-2",
            "border-b border-[var(--color-border)]",
            "bg-gradient-to-r from-[var(--color-surface)] to-[var(--color-surface-muted)]"
          )}
        >
          <div className="flex items-center gap-2">
            {/* Decorative dots */}
            <div className="flex items-center gap-1.5 mr-2">
              <div className="h-3 w-3 rounded-full bg-[var(--color-error)]/80" />
              <div className="h-3 w-3 rounded-full bg-[var(--color-warning)]/80" />
              <div className="h-3 w-3 rounded-full bg-[var(--color-success)]/80" />
            </div>
            {title && (
              <span className="text-sm font-medium text-[var(--color-text)]">
                {title}
              </span>
            )}
            {language && !title && (
              <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                {language}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {language && title && (
              <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
                {language}
              </span>
            )}
            {showCopy && (
              <button
                type="button"
                onClick={handleCopy}
                className={cn(
                  "group p-1.5 rounded-[var(--radius-sm)]",
                  "text-[var(--color-text-muted)]",
                  "hover:text-[var(--color-text)]",
                  "hover:bg-[var(--color-surface-hover)]",
                  "transition-all duration-[var(--duration-fast)] ease-[var(--ease-spring)]",
                  // Glow on hover
                  "hover:shadow-[0_0_10px_var(--color-primary)]",
                  copied && "text-[var(--color-success)]"
                )}
                aria-label={copied ? "Copied!" : "Copy code"}
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Code */}
      <div
        className="overflow-auto"
        style={{ maxHeight }}
      >
        <pre
          className={cn(
            "p-4 font-mono",
            sizeClasses[size],
            wrap ? "whitespace-pre-wrap" : "whitespace-pre"
          )}
        >
          <code>
            {lines.map((line, index) => {
              const lineNumber = index + 1
              const isHighlighted = highlightLines.includes(lineNumber)

              return (
                <div
                  key={index}
                  className={cn(
                    "flex",
                    "transition-all duration-[var(--duration-fast)] ease-[var(--ease-spring)]",
                    isHighlighted && [
                      "bg-[var(--color-primary)]/10",
                      "-mx-4 px-4",
                      "border-l-2 border-[var(--color-primary)]",
                      // Glow effect on highlighted lines
                      glowHighlight && "shadow-[inset_0_0_20px_var(--color-primary)]",
                    ]
                  )}
                >
                  {showLineNumbers && (
                    <span
                      className={cn(
                        "select-none text-right pr-4 mr-4",
                        "text-[var(--color-text-muted)]",
                        "border-r border-[var(--color-border)]",
                        "min-w-[3ch]",
                        "transition-colors duration-[var(--duration-fast)]",
                        isHighlighted && "text-[var(--color-primary)]"
                      )}
                      aria-hidden="true"
                    >
                      {lineNumber}
                    </span>
                  )}
                  <span className="flex-1 text-[var(--color-text)]">
                    {line || " "}
                  </span>
                </div>
              )
            })}
          </code>
        </pre>
      </div>
    </div>
  )
}

// Inline code with subtle styling
export interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {}

export function InlineCode({ className, children, ...props }: InlineCodeProps) {
  return (
    <code
      className={cn(
        "px-1.5 py-0.5 rounded-[var(--radius-sm)]",
        "font-mono text-sm",
        // Gradient background
        "bg-gradient-to-b from-[var(--color-surface-muted)] to-[var(--color-surface)]",
        "text-[var(--color-text)]",
        "border border-[var(--color-border)]",
        // Subtle shadow
        "shadow-[inset_0_-1px_0_var(--color-border)]",
        className
      )}
      {...props}
    >
      {children}
    </code>
  )
}

// Terminal/Console output with premium styling
export interface TerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Output lines
   */
  lines: string[]
  /**
   * Title
   */
  title?: string
  /**
   * Max height
   */
  maxHeight?: number | string
  /**
   * Show prompt character
   */
  showPrompt?: boolean
  /**
   * Prompt character
   */
  prompt?: string
}

export function Terminal({
  lines,
  title = "Terminal",
  maxHeight,
  showPrompt = true,
  prompt = "$",
  className,
  ...props
}: TerminalProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] overflow-hidden",
        "border border-[var(--color-border)]",
        "bg-[var(--color-surface-inverse)]",
        // Premium shadow
        "shadow-lg shadow-black/20",
        className
      )}
      {...props}
    >
      {/* Window chrome with gradient */}
      <div
        className={cn(
          "flex items-center gap-2 px-4 py-3",
          "bg-gradient-to-b from-[var(--color-surface-inverse)] to-[rgba(0,0,0,0.3)]",
          "border-b border-white/10"
        )}
      >
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[var(--color-error)] shadow-[0_0_6px_var(--color-error)]" />
          <div className="h-3 w-3 rounded-full bg-[var(--color-warning)] shadow-[0_0_6px_var(--color-warning)]" />
          <div className="h-3 w-3 rounded-full bg-[var(--color-success)] shadow-[0_0_6px_var(--color-success)]" />
        </div>
        <span className="flex-1 text-center text-sm text-[var(--color-text-muted)]">{title}</span>
      </div>

      {/* Output */}
      <div className="overflow-auto" style={{ maxHeight }}>
        <pre className="p-4 font-mono text-sm">
          {lines.map((line, index) => (
            <div key={index} className="flex group">
              {showPrompt && (
                <span className={cn(
                  "text-[var(--color-success)] mr-2 select-none",
                  "transition-all duration-[var(--duration-fast)]",
                  "group-hover:text-shadow-[0_0_8px_var(--color-success)]"
                )}>
                  {prompt}
                </span>
              )}
              <span className="text-[var(--color-text-inverse)]">{line}</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}

// Diff view
export interface DiffLine {
  type: "added" | "removed" | "unchanged"
  content: string
}

export interface DiffViewProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Diff lines
   */
  lines: DiffLine[]
  /**
   * Title
   */
  title?: string
  /**
   * Show line numbers
   */
  showLineNumbers?: boolean
}

export function DiffView({
  lines,
  title,
  showLineNumbers = true,
  className,
  ...props
}: DiffViewProps) {
  let addedLineNum = 0
  let removedLineNum = 0

  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] overflow-hidden",
        "border border-[var(--color-border)]",
        "shadow-sm",
        className
      )}
      {...props}
    >
      {title && (
        <div
          className={cn(
            "px-4 py-2 border-b border-[var(--color-border)]",
            "bg-gradient-to-r from-[var(--color-surface)] to-[var(--color-surface-muted)]",
            "text-sm font-medium text-[var(--color-text)]"
          )}
        >
          {title}
        </div>
      )}
      <div className="overflow-auto">
        <pre className="font-mono text-sm">
          {lines.map((line, index) => {
            if (line.type === "added") addedLineNum++
            if (line.type === "removed") removedLineNum++
            if (line.type === "unchanged") {
              addedLineNum++
              removedLineNum++
            }

            return (
              <div
                key={index}
                className={cn(
                  "flex px-4 py-0.5",
                  "transition-all duration-[var(--duration-fast)] ease-[var(--ease-spring)]",
                  line.type === "added" && [
                    "bg-[var(--color-success)]/10",
                    "hover:bg-[var(--color-success)]/20",
                  ],
                  line.type === "removed" && [
                    "bg-[var(--color-error)]/10",
                    "hover:bg-[var(--color-error)]/20",
                  ]
                )}
              >
                {showLineNumbers && (
                  <span className="select-none text-right pr-2 mr-2 text-[var(--color-text-muted)] min-w-[3ch]">
                    {line.type !== "added" ? removedLineNum : " "}
                  </span>
                )}
                {showLineNumbers && (
                  <span className="select-none text-right pr-4 mr-4 text-[var(--color-text-muted)] min-w-[3ch] border-r border-[var(--color-border)]">
                    {line.type !== "removed" ? addedLineNum : " "}
                  </span>
                )}
                <span
                  className={cn(
                    "select-none w-4 flex-shrink-0 font-bold",
                    line.type === "added" && "text-[var(--color-success)]",
                    line.type === "removed" && "text-[var(--color-error)]"
                  )}
                >
                  {line.type === "added" && "+"}
                  {line.type === "removed" && "-"}
                </span>
                <span
                  className={cn(
                    "flex-1",
                    line.type === "added" && "text-[var(--color-success)]",
                    line.type === "removed" && "text-[var(--color-error)]",
                    line.type === "unchanged" && "text-[var(--color-text)]"
                  )}
                >
                  {line.content}
                </span>
              </div>
            )
          })}
        </pre>
      </div>
    </div>
  )
}
