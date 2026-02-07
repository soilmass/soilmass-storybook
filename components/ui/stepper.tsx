"use client"

/**
 * Stepper/Steps Component
 *
 * Display multi-step process progress.
 * Features:
 * - Step numbers or icons
 * - Labels and descriptions
 * - Completion status
 * - Horizontal and vertical layouts
 * - Clickable steps
 * - Premium design: active step glow, completed checkmark animation, spring transitions
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Animated Check Icon
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("h-4 w-4", className)}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M5 13l4 4L19 7"
      className="animate-[draw-check_0.4s_ease-out_forwards]"
      style={{
        strokeDasharray: 24,
        strokeDashoffset: 24,
      }}
    />
  </svg>
)

export type StepStatus = "complete" | "current" | "upcoming"

export interface Step {
  /**
   * Step label
   */
  label: string
  /**
   * Optional description
   */
  description?: string
  /**
   * Optional custom icon
   */
  icon?: React.ReactNode
  /**
   * Optional error state
   */
  error?: boolean
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of steps
   */
  steps: Step[]
  /**
   * Current active step (0-indexed)
   */
  currentStep: number
  /**
   * Layout orientation
   */
  orientation?: "horizontal" | "vertical"
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
  /**
   * Callback when a step is clicked
   */
  onStepClick?: (index: number) => void
  /**
   * Whether completed steps are clickable
   */
  allowClickCompleted?: boolean
}

const sizeClasses = {
  sm: {
    indicator: "h-6 w-6 text-xs",
    label: "text-xs",
    description: "text-[10px]",
    connector: "h-0.5",
    connectorVertical: "w-0.5",
  },
  md: {
    indicator: "h-8 w-8 text-sm",
    label: "text-sm",
    description: "text-xs",
    connector: "h-0.5",
    connectorVertical: "w-0.5",
  },
  lg: {
    indicator: "h-10 w-10 text-base",
    label: "text-base",
    description: "text-sm",
    connector: "h-1",
    connectorVertical: "w-1",
  },
}

export function Stepper({
  steps,
  currentStep,
  orientation = "horizontal",
  size = "md",
  onStepClick,
  allowClickCompleted = true,
  className,
  ...props
}: StepperProps) {
  const sizeClass = sizeClasses[size]

  const getStepStatus = (index: number): StepStatus => {
    if (index < currentStep) return "complete"
    if (index === currentStep) return "current"
    return "upcoming"
  }

  const isClickable = (index: number) => {
    if (!onStepClick) return false
    if (index === currentStep) return false
    if (index < currentStep && allowClickCompleted) return true
    return false
  }

  return (
    <div
      role="navigation"
      aria-label="Progress"
      className={cn(
        orientation === "horizontal"
          ? "flex items-start"
          : "flex flex-col",
        className
      )}
      {...props}
    >
      {/* CSS for checkmark animation */}
      <style>{`
        @keyframes draw-check {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>

      {steps.map((step, index) => {
        const status = getStepStatus(index)
        const clickable = isClickable(index)
        const isLast = index === steps.length - 1

        return (
          <React.Fragment key={index}>
            <div
              className={cn(
                "flex",
                orientation === "horizontal"
                  ? "flex-col items-center"
                  : "flex-row items-start"
              )}
            >
              {/* Step indicator */}
              <button
                type="button"
                onClick={() => clickable && onStepClick?.(index)}
                disabled={!clickable}
                aria-current={status === "current" ? "step" : undefined}
                className={cn(
                  "relative flex items-center justify-center rounded-full",
                  "font-medium",
                  // Premium spring transition
                  "transition-all duration-300 ease-[var(--ease-spring)]",
                  // Focus ring with offset
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2",
                  "focus-visible:ring-offset-[var(--color-surface)]",
                  sizeClass.indicator,
                  // Status colors with premium effects
                  status === "complete" && !step.error && [
                    "bg-[var(--color-primary)] text-white",
                    // Premium: subtle glow for completed
                    "shadow-[0_0_0_2px_var(--color-surface),0_0_8px_-2px_var(--color-primary)/50]",
                    clickable && [
                      "cursor-pointer",
                      "hover:bg-[var(--color-primary-hover)]",
                      "hover:shadow-[0_0_0_2px_var(--color-surface),0_0_12px_-2px_var(--color-primary)/60]",
                      "hover:scale-105",
                    ],
                  ],
                  status === "current" && !step.error && [
                    "border-2 border-[var(--color-primary)]",
                    "bg-[var(--color-surface)] text-[var(--color-primary)]",
                    // Premium: active step glow
                    "shadow-[0_0_0_4px_var(--color-primary)/10,0_0_12px_-2px_var(--color-primary)/30]",
                    // Subtle pulse animation
                    "animate-[pulse_2s_ease-in-out_infinite]",
                  ],
                  status === "upcoming" && [
                    "border-2 border-[var(--color-border)]",
                    "bg-[var(--color-surface)] text-[var(--color-text-muted)]",
                  ],
                  step.error && [
                    "bg-[var(--color-error)] text-white",
                    "shadow-[0_0_0_2px_var(--color-surface),0_0_8px_-2px_var(--color-error)/50]",
                  ],
                  !clickable && "cursor-default"
                )}
              >
                {status === "complete" && !step.icon ? (
                  <CheckIcon />
                ) : step.icon ? (
                  step.icon
                ) : (
                  <span>{index + 1}</span>
                )}
              </button>

              {/* Step content */}
              <div
                className={cn(
                  orientation === "horizontal"
                    ? "mt-2 text-center"
                    : "ml-3 pb-8"
                )}
              >
                <p
                  className={cn(
                    "font-medium",
                    // Spring transition for label
                    "transition-colors duration-300 ease-[var(--ease-spring)]",
                    sizeClass.label,
                    status === "current"
                      ? "text-[var(--color-text)]"
                      : status === "complete"
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-text-muted)]",
                    step.error && "text-[var(--color-error)]"
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p
                    className={cn(
                      "mt-0.5 text-[var(--color-text-muted)]",
                      "transition-opacity duration-300 ease-[var(--ease-spring)]",
                      sizeClass.description,
                      status === "upcoming" && "opacity-60"
                    )}
                  >
                    {step.description}
                  </p>
                )}
              </div>
            </div>

            {/* Connector line */}
            {!isLast && (
              <div
                className={cn(
                  // Spring transition for connector color
                  "transition-all duration-500 ease-[var(--ease-spring)]",
                  orientation === "horizontal"
                    ? cn(
                        "flex-1 mx-2",
                        "self-center mt-0 -translate-y-1/2",
                        sizeClass.connector,
                        size === "sm" && "mt-3",
                        size === "md" && "mt-4",
                        size === "lg" && "mt-5"
                      )
                    : cn(
                        "ml-4 -translate-x-1/2",
                        "h-full min-h-8",
                        sizeClass.connectorVertical
                      ),
                  status === "complete"
                    ? "bg-[var(--color-primary)]"
                    : "bg-[var(--color-border)]",
                  // Premium: gradient for in-progress connector
                  status === "current" &&
                    "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-border)]"
                )}
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

// Simple numbered steps without descriptions
export interface SimpleStepperProps extends Omit<StepperProps, "steps"> {
  /**
   * Step labels
   */
  labels: string[]
}

export function SimpleStepper({
  labels,
  ...props
}: SimpleStepperProps) {
  const steps: Step[] = labels.map((label) => ({ label }))
  return <Stepper steps={steps} {...props} />
}

// Step indicator for minimal display
export interface StepIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Total number of steps
   */
  total: number
  /**
   * Current step (1-indexed for display)
   */
  current: number
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
}

export function StepIndicator({
  total,
  current,
  size = "md",
  className,
  ...props
}: StepIndicatorProps) {
  const dots = Array.from({ length: total }, (_, i) => i + 1)

  const dotSizes = {
    sm: "h-1.5 w-1.5",
    md: "h-2 w-2",
    lg: "h-2.5 w-2.5",
  }

  return (
    <div
      role="group"
      aria-label={`Step ${current} of ${total}`}
      className={cn("flex items-center gap-1.5", className)}
      {...props}
    >
      {dots.map((step) => (
        <div
          key={step}
          className={cn(
            "rounded-full",
            // Premium spring transition
            "transition-all duration-300 ease-[var(--ease-spring)]",
            dotSizes[size],
            step === current
              ? [
                  "bg-[var(--color-primary)]",
                  // Premium: active dot glow
                  "shadow-[0_0_6px_var(--color-primary)/50]",
                  "scale-125",
                ]
              : step < current
              ? "bg-[var(--color-primary)]"
              : "bg-[var(--color-border)]"
          )}
          aria-current={step === current ? "step" : undefined}
        />
      ))}
    </div>
  )
}

// Progress stepper with percentage
export interface ProgressStepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Current step (0-indexed)
   */
  currentStep: number
  /**
   * Total steps
   */
  totalSteps: number
  /**
   * Show percentage
   */
  showPercentage?: boolean
  /**
   * Show step count
   */
  showCount?: boolean
}

export function ProgressStepper({
  currentStep,
  totalSteps,
  showPercentage = true,
  showCount = true,
  className,
  ...props
}: ProgressStepperProps) {
  const percentage = Math.round((currentStep / (totalSteps - 1)) * 100)

  return (
    <div className={cn("space-y-2", className)} {...props}>
      {/* Info row */}
      {(showPercentage || showCount) && (
        <div className="flex items-center justify-between text-sm">
          {showCount && (
            <span className="text-[var(--color-text-muted)] tabular-nums">
              Step <span className="font-medium text-[var(--color-text)]">{currentStep + 1}</span> of{" "}
              <span className="font-medium text-[var(--color-text)]">{totalSteps}</span>
            </span>
          )}
          {showPercentage && (
            <span className="font-medium text-[var(--color-text)] tabular-nums">
              {percentage}%
            </span>
          )}
        </div>
      )}

      {/* Progress bar */}
      <div
        className={cn(
          "h-2 bg-[var(--color-surface-muted)] rounded-full overflow-hidden",
          // Premium: subtle inner shadow
          "shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
        )}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn(
            "h-full bg-[var(--color-primary)] rounded-full",
            // Premium spring transition for progress
            "transition-all duration-500 ease-[var(--ease-spring)]",
            // Premium: glow effect on progress bar
            "shadow-[0_0_8px_-2px_var(--color-primary)/50]"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
