/**
 * Input Component
 *
 * Spec: domains/components/053-inputs.yaml
 *
 * Rules from spec:
 * - INP1: Inputs MUST have associated label
 * - INP2: Error state MUST have aria-invalid and aria-describedby
 * - INP3: Placeholder MUST NOT be only label
 * - INP4: Focus ring MUST be visible on all inputs
 * - INP5: Inputs MUST have minimum 44px height
 *
 * Tokens consumed:
 * - --color-surface, --color-foreground, --color-muted-foreground
 * - --color-border, --color-error, --color-primary
 * - --radius-md, --space-2, --space-3
 * - --duration-fast, --ease-out
 */

import { forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  // Base styles - Premium edition with refined interactions
  [
    "flex w-full",
    "min-h-[44px]",
    "px-4 py-2.5",
    "text-base text-[var(--color-foreground)]",
    "bg-[var(--color-surface)]",
    "border border-[var(--color-border)]",
    "rounded-[var(--radius-md)]",
    "shadow-[var(--shadow-xs)]",
    // Smooth transitions
    "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
    // Placeholder
    "placeholder:text-[var(--color-text-subtle)]",
    // Hover - subtle lift
    "hover:border-[var(--color-border-hover)]",
    "hover:shadow-[var(--shadow-sm)]",
    // Focus - premium ring with glow
    "focus:outline-none",
    "focus:border-[var(--color-primary)]",
    "focus:ring-[3px] focus:ring-[var(--color-focus-ring)]",
    "focus:shadow-[var(--shadow-primary-sm)]",
    // Disabled
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--color-surface-muted)]",
    "disabled:hover:border-[var(--color-border)] disabled:hover:shadow-[var(--shadow-xs)]",
    // Read-only
    "read-only:bg-[var(--color-surface-muted)] read-only:cursor-default",
  ],
  {
    variants: {
      size: {
        sm: "min-h-[36px] px-3 py-1.5 text-sm rounded-[var(--radius-sm)]",
        md: "min-h-[44px]",
        lg: "min-h-[52px] px-5 py-3 text-lg",
      },
      error: {
        true: [
          "border-[var(--color-error)]",
          "shadow-[var(--shadow-error-sm)]",
          "focus:border-[var(--color-error)]",
          "focus:ring-[rgb(239_68_68_/_0.15)]",
          "focus:shadow-[0_0_0_1px_rgb(239_68_68_/_0.1)]",
        ],
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      error: false,
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

/**
 * Input component following Domain 53 specification.
 *
 * @example
 * <Input placeholder="Enter your email" />
 *
 * @example
 * <Input error aria-invalid="true" aria-describedby="email-error" />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, error, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ size, error }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

/**
 * Textarea component with same styling as Input
 */
export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof inputVariants> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          inputVariants({ size, error }),
          "min-h-[80px] resize-y",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

/**
 * Form Field wrapper with label and help/error text
 */
export interface FormFieldProps {
  children: React.ReactNode
  className?: string
}

export function FormField({ children, className }: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-[var(--space-1)]", className)}>
      {children}
    </div>
  )
}

/**
 * Label for form fields
 */
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export function Label({ children, required, className, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "text-[var(--text-sm)] font-[var(--font-medium)] text-[var(--color-foreground)]",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="text-[var(--color-error)] ml-1" aria-hidden="true">
          *
        </span>
      )}
    </label>
  )
}

/**
 * Help text below form fields
 */
export interface FormHelpProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function FormHelp({ className, ...props }: FormHelpProps) {
  return (
    <p
      className={cn(
        "text-[var(--text-sm)] text-[var(--color-muted-foreground)]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Error message below form fields
 */
export interface FormErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function FormError({ className, ...props }: FormErrorProps) {
  return (
    <p
      className={cn("text-[var(--text-sm)] text-[var(--color-error)]", className)}
      role="alert"
      {...props}
    />
  )
}

export { inputVariants }
